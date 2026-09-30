#!/usr/bin/env node
// fidelity-check.mjs — is the debug runner actually the 8.14 baseline?
//
//   node Active/O8.15/tools/fidelity-check.mjs
//
// Loads three artifacts in identical stub pages and compares the lines the MACHINERY ITSELF prints
// (the harness's own `[GDBG]` lines are excluded -- they are supposed to be extra):
//
//   A  the shipped 8.14 bundle   (Active/O8.14/CC-33/final-package/O8.14-CC-33-final-bundle.js)
//   B  the raw stitch            (stitch-o85.py over the same shards, same order, no harness)
//   C  the debug runner          (same shards + the [GDBG] harness)
//
// B vs C answers "does the harness change behaviour?"  A vs B answers "does the shipped build behave
// like the raw pieces?"  A mismatch on either is a bug in the instrument, not a finding about 8.14.
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import { webcrypto } from 'node:crypto';

const REPO = '/home/user';
const SHARDS = path.join(REPO, 'Active/O8.14/CC-33/shards');
const ORDER = ['a', 'l', 'm-str', 'm1', 'm2', 'n1', 'c', 'h', 'e-str1', 'e-str2', 'e1', 'e2', 'e3', 'e4', 'n2', 'aux1', 'aux2', 'u', 'p-telegram', 'p-teams', 'p-zoom', 'p-slack', 'p-discord'];

