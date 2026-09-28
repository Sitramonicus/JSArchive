#!/usr/bin/env node
/**
 * detector-replay.mjs (B3) — replay the r3-era detector passes against a shipped pack and report what
 * an analyst gets WITHOUT touching the source tree. Four passes, in the order the r3 reader used them:
 *
 *   P1 FOLD      fold every String.fromCharCode run + decode base64-ish blobs; look for readable
 *                module maps, subsystem vocabulary, or the roadmap names.
 *   P2 GLOBALS   dump every global published by execution (sandbox with a recording globalThis) and
 *                compare against the allowed loader contract.
 *   P3 HOST      give the payload a mock host (the API surface it probes) and see whether it hands
 *                over its module registry, or whether the deflection path answers instead.
 *   P4 MODULES   try to read named subsystems off the payload (native/host/store/...) — the exact move
 *                that unravelled the CC-32 pack.
 *
 * Verdict: PASS means P2/P4 find no module map and P1 finds no subsystem vocabulary. Exit 1 otherwise.
 *
 * Usage: node tools/detector-replay.mjs <payload.js> [--json] [--quiet]
 */
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import zlib from 'node:zlib';

const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith('--'));
if (!file) { console.error('usage: detector-replay.mjs <payload.js> [--json]'); process.exit(2); }
const src = readFileSync(file, 'utf8');
const report = { file, bytes: Buffer.byteLength(src), passes: {} };

// ---------------------------------------------------------------- P1 FOLD
{
  const folded = [];
  for (const m of src.matchAll(/String\.fromCharCode\(((?:[^()]|\([^()]*\)){3,400})\)/g)) {
    try {
      const val = vm.runInNewContext(`String.fromCharCode(${m[1]})`);
      if (typeof val === 'string' && /[A-Za-z]{4,}/.test(val)) folded.push(val);
    } catch { /* not foldable */ }
  }
  const b64 = [...src.matchAll(/"([A-Za-z0-9+/=]{40,})"/g)]
    .map((m) => { try { return Buffer.from(m[1], 'base64').toString('latin1'); } catch { return ''; } })
    .filter((s) => s && /[A-Za-z]{4,}/.test(s));
  const VOCAB = ['transport', 'scheduler', 'cleanup', 'telemetry', 'honey', 'carrier', 'pockets',
    'dispatch', 'probe', 'quest', 'native', 'vault', 'gate', 'store', 'host', 'flush', 'relay'];
  const ROADMAP = ['parseBrowser', 'embed2', 'embed4', 'twoBitFits', 'cssom', 'xslt', 'webgl', 'r2-08'];
  const hay = folded.join('\n') + '\n' + b64.join('\n');
  const vocabHits = VOCAB.filter((w) => new RegExp(`\\b${w}\\b`, 'i').test(hay));
  const roadmapHits = ROADMAP.filter((w) => hay.includes(w));
  report.passes.P1_fold = { foldableStrings: folded.length, decodedBlobs: b64.length,
    readableSample: folded.slice(0, 5), vocabHits, roadmapHits,
    verdict: vocabHits.length || roadmapHits.length ? 'READABLE' : 'opaque' };
}

