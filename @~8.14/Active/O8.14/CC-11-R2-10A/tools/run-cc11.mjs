// CC-11 / R2-10A offline four-way codec verification. No delivery or loader integration.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..', '..', '..');
const rel = (p) => path.relative(ROOT, p).replaceAll(path.sep, '/');
const write = (p, value) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, value); };
const sha256 = (v) => crypto.createHash('sha256').update(v).digest('hex');
const sourcePath = path.join(HERE, '..', 'source/r2-10a-codec.mjs');
const reportDir = path.join(HERE, '..', 'reports');
const candidateDir = path.join(HERE, '..', 'candidate');
const { LANES, HEADER_BYTES, MAX_PAYLOAD, MAX_SLOTS, encode, decode, capacity, requiredSymbols, makeFixture, flip } = await import(pathToFileURL(sourcePath));

function setLaneByte(slotsInput, lane, byteIndex, value) {
  const slots = Uint8Array.from(slotsInput);
  const start = lane + byteIndex * 16;
  slots[start] = (slots[start] & 0xfc) | ((value >>> 6) & 3);
  slots[start + 4] = (slots[start + 4] & 0xfc) | ((value >>> 4) & 3);
  slots[start + 8] = (slots[start + 8] & 0xfc) | ((value >>> 2) & 3);
  slots[start + 12] = (slots[start + 12] & 0xfc) | (value & 3);
  return slots;
}
function mem() { const m = process.memoryUsage(); return { rss: m.rss, heapUsed: m.heapUsed, external: m.external, arrayBuffers: m.arrayBuffers }; }
const slotCount = 1400000;
const slots = new Uint8Array(slotCount);
for (let i = 0; i < slots.length; i++) slots[i] = (Math.imul(i, 2654435761) + (i >>> 7)) & 255;
const payload = makeFixture(320000);
const source = fs.readFileSync(sourcePath, 'utf8');
const before = mem();
const first = encode(slots, payload);
const afterEncode = mem();
const second = encode(slots, payload);
const afterSecond = mem();
const decoded = decode(first.slots);
const corrupted = flip(first.slots, LANES.length * 0 + HEADER_BYTES * 16, 1);
const wrongLaneTag = flip(first.slots, 0, 1);
const hugeLength = [0xff, 0xff, 0xff, 0xff];
let oversizedHeader = first.slots;
for (let i = 0; i < hugeLength.length; i++) oversizedHeader = setLaneByte(oversizedHeader, 0, 4 + i, hugeLength[i]);
const badVersion = setLaneByte(first.slots, 2, 13, 2);
let oversizedEncodeRejects = false;
try { encode(slots, makeFixture(MAX_PAYLOAD + 1)); } catch (error) { oversizedEncodeRejects = String(error.message) === 'payload-too-large'; }
const security = {
  hugeDeclaredLengthRejects: decode(oversizedHeader) === null,
  badVersionRejects: decode(badVersion) === null,
  truncatedSlotsReject: decode(first.slots.subarray(0, 100)) === null,
  wrongInputTypeReject: decode('not-bytes') === null,
  oversizedEncodeRejects,
  carrierLimitExplicit: MAX_PAYLOAD === 1000000 && MAX_SLOTS === 8000000,
  noExecutionOrNetwork: !/(fetch\s*\(|XMLHttpRequest|WebSocket|postMessage|globalThis|eval\s*\(|new Function|setTimeout)/.test(source),
};
const repeatHashes = [];
for (let i = 0; i < 16; i++) repeatHashes.push(sha256(decode(first.slots)));
if (typeof global.gc === 'function') { global.gc(); }
const afterGc = mem();
const result = {
  candidate: 'CC-11', status: 'candidate-only', change: 'R2-10A offline true-four-way codec revision', fac: ['FaC-15', 'FaC-16'],
  lanes: [...LANES], slotCount, payloadBytes: payload.length, payloadSha256: sha256(payload),
  capacity: capacity(slots), requiredSymbols: requiredSymbols(payload.length),
  plan: first.plans, deterministic: Buffer.from(first.slots).equals(Buffer.from(second.slots)),
  roundTrip: decoded && Buffer.from(decoded).equals(Buffer.from(payload)),
  corruption: { payloadSlotRejects: decode(corrupted) === null, laneHeaderRejects: decode(wrongLaneTag) === null },
  repeatedExtraction: { count: repeatHashes.length, allEqual: new Set(repeatHashes).size === 1, decodedSha256: repeatHashes[0] },
  memory: { before, afterEncode, afterSecond, afterGc, gcAvailable: typeof global.gc === 'function' },
  security,
  static: {
    allLanesNamed: LANES.every((tag, i) => source.includes(tag) && source.includes(`tag, lane`)) && source.includes('R9R0') && source.includes('R9R1') && source.includes('R9R2') && source.includes('R9R3'),
    independentLaneHeaders: source.includes('header[12] !== lane') && source.includes('crc32(chunk)'),
    boundedLengths: source.includes('MAX_PAYLOAD') && source.includes('length > MAX_PAYLOAD'),
    offlineOnly: !/(fetch\s*\(|XMLHttpRequest|WebSocket|window|document|globalThis|postMessage|eval\s*\(|new Function|setTimeout)/.test(source),
  },
  deliveryIntegration: false,
};
result.gates = {
  fourLanes: result.lanes.join(',') === 'R9R0,R9R1,R9R2,R9R3',
  allLanesUsed: result.plan.length === 4 && result.plan.every((p) => p.chunkBytes > 0 && p.tag === LANES[p.lane]),
  offlineRoundTrip: result.roundTrip === true,
  deterministic: result.deterministic,
  corruptionBounded: result.corruption.payloadSlotRejects && result.corruption.laneHeaderRejects,
  repeatedExtraction: result.repeatedExtraction.allEqual,
  boundedParser: result.static.boundedLengths,
  noDeliverySurface: result.static.offlineOnly && result.deliveryIntegration === false,
  memoryMeasured: !!result.memory.before && !!result.memory.afterGc,
  securityHardening: Object.values(result.security).every(Boolean),
};
result.status = Object.values(result.gates).every(Boolean) ? 'PASS' : 'REVIEW';
write(path.join(reportDir, 'security-hardening.json'), JSON.stringify({ candidate: result.candidate, status: result.status, security: result.security, gates: { securityHardening: result.gates.securityHardening, noDeliverySurface: result.gates.noDeliverySurface } }, null, 2) + '\n');
write(path.join(reportDir, 'build.json'), JSON.stringify({ schema: 'cc11-r2-10a-candidate/v1', candidate: 'CC-11', status: 'candidate-only', fac: result.fac, source: rel(sourcePath), sourceSha256: sha256(fs.readFileSync(sourcePath)), lanes: result.lanes, offlineOnly: true, deliveryIntegration: false, frozenBaseline: 'O8.13-r3', frozenFilesModified: [] }, null, 2) + '\n');
write(path.join(candidateDir, 'cc11-r2-10a-vector.json'), JSON.stringify({ lanes: result.lanes, slotCount, payloadBytes: payload.length, payloadSha256: result.payloadSha256, encodedSha256: sha256(first.slots), requiredSymbols: result.requiredSymbols, plans: result.plan }, null, 2) + '\n');
write(path.join(reportDir, 'cc11-verification.json'), JSON.stringify(result, null, 2) + '\n');
const md = [
  '# CC-11 / R2-10A offline verification', '', `- **Status:** ${result.status}; candidate-only`, '- **Delivery/loader integration:** deliberately absent; this is the offline codec gate', `- **Lanes:** ${result.lanes.join(', ')}`, `- **Slots:** ${slotCount.toLocaleString()}`, `- **Fixture:** ${payload.length.toLocaleString()} bytes of serialized non-executable data`, '',
  '## Results', '',
  `- Round trip: ${result.roundTrip ? 'PASS' : 'FAIL'}`,
  `- Deterministic encoding: ${result.deterministic ? 'PASS' : 'FAIL'}`,
  `- Lane-specific corruption rejection: ${result.gates.corruptionBounded ? 'PASS' : 'FAIL'}`,
  `- Repeated extraction: ${result.repeatedExtraction.count} runs; ${result.repeatedExtraction.allEqual ? 'byte-identical' : 'mismatch'}`,
  `- Bounded length and offline-only checks: ${result.gates.boundedParser && result.gates.noDeliverySurface ? 'PASS' : 'FAIL'}`,
  `- Security hardening negatives: ${result.gates.securityHardening ? 'PASS' : 'FAIL'}`,
  `- Memory samples recorded; explicit GC available: ${result.memory.gcAvailable}`, '',
  'CC-11 is not a delivery decision. CC-12 remains a separate loader-integration candidate.',
].join('\n');
write(path.join(reportDir, 'cc11-verification.md'), md + '\n');
console.log(`CC-11:${result.status}`);
if (result.status !== 'PASS') process.exitCode = 1;
