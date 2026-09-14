# Working-Stable

Pristine snapshots of known-good generations. Nothing here is ever edited in
place — a new generation adds a new directory. `Active/` is where development
happens; this folder is the rollback / reference point.

## O8.7-Stego-3/ (8.7-S3 working version, frozen 2026-09-13)

Byte copy of `Archives/packages/O8.7-Stego-3/` at v3 (refill-resilience line).
Verified `sha256sum -c SHA256SUMS.txt` 6/6 at copy time.

- `O8.7-Stego-3-runner.js` — the paste (RUN THIS). Cover `a9c11de2…`, runner `d846fdb8…`.
- `O8.7-Stego-3-cover.bmp` — photo-grain carrier (also embedded b64 in the runner).
- `stego3-real.min.js` / `stego3-decoy.min.js` — T2 bundle / T1 garden sources.
- `ARCHIVE.txt` / `BUILD.json` / `SHA256SUMS.txt` — provenance + checksums.

Bundle `52b86386…`, IID `39e738eb` (runtime-derived): battery 25/25, stress
23/23 + seeds, tiers 20/20, carrier green. Supersedes nothing here (first entry).
