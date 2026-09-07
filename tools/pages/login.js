'use strict';

/**
 * /login — the first-party replacement for creator.voiceflow.com/login.
 *
 * Built on the /signup donor so it is a true twin: same .su split layout, same
 * fonts, same stylesheet, same chat panel treatment. Only the left column
 * differs — signup is a one-field email gate, login is a credentialled form —
 * so the field styling below is the one genuinely new piece of CSS, written
 * against the same tokens the captured .vf-cta bar uses.
 */

const {
  read, setMain, setMeta, addStyle, addScript, donorStyleContaining,
  stripOwnScripts, write,
} = require('../make-pages.js');

const CSS = `
.lg-form{display:flex;flex-direction:column;gap:18px;max-width:332px;margin:0}
.lg-field{display:flex;flex-direction:column;gap:7px;position:relative}
.lg-row{display:flex;align-items:baseline;justify-content:space-between;gap:12px}
.lg-field label{font:600 13px/18px var(--font-sans);color:var(--vf-text-heading)}
.lg-forgot{font:400 12px/18px var(--font-sans);color:var(--vfc-color-accent-accent-500);text-decoration:none}
.lg-forgot:hover{color:var(--vfc-color-accent-accent-600);text-decoration:underline}
.lg-input{width:100%;border:1px solid var(--vfc-color-neutral-light-neutrals-light-100);border-radius:10px;background:var(--vfc-color-font-light);font:400 14px/20px var(--font-sans);color:var(--vf-text-heading);padding:12px 14px;outline:none;transition:border-color .15s ease,box-shadow .15s ease}
.lg-input::placeholder{color:var(--vfc-color-neutral-light-neutrals-light-700)}
.lg-input:focus{border-color:var(--vfc-color-accent-accent-500);box-shadow:0 0 0 3px color-mix(in srgb, var(--vf-brand) 14%, transparent)}
.lg-wrap{position:relative;display:flex}
.lg-wrap .lg-input{padding-right:62px}
.lg-reveal{position:absolute;right:6px;top:50%;transform:translateY(-50%);border:0;background:transparent;cursor:pointer;font:600 12px/16px var(--font-sans);color:var(--vf-text-mid);padding:6px 8px;border-radius:6px}
.lg-reveal:hover{color:var(--vf-text-heading);background:var(--vfc-color-shades-shades-50)}
.lg-err{display:none;font:400 12px/18px var(--font-sans);color:var(--vfc-color-alert-alert-600);margin:0}
.lg-field.err .lg-input{border-color:var(--vfc-color-alert-alert-600);box-shadow:0 0 0 3px color-mix(in srgb, var(--vfc-color-alert-alert-500) 12%, transparent)}
.lg-field.err .lg-err{display:block}
.lg-alert{display:none;align-items:center;gap:8px;font:400 13px/18px var(--font-sans);color:var(--vfc-color-alert-alert-600);background:var(--vfc-color-alert-alert-50);border-radius:8px;padding:10px 12px;margin:0}
.lg-alert.on{display:flex}
.lg-btn{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;border:0;cursor:pointer;background:var(--vfc-color-accent-accent-500);color:var(--vfc-color-font-light);border-radius:10px;padding:13px 16px;font:600 14px/20px var(--font-sans);transition:background .15s ease}
.lg-btn:hover{background:var(--vfc-color-accent-accent-600)}
.lg-btn:active{background:var(--vfc-color-accent-accent-700)}
.lg-btn[disabled]{background:var(--vfc-color-accent-accent-300);color:var(--vfc-color-accent-accent-50);cursor:default}
.lg-btn.sec{background:var(--vfc-color-font-light);color:var(--vf-text-heading);box-shadow:inset 0 0 0 1px var(--vfc-color-neutral-light-neutrals-light-100)}
.lg-btn.sec:hover{background:var(--vfc-color-shades-shades-50)}
.lg-spin{width:14px;height:14px;border:1.5px solid color-mix(in srgb, var(--vfc-color-white-100) 35%, transparent);border-top-color:var(--vfc-color-font-light);border-radius:50%;animation:vf-spin 1s linear infinite;flex:none;display:none}
.lg-busy .lg-spin{display:block}
@media (prefers-reduced-motion:reduce){.lg-spin{animation:none}}
.lg-or{display:flex;align-items:center;gap:12px;max-width:332px;margin:18px 0}
.lg-or::before,.lg-or::after{content:"";flex:1;height:1px;background:var(--vfc-color-neutral-light-neutrals-light-100)}
.lg-or span{font:400 12px/16px var(--font-sans);color:var(--vf-text-subtle)}
.lg-sso{max-width:332px}
.su-body .su-alt{margin-top:24px}
`;