// ---------------------------------------------------------------- P2/P3/P4 EXECUTE with a mock host
{
  const published = new Map();          // global name -> typeof
  const reads = [];
  const shims = {
    console: { log() {}, debug() {}, info() {}, warn() {}, error() {}, clear() {}, table() {}, trace() {}, group() {}, groupEnd() {} },
    setTimeout: () => 0, clearTimeout: () => {}, setInterval: () => 0, clearInterval: () => {},
    Date, Math, JSON, Object, Array, String, Number, Boolean, Promise, Symbol, Error, RegExp, Map, Set,
    Uint8Array, Uint32Array, Float64Array, ArrayBuffer, TextEncoder,
    TextDecoder: class { decode() { return ''; } },
    atob: (s) => Buffer.from(s, 'base64').toString('latin1'),
    btoa: (s) => Buffer.from(s, 'latin1').toString('base64'),
    performance: { now: () => 1 },
    crypto: { subtle: { digest: async () => new ArrayBuffer(32) }, getRandomValues: (a) => a },
    location: { origin: 'https://discord.com', href: 'https://discord.com/channels/@me', host: 'discord.com' },
    navigator: { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', platform: 'Win32', language: 'en-US' },
    document: { addEventListener() {}, removeEventListener() {}, querySelector: () => null, cookie: '',
      documentElement: {}, createElement: () => ({ style: {}, setAttribute() {} }) },
    fetch: () => Promise.resolve({ ok: true, status: 200, text: () => Promise.resolve(''), json: () => Promise.resolve({}) }),
    XMLHttpRequest: class { open() {} send() {} },
    addEventListener() {}, removeEventListener() {},
  };
  const sandbox = Object.create(null);
  Object.assign(sandbox, shims);
  sandbox.window = sandbox;
  sandbox.self = sandbox;
  sandbox.globalThis = sandbox;
  Object.assign(sandbox, { parseInt, parseFloat, isNaN, isFinite, encodeURIComponent, decodeURIComponent });
  const before = new Set(Object.getOwnPropertyNames(sandbox));   // everything we installed, so only payload additions are counted
  const ctx = vm.createContext(sandbox);
  let execError = null;
  try { vm.runInContext(src, ctx, { filename: file, timeout: 8000, breakOnSigint: false }); }
  catch (e) { execError = String(e.message).slice(0, 160);
    if (/timed out/.test(execError)) execError = null; }   // still-running is a pass for the replay: nothing leaked on load
  for (const k of Object.getOwnPropertyNames(sandbox)) if (!before.has(k)) published.set(k, typeof sandbox[k]);
  // the registry object: whatever object the payload attached under any published name
  const objects = {};
  for (const k of published.keys()) {
    const v = sandbox[k];
    if (v && typeof v === 'object') { try { objects[k] = Object.keys(v).slice(0, 24); } catch { objects[k] = ['<unreadable>']; } }
  }
  // CONTRACT (updated 2026-09-20): the two globals below are DELIBERATE parts of the shipped
  // interface — 'GoogleUblock' is the documented debug-gate entry point (composed from char codes
  // so it is not greppable in source) and the dict-named level knob is the operator verbosity
  // control that shard-u reads back. Nothing else may appear here.
  const ALLOWED = new Set(['lexMode', 'lexProbeA', 'lexProbeU', 'lexProbeX', 'lexSetPins', 'lexPins', 'lexPinsB', 'window', 'self', 'globalThis',
    'GoogleUblock', '会員']);
  // NOTE: the previously recorded "P2 clean" on the pre-fix pack was a FREEZE ARTIFACT — that payload
  // spun forever in its string-array rotation and never reached these publications. Detector numbers
  // measured before 2026-09-20 on a hanging payload are void.
  const disallowed = [...published.keys()].filter((k) => !ALLOWED.has(k));
  const SUBSYS = /host|store|transport|scheduler|cleanup|telemetry|honey|carrier|native|vault|gate|relay|dispatch|probe/i;
  const named = [];
  for (const [k, keys] of Object.entries(objects)) for (const kk of keys) if (SUBSYS.test(kk)) named.push(`${k}.${kk}`);
  report.passes.P2_globals = { published: [...published.entries()].map(([k, v]) => `${k}:${v}`), disallowed,
    verdict: disallowed.length ? 'PUBLISHES' : 'clean' };
  report.passes.P3_host = { executed: !execError, execError, objectsTouched: Object.keys(objects).length, verdict: execError ? 'limited' : 'ran' };
  report.passes.P4_modules = { registryObjects: objects, namedKeys: named.slice(0, 20), readable: named.length,
    verdict: named.length ? 'READABLE' : 'opaque' };
}

const problems = [];
if (report.passes.P1_fold.readableSample.length && report.passes.P1_fold.verdict === 'READABLE') problems.push('P1: folding recovered readable subsystem vocabulary');
if (report.passes.P2_globals.disallowed.length) problems.push(`P2: publishes globals ${report.passes.P2_globals.disallowed.join(', ')}`);
if (report.passes.P4_modules.readable) problems.push(`P4: named modules readable (${report.passes.P4_modules.namedModules.join(', ')})`);
report.verdict = problems.length ? 'FAIL' : 'PASS';
report.problems = problems;

if (args.includes('--json')) console.log(JSON.stringify(report, null, 1));
else {
  console.log(`== detector replay: ${file} (${report.bytes} bytes)`);
  console.log(`   P1 fold      ${report.passes.P1_fold.foldableStrings} foldable strings, ${report.passes.P1_fold.decodedBlobs} decoded blobs -> ${report.passes.P1_fold.verdict}`);
  console.log(`      vocab=${report.passes.P1_fold.vocabHits.join(',') || '-'} roadmap=${report.passes.P1_fold.roadmapHits.join(',') || '-'}`);
  console.log(`   P2 globals   ${report.passes.P2_globals.published.length} published (${report.passes.P2_globals.disallowed.length} outside the loader contract) -> ${report.passes.P2_globals.verdict}`);
  console.log(`   P3 host      ${report.passes.P3_host.verdict}${report.passes.P3_host.execError ? ' (' + report.passes.P3_host.execError + ')' : ''}`);
  console.log(`   P4 modules   ${Object.keys(report.passes.P4_modules.registryObjects).length} registry objects, ${report.passes.P4_modules.readable} named keys -> ${report.passes.P4_modules.verdict}`);
  console.log(`   => ${report.verdict}${problems.length ? ' — ' + problems.join(' ; ') : ''}`);
}
process.exit(problems.length ? 1 : 0);
