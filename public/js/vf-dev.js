/* VF-DEV — the local-only developer panel (2026-08-25, owner Auth-Status ruling:
 * "add a 'dev local only' panel in the bottom left that's always floating that
 * allows me to toggle different things like the email of the user, logged
 * in/out, language").
 *
 * NEVER SHIPS A BYTE TO VISITORS: Base.astro's inline gate only injects this
 * script on localhost AND (port 4444 — the prod-mirror, the canonical local —
 * or the localStorage['vf-dev']='1' latch). CI stays clean by construction:
 * LHCI collects on :4329 and the behavior suite on :4321, so neither ever
 * loads the panel (a floating chip would corrupt CLS/TBT numbers and
 * intercept test clicks). The same gate is re-checked here (defense in
 * depth). Astro-only, no legacy copy — it is a dev tool, not site runtime.
 *
 * Controls:
 *   Logged in  — sets/clears the auth_vf cookie (the same presence signal
 *                production reads) AND flips html[data-vf-auth] live, so the
 *                authed nav swap shows without a reload and survives one.
 *   Email      — persists to localStorage['vf-dev-email']; stamps
 *                sessionStorage['vf-lead'] ({email, route:'demo'} — the demo
 *                cold-visit guard's session authority) and prefills any
 *                [data-cta] input on the page.
 *   Language   — sets <html lang> and persists. The site is EN-only today;
 *                this is the hook for testing future i18n, nothing more.
 *
 * State store: localStorage 'vf-dev-*' keys. Styles are inline in the shadow
 * DOM — no site CSS touched, no token-gate surface (public/ is outside the
 * token scopes by design).
 */
(function () {
  'use strict';
  var LOCAL = /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
  var ON = LOCAL && (location.port === '4444' || localStorage.getItem('vf-dev') === '1');
  if (!ON) return;

  var LS = function (k, v) {
    try {
      if (v === undefined) return localStorage.getItem('vf-dev-' + k) || '';
      if (v === null) localStorage.removeItem('vf-dev-' + k);
      else localStorage.setItem('vf-dev-' + k, v);
    } catch (e) { return ''; }
  };
  var authed = function () {
    return document.cookie.split(';').some(function (c) { return c.trim().indexOf('auth_vf=') === 0; });
  };
  var setAuth = function (on) {
    document.cookie = on
      ? 'auth_vf=vf-dev-simulated;path=/'
      : 'auth_vf=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    if (on) document.documentElement.setAttribute('data-vf-auth', '1');
    else document.documentElement.removeAttribute('data-vf-auth');
  };
  var applyEmail = function (em) {
    try {
      if (em) sessionStorage.setItem('vf-lead', JSON.stringify({ email: em, route: 'demo', dev: true }));
      else sessionStorage.removeItem('vf-lead');
    } catch (e) {}
    document.querySelectorAll('[data-cta] input[type="email"], [data-cta] input:not([type])').forEach(function (i) {
      i.value = em || '';
    });
  };
  var applyLang = function (l) { if (l) document.documentElement.setAttribute('lang', l); };

  // Re-apply persisted sim state on every load (auth rides its own cookie).
  if (LS('email')) applyEmail(LS('email'));
  if (LS('lang')) applyLang(LS('lang'));

  // ---- UI (shadow DOM, bottom-left, always floating) ----
  var host = document.createElement('div');
  host.id = 'vf-dev-panel';
  var sh = host.attachShadow({ mode: 'open' });
  sh.innerHTML =
    '<style>' +
    ':host{position:fixed;left:12px;bottom:12px;z-index:2147483000;font:12px/1.45 ui-sans-serif,system-ui,sans-serif}' +
    '.chip{display:inline-flex;align-items:center;gap:6px;background:#111417;color:#e6e9ea;border:1px solid #2a2f34;border-radius:999px;padding:5px 11px;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.28);user-select:none}' +
    '.dot{width:7px;height:7px;border-radius:50%;background:#57606a}.dot.on{background:#3bd671}' +
    '.panel{display:none;margin-bottom:8px;width:236px;background:#111417;color:#e6e9ea;border:1px solid #2a2f34;border-radius:10px;padding:12px;box-shadow:0 10px 30px rgba(0,0,0,.35)}' +
    ':host([data-open]) .panel{display:block}' +
    '.hd{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;color:#8b9495;font-size:10px;letter-spacing:.08em}' +
    '.row{display:flex;justify-content:space-between;align-items:center;gap:8px;margin:8px 0}' +
    'label{color:#aeb6b8}' +
    'input[type=text],select{width:128px;background:#1a1f24;color:#e6e9ea;border:1px solid #2a2f34;border-radius:6px;padding:4px 7px;font:inherit}' +
    'input[type=checkbox]{accent-color:#3bd671;width:14px;height:14px}' +
    '.note{color:#57606a;font-size:10px;margin-top:8px}' +
    'a{color:#8b9495}' +
    '</style>' +
    '<div class="panel" role="group" aria-label="Dev panel">' +
    '<div class="hd"><span>DEV · LOCAL ONLY</span><a href="#" id="off" title="Remove the latch and hide">hide</a></div>' +
    '<div class="row"><label for="auth">Logged in</label><input type="checkbox" id="auth"></div>' +
    '<div class="row"><label for="email">Email</label><input type="text" id="email" placeholder="you@company.com" spellcheck="false"></div>' +
    '<div class="row"><label for="lang">Language</label><select id="lang">' +
    '<option value="en">English</option><option value="es">Español</option><option value="fr">Français</option><option value="de">Deutsch</option><option value="ja">日本語</option>' +
    '</select></div>' +
    '<div class="note">Simulation only. Auth = auth_vf cookie presence (what production reads). Email stamps vf-lead + CTA inputs. Language sets &lt;html lang&gt; — site is EN-only today.</div>' +
    '</div>' +
    '<span class="chip" id="chip" role="button" tabindex="0" aria-label="Toggle dev panel"><span class="dot" id="dot"></span>DEV</span>';

  var $ = function (id) { return sh.getElementById(id); };
  var sync = function () {
    $('auth').checked = authed();
    $('dot').className = 'dot' + (authed() ? ' on' : '');
    $('email').value = LS('email');
    $('lang').value = LS('lang') || document.documentElement.getAttribute('lang') || 'en';
  };
  $('chip').addEventListener('click', function () {
    if (host.hasAttribute('data-open')) host.removeAttribute('data-open');
    else { sync(); host.setAttribute('data-open', '1'); }
  });
  $('auth').addEventListener('change', function () { setAuth(this.checked); sync(); });
  $('email').addEventListener('change', function () {
    var v = this.value.trim();
    if (v) LS('email', v); else LS('email', null);
    applyEmail(v);
  });
  $('lang').addEventListener('change', function () { LS('lang', this.value); applyLang(this.value); });
  $('off').addEventListener('click', function (e) {
    e.preventDefault();
    try { localStorage.removeItem('vf-dev'); } catch (err) {}
    host.remove();
  });

  var mount = function () { document.body.appendChild(host); sync(); };
  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount);
})();
