#!/usr/bin/env node
'use strict';

/**
 * delink.js — point RelVoca's own product links at RelVoca's own pages.
 *
 * The capture sends visitors off to creator./docs./status./trust./link.
 * voiceflow.com. Each of those now has a local equivalent, so the links are
 * rewritten to it.
 *
 * Two rules keep this honest:
 *
 *  1. Every rewritten target is resolved against disk using the same algorithm
 *     tools/serve.js uses (exact -> .html -> /index.html, mirror root then
 *     project root). A mapping that would not resolve falls back to a page that
 *     does, so no rewrite can invent a broken reference. Legacy docs URLs like
 *     /docs/javascript-step have no local page at all and land on the docs
 *     index rather than a 404.
 *
 *  2. The five media.voiceflow.com videos are pointed at local copies, which
 *     `node tools/fetch-media.js` downloads first (7.2 MB). If they are not on
 *     disk the source falls back to the remote origin rather than a dead local
 *     path, because the alternative is a card that renders nothing.
 *
 * Third-party links (YouTube, GitHub, integration vendors) are left alone.
 *
 *   node tools/delink.js --dry
 *   node tools/delink.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITE = path.join(ROOT, 'www.voiceflow.com');
const BACKUP = path.join(ROOT, '_quarantine', 'pre-rebrand');
const DRY = process.argv.includes('--dry');
const SKIP_DIRS = new Set(['_quarantine', 'node_modules', '.git']);

const DOCS_INDEX = '/docs/documentation/introduction';

/* ------------------------------------------------------------------ *
 * Does a URL path resolve to a file? (mirrors tools/serve.js)
 * ------------------------------------------------------------------ */

const resolveCache = new Map();

