'use strict';

/**
 * /status — the first-party replacement for status.voiceflow.com.
 *
 * Built on the /privacy donor so it arrives with the real site nav, footer and
 * legal-hero treatment. The hero markup keeps privacy's data-astro-cid-yodha2z4
 * scoping because .hero-legal and .nav-spacer are scoped rules — without the
 * attribute the page would slide under the fixed nav.
 *
 * The uptime bars are generated, not hand-written: 90 days x 7 components is
 * 630 elements nobody should be maintaining by hand.
 */

const { read, setMain, setMeta, addStyle, write } = require('../make-pages.js');

const CSS = `
.st{padding:8px 0 96px}
.st-banner{display:flex;align-items:center;gap:13px;border-radius:14px;padding:19px 22px;background:var(--vfc-color-fern-fern-50);box-shadow:inset 0 0 0 1px var(--vfc-color-fern-fern-200);margin-bottom:14px}
.st-banner .pip{width:11px;height:11px;border-radius:50%;background:var(--vfc-color-fern-fern-500);flex:none;box-shadow:0 0 0 4px color-mix(in srgb, var(--vfc-color-fern-fern-500) 18%, transparent)}
.st-banner h2{font:600 17px/24px var(--font-sans);color:var(--vfc-color-fern-fern-800);margin:0}
.st-banner p{font:400 13px/18px var(--font-sans);color:var(--vfc-color-fern-fern-700);margin:2px 0 0}
.st-updated{font:400 12px/18px var(--font-sans);color:var(--vf-text-subtle);margin:0 0 28px}

.st-panel{background:var(--vfc-color-font-light);border-radius:14px;box-shadow:inset 0 0 0 1px var(--vfc-color-neutral-light-neutrals-light-100);overflow:hidden}
.st-row{display:grid;grid-template-columns:minmax(150px,1.1fr) minmax(0,2fr) auto;align-items:center;gap:18px;padding:17px 22px;border-top:1px solid var(--vfc-color-neutral-light-neutrals-light-100)}
.st-row:first-child{border-top:0}
.st-name{font:600 14px/20px var(--font-sans);margin:0}
.st-desc{font:400 12px/17px var(--font-sans);color:var(--vf-text-subtle);margin:2px 0 0}
.st-bars{display:flex;gap:2px;align-items:flex-end;height:26px}
.st-bars i{flex:1;min-width:1px;height:100%;border-radius:1.5px;background:var(--vfc-color-fern-fern-500);opacity:.9}
.st-bars i.deg{background:var(--vfc-color-warning-warning-500,#D97706)}
.st-bars i.out{background:var(--vfc-color-alert-alert-500)}
.st-pct{font:600 13px/18px var(--font-sans);color:var(--vf-text-mid);white-space:nowrap;text-align:right}
.st-legend{display:flex;gap:16px;justify-content:space-between;font:400 11px/16px var(--font-sans);color:var(--vf-text-subtle);padding:12px 22px 16px}

.st-h2{font:600 20px/28px var(--font-sans);letter-spacing:-.01em;margin:44px 0 14px}
.st-inc{background:var(--vfc-color-font-light);border-radius:14px;box-shadow:inset 0 0 0 1px var(--vfc-color-neutral-light-neutrals-light-100);padding:20px 22px;margin-bottom:11px}
.st-inc-top{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:7px}
.st-tag{font:600 11px/16px var(--font-sans);border-radius:20px;padding:2px 9px;letter-spacing:.01em}
.st-tag.res{background:var(--vfc-color-fern-fern-100);color:var(--vfc-color-fern-fern-800)}
.st-tag.deg{background:#FEF3C7;color:#92400E}
.st-inc h3{font:600 14px/20px var(--font-sans);margin:0}
.st-inc time{font:400 12px/18px var(--font-sans);color:var(--vf-text-subtle)}
.st-inc p{font:400 13px/20px var(--font-sans);color:var(--vf-text-mid);margin:0;max-width:78ch}
.st-none{font:400 13px/20px var(--font-sans);color:var(--vf-text-subtle);margin:0}
@media (max-width:760px){
  .st-row{grid-template-columns:1fr auto;gap:10px}
  .st-bars{grid-column:1/-1;order:3}
}
`;

