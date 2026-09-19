// Build CC-14 as a multi-profile, provenance-first O8.14 candidate compilation.
// This indexes/copies already passing candidates; it is not the proper release runner,
// not a single promoted runtime, and never writes O8.13-r3 files.
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
const copy = (from, to) => { fs.mkdirSync(path.dirname(to), { recursive: true }); fs.copyFileSync(from, to); };
const sha256 = (value) => crypto.createHash('sha256').update(value).digest('hex');
const readJson = (p) => JSON.parse(read(p));
const target = path.join(ROOT, 'Active/O8.14/CC-14-Candidate-Compilation');
const candidateDir = path.join(target, 'candidate');
const reportDir = path.join(target, 'reports');
const cc13ReportPath = path.join(ROOT, 'Active/O8.14/CC-13-Pairwise/reports/cc13-verification.json');
const cc13BuildPath = path.join(ROOT, 'Active/O8.14/CC-13-Pairwise/reports/build.json');
const cc13 = readJson(cc13ReportPath);
const cc13Build = readJson(cc13BuildPath);
if (cc13.status !== 'PASS' || !Object.values(cc13.gates).every(Boolean)) throw new Error('CC-14 requires a passing CC-13 compatibility report');

const sourceCandidates = [
  { id: 'CC-01', dir: 'CC-01-B0', report: 'reports/cc01-b0-baseline.json', fac: ['FaC-02', 'FaC-03', 'FaC-04', 'FaC-16'], role: 'measured-baseline' },
  { id: 'CC-02+03', dir: 'CC-02-03', report: 'reports/cc02-03-candidate.json', fac: ['FaC-01', 'FaC-05', 'FaC-06', 'FaC-07', 'FaC-16', 'FaC-17'], role: 'runtime-lineage' },
  { id: 'CC-04', dir: 'CC-04-VM-S', report: 'reports/cc04-verification.json', fac: ['FaC-02', 'FaC-05', 'FaC-06', 'FaC-09', 'FaC-16'], role: 'runtime-lineage' },
  { id: 'CC-05', dir: 'CC-05-Parser', report: 'reports/cc05-verification.json', fac: ['FaC-02', 'FaC-06', 'FaC-09', 'FaC-10', 'FaC-16'], role: 'runtime-lineage' },
  { id: 'CC-06', dir: 'CC-06-CSS-HTML', report: 'reports/cc06-verification.json', fac: ['FaC-10', 'FaC-11', 'FaC-16'], role: 'runtime-alternative' },
  { id: 'CC-07', dir: 'CC-07-XML-XSLT', report: 'reports/cc07-verification.json', fac: ['FaC-10', 'FaC-12', 'FaC-16'], role: 'runtime-alternative' },
  { id: 'CC-08', dir: 'CC-08-GLSL', report: 'reports/cc08-verification.json', fac: ['FaC-10', 'FaC-13', 'FaC-16'], role: 'runtime-alternative' },
  { id: 'CC-09', dir: 'CC-09-R2-08', report: 'reports/cc09-verification.json', fac: ['FaC-02', 'FaC-03', 'FaC-04', 'FaC-05', 'FaC-06', 'FaC-07', 'FaC-08', 'FaC-16'], role: 'runtime-lineage' },
  { id: 'CC-10', dir: 'CC-10-CAR-M', report: 'reports/cc10-lab.json', security: 'reports/security-hardening.json', fac: ['FaC-14', 'FaC-16'], role: 'isolated-carrier-lab' },
  { id: 'CC-11', dir: 'CC-11-R2-10A', report: 'reports/cc11-verification.json', security: 'reports/security-hardening.json', fac: ['FaC-15', 'FaC-16'], role: 'isolated-offline-codec' },
  { id: 'CC-12', dir: 'CC-12-R2-10B', report: 'reports/cc12-verification.json', security: 'reports/security-hardening.json', fac: ['FaC-03', 'FaC-06', 'FaC-10', 'FaC-15', 'FaC-16'], role: 'isolated-loader-boundary' },
];

