'use strict';

/**
 * /dashboard — the first-party replacement for creator.voiceflow.com.
 *
 * Every "Open Voiceflow" / "Dashboard" CTA in the capture pointed at the real
 * product. Those now land here. It deliberately uses the /signup donor (bare
 * shell, no marketing nav or footer) because a product surface should not wear
 * the marketing chrome — the app has its own sidebar and top bar.
 *
 * The agent cards link to app/agent-patchbay.html, the working no-backend
 * builder already in this repo, so the CTA chain ends somewhere real instead of
 * at a dead mock.
 */

const {
  read, setMain, setMeta, addStyle, addScript, stripOwnScripts, write,
} = require('../make-pages.js');

const CSS = `
.db{display:flex;min-height:100vh;font-family:var(--font-sans);color:var(--vf-text-heading);background:var(--vfc-color-shades-shades-50)}
.db-side{flex:none;width:236px;background:var(--vfc-color-font-light);border-right:1px solid var(--vfc-color-neutral-light-neutrals-light-100);padding:20px 14px;display:flex;flex-direction:column;gap:22px}
.db-brand{display:block;padding:4px 8px}
.db-brand img{height:22px;width:auto;display:block}
.db-ws{display:flex;align-items:center;gap:9px;padding:9px 10px;border-radius:9px;background:var(--vfc-color-shades-shades-50);box-shadow:inset 0 0 0 1px var(--vfc-color-neutral-light-neutrals-light-100)}
.db-ws-badge{width:26px;height:26px;border-radius:7px;flex:none;background:var(--vfc-color-accent-accent-500);color:var(--vfc-color-font-light);display:grid;place-items:center;font:700 12px/1 var(--font-sans)}
.db-ws-meta{min-width:0}
.db-ws-name{font:600 13px/17px var(--font-sans);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.db-ws-plan{font:400 11px/15px var(--font-sans);color:var(--vf-text-subtle)}
.db-nav{display:flex;flex-direction:column;gap:2px}
.db-nav a{display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:8px;font:500 13px/18px var(--font-sans);color:var(--vf-text-mid);text-decoration:none}
.db-nav a:hover{background:var(--vfc-color-shades-shades-50);color:var(--vf-text-heading)}
.db-nav a.on{background:var(--vfc-color-accent-accent-50);color:var(--vfc-color-accent-accent-700);font-weight:600}
.db-nav .ic{width:15px;height:15px;flex:none;opacity:.85}
.db-side-foot{margin-top:auto;display:flex;flex-direction:column;gap:8px}
.db-user{display:flex;align-items:center;gap:9px;padding:8px 10px;border-radius:9px}
.db-avatar{width:26px;height:26px;border-radius:50%;flex:none;background:var(--vfc-color-neutral-dark-neutrals-dark-600);color:var(--vfc-color-font-light);display:grid;place-items:center;font:700 11px/1 var(--font-sans)}
.db-user-meta{min-width:0}
.db-user-name{font:600 12px/16px var(--font-sans);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.db-user-mail{font:400 11px/15px var(--font-sans);color:var(--vf-text-subtle);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:150px}
.db-logout{border:0;background:transparent;text-align:left;cursor:pointer;padding:9px 10px;border-radius:8px;font:500 13px/18px var(--font-sans);color:var(--vf-text-mid)}
.db-logout:hover{background:var(--vfc-color-shades-shades-50);color:var(--vf-text-heading)}

.db-main{flex:1;min-width:0;display:flex;flex-direction:column}
.db-top{display:flex;align-items:center;gap:16px;padding:18px 28px;border-bottom:1px solid var(--vfc-color-neutral-light-neutrals-light-100);background:var(--vfc-color-font-light)}
.db-top h1{font:600 17px/24px var(--font-sans);margin:0;letter-spacing:-.01em}
.db-search{margin-left:auto;position:relative}
.db-search input{width:230px;border:1px solid var(--vfc-color-neutral-light-neutrals-light-100);border-radius:9px;padding:9px 12px;font:400 13px/18px var(--font-sans);outline:none;background:var(--vfc-color-shades-shades-50)}
.db-search input:focus{border-color:var(--vfc-color-accent-accent-500);background:var(--vfc-color-font-light);box-shadow:0 0 0 3px color-mix(in srgb, var(--vf-brand) 12%, transparent)}
.db-new{border:0;cursor:pointer;background:var(--vfc-color-accent-accent-500);color:var(--vfc-color-font-light);border-radius:9px;padding:10px 15px;font:600 13px/18px var(--font-sans);text-decoration:none;display:inline-block}
.db-new:hover{background:var(--vfc-color-accent-accent-600)}

.db-body{padding:26px 28px 48px;overflow-y:auto}
.db-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(178px,1fr));gap:12px;margin-bottom:26px}
.db-stat{background:var(--vfc-color-font-light);border-radius:12px;padding:15px 17px;box-shadow:inset 0 0 0 1px var(--vfc-color-neutral-light-neutrals-light-100)}
.db-stat-k{font:500 12px/16px var(--font-sans);color:var(--vf-text-subtle);margin:0 0 7px}
.db-stat-v{font:600 24px/28px var(--font-sans);letter-spacing:-.02em;margin:0}
.db-stat-d{font:500 11px/15px var(--font-sans);color:var(--vfc-color-fern-fern-600);margin:5px 0 0}

.db-sec{display:flex;align-items:baseline;justify-content:space-between;margin:0 0 13px}
.db-sec h2{font:600 14px/20px var(--font-sans);margin:0}
.db-sec a{font:500 12px/18px var(--font-sans);color:var(--vfc-color-accent-accent-500);text-decoration:none}
.db-sec a:hover{text-decoration:underline}
.db-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(258px,1fr));gap:13px}
.db-card{display:flex;flex-direction:column;gap:11px;background:var(--vfc-color-font-light);border-radius:12px;padding:17px;text-decoration:none;color:inherit;box-shadow:inset 0 0 0 1px var(--vfc-color-neutral-light-neutrals-light-100);transition:box-shadow .15s ease,transform .15s ease}
.db-card:hover{box-shadow:inset 0 0 0 1px var(--vfc-color-accent-accent-300),0 6px 18px color-mix(in srgb, var(--vfc-color-black-100) 7%, transparent);transform:translateY(-1px)}
.db-card-top{display:flex;align-items:center;gap:10px}
.db-badge{width:32px;height:32px;border-radius:9px;flex:none;display:grid;place-items:center;font:700 13px/1 var(--font-sans);color:var(--vfc-color-font-light)}
.db-card h3{font:600 14px/19px var(--font-sans);margin:0}
.db-card p{font:400 12px/17px var(--font-sans);color:var(--vf-text-mid);margin:0;min-height:34px}
.db-card-foot{display:flex;align-items:center;gap:8px;font:500 11px/15px var(--font-sans);color:var(--vf-text-subtle)}
.db-dot{width:6px;height:6px;border-radius:50%;flex:none;background:var(--vfc-color-fern-fern-500)}
.db-dot.draft{background:var(--vfc-color-neutral-light-neutrals-light-400)}
.db-sep{opacity:.5}

.db-empty{grid-column:1/-1;display:flex;flex-direction:column;align-items:flex-start;gap:9px;background:var(--vfc-color-font-light);border-radius:12px;padding:26px;box-shadow:inset 0 0 0 1px var(--vfc-color-neutral-light-neutrals-light-100)}
.db-empty h3{font:600 14px/20px var(--font-sans);margin:0}
.db-empty p{font:400 13px/19px var(--font-sans);color:var(--vf-text-mid);margin:0;max-width:52ch}
.db-note{margin:26px 0 0;font:400 12px/18px var(--font-sans);color:var(--vf-text-subtle)}
/* .db-card and .db-empty set display, which beats the UA [hidden] rule. */
.db [hidden]{display:none !important}
@media (max-width:860px){
  .db{flex-direction:column}
  .db-side{width:auto;flex-direction:row;align-items:center;gap:14px;overflow-x:auto;border-right:0;border-bottom:1px solid var(--vfc-color-neutral-light-neutrals-light-100);padding:12px 14px}
  .db-nav{flex-direction:row}
  .db-side-foot{margin:0 0 0 auto;flex-direction:row;align-items:center}
  .db-ws,.db-user-meta{display:none}
  .db-search input{width:150px}
}
`;

