/**
 * relvoca-verify.js — the "check your email" notice.
 *
 * Shared by /login and /signup. This used to show a 6-digit code and print the
 * code on screen, which gave the game away. There is a real mail path now, so
 * the popup just reports what happened: a link was sent, click it to sign in.
 * Nothing to type, nothing to fake.
 *
 * Usage:
 *   RelVocaVerify.sent({ email, onResend })   // show the notice
 *   RelVocaVerify.close()
 *
 * Styles are injected here so the component is self-contained. They read the
 * captured stylesheet's design tokens, with literal fallbacks so it still
 * renders on a page that does not load Base.css.
 */
(function (window, document) {
  'use strict';

  var CSS =
    '.rv-veil{position:fixed;inset:0;z-index:2147483000;display:none;place-items:center;padding:20px;' +
    'background:color-mix(in srgb, #0b1220 58%, transparent);backdrop-filter:blur(3px);' +
    'font-family:var(--font-sans,system-ui,-apple-system,"Segoe UI",sans-serif)}' +
    '.rv-veil[data-open]{display:grid}' +
    '.rv-card{width:100%;max-width:412px;background:var(--vfc-color-font-light,#fff);border-radius:16px;' +
    'padding:28px;box-shadow:0 30px 80px rgba(8,15,30,.34);animation:rv-in .22s cubic-bezier(.2,.7,.3,1) both;' +
    'text-align:center}' +
    '@keyframes rv-in{from{opacity:0;transform:translateY(10px) scale(.98)}to{opacity:1;transform:none}}' +
    '.rv-icon{width:52px;height:52px;border-radius:14px;display:grid;place-items:center;margin:0 auto 18px;' +
    'background:var(--vfc-color-accent-accent-50,#eaf0ff);color:var(--vfc-color-accent-accent-600,#2f6ae0)}' +
    '.rv-card h2{font:600 20px/28px var(--font-sans,inherit);letter-spacing:-.01em;margin:0 0 8px;' +
    'color:var(--vf-text-heading,#12161b)}' +
    '.rv-lede{font:400 14px/21px var(--font-sans,inherit);color:var(--vf-text-mid,#5a6673);margin:0 0 4px}' +
    '.rv-mail{display:block;margin:6px 0 18px;font:600 14px/21px var(--font-sans,inherit);' +
    'color:var(--vf-text-heading,#12161b);overflow-wrap:anywhere}' +
    '.rv-hint{font:400 12px/18px var(--font-sans,inherit);color:var(--vf-text-subtle,#8a97a5);margin:0 0 20px;' +
    'padding:10px 12px;border-radius:9px;background:var(--vfc-color-shades-shades-50,#f4f6f8)}' +
    '.rv-btn{display:block;width:100%;border:0;cursor:pointer;text-align:center;text-decoration:none;' +
    'background:var(--vfc-color-accent-accent-500,#397dff);color:var(--vfc-color-font-light,#fff);' +
    'border-radius:10px;padding:13px 16px;font:600 14px/20px var(--font-sans,inherit);transition:background .15s ease}' +
    '.rv-btn:hover{background:var(--vfc-color-accent-accent-600,#2f6ae0)}' +
    '.rv-foot{display:flex;gap:6px;flex-wrap:wrap;justify-content:center;margin:16px 0 0;' +
    'font:400 13px/20px var(--font-sans,inherit);color:var(--vf-text-mid,#5a6673)}' +
    '.rv-foot button{border:0;background:none;padding:0;cursor:pointer;font:600 13px/20px var(--font-sans,inherit);' +
    'color:var(--vfc-color-accent-accent-500,#397dff)}' +
    '.rv-foot button:hover{text-decoration:underline}' +
    '.rv-foot button[disabled]{color:var(--vf-text-subtle,#8a97a5);cursor:default;text-decoration:none}' +
    '.rv-sep{opacity:.45}';

  var ICON =
    '<svg width="25" height="25" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<rect x="2.2" y="4" width="15.6" height="12" rx="2.2"/><path d="m2.8 5.6 7.2 5 7.2-5"/></svg>';

  var els = null;
  var state = null;

  function styles() {
    if (document.getElementById('rv-style')) return;
    var tag = document.createElement('style');
    tag.id = 'rv-style';
    tag.appendChild(document.createTextNode(CSS));
    (document.head || document.documentElement).appendChild(tag);
  }

  function build() {
    styles();
    var veil = document.createElement('div');
    veil.className = 'rv-veil';
    veil.setAttribute('role', 'dialog');
    veil.setAttribute('aria-modal', 'true');
    veil.setAttribute('aria-labelledby', 'rv-title');
    veil.innerHTML =
      '<div class="rv-card">' +
      '<div class="rv-icon">' + ICON + '</div>' +
      '<h2 id="rv-title">Check your email</h2>' +
      '<p class="rv-lede">We sent a sign-in link to</p>' +
      '<span class="rv-mail" id="rv-mail"></span>' +
      '<p class="rv-hint">The link signs you in straight away. It works once and expires in 15 minutes.</p>' +
      '<button class="rv-btn" id="rv-done" type="button">Got it</button>' +
      '<p class="rv-foot">Wrong address or nothing arrived? ' +
      '<button type="button" id="rv-resend">Send again</button>' +
      '<span class="rv-sep">&#183;</span>' +
      '<button type="button" id="rv-back">Use a different email</button></p>' +
      '</div>';
    document.body.appendChild(veil);

    els = {
      veil: veil,
      mail: veil.querySelector('#rv-mail'),
      done: veil.querySelector('#rv-done'),
      resend: veil.querySelector('#rv-resend'),
      back: veil.querySelector('#rv-back'),
    };

    els.done.addEventListener('click', function () { close(false); });
    els.back.addEventListener('click', function () { close(true); });
    els.resend.addEventListener('click', resend);
    veil.addEventListener('mousedown', function (e) { if (e.target === veil) close(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && els && els.veil.hasAttribute('data-open')) close(false);
    });
    return els;
  }

  function resend() {
    if (!state || typeof state.onResend !== 'function') return;
    state.onResend(state.email);

    // A countdown, so nobody can lean on the button and mail-bomb an address.
    els.resend.disabled = true;
    var left = 30;
    els.resend.textContent = 'Sent · ' + left + 's';
    var tick = setInterval(function () {
      left--;
      if (left <= 0) {
        clearInterval(tick);
        els.resend.disabled = false;
        els.resend.textContent = 'Send again';
        return;
      }
      els.resend.textContent = 'Sent · ' + left + 's';
    }, 1000);
  }

  function close(wantsDifferentEmail) {
    if (!els) return;
    els.veil.removeAttribute('data-open');
    document.documentElement.style.overflow = '';
    var cb = state && state.onCancel;
    state = null;
    if (wantsDifferentEmail && typeof cb === 'function') cb();
  }

  window.RelVocaVerify = {
    /** Show the notice. `onResend(email)` re-triggers the request. */
    sent: function (opts) {
      if (!els) build();
      state = { email: opts.email, onResend: opts.onResend, onCancel: opts.onCancel };

      els.mail.textContent = opts.email;
      els.resend.disabled = false;
      els.resend.textContent = 'Send again';

      els.veil.setAttribute('data-open', '1');
      document.documentElement.style.overflow = 'hidden';
      setTimeout(function () { els.done.focus(); }, 40);
    },
    close: close,
  };
})(window, document);
