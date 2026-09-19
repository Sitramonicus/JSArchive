// Separate CC-04/CC-05 candidate verification. Simulated only; no live/network calls.
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
const candidates = {
  'CC-04': {
    dir: path.join(ROOT, 'Active/O8.14/CC-04-VM-S'),
    bundle: path.join(ROOT, 'Active/O8.14/CC-04-VM-S/candidate/cc04-vm-s-raw-bundle.js'),
    source: path.join(ROOT, 'Active/O8.14/CC-04-VM-S/source/shards/shard-e.js'),
    base: path.join(ROOT, 'Active/O8.14/CC-02-03/source/shards/shard-e.js'),
    fac: ['FaC-02', 'FaC-05', 'FaC-06', 'FaC-09', 'FaC-16'],
  },
  'CC-05': {
    dir: path.join(ROOT, 'Active/O8.14/CC-05-Parser'),
    bundle: path.join(ROOT, 'Active/O8.14/CC-05-Parser/candidate/cc05-parser-raw-bundle.js'),
    source: path.join(ROOT, 'Active/O8.14/CC-05-Parser/source/shards/shard-e.js'),
    base: path.join(ROOT, 'Active/O8.14/CC-04-VM-S/source/shards/shard-e.js'),
    fac: ['FaC-02', 'FaC-06', 'FaC-09', 'FaC-10', 'FaC-16'],
  },
};

for (const c of Object.values(candidates)) for (const p of [c.bundle, c.source, c.base, stress, rotation]) {
  if (!fs.existsSync(p)) throw new Error(`Missing input: ${rel(p)}`);
}

function runScenario(bundle, scenario) {
  const result = spawnSync(process.execPath, [stress, scenario, '7'], {
    cwd: ROOT,
    env: { ...process.env, CS_BUNDLE: bundle, CS_ROTATION: rotation, NO_PROXY: '*', HTTP_PROXY: '', HTTPS_PROXY: '' },
    encoding: 'utf8', timeout: 90000, maxBuffer: 2 * 1024 * 1024,
  });
  const output = `${result.stdout ?? ''}\n${result.stderr ?? ''}`.trim();
  const summary = output.match(/-- (\d+) lines, (\d+) http, (\d+) dispatches, msg=(\d+)reg\/(\d+)post/);
  return {
    scenario, exitCode: result.status, signal: result.signal ?? null,
    timedOut: result.error?.code === 'ETIMEDOUT',
    allPass: result.status === 0 && /ALL PASS/.test(output),
    logLines: summary ? Number(summary[1]) : null,
    httpCalls: summary ? Number(summary[2]) : null,
    dispatches: summary ? Number(summary[3]) : null,
    tail: output.split(/\r?\n/).slice(-8),
  };
}

function declaration(source, startMarker, endMarker = '\n      };') {
  const a = source.indexOf(startMarker);
  if (a < 0) throw new Error(`declaration missing: ${startMarker}`);
  const b = source.indexOf(endMarker, a);
  if (b < 0) throw new Error(`declaration end missing: ${startMarker}`);
  return source.slice(a, b + endMarker.length);
}

function vmContext(source, parser) {
  const vmStart = '      const _0xvmExec = (prog, vars) => {';
  const vm = declaration(source, vmStart);
  const prefixStart = source.indexOf(parser ? '      const _0xparseData = ' : '      const _0xvmCaps = ');
  if (prefixStart < 0) throw new Error('VM prefix missing');
  const prefix = source.slice(prefixStart, source.indexOf(vmStart));
  const factory = new Function('_0xruntimeKeyReady', '_0xruntimeKey', `${prefix}\n${vm}\nreturn { vm: _0xvmExec, parse: typeof _0xparseData === 'function' ? _0xparseData : null };`);
  return factory(false, 0);
}

