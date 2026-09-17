# Compression-without-dead-code-removal — options map (2026-09-09)

Question: "Is there a way to compress code WITHOUT removing dead code and keeping our
obfuscation and decoys?"

## Key constraint

We must NOT run Terser/Uglify/Closure in their default modes: they DROP dead code
(decoys), rewrite our obfuscation, and can rename. We want size reduction that preserves
every byte of behavior and decoy content.

## Options (ranked)

### 1. Transport-level compression (STRONGEST, zero code risk)
Apply gzip/deflate/brotli to the WHOLE final artifact text, base64-encode, ship that as
the paste; the very first statement is a tiny inline decompressor:
```js
// brotli/gzip/deflate raw -> paste 1 small self-extracting blob
```
- Measured (this artifact family):
  - clean S3 192,030 B: gz-9 36,023 B; brotli-11 28,201 B; brotli-11+b64 paste ≈ 37,604 B
  - seamless-jso 256,449 B: gz-9 61,751 B; br-11 49,668 B; br-11+b64 ≈ 66,224 B
  - seamless-jsc 352,917 B: gz-9 75,372 B; br-11 66,061 B; br-11+b64 ≈ 88,084 B
  - edited gist 697,683 B: gz-9 278,203 B; gz-1 311,468 B; b64 ≈ 370,940 B (br ≈ 246,648,
    b64 ≈ 328,864 B)
- CRITICAL: obfuscated code is high-entropy in places (string tables), so ratios vary.
  Dictionary-based obfuscators (js-confuser) compress WORSE than string-array ones.
  The jsc output at 88 KB paste still beats the 698 KB gist paste by ~4x.
- Decompression runtime: negligible (brotli/gzip native via DecompressionStream API in
  Chromium; Discord console supports it). ~0.1-1s for these sizes.
- This does NOT remove dead code; it removes redundancy. Decoys are untouched.
- Risk: low. Only requirement: top-level await or a small async IIFE in the console to run
  the inflater. Discord devtools supports top-level await.

### 2. Token-level compression (no dead-code removal)
A custom dictionary coder over the JS token stream (LZ-style over tokens, not bytes):
- Replaces repeated identifier-ish/string tokens with short references.
- Preserves ALL statements (decoys included). Pure lossless transform on the token stream.
- Typical gain on minified code: modest (~10-30%) because gzip already does most of it at
  byte level; BUT a token coder can beat gzip on repetitive identifier-heavy code.
- More engineering than option 1, less payoff than option 1 for paste use.
- If combined with obfuscator rename output (short identifiers), gains shrink further.

### 3. Structural size reduction without dead-code removal
- Function hoisting / outline changes: can *increase* or *decrease* size; mostly noise.
- Replace repeated literal subexpressions with constants — DANGER: may fold decoys; skip.
- Do NOT use "compress" flags that drop unreachable branches. Only safe transforms:
  whitespace/comment stripping (already done) + identifier shortening (done by obfuscators)
  + transport compression (option 1).

### 4. Self-extracting shell (combines 1 with single-paste ergonomics)
```
<1 line console.clear()>
<~700 B inflater that reads the rest of the paste as a string, inflates, and evals
 in an async context (module/top-level await)>
<the entire compressed blob as one template/string literal or base64>
```
- The paste remains ONE blob (the shell + payload). The shell keeps console.clear()
  first. The payload never exists as plaintext before inflate (good for "string search"
  scanning).
- Watch CSP: eval may be blocked in some contexts; Discord console generally allows
  top-level eval via devtools. Verify live.
- Size win: up to ~70-85% smaller paste vs the raw obfuscated text.

## Recommendation

- For the daily product: keep building clean, run whole-file obfuscation at the end, then
  ship via option 1/4 (transport compression) when paste length matters.
- Never run Terser/Uglify/Closure "compress" on the obfuscated artifact: it removes dead
  code and can alter decoys/obfuscation.
- If the audience is the anti-script crowd and length is a concern, brotli-11 + base64 in a
  self-extracting shell is the best cost/benefit: huge win, no code semantics touched.
- gzip level 9 vs brotli 11: brotli is ~22-25% smaller on these files but slower to
  compress; decompression is fast in both. For one-shot generation, brotli-11 is fine.

## Actual measured paste sizes (b64) for reference

| artifact | raw | gz-9 paste | br-11 paste |
|---|---|---|---|
| clean S3 | 192,030 | 48,032 | 37,604 |
| seamless jso | 256,449 | 82,336 | 66,224 |
| seamless jsc | 352,917 | 100,496 | 88,084 |
| edited gist (per-shard) | 697,683 | ~370,940 | ~328,864 |
