#!/usr/bin/env node
// typed-pool-o85.mjs — C1 (Uint16Array pool refactor) + C3 (retention probes) + V1 (run-key)
// + LRM-in-decoy cleanup, applied to the s4-shards clean pieces.
//
// WHAT IT DOES (deterministic):
//   shard-a: Log gains queue/flush (probes flush the moment the unlock opens diag);
//            unlock success calls Log.flush(); config flag typedPools:true.
//   shard-m: codename pools (KC=47 band) and MC label arrays (_0xk=113 XOR) -> per-shard
//            Uint16Array pools, 2-char printable length prefixes, offsets table, readers
//            _0xwd/_0xds at shard scope; retention probe queued (C3).
//   shard-e: all `_0xlex.d("...")` literals -> shard-local Uint16Array pool, call sites
//            become _0xed(<offset>); retention probe queued. V1: Symbol.for description
//            neutralized to _0xq2de579ef; _0xrunKey/_0xrunOwner renamed.
//   shard-aux: three inert route/label arrays -> shard-local pool (0x5D rotation on all
//            entries); arrays become offset arrays; retention probe queued.
//   all: LRM (U+200E) inside decoy strings -> ZWNJ (U+200C) (white-listed camo only).
//
// SAFETY: golden parity verified before writing (every decoded string compared).
// Usage: node tools/typed-pool-o85.mjs [--apply]
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const SH = path.resolve(process.argv[1], '..', '..', 'shards');
const APPLY = process.argv.includes('--apply');
const F = {
  a: path.join(SH, 'shard-a.js'),
  m: path.join(SH, 'shard-m.js'),
  e: path.join(SH, 'shard-e.js'),
  n1: path.join(SH, 'shard-n1.js'),
  n2: path.join(SH, 'shard-n2.js'),
  u: path.join(SH, 'shard-u.js'),
  aux: path.join(SH, 'shard-aux.js'),
};

const report = [];
const log = (...a) => { report.push(a.join(' ')); console.log(...a); };

function balanced(s, startMark, open = '[', close = ']') {
  const i = s.indexOf(startMark);
  if (i < 0) throw new Error('mark not found: ' + startMark);
  let j = s.indexOf(open, i + startMark.length - 1);
  if (j < 0) throw new Error('open not found after ' + startMark);
  let depth = 0, k = j, inStr = false, q = '';
  for (; k < s.length; k++) {
    const c = s[k];
    if (inStr) { if (c === '\\') { k++; continue; } if (c === q) inStr = false; continue; }
    if (c === '"' || c === "'" || c === '`') { inStr = true; q = c; continue; }
    if (c === open) depth++;
    else if (c === close) { depth--; if (depth === 0) { k++; break; } }
  }
  return [i, k];
}
function evalData(text) { return Function('"use strict";return (' + text + ')')(); }
function lenPref(len) { return [Math.floor(len / 94) + 0x21, (len % 94) + 0x21]; }
function buildPool(entries) {
  const codes = [], offsets = [];
  for (const s of entries) {
    offsets.push(codes.length);
    const [h, l] = lenPref(s.length);
    codes.push(h, l);
    for (let i = 0; i < s.length; i++) {
      const c = s.charCodeAt(i);
      codes.push(c);
    }
  }
  return { codes, offsets };
}
function emitPoolLiteral(codes) {
  let out = '"';
  for (const c of codes) {
    if (c === 0x22) out += '\\"';
    else if (c === 0x5C) out += '\\\\';
    else if (c >= 0x20 && c <= 0x7E) out += String.fromCharCode(c);
    else out += '\\u' + c.toString(16).padStart(4, '0');
  }
  return out + '"';
}
function poolInit(name, codes) {
  return `const ${name} = (s => { const t = new Uint16Array(s.length); for (let i = 0; i < s.length; i++) t[i] = s.charCodeAt(i); return t; })(${emitPoolLiteral(codes)});`;
}
function readAt(pool, off) {
  const n = (pool[off] - 0x21) * 94 + (pool[off + 1] - 0x21);
  let s = '';
  for (let j = 0; j < n; j++) s += String.fromCharCode(pool[off + 2 + j]);
  return s;
}
function bandDec(s, k) {
  let o = '';
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    o += String.fromCharCode(c < 0x80 ? 0x20 + (((c - 0x20 - k) % 0x5F) + 0x5F) % 0x5F : c);
  }
  return o;
}
function rotDec(s, K = 0x5D) {
  let o = '';
  for (let i = 0; i < s.length; i++) o += String.fromCharCode(0x21 + (((s.charCodeAt(i) - 0x21 - K) % 0x5E) + 0x5E) % 0x5E);
  return o;
}
function rotEnc(s, K = 0x5D) {
  let o = '';
  for (let i = 0; i < s.length; i++) o += String.fromCharCode(0x21 + ((s.charCodeAt(i) - 0x21 + K) % 0x5E));
  return o;
}
function syntaxCheck(p) {
  try { execFileSync(process.execPath, ['--check', p], { stdio: 'pipe' }); return true; }
  catch (e) { return false; }
}

