// CC-12 / R2-10B loader integration verification. Delivery is injected and allowlisted; no network.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..', '..', '..');
const rel = (p) => path.relative(ROOT, p).replaceAll(path.sep, '/');
const sha256 = (v) => crypto.createHash('sha256').update(v).digest('hex');
const write = (p, value) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, value); };
const sourceDir = path.join(HERE, '..', 'source');
const codecPath = path.join(sourceDir, 'r2-10b-codec.mjs');
const loaderPath = path.join(sourceDir, 'r2-10b-loader.mjs');
const reportDir = path.join(HERE, '..', 'reports');
const candidateDir = path.join(HERE, '..', 'candidate');
const bundle = path.join(ROOT, 'Active/O8.14/CC-09-R2-08/candidate/cc09-r2-08-raw-bundle.js');
const rotation = path.join(ROOT, 'Working-Stable/O8.13/rotation.json');
const stress = path.join(ROOT, 'Active/O8.13/tools/chore-stress.mjs');
const codec = await import(pathToFileURL(codecPath));
const loader = await import(pathToFileURL(loaderPath));

function mem() { const m = process.memoryUsage(); return { rss: m.rss, heapUsed: m.heapUsed, external: m.external, arrayBuffers: m.arrayBuffers }; }
function metadataFixture(length = 48000) {
  const seed = new TextEncoder().encode('{"kind":"cc12-delivery-record","executable":false,"primary":"desktop-stream-preserved","value":"bounded"}');
  const out = new Uint8Array(length);
  for (let i = 0; i < out.length; i++) out[i] = seed[i % seed.length];
  return out;
}
function slotsFixture(length = 1400000) {
  const out = new Uint8Array(length);
  for (let i = 0; i < out.length; i++) out[i] = (Math.imul(i, 1103515245) + 12345 + (i >>> 5)) & 255;
  return out;
}
function runPrimary() {
  const r = spawnSync(process.execPath, [stress, 'S1', '7'], { cwd: ROOT, env: { ...process.env, CS_BUNDLE: bundle, CS_ROTATION: rotation, NO_PROXY: '*', HTTP_PROXY: '', HTTPS_PROXY: '' }, encoding: 'utf8', timeout: 90000, maxBuffer: 2 * 1024 * 1024 });
  const text = `${r.stdout ?? ''}\n${r.stderr ?? ''}`;
  return { exitCode: r.status, allPass: r.status === 0 && text.includes('ALL PASS'), tail: text.trim().split(/\r?\n/).slice(-6) };
}

