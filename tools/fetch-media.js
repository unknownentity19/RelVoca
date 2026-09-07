#!/usr/bin/env node
'use strict';

/**
 * fetch-media.js — pull down the five product videos the crawl missed.
 *
 * The homepage's Build / Launch / Iterate cards each hold a lazy <video> whose
 * <source> elements carry `data-src`. An IntersectionObserver inlined in
 * index.html promotes those to `src` when the card scrolls into view. HTTrack
 * never stored the video files themselves, so the sources still pointed at
 * media.voiceflow.com.
 *
 * delink.js originally renamed the attribute to `data-src-uncaptured` on the
 * grounds that pointing at a local file that did not exist would be worse than
 * leaving a remote one. That reasoning missed the observer: with no
 * `source[data-src]` left to promote, nothing loads at all. Two cards fell back
 * to their sibling photo and the third — which has no photo — went blank.
 *
 * Fetching them (7.2 MB for all five) fixes all three cards *and* keeps the
 * deployment free of external requests, which pointing back at the CDN would
 * not. Follows the same pattern as fetch-missing.js and fetch-cdn.js: skips
 * whatever is already on disk, so it is safe to re-run.
 *
 *   node tools/fetch-media.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = path.resolve(__dirname, '..');
const SITE = path.join(ROOT, 'www.voiceflow.com');
const ORIGIN = 'https://media.voiceflow.com/';

/* Paths are relative to the media origin, and are written to the same relative
   path under www.voiceflow.com/media/ so the page can reference `media/<path>`. */
const FILES = [
  'video/build-flow-vp9.webm',
  'video/build-flow-h265.mp4',
  'video/launch-flow-h265-alpha.mp4',
  'video/launch-flow-vp9-alpha.webm',
  'video/iterate-flow-vp9.webm',
];

const MAX_BYTES = 32 * 1024 * 1024; // refuse anything unexpectedly large

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
          return reject(new Error('response exceeded ' + MAX_BYTES + ' bytes'));
        }
        chunks.push(c);
      });
      res.on('end', () => resolve({ body: Buffer.concat(chunks), type: res.headers['content-type'] || '' }));
    });
    req.on('timeout', () => req.destroy(new Error('timeout')));
    req.on('error', reject);
  });
}

(async () => {
  let fetched = 0;
  let skipped = 0;
  let failed = 0;

  for (const rel of FILES) {
    const dest = path.join(SITE, 'media', rel);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
      skipped++;
      console.log(`  skip   media/${rel} (already on disk)`);
      continue;
    }
    try {
      const { body, type } = await get(ORIGIN + rel);
      if (!/^video\//.test(type)) throw new Error(`unexpected content-type "${type}"`);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.writeFileSync(dest, body);
      fetched++;
      console.log(`  saved  media/${rel}  ${(body.length / 1048576).toFixed(2)} MB`);
    } catch (err) {
      failed++;
      console.log(`  FAIL   media/${rel}  ${err.message}`);
    }
  }

  console.log(`fetch-media: ${fetched} fetched, ${skipped} already present, ${failed} failed`);
  if (failed) process.exitCode = 1;
})();
