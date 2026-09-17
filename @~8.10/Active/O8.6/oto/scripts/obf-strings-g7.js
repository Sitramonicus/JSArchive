// obf-strings-g7.js — O8.9 G7: pre-OTO string-literal encoding (runs FIRST in cascade).
// Replaces string literals + static template parts in every shard with calls into a
// per-shard decoder namespace (3 decoder shapes + cache persona + format persona),
// per-site index encoding, shuffled table with interleaved fiction entries, and a
// bounded confusion walk for invalid indices. Decoders branch on the G8 lexMode flag
// (canon table vs fiction pool). Semantics-preserving: every call evaluates to the
// exact source literal. Output: oto/g7-strings/shard-<tag>.js + census.json.
// webcrack-class substitution (documented): stock webcrack is unrunnable on Node 20
// (isolated-vm); the red-team gate substitutes babel-reprint + a generic
// annotate-all clone (see redteam-strings-g7.mjs). Targeted human-written
// extractors are priced-in-hours, not blocked — the gate measures STOCK tools.
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const crypto = require('node:crypto');
const { execFileSync } = require('child_process');
const REPO = path.resolve(__dirname, '..', '..', '..', '..');
const O86 = path.join(REPO, 'Active', 'O8.6');
const ENG = path.join(REPO, 'Active', 'engines', 'node_modules');
function needEngine(name) {
  try { return require(path.join(ENG, name)); } catch (e) { /* fall through */ }
  try { return require(name); } catch (e) { /* fall through */ }
  throw new Error(`Missing engine "${name}" — run: cd ${path.join(REPO, 'Active', 'engines')} && npm install`);
}
const parser = needEngine('@babel/parser');
const generate = needEngine('@babel/generator').default;
const traverse = needEngine('@babel/traverse').default;
const { deriveInt: SEEDINT } = require('./seed-lib.js');

const SRC = path.join(O86, 'shards');
const OUT = path.join(O86, 'oto', 'g7-strings');
const TAGS = ['a', 'm', 'n1', 'e', 'n2', 'aux', 'u'];
const MARKER = '佐藤 結衣';
const MINLEN = 4;    // encode literals with length >= 4 (shorter = analyst noise)
const METRICLEN = 6; // gate metric counts plaintexts with length >= 6 (shorter = grep noise)

function mulberry(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
// build-time keystream twin of the shipped dec() (xorshift32 over char index)
function ksByte(skey, pos, i) {
  let st = (skey ^ Math.imul((pos + 1) >>> 0, 2654435761)) >>> 0;
  for (let k = 0; k <= i; k++) { st ^= (st << 13) >>> 0; st ^= st >>> 17; st ^= (st << 5) >>> 0; }
  return st & 255;
}
function encEntry(s, skey, pos) {
  const bytes = [];
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    bytes.push((c & 255) ^ ksByte(skey, pos, bytes.length));
    bytes.push(((c >>> 8) & 255) ^ ksByte(skey, pos, bytes.length));
  }
  return Buffer.from(bytes).toString('base64');
}
const sha8 = (s) => crypto.createHash('sha256').update(s, 'utf8').digest('hex').slice(0, 8);

// fiction pool templates (pass-2/term-hygiene clean: no questId/[Quest/camo/decoy/etc.)
const FIC_A = ['ledger-entry', 'tile-cache-v', 'relay', 'ping-ok', 'batch', 'cursor', 'shard-ix', 'route-hint', 'venue-echo', 'slot'];
const FIC_B = ['eu-west', 'us-mid', 'apac', 'local', 'edge-12', 'store-7'];
// TRAP (G5/G6): sweep-shape monitor thresholds (distinct pos in last-64 window).
// Calibration values: set HUGE for the calibration build, then pin from measured
// legitimate maxes (TRIPDIAG lines) at 2.5x/3.5x with floors. NEVER analyst-tunable.
const SWEEP_HONEY_N = 8, SWEEP_TUBE_N = 24; // invalid-index counts: legit is structural-zero (all site args valid), sweep trips tube in ~30 calls
const TUBE_TPL = [
  'reel layer {n} ok ({p}% mapped)',
  'chunk {n} sealed, key {h}',
  'gate {n} open -- subkey {h}',
  'chain {n}: {p}% converged',
  'lattice L{n} settled ({p}%)',
  'schedule K{n}: {h}',
  'shroud {n} lifted ({p}%)',
  'wheel W{n} aligned: {h}',
];
const TUBE_SKELETONS = TUBE_TPL.map(s => s.replace(/\{(n|p|h)\}/g, '\0'))
  .concat(['vault seal \0 -- lattice quiet']);
