// netwatch-probe.mjs — attribution instrument for the 2026-09-20 live report:
//   "Connecting to '<URL>' violates the following Content Security Policy directive: connect-src 'none'"
// repeated dozens of times in the operator's console.
//
// The question this answers: does OUR payload ever touch a network primitive? The sandbox below is the
// same Discord-faithful host used by fullwire-probe.mjs, except every network-capable API is replaced
// with a counting trap that records the call and (for the ones that take a URL) the URL. Output is a
// per-API tally plus the captured URLs, so "not ours" is a measurement, not an opinion.
//
// Usage: node tools/netwatch-probe.mjs <payload-or-bundle.js> [--pwd]
import fs from 'node:fs'; import vm from 'node:vm';

const src = fs.readFileSync(process.argv[2], 'utf8');
const WITH_PWD = process.argv.includes('--pwd');

const hits = [];
const hit = (api, arg) => {
  let url = '';
  try { url = arg === undefined ? '' : (typeof arg === 'string' ? arg : String(arg && (arg.url || arg.href || arg[0] || arg))); } catch (e) { url = '<unprintable>'; }
  hits.push({ api, url: String(url).slice(0, 120) });
  return null;
};

// ---- host fidelity (mirrors fullwire-probe) ----
const w = {};
w.document = { body: {}, createElement: () => ({ style: {}, setAttribute() {}, appendChild() {}, getContext: () => null }), head: { appendChild() {} }, addEventListener() {}, removeEventListener() {} };
w.location = { hostname: 'discord.com', origin: 'https://discord.com' };
w.navigator = { userAgent: 'Mozilla/5.0 Chrome/120', sendBeacon: (u) => hit('navigator.sendBeacon', u) };
w.DiscordNative = { version: '1.0' };
w.webpackChunkdiscord_app = Object.assign([], { push: (x) => x });
const st = { _m: new Map(), getItem: () => null, setItem() {}, removeItem() {}, clear() {}, key: () => null, get length() { return 0; } };
w.localStorage = st; w.sessionStorage = st; w.addEventListener = () => {}; w.removeEventListener = () => {};
let t = 1_700_000_000_000; w.performance = { now: () => (t += 50) };
const logs = [];

