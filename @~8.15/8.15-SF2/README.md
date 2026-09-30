# 8.15-SF2 — finished O8.15 release freeze (2026-09-29)

Move this folder to the JSArchive repo (e.g. `@~8.15/8.15-SF2/`) — it is the complete,
self-contained delivery of the finished 8.15 runner.

- `release-8.15/` — the delivered set: shipped runner (`O8.12-runner.js` 3dfc106b…), carrier
  (`O8.12-cover.bmp` 6f8d0b5c…), engine bundle (`O8.15-bundle-70bcdff0.js` 70bcdff0…), payload
  family (stego11p-real 28d36d97… + honey/tube/decoy), compressed deliverables, rotation.json,
  SHA256SUMS. The runner is drop-in: extract via the standard stego11p flow, or load directly.
- `docs/` — RELEASE-CHECKLIST (ALL rows checked), RELEASE-RECORD (canonical config + full battery
  table), HANDOFF-2026-09-29-FINAL (build config + hard-won facts for future work), RUN-CARD
  (day-1 ops incl. the page-live two-pass), SYSTEM-MAP, EXECUTION-SEQUENCE.
- `captures/` — S3 two-pass claim/live evidence (venue sandbox).
- `evidence/` — gate battery + selftest + chain-revive logs backing the checklist.

Day-1 ops (operator venue): page-live two-pass with production passphrases (RUN-CARD §3);
lane-hash pin + dictionary-corpus freeze (see RELEASE-RECORD / S2-PROVISIONAL-RECORD).

Rebuild recipe (if ever needed): shards at `Active/O8.14/CC-33/shards` → cascade
(g7 → v1 → minify → `build-s4-final-package.js`, seed 2648369387) →
`carrier/build-stego13-r2.mjs <bundle> <stego2-cover-1024-scaled.bmp> <out-dir>`.
Full env/config: docs/HANDOFF-2026-09-29-FINAL.md.
