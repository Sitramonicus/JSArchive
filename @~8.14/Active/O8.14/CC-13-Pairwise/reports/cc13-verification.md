# CC-13 pairwise compatibility verification

- **Status:** PASS; candidate-only
- **Primary selection:** none; profiles remain alternatives
- **Pairwise rows:** 55
- **Runtime profiles built:** 3
- **CAR-M + R2-10 combined:** explicitly not built

## Gates

- PASS — separateCCApprovals
- PASS — runtimePairwiseProfiles
- PASS — serializedDecoyExclusivity
- PASS — carmIsolation
- PASS — r2CodecLineage
- PASS — noNewRouteOrCapability
- PASS — frozenO813Unchanged
- PASS — noPromotion

## Runtime profiles

- PASS — CC-13-CSS-HTML: S1 26/9/102, sha256 `d1820efcb4c53ccf852c880aa6ddde2408ec86f961c63c65bdf05970aa3e6c62`
- PASS — CC-13-XML-XSLT: S1 26/9/102, sha256 `1717ef4bb951754b95a60ccc5db3cbd3526095f444a077a62973095c1ab1d1ef`
- PASS — CC-13-GLSL: S1 26/9/102, sha256 `2ed72b5639547270d502a914e4ce63e4f0a2d931c8106b88376496710aec5b2d`

CC-13 only builds compatibility profiles. It does not promote a profile, combine the CAR-M laboratory with R2-10, or modify O8.13-r3.
