# Uploads — user-supplied inputs (frozen)

Frozen build inputs — do not modify; reference them in place. The originals are user-supplied; `stego2-cover.bmp` is generated (seed-recorded, see below).

| file | sha256 | role |
|---|---|---|
| `image_2026-09-12_054222307+(1) - Copy.txt` | `f68fee1f…50c57` | Pristine 16-bit BMP cover (618×408, 504,342 B). Stego source for `build-entangled-stego.js`. NOTE: despite the `.txt` name it is a binary BMP. |
| `TRACE.md` | `df7db0f2…e8a5` | Trace notes (41,020 B). |
| `obfuscated.js` | `b43293b6…3c42` | Reference obfuscated sample (488,540 B). |
| `stego2-cover.bmp` | `b1590ea3…96f283` | Generated 24-bit cover (800×620, 1,488,054 B; `make-photo-cover.py` v3 seed 0xC0FFEE). Stego-2 source. |

Full hashes:

- `image_2026-09-12_054222307+(1) - Copy.txt`: `f68fee1fa5ae921f8154ad053199bfec847794080fec60065e0ca987c5f50c57`
- `TRACE.md`: `df7db0f273678a61ad41f47ad14ae31adf3917a93cf62a14810518aeb1a8e8a5`
- `obfuscated.js`: `b43293b6a9275c0192faf545432c7909b09de105aeea7c8ea93e55ebd1553c42`
- `stego2-cover-source.png`: `cb5dd70a65228a7b28bc9daf3e722661b9b6d8d7cf9b1f06d37500110edbc102`
- `stego2-cover.bmp`: `b1590ea3bdc6c49c3799b477b4539bb0a625552765feae129ac51da7cf96f283`

Related: `uploads/test2.js` (diagnosed-dead 6.3 MB bundle fragment) was moved to
`Archives/stego-history.tar.gz` at reorg (tarball retired 2026-09-12; listing in
`Archives/RETIRED.md`). The vendor PDF now lives at
`Docs/obfuscator-manual.pdf` (`bd9ef0f9…2725f`).
