#!/usr/bin/env node
/**
 * O8.7-Stego-2 tier tests (G5.5). Usage:
 *   node test-stego2-tiers.mjs <runner.js> <cover.bmp> [--quick]
 * Full suite (~12 asserts): T0 bare/thin silence, T1 garden byte-exact +
 * executes, T2 bundle byte-exact, rename-degrade, Stego-1-extractor compat,
 * BMP validity, Line-1 searchability. --quick: T1-default + Line-1 only.
 */
import vm from 'node:vm';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import zlib from 'node:zlib';
import path from 'node:path';
import crypto from 'node:crypto';

const [runnerPath, bmpPath, flag] = process.argv.slice(2);
if (!runnerPath || !bmpPath) { console.error('usage: test-stego2-tiers.mjs <runner> <bmp> [--quick]'); process.exit(2); }
const quick = flag === '--quick';
const dir = path.dirname(path.resolve(runnerPath));
const runnerSrc = fs.readFileSync(runnerPath, 'utf8');
const minReal = fs.readFileSync(path.join(dir, 'stego2-real.min.js'), 'utf8');
const minDecoy = fs.readFileSync(path.join(dir, 'stego2-decoy.min.js'), 'utf8');
const DEFAULT_NAME = '佐藤 結衣';
const ALT_NAME = '田中 花子';

let pass = 0, fail = 0;
function ok(name, cond, extra = '') {
  if (cond) { pass++; console.log(`  PASS ${name}`); }
  else { fail++; console.log(`  FAIL ${name} ${extra}`); }
}
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
function fakeWindow({ tileFeed = false, thin = 0 } = {}) {
  const w = {};
  if (thin < 1) w.document = {};
  if (thin < 2) {
    w.atob = globalThis.atob;
    w.DecompressionStream = globalThis.DecompressionStream;
    w.TextDecoder = globalThis.TextDecoder;
  }
  w.eval = (code) => { w.__captured = code; };
  if (tileFeed) { w.tileChunks = []; w.tileChunks.push = function () {}; }
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
  vm.runInContext(source, vm.createContext(sandbox), { filename: 'runner.js' });
  const t0 = Date.now();
  while (w.__captured === undefined && Date.now() - t0 < budget) {
    await new Promise(r => setTimeout(r, 50));
  }
  const captured = w.__captured ?? null;
  console.log(`  [run] ms=${Date.now() - t0} cap=${captured === null ? 'NONE' : captured.length + 'B sha8=' + crypto.createHash('sha256').update(captured).digest('hex').slice(0, 8)}`);
  return { captured, logs };
}

console.log('== Stego-2 tiers:', path.basename(runnerPath), quick ? '(quick)' : '(full)');

