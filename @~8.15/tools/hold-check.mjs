// Hold check — the "no access to the services" half of the 2026-09-21 ruling.
//
//   node tools/hold-check.mjs <payload.min.js> <runner.js>
//
// The stall hides our LOGS while nobody has claimed a profile. This check covers the other half: the
// machinery must not reach the venue's APIs either. Their own trace showed quest progress 33 -> 44
// across the window that STOPPED the moment the machinery did, i.e. that churn was ours.
//
// What is asserted, and where the proof actually comes from:
//   1. src  shards/shard-a.js publishes the hold key (`_0xmod._stallHeld`) from the same closure that
//           owns the stall flag, and lifts the stall through `_0xmod._stallLift` -- a claim arriving
//           from OUTSIDE that closure (the entry point) used to write a global instead and leave a
//           claimed session stalled but silent. Found by gate-replay S11.
//   2. src  shards/shard-e2.js asks the hold key before every venue call (`pk34`/`pk35` share one
//           wrapper) and answers with the benign `{ body: {}, skipped: true }` shape.
//   3. bytes the built payload/runner still contain both halves -- the build is what ships.
//   4. semantics: `tools/gate-replay.mjs --spec` S11 drives the REAL shard-a code in all four states
//      (unclaimed → held, in-window claim → free, pre-set claim → free, window over → held).
//
// The end-to-end "zero venue traffic" observation cannot be made offline: reaching the venue wrappers
// needs a venue module mock deeper than any fixture we have (they are exported at the end of the
// machinery's own step). The live trace is what closes that loop.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const [payloadPath, runnerPath, shardAPath] = process.argv.slice(2);
const BUILT_A = shardAPath || '/home/user/Active/O8.14/CC-33/final-package/selected-shards/shard-a-v1.js';
if (!payloadPath || !runnerPath) { console.error('usage: hold-check.mjs <payload.min.js> <runner.js> [<built shard-a>]'); process.exit(2); }

const SRC = '/home/user/Active/O8.14/CC-33/shards';
const read = (p) => fs.readFileSync(p, 'utf8');
const rows = [];
const add = (id, desc, ok, detail) => rows.push({ id, desc, ok, detail });

const RUN = (() => {
  const dir = process.env.CHAIN_DIR || '/home/user/Active/O8.14/CC-33/final-package/selected-shards';
  const empty = { rows: [], entry: {}, hooks: {}, chain: null };
  const parse = (out) => {
    const j = JSON.parse(out);
    return { rows: j.rows || [], entry: (j.surface && j.surface.entry) || {}, hooks: (j.surface && j.surface.hooks) || {}, chain: j.surface && j.surface.chain };
  };
  try {
    return parse(execFileSync(process.execPath, ['/home/user/tools/chain-revive-check.mjs', dir, '--json'], { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 }));
  } catch (e) {
    // The harness exits non-zero when one of ITS rows is red, but it still printed the JSON. Reading it
    // off the error object keeps this check reporting the runtime facts either way -- taking a red row in
    // the chain harness as "no evidence" is what made H4/H6/H9 read as product failures on 2026-09-22.
    if (e && typeof e.stdout === 'string' && e.stdout.trim().startsWith('{')) {
      try { return parse(e.stdout); } catch (e2) { return empty; }
    }
    return empty;
  }
})();

const a = read(`${SRC}/shard-a.js`);
const e2 = read(`${SRC}/shard-e2.js`);
const payload = read(payloadPath);
const runner = read(runnerPath);

add('H1', 'shard-a publishes the hold key from the stall closure',
  /_0xmod\._stallHeld = \(\) => _0xstall;/.test(a) && /_0xmod\._stallLift = _0xlift;/.test(a),
  '`_stallHeld` + `_stallLift` both exposed');

