// run-jsc.js — one uniform JSConfuser (js-confuser 2.1.3) pass over the WHOLE
// stitched body. Custom moderate config: uniform renames across all shards,
// single-line compact output, strings concealed, numbers -> expressions.
// Keep: renameGlobals off (web invariant), no eval/Function-based features
// (pack off), no control-flow-flattening/dispatcher (async engine + signature).
'use strict';
const fs = require('fs');
const { obfuscate } = require('/home/user/o8cmp/seamless/jsc/node_modules/js-confuser');

const src = fs.readFileSync('/home/user/o8cmp/seamless/body.js', 'utf8');
const t0 = Date.now();
obfuscate(src, {
  target: 'browser',
  compact: true,
  minify: false,
  hexadecimalNumbers: true,
  renameVariables: true,
  renameGlobals: false,
  identifierGenerator: 'randomized',
  stringConcealing: true,
  stringEncoding: false,
  stringSplitting: false,
  duplicateLiteralsRemoval: false,
  calculator: true,
  flatten: true,
  deadCode: 0.02,
  globalConcealing: false,
  objectExtraction: false,
  movedDeclarations: false,
  variableMasking: false,
  dispatcher: 0,
  opaquePredicates: false,
  controlFlowFlattening: 0,
  astScrambler: false,
  pack: false,
}).then((res) => {
  const ms = Date.now() - t0;
  const out = res.code;
  const result = 'console.clear();\n' + out;
  fs.writeFileSync('/home/user/o8cmp/seamless/out-jsc.js', result);
  console.log(`jsc done in ${ms} ms, output ${result.length} B`);
}).catch((e) => { console.error('jsc FAILED:', e.message); process.exit(1); });
