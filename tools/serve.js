#!/usr/bin/env node
/**
 * Local static server for the voiceflow.com HTTrack mirror.
 *
 * The mirror stores pages the way the origin served them: extensionless
 * (`/pricing`, `/about`). Node's default MIME guessing would send those as
 * octet-stream and the browser would download instead of render, so we sniff
 * content and force text/html. Serving from the mirror root also makes the
 * 2,636 root-relative refs (`/demo`, `/images/...`) resolve without rewriting
 * a single file.
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

// Serve the primary host as the web root, but keep the whole project reachable:
// pages reference sibling host mirrors (mintcdn.com, js.hsforms.net, ...) via
// '../mintcdn.com/...', which a browser normalises to '/mintcdn.com/...'.
const PROJECT = process.argv[3] || path.join(__dirname, '..');
const ROOT = process.argv[2] || path.join(PROJECT, 'www.voiceflow.com');
const PORT = Number(process.env.PORT) || 8080;

const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.md': 'text/plain; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.webp': 'image/webp',
  '.avif': 'image/avif', '.ico': 'image/x-icon', '.mp4': 'video/mp4',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf',
};

// An extensionless mirror file is HTML if it opens like a document.
function looksLikeHtml(file) {
  let fd;
  try {
    fd = fs.openSync(file, 'r');
    const buf = Buffer.alloc(512);
    const n = fs.readSync(fd, buf, 0, 512, 0);
    return /<!doctype html|<html|<head|<meta/i.test(buf.slice(0, n).toString('utf8'));
  } catch { return false; } finally { if (fd !== undefined) fs.closeSync(fd); }
}

function contentType(file) {
  const ext = path.extname(file).toLowerCase();
  if (MIME[ext]) return MIME[ext];
  if (!ext && looksLikeHtml(file)) return MIME['.html'];
  return 'application/octet-stream';
}

// Section roots the origin redirected to a first page. The /docs subsite is a
// Mintlify (Next.js) app: `/docs` served the first nav entry, and HTTrack only
// ever stored that entry, never an index for the section directory itself.
// Keyed by mirror-relative dir; value is the landing file inside it.
const SECTION_LANDING = {
  'docs': 'documentation/introduction.html',
};

// Names a directory's landing page went by, in the order the origin preferred.
// `<dirname>.html` covers the Mintlify pattern (`changelog/changelog.html`).
const LANDING_NAMES = ['index.html', 'introduction.html', 'overview.html',
                       'home.html', 'quickstart.html'];

// Resolve a URL path to a file, mirroring origin behaviour: exact match first,
// then `<name>.html`, then `<dir>/index.html`.
function resolve(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0].split('#')[0]);
  // Try the mirror root first, then the project root so sibling host dirs resolve.
  // The mirrored docs app emits some links without its /docs mount prefix
  // (href="/api-reference/..."), so fall back to serving them from under /docs.
  const bases = [ROOT, PROJECT, path.join(ROOT, 'docs')];
  for (const base of bases) {
    const target = path.normalize(path.join(base, clean));
    if (!target.startsWith(PROJECT)) continue;   // path traversal guard
    for (const cand of [target, target + '.html', path.join(target, 'index.html')]) {
      try { if (fs.statSync(cand).isFile()) return cand; } catch {}
    }
  }
  return null;
}

// Last-resort landing lookup for a URL that named a real directory holding no
// index.html, e.g. `/docs` or `/docs/changelog`.
//
// This REDIRECTS rather than serving the landing file in place. A mirror page's
// relative refs (`../_next/...`) assume its original directory depth, so serving
// `docs/documentation/introduction.html` at `/docs` would resolve its assets
// against `/` and 404 every one of them. Redirecting puts the browser on the
// page's real URL, where those refs resolve exactly as the crawl recorded them.
//
// Purely additive: consulted only after resolve() has missed, so it can turn a
// 404 into a redirect but never change a URL that already worked.
function landingRedirect(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0].split('#')[0]);
  // The mirrored docs app emits some links without its /docs mount prefix
  // (href="/api-reference/..."), so fall back to serving them from under /docs.
  const bases = [ROOT, PROJECT, path.join(ROOT, 'docs')];
  for (const base of bases) {
    const target = path.normalize(path.join(base, clean));
    if (!target.startsWith(PROJECT)) continue;   // path traversal guard
    try { if (!fs.statSync(target).isDirectory()) continue; } catch { continue; }
    const rel = path.relative(ROOT, target).split(path.sep).join('/');
    const mapped = SECTION_LANDING[rel];
    const names = mapped ? [mapped, ...LANDING_NAMES]
                         : [path.basename(target) + '.html', ...LANDING_NAMES];
    for (const n of names) {
      try { if (!fs.statSync(path.join(target, n)).isFile()) continue; } catch { continue; }
      // Hand back the extensionless URL the mirror serves that page at.
      const dir = clean.replace(/\/+$/, '');
      return (dir + '/' + n.replace(/\.html$/, '')).replace(/\/+/g, '/');
    }
  }
  return null;
}

/**
 * Outbound-navigation guard.
 *
 * The mirror is riddled with links to the live internet: ~1,215 Login/Get-started
 * links to creator.voiceflow.com, status/trust pages, social icons, and several
 * thousand editorial citations inside article bodies. Clicking one silently
 * leaves the archive, which defeats the point of having one.
 *
 * Deleting them would damage the captured content, so instead this script is
 * injected into every HTML response and intercepts the navigation, showing what
 * the link was and letting the reader decide. No mirror file is modified.
 */
