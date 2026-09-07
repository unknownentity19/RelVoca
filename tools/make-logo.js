#!/usr/bin/env node
'use strict';

/**
 * make-logo.js — single source of truth for the RelVoca wordmark.
 *
 * The mark is a solid rounded square with three voice bars knocked out
 * (fill-rule evenodd, so the bars are true transparency and the mark reads
 * correctly over the nav's light *and* dark veils). The wordmark is SVG <text>
 * pinned with textLength, so it renders at a fixed width whether the page's
 * UCity Pro is available (inline in the nav) or only Arial is (standalone .svg
 * loaded through <img>, where page fonts do not apply).
 *
 * Emits:
 *   www.voiceflow.com/images/relvoca-logo.svg        currentColor
 *   mintcdn.com/.../logo/Wordmark_dark.svg           #1A1E23, 220x40
 *   mintcdn.com/.../logo/Wordmark_white.svg          white,   220x40
 *
 * tools/swap-logo.js consumes markBody()/wordBody() to replace the inline nav
 * wordmark in place.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const W = 96;
const H = 23;
/* No var() here: CSS custom properties are not resolved inside an SVG
   presentation attribute, and one invalid entry invalidates the whole list —
   which silently drops the wordmark to the SVG default serif. Concrete
   families only, so the standalone file (loaded through <img>, with no page
   CSS at all) renders the same as the inline nav copy. */
const FONT =
  "'UCity Pro',-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,Helvetica,sans-serif";

/** Rounded rectangle as a closed subpath. */
function roundRect(x, y, w, h, r) {
  return (
    `M${x + r},${y}H${x + w - r}A${r},${r} 0 0 1 ${x + w},${y + r}` +
    `V${y + h - r}A${r},${r} 0 0 1 ${x + w - r},${y + h}` +
    `H${x + r}A${r},${r} 0 0 1 ${x},${y + h - r}` +
    `V${y + r}A${r},${r} 0 0 1 ${x + r},${y}Z`
  );
}

/** Stadium (fully rounded bar) as a closed subpath. */
function bar(cx, top, bottom, r) {
  return (
    `M${cx - r},${top + r}A${r},${r} 0 0 1 ${cx + r},${top + r}` +
    `V${bottom - r}A${r},${r} 0 0 1 ${cx - r},${bottom - r}Z`
  );
}

/** The badge: rounded square minus three voice bars, one evenodd path. */
function markPath(scale = 1) {
  const s = (n) => +(n * scale).toFixed(3);
  const d =
    roundRect(s(0), s(0), s(23), s(23), s(6.4)) +
    bar(s(6.9), s(8.3), s(14.7), s(1.35)) +
    bar(s(11.5), s(5.4), s(17.6), s(1.35)) +
    bar(s(16.1), s(7.4), s(15.6), s(1.35));
  return d;
}

function svg({ width, height, fill, scale, fontSize, textX, textLen, baseline }) {
  return (
    `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" ` +
    `fill="none" xmlns="http://www.w3.org/2000/svg">` +
    `<path fill-rule="evenodd" clip-rule="evenodd" d="${markPath(scale)}" fill="${fill}"/>` +
    `<text x="${textX}" y="${baseline}" font-family="${FONT}" font-size="${fontSize}" ` +
    `font-weight="700" letter-spacing="-0.2" textLength="${textLen}" ` +
    `lengthAdjust="spacingAndGlyphs" fill="${fill}">RelVoca</text>` +
    `</svg>`
  );
}

/* The nav copy: 96x23, inherits nav ink through currentColor. */
const NAV = {
  width: W,
  height: H,
  fill: 'currentColor',
  scale: 1,
  fontSize: 16.5,
  textX: 29,
  textLen: 65,
  baseline: 17.1,
};

/* The docs copy: 220x40, same proportions scaled up. */
const DOCS = (fill) => ({
  width: 220,
  height: 40,
  fill,
  scale: 40 / 23,
  fontSize: 28.7,
  textX: 50.4,
  textLen: 113,
  baseline: 29.7,
});

/* images/logo.svg is overwritten in place rather than published under a new
   name: every existing reference to it stays valid, so the brand swap costs
   zero reference churn. The original is preserved in _quarantine/pre-rebrand/. */
const OUT = [
  ['www.voiceflow.com/images/logo.svg', svg(NAV)],
  [
    'mintcdn.com/voiceflow-009a8802/1vhxJ0GVX_3qkVnB/logo/Wordmark_dark.svg',
    svg(DOCS('#1A1E23')),
  ],
  [
    'mintcdn.com/voiceflow-009a8802/1vhxJ0GVX_3qkVnB/logo/Wordmark_white.svg',
    svg(DOCS('white')),
  ],
];

if (require.main === module) {
  const BACKUP = path.join(ROOT, '_quarantine', 'pre-rebrand');
  for (const [rel, body] of OUT) {
    const file = path.join(ROOT, rel);
    if (fs.existsSync(file)) {
      const dest = path.join(BACKUP, rel);
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        fs.copyFileSync(file, dest);
      }
    }
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, body + '\n');
    console.log('wrote', rel);
  }
}

module.exports = { markPath, svg, NAV, W, H, FONT };
