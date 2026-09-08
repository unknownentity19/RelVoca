'use strict';

/**
 * /login — the first-party replacement for creator.voiceflow.com/login.
 *
 * Built on the /signup donor so it is a true twin: same .su split layout, same
 * fonts, same stylesheet, same chat panel treatment.
 *
 * There is no password field, because there are no passwords. Signing in posts
 * the address to /api/auth/request, which emails a single-use link; the link
 * itself is the credential. That also means this page and /signup do the same
 * thing — a new address gets an account, a known one gets a session — so the
 * copy is the only real difference between them.
 */

const {
  read, setMain, setMeta, addStyle, addScript, donorStyleContaining,
  stripOwnScripts, write,
} = require('../make-pages.js');

const CSS = `
.lg-form{display:flex;flex-direction:column;gap:16px;max-width:332px;margin:0}
.lg-field{display:flex;flex-direction:column;gap:7px}
.lg-field label{font:600 13px/18px var(--font-sans);color:var(--vf-text-heading)}
.lg-input{width:100%;border:1px solid var(--vfc-color-neutral-light-neutrals-light-100);border-radius:10px;background:var(--vfc-color-font-light);font:400 14px/20px var(--font-sans);color:var(--vf-text-heading);padding:12px 14px;outline:none;transition:border-color .15s ease,box-shadow .15s ease}
.lg-input::placeholder{color:var(--vfc-color-neutral-light-neutrals-light-700)}
.lg-input:focus{border-color:var(--vfc-color-accent-accent-500);box-shadow:0 0 0 3px color-mix(in srgb, var(--vf-brand) 14%, transparent)}
.lg-err{display:none;font:400 12px/18px var(--font-sans);color:var(--vfc-color-alert-alert-600);margin:0}
.lg-field.err .lg-input{border-color:var(--vfc-color-alert-alert-600);box-shadow:0 0 0 3px color-mix(in srgb, var(--vfc-color-alert-alert-500) 12%, transparent)}
.lg-field.err .lg-err{display:block}
.lg-alert{display:none;align-items:flex-start;gap:8px;font:400 13px/19px var(--font-sans);color:var(--vfc-color-alert-alert-600);background:var(--vfc-color-alert-alert-50);border-radius:8px;padding:10px 12px;margin:0}
.lg-alert.on{display:flex}
.lg-btn{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;border:0;cursor:pointer;background:var(--vfc-color-accent-accent-500);color:var(--vfc-color-font-light);border-radius:10px;padding:13px 16px;font:600 14px/20px var(--font-sans);transition:background .15s ease}
.lg-btn:hover{background:var(--vfc-color-accent-accent-600)}
.lg-btn:active{background:var(--vfc-color-accent-accent-700)}
.lg-btn[disabled]{background:var(--vfc-color-accent-accent-300);color:var(--vfc-color-accent-accent-50);cursor:default}
.lg-spin{width:14px;height:14px;border:1.5px solid color-mix(in srgb, var(--vfc-color-white-100) 35%, transparent);border-top-color:var(--vfc-color-font-light);border-radius:50%;animation:vf-spin 1s linear infinite;flex:none;display:none}
.lg-busy .lg-spin{display:block}
@media (prefers-reduced-motion:reduce){.lg-spin{animation:none}}
.lg-note{font:400 12px/18px var(--font-sans);color:var(--vf-text-subtle);margin:10px 0 0;max-width:332px}
.su-body .su-alt{margin-top:24px}
`;

