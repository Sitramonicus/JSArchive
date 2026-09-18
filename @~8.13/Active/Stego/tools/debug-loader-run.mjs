#!/usr/bin/env node
/**
 * debug-loader-run.mjs — run the PLAIN (unobfuscated) stego11 loader against a freshly
 * embedded cover, with the loader's silent failure catch turned into a reporter.
 *
 * Why this exists: the shipped loader's main block ends in `catch (e9) { return; }`, so
 * ANY failure is silent by design and the tier suite can only report "(no capture)" with
 * no cause. This harness re-creates the builder's embed and fragmenting verbatim, then
 * runs the loader with that catch reporting.
 *
 * Usage:
 *   node tools/debug-loader-run.mjs <bundle.js> <cleanCover.bmp> [flags]
 *     --trace            print which stages the loader reached
 *     --name=<n>         run under a different 名 (the staff-name path)
 *     --tileFeed --native --venue   add the Discord-ish venue affordances
 *     --budget=<ms>      default 25000
 */
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import crypto from 'node:crypto';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const STEGO = path.resolve(HERE, '..');
const REPO = path.resolve(STEGO, '..', '..');
const require = createRequire(import.meta.url);
const ENG = path.join(REPO, 'Active', 'engines', 'node_modules');
const Terser = require(path.join(ENG, 'terser'));
const { PIXOFF, STRIP_LEN, R_START, embedReal, embedDecoy, dseedFor } =
  await import(path.join(STEGO, 'stego3-codec.mjs'));
const { deriveInt: SEEDINT } = require(path.join(REPO, 'Active/O8.13/oto/scripts/seed-lib.js'));

const argv = process.argv.slice(2);
const flags = argv.filter(a => a.startsWith('--'));
const pos = argv.filter(a => !a.startsWith('--'));
const bundlePath = pos[0] || path.join(REPO, 'Active/O8.13/final-package/O8.6-Final-final-bundle.js');
const coverPath = pos[1] || path.join(REPO, 'Uploads/stego2-cover-1024-scaled.bmp');
const TRACE = flags.includes('--trace');
const NAME = (flags.find(f => f.startsWith('--name=')) || '--name=佐藤 結衣').split('=')[1];
const BUDGET = Number((flags.find(f => f.startsWith('--budget=')) || '--budget=25000').split('=')[1]);