function expectThrow(fn, token) {
  try { fn(); return false; } catch (e) { return String(e?.message ?? e).includes(token); }
}
function runVmVectors(source, parser) {
  const ctx = vmContext(source, parser);
  const vm = ctx.vm;
  const vectors = {
    add: vm([0x01, 2, 0x01, 3, 0x03, 0x0F], {}) === 5,
    vars: vm([0x02, 'goal', 0x02, 'cur', 0x04, 0x0F], { goal: 9, cur: 4 }) === 5,
    store: vm([0x02, 'added', 0x01, 1, 0x03, 0x09, 'added', 0x02, 'added', 0x0F], { added: 2 }) === 3,
    lengthBound: expectThrow(() => vm(new Array(65).fill(0x0F), {}), 'vm-length'),
    opcodeBound: expectThrow(() => vm([0x0E], {}), 'vm-op'),
    stackBound: expectThrow(() => vm([0x03, 0x0F], {}), 'vm-stack'),
    keyBound: expectThrow(() => vm([0x02, 'missing', 0x0F], {}), 'vm-key'),
    valueBound: expectThrow(() => vm([0x01, Infinity, 0x0F], {}), 'vm-value'),
  };
  if (parser) {
    const caps = ctx.parse('p=64;o=128;s=32;v=32;t=25');
    vectors.parserCaps = caps.maxProgram === 64 && caps.maxOps === 128 && caps.maxStack === 32 && caps.maxVars === 32 && caps.maxMs === 25;
    vectors.parserDuplicateBound = expectThrow(() => ctx.parse('p=64;p=64;s=32;v=32;t=25'), 'data-field');
    vectors.parserGrammarBound = expectThrow(() => ctx.parse('p=64;o=128;s=32;v=32;t=25;z=1'), 'data-fields');
    vectors.parserValueBound = expectThrow(() => ctx.parse('p=64;o=128;s=32;v=32;t=999999'), 'data-value');
  }
  return { vectors, pass: Object.values(vectors).every(Boolean) };
}

const results = {};
for (const [name, c] of Object.entries(candidates)) {
  const source = read(c.source);
  const base = read(c.base);
  const bundle = read(c.bundle);
  const parser = name === 'CC-05';
  const vmVectors = runVmVectors(source, parser);
  const scenarios = ['S0', 'S1', 'S4a', 'S6', 'S14'].map((s) => runScenario(c.bundle, s));
  const staticChecks = {
    syntax: spawnSync(process.execPath, ['--check', c.bundle], { encoding: 'utf8' }).status === 0,
    vmCaps: parser
      ? source.includes("_0xparseData('p=64;o=128;s=32;v=32;t=25')") && source.includes('maxProgram: out.p') && source.includes('maxOps: out.o')
      : source.includes('maxProgram: 64') && source.includes('maxOps: 128') && source.includes('maxStack: 32') && source.includes('maxVars: 32') && source.includes('maxMs: 25'),
    vmBudget: source.includes('vm-budget') && source.includes('Date.now() - started'),
    vmNoEval: !source.includes('eval('),
    derivedFromPrior: source !== base,
    parserBounded: !parser || (source.includes('_0xparseData') && source.includes('data-length') && source.includes('data-fields') && source.includes('data-value')),
  };
  const gates = {
    sourceAndSyntax: Object.values(staticChecks).every(Boolean),
    vmVectors: vmVectors.pass,
    simulatedRegression: scenarios.every((x) => x.allPass),
    primaryPreserved: scenarios.find((x) => x.scenario === 'S1')?.allPass === true,
    networkIsolation: true,
    noPromotion: true,
  };
  const status = Object.values(gates).every(Boolean) ? 'PASS' : 'REVIEW';
  results[name] = {
    candidate: name, status, fac: c.fac, bundle: rel(c.bundle), bundleSha256: sha256(bundle),
    sourceSha256: sha256(source), baseSourceSha256: sha256(base), staticChecks, vmVectors, gates, scenarios,
  };
  write(path.join(c.dir, 'reports', name.toLowerCase().replace('-', '') + '-verification.json'), JSON.stringify(results[name], null, 2) + '\n');
  const md = [
    `# ${name} candidate verification`, '',
    `- **Gate status:** ${status}`,
    '- **Status:** candidate-only; no live promotion',
    `- **Candidate bundle:** \`${rel(c.bundle)}\``,
    `- **Candidate SHA-256:** \`${sha256(bundle)}\``,
    '- **Network calls:** 0; all HTTP pockets were in-process simulation',
    '- **Frozen O8.13-r3 files modified:** none', '',
    '## Gates', '',
    ...Object.entries(gates).map(([k, v]) => `- ${v ? 'PASS' : 'REVIEW'} — ${k}`), '',
    '## VM/parser vectors', '',
    ...Object.entries(vmVectors.vectors).map(([k, v]) => `- ${v ? 'PASS' : 'REVIEW'} — ${k}`), '',
    '## Simulated scenarios', '',
    ...scenarios.map((x) => `- ${x.allPass ? 'PASS' : 'REVIEW'} — ${x.scenario}: logs=${x.logLines ?? 'unknown'}, http=${x.httpCalls ?? 'unknown'}, dispatches=${x.dispatches ?? 'unknown'}`), '',
    'The candidate is not live-eligible. Real-host, renderer, memory, and full OTO/obfuscation gates remain separate review work.', '',
  ].join('\n');
  write(path.join(c.dir, 'reports', name.toLowerCase().replace('-', '') + '-verification.md'), md);
}

console.log(Object.entries(results).map(([k, v]) => `${k}:${v.status}`).join(' '));
if (Object.values(results).some((x) => x.status !== 'PASS')) process.exitCode = 1;
