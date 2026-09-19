# CC-08 — GLSL serialized-decoy candidate

**Status:** candidate-only; simulated verification PASS  
**Base:** CC-05 bounded parser candidate  
**FaCs:** FaC-10, FaC-13, FaC-16

This candidate substitutes one bounded serialized glsl record into an existing `shard-n2.js` serialized/no-op budget slot. The slot remains exactly 731 bytes before and after substitution, so the layer is a replacement rather than an appended payload.

The normal path stores the record as a local string, computes a bounded checksum, and does not invoke a browser parser, DOM/CSSOM API, WebGL context, shader compiler, evaluator, network route, or second VM.

## Artifacts

- `source/shards/` — candidate source copies.
- `candidate/cc08-glsl-raw-bundle.js` — raw stitched candidate assembly, not a release artifact.
- `reports/build.json` — provenance, representation, and budget-neutrality record.
- `reports/cc08-verification.md` — verification report.

Full OTO/obfuscation, renderer, heap, cleanup, and real-host gates remain outstanding.
