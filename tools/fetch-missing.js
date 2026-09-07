#!/usr/bin/env node
/**
 * Re-fetch mirror assets the HTTrack crawl missed.
 *
 * Targets are derived from tools/audit-report.json (authoritative) rather than
 * hand-listed, so the manifest stays in sync with the real breakage.
 *
 * Rate-limited and resumable: anything already on disk is skipped, so the script
 * can be re-run safely after an interruption.
 *
 *   node tools/fetch-missing.js --dry-run    # print the manifest, fetch nothing
 *   node tools/fetch-missing.js              # fetch
 */
const fs = require('fs');
const path = require('path');

const PROJECT = path.join(__dirname, '..');
const MIRROR = path.join(PROJECT, 'www.voiceflow.com');
const REPORT = path.join(__dirname, 'audit-report.json');

const DRY = process.argv.includes('--dry-run');
const RATE_MS = Number(process.env.RATE_MS || 250);          // ~4 req/sec
const CONCURRENCY = Number(process.env.CONCURRENCY || 2);
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
           '(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

if (!fs.existsSync(REPORT)) {
  console.error('missing tools/audit-report.json - run: node tools/audit.js');
  process.exit(1);
}
const report = JSON.parse(fs.readFileSync(REPORT, 'utf8'));

// Collection listing pages must land at mirror ROOT as <name>.html: their internal
// links read href="stories/foo", which only resolves from root depth. The server's
// <name>.html fallback then serves them at /stories. See tools/ROUTES.md.
const LISTING = ['stories', 'events', 'integrations', 'industries', 'solutions',
                 'contributors', 'blog-category', 'stories-categories'];

const targets = new Map();  // url -> {local, category}
const add = (url, local, category) => {
  if (!targets.has(url)) targets.set(url, { local, category });
};

for (const name of LISTING) {
  add(`https://www.voiceflow.com/${name}`, path.join(MIRROR, `${name}.html`), 'listing-page');
}

for (const m of report.missing) {
  const ref = m.ref;

  // Sibling-host assets HTTrack mirrored into their own top-level dirs.
  if (m.kind === 'absolute-mirrored') {
    const host = ref.split('/')[0];
    if (host === 'www.googletagmanager.com') continue;   // stubbed offline instead
    add(`https://${ref}`, path.join(PROJECT, ref), host);
    continue;
  }
  // Refs that climb out of the mirror into a sibling host dir (../mintcdn.com/...).
  const up = ref.match(/^\/\.\.\/([^/]+\.[^/]+)\/(.+)$/);
  if (up) {
    add(`https://${up[1]}/${up[2]}`, path.join(PROJECT, up[1], up[2]), up[1]);
    continue;
  }
  // Docs Next.js bundles and site JS/SVG - root-relative, resolve once on disk.
  if (/^\/(docs\/_next|_astro)\//.test(ref) && /\.(js|css|svg|woff2?|avif|png|webp)$/.test(ref)) {
    add(`https://www.voiceflow.com${ref}`, path.join(MIRROR, ref.replace(/^\//, '')), 'docs-bundle');
    continue;
  }
}

// FontAwesome / devicon icons used by the docs theme, plus the Google Fonts the
// docs pages load. Both are referenced by absolute URL, so after fetching they
// still need a ref rewrite (tools/rewrite-external.js) to resolve offline.
const ICON_HOST = 'd3gk2c5xim1je2.cloudfront.net';
try {
  const { execSync } = require('child_process');
  const out = execSync(
    `grep -rhoE 'https://${ICON_HOST.replace(/\./g, '\\.')}/[^"'"'"' )>]{1,90}' ` +
    `"${PROJECT}" 2>/dev/null | grep -v _quarantine | sed 's/%22.*//' | sed 's/&quot;.*//' | sort -u`,
    { encoding: 'utf8', maxBuffer: 1 << 24 }
  );
  for (const url of out.split('\n').map(s => s.trim()).filter(u => /^https:\/\/.+\.\w+$/.test(u))) {
    const p = new URL(url).pathname.replace(/^\//, '');
    add(url, path.join(PROJECT, ICON_HOST, p), 'docs-icons');
  }
} catch {}

for (const fam of ['Inter:ital,wght@0,400;1,400', 'Inter:wght@400;500;600;700']) {
  const url = `https://fonts.googleapis.com/css2?family=${fam}&display=swap`;
  const safe = fam.replace(/[^A-Za-z0-9]+/g, '_');
  add(url, path.join(PROJECT, 'fonts.googleapis.com', `${safe}.css`), 'fonts-css');
}

const manifest = [...targets.entries()].map(([url, t]) => ({ url, ...t }));
const byCat = {};
for (const t of manifest) (byCat[t.category] = byCat[t.category] || []).push(t);

const pending = manifest.filter(t => !fs.existsSync(t.local));
console.log(`manifest: ${manifest.length} urls | already on disk: ${manifest.length - pending.length} | to fetch: ${pending.length}`);
for (const [c, ts] of Object.entries(byCat).sort((a, b) => b[1].length - a[1].length)) {
  console.log(`  ${String(ts.length).padStart(5)}  ${c}`);
}
if (DRY) {
  console.log('\n--- sample ---');
  for (const t of pending.slice(0, 8)) console.log(`  ${t.url}\n      -> ${path.relative(PROJECT, t.local)}`);
  fs.writeFileSync(path.join(__dirname, 'fetch-manifest.json'), JSON.stringify(manifest, null, 2));
  console.log('\nmanifest written to tools/fetch-manifest.json (dry run, nothing fetched)');
  process.exit(0);
}

const results = { ok: [], failed: [], skipped: manifest.length - pending.length };
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function grab(t) {
  try {
    const res = await fetch(t.url, {
      headers: { 'User-Agent': UA, 'Accept': '*/*' },
      redirect: 'follow',
    });
    if (!res.ok) { results.failed.push({ ...t, status: res.status }); return; }
    const buf = Buffer.from(await res.arrayBuffer());
    fs.mkdirSync(path.dirname(t.local), { recursive: true });
    fs.writeFileSync(t.local, buf);
    results.ok.push({ ...t, bytes: buf.length, type: res.headers.get('content-type') });
  } catch (e) {
    results.failed.push({ ...t, status: e.message });
  }
}

(async () => {
  let i = 0;
  const queue = [...pending];
  const workers = Array.from({ length: CONCURRENCY }, async () => {
    while (queue.length) {
      const t = queue.shift();
      await grab(t);
      if (++i % 25 === 0) console.log(`  ${i}/${pending.length} ... ok=${results.ok.length} fail=${results.failed.length}`);
      await sleep(RATE_MS);
    }
  });
  await Promise.all(workers);

  const mb = (results.ok.reduce((s, r) => s + r.bytes, 0) / 1048576).toFixed(1);
  console.log(`\ndone: ${results.ok.length} fetched (${mb} MB), ${results.failed.length} failed, ${results.skipped} already present`);
  const byCatFail = {};
  for (const f of results.failed) byCatFail[f.category] = (byCatFail[f.category] || 0) + 1;
  if (results.failed.length) {
    console.log('failures by category:');
    for (const [c, n] of Object.entries(byCatFail)) console.log(`  ${String(n).padStart(5)}  ${c}`);
    console.log('sample:');
    for (const f of results.failed.slice(0, 10)) console.log(`  [${f.status}] ${f.url}`);
  }
  fs.writeFileSync(path.join(__dirname, 'fetch-results.json'), JSON.stringify(results, null, 2));
})();
