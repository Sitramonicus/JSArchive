# HANDOFF 2026-09-29 — 8.15 FINISHED (final state)

## Delivered
- `release-8.15/` = the finished set: `O8.12-runner.js` (3dfc106b…, 3,278,609 chars), `O8.12-cover.bmp`
  (6f8d0b5c…, r31 two-reel carrier), `O8.15-bundle-70bcdff0.js` (70bcdff0…), payload family
  (stego11p-real.min.js 28d36d97… + honey/tube/decoy), compressed deliverables (gzip/deflate),
  rotation.json (loader pins f74c6976,c463f5f2), SHA256SUMS.txt, README.md.
- `RELEASE-CHECKLIST.md`: EVERY row checked (59 rows incl. S1/S2/S3/Phase-4 + protocol).
  Only the closing request row is completed by the operator's answer to the removal question.
- S3 claim surfaces shipped at SHARD level (shared by bundle + runner): Verb Receipts at all four
  verbs (one receipt + exactly one action line each), `_0xviewLine` queue-or-exactly-one-reason,
  boot-time fallback verbs (marker `__s3fb`, preserved through the debug harness wrap),
  bounded early-stop `_stop(n)` + re-arm ≤2 (2s/4s, never after `signal.aborted`, released → silence),
  residual() read-only audit (token/pins/lexMode/level) in `__GDBG.audit()/report()`.

## Battery (ALL GREEN, logs provisional/S2-CASCADE-2026-09-29/)
chain-revive 14/14 (dir = final-package/selected-shards!) · hold 9/9 · gate-replay 17/17
(pwds ripcord/thisisjustfordebugging…/resurgence/wertyuiop…/ripcord) · repaste · matrix 26/0 ·
tiers 42/0+1skip · flip 14/0 · detector · netwatch 0 · dangling --catch-only payload 37/0 ·
bundle 28/0 · runner clean · decoy-parity · leakcensus PASS (G3=4 standing) · constraint 5/5 ·
fidelity A≡B≡C IDENTICAL 20 lines (norm masks `"ts":N`) · boot-smoke exit 0 · selftest 2-pass
receipts (clean: released → "no re-arm after release"; dirty: guard differs).

## Day-1 ops (the only remaining actions — operator venue)
1. Page-live two-pass protocol with PRODUCTION venue passphrases (RUN-CARD §3); venue-sandbox
   evidence = captures/CAPTURE-2026-09-29-S3-two-pass.md.
2. Lane-hash pin + identifiers-dictionary corpus freeze (10/17 v1-jso drift class; fixes in
   S2-PROVISIONAL-RECORD).

## Build config (canonical, REPRO-proven)
`EXTRACT_ONLY="$ALL" DEEPWEAVE=1 SPLIT_EXTRA=1 SPLIT_OBJECTS=1 SPLIT_ARRAYS_I=1 WEAVE_SEED=2648369387
WEAVE_DISSOLVE=1 WEAVE_SHELL_LABEL=1 WEAVE_SCOPED=1 WEAVE_FN_HOIST=1 WEAVE_RUN_WRAP=1
WEAVE_RUN_WRAP_KB=28 WEAVE_PURE_LITERAL_CALLS=1 WEAVE_INDEX_FREE=1 WEAVE_DECL_RELOC=1
WEAVE_DECL_RELOC_ALL=1 WEAVE_RUN_EXPORT=1` + `--seed=2648369387` for weaves ($ALL = DEEP-WEAVE-REPORT §6).
Shipped set builder: `node Active/O8.15/carrier/build-stego13-r2.mjs <bundle> <clean-cover.bmp> <out-dir>`
(clean cover = Uploads/stego2-cover-1024-scaled.bmp). Battery runner: `Active/O8.15/tools/run-gate-battery.sh`.

## Hard-won facts (keep)
- Node here is **v20.20.2** (only /usr/bin/node); the old /usr/bin/node20 v24 path is gone.
- `chain-revive-check.mjs` arg = **final-package/selected-shards** (the v1-laned pieces), NOT shards/.
- `dangling-refs.mjs` shipping row = **--catch-only** (error-path scan); strict mode flags decoy-noise names by design.
- `gate-replay.mjs` usage: `<pwdRcd> <pwdDbg> <pwdRes> <pwdAK> <pwdView> [--spec|--seq|--times 5,180]`.
- The matrix/tiers/flip battery validates the **shipped runner built by build-stego13-r2** (embedded
  tables/anchors); the 378-KB debug runner is the operator console, NOT the carrier artifact.
- files under /home/user/tools/ written by the chat can be EVICTED mid-turn by rehydration (it ate
  chain-a-tests.mjs + swift-crash-tests.mjs wrappers); keep durable tools under Active/.
- decoy-parity must consume the END-TO-END built bundle via its own sandbox (never re-lint old files).