const makeSandbox = (sink) => {
  const fmt = (a) => a.map((x) => { if (typeof x === 'string') return x; try { return JSON.stringify(x); } catch (e) { return '[obj]'; } }).join(' ');
  const cons = {
    log: (...a) => sink.push(fmt(a)), debug: (...a) => sink.push(fmt(a)), info: (...a) => sink.push(fmt(a)),
    warn: (...a) => sink.push('W ' + fmt(a)), error: (...a) => sink.push('E ' + fmt(a)), clear: () => sink.push('--clear--'),
  };
  const s = {
    console: cons, setTimeout, clearTimeout, setInterval, clearInterval, Date, Math, JSON, Promise, Symbol,
    Array, Object, String, Number, Boolean, Error, TypeError, Map, Set, WeakMap, WeakSet, TextEncoder, TextDecoder, URL, URLSearchParams,
    crypto: webcrypto, fetch: async () => ({ ok: false, status: 0, json: async () => ({}), text: async () => '' }),
    location: { href: 'https://example.invalid/channels/@me', hostname: 'example.invalid', origin: 'https://example.invalid' },
    navigator: { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/140.0 fidelity', platform: 'Win32', languages: ['en-US'] },
    localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
    performance: { now: () => Date.now() },
    requestAnimationFrame: (cb) => setTimeout(() => cb(Date.now()), 16), cancelAnimationFrame: (i) => clearTimeout(i),
    AbortController, AbortSignal,
    atob: (b64) => Buffer.from(String(b64), 'base64').toString('binary'),
    btoa: (b) => Buffer.from(String(b), 'binary').toString('base64'),
  };
  s.window = s; s.globalThis = s; s.self = s; s.top = s; s.parent = s;
  s.document = {
    cookie: '', readyState: 'complete',
    createElement: () => ({ style: {}, setAttribute: () => {}, appendChild: () => {}, getContext: () => null, width: 0, height: 0 }),
    addEventListener: () => {}, removeEventListener: () => {}, documentElement: { style: {} }, head: { appendChild: () => {} },
    body: { appendChild: () => {}, style: {} }, querySelector: () => null, querySelectorAll: () => [],
  };
  return s;
};

async function runOne(label, src, opts = {}) {
  const sink = [];
  const s = makeSandbox(sink);
  let err = null;
  try {
    vm.runInContext(src, vm.createContext(s), { filename: label, timeout: 20000 });
    await new Promise((r) => setTimeout(r, opts.settle || 900));
    // the same passphrase round on every artifact: gate slots, the revive slot, the view slot, then a
    // second claim on the same page -- the paths the operator actually exercises.
    const entry = s.window.GoogleUblock;
    if (typeof entry === 'function') {
      for (const pw of ['ripcord', 'thisisjustfordebuggingwhyinthehelldoyouneedtoknowthecontents', 'resurgence', 'wertyuiopasdfghjklzxcvbnm', 'ripcord']) {
        try { await entry(pw); } catch (e) {}
        await new Promise((r) => setTimeout(r, 120));
      }
    }
  } catch (e) { err = e.message; }
  const payload = sink.filter((l) => !l.includes('[GDBG]'));
  return { label, lines: payload, err, sink };
}

const stitch = (() => {
  const bodies = ORDER.map((t) => fs.readFileSync(path.join(SHARDS, `shard-${t}.js`), 'utf8').replace(/\n+$/, ''));
  return ['console.clear();', '(() => {', '  const _0xmod = {};', '', ...bodies.map((b) => b + '\n'), '})();'].join('\n') + '\n';
})();

const bundlePath = path.join(REPO, 'Active/O8.14/CC-33/final-package/O8.14-CC-33-final-bundle.js');
const bundle = fs.existsSync(bundlePath) ? fs.readFileSync(bundlePath, 'utf8') : null;
const runnerPath = path.join(REPO, 'Active/O8.15/Runners/O8.14-debug-runner.js');
const runner = fs.readFileSync(runnerPath, 'utf8');

const A = bundle ? await runOne('shipped-bundle', bundle) : { label: 'shipped-bundle', lines: [], err: 'missing file', sink: [] };
const B = await runOne('raw-stitch', stitch);
const C = await runOne('debug-runner', runner);

const norm = (l) => l.replace(/\d{2}:\d{2}:\d{2}\.\d{3}/g, 'TIME').replace(/\+\d+\.\d+s/g, '+Ts').replace(/\[MemberCount\][^"]*/g, '[MemberCount]').replace(/"ts":\d+/g, '"ts":T');
const cmp = (x, y) => {
  const a = x.lines.map(norm), b = y.lines.map(norm);
  const n = Math.max(a.length, b.length);
  const diffs = [];
  for (let i = 0; i < n; i++) if (a[i] !== b[i]) diffs.push({ i, a: a[i], b: b[i] });
  return { a: a.length, b: b.length, diffs };
};

const show = (r) => {
  console.log(`\n---- ${r.label}: ${r.lines.length} payload line(s)${r.err ? ' · ERROR: ' + r.err : ''}`);
  for (const l of r.lines.slice(0, 6)) console.log('   ' + l.slice(0, 150));
  if (r.lines.length > 6) console.log(`   … ${r.lines.length - 6} more`);
};

show(A); show(B); show(C);

console.log('\n===== verdicts =====');
const bc = cmp(B, C);
console.log(`B raw-stitch vs C debug-runner : ${bc.diffs.length === 0 ? 'IDENTICAL payload output (' + bc.a + ' lines)' : bc.diffs.length + ' DIFFERENT line(s)'}`);
for (const d of bc.diffs.slice(0, 6)) console.log(`   #${d.i}\n     stitch: ${String(d.a).slice(0, 140)}\n     runner: ${String(d.b).slice(0, 140)}`);
if (bundle) {
  const ab = cmp(A, B);
  console.log(`A shipped vs B raw-stitch     : ${ab.diffs.length === 0 ? 'IDENTICAL payload output (' + ab.a + ' lines)' : ab.diffs.length + ' DIFFERENT line(s)'}`);
  for (const d of ab.diffs.slice(0, 6)) console.log(`   #${d.i}\n     shipped: ${String(d.a).slice(0, 140)}\n     stitch : ${String(d.b).slice(0, 140)}`);
} else console.log('A shipped bundle: not found — cannot compare');
