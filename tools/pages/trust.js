'use strict';

/**
 * /trust — the first-party replacement for trust.voiceflow.com.
 *
 * Same donor and hero treatment as /status. Content is drawn from what the
 * mirror's own legal pages already assert (legal/security, legal/gdpr,
 * legal/dpa) so the trust centre and the legal text do not contradict each
 * other, and every "read more" points at one of those captured pages.
 */

const { read, setMain, setMeta, addStyle, write } = require('../make-pages.js');

const CSS = `
.tr{padding:8px 0 96px}
.tr-lede{font:400 17px/27px var(--font-sans);color:var(--vf-text-mid);margin:0 0 34px;max-width:66ch}
.tr-h2{font:600 20px/28px var(--font-sans);letter-spacing:-.01em;margin:46px 0 15px}
.tr-h2:first-of-type{margin-top:0}

.tr-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(232px,1fr));gap:13px}
.tr-cert{background:var(--vfc-color-font-light);border-radius:14px;padding:20px;box-shadow:inset 0 0 0 1px var(--vfc-color-neutral-light-neutrals-light-100)}
.tr-cert-top{display:flex;align-items:center;gap:10px;margin-bottom:9px}
.tr-seal{width:34px;height:34px;border-radius:9px;flex:none;display:grid;place-items:center;background:var(--vfc-color-accent-accent-50);color:var(--vfc-color-accent-accent-600)}
.tr-cert h3{font:600 14px/20px var(--font-sans);margin:0}
.tr-cert p{font:400 13px/19px var(--font-sans);color:var(--vf-text-mid);margin:0}
.tr-state{display:inline-block;font:600 11px/16px var(--font-sans);border-radius:20px;padding:2px 9px;margin-top:11px;background:var(--vfc-color-fern-fern-100);color:var(--vfc-color-fern-fern-800)}
.tr-state.soon{background:var(--vfc-color-neutral-light-neutrals-light-50);color:var(--vf-text-mid)}

.tr-list{display:grid;grid-template-columns:repeat(auto-fit,minmax(268px,1fr));gap:13px}
.tr-item{background:var(--vfc-color-font-light);border-radius:14px;padding:19px 20px;box-shadow:inset 0 0 0 1px var(--vfc-color-neutral-light-neutrals-light-100)}
.tr-item h3{font:600 14px/20px var(--font-sans);margin:0 0 6px}
.tr-item p{font:400 13px/20px var(--font-sans);color:var(--vf-text-mid);margin:0}

.tr-table{width:100%;background:var(--vfc-color-font-light);border-radius:14px;box-shadow:inset 0 0 0 1px var(--vfc-color-neutral-light-neutrals-light-100);border-collapse:collapse;overflow:hidden}
.tr-table th,.tr-table td{text-align:left;padding:13px 20px;font:400 13px/19px var(--font-sans);border-top:1px solid var(--vfc-color-neutral-light-neutrals-light-100)}
.tr-table th{font-weight:600;color:var(--vf-text-heading);border-top:0;background:var(--vfc-color-shades-shades-50)}
.tr-table td{color:var(--vf-text-mid)}
.tr-table td:first-child{color:var(--vf-text-heading);font-weight:600;white-space:nowrap}
.tr-scroll{overflow-x:auto}

.tr-cta{display:flex;flex-wrap:wrap;align-items:center;gap:13px;background:var(--vfc-color-shades-shades-50);border-radius:14px;padding:22px;margin-top:44px;box-shadow:inset 0 0 0 1px var(--vfc-color-neutral-light-neutrals-light-100)}
.tr-cta p{font:400 13px/20px var(--font-sans);color:var(--vf-text-mid);margin:0;flex:1;min-width:240px}
.tr-cta strong{display:block;font:600 15px/22px var(--font-sans);color:var(--vf-text-heading);margin-bottom:3px}
.tr-btn{flex:none;background:var(--vfc-color-accent-accent-500);color:var(--vfc-color-font-light);border-radius:10px;padding:11px 17px;font:600 13px/18px var(--font-sans);text-decoration:none}
.tr-btn:hover{background:var(--vfc-color-accent-accent-600)}
.tr-btn.sec{background:var(--vfc-color-font-light);color:var(--vf-text-heading);box-shadow:inset 0 0 0 1px var(--vfc-color-neutral-light-neutrals-light-100)}
.tr-btn.sec:hover{background:var(--vfc-color-shades-shades-50)}
`;

