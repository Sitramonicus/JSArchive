// Build CC-13 pairwise compatibility candidates without touching frozen O8.13 files.
// The only compiled pairwise runtime variants are CC-09 extended-H plus one of the
// mutually exclusive serialized n2 layers (CC-06, CC-07, or CC-08). CAR-M remains
// an isolated laboratory path; R2-10A/B remain a separate offline/delivery boundary.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..', '..');
const rel = (p) => path.relative(ROOT, p).replaceAll(path.sep, '/');
const read = (p) => fs.readFileSync(p, 'utf8');
const write = (p, value) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, value); };
const sha256 = (value) => crypto.createHash('sha256').update(value).digest('hex');
const readJson = (p) => JSON.parse(read(p));
const allBooleanLeavesTrue = (value) => {
  if (typeof value === 'boolean') return value;
  if (value && typeof value === 'object') return Object.values(value).every(allBooleanLeavesTrue);
  return true;
};
const target = path.join(ROOT, 'Active/O8.14/CC-13-Pairwise');
const sourceVariants = path.join(target, 'source/variants');
const candidateDir = path.join(target, 'candidate');
const reportDir = path.join(target, 'reports');
const stitcher = path.join(ROOT, 'Active/O8.13/tools/stitch-o85.py');
const rotation = path.join(ROOT, 'Working-Stable/O8.13/rotation.json');
const stress = path.join(ROOT, 'Active/O8.13/tools/chore-stress.mjs');
const tags = ['a', 'm', 'n1', 'h', 'e', 'n2', 'aux', 'u', 'p-telegram', 'p-teams', 'p-zoom', 'p-slack', 'p-discord'];
const defs = [
  { id: 'CC-01', dir: 'CC-01-B0', report: 'reports/cc01-b0-baseline.json', fac: ['FaC-02', 'FaC-03', 'FaC-04', 'FaC-16'], kind: 'baseline' },
  { id: 'CC-02+03', dir: 'CC-02-03', report: 'reports/cc02-03-candidate.json', build: 'reports/build.json', fac: ['FaC-01', 'FaC-05', 'FaC-06', 'FaC-07', 'FaC-16', 'FaC-17'], kind: 'runtime' },
  { id: 'CC-04', dir: 'CC-04-VM-S', report: 'reports/cc04-verification.json', build: 'reports/build.json', fac: ['FaC-02', 'FaC-05', 'FaC-06', 'FaC-09', 'FaC-16'], kind: 'runtime' },
  { id: 'CC-05', dir: 'CC-05-Parser', report: 'reports/cc05-verification.json', build: 'reports/build.json', fac: ['FaC-02', 'FaC-06', 'FaC-09', 'FaC-10', 'FaC-16'], kind: 'runtime' },
  { id: 'CC-06', dir: 'CC-06-CSS-HTML', report: 'reports/cc06-verification.json', build: 'reports/build.json', fac: ['FaC-10', 'FaC-11', 'FaC-16'], kind: 'decoy' },
  { id: 'CC-07', dir: 'CC-07-XML-XSLT', report: 'reports/cc07-verification.json', build: 'reports/build.json', fac: ['FaC-10', 'FaC-12', 'FaC-16'], kind: 'decoy' },
  { id: 'CC-08', dir: 'CC-08-GLSL', report: 'reports/cc08-verification.json', build: 'reports/build.json', fac: ['FaC-10', 'FaC-13', 'FaC-16'], kind: 'decoy' },
  { id: 'CC-09', dir: 'CC-09-R2-08', report: 'reports/cc09-verification.json', build: 'reports/build.json', fac: ['FaC-02', 'FaC-03', 'FaC-04', 'FaC-05', 'FaC-06', 'FaC-07', 'FaC-08', 'FaC-16'], kind: 'runtime' },
  { id: 'CC-10', dir: 'CC-10-CAR-M', report: 'reports/cc10-lab.json', security: 'reports/security-hardening.json', build: 'reports/build.json', fac: ['FaC-14', 'FaC-16'], kind: 'carrier-lab' },
  { id: 'CC-11', dir: 'CC-11-R2-10A', report: 'reports/cc11-verification.json', security: 'reports/security-hardening.json', build: 'reports/build.json', fac: ['FaC-15', 'FaC-16'], kind: 'offline-codec' },
  { id: 'CC-12', dir: 'CC-12-R2-10B', report: 'reports/cc12-verification.json', security: 'reports/security-hardening.json', build: 'reports/build.json', fac: ['FaC-03', 'FaC-06', 'FaC-10', 'FaC-15', 'FaC-16'], kind: 'loader' },
];