const JS = `
(function () {
  // The session lives in an httpOnly cookie, so only the server can answer
  // who this is. requireSession() resolves to the user, or redirects to
  // /login and resolves to null.
  window.RelVocaAuth.requireSession().then(function (s) {
    if (!s) return;

    var ws = (s.workspace || '').split('.')[0] || 'Workspace';
    var pretty = ws.charAt(0).toUpperCase() + ws.slice(1);
    var name = s.name || s.email || 'there';

    document.getElementById('db-ws-name').textContent = pretty;
    document.getElementById('db-ws-badge').textContent = pretty.charAt(0).toUpperCase();
    document.getElementById('db-avatar').textContent = name.charAt(0).toUpperCase();
    document.getElementById('db-hello').textContent = name.split(' ')[0];

    var q = document.getElementById('db-q');
    q.addEventListener('input', function () {
      var term = q.value.trim().toLowerCase();
      var cards = document.querySelectorAll('.db-card');
      var shown = 0;
      for (var i = 0; i < cards.length; i++) {
        var hit = !term || cards[i].textContent.toLowerCase().indexOf(term) !== -1;
        cards[i].hidden = !hit;
        if (hit) shown++;
      }
      document.getElementById('db-empty').hidden = shown !== 0;
    });
  });
})();
`;

const AGENTS = [
  ['Support Triage', '#4B4DED', 'Routes inbound tickets to the right queue and answers tier-1 questions.', 'Live', 'Web chat', ''],
  ['Order Status', '#0E9F6E', 'Looks up orders and returns delivery windows from the commerce API.', 'Live', 'Voice', ''],
  ['Onboarding Coach', '#B45309', 'Walks new customers through setup over eight guided steps.', 'Live', 'Web chat', ''],
  ['Renewal Outreach', '#6D28D9', 'Drafts renewal conversations from account health signals.', 'Draft', 'Email', 'draft'],
];

