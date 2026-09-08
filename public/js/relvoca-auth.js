/**
 * relvoca-auth.js — session state, read from the server.
 *
 * This used to keep a fake session in localStorage. It now asks
 * /api/auth/me, which reads an httpOnly cookie the page cannot see. That is
 * the point: a session token readable by any script on the page is a session
 * token any injected script can steal.
 *
 * Its other job is unchanged, and is the reason the file exists at all: the
 * captured nav ships both signed-in and signed-out states in the markup and
 * switches between them on a single attribute:
 *
 *   .nav-cta.is-authed                                    { display: none }
 *   html[data-vf-auth] .nav-auth .is-login                { display: none }
 *   html[data-vf-auth] .nav-auth .nav-cta:not(.is-authed) { display: none }
 *   html[data-vf-auth] .nav-auth .nav-cta.is-authed       { display: flex }
 *
 * So the whole nav swap is that one attribute. Toggling `hidden` on the buttons
 * instead loses to those `display` rules.
 */
(function (window, document) {
  'use strict';

  /**
   * The nav's buttons carry explicit `display` rules, which outrank the user
   * agent's `[hidden]{display:none}`. Without this, elements we hide with
   * `el.hidden = true` stay visible.
   */
  (function ensureHiddenWorks() {
    var tag = document.createElement('style');
    tag.setAttribute('data-relvoca-auth', '');
    tag.appendChild(document.createTextNode('[hidden]{display:none !important}'));
    (document.head || document.documentElement).appendChild(tag);
  })();

  /**
   * Let the captured CTA accept any email domain.
   *
   * vf-cta.js refuses free-mail addresses before it will submit, showing
   * "Please use your work email." and never firing. That was Voiceflow's
   * lead-qualification rule; here the same form creates accounts, so it locked
   * out everyone on gmail, outlook, icloud and 18 other domains.
   *
   * Emptying the list via /api/icp-config is not enough: that config feeds
   * VFQualify.check(), while the CTA reads the hardcoded VFQualify.freemail
   * array directly. The array is emptied *in place* rather than reassigned,
   * because vf-cta.js captures a reference to it and would never see a new one.
   *
   * vf-qualify.js is deferred and may not have run yet, so this retries briefly
   * and gives up rather than polling forever.
   */
  (function allowAnyEmailDomain() {
    function clear() {
      var q = window.VFQualify;
      if (!q || !Array.isArray(q.freemail)) return false;
      q.freemail.length = 0;
      return true;
    }
    if (clear()) return;
    var tries = 0;
    var timer = setInterval(function () {
      if (clear() || ++tries > 40) clearInterval(timer);
    }, 50);
  })();

  var current = null; // last known user, or null
  var pending = null; // in-flight /api/auth/me

  var Auth = {
    /** Ask the server who is signed in. Cached per page load. */
    load: function () {
      if (pending) return pending;
      pending = fetch('/api/auth/me', {
        credentials: 'same-origin',
        headers: { Accept: 'application/json' },
      })
        .then(function (r) {
          return r.ok ? r.json() : { user: null };
        })
        .catch(function () {
          // Offline or the API is down: render as signed out rather than
          // leaving the nav in a half-painted state.
          return { user: null };
        })
        .then(function (data) {
          current = (data && data.user) || null;
          Auth.paint();
          return current;
        });
      return pending;
    },

    /** Synchronous read of the last known user. Null until load() resolves. */
    get: function () {
      return current;
    },

    isAuthed: function () {
      return !!current;
    },

    logout: function () {
      return fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' })
        .catch(function () {})
        .then(function () {
          current = null;
          Auth.paint();
          window.location.href = '/';
        });
    },

    /** Show the nav state that matches the session. */
    paint: function () {
      var authed = !!current;

      if (authed) document.documentElement.setAttribute('data-vf-auth', '');
      else document.documentElement.removeAttribute('data-vf-auth');

      // Pages of our own opt in explicitly rather than by nav class.
      var nodes = document.querySelectorAll('[data-auth-when]');
      for (var i = 0; i < nodes.length; i++) {
        nodes[i].hidden = (nodes[i].getAttribute('data-auth-when') === 'authed') !== authed;
      }

      var slots = document.querySelectorAll('[data-auth-field]');
      var s = current || {};
      for (var j = 0; j < slots.length; j++) {
        var key = slots[j].getAttribute('data-auth-field');
        if (s[key]) slots[j].textContent = s[key];
      }
    },

    /**
     * Gate a page on being signed in. Resolves to the user, or redirects to
     * /login and resolves to null. Async because the answer lives on the
     * server — callers must await it.
     */
    requireSession: function () {
      return Auth.load().then(function (user) {
        if (user) return user;
        window.location.replace('/login?next=' + encodeURIComponent(window.location.pathname));
        return null;
      });
    },
  };

  window.RelVocaAuth = Auth;

  document.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('[data-auth-logout]') : null;
    if (!t) return;
    e.preventDefault();
    Auth.logout();
  });

  Auth.load();
})(window, document);
