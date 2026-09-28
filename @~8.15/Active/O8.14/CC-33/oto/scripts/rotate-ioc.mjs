#!/usr/bin/env node
/**
 * O8.10 red-forge item 3 (A0-generalized): per-build behavioral-IOC rotation.
 * Manifest-driven chaining: reads oto/rotation.json for the CURRENT literals,
 * derives fresh values from the new tag, asserts preconditions, rewrites the
 * shard SOURCES (before G7/JSO/min), records the new manifest with a prev link.
 *   shard-a: SUITE_VERSION, INSTANCE_ID
 *   shard-e: Symbol.for suffix (= instance id, invariant kept), 7 store
 *            codenames (names line), boot/cycle timer ms.
 * Deliberately NOT rotated: hotkeys x/r (operator muscle memory; minimal IOC
 * value), webpack chunk names (functional), G7/JSO seeds (determinism anchors;
 * rotate via BUILD-SEED respin instead, which re-skins the whole JSO skeleton).
 * Usage: node rotate-ioc.mjs <tag> [--apply] [--version=X]
 *   dry-run (default): print derived values + substitution plan, write nothing.
 *   --apply: assert exact occurrence counts, rewrite shards, record oto/rotation.json
 *   --version: new SUITE_VERSION (default: keep current — rotation != version bump).
 * Deterministic: same tag -> same values (seed-lib + mulberry32).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const { deriveInt: SEEDINT } = require('./seed-lib.js');
const O86 = path.resolve(__dirname, '..', '..');
const SHARDS = path.join(O86, 'shards');

const WORDS = ('ember flint grove harbor ivory juniper kelp lotus meadow north onyx prairie ' +
  'quartz ridge sedge tundra umber vale willow yonder zephyr brook cairn dune elm fjord ' +
  'lark moss owl pine quill robin swift tern wren aspen birch cedar').split(' ');

function mulberry(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const count = (s, sub) => s.split(sub).length - 1;

const tag = (process.argv[2] && !process.argv[2].startsWith('--')) ? process.argv[2] : null;
if (!tag) { console.error('usage: node rotate-ioc.mjs <tag> [--apply] [--version=X]'); process.exit(2); }
const apply = process.argv.includes('--apply');
const verArg = (process.argv.find((a) => a.startsWith('--version=')) || '').split('=')[1];

// current state = previous manifest's NEW side
let prev;
try {
  prev = JSON.parse(fs.readFileSync(path.join(O86, 'oto', 'rotation.json'), 'utf8'));
} catch {
  console.error('no oto/rotation.json: fresh bootstrap unsupported — hand-plant the current-state manifest first.');
  process.exit(2);
}
const OLD = {
  tag: prev.tag,
  version: prev.version.new,
  instance: prev.instance.new,
  symbol: prev.symbol.new,
  names: prev.codenames.new,
  cycleMs: prev.cycleMs.new,
};
const NEW_VERSION = verArg || OLD.version;
if (!OLD.version || !OLD.instance || !OLD.symbol || !Array.isArray(OLD.names) || OLD.names.length !== 7 || !OLD.cycleMs) {
  console.error('rotation.json malformed: need version/instance/symbol/codenames[7]/cycleMs on the new side.');
  process.exit(2);
}

const rng = mulberry(SEEDINT(tag));
const hex8 = () => Math.floor(rng() * 0x100000000).toString(16).padStart(8, '0');
const instance = hex8();
const cycleMs = 12000 + 1000 * Math.floor(rng() * 7);
const pool = WORDS.slice();
for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1));[pool[i], pool[j]] = [pool[j], pool[i]]; }

const aPath = path.join(SHARDS, 'shard-a.js');
// PLAN-H (2026-09-20): the `e` shard is now four pieces (shard-e1..e4). The anchors this
// script rewrites are spread across them (Symbol + codename line in e1, the timer tail in
// e4), so `e` is handled as ONE logical unit: checks run against the concatenation, the
// substitutions are applied per piece, and every piece is asserted to carry no stale anchor.
const EPIECES = ['shard-e1.js', 'shard-e2.js', 'shard-e3.js', 'shard-e4.js']
  .map((f) => path.join(SHARDS, f)).filter((f) => fs.existsSync(f));
if (!EPIECES.length) throw new Error('no shard-e pieces found (expected shard-e1..e4.js)');
const aSrc = fs.readFileSync(aPath, 'utf8');
const pieceTexts = new Map(EPIECES.map((f) => [f, fs.readFileSync(f, 'utf8')]));
const eSrc = [...pieceTexts.values()].join('\n');   // all checks run on the unit as a whole

// collision check: new codenames must differ from current and not occur anywhere in the unit
const fresh = [];
for (const w of pool) {
  if (OLD.names.includes(w)) continue;
  if (new RegExp('\\b' + w + '\\b').test(eSrc)) continue;
  fresh.push(w);
  if (fresh.length === 7) break;
}
if (fresh.length !== 7) throw new Error('codename pool exhausted (collisions)');

// occurrence assertions (all must hold before any write).
// The codename line is cell-rewritten by the H split (`onyx: !!S._0x3`), so match the names
// and their `!!` markers rather than the exact old text.
const namesRe = new RegExp(OLD.names[0] + ': !!.*' + OLD.names[1] + ': !!');
const checks = [
  ['a:SUITE_VERSION', count(aSrc, `SUITE_VERSION = "${OLD.version}"`), 1, 'eq'],
  ['a:INSTANCE_ID', count(aSrc, `INSTANCE_ID = "${OLD.instance}"`), 1, 'eq'],
  ['e:Symbol', count(eSrc, OLD.symbol), 1, 'eq'],
  // CC-33: anchor the timer to its call site. The raw number collided with a string-table
  // index (`_0xed(14000)`) in the 8.14 shard, which made the old raw-count precondition
  // fail on a healthy source. Count only `}, <cycleMs>);` (the setTimeout tail).
  ['e:cycle', count(eSrc, `}, ${OLD.cycleMs});`), 1, 'eq'],
  ['e:names-line', eSrc.split('\n').filter((l) => namesRe.test(l)).length, 1, 'eq'],
];
for (const w of OLD.names) checks.push(['e:key:' + w, count(eSrc, w + ':'), 1, 'ge']);
const bad = checks.filter(([, n, want, op]) => (op === 'eq' ? n !== want : n < want));
console.log(`tag=${tag} (prev=${OLD.tag}) apply=${apply}`);
console.log(`version: ${OLD.version} -> ${NEW_VERSION}`);
console.log(`instance/symbol: ${OLD.instance} -> ${instance}`);
console.log(`codenames: ${OLD.names.join(',')} -> ${fresh.join(',')}`);
console.log(`cycleMs: ${OLD.cycleMs} -> ${cycleMs}`);
for (const [k, n, want, op] of checks) console.log(`  check ${k}: found=${n} want${op === 'eq' ? '=' : '>='}${want}${(op === 'eq' ? n === want : n >= want) ? '' : '  <-- MISMATCH'}`);
if (bad.length) throw new Error('rotation preconditions failed: ' + bad.map((b) => b[0]).join(','));
if (!apply) { console.log('dry-run: no writes. Re-run with --apply.'); process.exit(0); }

// apply across the unit (line-scoped codename swap, exact old->new pairs everywhere)
let a2 = aSrc.split(`SUITE_VERSION = "${OLD.version}"`).join(`SUITE_VERSION = "${NEW_VERSION}"`);
a2 = a2.split(`INSTANCE_ID = "${OLD.instance}"`).join(`INSTANCE_ID = "${instance}"`);
const touched = [];
for (const [f, txt] of pieceTexts) {
  let out = txt.split(OLD.symbol).join('_0xq' + instance);
  out = out.split(`}, ${OLD.cycleMs});`).join(`}, ${cycleMs});`);
  const lines = out.split('\n');
  const li = lines.findIndex((l) => namesRe.test(l));
  if (li >= 0) {
    let nl = lines[li];
    for (let i = 0; i < 7; i++) {
      const c = count(nl, OLD.names[i] + ':');
      if (c !== 1) throw new Error(`codename ${OLD.names[i]} ambiguous in ${path.basename(f)}`);
      nl = nl.split(OLD.names[i] + ':').join(fresh[i] + ':');
    }
    lines[li] = nl;
    out = lines.join('\n');
  }
  if (out !== txt) { pieceTexts.set(f, out); touched.push(path.basename(f)); }
}
if (touched.length !== 1 || !touched[0].startsWith('shard-e1')) {
  // both the Symbol and the codename line live in piece 1; the timer tail in piece 4
  if (!touched.length) throw new Error('rotation applied nothing — anchors not found in pieces');
}
// post-write verification: no stale anchor may remain anywhere in the unit
const newSymbol = '_0xq' + instance;
const stalePairs = [
  [OLD.symbol, newSymbol],
  [`}, ${OLD.cycleMs});`, `}, ${cycleMs});`],
  ...OLD.names.map((w, i) => [w + ':', fresh[i] + ':']),
].filter(([a, b]) => a !== b);          // an unchanged anchor is not "stale"
for (const [f, txt] of pieceTexts) {
  for (const [s] of stalePairs) if (txt.includes(s)) throw new Error(`stale rotation anchor "${s}" in ${path.basename(f)}`);
}
fs.writeFileSync(aPath, a2);
for (const [f, txt] of pieceTexts) fs.writeFileSync(f, txt);
const manifest = {
  tag, prev: OLD.tag, date: new Date().toISOString().slice(0, 10),
  version: { old: OLD.version, new: NEW_VERSION },
  instance: { old: OLD.instance, new: instance },
  symbol: { old: OLD.symbol, new: '_0xq' + instance },
  codenames: { old: OLD.names, new: fresh },
  cycleMs: { old: OLD.cycleMs, new: cycleMs },
  files: ['shards/shard-a.js', ...EPIECES.map((f) => 'shards/' + path.basename(f))],
  note: 'reversible: substitutions are exact old->new pairs above',
};
fs.writeFileSync(path.join(O86, 'oto', 'rotation.json'), JSON.stringify(manifest, null, 1) + '\n');
console.log(`applied (${touched.join(',')}). manifest: Active/O8.6/oto/rotation.json`);