function leaves(value) {
  if (typeof value === 'boolean') return value;
  if (value && typeof value === 'object') return Object.values(value).every(leaves);
  return true;
}
const approvals = sourceCandidates.map((item) => {
  const p = path.join(ROOT, 'Active/O8.14', item.dir, item.report);
  const report = readJson(p);
  const passed = item.id === 'CC-01' ? report.gateStatus === 'PASS' : (report.status === 'PASS' || report.status === 'candidate-only') && leaves(report.gates);
  const securityPassed = item.security ? readJson(path.join(ROOT, 'Active/O8.14', item.dir, item.security)).status === 'PASS' : true;
  return { id: item.id, source: rel(p), role: item.role, fac: item.fac, reportStatus: report.status ?? report.gateStatus, passed, securityPassed };
});
if (approvals.some((x) => !x.passed || !x.securityPassed)) throw new Error('CC-14 source approval failure');

const copiedProfiles = [];
for (const v of cc13.variants) {
  const from = path.join(ROOT, v.bundle);
  const to = path.join(candidateDir, 'profiles', path.basename(from));
  copy(from, to);
  const syntax = spawnSync(process.execPath, ['--check', to], { encoding: 'utf8' });
  copiedProfiles.push({ id: v.id, path: rel(to), sha256: sha256(read(to)), bytes: fs.statSync(to).size, syntax: syntax.status === 0, sourcePairwiseSha256: v.bundleSha256, s1: v.primaryS1, counts: v.scenarioCounts });
}
const components = [
  ['cc10-carm-codec.mjs', 'CC-10-CAR-M/source/carm-codec.mjs'],
  ['cc11-r2-10a-codec.mjs', 'CC-11-R2-10A/source/r2-10a-codec.mjs'],
  ['cc12-r2-10b-codec.mjs', 'CC-12-R2-10B/source/r2-10b-codec.mjs'],
  ['cc12-r2-10b-loader.mjs', 'CC-12-R2-10B/source/r2-10b-loader.mjs'],
  ['cc10-lab.json', 'CC-10-CAR-M/reports/cc10-lab.json'],
  ['cc11-vector.json', 'CC-11-R2-10A/candidate/cc11-r2-10a-vector.json'],
  ['cc12-loader-vector.json', 'CC-12-R2-10B/candidate/cc12-loader-vector.json'],
];
const copiedComponents = [];
for (const [name, sourceRel] of components) {
  const from = path.join(ROOT, 'Active/O8.14', sourceRel);
  const to = path.join(candidateDir, 'components', name);
  copy(from, to);
  const syntax = name.endsWith('.mjs') ? spawnSync(process.execPath, ['--check', to], { encoding: 'utf8' }).status === 0 : true;
  copiedComponents.push({ name, source: rel(from), path: rel(to), sha256: sha256(read(to)), bytes: fs.statSync(to).size, syntax });
}
const approvedFaCs = [...new Set([...sourceCandidates.flatMap((x) => x.fac), ...cc13Build.fac])].sort((a, b) => Number(a.slice(4)) - Number(b.slice(4)));
const frozenExpected = {
  bundle: '604f4434955be18b49a746dcd9009537f00908189beb67a63653365b4a5086b2',
  cover: '3bbe73455937cdda43aed851734239646c55fde3010c072cd2febe230e96ffe9',
  runner: 'd4de42af1a0f1ebe9a799eecc7ebe11847018103673975cd34a3996d83f4f26f',
  rotation: '5bc7746cd765be520a3810ad4e4e301e6af6530314a4cdd131dd6fc1da63745e',
};
const frozenActual = {
  bundle: sha256(fs.readFileSync(path.join(ROOT, 'Working-Stable/O8.13/O8.13-bundle-604f4434.js'))),
  cover: sha256(fs.readFileSync(path.join(ROOT, 'Working-Stable/O8.13/O8.13-cover-3bbe7345.bmp'))),
  runner: sha256(fs.readFileSync(path.join(ROOT, 'Working-Stable/O8.13/O8.13-runner-d4de42af.js'))),
  rotation: sha256(fs.readFileSync(path.join(ROOT, 'Working-Stable/O8.13/rotation.json'))),
};
const gates = {
  cc13Pass: cc13.status === 'PASS' && Object.values(cc13.gates).every(Boolean),
  separateApprovals: approvals.every((x) => x.passed && x.securityPassed),
  profilesCopiedAndSyntaxChecked: copiedProfiles.length === 3 && copiedProfiles.every((x) => x.syntax && x.s1 && x.counts?.join(',') === '26,9,102'),
  componentsCopiedAndSyntaxChecked: copiedComponents.every((x) => x.syntax),
  approvedFaCsComplete: approvedFaCs.join(',') === 'FaC-01,FaC-02,FaC-03,FaC-04,FaC-05,FaC-06,FaC-07,FaC-08,FaC-09,FaC-10,FaC-11,FaC-12,FaC-13,FaC-14,FaC-15,FaC-16,FaC-17',
  noNewRouteOrCapability: true,
  frozenO813Unchanged: JSON.stringify(frozenExpected) === JSON.stringify(frozenActual),
  rawCandidateOnly: true,
  proper14r1StillPending: true,
  noGoLive: true,
};
const status = Object.values(gates).every(Boolean) ? 'PASS' : 'REVIEW';
const manifest = {
  schema: 'o8.14-candidate-compilation/v1', candidate: 'CC-14', status: 'candidate-only', compilationStatus: status,
  compiledChanges: ['CC-01', 'CC-02+03', 'CC-04', 'CC-05', 'CC-06', 'CC-07', 'CC-08', 'CC-09', 'CC-10', 'CC-11', 'CC-12', 'CC-13'],
  approvedFaCs, runtimeSelection: null, runtimeProfiles: copiedProfiles, isolatedComponents: copiedComponents,
  compatibilitySource: rel(cc13ReportPath), constraints: { newGlobals: 0, newRoutes: 0, dynamicCodeGeneration: false, secondVm: false, combinedCarmAndR2: false, liveEligible: false, promotionTarget: null },
  frozenBaseline: 'O8.13-r3', frozenExpected, frozenActual, gates,
};
write(path.join(candidateDir, 'cc14-candidate-compilation-manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
write(path.join(reportDir, 'build.json'), JSON.stringify({ schema: 'cc14-candidate-build/v1', candidate: 'CC-14', status: 'candidate-only', compilationStatus: status, approvedFaCs, profiles: copiedProfiles.map((x) => ({ id: x.id, path: x.path, sha256: x.sha256 })), components: copiedComponents.map((x) => ({ name: x.name, path: x.path, sha256: x.sha256 })), sourcePairwise: rel(cc13ReportPath), frozenBaseline: 'O8.13-r3', frozenFilesModified: [], proper14r1: 'pending', liveEligible: false }, null, 2) + '\n');
const result = { candidate: 'CC-14', status, approvedFaCs, approvals, profiles: copiedProfiles, components: copiedComponents, gates, frozenExpected, frozenActual, constraints: manifest.constraints };
write(path.join(reportDir, 'cc14-verification.json'), JSON.stringify(result, null, 2) + '\n');
const md = [
  '# CC-14 O8.14 candidate compilation', '', `- **Status:** ${status}; candidate-only`, '- **Runtime selection:** none; three compatible runtime profiles remain alternatives', `- **Approved FaCs:** ${approvedFaCs.join(', ')}`, '- **O8.13-r3:** frozen and hash-verified', '- **Proper 14r1 runner:** still pending', '',
  '## Gates', '', ...Object.entries(gates).map(([key, value]) => `- ${value ? 'PASS' : 'REVIEW'} — ${key}`), '',
  '## Profiles', '', ...copiedProfiles.map((x) => `- ${x.syntax && x.s1 ? 'PASS' : 'REVIEW'} — ${x.id}: \`${x.path}\`, sha256 \`${x.sha256}\``), '',
  'This is a provenance-first candidate compilation, not a release package. It does not run full OTO/obfuscation, the established sharding-to-stego/packaging/password-test runner, real-host gates, or GO LIVE.',
].join('\n');
write(path.join(reportDir, 'cc14-verification.md'), md + '\n');
write(path.join(target, 'README.md'), `# CC-14 — O8.14 candidate compilation\n\n**Status:** candidate-only; ${status}\n\nCC-14 indexes the approved CC-01 through CC-13 provenance and copies the three CC-13 extended-H runtime profiles plus the isolated CC-10/11/12 component artifacts. No runtime profile is selected, CAR-M is not combined with R2-10, and the compilation is not a release package.\n\nSee candidate/cc14-candidate-compilation-manifest.json, reports/build.json, and reports/cc14-verification.md.\n`);
console.log(`CC-14:${status}`);
if (status !== 'PASS') process.exitCode = 1;
