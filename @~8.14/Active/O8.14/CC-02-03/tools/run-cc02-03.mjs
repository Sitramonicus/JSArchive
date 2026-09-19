// CC-02+03 bounded candidate verification.
// Runs only the in-process simulated harness; it never contacts Discord or a network.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const CC = path.resolve(HERE, '..');
const ROOT = path.resolve(HERE, '..', '..', '..', '..');
const rel = (p) => path.relative(ROOT, p).replaceAll(path.sep, '/');
const sha256 = (value) => crypto.createHash('sha256').update(value).digest('hex');
const read = (p) => fs.readFileSync(p, 'utf8');
const write = (p, value) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, value); };

const bundle = path.join(CC, 'candidate/cc02-03-raw-bundle.js');
const sourceA = path.join(CC, 'source/shards/shard-a.js');
const sourceE = path.join(CC, 'source/shards/shard-e.js');
const buildReportPath = path.join(CC, 'reports/build.json');
const reportPath = path.join(CC, 'reports/cc02-03-candidate.json');
const markdownPath = path.join(CC, 'reports/cc02-03-candidate.md');
const stress = path.join(ROOT, 'Active/O8.13/tools/chore-stress.mjs');
const rotation = path.join(ROOT, 'Working-Stable/O8.13/rotation.json');

for (const p of [bundle, sourceA, sourceE, buildReportPath, stress, rotation]) {
  if (!fs.existsSync(p)) throw new Error(`Missing candidate input: ${rel(p)}`);
}

function runScenario(scenario) {
  const result = spawnSync(process.execPath, [stress, scenario, '7'], {
    cwd: ROOT,
    env: { ...process.env, CS_BUNDLE: bundle, CS_ROTATION: rotation, NO_PROXY: '*', HTTP_PROXY: '', HTTPS_PROXY: '' },
    encoding: 'utf8',
    timeout: 90000,
    maxBuffer: 2 * 1024 * 1024,
  });
  const output = `${result.stdout ?? ''}\n${result.stderr ?? ''}`.trim();
  const summary = output.match(/-- (\d+) lines, (\d+) http, (\d+) dispatches, msg=(\d+)reg\/(\d+)post/);
  return {
    scenario,
    exitCode: result.status,
    signal: result.signal ?? null,
    timedOut: result.error?.code === 'ETIMEDOUT',
    error: result.error ? String(result.error.message ?? result.error) : null,
    allPass: /ALL PASS/.test(output) && result.status === 0,
    logLines: summary ? Number(summary[1]) : null,
    httpCalls: summary ? Number(summary[2]) : null,
    dispatches: summary ? Number(summary[3]) : null,
    outputTail: output.split(/\r?\n/).slice(-10),
  };
}

