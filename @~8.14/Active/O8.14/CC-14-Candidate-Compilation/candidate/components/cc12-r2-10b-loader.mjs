// CC-12 / R2-10B delivery/loader integration candidate.
// It integrates the offline R9R0..R9R3 codec at an injected delivery boundary.
// No route, fetch, host global, timer, listener, or executable evaluator is created here.
import { LANES, encode, decode } from './r2-10b-codec.mjs';

export const MAX_ENVELOPE_BYTES = 1024 * 1024;
export const MAX_RECORD_BYTES = 512 * 1024;
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const ALPHABET_INDEX = new Map(Array.from(ALPHABET, (char, index) => [char, index]));
const ENCODER = new TextEncoder();
const DECODER = new TextDecoder('utf-8', { fatal: true });
function boundedLimit(value) { return Number.isSafeInteger(value) && value >= 0 ? Math.min(value, MAX_RECORD_BYTES) : MAX_RECORD_BYTES; }
function safeRoute(route) { return typeof route === 'string' && route.length > 0 && route.length <= 256 && route.startsWith('/') && !route.startsWith('//') && !/[\u0000-\u001f\u007f]/.test(route); }

function bytesOnly(value) {
  if (!(value instanceof Uint8Array)) throw new Error('bytes-required');
  return value;
}
function base64Encode(input) {
  const bytes = bytesOnly(input);
  let out = '';
  for (let i = 0; i < bytes.length; i += 3) {
    const a = bytes[i], b = i + 1 < bytes.length ? bytes[i + 1] : 0, c = i + 2 < bytes.length ? bytes[i + 2] : 0;
    const n = (a << 16) | (b << 8) | c;
    out += ALPHABET[(n >>> 18) & 63] + ALPHABET[(n >>> 12) & 63] + (i + 1 < bytes.length ? ALPHABET[(n >>> 6) & 63] : '=') + (i + 2 < bytes.length ? ALPHABET[n & 63] : '=');
  }
  return out;
}
function base64Decode(text, maxBytes) {
  if (typeof text !== 'string' || text.length > Math.ceil(maxBytes * 4 / 3) + 4 || text.length % 4 !== 0) return null;
  const padding = text.endsWith('==') ? 2 : text.endsWith('=') ? 1 : 0;
  const out = new Uint8Array(Math.max(0, (text.length / 4) * 3 - padding));
  let at = 0;
  for (let i = 0; i < text.length; i += 4) {
    const chars = text.slice(i, i + 4);
    if (chars[2] === '=' && chars[3] !== '=' || (i + 4 < text.length && chars.includes('='))) return null;
    const a = ALPHABET_INDEX.get(chars[0]), b = ALPHABET_INDEX.get(chars[1]);
    const c = chars[2] === '=' ? 0 : ALPHABET_INDEX.get(chars[2]);
    const d = chars[3] === '=' ? 0 : ALPHABET_INDEX.get(chars[3]);
    if ([a, b, c, d].some((x) => x === undefined)) return null;
    const n = (a << 18) | (b << 12) | (c << 6) | d;
    if (at < out.length) out[at++] = (n >>> 16) & 255;
    if (at < out.length) out[at++] = (n >>> 8) & 255;
    if (at < out.length) out[at++] = n & 255;
  }
  return out;
}
function safeKind(meta) { return meta && typeof meta.kind === 'string' ? meta.kind.slice(0, 48) : 'serialized-record'; }

export function packEnvelope(recordInput, metadata = {}, maxRecordBytes = MAX_RECORD_BYTES) {
  const record = bytesOnly(recordInput);
  const limit = boundedLimit(maxRecordBytes);
  if (record.length > limit) throw new Error('record-too-large');
  const value = {
    v: 'r2-10b', codec: LANES.join('..'), type: 'serialized-record',
    length: record.length, kind: safeKind(metadata), data: base64Encode(record),
  };
  const packed = ENCODER.encode(JSON.stringify(value));
  if (packed.length > MAX_ENVELOPE_BYTES) throw new Error('envelope-too-large');
  return packed;
}

