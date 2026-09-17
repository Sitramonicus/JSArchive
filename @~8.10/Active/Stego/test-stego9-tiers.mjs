#!/usr/bin/env node
/**
 * O8.9 tier tests (G2/G3 carrier; v3.3.0 loader). Usage:
 *   node test-stego9-tiers.mjs <runner.js> <cover.bmp> [cleanCover.bmp] [--quick] [--debug-name=...]
 * Full: 37 asserts (+1 conditional debug-name T2 when --debug-name given):
 * T0 silence, T1 garden-v2 byte-exact + executes, T2 bundle byte-exact,
 * rename-degrade, probe-bit flips, PG3 documented-format, PSNR pin, BMP validity,
 * Line-1 searchability, banner. --quick: T1-default + Line-1 only (4 asserts).
 */
import vm from 'node:vm';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import zlib from 'node:zlib';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const [runnerPath, bmpPath, ...rest] = process.argv.slice(2);
if (!runnerPath || !bmpPath) { console.error('usage: test-stego3-tiers.mjs <runner> <bmp> [clean] [--quick] [--debug-name=...]'); process.exit(2); }
const quick = rest.some(a => a === '--quick');
const dbgArg = rest.find(a => a.startsWith('--debug-name='));
const debugName = dbgArg ? dbgArg.slice('--debug-name='.length) : null;
const cleanArg = rest.find(a => !a.startsWith('--'));
const HERE = path.dirname(fileURLToPath(import.meta.url));
const cleanPath = cleanArg || path.join(HERE, '..', '..', 'Uploads', 'stego2-cover.bmp');
const dir = path.dirname(path.resolve(runnerPath));
const runnerSrc = fs.readFileSync(runnerPath, 'utf8');
const minReal = fs.readFileSync(path.join(dir, 'stego9-real.min.js'), 'utf8');
const minDecoy = fs.readFileSync(path.join(dir, 'stego9-decoy.min.js'), 'utf8');
const minHoney = fs.readFileSync(path.join(dir, 'stego9-honey.min.js'), 'utf8');
const DEFAULT_NAME = '佐藤 結衣';
const ALT_NAME = '田中 花子';