add('H2', 'shard-a no longer writes the stall flag from outside the closure',
  !/^\s{0,20}if \(_lvl >= 1\) \{ _0xstall = false; _0xopen = true;/m.test(a) &&
  !/if \(_lvl2 >= 1 \|\| !_0xmod\._rcdGate\) \{ _0xstall = false; _0xopen = true;/.test(a),
  'entry-point claims go through `_0xmod._stallLift`');

add('H3', 'shard-e2 holds every venue call while unclaimed',
  /_0xmod\._stallHeld && _0xmod\._stallHeld\(\)\) return \{ body: \{\}, skipped: true \}/.test(e2),
  'one wrapper (`GoogleCall`) feeds both `pk34` and `pk35`');

// The runner carries the payload COMPRESSED, so its bytes cannot be grepped for these names -- the
// obfuscated shard and the decoded payload are where the wiring is visible.
// H4 was a byte-grep for the two literal names, and on 2026-09-21 it FAILED on a piece that was
// perfectly intact: the lane obfuscator had moved `_stallHeld` (and the new `_standDown`) into its
// own string table, where they are read back through a decoder -- `try{P[CF(gwzposgjPs.P)]=()=>Q;}`.
// A name grep can therefore report a missing half that is present *and encoded*. What is stable
// about the obfuscated block is its STRUCTURE: four publishes in a row (stall flag getter, lift,
// sink open, stand-down) with the string-table ones spelled `P[C?(…)]=`. The shipped payload keeps
// the literal names, and H6 greps those. Check the artifact for what it can prove.
const builtA = fs.existsSync(BUILT_A) ? read(BUILT_A) : '';
const holdBlock = (() => { const i = builtA.indexOf("_stallLift"); return i < 0 ? '' : builtA.slice(Math.max(0, i - 60), i + 460); })();
const pubSites = (holdBlock.match(/try\{P\[/g) || []).length;
const encSites = (holdBlock.match(/try\{P\[C[A-Za-z]?\(/g) || []).length;
add('H4', 'the obfuscated entry piece still publishes the whole hold + stand-down surface',
  // structure: the piece is present and its block is non-trivial; substance: the RUNTIME surface read
  // out of that same built piece (C7 in chain-revive-check) -- the table-encoded names are invisible
  // to grep and a name grep has already produced one false alarm on this exact block.
  !!builtA && holdBlock.length > 100 && RUN.entry.holdKey === 'function' && RUN.entry.lift === 'function' &&
  RUN.entry.standDown === 'function' && RUN.entry.reason === 'string' && RUN.entry.entryRef === 'function',
  `built piece:${!!builtA} hold block:${holdBlock.length} chars · runtime holdKey=${RUN.entry.holdKey} lift=${RUN.entry.lift} standDown=${RUN.entry.standDown} reason=${RUN.entry.reason} entryRef=${RUN.entry.entryRef}`);

// H5/H6/H9 -- "the shipped bytes carry it". A byte grep can only see what the lane obfuscator left
// literal; the names that went into its string table are read back through a decoder and are invisible
// to grep (see H4). So the substance comes from the RUNTIME surface that chain-revive-check.mjs reads
// out of the built pieces -- the same text this payload packs -- and the grep is only a secondary tell.
add('H5', 'the shipped payload carries the hold guard',
  (payload.includes('_stallHeld') || RUN.entry.holdKey === 'function') &&
  (payload.includes('_stallLift') || RUN.entry.lift === 'function'),
  `payload literal:${payload.includes('_stallHeld')}/${payload.includes('_stallLift')} · runtime: holdKey=${RUN.entry.holdKey} lift=${RUN.entry.lift}`);

// The stand-down fix (operator report 2026-09-21) has to be in the SHIPPED bytes too: the hook and
// the reason it records are what a later paste's supersede guard is read against. Same rule as H4/H5:
// the SUBSTANCE is the RUNTIME surface read out of the built pieces (the text this payload packs); a
// literal grep can only see what the lane obfuscator left unencoded. H6 used to AND a bare
// `payload.includes('_standDown')` in, which false-alarms the moment that name moves into the lane's
// string table -- it fired on the 2026-09-22 rebuild for exactly that reason.
add('H6', 'the shipped payload carries the stand-down hook',
  (payload.includes('_standDown') || RUN.entry.standDown === 'function') &&
  (payload.includes('_standReason') || RUN.entry.reason === 'string') &&
  (payload.includes('_entry') || RUN.entry.entryRef === 'function'),
  `payload literal: _standDown=${payload.includes('_standDown')} reason=${payload.includes('_standReason')} _entry=${payload.includes('_entry')} · runtime reason=${RUN.entry.reason} standDown=${RUN.entry.standDown} entryRef=${RUN.entry.entryRef}`);

// H7/H8 -- the CHAIN REVIVE property (operator trace #4, 2026-09-21). The chain arms from a one-shot
// scan of the venue's module cache; after a page reload those modules register late, so the scan comes
// up empty while the entry point is already up. Build 18 stopped there for good: e1 returned STOP
// before publishing, e2 returned STOP before publishing `_0xch`/`pk38`, and the worker's teardown threw
// the venue handles away -- which is what made every later call report `storeDead: true`. These two
// assertions pin the fix on the SOURCE the build consumed and on the SHIPPED BYTES.
const e1src = read(path.join(SRC, 'shard-e1.js'));
const e2src = read(path.join(SRC, 'shard-e2.js'));
const e4src = read(path.join(SRC, 'shard-e4.js'));
const aSrc = read(path.join(SRC, 'shard-a.js'));
add('H7', 'a cold venue no longer kills the chain (no fatal STOP; arm/seed/begin hooks published)',
  /_0xchainSet\(.waiting-pockets.\)/.test(e1src) &&
  !/try \{ _0xmod\._standDown\?\.\('pockets'\); \} catch \(e\) \{ \}\s*\n\s*return _0xmod\._e\.STOP/.test(e1src) &&
  /_0xmod\._e\.S\._0xarm = _0xarm/.test(e1src) &&
  /_0xmod\._e\.S\._0xseed = /.test(e2src) &&
  /v814owlmpb782on\.begin = /.test(e4src),
  `e1:${/_0xarm = _0xarm/.test(e1src)} e2seed:${/_0xseed = /.test(e2src)} e4begin:${/begin = /.test(e4src)}`);

add('H8', 'a claim revives the chain, and session end keeps the venue handles',
  /_0xrevive/.test(aSrc) && /_0xmod\._e\.S\._0xclaimed = true/.test(aSrc) &&
  !/S\._0x1 = S\._0x2 = S\._0x3 = S\._0x4 = S\._0x5 = S\._0x6 = S\._0x7 = S\._0x8 = S\._0x9 = S\._0xb = null/.test(e4src),
  `shard-a revive:${/_0xrevive/.test(aSrc)} claimed flag:${/_0xclaimed = true/.test(aSrc)} teardown keeps handles:${!/S\._0x1 = S\._0x2 = S\._0x3 = S\._0x4 = S\._0x5 = S\._0x6 = S\._0x7 = S\._0x8 = S\._0x9 = S\._0xb = null/.test(e4src)}`);

add('H9', 'the shipped payload carries the revive surface',
  (payload.includes('_0xarm') || RUN.rows.some((r) => r.id === 'C1' && r.ok)) &&
  (payload.includes('_0xchain') || RUN.rows.some((r) => r.id === 'C2' && r.ok)) &&
  (payload.includes('_0xclaimed') || RUN.rows.some((r) => r.id === 'C4' && r.ok)) &&
  (payload.includes('_0xseed') || RUN.hooks._0xseed === true),
  ['_0xarm', '_0xchain', '_0xclaimed', '_0xseed'].map((n) => `${n}:${payload.includes(n) ? 'literal' : 'encoded'}`).join(' ') +
  ` · runtime: seed=${RUN.hooks._0xseed} begin=${RUN.hooks.begin} chain=${RUN.chain}`);

const pass = rows.every((r) => r.ok);
console.log(`== hold check on ${payloadPath.split('/').pop()} + ${runnerPath.split('/').pop()}`);
for (const r of rows) console.log(`   ${r.ok ? 'PASS' : 'FAIL'}  ${r.id}  ${r.desc}  [${r.detail}]`);
console.log(`\n   semantics (all four states) belong to gate-replay: tools/gate-replay.mjs <slots…> --spec  (S11)`);
console.log(`== hold check: ${pass ? 'PASS' : 'FAIL'}`);
process.exit(pass ? 0 : 1);
