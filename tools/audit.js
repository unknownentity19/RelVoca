#!/usr/bin/env node
/**
 * Static reference audit for the mirror.
 *
 * Walks every HTML/CSS/JS file, extracts every reference, and resolves it
 * against disk using the same rules tools/serve.js applies. Emits a JSON
 * report classifying each ref as ok / missing / external / dynamic.
 */
const fs = require('fs');
const path = require('path');

const PROJECT = path.join(__dirname, '..');
const ROOT = path.join(PROJECT, 'www.voiceflow.com');
// Sibling mirrors HTTrack created for cross-origin assets.
const HOST_DIRS = ['www.voiceflow.com', 'mintcdn.com', 'js.hsforms.net',
                   'prod-assets.sequelvideo.com', 'www.googletagmanager.com'];

// `public` is the generated Vercel build (tools/build-vercel.js): a full copy
// of the served tree. Scanning it double-counts every reference and inflates
// the broken-ref total, so it is excluded like the other build/backup dirs.
function walk(dir, out = [], skip = /hts-cache|node_modules|\.git|tools|_quarantine|[/\\]public([/\\]|$)/) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (skip.test(p)) continue;
    if (e.isDirectory()) walk(p, out, skip);
    else out.push(p);
  }
  return out;
}

const all = walk(PROJECT);
const onDisk = new Set(all.map(f => path.relative(PROJECT, f)));

// Text files worth scanning for references.
const scannable = all.filter(f => {
  const ext = path.extname(f).toLowerCase();
  if (['.html', '.css', '.js', '.json', '.xml'].includes(ext)) return true;
  if (!ext) { // extensionless mirror pages
    try { return /<!doctype html|<html/i.test(fs.readFileSync(f, 'utf8').slice(0, 512)); }
    catch { return false; }
  }
  return false;
});