const GUARD = `
<style id="vfa-guard-style">
.vfa-veil{position:fixed;inset:0;z-index:2147483647;display:none;place-items:center;
  background:rgba(9,14,17,.62);backdrop-filter:blur(2px);font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif}
.vfa-veil[data-open="1"]{display:grid}
.vfa-card{background:#fff;color:#101a1d;max-width:480px;width:calc(100% - 40px);
  border-radius:12px;box-shadow:0 24px 60px -12px rgba(0,0,0,.5);overflow:hidden}
.vfa-hd{padding:16px 20px 12px;border-bottom:1px solid #e2e8ea}
.vfa-hd b{display:block;font-size:15px;margin-bottom:3px}
.vfa-hd span{font-size:12.5px;color:#5a7077;line-height:1.5}
.vfa-url{padding:12px 20px;font:12px/1.5 ui-monospace,SFMono-Regular,Menlo,monospace;
  color:#0e7c86;word-break:break-all;background:#f4f7f8;max-height:110px;overflow:auto}
.vfa-ft{padding:12px 20px 16px;display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap}
.vfa-b{border:1px solid #c6d2d6;background:#fff;color:#101a1d;padding:7px 13px;
  border-radius:6px;font-size:13px;cursor:pointer;font-weight:500}
.vfa-b:hover{background:#eef3f4}
.vfa-b.p{background:#0e7c86;border-color:#0e7c86;color:#fff}
@media (prefers-color-scheme:dark){
  .vfa-card{background:#161d20;color:#e8eff0}
  .vfa-hd{border-color:#2a383d} .vfa-hd span{color:#93a8ae}
  .vfa-url{background:#0e1416;color:#2aa5af}
  .vfa-b{background:#1e272b;border-color:#3a4b51;color:#e8eff0}
  .vfa-b:hover{background:#263338}
  .vfa-b.p{background:#2aa5af;border-color:#2aa5af;color:#04191b}
}
</style>
<div class="vfa-veil" id="vfa-veil" role="dialog" aria-modal="true" aria-labelledby="vfa-t">
  <div class="vfa-card">
    <div class="vfa-hd">
      <b id="vfa-t">This link leaves the archive</b>
      <span>You are browsing an offline copy. This points at the live internet, not at mirrored content.</span>
    </div>
    <div class="vfa-url" id="vfa-url"></div>
    <div class="vfa-ft">
      <button class="vfa-b" id="vfa-copy">Copy link</button>
      <button class="vfa-b" id="vfa-go">Open anyway</button>
      <button class="vfa-b p" id="vfa-stay">Stay in archive</button>
    </div>
  </div>
</div>
<script>
(function(){
  var veil=document.getElementById('vfa-veil'), out=document.getElementById('vfa-url'), href='';
  function isExternal(u){ try{ var x=new URL(u,location.href);
    return (x.protocol==='http:'||x.protocol==='https:') && x.host!==location.host; }catch(e){ return false; } }
  function open_(u){ href=u; out.textContent=u; veil.setAttribute('data-open','1');
    document.getElementById('vfa-stay').focus(); }
  function close_(){ veil.removeAttribute('data-open'); href=''; }
  document.getElementById('vfa-stay').onclick=close_;
  document.getElementById('vfa-go').onclick=function(){ var u=href; close_(); window.open(u,'_blank','noopener'); };
  document.getElementById('vfa-copy').onclick=function(){ try{ navigator.clipboard.writeText(href); }catch(e){}
    this.textContent='Copied'; var b=this; setTimeout(function(){ b.textContent='Copy link'; },1200); };
  veil.addEventListener('click',function(e){ if(e.target===veil) close_(); });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&veil.getAttribute('data-open')) close_(); });

  function onClick(e){
    var a=e.target && e.target.closest && e.target.closest('a[href]');
    if(!a) return;
    var raw=a.getAttribute('href')||'';
    if(!isExternal(raw)) return;
    e.preventDefault(); e.stopPropagation();
    open_(new URL(raw,location.href).href);
  }
  document.addEventListener('click',onClick,true);
  document.addEventListener('auxclick',onClick,true);

  // Script-driven escapes take the same path.
  var _open=window.open;
  window.open=function(u){ if(u&&isExternal(u)){ open_(new URL(u,location.href).href); return null; }
    return _open.apply(window,arguments); };
  document.addEventListener('submit',function(e){
    var f=e.target; if(f&&f.action&&isExternal(f.action)){ e.preventDefault(); open_(new URL(f.action,location.href).href); }
  },true);
})();
</script>`;

