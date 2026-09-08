'use strict';
// Unit matrix: GoogleId + GoogleRoutes (colleague review point 5) against O8.3.js
const fs = require('fs');
const src = fs.readFileSync(process.argv[2] || '/home/user/o8cmp/O8.3.js', 'utf8');
const a = src.indexOf('const GoogleId = (v, what) => {');
const b = src.indexOf('const GoogleOS = (() => {', a);
if (a < 0 || b < 0) { console.error('anchors not found'); process.exit(2); }
const chunk = 'const _0xq2 = "P", _0xq3 = "Q", _0xq4 = "R", _0xq5 = "S";\n'
  + 'const _0xt0 = "T0", _0xt1 = "T1", _0xt2 = "T2", _0xt3 = "T3", _0xt4 = "T4";\n'
  + 'const Log = { diag: () => {}, warn: () => {} };\n'
  + src.slice(a, b) + '\nmodule.exports = { GoogleId, GoogleRoutes };';
fs.writeFileSync('/tmp/gid-mod.js', chunk);
const { GoogleId, GoogleRoutes } = require('/tmp/gid-mod.js');
let pass = 0, fail = 0;
const t = (name, cond, extra) => { if (cond) { pass++; console.log('PASS', name); } else { fail++; console.log('FAIL', name, extra || ''); } };
t('string id passthrough', GoogleId('abc123', 'questId') === 'abc123');
t('simple {id} wrapper', GoogleId({ id: 'w1' }, 'questId') === 'w1');
t('nested {application:{id}}', GoogleId({ application: { id: 'w2' } }, 'app') === 'w2');
t('nested {quest:{id}}', GoogleId({ quest: { id: 'w3' } }, 'questId') === 'w3');
t('applicationId alt', GoogleId({ applicationId: 'w4' }, 'app') === 'w4');
t('null -> null (fail closed)', GoogleId(null, 'questId') === null);
t('undefined -> null', GoogleId(undefined, 'questId') === null);
t('object without ids -> null', GoogleId({ foo: 'bar' }, 'questId') === null);
t('number -> string', GoogleId(12345, 'questId') === '12345');
t('route videoProgress ok', GoogleRoutes.videoProgress('q9') === 'Pq9Q');
t('route videoProgress null-safe', GoogleRoutes.videoProgress(null) === null);
t('route heartbeat null-safe', GoogleRoutes.heartbeat(undefined) === null);
t('applicationsUrl nested ok', GoogleRoutes.applicationsUrl({ application: { id: 'a1' } }) === 'Sa1');
console.log(`--- GoogleId matrix: ${pass}/${pass + fail} passed ---`);
process.exit(fail ? 1 : 0);