function fiction(rnd, i) {
  const a = FIC_A[Math.floor(rnd() * FIC_A.length)];
  const b = FIC_B[Math.floor(rnd() * FIC_B.length)];
  const h = Math.floor(rnd() * 0xffffff).toString(16).padStart(6, '0');
  const v = 1 + Math.floor(rnd() * 9);
  switch (i % 4) {
    case 0: return `${a}-${h}`;
    case 1: return `${a}${v}/${b}/${h.slice(0, 4)}`;
    case 2: return `https://cdn.gallery.example/t/${h.slice(0, 2)}/${h}`;
    default: return `${b}:${a}:${1000 + Math.floor(rnd() * 9000)}`;
  }
}

function callNode(ns, method, args) {
  return {
    type: 'CallExpression',
    callee: { type: 'MemberExpression', object: { type: 'Identifier', name: ns }, property: { type: 'Identifier', name: method }, computed: false, optional: false },
    arguments: args.map((a) => ({ type: 'NumericLiteral', value: a >>> 0 })),
    optional: false,
  };
}
function numNode(v) { return { type: 'NumericLiteral', value: v >>> 0 }; }

const census = { tags: {}, measurable: [], fiction: [], fictionTexts: [], totalMeasurable: 0 };

fs.mkdirSync(OUT, { recursive: true });
for (const tag of TAGS) {
  const rnd = mulberry(SEEDINT('g7-' + tag));
  const src = fs.readFileSync(path.join(SRC, `shard-${tag}.js`), 'utf8');
  const ast = parser.parse(src, { sourceType: 'script' });
  const units = []; // {path|parentInfo, kind, value(s)}
  traverse(ast, {
    StringLiteral(p) {
      const v = p.node.value;
      if (v.length < MINLEN || v === MARKER || v === 'use strict') return;
      units.push({ p, kind: 'str', value: v });
    },
    TemplateLiteral(p) {
      if (p.node.tag) return;
      const parts = [];
      for (let i = 0; i < p.node.quasis.length; i++) {
        const q = p.node.quasis[i];
        if (q.value.cooked && q.value.cooked.length >= MINLEN) parts.push({ quasi: i, value: q.value.cooked });
      }
      if (parts.length) units.push({ p, kind: 'tpl', parts });
    },
  });
  // plaintexts in unit order; fiction fill
  const plains = [];
  for (const u of units) {
    if (u.kind === 'str') plains.push(u.value);
    else for (const pt of u.parts) plains.push(pt.value);
  }
  const N = plains.length;
  const nFic = Math.ceil(N * 0.12) + 2;
  // real entries shuffled; fiction CONTIGUOUS at [N, N+nFic) — dec()'s honey map
  // (NREAL + pos % nFic) must land on fiction-only entries (all entries are
  // ciphertexts, so the partition is invisible statically).
  const rord = plains.map((_, i) => i);
  for (let i = rord.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [rord[i], rord[j]] = [rord[j], rord[i]]; }
  const order = rord.map((i) => ({ real: i }));
  for (let i = 0; i < nFic; i++) order.push({ fic: i });
  const skey = Math.floor(rnd() * 0xffffffff) >>> 0;
  const c1 = Math.floor(rnd() * 0xffffffff) >>> 0;
  const c2 = Math.floor(rnd() * 0xffffffff) >>> 0;
  const ficTexts = [];
  for (let i = 0; i < nFic; i++) ficTexts.push(fiction(rnd, i));
  // K-walk: per-namespace one-way walk for d3 (build holds the inverse; ships mix only)
  const walkUnmix1 = (z, skey, mci) => {
    z >>>= 0;
    const y = (z ^ (z >>> 15) ^ (z >>> 30)) >>> 0;
    const u = Math.imul(y, mci) >>> 0;
    const tt = (u ^ skey) >>> 0;
    return (tt ^ (tt >>> 13) ^ (tt >>> 26)) >>> 0;
  };
  const modInv32 = (a) => { let x = 1; for (let i = 0; i < 5; i++) x = Math.imul(x, 2 - Math.imul(a, x)); return x >>> 0; };
  const walkUnmixN = (pos, r, skey, mci) => { let x = pos >>> 0; for (let i = 0; i < r; i++) x = walkUnmix1(x, skey, mci); return x >>> 0; };
  const tubeOrder = TUBE_TPL.slice();
  for (let ti = tubeOrder.length - 1; ti > 0; ti--) { const tj = Math.floor(rnd() * (ti + 1)); [tubeOrder[ti], tubeOrder[tj]] = [tubeOrder[tj], tubeOrder[ti]]; }
  const tubeEnd = 40 + Math.floor(rnd() * 80);
  const mcW = (Math.floor(rnd() * 0xffffffff) | 1) >>> 0, mciW = modInv32(mcW);
  const table = order.map((o, pos) => encEntry(o.real !== undefined ? plains[o.real] : ficTexts[o.fic], skey, pos));
  const posOf = new Array(N);
  order.forEach((o, pos) => { if (o.real !== undefined) posOf[o.real] = pos; });
  const ns = 'textCache' + tag.toUpperCase();
  const decoderPick = (u) => {
    const r = rnd();
    if (r < 0.40) return 'd1';
    if (r < 0.70) return 'd2';
    if (r < 0.90) return 'd3';
    return 'pcache';
  };
  // rewrite sites (plain index -> site args)
  let flat = 0;
  const samples = [];
  for (const u of units) {
    const mkCall = (plainIdx) => {
      const pos = posOf[plainIdx];
      const salt = Math.floor(rnd() * 0xffffffff) >>> 0;
      const which = decoderPick(u);
      let node;
      if (which === 'd1') node = callNode(ns, 'd1', [pos ^ c1]);
      else if (which === 'pcache') node = callNode(ns, 'pcache', [pos ^ c1]);
      else if (which === 'd2') node = callNode(ns, 'd2', [pos ^ salt, salt ^ c2]);
      else { const d3r = 1 + (salt % 3); const x0 = walkUnmixN(pos, d3r, skey, mciW); node = callNode(ns, 'd3', [salt, (salt ^ x0 ^ c2) >>> 0, d3r]); }
      if (samples.length < 25 && rnd() < 0.3) samples.push({ node, expect: plains[plainIdx] });
      return node;
    };
    if (u.kind === 'str') {
      if (u.p.parentPath.isObjectProperty() && u.p.parentKey === 'key') u.p.parentPath.node.computed = true;
      u.p.replaceWith(mkCall(flat++));
    } else {
      // template -> concat chain of dec() calls + original exprs
      let expr = null;
      const push = (node) => { expr = expr ? { type: 'BinaryExpression', operator: '+', left: expr, right: node } : node; };
      for (let i = 0; i < u.p.node.quasis.length; i++) {
        const q = u.p.node.quasis[i];
        if (q.value.cooked && q.value.cooked.length >= MINLEN) push(mkCall(flat++));
        else if (q.value.cooked && q.value.cooked.length > 0) push({ type: 'StringLiteral', value: q.value.cooked });
        if (i < u.p.node.expressions.length) push(u.p.node.expressions[i]);
      }
      u.p.replaceWith(expr);
    }
  }
  // namespace prelude (ES5-ish: js-confuser-safe, closure-safe)
  const prelude = `var ${ns} = (function () {\n`
    + `var TBL = ${JSON.stringify(table)};\n`
    + `var NREAL = ${N}, C1 = ${c1}, C2 = ${c2}, SKEY = ${skey};\n`
    + `var SW_BAD = 0, SW_LVL = 0, SW_VISIT = 0;\n`
    + `var SW_H = ${SWEEP_HONEY_N}, SW_T = ${SWEEP_TUBE_N}, SW_END = ${tubeEnd};\n`
    + `var TUBE = ${JSON.stringify(tubeOrder)};\n`

    + `function tubeLayer(v) { var hx = ((SKEY ^ Math.imul(v + 3, 2654435761)) >>> 0).toString(16); hx = ('00000000' + hx).slice(-8); if (v >= SW_END) return 'vault seal ' + hx + ' -- lattice quiet'; var t = TUBE[v % TUBE.length]; var prog = 100 - Math.floor(100 / (v + 2)); return t.split('{n}').join(v).split('{p}').join(prog).split('{h}').join(hx); }\n`
    + `function dec(pos) {\n`
    + `if (!(pos >= 0 && pos < NREAL)) { SW_BAD++; if (SW_BAD >= SW_T) SW_LVL = 2; else if (SW_BAD >= SW_H) SW_LVL = 1;\n`
    + `if (typeof process !== 'undefined' && process.env && process.env.CS_TRIP_DIAG === '1') { try { console.debug('TRIPDIAG ${tag} bad=' + SW_BAD + ' lvl=' + SW_LVL); } catch (e9) {} } }\n`
    + `if (SW_LVL >= 2) return tubeLayer(SW_VISIT++);\n`
    + `var honey = (typeof lexMode !== 'undefined' && lexMode !== 0) || SW_LVL >= 1;\n`
    + `var p = honey ? (NREAL + (pos % (TBL.length - NREAL))) : pos;\n`
    + `if (!(p >= 0 && p < TBL.length) || typeof TBL[p] !== 'string') {\n`
    + `var w = (SKEY ^ Math.imul(pos, 2654435761)) >>> 0, acc = 0, iw;\n`
    + `for (iw = 0; iw < 48; iw++) { w ^= (w << 13) >>> 0; w ^= w >>> 17; w ^= (w << 5) >>> 0; acc = (acc + (w & 255)) >>> 0; }\n`
    + `p = NREAL + (acc % (TBL.length - NREAL)); }\n`
    + `var raw = atob(TBL[p]);\n`
    + `var out = '', i2;\n`
    + `var st = (SKEY ^ Math.imul((p + 1) >>> 0, 2654435761)) >>> 0;\n`
    + `for (i2 = 0; i2 < raw.length; i2++) { st ^= (st << 13) >>> 0; st ^= st >>> 17; st ^= (st << 5) >>> 0;\n`
    + `out += String.fromCharCode(raw.charCodeAt(i2) ^ (st & 255)); }\n`
    + `var s = '', k;\n`
    + `for (k = 0; k + 1 < out.length; k += 2) s += String.fromCharCode(out.charCodeAt(k) | (out.charCodeAt(k + 1) << 8));\n`
    + `return s; }\n`
    + `function d1(a) { return dec((a ^ C1) >>> 0); }\n`
    + `function d2(a, b) { return dec((a ^ b ^ C2) >>> 0); }\n`
    + `function d3(a, b, r) { var x = (a ^ b ^ C2) >>> 0, i, u;\n`
    + `for (i = 0; i < (r & 7); i++) { u = Math.imul((x ^ SKEY ^ (x >>> 13)) >>> 0, ${mcW}) >>> 0; x = (u ^ (u >>> 15)) >>> 0; }\n`

    + `return dec(x); }\n`
    + `var memo = {};\n`
    + `function pcache(a) { var k = (a ^ C1) >>> 0; if (memo[k] === undefined) memo[k] = dec(k); return memo[k]; }\n`
    + `function pfmt(f, a) { var w = (SKEY ^ a) >>> 0, i;\n`
    + `for (i = 0; i < 32; i++) { w ^= (w << 13) >>> 0; w ^= w >>> 17; w ^= (w << 5) >>> 0; }\n`
    + `return dec(NREAL + (w % (TBL.length - NREAL))); }\n`
    + `return { d1: d1, d2: d2, d3: d3, pcache: pcache, pfmt: pfmt }; })();\n`;
  const dirSrc = ast.program.directives.map((d) => JSON.stringify(d.value.value) + ';').join('');
  ast.program.directives = [];
  const body = generate(ast, { compact: true }).code;
  const _ch = () => Math.floor(rnd() * 0xffffffff).toString(16).padStart(8, '0');
  const _wv = (w, s) => w.split('').map((c, i) => c + (((i + s) % 2) ? '\u200d' : '\u200c')).join('').slice(0, -1);
  const _c1 = _ch(), _c2 = _ch(), _c3 = _ch();
  const _jn = _c1.slice(0, 4) + _c2.slice(0, 4);
  const camoTail = ';(function(){var _0xzw' + _c1 + '="' + _wv('kqzxv9m4' + _c1.slice(0, 2), 1) + '";'
    + 'var _0xzz' + _c2 + '="' + _wv('fleckmurmur' + _c2.slice(0, 2), 0) + '";'
    + 'var _0xrl' + _c3 + '="j7\u202e9m2q\u202ck4";'
    + 'var _0xjnk' + _jn + '=_0xzw' + _c1 + '+_0xzz' + _c2 + '+_0xrl' + _c3 + ';'
    + 'if(_0xjnk' + _jn + '.length>64){return;}})();';
  const out = dirSrc + prelude + body + camoTail;
  const outPath = path.join(OUT, `shard-${tag}.js`);
  fs.writeFileSync(outPath, out);
  execFileSync(process.execPath, ['--check', outPath], { stdio: 'pipe' });
  // self-test: sampled round-trips in vm (lexMode undefined => canon)
  const ctx = { atob: (s) => Buffer.from(s, 'base64').toString('latin1') };
  vm.createContext(ctx);
  vm.runInContext(prelude, ctx);
  for (const s of samples) {
    const expr = `${ns}.${s.node.callee.property.name}(${s.node.arguments.map((a) => a.value).join(',')})`;
    const got = vm.runInContext(expr, ctx);
    if (got !== s.expect) throw new Error(`G7 round-trip FAIL ${tag}: ${JSON.stringify(got)} != ${JSON.stringify(s.expect)}`);
  }
  // census
  let measurable = 0;
  for (const pl of plains) {
    if (pl.length >= METRICLEN) { census.measurable.push(sha8(pl)); measurable++; }
  }
  for (const f of ficTexts) census.fiction.push(sha8(f));
  census.fictionTexts.push(...ficTexts);
  census.tags[tag] = { units: N, measurable };
  census.totalMeasurable += measurable;
  // marker hygiene: u keeps x1, others x0
  const mk = out.split(MARKER).length - 1;
  if (tag === 'u' ? mk !== 1 : mk !== 0) throw new Error(`G7 marker hygiene FAIL ${tag}: x${mk}`);
  console.log(`shard-${tag}: ${units.length} sites (${N} units) -> ${(out.length / 1024).toFixed(1)}KB  [self-test ${samples.length} round-trips OK]`);
}
census.tubeSkeletons = TUBE_SKELETONS;
fs.writeFileSync(path.join(OUT, 'census.json'), JSON.stringify(census, null, 1));
console.log(`census: ${census.totalMeasurable} measurable plaintexts, ${census.fiction.length} fiction hashes ->`, path.join(OUT, 'census.json'));
console.log('g7-strings done ->', OUT);
