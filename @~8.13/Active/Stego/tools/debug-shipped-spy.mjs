#!/usr/bin/env node
/**
 * debug-shipped-spy.mjs — run a BUILT runner verbatim in a fake window, spying on every
 * window.eval call, so a silent loader bail shows what it actually got as far as.
 *
 * The shipped loader swallows every failure (`catch (e9) { return; }`) and the tier suite
 * can therefore only print "(no capture)". This shows whether the reel step ran, what it
 * returned, and whether a payload ever reached the stage.
 *
 * Usage: node tools/debug-shipped-spy.mjs <runner.js> [--tileFeed] [--native] [--venue]
 *                                          [--name=<n>] [--budget=<ms>]
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const argv = process.argv.slice(2);
const flags = argv.filter(a => a.startsWith('--'));
const runnerPath = argv.filter(a => !a.startsWith('--'))[0] || path.resolve(HERE, '../stego-bench/O8.12-runner.js');
const NAME = (flags.find(f => f.startsWith('--name=')) || '--name=佐藤 結衣').split('=')[1];
const BUDGET = Number((flags.find(f => f.startsWith('--budget=')) || '--budget=30000').split('=')[1]);
const log = (...a) => console.log('[spy]', ...a);

const src = fs.readFileSync(runnerPath, 'utf8');
log('runner', runnerPath, src.length, 'chars');

const W = { document: { body: {} } };
W.atob = globalThis.atob;
W.DecompressionStream = globalThis.DecompressionStream;
W.TextDecoder = globalThis.TextDecoder;
if (flags.includes('--tileFeed')) { W.tileChunks = []; W.tileChunks.push = function () {}; }
if (flags.includes('--native')) W.DiscordNative = {};
if (flags.includes('--venue')) { W.location = { hostname: 'discord.com' }; W.navigator = { userAgent: 'Mozilla/5.0 Chrome/120' }; }
log('venue: tileFeed=' + flags.includes('--tileFeed'), 'native=' + flags.includes('--native'), 'venue=' + flags.includes('--venue'), 'name=' + JSON.stringify(NAME));

let captured = null;
const evals = [];
const sandbox = {
  window: W, 会員: 2, 名: NAME,
  console: { log: () => {}, clear: () => {}, debug: () => {}, warn: () => {}, error: () => {} },
  String, Array, Uint8Array, Math, JSON, Promise, Object,
};
const ctx = vm.createContext(sandbox);
W.eval = code => {
  const isReel = typeof code === 'string' && code.includes('legacyReel(');
  evals.push({ len: typeof code === 'string' ? code.length : -1, reel: isReel, head: typeof code === 'string' ? code.slice(0, 40) : String(code) });
  if (isReel) {
    try { const r = vm.runInContext(code, ctx); W.__reelType = typeof r; return r; }
    catch (e) { W.__reelThrow = String(e); throw e; }
  }
  captured = code;
};
process.on('unhandledRejection', e => log('unhandledRejection:', String(e && e.message || e).slice(0, 200)));

const t0 = Date.now();
try { vm.runInContext(src, ctx, { filename: 'runner.js' }); }
catch (e) { log('SYNC THROW:', String(e && e.message || e).slice(0, 200)); }
const iv = setInterval(() => {
  if (captured !== null || Date.now() - t0 >= BUDGET) {
    clearInterval(iv);
    log(`ms=${Date.now() - t0}`);
    log('window.eval calls:', evals.length);
    evals.slice(0, 5).forEach((e, i) => log(`  [${i}] len=${e.len} reel=${e.reel} ${JSON.stringify(e.head)}`));
    if (W.__reelType) log('reel evaluated to:', W.__reelType);
    if (W.__reelThrow) log('reel threw:', W.__reelThrow.slice(0, 200));
    if (captured !== null) {
      log(`CAPTURED ${captured.length} chars sha8=` + crypto.createHash('sha256').update(captured).digest('hex').slice(0, 8));
    } else log('captured: NONE — loader bailed silently');
    process.exit(captured !== null ? 0 : 1);
  }
}, 50);