export function parseEnvelope(input, maxRecordBytes = MAX_RECORD_BYTES) {
  if (!(input instanceof Uint8Array)) return { ok: false, reason: 'bytes-required' };
  const bytes = input;
  const limit = boundedLimit(maxRecordBytes);
  if (bytes.length === 0 || bytes.length > MAX_ENVELOPE_BYTES) return { ok: false, reason: 'envelope-bounds' };
  let value;
  try {
    const text = DECODER.decode(bytes);
    if (text.length > MAX_ENVELOPE_BYTES) return { ok: false, reason: 'text-bounds' };
    value = JSON.parse(text);
  } catch (error) { return { ok: false, reason: 'envelope-json' }; }
  if (!value || typeof value !== 'object' || Array.isArray(value) || Object.getPrototypeOf(value) !== Object.prototype) return { ok: false, reason: 'envelope-shape' };
  if (value.v !== 'r2-10b' || value.codec !== LANES.join('..') || value.type !== 'serialized-record' || typeof value.kind !== 'string' || value.kind.length > 48 || !Number.isSafeInteger(value.length) || value.length < 0 || value.length > limit || typeof value.data !== 'string') return { ok: false, reason: 'envelope-fields' };
  const record = base64Decode(value.data, limit);
  if (!record || record.length !== value.length) return { ok: false, reason: 'envelope-data' };
  return { ok: true, record, metadata: { kind: value.kind, codec: value.codec, version: value.v } };
}

export function buildCarrier(slots, record, metadata = {}) {
  const envelope = packEnvelope(record, metadata);
  const encoded = encode(slots, envelope);
  return { ...encoded, envelopeBytes: envelope.length };
}

export function loadCarrier(slots, maxRecordBytes = MAX_RECORD_BYTES) {
  try {
    const envelope = decode(slots);
    if (!envelope) return { ok: false, reason: 'codec-reject' };
    return parseEnvelope(envelope, maxRecordBytes);
  } catch (error) { return { ok: false, reason: 'bounded-reject' }; }
}

export function createDeliveryLoader({ allowlist = [], send = null, maxRecordBytes = MAX_RECORD_BYTES } = {}) {
  const limit = boundedLimit(maxRecordBytes);
  const routes = new Set(Array.isArray(allowlist) ? allowlist.slice(0, 64).filter(safeRoute) : []);
  const cleanup = new Set();
  let closed = false, accepted = 0, rejected = 0, delivered = 0;
  const addCleanup = (fn) => {
    if (closed || typeof fn !== 'function' || cleanup.size >= 64) return () => {};
    let done = false;
    const tracked = () => { if (done) return; done = true; cleanup.delete(tracked); try { fn(); } catch (error) {} };
    cleanup.add(tracked);
    return tracked;
  };
  const allowed = (route) => safeRoute(route) && routes.has(route);
  const load = (slots, { route } = {}) => {
    if (closed) return { ok: false, reason: 'closed' };
    if (route !== undefined && !allowed(route)) { rejected++; return { ok: false, reason: 'route-denied' }; }
    const result = loadCarrier(slots, limit);
    if (result.ok) accepted++; else rejected++;
    return result;
  };
  const deliver = async (route, record, metadata = {}) => {
    if (closed) return { ok: false, reason: 'closed' };
    if (!allowed(route)) { rejected++; return { ok: false, reason: 'route-denied' }; }
    if (typeof send !== 'function') { rejected++; return { ok: false, reason: 'offline-no-sender' }; }
    let body;
    try { body = packEnvelope(record, metadata, limit); } catch (error) { rejected++; return { ok: false, reason: 'envelope-reject' }; }
    try {
      const response = await send({ route, body, contentType: 'application/octet-stream' });
      delivered++;
      return { ok: true, response };
    } catch (error) { rejected++; return { ok: false, reason: 'delivery-error' }; }
  };
  const close = () => { if (closed) return 0; closed = true; for (const fn of Array.from(cleanup)) fn(); return cleanup.size; };
  return Object.freeze({ load, deliver, addCleanup, close, stats: () => Object.freeze({ accepted, rejected, delivered, pendingCleanup: cleanup.size, closed }) });
}