const REF_PATTERNS = [
  // data-href is a Base-UI style-precedence attribute, not a URL; data-src is real.
  /(?:(?<![-\w])(?:href|src|poster)|data-src)\s*=\s*["']([^"'>]+)["']/gi,
  /srcset\s*=\s*["']([^"'>]+)["']/gi,
  /url\(\s*['"]?([^'")]+)['"]?\s*\)/gi,
  /(?:fetch|import)\s*\(\s*["']([^"']+)["']/gi,
];

function expand(raw, attr) {
  // srcset holds a comma-separated candidate list.
  if (attr) return raw.split(',').map(s => s.trim().split(/\s+/)[0]).filter(Boolean);
  return [raw];
}

// Resolve exactly like the server: exact, then .html, then /index.html.
function existsAt(rel) {
  // HTTrack writes URL-decoded filenames (%40 lands on disk as @), so a raw ref
  // can miss a file that is present. The server decodes; the audit must too.
  const variants = [rel];
  try { const d = decodeURIComponent(rel); if (d !== rel) variants.push(d); } catch {}
  for (const v of variants) {
    const base = path.join(PROJECT, v);
    for (const c of [base, base + '.html', path.join(base, 'index.html')]) {
      if (onDisk.has(path.relative(PROJECT, c))) return true;
      try { if (fs.statSync(c).isFile()) return true; } catch {}
    }
  }
  return false;
}

const missing = new Map();   // ref -> {count, sample pages}
const external = new Map();
const dynamic = new Map();
let okCount = 0, refCount = 0;

for (const file of scannable) {
  let text;
  try { text = fs.readFileSync(file, 'utf8'); } catch { continue; }
  const fileDir = path.dirname(file);
  const pageRel = path.relative(PROJECT, file);

  for (let i = 0; i < REF_PATTERNS.length; i++) {
    const re = new RegExp(REF_PATTERNS[i].source, REF_PATTERNS[i].flags);
    let m;
    while ((m = re.exec(text))) {
      for (const ref of expand(m[1], i === 1)) {
        refCount++;
        const clean = ref.trim().replace(/[\\]+$/, '').split('#')[0];
        if (!clean || clean.startsWith('data:') || clean.startsWith('#') ||
            clean.startsWith('javascript:') || clean.startsWith('mailto:') ||
            clean.startsWith('tel:')) continue;

        // Absolute URL
        if (/^https?:\/\//i.test(clean) || clean.startsWith('//')) {
          const u = clean.startsWith('//') ? 'https:' + clean : clean;
          let host, pathname;
          try { const p = new URL(u); host = p.host; pathname = p.pathname; } catch { continue; }
          const mirrored = HOST_DIRS.includes(host);
          if (mirrored) {
            const rel = path.join(host, pathname.replace(/^\//, ''));
            if (existsAt(rel)) { okCount++; }
            else {
              const k = host + pathname;
              if (!missing.has(k)) missing.set(k, { count: 0, kind: 'absolute-mirrored', pages: [] });
              const e = missing.get(k); e.count++;
              if (e.pages.length < 3) e.pages.push(pageRel);
            }
          } else {
            external.set(host, (external.get(host) || 0) + 1);
          }
          continue;
        }

        // Root-relative -> resolve against the page's host-mirror dir
        let rel;
        if (clean.startsWith('/')) {
          // Mirror the server: try the page's host mirror, then the project root
          // (so '/mintcdn.com/...' finds the sibling host dir), then under /docs.
          const hostDir = HOST_DIRS.find(h => pageRel.startsWith(h)) || 'www.voiceflow.com';
          const bare = clean.replace(/^\//, '');
          const cands = [path.join(hostDir, bare), bare, path.join('www.voiceflow.com', 'docs', bare)];
          const found = cands.find(c => existsAt(c));
          if (found) { okCount++; continue; }
          rel = cands[0];
        } else {
          rel = path.relative(PROJECT, path.resolve(fileDir, clean.split('?')[0]));
        }
        const relNoQuery = rel.split('?')[0];

        if (existsAt(relNoQuery)) { okCount++; continue; }
        // Query-only endpoints and API routes are server-side, not crawlable.
        const k = '/' + path.relative('www.voiceflow.com', relNoQuery).split(path.sep).join('/');
        const bucket = /\/api\//.test(k) ? dynamic : missing;
        if (!bucket.has(k)) bucket.set(k, { count: 0, kind: clean.startsWith('/') ? 'root-rel' : 'relative', pages: [] });
        const e = bucket.get(k); e.count++;
        if (e.pages.length < 3) e.pages.push(pageRel);
      }
    }
  }
}

const rank = m => [...m.entries()].sort((a, b) => b[1].count - a[1].count);
const report = {
  scannedFiles: scannable.length,
  totalRefs: refCount,
  okRefs: okCount,
  missingDistinct: missing.size,
  missingTotal: [...missing.values()].reduce((s, e) => s + e.count, 0),
  dynamicDistinct: dynamic.size,
  externalHosts: [...external.entries()].sort((a, b) => b[1] - a[1]),
  missing: rank(missing).map(([ref, e]) => ({ ref, ...e })),
  dynamic: rank(dynamic).map(([ref, e]) => ({ ref, ...e })),
};
fs.writeFileSync(path.join(__dirname, 'audit-report.json'), JSON.stringify(report, null, 2));

console.log(`scanned ${report.scannedFiles} files, ${report.totalRefs} refs`);
console.log(`ok: ${report.okRefs}`);
console.log(`MISSING: ${report.missingTotal} refs across ${report.missingDistinct} distinct targets`);
console.log(`dynamic/api: ${report.dynamicDistinct} distinct`);
console.log(`\nexternal hosts still referenced (${report.externalHosts.length}):`);
for (const [h, n] of report.externalHosts.slice(0, 20)) console.log(`  ${String(n).padStart(6)}  ${h}`);
console.log(`\ntop missing:`);
for (const e of report.missing.slice(0, 30)) console.log(`  ${String(e.count).padStart(5)}  [${e.kind}]  ${e.ref}`);
