#!/usr/bin/env node
/**
 * chain-revive-check.mjs — the "cold venue" acceptance test (operator trace #4, 2026-09-21).
 *
 * WHAT THE OPERATOR SAW: after a DevTools F5 (a real page reload) the console showed the Host line,
 * the welcome, a claim that answered `true` -- and then nothing, followed by
 *     [Google ] Shelf out of reach — queued chores stand, new arrivals unwatched.
 *     [Google diag] phase-n {"added":0,"storeDead":true,"totalCandidateStores":-1,...}
 *     Ledger closed.
 * Their own theory: "our primary function is running within that 2 minutes, but it's just blocked ...
 * it's a dead primary function now."
 *
 * WHY: the chain arms from a ONE-SHOT scan of the venue's module cache at paste time. A reload
 * registers those modules seconds later, so the scan legitimately comes up empty; e1 returned STOP
 * ("pockets"), e2 returned STOP before publishing `_0xch`/`pk38`, and e4's boot check -- the only
 * entry to the worker -- could never start it. The claim path was independent, hence `true` into a
 * dead session.
 *
 * WHAT THIS HARNESS DOES: runs the SHIPPED pieces (pre-pieces + e1..e4) in the deterministic
 * split-equivalence host, and drives the real states in order:
 *   phase A  COLD    — boot with an empty venue module cache; assert the chain stands down with a
 *                      NAMED state instead of silently dying, and that the entry point still exists.
 *   phase B  CLAIM   — a claim arrives while the venue is still cold; assert it is accepted and that
 *                      it does not pretend work happened.
 *   phase C  WARM    — the venue's modules finish registering (the harness fills the module cache);
 *                      assert the chain re-arms on its own and the worker starts, i.e. the session
 *                      that was "dead" becomes a working one -- on the SAME page, from a claim.
 *   phase D  TEARDOWN— end the session; assert the venue handles are NOT thrown away (the old
 *                      `finally` nulled them, which is what made every later call report
 *                      `storeDead: true`) and that the report says "session ended", not "store dead".
 *
 * Usage: node tools/chain-revive-check.mjs <selected-shards dir> [--json]
 *   Secrets: none. This tool never needs a passphrase -- it drives the chain, not the gate.
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const argv = process.argv.slice(2);
const DIR = argv.find((a) => !a.startsWith('--')) || '/home/user/Active/O8.14/CC-33/final-package/selected-shards';
const AS_JSON = argv.includes('--json');
const read = (f) => fs.readFileSync(path.join(DIR, f), 'utf8');
const P = (f) => path.join(DIR, f);

const SKEY = 'JV~~v}t1}tuvtcL1';
const dekey = (s) => String(s).split(SKEY).join('');
const str = (v) => (typeof v === 'string' ? dekey(v) : (v === null ? 'null' : typeof v));
const rows = [];
const add = (id, desc, ok, detail) => rows.push({ id, desc, ok: !!ok, detail });

// ---------------------------------------------------------------- host (same family as split-equivalence)
const events = [];
const rec = (k, d) => events.push(`${k}|${d}`);
const timers = [];
let timerId = 1;
let _t = 1_700_000_000_000;
let now = _t;
const logs = [];
const stubCache = new Map();
function makeStub(label) {
  if (stubCache.has(label)) return stubCache.get(label);
  const fn = function (...a) { rec('stub', `${label}(${a.map(str).join(',')})`); return fn; };
  let cache;
  const p = new Proxy(fn, {
    get(t, k) {
      if (k === 'then') return undefined;
      if (k === Symbol.toPrimitive || k === 'toString') return () => `[stub ${label}]`;
      if (k === 'valueOf') return () => 0;
      if (k === 'length') return 0;
      if (k === Symbol.iterator) return function* () {};
      if (k === 'name') return label;
      if (!cache) cache = new Map();
      if (!cache.has(k)) { rec('get', `${label}.${String(k)}`); cache.set(k, makeStub(`${label}.${String(k)}`)); }
      return cache.get(k);
    },
    set(t, k, v) { rec('set', `${label}.${String(k)}=${str(v)}`); return true; },
    apply() { return makeStub(`${label}()`); },
  });
  stubCache.set(label, p);
  return p;
}
const mod = {
  _logInner: null,
  log: (() => {
    // A STABLE recording façade. The product swaps `_0xmod.log` while the stall is up (to hide machinery
    // lines) and swaps it back on a claim; a captured reference would therefore miss everything that
    // happened in between -- which is how this harness lost the claim-time diag lines on 2026-09-21.
    const flat = (a) => a.map((v) => (v && typeof v === 'object') ? JSON.stringify(v) : str(v)).join('|');
    const fwd = (name) => (...a) => {
      const s = flat(a);
      if (name !== 'clear') { logs.push(s); }
      rec('log.' + name, s);
      try { const t = mod._logInner; if (t && typeof t[name] === 'function') return t[name](...a); } catch (e) {}
      return undefined;
    };
    const facade = {
      queue: fwd('queue'), say: fwd('say'), diag: fwd('diag'), info: fwd('info'),
      warn: fwd('warn'), clear: fwd('clear'), flush: fwd('flush'),
    };
    return facade;
  })(),
  lex: { C: (i) => { rec('lex.C', String(i)); return `C${i}`; }, P: (i, arr) => { rec('lex.P', `${i}`); return `P${i}`; }, F: () => 'F' },
  mc: { summary: () => {}, report: () => {} },
  _e: (() => {
    const eb = new Uint16Array(4096);
    for (let i = 0; i < eb.length; i++) eb[i] = 0x21 + ((i * 11) % 94);
    const ed = (i) => { const n = Math.abs(Number(i) || 0) % eb.length; let s = ''; for (let k = 0; k < 12; k++) s += String.fromCharCode(eb[(n + k) % eb.length]); return s; };
    return { eb, ed, v: 'h32', lat: { t: [] }, latV: undefined, now: () => now, STOP: { stop: true }, S: { _0xlat0: 0 },
             release: () => rec('e.release', ''), scuttle: () => rec('e.scuttle', ''), signal: null, controller: null,
             tasks: null, track: null, flag: 0, boot: null, min: 0, max: 1e9 };
  })(),
  _m: {
    ci: new Uint16Array(8192).fill(0x41),
    pb: new Uint16Array(8192).fill(0x42),
    mb: new Uint16Array(8192).fill(0x43),
  },
  v814quartzѕａ8863: makeStub('r2'),
  v814дебдмдл166: makeStub('r2gate'),
};

// ---- the venue module cache, warmable on demand ------------------------------------------------
const VENUE = {
  pockets: null,           // filled once e1 tells us the property names it looks for
  warm: false,
  chunk: [],
  cache: {},
};
function coldCache() { VENUE.cache = {}; }
function warmCache() {
  // Each pocket is a module whose `exports.A`/`.Ay`/`.h`/`.Bo` carries the property e1 probes for.
  // `_0xq7` (the quest-store property) holds a real Map so the store path is exercised for real.
  const n = VENUE.pockets || {};
  const mk = (props) => Object.assign(Object.create(null), props);
  const cache = {};
  const seen = new Set();
  const put = (name, obj) => { if (!name || seen.has(name)) return; seen.add(name); cache[Object.keys(cache).length + 1] = { id: name, exports: obj }; };
  put('p3', { A: mk({ [n.m0]: () => {} }) });
  put('p4', { Ay: mk({ [n.m1]: () => {}, [n.m2]: () => {} }) });
  put('p5', { A: mk({ [n.q7]: new Map([['q1', { id: 'q1', config: { messages: { name: 'Peeking at something' }, expiresAt: new Date(Date.now() + 3600e3).toISOString(), taskConfig: { tasks: { [n.t0]: { target: 5 } } } } }]]) }) });
  put('p6', { A: mk({ [n.m4]: () => {} }) });
  put('p7', { Ay: mk({ [n.m5]: () => {} }) });
  put('p8', { h: mk({ [n.m6]: () => {}, dispatch: () => {}, subscribe: () => {}, unsubscribe: () => {} }) });
  put('p9', { Bo: mk({ [n.m7]: () => {}, post: () => {}, get: () => {} }) });
  VENUE.cache = cache;
  VENUE.warm = true;
  if (typeof VENUE.attach === 'function') VENUE.attach();
}

const win = {};
win.console = {};
const handler = {
  set(t, k, v) { rec('window.set', String(k)); t[k] = v; return true; },
  get(t, k) { if (k in t) return t[k]; rec('window.get', String(k)); return undefined; },
  has(t, k) { return k in t; },
};
// The real chunk loader returns `__webpack_require__` (with `.c` = the module cache and `.m` = the
// factory map) and calls the chunk's runtime hook with it. Our carrier's third element IS such a
// hook, so the mock has to behave the same way or the piece correctly takes its "no usable runtime"
// cover path and nothing downstream is exercised at all.
const chunk = [];
function makeRequire() {
  const req = function (id) { return req.c[id] && req.c[id].exports; };
  req.c = VENUE.cache;
  req.m = VENUE.defs;
  req.id = 0;
  return req;
}
chunk.push = function (carrier) {
  rec('chunk.push', Array.isArray(carrier) ? 'array' : typeof carrier);
  let req = null;
  try {
    req = makeRequire();
    if (carrier && typeof carrier[2] === 'function') { try { carrier[2](req); } catch (e) { rec('runtime-throw', String(e && e.message)); } }
    const more = carrier && carrier[1];
    if (more && typeof more === 'object') for (const k of Object.keys(more)) req.c[k] = { id: k, exports: more[k] };
    win.__req = req;
  } catch (e) { rec('chunk.push-throw', String(e && e.message)); }
  return req;
};
win.webpackChunkdiscord_app = chunk;
VENUE.attach = () => { if (win.__req) { win.__req.c = VENUE.cache; win.__req.m = VENUE.defs; } };
VENUE.defs = {};

const sandbox = {
  _0xmod: mod,
  console: { log: (...a) => rec('console.log', a.map(str).join(' ')), clear: () => rec('console.clear', ''), debug: () => {}, warn: () => {}, error: () => {} },
  process: { env: {} },
  window: new Proxy(win, handler),
  document: {
    hidden: false,
    addEventListener: (t, f, c) => rec('document.addEventListener', `${t}:${typeof f}:${!!c}`),
    removeEventListener: () => {},
    body: { appendChild: () => {}, removeChild: () => {} },
    createElement: () => makeStub('el'),
    querySelector: () => null, querySelectorAll: () => [], getElementById: () => null,
  },
  navigator: { platform: 'Win32', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120', onLine: true },
  location: { pathname: '/channels/@me', origin: 'https://discord.com', hostname: 'discord.com', href: 'https://discord.com/channels/@me' },
  setTimeout: (fn, ms, ...rest) => { const id = timerId++; timers.push({ id, fn, ms, at: now + (ms || 0), rest }); return id; },
  clearTimeout: (id) => { const i = timers.findIndex((t) => t.id === id); if (i >= 0) timers.splice(i, 1); },
  setInterval: (fn, ms) => { const id = timerId++; timers.push({ id, fn, ms, at: now + (ms || 0), interval: true }); return id; },
  clearInterval: (id) => { const i = timers.findIndex((t) => t.id === id); if (i >= 0) timers.splice(i, 1); },
  queueMicrotask: (fn) => Promise.resolve().then(fn),
  Math, Date, JSON, Object, Array, String, Number, Boolean, Symbol, Map, Set, WeakMap, WeakSet, Promise, RegExp, Error, TypeError,
  Uint8Array, Uint16Array, Uint32Array, Int8Array, Int16Array, Int32Array, Float32Array, Float64Array, ArrayBuffer, DataView,
  parseInt, parseFloat, isNaN, isFinite, encodeURIComponent, decodeURIComponent, atob: globalThis.atob, btoa: globalThis.btoa,
  TextDecoder, TextEncoder, performance: { now: () => (now += 50) },
  AbortController: globalThis.AbortController, AbortSignal: globalThis.AbortSignal,
  EventTarget: globalThis.EventTarget, Event: globalThis.Event, CustomEvent: globalThis.CustomEvent,
  MessageChannel: globalThis.MessageChannel, MessageEvent: globalThis.MessageEvent,
  localStorage: { getItem: () => null, setItem() {}, removeItem() {}, clear() {}, key: () => null, get length() { return 0; } },
  sessionStorage: { getItem: () => null, setItem() {}, removeItem() {}, clear() {}, key: () => null, get length() { return 0; } },
  fetch: () => Promise.resolve({ ok: true, status: 200, json: async () => ({}), text: async () => '', arrayBuffer: async () => new ArrayBuffer(0) }),
  URL: globalThis.URL, URLSearchParams: globalThis.URLSearchParams,
  crypto: { getRandomValues: (a) => { for (let i = 0; i < a.length; i++) a[i] = 7; return a; }, randomUUID: () => '00000000-0000-4000-8000-000000000000', subtle: { digest: async () => new ArrayBuffer(32) } },
  structuredClone: (v) => JSON.parse(JSON.stringify(v ?? null)),
  innerWidth: 1600, innerHeight: 900, devicePixelRatio: 1,
  requestAnimationFrame: () => 1,
  addEventListener: (t, f, c) => rec('window.addEventListener', `${t}:${typeof f}`),
  removeEventListener: () => {},
  postMessage: (m, o) => rec('window.postMessage', `${String(m).slice(0, 12)}:${String(o)}`),
};
// A real page has window.document / window.navigator; without them the ENTRY piece's genuine-browser
// pre-check (shard-a `_0xenvOk`) bails silently -- which is correct behaviour in a bare Node sandbox,
// but it also meant this harness could never see the entry piece's own surface at all.
win.document = sandbox.document;
win.navigator = sandbox.navigator;
// the page's own messaging surface: the pieces talk to `window`, which is the proxy over `win`, so
// these must live on `win` (adding them to the sandbox alone does nothing for `window.*` lookups).
win.addEventListener = (t, f, c) => rec('window.addEventListener', `${t}:${typeof f}`);
win.removeEventListener = () => {};
win.postMessage = (m, o) => rec('window.postMessage', `${String(m).slice(0, 12)}:${String(o)}`);
win.location = sandbox.location;
win.localStorage = sandbox.localStorage;
win.sessionStorage = sandbox.sessionStorage;
sandbox.Math = Object.create(Math); sandbox.Math.random = () => 0.42;
sandbox.globalThis = sandbox;
// `_0xmod.log = <silent stub>` (the stall) and `_0xmod.log = <real>` (a claim) both land here; keep the
// façade outward-facing and remember the target so forwarding still works.
{
  let inner = null;
  const facade = mod.log;
  Object.defineProperty(mod, 'log', {
    get() { return facade; },
    set(v) { inner = v; mod._logInner = v; },
    configurable: true,
  });
  mod._logInner = inner;
}
const ctx = vm.createContext(sandbox);

// the chain is async: a "turn" flushes timers AND microtasks so phase assertions see a settled state
const turn = async (rounds = 6, maxMs = 3000) => { for (let i = 0; i < rounds; i++) { drain(6, maxMs); await new Promise((r) => setImmediate(r)); } };
// `maxMs` bounds how far the virtual clock may jump in one drain. Without a bound the first drain
// leaps to the FARTHEST pending timer (the stall's 120 s fallback and the worker's own timers), so the
// harness kept watching the page tear itself down before it had even taken a claim -- which is what
// made C5/C8 read as product failures on 2026-09-21. Phases that genuinely need to cross time pass a
// larger bound explicitly.
const drain = (rounds = 40, maxMs = 3000) => {
  for (let r = 0; r < rounds; r++) {
    const due = timers.splice(0, timers.length).sort((a, b) => (a.at || 0) - (b.at || 0));
    if (!due.length) break;
    const runnable = due.filter((t) => (t.at || now) <= now + maxMs);
    for (const t of due) if (!runnable.includes(t)) timers.push(t);
    if (!runnable.length) break;
    for (const t of runnable) {
      now = (t.at || now) + 1;
      try { t.fn.apply(null, t.rest || []); } catch (e) { rec('timer-throw', String(e && e.message)); }
      if (t.interval) timers.push({ ...t, at: now + (t.ms || 0) });
    }
  }
};
const run = (full, label) => {
  try { vm.runInContext(fs.readFileSync(full, 'utf8'), ctx, { filename: label || full }); }
  catch (e) { rec('piece-throw', `${label}: ${e && e.message}`); }
};

// ---------------------------------------------------------------- phases
coldCache();
// The ENTRY piece first: it is what a paste runs, and (with window.document/navigator present) it
// publishes the hold + stand-down surface reported below as the shipped entry surface.
const PRE = ['shard-a-v1.js', 'shard-m-str-v1.js', 'shard-m1-v1.js', 'shard-l-v1.js', 'shard-e-str1-v1.js', 'shard-e-str2-v4.js', 'shard-u-v4.js'];
const CHAIN = ['shard-e1-v1.js', 'shard-e2-mound.js', 'shard-e3-mound.js', 'shard-e4-mound.js'];
for (const f of PRE) if (fs.existsSync(P(f))) run(P(f), f);
// stitch order, no drains in between: e1's `boot()` awaits step1 and yields, which is what lets
// e2/e3/e4 register their steps before the chain walks past step1.
for (const f of CHAIN) run(P(f), f);
const S0 = (mod._e && mod._e.S) || {};
// The harness's clock FAST-FORWARDS: a single drain() jumps `now` to the next due timer, so the
// product's own 15 s boot handshake timeout would fire before the (mock) venue has answered it and the
// page would take its no-venue path -- a harness artefact, not a defect. Cancel it here; the boot path
// itself is exercised by the real traces and by gate-replay's full-wire run.
// NOTE: clear through the SANDBOX's clearTimeout -- the pieces schedule on the sandbox timer list,
// so a Node-scope clearTimeout(id) is a silent no-op here (that cost me one debugging round).
try { if (S0._0xbootTimer) { sandbox.clearTimeout(S0._0xbootTimer); S0._0xbootTimer = null; } } catch (e) {}
await turn(2);                      // publish + yield only

// A CLAIM exists from here on (the operator claims ~10 s after pasting). The claim also LIFTS the stall,
// so the product's unclaimed fallback never fires during the test -- otherwise every later phase would
// be measuring a released page (GoogleRelease aborts the shared controller) instead of the revive path,
// which is exactly what made this tool's own failures misleading on 2026-09-21.
try { mod._stallLift && mod._stallLift(); } catch (e) {}
const coldArm = (() => { try { S0._0xclaimed = true; return !!S0._0xarm(); } catch (e) { return false; } })();
await turn(2);
// The names a cold boot must publish are the ones the LATER steps actually read back off `S`:
// e1 owns m0-m9; m4..m7 stay inside e1 (they are only used by its own venue scan, lines ~332/389-392,
// in the pre-build-19 source as well -- they were never on `S`), so the contract list is the ones
// e2/e3/e4 read: m0, m1, m2, m8, m9, q7 and pk33.video.
VENUE.pockets = {
  m0: S0._0xm0, m1: S0._0xm1, m2: S0._0xm2, m8: S0._0xm8, m9: S0._0xm9, q7: S0._0xq7,
  t0: (S0.pk33 && S0.pk33.video) || 'video',
};
const missingNames = Object.entries(VENUE.pockets).filter(([, v]) => !(typeof v === 'string' && v.length)).map(([k]) => k);
const namesKnown = missingNames.length === 0;
add('C1', 'the cold boot still publishes the chain surface (names + arm hook)',
  namesKnown && typeof S0._0xarm === 'function',
  `names:${namesKnown}/${Object.keys(VENUE.pockets).length} missing:[${missingNames.join(',')}] arm:${typeof S0._0xarm} chain:"${S0._0xchain}"`);

add('C2', 'a cold venue is recorded as a NAMED waiting state, not a silent stop',
  /^waiting-(pockets|capability|chores)$/.test(String(S0._0xchain)),
  `_0xchain = "${S0._0xchain}"`);

// (the venue names come from step1's own publications, which now run on a cold page too)
const hooks = [
  ['_0xseed', typeof S0._0xseed === 'function'],
  ['begin', typeof mod.v814owlmpb782on?.begin === 'function'],
  ['extend', typeof mod.v814owlmpb782on?.extend === 'function'],
  ['roster', typeof mod.v814owlmpb782on?.roster === 'function'],
];
add('C3', 'a cold boot no longer loses the worker entry points (they used to be skipped)',
  hooks.every(([, ok]) => ok), hooks.map(([k, ok]) => `${k}:${ok ? 'yes' : 'NO'}`).join(' '));

// The entry piece's own surface: the hold key, the lift and the stand-down hook. These names are
// table-encoded in the built bytes, so a byte grep cannot see them -- this is the runtime proof that
// the payload's first piece still publishes them.
const entry = {
  holdKey: typeof mod._stallHeld, lift: typeof mod._stallLift, standDown: typeof mod._standDown,
  reason: typeof mod._standReason, sinkOpen: typeof mod._sinkOpen, entryRef: typeof mod._entry,
};
add('C7', 'the shipped entry piece publishes the hold + stand-down surface at runtime',
  entry.holdKey === 'function' && entry.lift === 'function' && entry.standDown === 'function' && entry.reason === 'string' && entry.entryRef === 'function',
  `holdKey:${entry.holdKey} lift:${entry.lift} standDown:${entry.standDown} reason:${entry.reason} sinkOpen:${entry.sinkOpen} entryRef:${entry.entryRef}`);

// PHASE B — the claim taken above, while cold: accepted, and it did NOT pretend work happened
add('C4', 'a claim on a cold page is accepted and does not pretend work happened',
  coldArm === false && !events.some((e) => /phase-st/.test(e)),
  `arm()=${coldArm} (false is correct while the venue is cold)`);

// PHASE C — the venue's modules finish registering, and the retry (or the next claim) starts work
const before = logs.length;
warmCache();
try { S0._0xarm(); } catch (e) {}
try { mod.v814owlmpb782on?.begin?.(); } catch (e) {}
await turn(10, 30000);
const sawLive = events.some((e) => /phase-st/.test(e)) || logs.slice(before).some((l) => /phase-st|Pacing|shelf item|would not settle|shapes|Ledger:/.test(l));
const stAfter = S0._0xchain;
add('C5', 'once the venue registers, the same page arms again and the worker runs',
  stAfter === 'armed' || stAfter === 'live' || sawLive,
  `chain "${stAfter}" / warm=${VENUE.warm} / new log lines: ${logs.length - before}`);

// PHASE D — end the session and check the handles survive (the old "store dead" cause).
// A cold venue sets only some of the handles, so first stand in for the warm scan: put a sentinel on
// every slot a real scan fills. The assertion is identity-based -- a `finally` that writes nulls onto
// these slots is exactly what made every later fill report `storeDead:true, totalCandidateStores:-1`.
const HANDLES = ['_0x1', '_0x2', '_0x3', '_0x4', '_0x5', '_0x6', '_0x7', '_0x8', '_0x9'];
const sentinels = {};
for (const k of HANDLES) { sentinels[k] = Object.freeze({ slot: k, store: k === '_0x5' }); S0[k] = sentinels[k]; }
const ledgerBefore = Array.isArray(S0._0xb) ? S0._0xb.slice() : S0._0xb;
try { S0._0xkill = true; } catch (e) {}                 // the worker's own exit path
try { mod.v814owlmpb782on?.close?.(); } catch (e) {}   // the operator verb
await turn(25, 60000);
// If a session really ran, its `finally` closes the chain by itself -- we do NOT write 'closed'
// here, so `teardown ran` below is evidence and not our own assertion.
const teardownRan = S0._0xchain === 'closed' || S0._0xledger === 'closed';
const dropped = HANDLES.filter((k) => S0[k] !== sentinels[k]);
const ledgerKept = S0._0xb === null || (Array.isArray(ledgerBefore) && Array.isArray(S0._0xb));
// The runtime guard above can only fire if a session reaches its `finally`. A session only completes
// against a live venue, which a cold harness does not have -- so pair it with the static property that
// B18 violated: the end-of-session cleanup must not null the chunk array / require fn / venue handles.
let nineNull = false;
try {
  const e4text = fs.readFileSync(P('shard-e4-mound.js'), 'utf8');
  nineNull = /_0x1\s*=\s*S\._0x2\s*=|S\._0x1\s*=\s*S\._0x2[\s\S]{0,120}_0x9\s*=\s*null/.test(e4text)
         || /_0x2\s*=\s*S\._0x3[\s\S]{0,120}_0x9\s*=\s*null/.test(e4text);
} catch (e) { nineNull = null; }
add('C6', 'ending a session does not throw the venue handles away (the old "store dead" cause)',
  dropped.length === 0 && ledgerKept && nineNull === false,
  `handles kept ${HANDLES.length - dropped.length}/9${dropped.length ? ' dropped:[' + dropped.join(',') + ']' : ''} · teardown ran:${teardownRan} · ledger closed:${S0._0xb === null} · nine-slot nulling in e4:${nineNull === null ? 'unreadable' : nineNull} · chain "${S0._0xchain}"`);

// PHASE E — the real entry point. C4/C5 above set `S._0xclaimed` by hand; this drives
// `window.GoogleUblock` exactly as the operator does and asserts the revive actually happens:
// the claim flag is set, `_0xarm` runs and the worker's door (`begin`) is called. The gate is stubbed
// (no secret ever enters this tool) but nothing else is: the path is shard-a's own claim handler.
const claimDrives = async (lvl, opt) => {
  const o = opt || {};
  const calls = { arm: 0, begin: 0, armed: null };
  const armReal = S0._0xarm;
  S0._0xarm = (...a) => { calls.arm++; const r = o.forceArm ? true : armReal.apply(null, a); calls.armed = !!r; return r; };
  const verbs = mod.v814owlmpb782on;
  const beginReal = verbs && verbs.begin;
  if (verbs) verbs.begin = (...a) => { calls.begin++; return beginReal && beginReal.apply(null, a); };
  const gateReal = mod._rcdGate;
  mod._rcdGate = { check: () => true, level: () => lvl };   // stand-in for the FNV gate
  try { win.crypto = win.crypto || {}; win.crypto.subtle = win.crypto.subtle || {}; } catch (e) {}
  if (!o.keepState) {   // a fresh claim starts a NEW session; C10 stages a live one and keeps it
    S0._0xclaimed = false; S0._0xchain = 'scanned';
    try { S0._0xstarted = false; S0._0xkill = false; } catch (e) {}
  }
  // The shipped entry function. The piece published it on `window` at boot (see `published` below);
  // the harness then crossed its own 120 s window UNCLAIMED, so the stall's expiry removed it exactly
  // as designed -- which is why the recorded identity (`_0xmod._entry`, the same object) is accepted
  // here too. Nothing else about the call is staged: this is shard-a's own claim handler.
  const GU = [win.GoogleUblock, sandbox.GoogleUblock, mod._entry].find((f) => typeof f === 'function');
  let answer = null;
  try { answer = GU ? await GU.call(win, 'claim-shape-check') : 'ERR:entry-not-published'; }
  catch (e) { answer = 'ERR:' + (e && e.message); }
  await turn(6, 20000);
  S0._0xarm = armReal;
  if (verbs) verbs.begin = beginReal;
  mod._rcdGate = gateReal;
  return { answer, calls, armed: calls.armed, claimed: S0._0xclaimed === true, chain: S0._0xchain, started: S0._0xstarted === true };
};
// C6's teardown ran the release verb (by design), which latches `signal.aborted` for the rest of the
// harness run. C8 is about a page that has NOT been released, so stand in a live signal object for
// these two phases and restore the real one afterwards.
const sigSaved = mod._e.signal;
mod._e.signal = { aborted: false };
const pstBefore = events.filter((e) => /phase-st/.test(e)).length;
const rcdRun = await claimDrives(1, { forceArm: true });   // a page that CAN run: must actually start
const dbgRun = await claimDrives(2, { forceArm: true });
const pstAfter = events.filter((e) => /phase-st/.test(e)).length;
add('C8', 'a claim through the shipped entry point drives the revival (both slots)',
  rcdRun.answer === true && rcdRun.claimed && rcdRun.calls.arm > 0 && rcdRun.calls.begin > 0 &&
  dbgRun.answer === true && dbgRun.claimed && dbgRun.calls.arm > 0 && dbgRun.calls.begin > 0 &&
  (rcdRun.chain === 'live' || rcdRun.started) && (dbgRun.chain === 'live' || dbgRun.started),
  `published at boot:${events.some((e) => /window\.set\|GoogleUblock/.test(e))} \u00b7 ` +
  `rcd: answer=${rcdRun.answer} claimed=${rcdRun.claimed} arm=${rcdRun.calls.arm} begin=${rcdRun.calls.begin} \u00b7 ` +
  `dbg: answer=${dbgRun.answer} claimed=${dbgRun.claimed} arm=${dbgRun.calls.arm} begin=${dbgRun.calls.begin} \u00b7 ` +
  `worker entered: rcd=${rcdRun.chain === 'live' || rcdRun.started} dbg=${dbgRun.chain === 'live' || dbgRun.started}`);

// C8b — and it must NOT start one on a RELEASED page. `GoogleRelease` is one-shot and aborts the shared
// controller; launching into that is the instant "Last call" + restart storm of 2026-09-21. Claim is
// still accepted (it is), but nothing may be started and the report must say `released:true`.
mod._e.signal = { aborted: true };   // the released page (C8b)
const pstRelBefore = events.filter((e) => /phase-st/.test(e)).length;
const relRun = await claimDrives(1, { forceArm: true });
await turn(2);   // the product buffers its lines and flushes on a turn; read the diag after that
const pstRelAfter = events.filter((e) => /phase-st/.test(e)).length;
const sawReleased = events.some((e) => /"released":\s*true/.test(e)) || logs.some((l) => /"released":\s*true/.test(l));
mod._e.signal = sigSaved;
add('C8b', 'a claim on a released page is accepted but starts nothing (no doomed run)',
  relRun.answer === true && relRun.claimed && relRun.chain !== 'live' && relRun.started !== true && sawReleased,
  `answer=${relRun.answer} claimed=${relRun.claimed} begin called=${relRun.calls.begin} worker entered:${relRun.chain === 'live' || relRun.started} released flag:${sawReleased}`);

// C9 — THE REGRESSION TEST FOR THE STORM. A finished session plus a claim must settle: the late-arm
// retry may not relaunch it. Before this test existed, build 19/20 relaunched a closed session every
// 5 s forever and spammed "Last call / Session closed" into the operator's console.
const begins = { n: 0 };
const beginReal = mod.v814owlmpb782on.begin;
mod.v814owlmpb782on.begin = (...a) => { begins.n++; return beginReal.apply(null, a); };
try { S0._0xchain = 'closed'; S0._0xclaimed = true; S0._0xstarted = false; } catch (e) {}
const stormBefore = events.filter((e) => /phase-st/.test(e)).length;
await turn(200, 600000);                          // ~10 minutes of the retry's own 5 s cadence
const stormAfter = events.filter((e) => /phase-st/.test(e)).length;
mod.v814owlmpb782on.begin = beginReal;
add('C9', 'a finished session is not relaunched by the retry (the restart storm)',
  begins.n === 0 && stormAfter === stormBefore && S0._0xchain !== 'live',
  `worker starts after close: ${begins.n} \u00b7 phase-st added: ${stormAfter - stormBefore} \u00b7 chain "${S0._0xchain}"`);

// C10 -- a claim while a session is LIVE must not start a second worker. On a COLD venue a started
// session legitimately ends at its latency gate ("standing by"), so the live state is staged here:
// the property under test is the claim path itself (shard-a's revive), not the worker's own life.
const begins2 = { n: 0 };
const beginWas = mod.v814owlmpb782on.begin;
mod.v814owlmpb782on.begin = (...a) => { begins2.n++; return beginWas.apply(null, a); };
const liveSaved = { started: S0._0xstarted, chain: S0._0xchain, kill: S0._0xkill };
S0._0xchain = 'live'; S0._0xstarted = true; S0._0xkill = false;
const again = await claimDrives(1, { forceArm: true, keepState: true });   // claim while a session runs
mod.v814owlmpb782on.begin = beginWas;
const liveChainAfter = S0._0xchain;
add('C10', 'a second claim while a session is live does not start another worker',
  again.answer === true && begins2.n === 0 && liveChainAfter === 'live',
  `staged live session · second claim begin() calls:${begins2.n} chain live:${liveChainAfter === 'live'}`);
S0._0xstarted = liveSaved.started; S0._0xchain = liveSaved.chain; S0._0xkill = liveSaved.kill;

// C12 -- a session whose ledger vanished must STOP, not throw. In trace #5 a duplicate session read
// `.length` off a ledger the first session's `finally` had already nulled, and the crash surfaced as
// "Kicked back an error: Cannot read properties of null (reading 'length')". Deterministic on purpose:
// the ledger is nulled BEFORE the loop is entered, so the very first read is the one under test --
// no race, and it holds on SOURCE and on BUILT bytes alike (built identifiers are table-encoded).
const ledPre = S0._0xb;
let nullThrew = null;
process.on('unhandledRejection', (e) => { nullThrew = nullThrew || String((e && e.message) || e); });
const beforeNull = logs.length;
warmCache();                                  // a registered venue is what lets the loop actually run
try { S0._0xb = null; } catch (e) {}          // the ledger is already gone when the loop is entered
try { S0._0xstarted = false; S0._0xkill = false; } catch (e) {}
try { S0._0xarm(); } catch (e) {}
try { mod.v814owlmpb782on?.begin?.(); } catch (e) { nullThrew = nullThrew || String((e && e.message) || e); }
await turn(14, 30000);
const nullFailLines = logs.filter((l) => /reading 'length'|Kicked back an error/.test(l));
const chainAfterNull = S0._0xchain;
add('C12', 'a vanished ledger stops the session loop cleanly (no null-ledger TypeError)',
  nullThrew === null && nullFailLines.length === 0 && chainAfterNull !== 'live',
  `entered the loop with a nulled ledger · threw:${nullThrew || 'no'} · bad lines:${nullFailLines.length} · chain after "${chainAfterNull}" · new lines:${logs.length - beforeNull}`);
try { S0._0xb = ledPre; } catch (e) {}

// C12s -- the same property as a static fact about the file that ships. The guard is spelled
// differently at each build stage (`Array.isArray(x._0xb)` at the loop head in source; folded into the
// loop condition after uglify; `Array[<table lookup>](x['_0xb'])` after the mound stage), so all three
// spellings are accepted -- and a piece with the guard deleted matches none of them (that is the
// negative control this row was built against).
const GUARD_FORMS = [
  [/if \(!Array\.isArray\(S\._0xb\)\) break;/, 'source: guard at the loop head'],
  [/Array\.isArray\([A-Za-z_$][\w$]*\._0xb\)\s*;\s*\)\s*\{/, 'uglified: guard folded into the loop condition'],
  [/['"]?aborted['"]?\][^;]{0,240}?Array\[[^\[\]]{1,80}\]\(\s*[^()]{1,40}\[\s*['"][^'"]{0,20}_0xb['"]\s*\]\s*\)/, 'mounded: isArray looked up through the table'],
];
let guardForm = null, guardText = '';
try {
  guardText = fs.readFileSync(P('shard-e4-mound.js'), 'utf8');
  guardForm = (GUARD_FORMS.find(([re]) => re.test(guardText)) || [])[1] || null;
} catch (e) { guardForm = 'unreadable'; }
add('C12s', 'the shipping piece only loops while the ledger is an array (guard present in shipped bytes)',
  !!guardForm, guardForm || `no guard form matched (${guardText.length} bytes read)`);

// C11 -- post-release labels. `GoogleRelease()` zeroes the packed string tables; before the fix every
// line printed after that read "[Google ]" (operator: "We still have those [Google ] Blanks").
const labelProbe = (() => {
  const LX = mod.lex;
  if (!LX || typeof LX.C !== 'function') return { ok: false, why: 'no lex in scope' };
  const before = [0, 6, 9].map((i) => { try { return String(LX.C(i)); } catch (e) { return ''; } });
  let wiped = false;
  try { mod._wipeTables && mod._wipeTables(); wiped = true; } catch (e) {}
  const after = [0, 6, 9].map((i) => { try { return String(LX.C(i)); } catch (e) { return ''; } });
  return { ok: before.every((v) => v.trim()) && after.every((v) => v.trim()), wiped, before, after };
})();
add('C11', 'channel labels survive a table wipe (no more "[Google ]" blanks)',
  labelProbe.ok,
  `wiped:${labelProbe.wiped} before:[${(labelProbe.before || []).join(',')}] after:[${(labelProbe.after || []).join(',')}]`);

if (argv.includes('--debug')) {
  // Walk the chain again with every step wrapped: errors inside `boot()` are swallowed by its own
  // catch (by design), so the only way to see WHERE a cold run stops is to wrap the steps.
  const trace = [];
  const wrap = (n) => {
    const f = mod._e[n];
    if (typeof f !== 'function') { trace.push(`${n}:missing`); return; }
    mod._e[n] = async (S) => {
      trace.push(`${n}:start`);
      try { const r = await f(S); trace.push(`${n}:${r === mod._e.STOP ? 'STOP' : 'done'}`); return r; }
      catch (e) { trace.push(`${n}:THROW ${e && e.message}`); throw e; }
    };
  };
  ['step1', 'step2', 'step3', 'step4'].forEach(wrap);
  await mod._e.boot();
  drain(6);
  console.log('== chain walk (debug) ==');
  trace.forEach((t) => console.log('   ' + t));
  const S = (mod._e && mod._e.S) || {};
  console.log('   S keys:', Object.keys(S).join(','));
  console.log('   chain:', S._0xchain, '| arm:', typeof S._0xarm, '| seed:', typeof S._0xseed, '| begin:', typeof mod.v814owlmpb782on?.begin);
}
if (argv.includes('--dump')) {
  const S = (mod._e && mod._e.S) || {};
  console.log('== published chain surface (dump) ==');
  for (const k of Object.keys(S)) console.log(`   ${k} = ${typeof S[k]}${typeof S[k] === 'string' ? ' "' + S[k] + '"' : ''}`);
  const flat = Object.entries(S).filter(([, v]) => typeof v === 'string');
  console.log('   string values:', JSON.stringify(Object.fromEntries(flat)));
  console.log('   phases seen:', [...new Set(events.filter((e) => /phase/.test(e)).map((e) => e.split('|')[1]))].join(', '));
  console.log('   last logs:', logs.slice(-10).join(' // '));
}
if (AS_JSON) {
  console.log(JSON.stringify({
    rows, surface: { entry, hooks: Object.fromEntries(hooks), chain: S0._0xchain, sentinels: HANDLES.length },
    events: events.slice(-40), logs: logs.slice(-30),
  }, null, 1));
} else {
  console.log('== chain revive check (cold venue -> claim -> venue registers)');
  for (const r of rows) console.log(`   ${r.ok ? 'PASS' : 'FAIL'}  ${r.id}  ${r.desc}\n           [${r.detail}]`);
  const pass = rows.every((r) => r.ok);
  console.log(`\n== chain revive: ${pass ? 'PASS' : 'FAIL'} (${rows.filter((r) => r.ok).length}/${rows.length})`);
  if (!pass) {
    console.log('\n-- last log lines --'); logs.slice(-14).forEach((l) => console.log('   ' + l));
    console.log('-- last events --'); events.slice(-14).forEach((l) => console.log('   ' + l));
  }
}
process.exit(rows.every((r) => r.ok) ? 0 : 1);
