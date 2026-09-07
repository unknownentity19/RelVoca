#!/usr/bin/env node
/**
 * Recover CDN assets whose local filename HTTrack derived from a query string.
 *
 * HTTrack saves `image%402x.png?w=840&fit=max` as `image%402x4126.png`, hashing
 * the query into a 4-hex suffix so each responsive variant gets its own file.
 * Requesting that local name from the origin 404s - the real URL is the
 * unsuffixed path plus the original query.
 *
 * So rather than reconstructing URLs, this scans the mirror for the references
 * themselves, pairing each local filename with the exact origin URL that produced
 * it, then fetches that.
 *
 *   node tools/fetch-cdn.js --dry-run
 *   node tools/fetch-cdn.js
 */
const fs = require('fs');
const path = require('path');

const PROJECT = path.join(__dirname, '..');
const DRY = process.argv.includes('--dry-run');
const RATE_MS = Number(process.env.RATE_MS || 120);
const CONCURRENCY = Number(process.env.CONCURRENCY || 4);
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
           '(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

// Hosts HTTrack mirrored into their own top-level directories.
const HOSTS = ['mintcdn.com', 'prod-assets.sequelvideo.com', 'js.hsforms.net'];

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (/hts-cache|node_modules|\.git|_quarantine|[/\\]tools$/.test(p)) continue;
    if (e.isDirectory()) walk(p, out);
    else {
      const ext = path.extname(p).toLowerCase();
      if (['.html', '.css', '.js', '.json', '.md', '.xml'].includes(ext) || !ext) out.push(p);
    }
  }
  return out;
}

const decode = s => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;/g, "'");

// host/path<4hex>.<ext> optionally followed by a query string.
const REF = new RegExp(
  '(' + HOSTS.map(h => h.replace(/\./g, '\\.')).join('|') + ')' +
  '(/[^"\'\\s)>\\\\]+?)' +          // path up to the hash suffix
  '([0-9a-f]{4})' +                 // HTTrack query hash
  '(\\.[a-zA-Z0-9]{2,5})' +         // extension
  '(\\?[^"\'\\s)>\\\\]*)?',         // original query, if still present
  'g'
);

const jobs = new Map();   // localPath -> originUrl
let refsSeen = 0;

for (const file of walk(PROJECT)) {
  let text;
  try { text = fs.readFileSync(file, 'utf8'); } catch { continue; }
  if (!HOSTS.some(h => text.includes(h))) continue;

  let m;
  REF.lastIndex = 0;
  while ((m = REF.exec(text))) {
    const [, host, base, hash, ext, rawQuery] = m;
    refsSeen++;
    const localRel = path.join(host, decodeURIComponent(base + hash + ext).replace(/^\//, ''));
    const localAbs = path.join(PROJECT, localRel);
    if (fs.existsSync(localAbs) || jobs.has(localAbs)) continue;
    // Origin URL: same path WITHOUT the hash suffix, WITH the original query.
    const query = rawQuery ? decode(rawQuery) : '';
    jobs.set(localAbs, `https://${host}${base}${ext}${query}`);
  }
}

console.log(`refs scanned: ${refsSeen} | missing locally: ${jobs.size}`);
if (!jobs.size) process.exit(0);

if (DRY) {
  let i = 0;
  for (const [local, url] of jobs) {
    if (i++ >= 5) break;
    console.log(`  ${path.relative(PROJECT, local)}\n    <- ${url.slice(0, 130)}`);
  }
  console.log(`\n(dry run; ${jobs.size} would be fetched)`);
  process.exit(0);
}

const ok = [], failed = [];
const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const queue = [...jobs.entries()];
  const total = queue.length;
  let done = 0;
  await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
    while (queue.length) {
      const [local, url] = queue.shift();
      try {
        const res = await fetch(url, { headers: { 'User-Agent': UA }, redirect: 'follow' });
        if (res.ok) {
          const buf = Buffer.from(await res.arrayBuffer());
          fs.mkdirSync(path.dirname(local), { recursive: true });
          fs.writeFileSync(local, buf);
          ok.push({ local, bytes: buf.length });
        } else {
          failed.push({ url, status: res.status });
        }
      } catch (e) {
        failed.push({ url, status: e.message });
      }
      if (++done % 100 === 0) console.log(`  ${done}/${total} ok=${ok.length} fail=${failed.length}`);
      await sleep(RATE_MS);
    }
  }));

  const mb = (ok.reduce((s, r) => s + r.bytes, 0) / 1048576).toFixed(1);
  console.log(`\ndone: ${ok.length} fetched (${mb} MB), ${failed.length} failed`);
  for (const f of failed.slice(0, 8)) console.log(`  [${f.status}] ${f.url.slice(0, 120)}`);
  fs.writeFileSync(path.join(__dirname, 'fetch-cdn-results.json'),
    JSON.stringify({ ok: ok.length, failed }, null, 2));
})();
