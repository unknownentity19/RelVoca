#!/usr/bin/env node
'use strict';

/**
 * inject-auth.js — load js/relvoca-auth.js on every page that renders the nav.
 *
 * The captured nav ships both states at once: `.nav-pill.is-login` + `.nav-cta`
 * ("Get started") for anonymous visitors and `.nav-cta.is-authed`
 * ("Open RelVoca") for signed-in ones. Nothing in the capture decides between
 * them, so without this script every page shows all three at once.
 *
 * The tag is root-relative (/js/relvoca-auth.js) on purpose: the nav appears on
 * pages at many directory depths, and the server resolves from the mirror root,
 * so one path is correct everywhere. A per-page relative path would have to be
 * recomputed per depth and would break the moment a page moved.
 *
 *   node tools/inject-auth.js --dry
 *   node tools/inject-auth.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITE = path.join(ROOT, 'www.voiceflow.com');
const BACKUP = path.join(ROOT, '_quarantine', 'pre-rebrand');
const DRY = process.argv.includes('--dry');
const SKIP_DIRS = new Set(['_quarantine', 'node_modules', '.git']);

const TAG = '<script src="/js/relvoca-auth.js" defer></script>';
const MARKER = 'js/relvoca-auth.js';
const NAV_SIGNATURE = 'class="nav-auth"';

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

let changed = 0;
let already = 0;
let skipped = 0;

for (const file of walk(SITE)) {
  const ext = path.extname(file).toLowerCase();
  if (ext !== '.html' && ext !== '') continue;

  let src;
  try {
    src = fs.readFileSync(file, 'utf8');
  } catch {
    continue;
  }

  if (!src.includes(NAV_SIGNATURE)) continue; // page has no nav to paint
  if (src.includes(MARKER)) {
    already++;
    continue;
  }
  if (!src.includes('</body>')) {
    skipped++;
    continue;
  }

  const out = src.replace('</body>', TAG + '</body>');
  changed++;
  if (!DRY) {
    backup(file);
    fs.writeFileSync(file, out);
  }
}

console.log(
  `${DRY ? '[dry-run] ' : ''}inject-auth: ${changed} pages wired` +
    `, ${already} already had it` +
    (skipped ? `, ${skipped} skipped (no </body>)` : '')
);
