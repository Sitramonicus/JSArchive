# Active/O8.6/tools — build tools & harness

## Build tools

- `stitch-o85.py` — reassemble the 7 selected shards into one bundle.
  `python3 stitch-o85.py <piece1.js> … <pieceN.js> <out.js>`.
  (Called by `../oto/scripts/build-s4-final-package.js`; piece order `a m n1 e n2 aux u`.)
- `feff-sprinkle.js` — B3 post-OTO micro-pass: sprinkle U+FEFF at token
  boundaries of single-line obfuscated JS (cosmetic scanner noise).
  Run AFTER the obfuscator pass.
- `zw-suffix.js` — zero-width suffix micro-pass (needs `@babel/*`, see
  `Active/engines/README.md`). Run `node --check` + the battery on output.
- `term-sweep.py` — sweep files for conspicuous terms. `python3 term-sweep.py <file…>`.
- `typed-pool-o85.mjs` — S4-era typed-pool transform (superseded; kept for
  reference). Resolves a `shards/` dir two levels up from `argv[1]`.
- `heap-probe.mjs` / `heap-scan.mjs` — heap snapshot probe + scanner.
  `node heap-probe.mjs <target.js> [snapshot-out]` (default `/tmp/s4-heap.heapsnapshot`).

## Harness (ex-`tools/harness/`)

- `discordlike.mjs` — simulated client environment, imported by all batteries.
- `test-var.mjs` — `node test-var.mjs <target.js>`: import a target under the harness.
- `marker-swap.py` — replace the canonical marker in a file.
  `python3 marker-swap.py <src> <out>`.
