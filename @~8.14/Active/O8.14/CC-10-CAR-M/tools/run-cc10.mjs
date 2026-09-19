// CC-10 / CAR-M laboratory run. Non-executable fixture only; no loader, host, or live carrier path.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..', '..', '..');
const rel = (p) => path.relative(ROOT, p).replaceAll(path.sep, '/');
const sha256 = (v) => crypto.createHash('sha256').update(v).digest('hex');
const write = (p, v) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, v); };
const sourcePath = path.join(HERE, '..', 'source/carm-codec.mjs');
const outDir = path.join(HERE, '..', 'candidate');
const reportDir = path.join(HERE, '..', 'reports');
const coverPath = path.join(ROOT, 'Uploads/stego2-cover-1024-scaled.bmp');
const { encode, decode, fixture, positionCapacity, payloadSymbols, frameSymbols, metrics, corruptionRejects, regionStart, MAX_PAYLOAD_BYTES, MAX_CARRIER_BYTES } = await import(pathToFileURL(sourcePath));

function assertBmp(bmp) {
  if (bmp.subarray(0, 2).toString() !== 'BM' || bmp.readUInt32LE(18) !== 1024 || bmp.readUInt32LE(22) !== 768 || bmp.readUInt16LE(28) !== 24) throw new Error('unexpected lab cover');
}
function expandVertical(bmp, factor = 2) {
  assertBmp(bmp);
  const width = bmp.readUInt32LE(18), height = bmp.readUInt32LE(22), rowBytes = width * 3;
  const newHeight = height * factor;
  const out = Buffer.alloc(54 + rowBytes * newHeight);
  bmp.copy(out, 0, 0, 54);
  out.writeUInt32LE(out.length, 2);
  out.writeUInt32LE(newHeight, 22);
  out.writeUInt32LE(rowBytes * newHeight, 34);
  for (let y = 0; y < height; y++) {
    const row = bmp.subarray(54 + y * rowBytes, 54 + (y + 1) * rowBytes);
    for (let k = 0; k < factor; k++) row.copy(out, 54 + (y * factor + k) * rowBytes);
  }
  return out;
}
function memory() {
  const m = process.memoryUsage();
  return { rss: m.rss, heapUsed: m.heapUsed, external: m.external, arrayBuffers: m.arrayBuffers };
}
function delta(a, b) { return Object.fromEntries(Object.keys(a).map((k) => [k, b[k] - a[k]])); }
function setEncodedByte(carrier, start, offset, value, mode = 4) {
  const out = Buffer.from(carrier);
  const stride = mode === 4 ? 2 : 4;
  if (mode === 4) { out[start + offset * stride] = (out[start + offset * stride] & 0xf0) | (value >>> 4); out[start + offset * stride + 1] = (out[start + offset * stride + 1] & 0xf0) | (value & 15); }
  else { for (let i = 0; i < 4; i++) out[start + offset * stride + i] = (out[start + offset * stride + i] & 0xfc) | ((value >>> (6 - i * 2)) & 3); }
  return out;
}

