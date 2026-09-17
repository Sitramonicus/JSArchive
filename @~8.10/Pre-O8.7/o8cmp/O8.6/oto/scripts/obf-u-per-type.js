// obf-u-per-type.js — produce the unlock shard (u) under EACH OTO type, but only when
// the searchable marker 佐藤 結衣 survives. If a type cannot keep the marker literal,
// that type gets NO u (rule from the user, 2026-09-10).
//
// v1-jso-s3matrix : canonical agent pass (jso, stringArray OFF) — copied from u/ output
// v2-jsc          : js-confuser with ALL string transforms off (marker stays literal)
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const U_SRC = '/home/user/o8cmp/O8.6/shards-scrub5/shard-u.js';
const CANON = '/home/user/o8cmp/O8.6/oto/u/shard-u-out.js';

function verify(p, label) {
  const s = fs.readFileSync(p, 'utf8');
  let ok = true;
  try { execFileSync(process.execPath, ['--check', p], { stdio: 'pipe' }); }
  catch (e) { console.log(`  ${label}: SYNTAX FAIL`); ok = false; }
  const checks = {
    'marker ×1': s.split('佐藤 結衣').length - 1 === 1,
    'contiguous (no \\x20)': !s.includes('佐藤\\x20結衣'),
    'bridge synthesizer': s.includes('71, 111, 111, 103') || s.includes('0x47, 0x6f') || s.includes('0x47,0x6f') || s.includes('fromCharCode') || s.includes('_0xbridge'),
    'no GoogleUnlock': !s.includes('GoogleUnlock'),
  };
  for (const [k, v] of Object.entries(checks)) if (!v) { console.log(`  ${label}: FAIL ${k}`); ok = false; }
  console.log(`  ${label}: ${ok ? 'PASS' : 'REJECTED'} (${s.length} bytes) ${Object.entries(checks).map(([k,v])=>`${k}=${v}`).join(' ')}`);
  return ok;
}

const results = {};

// ---- v1: canonical copy (jso, stringArray off) ----
{
  const out = '/home/user/o8cmp/O8.6/oto/v1-jso-s3matrix/shard-u-out.js';
  fs.copyFileSync(CANON, out);
  results.v1 = verify(out, 'v1-jso-s3matrix/shard-u-out.js');
}

// ---- v2: js-confuser, ALL string transforms off ----
{
  const RUNNER = `
const { obfuscate } = require(process.argv[1]);
const fs = require('fs');
(async () => {
  const src = fs.readFileSync(process.argv[2], 'utf8');
  const res = await obfuscate(src, JSON.parse(process.argv[3]));
  fs.writeFileSync(process.argv[4], res.code);
})().catch(e => { console.error('FAIL', e && e.message); process.exit(1); });
`;
  const opts = {
    target: 'browser', compact: true, minify: false,
    renameVariables: true, renameGlobals: false,
    stringConcealing: false, stringEncoding: false, stringSplitting: false,
    duplicateLiteralsRemoval: false, deadCode: 0, dispatcher: 0, opaquePredicates: false,
    controlFlowFlattening: 0, astScrambler: false, pack: false, globalConcealing: false,
    variableMasking: false, objectExtraction: false, movedDeclarations: false, flatten: false,
    identifierGenerator: 'hexadecimal', hexadecimalNumbers: false,
  };
  const outP = '/home/user/o8cmp/O8.6/oto/v2-jsc/shard-u-out.js';
  try {
    execFileSync(process.execPath, ['-e', RUNNER,
      '/home/user/o8cmp/seamless/jsc/node_modules/js-confuser',
      U_SRC, JSON.stringify(opts), outP], { encoding: 'utf8' });
    let out2 = fs.readFileSync(outP, 'utf8');
    out2 = out2.split('\\u4F50\\u85E4 \\u7D50\\u8863').join('佐藤 結衣');
    fs.writeFileSync(outP, out2);
    results.v2 = verify(outP, 'v2-jsc/shard-u-out.js');
  } catch (e) {
    console.log('  v2-jsc/shard-u-out.js: ENGINE ERROR', e.message.split('\n')[0]);
    results.v2 = false;
  }
}

// drop rejected outputs so subfolders never carry a marker-broken u
for (const [type, ok] of Object.entries(results)) {
  const map = { v1: 'v1-jso-s3matrix', v2: 'v2-jsc' };
  const p = `/home/user/o8cmp/O8.6/oto/${map[type]}/shard-u-out.js`;
  if (!ok && fs.existsSync(p)) { fs.unlinkSync(p); console.log(`  removed (marker rule): ${p}`); }
}
console.log('u-per-type done.');
