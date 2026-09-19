// CC-11 / R2-10A offline true-four-way codec.
// Four independent, interleaved 2-bit lanes are named R9R0..R9R3.
// No browser, host, transport, loader, or executable payload capability is present.
export const LANES = Object.freeze(['R9R0', 'R9R1', 'R9R2', 'R9R3']);
export const HEADER_BYTES = 16;
export const MAX_PAYLOAD = 1000000;
export const MAX_SLOTS = 8000000;

function asBytes(value) {
  if (!(value instanceof Uint8Array) || value.length > MAX_SLOTS) throw new Error('bytes-bounds');
  return Uint8Array.from(value);
}
function crc32(bytes) {
  let c = 0xffffffff;
  for (const byte of bytes) {
    c ^= byte;
    for (let i = 0; i < 8; i++) c = (c & 1) ? ((c >>> 1) ^ 0xedb88320) >>> 0 : c >>> 1;
  }
  return (c ^ 0xffffffff) >>> 0;
}
function laneFrame(tag, lane, chunk) {
  const out = new Uint8Array(HEADER_BYTES + chunk.length);
  for (let i = 0; i < 4; i++) out[i] = tag.charCodeAt(i);
  new DataView(out.buffer).setUint32(4, chunk.length, true);
  new DataView(out.buffer).setUint32(8, crc32(chunk), true);
  out[12] = lane;
  out[13] = 1;
  out.set(chunk, HEADER_BYTES);
  return out;
}
function readByte(slots, lane, byteIndex) {
  const start = lane + byteIndex * 16;
  return ((slots[start] & 3) << 6) | ((slots[start + 4] & 3) << 4) | ((slots[start + 8] & 3) << 2) | (slots[start + 12] & 3);
}
function writeByte(slots, lane, byteIndex, value) {
  const start = lane + byteIndex * 16;
  slots[start] = (slots[start] & 0xfc) | ((value >>> 6) & 3);
  slots[start + 4] = (slots[start + 4] & 0xfc) | ((value >>> 4) & 3);
  slots[start + 8] = (slots[start + 8] & 0xfc) | ((value >>> 2) & 3);
  slots[start + 12] = (slots[start + 12] & 0xfc) | (value & 3);
}
function laneChunks(payload) {
  const chunks = LANES.map(() => []);
  for (let i = 0; i < payload.length; i++) chunks[i & 3].push(payload[i]);
  return chunks.map((x) => Uint8Array.from(x));
}
function capacityForLane(slots, lane) {
  return Math.floor(Math.max(0, slots.length - lane) / 16);
}
export function capacity(slotsInput) {
  const slots = asBytes(slotsInput);
  const laneBytes = LANES.map((_, lane) => capacityForLane(slots, lane));
  return { slots: slots.length, laneFrameBytes: laneBytes, maxPayloadBytes: laneBytes.reduce((sum, n) => sum + Math.max(0, n - HEADER_BYTES), 0), symbolsPerPayloadByte: 4 };
}
export function requiredSymbols(payloadLength) {
  if (!Number.isSafeInteger(payloadLength) || payloadLength < 0 || payloadLength > MAX_PAYLOAD) throw new Error('bad-length');
  const chunks = [0, 1, 2, 3].map((lane) => Math.ceil(Math.max(0, payloadLength - lane) / 4));
  return chunks.reduce((sum, length) => sum + (HEADER_BYTES + length) * 4, 0);
}

export function encode(slotsInput, payloadInput) {
  const slots = asBytes(slotsInput);
  const payload = asBytes(payloadInput);
  if (payload.length > MAX_PAYLOAD) throw new Error('payload-too-large');
  const chunks = laneChunks(payload);
  const plans = [];
  for (let lane = 0; lane < LANES.length; lane++) {
    const frame = laneFrame(LANES[lane], lane, chunks[lane]);
    const available = capacityForLane(slots, lane);
    if (frame.length > available) throw new Error(`over-capacity:${lane}:${frame.length}:${available}`);
    for (let i = 0; i < frame.length; i++) writeByte(slots, lane, i, frame[i]);
    plans.push({ tag: LANES[lane], lane, chunkBytes: chunks[lane].length, frameBytes: frame.length, availableBytes: available });
  }
  return { slots, payloadBytes: payload.length, requiredSymbols: requiredSymbols(payload.length), plans };
}

export function decode(slotsInput) {
  let slots;
  try { slots = asBytes(slotsInput); } catch (error) { return null; }
  const chunks = [];
  for (let lane = 0; lane < LANES.length; lane++) {
    const available = capacityForLane(slots, lane);
    if (available < HEADER_BYTES) return null;
    const header = Uint8Array.from({ length: HEADER_BYTES }, (_, i) => readByte(slots, lane, i));
    const tag = String.fromCharCode(...header.subarray(0, 4));
    const view = new DataView(header.buffer);
    const length = view.getUint32(4, true);
    const checksum = view.getUint32(8, true);
    if (tag !== LANES[lane] || header[12] !== lane || header[13] !== 1 || length > MAX_PAYLOAD || HEADER_BYTES + length > available) return null;
    const chunk = Uint8Array.from({ length }, (_, i) => readByte(slots, lane, HEADER_BYTES + i));
    if (crc32(chunk) !== checksum) return null;
    chunks.push(chunk);
  }
  const max = Math.max(0, ...chunks.map((chunk) => chunk.length));
  const out = new Uint8Array(chunks.reduce((sum, chunk) => sum + chunk.length, 0));
  let at = 0;
  for (let i = 0; i < max; i++) for (const chunk of chunks) if (i < chunk.length) out[at++] = chunk[i];
  return out;
}

export function makeFixture(length = 320000) {
  const seed = new TextEncoder().encode('{"kind":"r2-10a-serialized-record","lane":"four-way","executable":false,"value":"offline;"}');
  const out = new Uint8Array(length);
  for (let i = 0; i < out.length; i++) out[i] = seed[i % seed.length];
  return out;
}

export function flip(slotsInput, index = 0, mask = 1) {
  const slots = asBytes(slotsInput);
  if (index < 0 || index >= slots.length) throw new Error('bad-index');
  slots[index] ^= mask & 3;
  return slots;
}

export const crc = crc32;
