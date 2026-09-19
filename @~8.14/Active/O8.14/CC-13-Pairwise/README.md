# CC-13 — pairwise compatibility candidate

**Status:** candidate-only; simulated compatibility verification PASS  
**Scope:** only FaCs from separately passing CC-01 through CC-12 candidates

CC-13 does not force every experimental surface into one runtime. It builds three explicit runtime
profiles by combining the CC-09 extended-H module boundary with exactly one of the mutually exclusive
CC-06, CC-07, or CC-08 serialized `n2` variants. Each profile passes syntax validation and the S1
desktop/stream regression with the expected 26/9/102 counts.

The pairwise matrix also records intentional boundaries:

- CC-06, CC-07, and CC-08 share one 731-byte `n2` budget slot and are alternatives, not additive layers.
- CAR-M remains isolated from R2-10A/R2-10B; no combined carrier rebuild is made.
- CC-12 is the derived loader boundary over the hardened CC-11 codec.
- CC-01 remains a measurement-only baseline reference.

## Artifacts

- `candidate/cc13-css-html-raw-bundle.js`
- `candidate/cc13-xml-xslt-raw-bundle.js`
- `candidate/cc13-glsl-raw-bundle.js`
- `candidate/cc13-pairwise-matrix.json`
- `reports/build.json`
- `reports/cc13-verification.json`
- `reports/cc13-verification.md`
- `source/variants/` — attributable source copies for the three profiles

No profile is selected for promotion. O8.13-r3 remains untouched, and CC-14 remains a separate
candidate compilation step.
