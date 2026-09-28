/*rebind-registry-keys-v1*/
  (function (_0xmod) {
  // CC-30: four-way lanes + CAR-M 4-bit. No fetch, no instantiate, no page routes.
  const LANES = ['R9R0', 'R9R1', 'R9R2', 'R9R3'];
  const HDR = 16;
  function crc32(bytes) {
    let c = 0xffffffff;
    for (let i = 0; i < bytes.length; i++) {
      c ^= bytes[i];
      for (let b = 0; b < 8; b++) c = (c & 1) ? ((c >>> 1) ^ 0xedb88320) >>> 0 : c >>> 1;
    }
    return (c ^ 0xffffffff) >>> 0;
  }
  function writeByte(slots, lane, byteIndex, value) {
    const start = lane + byteIndex * 16;
    slots[start] = (slots[start] & 0xfc) | ((value >>> 6) & 3);
    slots[start + 4] = (slots[start + 4] & 0xfc) | ((value >>> 4) & 3);
    slots[start + 8] = (slots[start + 8] & 0xfc) | ((value >>> 2) & 3);
    slots[start + 12] = (slots[start + 12] & 0xfc) | (value & 3);
  }
  function readByte(slots, lane, byteIndex) {
    const start = lane + byteIndex * 16;
    return ((slots[start] & 3) << 6) | ((slots[start + 4] & 3) << 4) | ((slots[start + 8] & 3) << 2) | (slots[start + 12] & 3);
  }
  function encodeFour(payload) {
    if (!(payload instanceof Uint8Array) || payload.length > 100000) return null;
    const per = Math.ceil(payload.length / 4);
    const frames = LANES.map((tag, lane) => {
      const chunk = payload.subarray(lane * per, Math.min(payload.length, (lane + 1) * per));
      const out = new Uint8Array(HDR + chunk.length);
      for (let i = 0; i < 4; i++) out[i] = tag.charCodeAt(i);
      const dv = new DataView(out.buffer);
      dv.setUint32(4, chunk.length, true);
      dv.setUint32(8, crc32(chunk), true);
      out[12] = lane; out[13] = 1;
      out.set(chunk, HDR);
      return out;
    });
    const max = Math.max(...frames.map((f) => f.length));
    const slots = new Uint8Array(max * 16);
    for (let lane = 0; lane < 4; lane++) {
      const f = frames[lane];
      for (let i = 0; i < f.length; i++) writeByte(slots, lane, i, f[i]);
    }
    return slots;
  }
  function decodeFour(slots) {
    if (!(slots instanceof Uint8Array) || slots.length < 64) return null;
    const parts = [];
    for (let lane = 0; lane < 4; lane++) {
      const tag = String.fromCharCode(readByte(slots, lane, 0), readByte(slots, lane, 1), readByte(slots, lane, 2), readByte(slots, lane, 3));
      if (tag !== LANES[lane]) return null;
      const len = (readByte(slots, lane, 4) | (readByte(slots, lane, 5) << 8) | (readByte(slots, lane, 6) << 16) | (readByte(slots, lane, 7) << 24)) >>> 0;
      if (!Number.isSafeInteger(len) || len > 100000) return null;
      const chunk = new Uint8Array(len);
      for (let i = 0; i < len; i++) chunk[i] = readByte(slots, lane, HDR + i);
      const crc = (readByte(slots, lane, 8) | (readByte(slots, lane, 9) << 8) | (readByte(slots, lane, 10) << 16) | (readByte(slots, lane, 11) << 24)) >>> 0;
      if (crc !== crc32(chunk)) return null;
      parts.push(chunk);
    }
    const total = parts.reduce((n, p) => n + p.length, 0);
    const out = new Uint8Array(total);
    let at = 0;
    for (const p of parts) { out.set(p, at); at += p.length; }
    return out;
  }
  function carm4Put(_0xk13, pos, nibble) { _0xk13[pos] = (_0xk12[pos] & 0xf0) | (nibble & 0x0f); }
  function carm4Get(_0xk13, pos) { return _0xk13[pos] & 0x0f; }
  function v814packetkf673on4(cover, payload) {
    if (!(cover instanceof Uint8Array) || !(payload instanceof Uint8Array)) return null;
    const need = (payload.length + 4) * 2;
    if (cover.length < need + 8) return null;
    const out = Uint8Array.from(cover);
    const len = payload.length;
    const hdr = [(len >>> 24) & 255, (len >>> 16) & 255, (len >>> 8) & 255, len & 255];
    const bytes = new Uint8Array(4 + len);
    bytes.set(hdr, 0); bytes.set(payload, 4);
    for (let i = 0; i < bytes.length; i++) {
      carm4Put(out, 8 + i * 2, bytes[i] >>> 4);
      carm4Put(out, 8 + i * 2 + 1, bytes[i] & 0x0f);
    }
    return out;
  }
  function v814packetkf673on4x(cover) {
    if (!(cover instanceof Uint8Array) || cover.length < 16) return null;
    const b = (i) => (carm4Get(cover, 8 + i * 2) << 4) | carm4Get(cover, 8 + i * 2 + 1);
    const len = (b(0) << 24) | (b(1) << 16) | (b(2) << 8) | b(3);
    if (!Number.isSafeInteger(len) || len < 0 || len > 100000) return null;
    if (cover.length < 8 + (len + 4) * 2) return null;
    const out = new Uint8Array(len);
    for (let i = 0; i < len; i++) out[i] = b(4 + i);
    return out;
  }
  function v814packetkf673onFit(positions, payloadBytes) {
    const need = payloadBytes * 4 + 48;
    return { ok: need <= positions, need, positions };
  }
  function carm2Put(_0xk13, pos, v) { _0xk13[pos] = (_0xk12[pos] & 0xfc) | (v & 3); }
  function carm2Get(_0xk13, pos) { return _0xk13[pos] & 3; }
  function expandCover(cover, need) {
    if (cover.length >= need) return Uint8Array.from(cover);
    const out = new Uint8Array(need);
    out.set(cover);
    for (let i = cover.length; i < need; i++) out[i] = cover[i % Math.max(1, cover.length)];
    return out;
  }
  function v814packetkf673on2(cover, payload) {
    if (!(cover instanceof Uint8Array) || !(payload instanceof Uint8Array)) return null;
    const need = 8 + (payload.length + 4) * 4;
    const out = expandCover(cover, need);
    const len = payload.length;
    const bytes = new Uint8Array(4 + len);
    bytes[0] = (len >>> 24) & 255; bytes[1] = (len >>> 16) & 255; bytes[2] = (len >>> 8) & 255; bytes[3] = len & 255;
    bytes.set(payload, 4);
    for (let i = 0; i < bytes.length; i++) {
      carm2Put(out, 8 + i * 4, bytes[i] >>> 6);
      carm2Put(out, 8 + i * 4 + 1, bytes[i] >>> 4);
      carm2Put(out, 8 + i * 4 + 2, bytes[i] >>> 2);
      carm2Put(out, 8 + i * 4 + 3, bytes[i]);
    }
    return { cover: out, expanded: out.length !== cover.length, mode: 2 };
  }
  function v814packetkf673on2x(cover) {
    if (!(cover instanceof Uint8Array) || cover.length < 24) return null;
    const b = (i) => ((carm2Get(cover, 8 + i * 4) << 6) | (carm2Get(cover, 8 + i * 4 + 1) << 4) | (carm2Get(cover, 8 + i * 4 + 2) << 2) | carm2Get(cover, 8 + i * 4 + 3)) & 255;
    const len = (b(0) << 24) | (b(1) << 16) | (b(2) << 8) | b(3);
    if (!Number.isSafeInteger(len) || len < 0 || len > 100000) return null;
    if (cover.length < 8 + (len + 4) * 4) return null;
    const out = new Uint8Array(len);
    for (let i = 0; i < len; i++) out[i] = b(4 + i);
    return out;
  }
  _0xmod._v814quクantumqd42 = Object.freeze({
    lanes: LANES,
    fourWay: { encode: encodeFour, decode: decodeFour },
    carm: { v814packetkf673on4, v814packetkf673on4x, v814packetkf673on2, v814packetkf673on2x, v814packetkf673onFit, mode: 4 },
  });
})(_0xmod);