const JS = `
(function () {
  var form = document.getElementById('lg-form');
  if (!form) return;
  var email = document.getElementById('lg-email');
  var btn = document.getElementById('lg-submit');
  var label = document.getElementById('lg-btn-text');
  var alert = document.getElementById('lg-alert');
  var field = email.closest('.lg-field');

  // The callback redirects here with a reason when a link cannot be used.
  var REASONS = {
    link_expired: 'That sign-in link has expired or was already used. Enter your email for a fresh one.',
    missing_token: 'That link was incomplete. Enter your email and we will send another.',
    server_error: 'Something went wrong signing you in. Try again.'
  };
  var why = new URLSearchParams(location.search).get('error');
  if (why && REASONS[why]) {
    alert.textContent = REASONS[why];
    alert.classList.add('on');
    // Drop it from the URL so a refresh does not keep showing the same error.
    try { history.replaceState(null, '', location.pathname); } catch (e) {}
  }

  email.addEventListener('input', function () {
    field.classList.remove('err');
    alert.classList.remove('on');
  });

  function busy(on, text) {
    btn.disabled = on;
    btn.classList.toggle('lg-busy', on);
    label.textContent = text;
  }

  function request(value) {
    return fetch('/api/auth/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({ email: value })
    });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    alert.classList.remove('on');

    var value = email.value.trim();
    if (!value || !/^[^@\\s]+@[^@\\s.]+\\.[^@\\s]{2,}$/.test(value)) {
      field.classList.add('err');
      field.querySelector('.lg-err').textContent = value
        ? 'That does not look like a valid email address.'
        : 'Enter your email address.';
      email.focus();
      return;
    }

    busy(true, 'Sending link\\u2026');

    request(value).then(function (r) {
      busy(false, 'Email me a sign-in link');
      if (!r.ok) {
        alert.textContent = 'We could not send the link just now. Try again in a moment.';
        alert.classList.add('on');
        return;
      }
      window.RelVocaVerify.sent({
        email: value,
        onResend: function (addr) { request(addr); },
        onCancel: function () { email.focus(); email.select(); }
      });
    }).catch(function () {
      busy(false, 'Email me a sign-in link');
      alert.textContent = 'We could not reach the server. Check your connection and try again.';
      alert.classList.add('on');
    });
  });
})();
`;

const MAIN = `
<div class="su">
  <div class="su-content">
    <div class="su-inner">
      <a class="su-logo" href="index.html" aria-label="RelVoca home"><img src="images/logo.svg" alt="RelVoca"></a>
      <div class="su-body">
        <p class="su-eyebrow">Welcome back</p>
        <h1 class="su-h1">Log in to RelVoca.</h1>
        <p class="su-lede">Enter your email and we&#8217;ll send you a link that signs you straight in.</p>

        <form class="lg-form" id="lg-form" novalidate>
          <div class="lg-field">
            <label for="lg-email">Work email</label>
            <input class="lg-input" id="lg-email" name="email" type="email" autocomplete="email"
                   placeholder="you@company.com" spellcheck="false" autocapitalize="off" required>
            <p class="lg-err"></p>
          </div>

          <p class="lg-alert" id="lg-alert" role="alert"></p>

          <button class="lg-btn" id="lg-submit" type="submit">
            <span class="lg-spin" aria-hidden="true"></span>
            <span id="lg-btn-text">Email me a sign-in link</span>
          </button>
        </form>

        <p class="lg-note">No password needed. The link works once and expires in 15 minutes.</p>
        <p class="su-alt">New to RelVoca? <a href="signup">Create an account</a></p>
      </div>
      <p class="su-legal">By continuing, you agree to RelVoca&#8217;s <a href="legal/terms">Terms of Service</a> and <a href="privacy">Privacy Policy</a>.</p>
    </div>
  </div>
  <div class="su-chat">
    <div class="su-card-wrap">
      <div class="su-card-shadow"></div>
      <div class="su-card">
        <div class="su-msg">Welcome back. Your support agent handled 1,284 conversations this week.</div>
        <div class="su-msg user">How did containment look?</div>
        <div class="su-msg">81% resolved without a handoff, up 4 points. Sign in to see the breakdown.</div>
      </div>
    </div>
  </div>
</div>
`;

module.exports = function build() {
  const doc0 = read('signup');
  // /signup keeps the shared .su layout CSS inside <main>; lift it before the
  // main content is replaced, or the split layout disappears.
  const suCss = donorStyleContaining(doc0, '.su-card-shadow');
  // signup is built before this and carries its own relvoca scripts; drop them
  // so they are not inherited and duplicated here.
  let doc = stripOwnScripts(doc0);
  doc = setMeta(doc, {
    title: 'Log in | RelVoca',
    description: 'Log in to RelVoca — build, test and deploy AI agents for customer experience.',
    slug: 'login',
  });
  doc = setMain(doc, suCss + MAIN);
  doc = addStyle(doc, CSS);
  doc = doc.replace(
    '</body>',
    '<script src="js/relvoca-auth.js"></script>' +
      '<script src="js/relvoca-verify.js"></script></body>'
  );
  doc = addScript(doc, JS);
  write('login', doc);
};
