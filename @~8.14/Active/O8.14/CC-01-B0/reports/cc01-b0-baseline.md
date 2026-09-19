# CC-01 / O8.14-B0 baseline report

- **Gate status:** PASS
- **Generated:** 2026-09-19T05:27:06.785Z
- **Frozen baseline:** O8.13-r3
- **Machine report JSON SHA-256:** `3f7b89ef7d5a83f123e346ab5b90019b1adf73c9103df93b65de6b8dd1c7c3f3`

## Provenance and protection

- Authoritative spring-cleaning copy: https://github.com/Sitramonicus/JSArchive/tree/main/%40~8.14/8.14-SF
- Verified commit: `30d36065089d7edfb3f68f2826c2cbcd5895b475`
- Frozen inputs unchanged after run: **yes**
- Frozen O8.13-r3 files modified: **none**
- Network calls: **0**; credential values retained: **no**

## Gates

- PASS — frozenBaselinePresent
- PASS — frozenInputsUnchanged
- PASS — evaluatorBoundaryObserved
- PASS — simulatedStressBaseline
- PASS — hostObserverNoNetwork
- PASS — noPromotion

## FaC-02 evaluator boundary

- Total evaluator-boundary calls observed: **3**
- T1-decoy: calls=1, released=true, throw=none
- T2-real-host: calls=2, released=true, throw=none

## FaC-03 host boundary

- Static GooglePostSafe sites: 3; GoogleGetSafe sites: 1; fetch sites: 0.
- Route roles observed statically: applicationsUrl, heartbeat, tasks, videoProgress.
- Simulated baseline scenarios: S0=PASS, S13a=PASS, S14=PASS.

## FaC-04 branch and cleanup baseline

- Branch rows recorded: 5.
- Timer/listener static census: setTimeout=6, setInterval=3, addEventListener=3, removeEventListener=6, cleanup-like terms=21.

## FaC-16 status

This is a measured before-state, not a promotion decision. Any later O8.14 change must compare against this report and keep O8.13-r3 byte-identical.

Machine-readable detail is in `cc01-b0-baseline.json`; its sidecar is `cc01-b0-baseline.json.sha256`.
