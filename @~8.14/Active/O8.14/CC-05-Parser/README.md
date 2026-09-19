# CC-05 — bounded data-parser candidate

**Status:** candidate-only; simulated verification PASS  
**Base:** CC-04 VM-S candidate  
**FaCs:** FaC-02, FaC-06, FaC-09, FaC-10, FaC-16

CC-05 adds a finite non-executable data parser for the VM-S limit record. The grammar accepts only
five named numeric fields, with bounded text, field count, integer range, and duplicate rejection.
It does not evaluate source, parse markup, access host capabilities, or create a second VM.

The parser is used to construct the VM-S limits from a fixed serialized record, so the parser is
exercised by the candidate rather than being an unused side utility.

## Artifacts

- `source/shards/` — CC-05 candidate source copies.
- `candidate/cc05-parser-raw-bundle.js` — raw stitched candidate assembly, not a paste target.
- `reports/cc05-verification.json` and `.md` — parser/VM vectors, simulated regression, and provenance.
- `reports/build.json` — source hashes and CC-04 base identity.

## Verification

```bash
node Active/O8.14/tools/build-cc04-05.mjs
node Active/O8.14/tools/run-cc04-05.mjs
```

The runner checks parser caps, duplicate/grammar/value rejection, VM behavior, and the S0, S1,
S4a, S6, and S14 simulated scenarios. S1 preserves desktop/stream completion.

CC-05 is not live-eligible. Real-host renderer, memory, and full OTO/obfuscation checks remain
separate review gates.
