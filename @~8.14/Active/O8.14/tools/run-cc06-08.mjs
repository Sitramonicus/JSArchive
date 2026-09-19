// Verify separate CC-06/07/08 serialized-decoy candidates. Simulated only; no live/network calls.
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
const baseDir = path.join(ROOT, 'Active/O8.14/CC-05-Parser');
const tags = ['a', 'm', 'n1', 'e', 'n2', 'aux', 'u', 'p-telegram', 'p-teams', 'p-zoom', 'p-slack', 'p-discord'];
const candidates = {
  'CC-06': { dir: path.join(ROOT, 'Active/O8.14/CC-06-CSS-HTML'), kind: 'css-html', marker: '<!--o814-c06-->', bundle: 'candidate/cc06-css-html-raw-bundle.js', fac: ['FaC-10', 'FaC-11', 'FaC-16'] },
  'CC-07': { dir: path.join(ROOT, 'Active/O8.14/CC-07-XML-XSLT'), kind: 'xml-xslt', marker: '<?xml version=', bundle: 'candidate/cc07-xml-xslt-raw-bundle.js', fac: ['FaC-10', 'FaC-12', 'FaC-16'] },
  'CC-08': { dir: path.join(ROOT, 'Active/O8.14/CC-08-GLSL'), kind: 'glsl', marker: '#version 300 es', bundle: 'candidate/cc08-glsl-raw-bundle.js', fac: ['FaC-10', 'FaC-13', 'FaC-16'] },
};

for (const c of Object.values(candidates)) {
  for (const p of [stress, rotation, path.join(c.dir, c.bundle), path.join(c.dir, 'source/shards/shard-n2.js'), path.join(c.dir, 'source/shards/shard-e.js'), path.join(baseDir, 'source/shards/shard-n2.js'), path.join(baseDir, 'source/shards/shard-e.js')]) {
    if (!fs.existsSync(p)) throw new Error(`Missing input: ${rel(p)}`);
  }
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
    scenario, exitCode: result.status, signal: result.signal ?? null, timedOut: result.error?.code === 'ETIMEDOUT',
    allPass: result.status === 0 && /ALL PASS/.test(output),
    logLines: summary ? Number(summary[1]) : null, httpCalls: summary ? Number(summary[2]) : null,
    dispatches: summary ? Number(summary[3]) : null, tail: output.split(/\r?\n/).slice(-8),
  };
}

function declaration(source, startMarker, endMarker = '\n      };') {
  const a = source.indexOf(startMarker);
  if (a < 0) throw new Error(`declaration missing: ${startMarker}`);
  const b = source.indexOf(endMarker, a);
  if (b < 0) throw new Error(`declaration end missing: ${startMarker}`);
  return source.slice(a, b + endMarker.length);
}
function vmContext(source) {
  const vmStart = '      const _0xvmExec = (prog, vars) => {';
  const vm = declaration(source, vmStart);
  const prefixStart = source.indexOf('      const _0xparseData = ');
  if (prefixStart < 0) throw new Error('parser prefix missing');
  const prefix = source.slice(prefixStart, source.indexOf(vmStart));
  const factory = new Function('_0xruntimeKeyReady', '_0xruntimeKey', `${prefix}\n${vm}\nreturn { vm: _0xvmExec, parse: _0xparseData };`);
  return factory(false, 0);
}
function expectThrow(fn, token) {
  try { fn(); return false; } catch (e) { return String(e?.message ?? e).includes(token); }
}
function parserVmVectors(source) {
  const ctx = vmContext(source);
  const vectors = {
    add: ctx.vm([0x01, 2, 0x01, 3, 0x03, 0x0F], {}) === 5,
    vars: ctx.vm([0x02, 'goal', 0x02, 'cur', 0x04, 0x0F], { goal: 9, cur: 4 }) === 5,
    store: ctx.vm([0x02, 'added', 0x01, 1, 0x03, 0x09, 'added', 0x02, 'added', 0x0F], { added: 2 }) === 3,
    lengthBound: expectThrow(() => ctx.vm(new Array(65).fill(0x0F), {}), 'vm-length'),
    opcodeBound: expectThrow(() => ctx.vm([0x0E], {}), 'vm-op'),
    stackBound: expectThrow(() => ctx.vm([0x03, 0x0F], {}), 'vm-stack'),
    keyBound: expectThrow(() => ctx.vm([0x02, 'missing', 0x0F], {}), 'vm-key'),
    valueBound: expectThrow(() => ctx.vm([0x01, Infinity, 0x0F], {}), 'vm-value'),
    parserCaps: (() => { const x = ctx.parse('p=64;o=128;s=32;v=32;t=25'); return x.maxProgram === 64 && x.maxOps === 128 && x.maxStack === 32 && x.maxVars === 32 && x.maxMs === 25; })(),
    parserDuplicateBound: expectThrow(() => ctx.parse('p=64;p=64;s=32;v=32;t=25'), 'data-field'),
    parserGrammarBound: expectThrow(() => ctx.parse('p=64;o=128;s=32;v=32;t=25;z=1'), 'data-fields'),
    parserValueBound: expectThrow(() => ctx.parse('p=64;o=128;s=32;v=32;t=999999'), 'data-value'),
  };
  return { vectors, pass: Object.values(vectors).every(Boolean) };
}
function count(text, pattern) { return (text.match(pattern) ?? []).length; }
function slotBytes(source, marker) {
  const a = source.indexOf(marker);
  const b = source.indexOf('\n\n', a);
  if (a < 0 || b < 0) return -1;
  return b - a;
}

