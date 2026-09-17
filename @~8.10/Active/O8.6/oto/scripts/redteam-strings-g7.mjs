// redteam-strings-g7.mjs — O8.9 G7 red-team gates: stock-tool string recovery <5%.
// (a) plaintext grep: source literals (len>=6) found verbatim in the bundle;
// (b) babel-reprint then the same grep (normalize-then-read class: prettier /
//     js-beautify / Restringer-preprocess substitution — stock webcrack is
//     unrunnable on Node 20 (isolated-vm), documented in O8.9-PLAN);
// (c) generic annotate-all clone: naive single-decoder assumption — pair every
//     bare numeric-arg call with every discovered 1-arg charcode-ish decoder,
//     raw-eval in a sandbox, count census hits. Steelman boundary (documented):
//     a TARGETED human-written extractor (correct pairing) is priced-in-hours,
//     not blocked — the gate measures STOCK automation, which must get <5%.
// Usage: node redteam-strings-g7.mjs  (fails loud on any gate miss)
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const O86 = path.resolve(HERE, '..', '..');
const ENG = path.resolve(O86, '..', 'engines', 'node_modules');
const require = createRequire(import.meta.url);
function needEngine(name) {
  try { return require(path.join(ENG, name)); } catch (e) { /* fall through */ }
  return require(name);
}
const parser = needEngine('@babel/parser');
const generate = needEngine('@babel/generator').default;
const traverse = needEngine('@babel/traverse').default;

const bundle = fs.readFileSync(path.join(O86, 'final-package', 'O8.6-Final-final-bundle.js'), 'utf8');
const census = JSON.parse(fs.readFileSync(path.join(O86, 'oto', 'g7-strings', 'census.json'), 'utf8'));
const measSet = new Set(census.measurable);
const sha8 = (s) => crypto.createHash('sha256').update(s, 'utf8').digest('hex').slice(0, 8);

// metric plaintexts: re-extract source literals len>=6 (excl. marker/directives)
const plains = new Set();
for (const tag of ['a', 'm', 'n1', 'e', 'n2', 'aux', 'u']) {
  const src = fs.readFileSync(path.join(O86, 'shards', `shard-${tag}.js`), 'utf8');
  const ast = parser.parse(src, { sourceType: 'script' });
  traverse(ast, {
    StringLiteral(p) {
      const v = p.node.value;
      if (v.length >= 6 && v !== '佐藤 結衣' && v !== 'use strict') plains.add(v);
    },
    TemplateLiteral(p) {
      if (p.node.tag) return;
      for (const q of p.node.quasis) {
        if (q.value.cooked && q.value.cooked.length >= 6) plains.add(q.value.cooked);
      }
    },
  });
}
console.log(`census: ${census.totalMeasurable} measurable, ${plains.size} re-extracted, bundle ${(bundle.length / 1024).toFixed(0)}KB`);

let failures = 0;
const gate = (name, hits, total) => {
  const pct = (100 * hits / total).toFixed(2);
  const ok = hits / total < 0.05;
  console.log(`[${ok ? 'GATE-PASS' : 'GATE-FAIL'}] ${name}: ${hits}/${total} (${pct}%)`);
  if (!ok) failures++;
};

// (a) plaintext grep on shipped bytes
{
  let hits = 0;
  const miss = [];
  for (const pl of plains) {
    if (bundle.includes(pl)) { hits++; if (miss.length < 8) miss.push(JSON.stringify(pl.slice(0, 44))); }
  }
  gate('plaintext-grep', hits, plains.size);
  if (miss.length) console.log('  survivors:', miss.join(' | '));
}

// (b) babel-reprint then grep
{
  const ast = parser.parse(bundle, { sourceType: 'script' });
  const reprint = generate(ast, { compact: false }).code;
  let hits = 0;
  for (const pl of plains) if (reprint.includes(pl)) hits++;
  gate('reprint-grep', hits, plains.size);
}

// (c) generic annotate-all clone (naive single-decoder tier)
{
  const ast = parser.parse(bundle, { sourceType: 'script' });
  const candidates = [];
  const seen = new Set();
  traverse(ast, {
    Function(p) {
      const n = p.node;
      const oneParam = n.params && n.params.length === 1 && n.params[0].type === 'Identifier';
      if (!oneParam || !n.start || !n.end || n.end - n.start > 4000) return;
      const slice = bundle.slice(n.start, n.end);
      if (!/(fromCharCode|charCodeAt)/.test(slice)) return;
      if (seen.has(slice)) return;
      seen.add(slice);
      candidates.push(slice);
    },
  });
  // numeric-arg call sites, all three shapes (decimal + hex: JSO prints hex):
  // bare D(n), member X.m(n), computed X[...](n)
  const sites = [];
  const NUM = '(\\d{1,10}|0x[0-9a-fA-F]{1,8})';
  const reBare = new RegExp('(^|[^\\w$.])([A-Za-z_$][\\w$]*)\\(' + NUM + '\\)', 'g');
  const reMem = new RegExp('([A-Za-z_$][\\w$]*)\\.([A-Za-z_$][\\w$]*)\\(' + NUM + '\\)', 'g');
  const reBrk = new RegExp('([A-Za-z_$][\\w$]*)\\[[^\\[\\]]{1,60}\\]\\(' + NUM + '\\)', 'g');
  let m;
  while ((m = reBare.exec(bundle)) && sites.length < 6000) {
    if (m[2] === 'if' || m[2] === 'for' || m[2] === 'while') continue;
    sites.push(m[3]);
  }
  while ((m = reMem.exec(bundle)) && sites.length < 6000) sites.push(m[3]);
  while ((m = reBrk.exec(bundle)) && sites.length < 6000) sites.push(m[2]);
  const oneArg = sites.slice(0, 4000);
  const ctx = { atob: (s) => Buffer.from(s, 'base64').toString('latin1'), lexMode: 0 };
  vm.createContext(ctx);
  const recovered = new Set();
  let evals = 0;
  for (const cand of candidates.slice(0, 40)) {
    let fn;
    try { fn = vm.runInContext(`(${cand})`, ctx); } catch (e) { continue; }
    if (typeof fn !== 'function') continue;
    for (const arg of oneArg) {
      if (evals++ > 20000) break;
      try {
        const r = fn(Number(arg));
        if (typeof r === 'string' && measSet.has(sha8(r))) recovered.add(sha8(r));
      } catch (e) { /* closure deps / OOB fiction — the defense working */ }
    }
    if (evals > 20000) break;
  }
  console.log(`  clone: ${candidates.length} decoder candidates, ${oneArg.length} 1-arg sites (bare+member+bracket), ${evals} evals`);
  gate('generic-clone', recovered.size, census.totalMeasurable);
}

if (failures) { console.error(`REDTEAM-G7: ${failures} GATE(S) MISSED`); process.exit(1); }
console.log('REDTEAM-G7: ALL GATES PASS (<5% each)');