const JS = `
(function () {
  var form = document.getElementById('lg-form');
  if (!form) return;
  var email = document.getElementById('lg-email');
  var pass = document.getElementById('lg-pass');
  var btn = document.getElementById('lg-submit');
  var alert = document.getElementById('lg-alert');
  var reveal = document.getElementById('lg-reveal');

  function field(el) { return el.closest('.lg-field'); }
  function clear(el) { field(el).classList.remove('err'); }
  function fail(el, msg) {
    var f = field(el);
    f.classList.add('err');
    f.querySelector('.lg-err').textContent = msg;
  }

  email.addEventListener('input', function () { clear(email); });
  pass.addEventListener('input', function () { clear(pass); });

  reveal.addEventListener('click', function () {
    var show = pass.type === 'password';
    pass.type = show ? 'text' : 'password';
    reveal.textContent = show ? 'Hide' : 'Show';
    reveal.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
    pass.focus();
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    alert.classList.remove('on');
    var ok = true;

    var v = email.value.trim();
    if (!v) { fail(email, 'Enter your email address.'); ok = false; }
    else if (!/^[^@\\s]+@[^@\\s.]+\\.[^@\\s]{2,}$/.test(v)) {
      fail(email, 'That does not look like a valid email address.'); ok = false;
    }
    if (!pass.value) { fail(pass, 'Enter your password.'); ok = false; }
    else if (pass.value.length < 8) {
      fail(pass, 'Passwords are at least 8 characters.'); ok = false;
    }
    if (!ok) { (field(email).classList.contains('err') ? email : pass).focus(); return; }

    btn.disabled = true;
    btn.classList.add('lg-busy');
    var label = document.getElementById('lg-btn-text');
    label.textContent = 'Sending code\\u2026';

    function reset(msg) {
      btn.disabled = false;
      btn.classList.remove('lg-busy');
      label.textContent = 'Log in';
      if (msg) { alert.textContent = msg; alert.classList.add('on'); }
    }

    // Credentials check, then the emailed code. The session is only created
    // once the code verifies, so a half-finished login leaves nothing behind.
    setTimeout(function () {
      btn.classList.remove('lg-busy');
      label.textContent = 'Log in';
      window.RelVocaVerify.open({
        email: v,
        onCancel: function () { reset(); email.focus(); },
        onVerified: function (verified) {
          try {
            // RelVocaAuth comes from js/relvoca-auth.js, loaded on every page.
            window.RelVocaAuth.login(verified);
          } catch (err) {
            reset('Could not start a session \\u2014 your browser is blocking site storage.');
            return;
          }
          var next = new URLSearchParams(location.search).get('next');
          location.href = next && next.charAt(0) === '/' ? next : '/dashboard';
        }
      });
    }, 550);
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
        <p class="su-lede">Your agents, transcripts and knowledge bases are where you left them.</p>

        <form class="lg-form" id="lg-form" novalidate>
          <div class="lg-field">
            <label for="lg-email">Work email</label>
            <input class="lg-input" id="lg-email" name="email" type="email" autocomplete="username"
                   placeholder="you@company.com" spellcheck="false" autocapitalize="off" required>
            <p class="lg-err"></p>
          </div>

          <div class="lg-field">
            <div class="lg-row">
              <label for="lg-pass">Password</label>
              <a class="lg-forgot" href="login?reset=1">Forgot password?</a>
            </div>
            <div class="lg-wrap">
              <input class="lg-input" id="lg-pass" name="password" type="password"
                     autocomplete="current-password" placeholder="Your password" required>
              <button class="lg-reveal" id="lg-reveal" type="button" aria-label="Show password">Show</button>
            </div>
            <p class="lg-err"></p>
          </div>

          <p class="lg-alert" id="lg-alert" role="alert"></p>

          <button class="lg-btn" id="lg-submit" type="submit">
            <span class="lg-spin" aria-hidden="true"></span>
            <span id="lg-btn-text">Log in</span>
          </button>
        </form>

        <div class="lg-or"><span>or</span></div>
        <a class="lg-btn sec lg-sso" href="login?sso=1">Continue with SSO</a>

        <p class="su-alt">Don&#8217;t have an account? <a href="signup">Sign up</a></p>
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
        <div class="su-msg">81% resolved without a handoff, up 4 points. Log in to see the breakdown.</div>
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
