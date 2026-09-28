#!/usr/bin/env node
/**
 * calibrate-sweep.mjs — O8.14 SWEEP recalibration harness (2026-09-20)
 *
 * The SWEEP trap counts out-of-range decode requests: an analyst poking positions outside the real
 * entry range walks SW_BAD up, and at SW_H the decoder degrades to garden fiction, at SW_T to tube.
 * Legitimate operation must stay far below SW_H, so the constants are calibrated against a real
 * workload instead of guessed. Pin rule (obf-strings-g7.js:71): SW_H = 2.5x max, SW_T = 3.5x max,
 * with floors (8 / 12); the floors win whenever the measured max is small.
 *
 * WHERE the monitor lives matters and cost a wrong first pass: g7 emits it into the SHARD sources,
 * so it ships inside the PAYLOAD (the minified bundle the runner decodes and evals), not in the
 * runner. Measured: O8.12-runner.js has no CS_TRIP_DIAG and no TRIPDIAG at all; the bundle has one
 * guard and eight TRIPDIAG sites. So this harness (1) runs the runner in the same fake-window
 * sandbox the tiers suite uses — no `process`, because injecting `process` makes the runner take
 * its node branch and return the 3 KB decoy — to obtain the payload, then (2) executes that payload
 * in a context with process.env.CS_TRIP_DIAG=1 and a capturing console.debug.
 *
 * Usage: node calibrate-sweep.mjs <runner.js> [--json]
 */
import fs from 'node:fs';
import vm from 'node:vm';

const argv = process.argv.slice(2);
const runnerPath = argv.find((a) => !a.startsWith('--'));
const asJson = argv.includes('--json');
if (!runnerPath) { console.error('usage: calibrate-sweep.mjs <runner.js> [--json]'); process.exit(2); }
const runnerSrc = fs.readFileSync(runnerPath, 'utf8');

const trips = [];   // every TRIPDIAG line seen, from every payload execution

function fakeWindow({ tileFeed = false, thin = 0 } = {}) {
  const w = {};
  if (thin < 1) w.document = { body: {} };
  if (thin < 2) { w.atob = globalThis.atob; w.DecompressionStream = globalThis.DecompressionStream; w.TextDecoder = globalThis.TextDecoder; }
  w.eval = (code) => { w.__captured = code; };
  if (tileFeed) {
    w.tileChunks = []; w.tileChunks.push = function () {};
    w.DiscordNative = {}; w.location = { hostname: 'discord.com' };
    w.navigator = { userAgent: 'Mozilla/5.0 Chrome/120' };
  }
  return w;
}

async function runWindow(source, opts = {}) {
  const w = fakeWindow(opts);
  const logs = [];
  const sandbox = { window: w, console: { log: (...a) => logs.push(a.join(' ')), clear() {} }, Array, Uint8Array, String, Math };
  const ctx = vm.createContext(sandbox);
  w.eval = (code) => {
    if (typeof code === 'string' && code.includes('(function legacyReel(')) return vm.runInContext(code, ctx);
    w.__captured = code;
  };
  vm.runInContext(source, ctx, { filename: 'runner.js' });
  const t0 = Date.now();
  let lastChange = 0;
  for (;;) {
    await new Promise((r) => setTimeout(r, 50));
    if (w.__captured !== undefined) {
      if (w.__capLen !== w.__captured.length) { w.__capLen = w.__captured.length; lastChange = Date.now(); }
      if (Date.now() - lastChange >= 400) break;
    }
    if (Date.now() - t0 >= (opts.budgetMs || 20000)) break;
  }
  return w.__captured ?? null;
}

// Execute the payload with the sweep diag on. The payload's own result is irrelevant here; only
// which dec() calls it made is. `timeout` bounds a synchronous runaway.
function execPayload(captured, label, ms = 120000) {
  let lines = 0;
  const ctx = vm.createContext({
    console: {
      log: (...a) => { lines++; },
      debug: (...a) => { const s = a.join(' '); lines++; if (s.includes('TRIPDIAG')) trips.push({ label, line: s }); },
      warn: () => {}, error: () => {}, clear() {},
    },
    process: { env: { CS_TRIP_DIAG: '1' } },
    atob: globalThis.atob, DecompressionStream: globalThis.DecompressionStream, TextDecoder: globalThis.TextDecoder,
    Array, Uint8Array, Uint16Array, String, Math, Date, JSON, Object, Number, RegExp, Error,
    parseInt, parseFloat, isNaN, encodeURIComponent, decodeURIComponent,
  });
  try { vm.runInContext(captured, ctx, { filename: 'payload.js', timeout: ms }); }
  catch (e) { lines++; }
  return lines;
}

async function main() {
  const runs = [['legit/default', {}], ['legit/tilefeed', { tileFeed: true }]];
  const out = [];
  for (const [label, opts] of runs) {
    trips.length = 0;
    const captured = await runWindow(runnerSrc, opts);
    if (!captured) {
      console.log(`  ${label.padEnd(16)} capture=NONE (runner produced no payload)`);
      out.push({ label, capture: null, tripdiag: 0, maxBad: null, maxLvl: null, tags: [] });
      continue;
    }
    const n = execPayload(captured, label);
    const bads = trips.map((t) => ({
      tag: (t.line.match(/TRIPDIAG (\S+)/) || [, '?'])[1],
      bad: Number((t.line.match(/bad=(\d+)/) || [, 0])[1]),
      lvl: Number((t.line.match(/lvl=(\d+)/) || [, 0])[1]),
    }));
    const row = {
      label, capture: captured.length, tripdiag: trips.length,
      maxBad: bads.length ? Math.max(...bads.map((b) => b.bad)) : null,
      maxLvl: bads.length ? Math.max(...bads.map((b) => b.lvl)) : null,
      tags: [...new Set(bads.map((b) => b.tag))],
    };
    out.push(row);
    console.log(`  ${label.padEnd(16)} payload=${captured.length}B TRIPDIAG=${row.tripdiag} maxBad=${row.maxBad} maxLvl=${row.maxLvl} tags=${row.tags.join(',') || '-'}`);
    if (bads.length) {
      const per = {};
      for (const b of bads) { per[b.tag] = Math.max(per[b.tag] ?? 0, b.bad); }
      console.log('    per-tag max bad:', JSON.stringify(per));
    }
  }
  const seen = out.filter((r) => r.maxBad !== null);
  const overall = seen.length ? Math.max(...seen.map((r) => r.maxBad)) : null;
  const FLOOR_H = 8, FLOOR_T = 12;
  const pin = overall === null
    ? { maxLegitBad: null, note: 'no TRIPDIAG observed — the workload never reached the monitor; not pinnable from this run', SW_H: FLOOR_H, SW_T: FLOOR_T, floors: [FLOOR_H, FLOOR_T] }
    : { maxLegitBad: overall, SW_H: Math.max(FLOOR_H, Math.ceil(2.5 * overall)), SW_T: Math.max(FLOOR_T, Math.ceil(3.5 * overall)), floors: [FLOOR_H, FLOOR_T] };
  console.log(`== legitimate max SW_BAD = ${overall}  ->  pin SW_H=${pin.SW_H} SW_T=${pin.SW_T} (2.5x / 3.5x, floors ${FLOOR_H}/${FLOOR_T})`);
  if (asJson) console.log(JSON.stringify({ runs: out, pin }, null, 1));
}
await main();
