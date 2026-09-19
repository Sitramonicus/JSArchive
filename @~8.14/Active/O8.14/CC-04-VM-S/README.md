# CC-04 — VM-S candidate

**Status:** candidate-only; simulated verification PASS  
**Base:** combined CC-02+03 candidate  
**FaCs:** FaC-02, FaC-05, FaC-06, FaC-09, FaC-16

CC-04 replaces the existing compact arithmetic core with a bounded VM-S implementation in the
selected core shard. It preserves the existing operations and primary behavior while adding explicit
program, operation, stack, variable, value, and time limits. It has no host capability, evaluator,
network, storage, DOM, or dynamic-code path.

## Artifacts

- `source/shards/` — CC-04 candidate source copies.
- `candidate/cc04-vm-s-raw-bundle.js` — raw stitched candidate assembly, not a paste target.
- `reports/cc04-verification.json` and `.md` — VM vectors, simulated regression, and provenance.
- `reports/build.json` — source hashes and base-candidate identity.

## Verification

```bash
node Active/O8.14/tools/build-cc04-05.mjs
node Active/O8.14/tools/run-cc04-05.mjs
```

The runner checks valid VM programs, malformed opcodes, stack/key/value limits, and the S0, S1,
S4a, S6, and S14 simulated scenarios. S1 preserves desktop/stream completion.

CC-04 is not live-eligible. Real-host renderer, memory, and full OTO/obfuscation checks remain
separate review gates.