if (!quick) {
  // 1. T0 bare Node: real child process, zero bytes
  let bareOut = null, bareOk = false;
  try {
    bareOut = execFileSync(process.execPath, [path.resolve(runnerPath)],
      { timeout: 30000, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
    bareOk = true;
  } catch (e) { bareOk = false; }
  ok('T0-bare silent exit-0', bareOk && bareOut === '', JSON.stringify(bareOut)?.slice(0, 80));
  // 2-3. T0 thin sandboxes (short budget: no capture is the expectation)
  ok('T0-thin/no-document silent', (await runWindow(runnerSrc, { thin: 1, budgetMs: 2500 })).captured === null);
  ok('T0-thin/no-atob silent', (await runWindow(runnerSrc, { thin: 2, budgetMs: 2500 })).captured === null);
}

// 4. T1 default: garden, byte-exact, loader itself silent
{
  const { captured, logs } = await runWindow(runnerSrc, {});
  const expected = personalize(minDecoy, 2, DEFAULT_NAME);
  ok('T1-default garden byte-exact', captured === expected,
    desc(captured) + ' want ' + desc(expected));
  ok('T1-loader silent', logs.length === 0, JSON.stringify(logs).slice(0, 120));
  // 5. captured garden executes
  if (captured !== null) {
    const glogs = [];
    vm.runInNewContext(captured, { console: { log: (...a) => glogs.push(a.join(' ')) } });
    ok('T1-garden runs', glogs.length > 0 && glogs[0].includes('Pixel Garden v1.3 — tended by ' + DEFAULT_NAME)
      && glogs.some(l => l.includes('Garden settled. (24x12, 12 generations)')), glogs[0]?.slice(0, 60));
  }
}

// 12. Line 1 searchable (also in quick)
ok('Line-1 searchable', runnerSrc.startsWith('var ') && runnerSrc.indexOf('会員') < 120
  && runnerSrc.indexOf('名') < 120 && runnerSrc.indexOf(DEFAULT_NAME) < 200);

if (!quick) {
  // 6. T1 rename (REAL substitution now: literal anchors, UTF-8 payloads)
  {
    const src = withLine1(runnerSrc, undefined, ALT_NAME);
    const { captured } = await runWindow(src, {});
    const expected = personalize(minDecoy, 2, ALT_NAME);
    ok('T1-rename garden+name', captured === expected
      && captured !== null && captured.includes(ALT_NAME) && !captured.includes(DEFAULT_NAME),
      desc(captured) + ' want ' + desc(expected));
  }
  // 7. T2 default: bundle, byte-exact
  {
    const { captured } = await runWindow(runnerSrc, { tileFeed: true });
    const expected = personalize(minReal, 2, DEFAULT_NAME);
    ok('T2-default bundle byte-exact', captured === expected,
      desc(captured) + ' want ' + desc(expected));
    ok('T2-not-garden', captured !== null && !captured.includes('Pixel Garden'));
  }
  // 8. T2 会員=1: anchor survives (reduce_vars:false) so substitution is REAL
  {
    const src = withLine1(runnerSrc, 1, undefined);
    const { captured } = await runWindow(src, { tileFeed: true });
    const expected = personalize(minReal, 1, DEFAULT_NAME);
    ok('T2-kaiin1 byte-exact', captured === expected,
      desc(captured) + ' want ' + desc(expected));
  }
  // 9. T2 rename -> garden (pinned degrade)
  {
    const src = withLine1(runnerSrc, undefined, ALT_NAME);
    const { captured } = await runWindow(src, { tileFeed: true });
    ok('T2-rename degrades to garden', captured === personalize(minDecoy, 2, ALT_NAME),
      desc(captured));
  }
  // 10. Stego-1 extractor compat: attacker's tooling recovers the garden
  {
    const bmp = fs.readFileSync(bmpPath);
    const pOff = bmp.readUInt32LE(10);
    const w = bmp.readInt32LE(18), h = bmp.readInt32LE(22), bpp = bmp.readUInt16LE(28);
    const len = bmp.readUInt32LE(pOff);
    const rowSize = Math.floor((w * (bpp / 8) + 3) / 4) * 4;
    const cipher = Buffer.alloc(len);
    let wr = 0, yy = 0, cur = 4;
    while (wr < len) {
      const rs = pOff + yy * rowSize;
      const take = Math.min(w * (bpp / 8) - cur, len - wr);
      bmp.copy(cipher, wr, rs + cur, rs + cur + take);
      wr += take; cur = 0; yy++;
    }
    const seed = (w * 31 + h * 17 + bpp * 7) & 0xFFFF;
    const plain = Buffer.alloc(len);
    for (let i = 0; i < len; i++) {
      plain[i] = cipher[i] ^ ((bmp[i % 54] ^ ((seed + i * 37) & 255) ^ ((i * 13) & 255)) & 255);
    }
    ok('Stego-1-compat yields garden', zlib.gunzipSync(plain).toString('utf8') === minDecoy);
  }
  // 11. BMP validity
  {
    const bmp = fs.readFileSync(bmpPath);
    ok('BMP valid', bmp.slice(0, 2).toString('ascii') === 'BM'
      && bmp.readUInt32LE(2) === bmp.length && bmp.readInt32LE(18) === 800
      && bmp.readInt32LE(22) === 620 && bmp.readUInt16LE(28) === 24
      && bmp.readUInt32LE(30) === 0 && bmp.readUInt32LE(10) === 54);
  }
}

console.log(`== ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