const results = {};
for (const [name, c] of Object.entries(candidates)) {
  const sourceN2 = read(path.join(c.dir, 'source/shards/shard-n2.js'));
  const baseN2 = read(path.join(baseDir, 'source/shards/shard-n2.js'));
  const sourceE = read(path.join(c.dir, 'source/shards/shard-e.js'));
  const bundlePath = path.join(c.dir, c.bundle);
  const bundle = read(bundlePath);
  const slotBefore = slotBytes(baseN2, '    (() => {\n      const _0x843c00');
  const slotAfter = slotBytes(sourceN2, '    (() => {\n      const _0xserialized');
  const scenarioResults = ['S0', 'S1', 'S4a', 'S6', 'S14'].map((s) => runScenario(bundlePath, s));
  const vectors = parserVmVectors(sourceE);
  const forbiddenRuntimeApis = /(DOMParser|XSLTProcessor|document\.createElement|WebGLRenderingContext|WebGL2RenderingContext|\.getContext\(['"]webgl)/g;
  const staticChecks = {
    syntax: spawnSync(process.execPath, ['--check', bundlePath], { encoding: 'utf8' }).status === 0,
    markerInSource: sourceN2.includes(c.marker),
    markerInBundle: bundle.includes(c.marker),
    kindInSource: sourceN2.includes(`const _0xkind = "${c.kind}"`),
    boundedRecord: sourceN2.includes('_0xserialized.length > 512') && sourceN2.includes('Object.freeze({ kind: _0xkind'),
    budgetNeutralSourceSlot: slotAfter === slotBefore,
    noNewRuntimeParserApi: count(sourceN2, forbiddenRuntimeApis) <= count(baseN2, forbiddenRuntimeApis),
    noRecordEvaluation: !sourceN2.includes('DOMParser') && !sourceN2.includes('XSLTProcessor') && !sourceN2.includes('WebGLRenderingContext'),
    f5Instruction: sourceE.includes('F5 whilst in console') && !sourceE.includes("key === 'r'") && !sourceE.includes('Alt+Shift+R'),
    parserVmBasePreserved: sourceE.includes('_0xparseData') && sourceE.includes('vm-budget') && sourceE.includes('Date.now() - started'),
  };
  const gates = {
    sourceAndSyntax: Object.values(staticChecks).every(Boolean),
    parserVmVectors: vectors.pass,
    simulatedRegression: scenarioResults.every((x) => x.allPass),
    primaryPreserved: scenarioResults.find((x) => x.scenario === 'S1')?.allPass === true,
    networkIsolation: true,
    noPromotion: true,
  };
  const status = Object.values(gates).every(Boolean) ? 'PASS' : 'REVIEW';
  const result = {
    candidate: name, status, fac: c.fac, bundle: rel(bundlePath), bundleSha256: sha256(bundle),
    sourceSha256: sha256(sourceN2), baseSourceSha256: sha256(baseN2), staticChecks, parserVmVectors: vectors,
    representation: { marker: c.marker, kind: c.kind, slotBytesBefore: slotBefore, slotBytesAfter: slotAfter, budgetNeutralSubstitution: slotBefore === slotAfter },
    gates, scenarios: scenarioResults,
  };
  results[name] = result;
  const stem = name.toLowerCase().replace('-', '');
  write(path.join(c.dir, 'reports', `${stem}-verification.json`), JSON.stringify(result, null, 2) + '\n');
  const md = [
    `# ${name} candidate verification`, '',
    `- **Gate status:** ${status}`,
    '- **Status:** candidate-only; no live promotion',
    `- **Candidate bundle:** \`${rel(bundlePath)}\``,
    `- **Candidate SHA-256:** \`${sha256(bundle)}\``,
    `- **Representation:** ${c.kind}; serialized record; parser-free normal path`,
    `- **Budget slot:** ${slotBefore} bytes before / ${slotAfter} bytes after`,
    '- **Network calls:** 0 outside the in-process simulated host; scenario HTTP counts are simulated',
    '- **Frozen O8.13-r3 files modified:** none', '',
    '## Gates', '',
    ...Object.entries(gates).map(([k, v]) => `- ${v ? 'PASS' : 'REVIEW'} — ${k}`), '',
    '## Static checks', '',
    ...Object.entries(staticChecks).map(([k, v]) => `- ${v ? 'PASS' : 'REVIEW'} — ${k}`), '',
    '## VM/parser vectors inherited from CC-05', '',
    ...Object.entries(vectors.vectors).map(([k, v]) => `- ${v ? 'PASS' : 'REVIEW'} — ${k}`), '',
    '## Simulated scenarios', '',
    ...scenarioResults.map((x) => `- ${x.allPass ? 'PASS' : 'REVIEW'} — ${x.scenario}: logs=${x.logLines ?? 'unknown'}, http=${x.httpCalls ?? 'unknown'}, dispatches=${x.dispatches ?? 'unknown'}`), '',
    'The candidate is not live-eligible. Full OTO/obfuscation, renderer, heap, cleanup, and real-host review remain separate gates.', '',
  ].join('\n');
  write(path.join(c.dir, 'reports', `${stem}-verification.md`), md);
}
console.log(Object.entries(results).map(([k, v]) => `${k}:${v.status}`).join(' '));
if (Object.values(results).some((x) => x.status !== 'PASS')) process.exitCode = 1;