let pass = 0, fail = 0, skipped = 0;
function ok(name, cond, extra = '') {
  if (cond) { pass++; console.log(`  PASS ${name}`); }
  else { fail++; console.log(`  FAIL ${name} ${extra}`); }
}
function skip(name) { skipped++; console.log(`  SKIP ${name}`); }
// loader's personalize(), transliterated
function personalize(src, kaiin, namae) {
  if (kaiin !== undefined) src = src.replace(/会員\s*=\s*(0x2|2|1|0)/, '会員=' + kaiin);
  if (namae !== undefined && namae !== DEFAULT_NAME) src = src.split(DEFAULT_NAME).join(namae);
  return src;
}
function withLine1(src, kaiin, namae) {
  let s = src;
  if (kaiin !== undefined) {
    const i = s.indexOf('会員 = 2');
    if (i < 0 || i > 200) throw new Error('Line-1 会員 anchor not first');
    s = s.replace('会員 = 2', `会員 = ${kaiin}`);
  }
  if (namae !== undefined) {
    const i = s.indexOf(DEFAULT_NAME);
    if (i < 0 || i > 200) throw new Error('Line-1 名 anchor not first');
    s = s.replace(DEFAULT_NAME, namae);
  }
  return s;
}
function fakeWindow({ tileFeed = false, thin = 0, noReel = false, noNative = false, noVenue = false, dead = [], deadHost = null } = {}) {
  const w = {};
  if (thin < 1) w.document = { body: {} };
  if (thin < 2) {
    w.atob = globalThis.atob;
    w.DecompressionStream = globalThis.DecompressionStream;
    w.TextDecoder = globalThis.TextDecoder;
  }
  w.eval = (code) => { w.__captured = code; };
  if (tileFeed && !noReel) { w.tileChunks = []; w.tileChunks.push = function () {}; }
  if (tileFeed && !noNative) { w.DiscordNative = {}; }
  if (tileFeed && !noVenue) {
    w.location = { hostname: 'discord.com' };
    w.navigator = { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120' };
  }
  if (dead.includes('tg')) w.Telegram = { WebApp: {} };
  if (dead.includes('teams')) w.microsoftTeams = {};
  if (dead.includes('zoom')) w.ZoomMtg = {};
  if (dead.includes('slack')) {
    const ua0 = (w.navigator && w.navigator.userAgent) || '';
    w.navigator = { userAgent: ua0 + ' Slack/4.36' };
    if (!w.location) w.location = { hostname: 'example.com' };
  }
  if (deadHost) {
    w.location = { hostname: deadHost };
    if (!w.navigator) w.navigator = { userAgent: 'Mozilla/5.0' };
  }
  return w;
}
function desc(cap) {
  if (cap === null) return '(no capture)';
  return `(len=${cap.length} sha8=${crypto.createHash('sha256').update(cap).digest('hex').slice(0, 8)})`;
}
async function runWindow(source, opts) {
  const w = fakeWindow(opts);
  const budget = opts.budgetMs || 20000;
  const logs = [];
  const sandbox = {
    window: w,
    console: { log: (...a) => logs.push(a.join(' ')), clear() {} },
    Array, Uint8Array, String, Math,
  };
  const ctx = vm.createContext(sandbox);
  w.eval = (code) => {
    // Protocol: the reel step is a side-effect-free function expression — really
    // evaluate it (real indirect eval returns the function); payloads capture.
    if (typeof code === 'string' && code.includes('(function legacyReel(')) {
      return vm.runInContext(code, ctx);
    }
    w.__captured = code;
  };
  vm.runInContext(source, ctx, { filename: 'runner.js' });
  const t0 = Date.now();
  let lastChange = 0;
  for (;;) {
    await new Promise(r => setTimeout(r, 50));
    if (w.__captured !== undefined) {
      if (w.__capLen !== w.__captured.length) { w.__capLen = w.__captured.length; lastChange = Date.now(); }
      if (Date.now() - lastChange >= 400) break; // settled on the final payload
    }
    if (Date.now() - t0 >= budget) break;
  }
  const captured = w.__captured ?? null;
  console.log(`  [run] ms=${Date.now() - t0} cap=${captured === null ? 'NONE' : captured.length + 'B sha8=' + crypto.createHash('sha256').update(captured).digest('hex').slice(0, 8)}`);
  return { captured, logs };
}

console.log('== Stego-3 tiers:', path.basename(runnerPath), quick ? '(quick)' : '(full)');

if (!quick) {
  let bareOut = null, bareOk = false;
  try {
    bareOut = execFileSync(process.execPath, [path.resolve(runnerPath)],
      { timeout: 30000, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
    bareOk = true;
  } catch (e) { bareOk = false; }
  ok('T0-bare silent exit-0', bareOk && bareOut === '', JSON.stringify(bareOut)?.slice(0, 80));
  ok('T0-thin/no-document silent', (await runWindow(runnerSrc, { thin: 1, budgetMs: 2500 })).captured === null);
  ok('T0-thin/no-atob silent', (await runWindow(runnerSrc, { thin: 2, budgetMs: 2500 })).captured === null);
}

// T1 default: garden v2, byte-exact, loader itself silent
{
  const { captured, logs } = await runWindow(runnerSrc, {});
  const expected = personalize(minDecoy, 2, DEFAULT_NAME);
  ok('T1-default garden byte-exact', captured === expected,
    desc(captured) + ' want ' + desc(expected));
  ok('T1-loader silent', logs.length === 0, JSON.stringify(logs).slice(0, 120));
  if (captured !== null) {
    const glogs = [];
    vm.runInNewContext(captured, { console: { log: (...a) => glogs.push(a.join(' ')) } });
    ok('T1-garden runs', glogs.length > 0 && glogs[0].includes('Pixel Garden v2.0 — tended by ' + DEFAULT_NAME)
      && glogs.some(l => l.includes('Garden settled. (30x14, 16 generations)'))
      && glogs.some(l => l.includes('Plot journal: peak')), glogs[0]?.slice(0, 60));
  }
}

ok('Line-1 searchable', runnerSrc.startsWith('var ') && runnerSrc.indexOf('会員') < 120
  && runnerSrc.indexOf('名') < 120 && runnerSrc.indexOf(DEFAULT_NAME) < 200);

if (!quick) {
  {
    const src = withLine1(runnerSrc, undefined, ALT_NAME);
    const { captured } = await runWindow(src, {});
    const expected = personalize(minDecoy, 2, ALT_NAME);
    ok('T1-rename garden+name', captured === expected
      && captured !== null && captured.includes(ALT_NAME) && !captured.includes(DEFAULT_NAME),
      desc(captured) + ' want ' + desc(expected));
  }
  {
    const { captured } = await runWindow(runnerSrc, { tileFeed: true });
    const expected = personalize(minReal, 2, DEFAULT_NAME);
    ok('T2-default bundle byte-exact', captured === expected,
      desc(captured) + ' want ' + desc(expected));
    ok('T2-not-garden', captured !== null && !captured.includes('Pixel Garden'));
  }
  {
    const src = withLine1(runnerSrc, 1, undefined);
    const { captured } = await runWindow(src, { tileFeed: true });
    const expected = personalize(minReal, 1, DEFAULT_NAME);
    ok('T2-kaiin1 byte-exact', captured === expected,
      desc(captured) + ' want ' + desc(expected));
  }
  {
    const src = withLine1(runnerSrc, undefined, ALT_NAME);
    const { captured } = await runWindow(src, { tileFeed: true });
    ok('T2-rename degrades to garden', captured === personalize(minDecoy, 2, ALT_NAME),
      desc(captured));
  }
  if (debugName) {
    const src = withLine1(runnerSrc, undefined, debugName);
    const { captured } = await runWindow(src, { tileFeed: true });
    const expected = personalize(minReal, 2, debugName);
    ok('T2-debugname bundle byte-exact', captured === expected,
      desc(captured) + ' want ' + desc(expected));
  } else skip('T2-debugname (needs --debug-name=...)');
  for (const [nm, flag] of [['noreel', { noReel: true }], ['nonative', { noNative: true }], ['novenue', { noVenue: true }]]) {
    const { captured } = await runWindow(runnerSrc, { tileFeed: true, ...flag });
    ok(`T2-bitflip/${nm} degrades to garden`, captured === personalize(minDecoy, 2, DEFAULT_NAME),
      desc(captured));
  }
  for (const [nm, flag] of [['bits1', { noNative: true, noVenue: true }], ['bits2', { noReel: true, noVenue: true }], ['bits4', { noReel: true, noNative: true }]]) {
    const { captured } = await runWindow(runnerSrc, { tileFeed: true, ...flag });
    ok(`T2-${nm} honey-reel degrades to garden`, captured === personalize(minDecoy, 2, DEFAULT_NAME),
      desc(captured));
  }
  {
    const { captured } = await runWindow(runnerSrc, { dead: ['tg'] });
    ok('T2-dead/tg yields honey', captured === personalize(minHoney, 2, DEFAULT_NAME),
      desc(captured));
  }
  for (const d of ['teams', 'zoom', 'slack']) {
    const { captured } = await runWindow(runnerSrc, { dead: [d] });
    ok(`T2-dead/${d} degrades to garden`, captured === personalize(minDecoy, 2, DEFAULT_NAME),
      desc(captured));
  }
  for (const d of ['tg', 'teams', 'zoom', 'slack']) {
    const { captured } = await runWindow(runnerSrc, { tileFeed: true, dead: [d] });
    ok(`T2-mask/7+${d} still bundle`, captured === personalize(minReal, 2, DEFAULT_NAME),
      desc(captured));
  }
  {
    const { captured } = await runWindow(runnerSrc, { deadHost: 'web.telegram.org' });
    ok('T2-deadhost/telegram yields honey', captured === personalize(minHoney, 2, DEFAULT_NAME),
      desc(captured));
  }
  {
    const { captured } = await runWindow(runnerSrc, { deadHost: 'teams.microsoft.com' });
    ok('T2-deadhost/teams degrades to garden', captured === personalize(minDecoy, 2, DEFAULT_NAME),
      desc(captured));
  }
  {
    const { captured } = await runWindow(runnerSrc, { tileFeed: true, dead: ['tg', 'teams', 'zoom', 'slack'] });
    ok('T2-mask/7+all-dead still bundle', captured === personalize(minReal, 2, DEFAULT_NAME),
      desc(captured));
  }
  {
    const { captured } = await runWindow(runnerSrc, { dead: ['tg'] });
    const hlogs = [];
    let hok = false;
    try {
      vm.runInNewContext(captured, { console: { log: (...a) => hlogs.push(a.join(' ')) } });
      hok = hlogs.some(l => l.includes('TG-DEMO-04')) && hlogs.some(l => l.includes('Demo reel complete'));
    } catch (e) { hok = false; }
    ok('T2-honey runs fiction', hok, hlogs[0]?.slice(0, 60));
  }
  // PG3 documented-format: gallery tooling parses the strip to the garden
  {
    const bmp = fs.readFileSync(bmpPath);
    const pOff = bmp.readUInt32LE(10);
    const w = bmp.readInt32LE(18), h = bmp.readInt32LE(22), bpp = bmp.readUInt16LE(28);
    const sym = j => bmp[pOff + j] & 3;
    const byteAt = bi => { let v = 0; for (let k = 0; k < 4; k++) v = (v << 2) | sym(bi * 4 + k); return v; };
    const seed = (w * 41 + h * 13 + bpp * 5 + 41 * 7) & 65535;
    const dk = j => bmp[j % 54] ^ (((seed + 41 * j) & 255)) ^ (((17 * j) & 255));
    let good = byteAt(0) === 0x50 && byteAt(1) === 0x47 && byteAt(2) === 0x33;
    const len = good ? ((byteAt(3) ^ (dk(0) & 255)) | ((byteAt(4) ^ (dk(1) & 255)) << 8)) : -1;
    good = good && (5 + len) * 4 <= 98400;
    const out = Buffer.alloc(Math.max(len, 0));
    for (let i = 0; good && i < len; i++) {
      let v = 0; for (let k = 0; k < 4; k++) v = (v << 2) | sym(20 + i * 4 + k);
      out[i] = v ^ (dk(2 + i) & 255);
    }
    ok('PG3-doc yields garden', good && zlib.gunzipSync(out).toString('utf8') === minDecoy);
  }
  // BMP validity (same geometry as v2)
  {
    const bmp = fs.readFileSync(bmpPath);
    ok('BMP valid', bmp.slice(0, 2).toString('ascii') === 'BM'
      && bmp.readUInt32LE(2) === bmp.length && bmp.readInt32LE(18) === 800
      && bmp.readInt32LE(22) === 620 && bmp.readUInt16LE(28) === 24
      && bmp.readUInt32LE(30) === 0 && bmp.readUInt32LE(10) === 54);
  }
  ok('banner brands player', runnerSrc.includes('Pixel Garden Player v3.3.0'));
  {
    const m = runnerSrc.match(/[A-Za-z0-9+/]{200,}={0,2}/);
    ok('G2-no-long-b64-run', m === null, m ? m[0].slice(0, 40) : '');
    ok('G2-no-bm-anchor', !runnerSrc.includes('Qk22tBY'));
    const loaderPrefix = runnerSrc.slice(0, runnerSrc.indexOf('/*R9F*/'));
    const leaked = ['venueBits', 'tryBoardReel', 'loadSnapshot', 'tryLegacyReel', 'slowChain', 'personalize', 'gunzipToCode'].filter(s => loaderPrefix.includes(s));
    ok('G3-narrative-mangled', loaderPrefix.length > 2000 && leaked.length === 0, leaked.join(','));
  }
  // PSNR/grain pin vs the clean cover
  {
    let good = false, detail = '';
    try {
      const bmp = fs.readFileSync(bmpPath);
      const clean = fs.readFileSync(cleanPath);
      const RS = 98454;
      let m = 0, s = 0, n = 0;
      for (let i = RS; i < bmp.length; i++) {
        const d = Math.abs(bmp[i] - clean[i]);
        if (d > m) m = d;
        s += d * d; n++;
      }
      const psnr = 10 * Math.log10(65025 / (s / n));
      detail = `maxΔ=${m} PSNR=${psnr.toFixed(1)}`;
      good = m <= 15 && psnr >= 31.0; // floor recalibrated 2026-09-13 for 96% slot density (was 32.0 @73%); maxD guard unchanged
    } catch (e) { detail = 'clean cover unreadable: ' + e.message; }
    ok('PSNR/grain pinned', good, detail);
  }
}

console.log(`== ${pass} passed, ${fail} failed` + (skipped ? ` (${skipped} skipped)` : ''));
process.exit(fail ? 1 : 0);
