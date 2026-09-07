#!/usr/bin/env node
'use strict';

/**
 * rebrand.js — rewrite the brand name Voiceflow -> RelVoca in *visible text only*.
 *
 * The mirror's paths are load-bearing (see tools/ROUTES.md). A brand rename that
 * touches a URL, a hashed asset name or a CSS token breaks references that the
 * server resolves by exact string. So this script never rewrites blindly: it
 * classifies every byte of an HTML file into text / tag / script / style and
 * only rewrites the regions a reader actually sees, and even there it refuses
 * any match that looks like part of an identifier or a hostname.
 *
 * Reversible: originals are copied to _quarantine/pre-rebrand/ before writing.
 *
 *   node tools/rebrand.js --dry     report what would change, write nothing
 *   node tools/rebrand.js           apply
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BACKUP = path.join(ROOT, '_quarantine', 'pre-rebrand');
const DRY = process.argv.includes('--dry');

/* Trees we rewrite. _quarantine is excluded everywhere — it holds backups, and
   rewriting a backup defeats its purpose. */
const TREES = ['www.voiceflow.com', 'mintcdn.com'];
const SKIP_DIRS = new Set(['_quarantine', 'node_modules', '.git']);

/* Attributes whose value is prose a reader can see. Deliberately excludes every
   URL-bearing attribute (href, src, action, data-*-href, srcset, ...). */
const PROSE_ATTRS = new Set([
  'title', 'alt', 'aria-label', 'aria-description', 'aria-placeholder',
  'placeholder', 'label', 'content', 'value', 'data-tooltip',
]);

/* ------------------------------------------------------------------ *
 * The guarded replacement
 * ------------------------------------------------------------------ */

const BRAND = /Voiceflow|voiceflow|VOICEFLOW|VoiceFlow/g;

const CASE_MAP = {
  Voiceflow: 'RelVoca',
  VoiceFlow: 'RelVoca',
  voiceflow: 'relvoca',
  VOICEFLOW: 'RELVOCA',
};

/**
 * Decide whether a Voiceflow match at `idx` in `s` is brand prose or part of a
 * machine-readable token. Rejecting is always the safe answer.
 */
function isGuarded(s, idx, match) {
  const before = s.slice(Math.max(0, idx - 24), idx);
  const after = s.slice(idx + match.length, idx + match.length + 24);

  // Hostname or domain: voiceflow.com, voiceflow.io, docs.voiceflow.com
  if (/^\.[a-z]/i.test(after)) return true;
  // Preceded by a subdomain dot: creator.voiceflow
  if (/[a-z0-9-]\.$/i.test(before)) return true;
  // Path segment: /voiceflow, voiceflow/
  if (/[/\\]$/.test(before)) return true;
  if (/^[/\\]/.test(after)) return true;
  // Hashed / slugged identifier: voiceflow-009a8802, vf-voiceflow_logo
  if (/^[-_][A-Za-z0-9]/.test(after)) return true;
  if (/[-_@]$/.test(before)) return true;
  // Part of a longer word: Voiceflows -> only 's is fine, anything else is not
  if (/^[A-Za-z0-9]/.test(after) && !/^s\b/.test(after)) return true;
  if (/[A-Za-z0-9]$/.test(before)) return true;

  return false;
}

function rewrite(s) {
  if (s.indexOf('oicef') === -1 && s.indexOf('OICEF') === -1) return s;
  let out = '';
  let last = 0;
  BRAND.lastIndex = 0;
  let m;
  while ((m = BRAND.exec(s)) !== null) {
    if (isGuarded(s, m.index, m[0])) continue;
    out += s.slice(last, m.index) + (CASE_MAP[m[0]] || 'RelVoca');
    last = m.index + m[0].length;
  }
  return last === 0 ? s : out + s.slice(last);
}

/* ------------------------------------------------------------------ *
 * HTML: rewrite text nodes and prose attributes only
 * ------------------------------------------------------------------ */

/** Rewrite the prose attributes inside one raw tag, e.g. `<img alt="..." src="...">`. */
function rewriteTag(tag) {
  return tag.replace(
    /([A-Za-z_:][-A-Za-z0-9_:.]*)\s*=\s*("([^"]*)"|'([^']*)')/g,
    (whole, name, _q, dq, sq) => {
      if (!PROSE_ATTRS.has(name.toLowerCase())) return whole;
      const raw = dq !== undefined ? dq : sq;
      // `content` doubles as a URL carrier on <meta property="og:url"> etc.
      if (/^(https?:)?\/\//.test(raw) || raw.includes('://')) return whole;
      const next = rewrite(raw);
      if (next === raw) return whole;
      const quote = dq !== undefined ? '"' : "'";
      return `${name}=${quote}${next}${quote}`;
    }
  );
}

/** JSON-LD: rewrite human-facing values, never @id / url / sameAs. */
const LD_PROSE_KEYS = new Set([
  'name', 'legalName', 'alternateName', 'description', 'headline',
  'articleSection', 'caption', 'jobTitle', 'brand', 'applicationCategory',
  'text', 'about', 'keywords', 'abstract',
]);

