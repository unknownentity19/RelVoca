#!/usr/bin/env node
'use strict';

/**
 * serve-vercel.js — preview public/ the way Vercel will serve it.
 *
 * This is an *approximation* of Vercel's static routing, not Vercel. It exists
 * because the deployed tree is generated (555 pages renamed, 14 redirects, 9
 * rewrites, cleanUrls) and none of that is exercised by tools/serve.js, whose
 * resolution rules are completely different. Without this the first time anyone
 * finds out whether the build resolves is on a live deployment.
 *
 * Implements Vercel's documented request pipeline:
 *
 *   1. redirects        (from vercel.json)
 *   2. filesystem       (with cleanUrls / trailingSlash)
 *   3. rewrites         (from vercel.json)
 *   4. filesystem again (for the rewritten path)
 *   5. 404
 *
 * Headers from vercel.json are applied to whatever is served. Treat a green run
 * here as strong evidence, and a preview deployment as the actual proof.
 *
 *   node tools/serve-vercel.js          # http://localhost:8081
 *   PORT=9000 node tools/serve-vercel.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'public');
const CONFIG = JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf8'));
const PORT = Number(process.env.PORT) || 8081;

const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.md': 'text/plain; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.webp': 'image/webp',
  '.avif': 'image/avif', '.ico': 'image/x-icon', '.mp4': 'video/mp4',
  '.webm': 'video/webm', '.woff2': 'font/woff2', '.woff': 'font/woff',
  '.ttf': 'font/ttf',
};

/** Compile a Vercel `source` pattern (path-to-regexp subset) to a RegExp. */
function compile(source) {
  let re = '';
  let i = 0;
  const keys = [];
  while (i < source.length) {
    const ch = source[i];
    if (ch === ':') {
      const m = /^:([A-Za-z0-9_]+)(\*)?/.exec(source.slice(i));
      if (m) {
        keys.push(m[1]);
        re += m[2] ? '(.*)' : '([^/]+)';
        i += m[0].length;
        continue;
      }
    }
    if (ch === '(') {
      // Pass an explicit group through untouched, e.g. /(.*)
      const close = source.indexOf(')', i);
      if (close !== -1) {
        keys.push(String(keys.length));
        re += source.slice(i, close + 1);
        i = close + 1;
        continue;
      }
    }
    re += ch.replace(/[.*+?^${}|[\]\\]/g, '\\$&');
    i++;
  }
  return { re: new RegExp('^' + re + '$'), keys };
}

const compiled = (list = []) => list.map((r) => ({ ...r, ...compile(r.source) }));
const REDIRECTS = compiled(CONFIG.redirects);
const REWRITES = compiled(CONFIG.rewrites);
const HEADERS = compiled(CONFIG.headers);

/** Fill :name / :name* placeholders in a destination from a match. */
function expand(dest, rule, m) {
  let out = dest;
  rule.keys.forEach((k, idx) => {
    out = out.replace(new RegExp(':' + k + '\\*?', 'g'), m[idx + 1] || '');
  });
  return out;
}

function fileFor(urlPath) {
  const rel = decodeURIComponent(urlPath).replace(/^\/+/, '');
  if (rel.includes('..')) return null;
  const base = path.join(OUT, rel);
  if (!base.startsWith(OUT)) return null;

  const candidates = CONFIG.cleanUrls
    ? [base, base + '.html', path.join(base, 'index.html')]
    : [base, path.join(base, 'index.html')];

  for (const c of candidates) {
    try {
      if (fs.statSync(c).isFile()) return c;
    } catch {
      /* keep looking */
    }
  }
  return null;
}

function headersFor(urlPath) {
  const out = {};
  for (const rule of HEADERS) {
    if (!rule.re.test(urlPath)) continue;
    for (const h of rule.headers) out[h.key] = h.value;
  }
  return out;
}

http
  .createServer((req, res) => {
    const url = req.url.split('#')[0];
    const [pathname, query] = url.split('?');

    // trailingSlash: false — /foo/ redirects to /foo
    if (CONFIG.trailingSlash === false && pathname.length > 1 && pathname.endsWith('/')) {
      const to = pathname.replace(/\/+$/, '') + (query ? '?' + query : '');
      res.writeHead(308, { Location: to });
      return res.end();
    }

    // cleanUrls — /foo.html redirects to /foo
    if (CONFIG.cleanUrls && pathname.endsWith('.html')) {
      const to = pathname.slice(0, -'.html'.length) + (query ? '?' + query : '');
      res.writeHead(308, { Location: to });
      return res.end();
    }

    // 1. redirects
    for (const rule of REDIRECTS) {
      const m = rule.re.exec(pathname);
      if (!m) continue;
      res.writeHead(rule.permanent ? 308 : 307, {
        Location: expand(rule.destination, rule, m) + (query ? '?' + query : ''),
      });
      return res.end();
    }

    // 2. filesystem
    let file = fileFor(pathname);
    let served = pathname;

    // 3. rewrites, then 4. filesystem again
    if (!file) {
      for (const rule of REWRITES) {
        const m = rule.re.exec(pathname);
        if (!m) continue;
        const to = expand(rule.destination, rule, m);
        const f = fileFor(to);
        if (f) {
          file = f;
          served = to;
          break;
        }
      }
    }

    if (!file) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('404 ' + pathname);
    }

    const ext = path.extname(file).toLowerCase();
    const extra = headersFor(served);
    const type = extra['Content-Type'] || MIME[ext] || 'application/octet-stream';
    delete extra['Content-Type'];

    res.writeHead(200, {
      'Content-Type': type,
      'Content-Length': fs.statSync(file).size,
      ...extra,
    });
    fs.createReadStream(file).pipe(res);
  })
  .listen(PORT, () => {
    console.log(`vercel preview of public/ on http://localhost:${PORT}/`);
    console.log(
      `${REDIRECTS.length} redirects, ${REWRITES.length} rewrites, ` +
        `${HEADERS.length} header rules, cleanUrls=${!!CONFIG.cleanUrls}`
    );
  });
