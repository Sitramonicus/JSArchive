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
const ePath = path.join(SHARDS, 'shard-e.js');
const aSrc = fs.readFileSync(aPath, 'utf8');
const eSrc = fs.readFileSync(ePath, 'utf8');

// collision check: new codenames must differ from current and not occur as identifiers in shard-e
const fresh = [];
for (const w of pool) {
  if (OLD.names.includes(w)) continue;
  if (new RegExp('\\b' + w + '\\b').test(eSrc)) continue;
  fresh.push(w);
  if (fresh.length === 7) break;
}
if (fresh.length !== 7) throw new Error('codename pool exhausted (collisions)');

// occurrence assertions (all must hold before any write)
const namesRe = new RegExp(OLD.names[0] + ': !!_0x3, ' + OLD.names[1] + ': !!_0x4');
const checks = [
  ['a:SUITE_VERSION', count(aSrc, `SUITE_VERSION = "${OLD.version}"`), 1, 'eq'],
  ['a:INSTANCE_ID', count(aSrc, `INSTANCE_ID = "${OLD.instance}"`), 1, 'eq'],
  ['e:Symbol', count(eSrc, OLD.symbol), 1, 'eq'],
  ['e:cycle', count(eSrc, String(OLD.cycleMs)), 1, 'eq'],
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

// apply (line-scoped codename swap to avoid touching anything else)
let a2 = aSrc.split(`SUITE_VERSION = "${OLD.version}"`).join(`SUITE_VERSION = "${NEW_VERSION}"`);
a2 = a2.split(`INSTANCE_ID = "${OLD.instance}"`).join(`INSTANCE_ID = "${instance}"`);
let e2 = eSrc.split(OLD.symbol).join('_0xq' + instance);
e2 = e2.split(String(OLD.cycleMs)).join(String(cycleMs));
const lines = e2.split('\n');
const li = lines.findIndex((l) => namesRe.test(l));
let nl = lines[li];
for (let i = 0; i < 7; i++) {
  const c = count(nl, OLD.names[i] + ':');
  if (c !== 1) throw new Error(`codename ${OLD.names[i]} ambiguous in target line`);
  nl = nl.split(OLD.names[i] + ':').join(fresh[i] + ':');
}
lines[li] = nl;
e2 = lines.join('\n');
fs.writeFileSync(aPath, a2);
fs.writeFileSync(ePath, e2);
const manifest = {
  tag, prev: OLD.tag, date: new Date().toISOString().slice(0, 10),
  version: { old: OLD.version, new: NEW_VERSION },
  instance: { old: OLD.instance, new: instance },
  symbol: { old: OLD.symbol, new: '_0xq' + instance },
  codenames: { old: OLD.names, new: fresh },
  cycleMs: { old: OLD.cycleMs, new: cycleMs },
  files: ['shards/shard-a.js', 'shards/shard-e.js'],
  note: 'reversible: substitutions are exact old->new pairs above',
};
fs.writeFileSync(path.join(O86, 'oto', 'rotation.json'), JSON.stringify(manifest, null, 1) + '\n');
console.log('applied. manifest: Active/O8.6/oto/rotation.json');
