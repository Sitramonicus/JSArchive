#!/usr/bin/env node
/**
 * split-equivalence.mjs — PLAN-H (U10) acceptance gate.
 *
 * Runs one shard file (or a set of split pieces, in cascade order) inside a deterministic mock
 * host and records EVERYTHING observable: log calls (queue/say/diag), every string-table decode
 * (`_0xed(...)`), lex lookups, window/document writes, timer scheduling, and the order in which
 * they happen. Two runs whose traces are identical are behaviourally equivalent *on this host*.
 *
 *   node tools/split-equivalence.mjs --a <shard-e.js> --b <shard-e1.js>,<shard-e2.js>,... \
 *        [--pre <shard-e-str.js>] [--rounds 400] [--json]
 *
 * Host model: `_0xmod` with log/lex/mc + a universal stub for the r2 module bundle, deterministic
 * Date/Math.random/setTimeout. Anything the shard reaches through the stub is recorded, so a split
 * that changes control flow (or loses a binding) changes the trace.
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const argv = process.argv.slice(2);
const arg = (n, d) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : d; };
const A = arg('--a'), B = arg('--b');
// LIVE-3 re-baseline (2026-09-21): the e family has no 1:1 pre-split ancestor any more — the prologue
// it used to inline (codec bootstrap + string-table registration) now lives in the m-str/e-str/u
// pieces, outside the family. Comparing against the retired monolith therefore reports a *stale
// baseline* rather than a defect, forever. The honest replacement is a GOLDEN TRACE: freeze what the
// shipped pieces actually do, and fail when a later change moves it.
//   --write-baseline <file>   record the B-side trace as the reference
//   --vs-baseline <file>      compare this run's B-side trace against a recorded reference
const WRITE_BASELINE = arg('--write-baseline');
const VS_BASELINE = arg('--vs-baseline');
// `--pre a.js,b.js,c.js` -- comma-separated. It was NOT split before 2026-09-21, so the recorded
// golden trace was made with NO pre pieces loaded (the path was handed over with its commas, hit
// ENOENT, and the run continued). The trace is re-recorded below with the pieces actually loaded.
const PRE = arg('--pre', '').split(',').map((x) => x.trim()).filter(Boolean);
const ROUNDS = parseInt(arg('--rounds', '400'), 10);
const AS_JSON = argv.includes('--json');
const DUMP = argv.includes('--dump');
const CHUNK = argv.includes('--chunk');
// HOLD CHECK (2026-09-21): the stall's second half -- an unclaimed session must not reach the venue.
// This fixture already builds a full e-family host, so it can drive the real `pk34`/`pk35` venue-call
// wrappers and watch the r2 transport stub for attempts. `HOLD` is a mutable flag standing in for
// shard-a's `_0xstall`, so one boot can show both sides of the ruling.
// (a `--hold` probe lived here briefly on 2026-09-21; removed -- see tools/hold-check.mjs)   // give the mock a webpack-chunk-style array (deeper code path)
if (!B || (!A && !VS_BASELINE && !WRITE_BASELINE)) { console.error('usage: split-equivalence.mjs --a <file> --b <f1,f2,...> [--pre <file>] [--rounds N] [--json] [--write-baseline f | --vs-baseline f]'); process.exit(2); }

async function run(files, preFiles) {
  const events = [];
  const rec = (kind, detail) => events.push(`${kind}|${detail}`);
  const latLines = [];   // R2-05a diagnostics, deliberately outside the event stream
  // SKEY: the shipped string layer prefixes its literals with a fixed 16-char key and strips it at the
  // `_0xmod.log` boundary (that is why console output is readable in the real client while the source
  // is not greppable). The mock log must do the same, or every post-chunk piece looks different from
  // its pre-chunk original. Key literal recorded here for harness fidelity only — R2-05b (which would
  // remove it) is deferred, so it is still the shipped form.
  const SKEY = 'JV~~v}t1}tuvtcL1';
  const dekey = (s) => String(s).split(SKEY).join('');
  const str = (v) => (typeof v === 'string' ? dekey(v) : (v === null ? 'null' : typeof v));
  let timerId = 1;
  const timers = [];
  const CLOCK = (process.argv.find((a) => a.startsWith('--clock=')) || '--clock=plausible').split('=')[1];
  let _t = 1_700_000_000_000;
  const performance = { now: () => (CLOCK === 'frozen' ? _t : CLOCK === 'absurd' ? (_t += 600_000) : (_t += 50)) };   // plausible: a faithful emulator's per-call cost
  let now = _t;   // R2-05a: driven by --clock
  let rngState = 0x2f6e2b1;
  const rand = () => { rngState = (rngState * 1103515245 + 12345) & 0x7fffffff; return rngState / 0x7fffffff; };
  // universal stub: any property -> callable proxy that records and returns another stub / thenable
  const stubCache = new Map();
  function makeStub(label) {
    if (stubCache.has(label)) return stubCache.get(label);
    const fn = function (...args) { rec('stub', `${label}(${args.map((a) => str(a)).join(',')})`); return fn; };
    let cache;
    const p = new Proxy(fn, {
      get(t, k) {
        if (k === 'then') return undefined;                    // never awaitable by accident
        if (k === Symbol.toPrimitive) return () => `[stub ${label}]`;
        if (k === 'toString') return () => `[stub ${label}]`;
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
  // R2-05a: the e-chain times itself. Provide a controllable monotonic clock so the latency gate can
  // be exercised at piece level: --clock=plausible (advances 25 ms/call), frozen (never moves),
  // absurd (jumps 10 min/call).
  const _0xmod = {
    log: {
      queue: (...a) => rec('log.queue', a.map(str).join('|')),
      say: (...a) => rec('log.say', a.map(str).join('|')),
      diag: (...a) => rec('log.diag', a.map(str).join('|')),
      clear: () => rec('log.clear', ''),
      warn: (...a) => rec('log.warn', a.map(str).join('|')),
    },
    lex: {
      C: (i) => { rec('lex.C', String(i)); return `C${i}`; },
      P: (i, arr) => { rec('lex.P', `${i}:${Array.isArray(arr) ? arr.map(str).join(',') : str(arr)}`); return `P${i}`; },
      F: (...a) => { rec('lex.F', a.map(str).join('|')); return 'F'; },
    },
    mc: 3,
    // `m` (the mix shard) reads its tables off _0xmod._m: ci = code stream, pb/mb = the two mix
    // tables. Filled with decodable values so the flat split of m can actually be exercised here;
    // without them both sides throw in the first statement and the trace proves nothing.
    // `e` (the O8.12 boot/mix chain, split four ways by PLAN-H) reads its host table off _0xmod._e:
    // eb = the packed string table, ed = its decoder, plus the chain's own scratch/state slots.
    // Restored 2026-09-20 — without this both sides die on their first statement (_0xmod._e undefined)
    // and the trace proves nothing. Slot names are exactly the ones the four pieces touch.
    _e: (() => {
      const eb = new Uint16Array(4096);
      for (let i = 0; i < eb.length; i++) eb[i] = 0x21 + ((i * 11) % 94);
      const ed = (i) => { const n = Math.abs(Number(i) || 0) % eb.length; let s = ''; for (let k = 0; k < 12; k++) s += String.fromCharCode(eb[(n + k) % eb.length]); return s; };
      // `lat` is `{ t: [] }` -- every step in this family opens with `lat.t[n] = now()`, and the
      // old `lat: []` shape made each of them throw on their first line, so the family trace
      // proved very little (found 2026-09-21 while wiring the hold check).
      return { eb, ed, v: 'h32', lat: { t: [] }, latV: undefined, now: () => now, STOP: { stop: true },
               S: { _0xlat0: 0 }, release: () => { rec('e.release', ''); },
               signal: null, controller: null, tasks: null, track: null, flag: 0, boot: null };
    })(),
    _m: {
      ci: (() => { const a = new Uint16Array(8192); for (let i = 0; i < a.length; i++) a[i] = 0x21 + ((i * 7) % 94); return a; })(),
      pb: (() => { const a = new Uint16Array(8192); for (let i = 0; i < a.length; i++) a[i] = 0x21 + ((i * 13) % 94); return a; })(),
      mb: (() => { const a = new Uint16Array(8192); for (let i = 0; i < a.length; i++) a[i] = 0x21 + ((i * 29) % 94); return a; })(),
    },
    v814quartzѕａ8863: makeStub('r2'),
    v814дебдмдл166: makeStub('r2gate'),
  };
  const win = {};
  if (CHUNK) {
    // a webpack-chunk-style array: push(cb) invokes the callback with a fake require
    const chunk = [];
    chunk.push = function (cb) {
      rec('chunk.push', typeof cb);
      try {
        const req = (id) => ({ id, exports: { A: { video: () => {}, tasks: new Map() }, Ay: {}, h: {}, Bo: {} } });
        req.m = { '1': (mod, exp, rq) => { exp.A = { video: () => {}, tasks: new Map() }; } };
        req.c = { '1': { exports: { A: { video: () => {}, tasks: new Map() } } } };
        cb({}, req);            // webpack runtime bootstrap
      } catch (e) { rec('chunk.push-throw', String(e && e.message)); }
      return 1;
    };
    win.webpackChunkdiscord_app = chunk;
  }
  const handler = {
    set(t, k, v) { rec('window.set', `${String(k)}=${str(v)}`); t[k] = v; return true; },
    get(t, k) {
      if (k in t) return t[k];
      rec('window.get', String(k));
      return undefined;            // faithful: a fresh page has no host object here
    },
    has(t, k) { return k in t; },
  };
  const sandbox = {
    _0xmod,
    console: { log: (...a) => rec('console.log', a.map(str).join(' ')), clear: () => rec('console.clear', ''), debug: (...a) => { latLines.push(a.join(' ')); }, warn: () => {}, error: () => {} },
    process: { env: { CS_TRIP_DIAG: '1' } },
    window: new Proxy(win, handler),
    document: {
      hidden: false,
      addEventListener: (t, f, c) => rec('document.addEventListener', `${t}:${typeof f}:${!!c}`),
      removeEventListener: (t, f) => rec('document.removeEventListener', `${t}:${typeof f}`),
      body: { appendChild: (x) => rec('body.appendChild', str(x)), removeChild: (x) => rec('body.removeChild', str(x)) },
      createElement: (t) => { rec('document.createElement', t); return makeStub(`el.${t}`); },
      querySelector: (s) => { rec('document.querySelector', s); return null; },
      querySelectorAll: (s) => { rec('document.querySelectorAll', s); return []; },
      getElementById: (id) => { rec('document.getElementById', id); return null; },
    },
    navigator: { platform: 'Win32', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120', onLine: true },
    location: { pathname: '/channels/123/456', origin: 'https://discord.com', hostname: 'discord.com', href: 'https://discord.com/channels/123/456' },
    setTimeout: (fn, ms, ...rest) => { const id = timerId++; rec('setTimeout', `${id}:${ms}`); timers.push({ id, fn, ms, at: now + (ms || 0), rest }); return id; },
    clearTimeout: (id) => { const i = timers.findIndex((t) => t.id === id); if (i >= 0) timers.splice(i, 1); rec('clearTimeout', String(id)); },
    setInterval: (fn, ms) => { const id = timerId++; rec('setInterval', `${id}:${ms}`); timers.push({ id, fn, ms, at: now + (ms || 0), interval: true }); return id; },
    clearInterval: (id) => { const i = timers.findIndex((t) => t.id === id); if (i >= 0) timers.splice(i, 1); rec('clearInterval', String(id)); },
    queueMicrotask: (fn) => Promise.resolve().then(fn),
    Math: Object.create(Math),
    Date: new Proxy(Date, { get: (t, k) => (k === 'now' ? () => now : t[k]), construct: (t, a) => new t(...a) }),
    JSON, Object, Array, String, Number, Boolean, Symbol, Map, Set, WeakMap, WeakSet, Promise, RegExp, Error, TypeError,
    Uint8Array, Uint16Array, Uint32Array, Int8Array, Int16Array, Int32Array, Float32Array, Float64Array, ArrayBuffer, DataView,
    parseInt, parseFloat, isNaN, isFinite, encodeURIComponent, decodeURIComponent, atob: globalThis.atob, btoa: globalThis.btoa,
    TextDecoder, TextEncoder, performance: performance,   // R2-05a: the --clock-driven clock
    AbortController: globalThis.AbortController, AbortSignal: globalThis.AbortSignal,
    EventTarget: globalThis.EventTarget, Event: globalThis.Event, CustomEvent: globalThis.CustomEvent,
    MessageChannel: globalThis.MessageChannel, MessageEvent: globalThis.MessageEvent,
    localStorage: (() => { const m = new Map(); return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => { m.set(k, String(v)); rec('localStorage.set', k); }, removeItem: (k) => m.delete(k), clear: () => m.clear(), key: (i) => [...m.keys()][i] || null, get length() { return m.size; } }; })(),
    sessionStorage: (() => { const m = new Map(); return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => { m.set(k, String(v)); rec('sessionStorage.set', k); }, removeItem: (k) => m.delete(k), clear: () => m.clear(), key: (i) => [...m.keys()][i] || null, get length() { return m.size; } }; })(),
    fetch: (u, o) => { rec('fetch', String(u)); return Promise.resolve({ ok: true, status: 200, json: async () => ({}), text: async () => '', arrayBuffer: async () => new ArrayBuffer(0) }); },
    URL: globalThis.URL, URLSearchParams: globalThis.URLSearchParams,
    crypto: { getRandomValues: (a) => { for (let i = 0; i < a.length; i++) a[i] = Math.floor(rand() * 256); return a; }, randomUUID: () => '00000000-0000-4000-8000-000000000000' },
    structuredClone: (v) => JSON.parse(JSON.stringify(v ?? null)),
    innerWidth: 1600, innerHeight: 900, devicePixelRatio: 1,
    requestAnimationFrame: (fn) => { const id = timerId++; timers.push({ id, fn, ms: 16, at: now + 16 }); rec('rAF', String(id)); return id; },
  };
  sandbox.Math.random = rand;
  // R2-05a: claim a venue so the latency gate's condition is live, and let the console capture
  // LATDIAG lines (the payload's own monitor, gated on CS_TRIP_DIAG in the real build).
  // R2-05a fixture: claim a venue the way a real Discord client looks, so the boot chain actually
  // walks steps 1..4 and the latency verdict becomes observable (without this, step1 legitimately
  // returns STOP and the stamped chain never reaches e2/e3/e4 — see U15).
  sandbox.DiscordNative = {};
  sandbox.webpackChunkdiscord_app = Object.assign([], { push: (x) => x });
  sandbox.location = { hostname: 'discord.com', origin: 'https://discord.com', href: 'https://discord.com/channels/@me' };
  sandbox.navigator = { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120' };
  sandbox.globalThis = sandbox;
  const ctx = vm.createContext(sandbox);
  for (const f of preFiles) {
    if (!f) continue;
    try { vm.runInContext(fs.readFileSync(f, 'utf8'), ctx, { filename: path.basename(f) }); }
    catch (e) { rec('PRE-THROW', `${path.basename(f)}: ${e.message}`); }
  }
  rec('== begin ==', 'run');   // identical marker on both sides
  for (const f of files) {
    try { vm.runInContext(fs.readFileSync(f, 'utf8'), ctx, { filename: path.basename(f) }); }
    catch (e) { rec('THROW', `${path.basename(f)}: ${e.message}`); }
  }
  // drain: deterministic rounds of timers + microtasks
  for (let r = 0; r < ROUNDS; r++) {
    await new Promise((res) => setImmediate(res));
    if (timers.length === 0) { if (r > 3) break; continue; }
    timers.sort((x, y) => (x.at - y.at) || (x.id - y.id));
    const t = timers[0];
    if (t.at > now + 60000 * 60) break;         // do not run hour-scale waits
    now = t.at;
    if (!t.interval) timers.shift(); else { t.at = now + t.ms; }
    try { t.fn(...(t.rest || [])); } catch (e) { rec('TIMER-THROW', `${t.id}: ${e.message}`); }
  }
  const sKeys = Object.keys((_0xmod._e && _0xmod._e.S) || {}).sort();
  if (process.env.LAT_REPORT) {
    console.log('  [lat] clock=' + CLOCK + ' lexMode=' + String(sandbox.lexMode) + ' stamps=' + JSON.stringify((_0xmod._e && _0xmod._e.lat && _0xmod._e.lat.t) || null) + ' diag=' + (latLines.filter((l) => /LATDIAG/.test(l)).slice(0, 1).join('') || '-'));
  }
  rec('== end ==', `events=${events.length}`);
  return { events, mod: _0xmod, sKeys };
}

const PIECES = B.split(',').map((s) => s.trim()).filter(Boolean);
if (WRITE_BASELINE) {
  const b0 = await run(PIECES, PRE);
  const rec0 = { tool: 'split-equivalence golden trace', pieces: PIECES, pre: [PRE].filter(Boolean),
                 rounds: ROUNDS, clock: arg('--clock', 'plausible'), events: b0.events };
  fs.writeFileSync(WRITE_BASELINE, JSON.stringify(rec0, null, 1) + '\n');
  console.log(`== golden trace written: ${WRITE_BASELINE} (${b0.events.length} events over ${PIECES.length} pieces)`);
  process.exit(0);
}
if (VS_BASELINE) {
  const ref = JSON.parse(fs.readFileSync(VS_BASELINE, 'utf8'));
  const b1 = await run(PIECES, PRE);
  const rl = ref.events, cl = b1.events;
  let d = -1;
  for (let i = 0; i < Math.max(rl.length, cl.length); i++) if (rl[i] !== cl[i]) { d = i; break; }
  const ok = d === -1;
  console.log(`== split equivalence vs golden trace: ${ok ? 'PASS' : 'FAIL'}`);
  console.log(`   ref ${path.basename(VS_BASELINE)}: ${rl.length} events   this run: ${cl.length} events`);
  if (!ok) {
    console.log(`   first divergence at event ${d}:`);
    console.log(`     ref:  ${JSON.stringify(rl.slice(Math.max(0, d - 2), d + 2), null, 1).slice(0, 500)}`);
    console.log(`     run:  ${JSON.stringify(cl.slice(Math.max(0, d - 2), d + 2), null, 1).slice(0, 500)}`);
  } else {
    const kinds = new Map();
    for (const e of rl) { const k = e.split('|')[0]; kinds.set(k, (kinds.get(k) || 0) + 1); }
    console.log('   event mix: ' + [...kinds.entries()].sort((x, y) => y[1] - x[1]).slice(0, 12).map(([k, v]) => `${k}=${v}`).join(' '));
  }
  process.exit(ok ? 0 : 1);
}
const a = await run([A], [PRE].filter(Boolean));
const b = await run(PIECES, [PRE].filter(Boolean));
const la = a.events, lb = b.events;
let first = -1;
for (let i = 0; i < Math.max(la.length, lb.length); i++) if (la[i] !== lb[i]) { first = i; break; }
const pass = first === -1;
const summary = {
  pass, aEvents: la.length, bEvents: lb.length,
  firstDiff: first,
  a: first >= 0 ? la.slice(Math.max(0, first - 3), first + 3) : null,
  b: first >= 0 ? lb.slice(Math.max(0, first - 3), first + 3) : null,
};
if (DUMP) { console.log('--- A trace ---'); for (const e of la) console.log('  ' + e); console.log('--- B trace ---'); for (const e of lb) console.log('  ' + e); }
if (AS_JSON) { console.log(JSON.stringify(summary, null, 2)); }
else {
  console.log(`== split equivalence: ${pass ? 'PASS' : 'FAIL'}`);
  console.log(`   A ${path.basename(A)}: ${la.length} events   B ${B.split(',').length} pieces: ${lb.length} events`);
  if (!pass) {
    console.log(`   first difference at event ${first}:`);
    console.log(`     A: ${JSON.stringify(summary.a, null, 1).slice(0, 600)}`);
    console.log(`     B: ${JSON.stringify(summary.b, null, 1).slice(0, 600)}`);
  } else {
    const kinds = new Map();
    for (const e of la) { const k = e.split('|')[0]; kinds.set(k, (kinds.get(k) || 0) + 1); }
    console.log('   event mix: ' + [...kinds.entries()].sort((x, y) => y[1] - x[1]).slice(0, 12).map(([k, v]) => `${k}=${v}`).join(' '));
  }
}
process.exit(pass ? 0 : 1);
