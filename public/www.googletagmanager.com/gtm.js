/*
 * OFFLINE ARCHIVAL STUB - www.googletagmanager.com/gtm.js
 *
 * Not part of the original crawl. The site-wide Astro bundle
 * (/_astro/Base.astro_astro_type_script_index_0_lang.EQBSJDW75aa6.js) injects
 * this container (GTM-W3ZG4M6) after first interaction, and a docs chunk
 * references it too. Third-party host, so offline it never resolves.
 *
 * Defines the same globals the real container loader publishes - dataLayer and
 * google_tag_manager - as inert no-ops. No network activity, no timers, no
 * storage writes.
 *
 * Note: the injector in Base.astro is gated on
 * location.hostname === www.voiceflow.com | voiceflow.com, so on localhost this
 * file is not requested at all. It exists so the reference resolves and so the
 * mirror still behaves if it is ever served under the original hostname.
 *
 * Placed at the path the mirror requests so no archived HTML had to be edited.
 */
(function () {
  'use strict';
  if (typeof window === 'undefined') { return; }
  var w = window;

  w.dataLayer = w.dataLayer || [];
  w.google_tag_manager = w.google_tag_manager || {};
  w.google_tag_data = w.google_tag_data || {};

  if (typeof w.gtag !== 'function') {
    w.gtag = function () { w.dataLayer.push(arguments); };
  }

  w.__gtmOfflineStub = true;
})();
