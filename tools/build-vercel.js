#!/usr/bin/env node
'use strict';

/**
 * build-vercel.js — turn the mirror into a directory Vercel can serve statically.
 *
 * tools/serve.js resolves a URL with logic Vercel has no equivalent for: three
 * roots (mirror, project, mirror/docs), three candidates each (exact, +.html,
 * /index.html), MIME sniffing for extensionless files, and 302s for section
 * roots the crawl never stored an index for. This script collapses all of that
 * into a plain tree plus a small vercel.json, so the deployed site resolves the
 * same URLs the local server does.
 *
 * How each piece of serve.js is reproduced:
 *
 *   two roots        -> one flat tree. Project-root host dirs (mintcdn.com,
 *                       fonts.*, app/, ...) are copied first, the mirror second,
 *                       so the mirror shadows the project root exactly as
 *                       serve.js's base order does.
 *   `+.html`         -> `cleanUrls: true`. Extensionless HTML pages are written
 *                       as `<name>.html` and the extensionless original is NOT
 *                       copied, so there is no ambiguity about which file a URL
 *                       maps to.
 *   MIME sniffing    -> extensionless *non*-HTML files keep their name and get
 *                       an explicit Content-Type header in vercel.json.
 *   /docs fallback   -> rewrites for the docs app's prefix-less links.
 *   landing 302s     -> computed here and emitted as vercel.json redirects.
 *
 * Nothing is moved to a different directory depth: `<name>.html` is written
 * beside `<name>`, which is the same repair tools/ROUTES.md already sanctions.
 *
 *   node tools/build-vercel.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITE = path.join(ROOT, 'www.voiceflow.com');
const OUT = path.join(ROOT, 'public');

/* Project-root entries that belong in the deployment. Everything else at the
   root (tools/, _quarantine/, README, package.json, .claude) is build-time or
   backup material and must not ship. */
const ROOT_INCLUDE = [
  'app',
  'mintcdn.com',
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'js.hsforms.net',
  'prod-assets.sequelvideo.com',
  'www.googletagmanager.com',
  'd3gk2c5xim1je2.cloudfront.net',
  'backblue.gif',
  'fade.gif',
];

/* `/_vercel/*` is reserved by the platform (Speed Insights, Web Analytics), so
   anything we upload there is shadowed and never served. The mirror's offline
   stub for it exists only so the local server does not 404; on Vercel the real
   endpoint answers, or the request 404s harmlessly. Shipping our stub into a
   reserved namespace can only cause confusion, so it stays out of the build. */
const OMIT_FROM_OUTPUT = new Set(['_vercel']);

/* Mirrors serve.js: an extensionless file is a page if it opens like one. */
function looksLikeHtml(file) {
  let fd;
  try {
    fd = fs.openSync(file, 'r');
    const buf = Buffer.alloc(512);
    const n = fs.readSync(fd, buf, 0, 512, 0);
    return /<!doctype html|<html|<head|<meta/i.test(buf.slice(0, n).toString('utf8'));
  } catch {
    return false;
  } finally {
    if (fd !== undefined) fs.closeSync(fd);
  }
}

const stats = { pages: 0, assets: 0, extlessOther: [], bytes: 0 };

function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  stats.bytes += fs.statSync(src).size;
}

/**
 * Copy a tree into OUT. `renameExtensionless` is on only for the mirror: its
 * extensionless files are pages the origin served at that URL, and cleanUrls
 * needs them to carry a .html extension.
 */
function copyTree(srcDir, destDir, renameExtensionless) {
  for (const e of fs.readdirSync(srcDir, { withFileTypes: true })) {
    if (destDir === OUT && OMIT_FROM_OUTPUT.has(e.name)) continue;
    const src = path.join(srcDir, e.name);
    const dest = path.join(destDir, e.name);
    if (e.isDirectory()) {
      copyTree(src, dest, renameExtensionless);
      continue;
    }
    if (!e.isFile()) continue;

    if (renameExtensionless && path.extname(e.name) === '') {
      if (looksLikeHtml(src)) {
        // Written as <name>.html only; cleanUrls serves it at /<name>.
        copyFile(src, dest + '.html');
        stats.pages++;
        continue;
      }
      // Not a page: keep the name, but it will need an explicit Content-Type.
      stats.extlessOther.push(
        path.relative(OUT, dest).split(path.sep).join('/')
      );
    }
    copyFile(src, dest);
    stats.assets++;
  }
}

/* ------------------------------------------------------------------ *
 * Section-root redirects (serve.js landingRedirect)
 * ------------------------------------------------------------------ */

const SECTION_LANDING = { docs: 'documentation/introduction.html' };
const LANDING_NAMES = [
  'index.html',
  'introduction.html',
  'overview.html',
  'home.html',
  'quickstart.html',
];

/**
 * Find directories that answer no URL of their own and would 404, and give each
 * a redirect to its landing page's real URL.
 *
 * serve.js redirects rather than serving the landing file in place because a
 * mirror page's relative refs (../_next/...) assume its own directory depth.
 * Serving docs/documentation/introduction.html at /docs would resolve every one
 * of those against / and 404 them all.
 */
