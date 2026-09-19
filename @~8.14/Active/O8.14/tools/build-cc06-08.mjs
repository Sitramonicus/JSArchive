// Build separate CC-06, CC-07, and CC-08 candidate trees from the fixed CC-05 source.
// Each change substitutes one existing serialized/no-op budget slot in shard-n2.js.
// No O8.13 file is written. Outputs are raw candidate assemblies, not releases.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..', '..');
const rel = (p) => path.relative(ROOT, p).replaceAll(path.sep, '/');
const read = (p) => fs.readFileSync(p, 'utf8');
const write = (p, value) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, value); };
const sha256 = (value) => crypto.createHash('sha256').update(value).digest('hex');
const stitcher = path.join(ROOT, 'Active/O8.13/tools/stitch-o85.py');
const base = path.join(ROOT, 'Active/O8.14/CC-05-Parser/source/shards');
const tags = ['a', 'm', 'n1', 'e', 'n2', 'aux', 'u', 'p-telegram', 'p-teams', 'p-zoom', 'p-slack', 'p-discord'];
const slotStart = '    (() => {\n      const _0x843c00';
const slotEnd = '    })();';
const baseN2 = read(path.join(base, 'shard-n2.js'));
const slotA = baseN2.indexOf(slotStart);
const slotB = baseN2.indexOf(slotEnd, slotA);
if (slotA < 0 || slotB < 0) throw new Error('CC-06/07/08 budget slot anchor missing');
const slotEndIndex = slotB + slotEnd.length;
const oldSlot = baseN2.slice(slotA, slotEndIndex);
if (oldSlot.length !== 731) throw new Error(`Unexpected serialized budget slot length: ${oldSlot.length}`);

const records = {
  'CC-06': {
    dir: path.join(ROOT, 'Active/O8.14/CC-06-CSS-HTML'),
    bundleName: 'cc06-css-html-raw-bundle.js',
    kind: 'css-html',
    marker: '<!--o814-c06-->',
    serialized: '<!--o814-c06--><section data-o814="c06"><style>.o814-c06{color:#6b7280;display:block}</style><p class="o814-c06">serialized decoy</p></section>',
    fac: ['FaC-10', 'FaC-11', 'FaC-16'],
    title: 'CSS/HTML serialized-decoy candidate',
  },
  'CC-07': {
    dir: path.join(ROOT, 'Active/O8.14/CC-07-XML-XSLT'),
    bundleName: 'cc07-xml-xslt-raw-bundle.js',
    kind: 'xml-xslt',
    marker: '<?xml version=',
    serialized: '<?xml version="1.0"?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"><xsl:template match="/"><xsl:element name="o814-c07"><xsl:text>serialized decoy</xsl:text></xsl:element></xsl:template></xsl:stylesheet>',
    fac: ['FaC-10', 'FaC-12', 'FaC-16'],
    title: 'XML/XSLT serialized-decoy candidate',
  },
  'CC-08': {
    dir: path.join(ROOT, 'Active/O8.14/CC-08-GLSL'),
    bundleName: 'cc08-glsl-raw-bundle.js',
    kind: 'glsl',
    marker: '#version 300 es',
    serialized: '#version 300 es\nprecision mediump float;\nuniform float uTick;\nout vec4 fragColor;\nvoid main(){float x=fract(uTick*0.00390625);fragColor=vec4(x,1.0-x,0.25,1.0);}',
    fac: ['FaC-10', 'FaC-13', 'FaC-16'],
    title: 'GLSL serialized-decoy candidate',
  },
};

function recordBlock(kind, serialized) {
  const block = [
    '    (() => {',
    `      const _0xserialized = ${JSON.stringify(serialized)};`,
    `      const _0xkind = ${JSON.stringify(kind)};`,
    '      if (_0xserialized.length > 512) return;',
    '      let _0xsum = 0;',
    '      for (let _0xi = 0; _0xi < _0xserialized.length; _0xi++) _0xsum = (_0xsum + _0xserialized.charCodeAt(_0xi)) & 0xffff;',
    '      const _0xrecord = Object.freeze({ kind: _0xkind, bytes: _0xserialized.length, checksum: _0xsum });',
    '      if (_0xrecord.bytes === 0 || _0xrecord.checksum < 0) return;',
    '    })();',
  ].join('\n');
  if (block.length > oldSlot.length) throw new Error(`${kind} replacement exceeds budget slot: ${block.length}/${oldSlot.length}`);
  return block.padEnd(oldSlot.length, ' ');
}

