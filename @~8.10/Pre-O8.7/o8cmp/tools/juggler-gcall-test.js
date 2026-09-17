'use strict';
// Unit matrix: GoogleCall URL fail-closed behavior (colleague review point 5)
const fs = require('fs');
const src = fs.readFileSync(process.argv[2] || '/home/user/o8cmp/builds/O8.3.js', 'utf8');
const i = src.indexOf('const GoogleCall = (fn, critical = false) => async (opts) => {');
const j = src.indexOf('const GooglePostSafe', i);
if (i < 0 || j < 0) { console.error('anchors not found'); process.exit(2); }
const pre = 'const Log = { diag: () => {}, warn: () => {}, say: () => {} };\n'
  + 'const signal = { aborted: false };\n'
  + 'const controller = { abort: () => {} };\n'
  + 'let _0xheat = 1;\n'
  + 'const GoogleDelay = async () => {};\n';
const code = pre + src.slice(i, j) + '\nmodule.exports = { GoogleCall };';
const m = new module.constructor();
m._compile(code, 'gcall.js');
const { GoogleCall } = m.exports;
let pass = 0, fail = 0;
const t = (name, cond, extra) => { if (cond) { pass++; console.log('PASS', name); } else { fail++; console.log('FAIL', name, extra || ''); } };
(async () => {
  let c1 = 0;
  const ok = await GoogleCall(async () => { c1++; return { body: { ok: 1 } }; })({ url: '/quests/x/video-progress' });
  t('valid relative url passes through', c1 === 1 && ok.body.ok === 1, JSON.stringify(ok));
  let c2 = 0;
  const s2 = await GoogleCall(async () => { c2++; return {}; })({ url: null });
  t('null url skipped, no request fired', c2 === 0 && s2.skipped === true, JSON.stringify(s2));
  let c3 = 0;
  const s3 = await GoogleCall(async () => { c3++; return {}; })({ url: '[object Object]' });
  t('garbage url skipped', c3 === 0 && s3.skipped === true);
  let c4 = 0;
  const s4 = await GoogleCall(async () => { c4++; return {}; })({ url: 'https://evil.example/x' });
  t('absolute URL skipped (relative-only policy)', c4 === 0 && s4.skipped === true);
  let c5 = 0;
  const s5 = await GoogleCall(async () => { c5++; return {}; })({});
  t('missing url skipped', c5 === 0 && s5.skipped === true);
  console.log(`--- GoogleCall matrix: ${pass}/${pass + fail} passed ---`);
  process.exit(fail ? 1 : 0);
})();
