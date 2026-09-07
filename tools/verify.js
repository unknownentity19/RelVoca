#!/usr/bin/env node
/**
 * Regression gate for the www.voiceflow.com offline archive.
 *
 * Re-runs the static reference audit and compares the result against the
 * baseline recorded in package.json (voiceflowArchive.baseline). Exits non-zero
 * if broken references have increased.
 *
 * The rule this enforces:
 *   Any change to this tree must leave MISSING the same or lower. If a change
 *   makes it worse, revert the change -- do not raise the baseline. Lower the
 *   baseline deliberately, in the same commit, when a repair genuinely fixes
 *   references.
 *
 *   node tools/verify.js              # audit, then check against the baseline
 *   node tools/verify.js --no-audit   # check the existing report, don't re-run
 *   node tools/verify.js --update     # print the package.json patch to adopt
 *                                     # a genuine improvement (never applied
 *                                     # automatically)
 *
 * Zero dependencies; Node standard library only.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const TOOLS = __dirname;
const PROJECT = path.join(TOOLS, '..');
const PKG_PATH = path.join(PROJECT, 'package.json');
const REPORT_PATH = path.join(TOOLS, 'audit-report.json');
const AUDIT_PATH = path.join(TOOLS, 'audit.js');

const argv = process.argv.slice(2);
const skipAudit = argv.includes('--no-audit');
const wantUpdate = argv.includes('--update');

function die(msg) {
  console.error(`\x1b[31mverify: ${msg}\x1b[0m`);
  process.exit(2);
}

function readJson(file, label) {
  let raw;
  try {
    raw = fs.readFileSync(file, 'utf8');
  } catch (err) {
    die(`cannot read ${label} at ${file} (${err.code || err.message})`);
  }
  try {
    return JSON.parse(raw);
  } catch (err) {
    die(`${label} at ${file} is not valid JSON: ${err.message}`);
  }
}

// --- baseline ---------------------------------------------------------------
const pkg = readJson(PKG_PATH, 'package.json');
const baseline = (pkg.voiceflowArchive || {}).baseline;
if (!baseline || typeof baseline.baselineMissing !== 'number') {
  die('package.json is missing voiceflowArchive.baseline.baselineMissing');
}
const limit = baseline.baselineMissing;
const limitDistinct = baseline.baselineMissingDistinct;

// --- audit ------------------------------------------------------------------
if (!skipAudit) {
  if (!fs.existsSync(AUDIT_PATH)) die(`tools/audit.js not found at ${AUDIT_PATH}`);
  console.log('verify: running audit...\n');
  try {
    execFileSync(process.execPath, [AUDIT_PATH], {
      stdio: 'inherit',
      cwd: PROJECT,
    });
  } catch (err) {
    die(`audit failed (exit ${err.status !== undefined ? err.status : '?'})`);
  }
  console.log('');
}

const report = readJson(REPORT_PATH, 'audit report');

if (typeof report.missingTotal !== 'number') {
  die('audit report has no numeric missingTotal -- did tools/audit.js change shape?');
}

// --- discount _quarantine noise ---------------------------------------------
// tools/audit.js skips hts-cache/node_modules/.git/tools but NOT _quarantine/.
// The project's own workflow mandates backing up to _quarantine/ before a bulk
// edit, so a backup of mirror HTML sitting there gets scanned and reports
// thousands of phantom broken refs from files that are never served. Those are
// not archive defects, so the gate measures the served tree only.
const inQuarantine = (e) => {
  if (typeof e.ref === 'string' && e.ref.includes('_quarantine')) return true;
  const pages = Array.isArray(e.pages) ? e.pages : [];
  return pages.length > 0 && pages.every((p) => String(p).includes('_quarantine'));
};

const allMissing = Array.isArray(report.missing) ? report.missing : [];
const quarantined = allMissing.filter(inQuarantine);
const realMissing = allMissing.filter((e) => !inQuarantine(e));

const quarantineRefs = quarantined.reduce((s, e) => s + (e.count || 0), 0);
const missing = report.missingTotal - quarantineRefs;
const distinct = report.missingDistinct - quarantined.length;

if (quarantineRefs > 0) {
  console.log(
    `verify: discounted ${quarantineRefs} refs (${quarantined.length} targets) ` +
    `reported from _quarantine/ backups, which are never served.\n` +
    `        raw report: ${report.missingTotal} | served tree: ${missing}\n`
  );
}

// --- compare ----------------------------------------------------------------
const delta = missing - limit;
const sign = delta > 0 ? `+${delta}` : String(delta);
const pad = (n) => String(n).padStart(7);

console.log('  archive reference check');
console.log('  ----------------------------------------');
console.log(`  scanned files       ${pad(report.scannedFiles)}`);
console.log(`  references          ${pad(report.totalRefs)}`);
console.log(`  resolved ok         ${pad(report.okRefs)}`);
console.log(`  MISSING             ${pad(missing)}  (baseline ${limit}, ${sign})`);
console.log(`  distinct targets    ${pad(distinct)}` +
  (typeof limitDistinct === 'number' ? `  (baseline ${limitDistinct})` : ''));
console.log('  ----------------------------------------\n');

if (delta > 0) {
  console.error(`\x1b[31mFAIL: broken references rose by ${delta} (${limit} -> ${missing}).\x1b[0m`);
  console.error('');
  console.error('Revert the change that caused this. Do NOT raise the baseline to');
  console.error('make this pass -- the baseline only ever moves down.');
  console.error('');
  console.error('Largest missing targets in the served tree:');
  for (const e of realMissing.slice(0, 15)) {
    console.error(`  ${String(e.count).padStart(5)}  [${e.kind}]  ${e.ref}`);
  }
  process.exit(1);
}

if (delta < 0) {
  console.log(`\x1b[32mPASS\x1b[0m: ${-delta} fewer broken references than the baseline.`);
  console.log('');
  console.log('This is an improvement. Record it by lowering the baseline in');
  console.log('package.json in the same commit as the repair:');
  console.log('');
  console.log(`    "baselineMissing": ${missing},`);
  console.log(`    "baselineMissingDistinct": ${distinct},`);
  if (wantUpdate) {
    const patch = {
      ...baseline,
      baselineMissing: missing,
      baselineMissingDistinct: distinct,
      scannedFiles: report.scannedFiles,
      totalRefs: report.totalRefs,
      okRefs: report.okRefs,
      externalHosts: Array.isArray(report.externalHosts)
        ? report.externalHosts.length
        : baseline.externalHosts,
    };
    console.log('\n--- full voiceflowArchive.baseline block ---');
    console.log(JSON.stringify(patch, null, 2));
    console.log('--- copy this into package.json by hand ---');
  } else {
    console.log('\nRun with --update to print the full replacement block.');
  }
  process.exit(0);
}

console.log(`\x1b[32mPASS\x1b[0m: broken references unchanged at the baseline (${limit}).`);
process.exit(0);