// ================= shard-a: Log queue/flush + unlock flush + flag =================
let a = fs.readFileSync(F.a, 'utf8');
log('--- shard-a ---');
{
  const oldL0 = 'if (LOG_LEVEL === 0) return { say: noop, diag: noop, warn: noop, info: noop };';
  if (!a.includes(oldL0)) throw new Error('a: L0 branch not found');
  a = a.replace(oldL0, 'if (LOG_LEVEL === 0) return { say: noop, diag: noop, warn: noop, info: noop, queue: noop, flush: noop };');
  const oldObj = `      say: (c, m) => console.debug(\`[Google \${c}] \${m}\`),
      diag: (m, d) => { if (LOG_LEVEL >= 2 && _0xopen) d !== undefined ? console.debug(\`[O8-DIAG] \${m}\`, d) : console.debug(\`[O8-DIAG] \${m}\`); },
      warn: (m) => console.warn(m),
      info: (m) => console.debug(m)`;
  if (!a.includes(oldObj)) throw new Error('a: Log object body not found');
  const newObj = `      say: (c, m) => console.debug(\`[Google \${c}] \${m}\`),
      diag: _0xdm,
      warn: (m) => console.warn(m),
      info: (m) => console.debug(m),
      queue: (m, d) => { if (_0xq.length < 64) _0xq.push([m, d]); },
      flush: () => { while (_0xq.length) { const _0xi = _0xq.shift(); _0xdm(_0xi[0], _0xi[1]); } }`;
  a = a.replace(oldObj, newObj);
  const oldHead = 'const Log = (() => {\n    const noop = () => {};';
  if (!a.includes(oldHead)) throw new Error('a: Log head not found');
  a = a.replace(oldHead, 'const Log = (() => {\n    const noop = () => {};\n    const _0xq = [];\n    const _0xdm = (m, d) => { if (LOG_LEVEL >= 2 && _0xopen) d !== undefined ? console.debug(`[O8-DIAG] ${m}`, d) : console.debug(`[O8-DIAG] ${m}`); };');
  const oldUnlock = 'if (_0got.length === _0xwantb.length && _0got.every((b, i) => b === _0xwantb[i])) { _0xopen = true; Log.info("[Quest] Diagnostics unlocked for this session."); return true; }';
  if (!a.includes(oldUnlock)) throw new Error('a: unlock success path not found');
  a = a.replace(oldUnlock, 'if (_0got.length === _0xwantb.length && _0got.every((b, i) => b === _0xwantb[i])) { _0xopen = true; Log.info("[Quest] Diagnostics unlocked for this session."); try { Log.flush(); } catch (e) {} return true; }');
  const flagAnchor = 'retentionProbe: true,';
  if (!a.includes(flagAnchor)) throw new Error('a: flag anchor not found');
  a = a.replace(flagAnchor, 'retentionProbe: true,\n    typedPools: true,');
}

// ================= shard-m =================
let m = fs.readFileSync(F.m, 'utf8');
log('--- shard-m ---');
const [cs, ce] = balanced(m, 'const C = [');
const C = evalData(m.slice(cs + 'const C = '.length, ce));
if (!Array.isArray(C) || !C.every(x => Array.isArray(x) && x.every(y => typeof y === 'string'))) throw new Error('C shape');
const flatC = C.flat();
const kcPool = buildPool(flatC);
const kcOffsets = [];
{
  let k = 0;
  for (const row of C) { const r = []; for (let j = 0; j < row.length; j++) { r.push(kcPool.offsets[k]); k++; } kcOffsets.push(r); }
}
log('KC pool:', flatC.length, 'words,', kcPool.codes.length, 'codes');
m = m.slice(0, cs) + m.slice(ce); // offsets table hoisted to shard scope below

