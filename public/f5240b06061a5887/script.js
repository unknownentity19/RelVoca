/*
 * OFFLINE ARCHIVAL STUB - /f5240b06061a5887/script.js
 *
 * Not part of the original crawl. This obfuscated first-party path is Vercel
 * Speed Insights proxied through voiceflow.com to dodge content blockers; the
 * real file lived only on the edge, so the mirror 404s here. 560 archived pages
 * mount a <vercel-speed-insights> custom element whose loader appends this
 * script, and on failure it logs
 * "[Vercel Speed Insights] Failed to load script from ... content blockers".
 *
 * The loader has already installed window.si as a queue shim before this file
 * runs. The real script replaces it with the reporter; this stub replaces it
 * with a no-op and drops the queue, so nothing throws and no web-vital beacon is
 * ever assembled. Inert: no network activity, no timers, no observers.
 *
 * Placed at the path the mirror requests so no archived HTML had to be edited.
 */
(function () {
  'use strict';
  if (typeof window === 'undefined') { return; }
  var w = window;

  // Accept and discard anything the loader or page hands us:
  //   si('beforeSend', fn) | si('route', '/path') | si(...anything)
  w.si = function () {};

  // The pre-load queue shim accumulated calls here; drop them unread.
  w.siq = [];

  w.__vercelSpeedInsightsOfflineStub = true;
})();
