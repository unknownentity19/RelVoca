#!/usr/bin/env node
/**
 * Integration test for the Agent Patchbay flow engine.
 *
 * Loads the real <script> out of agent-patchbay.html and runs it against a
 * minimal DOM stub with a stubbed Claude, so the graph traversal, variable
 * interpolation, branch logic and classify routing are exercised as shipped —
 * no browser, no network.
 *
 *   node app/test-runtime.js
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const HTML = fs.readFileSync(path.join(__dirname, 'agent-patchbay.html'), 'utf8');
const code = [...HTML.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');
if (!code.includes('function startRun')) { console.error('could not extract runtime'); process.exit(1); }

/* ---------------- minimal DOM stub ---------------- */
const transcript = [];
function mkEl(tag = 'div') {
  const e = {
    tagName: tag, children: [], className: '', _text: '', value: '', innerHTML: '',
    style: {}, dataset: {}, hidden: false, scrollTop: 0, scrollHeight: 0,
    offsetHeight: 42, type: '', placeholder: '', title: '', selected: false,
    appendChild(c) { this.children.push(c); return c; },
    append(...cs) { cs.forEach(c => this.children.push(c)); },
    remove() { this._removed = true; },
    addEventListener() {}, focus() {}, click() {},
    getBoundingClientRect() { return {left:0, top:0, width:900, height:600}; },
    closest() { return null; }, querySelector() { return null; }, querySelectorAll() { return []; },
    setAttribute() {}, classList: {toggle(){}, add(){}, remove(){}, contains(){return false}},
  };
  Object.defineProperty(e, 'textContent', {
    get() { return e._text; },
    set(v) { e._text = v; },
  });
  return e;
}
const REG = {};
const named = id => (REG[id] = REG[id] || mkEl());

const log = named('#log');
// Capture what the runtime prints into the chat log.
log.appendChild = function (c) {
  this.children.push(c);
  transcript.push({cls: c.className, get text() { return c._text; }, el: c});
  return c;
};

const document = {
  querySelector: sel => named(sel),
  querySelectorAll: () => [],
  createElement: t => mkEl(t),
  createElementNS: () => mkEl('path'),
  addEventListener: () => {},
  fonts: {size: 0},
  images: [],
  body: mkEl('body'),
};

/* ---------------- stubbed Claude ---------------- */
let route = 'technical';
const calls = {sample: 0, json: 0};
const sample = async (input, opts) => {
  calls.sample++;
  const turn = Array.isArray(input) ? input[input.length - 1].content : String(input);
  if (opts && opts.onText) opts.onText({text: 'partial…', delta: 'partial…'});
  return {text: `[claude reply to: ${turn.slice(0, 46)}]`, truncated: false, modelTierApplied: (opts && opts.modelTier) || 'default'};
};
sample.json = async () => { calls.json++; return {category: route}; };

const sandbox = {
  document, console,
  window: {addEventListener: () => {}, claude: undefined},
  requestAnimationFrame: fn => fn(),
  setTimeout, clearTimeout, Math, JSON, Date: {now: () => 0},
  localStorage: {getItem: () => null, setItem: () => {}, removeItem: () => {}},
  navigator: {clipboard: {writeText: async () => {}}},
  FileReader: class {}, performance: {now: () => 0},
};
sandbox.window.document = document;
sandbox.globalThis = sandbox;

const ctx = vm.createContext(sandbox);
vm.runInContext(code + '\n;globalThis.__S = S; globalThis.__startRun = startRun; globalThis.__sendReply = sendReply; globalThis.__fill = fill; globalThis.__branchList = branchList; globalThis.__nodeById = nodeById; globalThis.__agent = agent;', ctx);

const S = sandbox.__S;
S.sample = sample;

/* ---------------- assertions ---------------- */
let pass = 0, fail = 0;
const ok = (name, cond, detail) => {
  if (cond) { pass++; console.log(`  \x1b[32mPASS\x1b[0m  ${name}`); }
  else { fail++; console.log(`  \x1b[31mFAIL\x1b[0m  ${name}${detail ? '\n         ' + detail : ''}`); }
};
const texts = () => transcript.map(t => `${t.cls}|${t.text}`);
const findText = re => transcript.find(t => re.test(t.text || ''));

async function reply(text) {
  named('#say').value = text;
  await sandbox.__sendReply();
}

