// Re-paste check — the "console F5 then paste again" case.
//
//   node tools/repaste-check.mjs <runner.js> [--gap N] [--seconds N]
//
// Two pastes into ONE live page: `window`, its globals, its timers and its listeners all survive, so
// the second paste runs on top of the first — the case the operator hit by pasting again without a
// reload (pass 3 of trace #5; passes 1/2/4 failed with `GoogleUblock is not defined`).
// NOTE (operator correction, 2026-09-21): `F5` is a standard page reload and nothing survives it; an
// earlier reading of these traces as a "console clear" side-channel was wrong and is retracted.
//
// This boots the shipped runner in the faithful sandbox, watches the entry point, then pastes the
// SAME runner a second time into the same global context, and reports:
//   * whether the entry point is published in each paste, and when it disappears
//   * which globals each paste left behind
//   * the console lines of the second paste (compare with a fresh run)
//   * whether paste 1 still has live timers that act during paste 2
import fs from 'node:fs'; import vm from 'node:vm';

const argv = process.argv.slice(2);
const RUNNER = argv[0];
const GAP = Number((argv.find((a) => a.startsWith('--gap=')) || '--gap=12000').slice(6));
const SECONDS = Number((argv.find((a) => a.startsWith('--seconds=')) || '--seconds=150').slice(10));
if (!RUNNER) { console.error('usage: repaste-check.mjs <runner.js> [--gap ms] [--seconds s]'); process.exit(2); }

const w = {};
w.document = { body: {}, createElement: () => ({ style: {}, setAttribute() {}, appendChild() {} }), head: { appendChild() {} }, addEventListener() {}, removeEventListener() {} };
w.location = { hostname: 'discord.com', origin: 'https://discord.com' };
w.navigator = { userAgent: 'Mozilla/5.0 Chrome/120' };
w.DiscordNative = { version: '1.0' };
w.webpackChunkdiscord_app = Object.assign([], { push: (x) => x });
const st = { getItem: () => null, setItem() {}, removeItem() {}, clear() {}, key: () => null, get length() { return 0; } };
w.localStorage = st; w.sessionStorage = st; w.addEventListener = () => {}; w.removeEventListener = () => {};
let t = 1_700_000_000_000; w.performance = { now: () => (t += 50), mark: () => {}, measure: () => {}, getEntries: () => [] };

const LINES = [];                        // console lines, phase-tagged by the caller
const sb = {
  window: w, location: w.location, navigator: w.navigator, DiscordNative: w.DiscordNative,
  webpackChunkdiscord_app: w.webpackChunkdiscord_app, localStorage: st, sessionStorage: st, performance: w.performance, document: w.document,
  atob: globalThis.atob, btoa: globalThis.btoa, DecompressionStream: globalThis.DecompressionStream, TextDecoder: globalThis.TextDecoder,
  fetch: () => Promise.resolve({ ok: true, json: async () => ({}), text: async () => '' }),
  crypto: { getRandomValues: (a) => { for (let i = 0; i < a.length; i++) a[i] = 7; return a; }, subtle: globalThis.crypto.subtle },
  setTimeout: globalThis.setTimeout, clearTimeout: globalThis.clearTimeout, setInterval: globalThis.setInterval, clearInterval: globalThis.clearInterval,
  queueMicrotask: globalThis.queueMicrotask, requestAnimationFrame: () => 1, URL: globalThis.URL, URLSearchParams: globalThis.URLSearchParams,
  structuredClone: (v) => JSON.parse(JSON.stringify(v ?? null)),
  JSON, Math, Date, Object, Array, String, Number, Boolean, Symbol, Map, Set, WeakMap, WeakSet, Promise, RegExp, Error, TypeError,
  Uint8Array, Uint16Array, Uint32Array, Int8Array, Int16Array, Int32Array, Float32Array, Float64Array, ArrayBuffer, DataView,
  parseInt, parseFloat, isNaN, isFinite, encodeURIComponent, decodeURIComponent,
  console: {
    log: (...a) => LINES.push(String(a[0]).slice(0, 120)),
    debug: (...a) => LINES.push(String(a[0]).slice(0, 120)),
    info: (...a) => LINES.push(String(a[0]).slice(0, 120)),
    warn: () => {}, error: () => {}, clear: () => { LINES.push('<cleared>'); },
  },
};
w.AbortController = class { constructor() { this.signal = { aborted: false, addEventListener() {}, removeEventListener() {} }; } abort() { this.signal.aborted = true; } };
w.AbortSignal = { timeout: () => ({ aborted: false, addEventListener() {}, removeEventListener() {} }), abort() {}, any() { return {}; } };
w.Worker = class { constructor() { this.onmessage = null; } postMessage() {} terminate() {} addEventListener() {} };
w.Blob = class { constructor(a) { this.size = (a && a.length) || 0; } };
w.requestIdleCallback = () => 1; w.cancelIdleCallback = () => {};
w.PerformanceObserver = class { observe() {} disconnect() {} };
w.MutationObserver = class { observe() {} disconnect() {} takeRecords() { return []; } };
w.IntersectionObserver = class { observe() {} disconnect() {} };
w.CustomEvent = class { constructor(x, o) { this.type = x; Object.assign(this, o || {}); } };
w.dispatchEvent = () => true; w.crypto = sb.crypto; w.queueMicrotask = globalThis.queueMicrotask;
w.setTimeout = globalThis.setTimeout; w.clearTimeout = globalThis.clearTimeout; w.Promise = Promise; w.Reflect = Reflect; w.Proxy = Proxy;
for (const k of Object.keys(w)) sb[k] = w[k];
sb.window = sb; sb.self = sb; sb.globalThis = sb;

