# CC-12 — R2-10B delivery/loader integration candidate

**Status:** candidate-only; simulated integration and security-hardening verification PASS  
**FaCs:** FaC-03, FaC-06, FaC-10, FaC-15, FaC-16

CC-12 copies the offline R2-10A codec into its own candidate tree and integrates it with a bounded
loader boundary. Delivery uses an injected sender and a caller-supplied allowlist; the candidate
does not create a route, call fetch, access a host global, or transmit to an unallowlisted target.
The envelope parser is length-bounded and returns serialized bytes only. Cleanup is explicit and
idempotent.

## Artifacts

- `source/r2-10b-codec.mjs` — CC-12-local R9R0..R9R3 codec copy.
- `source/r2-10b-loader.mjs` — bounded envelope parser, loader, injected delivery adapter, and cleanup boundary.
- `candidate/cc12-loader-vector.json` — integration vector and provenance.
- `reports/cc12-verification.json` and `reports/cc12-verification.md` — verification report.
- `reports/security-hardening.json` — route, malformed-envelope, sender-error, size, and closed-loader negatives.
- `tools/run-cc12.mjs` — reproducible bounded integration runner.

The candidate passes codec round-trip, allowlist enforcement, malformed/corrupt input rejection,
cleanup, static capability checks, and the preserved S1 desktop/stream regression. It remains
candidate-only and does not replace the unfinished proper 14r1 sharding-to-stego/packaging/password
test runner.
