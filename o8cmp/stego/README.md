# BMP Steganography & Binary Packaging Suite

This packaging suite allows you to embed obfuscated JavaScript payloads into valid, viewable **24-bit / 32-bit BMP bitmap images** and execute them using a pure JavaScript TypedArray decompression runner.

---

## 1. What This Tool Does

1. **Gzip Compression**: Compresses the obfuscated JavaScript bundle into raw gzipped bytecode.
2. **Binary BMP Embedding**:
   - Formats the gzipped bytes directly into the pixel array of a **valid BMP image** (with a standard 54-byte DIB header).
   - If no cover image is provided, it automatically generates a valid synthetic 24-bit bitmap file matching the required dimensions.
   - If an existing `.bmp` cover image is provided, it embeds the payload directly into its pixel stream without altering headers.
3. **Pure TypedArray Stego Runner**:
   - Creates a self-contained JavaScript runner that decodes the embedded image without DOM `<canvas>` or asynchronous `Image` tags.
   - Reads the binary BMP data, skips the header, and passes the payload through a native `DecompressionStream('gzip')` pipeline directly into execution.

---

## 2. Included Files

- `pack-stego-bmp.js`: The node script that packs your JS payload into a `.bmp` image and generates the runners.
- `output/payload.bmp`: The resulting valid BMP image containing the embedded payload.
- `output/stego-runner-inline.js`: A self-contained `.js` file with the base64-encoded BMP payload and extraction logic ready to run in any browser/Electron console.
- `output/stego-runner-fetch.js`: A lightweight runner designed to fetch and execute `payload.bmp` from a remote URL.

---

## 3. How to Run & Package

### A. Automatic Packaging (Default Bundle)
To pack your active bundle into a new synthetic BMP image:
```bash
node pack-stego-bmp.js <path-to-bundle.js> <output-directory>
```
Example:
```bash
node pack-stego-bmp.js /home/user/o8cmp/O8.6/final-package/O8.6-Final-final-bundle.js ./output
```

### B. Packaging with a Custom Cover BMP
If you have your own cover image (must be a valid 24-bit or 32-bit uncompressed `.bmp` file large enough to hold the payload):
```bash
node pack-stego-bmp.js <path-to-bundle.js> <output-directory> <path-to-cover.bmp>
```

---

## 4. How the Inline Stego Runner Executes

The generated `stego-runner-inline.js` script contains:
1. **Config Header** (Line 1): Editable parameters (`var 会員 = 2; var 名 = "佐藤 結衣";`).
2. **Embedded Base64 BMP**: The full binary image string.
3. **Zero-DOM Bytecode Extractor**:
   - Decodes Base64 to `Uint8Array`.
   - Reads pixel offset at byte `10` and dimension info from the DIB header.
   - Extracts the exact payload bytes across BMP 4-byte row padding.
   - Streams through `new DecompressionStream('gzip')` and executes in memory.