const sb = {
  window: w, location: w.location, navigator: w.navigator, DiscordNative: w.DiscordNative, webpackChunkdiscord_app: w.webpackChunkdiscord_app,
  localStorage: st, sessionStorage: st, performance: w.performance, document: w.document, atob: globalThis.atob, btoa: globalThis.btoa,
  DecompressionStream: globalThis.DecompressionStream, TextDecoder: globalThis.TextDecoder,
  // ---- the traps ----
  fetch: (u, o) => { hit('fetch', u); return Promise.resolve({ ok: true, status: 200, json: async () => ({}), text: async () => '', arrayBuffer: async () => new ArrayBuffer(0) }); },
  XMLHttpRequest: class XMLHttpRequest {
    constructor() { this.readyState = 0; this.status = 0; this.responseText = ''; this.response = ''; }
    open(m, u) { hit('XMLHttpRequest.open', u); return null; }
    send() { hit('XMLHttpRequest.send', ''); return null; }
    setRequestHeader() {} addEventListener() {} removeEventListener() {} abort() {} getAllResponseHeaders() { return ''; }
  },
  WebSocket: class WebSocket { constructor(u) { this.readyState = 0; hit('WebSocket', u); } send() { hit('WebSocket.send', ''); } close() {} addEventListener() {} },
  EventSource: class EventSource { constructor(u) { hit('EventSource', u); this.readyState = 0; } close() {} addEventListener() {} },
  Worker: class Worker { constructor(u) { hit('Worker', u); } postMessage() {} terminate() {} addEventListener() {} },
  SharedWorker: class SharedWorker { constructor(u) { hit('SharedWorker', u); } },
  RTCPeerConnection: class RTCPeerConnection { constructor(c) { hit('RTCPeerConnection', c); } createDataChannel() { return {}; } close() {} },
  Image: class Image { constructor() { this.src = ''; } set src(v) { hit('Image.src', v); } get src() { return ''; } },
  Audio: class Audio { constructor(u) { hit('Audio', u); } play() { return Promise.resolve(); } pause() {} },
  crypto: { getRandomValues: (a) => { for (let i = 0; i < a.length; i++) a[i] = 7; return a; } },
  setTimeout: globalThis.setTimeout, clearTimeout: globalThis.clearTimeout,
  setInterval: globalThis.setInterval, clearInterval: globalThis.clearInterval, queueMicrotask: globalThis.queueMicrotask,
  requestAnimationFrame: () => 1, URL: globalThis.URL, URLSearchParams: globalThis.URLSearchParams,
  structuredClone: (v) => JSON.parse(JSON.stringify(v ?? null)),
  JSON, Math, Date, Object, Array, String, Number, Boolean, Symbol, Map, Set, WeakMap, WeakSet, Promise, RegExp, Error, TypeError, Proxy, Reflect,
  Uint8Array, Uint16Array, Uint32Array, Int8Array, Int16Array, Int32Array, Float32Array, Float64Array, ArrayBuffer, DataView,
  parseInt, parseFloat, isNaN, isFinite, encodeURIComponent, decodeURIComponent,
  console: {
    log: (...a) => logs.push('log:' + String(a[0]).slice(0, 70)),
    debug: (...a) => logs.push('dbg:' + String(a[0]).slice(0, 90)),
    warn: (...a) => logs.push('warn:' + String(a[0]).slice(0, 70)),
    error: (...a) => logs.push('err:' + String(a[0]).slice(0, 70)),
    clear: () => logs.push('CLEAR'), info: (...a) => logs.push('info:' + String(a[0]).slice(0, 70)),
  },
};
w.AbortController = class { constructor() { this.signal = { aborted: false, addEventListener() {}, removeEventListener() {}, reason: undefined }; } abort() { this.signal.aborted = true; } };
w.AbortSignal = { timeout: () => ({ aborted: false, addEventListener() {}, removeEventListener() {} }), abort() {}, any() { return {}; } };
w.Blob = class Blob { constructor(a) { this.size = (a && a.length) || 0; } };
w.performance.mark = () => {}; w.performance.measure = () => {}; w.performance.getEntries = () => [];
w.requestIdleCallback = (f) => 1; w.cancelIdleCallback = () => {};
w.PerformanceObserver = class { observe() {} disconnect() {} };
w.MutationObserver = class { observe() {} disconnect() {} takeRecords() { return []; } };
w.IntersectionObserver = class { observe() {} disconnect() {} };
w.CustomEvent = class { constructor(t2, o) { this.type = t2; Object.assign(this, o || {}); } };
w.dispatchEvent = () => true;
w.crypto = sb.crypto; w.queueMicrotask = globalThis.queueMicrotask;
w.setTimeout = globalThis.setTimeout; w.clearTimeout = globalThis.clearTimeout;
w.Promise = Promise; w.Reflect = Reflect; w.Proxy = Proxy;
for (const k of Object.keys(w)) sb[k] = w[k];
sb.window = sb; sb.self = sb; sb.globalThis = sb;
sb.document.body = sb.document.body || {};

const ctx = vm.createContext(sb);
const t0 = Date.now();
let verdict = 'ran';
try { vm.runInContext(src, ctx, { filename: 'payload', timeout: 15000 }); }
catch (e) { verdict = (/timed out/i.test(e.message) ? 'TIMEOUT' : 'throw') + ': ' + e.message.slice(0, 90); }

console.log(`netwatch: ${src.length} B, ${Date.now() - t0} ms, verdict=${verdict}, logs=${logs.length}`);
console.log('our log lines (first 8):');
for (const l of logs.slice(0, 8)) console.log('   ' + l);

const tally = {};
for (const h of hits) tally[h.api] = (tally[h.api] || 0) + 1;

function report(label) {
  const urls = hits.filter((h) => h.url).map((h) => `${h.api} -> ${h.url}`);
  console.log(`${label}: network-primitive calls=${hits.length}`, JSON.stringify(tally));
  if (urls.length) { console.log('   URLs attempted:'); for (const u of urls.slice(0, 10)) console.log('     ' + u); }
  else console.log('   no URLs attempted');
}

report('after init');

if (WITH_PWD) {
  const gu = sb.GoogleUblock || (sb.window && sb.window.GoogleUblock);
  console.log('GoogleUblock:', typeof gu);
  if (typeof gu === 'function') {
    hits.length = 0;
    Promise.resolve().then(() => gu('pwdDbg')).catch(() => {});
    setTimeout(() => { report('after GoogleUblock(pwdDbg)'); process.exit(0); }, 1200);
  } else process.exit(0);
}