(async () => {
  console.log('\nAgent Patchbay — flow engine\n');

  // pure helpers
  ok('fill() interpolates {{vars}}', sandbox.__fill('a {{x}} b', {x:'Z'}) === 'a Z b');
  ok('fill() blanks unknown vars', sandbox.__fill('[{{nope}}]', {}) === '[]');
  ok('fill() tolerates null template', sandbox.__fill(null, {}) === '');

  const cls = sandbox.__nodeById('n_cls');
  ok('classify exposes one port per label',
     JSON.stringify(sandbox.__branchList(cls)) === '["billing","technical","cancel","other"]',
     JSON.stringify(sandbox.__branchList(cls)));

  // ---- run 1: technical route ----
  route = 'technical';
  transcript.length = 0;
  await sandbox.__startRun();
  ok('greets on start', /support desk/i.test((transcript[1] || {}).text || ''), texts().join('\n         '));
  ok('pauses for user input', !!S.run.waiting, 'waiting=' + JSON.stringify(S.run.waiting));

  await reply('my wifi keeps dropping');
  ok('captures answer into {{issue}}', S.run.vars.issue === 'my wifi keeps dropping', JSON.stringify(S.run.vars));
  ok('classify called Claude', calls.json === 1, 'json calls=' + calls.json);
  ok('routes to the classified label', S.run.vars.intent === 'technical', 'intent=' + S.run.vars.intent);
  ok('Think block called Claude', calls.sample === 1, 'sample calls=' + calls.sample);
  ok('stores reply in {{reply}}', /claude reply to/.test(S.run.vars.reply || ''), S.run.vars.reply);
  ok('final Say renders {{reply}}', !!findText(/^\[claude reply to/), texts().slice(-4).join('\n         '));
  ok('reaches End', /conversation ended/.test((transcript[transcript.length-1]||{}).text||''), texts().slice(-2).join('\n         '));

  // ---- run 2: a different route must take a different branch ----
  route = 'cancel';
  transcript.length = 0;
  const before = calls.sample;
  await sandbox.__startRun();
  await reply('I want to cancel my plan');
  ok('cancel route hits the retention Say, not a Think',
     !!findText(/pass this to a specialist/) && calls.sample === before,
     `sample calls ${before}->${calls.sample}`);

  // ---- run 3: unknown label falls back instead of dead-ending ----
  route = 'not-a-real-label';
  transcript.length = 0;
  await sandbox.__startRun();
  await reply('something odd');
  ok('unknown label falls back to last route',
     S.run.vars.intent === 'other', 'intent=' + S.run.vars.intent);

  // ---- run 4: Claude failing must not hang the run ----
  route = 'technical';
  transcript.length = 0;
  S.sample = Object.assign(
    async () => { const e = new Error('nope'); e.code = 'rate_limited'; throw e; },
    {json: async () => ({category:'technical'})}
  );
  await sandbox.__startRun();
  await reply('printer on fire');
  ok('surfaces a specific message on rate_limited',
     !!findText(/Too many requests/), texts().join('\n         '));
  ok('does not fall through to the next block after an AI error',
     !findText(/^\[claude reply/), texts().join('\n         '));
  S.sample = sample;

  // ---- a cycle through an Ask block must PAUSE, not spin ----
  const a = sandbox.__agent();
  a.edges = a.edges.filter(e => !(e.from === 'n_out' && e.to === 'n_end'));
  a.edges.push({id:'e_loop1', from:'n_out', port:'out', to:'n_greet'});
  route = 'technical'; transcript.length = 0;
  await sandbox.__startRun();
  await reply('loop me');
  ok('cycle through an Ask block parks for input instead of spinning',
     !!S.run.waiting && !findText(/looped more than 100 steps/),
     'waiting=' + JSON.stringify(S.run.waiting));

  // ---- a cycle with no input step must hit the guard ----
  a.edges = a.edges.filter(e => e.id !== 'e_loop1');
  a.edges.push({id:'e_loop2', from:'n_out',  port:'out', to:'n_save'});
  a.edges.push({id:'e_loop3', from:'n_save', port:'out', to:'n_out'});
  route = 'technical'; transcript.length = 0;
  await sandbox.__startRun();
  await reply('spin me');
  ok('loop guard stops a Say-only cycle', !!findText(/looped more than 100 steps/),
     texts().slice(-2).join('\n         '));

  console.log(`\n  ${pass} passed, ${fail} failed\n`);
  process.exit(fail ? 1 : 0);
})();