function resolves(urlPath) {
  const clean = urlPath.split(/[?#]/)[0];
  if (resolveCache.has(clean)) return resolveCache.get(clean);

  const rel = clean.replace(/^\/+/, '');
  let ok = false;
  for (const base of [SITE, ROOT]) {
    for (const cand of [rel, rel + '.html', path.join(rel, 'index.html')]) {
      const full = path.join(base, cand);
      if (full.startsWith(base) && fs.existsSync(full) && fs.statSync(full).isFile()) {
        ok = true;
        break;
      }
    }
    if (ok) break;
  }
  resolveCache.set(clean, ok);
  return ok;
}

/** Use `to` when it resolves, otherwise `fallback`. Preserves ?query#hash. */
function safeTarget(to, fallback) {
  const [, qs = ''] = to.match(/^[^?#]*([?#].*)?$/) || [];
  return resolves(to) ? to : fallback + qs;
}

/* ------------------------------------------------------------------ *
 * Host mappings
 * ------------------------------------------------------------------ */

/** Each entry: a host regex and a function turning the captured path into a local one. */
const HOSTS = [
  {
    // creator.voiceflow.com — the product itself
    re: /https?:\/\/creator\.voiceflow\.com(\/[^\s"'`<>)\\]*)?/g,
    map(p) {
      if (!p || p === '/') return '/dashboard';
      if (p.startsWith('/login')) return '/login' + p.slice('/login'.length);
      if (p.startsWith('/signup')) return '/signup' + p.slice('/signup'.length);
      if (p.startsWith('/dashboard')) return '/dashboard' + p.slice('/dashboard'.length);
      return '/dashboard'; // /project/{id}, /prototype/... — no local equivalent
    },
  },
  {
    // docs.voiceflow.com — already mirrored under /docs
    re: /https?:\/\/docs\.voiceflow\.com(\/[^\s"'`<>)\\]*)?/g,
    map(p) {
      if (!p || p === '/') return DOCS_INDEX;
      return safeTarget('/docs' + p, DOCS_INDEX);
    },
  },
  {
    // link.voiceflow.com — shortener into the docs
    re: /https?:\/\/link\.voiceflow\.com(\/[^\s"'`<>)\\]*)?/g,
    map(p) {
      const SHORT = {
        '/transcript-api': '/docs/documentation/measure/transcripts',
        '/evals-api': '/docs/documentation/measure/evaluations',
      };
      return safeTarget(SHORT[p] || DOCS_INDEX, DOCS_INDEX);
    },
  },
  {
    re: /https?:\/\/status\.voiceflow\.com(\/[^\s"'`<>)\\]*)?/g,
    map: () => '/status',
  },
  {
    re: /https?:\/\/trust\.voiceflow\.com(\/[^\s"'`<>)\\]*)?/g,
    map: () => '/trust',
  },
];

/**
 * Lazy <source data-src="https://media.voiceflow.com/..."> -> the local copy.
 *
 * Matches the already-rewritten `data-src-uncaptured` form too, so a re-run
 * repairs a tree left in the old state. That state was a bug: an earlier
 * version renamed the attribute on the theory that a missing local file was
 * worse than a remote one, which overlooked the IntersectionObserver inlined in
 * index.html. It promotes `source[data-src]` to `src`; with the attribute
 * renamed there was nothing to promote, so the Build / Launch / Iterate cards
 * showed nothing. `node tools/fetch-media.js` puts the files on disk.
 */
const MEDIA_RE =
  /\bdata-src(?:-uncaptured)?="(?:https?:\/\/media\.voiceflow\.com\/|media\/)([^"]*)"/g;

/** Map one external product URL to its local path, or null if not ours. */
function mapUrl(url) {
  for (const { re, map } of HOSTS) {
    re.lastIndex = 0;
    const m = re.exec(url);
    if (m && m[0] === url) return map(m[1] || '');
  }
  return null;
}

/**
 * Rewrite anchors that point at our own product hosts, as whole tags.
 *
 * Done tag-at-a-time rather than as a blanket cleanup so that only the links
 * this script actually redirects lose their target/rel — an anchor that was
 * already internal and deliberately opened in a new tab (the signup page's
 * Terms link, for one) keeps that behaviour.
 */
function rewriteAnchors(src) {
  return src.replace(/<a\s[^>]*>/g, (tag) => {
    const href = tag.match(/\bhref="([^"]*)"/);
    if (!href) return tag;
    const to = mapUrl(href[1]);
    if (to === null) return tag;

    stats.links++;
    stats.anchors++;
    return tag
      .replace(/\bhref="[^"]*"/, `href="${to}"`)
      .replace(/\s*target="_blank"/, '')
      .replace(/\s*rel="(noreferrer|noopener)( (noreferrer|noopener))?"/, '');
  });
}

/* ------------------------------------------------------------------ *
 * Apply
 * ------------------------------------------------------------------ */

const stats = { links: 0, media: 0, prefetch: 0, anchors: 0, files: 0 };

function transform(src) {
  // Anchors first, as whole tags, so target/rel are only stripped from links
  // this script redirects.
  let out = rewriteAnchors(src);

  // Then every remaining occurrence: meta tags, JSON-LD, JS strings, markdown.
  for (const { re, map } of HOSTS) {
    out = out.replace(re, (whole, p) => {
      stats.links++;
      return map(p || '');
    });
  }

  out = out.replace(MEDIA_RE, (whole, p) => {
    stats.media++;
    // Only claim a local file that is actually there. If fetch-media.js has not
    // been run, fall back to the remote origin: a working external video beats
    // a card that renders nothing.
    const local = `media/${p}`;
    return resolves('/' + local)
      ? `data-src="${local}"`
      : `data-src="https://media.voiceflow.com/${p}"`;
  });

  const beforePrefetch = out;
  out = out.replace(
    /<link[^>]*rel="dns-prefetch"[^>]*(creator|docs|status|trust|media)\.voiceflow\.com[^>]*>/g,
    ''
  );
  if (out !== beforePrefetch) stats.prefetch++;

  return out;
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

const TEXT_EXT = new Set(['.html', '.htm', '.md', '.mdx', '.txt', '.xml', '.json', '.js', '']);

for (const file of walk(SITE)) {
  const ext = path.extname(file).toLowerCase();
  if (!TEXT_EXT.has(ext)) continue;

  let src;
  try {
    src = fs.readFileSync(file, 'utf8');
  } catch {
    continue;
  }
  // `data-src-uncaptured` is in the gate so a tree left in the old, broken
  // state is still picked up — by then the host name is already gone.
  if (
    !/(creator|docs|status|trust|link|media)\.voiceflow\.com/.test(src) &&
    !src.includes('data-src-uncaptured')
  ) {
    continue;
  }

  const out = transform(src);
  if (out === src) continue;
  stats.files++;
  if (!DRY) {
    backup(file);
    fs.writeFileSync(file, out);
  }
}

console.log(
  `${DRY ? '[dry-run] ' : ''}delink: ${stats.links} product links rewritten, ` +
    `${stats.media} lazy video sources pointed at local files, ` +
    `${stats.prefetch} dns-prefetch hints dropped, ` +
    `${stats.anchors} of them anchors, across ${stats.files} files`
);
