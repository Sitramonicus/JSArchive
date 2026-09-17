// obf-v2-jsc.js — VARIANT 2: js-confuser per-piece, engine rotation diversity.
// Same config intent as before, BUT each piece now obfuscates in its OWN child
// process: js-confuser keeps module-level NameGen state across obfuscate() calls
// in one process, which produced rare broken outputs (String[b(...)] is not a
// function) when several pieces ran in sequence. Per-process isolation removed
// the failure (verified over repeated full runs).
//
// Per-piece differences:
//   a   mangled names, hex numbers        (ordinary-looking foundation)
//   m   hex identifiers, calculator       (membercount hex shard)
//   n1  randomized names, string splitting (camo noise)
//   e   randomized names                  (engine; conceal only)
//   n2  zeroWidth identifiers, splitting  (camo noise; ZW cosmetic)
//   aux randomized, splitting, hex numbers (plain-looking contrast)
// NOTE: js-confuser is NOT seedable — outputs are fresh each run; pin hashes.
// FROZEN 2026-09-12 (Stego-3 G4): v2 outputs are PINNED, not rebuilt —
// build-s4-final-package.js hash-checks oto/v2-jsc/shard-m-out.js (the only
// consumed v2 piece) and the cascade no longer runs this script. To refresh:
// run this script, re-green battery, update EXPECTED_V2_M in build-s4.
'use strict';
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..', '..', '..', '..');
const O86 = path.join(REPO, 'Active', 'O8.6');
const SRC = path.join(O86, 'oto', 'g7-strings'); // O8.9 G7
const OUT = path.join(O86, 'oto', 'v2-jsc');
const JO_PATH = path.join(REPO, 'Active', 'engines', 'node_modules', 'js-confuser');

const COMMON = {
  target: 'browser',
  compact: true,
  minify: false,
  renameVariables: true,
  renameGlobals: false,
  stringConcealing: true,
  stringEncoding: false,
  stringSplitting: false,
  duplicateLiteralsRemoval: false,
  deadCode: 0,
  dispatcher: 0,
  opaquePredicates: false,
  controlFlowFlattening: 0,
  astScrambler: false,
  pack: false,
  globalConcealing: false,
  variableMasking: false,
  objectExtraction: false,
  movedDeclarations: false,
  flatten: false,
};

const PIECES = {
  a:   { identifierGenerator: 'mangled',  hexadecimalNumbers: true,  calculator: false },
  m:   { identifierGenerator: 'hexadecimal', calculator: true },
  n1:  { identifierGenerator: 'randomized', stringSplitting: 0.4, hexadecimalNumbers: true },
  e:   { identifierGenerator: 'randomized' },
  n2:  { identifierGenerator: 'zeroWidth', stringSplitting: 0.4 },
  // aux: mangled + calculator collided with js-confuser's own conceal decoders
  // (e is not a function) - use randomized + splitting + hex for contrast instead.
  aux: { identifierGenerator: 'randomized', stringSplitting: 0.3, hexadecimalNumbers: true, calculator: false },
  // O8.11 pockets: p-zoom mounded heavy (v2-jsc, distinct) — partially-levelled vs other pockets
  'p-zoom': { identifierGenerator: 'randomized', stringSplitting: 0.4, deadCode: 0.01, dispatcher: 0.01, controlFlowFlattening: 0.03, hexadecimalNumbers: true },
};

const RUNNER = `
const { obfuscate } = require(process.argv[1]);
const fs = require('fs');
const [tag, srcPath, outPath] = [process.argv[2], process.argv[3], process.argv[4]];
const opts = JSON.parse(process.argv[5]);
(async () => {
  const src = fs.readFileSync(srcPath, 'utf8');
  opts.renameVariables = (name) => {
    if (name === "会員" || name === "lexMode") return false; // O8.9 G8
    return true;
  };
  const res = await obfuscate(src, opts);
  fs.writeFileSync(outPath, res.code);
  console.log(tag + ':' + src.length + ':' + res.code.length);
})().catch(e => { console.error('FAIL', tag, e && e.message); process.exit(1); });
`;

fs.mkdirSync(OUT, { recursive: true });
for (const [tag, extra] of Object.entries(PIECES)) {
  const srcPath = path.join(SRC, `shard-${tag}.js`);
  const outPath = path.join(OUT, `shard-${tag}-out.js`);
  const srcLen = fs.statSync(srcPath).size;
  const t0 = Date.now();
  const line = execFileSync(process.execPath, ['-e', RUNNER, JO_PATH, tag, srcPath, outPath, JSON.stringify({ ...COMMON, ...extra })], { encoding: 'utf8' }).trim();
  const [t, sLen, oLen] = line.split(':');
  const ms = Date.now() - t0;
  console.log(`shard-${t}: ${(Number(sLen) / 1024).toFixed(1)}KB -> ${(Number(oLen) / 1024).toFixed(1)}KB  (${(ms / 1000).toFixed(1)}s)  [${extra.identifierGenerator}]`);
}
console.log('v2 done ->', OUT);
