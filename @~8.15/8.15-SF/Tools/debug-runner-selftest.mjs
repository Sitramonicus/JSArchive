#!/usr/bin/env node
// debug-runner-selftest.mjs — prove the debug runner boots, logs and reports, in two page states:
//   clean  : no worker token on window  (the healthy path)
//   dirty  : a leftover worker token on window (the live symptom: verbs return true, nothing happens)
//
//   node Active/O8.15/tools/debug-runner-selftest.mjs
import fs from 'node:fs';
import vm from 'node:vm';
import { webcrypto } from 'node:crypto';

const SRC = fs.readFileSync('/home/user/Active/O8.15/Runners/O8.14-debug-runner.js', 'utf8');

async function run(label, { dirty }) {
  const lines = [];
  const push = (t) => lines.push(t);
  const fmt = (a) => a.map((x) => { if (typeof x === 'string') return x; try { return JSON.stringify(x); } catch (e) { return '[obj]'; } }).join(' ');
  const cons = {
    log: (...a) => push(fmt(a)), debug: (...a) => push(fmt(a)), info: (...a) => push(fmt(a)),
    warn: (...a) => push('WARN ' + fmt(a)), error: (...a) => push('ERR ' + fmt(a)), clear: () => push('--console cleared--'),
  };
  const sandbox = {
    console: cons, setTimeout, clearTimeout, setInterval, clearInterval, Date, Math, JSON, Promise, Symbol, Array, Object, String, Number, Boolean, Error, TypeError, Map, Set, WeakMap, WeakSet, TextEncoder, TextDecoder, URL, URLSearchParams,
    crypto: webcrypto, fetch: async () => ({ ok: false, status: 0, json: async () => ({}), text: async () => '' }),
    location: { href: 'https://example.invalid/channels/@me', hostname: 'example.invalid', origin: 'https://example.invalid' },
    navigator: { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/140.0 selftest', platform: 'Win32', languages: ['en-US'] },
    localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
    performance: { now: () => Date.now() },
    requestAnimationFrame: (f) => setTimeout(() => f(Date.now()), 16),
    cancelAnimationFrame: (i) => clearTimeout(i),
    AbortController, AbortSignal, Blob: class {}, FileReader: class {},
  };
  sandbox.window = sandbox; sandbox.globalThis = sandbox; sandbox.self = sandbox;
  sandbox.document = { cookie: '', readyState: 'complete', createElement: () => ({ style: {}, setAttribute: () => {}, appendChild: () => {}, getContext: () => null }), addEventListener: () => {}, removeEventListener: () => {}, documentElement: { style: {} }, head: { appendChild: () => {} }, body: { appendChild: () => {}, style: {} }, querySelector: () => null, querySelectorAll: () => [] };
  sandbox.top = sandbox; sandbox.parent = sandbox;
  if (dirty) { sandbox.window[Symbol.for('_0xq06118ef1')] = { released: false }; }   // the leftover of a previous session

  const ctx = vm.createContext(sandbox);
  try {
    vm.runInContext(SRC, ctx, { filename: 'O8.14-debug-runner.js', timeout: 20000 });
    await new Promise((r) => setTimeout(r, 400));
    const G = sandbox.window.__GDBG;
    const entry = sandbox.window.GoogleUblock;
    console.log('   boot: entry installed =', typeof entry === 'function', '· GDBG =', !!G, '· boot lines =', G ? G.lines.length : 0);
    if (typeof entry === 'function') {
      await entry('thisisjustfordebuggingwhyinthehelldoyouneedtoknowthecontents');   // the pwdDbg slot
      await new Promise((r) => setTimeout(r, 300));
      await entry('wertyuiopasdfghjklzxcvbnm');                                      // the view slot
      await new Promise((r) => setTimeout(r, 300));
    } else { push('!! GoogleUblock was not installed'); console.log('   boot: !! GoogleUblock was NOT installed in this sandbox'); }
    const gdbg = G;
    const audit = gdbg && gdbg.audit ? gdbg.audit() : null;
    const guard = audit && audit.guard;
    const pick = (name) => { const r = audit && audit.rows.find((x) => x.name.startsWith(name)); return r ? r.state : '?'; };
    console.log(`\n================ ${label} ================`);
    console.log('guard verdict      :', guard ? guard.branch : '(none)');
    console.log('guard why          :', guard ? guard.why.slice(0, 120) : '(none)');
    console.log('entry probe calls  :', (gdbg ? gdbg.events.filter((e) => e.kind === 'call').length : 0));
    console.log('matrix: entry      :', pick('entry GoogleUblock'), '· flag knob:', pick('level knob'), '· gate:', pick('rcd/dbg gate'))
    console.log('matrix: sink       :', pick('Log sink'), '· stall:', pick('stall'), '· e-piece:', pick('e-piece'), '· chain:', pick('chain'), '· ledger:', pick('ledger'));
    console.log('GDBG lines captured:', gdbg ? gdbg.lines.length : 0, '· held by stall:', gdbg ? gdbg.lines.filter((l) => l.stall === true).length : 0);
    const calls = (gdbg ? gdbg.events.filter((e) => e.kind === 'call') : []).map((e) => `${e.detail.slot}(ret=${e.detail.returned}, chain ${e.detail.chain}, level ${e.detail.level})`);
    for (const c of calls) console.log('  call             :', c);
    const guardLines = lines.filter((l) => /already on shift|standing down|spare/i.test(l));
    if (guardLines.length) console.log('  guard line seen  :', guardLines[0].slice(0, 130));
    return { lines, audit };
  } catch (e) {
    console.log(`\n================ ${label} ================\nTHREW: ${e.message}\n${String(e.stack).split('\n').slice(0, 4).join('\n')}`);
    return { lines, audit: null };
  }
}

const clean = await run('CLEAN PAGE (no worker token)', { dirty: false });
const dirty = await run('DIRTY PAGE (leftover worker token)', { dirty: true });
console.log('\n=== deliverable check ===');
console.log('report() renders  :', (() => { try { return clean.audit ? 'yes (audit ok)' : 'no'; } catch (e) { return 'no'; } })());
console.log('clean vs dirty differ on the guard:', clean.audit && dirty.audit ? (clean.audit.guard.branch !== dirty.audit.guard.branch) : 'n/a');
process.exit(0);