function landingRedirects() {
  const out = [];
  (function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (!e.isDirectory()) continue;
      const full = path.join(dir, e.name);
      walk(full);

      const rel = path.relative(OUT, full).split(path.sep).join('/');
      // A directory that already has its own page needs nothing.
      if (fs.existsSync(path.join(full, 'index.html'))) continue;
      if (fs.existsSync(full + '.html')) continue;

      const mapped = SECTION_LANDING[rel];
      const names = mapped
        ? [mapped, ...LANDING_NAMES]
        : [e.name + '.html', ...LANDING_NAMES];

      for (const n of names) {
        if (!fs.existsSync(path.join(full, n))) continue;
        out.push({
          source: '/' + rel,
          destination: ('/' + rel + '/' + n.replace(/\.html$/, '')).replace(/\/+/g, '/'),
          permanent: false,
        });
        break;
      }
    }
  })(OUT);
  return out.sort((a, b) => a.source.localeCompare(b.source));
}

/* ------------------------------------------------------------------ *
 * Build
 * ------------------------------------------------------------------ */

function rmrf(p) {
  if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true });
}

console.log('build-vercel: cleaning public/');
rmrf(OUT);
fs.mkdirSync(OUT, { recursive: true });

// Project root first, so the mirror can shadow it (serve.js base order).
console.log('build-vercel: copying sibling host dirs');
for (const name of ROOT_INCLUDE) {
  const src = path.join(ROOT, name);
  if (!fs.existsSync(src)) continue;
  const st = fs.statSync(src);
  if (st.isDirectory()) copyTree(src, path.join(OUT, name), false);
  else copyFile(src, path.join(OUT, name));
}

console.log('build-vercel: copying mirror');
copyTree(SITE, OUT, true);

/*
 * The docs app emits some links without its /docs mount prefix
 * (href="/api-reference/..."), which serve.js handles with a third resolution
 * base. On Vercel that becomes one rewrite per docs section.
 *
 * A section whose name also exists at the output root is skipped. /images is
 * the one that matters: the main site has 347 MB under it, and a
 * /images/:path* -> /docs/images/:path* rewrite would sit in front of all of
 * it. Vercel does check the filesystem before applying rewrites, so it would
 * probably be harmless — but "probably" is not a good enough reason to put a
 * rewrite in front of a third of the deployment, and no docs page actually
 * emits a prefix-less /images ref. Skipping collisions reproduces serve.js's
 * precedence (mirror root wins, docs is only the fallback) without depending
 * on that ordering at all.
 */
const docsSections = fs
  .readdirSync(path.join(OUT, 'docs'), { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name)
  .filter((name) => !fs.existsSync(path.join(OUT, name)))
  .sort();

const redirects = landingRedirects();

const headers = [
  {
    // Default: keep the deployment out of search results. This tree is a
    // rebranded copy of a third-party site, and it carries real people's
    // testimonials; indexing it is not wanted. Remove deliberately, not by
    // accident.
    source: '/(.*)',
    headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
  },
];

// Extensionless files that are not pages. Served as application/octet-stream
// otherwise, which makes a browser download them instead of reading them.
// One entry each: a `:path(a|b)` group cannot match across `/`, so a combined
// pattern would silently match nothing.
for (const p of stats.extlessOther) {
  headers.push({
    source: '/' + p,
    headers: [{ key: 'Content-Type', value: 'application/json; charset=utf-8' }],
  });
}

// Content-hashed asset directories can be cached hard; everything else mildly.
headers.push(
  {
    source: '/_astro/(.*)',
    headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
  },
  {
    source: '/docs/_next/(.*)',
    headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
  },
  {
    source: '/mintcdn.com/(.*)',
    headers: [{ key: 'Cache-Control', value: 'public, max-age=604800' }],
  },
  {
    source: '/images/(.*)',
    headers: [{ key: 'Cache-Control', value: 'public, max-age=86400' }],
  }
);

/* Belt and braces with the X-Robots-Tag header: a header covers responses, a
   robots.txt covers crawlers that ask before fetching. Both are trivial to
   remove, and removing them should be a decision rather than an oversight. */
fs.writeFileSync(
  path.join(OUT, 'robots.txt'),
  'User-agent: *\nDisallow: /\n'
);

const config = {
  $schema: 'https://openapi.vercel.sh/vercel.json',
  // No framework detection and no build step: public/ is the finished site,
  // and .vercelignore uploads only that. Note the npm script is deliberately
  // named `build:vercel`, not `build` — Vercel runs a `build` script when it
  // finds one, which would fail here because tools/ is never uploaded.
  framework: null,
  outputDirectory: 'public',
  cleanUrls: true,
  trailingSlash: false,
  redirects,
  rewrites: docsSections.map((s) => ({
    source: `/${s}/:path*`,
    destination: `/docs/${s}/:path*`,
  })),
  headers,
};

fs.writeFileSync(path.join(ROOT, 'vercel.json'), JSON.stringify(config, null, 2) + '\n');

console.log(
  `build-vercel: ${stats.pages} pages written as .html, ${stats.assets} assets, ` +
    `${(stats.bytes / 1e6).toFixed(0)} MB`
);
console.log(
  `build-vercel: ${redirects.length} section redirects, ` +
    `${config.rewrites.length} docs rewrites, ` +
    `${stats.extlessOther.length} extensionless non-page files`
);
if (stats.extlessOther.length) {
  for (const p of stats.extlessOther.slice(0, 10)) console.log('    ' + p);
}
console.log('build-vercel: wrote vercel.json');
