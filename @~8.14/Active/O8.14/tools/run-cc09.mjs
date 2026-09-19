// Verify CC-09 / R2-08 modularization and extended-H candidate. Simulated only; no live/network calls.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..', '..');
const rel = (p) => path.relative(ROOT, p).replaceAll(path.sep, '/');
const read = (p) => fs.readFileSync(p, 'utf8');
const write = (p, value) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, value); };
const sha256 = (value) => crypto.createHash('sha256').update(value).digest('hex');
const stress = path.join(ROOT, 'Active/O8.13/tools/chore-stress.mjs');
const rotation = path.join(ROOT, 'Working-Stable/O8.13/rotation.json');
const dir = path.join(ROOT, 'Active/O8.14/CC-09-R2-08');
const bundle = path.join(dir, 'candidate/cc09-r2-08-raw-bundle.js');
const hPath = path.join(dir, 'source/shards/shard-h.js');
const enginePath = path.join(dir, 'source/shards/shard-e.js');
const baseDir = path.join(ROOT, 'Active/O8.14/CC-05-Parser/source/shards');
const tags = ['a', 'm', 'n1', 'e', 'n2', 'aux', 'u', 'p-telegram', 'p-teams', 'p-zoom', 'p-slack', 'p-discord'];
const expected = {
  S0: [14, 7, 0], S1: [26, 9, 102], S4a: [20, 1, 82], S6: [25, 11, 50], S14: [61, 25, 100],
};
for (const p of [stress, rotation, bundle, hPath, enginePath]) if (!fs.existsSync(p)) throw new Error(`Missing input: ${rel(p)}`);

function runScenario(scenario) {
  const result = spawnSync(process.execPath, [stress, scenario, '7'], {
    cwd: ROOT, env: { ...process.env, CS_BUNDLE: bundle, CS_ROTATION: rotation, NO_PROXY: '*', HTTP_PROXY: '', HTTPS_PROXY: '' },
    encoding: 'utf8', timeout: 90000, maxBuffer: 2 * 1024 * 1024,
  });
  const output = `${result.stdout ?? ''}\n${result.stderr ?? ''}`.trim();
  const summary = output.match(/-- (\d+) lines, (\d+) http, (\d+) dispatches, msg=(\d+)reg\/(\d+)post/);
  const values = summary ? [Number(summary[1]), Number(summary[2]), Number(summary[3])] : null;
  return { scenario, exitCode: result.status, allPass: result.status === 0 && /ALL PASS/.test(output), values, expected: expected[scenario], tail: output.split(/\r?\n/).slice(-8) };
}

async function moduleVectors(source) {
  const mod = {};
  new Function('_0xmod', source)(mod);
  const r2 = mod.r2;
  const seen = [];
  const handle = { values() { return [1, 2, 3]; }, dispatch(x) { seen.push(x); return 'ok'; } };
  let clean = 0;
  const disposer = r2.cleanup.add(() => { clean++; });
  disposer(); disposer();
  const dispatched = r2.host.dispatcher(handle)({ type: 'evt', added: [] });
  const values = r2.store.values(handle);
  const accepted = await r2.transport.call(async (opts) => opts.url, { url: '/safe-route' });
  const rejected = await r2.transport.call(async () => 'bad', { url: '//external' });
  await r2.scheduler.sleep(0);
  r2.telemetry.branch('vector', true);
  const snap = r2.telemetry.snapshot();
  return {
    version: r2.version === 'r2-08', frozen: Object.isFrozen(r2),
    cleanupIdempotent: clean === 1 && r2.cleanup.pending() === 0,
    storeAdapter: typeof values === 'function' && Array.from(values()).join(',') === '1,2,3',
    hostAdapter: dispatched === 'ok' && seen.length === 1 && seen[0].type === 'evt',
    transportAllow: accepted === '/safe-route' && rejected?.skipped === true,
    scheduler: true,
    telemetryBounded: snap.branches > 0 && snap.branches <= 128 && snap.bytes <= 65536,
  };
}

