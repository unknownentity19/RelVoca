#!/usr/bin/env node
'use strict';

/**
 * fetch-modules.js — recover ES modules the crawl never followed.
 *
 * HTTrack parses HTML and CSS for references. It does not parse JavaScript, so
 * a module pulled in by an `import "./x.js"` *inside another module* was never
 * queued for download. Every such file is silently absent, and the component it
 * defines simply never registers.
 *
 * That is why the events page showed no card artwork: each card holds a
 * <pattern-field> custom element whose definition lives in
 * _astro/eventsField.<hash>.js, imported by EventsIndex — and never captured.
 * An undefined custom element renders as an empty inline box, so all 15 event
 * and webinar visuals were blank.
 *
 * Resolves imports transitively, because a recovered module can import further
 * modules that are equally absent. Re-runnable: anything already on disk is
 * skipped, so it converges and can be run again safely.
 *
 *   node tools/fetch-modules.js --dry
 *   node tools/fetch-modules.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = path.resolve(__dirname, '..');
const SITE = path.join(ROOT, 'www.voiceflow.com');
const ORIGIN = 'https://www.voiceflow.com';
const DRY = process.argv.includes('--dry');

const MAX_BYTES = 4 * 1024 * 1024;
const MAX_ROUNDS = 6; // transitive closure converges well before this

/* Matches `import "./x.js"`, `from "./x.js"`, and `import("./x.js")`. The query
   string (?dpl=...) is part of the URL but never part of the filename on disk. */
const IMPORT_RE = /(?:\bfrom\s*|\bimport\s*\(?\s*)["']([^"']+\.js)(\?[^"']*)?["']/g;

/* Script URLs assembled in code rather than imported, e.g.
   `el.src = "/js/pattern-field.js?v=38cf3011de"`. HTTrack misses these for the
   same reason it misses imports, and so would an import-only scan: eventsField
   loads the component that draws every event card through exactly this path. */
const SCRIPT_URL_RE = /["'`](\/(?:js|_astro)\/[A-Za-z0-9._-]+\.js)(\?[^"'`]*)?["'`]/g;

function get(url, redirectsLeft = 3) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { timeout: 30000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        if (!redirectsLeft) return reject(new Error('too many redirects'));
        return resolve(get(new URL(res.headers.location, url).href, redirectsLeft - 1));
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error('HTTP ' + res.statusCode));
      }
      const chunks = [];
      let size = 0;
      res.on('data', (c) => {
        size += c.length;
        if (size > MAX_BYTES) {
          req.destroy();
          return reject(new Error('response too large'));
        }
        chunks.push(c);
      });
      res.on('end', () =>
        resolve({ body: Buffer.concat(chunks), type: res.headers['content-type'] || '' })
      );
    });
    req.on('timeout', () => req.destroy(new Error('timeout')));
    req.on('error', reject);
  });
}

/** Every .js file currently under the mirror. */
function jsFiles(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === '_quarantine' || e.name === 'node_modules') continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) jsFiles(full, out);
    else if (e.isFile() && e.name.endsWith('.js')) out.push(full);
  }
  return out;
}

/** Module specifiers a file imports, resolved to mirror-relative paths. */
function importsOf(file) {
  let src;
  try {
    src = fs.readFileSync(file, 'utf8');
  } catch {
    return [];
  }
  const dir = path.dirname(file);
  const out = [];
  for (const re of [IMPORT_RE, SCRIPT_URL_RE]) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(src)) !== null) {
      const spec = m[1];
      if (/^(https?:)?\/\//.test(spec)) continue; // absolute: not ours to fetch
      const abs = spec.startsWith('/')
        ? path.join(SITE, spec.replace(/^\/+/, ''))
        : path.resolve(dir, spec);
      if (!abs.startsWith(SITE)) continue; // never escape the mirror
      out.push(abs);
    }
  }
  return out;
}

(async () => {
  const fetched = [];
  const failed = [];
  let scanned = 0;

  for (let round = 1; round <= MAX_ROUNDS; round++) {
    const missing = new Set();
    for (const f of jsFiles(SITE)) {
      scanned++;
      for (const target of importsOf(f)) {
        if (!fs.existsSync(target)) missing.add(target);
      }
    }
    if (!missing.size) {
      if (round === 1) console.log('fetch-modules: nothing missing');
      break;
    }

    console.log(`round ${round}: ${missing.size} missing module(s)`);
    let progressed = false;

    for (const target of missing) {
      const rel = path.relative(SITE, target).split(path.sep).join('/');
      if (DRY) {
        console.log(`  [dry] would fetch /${rel}`);
        continue;
      }
      try {
        const { body, type } = await get(`${ORIGIN}/${rel}`);
        if (!/javascript|ecmascript|text\/plain/i.test(type)) {
          throw new Error(`unexpected content-type "${type}"`);
        }
        fs.mkdirSync(path.dirname(target), { recursive: true });
        fs.writeFileSync(target, body);
        fetched.push(rel);
        progressed = true;
        console.log(`  saved /${rel}  ${body.length} bytes`);
      } catch (err) {
        failed.push(`${rel}: ${err.message}`);
        console.log(`  FAIL  /${rel}  ${err.message}`);
      }
    }

    if (DRY || !progressed) break; // nothing new landed: further rounds are pointless
  }

  console.log(
    `${DRY ? '[dry-run] ' : ''}fetch-modules: ${fetched.length} recovered, ${failed.length} failed`
  );
  if (failed.length) {
    console.log('  unrecoverable (the origin has rebuilt since the capture):');
    for (const f of failed) console.log('    ' + f);
  }
})();
