/**
 * relvoca-auth.js — demo session state for the offline RelVoca build.
 *
 * There is no auth server here, so "logged in" means one localStorage record in
 * this browser. Its only job is to drive UI that the captured markup already
 * ships: the nav renders `.nav-pill.is-login`, `.nav-cta` and `.nav-cta.is-authed`
 * side by side and expects something to decide which are visible. This does
 * that, and nothing else.
 *
 * Storage can throw outright (Safari private mode, site-data blocked), so every
 * access is guarded and a failure degrades to "logged out" rather than breaking
 * the page.
 */
(function (window, document) {
  'use strict';

  var KEY = 'relvoca.session';

  /**
   * The nav's buttons carry explicit `display` rules, which outrank the user
   * agent's `[hidden]{display:none}`. Without this the elements stay visible
   * after `el.hidden = true` and the logged-in and logged-out states render on
   * top of each other. Injected rather than shipped in a stylesheet so any page
   * that loads this script is covered.
   */
  (function ensureHiddenWorks() {
    var css = '[hidden]{display:none !important}';
    var tag = document.createElement('style');
    tag.setAttribute('data-relvoca-auth', '');
    tag.appendChild(document.createTextNode(css));
    (document.head || document.documentElement).appendChild(tag);
  })();

  function safeGet() {
    try {
      var raw = window.localStorage.getItem(KEY);
      if (!raw) return null;
      var s = JSON.parse(raw);
      return s && s.email ? s : null;
    } catch (e) {
      return null;
    }
  }

  function safeSet(session) {
    // Throws when storage is unavailable; callers surface that to the user.
    window.localStorage.setItem(KEY, JSON.stringify(session));
  }

  function nameFor(email) {
    var local = String(email).split('@')[0].replace(/[._-]+/g, ' ').trim();
    return local.replace(/\b[a-z]/g, function (c) {
      return c.toUpperCase();
    }) || 'There';
  }

  var Auth = {
    get: safeGet,

    isAuthed: function () {
      return !!safeGet();
    },

    login: function (email) {
      var session = {
        email: String(email).trim(),
        name: nameFor(email),
        workspace: String(email).split('@')[1] || 'workspace',
        at: Date.now()
      };
      safeSet(session);
      Auth.paint();
      return session;
    },

    logout: function () {
      try {
        window.localStorage.removeItem(KEY);
      } catch (e) {
        /* nothing to clear */
      }
      Auth.paint();
    },

    /** Show the nav state that matches the session. */
    paint: function () {
      var authed = Auth.isAuthed();

      // The captured stylesheet already carries both nav states and switches
      // between them on an attribute:
      //
      //   .nav-cta.is-authed                             { display: none }
      //   html[data-vf-auth] .nav-auth .is-login         { display: none }
      //   html[data-vf-auth] .nav-auth .nav-cta:not(.is-authed) { display: none }
      //   html[data-vf-auth] .nav-auth .nav-cta.is-authed{ display: flex }
      //
      // So the whole nav swap is this one attribute. Toggling `hidden` on the
      // individual buttons instead would lose to those `display` rules.
      if (authed) document.documentElement.setAttribute('data-vf-auth', '');
      else document.documentElement.removeAttribute('data-vf-auth');

      // Pages of our own opt in explicitly rather than by nav class.
      var nodes = document.querySelectorAll('[data-auth-when]');
      for (var i = 0; i < nodes.length; i++) {
        nodes[i].hidden = (nodes[i].getAttribute('data-auth-when') === 'authed') !== authed;
      }

      var slots = document.querySelectorAll('[data-auth-field]');
      var s = Auth.get() || {};
      for (var j = 0; j < slots.length; j++) {
        var key = slots[j].getAttribute('data-auth-field');
        if (s[key]) slots[j].textContent = s[key];
      }
    },

    /** Send anonymous visitors to /login, preserving where they were headed. */
    requireSession: function () {
      if (Auth.isAuthed()) return true;
      location.replace('/login?next=' + encodeURIComponent(location.pathname));
      return false;
    }
  };

  window.RelVocaAuth = Auth;

  document.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('[data-auth-logout]') : null;
    if (!t) return;
    e.preventDefault();
    Auth.logout();
    location.href = '/';
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', Auth.paint);
  } else {
    Auth.paint();
  }
})(window, document);
