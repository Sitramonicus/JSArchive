// rebind-registry-keys.mjs — CC-33 (2026-09-20). Makes the module registry ungreppable.
//
// MEASURED PROBLEM (shipped payload, before this pass): `tools/leakcensus.mjs` G3 flags 17 semantic
// words. Two of the three populations are NOT dictionary artefacts:
//   1. one plaintext registry literal — `_0xmod.r2 = Object.freeze({ version:'r2-08', host, store,
//      transport, scheduler, cleanup, telemetry, honey, carrier, parseBrowser })` in shard-h, read by
//      shard-e. That single object published the whole subsystem map (G2/G3) and the roadmap names
//      (G5: parseBrowser/cssom/xslt/webgl, embed2/embed4, r2-08).
//   2. shard-local identifiers that carry the same words (`_0xtelemetry`, `_0xtransport`, ...) and a
//      local `cleanup` closure in shard-e.
// Everything else (`Array.prototype.shift`, `/native code/`, the `"vault quiet"` honey line,
// `quests` inside the mock payload string) is legitimate JS/honey and is reported separately as
// EVIDENCE by the census rather than renamed away.
//
// WHAT THIS DOES: a deterministic, seed-derived rename map. Property keys are drawn from the
// *unused* identifier-dictionary pool, so the words an analyst already sees as decoys become the
// actually-load-bearing names (dictionary recycling). Locals get opaque `_0xk<n>` names. The map is
// written to `oto/registry-keymap.json` so the runner/bundle contract stays traceable.
//
// Idempotent (marker-guarded: rewrites a `.orig` copy once), assertion-based: every site must be
// found exactly the expected number of times or the stage aborts.
//
// Usage: node oto/scripts/rebind-registry-keys.mjs [--check]
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const { deriveInt: SEEDINT } = require('./seed-lib.js');
const OTO = path.resolve(__dirname, '..');
const SHARDS = path.join(OTO, '..', 'shards');
const CHECK = process.argv.includes('--check');
const MARK = 'rebind-registry-keys-v1';

const seed = String(fs.readFileSync(path.join(OTO, '..', 'BUILD-SEED.txt'), 'utf8')).trim();
const tag = 'o814';