const source = fs.readFileSync(loaderPath, 'utf8') + fs.readFileSync(codecPath, 'utf8');
const route = '/approved-existing-boundary';
const slots = slotsFixture();
const record = metadataFixture();
const before = mem();
const encoded = loader.buildCarrier(slots, record, { kind: 'cc12-test' });
const afterEncode = mem();
const sent = [];
const delivery = loader.createDeliveryLoader({ allowlist: [route], send: async (request) => { sent.push(request); return { accepted: true }; } });
const loaded = delivery.load(encoded.slots);
const loadedOnRoute = delivery.load(encoded.slots, { route });
const deniedLoad = delivery.load(encoded.slots, { route: '/not-allowlisted' });
const delivered = await delivery.deliver(route, record, { kind: 'cc12-delivery' });
const deniedDelivery = await delivery.deliver('/not-allowlisted', record);
let cleanCalls = 0;
const offA = delivery.addCleanup(() => { cleanCalls++; });
const offB = delivery.addCleanup(() => { cleanCalls++; });
const closeOne = delivery.close();
const closeTwo = delivery.close();
offA(); offB();
const corrupted = Uint8Array.from(encoded.slots);
corrupted[256] ^= 1;
const probe = loader.createDeliveryLoader({ allowlist: [route] });
const corruptResult = probe.load(corrupted);
const malformed = loader.parseEnvelope(new Uint8Array(loader.MAX_ENVELOPE_BYTES + 1));
const invalidBase64 = loader.parseEnvelope(new TextEncoder().encode(JSON.stringify({ v: 'r2-10b', codec: codec.LANES.join('..'), type: 'serialized-record', length: 1, kind: 'x', data: '!!!!' })));
const badInput = probe.load('not-bytes');
const unsafeLoader = loader.createDeliveryLoader({ allowlist: [route, 'https://external.invalid', '//external.invalid', '/bad\\nroute'] });
const unsafeDelivery = await unsafeLoader.deliver('https://external.invalid', record);
const throwingLoader = loader.createDeliveryLoader({ allowlist: [route], send: async () => { throw new Error('sender-failure'); } });
const throwingDelivery = await throwingLoader.deliver(route, record);
let oversizedDelivery;
const oversizedProbe = loader.createDeliveryLoader({ allowlist: [route], send: async () => ({ accepted: true }) });
try { oversizedDelivery = await oversizedProbe.deliver(route, new Uint8Array(loader.MAX_RECORD_BYTES + 1)); } catch (error) { oversizedDelivery = { ok: true, unexpectedThrow: true }; }
const primary = runPrimary();
if (typeof global.gc === 'function') global.gc();
const afterGc = mem();
const result = {
  candidate: 'CC-12', status: 'candidate-only', change: 'R2-10B delivery/loader integration revision', fac: ['FaC-03', 'FaC-06', 'FaC-10', 'FaC-15', 'FaC-16'],
  codec: { lanes: [...codec.LANES], sourceSha256: sha256(fs.readFileSync(codecPath)), encodedSha256: sha256(encoded.slots), envelopeBytes: encoded.envelopeBytes },
  fixture: { bytes: record.length, sha256: sha256(record), executable: false },
  loader: {
    loaded: loaded.ok === true && loaded.record.length === record.length && sha256(loaded.record) === sha256(record),
    loadedOnAllowlistedRoute: loadedOnRoute.ok === true,
    deniedLoad: deniedLoad.ok === false && deniedLoad.reason === 'route-denied',
    delivered: delivered.ok === true && delivered.response?.accepted === true && sent.length === 1 && sent[0].route === route,
    deniedDelivery: deniedDelivery.ok === false && deniedDelivery.reason === 'route-denied' && sent.length === 1,
    deliveredEnvelopeParses: sent.length === 1 && loader.parseEnvelope(sent[0].body).ok === true,
    cleanupIdempotent: cleanCalls === 2 && closeOne === 0 && closeTwo === 0 && delivery.stats().pendingCleanup === 0,
    corruptedCarrierRejected: corruptResult.ok === false && corruptResult.reason === 'codec-reject',
    malformedEnvelopeRejected: malformed.ok === false && malformed.reason === 'envelope-bounds',
  },
  primaryRegression: primary,
  security: {
    corruptCarrierRejected: corruptResult.ok === false && corruptResult.reason === 'codec-reject',
    invalidBase64Rejected: invalidBase64.ok === false && invalidBase64.reason === 'envelope-data',
    invalidInputRejected: badInput.ok === false && badInput.reason === 'codec-reject',
    unsafeRouteRejected: unsafeDelivery.ok === false && unsafeDelivery.reason === 'route-denied',
    throwingSenderContained: throwingDelivery.ok === false && throwingDelivery.reason === 'delivery-error',
    oversizedDeliveryRejected: oversizedDelivery.ok === false && oversizedDelivery.reason === 'envelope-reject',
    closedLoaderRejects: delivery.load(encoded.slots).ok === false && delivery.load(encoded.slots).reason === 'closed',
  },
  memory: { before, afterEncode, afterGc, gcAvailable: typeof global.gc === 'function' },
  static: {
    boundedParser: source.includes('MAX_ENVELOPE_BYTES') && source.includes('MAX_RECORD_BYTES') && source.includes('JSON.parse') && source.includes('record.length !== value.length'),
    noNewNetwork: !/(fetch\s*\(|XMLHttpRequest|WebSocket|postMessage|BroadcastChannel)/.test(source),
    noDynamicCode: !/(eval\s*\(|new Function|Function\s*\()/.test(source),
    noNewGlobal: !/(globalThis|window\.|document\.|navigator\.)/.test(source),
    noHardcodedRoute: !/https?:\/\/|\/api\//.test(source),
    explicitCleanup: source.includes('addCleanup') && source.includes('close'),
    trueFourWay: ['R9R0', 'R9R1', 'R9R2', 'R9R3'].every((tag) => source.includes(tag)),
  },
};
result.gates = {
  codecRoundTrip: result.loader.loaded,
  allowlistedDeliveryOnly: result.loader.loadedOnAllowlistedRoute && result.loader.deniedLoad && result.loader.delivered && result.loader.deniedDelivery,
  boundedParserAndCorruption: result.loader.deliveredEnvelopeParses && result.loader.corruptedCarrierRejected && result.loader.malformedEnvelopeRejected && result.static.boundedParser,
  explicitCleanup: result.loader.cleanupIdempotent && result.static.explicitCleanup,
  noNewNetworkOrDynamicCode: result.static.noNewNetwork && result.static.noDynamicCode && result.static.noNewGlobal && result.static.noHardcodedRoute,
  trueFourWayIntegrated: result.static.trueFourWay,
  primaryPreserved: result.primaryRegression.allPass,
  memoryMeasured: !!result.memory.before && !!result.memory.afterGc,
  securityHardening: Object.values(result.security).every(Boolean),
};
result.status = Object.values(result.gates).every(Boolean) ? 'PASS' : 'REVIEW';
write(path.join(reportDir, 'security-hardening.json'), JSON.stringify({ candidate: result.candidate, status: result.status, security: result.security, gates: { securityHardening: result.gates.securityHardening, noNewNetworkOrDynamicCode: result.gates.noNewNetworkOrDynamicCode, explicitCleanup: result.gates.explicitCleanup } }, null, 2) + '\n');
write(path.join(reportDir, 'build.json'), JSON.stringify({ schema: 'cc12-r2-10b-candidate/v1', candidate: 'CC-12', status: 'candidate-only', fac: result.fac, sources: { codec: { path: rel(codecPath), sha256: result.codec.sourceSha256 }, loader: { path: rel(loaderPath), sha256: sha256(fs.readFileSync(loaderPath)) } }, deliveryModel: 'injected sender plus caller-supplied allowlist', frozenBaseline: 'O8.13-r3', frozenFilesModified: [] }, null, 2) + '\n');
write(path.join(candidateDir, 'cc12-loader-vector.json'), JSON.stringify({ routePolicy: 'caller-supplied allowlist only', lanes: result.codec.lanes, envelopeBytes: result.codec.envelopeBytes, encodedSha256: result.codec.encodedSha256, recordSha256: result.fixture.sha256 }, null, 2) + '\n');
write(path.join(reportDir, 'cc12-verification.json'), JSON.stringify(result, null, 2) + '\n');
const md = [
  '# CC-12 / R2-10B delivery-loader verification', '', `- **Status:** ${result.status}; candidate-only`, '- **Delivery model:** injected sender with caller-supplied allowlist; no fetch or host route is created', `- **Codec:** ${result.codec.lanes.join(', ')}`, `- **Envelope:** ${result.codec.envelopeBytes} bytes`, '',
  '## Gates', '',
  ...Object.entries(result.gates).map(([key, value]) => `- ${value ? 'PASS' : 'REVIEW'} — ${key}`), '',
  '## Integration checks', '',
  `- Allowlisted delivery: ${result.loader.delivered ? 'PASS' : 'FAIL'}`,
  `- Unallowlisted load/delivery rejection: ${result.loader.deniedLoad && result.loader.deniedDelivery ? 'PASS' : 'FAIL'}`,
  `- Bounded envelope and carrier corruption rejection: ${result.gates.boundedParserAndCorruption ? 'PASS' : 'FAIL'}`,
  `- Cleanup idempotence: ${result.loader.cleanupIdempotent ? 'PASS' : 'FAIL'}`,
  `- Security hardening negatives: ${result.gates.securityHardening ? 'PASS' : 'FAIL'}`,
  `- S1 desktop/stream regression: ${result.primaryRegression.allPass ? 'PASS' : 'FAIL'}`, '',
  'CC-12 remains candidate-only. The proper 14r1 sharding/stego/packaging/password-test runner and explicit GO LIVE gates are not completed by this candidate.',
].join('\n');
write(path.join(reportDir, 'cc12-verification.md'), md + '\n');
console.log(`CC-12:${result.status}`);
if (result.status !== 'PASS') process.exitCode = 1;
