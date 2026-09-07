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
 * reloaded the same page forever. Now that round trip lands on the code prompt
 * and finishes at /dashboard.
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
    if (!window.RelVocaVerify || !window.RelVocaAuth) return;

    // Drop the query so a refresh does not reopen the prompt behind the user's
    // back; the CTA has already prefilled the field from it.
    try {
      history.replaceState(null, '', location.pathname);
    } catch (e) {
      /* older browsers just keep the query */
    }

    window.RelVocaVerify.open({
      email: email,
      onCancel: function () {
        var input = document.querySelector('.vf-cta input');
        if (input) { input.focus(); input.select(); }
      },
      onVerified: function (verified) {
        try {
          window.RelVocaAuth.login(verified);
        } catch (err) {
          // Storage blocked: say so rather than looping on a dead button.
          alert('Could not start a session \\u2014 your browser is blocking site storage.');
          return;
        }
        location.href = '/dashboard';
      }
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
