// CC-10 / CAR-M offline laboratory codec.
// This file handles non-executable byte records only; it is not a delivery loader.
const MAGIC = Buffer.from('CMR1');
export const STRIP_LEN = 98400;
export const MAX_PAYLOAD_BYTES = 1000000;
export const MAX_CARRIER_BYTES = 8000000;
export const MODES = Object.freeze({ FOUR_BIT: 4, TWO_BIT: 2 });

export function slackFor(head) {
  let acc = 0;
  for (let i = 0; i < 54; i++) acc = (acc + (head[i] ^ ((acc >>> 3) & 255))) >>> 0;
  return acc & 1023;
}

export function regionStart(carrier) {
  if (!carrier || carrier.length < 54 + STRIP_LEN) throw new Error('carrier-too-small');
  return 54 + slackFor(carrier.subarray(0, 54)) + STRIP_LEN;
}

export function positionCapacity(carrier) {
  if (!(carrier instanceof Uint8Array) || carrier.length > MAX_CARRIER_BYTES) throw new Error('carrier-bounds');
  return carrier.length - regionStart(carrier);
}

export function payloadSymbols(byteLength, mode) {
  if (!Number.isSafeInteger(byteLength) || byteLength < 0 || (mode !== 4 && mode !== 2)) throw new Error('bad-mode-or-length');
  return byteLength * (mode === 4 ? 2 : 4);
}

export function frameSymbols(byteLength, mode) {
  return payloadSymbols(byteLength + 12, mode);
}

function crc32(bytes) {
  let c = 0xffffffff;
  for (const byte of bytes) {
    c ^= byte;
    for (let i = 0; i < 8; i++) c = (c & 1) ? ((c >>> 1) ^ 0xedb88320) >>> 0 : c >>> 1;
  }
  return (c ^ 0xffffffff) >>> 0;
}

function assertPayload(payload) {
  if (!(payload instanceof Uint8Array) || payload.length > MAX_PAYLOAD_BYTES) throw new Error('payload-bounds');
  // CAR-M lab records must be data, not a code path. The caller may use any serialized
  // bytes, but the lab runner separately asserts its fixture is printable metadata.
}

function bitsPerPosition(mode) {
  if (mode !== 4 && mode !== 2) throw new Error('unsupported-mode');
  return mode;
}

function putSymbol(carrier, pos, value, mode) {
  if (mode === 4) carrier[pos] = (carrier[pos] & 0xf0) | (value & 0x0f);
  else carrier[pos] = (carrier[pos] & 0xfc) | (value & 0x03);
}

function getSymbol(carrier, pos, mode) {
  return mode === 4 ? carrier[pos] & 0x0f : carrier[pos] & 0x03;
}

function writeFrame(payload) {
  const frame = Buffer.alloc(12 + payload.length);
  MAGIC.copy(frame, 0);
  frame.writeUInt32LE(payload.length, 4);
  frame.writeUInt32LE(crc32(payload), 8);
  Buffer.from(payload).copy(frame, 12);
  return frame;
}

function readFrame(frame) {
  if (frame.length < 12 || !frame.subarray(0, 4).equals(MAGIC)) return null;
  const length = frame.readUInt32LE(4);
  if (length !== frame.length - 12 || length > MAX_PAYLOAD_BYTES) return null;
  const payload = frame.subarray(12);
  if (crc32(payload) !== frame.readUInt32LE(8)) return null;
  return Buffer.from(payload);
}