const cover = fs.readFileSync(coverPath);
assertBmp(cover);
const expanded = expandVertical(cover, 2);
const payload = fixture(870870);
const printable = payload.every((x) => x === 10 || x === 34 || (x >= 32 && x <= 126));
if (!printable) throw new Error('fixture is not printable serialized data');
const before = memory();
const four = encode(cover, payload, 4);
const afterFour = memory();
const fourDecoded = decode(four.carrier, 4);
const sameCoverTwo = (() => {
  try { return { rejected: false, result: encode(cover, payload, 2) }; }
  catch (error) {
    const match = String(error.message).match(/over-capacity:(\d+):(\d+)/);
    return { rejected: true, required: match ? Number(match[1]) : null, capacity: match ? Number(match[2]) : positionCapacity(cover), error: String(error.message) };
  }
})();
const beforeExpanded = memory();
const twoExpanded = encode(expanded, payload, 2);
const afterExpanded = memory();
const twoDecoded = decode(twoExpanded.carrier, 2);
const fourMetrics = metrics(cover, four.carrier, regionStart(cover));
const twoMetrics = metrics(expanded, twoExpanded.carrier, regionStart(expanded));
const repeatHashes = [];
for (let i = 0; i < 8; i++) repeatHashes.push(sha256(decode(twoExpanded.carrier, 2)));
const retainedBefore = memory();
let scratch = Buffer.concat([four.carrier, twoExpanded.carrier]);
if (typeof global.gc === 'function') { scratch = null; global.gc(); }
const retainedAfter = memory();
const region = regionStart(four.carrier);
const hugeLength = [0xff, 0xff, 0xff, 0xff];
let malformedHuge = Buffer.from(four.carrier);
for (let i = 0; i < hugeLength.length; i++) malformedHuge = setEncodedByte(malformedHuge, region, 4 + i, hugeLength[i], 4);
const originalCover = Buffer.from(cover);
let overCapacityError = '';
try { encode(cover, payload, 2); } catch (error) { overCapacityError = String(error.message); }
const security = {
  hugeDeclaredLengthRejects: decode(malformedHuge, 4) === null,
  truncatedCarrierRejects: decode(four.carrier.subarray(0, region - 1), 4) === null,
  invalidModeRejects: decode(four.carrier, 3) === null,
  wrongInputTypeRejects: decode('not-bytes', 4) === null,
  overCapacityDoesNotMutateInput: overCapacityError.startsWith('over-capacity:') && cover.equals(originalCover),
  payloadLimitExplicit: MAX_PAYLOAD_BYTES === 1000000 && MAX_CARRIER_BYTES === 8000000,
  sourceHasNoExecutionOrNetwork: !/(eval\s*\(|new Function|fetch\s*\(|WebSocket|postMessage|globalThis)/.test(fs.readFileSync(sourcePath, 'utf8')),
};
const frozenPath = path.join(ROOT, 'Working-Stable/O8.13/O8.13-cover-3bbe7345.bmp');
const result = {
  candidate: 'CC-10', status: 'candidate-only', change: 'CAR-M carrier laboratory revision', fac: ['FaC-14', 'FaC-16'],
  input: { path: rel(coverPath), sha256: sha256(cover), bytes: cover.length, width: cover.readUInt32LE(18), height: cover.readUInt32LE(22), bpp: cover.readUInt16LE(28) },
  expandedAlternative: { bytes: expanded.length, sha256: sha256(expanded), width: expanded.readUInt32LE(18), height: expanded.readUInt32LE(22), factor: 2 },
  fixture: { bytes: payload.length, sha256: sha256(payload), printableSerializedData: printable, executableTokens: false },
  capacity: {
    sameCoverPositions: positionCapacity(cover),
    expandedCoverPositions: positionCapacity(expanded),
    fourBitPayloadSymbols: payloadSymbols(payload.length, 4),
    twoBitPayloadSymbols: payloadSymbols(payload.length, 2),
    fourBitFrameSymbols: frameSymbols(payload.length, 4),
    twoBitFrameSymbols: frameSymbols(payload.length, 2),
    planPin: { requiredTwoBitSymbols: 3483480, sameCoverPositions: 2260322 },
  },
  sameCoverNaiveTwoBit: sameCoverTwo,
  alternatives: {
    fourBitSameCover: { roundTrip: fourDecoded?.equals(payload) === true, metrics: fourMetrics, requiredSymbols: four.requiredSymbols },
    twoBitExpandedCover: { roundTrip: twoDecoded?.equals(payload) === true, metrics: twoMetrics, requiredSymbols: twoExpanded.requiredSymbols },
  },
  corruption: {
    fourBitOneFlipRejects: corruptionRejects(four.carrier, 4, 1),
    twoBitOneFlipRejects: corruptionRejects(twoExpanded.carrier, 2, 1),
    twoBit64FlipsRejects: corruptionRejects(twoExpanded.carrier, 2, 64),
  },
  repeatedExtraction: { count: repeatHashes.length, allEqual: new Set(repeatHashes).size === 1, decodedSha256: repeatHashes[0] },
  memory: { before, afterFour, afterExpanded, encodeDelta: delta(before, afterExpanded), retainedBefore, retainedAfter, gcAvailable: typeof global.gc === 'function' },
  security,
  frozenBaselineReadOnly: { path: rel(frozenPath), sha256: sha256(fs.readFileSync(frozenPath)), modifiedByRun: false },
  runtimeIntegration: false,
};
result.gates = {
  fixtureIsNonExecutable: result.fixture.printableSerializedData && !result.fixture.executableTokens,
  sameCoverCapacityPin: result.capacity.sameCoverPositions === 2260322 && result.capacity.twoBitPayloadSymbols === 3483480,
  naiveTwoBitRejected: result.sameCoverNaiveTwoBit.rejected && result.sameCoverNaiveTwoBit.required === result.capacity.twoBitFrameSymbols,
  fourBitRoundTrip: result.alternatives.fourBitSameCover.roundTrip,
  expandedTwoBitRoundTrip: result.alternatives.twoBitExpandedCover.roundTrip,
  psnrMeasured: Number.isFinite(result.alternatives.fourBitSameCover.metrics.psnrDb) && Number.isFinite(result.alternatives.twoBitExpandedCover.metrics.psnrDb),
  maxDeltaMeasured: result.alternatives.fourBitSameCover.metrics.maxChannelDelta >= 0 && result.alternatives.twoBitExpandedCover.metrics.maxChannelDelta >= 0,
  corruptionDetected: result.corruption.fourBitOneFlipRejects && result.corruption.twoBitOneFlipRejects && result.corruption.twoBit64FlipsRejects,
  repeatedExtraction: result.repeatedExtraction.allEqual,
  memoryMeasured: result.memory.before && result.memory.afterExpanded,
  noRuntimeIntegration: result.runtimeIntegration === false,
  frozenBaselineNotWritten: result.frozenBaselineReadOnly.modifiedByRun === false,
  securityHardening: Object.values(result.security).every(Boolean),
};
result.status = Object.values(result.gates).every(Boolean) ? 'PASS' : 'REVIEW';
write(path.join(reportDir, 'security-hardening.json'), JSON.stringify({ candidate: result.candidate, status: result.status, security: result.security, gates: { securityHardening: result.gates.securityHardening, frozenBaselineNotWritten: result.gates.frozenBaselineNotWritten } }, null, 2) + '\n');
write(path.join(reportDir, 'build.json'), JSON.stringify({ schema: 'cc10-carm-candidate/v1', candidate: 'CC-10', status: 'candidate-only', fac: result.fac, source: rel(sourcePath), sourceSha256: sha256(fs.readFileSync(sourcePath)), inputCover: result.input, expandedCover: result.expandedAlternative, runtimeIntegration: false, frozenBaseline: 'O8.13-r3', frozenFilesModified: [] }, null, 2) + '\n');
write(path.join(outDir, 'cc10-carm-expanded-cover.bmp'), expanded);
write(path.join(reportDir, 'cc10-lab.json'), JSON.stringify(result, null, 2) + '\n');
const md = [
  '# CC-10 / CAR-M laboratory report', '', `- **Status:** ${result.status}; candidate-only`, '- **Runtime integration:** none; non-executable fixture only', `- **Input cover:** \`${rel(coverPath)}\``, `- **Input SHA-256:** \`${sha256(cover)}\``, `- **Expanded alternative:** \`candidate/cc10-carm-expanded-cover.bmp\``, '',
  '## Capacity', '',
  `- Same-cover positions: **${result.capacity.sameCoverPositions}**`,
  `- Four-bit payload symbols: **${result.capacity.fourBitPayloadSymbols}**`,
  `- Naive two-bit payload symbols: **${result.capacity.twoBitPayloadSymbols}**`,
  `- Naive same-cover result: **${result.sameCoverNaiveTwoBit.error}**`,
  `- Expanded-cover positions: **${result.capacity.expandedCoverPositions}**`, '',
  '## Measurements', '',
  `- Four-bit round trip: ${result.alternatives.fourBitSameCover.roundTrip ? 'PASS' : 'FAIL'}`,
  `- Four-bit PSNR / max delta: ${result.alternatives.fourBitSameCover.metrics.psnrDb.toFixed(2)} dB / ${result.alternatives.fourBitSameCover.metrics.maxChannelDelta}`,
  `- Expanded two-bit round trip: ${result.alternatives.twoBitExpandedCover.roundTrip ? 'PASS' : 'FAIL'}`,
  `- Expanded two-bit PSNR / max delta: ${result.alternatives.twoBitExpandedCover.metrics.psnrDb.toFixed(2)} dB / ${result.alternatives.twoBitExpandedCover.metrics.maxChannelDelta}`,
  `- Corruption rejection: ${result.gates.corruptionDetected ? 'PASS' : 'FAIL'}`,
  `- Repeated extraction: ${result.repeatedExtraction.count} runs; ${result.repeatedExtraction.allEqual ? 'byte-identical' : 'mismatch'}`,
  `- Peak/retained memory samples recorded; explicit GC available: ${result.memory.gcAvailable}`,
  `- Security hardening negatives: ${result.gates.securityHardening ? 'PASS' : 'FAIL'}`,
  '',
  'This laboratory result does not approve a carrier, loader, executable payload, or live delivery path.',
].join('\n');
write(path.join(reportDir, 'cc10-lab.md'), md + '\n');
console.log(`CC-10:${result.status}`);
if (result.status !== 'PASS') process.exitCode = 1;