const MINIFY_REAL = { compress: { passes: 2, dead_code: true, reduce_vars: false }, mangle: false };
const MINIFY_DECOY = { compress: { passes: 2, dead_code: true }, mangle: false };
const FNV_SHIPPED = 0xb16a887e, CANON_BITS = 7, GOLDEN = 0x9E3779B9;
const fnv1a = s => { let h = 0x811c9dc5; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i) & 255; h = Math.imul(h, 0x01000193); } return (h >>> 0); };
const slowChain = x => { x >>>= 0; for (let i = 0; i < 32768; i++) { x = (x ^ ((x << 13) >>> 0)) >>> 0; x = (x ^ (x >>> 17)) >>> 0; x = Math.imul(x, 0x5bd1e995) >>> 0; x = (x ^ (x >>> 15)) >>> 0; } return x >>> 0; };
function mulberry(seed) {
  let a = seed >>> 0;
  return function () { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
const log = (...a) => console.log('[dbg]', ...a);

// ---- 1. cover + house salt -------------------------------------------------
const cover = fs.readFileSync(coverPath);
if (cover.slice(0, 2).toString('ascii') !== 'BM') throw new Error('not a BMP');
const CW = cover.readInt32LE(18), CH = cover.readInt32LE(22), CBPP = cover.readUInt16LE(28);
let hs = ''; for (let i = 0; i < 54; i++) hs += String.fromCharCode(cover[i]);
const SALT = fnv1a(hs);
log(`cover ${CW}x${CH}x${CBPP} salt=0x${SALT.toString(16)} len=${cover.length}`);
log(`decoy seed dseedFor(${CW},${CH},${CBPP}) = ${dseedFor(CW, CH, CBPP)} (the loader recomputes this itself)`);

// ---- 2. payloads -----------------------------------------------------------
const minReal = (await Terser.minify(fs.readFileSync(bundlePath, 'utf8'), MINIFY_REAL)).code;
const gzReal = zlib.gzipSync(Buffer.from(minReal, 'utf8'), { level: 9 });
const minDecoy = (await Terser.minify(fs.readFileSync(path.join(STEGO, 'decoy-garden-v2.js'), 'utf8'), MINIFY_DECOY)).code;
const gzDecoy = zlib.gzipSync(Buffer.from(minDecoy, 'utf8'), { level: 9 });
log(`real  min ${minReal.length} -> gzip ${gzReal.length}`);
log(`decoy min ${minDecoy.length} -> gzip ${gzDecoy.length}  (garden = what bits=0 should eval)`);

// ---- 3. embed (verbatim builder KDF: FNV_SHIPPED + CANON_BITS) -------------
const stego = Buffer.from(cover);
fs.readFileSync(path.join(STEGO, 'stego3-strip-base.bin')).copy(stego, PIXOFF);
const shead = stego.subarray(0, 54);
const seed = slowChain((SALT ^ FNV_SHIPPED ^ (((CANON_BITS * GOLDEN) >>> 0))) >>> 0);
const nR = embedReal(stego, shead, seed, gzReal);
const nD = embedDecoy(stego, shead, gzDecoy, CW, CH, CBPP);
log(`embed real ${nR}/${stego.length - R_START} slots (${(100 * nR / (stego.length - R_START)).toFixed(2)}%), decoy ${nD}/${STRIP_LEN}, seed=0x${seed.toString(16)}`);

// ---- 4. fragment (verbatim) ------------------------------------------------
const b64 = stego.toString('base64');
const chunks = [b64.slice(0, 5)];
for (let p = 5; p < b64.length; p += 173) chunks.push(b64.slice(p, p + 173));
const frng = mulberry(SEEDINT('stego12-frag'));
const order = chunks.map((_, i) => i);
for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(frng() * (i + 1)); const t = order[i]; order[i] = order[j]; order[j] = t; }
const frag = JSON.stringify({ c: order.map(i => chunks[i]), o: order });
log(`frag ${chunks.length} chunks -> ${frag.length} chars`);

// ---- 5. reels, XOR-encoded exactly like the builder ------------------------
// Boards 1..6 are the SYNTHESISED honey reels; they must be byte-shape correct or the
// loader's tryLegacyReel returns truthy-but-not-gzip, the inner catch sets code=null and
// the garden fallback is skipped. Lifted verbatim from build-stego12-r2.mjs.
  function honeyReelSrc(bits, rng) {
    const hx = (n, w) => '0x' + (n >>> 0).toString(16).padStart(w, '0');
    let m0 = 0x40 + Math.floor(rng() * 0x30), m1 = 0x30 + Math.floor(rng() * 0x40);
    if (m0 === 0x50 && m1 === 0x33) m0 ^= 0x01;
    const rsBase = 98400 + 64 + Math.floor(rng() * 512);
    const a1 = 33 + 2 * Math.floor(rng() * 16), a2 = 11 + 2 * Math.floor(rng() * 16);
    const khx = Math.floor(rng() * 0x10000), add = Math.floor(rng() * 0x100000000);
    const poly = Math.floor(rng() * 0x100000000);
    return (
'// Community gallery reel (venue board ' + bits + '). Carried in the player bundle\n' +
'// and selected per venue board at load; unprovisioned boards play the garden.\n' +
'// Must be a function EXPRESSION. Keep ASCII.\n' +
'(function legacyReel(pigment, head, seed, pixelOff) {\n' +
'var RS = pixelOff + ' + rsBase + ', RL = pigment.length - RS, i, j, t, k;\n' +
'function R(s) { return function () { s |= 0; s = (s + ' + hx(add, 8) + ') | 0; var q = Math.imul(s ^ (s >>> 15), 1 | s); q = (q + Math.imul(q ^ (q >>> 7), 61 | q)) ^ q; return ((q ^ (q >>> 14)) >>> 0) / 4294967296; }; }\n' +
'var P = new Uint32Array(RL), rr = R(seed);\n' +
'for (i = 0; i < RL; i++) P[i] = i;\n' +
'for (i = RL - 1; i > 0; i--) { j = (rr() * (i + 1)) | 0; t = P[i]; P[i] = P[j]; P[j] = t; }\n' +
'function K(o) { return (head[o % 54] ^ ((seed + ' + a1 + ' * o) & 255) ^ ((' + a2 + ' * o) & 255)) & 255; }\n' +
'function KH(o) { var e = (seed ^ ' + hx(khx, 4) + ') >>> 0; return (head[o % 54] ^ ((e + ' + a1 + ' * o) & 255) ^ ((' + a2 + ' * o) & 255)) & 255; }\n' +
'var hb = [0,0,0,0,0,0,0,0,0,0,0,0], nb;\n' +
'for (j = 0; j < 24; j++) { nb = pigment[RS + P[j]] & 15; if (j & 1) hb[j >> 1] |= nb; else hb[j >> 1] = nb << 4; }\n' +
'for (i = 0; i < 12; i++) hb[i] ^= KH(i);\n' +
'if (hb[0] !== ' + hx(m0, 2) + ' || hb[1] !== ' + hx(m1, 2) + ') return null;\n' +
'var L = (hb[2] | (hb[3] << 8) | (hb[4] << 16) | (hb[5] << 24)) >>> 0;\n' +
'if ((12 + L) * 2 > RL) return null;\n' +
'var TC = new Uint32Array(256);\n' +
'for (i = 0; i < 256; i++) { var c = i; for (k = 0; k < 8; k++) c = (c & 1) ? (' + hx(poly, 8) + ' ^ (c >>> 1)) : (c >>> 1); TC[i] = c >>> 0; }\n' +
'var out = new Uint8Array(L), v, sl;\n' +
'for (i = 0; i < L; i++) { v = 0; for (k = 0; k < 2; k++) { sl = 24 + i * 2 + k; v = (v << 4) | (pigment[RS + P[sl]] & 15); } out[i] = v ^ K(i); }\n' +
'var cc = 0xffffffff;\n' +
'for (i = 0; i < L; i++) cc = TC[(cc ^ out[i]) & 255] ^ (cc >>> 8);\n' +
'cc = (cc ^ 0xffffffff) >>> 0;\n' +
'var want = (hb[6] | (hb[7] << 8) | (hb[8] << 16) | (hb[9] << 24)) >>> 0;\n' +
'if (cc !== want || out[0] !== 0x1f || out[1] !== 0x8b) return null;\n' +
'return out;\n})');
  }
const hrng = mulberry(SEEDINT('stego12-honeyreel'));
const reelSrcs = [null];
for (let b = 1; b <= 7; b++) {
  reelSrcs[b] = (b === CANON_BITS)
    ? fs.readFileSync(path.join(STEGO, 'stego10-legacyreel-src.js'), 'utf8')
    : honeyReelSrc(b, hrng);
}
const reelBlobs = [0];
for (let b = 1; b <= 7; b++) {
  const src = reelSrcs[b];
  const seedB = slowChain((SALT ^ FNV_SHIPPED ^ (((b * GOLDEN) >>> 0))) >>> 0);
  const K = fnv1a(seedB.toString(16) + ':' + SALT.toString(16));
  const codes = [];
  for (let i = 0; i < src.length; i++) codes.push(src.charCodeAt(i) ^ ((((K >>> ((i % 4) * 8)) & 255) ^ ((41 * i) & 255))));
  reelBlobs[b] = codes;
}

// ---- 6. loader with the silent catch instrumented --------------------------
let loader = fs.readFileSync(path.join(STEGO, 'stego11-loader.js'), 'utf8');
if (!loader.includes('catch (e9) { return; }')) throw new Error('e9 catch anchor not found — loader changed');
loader = loader.replace('catch (e9) { return; }', 'catch (e9) { W.__dbgFail = String(e9 && e9.stack || e9); return; }');
if (TRACE) {
  const marks = [
    ['var vbits = venueBits();', "'vbits'"],
    ['var seed = slowChain(', "'pre-seed'"],
    ['var code = null;', "'pre-reels'"],
    ['var reelBytes = (bits === 0', "'pre-legacy'"],
    ['if (reelBytes) {', "'reelBytes='+typeof reelBytes"],
    ['code = personalize(code);', "'pre-personalize code='+(code===null?'null':typeof code+':'+(code&&code.length))+' vbits='+vbits+' bits='+bits+' diverted='+diverted"],
    ['var diverted = (lexMode !== 0)', "'lexMode='+lexMode+' sess='+JSON.stringify(sess)"],
    ['(0, W[kStage])(code);', "'pre-eval'"],
  ];
  for (const [needle, labelExpr] of marks) {
    if (!loader.includes(needle)) { log(`trace anchor missing: ${needle.slice(0, 30)}`); continue; }
    loader = loader.replace(needle, 'W.__trace=(W.__trace||[]);W.__trace.push(String(' + labelExpr + '));' + needle);
  }
}

// ---- 6b. loader pins: lexVerifyL hashes the probe FUNCTIONS' toString(), so the pins
// must be computed from THIS text or lexMode flips to 1 and every run diverts to the tube.
{
  const sliceFn = (name) => {
    const a = loader.indexOf('function ' + name);
    if (a < 0) throw new Error('loader probe missing: ' + name);
    let i = loader.indexOf('{', a), d = 0, q = null;
    for (; i < loader.length; i++) {
      const ch = loader[i];
      if (q) { if (ch === '\\') { i++; continue; } if (ch === q) q = null; continue; }
      if (ch === '"' || ch === "'" || ch === '`') { q = ch; continue; }
      if (ch === '{') d++; else if (ch === '}') { d--; if (d === 0) return loader.slice(a, i + 1); }
    }
    throw new Error('loader probe unterminated: ' + name);
  };
  // lexFnvL returns a STRING, so the pins must be string literals or !== always trips.
  const lp = ['lexProbeL1', 'lexProbeL2'].map(n => '"' + fnv1a(sliceFn(n)) + '"');
  if (loader.split('var lexPinsB = [0, 0];').length - 1 !== 1) throw new Error('lexPinsB anchor missing/dup');
  loader = loader.replace('var lexPinsB = [0, 0];', 'var lexPinsB = [' + lp.join(',') + '];');
  log('loader pins injected:', lp.join(','));
}

// ---- 7. run ----------------------------------------------------------------
const W = { document: { body: {} } };
W.atob = globalThis.atob;
W.DecompressionStream = globalThis.DecompressionStream;
W.TextDecoder = globalThis.TextDecoder;
if (flags.includes('--tileFeed')) { W.tileChunks = []; W.tileChunks.push = function () {}; }
if (flags.includes('--native')) W.DiscordNative = {};
if (flags.includes('--venue')) { W.location = { hostname: 'discord.com' }; W.navigator = { userAgent: 'Mozilla/5.0 Chrome/120' }; }
let captured = null;
const evals = [];
const sandbox = { window: W, 会員: 2, 名: NAME, console: { log: () => {}, clear: () => {} }, String, Array, Uint8Array, Math, JSON, Promise, Object };
const ctx = vm.createContext(sandbox);
W.eval = code => {
  evals.push(typeof code === 'string' ? code.length + ':' + JSON.stringify(code.slice(0, 40)) : typeof code);
  if (typeof code === 'string' && code.includes('(function legacyReel(')) {
    try { const r = vm.runInContext(code, ctx); W.__reel = r; return r; }
    catch (e) { W.__reelThrow = String(e); throw e; }
  }
  captured = code;
};
let runner = loader.replace(/(['"])__STEGO9_REELS__\1/, '[0,' + reelBlobs.slice(1).map(b => '[' + b.join(',') + ']').join(',') + ']');
runner = runner.replace(/(['"])__STEGO9_FRAG__\1/, frag);
runner = runner.replace(/(['"])__STEGO9_BOARD8__\1/, '[]');
runner = runner.replace(/(['"])__STEGO9_TUBE__\1/, '[]');
if (runner.includes('__STEGO9_')) throw new Error('placeholder survived');
log(`name=${JSON.stringify(NAME)} loaderLen=${runner.length}`);

const t0 = Date.now();
vm.runInContext(runner, ctx, { filename: 'loader.js' });
const iv = setInterval(() => {
  if (captured !== null || W.__dbgFail || Date.now() - t0 >= BUDGET) {
    clearInterval(iv);
    log(`ms=${Date.now() - t0}`);
    if (W.__lex) log('lexVerifyL:', 'mode=' + W.__lex.mode, 'pins=' + JSON.stringify(W.__lex.pins), 'got=' + JSON.stringify(W.__lex.got));
    if (W.__lex && W.__lex.ts !== undefined && W.__lex.got[0] !== W.__lex.pins[0]) log('runtime toString:', JSON.stringify(W.__lex.ts));
    if (TRACE) log('trace:', (W.__trace || []).join(' -> ') || '(no stage reached)');
    if (W.__dbgFail) log('SILENT FAILURE (e9):', W.__dbgFail.split('\n').slice(0, 5).join(' | '));
    log('window.eval called', evals.length, 'time(s):', evals.slice(0, 4).join(' | ') || '(never)');
    if (W.__reel !== undefined) log('reel typeof:', typeof W.__reel);
    if (W.__reelThrow) log('reel threw:', W.__reelThrow.slice(0, 160));
    if (captured !== null) {
      const sha8 = crypto.createHash('sha256').update(captured).digest('hex').slice(0, 8);
      log(`captured ${captured.length} chars sha8=${sha8}`);
      log(`is garden decoy: ${captured === minDecoy}   is real bundle: ${captured === minReal}`);
    } else log('captured: NONE');
    process.exit(captured !== null ? 0 : 1);
  }
}, 50);
