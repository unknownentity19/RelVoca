'use strict';

/**
 * /signup — add the email verification step.
 *
 * Unlike the other pages here, signup is *captured* content, not something we
 * generate. It keeps its original markup and its `vf-cta` component; this only
 * adds the verification step on the end.
 *
 * Why it hooks `?email=` instead of the submit event: the captured `vf-cta.js`
 * is a minified bundle that, on submit, navigates to `data-signup-href` with
 * `?email=` appended. Patching that bundle would be fragile. Reading the query
 * on load achieves the same thing and leaves the component untouched.
 *
 * It also fixes a dead end. Since the delink pass rewrote `data-signup-href`
 * from `creator.voiceflow.com/signup` to `/signup`, submitting the form just
 * reloaded the same page forever. Now that round trip posts to
 * /api/auth/request and shows the "check your email" notice; the emailed link
 * is what finishes the sign-in.
 *
 * Idempotent: previously injected scripts are stripped before new ones go in,
 * so this can run on an already-patched file.
 */

const { read, addScript, stripOwnScripts, write } = require('../make-pages.js');

const JS = `
(function () {
  // The captured CTA sends us back here as /signup?email=<address>.
  var email = new URLSearchParams(location.search).get('email');
  if (!email) return;

  function start() {
    if (!window.RelVocaVerify) return;

    // Drop the query so a refresh does not re-send behind the user's back;
    // the CTA has already prefilled the field from it.
    try { history.replaceState(null, '', location.pathname); } catch (e) {}

    function request(addr) {
      return fetch('/api/auth/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ email: addr })
      });
    }

    function fail(message) {
      // Surface it rather than leaving the page looking like nothing happened.
      var bar = document.querySelector('.vf-cta');
      if (bar) {
        bar.classList.add('is-invalid');
        var err = bar.querySelector('.vf-cta-err');
        if (err) err.textContent = message;
      }
    }

    request(email).then(function (r) {
      if (!r.ok) throw new Error('request failed');
      return r.json();
    }).then(function (data) {
      // Only show "check your email" if the mail provider accepted it.
      if (data && data.delivered === false) {
        fail('We could not deliver a link to that address. On this build only '
          + 'the mailbox the Resend account was created with can receive mail, '
          + 'until a sending domain is verified.');
        return;
      }
      window.RelVocaVerify.sent({
        email: email,
        onResend: function (addr) { request(addr); },
        onCancel: function () {
          var input = document.querySelector('.vf-cta input');
          if (input) { input.focus(); input.select(); }
        }
      });
    }).catch(function () {
      fail('We could not send the link just now. Try again in a moment.');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
`;

module.exports = function build() {
  let doc = stripOwnScripts(read('signup'));
  doc = doc.replace(
    '</body>',
    '<script src="js/relvoca-auth.js"></script>' +
      '<script src="js/relvoca-verify.js"></script></body>'
  );
  doc = addScript(doc, JS, 'data-relvoca');
  write('signup', doc);
};
