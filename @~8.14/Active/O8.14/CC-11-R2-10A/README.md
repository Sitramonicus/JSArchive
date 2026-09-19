# CC-11 — R2-10A offline true-four-way codec candidate

**Status:** candidate-only; offline verification PASS  
**FaCs:** FaC-15, FaC-16

CC-11 tests the R2-10 `R9R0..R9R3` four-way codec as an offline change only. The codec uses four
independent interleaved 2-bit lanes, each with its own lane tag, bounded length, and CRC. It operates
on a byte-slot vector and a serialized non-executable fixture; it does not add a loader, delivery
route, host call, network transmission, or executable evaluation path.

## Artifacts

- `source/r2-10a-codec.mjs` — bounded four-lane codec.
- `candidate/cc11-r2-10a-vector.json` — deterministic vector and lane plan.
- `reports/cc11-verification.json` and `reports/cc11-verification.md` — verification and provenance.
- `reports/security-hardening.json` — bounded length, truncation, version, and input-type negatives.
- `reports/security-hardening.json` — bounded length, truncation, version, and input-type negatives.
- `tools/run-cc11.mjs` — reproducible offline runner.

The codec passes deterministic round-trip, per-lane corruption rejection, repeated extraction, and
bounded/offline static checks. CC-12 is kept separate for delivery/loader integration.
