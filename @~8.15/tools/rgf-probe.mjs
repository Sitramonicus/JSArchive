#!/usr/bin/env node
/**
 * rgf-probe.mjs — isolate the js-confuser `rgf` (runtime-generated functions) step.
 *
 * 2026-09-20: the live client threw `ReferenceError: EnFZv0 is not defined` from the stitched
 * payload. `EnFZv0` is a js-confuser randomized name; the call site shipped, the definition did not.
 * This re-runs JUST the jsc-rgf step of the mound-e lane on a given input and writes the result, so
 * the dangling-reference lint can say which stage produced the imbalance.
 *
 *   node tools/rgf-probe.mjs <input.js> <output.js>
 */
import fs from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire('/home/user/Active/engines/package.json');
const JSC = require('js-confuser');

const [input, output] = process.argv.slice(2);
if (!input || !output) { console.error('usage: rgf-probe.mjs <input.js> <output.js>'); process.exit(2); }

// exactly obf-mound-e.js's JSC_COMMON + rgf
const JSC_COMMON = {
  target: 'browser', compact: true, minify: false, renameVariables: true, renameGlobals: false,
  stringConcealing: true, stringEncoding: false, stringSplitting: false, duplicateLiteralsRemoval: false,
  deadCode: 0, dispatcher: 0, opaquePredicates: false, controlFlowFlattening: 0, astScrambler: false,
  pack: false, globalConcealing: false, variableMasking: false, objectExtraction: false,
  movedDeclarations: false, flatten: false,
};

const code = fs.readFileSync(input, 'utf8');
const r = await JSC.obfuscate(code, { ...JSC_COMMON, identifierGenerator: 'randomized', rgf: true });
fs.writeFileSync(output, r.code);
console.log(`rgf-probe: ${(code.length / 1024).toFixed(1)}KB -> ${(r.code.length / 1024).toFixed(1)}KB  Function( x${(r.code.match(/Function\(/g) || []).length}  -> ${output}`);
