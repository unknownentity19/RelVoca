#!/usr/bin/env node
'use strict';

/**
 * make-favicon.js — render the RelVoca mark to favicon.png and webclip.png.
 *
 * This machine has no SVG rasteriser (no rsvg-convert, ImageMagick, Inkscape or
 * PIL), and the mark is three stadiums inside a rounded square, so it is cheaper
 * to rasterise the geometry directly than to add a dependency. Coverage is
 * supersampled 4x4 per pixel for antialiasing, then encoded as RGBA PNG with
 * node's built-in zlib.
 *
 * Both files are overwritten in place so no reference changes; originals go to
 * _quarantine/pre-rebrand/.
 *
 *   node tools/make-favicon.js
 */

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const ROOT = path.resolve(__dirname, '..');
const SITE = path.join(ROOT, 'www.voiceflow.com');
const BACKUP = path.join(ROOT, '_quarantine', 'pre-rebrand');

/* Brand accent (the login button's blue) with white bars: legible against both
   light and dark browser chrome, unlike a dark-on-dark badge. */
const BG = [0x39, 0x7d, 0xff];
const FG = [0xff, 0xff, 0xff];

/* Geometry in the logo's own 23-unit square, normalised at render time. */
const U = 23;
const RADIUS = 6.4;
const BARS = [
  { cx: 6.9, top: 8.3, bottom: 14.7, r: 1.35 },
  { cx: 11.5, top: 5.4, bottom: 17.6, r: 1.35 },
  { cx: 16.1, top: 7.4, bottom: 15.6, r: 1.35 },
];

function inRoundedSquare(x, y) {
  const r = RADIUS;
  const cx = Math.min(Math.max(x, r), U - r);
  const cy = Math.min(Math.max(y, r), U - r);
  const dx = x - cx;
  const dy = y - cy;
  return dx * dx + dy * dy <= r * r;
}

function inBar(x, y, b) {
  const cy = Math.min(Math.max(y, b.top + b.r), b.bottom - b.r);
  const dx = x - b.cx;
  const dy = y - cy;
  return dx * dx + dy * dy <= b.r * b.r;
}

/** RGBA pixel rows for an n x n icon. */
function render(n) {
  const SS = 4; // supersampling factor per axis
  const rows = [];
  for (let py = 0; py < n; py++) {
    const row = Buffer.alloc(n * 4);
    for (let px = 0; px < n; px++) {
      let inside = 0;
      let bar = 0;
      for (let sy = 0; sy < SS; sy++) {
        for (let sx = 0; sx < SS; sx++) {
          const x = ((px + (sx + 0.5) / SS) / n) * U;
          const y = ((py + (sy + 0.5) / SS) / n) * U;
          if (!inRoundedSquare(x, y)) continue;
          inside++;
          if (BARS.some((b) => inBar(x, y, b))) bar++;
        }
      }
      const total = SS * SS;
      const alpha = inside / total;
      const barFrac = inside ? bar / inside : 0;
      const o = px * 4;
      for (let c = 0; c < 3; c++) {
        row[o + c] = Math.round(BG[c] * (1 - barFrac) + FG[c] * barFrac);
      }
      row[o + 3] = Math.round(alpha * 255);
    }
    rows.push(row);
  }
  return rows;
}

/* ---------------- minimal RGBA PNG encoder ---------------- */

const CRC_TABLE = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

function encodePng(rows, n) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(n, 0);
  ihdr.writeUInt32BE(n, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // colour type: RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  // Each scanline is prefixed with filter type 0 (None).
  const raw = Buffer.concat(rows.map((r) => Buffer.concat([Buffer.from([0]), r])));

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

/* ---------------- write ---------------- */

function writeIcon(rel, size) {
  const file = path.join(SITE, rel);
  if (fs.existsSync(file)) {
    const dest = path.join(BACKUP, path.relative(ROOT, file));
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.copyFileSync(file, dest);
    }
  }
  const png = encodePng(render(size), size);
  fs.writeFileSync(file, png);
  console.log(`wrote www.voiceflow.com/${rel}  ${size}x${size}  ${png.length} bytes`);
}

writeIcon('favicon.png', 256);
writeIcon('webclip.png', 512);
