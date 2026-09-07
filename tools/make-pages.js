#!/usr/bin/env node
'use strict';

/**
 * make-pages.js — build the first-party RelVoca pages that replace what used to
 * live on external hosts (creator./status./trust.voiceflow.com).
 *
 * Each page is grafted onto a *donor* page already in the mirror rather than
 * written from scratch. The donor supplies the font @font-face blocks, the
 * stylesheet hash, the nav, the footer and the Astro scoping attributes — all
 * of which are captured artefacts nobody should be retyping. We replace only
 * <title>, the description/OG text, the canonical href and the <main> body.
 *
 * Donors:
 *   signup  — bare auth shell, no marketing chrome  -> /login, /dashboard
 *   privacy — full page with site nav + footer      -> /status, /trust
 *
 * Re-runnable: each build starts from the donor, so editing a page here and
 * re-running produces the same result as a clean build.
 *
 *   node tools/make-pages.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITE = path.join(ROOT, 'www.voiceflow.com');

const read = (p) => fs.readFileSync(path.join(SITE, p), 'utf8');

/** Swap the inner HTML of <main>. */
function setMain(doc, html) {
  const open = doc.match(/<main[^>]*>/);
  if (!open) throw new Error('donor has no <main>');
  const start = doc.indexOf(open[0]) + open[0].length;
  const end = doc.indexOf('</main>', start);
  if (end === -1) throw new Error('donor has no </main>');
  return doc.slice(0, start) + html + doc.slice(end);
}

/** Replace the head text that names the page. Never touches asset refs. */
function setMeta(doc, { title, description, slug }) {
  return doc
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(
      /(<meta name="description" content=")[^"]*(")/,
      `$1${description}$2`
    )
    .replace(
      /(<meta property="og:title" content=")[^"]*(")/,
      `$1${title}$2`
    )
    .replace(
      /(<meta property="og:description" content=")[^"]*(")/,
      `$1${description}$2`
    )
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${slug}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${slug}$2`)
    .replace(/(data-pathname=")[^"]*(")/, `$1/${slug}$2`)
    .replace(
      /(<vercel-speed-insights data-props="[^"]*" data-params=")[^"]*(")/,
      '$1{}$2'
    );
}

/** Append a stylesheet just before </head>. */
function addStyle(doc, css) {
  return doc.replace('</head>', `<style>${css}</style></head>`);
}

/**
 * Return the donor <style> block whose text contains `marker`.
 *
 * /signup ships its layout CSS *inside* <main> rather than in <head>, so
 * replacing the main content silently drops it. Pages that reuse that layout
 * lift the block out with this and re-emit it, keeping /signup the one source
 * for the shared .su rules.
 */
function donorStyleContaining(doc, marker) {
  const re = /<style[^>]*>([\s\S]*?)<\/style>/g;
  let m;
  while ((m = re.exec(doc)) !== null) {
    if (m[1].includes(marker)) return m[0];
  }
  throw new Error(`donor has no <style> containing ${marker}`);
}

/**
 * Append a script just before </body>.
 *
 * `attrs` marks the tag so stripOwnScripts() can find it again — pass
 * 'data-relvoca' on anything injected into a page we do not otherwise
 * regenerate, or re-running the build will stack duplicate copies.
 */
function addScript(doc, js, attrs) {
  const open = attrs ? `<script ${attrs}>` : '<script>';
  return doc.replace('</body>', `${open}${js}</script></body>`);
}

/**
 * Remove any script this project previously added to a document.
 *
 * /signup is both a page we patch *and* the donor for /login and /dashboard.
 * Without this, scripts injected into signup would be inherited by everything
 * built from it, and would accumulate one more copy on every build. Stripping
 * first makes each build produce the same output from any starting state.
 */
function stripOwnScripts(doc) {
  return doc
    .replace(/<script[^>]*src="[^"]*relvoca-[^"]*\.js"[^>]*>\s*<\/script>/g, '')
    .replace(/<script data-relvoca[^>]*>[\s\S]*?<\/script>/g, '');
}

function write(name, doc) {
  fs.writeFileSync(path.join(SITE, name), doc);
  console.log('wrote www.voiceflow.com/' + name);
}

module.exports = {
  read, setMain, setMeta, addStyle, addScript, donorStyleContaining,
  stripOwnScripts, write, SITE, ROOT,
};

if (require.main === module) {
  // signup first: it is the donor for login and dashboard, so it must be in
  // its final state (and stripped of stale injections) before they are built.
  require('./pages/signup.js')();
  require('./pages/login.js')();
  require('./pages/dashboard.js')();
  require('./pages/status.js')();
  require('./pages/trust.js')();
}
