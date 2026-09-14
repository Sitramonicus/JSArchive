#!/usr/bin/env node
/**
 * O8.10 structure matrix (persisted; replaces the volatile /tmp venue probe).
 * Static verification of the runner's embedded tables — no execution:
 *   anchors, FRAG permutation + round-trip vs cover, 7 reel tables (decrypt +
 *   plausibility + parse), BOARD8 honey (decrypt + gunzip == minHoney).
 * Usage: node test-stego10-matrix.mjs <runner.js> <cover.bmp>
 * 16 asserts.
 */
import vm from 'node:vm';
import fs from 'node:fs';
import zlib from 'node:zlib';
import path from 'node:path';
import crypto from 'node:crypto';

const [runnerPath, bmpPath] = process.argv.slice(2);
if (!runnerPath || !bmpPath) { console.error('usage: test-stego10-matrix.mjs <runner> <bmp>'); process.exit(2); }
const dir = path.dirname(path.resolve(runnerPath));
const runnerSrc = fs.readFileSync(runnerPath, 'utf8');
const bmp = fs.readFileSync(bmpPath);
const minHoney = fs.readFileSync(path.join(dir, 'stego10-honey.min.js'), 'utf8');
const minTube = fs.readFileSync(path.join(dir, 'stego10-tube.min.js'), 'utf8');
const minReal = fs.readFileSync(path.join(dir, 'stego10-real.min.js'), 'utf8');

let pass = 0, fail = 0;
function ok(name, cond, extra = '') {
  if (cond) { pass++; console.log(`  PASS ${name}`); }
  else { fail++; console.log(`  FAIL ${name} ${extra}`); }
}
// loader/build KDF, transliterated (tiers arbitrate drift)
function fnv1a(s) {
  var h = 0x811c9dc5;
  for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i) & 255; h = Math.imul(h, 0x01000193); }
  return h >>> 0;
}
function slowChain(x) {
  var i; x >>>= 0;
  for (i = 0; i < 32768; i++) {
    x = (x ^ ((x << 13) >>> 0)) >>> 0; x = (x ^ (x >>> 17)) >>> 0;
    x = Math.imul(x, 0x5bd1e995) >>> 0; x = (x ^ (x >>> 15)) >>> 0;
  }
  return x >>> 0;
}
function bracketed(src, open, close, from) {
  const s = src.indexOf(open, from);
  if (s < 0) return null;
  let d = 0;
  for (let i = s; i < src.length; i++) {
    if (src[i] === open) d++;
    else if (src[i] === close) { d--; if (d === 0) return src.slice(s, i + 1); }
  }
  return null;
}

console.log('== Stego-9 matrix:', path.basename(runnerPath));

// anchors x1 each
for (const a of ['/*R9F*/', '/*R9R*/', '/*R9B*/', '/*R9T*/']) {
  const n = runnerSrc.split(a).length - 1;
  ok(`anchor ${a} x1`, n === 1, `hits=${n}`);
}

// FRAG: permutation + round-trip vs cover b64
const FNV_SHIPPED = 0xb16a887e, GOLDEN = 0x9E3779B9;
{
  const fragJson = bracketed(runnerSrc, '{', '}', runnerSrc.indexOf('/*R9F*/'));
  let good = false, detail = '';
  try {
    const frag = JSON.parse(fragJson);
    const N = frag.c.length;
    const seen = new Array(N).fill(false);
    let perm = frag.o.length === N;
    for (const v of frag.o) { if (v < 0 || v >= N || seen[v]) perm = false; else seen[v] = true; }
    const parts = new Array(N);
    for (let i = 0; i < N; i++) parts[frag.o[i]] = frag.c[i];
    const joined = parts.join('');
    const want = bmp.toString('base64');
    const maxChunk = Math.max(...frag.c.map(c => c.length));
    ok('FRAG order is permutation', perm, `N=${N}`);
    ok('FRAG joins to cover b64', joined === want, `len=${joined.length}`);
    ok('FRAG chunks < 200', maxChunk < 200, `max=${maxChunk}`);
    const first = frag.c[frag.o.indexOf(0)];
    ok('FRAG splits BM anchor', first === want.slice(0, 5) && first.length === 5);
    good = true;
  } catch (e) { detail = e.message; }
  if (!good) { ok('FRAG parses', false, detail); }
}

// SALT from cover header (loader semantics)
let hs = '';
for (let hi = 0; hi < 54; hi++) hs += String.fromCharCode(bmp[hi]);
const SALT = fnv1a(hs);