function rewriteJsonLd(src) {
  let data;
  try {
    data = JSON.parse(src);
  } catch {
    return src; // malformed LD is left exactly as captured
  }
  const walk = (node) => {
    if (Array.isArray(node)) return node.map(walk);
    if (node && typeof node === 'object') {
      const out = {};
      for (const [k, v] of Object.entries(node)) {
        out[k] = typeof v === 'string' && LD_PROSE_KEYS.has(k) ? rewrite(v) : walk(v);
      }
      return out;
    }
    return node;
  };
  return JSON.stringify(walk(data));
}

function rewriteHtml(src) {
  let out = '';
  let i = 0;

  while (i < src.length) {
    const lt = src.indexOf('<', i);
    if (lt === -1) {
      out += rewrite(src.slice(i));
      break;
    }

    out += rewrite(src.slice(i, lt)); // text node

    // Comment
    if (src.startsWith('<!--', lt)) {
      const end = src.indexOf('-->', lt);
      const stop = end === -1 ? src.length : end + 3;
      out += rewrite(src.slice(lt, stop));
      i = stop;
      continue;
    }

    const gt = src.indexOf('>', lt);
    if (gt === -1) {
      out += rewrite(src.slice(lt));
      break;
    }

    const tag = src.slice(lt, gt + 1);
    const nameMatch = /^<\s*\/?\s*([A-Za-z][-A-Za-z0-9]*)/.exec(tag);
    const tagName = nameMatch ? nameMatch[1].toLowerCase() : '';

    // Raw-text elements: content is not markup, handle each on its own terms.
    if ((tagName === 'script' || tagName === 'style') && !tag.startsWith('</')) {
      const close = new RegExp(`</\\s*${tagName}\\s*>`, 'i');
      const rest = src.slice(gt + 1);
      const cm = close.exec(rest);
      const body = cm ? rest.slice(0, cm.index) : rest;
      const closeTag = cm ? cm[0] : '';

      out += rewriteTag(tag);
      if (tagName === 'style') {
        out += body; // CSS carries tokens and class names, never brand prose
      } else if (/type\s*=\s*["']application\/ld\+json["']/i.test(tag)) {
        out += rewriteJsonLd(body);
      } else {
        out += rewrite(body); // guards keep hostnames and identifiers intact
      }
      out += closeTag;
      i = gt + 1 + body.length + closeTag.length;
      continue;
    }

    out += rewriteTag(tag);
    i = gt + 1;
  }

  return out;
}

/* ------------------------------------------------------------------ *
 * File walking
 * ------------------------------------------------------------------ */

const HTML_EXT = new Set(['.html', '.htm']);
const PLAIN_EXT = new Set(['.md', '.txt', '.xml', '.json', '.js', '.mdx']);

function looksLikeHtml(file) {
  const fd = fs.openSync(file, 'r');
  const buf = Buffer.alloc(600);
  const n = fs.readSync(fd, buf, 0, 600, 0);
  fs.closeSync(fd);
  const head = buf.slice(0, n).toString('utf8').toLowerCase();
  return head.includes('<!doctype html') || head.includes('<html') || head.includes('<head');
}

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (entry.isFile()) yield full;
  }
}

function backup(file) {
  const rel = path.relative(ROOT, file);
  const dest = path.join(BACKUP, rel);
  if (fs.existsSync(dest)) return; // first original wins; re-runs stay safe
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(file, dest);
}

function main() {
  let changed = 0;
  let scanned = 0;
  let replacements = 0;

  for (const tree of TREES) {
    const base = path.join(ROOT, tree);
    if (!fs.existsSync(base)) continue;

    for (const file of walk(base)) {
      const ext = path.extname(file).toLowerCase();
      const isHtmlExt = HTML_EXT.has(ext);
      const isPlain = PLAIN_EXT.has(ext);
      const isExtensionless = ext === '' || ext === '.svg';
      if (!isHtmlExt && !isPlain && !isExtensionless) continue;

      let src;
      try {
        src = fs.readFileSync(file, 'utf8');
      } catch {
        continue;
      }
      if (!/voiceflow/i.test(src)) continue;
      scanned++;

      const treatAsHtml = isHtmlExt || (isExtensionless && ext !== '.svg' && looksLikeHtml(file));
      const next = treatAsHtml ? rewriteHtml(src) : rewrite(src);
      if (next === src) continue;

      const before = (src.match(/voiceflow/gi) || []).length;
      const after = (next.match(/voiceflow/gi) || []).length;
      replacements += before - after;
      changed++;

      if (!DRY) {
        backup(file);
        fs.writeFileSync(file, next);
      }
    }
  }

  console.log(
    `${DRY ? '[dry-run] ' : ''}rebrand: ${changed} of ${scanned} candidate files ` +
      `changed, ${replacements} brand mentions rewritten`
  );
  if (!DRY) console.log(`originals backed up to ${path.relative(ROOT, BACKUP)}/`);
}

main();
