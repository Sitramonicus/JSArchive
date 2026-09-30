#!/usr/bin/env node
// boot-smoke.mjs — the S1 acceptance oracle. Boots one payload in the SAME VM sandbox as
// tools/decoy-parity.mjs (its runOne environment, minus the comparison): virtual timers, `window =
// sandbox`, document/location/navigator/AbortController/crypto shims, and the `var 会員 = K; var 名 =
// "X";` preamble the runner carries ahead of the payload. Reports THROW (with the message), SPIN
// (synchronous execution over the timeout), or BOOT OK with captured lines after virtual time advances.
// A tool change that passes static gates but fails here is a REGRESSION. Usage:
//   node tools/boot-smoke.mjs <woven.js> [--timeout=ms] [--advance=ms] [--trace]
import fs from 'node:fs';
import vm from 'node:vm';
import { createRequire } from 'node:module';

const argv = process.argv.slice(2);
const file = argv.find((a) => !a.startsWith('--'));
const timeout = Number((argv.find((a) => a.startsWith('--timeout=')) || '--timeout=20000').split('=')[1]);
const advanceMs = Number((argv.find((a) => a.startsWith('--advance=')) || '--advance=121000').split('=')[1]);
const trace = argv.includes('--trace');
if (!file) { console.error('usage: node tools/boot-smoke.mjs <woven.js> [--timeout=ms] [--advance=ms] [--trace]'); process.exit(2); }
const require0 = createRequire(import.meta.url);
const KAIKAN = Number(process.env.SMOKE_KAIKAN || 2);
const NAME = process.env.SMOKE_NAME || 'smoke';

const log = [];
let offset = 0, seq = 1;
const timers = [];
class VDate extends Date {
  constructor(...a) { if (a.length === 0) super(Date.now() + offset); else super(...a); }
  static now() { return Date.now() + offset; }
}
const setT = (fn, ms) => { const id = seq++; timers.push({ id, at: offset + (Number(ms) || 0), fn, dead: false }); return id; };
const clrT = (id) => { const t = timers.find((x) => x.id === id); if (t) t.dead = true; };
const advance = (ms) => {
  offset += ms;
  for (;;) {
    const due = timers.filter((t) => !t.dead && t.at <= offset).sort((a, b) => a.at - b.at);
    if (!due.length) break;
    due[0].dead = true;
    try { due[0].fn(); } catch (e) {}
  }
};
const sandbox = {
  Date: VDate, Math, JSON, String, Number, Array, Object, Promise, Uint8Array, Uint16Array, Int32Array,
  Float64Array, Proxy, Reflect, Symbol, Map, Set, WeakMap, WeakSet, Error, TypeError, RangeError, RegExp,
  TextEncoder, TextDecoder, setTimeout: setT, clearTimeout: clrT, setInterval: setT, clearInterval: clrT,
  queueMicrotask,
  AbortController: globalThis.AbortController, AbortSignal: globalThis.AbortSignal,
  performance: { now: () => Date.now() },
  atob: (b64) => Buffer.from(String(b64), 'base64').toString('latin1'),
  btoa: (s) => Buffer.from(String(s), 'latin1').toString('base64'),
  console: { log: (...a) => log.push(a.join(' ')), debug: (...a) => log.push(a.join(' ')), warn: (...a) => log.push(a.join(' ')), error: (...a) => log.push(a.join(' ')), info: (...a) => log.push(a.join(' ')), clear: () => {} },
  crypto: { subtle: require0('node:crypto').webcrypto.subtle },
  document: { createElement: () => ({ setAttribute() {}, style: {}, appendChild() {} }), body: { appendChild() {} }, addEventListener: () => {} },
  location: { origin: 'https://example.invalid', href: 'https://example.invalid/', pathname: '/' },
};
sandbox.globalThis = sandbox; sandbox.window = sandbox;
sandbox.navigator = { userAgent: 'parity', languages: ['en'] };
const ctx = vm.createContext(sandbox);
ctx._0xmod = { log: { say() {}, diag() {}, warn() {}, info() {}, queue() {}, flush() {} } };

const DECL = 'var \u4f1a\u54e1 = ' + KAIKAN + '; var \u540d = ' + JSON.stringify(NAME) + ';\n';
let src = fs.readFileSync(file, 'utf8');
if (!/^\s*var \u4f1a\u54e1\s*=/.test(src)) src = DECL + src;

let verdict;
try {
  vm.runInContext(src, ctx, { filename: file.split('/').pop(), timeout });
  advance(advanceMs);
  verdict = `BOOT OK — completed · log lines after +${advanceMs} ms: ${log.length}`;
} catch (e) {
  const msg = String(e && e.message || e);
  verdict = msg.includes('timed out')
    ? `SPIN — synchronous execution exceeded ${timeout} ms · log lines: ${log.length}`
    : `THROW — ${msg.slice(0, 160)} · log lines: ${log.length}`;
}
console.log(verdict);
if (trace || log.length) for (const l of log.slice(0, 8)) console.log('   ', JSON.stringify(l).slice(0, 110));
process.exit(verdict.startsWith('BOOT OK') ? 0 : 1);