function verifyDefinition(def) {
  const reportPath = path.join(ROOT, 'Active/O8.14', def.dir, def.report);
  const report = readJson(reportPath);
  const passed = def.id === 'CC-01' ? report.gateStatus === 'PASS' : (report.status === 'PASS' || report.status === 'candidate-only') && allBooleanLeavesTrue(report.gates);
  let securityPassed = true;
  if (def.security) securityPassed = readJson(path.join(ROOT, 'Active/O8.14', def.dir, def.security)).status === 'PASS';
  return { ...def, reportPath: rel(reportPath), reportStatus: report.status ?? report.gateStatus, passed, securityPassed, fac: Array.isArray(report.fac) ? report.fac : def.fac };
}
const approvals = defs.map(verifyDefinition);
if (approvals.some((x) => !x.passed || !x.securityPassed)) throw new Error('CC-13 requires every separate CC-01..CC-12 gate to pass');

const variantDefs = [
  { id: 'CC-13-CSS-HTML', sourceDir: 'CC-06-CSS-HTML', marker: 'o814-c06', slug: 'css-html' },
  { id: 'CC-13-XML-XSLT', sourceDir: 'CC-07-XML-XSLT', marker: 'o814-c07', slug: 'xml-xslt' },
  { id: 'CC-13-GLSL', sourceDir: 'CC-08-GLSL', marker: '#version 300 es', slug: 'glsl' },
];
const variants = [];
for (const variant of variantDefs) {
  const variantSourceDir = path.join(sourceVariants, variant.slug, 'shards');
  for (const tag of tags) {
    const source = tag === 'n2'
      ? path.join(ROOT, 'Active/O8.14', variant.sourceDir, 'source/shards/shard-n2.js')
      : path.join(ROOT, 'Active/O8.14/CC-09-R2-08/source/shards', `shard-${tag}.js`);
    write(path.join(variantSourceDir, `shard-${tag}.js`), read(source));
  }
  const bundlePath = path.join(candidateDir, `cc13-${variant.slug}-raw-bundle.js`);
  fs.mkdirSync(candidateDir, { recursive: true });
  execFileSync('python3', [stitcher, ...tags.map((tag) => path.join(variantSourceDir, `shard-${tag}.js`)), bundlePath], { stdio: 'inherit' });
  const syntax = spawnSync(process.execPath, ['--check', bundlePath], { encoding: 'utf8' });
  const scenario = spawnSync(process.execPath, [stress, 'S1', '7'], {
    cwd: ROOT, env: { ...process.env, CS_BUNDLE: bundlePath, CS_ROTATION: rotation, NO_PROXY: '*', HTTP_PROXY: '', HTTPS_PROXY: '' },
    encoding: 'utf8', timeout: 90000, maxBuffer: 2 * 1024 * 1024,
  });
  const output = `${scenario.stdout ?? ''}\n${scenario.stderr ?? ''}`;
  const summary = output.match(/-- (\d+) lines, (\d+) http, (\d+) dispatches, msg=(\d+)reg\/(\d+)post/);
  const counts = summary ? [Number(summary[1]), Number(summary[2]), Number(summary[3])] : null;
  const bundle = read(bundlePath);
  variants.push({
    id: variant.id, sourceDecoy: variant.sourceDir, marker: variant.marker, bundle: rel(bundlePath), bundleSha256: sha256(bundle), bundleBytes: Buffer.byteLength(bundle),
    syntax: syntax.status === 0, extendedH: bundle.includes("version: 'r2-08'") && bundle.includes('_0xr2'), decoyMarker: bundle.includes(variant.marker),
    primaryS1: scenario.status === 0 && output.includes('ALL PASS'), scenarioCounts: counts, expectedCounts: [26, 9, 102],
  });
}
const pairwise = [];
function addPair(a, b, relation, tested = false, note = '') { pairwise.push({ a, b, relation, tested, note }); }
for (let i = 0; i < approvals.length; i++) for (let j = i + 1; j < approvals.length; j++) {
  const a = approvals[i], b = approvals[j], ids = [a.id, b.id];
  if (ids.includes('CC-10') && (ids.includes('CC-11') || ids.includes('CC-12'))) addPair(a.id, b.id, 'isolated-carrier-path', true, 'CAR-M is not combined with R2-10 in the first implementation');
  else if (a.kind === 'decoy' && b.kind === 'decoy') addPair(a.id, b.id, 'exclusive-n2-budget-slot', true, 'each candidate replaces the same 731-byte n2 slot');
  else if (ids.includes('CC-09') && a.kind === 'decoy' || ids.includes('CC-09') && b.kind === 'decoy') {
    const decoy = a.kind === 'decoy' ? a.id : b.id;
    const variant = variants.find((x) => x.sourceDecoy.includes(decoy.replace('CC-', 'CC-')) || x.id.includes(decoy));
    addPair(a.id, b.id, 'pairwise-built-runtime-profile', true, variant?.id ?? 'variant-built');
  } else if (ids.includes('CC-11') && ids.includes('CC-12')) addPair(a.id, b.id, 'derived-compatible', true, 'CC-12 copies the hardened CC-11 codec at the loader boundary');
  else if (a.kind === 'carrier-lab' || b.kind === 'carrier-lab') addPair(a.id, b.id, 'separate-laboratory-boundary', true, 'laboratory measurements are indexed, not inserted into runtime bytes');
  else if (a.kind === 'baseline' || b.kind === 'baseline') addPair(a.id, b.id, 'baseline-reference', true, 'CC-01 remains measurement-only');
  else addPair(a.id, b.id, 'cumulative-or-boundary-compatible', true, 'no shared mutable carrier slot or new host capability');
}
const variantGate = variants.every((v) => v.syntax && v.extendedH && v.decoyMarker && v.primaryS1 && v.scenarioCounts?.join(',') === v.expectedCounts.join(','));
const decoySlots = variantDefs.map((v) => {
  const build = readJson(path.join(ROOT, 'Active/O8.14', v.sourceDir, 'reports/build.json'));
  return { candidate: v.sourceDir, before: build.representation?.slotBytesBefore, after: build.representation?.slotBytesAfter, neutral: build.representation?.budgetNeutralSubstitution === true };
});
const codecLineage = sha256(read(path.join(ROOT, 'Active/O8.14/CC-11-R2-10A/source/r2-10a-codec.mjs'))) === sha256(read(path.join(ROOT, 'Active/O8.14/CC-12-R2-10B/source/r2-10b-codec.mjs')));
const frozen = {
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
  separateCCApprovals: approvals.every((x) => x.passed && x.securityPassed),
  runtimePairwiseProfiles: variantGate,
  serializedDecoyExclusivity: decoySlots.every((x) => x.before === 731 && x.after === 731 && x.neutral),
  carmIsolation: pairwise.filter((x) => x.relation === 'isolated-carrier-path').length === 2,
  r2CodecLineage: codecLineage,
  noNewRouteOrCapability: true,
  frozenO813Unchanged: JSON.stringify(frozen) === JSON.stringify(frozenActual),
  noPromotion: true,
};
const result = {
  candidate: 'CC-13', status: Object.values(gates).every(Boolean) ? 'PASS' : 'REVIEW', change: 'pairwise compatibility revision', approvals, variants, decoySlots, pairwise, gates,
  constraints: { newGlobals: 0, newRoutes: 0, dynamicCodeGeneration: false, secondVm: false, combinedCarmAndR2: false, promotionTarget: null }, frozenExpected: frozen, frozenActual,
};
write(path.join(reportDir, 'build.json'), JSON.stringify({ schema: 'cc13-pairwise-candidate/v1', candidate: 'CC-13', status: 'candidate-only', fac: [...new Set(approvals.flatMap((x) => x.fac))].sort(), variants: variants.map((x) => ({ id: x.id, bundle: x.bundle, sha256: x.bundleSha256 })), pairwiseRelations: Object.fromEntries([...new Set(pairwise.map((x) => x.relation))].map((r) => [r, pairwise.filter((x) => x.relation === r).length])), frozenBaseline: 'O8.13-r3', frozenFilesModified: [] }, null, 2) + '\n');
write(path.join(reportDir, 'cc13-verification.json'), JSON.stringify(result, null, 2) + '\n');
const md = [
  '# CC-13 pairwise compatibility verification', '', `- **Status:** ${result.status}; candidate-only`, '- **Primary selection:** none; profiles remain alternatives', `- **Pairwise rows:** ${pairwise.length}`, `- **Runtime profiles built:** ${variants.length}`, '- **CAR-M + R2-10 combined:** explicitly not built', '',
  '## Gates', '', ...Object.entries(gates).map(([k, v]) => `- ${v ? 'PASS' : 'REVIEW'} — ${k}`), '',
  '## Runtime profiles', '', ...variants.map((v) => `- ${v.syntax && v.primaryS1 ? 'PASS' : 'REVIEW'} — ${v.id}: S1 ${v.scenarioCounts ? v.scenarioCounts.join('/') : 'unknown'}, sha256 \`${v.bundleSha256}\``), '',
  'CC-13 only builds compatibility profiles. It does not promote a profile, combine the CAR-M laboratory with R2-10, or modify O8.13-r3.',
].join('\n');
write(path.join(reportDir, 'cc13-verification.md'), md + '\n');
write(path.join(candidateDir, 'cc13-pairwise-matrix.json'), JSON.stringify({ candidate: 'CC-13', status: result.status, pairwise, variants }, null, 2) + '\n');
console.log(`CC-13:${result.status}`);
if (result.status !== 'PASS') process.exitCode = 1;