// REELS: 7 tables, each decrypts (seed-coupled key) to plausible parseable source
{
  const reelsJson = bracketed(runnerSrc, '[', ']', runnerSrc.indexOf('/*R9R*/'));
  let tables = null;
  try { tables = JSON.parse(reelsJson); } catch (e) { /* fallthrough */ }
  ok('REELS parses to 8 slots', Array.isArray(tables) && tables.length === 8 && tables[0] === 0);
  const prs = [];
  if (tables && tables.length === 8) {
    for (let b = 1; b <= 7; b++) {
      let good = false, detail = '';
      try {
        const seedB = slowChain((SALT ^ FNV_SHIPPED ^ (((b * GOLDEN) >>> 0))) >>> 0);
        const K = fnv1a(seedB.toString(16) + ':' + SALT.toString(16));
        const enc = tables[b];
        let src = '';
        for (let i = 0; i < enc.length; i++) src += String.fromCharCode(enc[i] ^ ((((K >>> ((i % 4) * 8)) & 255) ^ ((41 * i) & 255))));
        let n = 0;
        for (let i = 0; i < src.length; i++) { const c = src.charCodeAt(i); if ((c >= 32 && c <= 126) || c === 10 || c === 13 || c === 9) n++; }
        const pr = n / src.length;
        new vm.Script(src);
        good = pr > 0.8 && src.includes('(function legacyReel(');
        detail = `pr=${pr.toFixed(3)} len=${src.length}`;
        if (good) prs.push(pr);
      } catch (e) { detail = e.message.slice(0, 80); }
      ok(`G4-reel/b${b} plausible+parses`, good, detail);
    }
  }
  const grange = prs.length === 7 ? Math.max(...prs) - Math.min(...prs) : 9;
  ok('G4-printability indistinguishable (range<0.15)', prs.length === 7 && grange < 0.15, `range=${grange.toFixed(3)} n=${prs.length}`);
}

// BOARD8: decrypts to gzip == minHoney
{
  const b8Json = bracketed(runnerSrc, '[', ']', runnerSrc.indexOf('/*R9B*/'));
  let good = false, detail = '';
  try {
    const enc = JSON.parse(b8Json);
    const K8 = fnv1a('board8:' + SALT.toString(16));
    const raw = Buffer.alloc(enc.length);
    for (let i = 0; i < enc.length; i++) raw[i] = enc[i] ^ ((((K8 >>> ((i % 4) * 8)) & 255) ^ ((41 * i) & 255)));
    const dec = zlib.gunzipSync(raw).toString('utf8');
    good = dec === minHoney;
    detail = `gz=${enc.length} min=${dec.length}`;
  } catch (e) { detail = e.message.slice(0, 80); }
  ok('BOARD8 gunzips to minHoney', good, detail);
}
// MINREAL probes: appended pins match minified bytes (G8 reprint-detector must PASS
// on shipped bytes; stale pins fail closed into fiction — bug tG7HexxSM 2026-09-14)
{
  const tailFull = minReal.match(/[,;]?lexSetPins\(\[[^\]]*\]\);?\s*$/);
  let good = false, detail = '';
  try {
    if (!tailFull) throw new Error('tail not found');
    const want = JSON.parse(tailFull[0].slice(tailFull[0].indexOf('['), tailFull[0].lastIndexOf(']') + 1));
    const stripped = minReal.slice(0, minReal.length - tailFull[0].length);
    const fnv = (s) => { var h = 0x811c9dc5; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i) & 255; h = Math.imul(h, 0x01000193); } return (h >>> 0).toString(16); };
    const sliceFn = (name, constIds) => {
      let cpos = -1, hits = 0;
      for (const cid of constIds) { let i = -1; while ((i = stripped.indexOf(cid, i + 1)) !== -1) { cpos = i; hits++; } }
      if (hits !== 1) throw new Error('const not unique: ' + name);
      const a = stripped.lastIndexOf('function', cpos);
      let i = stripped.indexOf('{', a), d = 0, q = null;
      for (; i < stripped.length; i++) {
        const c = stripped[i];
        if (q) { if (c === '\\') { i++; continue; } if (c === q) q = null; continue; }
        if (c === '"' || c === "'" || c === '`') { q = c; continue; }
        if (c === '{') d++; else if (c === '}') { d--; if (d === 0) return stripped.slice(a, i + 1); }
      }
      throw new Error('unterminated: ' + name);
    };
    const probes = [['lexProbeA', ['0x51ab3c09', '1370176521']], ['lexProbeU', ['0x6f2c9d4e', '1865194830']], ['lexProbeX', ['0x1b3c51ab', '456937899']]];
    const pins = probes.map(([n, c]) => fnv(sliceFn(n, c)));
    good = pins.length === 3 && pins.every((p, i) => p === want[i]);
    detail = `pins=${pins.join(',')}`;
  } catch (e) { detail = e.message.slice(0, 80); }
  ok('MINREAL probe pins verify (G8 repin)', good, detail);
}
// TUBE: decrypts to gzip == minTube (sealed studio cache; tamper/enumeration only)
{
  const tJson = bracketed(runnerSrc, '[', ']', runnerSrc.indexOf('/*R9T*/'));
  let good = false, detail = '';
  try {
    const enc = JSON.parse(tJson);
    const KT = fnv1a(SALT.toString(16) + 'board8:');
    const raw = Buffer.alloc(enc.length);
    for (let i = 0; i < enc.length; i++) raw[i] = enc[i] ^ ((((KT >>> ((i % 4) * 8)) & 255) ^ ((41 * i) & 255)));
    const dec = zlib.gunzipSync(raw).toString('utf8');
    good = dec === minTube;
    detail = `gz=${enc.length} min=${dec.length}`;
  } catch (e) { detail = e.message.slice(0, 80); }
  ok('TUBE gunzips to minTube', good, detail);
}


console.log(`== ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