const SEAL = (d) =>
  `<svg width="17" height="17" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;

const SHIELD = SEAL('<path d="M8 1.6 13 3.4v4c0 3.2-2.1 6-5 7-2.9-1-5-3.8-5-7v-4z"/><path d="m5.9 7.9 1.5 1.5 2.8-2.9"/>');
const GLOBE = SEAL('<circle cx="8" cy="8" r="6.2"/><path d="M1.8 8h12.4M8 1.8c1.6 1.7 2.5 3.9 2.5 6.2S9.6 12.5 8 14.2C6.4 12.5 5.5 10.3 5.5 8S6.4 3.5 8 1.8"/>');
const CROSS = SEAL('<path d="M8 2.2v11.6M2.2 8h11.6"/>');
const LOCK = SEAL('<rect x="3" y="7" width="10" height="7" rx="1.6"/><path d="M5.5 7V5.2a2.5 2.5 0 0 1 5 0V7"/>');

const CERTS = [
  [SHIELD, 'SOC 2 Type II', 'Independently audited annually across security, availability and confidentiality. Report available under NDA.', 'Certified', ''],
  [GLOBE, 'GDPR', 'EU data processing under a standard DPA with Standard Contractual Clauses for transfers.', 'Compliant', ''],
  [CROSS, 'HIPAA', 'Business Associate Agreements available for workspaces handling protected health information.', 'BAA available', ''],
  [LOCK, 'ISO/IEC 27001', 'Information security management system aligned to the standard; certification audit in progress.', 'In progress', 'soon'],
];

const certs = CERTS.map(
  ([icon, name, desc, state, mod]) => `
        <div class="tr-cert">
          <div class="tr-cert-top"><span class="tr-seal">${icon}</span><h3>${name}</h3></div>
          <p>${desc}</p>
          <span class="tr-state ${mod}">${state}</span>
        </div>`
).join('');

const PRACTICES = [
  ['Encryption', 'TLS 1.2+ in transit and AES-256 at rest, with keys managed through a dedicated KMS and rotated on a fixed schedule.'],
  ['Access control', 'SSO and SAML on enterprise plans, role-based permissions per workspace, and least-privilege internal access reviewed quarterly.'],
  ['Data residency', 'Choose EU or US processing for conversation data and knowledge bases. Residency is set per workspace and cannot be changed silently.'],
  ['Retention', 'Configurable transcript retention from 7 to 400 days, with PII redaction rules applied before storage.'],
  ['Testing', 'Independent penetration tests annually, continuous dependency scanning, and a disclosure programme for outside researchers.'],
  ['Resilience', 'Multi-zone deployment with a documented recovery plan, tested twice yearly against a 4-hour RTO and 1-hour RPO.'],
];

const practices = PRACTICES.map(
  ([h, p]) => `        <div class="tr-item"><h3>${h}</h3><p>${p}</p></div>`
).join('\n');

const SUBS = [
  ['Amazon Web Services', 'Cloud hosting and storage', 'US, EU'],
  ['Google Cloud', 'Model serving and speech processing', 'US, EU'],
  ['Anthropic', 'Large language model inference', 'US'],
  ['OpenAI', 'Large language model inference', 'US'],
  ['Deepgram', 'Speech-to-text for voice agents', 'US'],
  ['Twilio', 'Telephony transport for voice channels', 'US, EU'],
  ['Datadog', 'Infrastructure monitoring and logging', 'US'],
];

const subs = SUBS.map(
  ([n, p, r]) => `          <tr><td>${n}</td><td>${p}</td><td>${r}</td></tr>`
).join('\n');

const MAIN = `
<section class="hero-legal" data-parity="hero-heading" data-astro-cid-yodha2z4>
  <div class="nav-spacer" data-astro-cid-yodha2z4></div>
  <div class="gutters" data-astro-cid-yodha2z4>
    <div class="container" data-astro-cid-yodha2z4>
      <div class="hero-intro" data-astro-cid-yodha2z4>
        <p class="intro-tag vf-section-label" data-astro-cid-efuddkgg>Trust</p>
        <h1 class="type-h1 hero-title" data-astro-cid-yodha2z4>Trust centre</h1>
      </div>
    </div>
  </div>
</section>

<div class="gutters">
  <div class="container">
    <div class="tr">
      <p class="tr-lede">How RelVoca protects customer data, which standards we are held to, and who we rely on to run the service. For the binding commitments, read the <a href="legal/terms">Terms of Service</a>, the <a href="privacy">Privacy Policy</a> and the <a href="legal/dpa">Data Processing Agreement</a>.</p>

      <h2 class="tr-h2">Certifications and frameworks</h2>
      <div class="tr-grid">${certs}
      </div>

      <h2 class="tr-h2">How we protect data</h2>
      <div class="tr-list">
${practices}
      </div>

      <h2 class="tr-h2">Subprocessors</h2>
      <div class="tr-scroll">
        <table class="tr-table">
          <thead><tr><th scope="col">Provider</th><th scope="col">Purpose</th><th scope="col">Regions</th></tr></thead>
          <tbody>
${subs}
          </tbody>
        </table>
      </div>

      <div class="tr-cta">
        <p><strong>Need our security documentation?</strong>Request the SOC 2 report, penetration test summary or a signed BAA. Enterprise customers can also request a security review.</p>
        <a class="tr-btn" href="demo">Talk to us</a>
        <a class="tr-btn sec" href="legal/security">Security policy</a>
      </div>
    </div>
  </div>
</div>
`;

module.exports = function build() {
  let doc = read('privacy');
  doc = setMeta(doc, {
    title: 'Trust centre | RelVoca',
    description: 'RelVoca security, compliance and subprocessors — SOC 2, GDPR, HIPAA and data residency.',
    slug: 'trust',
  });
  doc = setMain(doc, MAIN);
  doc = addStyle(doc, CSS);
  write('trust', doc);
};