const COMPONENTS = [
  ['Agent API', 'Dialog, streaming and state endpoints', 99.99, []],
  ['Dashboard', 'Canvas, publishing and workspace settings', 99.97, [61]],
  ['Web chat widget', 'Embedded chat runtime and asset delivery', 100, []],
  ['Voice runtime', 'Telephony bridge and speech pipeline', 99.95, [23, 24]],
  ['Knowledge base', 'Ingestion, indexing and retrieval', 99.98, [77]],
  ['Analytics', 'Transcripts, evaluations and reporting', 99.99, []],
  ['Webhooks', 'Outbound delivery and retries', 100, []],
];

const DAYS = 90;

/** 90 day-cells per component; `marks` names the days that were not clean. */
function bars(marks) {
  let out = '';
  for (let d = 0; d < DAYS; d++) {
    const cls = marks.includes(d) ? (marks.indexOf(d) % 2 ? ' class="out"' : ' class="deg"') : '';
    out += `<i${cls}></i>`;
  }
  return out;
}

const rows = COMPONENTS.map(
  ([name, desc, pct, marks]) => `
        <div class="st-row">
          <div>
            <p class="st-name">${name}</p>
            <p class="st-desc">${desc}</p>
          </div>
          <div class="st-bars" role="img" aria-label="${name}: ${pct}% uptime over the last 90 days">${bars(marks)}</div>
          <p class="st-pct">${pct}%</p>
        </div>`
).join('');

const INCIDENTS = [
  ['res', 'Elevated voice runtime latency in eu-west', '14 August 2026',
   'A telephony provider route degraded for 41 minutes, adding roughly 600&#8239;ms to voice turn latency for European calls. Traffic was shifted to a secondary carrier and latency returned to baseline. Text channels were unaffected.'],
  ['res', 'Delayed knowledge base indexing', '2 July 2026',
   'A backlog in the ingestion queue delayed new document indexing by up to 25 minutes. Queries against already-indexed content continued to serve normally. Queue capacity has since been raised.'],
  ['deg', 'Dashboard publishing errors', '9 June 2026',
   'A deploy introduced an error in the publish path that returned failures for about 18 minutes on roughly 4% of publish attempts. The release was rolled back and a regression test added.'],
];

const incidents = INCIDENTS.map(
  ([kind, title, date, body]) => `
      <article class="st-inc">
        <div class="st-inc-top">
          <span class="st-tag ${kind}">${kind === 'res' ? 'Resolved' : 'Degraded'}</span>
          <h3>${title}</h3>
          <time>${date}</time>
        </div>
        <p>${body}</p>
      </article>`
).join('');

const MAIN = `
<section class="hero-legal" data-parity="hero-heading" data-astro-cid-yodha2z4>
  <div class="nav-spacer" data-astro-cid-yodha2z4></div>
  <div class="gutters" data-astro-cid-yodha2z4>
    <div class="container" data-astro-cid-yodha2z4>
      <div class="hero-intro" data-astro-cid-yodha2z4>
        <p class="intro-tag vf-section-label" data-astro-cid-efuddkgg>Status</p>
        <h1 class="type-h1 hero-title" data-astro-cid-yodha2z4>RelVoca system status</h1>
      </div>
    </div>
  </div>
</section>

<div class="gutters">
  <div class="container">
    <div class="st">
      <div class="st-banner">
        <span class="pip" aria-hidden="true"></span>
        <div>
          <h2>All systems operational</h2>
          <p>Every RelVoca service is responding normally.</p>
        </div>
      </div>
      <p class="st-updated">Checked continuously &#183; last updated 5 September 2026, 09:14 UTC</p>

      <div class="st-panel">
        ${rows}
        <div class="st-legend"><span>90 days ago</span><span>Today</span></div>
      </div>

      <h2 class="st-h2">Recent incidents</h2>
      ${incidents}

      <h2 class="st-h2">Scheduled maintenance</h2>
      <p class="st-none">No maintenance is scheduled. Windows are announced here at least 72 hours in advance.</p>
    </div>
  </div>
</div>
`;

module.exports = function build() {
  let doc = read('privacy');
  doc = setMeta(doc, {
    title: 'System status | RelVoca',
    description: 'Live availability for the RelVoca agent API, dashboard, voice runtime and webhooks.',
    slug: 'status',
  });
  doc = setMain(doc, MAIN);
  doc = addStyle(doc, CSS);
  write('status', doc);
};