const [rs, re] = balanced(m, 'const _0xraw = {', '{', '}');
const raw = evalData(m.slice(rs + 'const _0xraw = '.length, re));
const [fs2, fe2] = balanced(m, 'const _0xrawfl = {', '{', '}');
const rawfl = evalData(m.slice(fs2 + 'const _0xrawfl = '.length, fe2));
const rawKeys = Object.keys(raw);
const flKeys = ['pre', 'mid1', 'mid2'];
const xorAll = [...rawKeys.map(k => String.fromCharCode(...raw[k])), ...flKeys.map(k => String.fromCharCode(...rawfl[k]))];
const xorPool = buildPool(xorAll);
const xorOffsets = {}; const xorGolden = {};
{
  let i = 0;
  for (const k of rawKeys) { xorOffsets[k] = xorPool.offsets[i]; xorGolden[k] = raw[k].map(c => String.fromCharCode(c ^ 113)).join(''); i++; }
  for (const k of flKeys) { xorOffsets[k] = xorPool.offsets[i]; xorGolden[k] = rawfl[k].map(c => String.fromCharCode(c ^ 113)).join(''); i++; }
  const keyOffsets = {}; for (const k of rawKeys) keyOffsets[k] = xorOffsets[k];
  const flOffsets = {}; for (const k of flKeys) flOffsets[k] = xorOffsets[k];
  m = m.slice(0, rs) + 'const _0xraw = ' + JSON.stringify(keyOffsets) + ';' + m.slice(re);
  const [fs2b, fe2b] = balanced(m, 'const _0xrawfl = {', '{', '}');
  m = m.slice(0, fs2b) + 'const _0xrawfl = ' + JSON.stringify(flOffsets) + ';' + m.slice(fe2b);
}
log('XOR pool:', xorAll.length, 'entries,', xorPool.codes.length, 'codes');

const oldDs = 'const _0xds = a => String.fromCharCode(...a.map(c => c ^ _0xk));';
if (!m.includes(oldDs)) throw new Error('m: old _0xds not found');
m = m.replace(oldDs, '');
const ANCHOR = 'const Log = _0xmod.log;';
if (!m.includes(ANCHOR)) throw new Error('m: Log anchor not found');
const KP_DEC = `const _0xwd = o => { const t = _0xpb; const n = (t[o] - 0x21) * 94 + (t[o + 1] - 0x21); let r = ""; for (let j = 0; j < n; j++) { const c = t[o + 2 + j]; r += String.fromCharCode(c < 0x80 ? 0x20 + (((c - 0x20 - 47) % 0x5F) + 0x5F) % 0x5F : c); } return r; };`;
const XOR_DEC = `const _0xds = o => { const t = _0xmb; const n = (t[o] - 0x21) * 94 + (t[o + 1] - 0x21); let r = ""; for (let j = 0; j < n; j++) r += String.fromCharCode(t[o + 2 + j] ^ 113); return r; };`;
m = m.replace(ANCHOR, ANCHOR + '\n  const _0xci = ' + JSON.stringify(kcOffsets) + ';\n  ' + poolInit('_0xpb', kcPool.codes) + '\n  ' + poolInit('_0xmb', xorPool.codes) + '\n  ' + KP_DEC + '\n  ' + XOR_DEC);

const oldC = 'C: i => { const w = pick(i, C[i]); return w === null || w === undefined ? w : dec(w, KC); }';
if (!m.includes(oldC)) throw new Error('m: lex C() not found');
m = m.replace(oldC, 'C: i => { const w = pick(i, _0xci[i]); return typeof w === "number" ? _0xwd(w) : w; }');

const oldAttach = '_0xmod.mc = MemberCount;\n    _0xmod.lex = _0xlex;';
if (!m.includes(oldAttach)) throw new Error('m: attach block not found');
const PROBE_M = `\n    try { let _0xnp = 0; for (const _0xq in _0xlex) { if (typeof _0xlex[_0xq] !== "function") _0xnp++; } const _0xsm = _0xwd(_0xci[0][0]); Log.queue("Retention probe", { shard: "m", pools: 2, typed: (_0xpb instanceof Uint16Array) && (_0xmb instanceof Uint16Array), dataExports: _0xnp, decodeOk: typeof _0xsm === "string" && _0xsm.length > 0, decodedTablesRetained: _0xnp === 0 ? 0 : 1 }); } catch (e) {}`;
m = m.replace(oldAttach, oldAttach + PROBE_M);

