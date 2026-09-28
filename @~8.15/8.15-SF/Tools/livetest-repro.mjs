// livetest-repro.mjs — replay the operator's live-test *shape* offline, on a given payload, and print
// exactly what the page's console would show.
//
//   node Active/O8.15/tools/livetest-repro.mjs <payload.min.js> <pwdDbg> [<pwdView>]
//
// Why: every gate we run keeps the stall CLOSED, so the payload's boot lines sit in the hold queue and
// nobody ever sees them; and none of our probes claims a session on the WHOLE payload. This probe does
// what the operator does: load the payload in a browser-faithful sandbox, let it boot, claim through the
// entry point, then read the console. Run it on two payloads and diff the output — a behavioural
// difference between builds shows up here and nowhere else.
//
// The env is borrowed from tools/fullwire-probe.mjs (window IS the global, DiscordNative, the webpack
// chunk array, browser APIs), plus what a claim needs: crypto.subtle, TextEncoder, and the operator's
// 会員 knob. Secrets policy: the passphrases come from argv, never from a literal in this file.
import fs from 'node:fs';
import vm from 'node:vm';
import { webcrypto } from 'node:crypto';

const [payloadPath, DBG, VIEW] = process.argv.slice(2);
if (!payloadPath || !DBG) { console.error('usage: livetest-repro.mjs <payload.min.js> <pwdDbg> [<pwdView>]'); process.exit(2); }
const src = fs.readFileSync(payloadPath, 'utf8');

// ---- console capture (full text, so the diag records are readable)
const lines = [];
const fmt = (a) => a.map((x) => {
  if (typeof x === 'string') return x;
  try { return JSON.stringify(x); } catch (e) { return '[obj]'; }
}).join(' ');
const cons = {
  log: (...a) => lines.push('log  ' + fmt(a)),
  debug: (...a) => lines.push('dbg  ' + fmt(a)),
  info: (...a) => lines.push('info ' + fmt(a)),
  warn: (...a) => lines.push('warn ' + fmt(a)),
  error: (...a) => lines.push('err  ' + fmt(a)),
  clear: () => lines.push('--- console.clear() ---'),
};

// ---- browser-faithful sandbox
const w = {};
w.document = { body: {}, createElement: () => ({ style: {}, setAttribute() {}, appendChild() {} }), head: { appendChild() {} }, addEventListener() {}, removeEventListener() {} };
w.location = { hostname: 'discord.com', origin: 'https://discord.com' };
w.navigator = { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120', language: 'en-US' };
w.DiscordNative = { version: '1.0' };
w.webpackChunkdiscord_app = Object.assign([], { push: (x) => x });
const st = { _m: new Map(), getItem: () => null, setItem() {}, removeItem() {}, clear() {}, key: () => null, get length() { return 0; } };
w.localStorage = st; w.sessionStorage = st;
w.addEventListener = () => {}; w.removeEventListener = () => {};
let t = 1_700_000_000_000;
w.performance = { now: () => (t += 50), mark() {}, measure() {}, getEntries: () => [] };
w.AbortController = class { constructor() { this.signal = { aborted: false, addEventListener() {}, removeEventListener() {} }; } abort() { this.signal.aborted = true; } };
w.AbortSignal = { timeout: () => ({ aborted: false, addEventListener() {}, removeEventListener() {} }), abort() {}, any: () => ({}) };
w.Worker = class { constructor() { this.onmessage = null; } postMessage() {} terminate() {} addEventListener() {} };
w.Blob = class { constructor(a) { this.size = (a && a.length) || 0; } };
w.requestIdleCallback = () => 1; w.cancelIdleCallback = () => {};
w.PerformanceObserver = class { observe() {} disconnect() {} };
w.MutationObserver = class { observe() {} disconnect() {} takeRecords() { return []; } };
w.IntersectionObserver = class { observe() {} disconnect() {} };
w.CustomEvent = class { constructor(ty, o) { this.type = ty; Object.assign(this, o || {}); } };
w.dispatchEvent = () => true;
w.crypto = { getRandomValues: (a) => { for (let i = 0; i < a.length; i++) a[i] = (i * 7 + 3) & 255; return a; }, subtle: webcrypto.subtle };
w.queueMicrotask = queueMicrotask;

const sb = { console: cons, JSON, Math, Date, Object, Array, String, Number, Boolean, Symbol, Map, Set, WeakMap, WeakSet, Promise, RegExp, Error, TypeError, Proxy, Reflect,
  Uint8Array, Uint16Array, Uint32Array, Int8Array, Int16Array, Int32Array, Float32Array, Float64Array, ArrayBuffer, DataView,
  parseInt, parseFloat, isNaN, isFinite, encodeURIComponent, decodeURIComponent, atob: globalThis.atob, btoa: globalThis.btoa,
  TextEncoder: globalThis.TextEncoder, TextDecoder: globalThis.TextDecoder, DecompressionStream: globalThis.DecompressionStream,
  URL: globalThis.URL, URLSearchParams: globalThis.URLSearchParams, structuredClone: (v) => JSON.parse(JSON.stringify(v ?? null)),
  setTimeout: globalThis.setTimeout, clearTimeout: globalThis.clearTimeout, setInterval: globalThis.setInterval, clearInterval: globalThis.clearInterval,
  queueMicrotask: globalThis.queueMicrotask, requestAnimationFrame: (f) => 1,
  fetch: () => Promise.resolve({ ok: true, json: async () => ({}), text: async () => '' }) };
for (const k of Object.keys(w)) sb[k] = w[k];
sb.window = sb; sb.self = sb; sb.globalThis = sb;
sb['会員'] = 2;                                  // the operator's level knob (level 2 = pwdDbg session)
const ctx = vm.createContext(sb);

(async () => {
  const t0 = Date.now();
  try { vm.runInContext(src, ctx, { filename: 'payload', timeout: 20000 }); }
  catch (e) { console.log(`PAYLOAD THREW after ${Date.now() - t0} ms: ${String(e.message).slice(0, 200)}`); }
  console.log(`payload ${payloadPath} ran in ${Date.now() - t0} ms; console lines during boot: ${lines.length}`);
  console.log('--- boot lines (pre-claim) ---');
  lines.forEach((l) => console.log('   ' + l));

  const before = lines.length;
  const gu = sb.GoogleUblock || (sb.window && sb.window.GoogleUblock);
  console.log(`--- entry point: ${typeof gu} ---`);
  if (typeof gu === 'function') {
    let r1;
    try { r1 = await gu(DBG); } catch (e) { r1 = 'THREW: ' + String(e.message).slice(0, 120); }
    console.log(`GoogleUblock(pwdDbg) -> ${JSON.stringify(r1)}`);
    console.log('--- lines flushed by the claim ---');
    lines.slice(before).forEach((l) => console.log('   ' + l));
    if (VIEW) {
      const b2 = lines.length;
      let r2;
      try { r2 = await gu(VIEW); } catch (e) { r2 = 'THREW: ' + String(e.message).slice(0, 120); }
      console.log(`GoogleUblock(pwdView) -> ${JSON.stringify(r2)}`);
      console.log('--- lines emitted by the view verb (roster) ---');
      const got = lines.slice(b2);
      if (!got.length) console.log('   (nothing — roster printed no line)');
      got.forEach((l) => console.log('   ' + l));
    }
  }
  await new Promise((r) => setTimeout(r, 300));
  process.exit(0);
})();