const cards = AGENTS.map(
  ([name, color, desc, state, channel, draft]) => `
      <a class="db-card" href="/app/agent-patchbay">
        <div class="db-card-top">
          <span class="db-badge" style="background:${color}">${name.charAt(0)}</span>
          <h3>${name}</h3>
        </div>
        <p>${desc}</p>
        <div class="db-card-foot">
          <span class="db-dot ${draft}"></span><span>${state}</span>
          <span class="db-sep">&middot;</span><span>${channel}</span>
        </div>
      </a>`
).join('');

const ICON = (d) =>
  `<svg class="ic" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;

const MAIN = `
<div class="db">
  <aside class="db-side">
    <a class="db-brand" href="index.html" aria-label="RelVoca home"><img src="images/logo.svg" alt="RelVoca"></a>

    <div class="db-ws">
      <span class="db-ws-badge" id="db-ws-badge">R</span>
      <span class="db-ws-meta">
        <span class="db-ws-name" id="db-ws-name">Workspace</span>
        <span class="db-ws-plan">Pro plan</span>
      </span>
    </div>

    <nav class="db-nav">
      <a class="on" href="dashboard">${ICON('<rect x="2" y="2" width="5" height="5" rx="1"/><rect x="9" y="2" width="5" height="5" rx="1"/><rect x="2" y="9" width="5" height="5" rx="1"/><rect x="9" y="9" width="5" height="5" rx="1"/>')}Agents</a>
      <a href="docs/documentation/measure/analytics.html">${ICON('<path d="M2 13V7M6 13V3M10 13V9M14 13v-4"/>')}Analytics</a>
      <a href="docs/documentation/measure/transcripts.html">${ICON('<path d="M3 3h10v7H8l-3 3v-3H3z"/>')}Transcripts</a>
      <a href="docs/documentation/build/querying-the-knowledge-base.html">${ICON('<path d="M3 3h6a2 2 0 0 1 2 2v8H5a2 2 0 0 0-2 2z"/><path d="M13 3v10"/>')}Knowledge base</a>
      <a href="docs/api-reference/api-overview.html">${ICON('<path d="M6 4 2 8l4 4M10 4l4 4-4 4"/>')}API</a>
      <a href="pricing">${ICON('<circle cx="8" cy="8" r="6"/><path d="M8 5v6M6 7h4"/>')}Billing</a>
    </nav>

    <div class="db-side-foot">
      <div class="db-user">
        <span class="db-avatar" id="db-avatar">R</span>
        <span class="db-user-meta">
          <span class="db-user-name" data-auth-field="name">Account</span>
          <span class="db-user-mail" data-auth-field="email"></span>
        </span>
      </div>
      <button class="db-logout" type="button" data-auth-logout>Log out</button>
    </div>
  </aside>

  <div class="db-main">
    <header class="db-top">
      <h1>Good to see you, <span id="db-hello">there</span></h1>
      <div class="db-search"><input id="db-q" type="search" placeholder="Search agents" aria-label="Search agents"></div>
      <a class="db-new" href="/app/agent-patchbay">New agent</a>
    </header>

    <div class="db-body">
      <div class="db-stats">
        <div class="db-stat"><p class="db-stat-k">Conversations this week</p><p class="db-stat-v">1,284</p><p class="db-stat-d">&#8593; 12% vs last week</p></div>
        <div class="db-stat"><p class="db-stat-k">Containment rate</p><p class="db-stat-v">81%</p><p class="db-stat-d">&#8593; 4 pts</p></div>
        <div class="db-stat"><p class="db-stat-k">Median response</p><p class="db-stat-v">1.4s</p><p class="db-stat-d">&#8595; 0.2s</p></div>
        <div class="db-stat"><p class="db-stat-k">Active agents</p><p class="db-stat-v">3</p><p class="db-stat-d">1 in draft</p></div>
      </div>

      <div class="db-sec">
        <h2>Your agents</h2>
        <a href="docs/documentation/introduction.html">Documentation</a>
      </div>

      <div class="db-grid">${cards}
        <div class="db-empty" id="db-empty" hidden>
          <h3>No agents match that search</h3>
          <p>Try a different term, or start a new agent from a blank canvas.</p>
        </div>
      </div>

      <p class="db-note">This is a local RelVoca build &#8212; the workspace above is stored in this browser only. Opening an agent launches the RelVoca canvas.</p>
    </div>
  </div>
</div>
`;

module.exports = function build() {
  // Strip signup's own injected scripts so they are not inherited here.
  let doc = stripOwnScripts(read('signup'));
  doc = setMeta(doc, {
    title: 'Dashboard | RelVoca',
    description: 'Your RelVoca workspace — agents, analytics and transcripts.',
    slug: 'dashboard',
  });
  doc = setMain(doc, MAIN);
  doc = addStyle(doc, CSS);
  doc = doc.replace('</body>', '<script src="js/relvoca-auth.js"></script></body>');
  doc = addScript(doc, JS);
  write('dashboard', doc);
};