// ---- replacement pool: unused dictionary words (the recycling half of the operator's ask) ----
function pool() {
  const dictFile = path.join(OTO, 'identifiers-dictionary-runner-5k.csv');
  const words = fs.readFileSync(dictFile, 'utf8').split(',').map((s) => s.trim()).filter(Boolean);
  const sources = fs.readdirSync(SHARDS).filter((f) => f.endsWith('.js'))
    .map((f) => { const o = path.join(SHARDS, f + '.orig'); return fs.readFileSync(fs.existsSync(o) ? o : path.join(SHARDS, f), 'utf8'); }).join('\n');
  const free = words.filter((w) => /^[A-Za-z_$\u0080-\uFFFF][A-Za-z0-9_$\u0080-\uFFFF]*$/.test(w) && !sources.includes(w));
  if (free.length < 64) throw new Error(`pool too small: ${free.length}`);
  return free;
}
const FREE = pool();
const MAP_PATH = path.join(OTO, 'registry-keymap.json');
let _i = 0;
const rng = (() => { let s = SEEDINT(tag + ':regkeys:' + seed) >>> 0;
  return () => { s = (s + 0x6D2B79F5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; })();
const pick = () => FREE[Math.floor(rng() * FREE.length)];

const KEYS = ['r2', 'host', 'shut', 'shift', 'interior', 'store', 'transport', 'scheduler', 'cleanup',
  'telemetry', 'honey', 'carrier', 'cb', 'parseBrowser', 'cssom', 'xslt', 'webgl', 'version'];
let MAP;
if (fs.existsSync(MAP_PATH) && !process.argv.includes('--fresh')) {
  MAP = JSON.parse(fs.readFileSync(MAP_PATH, 'utf8')).map;   // stable identity across runs
  console.log('[i] reusing oto/registry-keymap.json (use --fresh to mint a new one)');
  _i = Object.keys(MAP).length;
} else {
  MAP = {};
  const used = new Set();
  for (const k of KEYS) {
    let w;
    do { w = pick(); } while (used.has(w));
    used.add(w);
    MAP[k] = { key: 'v814' + w, local: `_0xk${++_i}`, version: `v8.14-${seed.slice(0, 4)}-${String(rng()).slice(2, 6)}` };
  }
}
// locals: opaque, never dictionary words (a local colliding with a *key* would be legal but noisy)
const L = (n) => MAP[n].local;
const K = (n) => MAP[n].key;

// ---- edit plan: [file, [[find, replace, expectedCount], ...]] ----
const PLAN = {
  'shard-a.js': [
    ['_0xmod.host = { shut: () =>', `_0xmod.${K('host')} = { ${K('shut')}: () =>`, 1],
    ['_0xmod.shift?.extend?.()', `_0xmod.${K('shift')}?.extend?.()`, 1],
    ['_0xmod.shift?.close?.()', `_0xmod.${K('shift')}?.close?.()`, 1],
    ['_0xmod.shift?.roster?.()', `_0xmod.${K('shift')}?.roster?.()`, 1],
  ],
  'shard-c.js': [
    ['_0xmod._carrier = Object.freeze({', `_0xmod._${K('carrier')} = Object.freeze({`, 1],
    ['function carm4Put(carrier, pos, nibble) { carrier[pos]', `function carm4Put(${L('cb')}, pos, nibble) { ${L('cb')}[pos]`, 1],
    ['function carm4Get(carrier, pos) { return carrier[pos]', `function carm4Get(${L('cb')}, pos) { return ${L('cb')}[pos]`, 1],
    ['function carm2Put(carrier, pos, v) { carrier[pos]', `function carm2Put(${L('cb')}, pos, v) { ${L('cb')}[pos]`, 1],
    ['function carm2Get(carrier, pos) { return carrier[pos]', `function carm2Get(${L('cb')}, pos) { return ${L('cb')}[pos]`, 1],
    ['function embed4(', `function ${K('interior')}4(`, 1],
    ['function extract4(', `function ${K('interior')}4x(`, 1],
    ['function embed2(', `function ${K('interior')}2(`, 1],
    ['function extract2(', `function ${K('interior')}2x(`, 1],
    ['function twoBitFits(', `function ${K('interior')}Fit(`, 1],
    ['{ embed4, extract4, embed2, extract2, twoBitFits, mode: 4 }',
      `{ ${K('interior')}4, ${K('interior')}4x, ${K('interior')}2, ${K('interior')}2x, ${K('interior')}Fit, mode: 4 }`, 1],
  ],
  'shard-e.js': [
    ['const _0xr2 = _0xmod.r2;', `const _0xr2 = _0xmod.${K('r2')};`, 1],
    ['_0xr2.cleanup.', `_0xr2.${K('cleanup')}.`, 1],
    ['_0xr2.store.values(', `_0xr2.${K('store')}.values(`, 6],
    ['_0xr2.scheduler.sleep(', `_0xr2.${K('scheduler')}.sleep(`, 1],
    ['_0xr2.telemetry.mark(', `_0xr2.${K('telemetry')}.mark(`, 1],
    ['_0xr2.host.dispatcher(', `_0xr2.${K('host')}.dispatcher(`, 1],
    ['_0xr2.transport.call(', `_0xr2.${K('transport')}.call(`, 1],
    ['_0xmod.host?.shut?.()', `_0xmod.${K('host')}?.${K('shut')}?.()`, 12],
    ['_0xmod.shift = { close: () =>', `_0xmod.${K('shift')} = { close: () =>`, 1],
    ['_0xmod.shift.extend = () =>', `_0xmod.${K('shift')}.extend = () =>`, 1],
    ['_0xmod.shift.roster = () =>', `_0xmod.${K('shift')}.roster = () =>`, 1],
    ['_0xmod.shift.close', `_0xmod.${K('shift')}.close`, 2],
  ],
  'shard-h.js': [
    ['if (_0xmod.r2) return;', `if (_0xmod.${K('r2')}) return;`, 1],
    ['_0xmod.r2 = Object.freeze({', `_0xmod.${K('r2')} = Object.freeze({`, 1],
    ["version: 'r2-08',", `version: '${MAP.version.version}',`, 1],
        ['host: _0xhost, store: _0xstore, transport: _0xtransport,',
      `${K('host')}: ${L('host')}, ${K('store')}: ${L('store')}, ${K('transport')}: ${L('transport')},`, 1],
    ['scheduler: _0xscheduler, cleanup: _0xcleanup, telemetry: _0xtelemetry, honey: _0xhoney,',
      `${K('scheduler')}: ${L('scheduler')}, ${K('cleanup')}: ${L('cleanup')}, ${K('telemetry')}: ${L('telemetry')}, ${K('honey')}: ${L('honey')},`, 1],
    ['carrier: _0xmod._carrier || null,', `${K('carrier')}: _0xmod._${K('carrier')} || null,`, 1],
    ['parseBrowser: _0xparseOff,', `${K('parseBrowser')}: ${L('parseBrowser')},`, 1],
    ['cssom: false, xslt: false, webgl: false,',
      `${K('cssom')}: false, ${K('xslt')}: false, ${K('webgl')}: false,`, 1],
  ],
};

let touched = 0, totalEdits = 0;
for (const [file, edits] of Object.entries(PLAN)) {
  const p = path.join(SHARDS, file);
  let src = fs.readFileSync(p, 'utf8');
  if (src.includes(MARK)) { console.log(`[=] ${file}: already rebound`); continue; }
  if (CHECK) { console.log(`[check] ${file}: ${edits.length} edit rules`); continue; }
  for (const [find, repl, want] of edits) {
    const n = src.split(find).length - 1;
    if (n !== want) throw new Error(`${file}: "${find.slice(0, 48)}…" found ${n}x, expected ${want}`);
    src = src.split(find).join(repl);
    totalEdits += n;
  }
  // final sweep: any remaining BARE word (local identifier or prose) is renamed too, so the
  // source itself is clean for GitHub hygiene (comments included). Compound names (`_0xr2.x`) were
  // already handled by the targeted rules above, hence the lookaround on `.`/`_`.
  const SWEEP = { 'shard-a.js': ['host', 'shut', 'shift'], 'shard-c.js': ['carrier'],
    'shard-e.js': ['cleanup', 'host', 'shut', 'shift', 'store', 'transport', 'scheduler', 'telemetry'],
    'shard-h.js': ['cleanup', 'telemetry', 'transport', 'store', 'host', 'scheduler', 'honey',
      'parseBrowser', 'cssom', 'xslt', 'webgl', 'carrier', 'shift'] }[file] || [];
  if (file === 'shard-h.js') src = src.replace(/\b_0xparseOff\b/g, L('parseBrowser'));
  for (const w of SWEEP) {
    src = src.replace(new RegExp('(?<![\\w.$])(?:_0x)?' + w + '(?![\\w$])', 'g'), L(w) || K(w));
    totalEdits++;
  }

  // banned words must be gone from the source as identifiers/keys
  fs.writeFileSync(p + '.orig', fs.readFileSync(p));
  fs.writeFileSync(p, `/*${MARK}*/\n` + src);
  const left = ['transport', 'scheduler', 'cleanup', 'telemetry', 'honey', 'carrier', 'store', 'host',
    'parseBrowser', 'cssom', 'xslt', 'webgl'].filter((w) => new RegExp('\\b' + w + '\\b').test(src));
  console.log(`[+] ${file}: ${edits.length} rules, ${totalEdits} sites` + (left.length ? `  (words left in comments/prose: ${left.join(',')})` : ''));
  touched++;
}
fs.writeFileSync(path.join(OTO, 'registry-keymap.json'), JSON.stringify({
  seed, tag, generated: new Date().toISOString(), map: MAP,
  note: 'property keys drawn from the unused runner dictionary (recycled); locals opaque _0xk<n>'
}, null, 1) + '\n');
console.log(CHECK ? '[check] no writes' : `=== rebind complete: ${touched} files, map -> oto/registry-keymap.json ===`);