const missing = new Map();

http.createServer((req, res) => {
  const file = resolve(req.url);
  if (!file) {
    // A section root the crawl never stored an index for: send the browser to
    // the landing page's own URL so its depth-sensitive relative refs resolve.
    const to = landingRedirect(req.url);
    if (to) {
      res.writeHead(302, { Location: to, 'Cache-Control': 'no-cache' });
      return res.end();
    }
    const key = req.url.split('?')[0];
    missing.set(key, (missing.get(key) || 0) + 1);
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    return res.end('404 ' + key);
  }
  const stat = fs.statSync(file);
  const type = contentType(file);

  // HTML gets the outbound-navigation guard appended before it is served.
  if (type.startsWith('text/html')) {
    let html = fs.readFileSync(file, 'utf8');
    html += GUARD;
    const buf = Buffer.from(html, 'utf8');
    res.writeHead(200, {
      'Content-Type': type,
      'Content-Length': buf.length,
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
    });
    return res.end(buf);
  }

  res.writeHead(200, {
    'Content-Type': type,
    'Content-Length': stat.size,
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*',
  });
  fs.createReadStream(file).pipe(res);
}).listen(PORT, () => {
  console.log(`mirror: ${ROOT}`);
  console.log(`project: ${PROJECT} (sibling host dirs reachable)`);
  console.log(`serving on http://localhost:${PORT}/`);
});

// Dump the 404 tally on exit so we learn exactly which assets the crawl missed.
for (const sig of ['SIGINT', 'SIGTERM']) {
  process.on(sig, () => {
    const rows = [...missing.entries()].sort((a, b) => b[1] - a[1]);
    if (rows.length) {
      console.log(`\n--- ${rows.length} distinct 404s ---`);
      for (const [u, n] of rows.slice(0, 200)) console.log(`${String(n).padStart(4)}  ${u}`);
      fs.writeFileSync(path.join(__dirname, '404s.txt'), rows.map(([u, n]) => `${n}\t${u}`).join('\n'));
    }
    process.exit(0);
  });
}
