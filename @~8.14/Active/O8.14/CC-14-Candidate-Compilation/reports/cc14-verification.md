# CC-14 O8.14 candidate compilation

- **Status:** PASS; candidate-only
- **Runtime selection:** none; three compatible runtime profiles remain alternatives
- **Approved FaCs:** FaC-01, FaC-02, FaC-03, FaC-04, FaC-05, FaC-06, FaC-07, FaC-08, FaC-09, FaC-10, FaC-11, FaC-12, FaC-13, FaC-14, FaC-15, FaC-16, FaC-17
- **O8.13-r3:** frozen and hash-verified
- **Proper 14r1 runner:** still pending

## Gates

- PASS — cc13Pass
- PASS — separateApprovals
- PASS — profilesCopiedAndSyntaxChecked
- PASS — componentsCopiedAndSyntaxChecked
- PASS — approvedFaCsComplete
- PASS — noNewRouteOrCapability
- PASS — frozenO813Unchanged
- PASS — rawCandidateOnly
- PASS — proper14r1StillPending
- PASS — noGoLive

## Profiles

- PASS — CC-13-CSS-HTML: `Active/O8.14/CC-14-Candidate-Compilation/candidate/profiles/cc13-css-html-raw-bundle.js`, sha256 `d1820efcb4c53ccf852c880aa6ddde2408ec86f961c63c65bdf05970aa3e6c62`
- PASS — CC-13-XML-XSLT: `Active/O8.14/CC-14-Candidate-Compilation/candidate/profiles/cc13-xml-xslt-raw-bundle.js`, sha256 `1717ef4bb951754b95a60ccc5db3cbd3526095f444a077a62973095c1ab1d1ef`
- PASS — CC-13-GLSL: `Active/O8.14/CC-14-Candidate-Compilation/candidate/profiles/cc13-glsl-raw-bundle.js`, sha256 `2ed72b5639547270d502a914e4ce63e4f0a2d931c8106b88376496710aec5b2d`

This is a provenance-first candidate compilation, not a release package. It does not run full OTO/obfuscation, the established sharding-to-stego/packaging/password-test runner, real-host gates, or GO LIVE.