export function encode(carrierInput, payloadInput, mode = 4) {
  if (!(carrierInput instanceof Uint8Array) || carrierInput.length > MAX_CARRIER_BYTES) throw new Error('carrier-bounds');
  if (!(payloadInput instanceof Uint8Array)) throw new Error('payload-bounds');
  const carrier = Buffer.from(carrierInput);
  const payload = Buffer.from(payloadInput);
  assertPayload(payload);
  bitsPerPosition(mode);
  const frame = writeFrame(payload);
  const required = frame.length * (mode === 4 ? 2 : 4);
  const capacity = positionCapacity(carrier);
  if (required > capacity) throw new Error(`over-capacity:${required}:${capacity}`);
  const start = regionStart(carrier);
  for (let byteIndex = 0; byteIndex < frame.length; byteIndex++) {
    const value = frame[byteIndex];
    if (mode === 4) {
      putSymbol(carrier, start + byteIndex * 2, value >>> 4, mode);
      putSymbol(carrier, start + byteIndex * 2 + 1, value, mode);
    } else {
      putSymbol(carrier, start + byteIndex * 4, value >>> 6, mode);
      putSymbol(carrier, start + byteIndex * 4 + 1, value >>> 4, mode);
      putSymbol(carrier, start + byteIndex * 4 + 2, value >>> 2, mode);
      putSymbol(carrier, start + byteIndex * 4 + 3, value, mode);
    }
  }
  return { carrier, mode, payloadBytes: payload.length, frameBytes: frame.length, requiredSymbols: required, capacity };
}

export function decode(carrierInput, mode = 4) {
  if (!(carrierInput instanceof Uint8Array) || carrierInput.length > MAX_CARRIER_BYTES) return null;
  const carrier = Buffer.from(carrierInput);
  try { bitsPerPosition(mode); } catch (error) { return null; }
  let capacity, start;
  try { capacity = positionCapacity(carrier); start = regionStart(carrier); } catch (error) { return null; }
  const headerSymbols = 12 * (mode === 4 ? 2 : 4);
  if (headerSymbols > capacity) return null;
  const readByte = (offset) => {
    if (mode === 4) return ((getSymbol(carrier, start + offset * 2, mode) << 4) | getSymbol(carrier, start + offset * 2 + 1, mode)) & 255;
    return ((getSymbol(carrier, start + offset * 4, mode) << 6) |
      (getSymbol(carrier, start + offset * 4 + 1, mode) << 4) |
      (getSymbol(carrier, start + offset * 4 + 2, mode) << 2) |
      getSymbol(carrier, start + offset * 4 + 3, mode)) & 255;
  };
  const header = Buffer.alloc(12);
  for (let i = 0; i < header.length; i++) header[i] = readByte(i);
  if (!header.subarray(0, 4).equals(MAGIC)) return null;
  const length = header.readUInt32LE(4);
  const totalSymbols = (length + 12) * (mode === 4 ? 2 : 4);
  if (length > MAX_PAYLOAD_BYTES || totalSymbols > capacity) return null;
  const frame = Buffer.alloc(length + 12);
  header.copy(frame, 0);
  for (let i = 12; i < frame.length; i++) frame[i] = readByte(i);
  return readFrame(frame);
}

export function metrics(before, after, start = 54) {
  let sum = 0, changed = 0, maxDelta = 0, n = 0;
  const end = Math.min(before.length, after.length);
  for (let i = start; i < end; i++) {
    const delta = Math.abs(before[i] - after[i]);
    if (delta) changed++;
    if (delta > maxDelta) maxDelta = delta;
    sum += delta * delta;
    n++;
  }
  const mse = n ? sum / n : 0;
  return { maxChannelDelta: maxDelta, changedFraction: n ? changed / n : 0, mse, psnrDb: mse === 0 ? Infinity : 10 * Math.log10(65025 / mse) };
}

export function corruptionRejects(encoded, mode, flips = 1) {
  const damaged = Buffer.from(encoded);
  const start = regionStart(damaged);
  const step = mode === 4 ? 1 : 1;
  for (let i = 0; i < flips; i++) damaged[start + i * step] ^= 1;
  return decode(damaged, mode) === null;
}

export function fixture(length = 870870) {
  const prefix = Buffer.from('{"kind":"carm-metadata","version":"cc10","record":"non-executable","value":"');
  const suffix = Buffer.from('"}\n');
  const out = Buffer.alloc(length);
  let at = 0;
  while (at < out.length) {
    const source = at < prefix.length ? prefix : (at + suffix.length >= out.length ? suffix : Buffer.from('bounded-record;'));
    source.copy(out, at, 0, Math.min(source.length, out.length - at));
    at += Math.min(source.length, out.length - at);
  }
  if (suffix.length <= out.length) suffix.copy(out, out.length - suffix.length);
  return out;
}

export const crc = crc32;
