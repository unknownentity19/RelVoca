#!/usr/bin/env node
/**
 * Point absolute CDN references at the local mirrors so pages work offline.
 *
 * The docs pages reference mintcdn, Google Fonts, the FontAwesome CDN and GTM by
 * absolute URL, so a browser fetches them from the internet even though we hold
 * local copies. Rewriting them to root-relative paths (/mintcdn.com/...) lets
 * tools/serve.js serve them from the sibling host directories.
 *
 * Also repairs HTTrack's mangled 'https:/host' (single slash) form.
 *
 *   node tools/localize-refs.js --dry-run
 *   node tools/localize-refs.js
 */
const fs = require('fs');
const path = require('path');

const PROJECT = path.join(__dirname, '..');
const BACKUP = path.join(PROJECT, '_quarantine', 'pre-localize');
const DRY = process.argv.includes('--dry-run');
const LIMIT = Number(process.env.LIMIT || 0);   // test on N files first

const HOSTS = [
  'mintcdn.com',
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'd3gk2c5xim1je2.cloudfront.net',
  'www.googletagmanager.com',
];

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (/hts-cache|node_modules|\.git|_quarantine|[/\\]tools$/.test(p)) continue;
    if (e.isDirectory()) walk(p, out);
    else {
      const ext = path.extname(p).toLowerCase();
      if (['.html', '.css', '.js'].includes(ext) || !ext) out.push(p);
    }
  }
  return out;
}

// https://host/... and HTTrack's mangled https:/host/... -> /host/...
// Leaves protocol-relative //host/... alone: the browser resolves those against
// the page origin, which is already the local server.
const patterns = HOSTS.map(h => ({
  host: h,
  re: new RegExp('https?:(?:\\\\?/){1,2}' + h.replace(/\./g, '\\.'), 'g'),
  to: '/' + h,
}));

let files = walk(PROJECT).filter(f => {
  let t; try { t = fs.readFileSync(f, 'utf8'); } catch { return false; }
  return HOSTS.some(h => t.includes(h));
});
if (LIMIT) files = files.slice(0, LIMIT);

console.log(`${files.length} files reference a mirrored CDN host`);

let changedFiles = 0;
const tally = Object.fromEntries(HOSTS.map(h => [h, 0]));

for (const file of files) {
  let text;
  try { text = fs.readFileSync(file, 'utf8'); } catch { continue; }
  const before = text;
  for (const p of patterns) {
    const hits = text.match(p.re);
    if (hits) { tally[p.host] += hits.length; text = text.replace(p.re, p.to); }
  }
  if (text === before) continue;
  changedFiles++;
  if (DRY) continue;

  // Back up once, preserving tree shape, before the first write to this file.
  const rel = path.relative(PROJECT, file);
  const bak = path.join(BACKUP, rel);
  if (!fs.existsSync(bak)) {
    fs.mkdirSync(path.dirname(bak), { recursive: true });
    fs.copyFileSync(file, bak);
  }
  fs.writeFileSync(file, text);
}

console.log(`${DRY ? 'would rewrite' : 'rewrote'} ${changedFiles} files`);
for (const [h, n] of Object.entries(tally)) if (n) console.log(`  ${String(n).padStart(6)}  ${h}`);
if (!DRY) console.log(`originals backed up to _quarantine/pre-localize/`);
