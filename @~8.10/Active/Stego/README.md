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
node pack-stego-bmp.js ../O8.6/final-package/O8.6-Final-final-bundle.js ./output
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

---

## 5. Entangled pipeline (S5, superseded)

`build-entangled-stego.js` is the S5 pipeline that produced the **formerly-live**
pair in `output/` (superseded by §6; r4 retired 2026-09-12, hashes in `Archives/RETIRED.md`):

```bash
node build-entangled-stego.js [bundle.js] [cover.bmp] [out-dir]
```

Defaults: bundle `../O8.6/final-package/O8.6-Final-final-bundle.js`, cover
`../../Uploads/image_2026-09-12_054222307+(1) - Copy.txt`, out-dir `./output`.
Needs engines (`terser`, `javascript-obfuscator` — see `../engines/README.md`).

Steps: minify → gzip → XOR with BMP-header-derived keystream (scrambles the
gzip magic) → embed `u32 length + ciphertext` into pixel rows → emit valid BMP
+ outer-obfuscated (obf3) runner with the Line 1 config header.

Retired-pair hashes (were `Archives/packages/O8.6-S5-r4/`; full text in `Archives/RETIRED.md`):

- `output/O8.6-S5-entangled-cover.bmp` — sha256 `2c9ebf58…01d894c1`
- `output/O8.6-S5-entangled-stego-runner.js` — sha256 `14e3ffc8…4194c4740`

Known lineage bug (found during Stego-2, verified by extracting r4): the S5
minify folds away the whole mode switch (zero 会員 bytes in the payload) and
the name anchor never matches, so Stego-1 Line-1 edits were dead. Stego-2
fixes both (see §6 invariants).

---

## 6. Stego-2 dual-carrier pipeline (S6, live)

`build-stego2.js` builds the **live** pair in `output-stego2/`:

```bash
node build-stego2.js [bundle.js] [cover.bmp] [out-dir] [--line1=0|1|2]
```

Defaults: S6 bundle + `../../Uploads/stego2-cover.bmp` (800×620×24 photo
cover) → `./output-stego2`. Needs `terser` only. Deterministic: consecutive
builds are byte-identical (builder asserts exact sizes + anchor presence).

Carrier layout: S6 bundle (UTF-8 min → gzip-9) scattered per-byte over
`[pixelOff+98304, EOF)` via seeded permutation (seed = `0x57E602A1` ⊕
FNV-1a of the runtime 名; salt-XOR'd length at the first 4 perm positions;
header⊕salt keystream) + a contiguous 98,304 B Stego-1-layout decoy band
(`u32 length` + header-keystream cipher + chaff) holding the Pixel Garden
game (`decoy-garden.js`). The Stego-1 extractor recovers exactly the garden.

Loader (`stego2-loader.js`, hand-written, shipped Terser-minified): T0 no
`window`/`document` → silent return before any decode; T1 browser without a
chunk-shaped `window` array → garden; T2 tile feed present → scattered real
extract (gzip-magic confirm, else T1 fallthrough). No literal Discord/webpack
strings; sensitive API names char-code-built. Renamed pastes run the garden
everywhere (deliberate). Line 1 has 3 template variants (default matches the
Stego-1 header byte-for-byte).

Tests (`test-stego2-tiers.mjs <runner> <bmp> [--quick]`): 14 asserts — T0
bare/thin silence, T1 garden byte-exact + executes, T2 bundle byte-exact with
REAL 会員/名 substitution, rename-degrade, Stego-1-extractor compat, BMP
validity, Line-1 searchability. Full spec: `Handoff/S6-STEGO2-PLAN.md` §2.

Minify invariants (hard-won — the builder asserts them, do not "simplify"):
UTF-8 output always (`ascii_only` escapes the anchors and kills substitution);
real payload `reduce_vars:false` (default Terser folds `var 会員=0x2` and
hardcodes mode 2); gunzip write issued un-awaited (awaiting big writes
deadlocks on stream backpressure).

Live pair (frozen identically in `Archives/packages/O8.7-Stego-2-r2/`):

- `output-stego2/O8.7-Stego-2-cover.bmp` — sha256 `a80764ed…94a296`
- `output-stego2/O8.7-Stego-2-runner.js` — sha256 `d20e47c7…530ccc`
