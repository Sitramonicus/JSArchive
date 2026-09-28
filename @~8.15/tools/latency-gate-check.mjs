#!/usr/bin/env node
/**
 * latency-gate-check.mjs — R2-05a verification harness (2026-09-20)
 *
 * PLAN-H §2 wants a gate that measures the SHAPE of a run rather than asking the environment a
 * question ("A Proxy resolves instantly. So gate on duration, not on value"), and §3.2 wants the
 * timed chain spread across at least three of the split e-pieces. The gate itself lives in the
 * payload's boot chain (stamps in e1/e2/e3/e4, verdict in e4) and fails safe: it asks the string
 * layer for fiction.
 *
 * This harness drives the real chain in three clock regimes:
 *   plausible — a monotonic clock that advances 25 ms per call (what a faithful emulator costs)
 *   frozen    — the clock never moves (what a drop-in Proxy does)
 *   absurd    — the clock jumps 10 minutes per call (heavy instrumentation / debugger stepping)
 *
 * For each regime it reports (a) what the RUNNER delivered (real / garden / honey / tube, by hash),
 * (b) the LATDIAG trace from the payload's own monitor, and (c) the verdict. Structural assertions
 * are made against the shard sources, since that is where the "no single home" property lives.
 *
 * Usage: node latency-gate-check.mjs <runner.js> <stego-build-dir> [--json]
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';

const argv = process.argv.slice(2);
const [runnerPath, buildDir] = argv.filter((a) => !a.startsWith('--'));
const asJson = argv.includes('--json');
if (!runnerPath || !buildDir) { console.error('usage: latency-gate-check.mjs <runner.js> <stego-build-dir> [--json]'); process.exit(2); }
const runnerSrc = fs.readFileSync(runnerPath, 'utf8');
const sha = (s) => crypto.createHash('sha256').update(s).digest('hex').slice(0, 12);
const known = {};
for (const kind of ['real', 'decoy', 'honey', 'tube']) {
  const f = fs.readdirSync(buildDir).find((n) => n.includes(kind) && n.endsWith('.min.js'));
  if (f) known[kind] = sha(fs.readFileSync(path.join(buildDir, f), 'utf8'));
}
const classify = (s) => (s === null ? '(none)' : Object.entries(known).find(([, h]) => h === sha(s))?.[0] ?? `unknown(${s.length}B)`);

function makeClock(kind) {
  let t = 1_700_000_000_000;
  if (kind === 'frozen') return { now: () => t };
  if (kind === 'absurd') return { now: () => (t += 600_000) };
  return { now: () => (t += 25) };
}

function makeWindow(kind, traps) {
  const w = {
    eval: (code) => { traps.push(code); },
    document: { body: {} },
    atob: globalThis.atob, DecompressionStream: globalThis.DecompressionStream, TextDecoder: globalThis.TextDecoder,
    tileChunks: [], DiscordNative: {}, performance: makeClock(kind),
    location: { hostname: 'discord.com' }, navigator: { userAgent: 'Mozilla/5.0 Chrome/120' },
  };
  w.tileChunks.push = function () {};
  return w;
}

// level 1: the runner decodes the carrier and hands back what it chose
async function runRunner(kind) {
  const traps = [];
  const w = makeWindow(kind, traps);
  const logs = [];
  const sandbox = { window: w, performance: w.performance, console: { log: (...a) => logs.push(a.join(' ')), clear() {} }, Array, Uint8Array, String, Math };
  const ctx = vm.createContext(sandbox);
  w.eval = (code) => {
    if (typeof code === 'string' && code.includes('(function legacyReel(')) return vm.runInContext(code, ctx);
    traps.push(code);
  };
  vm.runInContext(runnerSrc, ctx, { filename: 'runner.js' });
  const t0 = Date.now();
  let last = 0;
  for (;;) {
    await new Promise((r) => setTimeout(r, 50));
    if (traps.length) { if (traps.length !== last) { last = traps.length; lastAt = Date.now(); } if (Date.now() - lastAt >= 400) break; }
    if (Date.now() - t0 >= 15000) break;
  }
  return { delivered: traps.at(-1) ?? null, trapped: traps.length, logs };
}
let lastAt = Date.now();

// level 2: execute what the runner delivered, with the same clock regime, and see what IT does
function runBundle(kind, bundleSrc) {
  const traps = [];
  const w = makeWindow(kind, traps);
  const logs = [];
  const sandbox = {
    window: w, performance: w.performance,
    console: { log: (...a) => logs.push(a.join(' ')), debug: (...a) => logs.push(a.join(' ')), warn: () => {}, error: () => {}, clear() {} },
    process: { env: { CS_TRIP_DIAG: '1' } },
    atob: globalThis.atob, DecompressionStream: globalThis.DecompressionStream, TextDecoder: globalThis.TextDecoder,
    Array, Uint8Array, Uint16Array, String, Math, Date, JSON, Object, Number, RegExp, Error,
  };
  const ctx = vm.createContext(sandbox);
  let threw = null;
  try { vm.runInContext(bundleSrc, ctx, { filename: 'bundle.js', timeout: 120000 }); } catch (e) { threw = e.message.slice(0, 90); }
  return { trapped: traps.length, produced: traps.at(-1) ?? null, lexMode: sandbox.lexMode ?? sandbox.globalThis?.lexMode ?? null, latdiag: logs.filter((l) => /LATDIAG|TRIPDIAG/.test(l)), threw };
}

// structural: the timed chain must not live in one piece
function structuralCheck() {
  const dir = path.resolve(path.dirname(runnerPath), '..', 'shards');
  const rows = [];
  for (const n of ['shard-e1.js', 'shard-e2.js', 'shard-e3.js', 'shard-e4.js']) {
    const f = path.join(dir, n);
    if (!fs.existsSync(f)) { rows.push([n, 'missing', 0]); continue; }
    const s = fs.readFileSync(f, 'utf8');
    const stamps = (s.match(/lat\.t\[\d\]/g) || []).length;
    const helper = /_0xmod\._e\.now\s*=/.test(s);
    rows.push([n, stamps ? (helper ? 'helper+stamp' : 'stamp') : helper ? 'helper' : 'none', stamps]);
  }
  const stamped = rows.filter((r) => r[2] > 0).length;
  return { rows, stamped, ok: stamped >= 3 };
}

const out = {};
for (const kind of ['plausible', 'frozen', 'absurd']) {
  const l1 = await runRunner(kind);
  const l2 = runBundle(kind, l1.delivered ?? '');
  out[kind] = { runnerDelivered: classify(l1.delivered), runnerTraps: l1.trapped, bundleTraps: l2.trapped, bundleProduced: classify(l2.produced), lexMode: l2.lexMode, diag: l2.latdiag.slice(0, 3), threw: l2.threw };
  console.log(`  ${kind.padEnd(10)} runner=${out[kind].runnerDelivered.padEnd(16)} bundle→${out[kind].bundleProduced.padEnd(16)} lexMode=${l2.lexMode} diag=${l2.latdiag.slice(0, 1).join(' | ') || '-'}`);
}
const st = structuralCheck();
console.log(`\n  structural: timed chain in ${st.stamped} of 4 e-pieces ` + st.rows.map((r) => `${r[0].replace('shard-', '').replace('.js', '')}:${r[1]}`).join(' ') + (st.ok ? '  OK (>=3 pieces)' : '  FAIL'));
if (asJson) console.log(JSON.stringify({ out, structural: st }, null, 1));