/* --- watch the entry point: log every set/delete of the name, whatever sets it --- */
const ENTRY = 'GoogleUblock';
let ENTRY_VAL, entryEvents = [];
Object.defineProperty(sb, ENTRY, {
  configurable: true, enumerable: true,
  get() { return ENTRY_VAL; },
  set(v) { ENTRY_VAL = v; entryEvents.push([Date.now(), 'set ' + typeof v]); },
});
// deletion is not observable through defineProperty; poll instead
let lastPresent = false;
const poll = setInterval(() => {
  const present = typeof sb[ENTRY] === 'function';
  if (present !== lastPresent) { lastPresent = present; entryEvents.push([Date.now(), present ? 'present' : 'GONE']); }
}, 200);

const PREBOOT = new Set(Object.getOwnPropertyNames(sb));
const src = fs.readFileSync(RUNNER, 'utf8');
const ctx = vm.createContext(sb);
const T0 = Date.now();
const el = () => ((Date.now() - T0) / 1000).toFixed(1);
const tag = (p) => `[${el()}s ${p}]`;
const globalsNow = () => Object.getOwnPropertyNames(sb).filter((k) => !PREBOOT.has(k));
let afterPaste1 = [], afterPaste2 = [];

console.log(`${tag('start')} paste 1 …`);
vm.runInContext(src, ctx, { filename: 'paste1', timeout: 20000 });
afterPaste1 = globalsNow().slice();
console.log(`${tag('paste1')} entry published: ${typeof sb[ENTRY] === 'function'}`);

let sawPaste1 = false, survivedStandDown = null, publishedByPaste2 = null;
setTimeout(() => {
  sawPaste1 = typeof sb[ENTRY] === 'function';
  console.log(`${tag('settle')} entry after the chain has had time to stand down: ${typeof sb[ENTRY] === 'function'}`);
  survivedStandDown = typeof sb[ENTRY] === 'function';
}, Math.max(3000, GAP - 4000));

setTimeout(() => {
  console.log(`\n${tag('clear')} === console cleared (page keeps everything) ===`);
  console.log(`${tag('clear')} entry before: ${typeof sb[ENTRY] === 'function'}`);
  console.log(`${tag('clear')} globals left by paste 1 (${afterPaste1.length}): ${JSON.stringify(afterPaste1)}`);
  LINES.length = 0;                                     // console clear
  publishedByPaste2 = null;
  console.log(`${tag('paste2')} paste 2 …`);
  try { vm.runInContext(src, ctx, { filename: 'paste2', timeout: 20000 }); }
  catch (e) { console.log(`${tag('paste2')} THREW: ${e.message}`); }
  afterPaste2 = globalsNow().slice();
  setTimeout(() => { publishedByPaste2 = typeof sb[ENTRY] === 'function';
    console.log(`${tag('paste2')} entry published by paste 2: ${publishedByPaste2}`); }, 1500);
}, GAP);

setTimeout(() => {
  console.log(`\n${tag('mid')} === ${Math.round((Date.now() - T0) / 1000)}s in ===`);
  console.log(`${tag('mid')} entry now: ${typeof sb[ENTRY] === 'function'}`);
  console.log(`${tag('mid')} globals now (${globalsNow().length}): ${JSON.stringify(globalsNow())}`);
  console.log(`${tag('mid')} paste-2 console lines so far:`);
  for (const l of LINES.slice(0, 12)) console.log(`        ${l}`);
}, GAP + 20000);

setTimeout(() => {
  clearInterval(poll);
  const gardens = LINES.filter((l) => /^Pixel Garden v2\.0/.test(l)).length;
  const settled = LINES.filter((l) => /Garden settled/.test(l)).length;
  console.log(`\n[ASSERT] entry published by paste 1 .......... ${afterPaste1.includes(ENTRY) || sawPaste1 ? 'yes' : 'no'}`);
  console.log(`[ASSERT] entry survived the stand-down ...... ${survivedStandDown === true ? 'PASS' : 'FAIL'}`);
  console.log(`[ASSERT] paste 2 published its own entry .... ${publishedByPaste2 === true ? 'PASS' : 'FAIL'}`);
  console.log(`[ASSERT] exactly one garden (no stale one) .. ${gardens <= 1 ? 'PASS' : 'FAIL (' + gardens + ')'}`);
  console.log(`[ASSERT] garden printed once at the window .. ${settled <= 1 ? 'PASS' : 'FAIL (' + settled + ')'}`);
  console.log(`\n${tag('end')} === end of run ===`);
  console.log(`${tag('end')} entry: ${typeof sb[ENTRY] === 'function'}`);
  console.log(`${tag('end')} entry-point events: ${JSON.stringify(entryEvents.map(([ts, e]) => `${((ts - T0) / 1000).toFixed(1)}s ${e}`))}`);
  console.log(`${tag('end')} globals added by paste 2 that paste 1 did not leave: ${JSON.stringify(afterPaste2.filter((k) => !afterPaste1.includes(k)))}`);
  console.log(`${tag('end')} paste-2 console lines (tail):`);
  for (const l of LINES.slice(-8)) console.log(`        ${l}`);
  process.exit(0);
}, SECONDS * 1000);
