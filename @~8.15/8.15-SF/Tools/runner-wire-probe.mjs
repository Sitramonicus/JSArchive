#!/usr/bin/env node
// runner-wire-probe.mjs — 8.15 extraction gate (ARM A).
//
// Runs a PASTED runner (the loader artifact) inside a stubbed Discord-Chromium sandbox and captures
// the code the loader hands to `eval`. That string is what the operator's paste actually stages, so
// its sha256 is the honest "payload extraction" digest — the thing ARM A must leave byte-identical.
//
// Usage: node runner-wire-probe.mjs <runner.js> [--dump=<file>] [--quiet]
// Prints: staged length, sha256, first 64 chars, log tail, and google*/GoogleUblock reachability.
import fs from 'node:fs';
import crypto from 'node:crypto';
import vm from 'node:vm';

const runnerPath = process.argv[2];
if (!runnerPath) { console.error('usage: runner-wire-probe.mjs <runner.js> [--dump=<file>] [--quiet]'); process.exit(2); }
const dumpArg = process.argv.find((a) => a.startsWith('--dump='));
const quiet = process.argv.includes('--quiet');
const src = fs.readFileSync(runnerPath, 'utf8');

const logs = [];
let staged = null;
const w = {};
w.document = {
  body: {}, createElement: () => ({ style: {}, setAttribute() {}, appendChild() {} }),
  head: { appendChild() {} }, addEventListener() {}, removeEventListener() {},
  querySelectorAll: () => [], getElementById: () => null,
};
w.location = { hostname: 'discord.com', origin: 'https://discord.com', href: 'https://discord.com/app' };
w.navigator = { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0' };
w.DiscordNative = { version: '1.0' };
w.webpackChunkdiscord_app = Object.assign([], { push: (x) => x });
const st = { _m: new Map(), getItem: () => null, setItem() {}, removeItem() {}, clear() {}, key: () => null, get length() { return 0; } };
w.localStorage = st; w.sessionStorage = st;
let t = 1_700_000_000_000;
w.performance = { now: () => (t += 50), mark() {}, measure() {}, getEntries: () => [] };
w.AbortController = class { constructor() { this.signal = { aborted: false, addEventListener() {}, removeEventListener() {} }; } abort() {} };
w.Worker = class { constructor() { this.onmessage = null; } postMessage() {} terminate() {} addEventListener() {} };
w.requestIdleCallback = () => 1; w.cancelIdleCallback = () => {};
w.PerformanceObserver = class { observe() {} disconnect() {} };

let ctx = null;
const sb = {
  window: null, document: w.document, location: w.location, navigator: w.navigator,
  localStorage: st, sessionStorage: st, performance: w.performance,
  atob: globalThis.atob, btoa: globalThis.btoa,
  DecompressionStream: globalThis.DecompressionStream, TextDecoder: globalThis.TextDecoder, TextEncoder: globalThis.TextEncoder,
  Uint8Array, Uint16Array, Uint32Array, Float64Array, ArrayBuffer, DataView, Math, JSON, Date, Object, Array, String, Number, Boolean,
  Map, Set, WeakMap, WeakSet, Promise, RegExp, Error, TypeError, RangeError, Symbol, Reflect, Proxy,
  parseInt, parseFloat, isNaN, isFinite, encodeURIComponent, decodeURIComponent, structuredClone,
  setTimeout: globalThis.setTimeout, clearTimeout: globalThis.clearTimeout,
  setInterval: globalThis.setInterval, clearInterval: globalThis.clearInterval,
  queueMicrotask: globalThis.queueMicrotask,
  crypto: { getRandomValues: (a) => { for (let i = 0; i < a.length; i++) a[i] = 7; return a; } },
  fetch: () => Promise.resolve({ ok: true, json: async () => ({}), text: async () => '' }),
  console: {
    log: (...a) => logs.push('log:' + String(a[0]).slice(0, 60)),
    debug: (...a) => logs.push('dbg:' + String(a[0]).slice(0, 60)),
    info: (...a) => logs.push('info:' + String(a[0]).slice(0, 60)),
    warn: (...a) => logs.push('warn:' + String(a[0]).slice(0, 60)),
    error: (...a) => logs.push('err:' + String(a[0]).slice(0, 60)),
    clear: () => logs.push('CLEAR'),
  },
  // the stage: the loader calls (0, window.eval)(code) for BOTH the reel sources (small, must really
  // evaluate — the loader uses the returned function) and the payload (huge, captured not executed).
  eval: (code) => {
    const s = typeof code === 'string' ? code : String(code);
    if (s.length > 50000) { staged = s; return undefined; }   // the payload: capture, do not run
    return vm.runInContext(s, ctx);                            // a reel source: evaluate, return its value
  },
};
for (const k of Object.keys(w)) sb[k] = w[k];
sb.window = sb; sb.self = sb; sb.globalThis = sb;
sb.eval = sb.window.eval;

ctx = vm.createContext(sb);
const t0 = Date.now();
try {
  vm.runInContext(src, ctx, { filename: runnerPath, timeout: 120000 });
} catch (e) {
  console.log(`runner threw after ${Date.now() - t0} ms: ${String(e && e.message).slice(0, 120)}`);
}
// the loader's decode is async (awaits gunzip) — give the microtask/stream pump room to finish
await new Promise((r) => setTimeout(r, 2500));

if (staged === null) {
  console.log('STAGED: none (the loader did not reach the stage)');
} else {
  const h = crypto.createHash('sha256').update(staged, 'utf8').digest('hex');
  console.log(`STAGED: ${staged.length} chars sha256=${h}`);
  console.log(`STAGED head: ${JSON.stringify(staged.slice(0, 64))}`);
  if (dumpArg) { fs.writeFileSync(dumpArg.split('=')[1], staged); console.log(`STAGED dumped -> ${dumpArg.split('=')[1]}`); }
}
if (!quiet) console.log('logs:', JSON.stringify(logs.slice(-6)));
const names = Object.keys(sb).filter((k) => /^(google|Google)/.test(k));
console.log('google* globals:', JSON.stringify(names.slice(0, 8)));