function patchSlot(source, cfg) {
  const a = source.indexOf(slotStart);
  const b = source.indexOf(slotEnd, a);
  if (a < 0 || b < 0) throw new Error(`${cfg.kind} source budget slot missing`);
  const end = b + slotEnd.length;
  const current = source.slice(a, end);
  if (current.length !== oldSlot.length) throw new Error(`${cfg.kind} budget slot drift: ${current.length}/${oldSlot.length}`);
  return source.slice(0, a) + recordBlock(cfg.kind, cfg.serialized) + source.slice(end);
}

for (const [name, cfg] of Object.entries(records)) {
  for (const tag of tags) {
    const p = path.join(base, `shard-${tag}.js`);
    if (!fs.existsSync(p)) throw new Error(`Missing CC-05 source: ${rel(p)}`);
  }
  const sourceDir = path.join(cfg.dir, 'source/shards');
  const candidatePath = path.join(cfg.dir, 'candidate', cfg.bundleName);
  const frozenBaseSha256 = {};
  const candidateSourceSha256 = {};
  for (const tag of tags) {
    const inputPath = path.join(base, `shard-${tag}.js`);
    const input = read(inputPath);
    frozenBaseSha256[rel(inputPath)] = sha256(input);
    const output = tag === 'n2' ? patchSlot(input, cfg) : input;
    const outputPath = path.join(sourceDir, `shard-${tag}.js`);
    write(outputPath, output);
    candidateSourceSha256[rel(outputPath)] = sha256(output);
  }
  fs.mkdirSync(path.dirname(candidatePath), { recursive: true });
  execFileSync('python3', [stitcher, ...tags.map((tag) => path.join(sourceDir, `shard-${tag}.js`)), candidatePath], { stdio: 'inherit' });
  execFileSync(process.execPath, ['--check', candidatePath], { stdio: 'inherit' });
  const candidateBundle = read(candidatePath);
  const outputN2 = read(path.join(sourceDir, 'shard-n2.js'));
  const outputA = outputN2.indexOf('    (() => {\n      const _0xserialized');
  const outputB = outputN2.indexOf('\n\n', outputA);
  const outputSlot = outputN2.slice(outputA, outputB);
  if (outputA < 0 || outputB < 0 || outputSlot.length !== oldSlot.length) throw new Error(`${name} output slot is not budget-neutral`);
  const report = {
    schema: 'o814-serialized-decoy/v1', candidate: name, status: 'candidate-only', baseCandidate: 'CC-05',
    title: cfg.title, fac: cfg.fac, candidateBundle: rel(candidatePath),
    representation: {
      kind: cfg.kind, marker: cfg.marker, serializedBytes: Buffer.byteLength(cfg.serialized),
      slotBytesBefore: oldSlot.length, slotBytesAfter: outputSlot.length, budgetNeutralSubstitution: true,
      normalPathParses: false, normalPathCreatesDomCssomGpuObjects: false,
      runtimeHostCallsAdded: 0, executionEngineAdded: false,
    },
    frozenBaseSha256, candidateSourceSha256,
    candidateBundleSha256: sha256(candidateBundle), candidateBundleBytes: Buffer.byteLength(candidateBundle),
    promotion: { target: null, liveEligible: false },
    frozenInputsUnchanged: true,
  };
  write(path.join(cfg.dir, 'reports/build.json'), JSON.stringify(report, null, 2) + '\n');
  const readme = `# ${name} — ${cfg.title}\n\n**Status:** candidate-only; simulated verification pending  \n**Base:** CC-05 bounded parser candidate  \n**FaCs:** ${cfg.fac.join(', ')}\n\nThis candidate substitutes one bounded serialized ${cfg.kind} record into an existing ` +
    '`shard-n2.js` serialized/no-op budget slot. The slot remains exactly ' + oldSlot.length +
    ` bytes before and after substitution, so the layer is a replacement rather than an appended payload.\n\nThe normal path stores the record as a local string, computes a bounded checksum, and does not invoke a browser parser, DOM/CSSOM API, WebGL context, shader compiler, evaluator, network route, or second VM.\n\n## Artifacts\n\n- \`source/shards/\` — candidate source copies.\n- \`candidate/${cfg.bundleName}\` — raw stitched candidate assembly, not a release artifact.\n- \`reports/build.json\` — provenance, representation, and budget-neutrality record.\n- \`reports/${name.toLowerCase().replace('-', '')}-verification.md\` — verification report.\n\nFull OTO/obfuscation, renderer, heap, cleanup, and real-host gates remain outstanding.\n`;
  write(path.join(cfg.dir, 'README.md'), readme);
  console.log(`${name}: built ${rel(candidatePath)} sha256=${sha256(candidateBundle)}`);
}
console.log('CC-06, CC-07, and CC-08 candidate trees built; no frozen O8.13 files written.');
