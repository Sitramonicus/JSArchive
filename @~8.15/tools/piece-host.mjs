#!/usr/bin/env node
/**
 * piece-host.mjs — boot ONE built (obfuscated) piece in the same deterministic host family that
 * tools/split-equivalence.mjs uses, and hand back what it PUBLISHED on `_0xmod`.
 *
 * Why this exists (2026-09-21): hold-check's H4 used to grep the built shard-a for the literal
 * strings `_stallHeld` / `_stallLift`. The lane obfuscator moves some literals into its own string
 * table and reads them back through a decoder (`P[CF(0xN)]=()=>Q`), so a byte-grep can report a
 * missing half that is present and working. A check on the obfuscated artifact has to ask the
 * artifact, not the text — hence a boot.
 *
 *   import { boot } from './piece-host.mjs';
 *   const { mod, window, errors } = boot('/path/to/shard-a-v1.js');
 *   typeof mod._stallHeld === 'function'
 *
 * The host is deliberately the SAME shape as split-equivalence's (log/lex/mc + `_e`/`_m` tables +
 * universal r2 stub + faithful `window` that answers `undefined` for unknown keys), because that is
 * the fixture the built pieces are already known to run under.
 */
import fs from 'node:fs';
import vm from 'node:vm';

const SKEY = 'JV~~v}t1}tuvtcL1';        // shipped string-layer key (see R2-05b note in split-equivalence)
const dekey = (s) => String(s).split(SKEY).join('');
const str = (v) => (typeof v === 'string' ? dekey(v) : (v === null ? 'null' : typeof v));