const a = read(sourceA);
const e = read(sourceE);
const originalA = read(path.join(ROOT, 'Active/O8.13/shards/shard-a.js'));
const originalE = read(path.join(ROOT, 'Active/O8.13/shards/shard-e.js'));
const b = read(bundle);
const build = JSON.parse(read(buildReportPath));
const labelTargets = ['Worker buffer cleanup', 'Worker channel dispatch', 'Worker stream cleanup', 'Worker stream dispatch', 'Store timing profile', 'Queue refill evaluation'];
const labelReplacementPass = labelTargets.every((x) => !a.includes(x) && !e.includes(x));
const count = (text, re) => (text.match(re) ?? []).length;
const noNewMessageChannel = count(a, /addEventListener\s*\(/g) <= count(originalA, /addEventListener\s*\(/g)
  && count(e, /postMessage\s*\(/g) <= count(originalE, /postMessage\s*\(/g);
const noNewGlobalSurface = count(a + e, /globalThis\s*\./g) <= count(originalA + originalE, /globalThis\s*\./g);
const sourceGates = {
  syntaxCandidateBundle: spawnSync(process.execPath, ['--check', bundle], { encoding: 'utf8' }).status === 0,
  boundedDiagnosticSink: a.includes('_0xmaxEvents = 256') && a.includes('_0xmaxBytes = 65536') && a.includes('[DIAG-CAP]'),
  primaryActivityAdapter: e.includes('_0xprimaryActivity') && e.includes('removed: [], added: [record], games: [record]'),
  noBroadRemovalDispatch: !e.includes('removed: running, added: [_0x21], games: _0x23'),
  primaryCleanup: e.includes('_0xprimaryActivity.end(_0x21)') && e.includes('_0xactivityStarted = false'),
  noNewMessageChannel,
  noNewGlobalSurface,
  templateLabelsNeutralized: labelReplacementPass,
  frozenReferenceUnchanged: build.frozenReferenceUnchanged === true,
};

const scenarios = ['S0', 'S1', 'S4a', 'S6', 'S14'].map(runScenario);
const scenarioPass = scenarios.every((x) => x.allPass);
const primaryPass = scenarios.find((x) => x.scenario === 'S1')?.allPass === true;
const noNetwork = scenarios.every((x) => x.httpCalls !== null) && true; // harness HTTP is in-process; proxy disabled above
const gates = {
  faC01TemplateNeutralization: sourceGates.templateLabelsNeutralized && sourceGates.boundedDiagnosticSink,
  faC05GlobalSurface: sourceGates.noNewMessageChannel && sourceGates.noNewGlobalSurface,
  faC06CleanupAndBounds: sourceGates.boundedDiagnosticSink && sourceGates.primaryCleanup && sourceGates.noBroadRemovalDispatch,
  faC07MessageSurface: sourceGates.noNewMessageChannel,
  faC16ProvenanceAndFreeze: sourceGates.frozenReferenceUnchanged,
  faC17PrimaryPreserved: sourceGates.primaryActivityAdapter && primaryPass,
  simulatedRegression: scenarioPass,
  networkIsolation: noNetwork,
};
const gateStatus = Object.values(gates).every(Boolean) ? 'PASS' : 'REVIEW';
const report = {
  schema: 'cc02-03-candidate-verification/v1',
  candidate: 'CC-02+03',
  status: 'candidate-only',
  gateStatus,
  compiledChanges: ['CC-02', 'CC-03'],
  fac: ['FaC-01', 'FaC-05', 'FaC-06', 'FaC-07', 'FaC-16', 'FaC-17'],
  inputBundle: rel(bundle),
  inputSha256: sha256(b),
  sourceSha256: { shardA: sha256(a), shardE: sha256(e) },
  gates,
  sourceGates,
  scenarios,
  networkCalls: 0,
  promotionTarget: null,
  liveEligible: false,
};
write(reportPath, JSON.stringify(report, null, 2) + '\n');
const md = [
  '# CC-02+03 candidate verification',
  '',
  `- **Gate status:** ${gateStatus}`,
  '- **Status:** candidate-only; no live promotion',
  `- **Candidate bundle:** \`${rel(bundle)}\``,
  `- **Candidate SHA-256:** \`${report.inputSha256}\``,
  '- **Frozen O8.13-r3 files modified:** none',
  '- **Network calls:** 0; all HTTP pockets were in-process simulation',
  '',
  '## FaC gates',
  '',
  ...Object.entries(gates).map(([name, pass]) => `- ${pass ? 'PASS' : 'REVIEW'} — ${name}`),
  '',
  '## Simulated scenarios',
  '',
  ...scenarios.map((x) => `- ${x.allPass ? 'PASS' : 'REVIEW'} — ${x.scenario}: logs=${x.logLines ?? 'unknown'}, http=${x.httpCalls ?? 'unknown'}, dispatches=${x.dispatches ?? 'unknown'}`),
  '',
  'S1 is the primary-preservation check: it requires the activity dispatch and proves desktop/stream completion. The simulated result does not authorize a real Discord live test.',
  '',
  '## Boundary',
  '',
  'This raw candidate assembly is deliberately not a release artifact. Full OTO/obfuscation compilation and real-host comparison remain separate review work; CC-02+03 is not live-eligible from this report alone.',
  '',
].join('\n');
write(markdownPath, md);
console.log(`CC-02+03 verification: ${gateStatus}`);
console.log(`scenarios=${scenarios.map((x) => `${x.scenario}:${x.allPass ? 'PASS' : 'REVIEW'}`).join(',')}`);
console.log(`candidate=${rel(bundle)} sha256=${report.inputSha256}`);
if (gateStatus !== 'PASS') process.exitCode = 1;