// ================= shard-e =================
let e = fs.readFileSync(F.e, 'utf8');
log('--- shard-e ---');
const dRe = /_0xlex\.d\("((?:[^"\\]|\\.)*)"\)/g;
const literals = [];
let mm2;
while ((mm2 = dRe.exec(e)) !== null) literals.push(mm2[1]);
const allCalls = (e.match(/_0xlex\.d\(/g) || []).length;
log('d() literals:', literals.length, '| raw calls:', allCalls);
if (allCalls !== literals.length) throw new Error('non-literal _0xlex.d( calls present — abort');
const encStrs = literals.map(rawLit => evalData('"' + rawLit + '"'));
const ePool = buildPool(encStrs);
const eGolden = encStrs.map(s => bandDec(s, 61));
log('e pool:', encStrs.length, 'entries,', ePool.codes.length, 'codes');
let idxE = 0;
e = e.replace(dRe, () => '_0xed(' + ePool.offsets[idxE++] + ')');
if ((e.match(/_0xlex\.d\(/g) || []).length !== 0) throw new Error('e: leftover _0xlex.d(');

const ANCHOR_E = 'const Log = _0xmod.log;';
const anchorAt = e.indexOf(ANCHOR_E);
if (anchorAt < 0) throw new Error('e: Log anchor not found');
const firstUse = e.indexOf('_0xed(');
if (!(anchorAt + ANCHOR_E.length < firstUse)) throw new Error('e: pool would land after first use');
const POOL_E = `\n  ${poolInit('_0xeb', ePool.codes)}\n  const _0xed = i => { const t = _0xeb; const n = (t[i] - 0x21) * 94 + (t[i + 1] - 0x21); let r = ""; for (let j = 0; j < n; j++) { const c = t[i + 2 + j]; r += String.fromCharCode(c < 0x80 ? 0x20 + (((c - 0x20 - 61) % 0x5F) + 0x5F) % 0x5F : c); } return r; };`;
const PROBE_E = `\n  try { const _0xsm = _0xed(0); Log.queue("Retention probe", { shard: "e", pools: 1, typed: _0xeb instanceof Uint16Array, decodeOk: typeof _0xsm === "string" && _0xsm.length > 0, decodedTablesRetained: _0xeb instanceof Uint16Array ? 0 : 1 }); } catch (e) {}`;
e = e.slice(0, anchorAt + ANCHOR_E.length) + POOL_E + PROBE_E + e.slice(anchorAt + ANCHOR_E.length);

const oldKey = 'Symbol.for("quest-suite:o8:active")';
if (!e.includes(oldKey)) throw new Error('e: run-key not found');
e = e.replace(oldKey, 'Symbol.for("_0xq2de579ef")');
e = e.split('_0xrunOwner').join('_0x5c1f').split('_0xrunKey').join('_0x5c1e');
if (e.includes('_0xrunKey') || e.includes('_0xrunOwner')) throw new Error('e: rename incomplete');

// ================= shard-aux =================
let aux = fs.readFileSync(F.aux, 'utf8');
log('--- shard-aux ---');
const aNames = ['_0x2dea0', '_0x2dea1', '_0x2dea2'];
const aArrs = {};
for (const n of aNames) {
  const [s, en] = balanced(aux, 'const ' + n + ' = [');
  aArrs[n] = evalData(aux.slice(s + ('const ' + n + ' = ').length, en));
}
log('aux arrays:', aNames.map(n => `${n}:${aArrs[n].length}`).join(' '));
const e0 = aArrs[aNames[0]];
const e1 = aArrs[aNames[1]].map(s => rotEnc(s));
const e2 = aArrs[aNames[2]].map(s => rotEnc(s));
const auxPool = buildPool([...e0, ...e1, ...e2]);
const auxOffsets = {
  [aNames[0]]: auxPool.offsets.slice(0, e0.length),
  [aNames[1]]: auxPool.offsets.slice(e0.length, e0.length + e1.length),
  [aNames[2]]: auxPool.offsets.slice(e0.length + e1.length),
};
const auxGolden = [e0.map(s => rotDec(s)), aArrs[aNames[1]].slice(), aArrs[aNames[2]].slice()];
for (const n of aNames) {
  const [s, en] = balanced(aux, 'const ' + n + ' = [');
  aux = aux.slice(0, s) + 'const ' + n + ' = ' + JSON.stringify(auxOffsets[n]) + ';' + aux.slice(en);
}
const AUX_TOP = '(function (_0xmod) {';
if (!aux.includes(AUX_TOP)) throw new Error('aux: wrapper not found');
const AUX_INS = `\n  ${poolInit('_0xab', auxPool.codes)}\n  const _0xaD = o => { const t = _0xab; const n = (t[o] - 0x21) * 94 + (t[o + 1] - 0x21); let r = ""; for (let j = 0; j < n; j++) r += String.fromCharCode(0x21 + (((t[o + 2 + j] - 0x21 - 0x5D) % 0x5E) + 0x5E) % 0x5E); return r; };\n  try { const _0xsm = _0xaD(${auxOffsets[aNames[0]][0]}); _0xmod.log.queue("Retention probe", { shard: "aux", pools: 1, typed: _0xab instanceof Uint16Array, decodeOk: typeof _0xsm === "string" && _0xsm.length > 0, decodedTablesRetained: _0xab instanceof Uint16Array ? 0 : 1 }); } catch (e) {}`;
aux = aux.replace(AUX_TOP, AUX_TOP + AUX_INS);

// ================= LRM cleanup =================
const LRM = '\u200E', ZWNJ = '\u200C';
let lrmTotal = 0;
const fixLrm = (text, label) => {
  const n = text.split(LRM).length - 1;
  lrmTotal += n;
  if (n) log(`LRM -> ZWNJ in ${label}: ${n}`);
  return text.split(LRM).join(ZWNJ);
};
let n1 = fs.readFileSync(F.n1, 'utf8');
let u = fs.readFileSync(F.u, 'utf8');
let n2 = fs.readFileSync(F.n2, 'utf8');
a = fixLrm(a, 'a'); m = fixLrm(m, 'm'); e = fixLrm(e, 'e'); aux = fixLrm(aux, 'aux'); n1 = fixLrm(n1, 'n1'); n2 = fixLrm(n2, 'n2'); u = fixLrm(u, 'u');
log('LRM total replaced:', lrmTotal);

// ================= golden parity =================
log('--- golden parity ---');
{
  let bad = 0;
  for (let i = 0; i < C.length; i++) for (let j = 0; j < C[i].length; j++) {
    if (readAt(kcPool.codes, kcOffsets[i][j]) !== C[i][j]) { bad++; if (bad < 4) log('KC mismatch', i, j); }
  }
  log('KC words verified:', flatC.length, '| mismatches:', bad);
  if (bad) throw new Error('KC parity failed');
}
{
  let bad = 0;
  for (const k of rawKeys) {
    const dec = [...readAt(xorPool.codes, xorOffsets[k])].map(ch => String.fromCharCode(ch.charCodeAt(0) ^ 113)).join('');
    if (dec !== xorGolden[k]) { bad++; log('XOR mismatch', k); }
  }
  for (const k of flKeys) {
    const dec = [...readAt(xorPool.codes, xorOffsets[k])].map(ch => String.fromCharCode(ch.charCodeAt(0) ^ 113)).join('');
    if (dec !== xorGolden[k]) { bad++; log('XORfl mismatch', k); }
  }
  log('XOR entries verified:', xorAll.length, '| mismatches:', bad);
  if (bad) throw new Error('XOR parity failed');
}
{
  let bad = 0;
  ePool.offsets.forEach((off, i) => { if (bandDec(readAt(ePool.codes, off), 61) !== eGolden[i]) { bad++; if (bad < 4) log('E mismatch', i); } });
  log('e literals verified:', ePool.offsets.length, '| mismatches:', bad);
  if (bad) throw new Error('e parity failed');
}
{
  let bad = 0;
  aNames.forEach((n, ai) => auxOffsets[n].forEach((off, i) => { if (rotDec(readAt(auxPool.codes, off)) !== auxGolden[ai][i]) bad++; }));
  log('aux entries verified:', aNames.reduce((s, n) => s + auxOffsets[n].length, 0), '| mismatches:', bad);
  if (bad) throw new Error('aux parity failed');
}

// ================= write + syntax =================
const files = [['a', a, F.a], ['m', m, F.m], ['e', e, F.e], ['n1', n1, F.n1], ['n2', n2, F.n2], ['u', u, F.u], ['aux', aux, F.aux]];
if (APPLY) {
  for (const [, text, p] of files) fs.writeFileSync(p, text);
  for (const [name, , p] of files) log(`syntax ${name}: ${syntaxCheck(p) ? 'OK' : 'FAIL'}`);
  fs.writeFileSync('/tmp/typed-pool-report.txt', report.join('\n'));
  log('APPLIED. report -> /tmp/typed-pool-report.txt');
} else {
  log('DRY RUN (no files written). Re-run with --apply.');
}
