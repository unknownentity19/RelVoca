/**
 * relvoca-verify.js — the "check your email for a code" step.
 *
 * Shared by /login and /signup. There is no mail server in this build, so the
 * code is generated in the browser, held in sessionStorage for the length of
 * the attempt, and shown in a muted demo line inside the modal. It is still
 * checked for real: a wrong code is rejected, resend issues a new one, and only
 * a correct code calls back. That keeps the flow honest — it behaves like the
 * real thing rather than waving anything through — while staying completable by
 * anyone who opens the page.
 *
 * Usage:
 *   RelVocaVerify.open({ email: 'a@b.com', onVerified: fn, onCancel: fn })
 *
 * Styles are injected here rather than living in each page's stylesheet so the
 * component is self-contained: /login gets it through its own build, /signup by
 * dropping in the script tag. Both read the same design tokens the captured
 * stylesheet defines, with literal fallbacks so the modal still renders if it
 * is ever used on a page that does not load Base.css.
 */
(function (window, document) {
  'use strict';

  var KEY = 'relvoca.verify';
  var LEN = 6;

  var CSS =
    '.rv-veil{position:fixed;inset:0;z-index:2147483000;display:none;place-items:center;padding:20px;' +
    'background:color-mix(in srgb, #0b1220 58%, transparent);backdrop-filter:blur(3px);' +
    'font-family:var(--font-sans,system-ui,-apple-system,"Segoe UI",sans-serif)}' +
    '.rv-veil[data-open]{display:grid}' +
    '.rv-card{width:100%;max-width:412px;background:var(--vfc-color-font-light,#fff);border-radius:16px;' +
    'padding:28px;box-shadow:0 30px 80px rgba(8,15,30,.34);animation:rv-in .22s cubic-bezier(.2,.7,.3,1) both}' +
    '@keyframes rv-in{from{opacity:0;transform:translateY(10px) scale(.98)}to{opacity:1;transform:none}}' +
    '.rv-icon{width:44px;height:44px;border-radius:12px;display:grid;place-items:center;margin-bottom:16px;' +
    'background:var(--vfc-color-accent-accent-50,#eaf0ff);color:var(--vfc-color-accent-accent-600,#2f6ae0)}' +
    '.rv-card h2{font:600 19px/26px var(--font-sans,inherit);letter-spacing:-.01em;margin:0 0 7px;' +
    'color:var(--vf-text-heading,#12161b)}' +
    '.rv-lede{font:400 14px/21px var(--font-sans,inherit);color:var(--vf-text-mid,#5a6673);margin:0 0 20px}' +
    // The address gets its own line: inline, a long one breaks mid-word and
    // strands a character or two on the next line.
    '.rv-lede b{display:block;margin-top:2px;color:var(--vf-text-heading,#12161b);font-weight:600;' +
    'overflow-wrap:anywhere}' +
    '.rv-boxes{display:flex;gap:8px;margin-bottom:14px}' +
    '.rv-boxes input{width:100%;min-width:0;aspect-ratio:1/1.15;text-align:center;border-radius:10px;' +
    'border:1px solid var(--vfc-color-neutral-light-neutrals-light-100,#dfe3e8);background:var(--vfc-color-font-light,#fff);' +
    'font:600 20px/1 var(--font-sans,inherit);color:var(--vf-text-heading,#12161b);outline:none;' +
    'transition:border-color .15s ease,box-shadow .15s ease}' +
    '.rv-boxes input:focus{border-color:var(--vfc-color-accent-accent-500,#397dff);' +
    'box-shadow:0 0 0 3px color-mix(in srgb, var(--vf-brand,#397dff) 16%, transparent)}' +
    '.rv-card.err .rv-boxes input{border-color:var(--vfc-color-alert-alert-600,#d64545)}' +
    '.rv-card.err .rv-boxes{animation:rv-shake .32s}' +
    '@keyframes rv-shake{0%,100%{transform:none}20%{transform:translateX(-6px)}40%{transform:translateX(6px)}' +
    '60%{transform:translateX(-4px)}80%{transform:translateX(4px)}}' +
    '.rv-err{display:none;font:400 12px/18px var(--font-sans,inherit);color:var(--vfc-color-alert-alert-600,#d64545);margin:0 0 12px}' +
    '.rv-card.err .rv-err{display:block}' +
    '.rv-demo{font:400 12px/18px var(--font-sans,inherit);color:var(--vf-text-subtle,#8a97a5);margin:0 0 18px;' +
    'padding:9px 11px;border-radius:8px;background:var(--vfc-color-shades-shades-50,#f4f6f8)}' +
    '.rv-demo code{font-family:var(--font-code,ui-monospace,Menlo,monospace);font-weight:700;letter-spacing:.06em;' +
    'color:var(--vf-text-heading,#12161b)}' +
    '.rv-btn{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;border:0;cursor:pointer;' +
    'background:var(--vfc-color-accent-accent-500,#397dff);color:var(--vfc-color-font-light,#fff);border-radius:10px;' +
    'padding:13px 16px;font:600 14px/20px var(--font-sans,inherit);transition:background .15s ease}' +
    '.rv-btn:hover{background:var(--vfc-color-accent-accent-600,#2f6ae0)}' +
    '.rv-btn[disabled]{background:var(--vfc-color-accent-accent-300,#a9c4ff);cursor:default}' +
    '.rv-foot{display:flex;gap:6px;flex-wrap:wrap;justify-content:center;margin:16px 0 0;' +
    'font:400 13px/20px var(--font-sans,inherit);color:var(--vf-text-mid,#5a6673)}' +
    '.rv-foot button{border:0;background:none;padding:0;cursor:pointer;font:600 13px/20px var(--font-sans,inherit);' +
    'color:var(--vfc-color-accent-accent-500,#397dff)}' +
    '.rv-foot button:hover{text-decoration:underline}' +
    '.rv-foot button[disabled]{color:var(--vf-text-subtle,#8a97a5);cursor:default;text-decoration:none}' +
    '.rv-sep{opacity:.45}';

  var ICON =
    '<svg width="21" height="21" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<rect x="2.2" y="4" width="15.6" height="12" rx="2.2"/><path d="m2.8 5.6 7.2 5 7.2-5"/></svg>';

  var state = null; // { email, onVerified, onCancel, code }
  var els = null;

  function styles() {
    if (document.getElementById('rv-style')) return;
    var tag = document.createElement('style');
    tag.id = 'rv-style';
    tag.appendChild(document.createTextNode(CSS));
    (document.head || document.documentElement).appendChild(tag);
  }

  function newCode() {
    var n = '';
    // crypto where available so the demo code is not a predictable Math.random.
    if (window.crypto && window.crypto.getRandomValues) {
      var buf = new Uint8Array(LEN);
      window.crypto.getRandomValues(buf);
      for (var i = 0; i < LEN; i++) n += String(buf[i] % 10);
    } else {
      for (var j = 0; j < LEN; j++) n += String(Math.floor(Math.random() * 10));
    }
    return n;
  }

  function remember(code) {
    // sessionStorage, not localStorage: a pending code should not outlive the tab.
    try {
      window.sessionStorage.setItem(KEY, code);
    } catch (e) {
      /* private mode — the in-memory copy on `state` still works */
    }
  }

  function build() {
    styles();
    var veil = document.createElement('div');
    veil.className = 'rv-veil';
    veil.setAttribute('role', 'dialog');
    veil.setAttribute('aria-modal', 'true');
    veil.setAttribute('aria-labelledby', 'rv-title');
    veil.innerHTML =
      '<div class="rv-card" id="rv-card">' +
      '<div class="rv-icon">' + ICON + '</div>' +
      '<h2 id="rv-title">Check your email</h2>' +
      '<p class="rv-lede">We sent a ' + LEN + '-digit code to <b id="rv-email"></b></p>' +
      '<div class="rv-boxes" id="rv-boxes"></div>' +
      '<p class="rv-err" id="rv-err">That code is not right. Check it and try again.</p>' +
      '<p class="rv-demo">No mail server in this build &#8212; your code is <code id="rv-code"></code></p>' +
      '<button class="rv-btn" id="rv-submit" type="button">Verify and continue</button>' +
      '<p class="rv-foot">Didn&#8217;t get it? <button type="button" id="rv-resend">Resend</button>' +
      '<span class="rv-sep">&#183;</span><button type="button" id="rv-cancel">Use a different email</button></p>' +
      '</div>';
    document.body.appendChild(veil);

    var boxes = veil.querySelector('#rv-boxes');
    for (var i = 0; i < LEN; i++) {
      var input = document.createElement('input');
      input.type = 'text';
      input.inputMode = 'numeric';
      input.autocomplete = i === 0 ? 'one-time-code' : 'off';
      // Deliberately no maxLength. Digits typed by hand are placed by the
      // keydown handler, so a cap is not needed for that — and a cap of 1 would
      // truncate a whole code delivered in one shot by a password manager or
      // iOS's SMS autofill, leaving only the first digit. Without it the full
      // string reaches the input handler, which spreads it across the boxes.
      input.setAttribute('aria-label', 'Digit ' + (i + 1) + ' of ' + LEN);
      boxes.appendChild(input);
    }

    els = {
      veil: veil,
      card: veil.querySelector('#rv-card'),
      email: veil.querySelector('#rv-email'),
      code: veil.querySelector('#rv-code'),
      submit: veil.querySelector('#rv-submit'),
      resend: veil.querySelector('#rv-resend'),
      cancel: veil.querySelector('#rv-cancel'),
      inputs: [].slice.call(boxes.querySelectorAll('input')),
    };

    wire();
    return els;
  }

  function value() {
    return els.inputs.map(function (i) { return i.value; }).join('');
  }

  function clearError() {
    els.card.classList.remove('err');
  }

  /** First empty box at or after `from`; falls back to `from` when all are full. */
  function nextEmpty(from) {
    for (var i = from; i < LEN; i++) {
      if (!els.inputs[i].value) return i;
    }
    return from;
  }

  function focusFirstEmpty() {
    for (var i = 0; i < els.inputs.length; i++) {
      if (!els.inputs[i].value) return els.inputs[i].focus();
    }
    els.inputs[els.inputs.length - 1].focus();
  }

  /** Distribute a pasted or typed run of digits across the boxes. */
  function fill(from, digits) {
    var d = String(digits).replace(/\D/g, '');
    if (!d) return;
    for (var i = 0; i < d.length && from + i < LEN; i++) {
      els.inputs[from + i].value = d.charAt(i);
    }
    clearError();
    focusFirstEmpty();
    if (value().length === LEN) submit();
  }

  function wire() {
    els.inputs.forEach(function (input, idx) {
      input.addEventListener('input', function () {
        var v = input.value;
        if (!/^\d*$/.test(v)) {
          input.value = v.replace(/\D/g, '');
          return;
        }
        if (v.length > 1) {
          // A keyboard autofill or fast paste can land several digits in one box.
          input.value = v.charAt(0);
          fill(idx, v);
          return;
        }
        clearError();
        if (v && idx < LEN - 1) els.inputs[idx + 1].focus();
        if (value().length === LEN) submit();
      });

      input.addEventListener('keydown', function (e) {
        // Digits are placed from keydown rather than left to the native input
        // event. Advancing focus from `input` fires *after* the character has
        // already been committed, so when someone types quickly the next
        // keystroke still lands on this box — which is maxLength=1 and already
        // full — and the browser silently drops it. Only the first digit ever
        // arrived. Handling keydown puts the write and the focus move in the
        // same synchronous step, so every keystroke lands in its own box.
        if (/^[0-9]$/.test(e.key)) {
          e.preventDefault();
          var target = input.value === '' ? idx : nextEmpty(idx);
          els.inputs[target].value = e.key;
          clearError();
          var after = nextEmpty(target);
          els.inputs[after === -1 ? LEN - 1 : after].focus();
          if (value().length === LEN) submit();
          return;
        }
        if (e.key === 'Backspace' && !input.value && idx > 0) {
          e.preventDefault();
          els.inputs[idx - 1].value = '';
          els.inputs[idx - 1].focus();
        } else if (e.key === 'ArrowLeft' && idx > 0) {
          e.preventDefault();
          els.inputs[idx - 1].focus();
        } else if (e.key === 'ArrowRight' && idx < LEN - 1) {
          e.preventDefault();
          els.inputs[idx + 1].focus();
        } else if (e.key === 'Enter') {
          e.preventDefault();
          submit();
        }
      });

      input.addEventListener('paste', function (e) {
        e.preventDefault();
        fill(idx, (e.clipboardData || window.clipboardData).getData('text'));
      });

      input.addEventListener('focus', function () { input.select(); });
    });

    els.submit.addEventListener('click', submit);
    els.resend.addEventListener('click', resend);
    els.cancel.addEventListener('click', function () { close(true); });

    els.veil.addEventListener('mousedown', function (e) {
      if (e.target === els.veil) close(true);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && els && els.veil.hasAttribute('data-open')) close(true);
    });
  }

  function submit() {
    var entered = value();
    if (entered.length < LEN) {
      els.card.classList.add('err');
      focusFirstEmpty();
      return;
    }
    if (entered !== state.code) {
      els.card.classList.add('err');
      els.inputs.forEach(function (i) { i.value = ''; });
      els.inputs[0].focus();
      return;
    }

    els.submit.disabled = true;
    els.submit.textContent = 'Verifying…';
    try {
      window.sessionStorage.removeItem(KEY);
    } catch (e) {
      /* nothing to clear */
    }
    var done = state.onVerified;
    var email = state.email;
    close(false);
    if (typeof done === 'function') done(email);
  }

  function resend() {
    state.code = newCode();
    remember(state.code);
    els.code.textContent = state.code;
    els.inputs.forEach(function (i) { i.value = ''; });
    clearError();
    els.inputs[0].focus();

    els.resend.disabled = true;
    var left = 20;
    els.resend.textContent = 'Sent · ' + left + 's';
    var tick = setInterval(function () {
      left--;
      if (left <= 0) {
        clearInterval(tick);
        els.resend.disabled = false;
        els.resend.textContent = 'Resend';
        return;
      }
      els.resend.textContent = 'Sent · ' + left + 's';
    }, 1000);
  }

  function close(cancelled) {
    if (!els) return;
    els.veil.removeAttribute('data-open');
    document.documentElement.style.overflow = '';
    var onCancel = state && state.onCancel;
    if (cancelled && typeof onCancel === 'function') onCancel();
    state = null;
  }

  window.RelVocaVerify = {
    open: function (opts) {
      if (!els) build();
      state = {
        email: opts.email,
        onVerified: opts.onVerified,
        onCancel: opts.onCancel,
        code: newCode(),
      };
      remember(state.code);

      els.email.textContent = state.email;
      els.code.textContent = state.code;
      els.inputs.forEach(function (i) { i.value = ''; });
      clearError();
      els.submit.disabled = false;
      els.submit.textContent = 'Verify and continue';
      els.resend.disabled = false;
      els.resend.textContent = 'Resend';

      els.veil.setAttribute('data-open', '1');
      document.documentElement.style.overflow = 'hidden';
      setTimeout(function () { els.inputs[0].focus(); }, 40);
    },
    close: close,
  };
})(window, document);
