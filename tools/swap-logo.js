#!/usr/bin/env node
'use strict';

/**
 * swap-logo.js — replace the inline Voiceflow wordmark with the RelVoca one.
 *
 * The captured pages inline the logo as a single <svg viewBox="0 0 112 23">
 * wrapping one path that starts at M55.861. That svg element carries the
 * page's own data-astro-cid-* scoping attribute, and .nav-logo's CSS selects
 * on it (`.nav-logo[data-astro-cid-…] svg[data-astro-cid-…]`), so the wrapper's
 * attributes are preserved verbatim — only width, viewBox and the children are
 * replaced. Dropping the cid would silently un-style every nav logo.
 *
 *   node tools/swap-logo.js --dry
 *   node tools/swap-logo.js
 */

const fs = require('fs');
const path = require('path');
const { markPath, NAV, FONT } = require('./make-logo.js');

const ROOT = path.resolve(__dirname, '..');
const BACKUP = path.join(ROOT, '_quarantine', 'pre-rebrand');
const DRY = process.argv.includes('--dry');

const SIG = 'M55.861 9.80316'; // start of the captured Voiceflow logo path
const SKIP_DIRS = new Set(['_quarantine', 'node_modules', '.git']);

/** Children of the replacement svg, minus the wrapper. `cid` re-applies the
 *  page's Astro scoping attribute to each child so scoped CSS still matches. */
function children(cid) {
  const a = cid ? ' ' + cid : '';
  return (
    `<path fill-rule="evenodd" clip-rule="evenodd" d="${markPath(1)}" fill="currentColor"${a}></path>` +
    `<text x="${NAV.textX}" y="${NAV.baseline}" font-family="${FONT}" ` +
    `font-size="${NAV.fontSize}" font-weight="700" letter-spacing="-0.2" ` +
    `textLength="${NAV.textLen}" lengthAdjust="spacingAndGlyphs" ` +
    `fill="currentColor"${a}>RelVoca</text>`
  );
}

function swapOne(src) {
  let out = '';
  let i = 0;
  let n = 0;

  while (true) {
    const hit = src.indexOf(SIG, i);
    if (hit === -1) {
      out += src.slice(i);
      break;
    }
    // Walk back to the <svg that opens this logo, forward to its </svg>.
    const open = src.lastIndexOf('<svg', hit);
    const openEnd = src.indexOf('>', open);
    const close = src.indexOf('</svg>', hit);
    if (open === -1 || openEnd === -1 || close === -1) {
      out += src.slice(i, hit + SIG.length);
      i = hit + SIG.length;
      continue;
    }

    const openTag = src.slice(open, openEnd + 1);
    const cid = (openTag.match(/data-astro-cid-[\w-]+/) || [''])[0];
    const nextOpen = openTag
      .replace(/\bwidth="112"/, `width="${NAV.width}"`)
      .replace(/viewBox="0 0 112 23"/, `viewBox="0 0 ${NAV.width} ${NAV.height}"`);

    out += src.slice(i, open) + nextOpen + children(cid) + '</svg>';
    i = close + '</svg>'.length;
    n++;
  }

  return { out, n };
}

function* walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(full);
    else if (e.isFile()) yield full;
  }
}

function backup(file) {
  const dest = path.join(BACKUP, path.relative(ROOT, file));
  if (fs.existsSync(dest)) return;
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(file, dest);
}

let files = 0;
let swaps = 0;
for (const file of walk(path.join(ROOT, 'www.voiceflow.com'))) {
  let src;
  try {
    src = fs.readFileSync(file, 'utf8');
  } catch {
    continue;
  }
  if (!src.includes(SIG)) continue;
  const { out, n } = swapOne(src);
  if (!n || out === src) continue;
  files++;
  swaps += n;
  if (!DRY) {
    backup(file);
    fs.writeFileSync(file, out);
  }
}

console.log(`${DRY ? '[dry-run] ' : ''}swap-logo: ${swaps} wordmarks in ${files} files`);