export function boot(file, opts = {}) {
  const hits = [];
  const rec = (kind, detail) => { if (opts.trace) hits.push(`${kind}|${detail}`); };
  const timers = [];
  let timerId = 1;
  const clock = (process.argv.find((a) => a.startsWith('--clock=')) || '--clock=plausible').split('=')[1];
  let _t = 1_700_000_000_000;
  const performance = { now: () => (clock === 'frozen' ? _t : clock === 'absurd' ? (_t += 600_000) : (_t += 50)) };
  let now = _t;
  let rngState = 0x2f6e2b1;
  const rand = () => { rngState = (rngState * 1103515245 + 12345) & 0x7fffffff; return rngState / 0x7fffffff; };

  const stubCache = new Map();
  function makeStub(label) {
    if (stubCache.has(label)) return stubCache.get(label);
    const fn = function (...args) { rec('stub', `${label}(${args.map((a) => str(a)).join(',')})`); return fn; };
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
    _e: (() => {
      const eb = new Uint16Array(4096);
      for (let i = 0; i < eb.length; i++) eb[i] = 0x21 + ((i * 11) % 94);
      const ed = (i) => { const n = Math.abs(Number(i) || 0) % eb.length; let s = ''; for (let k = 0; k < 12; k++) s += String.fromCharCode(eb[(n + k) % eb.length]); return s; };
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
  if (opts.chunk !== false) {
    const chunk = [];
    chunk.push = function (cb) {
      rec('chunk.push', typeof cb);
      try {
        const req = (id) => ({ id, exports: { A: { video: () => {}, tasks: new Map() }, Ay: {}, h: {}, Bo: {} } });
        req.m = { '1': (m, exp) => { exp.A = { video: () => {}, tasks: new Map() }; } };
        req.c = { '1': { exports: { A: { video: () => {}, tasks: new Map() } } } };
        cb({}, req);
      } catch (e) { rec('chunk.push-throw', String(e && e.message)); }
      return 1;
    };
    win.webpackChunkdiscord_app = chunk;
  }
  const handler = {
    set(t, k, v) { rec('window.set', `${String(k)}=${str(v)}`); t[k] = v; return true; },
    get(t, k) { if (k in t) return t[k]; rec('window.get', String(k)); return undefined; },
    has(t, k) { return k in t; },
  };

  const sandbox = {
    _0xmod: mod,
    console: { log: (...a) => rec('console.log', a.map(str).join(' ')), clear: () => rec('console.clear', ''), debug: () => {}, warn: () => {}, error: () => {} },
    process: { env: { CS_TRIP_DIAG: '1' } },
    window: new Proxy(win, handler),
    document: {
      hidden: false,
      addEventListener: (t, f, c) => rec('document.addEventListener', `${t}:${typeof f}:${!!c}`),
      removeEventListener: (t, f) => rec('document.removeEventListener', `${t}:${typeof f}`),
      body: { appendChild: (x) => rec('body.appendChild', str(x)), removeChild: (x) => rec('body.removeChild', str(x)) },
      createElement: (t) => { rec('document.createElement', t); return makeStub(`el.${t}`); },
      querySelector: () => null, querySelectorAll: () => [], getElementById: () => null,
    },
    navigator: { platform: 'Win32', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120', onLine: true },
    location: { pathname: '/channels/@me', origin: 'https://discord.com', hostname: 'discord.com', href: 'https://discord.com/channels/@me' },
    setTimeout: (fn, ms, ...rest) => { const id = timerId++; rec('setTimeout', `${id}:${ms}`); timers.push({ id, fn, ms, at: now + (ms || 0), rest }); return id; },
    clearTimeout: (id) => { const i = timers.findIndex((t) => t.id === id); if (i >= 0) timers.splice(i, 1); },
    setInterval: (fn, ms) => { const id = timerId++; rec('setInterval', `${id}:${ms}`); timers.push({ id, fn, ms, at: now + (ms || 0), interval: true }); return id; },
    clearInterval: (id) => { const i = timers.findIndex((t) => t.id === id); if (i >= 0) timers.splice(i, 1); },
    queueMicrotask: (fn) => Promise.resolve().then(fn),
    Math: Object.create(Math),
    Date: new Proxy(Date, { get: (t, k) => (k === 'now' ? () => now : t[k]), construct: (t, a) => new t(...a) }),
    JSON, Object, Array, String, Number, Boolean, Symbol, Map, Set, WeakMap, WeakSet, Promise, RegExp, Error, TypeError,
    Uint8Array, Uint16Array, Uint32Array, Int8Array, Int16Array, Int32Array, Float32Array, Float64Array, ArrayBuffer, DataView,
    parseInt, parseFloat, isNaN, isFinite, encodeURIComponent, decodeURIComponent, atob: globalThis.atob, btoa: globalThis.btoa,
    TextDecoder, TextEncoder, performance,
    AbortController: globalThis.AbortController, AbortSignal: globalThis.AbortSignal,
    EventTarget: globalThis.EventTarget, Event: globalThis.Event, CustomEvent: globalThis.CustomEvent,
    MessageChannel: globalThis.MessageChannel, MessageEvent: globalThis.MessageEvent,
    localStorage: (() => { const m = new Map(); return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)), removeItem: (k) => m.delete(k), clear: () => m.clear(), key: (i) => [...m.keys()][i] || null, get length() { return m.size; } }; })(),
    sessionStorage: (() => { const m = new Map(); return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)), removeItem: (k) => m.delete(k), clear: () => m.clear(), key: (i) => [...m.keys()][i] || null, get length() { return m.size; } }; })(),
    fetch: (u) => { rec('fetch', String(u)); return Promise.resolve({ ok: true, status: 200, json: async () => ({}), text: async () => '', arrayBuffer: async () => new ArrayBuffer(0) }); },
    URL: globalThis.URL, URLSearchParams: globalThis.URLSearchParams,
    crypto: { getRandomValues: (a) => { for (let i = 0; i < a.length; i++) a[i] = Math.floor(rand() * 256); return a; }, randomUUID: () => '00000000-0000-4000-8000-000000000000' },
    structuredClone: (v) => JSON.parse(JSON.stringify(v ?? null)),
    innerWidth: 1600, innerHeight: 900, devicePixelRatio: 1,
    requestAnimationFrame: (fn) => { const id = timerId++; timers.push({ id, fn, ms: 16, at: now + 16 }); return id; },
  };
  sandbox.Math.random = rand;
  sandbox.DiscordNative = {};
  sandbox.globalThis = sandbox;
  const ctx = vm.createContext(sandbox);

  const errors = [];
  try { vm.runInContext(fs.readFileSync(file, 'utf8'), ctx, { filename: file.split('/').pop() }); }
  catch (e) { errors.push(`load: ${e && e.message}`); }

  // drain the timer queue the way the pieces expect (each timer runs at most once per round)
  const drain = (rounds = opts.rounds || 4) => {
    for (let r = 0; r < rounds; r++) {
      const due = timers.splice(0, timers.length).sort((a, b) => (a.at || 0) - (b.at || 0));
      if (!due.length) break;
      for (const t of due) { now = t.at || now; try { t.fn.apply(null, t.rest || []); } catch (e) { errors.push(`timer: ${e && e.message}`); } }
    }
    return errors;
  };

  return { mod, window: win, sandbox, errors, hits, drain, timers, now: () => now };
}

export default boot;