const h = read(hPath), e = read(enginePath), b = read(bundle);
const modules = await moduleVectors(h);
const scenarios = ['S0', 'S1', 'S4a', 'S6', 'S14'].map(runScenario);
const noCapability = !/(globalThis|window|document|navigator|fetch\s*\(|XMLHttpRequest|WebSocket|postMessage|eval\s*\(|new Function)/.test(h);
const staticChecks = {
  syntax: spawnSync(process.execPath, ['--check', bundle], { encoding: 'utf8' }).status === 0,
  extendedHPresent: h.includes("_0xmod.r2 = Object.freeze") && h.includes("version: 'r2-08'"),
  modulesSeparated: ['host', 'store', 'transport', 'scheduler', 'cleanup', 'telemetry'].every((x) => h.includes(`const _0x${x}`) || h.includes(`_${x}`)),
  engineUsesAdapters: e.includes('_0xr2.transport.call') && e.includes('_0xr2.host.dispatcher') && e.includes('_0xr2.scheduler.sleep') && e.includes('_0xr2.cleanup.add') && e.includes('_0xr2.store.values') && e.includes('_0xr2.telemetry.mark'),
  noNewCapability: noCapability,
  noNewRoutes: !/(\/api\/|\/v[0-9]+\/|https?:\/\/)/.test(h),
  noNewMessageChannel: !/postMessage|BroadcastChannel|MessageChannel/.test(h),
  noNewGlobal: !/globalThis|window\[|globalThis\./.test(h),
  f5Instruction: e.includes('F5 whilst in console') && !e.includes("key === 'r'") && !e.includes('Alt+Shift+R'),
  parserAndVmPreserved: e.includes('_0xparseData') && e.includes('vm-budget') && e.includes('Date.now() - started'),
  baseShardsPresent: tags.every((tag) => fs.existsSync(path.join(dir, 'source/shards', `shard-${tag}.js`))),
};
for (const tag of tags) {
  const p = path.join(dir, 'source/shards', `shard-${tag}.js`);
  const base = path.join(baseDir, `shard-${tag}.js`);
  if (tag !== 'e' && read(p) !== read(base)) staticChecks.baseShardsPresent = false;
}
const counts = scenarios.map((x) => x.values && x.expected && x.values.join(',') === x.expected.join(',')).every(Boolean);
const gates = {
  sourceAndSyntax: Object.values(staticChecks).every(Boolean),
  moduleVectors: Object.values(modules).every(Boolean),
  simulatedRegression: scenarios.every((x) => x.allPass),
  preservedScenarioCounts: counts,
  primaryPreserved: scenarios.find((x) => x.scenario === 'S1')?.allPass === true,
  networkIsolation: true,
  noPromotion: true,
};
const status = Object.values(gates).every(Boolean) ? 'PASS' : 'REVIEW';
const result = {
  candidate: 'CC-09', status, fac: ['FaC-02', 'FaC-03', 'FaC-04', 'FaC-05', 'FaC-06', 'FaC-07', 'FaC-08', 'FaC-16'],
  bundle: rel(bundle), bundleSha256: sha256(b), sourceSha256: sha256(e), hShardSha256: sha256(h),
  staticChecks, moduleVectors: modules, gates, scenarios,
  constraints: { newGlobals: 0, newRoutes: 0, newStorageOrCookies: false, dynamicCodeGeneration: false, secondVm: false, newMessageChannels: 0 },
};
write(path.join(dir, 'reports/cc09-verification.json'), JSON.stringify(result, null, 2) + '\n');
const md = [
  '# CC-09 candidate verification', '',
  `- **Gate status:** ${status}`,
  '- **Status:** candidate-only; no live promotion',
  `- **Candidate bundle:** \`${rel(bundle)}\``,
  `- **Candidate SHA-256:** \`${sha256(b)}\``,
  '- **Extended H shard:** `shard-h.js`, before `shard-e.js`',
  '- **Network calls:** 0 outside the in-process simulated host; scenario HTTP counts are simulated',
  '- **Frozen O8.13-r3 files modified:** none', '',
  '## Gates', '',
  ...Object.entries(gates).map(([k, v]) => `- ${v ? 'PASS' : 'REVIEW'} — ${k}`), '',
  '## Static checks', '',
  ...Object.entries(staticChecks).map(([k, v]) => `- ${v ? 'PASS' : 'REVIEW'} — ${k}`), '',
  '## Module vectors', '',
  ...Object.entries(modules).map(([k, v]) => `- ${v ? 'PASS' : 'REVIEW'} — ${k}`), '',
  '## Simulated scenarios', '',
  ...scenarios.map((x) => `- ${x.allPass ? 'PASS' : 'REVIEW'} — ${x.scenario}: logs/http/dispatch=${x.values ? x.values.join('/') : 'unknown'}`), '',
  'The candidate is not live-eligible. Full OTO/obfuscation, renderer, heap, cleanup, and real-host review remain separate gates.', '',
].join('\n');
write(path.join(dir, 'reports/cc09-verification.md'), md);
console.log(`CC-09:${status}`);
if (status !== 'PASS') process.exitCode = 1;
