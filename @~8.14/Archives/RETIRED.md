# Retired bytes — context file (2026-09-12 trim)

Everything below was deleted to reclaim workspace space. Each entry keeps:
size, sha256, full listing, and the small-text context (checksums, manifests,
archive notes). Nothing here is on the live line (S6 + Stego-2 r1 at trim time; live is now r2 — see INDEX.md).
Regenerate/verify: `python3 Archives/build-retired.py` (dry run, asserts live bytes).

## Stego-2 variant + rebuild evidence dirs (reproducible, deleted)

- Was: `Active/Stego/output-stego2-re/` — 4,638,091 B (O8.7-Stego-2-cover.bmp, O8.7-Stego-2-runner.js, stego2-decoy.min.js, stego2-real.min.js)
  runner sha256 `9e475cb269f5487bb1bae07a98bca04a1097a1bd66550499a851d38e2a94f0fb`, SAME-BMP-AS-V0
  Line 1: `var 会員 = 2; var 名 = "佐藤 結衣"; console.clear(); !async function(){"use strict";var W="undefi`
  Reproduce: `node build-stego2.js … (default variant 0)` + tier suite (see `Active/Stego/README.md` §6; v1/v2 smoked 4/4 quick at freeze).
- Was: `Active/Stego/output-stego2-v1/` — 4,638,082 B (O8.7-Stego-2-cover.bmp, O8.7-Stego-2-runner.js, stego2-decoy.min.js, stego2-real.min.js)
  runner sha256 `d8b8c0bd6e6f3f53181b243df811fd243b495f1f4265da50e44e9da8b6613cce`, SAME-BMP-AS-V0
  Line 1: `var 名="佐藤 結衣",会員=0x2;console.clear();!async function(){"use strict";var W="undefined"==typ`
  Reproduce: `node build-stego2.js … --line1=1` + tier suite (see `Active/Stego/README.md` §6; v1/v2 smoked 4/4 quick at freeze).
- Was: `Active/Stego/output-stego2-v2/` — 4,638,080 B (O8.7-Stego-2-cover.bmp, O8.7-Stego-2-runner.js, stego2-decoy.min.js, stego2-real.min.js)
  runner sha256 `a11ec8cdb15b63bdb22664cc8d3701d6de3a53836edd7319df3b16ce5690bb9b`, SAME-BMP-AS-V0
  Line 1: `var 会員=2,名='佐藤 結衣';console.clear();!async function(){"use strict";var W="undefined"==typeo`
  Reproduce: `node build-stego2.js … --line1=2` + tier suite (see `Active/Stego/README.md` §6; v1/v2 smoked 4/4 quick at freeze).

## S3 r1 frozen build

- Was: `Archives/packages/O8.6-S3-r1.tar.gz` — 1,916,802 B, sha256 `2dfbfab1670fb26b8d305a2dcd2b6e8aca8dbada427dfe4fff29371e63aee07c`
- Superseded by the S6 line; feature deltas live in `Handoff/CHANGELOG.md` + `Docs/O8.6-S3-S4.md`.
- Entries (13):
```
O8.6-S3-r1
O8.6-S3-r1/O8.6-Final-compressed-deflateraw.js
O8.6-S3-r1/O8.6-Final-compressed-gzip.js
O8.6-S3-r1/O8.6-Final-final-bundle.js
O8.6-S3-r1/SHA256SUMS.txt
O8.6-S3-r1/selected-shards
O8.6-S3-r1/selected-shards/shard-a-v1.js
O8.6-S3-r1/selected-shards/shard-aux-v5.js
O8.6-S3-r1/selected-shards/shard-e-v1.js
O8.6-S3-r1/selected-shards/shard-m-v2.js
O8.6-S3-r1/selected-shards/shard-n1-v6.js
O8.6-S3-r1/selected-shards/shard-n2-v7.js
O8.6-S3-r1/selected-shards/shard-u-v4.js
```
- Embedded `O8.6-S3-r1/SHA256SUMS.txt`:
```
ec5241b103ac1edd5a033e36652125a8ff0c39f6630b9cb20e1db695d827893e  O8.6-Final-compressed-gzip.js
38e13820951ff580d1027a567280f144ee5605ca1a585adb9c0056c40f2894e8  O8.6-Final-compressed-deflateraw.js
4270e726899a77d5317307e06ed76324af0ad095230fb6ed13128552a197bcd4  O8.6-Final-final-bundle.js
```

## S4 frozen build

- Was: `Archives/packages/O8.6-S4-r1.tar.gz` — 1,955,311 B, sha256 `8928a7c38c143c03f52891cf2afcdae5c9d8bb605fbb43c70167d6e9407d91e1`
- Superseded by the S6 line; feature deltas live in `Handoff/CHANGELOG.md` + `Docs/O8.6-S3-S4.md`.
- Entries (13):
```
O8.6-S4-r1
O8.6-S4-r1/O8.6-Final-compressed-deflateraw.js
O8.6-S4-r1/O8.6-Final-compressed-gzip.js
O8.6-S4-r1/O8.6-Final-final-bundle.js
O8.6-S4-r1/SHA256SUMS.txt
O8.6-S4-r1/selected-shards
O8.6-S4-r1/selected-shards/shard-a-v1.js
O8.6-S4-r1/selected-shards/shard-aux-v5.js
O8.6-S4-r1/selected-shards/shard-e-v1.js
O8.6-S4-r1/selected-shards/shard-m-v2.js
O8.6-S4-r1/selected-shards/shard-n1-v6.js
O8.6-S4-r1/selected-shards/shard-n2-v7.js
O8.6-S4-r1/selected-shards/shard-u-v4.js
```
- Embedded `O8.6-S4-r1/SHA256SUMS.txt`:
```
cfdbeb3db0f519d688b437d9a480d85e4cc330cd2b63830acf88d2db3a827c65  O8.6-Final-compressed-gzip.js
d35534cd2bde90030c1c11f94211ecf73872d167e3485ce79b5b143dd5f7139a  O8.6-Final-compressed-deflateraw.js
63e8f695b20001354dee2aafceea2423ae9ee60513c588ed64c310ee5d272ab8  O8.6-Final-final-bundle.js
```

## S5 r1 frozen build

- Was: `Archives/packages/O8.6-S5-r1.tar.gz` — 2,123,129 B, sha256 `9420d2081ead011ee7821b51c4e32dfac46d8c8048ef6437dbd68ca0fad958e2`
- Superseded by the S6 line; feature deltas live in `Handoff/CHANGELOG.md` + `Docs/O8.6-S3-S4.md`.
- Entries (13):
```
O8.6-S5-r1
O8.6-S5-r1/O8.6-Final-compressed-deflateraw.js
O8.6-S5-r1/O8.6-Final-compressed-gzip.js
O8.6-S5-r1/O8.6-Final-final-bundle.js
O8.6-S5-r1/SHA256SUMS.txt
O8.6-S5-r1/selected-shards
O8.6-S5-r1/selected-shards/shard-a-v1.js
O8.6-S5-r1/selected-shards/shard-aux-v5.js
O8.6-S5-r1/selected-shards/shard-e-v1.js
O8.6-S5-r1/selected-shards/shard-m-v2.js
O8.6-S5-r1/selected-shards/shard-n1-v6.js
O8.6-S5-r1/selected-shards/shard-n2-v7.js
O8.6-S5-r1/selected-shards/shard-u-v4.js
```
- Embedded `O8.6-S5-r1/SHA256SUMS.txt`:
```
9c7cd03cc466ee606f8cfbc2eff31fef9a1cb851d146fe711c3c10710e2f7019  O8.6-Final-compressed-gzip.js
58f40f36ed17f694fa7e2ec49d6a31a4174bc8e23e4510607e1a79b106afb3c1  O8.6-Final-compressed-deflateraw.js
99d2d85b6ab377e6d721775255ce5888eb05cdb1745def64857e0041257af0ad  O8.6-Final-final-bundle.js
```

## S5 r2 frozen build

- Was: `Archives/packages/O8.6-S5-r2.tar.gz` — 2,916,170 B, sha256 `80a38990a9d7bc5b3072fb90b1bce104f1e1974dc27dfaa08fdd62217c5108f5`
- Superseded by the S6 line; feature deltas live in `Handoff/CHANGELOG.md` + `Docs/O8.6-S3-S4.md`.
- Entries (7):
```
O8.6-S5-r2
O8.6-S5-r2/O8.6-Final-compressed-deflateraw.js
O8.6-S5-r2/O8.6-Final-compressed-gzip.js
O8.6-S5-r2/O8.6-Final-final-bundle.js
O8.6-S5-r2/O8.6-S5-entangled-cover.bmp
O8.6-S5-r2/O8.6-S5-entangled-stego-runner.js
O8.6-S5-r2/SHA256SUMS.txt
```
- Embedded `O8.6-S5-r2/SHA256SUMS.txt`:
```
58f40f36ed17f694fa7e2ec49d6a31a4174bc8e23e4510607e1a79b106afb3c1  /home/user/o8cmp/O8.6/packages/O8.6-S5-r2/O8.6-Final-compressed-deflateraw.js
9c7cd03cc466ee606f8cfbc2eff31fef9a1cb851d146fe711c3c10710e2f7019  /home/user/o8cmp/O8.6/packages/O8.6-S5-r2/O8.6-Final-compressed-gzip.js
99d2d85b6ab377e6d721775255ce5888eb05cdb1745def64857e0041257af0ad  /home/user/o8cmp/O8.6/packages/O8.6-S5-r2/O8.6-Final-final-bundle.js
6f293445411e80d2bca8dd51b57857f307e6093688dd9820dc3996327ff14e3c  /home/user/o8cmp/O8.6/packages/O8.6-S5-r2/O8.6-S5-entangled-cover.bmp
8899a3eda9ded954843ce55bb965b356350f03a8240b5bab120d3129c0d2cb1e  /home/user/o8cmp/O8.6/packages/O8.6-S5-r2/O8.6-S5-entangled-stego-runner.js
d2cb1f15f153a8af28d0efb21bc1625bb2b1365d8cbad1fd28fffc29f67f6872  /home/user/o8cmp/O8.6/packages/O8.6-S5-r2/SHA256SUMS.txt
```

## S5 r4 consolidated freeze (dir, superseded)

- Was: `Archives/packages/O8.6-S5-r4/` — 5,061,607 B, 15 files
- Stego-1 `O8.6-S5-entangled-cover.bmp`: IDENTICAL (`cmp` clean) — surviving copy at `Active/Stego/output/`
- Stego-1 `O8.6-S5-entangled-stego-runner.js`: IDENTICAL (`cmp` clean) — surviving copy at `Active/Stego/output/`
- Embedded `SHA256SUMS.txt`:
```
dec4e4c9b2823125dba7480d7e80e6b8be8dee0db0eeb8a8da114ba73ad51ffa  O8.6-Final-compressed-gzip.js
553f85d7c6936ce7a12869f147cd89de3ae0e2eb4e053f3e008c2922dde479b3  O8.6-Final-compressed-deflateraw.js
f46f5496100bb04830b685778cbce363982bf4c20a641735342b50cb316f7bd4  O8.6-Final-final-bundle.js
2c9ebf58ae205b2f1e99a861db5b62d07ccdd5740a98fc40b29aa66901d894c1  O8.6-S5-entangled-cover.bmp
14e3ffc845459f6798ab09daa622d31f259545305baeddf7aa64eca4194c4740  O8.6-S5-entangled-stego-runner.js
56267b5a8baf31c5a99cad083b75f7a8fdc4eb4d3e34094d0456c5dddfef88f3  ARCHIVE.txt
a542fd0e60eb19af26c01de4de60e831c1909b7ababbd55aa5218e75ff3e121d  selected-shards/shard-a-v1.js
a2ac5d5e62dd7d031fc9162c4e591e428137a13ac3371371f139b3163c822665  selected-shards/shard-aux-v5.js
84074055b279cbcd66bfa8c7ded4382b652ccc9e366b8a317e1ebfa76552e977  selected-shards/shard-e-v1.js
25957545ed80fcc76883a6d92a64250eacc890f6d0b04e6d91d5c3abd38557b7  selected-shards/shard-m-v2.js
6f98e6cb6ed6ce8c12e463cfb7c9306a73b3092cdd6f2699835942155ac3944a  selected-shards/shard-n1-v6.js
1338b7beb77b1d082b74988a6596e95a8efacc9d28e93e2f8144cc7fe07a5ab8  selected-shards/shard-n2-v7.js
03369db57a62bf66ab9d8a26488770992222b7f9307383d25207712a32655296  selected-shards/shard-u-v4.js
```
- Embedded `ARCHIVE.txt`:
```
O8.6-S5-r4 — CONSOLIDATED ARCHIVE of the latest build (the last-used stego)
Frozen: 2026-09-12 · Source of truth: live workspace state (final-package/ + stego/output/)

WHAT THIS IS
  r4 snapshots the exact build that was last delivered/used at the end of the
  previous session: the S5 JS deliverables plus the cryptographically entangled
  BMP-stego pair, with the OTO-selected shards included for provenance.
  r2/r3 contain the same JS+stego bytes (verified hash-identical to r3) but omit
  selected-shards/ and carry absolute-path SHA files with stale self-entries.
  This archive corrects both: complete file set, relative-path checksums.

CONTENTS
  O8.6-Final-compressed-gzip.js        686,830 B   transport runner (gzip)
  O8.6-Final-compressed-deflateraw.js  686,812 B   transport runner (deflate-raw)
  O8.6-Final-final-bundle.js           1,335,815 B uncompressed obf2 master bundle
  O8.6-S5-entangled-cover.bmp          504,342 B   user cover (618x408x16) + ciphertext
  O8.6-S5-entangled-stego-runner.js    907,125 B   obf3 entangled runner (RUN THIS)
  selected-shards/                     7 OTO picks [v1,v2,v4,v6,v1,v7,v5]
  SHA256SUMS.txt                       checksums (relative paths, no self-entry)

PROVENANCE (all verified 2026-09-12 by sha256)
  - 3 JS files == packages/O8.6-S5-r3/*.js == final-package/*.js
  - stego pair == packages/O8.6-S5-r3 pair == stego/output/O8.6-S5-entangled-*
  - selected-shards == packages/O8.6-S5-r1/selected-shards/* (OTO picks unchanged
    across r1->r3; bundle shrink r1 1507.8KB -> r3 1335.8KB came from outer passes)
  - cover 54-byte DIB header byte-identical to uploads cover image (618x408x16);
    embedded payload length prefix = 434,389 bytes (capacity 504,288)
  - runner Line 1: var 会員 = 2; var 名 = "佐藤 結衣"; console.clear();

LINEAGE
  S5-r1 (pure S5 JS, 25/25+16/16+15/15) -> S5-r2 (r1 bundle + entangled v1:
  bmp 6f293445.., runner 8899a3ed..) -> S5-r3 (full rebuild + entangled v2)
  -> S5-r4 (this consolidated archive, no code changes).

STATUS AT FREEZE
  Entangled pipeline complete and sim-verified ([Host 8.6-S1] boots).
  Awaiting: live Discord-console run of the r3/r4 runner + fresh-AI report.
```

## Pre-S6 rollback freeze

- Was: `Archives/o8.6-S5-live.tar.gz` — 3,969,977 B, sha256 `9a792d03676580fb681267aa840ac109f285ba92824e20c169b791f5a8488caf`
- Superseded by `Archives/o8.6-S6-live.tar.gz` (the rollback point).
- Entries (97):
```
Active/O8.6/shards
Active/O8.6/shards/shard-a.js
Active/O8.6/shards/shard-aux.js
Active/O8.6/shards/shard-e.js
Active/O8.6/shards/shard-m.js
Active/O8.6/shards/shard-n1.js
Active/O8.6/shards/shard-n2.js
Active/O8.6/shards/shard-u.js
Active/O8.6/oto
Active/O8.6/oto/identifiers-dictionary-5k.csv
Active/O8.6/oto/scripts
Active/O8.6/oto/scripts/build-s4-final-package.js
Active/O8.6/oto/scripts/obf-minify-family.js
Active/O8.6/oto/scripts/obf-u-canon.js
Active/O8.6/oto/scripts/obf-u-per-type.js
Active/O8.6/oto/scripts/obf-v1-s3matrix.js
Active/O8.6/oto/scripts/obf-v2-jsc.js
Active/O8.6/oto/scripts/run-15pass-battery.mjs
Active/O8.6/oto/scripts/run-16point-verification.mjs
Active/O8.6/oto/scripts/run-25pass-battery.mjs
Active/O8.6/oto/identifiers-dictionary-jso.csv
Active/O8.6/oto/identifiers-dictionary-runner-5k.csv
Active/O8.6/oto/u
Active/O8.6/oto/u/shard-u-out.js
Active/O8.6/oto/v1-jso-s3matrix
Active/O8.6/oto/v1-jso-s3matrix/shard-a-out.js
Active/O8.6/oto/v1-jso-s3matrix/shard-aux-out.js
Active/O8.6/oto/v1-jso-s3matrix/shard-e-out.js
Active/O8.6/oto/v1-jso-s3matrix/shard-m-out.js
Active/O8.6/oto/v1-jso-s3matrix/shard-n1-out.js
Active/O8.6/oto/v1-jso-s3matrix/shard-n2-out.js
Active/O8.6/oto/v1-jso-s3matrix/shard-u-out.js
Active/O8.6/oto/v2-jsc
Active/O8.6/oto/v2-jsc/shard-a-out.js
Active/O8.6/oto/v2-jsc/shard-aux-out.js
Active/O8.6/oto/v2-jsc/shard-e-out.js
Active/O8.6/oto/v2-jsc/shard-m-out.js
Active/O8.6/oto/v2-jsc/shard-n1-out.js
Active/O8.6/oto/v2-jsc/shard-n2-out.js
Active/O8.6/oto/v2-jsc/shard-u-out.js
Active/O8.6/oto/v4-closure
Active/O8.6/oto/v4-closure/shard-a-out.js
Active/O8.6/oto/v4-closure/shard-aux-out.js
Active/O8.6/oto/v4-closure/shard-e-out.js
Active/O8.6/oto/v4-closure/shard-m-out.js
Active/O8.6/oto/v4-closure/shard-n1-out.js
Active/O8.6/oto/v4-closure/shard-n2-out.js
Active/O8.6/oto/v4-closure/shard-u-out.js
Active/O8.6/oto/v5-terser
Active/O8.6/oto/v5-terser/shard-a-out.js
Active/O8.6/oto/v5-terser/shard-aux-out.js
Active/O8.6/oto/v5-terser/shard-e-out.js
Active/O8.6/oto/v5-terser/shard-m-out.js
Active/O8.6/oto/v5-terser/shard-n1-out.js
Active/O8.6/oto/v5-terser/shard-n2-out.js
Active/O8.6/oto/v5-terser/shard-u-out.js
Active/O8.6/oto/v6-esbuild
Active/O8.6/oto/v6-esbuild/shard-a-out.js
Active/O8.6/oto/v6-esbuild/shard-aux-out.js
Active/O8.6/oto/v6-esbuild/shard-e-out.js
Active/O8.6/oto/v6-esbuild/shard-m-out.js
Active/O8.6/oto/v6-esbuild/shard-n1-out.js
Active/O8.6/oto/v6-esbuild/shard-n2-out.js
Active/O8.6/oto/v6-esbuild/shard-u-out.js
Active/O8.6/oto/v7-swc
Active/O8.6/oto/v7-swc/shard-a-out.js
Active/O8.6/oto/v7-swc/shard-aux-out.js
Active/O8.6/oto/v7-swc/shard-e-out.js
Active/O8.6/oto/v7-swc/shard-m-out.js
Active/O8.6/oto/v7-swc/shard-n1-out.js
Active/O8.6/oto/v7-swc/shard-n2-out.js
Active/O8.6/oto/v7-swc/shard-u-out.js
Active/O8.6/oto/v8-uglify
Active/O8.6/oto/v8-uglify/shard-a-out.js
Active/O8.6/oto/v8-uglify/shard-aux-out.js
Active/O8.6/oto/v8-uglify/shard-e-out.js
Active/O8.6/oto/v8-uglify/shard-m-out.js
Active/O8.6/oto/v8-uglify/shard-n1-out.js
Active/O8.6/oto/v8-uglify/shard-n2-out.js
Active/O8.6/oto/v8-uglify/shard-u-out.js
Active/O8.6/final-package
Active/O8.6/final-package/O8.6-Final-compressed-deflateraw.js
Active/O8.6/final-package/O8.6-Final-compressed-gzip.js
Active/O8.6/final-package/O8.6-Final-final-bundle.js
Active/O8.6/final-package/SHA256SUMS.txt
Active/O8.6/final-package/selected-shards
Active/O8.6/final-package/selected-shards/shard-a-v1.js
Active/O8.6/final-package/selected-shards/shard-aux-v5.js
Active/O8.6/final-package/selected-shards/shard-e-v1.js
Active/O8.6/final-package/selected-shards/shard-m-v2.js
Active/O8.6/final-package/selected-shards/shard-n1-v6.js
Active/O8.6/final-package/selected-shards/shard-n2-v7.js
Active/O8.6/final-package/selected-shards/shard-u-v4.js
Active/Stego/output
Active/Stego/output/O8.6-S5-entangled-cover.bmp
Active/Stego/output/O8.6-S5-entangled-stego-runner.js
Active/Stego/README.md
```
- Embedded `Active/O8.6/final-package/SHA256SUMS.txt`:
```
dec4e4c9b2823125dba7480d7e80e6b8be8dee0db0eeb8a8da114ba73ad51ffa  O8.6-Final-compressed-gzip.js
553f85d7c6936ce7a12869f147cd89de3ae0e2eb4e053f3e008c2922dde479b3  O8.6-Final-compressed-deflateraw.js
f46f5496100bb04830b685778cbce363982bf4c20a641735342b50cb316f7bd4  O8.6-Final-final-bundle.js
```

## S6 r1 live tarball (kept — rollback point)

- KEEP: `Archives/o8.6-S6-live.tar.gz` — 7,229,899 B, sha256 `798cace841320dd14ce21e434c43730b65d603fa817a6afeb6a838e691f515c6`
- Entries (123):
```
Active/O8.6
Active/O8.6/final-package
Active/O8.6/final-package/O8.6-Final-compressed-deflateraw.js
Active/O8.6/final-package/O8.6-Final-compressed-gzip.js
Active/O8.6/final-package/O8.6-Final-final-bundle.js
Active/O8.6/final-package/SHA256SUMS.txt
Active/O8.6/final-package/selected-shards
Active/O8.6/final-package/selected-shards/shard-a-v1.js
Active/O8.6/final-package/selected-shards/shard-aux-v5.js
Active/O8.6/final-package/selected-shards/shard-e-v1.js
Active/O8.6/final-package/selected-shards/shard-m-v2.js
Active/O8.6/final-package/selected-shards/shard-n1-v6.js
Active/O8.6/final-package/selected-shards/shard-n2-v7.js
Active/O8.6/final-package/selected-shards/shard-u-v4.js
Active/O8.6/oto
Active/O8.6/oto/identifiers-dictionary-5k.csv
Active/O8.6/oto/scripts
Active/O8.6/oto/scripts/build-s4-final-package.js
Active/O8.6/oto/scripts/obf-minify-family.js
Active/O8.6/oto/scripts/obf-u-canon.js
Active/O8.6/oto/scripts/obf-u-per-type.js
Active/O8.6/oto/scripts/obf-v1-s3matrix.js
Active/O8.6/oto/scripts/obf-v2-jsc.js
Active/O8.6/oto/scripts/run-15pass-battery.mjs
Active/O8.6/oto/scripts/run-16point-verification.mjs
Active/O8.6/oto/scripts/run-25pass-battery.mjs
Active/O8.6/oto/identifiers-dictionary-jso.csv
Active/O8.6/oto/identifiers-dictionary-runner-5k.csv
Active/O8.6/oto/u
Active/O8.6/oto/u/shard-u-out.js
Active/O8.6/oto/v1-jso-s3matrix
Active/O8.6/oto/v1-jso-s3matrix/shard-a-out.js
Active/O8.6/oto/v1-jso-s3matrix/shard-aux-out.js
Active/O8.6/oto/v1-jso-s3matrix/shard-e-out.js
Active/O8.6/oto/v1-jso-s3matrix/shard-m-out.js
Active/O8.6/oto/v1-jso-s3matrix/shard-n1-out.js
Active/O8.6/oto/v1-jso-s3matrix/shard-n2-out.js
Active/O8.6/oto/v1-jso-s3matrix/shard-u-out.js
Active/O8.6/oto/v2-jsc
Active/O8.6/oto/v2-jsc/shard-a-out.js
Active/O8.6/oto/v2-jsc/shard-aux-out.js
Active/O8.6/oto/v2-jsc/shard-e-out.js
Active/O8.6/oto/v2-jsc/shard-m-out.js
Active/O8.6/oto/v2-jsc/shard-n1-out.js
Active/O8.6/oto/v2-jsc/shard-n2-out.js
Active/O8.6/oto/v2-jsc/shard-u-out.js
Active/O8.6/oto/v4-closure
Active/O8.6/oto/v4-closure/shard-a-out.js
Active/O8.6/oto/v4-closure/shard-aux-out.js
Active/O8.6/oto/v4-closure/shard-e-out.js
Active/O8.6/oto/v4-closure/shard-m-out.js
Active/O8.6/oto/v4-closure/shard-n1-out.js
Active/O8.6/oto/v4-closure/shard-n2-out.js
Active/O8.6/oto/v4-closure/shard-u-out.js
Active/O8.6/oto/v5-terser
Active/O8.6/oto/v5-terser/shard-a-out.js
Active/O8.6/oto/v5-terser/shard-aux-out.js
Active/O8.6/oto/v5-terser/shard-e-out.js
Active/O8.6/oto/v5-terser/shard-m-out.js
Active/O8.6/oto/v5-terser/shard-n1-out.js
Active/O8.6/oto/v5-terser/shard-n2-out.js
Active/O8.6/oto/v5-terser/shard-u-out.js
Active/O8.6/oto/v6-esbuild
Active/O8.6/oto/v6-esbuild/shard-a-out.js
Active/O8.6/oto/v6-esbuild/shard-aux-out.js
Active/O8.6/oto/v6-esbuild/shard-e-out.js
Active/O8.6/oto/v6-esbuild/shard-m-out.js
Active/O8.6/oto/v6-esbuild/shard-n1-out.js
Active/O8.6/oto/v6-esbuild/shard-n2-out.js
Active/O8.6/oto/v6-esbuild/shard-u-out.js
Active/O8.6/oto/v7-swc
Active/O8.6/oto/v7-swc/shard-a-out.js
Active/O8.6/oto/v7-swc/shard-aux-out.js
Active/O8.6/oto/v7-swc/shard-e-out.js
Active/O8.6/oto/v7-swc/shard-m-out.js
Active/O8.6/oto/v7-swc/shard-n1-out.js
Active/O8.6/oto/v7-swc/shard-n2-out.js
Active/O8.6/oto/v7-swc/shard-u-out.js
Active/O8.6/oto/v8-uglify
Active/O8.6/oto/v8-uglify/shard-a-out.js
Active/O8.6/oto/v8-uglify/shard-aux-out.js
Active/O8.6/oto/v8-uglify/shard-e-out.js
Active/O8.6/oto/v8-uglify/shard-m-out.js
Active/O8.6/oto/v8-uglify/shard-n1-out.js
Active/O8.6/oto/v8-uglify/shard-n2-out.js
Active/O8.6/oto/v8-uglify/shard-u-out.js
Active/O8.6/shards
Active/O8.6/shards/shard-a.js
Active/O8.6/shards/shard-aux.js
Active/O8.6/shards/shard-e.js
Active/O8.6/shards/shard-m.js
Active/O8.6/shards/shard-n1.js
Active/O8.6/shards/shard-n2.js
Active/O8.6/shards/shard-u.js
Active/O8.6/tools
Active/O8.6/tools/README.md
Active/O8.6/tools/discordlike.mjs
Active/O8.6/tools/feff-sprinkle.js
Active/O8.6/tools/heap-probe.mjs
Active/O8.6/tools/heap-scan.mjs
Active/O8.6/tools/marker-swap.py
Active/O8.6/tools/stitch-o85.py
Active/O8.6/tools/term-sweep.py
Active/O8.6/tools/test-var.mjs
Active/O8.6/tools/typed-pool-o85.mjs
Active/O8.6/tools/zw-suffix.js
Active/Stego/output
Active/Stego/output/O8.6-S5-entangled-cover.bmp
Active/Stego/output/O8.6-S5-entangled-stego-runner.js
Active/Stego/output-stego2
Active/Stego/output-stego2/stego2-real.min.js
Active/Stego/output-stego2/stego2-decoy.min.js
Active/Stego/output-stego2/O8.7-Stego-2-cover.bmp
Active/Stego/output-stego2/O8.7-Stego-2-runner.js
Active/Stego/bmp-to-js.js
Active/Stego/build-entangled-stego.js
Active/Stego/build-stego2.js
Active/Stego/decoy-garden.js
Active/Stego/pack-stego-bmp.js
Active/Stego/stego2-loader.js
Active/Stego/cover-gen.py
Active/Stego/make-photo-cover.py
Active/Stego/README.md
```

## Stego-2 r1 frozen pair (kept)

- KEEP: `Archives/packages/O8.7-Stego-2-r1/` — 4,642,969 B, 7 files, `sha256sum -c` 6/6 OK
- Live-sha cross-check (payload files):
```
e0b9f48fd89576d8419fd4bec1ba830e14c389e3a5cf5dc0a704e5961e079bdb  O8.7-Stego-2-cover.bmp
9e475cb269f5487bb1bae07a98bca04a1097a1bd66550499a851d38e2a94f0fb  O8.7-Stego-2-runner.js
921d5b9a86d95b4dc7c60839f05795e2ffdafede1b3b9d836f6221de65cb14cf  stego2-decoy.min.js
bc8aab943cbd63f1ade92899e9585448fc10ca0a0302a853ee4f05f12bbf3af4  stego2-real.min.js
```

## Dead stego experiments

- Was: `Archives/stego-history.tar.gz` — 9,112,915 B, sha256 `5db024465781d54c7de8e8e047b3414225213a5cc7cb80bc5dec92b41247dbb9`
- pack-stego-bmp outputs + diagnosed-dead 6.3 MB `test2.js` fragment. Nothing live.
- Entries (15):
```
stego-history
stego-history/test2.js
stego-history/MANIFEST.txt
stego-history/output
stego-history/output/stego_cover_payload.bmp
stego-history/output/stego_cover_image.bmp
stego-history/output/stego-runner-inline.js
stego-history/output/stego-runner-fetch.js
stego-history/output/stego-final-runner.js
stego-history/output/stego-cover-runner.js
stego-history/output/reconstituted-stego.js
stego-history/output/reconstituted-bytes.js
stego-history/output/payload.bmp
stego-history/output/final-cover-stego-runner.js
stego-history/output/final-cover-stego-obfuscated.js
```
- Embedded `stego-history/MANIFEST.txt`:
```
stego-history — superseded stego intermediates (frozen 2026-09-12)
LIVE pair (O8.6-S5-entangled-cover.bmp + O8.6-S5-entangled-stego-runner.js) stays at Active/Stego/output/ (= r3/r4 bytes).
payload.bmp (588,798 B): pack-stego-bmp.js experiment output; + its reconstituted-*.js extractions.
test2.js (6.3M): diagnosed-dead bundle fragment (tail 'J9ONRvo', window.test=function stub).

sha256 manifest:
8f2f073235ea58f5ab8b07822d2ab66df93fc79925f8e3fbf2d3b92083c86cc6  output/final-cover-stego-obfuscated.js
a8a91c9b0856e0259e804e21aba37596b6b19a86765a28249ee5c94c8c8f4466  output/final-cover-stego-runner.js
e9137447da0070b50f3b95566ff78b314c3c3291243aaca8cffb2d13c16cddd3  output/payload.bmp
6955196cff320a39a1104fa35842c368409b96c45a8253b0fa2db0a062333652  output/reconstituted-bytes.js
48a0368f7e3e6d781e2b14014f33c86e8a4287da5c3001ca8500d181d0bfb976  output/reconstituted-stego.js
a5d14c5351772de628ea4ef8e0ed2981b139d43bdc6349619858308fbb0944bb  output/stego-cover-runner.js
fb5677b54fc228cf1109d4923c702e2eb0d441b773884dc66d875ab1659ab78a  output/stego-final-runner.js
8e63ac12d9db722dfeae66dbeb0ad1d0df73ffe68113dabf175cb14a43a57c92  output/stego-runner-fetch.js
395b9bbab896787842f8ecbc468abee7c1438df43298b1fdd91aa47c71a69498  output/stego-runner-inline.js
c1d4425d57a978cdb506871904084658844f18acd0346194e9ae0b80d5513641  output/stego_cover_image.bmp
f67b163b1a7050007fe4b9e1dab0dff4b4754c8b6caba88231e6e1cd3eeda03c  output/stego_cover_payload.bmp
c996ea0356fe9887cfe6e3fc554f66f3dcb1af293fe71bd3e638dc83ea5633ea  test2.js
```

## Era material `o8.5-era.tar.gz`

- Was: `Archives/o8.5-era.tar.gz` — 5,409,255 B, sha256 `a27676aef21a01f329efb2a16ce34824c0498e494456dc1426cd7e12a6a9d7f7`
- Prose context merged losslessly into `Docs/O8.5-ERA.md` at reorg; tarball held only pre-reorg paths.
- Entries (255):
```
o8cmp/s4-shards
o8cmp/s4-shards/README.txt
o8cmp/s4-shards/SHA256SUMS.txt
o8cmp/s4-shards/TRANSPORT_SHAPE.md
o8cmp/s4-shards/shards
o8cmp/s4-shards/shards/shard-a.js
o8cmp/s4-shards/shards/shard-aux.js
o8cmp/s4-shards/shards/shard-e.js
o8cmp/s4-shards/shards/shard-m.js
o8cmp/s4-shards/shards/shard-n1.js
o8cmp/s4-shards/shards/shard-n2.js
o8cmp/s4-shards/shards/shard-u.js
o8cmp/s4-shards/stitch-o85.py
o8cmp/s4-shards/tools
o8cmp/s4-shards/tools/feff-sprinkle.js
o8cmp/s4-shards/tools/heap-probe.mjs
o8cmp/s4-shards/tools/heap-scan.mjs
o8cmp/s4-shards/tools/term-sweep.py
o8cmp/s4-shards/tools/typed-pool-o85.mjs
o8cmp/s4-shards/tools/zw-suffix.js
o8cmp/s4-oto
o8cmp/s4-oto/README.txt
o8cmp/s4-oto/scripts
o8cmp/s4-oto/scripts/SHA256SUMS.txt
o8cmp/s4-oto/scripts/obf-minify-family.js
o8cmp/s4-oto/scripts/build-s4-final-package.js
o8cmp/s4-oto/scripts/obf-u-canon.js
o8cmp/s4-oto/scripts/obf-u-per-type.js
o8cmp/s4-oto/scripts/obf-v1-s3matrix.js
o8cmp/s4-oto/scripts/obf-v2-jsc.js
o8cmp/s4-oto/scripts/run-16point-verification.mjs
o8cmp/s4-oto/u
o8cmp/s4-oto/u/SHA256SUMS.txt
o8cmp/s4-oto/u/shard-u-out.js
o8cmp/s4-oto/SETTINGS-javascript-obfuscator.md
o8cmp/s4-oto/identifiers-dictionary-5k.csv
o8cmp/s4-oto/identifiers-dictionary-jso.csv
o8cmp/s4-oto/identifiers-dictionary-runner-5k.csv
o8cmp/s4-oto/v1-jso-s3matrix
o8cmp/s4-oto/v1-jso-s3matrix/SHA256SUMS.txt
o8cmp/s4-oto/v1-jso-s3matrix/shard-a-out.js
o8cmp/s4-oto/v1-jso-s3matrix/shard-aux-out.js
o8cmp/s4-oto/v1-jso-s3matrix/shard-e-out.js
o8cmp/s4-oto/v1-jso-s3matrix/shard-m-out.js
o8cmp/s4-oto/v1-jso-s3matrix/shard-n1-out.js
o8cmp/s4-oto/v1-jso-s3matrix/shard-n2-out.js
o8cmp/s4-oto/v1-jso-s3matrix/shard-u-out.js
o8cmp/s4-oto/v1-jso-s3matrix/stitched-full.js
o8cmp/s4-oto/v2-jsc
o8cmp/s4-oto/v2-jsc/SHA256SUMS.txt
o8cmp/s4-oto/v2-jsc/shard-a-out.js
o8cmp/s4-oto/v2-jsc/shard-aux-out.js
o8cmp/s4-oto/v2-jsc/shard-e-out.js
o8cmp/s4-oto/v2-jsc/shard-m-out.js
o8cmp/s4-oto/v2-jsc/shard-n1-out.js
o8cmp/s4-oto/v2-jsc/shard-n2-out.js
o8cmp/s4-oto/v2-jsc/shard-u-out.js
o8cmp/s4-oto/v2-jsc/stitched-full.js
o8cmp/s4-oto/v4-closure
o8cmp/s4-oto/v4-closure/SHA256SUMS.txt
o8cmp/s4-oto/v4-closure/shard-a-out.js
o8cmp/s4-oto/v4-closure/shard-aux-out.js
o8cmp/s4-oto/v4-closure/shard-e-out.js
o8cmp/s4-oto/v4-closure/shard-m-out.js
o8cmp/s4-oto/v4-closure/shard-n1-out.js
o8cmp/s4-oto/v4-closure/shard-n2-out.js
o8cmp/s4-oto/v4-closure/shard-u-out.js
o8cmp/s4-oto/v4-closure/stitched-full.js
o8cmp/s4-oto/v5-terser
o8cmp/s4-oto/v5-terser/SHA256SUMS.txt
o8cmp/s4-oto/v5-terser/shard-a-out.js
o8cmp/s4-oto/v5-terser/shard-aux-out.js
o8cmp/s4-oto/v5-terser/shard-e-out.js
o8cmp/s4-oto/v5-terser/shard-m-out.js
o8cmp/s4-oto/v5-terser/shard-n1-out.js
o8cmp/s4-oto/v5-terser/shard-n2-out.js
o8cmp/s4-oto/v5-terser/shard-u-out.js
o8cmp/s4-oto/v5-terser/stitched-full.js
o8cmp/s4-oto/v6-esbuild
o8cmp/s4-oto/v6-esbuild/SHA256SUMS.txt
o8cmp/s4-oto/v6-esbuild/shard-a-out.js
o8cmp/s4-oto/v6-esbuild/shard-aux-out.js
o8cmp/s4-oto/v6-esbuild/shard-e-out.js
o8cmp/s4-oto/v6-esbuild/shard-m-out.js
o8cmp/s4-oto/v6-esbuild/shard-n1-out.js
o8cmp/s4-oto/v6-esbuild/shard-n2-out.js
o8cmp/s4-oto/v6-esbuild/shard-u-out.js
o8cmp/s4-oto/v6-esbuild/stitched-full.js
o8cmp/s4-oto/v7-swc
o8cmp/s4-oto/v7-swc/SHA256SUMS.txt
o8cmp/s4-oto/v7-swc/shard-a-out.js
o8cmp/s4-oto/v7-swc/shard-aux-out.js
o8cmp/s4-oto/v7-swc/shard-e-out.js
o8cmp/s4-oto/v7-swc/shard-m-out.js
o8cmp/s4-oto/v7-swc/shard-n1-out.js
o8cmp/s4-oto/v7-swc/shard-n2-out.js
o8cmp/s4-oto/v7-swc/shard-u-out.js
o8cmp/s4-oto/v7-swc/stitched-full.js
o8cmp/s4-oto/v8-uglify
o8cmp/s4-oto/v8-uglify/SHA256SUMS.txt
o8cmp/s4-oto/v8-uglify/shard-a-out.js
o8cmp/s4-oto/v8-uglify/shard-aux-out.js
o8cmp/s4-oto/v8-uglify/shard-e-out.js
o8cmp/s4-oto/v8-uglify/shard-m-out.js
o8cmp/s4-oto/v8-uglify/shard-n1-out.js
o8cmp/s4-oto/v8-uglify/shard-n2-out.js
o8cmp/s4-oto/v8-uglify/shard-u-out.js
o8cmp/s4-oto/v8-uglify/stitched-full.js
o8cmp/s4-final-package
o8cmp/s4-final-package/O8.5-S4-compressed-deflateraw.js
o8cmp/s4-final-package/O8.5-S4-compressed-gzip.js
o8cmp/s4-final-package/O8.5-S4-final-bundle.js
o8cmp/s4-final-package/README.md
o8cmp/s4-final-package/SHA256SUMS.txt
o8cmp/s4-final-package/selected-shards
o8cmp/s4-final-package/selected-shards/shard-a-v1.js
o8cmp/s4-final-package/selected-shards/shard-aux-v5.js
o8cmp/s4-final-package/selected-shards/shard-e-v1.js
o8cmp/s4-final-package/selected-shards/shard-m-v2.js
o8cmp/s4-final-package/selected-shards/shard-n1-v6.js
o8cmp/s4-final-package/selected-shards/shard-n2-v7.js
o8cmp/s4-final-package/selected-shards/shard-u-v4.js
o8cmp/s4-mixed-precheck
o8cmp/s4-mixed-precheck/O8.5-S4-mixed-uOTO-r2.js
o8cmp/s4-mixed-precheck/README.txt
o8cmp/s4-mixed-precheck/O8.5-S4-mixed-uOTO.js
o8cmp/s4-mixed-precheck/SHA256SUMS.txt
o8cmp/release
o8cmp/release/O8.5-Shard-2
o8cmp/release/O8.5-Shard-2/O8.5-Shard-2.js
o8cmp/release/O8.5-Shard-2/README.txt
o8cmp/release/O8.5-Shard-2/SHA256SUMS.txt
o8cmp/release/O8.5-Shard-2/shards
o8cmp/release/O8.5-Shard-2/shards/shard-a.js
o8cmp/release/O8.5-Shard-2/shards/shard-aux.js
o8cmp/release/O8.5-Shard-2/shards/shard-e.js
o8cmp/release/O8.5-Shard-2/shards/shard-m.js
o8cmp/release/O8.5-Shard-2/shards/shard-n1.js
o8cmp/release/O8.5-Shard-2/shards/shard-n2.js
o8cmp/release/O8.5-Shard-2/stitch-o85.py
o8cmp/release/O8.5-Shard-3
o8cmp/release/O8.5-Shard-3/O8.5-Shard-3-obf-reference.js
o8cmp/release/O8.5-Shard-3/obf
o8cmp/release/O8.5-Shard-3/obf/shard-a-out.js
o8cmp/release/O8.5-Shard-3/obf/shard-aux-out.js
o8cmp/release/O8.5-Shard-3/obf/shard-e-out.js
o8cmp/release/O8.5-Shard-3/obf/shard-m-out.js
o8cmp/release/O8.5-Shard-3/obf/shard-n1-out.js
o8cmp/release/O8.5-Shard-3/obf/shard-n2-out.js
o8cmp/release/O8.5-Shard-3/O8.5-Shard-3.js
o8cmp/release/O8.5-Shard-3/OBFUSCATION_SETTINGS.md
o8cmp/release/O8.5-Shard-3/README.txt
o8cmp/release/O8.5-Shard-3/SHA256SUMS.txt
o8cmp/release/O8.5-Shard-3/identifiers-dictionary-v2.txt
o8cmp/release/O8.5-Shard-3/identifiers-dictionary.txt
o8cmp/release/O8.5-Shard-3/obf-all.js
o8cmp/release/O8.5-Shard-3/obf-smoke.js
o8cmp/release/O8.5-Shard-3/shards
o8cmp/release/O8.5-Shard-3/shards/shard-a.js
o8cmp/release/O8.5-Shard-3/shards/shard-aux.js
o8cmp/release/O8.5-Shard-3/shards/shard-e.js
o8cmp/release/O8.5-Shard-3/shards/shard-m.js
o8cmp/release/O8.5-Shard-3/shards/shard-n1.js
o8cmp/release/O8.5-Shard-3/shards/shard-n2.js
o8cmp/release/O8.5-Shard-3/stitch-o85.py
o8cmp/builds
o8cmp/builds/O7.38.dc.js
o8cmp/builds/O7.38.js
o8cmp/builds/O7.41.js
o8cmp/builds/O7.42-C.js
o8cmp/builds/O7.42-D.js
o8cmp/builds/O7.42-Juggle.js
o8cmp/builds/O7.42-a.js
o8cmp/builds/O7.42-b.js
o8cmp/builds/O7.45-c.js
o8cmp/builds/O8.1.dc.js
o8cmp/builds/O8.2-Juggle-diag.js
o8cmp/builds/O8.2-Juggle-fix.js
o8cmp/builds/O8.2-Juggle.js
o8cmp/builds/O8.2-Juggler-1.js
o8cmp/builds/O8.2-Juggler-2.js
o8cmp/builds/O8.2-Juggler-3.js
o8cmp/builds/O8.2-Juggler-4.js
o8cmp/builds/O8.2-Juggler-5.js
o8cmp/builds/O8.2-Juggler-6.js
o8cmp/builds/O8.2-Juggler-7.js
o8cmp/builds/O8.2.dc.js
o8cmp/builds/O8.2Juggler.dc.js
o8cmp/builds/O8.3.js
o8cmp/builds/O8.4.1.js
o8cmp/builds/O8.4.2.js
o8cmp/builds/O8.4.3.js
o8cmp/builds/O8.4.js
o8cmp/builds/O8.5-Shard-1-stitched.js
o8cmp/builds/O8.5-Shard-1.js
o8cmp/builds/O8.5-Shard-2.js
o8cmp/builds/O8.5-Shard-3.js
o8cmp/builds/O8.5-current-obf-edit.js
o8cmp/cores
o8cmp/cores/o85-shard3-enc-core.js
o8cmp/seamless
o8cmp/seamless/COMPRESSION_MAP.md
o8cmp/seamless/O8.5-Seamless-jsc.js
o8cmp/seamless/O8.5-Seamless-jso.js
o8cmp/seamless/RESULTS.md
o8cmp/seamless/SHA256SUMS.txt
o8cmp/seamless/TECHNIQUE_MAP.md
o8cmp/seamless/body.js
o8cmp/seamless/engines
o8cmp/seamless/engines/package-lock.json
o8cmp/seamless/engines/package.json
o8cmp/seamless/final.js
o8cmp/seamless/jsc
o8cmp/seamless/jsc/package-lock.json
o8cmp/seamless/jsc/package.json
o8cmp/seamless/jso
o8cmp/seamless/jso/package-lock.json
o8cmp/seamless/jso/package.json
o8cmp/seamless/obfuscate-final.js
o8cmp/seamless/out-jsc.js
o8cmp/seamless/out-jso.js
o8cmp/seamless/package-lock.json
o8cmp/seamless/package.json
o8cmp/seamless/run-jsc.js
o8cmp/seamless/run-jso.js
o8cmp/tools
o8cmp/tools/base-o842.py
o8cmp/tools/base-o843.py
o8cmp/tools/harness
o8cmp/tools/harness/README.txt
o8cmp/tools/harness/discordlike.mjs
o8cmp/tools/harness/marker-swap.py
o8cmp/tools/harness/test-var.mjs
o8cmp/tools/dyn-lex-o85.py
o8cmp/tools/inv-o85.py
o8cmp/tools/juggler-dual-builder.js
o8cmp/tools/juggler-e2e.js
o8cmp/tools/juggler-env-test.js
o8cmp/tools/juggler-gcall-test.js
o8cmp/tools/juggler-googleid-test.js
o8cmp/tools/juggler-instance-check.js
o8cmp/tools/juggler-metamorph-generator.js
o8cmp/tools/juggler-strings.json
o8cmp/tools/lexenc-o85.py
o8cmp/tools/lexicon-o842.py
o8cmp/tools/lexicon-o843-builder.py
o8cmp/tools/lexicon-o843.py
o8cmp/tools/lexicon-o843b.py
o8cmp/tools/shard-o843.py
o8cmp/tools/shard2-o85.py
o8cmp/tools/shardify-o85.py
o8cmp/tools/shardify3-o85.py
o8cmp/tools/stitch-o85.py
o8cmp/tools/stripc-o85.py
o8cmp/tools/unlock-unit.js
```
- Embedded `o8cmp/s4-shards/SHA256SUMS.txt`:
```
a921ad2e43084e93f2639b2cf02cbbefdff04e71a234861e61634fdb99b74999  shards/shard-a.js
714c61b730a6bae24a6c4506bece2cb80042a29d6089982ea3992b827f500ac4  shards/shard-aux.js
c400297354596277a07ab4db881be76db6521ad0e112b1bd6e26296cd8932d06  shards/shard-e.js
de637d21b8031057b79a59e0e47d4586695a48895b6c7c477f759e70fbe7008c  shards/shard-m.js
4ac79fb698babbcb4471c9db5c54722e205ce3a91662088db19e1d320ae74ad2  shards/shard-n1.js
90cc6bcb90b9c467e377ddf0657e58e6bff9ed947f763455e6e6385ea910d40f  shards/shard-n2.js
aa26c07f4f9ecc966fca84b82772140a6bfe70331cbb8167f36034a19170fe8f  shards/shard-u.js
356a0831106639c25212477f6a0d69041e9b5cab1485b48f5ae30d2f7cacc989  stitch-o85.py
e90b7247833acec6502975e7ef09d649e736b066efc0bc5d332fab4c93906b95  tools/feff-sprinkle.js
e083812b354646364a19855c314c80a02a37225d4d711c9c58bbfa6796c6c7eb  tools/zw-suffix.js
31da178b8ca536496bcec481ee41ae3734559d0f3df5024812441ce816209f45  tools/heap-probe.mjs
d8031ff94a8964a0724a26314cc6b56ee0efd08ac54d3e9d79ed89b28b77499c  tools/heap-scan.mjs
2797f7a9a2415e945b8d0b5d1081c83d186f465c3dffd801eb1e88c7d5a7f86e  tools/typed-pool-o85.mjs
1cf29b057f3824d1aa120a9be917170b0f7c44311312a0163d2f0d7484c42a69  tools/term-sweep.py
ff20f5ae862dd99ec1bdaf9611bbd78e301dd326a558e95eb38a08b00e544397  TRANSPORT_SHAPE.md
```
- Embedded `o8cmp/s4-oto/scripts/SHA256SUMS.txt`:
```
673147d883394b89066b963fad331eca1510b40b3d7b45b7807bb95719c9e02a  obf-minify-family.js
c6c1eeaf2364dec78c8dbcce72eea86599ef7b2b073ac00679c4eb33b484fb67  obf-u-canon.js
825d35ee0fee15d2bcff9044b732e119dc3f7fc61a2f10c36dc0ed98ec6d26d7  obf-u-per-type.js
561237ff012e44c625a93662797e554191b842917533c7a50593ac13510896c2  obf-v1-s3matrix.js
663658f90c57df21b267ab667af96df17d617146219ff500c078f87bbf6ac015  obf-v2-jsc.js
```
- Embedded `o8cmp/s4-oto/u/SHA256SUMS.txt`:
```
4017b596778a6041cca385ef6baa68932929057865d847db8a15a895ab85165f  shard-u-out.js
```
- Embedded `o8cmp/s4-oto/v1-jso-s3matrix/SHA256SUMS.txt`:
```
7fd2b2a7d35777fa9c204a727f13d1beb3ad6a5ed6c5c3bc2ff7918b28121e8c  shard-a-out.js
3e474e02eb00919a44fcc36a244c2c36d87c67314480624313d911aa2e93bf59  shard-aux-out.js
48fea77935aa30dc7342c1ab17b2f620e30cf480dffdc891c6260d7df72bceaf  shard-e-out.js
885b47dfbaba212b806e8ab3ce70b307d7575d0ef43eed4ace240048efe2bc3e  shard-m-out.js
6e43dec753bb135ef06acc97f901a3a53ac6a93fb5434d8b79243d12f918a38b  shard-n1-out.js
45941f822ff09ac8754838fd4a04d80aee03a1c73357de134171f6dfd46d3721  shard-n2-out.js
4017b596778a6041cca385ef6baa68932929057865d847db8a15a895ab85165f  shard-u-out.js
c94b69a37c258e99146741013e87506052383c4db81674a8f18e753567263273  stitched-full.js
```
- Embedded `o8cmp/s4-oto/v2-jsc/SHA256SUMS.txt`:
```
58bbaa2a5be4f09dca33eaee231c476f525148d6f78486256516353977560755  shard-a-out.js
f38d5f2fa07c47a629d50ae8406cc9ea7a1525f54f6a5ac684be4233d130026e  shard-aux-out.js
9897aabf42c22b08be199bfaea325a9072e647928dc811fe6502f50e6ead9e36  shard-e-out.js
b28615808268749f874b82b6951f700242e862149992dd0ea194ad2ec2b26680  shard-m-out.js
45b2bfbdb63e335e39703abf40dcc5a7380ad46d158b5c57c067f69dd1f1c904  shard-n1-out.js
6aaebcd3a705d13404c20351d8e2cad77ae5e98633b8a6f1c0cd934891b05ace  shard-n2-out.js
ef105b2ded47049e000708207b0339d1e34f92738c496091ff5575d8dabf90b8  shard-u-out.js
5d69cb67763ea9cd04f3a0ad2e2a10e4b725f2c44d6bc7250be05dd6b6dcfa49  stitched-full.js
```
- Embedded `o8cmp/s4-oto/v4-closure/SHA256SUMS.txt`:
```
c51507bfb53adf01e0a55888d2d42bfbd9ec3efa0d1fec110b5f9ca04eed4e10  shard-a-out.js
af0c43bb9a8e64a00b0696841acc7d942440393553654653a05bb77dfee25050  shard-aux-out.js
a84270c04a510ff9781898c324b3a51c1b4461f7992a0c5762ad4481a454d308  shard-e-out.js
916654715567353e5f48351088760881e5c79de66ea48ae8904679051e993be3  shard-m-out.js
24d3e8c2c0b53d2448042eb2dcbe0cb5db23050e395cc5bb4807ace8dee7c222  shard-n1-out.js
21ff8e077b6707ac20e40fe92eb42c0bf79ad752cd1323fe5bb576fbe75612f1  shard-n2-out.js
85372a8ef08ad073852244b03154b18807941a44e5672935df5d7119b8e78c78  shard-u-out.js
6a14806aabecec7a5949a436b3b267ea2d06db2a761ca7e89692acb40430e79e  stitched-full.js
```
- Embedded `o8cmp/s4-oto/v5-terser/SHA256SUMS.txt`:
```
b0bf33e804a5037aa9e64074bfdeca8217cd966daaba5663d39be563eb686bd2  shard-a-out.js
a2ac5d5e62dd7d031fc9162c4e591e428137a13ac3371371f139b3163c822665  shard-aux-out.js
d1971648f0b2616bff9278a7413a5631d50db4aba483a2003f1ed258fe5ca6d7  shard-e-out.js
46290a743368c8d9c3aa2c7c9ecfe834050b92ef3c15c260abd07e1023ec1eba  shard-m-out.js
89dddf0746f813b329c36cb6d29cf5f3d67795ef72def66deff563b099e85449  shard-n1-out.js
ccb7712b76e8e4355e74f03018d71a8aac42967e87f6888c084c03fa1df44839  shard-n2-out.js
66a4bb4df6bcc3448e88f6686656b72535a1c5d5e8a639e882a347655627e547  shard-u-out.js
1c82131d37dceb60841ef814e60e53303fc67d64ba5708dfa2272e0a745b5df7  stitched-full.js
```
- Embedded `o8cmp/s4-oto/v6-esbuild/SHA256SUMS.txt`:
```
45bc77f21d4ebbff0d79143acd326f5b1ae42ee67f19c0a4bd077d7b4ef0bba7  shard-a-out.js
a8da3adb9c466f160514cd95993a809a5e28a8d91e3bf1aca027411c4f4d14cb  shard-aux-out.js
3b01f4a92f24d3011016f72d93f659a1c98444393f467289563129cf5f26b82a  shard-e-out.js
de668cc4f72cfe441a1e7d0a9b25d917df249ed1e1bba2930d5d601b3e9c8319  shard-m-out.js
eb35afe88b3d947c939fa50ffe313dc9e8f7a60367dc92a50bf86a4bcbb99754  shard-n1-out.js
8a9eb2f0c14db22f951b89fe2185867d98734511ed72313fff7b8a73837e6181  shard-n2-out.js
0b0f29932f8dd9b1bb73aefb3ae7a8ef2ff539658576b65acbd40784b525aa2e  shard-u-out.js
413713d3ab61ce32c269687d2fa3184cf7c2362a4e0b9629158982c41d15e5f7  stitched-full.js
```
- Embedded `o8cmp/s4-oto/v7-swc/SHA256SUMS.txt`:
```
d25ac764a5212e820fb64459f8afcb2883526bcdd302cddf3fb6a374b492ddf8  shard-a-out.js
ed68ac760a88ecf4521542422a0cfe017dd2ca46dc607f2f352b982493125195  shard-aux-out.js
c57f56ee5aa464f4a6f209373c509b741117f6b37bfa2084a5acfcf9ef450055  shard-e-out.js
4cdd3e8c112d862186149cf1c6aca852896966be160c6f1e0b94eb79b4426c27  shard-m-out.js
af45261455930812c5af13f157bde6ad367b4403d933626128eaafad77e31713  shard-n1-out.js
1338b7beb77b1d082b74988a6596e95a8efacc9d28e93e2f8144cc7fe07a5ab8  shard-n2-out.js
ddd7cf6b79ed5bc87f417ea5d65fe974bd58af4705a445e63787dd5cdaa03458  shard-u-out.js
fafbd41d6d15f559974280b5b0baa16e700bafe53748828808609e313cfe7442  stitched-full.js
```
- Embedded `o8cmp/s4-oto/v8-uglify/SHA256SUMS.txt`:
```
0c3d68467461183641e503af9439e020811aaa949a9f7240f6eb4765131646ee  shard-a-out.js
1a4035c89bd412458ca53acf1847f4871ca17a4dcf9300c7ac3e72f697509879  shard-aux-out.js
a1998adce9b6ebe835c3811ff1dbc059081283040c37a4cd9361340ad515d381  shard-e-out.js
4b0c2263e0a48ee05c1f9bfe60268b6c463572349e65af3699a8949acc184f53  shard-m-out.js
e7e7f99237b4142d825e2573cd54ce3e6f605008b773b6dbe7dec99f7134823a  shard-n1-out.js
2b5229c2ffeb44063698e842936eb9592800c242f3250fb3f6352a80bd87b2a6  shard-n2-out.js
4f1f5e3ccc04d1f47db7503de737d8fbb6439ca47c6b9c58f4abcb72f2937339  shard-u-out.js
3c131929acee575431642f32b18f90febccfd670d01dc93833c653e074eee8f5  stitched-full.js
```
- Embedded `o8cmp/s4-final-package/SHA256SUMS.txt`:
```
a6bd97c3fbe7fa1758cbf816d41facd389c194a5b594e2c6a31001182c608bc7  O8.5-S4-compressed-gzip.js
3dc1ac2e83ea94086ba628bf18024af54d4fdbd2b56b2348a8e7c8f3b845e8ad  O8.5-S4-compressed-deflateraw.js
8719aca8abf92e4cc5ffdebee2066e5a461558961e3694c6570194b876e70cdb  O8.5-S4-final-bundle.js
```
- Embedded `o8cmp/s4-mixed-precheck/SHA256SUMS.txt`:
```
8bc342110eb4dcd5bba6fef0ec2201f4c52071e6e86ad7e39af2c5eda4f73fc8  O8.5-S4-mixed-uOTO.js
b5ff6bbbb1fc6eca5c08d41d269fb947e16429819fdfc1acd32f20f7bcf08725  O8.5-S4-mixed-uOTO-r2.js
```
- Embedded `o8cmp/release/O8.5-Shard-2/SHA256SUMS.txt`:
```
ff5937392707fbc2662bb81bc359168e17300d0513434c77fe6adf4d04250e6d  O8.5-Shard-2.js
3c8cbacdbda9be561b6773ab64047e328ec5e1123cdbaebfa39ea0abba4e41bf  shards/shard-a.js
bba4b1287347bf458644c4c9adff80952db5864c8592f9492f8ff0b0f07d454a  shards/shard-aux.js
17409fbb0a9e04742e14222d3160f4dc4a66cd94944a3c364fb42d9a3a874172  shards/shard-e.js
45ea3ad08ff033f5b7b261a3fd509f3f8abfb28d7fe9678b5f2ae39ebd2c53bb  shards/shard-m.js
b7ad77e6bc7e43affdd00041cf465083cd1eecee90dddf7f1f582a43a57f778c  shards/shard-n1.js
382457cdde37a36cc4dd3c6e38491d974078230b900127ffd1dd7eb8abed90b0  shards/shard-n2.js
356a0831106639c25212477f6a0d69041e9b5cab1485b48f5ae30d2f7cacc989  stitch-o85.py
2e0f3a94702973de0aee7dc1fafc281d8a0b7bce3d5bf96b2bf929bd8701f49b  README.txt
```
- Embedded `o8cmp/release/O8.5-Shard-3/SHA256SUMS.txt`:
```
76da265ca051b1e8e7a999d4fd8263bcc073e87a6dcd4f3292bba249ca03922c  O8.5-Shard-3.js
65884aa707bee5a58e845371c59714b4bfd6f3103ed8a7fe4e6729d85dbdda6f  O8.5-Shard-3-obf-reference.js
7c9679bb48840583074a14b4d41c907e8bc81ecc043c1ca654af885fc031be52  shards/shard-a.js
7d0eda0fa2faefc493d29a452104fcc06a2c9510f901cd3a7522838218b64f9b  shards/shard-aux.js
4fb3228cff25d2a5e7492b5152a7ab59f89c0686449f6c9da33f2cf65e356f0d  shards/shard-e.js
3c98eb9e1ea470612529dfa0cc88d3d5b5be1d0e4b04aea615fba03de4394077  shards/shard-m.js
a1befbe607a7e625b6fe26e702047f795aceec9badd9a982353cbe70cde1fb32  shards/shard-n1.js
a0f56667a6d3897484e1d47f6c8ebc973ceabe91b9bce9def6e0e9890955a9a9  shards/shard-n2.js
356a0831106639c25212477f6a0d69041e9b5cab1485b48f5ae30d2f7cacc989  stitch-o85.py
0792e4adb334db3dbd6283ba1090ddbeb4dee27b5fa3f294a47231711cd6d548  obf-all.js
292071823b75e3e0b8db8f681942636d45dafec63ca2583a8a66a4fb94e67111  obf-smoke.js
29ccdd61420d0a8d73112a1d34adb47bf8c1c4c002664a955613a83557c5dd12  identifiers-dictionary.txt
4651916de34f6812cd47fa6b3fea836d8d34a4943d5c28ff58fe198418b37a5c  OBFUSCATION_SETTINGS.md
dd4f164d3762a29388dabcd62cb7ff57a7d4ce3ecef81916027f1c308d858944  README.txt
```
- Embedded `o8cmp/seamless/SHA256SUMS.txt`:
```
76da265ca051b1e8e7a999d4fd8263bcc073e87a6dcd4f3292bba249ca03922c  final.js
2f55b81512dc9caea670a3abe71b1caae84b707fe917b3e6a83f3a1674694dd0  O8.5-Seamless-jso.js
07e05ca1ba3a09a11ed5b9834c57a59c52fdca0038623b14e92e4dbc15fec9df  O8.5-Seamless-jsc.js
```

## Era material `o8.5-archived.tar.gz`

- Was: `Archives/o8.5-archived.tar.gz` — 4,540,516 B, sha256 `bac8d2040f16dc0fbb4be4db701d95efc9eca823fd2e5abfd457a2b0fb1177cc`
- Prose context merged losslessly into `Docs/O8.5-ERA.md` at reorg; tarball held only pre-reorg paths.
- Entries (177):
```
o8cmp/archived-o8.5
o8cmp/archived-o8.5/builds
o8cmp/archived-o8.5/builds/O8.5-Shard-1-stitched.js
o8cmp/archived-o8.5/builds/O8.5-Shard-1.js
o8cmp/archived-o8.5/builds/O8.5-Shard-2.js
o8cmp/archived-o8.5/builds/O8.5-Shard-3.js
o8cmp/archived-o8.5/builds/O8.5-current-obf-edit.js
o8cmp/archived-o8.5/docs
o8cmp/archived-o8.5/docs/O8.5-S4_PLAN.md
o8cmp/archived-o8.5/docs/O8.5-Shard-1_RECORD.md
o8cmp/archived-o8.5/docs/O8.5-Shard-2_RECORD.md
o8cmp/archived-o8.5/docs/O8.5-Shard-3_RECORD.md
o8cmp/archived-o8.5/docs/O8.5_HARDENING_TRIAGE.md
o8cmp/archived-o8.5/docs/O8.5_VM_OBFUSCATION_FEASIBILITY.md
o8cmp/archived-o8.5/docs/S4_NONOTO_CHECKLIST.md
o8cmp/archived-o8.5/docs/S4_NONOTO_REGISTER.md
o8cmp/archived-o8.5/docs/S5_ARCHITECTURE_AND_PIPELINE_GUIDE.md
o8cmp/archived-o8.5/release
o8cmp/archived-o8.5/release/O8.5-Shard-2
o8cmp/archived-o8.5/release/O8.5-Shard-2/O8.5-Shard-2.js
o8cmp/archived-o8.5/release/O8.5-Shard-2/README.txt
o8cmp/archived-o8.5/release/O8.5-Shard-2/SHA256SUMS.txt
o8cmp/archived-o8.5/release/O8.5-Shard-2/shards
o8cmp/archived-o8.5/release/O8.5-Shard-2/shards/shard-a.js
o8cmp/archived-o8.5/release/O8.5-Shard-2/shards/shard-aux.js
o8cmp/archived-o8.5/release/O8.5-Shard-2/shards/shard-e.js
o8cmp/archived-o8.5/release/O8.5-Shard-2/shards/shard-m.js
o8cmp/archived-o8.5/release/O8.5-Shard-2/shards/shard-n1.js
o8cmp/archived-o8.5/release/O8.5-Shard-2/shards/shard-n2.js
o8cmp/archived-o8.5/release/O8.5-Shard-2/stitch-o85.py
o8cmp/archived-o8.5/release/O8.5-Shard-3
o8cmp/archived-o8.5/release/O8.5-Shard-3/O8.5-Shard-3-obf-reference.js
o8cmp/archived-o8.5/release/O8.5-Shard-3/obf
o8cmp/archived-o8.5/release/O8.5-Shard-3/obf/shard-a-out.js
o8cmp/archived-o8.5/release/O8.5-Shard-3/obf/shard-aux-out.js
o8cmp/archived-o8.5/release/O8.5-Shard-3/obf/shard-e-out.js
o8cmp/archived-o8.5/release/O8.5-Shard-3/obf/shard-m-out.js
o8cmp/archived-o8.5/release/O8.5-Shard-3/obf/shard-n1-out.js
o8cmp/archived-o8.5/release/O8.5-Shard-3/obf/shard-n2-out.js
o8cmp/archived-o8.5/release/O8.5-Shard-3/O8.5-Shard-3.js
o8cmp/archived-o8.5/release/O8.5-Shard-3/OBFUSCATION_SETTINGS.md
o8cmp/archived-o8.5/release/O8.5-Shard-3/README.txt
o8cmp/archived-o8.5/release/O8.5-Shard-3/SHA256SUMS.txt
o8cmp/archived-o8.5/release/O8.5-Shard-3/identifiers-dictionary-v2.txt
o8cmp/archived-o8.5/release/O8.5-Shard-3/identifiers-dictionary.txt
o8cmp/archived-o8.5/release/O8.5-Shard-3/obf-all.js
o8cmp/archived-o8.5/release/O8.5-Shard-3/obf-smoke.js
o8cmp/archived-o8.5/release/O8.5-Shard-3/shards
o8cmp/archived-o8.5/release/O8.5-Shard-3/shards/shard-a.js
o8cmp/archived-o8.5/release/O8.5-Shard-3/shards/shard-aux.js
o8cmp/archived-o8.5/release/O8.5-Shard-3/shards/shard-e.js
o8cmp/archived-o8.5/release/O8.5-Shard-3/shards/shard-m.js
o8cmp/archived-o8.5/release/O8.5-Shard-3/shards/shard-n1.js
o8cmp/archived-o8.5/release/O8.5-Shard-3/shards/shard-n2.js
o8cmp/archived-o8.5/release/O8.5-Shard-3/stitch-o85.py
o8cmp/archived-o8.5/s4-final-package
o8cmp/archived-o8.5/s4-final-package/O8.5-S4-compressed-deflateraw.js
o8cmp/archived-o8.5/s4-final-package/O8.5-S4-compressed-gzip.js
o8cmp/archived-o8.5/s4-final-package/O8.5-S4-final-bundle.js
o8cmp/archived-o8.5/s4-final-package/README.md
o8cmp/archived-o8.5/s4-final-package/SHA256SUMS.txt
o8cmp/archived-o8.5/s4-final-package/selected-shards
o8cmp/archived-o8.5/s4-final-package/selected-shards/shard-a-v1.js
o8cmp/archived-o8.5/s4-final-package/selected-shards/shard-aux-v5.js
o8cmp/archived-o8.5/s4-final-package/selected-shards/shard-e-v1.js
o8cmp/archived-o8.5/s4-final-package/selected-shards/shard-m-v2.js
o8cmp/archived-o8.5/s4-final-package/selected-shards/shard-n1-v6.js
o8cmp/archived-o8.5/s4-final-package/selected-shards/shard-n2-v7.js
o8cmp/archived-o8.5/s4-final-package/selected-shards/shard-u-v4.js
o8cmp/archived-o8.5/s4-oto
o8cmp/archived-o8.5/s4-oto/README.txt
o8cmp/archived-o8.5/s4-oto/scripts
o8cmp/archived-o8.5/s4-oto/scripts/SHA256SUMS.txt
o8cmp/archived-o8.5/s4-oto/scripts/obf-minify-family.js
o8cmp/archived-o8.5/s4-oto/scripts/build-s4-final-package.js
o8cmp/archived-o8.5/s4-oto/scripts/obf-u-canon.js
o8cmp/archived-o8.5/s4-oto/scripts/obf-u-per-type.js
o8cmp/archived-o8.5/s4-oto/scripts/obf-v1-s3matrix.js
o8cmp/archived-o8.5/s4-oto/scripts/obf-v2-jsc.js
o8cmp/archived-o8.5/s4-oto/scripts/run-16point-verification.mjs
o8cmp/archived-o8.5/s4-oto/u
o8cmp/archived-o8.5/s4-oto/u/SHA256SUMS.txt
o8cmp/archived-o8.5/s4-oto/u/shard-u-out.js
o8cmp/archived-o8.5/s4-oto/SETTINGS-javascript-obfuscator.md
o8cmp/archived-o8.5/s4-oto/identifiers-dictionary-5k.csv
o8cmp/archived-o8.5/s4-oto/identifiers-dictionary-jso.csv
o8cmp/archived-o8.5/s4-oto/identifiers-dictionary-runner-5k.csv
o8cmp/archived-o8.5/s4-oto/v1-jso-s3matrix
o8cmp/archived-o8.5/s4-oto/v1-jso-s3matrix/SHA256SUMS.txt
o8cmp/archived-o8.5/s4-oto/v1-jso-s3matrix/shard-a-out.js
o8cmp/archived-o8.5/s4-oto/v1-jso-s3matrix/shard-aux-out.js
o8cmp/archived-o8.5/s4-oto/v1-jso-s3matrix/shard-e-out.js
o8cmp/archived-o8.5/s4-oto/v1-jso-s3matrix/shard-m-out.js
o8cmp/archived-o8.5/s4-oto/v1-jso-s3matrix/shard-n1-out.js
o8cmp/archived-o8.5/s4-oto/v1-jso-s3matrix/shard-n2-out.js
o8cmp/archived-o8.5/s4-oto/v1-jso-s3matrix/shard-u-out.js
o8cmp/archived-o8.5/s4-oto/v1-jso-s3matrix/stitched-full.js
o8cmp/archived-o8.5/s4-oto/v2-jsc
o8cmp/archived-o8.5/s4-oto/v2-jsc/SHA256SUMS.txt
o8cmp/archived-o8.5/s4-oto/v2-jsc/shard-a-out.js
o8cmp/archived-o8.5/s4-oto/v2-jsc/shard-aux-out.js
o8cmp/archived-o8.5/s4-oto/v2-jsc/shard-e-out.js
o8cmp/archived-o8.5/s4-oto/v2-jsc/shard-m-out.js
o8cmp/archived-o8.5/s4-oto/v2-jsc/shard-n1-out.js
o8cmp/archived-o8.5/s4-oto/v2-jsc/shard-n2-out.js
o8cmp/archived-o8.5/s4-oto/v2-jsc/shard-u-out.js
o8cmp/archived-o8.5/s4-oto/v2-jsc/stitched-full.js
o8cmp/archived-o8.5/s4-oto/v4-closure
o8cmp/archived-o8.5/s4-oto/v4-closure/SHA256SUMS.txt
o8cmp/archived-o8.5/s4-oto/v4-closure/shard-a-out.js
o8cmp/archived-o8.5/s4-oto/v4-closure/shard-aux-out.js
o8cmp/archived-o8.5/s4-oto/v4-closure/shard-e-out.js
o8cmp/archived-o8.5/s4-oto/v4-closure/shard-m-out.js
o8cmp/archived-o8.5/s4-oto/v4-closure/shard-n1-out.js
o8cmp/archived-o8.5/s4-oto/v4-closure/shard-n2-out.js
o8cmp/archived-o8.5/s4-oto/v4-closure/shard-u-out.js
o8cmp/archived-o8.5/s4-oto/v4-closure/stitched-full.js
o8cmp/archived-o8.5/s4-oto/v5-terser
o8cmp/archived-o8.5/s4-oto/v5-terser/SHA256SUMS.txt
o8cmp/archived-o8.5/s4-oto/v5-terser/shard-a-out.js
o8cmp/archived-o8.5/s4-oto/v5-terser/shard-aux-out.js
o8cmp/archived-o8.5/s4-oto/v5-terser/shard-e-out.js
o8cmp/archived-o8.5/s4-oto/v5-terser/shard-m-out.js
o8cmp/archived-o8.5/s4-oto/v5-terser/shard-n1-out.js
o8cmp/archived-o8.5/s4-oto/v5-terser/shard-n2-out.js
o8cmp/archived-o8.5/s4-oto/v5-terser/shard-u-out.js
o8cmp/archived-o8.5/s4-oto/v5-terser/stitched-full.js
o8cmp/archived-o8.5/s4-oto/v6-esbuild
o8cmp/archived-o8.5/s4-oto/v6-esbuild/SHA256SUMS.txt
o8cmp/archived-o8.5/s4-oto/v6-esbuild/shard-a-out.js
o8cmp/archived-o8.5/s4-oto/v6-esbuild/shard-aux-out.js
o8cmp/archived-o8.5/s4-oto/v6-esbuild/shard-e-out.js
o8cmp/archived-o8.5/s4-oto/v6-esbuild/shard-m-out.js
o8cmp/archived-o8.5/s4-oto/v6-esbuild/shard-n1-out.js
o8cmp/archived-o8.5/s4-oto/v6-esbuild/shard-n2-out.js
o8cmp/archived-o8.5/s4-oto/v6-esbuild/shard-u-out.js
o8cmp/archived-o8.5/s4-oto/v6-esbuild/stitched-full.js
o8cmp/archived-o8.5/s4-oto/v7-swc
o8cmp/archived-o8.5/s4-oto/v7-swc/SHA256SUMS.txt
o8cmp/archived-o8.5/s4-oto/v7-swc/shard-a-out.js
o8cmp/archived-o8.5/s4-oto/v7-swc/shard-aux-out.js
o8cmp/archived-o8.5/s4-oto/v7-swc/shard-e-out.js
o8cmp/archived-o8.5/s4-oto/v7-swc/shard-m-out.js
o8cmp/archived-o8.5/s4-oto/v7-swc/shard-n1-out.js
o8cmp/archived-o8.5/s4-oto/v7-swc/shard-n2-out.js
o8cmp/archived-o8.5/s4-oto/v7-swc/shard-u-out.js
o8cmp/archived-o8.5/s4-oto/v7-swc/stitched-full.js
o8cmp/archived-o8.5/s4-oto/v8-uglify
o8cmp/archived-o8.5/s4-oto/v8-uglify/SHA256SUMS.txt
o8cmp/archived-o8.5/s4-oto/v8-uglify/shard-a-out.js
o8cmp/archived-o8.5/s4-oto/v8-uglify/shard-aux-out.js
o8cmp/archived-o8.5/s4-oto/v8-uglify/shard-e-out.js
o8cmp/archived-o8.5/s4-oto/v8-uglify/shard-m-out.js
o8cmp/archived-o8.5/s4-oto/v8-uglify/shard-n1-out.js
o8cmp/archived-o8.5/s4-oto/v8-uglify/shard-n2-out.js
o8cmp/archived-o8.5/s4-oto/v8-uglify/shard-u-out.js
o8cmp/archived-o8.5/s4-oto/v8-uglify/stitched-full.js
o8cmp/archived-o8.5/s4-shards
o8cmp/archived-o8.5/s4-shards/README.txt
o8cmp/archived-o8.5/s4-shards/SHA256SUMS.txt
o8cmp/archived-o8.5/s4-shards/TRANSPORT_SHAPE.md
o8cmp/archived-o8.5/s4-shards/shards
o8cmp/archived-o8.5/s4-shards/shards/shard-a.js
o8cmp/archived-o8.5/s4-shards/shards/shard-aux.js
o8cmp/archived-o8.5/s4-shards/shards/shard-e.js
o8cmp/archived-o8.5/s4-shards/shards/shard-m.js
o8cmp/archived-o8.5/s4-shards/shards/shard-n1.js
o8cmp/archived-o8.5/s4-shards/shards/shard-n2.js
o8cmp/archived-o8.5/s4-shards/shards/shard-u.js
o8cmp/archived-o8.5/s4-shards/stitch-o85.py
o8cmp/archived-o8.5/s4-shards/tools
o8cmp/archived-o8.5/s4-shards/tools/feff-sprinkle.js
o8cmp/archived-o8.5/s4-shards/tools/heap-probe.mjs
o8cmp/archived-o8.5/s4-shards/tools/heap-scan.mjs
o8cmp/archived-o8.5/s4-shards/tools/term-sweep.py
o8cmp/archived-o8.5/s4-shards/tools/typed-pool-o85.mjs
o8cmp/archived-o8.5/s4-shards/tools/zw-suffix.js
```
- Embedded `o8cmp/archived-o8.5/release/O8.5-Shard-2/SHA256SUMS.txt`:
```
ff5937392707fbc2662bb81bc359168e17300d0513434c77fe6adf4d04250e6d  O8.5-Shard-2.js
3c8cbacdbda9be561b6773ab64047e328ec5e1123cdbaebfa39ea0abba4e41bf  shards/shard-a.js
bba4b1287347bf458644c4c9adff80952db5864c8592f9492f8ff0b0f07d454a  shards/shard-aux.js
17409fbb0a9e04742e14222d3160f4dc4a66cd94944a3c364fb42d9a3a874172  shards/shard-e.js
45ea3ad08ff033f5b7b261a3fd509f3f8abfb28d7fe9678b5f2ae39ebd2c53bb  shards/shard-m.js
b7ad77e6bc7e43affdd00041cf465083cd1eecee90dddf7f1f582a43a57f778c  shards/shard-n1.js
382457cdde37a36cc4dd3c6e38491d974078230b900127ffd1dd7eb8abed90b0  shards/shard-n2.js
356a0831106639c25212477f6a0d69041e9b5cab1485b48f5ae30d2f7cacc989  stitch-o85.py
2e0f3a94702973de0aee7dc1fafc281d8a0b7bce3d5bf96b2bf929bd8701f49b  README.txt
```
- Embedded `o8cmp/archived-o8.5/release/O8.5-Shard-3/SHA256SUMS.txt`:
```
76da265ca051b1e8e7a999d4fd8263bcc073e87a6dcd4f3292bba249ca03922c  O8.5-Shard-3.js
65884aa707bee5a58e845371c59714b4bfd6f3103ed8a7fe4e6729d85dbdda6f  O8.5-Shard-3-obf-reference.js
7c9679bb48840583074a14b4d41c907e8bc81ecc043c1ca654af885fc031be52  shards/shard-a.js
7d0eda0fa2faefc493d29a452104fcc06a2c9510f901cd3a7522838218b64f9b  shards/shard-aux.js
4fb3228cff25d2a5e7492b5152a7ab59f89c0686449f6c9da33f2cf65e356f0d  shards/shard-e.js
3c98eb9e1ea470612529dfa0cc88d3d5b5be1d0e4b04aea615fba03de4394077  shards/shard-m.js
a1befbe607a7e625b6fe26e702047f795aceec9badd9a982353cbe70cde1fb32  shards/shard-n1.js
a0f56667a6d3897484e1d47f6c8ebc973ceabe91b9bce9def6e0e9890955a9a9  shards/shard-n2.js
356a0831106639c25212477f6a0d69041e9b5cab1485b48f5ae30d2f7cacc989  stitch-o85.py
0792e4adb334db3dbd6283ba1090ddbeb4dee27b5fa3f294a47231711cd6d548  obf-all.js
292071823b75e3e0b8db8f681942636d45dafec63ca2583a8a66a4fb94e67111  obf-smoke.js
29ccdd61420d0a8d73112a1d34adb47bf8c1c4c002664a955613a83557c5dd12  identifiers-dictionary.txt
4651916de34f6812cd47fa6b3fea836d8d34a4943d5c28ff58fe198418b37a5c  OBFUSCATION_SETTINGS.md
dd4f164d3762a29388dabcd62cb7ff57a7d4ce3ecef81916027f1c308d858944  README.txt
```
- Embedded `o8cmp/archived-o8.5/s4-final-package/SHA256SUMS.txt`:
```
a6bd97c3fbe7fa1758cbf816d41facd389c194a5b594e2c6a31001182c608bc7  O8.5-S4-compressed-gzip.js
3dc1ac2e83ea94086ba628bf18024af54d4fdbd2b56b2348a8e7c8f3b845e8ad  O8.5-S4-compressed-deflateraw.js
8719aca8abf92e4cc5ffdebee2066e5a461558961e3694c6570194b876e70cdb  O8.5-S4-final-bundle.js
```
- Embedded `o8cmp/archived-o8.5/s4-oto/scripts/SHA256SUMS.txt`:
```
673147d883394b89066b963fad331eca1510b40b3d7b45b7807bb95719c9e02a  obf-minify-family.js
c6c1eeaf2364dec78c8dbcce72eea86599ef7b2b073ac00679c4eb33b484fb67  obf-u-canon.js
825d35ee0fee15d2bcff9044b732e119dc3f7fc61a2f10c36dc0ed98ec6d26d7  obf-u-per-type.js
561237ff012e44c625a93662797e554191b842917533c7a50593ac13510896c2  obf-v1-s3matrix.js
663658f90c57df21b267ab667af96df17d617146219ff500c078f87bbf6ac015  obf-v2-jsc.js
```
- Embedded `o8cmp/archived-o8.5/s4-oto/u/SHA256SUMS.txt`:
```
4017b596778a6041cca385ef6baa68932929057865d847db8a15a895ab85165f  shard-u-out.js
```
- Embedded `o8cmp/archived-o8.5/s4-oto/v1-jso-s3matrix/SHA256SUMS.txt`:
```
7fd2b2a7d35777fa9c204a727f13d1beb3ad6a5ed6c5c3bc2ff7918b28121e8c  shard-a-out.js
3e474e02eb00919a44fcc36a244c2c36d87c67314480624313d911aa2e93bf59  shard-aux-out.js
48fea77935aa30dc7342c1ab17b2f620e30cf480dffdc891c6260d7df72bceaf  shard-e-out.js
885b47dfbaba212b806e8ab3ce70b307d7575d0ef43eed4ace240048efe2bc3e  shard-m-out.js
6e43dec753bb135ef06acc97f901a3a53ac6a93fb5434d8b79243d12f918a38b  shard-n1-out.js
45941f822ff09ac8754838fd4a04d80aee03a1c73357de134171f6dfd46d3721  shard-n2-out.js
4017b596778a6041cca385ef6baa68932929057865d847db8a15a895ab85165f  shard-u-out.js
c94b69a37c258e99146741013e87506052383c4db81674a8f18e753567263273  stitched-full.js
```
- Embedded `o8cmp/archived-o8.5/s4-oto/v2-jsc/SHA256SUMS.txt`:
```
58bbaa2a5be4f09dca33eaee231c476f525148d6f78486256516353977560755  shard-a-out.js
f38d5f2fa07c47a629d50ae8406cc9ea7a1525f54f6a5ac684be4233d130026e  shard-aux-out.js
9897aabf42c22b08be199bfaea325a9072e647928dc811fe6502f50e6ead9e36  shard-e-out.js
b28615808268749f874b82b6951f700242e862149992dd0ea194ad2ec2b26680  shard-m-out.js
45b2bfbdb63e335e39703abf40dcc5a7380ad46d158b5c57c067f69dd1f1c904  shard-n1-out.js
6aaebcd3a705d13404c20351d8e2cad77ae5e98633b8a6f1c0cd934891b05ace  shard-n2-out.js
ef105b2ded47049e000708207b0339d1e34f92738c496091ff5575d8dabf90b8  shard-u-out.js
5d69cb67763ea9cd04f3a0ad2e2a10e4b725f2c44d6bc7250be05dd6b6dcfa49  stitched-full.js
```
- Embedded `o8cmp/archived-o8.5/s4-oto/v4-closure/SHA256SUMS.txt`:
```
c51507bfb53adf01e0a55888d2d42bfbd9ec3efa0d1fec110b5f9ca04eed4e10  shard-a-out.js
af0c43bb9a8e64a00b0696841acc7d942440393553654653a05bb77dfee25050  shard-aux-out.js
a84270c04a510ff9781898c324b3a51c1b4461f7992a0c5762ad4481a454d308  shard-e-out.js
916654715567353e5f48351088760881e5c79de66ea48ae8904679051e993be3  shard-m-out.js
24d3e8c2c0b53d2448042eb2dcbe0cb5db23050e395cc5bb4807ace8dee7c222  shard-n1-out.js
21ff8e077b6707ac20e40fe92eb42c0bf79ad752cd1323fe5bb576fbe75612f1  shard-n2-out.js
85372a8ef08ad073852244b03154b18807941a44e5672935df5d7119b8e78c78  shard-u-out.js
6a14806aabecec7a5949a436b3b267ea2d06db2a761ca7e89692acb40430e79e  stitched-full.js
```
- Embedded `o8cmp/archived-o8.5/s4-oto/v5-terser/SHA256SUMS.txt`:
```
b0bf33e804a5037aa9e64074bfdeca8217cd966daaba5663d39be563eb686bd2  shard-a-out.js
a2ac5d5e62dd7d031fc9162c4e591e428137a13ac3371371f139b3163c822665  shard-aux-out.js
d1971648f0b2616bff9278a7413a5631d50db4aba483a2003f1ed258fe5ca6d7  shard-e-out.js
46290a743368c8d9c3aa2c7c9ecfe834050b92ef3c15c260abd07e1023ec1eba  shard-m-out.js
89dddf0746f813b329c36cb6d29cf5f3d67795ef72def66deff563b099e85449  shard-n1-out.js
ccb7712b76e8e4355e74f03018d71a8aac42967e87f6888c084c03fa1df44839  shard-n2-out.js
66a4bb4df6bcc3448e88f6686656b72535a1c5d5e8a639e882a347655627e547  shard-u-out.js
1c82131d37dceb60841ef814e60e53303fc67d64ba5708dfa2272e0a745b5df7  stitched-full.js
```
- Embedded `o8cmp/archived-o8.5/s4-oto/v6-esbuild/SHA256SUMS.txt`:
```
45bc77f21d4ebbff0d79143acd326f5b1ae42ee67f19c0a4bd077d7b4ef0bba7  shard-a-out.js
a8da3adb9c466f160514cd95993a809a5e28a8d91e3bf1aca027411c4f4d14cb  shard-aux-out.js
3b01f4a92f24d3011016f72d93f659a1c98444393f467289563129cf5f26b82a  shard-e-out.js
de668cc4f72cfe441a1e7d0a9b25d917df249ed1e1bba2930d5d601b3e9c8319  shard-m-out.js
eb35afe88b3d947c939fa50ffe313dc9e8f7a60367dc92a50bf86a4bcbb99754  shard-n1-out.js
8a9eb2f0c14db22f951b89fe2185867d98734511ed72313fff7b8a73837e6181  shard-n2-out.js
0b0f29932f8dd9b1bb73aefb3ae7a8ef2ff539658576b65acbd40784b525aa2e  shard-u-out.js
413713d3ab61ce32c269687d2fa3184cf7c2362a4e0b9629158982c41d15e5f7  stitched-full.js
```
- Embedded `o8cmp/archived-o8.5/s4-oto/v7-swc/SHA256SUMS.txt`:
```
d25ac764a5212e820fb64459f8afcb2883526bcdd302cddf3fb6a374b492ddf8  shard-a-out.js
ed68ac760a88ecf4521542422a0cfe017dd2ca46dc607f2f352b982493125195  shard-aux-out.js
c57f56ee5aa464f4a6f209373c509b741117f6b37bfa2084a5acfcf9ef450055  shard-e-out.js
4cdd3e8c112d862186149cf1c6aca852896966be160c6f1e0b94eb79b4426c27  shard-m-out.js
af45261455930812c5af13f157bde6ad367b4403d933626128eaafad77e31713  shard-n1-out.js
1338b7beb77b1d082b74988a6596e95a8efacc9d28e93e2f8144cc7fe07a5ab8  shard-n2-out.js
ddd7cf6b79ed5bc87f417ea5d65fe974bd58af4705a445e63787dd5cdaa03458  shard-u-out.js
fafbd41d6d15f559974280b5b0baa16e700bafe53748828808609e313cfe7442  stitched-full.js
```
- Embedded `o8cmp/archived-o8.5/s4-oto/v8-uglify/SHA256SUMS.txt`:
```
0c3d68467461183641e503af9439e020811aaa949a9f7240f6eb4765131646ee  shard-a-out.js
1a4035c89bd412458ca53acf1847f4871ca17a4dcf9300c7ac3e72f697509879  shard-aux-out.js
a1998adce9b6ebe835c3811ff1dbc059081283040c37a4cd9361340ad515d381  shard-e-out.js
4b0c2263e0a48ee05c1f9bfe60268b6c463572349e65af3699a8949acc184f53  shard-m-out.js
e7e7f99237b4142d825e2573cd54ce3e6f605008b773b6dbe7dec99f7134823a  shard-n1-out.js
2b5229c2ffeb44063698e842936eb9592800c242f3250fb3f6352a80bd87b2a6  shard-n2-out.js
4f1f5e3ccc04d1f47db7503de737d8fbb6439ca47c6b9c58f4abcb72f2937339  shard-u-out.js
3c131929acee575431642f32b18f90febccfd670d01dc93833c653e074eee8f5  stitched-full.js
```
- Embedded `o8cmp/archived-o8.5/s4-shards/SHA256SUMS.txt`:
```
a921ad2e43084e93f2639b2cf02cbbefdff04e71a234861e61634fdb99b74999  shards/shard-a.js
714c61b730a6bae24a6c4506bece2cb80042a29d6089982ea3992b827f500ac4  shards/shard-aux.js
c400297354596277a07ab4db881be76db6521ad0e112b1bd6e26296cd8932d06  shards/shard-e.js
de637d21b8031057b79a59e0e47d4586695a48895b6c7c477f759e70fbe7008c  shards/shard-m.js
4ac79fb698babbcb4471c9db5c54722e205ce3a91662088db19e1d320ae74ad2  shards/shard-n1.js
90cc6bcb90b9c467e377ddf0657e58e6bff9ed947f763455e6e6385ea910d40f  shards/shard-n2.js
aa26c07f4f9ecc966fca84b82772140a6bfe70331cbb8167f36034a19170fe8f  shards/shard-u.js
356a0831106639c25212477f6a0d69041e9b5cab1485b48f5ae30d2f7cacc989  stitch-o85.py
e90b7247833acec6502975e7ef09d649e736b066efc0bc5d332fab4c93906b95  tools/feff-sprinkle.js
e083812b354646364a19855c314c80a02a37225d4d711c9c58bbfa6796c6c7eb  tools/zw-suffix.js
31da178b8ca536496bcec481ee41ae3734559d0f3df5024812441ce816209f45  tools/heap-probe.mjs
d8031ff94a8964a0724a26314cc6b56ee0efd08ac54d3e9d79ed89b28b77499c  tools/heap-scan.mjs
2797f7a9a2415e945b8d0b5d1081c83d186f465c3dffd801eb1e88c7d5a7f86e  tools/typed-pool-o85.mjs
1cf29b057f3824d1aa120a9be917170b0f7c44311312a0163d2f0d7484c42a69  tools/term-sweep.py
ff20f5ae862dd99ec1bdaf9611bbd78e301dd326a558e95eb38a08b00e544397  TRANSPORT_SHAPE.md
```

## Era material `o7-era.tar.gz`

- Was: `Archives/o7-era.tar.gz` — 248,855 B, sha256 `880000f176144436d5f7fcec3ad0bdeced50047ac7e6389bfef431cb0c5a1460`
- Prose context merged losslessly into `Docs/O7-ERA.md` at reorg; tarball held only pre-reorg paths.
- Entries (94):
```
repo
repo/CHANGELOG.md
repo/CHAT_REVISION_CONTEXT.md
repo/CHEATSHEET.md
repo/CURRENT_STATE.md
repo/HANDOFF_README.md
repo/HANDOFF_SHA256SUMS.txt
repo/LOOP_AND_VALIDATION.md
repo/N14.js
repo/N15.js
repo/O1.js
repo/O2.js
repo/O3.js
repo/O4.js
repo/O7.39-41_COMPLETE_CHANGE_CHECKLIST.md
repo/O7_CANDIDATE_REVIEW
repo/O7_CANDIDATE_REVIEW/01-proxy-inspection.md
repo/O7_CANDIDATE_REVIEW/README.md
repo/O7_CANDIDATE_REVIEW/02-stream-keys.md
repo/O7_CANDIDATE_REVIEW/03-progress-values.md
repo/O7_CANDIDATE_REVIEW/04-timing-fingerprints.md
repo/O7_CANDIDATE_REVIEW/05-rate-limit-fuzzing.md
repo/O7_CANDIDATE_REVIEW/06-timers-promises.md
repo/O7_CANDIDATE_REVIEW/07-webpack-mutation.md
repo/O7_CANDIDATE_REVIEW/08-xor-key-protection.md
repo/O7_CANDIDATE_REVIEW/09-console-silencing.md
repo/O7_CANDIDATE_REVIEW/10-telemetry-countermeasures.md
repo/O7_CANDIDATE_REVIEW/O7_EXCLUDED_MECHANISMS_COLLATED.md
repo/O8.2_QUEUE_STRESS.md
repo/OBFUSCATION_TECHNIQUES.md
repo/README.md
repo/STATUS.md
repo/compiled-scripts-A-to-O7.js
repo/dev
repo/dev/all_scripts.txt
repo/dev/harness.js
repo/o7-iterations
repo/o7-iterations/O7.1.js
repo/o7-iterations/O7.10.js
repo/o7-iterations/O7.11.js
repo/o7-iterations/O7.12.js
repo/o7-iterations/O7.13.js
repo/o7-iterations/O7.13_recheck.md
repo/o7-iterations/O7.13_to_O7.16_AUDIT.md
repo/o7-iterations/O7.14.js
repo/o7-iterations/O7.15.js
repo/o7-iterations/O7.16.js
repo/o7-iterations/O7.1_AUDIT.md
repo/o7-iterations/O7.2.js
repo/o7-iterations/O7.21_lifecycle_patch.md
repo/o7-iterations/O7.21_review.md
repo/o7-iterations/O7.22_review.md
repo/o7-iterations/O7.23_feature_parity.md
repo/o7-iterations/O7.23_parity_blocker.md
repo/o7-iterations/O7.23_review.md
repo/o7-iterations/O7.24_AUDIT.md
repo/o7-iterations/O7.25_AUDIT.md
repo/o7-iterations/O7.26.js
repo/o7-iterations/O7.26_AUDIT.md
repo/o7-iterations/O7.26_CORRECTED_LIFECYCLE.md
repo/o7-iterations/O7.26_TEMPLATE.js
repo/o7-iterations/O7.26_VALIDATION.md
repo/o7-iterations/O7.26_feature_parity.md
repo/o7-iterations/O7.27.js
repo/o7-iterations/O7.27_to_O7.30_LOOP_AUDIT.md
repo/o7-iterations/O7.28.js
repo/o7-iterations/O7.29.js
repo/o7-iterations/O7.2_to_O7.8_AUDIT.md
repo/o7-iterations/O7.3.js
repo/o7-iterations/O7.30.js
repo/o7-iterations/O7.30_module-capture-investigation.md
repo/o7-iterations/O7.31.js
repo/o7-iterations/O7.32_capture_diagnostics.md
repo/o7-iterations/O7.33_module-capture-findings.md
repo/o7-iterations/O7.4.js
repo/o7-iterations/O7.5.js
repo/o7-iterations/O7.6.js
repo/o7-iterations/O7.7.js
repo/o7-iterations/O7.8.js
repo/o7-iterations/O7.9.js
repo/o7-iterations/O7.9_to_O7.12_AUDIT.md
repo/o7-iterations/O7.CONTEXT_HANDOFF.md
repo/o7-iterations/O7.js
repo/o7-iterations/VERIFICATION_2026-09-06.md
repo/o7-iterations/tests
repo/o7-iterations/tests/harness-default.js
repo/o7-iterations/tests/harness-hidden.js
repo/o7-iterations/tests/harness-long-video.js
repo/o7-iterations/tests/harness-nopocket.js
repo/o7-iterations/tests/harness-real-array.js
repo/o7-iterations/tests/harness-real-hidden.js
repo/o7-iterations/tests/harness-real-long.js
repo/o7-iterations/tests/lifecycle-regression-o721.js
repo/stress-queue.js
```
- Embedded `repo/HANDOFF_SHA256SUMS.txt`:
```
692431b635dd3de7d4f9806a632f817cd5ac53d555fb074a128853aba70978cf  quest-suite-github-handoff/CHANGELOG.md
0e51e0588494bf4f0c46dbe128ff20f1bc66a99197f742de32ac85c062e9026c  quest-suite-github-handoff/CHAT_REVISION_CONTEXT.md
eeb59db46238e7624aaa37782a1b7c9d9c7a79918ef5c9ddc34ef94ad8e0c0bf  quest-suite-github-handoff/CHEATSHEET.md
2c9ad05e1192e5109df9e7da5ca7c227c6abb3cdd10408bdf212b488eef03b6d  quest-suite-github-handoff/CURRENT_STATE.md
8efd0f7bc982a54599c6a1d8507fe1b080d18bba1ffcb8986079545b1405f645  quest-suite-github-handoff/HANDOFF_README.md
ca9dc34d5dc4b36af0cdab1c7de3ee8402c673c8d3be3a8d95ac7e90cbcd6443  quest-suite-github-handoff/LOOP_AND_VALIDATION.md
a03ab16b52d8526b09198eac2f7fb18fb2f39894ed2d5088ede5785fdeadb724  quest-suite-github-handoff/N14.js
bc13db25d69eb2c62046fa74c8e5da97e97733f6f765e791a079aae8f50c5565  quest-suite-github-handoff/N15.js
6ffbd4f65e7baff7d716cd84e9a8a69b3999acea5905d86f57080551f112f63f  quest-suite-github-handoff/O1.js
6077353cae65a20229f74569df3fad3ca6fd79c9bb6208fb2056fbe9435c67ce  quest-suite-github-handoff/O2.js
d26984e73ca9b58c6e55f47690993bb40083217f8350f3c7642cc8493f47c2e6  quest-suite-github-handoff/O3.js
7202167f384f96ec5a1d308dfb1b32c81cbfb9e6b3b9b550c2c0e7ba1a2f9321  quest-suite-github-handoff/O4.js
bf0fc17dbc32b77b795b0a904b65e2c5b95dd131d2d7d470322f355949e44cd7  quest-suite-github-handoff/O7.39-41_COMPLETE_CHANGE_CHECKLIST.md
57a0e09326628059d1f246fb961f27a25448d0725b6e8fe36b632b7f5a9088a0  quest-suite-github-handoff/O7_CANDIDATE_REVIEW/01-proxy-inspection.md
3224de71248b152ded3641fa2f9d581436eb7ddffd298646cfbf69f861ed8260  quest-suite-github-handoff/O7_CANDIDATE_REVIEW/02-stream-keys.md
0f1401ccf0e27751d618b5fefef3bedb2f5994bd47e26da92b6fdfd6ce632c84  quest-suite-github-handoff/O7_CANDIDATE_REVIEW/03-progress-values.md
cbd6c38315e2b2ed4a28786bf38087b2a5c86dd902d69fed8e094f2a259f1e44  quest-suite-github-handoff/O7_CANDIDATE_REVIEW/04-timing-fingerprints.md
f9815fb8c98e8459340e2228b67d951bb2d4be1ae02b63c7f70889040d1e2c01  quest-suite-github-handoff/O7_CANDIDATE_REVIEW/05-rate-limit-fuzzing.md
9304420a457fd2419526cc399c7587652e2fc12109ef3f6bd1bf817a76866737  quest-suite-github-handoff/O7_CANDIDATE_REVIEW/06-timers-promises.md
b7efdabed6e6c7703b4792f8456cad3b26f19fd3d2b9e2dc5ca915fa5b44df06  quest-suite-github-handoff/O7_CANDIDATE_REVIEW/07-webpack-mutation.md
b8c9ad15f5b54a3eec1f7d3db36a6f41e248f96ff9ce4c0cd7bb798bbc9ec52b  quest-suite-github-handoff/O7_CANDIDATE_REVIEW/08-xor-key-protection.md
83ecefdd98dc814aa133118a2f3d1707c2dcdad1b42433fc8f277e7b6cddd2e8  quest-suite-github-handoff/O7_CANDIDATE_REVIEW/09-console-silencing.md
b7aef316c56a4ec3ef2e4c14f514dfe01d63fda3339fe0f6acaeb25fb031a761  quest-suite-github-handoff/O7_CANDIDATE_REVIEW/10-telemetry-countermeasures.md
f9d1c9e9e796ee0ecb573301ebd9b4774894115b9357efd1bbae55580d6a39c3  quest-suite-github-handoff/O7_CANDIDATE_REVIEW/O7_EXCLUDED_MECHANISMS_COLLATED.md
a2f56337aa1084c6519732062c07c7bbad7ea97efd5329e75cf3a2dc52574a48  quest-suite-github-handoff/O7_CANDIDATE_REVIEW/README.md
9894bebeac7f5f59c65dd0bb1893a1fb0e53a313c1b45d9a52e5ac18e161a71d  quest-suite-github-handoff/OBFUSCATION_TECHNIQUES.md
17e58e3d583dfcf0f2f97304236cad0ddeb87bb3f57db032c4999a2e3d07efeb  quest-suite-github-handoff/README.md
433d55910518081a0a391a20c19350d51276e0a44065cb2e422b98ba3fe37829  quest-suite-github-handoff/STATUS.md
7cbc6e1b3af1720d51e63b82044aea59508e021205f5fc09b2f04dcfd8a98c96  quest-suite-github-handoff/compiled-scripts-A-to-O8.js
389bdec74379e2b2810092785ae8733da916551dc74e9ead0fbd3412a8cab47a  quest-suite-github-handoff/dev/all_scripts.txt
f4205ee9bba222aaffc22fa0c3a2710426a6a95e8c96003301d0d096f6b18de0  quest-suite-github-handoff/dev/harness.js
b56809a71774eaac87b42b754f0f912e684b022c5f04529f3020fbba84f976a1  quest-suite-github-handoff/o7-iterations/O7.1.js
3eae9426024e7e65ee6abb6c058386629670c73ee30530acb1d3726dd95a51d9  quest-suite-github-handoff/o7-iterations/O7.10.js
3eae9426024e7e65ee6abb6c058386629670c73ee30530acb1d3726dd95a51d9  quest-suite-github-handoff/o7-iterations/O7.11.js
3eae9426024e7e65ee6abb6c058386629670c73ee30530acb1d3726dd95a51d9  quest-suite-github-handoff/o7-iterations/O7.12.js
63a4f06fdd5e367a8af71710ab076a0fdf7eade86700495479a1bb3f5b8e7d0e  quest-suite-github-handoff/o7-iterations/O7.13.js
9ce7b3e256f55c2415c89667eb8970d1a9157e115f9ae59b7768dcf61f5669b2  quest-suite-github-handoff/o7-iterations/O7.13_recheck.md
f6ea6906c7ee9950ce25c1403283e633de553023c5162b7266546747ed6d5bd2  quest-suite-github-handoff/o7-iterations/O7.13_to_O7.16_AUDIT.md
63a4f06fdd5e367a8af71710ab076a0fdf7eade86700495479a1bb3f5b8e7d0e  quest-suite-github-handoff/o7-iterations/O7.14.js
63a4f06fdd5e367a8af71710ab076a0fdf7eade86700495479a1bb3f5b8e7d0e  quest-suite-github-handoff/o7-iterations/O7.15.js
63a4f06fdd5e367a8af71710ab076a0fdf7eade86700495479a1bb3f5b8e7d0e  quest-suite-github-handoff/o7-iterations/O7.16.js
2141904902fe82c0777ae0e7d9eafdd1616422942ca85e0c99ae6a36808a15c9  quest-suite-github-handoff/o7-iterations/O7.1_AUDIT.md
9031cc7502f11918d012559dd08acd95c320ad6b0936a74c53e8ddbe6923a170  quest-suite-github-handoff/o7-iterations/O7.2.js
17236dc355baa433c60f9b46a51e62d0dfff72a3d6dae03b92d9cd9cd65877ba  quest-suite-github-handoff/o7-iterations/O7.21_lifecycle_patch.md
61248cc2546933867b7242ba4dfe9fd023fbfa3dff55b4c7748632140235a34a  quest-suite-github-handoff/o7-iterations/O7.21_review.md
8514809e071a1c503be7a80f1cb8c194b828cb05e96a8e75e20e67ce8a759e80  quest-suite-github-handoff/o7-iterations/O7.22_review.md
1885fcd50a75e06b6e3816fb5f22d61f35911404d8b24b274a99d7a9370a69df  quest-suite-github-handoff/o7-iterations/O7.23_feature_parity.md
fe59040fb052ec8479b15cfab7b5b42412fa77be7cf20d40d6b2bfc667c751f4  quest-suite-github-handoff/o7-iterations/O7.23_parity_blocker.md
b81f6f0e7ecd420f856f220a3365d9fe54de22c5a9f2150c9f11efd3cbfb5755  quest-suite-github-handoff/o7-iterations/O7.23_review.md
8aae8bf1b87aad5434eb808028c92add19485aa3a20cfa6a62db17a4f88c6d5b  quest-suite-github-handoff/o7-iterations/O7.24_AUDIT.md
c05026ecdb35b21e8dc3b02bbef2d523ae9e7fafab4a9de5209ee65d71eff7e0  quest-suite-github-handoff/o7-iterations/O7.25_AUDIT.md
d4c5de1dfad0de23224ba30118db54796e5d4d45c016059a7b177a4b034e5739  quest-suite-github-handoff/o7-iterations/O7.26.js
6daddca541cad15f7993f011a04a0656fa9f9d9533201dc5382cdd4999744418  quest-suite-github-handoff/o7-iterations/O7.26_AUDIT.md
5008d15a2407ec82ee3a33dc076aea1841d0def24920c0f60dc21630f12907b6  quest-suite-github-handoff/o7-iterations/O7.26_CORRECTED_LIFECYCLE.md
666f42ae5be64abfaf1f44928e7a3ee225a71643314bd663ea4627306c74db3f  quest-suite-github-handoff/o7-iterations/O7.26_TEMPLATE.js
df545c25ccbaa3145570760d99029a9cb450280ce144c55bf84c81f60e79a700  quest-suite-github-handoff/o7-iterations/O7.26_VALIDATION.md
772cf8a292fa0ab8c46526ba69bf520a398462e96f5867586843d4aa73d16521  quest-suite-github-handoff/o7-iterations/O7.26_feature_parity.md
80ca2b819fc05a090fc8cc6e45062492214e1f2cccbac2698dd43f58dcb47f5b  quest-suite-github-handoff/o7-iterations/O7.27.js
a25c55a3bc9b74ff18ad9fe1c21eda09a5445a5840f7f01db2d792f79b432572  quest-suite-github-handoff/o7-iterations/O7.27_to_O7.30_LOOP_AUDIT.md
b43937d3da3341d6916d9f7bf586a1143993d141bcbd41d67151ba59b9873375  quest-suite-github-handoff/o7-iterations/O7.28.js
a6830ffc1d087fd5af2f4d301a44c6ea365d7bcc59fb5c5ca64cbd9d3bc4ec8f  quest-suite-github-handoff/o7-iterations/O7.29.js
0cdf7249454103d7de3e953da5098191a21a2b8b019dc8b74561b3b7ba86d1b2  quest-suite-github-handoff/o7-iterations/O7.2_to_O7.8_AUDIT.md
30858f732171df95c310ecf09131749ef73ccd5c41e0a3f74cf3dd3e1301b45c  quest-suite-github-handoff/o7-iterations/O7.3.js
70bb863ded2ca9d12c6552134ab381474262b190379b4d794d966a727567a6ff  quest-suite-github-handoff/o7-iterations/O7.30.js
4b2b587d9006215149b2b9aac7d5a8acf5651afb7718e72e652be764a56b8583  quest-suite-github-handoff/o7-iterations/O7.30_module-capture-investigation.md
4cf0725024c7c60870606527c2019807cfdd1548078e12aacc0dd045b3c0dd56  quest-suite-github-handoff/o7-iterations/O7.31.js
5295c15c0f0c39e753b6bb28001a441380910731fa5bba11268b9669e9d530de  quest-suite-github-handoff/o7-iterations/O7.32_capture_diagnostics.md
fcf523c38d556fe8513802f9293cb6f08366bae93cdd572c72d1c19c246b0402  quest-suite-github-handoff/o7-iterations/O7.33_module-capture-findings.md
a14d4d9c111f15282b5dac2edbf7a26a11ec9c6cb552901f8911e8825636ea9c  quest-suite-github-handoff/o7-iterations/O7.4.js
43c2cc49ebb8034adebe06d9306c3b610929cfd9d9eb4ff6b8727c405b73be05  quest-suite-github-handoff/o7-iterations/O7.5.js
b70db846adfe10e3bd4a4281bccd3ef91f517e4f7fc298a49c1eac475e5b99bc  quest-suite-github-handoff/o7-iterations/O7.6.js
979d9e152d62579c38ed1bb0d7bd9b0415cba8c34ff0d8a59a1c6bbded242704  quest-suite-github-handoff/o7-iterations/O7.7.js
bac062139d6fb5f4d0774e623c0ca7fb0c64e5d7a8a6f9d6b0526d5be10fd84e  quest-suite-github-handoff/o7-iterations/O7.8.js
13e89b07dca74726c7c166e32a2ade76c3e8d72db7eaaf67b42d4e1e693ade38  quest-suite-github-handoff/o7-iterations/O7.9.js
2488006ba395804d0523fcbcc63db7ac7cee54f524fab30adf237d9bca2a99f6  quest-suite-github-handoff/o7-iterations/O7.9_to_O7.12_AUDIT.md
63077af72aedec846eb5e263b59bddef88fad74705b83c255a02306f984e6d20  quest-suite-github-handoff/o7-iterations/O7.CONTEXT_HANDOFF.md
a525387d849b4a0af6f9742e0cb1553afa77e69624485848d31a98462efe4ea0  quest-suite-github-handoff/o7-iterations/O7.js
f4205ee9bba222aaffc22fa0c3a2710426a6a95e8c96003301d0d096f6b18de0  quest-suite-github-handoff/o7-iterations/tests/harness-default.js
a1c53bb1478235d8113f9765e2feefee924cf660c0c7a370a5ad5ca6a7d7c2de  quest-suite-github-handoff/o7-iterations/tests/harness-hidden.js
ca1ad1b4818763213dbadbf5f86fbd5e114a0d817be9bc98951f0e03128d12c9  quest-suite-github-handoff/o7-iterations/tests/harness-long-video.js
9cb9ee354983738d8852ec65b5d8ab295d52b43bd9621015aeee62ea6064b96f  quest-suite-github-handoff/o7-iterations/tests/harness-real-array.js
5ba5e3be04b78a727eac03cd64f8841a36c0b9fb130db69873f357cb70f7ed24  quest-suite-github-handoff/o7-iterations/tests/harness-real-hidden.js
06d262b2c91325db8a84850be4ca91f570d6676793f92273147ff526cb98f797  quest-suite-github-handoff/o7-iterations/tests/harness-real-long.js
afe88a88cfee0c2518d1c327a541251b9e5a074349ad6319e5e5c398f207d477  quest-suite-github-handoff/o7-iterations/tests/lifecycle-regression-o721.js
```

## Era material `o8.4-era.tar.gz`

- Was: `Archives/o8.4-era.tar.gz` — 107,702 B, sha256 `d5ab8d6d04319620e73139264fc395050ee0c4116b26a7f67a1c36f05083e898`
- Prose context merged losslessly into `Docs/O8.2-O8.4-ERA.md` at reorg; tarball held only pre-reorg paths.
- Entries (21):
```
o8cmp/archived-o8.4
o8cmp/archived-o8.4/builds
o8cmp/archived-o8.4/builds/O8.4.1.js
o8cmp/archived-o8.4/builds/O8.4.2.js
o8cmp/archived-o8.4/builds/O8.4.js
o8cmp/archived-o8.4/builds/O8.4.3.js
o8cmp/archived-o8.4/docs
o8cmp/archived-o8.4/docs/O8.4.1_RECORD.md
o8cmp/archived-o8.4/docs/O8.4.2_RECORD.md
o8cmp/archived-o8.4/docs/O8.4.3_RECORD.md
o8cmp/archived-o8.4/docs/O8.4_DESIGN.md
o8cmp/archived-o8.4/docs/O8.4_FUTURE_WORK.md
o8cmp/archived-o8.4/docs/O8.4_RECORD.md
o8cmp/archived-o8.4/tools
o8cmp/archived-o8.4/tools/base-o842.py
o8cmp/archived-o8.4/tools/base-o843.py
o8cmp/archived-o8.4/tools/lexicon-o842.py
o8cmp/archived-o8.4/tools/lexicon-o843-builder.py
o8cmp/archived-o8.4/tools/lexicon-o843.py
o8cmp/archived-o8.4/tools/lexicon-o843b.py
o8cmp/archived-o8.4/tools/shard-o843.py
```

## Era material `attic.tar.gz`

- Was: `Archives/attic.tar.gz` — 519,208 B, sha256 `d57a377d84e9449379b6fb1c30657b3c57c7faed36faac7c7786e1d63a8987da`
- Prose context merged losslessly into `Docs/O8.5-ERA.md + O8.2-O8.4-ERA.md (attic notes merged at reorg)` at reorg; tarball held only pre-reorg paths.
- Entries (77):
```
o8cmp/attic
o8cmp/attic/O8.2.raw.txt
o8cmp/attic/jso-lite-retired
o8cmp/attic/jso-lite-retired/obf-v3-jso-lite.js
o8cmp/attic/jso-lite-retired/v3-jso-lite
o8cmp/attic/jso-lite-retired/v3-jso-lite/SHA256SUMS.txt
o8cmp/attic/jso-lite-retired/v3-jso-lite/shard-a-out.js
o8cmp/attic/jso-lite-retired/v3-jso-lite/shard-aux-out.js
o8cmp/attic/jso-lite-retired/v3-jso-lite/shard-e-out.js
o8cmp/attic/jso-lite-retired/v3-jso-lite/shard-m-out.js
o8cmp/attic/jso-lite-retired/v3-jso-lite/shard-n1-out.js
o8cmp/attic/jso-lite-retired/v3-jso-lite/shard-n2-out.js
o8cmp/attic/jso-lite-retired/v3-jso-lite/shard-u-out.js
o8cmp/attic/jso-lite-retired/v3-jso-lite/stitched-full.js
o8cmp/attic/live-result.txt
o8cmp/attic/o742-attempts.txt
o8cmp/attic/o742_block1.js
o8cmp/attic/o742_block2.js
o8cmp/attic/o742_block3.js
o8cmp/attic/o742_block4.js
o8cmp/attic/obfkit
o8cmp/attic/obfkit/package-lock.json
o8cmp/attic/obfkit/package.json
o8cmp/attic/package-lock.json
o8cmp/attic/s4-shards-pre-c1-typed-pool
o8cmp/attic/s4-shards-pre-c1-typed-pool/README.txt
o8cmp/attic/s4-shards-pre-c1-typed-pool/SHA256SUMS.txt
o8cmp/attic/s4-shards-pre-c1-typed-pool/shards
o8cmp/attic/s4-shards-pre-c1-typed-pool/shards/shard-a.js
o8cmp/attic/s4-shards-pre-c1-typed-pool/shards/shard-aux.js
o8cmp/attic/s4-shards-pre-c1-typed-pool/shards/shard-e.js
o8cmp/attic/s4-shards-pre-c1-typed-pool/shards/shard-m.js
o8cmp/attic/s4-shards-pre-c1-typed-pool/shards/shard-n1.js
o8cmp/attic/s4-shards-pre-c1-typed-pool/shards/shard-n2.js
o8cmp/attic/s4-shards-pre-c1-typed-pool/shards/shard-u.js
o8cmp/attic/s4-shards-pre-constrlet
o8cmp/attic/s4-shards-pre-constrlet/shard-a.js
o8cmp/attic/s4-shards-pre-constrlet/shard-aux.js
o8cmp/attic/s4-shards-pre-constrlet/shard-e.js
o8cmp/attic/s4-shards-pre-constrlet/shard-m.js
o8cmp/attic/s4-shards-pre-constrlet/shard-n1.js
o8cmp/attic/s4-shards-pre-constrlet/shard-n2.js
o8cmp/attic/s4-shards-pre-constrlet/shard-u.js
o8cmp/attic/s4-shards-pre-term-sweep
o8cmp/attic/s4-shards-pre-term-sweep/shard-a.js
o8cmp/attic/s4-shards-pre-term-sweep/shard-aux.js
o8cmp/attic/s4-shards-pre-term-sweep/shard-e.js
o8cmp/attic/s4-shards-pre-term-sweep/shard-m.js
o8cmp/attic/s4-shards-pre-term-sweep/shard-n1.js
o8cmp/attic/s4-shards-pre-term-sweep/shard-n2.js
o8cmp/attic/s4-shards-pre-term-sweep/shard-u.js
o8cmp/attic/shard-o843-base.js
o8cmp/attic/shard-out
o8cmp/attic/shard-out/shard0.js
o8cmp/attic/shard-out/shard1.js
o8cmp/attic/shard-out/shard2.js
o8cmp/attic/shard-out2-stripped
o8cmp/attic/shard-out2-stripped/shard-a.js
o8cmp/attic/shard-out2-stripped/shard-aux.js
o8cmp/attic/shard-out2-stripped/shard-e.js
o8cmp/attic/shard-out2-stripped/shard-m.js
o8cmp/attic/shard-out2-stripped/shard-n1.js
o8cmp/attic/shard-out2-stripped/shard-n2.js
o8cmp/attic/shard-out2
o8cmp/attic/shard-out2/shard-a.js
o8cmp/attic/shard-out2/shard-aux.js
o8cmp/attic/shard-out2/shard-e.js
o8cmp/attic/shard-out2/shard-m.js
o8cmp/attic/shard-out2/shard-n1.js
o8cmp/attic/shard-out2/shard-n2.js
o8cmp/attic/shard-out3
o8cmp/attic/shard-out3/shard-a.js
o8cmp/attic/shard-out3/shard-aux.js
o8cmp/attic/shard-out3/shard-e.js
o8cmp/attic/shard-out3/shard-m.js
o8cmp/attic/shard-out3/shard-n1.js
o8cmp/attic/shard-out3/shard-n2.js
```
- Embedded `o8cmp/attic/jso-lite-retired/v3-jso-lite/SHA256SUMS.txt`:
```
ae4fd931e4641f6ea95a8979c5016497f0ade1e26f4f4bba79084cb580e8265d  shard-a-out.js
5d183c9ee11cc7d1fa4d7c5e8bffcd2af17cfac4747d82b9a65ba6f44dafe12d  shard-aux-out.js
8e03154e0ccd9a5baeda95dfa7cdc9e1028d5f879128b3c64007236d165133a8  shard-e-out.js
19e352e86bc475ed52628092fe160f737efdc28b46630a3f38d51654030aeb4d  shard-m-out.js
0cd55bbc9ced6b64fe4ea10b5d231832b87d5cf119b51462e60e898d56080189  shard-n1-out.js
11cd9d10eeadfdab269017738feba9f33c671c0df8a2a5ca74297f8596ad800c  shard-n2-out.js
6be39687be245b6432b30925adb6e41bde0ab0b29249c891e377e812e88b5114  shard-u-out.js
9db8374dc81e49107bf251754c6815e76c146dc0821a46da0ec83c7db850441b  stitched-full.js
```
- Embedded `o8cmp/attic/s4-shards-pre-c1-typed-pool/SHA256SUMS.txt`:
```
f1fd49d6444db65456663b15ae8ad19f955f504de51327c48cbbb2bfb590430c  shards/shard-a.js
187a7c0b14d8791d5b18209f3662eff1a3617a967bc96dfa0e1c8410d818eb21  shards/shard-aux.js
298b1616b70602f39860eb139cab1004114b5ef0a7e3b4f9c850196d556fdf6f  shards/shard-e.js
5afe4bded39e72e2dba30db356e6186e147b22ac577f0000537973367075411a  shards/shard-m.js
903fd17ca42d9bb2abeebf7248354dc08ad54bd25e0204eecd9d13b5be700970  shards/shard-n1.js
83ab612e7eaa021b30201e73ff70736182a810bc41fcb240808b597567457063  shards/shard-n2.js
a08674fd2bc79ab147dd438e63f53a78823984ae98dcc394a1c9d4110136c8bc  shards/shard-u.js
356a0831106639c25212477f6a0d69041e9b5cab1485b48f5ae30d2f7cacc989  stitch-o85.py
e90b7247833acec6502975e7ef09d649e736b066efc0bc5d332fab4c93906b95  tools/feff-sprinkle.js
e083812b354646364a19855c314c80a02a37225d4d711c9c58bbfa6796c6c7eb  tools/zw-suffix.js
ff20f5ae862dd99ec1bdaf9611bbd78e301dd326a558e95eb38a08b00e544397  TRANSPORT_SHAPE.md
```

## Loose preview PNGs (`/home/user/*.png`, reproducible, deleted)

- Was: `cover-pristine.png` — 301,532 B, sha256 `cb5dd70a65228a7b28bc9daf3e722661b9b6d8d7cf9b1f06d37500110edbc102` — 618×408 concert photo (Stego-1 pristine look, Stego-2 cover source).
  DUP of `Uploads/stego2-cover-source.png` (`cmp` clean). Reproduce: copy that file.
- Was: `cover-stego.png` — 494,938 B, sha256 `f6a191da7537e58a321b2a2ece0169ef5b6c1745a6a97bdf077d5347a4d709a5` — Stego-1 fried carrier render (photo strip + static).
  Reproduce: `python3 -c "from PIL import Image; Image.open('Active/Stego/output/O8.6-S5-entangled-cover.bmp').convert('RGB').save('cover-stego.png')"`.
- Was: `cover2-preview.png` — 806,976 B, sha256 `824ab43c0f5212d41e2c29aaa258744f8eb864d72481b5ee9409b34a4da07cb0` — Dead iteration (rejected: washed-out, banded).
  Superseded synthetic v2 cover render. No reproduce — see v3 photo cover.
- Was: `cover3-preview.png` — 950,062 B, sha256 `51a570a8d9540d98041db3c598afd41980592637b6a9944f4e290b3bf3d7989d` — Stego-2 v3 clean cover render (800×620 photo).
  Reproduce: `python3 -c "from PIL import Image; Image.open('Uploads/stego2-cover.bmp').save('cover3-preview.png')"`.
- Was: `cover3-simulated.png` — 1,336,957 B, sha256 `27fce70c7454bbc703103b73130571876b05c2cf9d6aca9247b4c2cb96ce9457` — Pre-build 30% scatter prediction (confirmed by real bytes).
  Superseded simulation; the real thing is `stego2-final.png` below.
- Was: `stego2-final.png` — 1,343,208 B, sha256 `02fdb307e43d5d3833c4556f82c24a6270ef193355558dffed67f4c616b460e0` — Actual Stego-2 r1 fried carrier.
  Reproduce: `python3 -c "from PIL import Image; Image.open('Active/Stego/output-stego2/O8.7-Stego-2-cover.bmp').save('stego2-final.png')"`.

Total reclaimed by this trim: ~57.0 MB of snapshot-persisted bytes.

## Stego-3 r1/r2 + Stego-2 r1 freezes (superseded by rolling current 2026-09-13)

Operator rule 2026-09-13: no more -rN freeze dirs (move the iteration).
Live line is now `packages/O8.7-Stego-3/` (rolling) + `packages/O8.7-Stego-2/`
(renamed r2). Deleted dirs below are fully recorded: bytes, per-file shas,
ARCHIVE.txt + BUILD.json verbatim.

### Was: `Archives/packages/O8.7-Stego-3-r1` — 4678382 B, 7 files
SHA256SUMS.txt (verified 6/6 at freeze):
```
15ba8f3bbb165e268887d8f197121d3aeace7ddf102698e61a32af3af031a282  O8.7-Stego-3-cover.bmp
4f2a489a0dca0a01e41fe3325476647f982bf0e911ca28d93549e4ca697523e6  O8.7-Stego-3-runner.js
af62b788eb23462d26f06afddc1233b21e9eef08f9305fc09dc58f108341141d  stego3-real.min.js
3be45a575815c62f2f364dfbfed7d40101aace4b9236ede0b4972029fa3baccc  stego3-decoy.min.js
0e9759fa49646674c0489da2c5341cf9320dd63114b7f685f8b03bc43f9d34f2  ARCHIVE.txt
ef69fcbf2cadfa904a1c68d5a4ad5a5db7088d870f55909f1e1f6187445e983a  BUILD.json
```
ARCHIVE.txt verbatim:
```
O8.7-Stego-3-r1 — PHOTO-GRAIN STEGO FREEZE (scattered 4-bit S6 real + PG3 snapshot-strip garden decoy)
Frozen: 2026-09-12 · Source of truth: live workspace state (Active/Stego/output-stego3/)

WHAT THIS IS
  r1 freezes the first O8.7-Stego-3 generation: photo-grain carrier (4-bit
  scattered nibbles, PSNR-pinned) + documented PG3 snapshot strip carrying the
  Pixel Garden v2 decoy, Pixel Garden Player v3.1.0 narrative loader (encrypted
  legacy-reel extractor, 3-probe venue composite, KDF, carrier-derived salt,
  hash password-slot normalization). Previous line Stego-2 r2 stays frozen
  (Archives/packages/O8.7-Stego-2-r2/). The S6 bundle (quiet-by-default G4
  rebuild: codename labels behind the unlock, Host line + decoy voice stay)
  extracts on the T2 branch; garden plays on T1/rename/probe-fail. Rebuilds
  are byte-identical (deterministic O8.6 cascade incl. frozen v2 pin; verified
  by double-build cmp 5/5).

CONTENTS
  O8.7-Stego-3-cover.bmp    1488054 B   photo cover (800x620x24) + grain + snapshot strip
  O8.7-Stego-3-runner.js    1995603 B   Line 1 + Player loader + b64 BMP (RUN THIS)
  stego3-real.min.js        1187059 B   S6 bundle minified (UTF-8, reduce_vars:false) — T2 source
  stego3-decoy.min.js       1636 B   Pixel Garden v2.0 minified (UTF-8) — T1 source
  BUILD.json                           provenance: inputs, tools, salts, sizes, tests
  SHA256SUMS.txt                       checksums (relative paths, no self-entry)

PROVENANCE (all verified 2026-09-12)
  - inputs: S6 bundle 8a6ce1ed... (final-package, G4 quiet rebuild), decoy-garden-v2.js,
    photo cover b1590ea3... (800x620x24, pristine concert photo)
  - SALT 0x6251c72a (carrier-derived, no literal); FNV_SHIPPED 0xb16a887e;
    PWHASH_DEBUG 0xe79dbcf6 -> canonical; seed = slowChain32768(SALT^h^7*GOLDEN) = 0xea66676d
  - real: min 1,186,949 chars -> gzip-9 487,467 B scattered over R=1,389,600 (70.16%),
    4-bit nibbles, maxDelta 15, PSNR 32.8dB (pin >= 32.0)
  - decoy: min 1,590 chars -> gzip-9 855 B in PG3 strip layout (3.5% of 98,400 B strip)
  - tier tests 20/20 (T0 silent / T1 garden v2 byte-exact+executes / T2 bundle
    byte-exact incl. debug-name / rename+probe-bit degrade); carrier 12/12;
    25-pass battery 25/25 on the tree
  - runner Line 1: var 会員 = 2; var 名 = "佐藤 結衣"; console.clear(); 
  - runtime brand: [Host 8.7-Stego-3], instance 952bf71b (locked default: Host +
    decoy voice, zero [Google *] labels)

LINEAGE
  Stego-2-r2 -> Stego-3-r1 (new generation: carrier + loader + decoy + quiet bundle).
  Stego-2 r2 notes kept in Archives/packages/O8.7-Stego-2-r2/ARCHIVE.txt.

STATUS AT FREEZE
  Photo-grain carrier complete; 20/20 tiers + byte-identical rebuilds 5/5 +
  25/25 battery. Promoted to live line (Stego-3 r1 live; Stego-2 r2 kept frozen).
```
BUILD.json verbatim:
```json
{
 "build": "O8.7-Stego-3-r1",
 "date": "2026-09-12",
 "suite_version": "8.7-Stego-3",
 "instance_id": "952bf71b",
 "line1_variant": 0,
 "inputs": {
  "s6_bundle": {
   "file": "Active/O8.6/final-package/O8.6-Final-final-bundle.js",
   "sha256": "8a6ce1eda8b3d3e55bc53ea4473740c28cb1f32e1169c280abbf9ac78a370f44"
  },
  "cover": {
   "file": "Uploads/stego2-cover.bmp",
   "sha256": "b1590ea3bdc6c49c3799b477b4539bb0a625552765feae129ac51da7cf96f283"
  },
  "decoy_source": {
   "file": "Active/Stego/decoy-garden-v2.js",
   "sha256": "2ea7857c2f8efe72e992032119cc234dffd26fa9a458b350075367f9ff93894f"
  },
  "loader_source": {
   "file": "Active/Stego/stego3-loader.js",
   "sha256": "f720a3859ab19ae27dada5eacfefbc7bf74a247425caa898a963123e418c1375"
  },
  "codec_source": {
   "file": "Active/Stego/stego3-codec.mjs",
   "sha256": "d467d88bb613451f6a324911fc1133c6dd5e6edcb007b3cf977dc152afbae22b"
  },
  "reel_source": {
   "file": "Active/Stego/stego3-legacyreel-src.js",
   "sha256": "47508de9750ee59f2282fb1d6fe44b02d2f2ec3921e79e485886224caa81d422"
  },
  "cover_photo_source": {
   "file": "Uploads/stego2-cover-source.png",
   "sha256": "cb5dd70a65228a7b28bc9daf3e722661b9b6d8d7cf9b1f06d37500110edbc102"
  }
 },
 "tools": {
  "node": "v20.20.2",
  "engines": "exact-pinned (terser 5.51.2, JSO 4.2.2, jsc 2.1.3 frozen-v2)",
  "zlib": "gzip -9",
  "minify_real": "passes:2,dead_code,reduce_vars:false,mangle:false,utf8",
  "minify_decoy": "passes:2,dead_code,mangle:false,utf8",
  "minify_loader": "passes:2,inline:false,collapse_vars:false,reduce_vars:false,mangle:false,banner"
 },
 "crypto": {
  "salt": "0x6251c72a (carrier-derived, no literal)",
  "fnv_shipped": "0xb16a887e",
  "pwhash_debug": "0xe79dbcf6 (normalizes to canonical)",
  "kdf": "slowChain32768",
  "golden": "0x9E3779B9",
  "canon_bits": 7,
  "seed": "0xea66676d",
  "scatter_range": 1389600,
  "strip_len": 98400
 },
 "payloads": {
  "real": {
   "min_chars": 1186949,
   "gzip_bytes": 487467
  },
  "decoy": {
   "min_chars": 1590,
   "gzip_bytes": 855
  }
 },
 "photo_metrics": {
  "r_util_pct": 70.16,
  "max_delta": 15,
  "psnr_db": 32.8,
  "psnr_pin_gte": 32.0,
  "strip_max_delta": 3
 },
 "outputs": {
  "cover": {
   "file": "O8.7-Stego-3-cover.bmp",
   "bytes": 1488054,
   "sha256": "15ba8f3bbb165e268887d8f197121d3aeace7ddf102698e61a32af3af031a282"
  },
  "runner": {
   "file": "O8.7-Stego-3-runner.js",
   "bytes": 1995603,
   "sha256": "4f2a489a0dca0a01e41fe3325476647f982bf0e911ca28d93549e4ca697523e6"
  }
 },
 "tests": {
  "tiers": "20/20 (19 + debug-name)",
  "line1_variants": "v1+v2 quick 4/4 each",
  "determinism": "double-build byte-identical (5/5 files)",
  "carrier": "12/12",
  "pg3_doc": "pass",
  "battery": "25/25"
 }
}
```

### Was: `Archives/packages/O8.7-Stego-3-r2` — 4686491 B, 7 files
SHA256SUMS.txt (verified 6/6 at freeze):
```
968de2fd418fa4c2748b3183cb382336f726b86720bf78bbc3839e8c05f759be  O8.7-Stego-3-cover.bmp
4daf5391fdf5c513798400503c45115607399ecf42b760f3d6444da0462b57e0  O8.7-Stego-3-runner.js
d23d0814003dc03651eb242352534ce8ad1d314be6ec378b51fec53c80b209b6  stego3-real.min.js
3be45a575815c62f2f364dfbfed7d40101aace4b9236ede0b4972029fa3baccc  stego3-decoy.min.js
bb45b0e899cd5d3b114e9e6535f25bfe19d8426a2e91216cc8b8286493cad440  ARCHIVE.txt
ddcc0830042f0feed080bd4c3da94c9ec776f2188f87cb4483af97932baf44b7  BUILD.json
```
ARCHIVE.txt verbatim:
```
O8.7-Stego-3-r2 — PHOTO-GRAIN STEGO FREEZE (r1 + chore-stall bugfix revision)
Frozen: 2026-09-13 · Source of truth: live workspace state (Active/Stego/output-stego3/)

WHAT THIS IS
  r2 is r1 with the live-Discord single-chore stall fixed: play/stream chores
  are purely event-driven, so when progress events stop before the handler sees
  cur >= goal (game dropped from overlay tracking), the driver hung in that
  await for hours (coarse watchdog: max(10min, remaining x 120s)) — no advance,
  no refill. r2 adds a 60s completion verifier that re-reads the quest store
  directly and settles on completed-flag / progress >= goal / gone-unenrolled
  twice / expired, printing the normal done line for genuine completions. The
  interval self-clears on every settle path and never settles on an unreadable
  store. Loader, carrier, decoy, crypto, and the refill/continue logic are
  byte-identical in behavior; only bundle payload bytes differ (+7.5K chars).
  Worker instance rotated (r1 952bf71b -> r2 d237bb30) so live logs identify
  the revision. Stego-2 r2 stays frozen (r3 backport declined by the operator).

CONTENTS
  O8.7-Stego-3-cover.bmp    1488054 B   photo cover (800x620x24) + grain + snapshot strip
  O8.7-Stego-3-runner.js    1995603 B   Line 1 + Player loader + b64 BMP (RUN THIS)
  stego3-real.min.js        1194561 B   S6 bundle minified (UTF-8, reduce_vars:false) — T2 source
  stego3-decoy.min.js       1636 B   Pixel Garden v2.0 minified (UTF-8) — T1 source
  BUILD.json                           provenance: inputs, tools, salts, sizes, tests
  SHA256SUMS.txt                       checksums (relative paths, no self-entry)

PROVENANCE (all verified 2026-09-13)
  - inputs: S6 bundle ef476c3f... (final-package, r2 fix rebuild),
    decoy-garden-v2.js, photo cover b1590ea3... (800x620x24); all other r1
    inputs byte-identical (loader/codec/reel/decoy/png shas match r1 freeze)
  - SALT 0x6251c72a (carrier-derived, no literal); FNV_SHIPPED 0xb16a887e;
    PWHASH_DEBUG 0xe79dbcf6 -> canonical; seed = slowChain32768(SALT^h^7*GOLDEN) = 0xea66676d
  - real: min 1,194,459 chars -> gzip-9 493,157 B scattered over R=1,389,600 (70.98%),
    4-bit nibbles, maxDelta 15, PSNR 32.7dB (pin >= 32.0)
  - decoy: min 1,590 chars -> gzip-9 855 B in PG3 strip layout (3.5% of 98,400 B strip)
  - tier tests 20/20 (T0 silent / T1 garden v2 byte-exact+executes / T2 bundle
    byte-exact incl. debug-name e2e with the operator credential /
    rename+probe-bit degrade); carrier 12/12; 25-pass battery 25/25 on the tree
  - L2 unlock re-verified on r2 bytes: bridge(secret)=true, bridge(wrong)=false,
    labels unlock 3 -> 7 logs; line-1 variants v1+v2 quick 4/4 each
  - runner Line 1: var 会員 = 2; var 名 = "佐藤 結衣"; console.clear(); 
  - runtime brand: [Host 8.7-Stego-3], instance d237bb30 (locked default: Host +
    decoy voice, zero [Google *] labels)

LINEAGE
  Stego-3-r1 -> Stego-3-r2 (bugfix rev: chore-stall verifier + instance rotation).
  Stego-2 r2 notes kept in Archives/packages/O8.7-Stego-2-r2/ARCHIVE.txt; Stego-3
  r1 notes kept in Archives/packages/O8.7-Stego-3-r1/ARCHIVE.txt.

STATUS AT FREEZE
  Stall fix complete; 20/20 tiers + O8.6 double-build 3/3 + stego double-build
  4/4 + 25/25 battery. Live promotion pending operator word (r1 stays live).
```
BUILD.json verbatim:
```json
{
 "build": "O8.7-Stego-3-r2",
 "date": "2026-09-13",
 "suite_version": "8.7-Stego-3",
 "instance_id": "d237bb30",
 "line1_variant": 0,
 "inputs": {
  "s6_bundle": {
   "file": "Active/O8.6/final-package/O8.6-Final-final-bundle.js",
   "sha256": "ef476c3ff94edd40c98c1856f9a10e96b791c85514e378081840c510598b6101"
  },
  "cover": {
   "file": "Uploads/stego2-cover.bmp",
   "sha256": "b1590ea3bdc6c49c3799b477b4539bb0a625552765feae129ac51da7cf96f283"
  },
  "decoy_source": {
   "file": "Active/Stego/decoy-garden-v2.js",
   "sha256": "2ea7857c2f8efe72e992032119cc234dffd26fa9a458b350075367f9ff93894f"
  },
  "loader_source": {
   "file": "Active/Stego/stego3-loader.js",
   "sha256": "f720a3859ab19ae27dada5eacfefbc7bf74a247425caa898a963123e418c1375"
  },
  "codec_source": {
   "file": "Active/Stego/stego3-codec.mjs",
   "sha256": "d467d88bb613451f6a324911fc1133c6dd5e6edcb007b3cf977dc152afbae22b"
  },
  "reel_source": {
   "file": "Active/Stego/stego3-legacyreel-src.js",
   "sha256": "47508de9750ee59f2282fb1d6fe44b02d2f2ec3921e79e485886224caa81d422"
  },
  "cover_photo_source": {
   "file": "Uploads/stego2-cover-source.png",
   "sha256": "cb5dd70a65228a7b28bc9daf3e722661b9b6d8d7cf9b1f06d37500110edbc102"
  }
 },
 "tools": {
  "node": "v20.20.2",
  "engines": "exact-pinned (terser 5.51.2, JSO 4.2.2, jsc 2.1.3 frozen-v2)",
  "zlib": "gzip -9",
  "minify_real": "passes:2,dead_code,reduce_vars:false,mangle:false,utf8",
  "minify_decoy": "passes:2,dead_code,mangle:false,utf8",
  "minify_loader": "passes:2,inline:false,collapse_vars:false,reduce_vars:false,mangle:false,banner"
 },
 "crypto": {
  "salt": "0x6251c72a (carrier-derived, no literal)",
  "fnv_shipped": "0xb16a887e",
  "pwhash_debug": "0xe79dbcf6 (normalizes to canonical)",
  "kdf": "slowChain32768",
  "golden": "0x9E3779B9",
  "canon_bits": 7,
  "seed": "0xea66676d",
  "scatter_range": 1389600,
  "strip_len": 98400
 },
 "payloads": {
  "real": {
   "min_chars": 1194459,
   "gzip_bytes": 493157
  },
  "decoy": {
   "min_chars": 1590,
   "gzip_bytes": 855
  }
 },
 "photo_metrics": {
  "r_util_pct": 70.98,
  "max_delta": 15,
  "psnr_db": 32.7,
  "psnr_pin_gte": 32.0,
  "strip_max_delta": 3
 },
 "outputs": {
  "cover": {
   "file": "O8.7-Stego-3-cover.bmp",
   "bytes": 1488054,
   "sha256": "968de2fd418fa4c2748b3183cb382336f726b86720bf78bbc3839e8c05f759be"
  },
  "runner": {
   "file": "O8.7-Stego-3-runner.js",
   "bytes": 1995603,
   "sha256": "4daf5391fdf5c513798400503c45115607399ecf42b760f3d6444da0462b57e0"
  }
 },
 "tests": {
  "tiers": "20/20 (19 + debug-name e2e)",
  "line1_variants": "v1+v2 quick 4/4 each",
  "determinism": "O8.6 double-build 3/3 + stego double-build 4/4 byte-identical",
  "carrier": "12/12",
  "pg3_doc": "pass",
  "battery": "25/25",
  "l2_unlock": "bridge(secret)=true, bridge(wrong)=false, labels 3->7"
 }
}
```

### Was: `Archives/packages/O8.7-Stego-2-r1` — 4642969 B, 7 files
SHA256SUMS.txt (verified 6/6 at freeze):
```
e0b9f48fd89576d8419fd4bec1ba830e14c389e3a5cf5dc0a704e5961e079bdb  O8.7-Stego-2-cover.bmp
9e475cb269f5487bb1bae07a98bca04a1097a1bd66550499a851d38e2a94f0fb  O8.7-Stego-2-runner.js
bc8aab943cbd63f1ade92899e9585448fc10ca0a0302a853ee4f05f12bbf3af4  stego2-real.min.js
921d5b9a86d95b4dc7c60839f05795e2ffdafede1b3b9d836f6221de65cb14cf  stego2-decoy.min.js
fab50bc70958fb168f911972706146781ad6d9f61e88fa9b3ae2f4c4f6e1775e  ARCHIVE.txt
17bd6eb842c6e3f68a10673d463265da6478d4449d57f1693f325a124ed58aa9  BUILD.json
```
ARCHIVE.txt verbatim:
```
O8.7-Stego-2-r1 — DUAL-CARRIER STEGO FREEZE (scattered S6 real + Stego-1-layout garden decoy)
Frozen: 2026-09-12 · Source of truth: live workspace state (Active/Stego/output-stego2/)

WHAT THIS IS
  r1 freezes the first O8.7-Stego-2 dual-carrier build: the S6 bundle scattered
  through a photo cover via seeded permutation (T2 branch), plus a contiguous
  Stego-1-layout decoy block holding the Pixel Garden game (T1 branch). The
  hand-written tier-gated loader runs silent/garden/bundle by environment.
  Rebuilds are byte-identical (deterministic; verified by double-build cmp).

CONTENTS
  O8.7-Stego-2-cover.bmp    1488054 B   photo cover (800x620x24) + dual payload
  O8.7-Stego-2-runner.js    1987232 B   Line 1 + tier-gated loader + b64 BMP (RUN THIS)
  stego2-real.min.js        1161316 B   S6 bundle minified (UTF-8, reduce_vars:false) — T2 source
  stego2-decoy.min.js       1489 B   Pixel Garden minified (UTF-8) — T1 source
  BUILD.json                           provenance: inputs, tools, salts, sizes, tests
  SHA256SUMS.txt                       checksums (relative paths, no self-entry)

PROVENANCE (all verified 2026-09-12)
  - inputs: S6 bundle c4f13057... (final-package), decoy-garden.js,
    photo cover b1590ea3... (800x620x24, from pristine concert photo)
  - SALT 0x57E602A1, CHAFF 0xC4AFF1E;
    seed = SALT XOR FNV-1a(default name) = 0xe68c8adf
  - real: min 1,161,200 chars -> gzip-9 472,307 B scattered over R=1,389,696 (33.99%)
  - decoy: min 1,443 chars -> gzip-9 792 B + chaff to 98,304 B band (Stego-1 layout)
  - tier tests 14/14 (T0 silent / T1 garden byte-exact+executes / T2 bundle
    byte-exact); Line-1 variants 1+2 smoke-tested 4/4; Stego-1-extractor compat OK
  - runner Line 1: var 会員 = 2; var 名 = "佐藤 結衣"; console.clear();

LINEAGE
  Stego-1 (O8.6-S5-r4 entangled pair) -> Stego-2-r1 (new dual carrier + hand loader).
  Found while building: S5-identical minify constant-folds the bundle's mode
  switch (ZERO 会員 bytes left in the S5 stego payload - verified by extraction)
  and the ascii_only name anchor never matched (no 佐藤 bytes in the S5 payload
  either); both Line-1 substitutions were dead in Stego-1 pastes. Stego-2 fixes
  both (UTF-8 minify + reduce_vars:false on the real payload, anchor assertions
  in the builder, REAL substitution pinned by T1-rename/T2-kaiin1).

STATUS AT FREEZE
  Tier-gated dual carrier complete; 14/14 tiers + byte-identical rebuilds.
  Promoted to live line at G6 (S6 + Stego-2 live; Stego-1 pair kept in output/).
```
BUILD.json verbatim:
```json
{
 "build": "O8.7-Stego-2-r1",
 "date": "2026-09-12",
 "line1_variant": 0,
 "inputs": {
  "s6_bundle": {
   "file": "Active/O8.6/final-package/O8.6-Final-final-bundle.js",
   "sha256": "c4f13057f021cb5231d1b0a2b37ba25eb29cf76a52dfb2bf1c16ff2fcbe355da"
  },
  "cover": {
   "file": "Uploads/stego2-cover.bmp",
   "sha256": "b1590ea3bdc6c49c3799b477b4539bb0a625552765feae129ac51da7cf96f283"
  },
  "cover_photo_source": {
   "file": "Uploads/stego2-cover-source.png",
   "sha256": "cb5dd70a65228a7b28bc9daf3e722661b9b6d8d7cf9b1f06d37500110edbc102"
  },
  "decoy_source": {
   "file": "Active/Stego/decoy-garden.js",
   "sha256": "bb2f31727b041ee769d3885e3adb48949ad008652400efb6a78ccd31fcaf523c"
  },
  "loader_source": {
   "file": "Active/Stego/stego2-loader.js",
   "sha256": "c837aa7b57d2dcdbd29f7766fd4c225889c188184fbba4b9c8297eed59a7cbda"
  }
 },
 "tools": {
  "node": "v20.20.2",
  "terser": "5.51.2",
  "zlib": "gzip -9",
  "minify_real": "passes:2,dead_code,reduce_vars:false,mangle:false,utf8",
  "minify_decoy": "passes:2,dead_code,mangle:false,utf8"
 },
 "crypto": {
  "salt": "0x57E602A1",
  "chaff_seed": "0xC4AFF1E",
  "seed": "0xe68c8adf",
  "scatter_range": 1389696,
  "decoy_band": 98304
 },
 "payloads": {
  "real": {
   "min_chars": 1161200,
   "gzip_bytes": 472307
  },
  "decoy": {
   "min_chars": 1443,
   "gzip_bytes": 792
  }
 },
 "outputs": {
  "cover": {
   "file": "O8.7-Stego-2-cover.bmp",
   "bytes": 1488054,
   "sha256": "e0b9f48fd89576d8419fd4bec1ba830e14c389e3a5cf5dc0a704e5961e079bdb"
  },
  "runner": {
   "file": "O8.7-Stego-2-runner.js",
   "bytes": 1987232,
   "sha256": "9e475cb269f5487bb1bae07a98bca04a1097a1bd66550499a851d38e2a94f0fb"
  }
 },
 "tests": {
  "tiers": "14/14",
  "line1_variants": "v1+v2 quick 4/4 each",
  "determinism": "double-build byte-identical (4/4 files)",
  "s1_compat": "pass"
 }
}
```

## Rollback tarballs retired 2026-09-13 (rebuild info kept, bytes deleted)

### Was: `Archives/o8.7-Stego-3-r1-live.tar.gz` — 11392529 B, sha256 `612ad8aa801ad45998e4673679eb60ae1251923c742e9f980d985c751b9677b0`, 140 members
```
Active/O8.6
Active/O8.6/final-package
Active/O8.6/final-package/O8.6-Final-compressed-deflateraw.js
Active/O8.6/final-package/O8.6-Final-compressed-gzip.js
Active/O8.6/final-package/O8.6-Final-final-bundle.js
Active/O8.6/final-package/SHA256SUMS.txt
Active/O8.6/final-package/selected-shards
Active/O8.6/final-package/selected-shards/shard-a-v1.js
Active/O8.6/final-package/selected-shards/shard-aux-v5.js
Active/O8.6/final-package/selected-shards/shard-e-v1.js
Active/O8.6/final-package/selected-shards/shard-m-v2.js
Active/O8.6/final-package/selected-shards/shard-n1-v6.js
Active/O8.6/final-package/selected-shards/shard-n2-v7.js
Active/O8.6/final-package/selected-shards/shard-u-v4.js
Active/O8.6/oto
Active/O8.6/oto/identifiers-dictionary-5k.csv
Active/O8.6/oto/identifiers-dictionary-jso.csv
Active/O8.6/oto/identifiers-dictionary-runner-5k.csv
Active/O8.6/oto/scripts
Active/O8.6/oto/scripts/build-s4-final-package.js
Active/O8.6/oto/scripts/obf-minify-family.js
Active/O8.6/oto/scripts/obf-u-canon.js
Active/O8.6/oto/scripts/obf-u-per-type.js
Active/O8.6/oto/scripts/obf-v1-s3matrix.js
Active/O8.6/oto/scripts/obf-v2-jsc.js
Active/O8.6/oto/scripts/run-15pass-battery.mjs
Active/O8.6/oto/scripts/run-16point-verification.mjs
Active/O8.6/oto/scripts/run-25pass-battery.mjs
Active/O8.6/oto/u
Active/O8.6/oto/u/shard-u-out.js
Active/O8.6/oto/v1-jso-s3matrix
Active/O8.6/oto/v1-jso-s3matrix/shard-a-out.js
Active/O8.6/oto/v1-jso-s3matrix/shard-aux-out.js
Active/O8.6/oto/v1-jso-s3matrix/shard-e-out.js
Active/O8.6/oto/v1-jso-s3matrix/shard-m-out.js
Active/O8.6/oto/v1-jso-s3matrix/shard-n1-out.js
Active/O8.6/oto/v1-jso-s3matrix/shard-n2-out.js
Active/O8.6/oto/v1-jso-s3matrix/shard-u-out.js
Active/O8.6/oto/v2-jsc
Active/O8.6/oto/v2-jsc/shard-a-out.js
Active/O8.6/oto/v2-jsc/shard-aux-out.js
Active/O8.6/oto/v2-jsc/shard-e-out.js
Active/O8.6/oto/v2-jsc/shard-m-out.js
Active/O8.6/oto/v2-jsc/shard-n1-out.js
Active/O8.6/oto/v2-jsc/shard-n2-out.js
Active/O8.6/oto/v2-jsc/shard-u-out.js
Active/O8.6/oto/v4-closure
Active/O8.6/oto/v4-closure/shard-a-out.js
Active/O8.6/oto/v4-closure/shard-aux-out.js
Active/O8.6/oto/v4-closure/shard-e-out.js
Active/O8.6/oto/v4-closure/shard-m-out.js
Active/O8.6/oto/v4-closure/shard-n1-out.js
Active/O8.6/oto/v4-closure/shard-n2-out.js
Active/O8.6/oto/v4-closure/shard-u-out.js
Active/O8.6/oto/v5-terser
Active/O8.6/oto/v5-terser/shard-a-out.js
Active/O8.6/oto/v5-terser/shard-aux-out.js
Active/O8.6/oto/v5-terser/shard-e-out.js
Active/O8.6/oto/v5-terser/shard-m-out.js
Active/O8.6/oto/v5-terser/shard-n1-out.js
Active/O8.6/oto/v5-terser/shard-n2-out.js
Active/O8.6/oto/v5-terser/shard-u-out.js
Active/O8.6/oto/v6-esbuild
Active/O8.6/oto/v6-esbuild/shard-a-out.js
Active/O8.6/oto/v6-esbuild/shard-aux-out.js
Active/O8.6/oto/v6-esbuild/shard-e-out.js
Active/O8.6/oto/v6-esbuild/shard-m-out.js
Active/O8.6/oto/v6-esbuild/shard-n1-out.js
Active/O8.6/oto/v6-esbuild/shard-n2-out.js
Active/O8.6/oto/v6-esbuild/shard-u-out.js
Active/O8.6/oto/v7-swc
Active/O8.6/oto/v7-swc/shard-a-out.js
Active/O8.6/oto/v7-swc/shard-aux-out.js
Active/O8.6/oto/v7-swc/shard-e-out.js
Active/O8.6/oto/v7-swc/shard-m-out.js
Active/O8.6/oto/v7-swc/shard-n1-out.js
Active/O8.6/oto/v7-swc/shard-n2-out.js
Active/O8.6/oto/v7-swc/shard-u-out.js
Active/O8.6/oto/v8-uglify
Active/O8.6/oto/v8-uglify/shard-a-out.js
Active/O8.6/oto/v8-uglify/shard-aux-out.js
Active/O8.6/oto/v8-uglify/shard-e-out.js
Active/O8.6/oto/v8-uglify/shard-m-out.js
Active/O8.6/oto/v8-uglify/shard-n1-out.js
Active/O8.6/oto/v8-uglify/shard-n2-out.js
Active/O8.6/oto/v8-uglify/shard-u-out.js
Active/O8.6/shards
Active/O8.6/shards/shard-a.js
Active/O8.6/shards/shard-aux.js
Active/O8.6/shards/shard-e.js
Active/O8.6/shards/shard-m.js
Active/O8.6/shards/shard-n1.js
Active/O8.6/shards/shard-n2.js
Active/O8.6/shards/shard-u.js
Active/O8.6/tools
Active/O8.6/tools/README.md
Active/O8.6/tools/discordlike.mjs
Active/O8.6/tools/feff-sprinkle.js
Active/O8.6/tools/heap-probe.mjs
Active/O8.6/tools/heap-scan.mjs
Active/O8.6/tools/marker-swap.py
Active/O8.6/tools/stitch-o85.py
Active/O8.6/tools/term-sweep.py
Active/O8.6/tools/test-var.mjs
Active/O8.6/tools/typed-pool-o85.mjs
Active/O8.6/tools/zw-suffix.js
Active/Stego/README.md
Active/Stego/bmp-to-js.js
Active/Stego/build-entangled-stego.js
Active/Stego/build-stego2.js
Active/Stego/build-stego3.mjs
Active/Stego/cover-gen.py
Active/Stego/decoy-garden-v2.js
Active/Stego/decoy-garden.js
Active/Stego/make-photo-cover.py
Active/Stego/output
Active/Stego/output-stego2
Active/Stego/output-stego2/O8.7-Stego-2-cover.bmp
Active/Stego/output-stego2/O8.7-Stego-2-runner.js
Active/Stego/output-stego2/stego2-decoy.min.js
Active/Stego/output-stego2/stego2-real.min.js
Active/Stego/output-stego3
Active/Stego/output-stego3/O8.7-Stego-3-cover.bmp
Active/Stego/output-stego3/O8.7-Stego-3-runner.js
Active/Stego/output-stego3/stego3-decoy.min.js
Active/Stego/output-stego3/stego3-real.min.js
Active/Stego/output/O8.6-S5-entangled-cover.bmp
Active/Stego/output/O8.6-S5-entangled-stego-runner.js
Active/Stego/pack-stego-bmp.js
Active/Stego/stego2-loader.js
Active/Stego/stego3-carrier-test.mjs
Active/Stego/stego3-codec.mjs
Active/Stego/stego3-legacyreel-src.js
Active/Stego/stego3-loader.js
Active/Stego/test-stego2-tiers.mjs
Active/Stego/test-stego3-tiers.mjs
Active/engines
Active/engines/package.json
Uploads
Uploads/stego2-cover.bmp
```

### Was: `Archives/o8.7-Stego-2-r2-live.tar.gz` — 7220892 B, sha256 `94bb46e132b5a1596f25f3e3f73e3f5727f76714d225ec3468252721fd42a319`, 123 members
```
Active/O8.6
Active/O8.6/final-package
Active/O8.6/final-package/O8.6-Final-compressed-deflateraw.js
Active/O8.6/final-package/O8.6-Final-compressed-gzip.js
Active/O8.6/final-package/O8.6-Final-final-bundle.js
Active/O8.6/final-package/SHA256SUMS.txt
Active/O8.6/final-package/selected-shards
Active/O8.6/final-package/selected-shards/shard-a-v1.js
Active/O8.6/final-package/selected-shards/shard-aux-v5.js
Active/O8.6/final-package/selected-shards/shard-e-v1.js
Active/O8.6/final-package/selected-shards/shard-m-v2.js
Active/O8.6/final-package/selected-shards/shard-n1-v6.js
Active/O8.6/final-package/selected-shards/shard-n2-v7.js
Active/O8.6/final-package/selected-shards/shard-u-v4.js
Active/O8.6/oto
Active/O8.6/oto/identifiers-dictionary-5k.csv
Active/O8.6/oto/identifiers-dictionary-jso.csv
Active/O8.6/oto/identifiers-dictionary-runner-5k.csv
Active/O8.6/oto/scripts
Active/O8.6/oto/scripts/build-s4-final-package.js
Active/O8.6/oto/scripts/obf-minify-family.js
Active/O8.6/oto/scripts/obf-u-canon.js
Active/O8.6/oto/scripts/obf-u-per-type.js
Active/O8.6/oto/scripts/obf-v1-s3matrix.js
Active/O8.6/oto/scripts/obf-v2-jsc.js
Active/O8.6/oto/scripts/run-15pass-battery.mjs
Active/O8.6/oto/scripts/run-16point-verification.mjs
Active/O8.6/oto/scripts/run-25pass-battery.mjs
Active/O8.6/oto/u
Active/O8.6/oto/u/shard-u-out.js
Active/O8.6/oto/v1-jso-s3matrix
Active/O8.6/oto/v1-jso-s3matrix/shard-a-out.js
Active/O8.6/oto/v1-jso-s3matrix/shard-aux-out.js
Active/O8.6/oto/v1-jso-s3matrix/shard-e-out.js
Active/O8.6/oto/v1-jso-s3matrix/shard-m-out.js
Active/O8.6/oto/v1-jso-s3matrix/shard-n1-out.js
Active/O8.6/oto/v1-jso-s3matrix/shard-n2-out.js
Active/O8.6/oto/v1-jso-s3matrix/shard-u-out.js
Active/O8.6/oto/v2-jsc
Active/O8.6/oto/v2-jsc/shard-a-out.js
Active/O8.6/oto/v2-jsc/shard-aux-out.js
Active/O8.6/oto/v2-jsc/shard-e-out.js
Active/O8.6/oto/v2-jsc/shard-m-out.js
Active/O8.6/oto/v2-jsc/shard-n1-out.js
Active/O8.6/oto/v2-jsc/shard-n2-out.js
Active/O8.6/oto/v2-jsc/shard-u-out.js
Active/O8.6/oto/v4-closure
Active/O8.6/oto/v4-closure/shard-a-out.js
Active/O8.6/oto/v4-closure/shard-aux-out.js
Active/O8.6/oto/v4-closure/shard-e-out.js
Active/O8.6/oto/v4-closure/shard-m-out.js
Active/O8.6/oto/v4-closure/shard-n1-out.js
Active/O8.6/oto/v4-closure/shard-n2-out.js
Active/O8.6/oto/v4-closure/shard-u-out.js
Active/O8.6/oto/v5-terser
Active/O8.6/oto/v5-terser/shard-a-out.js
Active/O8.6/oto/v5-terser/shard-aux-out.js
Active/O8.6/oto/v5-terser/shard-e-out.js
Active/O8.6/oto/v5-terser/shard-m-out.js
Active/O8.6/oto/v5-terser/shard-n1-out.js
Active/O8.6/oto/v5-terser/shard-n2-out.js
Active/O8.6/oto/v5-terser/shard-u-out.js
Active/O8.6/oto/v6-esbuild
Active/O8.6/oto/v6-esbuild/shard-a-out.js
Active/O8.6/oto/v6-esbuild/shard-aux-out.js
Active/O8.6/oto/v6-esbuild/shard-e-out.js
Active/O8.6/oto/v6-esbuild/shard-m-out.js
Active/O8.6/oto/v6-esbuild/shard-n1-out.js
Active/O8.6/oto/v6-esbuild/shard-n2-out.js
Active/O8.6/oto/v6-esbuild/shard-u-out.js
Active/O8.6/oto/v7-swc
Active/O8.6/oto/v7-swc/shard-a-out.js
Active/O8.6/oto/v7-swc/shard-aux-out.js
Active/O8.6/oto/v7-swc/shard-e-out.js
Active/O8.6/oto/v7-swc/shard-m-out.js
Active/O8.6/oto/v7-swc/shard-n1-out.js
Active/O8.6/oto/v7-swc/shard-n2-out.js
Active/O8.6/oto/v7-swc/shard-u-out.js
Active/O8.6/oto/v8-uglify
Active/O8.6/oto/v8-uglify/shard-a-out.js
Active/O8.6/oto/v8-uglify/shard-aux-out.js
Active/O8.6/oto/v8-uglify/shard-e-out.js
Active/O8.6/oto/v8-uglify/shard-m-out.js
Active/O8.6/oto/v8-uglify/shard-n1-out.js
Active/O8.6/oto/v8-uglify/shard-n2-out.js
Active/O8.6/oto/v8-uglify/shard-u-out.js
Active/O8.6/shards
Active/O8.6/shards/shard-a.js
Active/O8.6/shards/shard-aux.js
Active/O8.6/shards/shard-e.js
Active/O8.6/shards/shard-m.js
Active/O8.6/shards/shard-n1.js
Active/O8.6/shards/shard-n2.js
Active/O8.6/shards/shard-u.js
Active/O8.6/tools
Active/O8.6/tools/README.md
Active/O8.6/tools/discordlike.mjs
Active/O8.6/tools/feff-sprinkle.js
Active/O8.6/tools/heap-probe.mjs
Active/O8.6/tools/heap-scan.mjs
Active/O8.6/tools/marker-swap.py
Active/O8.6/tools/stitch-o85.py
Active/O8.6/tools/term-sweep.py
Active/O8.6/tools/test-var.mjs
Active/O8.6/tools/typed-pool-o85.mjs
Active/O8.6/tools/zw-suffix.js
Active/Stego/README.md
Active/Stego/bmp-to-js.js
Active/Stego/build-entangled-stego.js
Active/Stego/build-stego2.js
Active/Stego/cover-gen.py
Active/Stego/decoy-garden.js
Active/Stego/make-photo-cover.py
Active/Stego/output
Active/Stego/output-stego2
Active/Stego/output-stego2/O8.7-Stego-2-cover.bmp
Active/Stego/output-stego2/O8.7-Stego-2-runner.js
Active/Stego/output-stego2/stego2-decoy.min.js
Active/Stego/output-stego2/stego2-real.min.js
Active/Stego/output/O8.6-S5-entangled-cover.bmp
Active/Stego/output/O8.6-S5-entangled-stego-runner.js
Active/Stego/pack-stego-bmp.js
Active/Stego/stego2-loader.js
```

### Was: `Archives/o8.6-S6-live.tar.gz` — 7229899 B, sha256 `798cace841320dd14ce21e434c43730b65d603fa817a6afeb6a838e691f515c6`, 123 members
```
Active/O8.6
Active/O8.6/final-package
Active/O8.6/final-package/O8.6-Final-compressed-deflateraw.js
Active/O8.6/final-package/O8.6-Final-compressed-gzip.js
Active/O8.6/final-package/O8.6-Final-final-bundle.js
Active/O8.6/final-package/SHA256SUMS.txt
Active/O8.6/final-package/selected-shards
Active/O8.6/final-package/selected-shards/shard-a-v1.js
Active/O8.6/final-package/selected-shards/shard-aux-v5.js
Active/O8.6/final-package/selected-shards/shard-e-v1.js
Active/O8.6/final-package/selected-shards/shard-m-v2.js
Active/O8.6/final-package/selected-shards/shard-n1-v6.js
Active/O8.6/final-package/selected-shards/shard-n2-v7.js
Active/O8.6/final-package/selected-shards/shard-u-v4.js
Active/O8.6/oto
Active/O8.6/oto/identifiers-dictionary-5k.csv
Active/O8.6/oto/identifiers-dictionary-jso.csv
Active/O8.6/oto/identifiers-dictionary-runner-5k.csv
Active/O8.6/oto/scripts
Active/O8.6/oto/scripts/build-s4-final-package.js
Active/O8.6/oto/scripts/obf-minify-family.js
Active/O8.6/oto/scripts/obf-u-canon.js
Active/O8.6/oto/scripts/obf-u-per-type.js
Active/O8.6/oto/scripts/obf-v1-s3matrix.js
Active/O8.6/oto/scripts/obf-v2-jsc.js
Active/O8.6/oto/scripts/run-15pass-battery.mjs
Active/O8.6/oto/scripts/run-16point-verification.mjs
Active/O8.6/oto/scripts/run-25pass-battery.mjs
Active/O8.6/oto/u
Active/O8.6/oto/u/shard-u-out.js
Active/O8.6/oto/v1-jso-s3matrix
Active/O8.6/oto/v1-jso-s3matrix/shard-a-out.js
Active/O8.6/oto/v1-jso-s3matrix/shard-aux-out.js
Active/O8.6/oto/v1-jso-s3matrix/shard-e-out.js
Active/O8.6/oto/v1-jso-s3matrix/shard-m-out.js
Active/O8.6/oto/v1-jso-s3matrix/shard-n1-out.js
Active/O8.6/oto/v1-jso-s3matrix/shard-n2-out.js
Active/O8.6/oto/v1-jso-s3matrix/shard-u-out.js
Active/O8.6/oto/v2-jsc
Active/O8.6/oto/v2-jsc/shard-a-out.js
Active/O8.6/oto/v2-jsc/shard-aux-out.js
Active/O8.6/oto/v2-jsc/shard-e-out.js
Active/O8.6/oto/v2-jsc/shard-m-out.js
Active/O8.6/oto/v2-jsc/shard-n1-out.js
Active/O8.6/oto/v2-jsc/shard-n2-out.js
Active/O8.6/oto/v2-jsc/shard-u-out.js
Active/O8.6/oto/v4-closure
Active/O8.6/oto/v4-closure/shard-a-out.js
Active/O8.6/oto/v4-closure/shard-aux-out.js
Active/O8.6/oto/v4-closure/shard-e-out.js
Active/O8.6/oto/v4-closure/shard-m-out.js
Active/O8.6/oto/v4-closure/shard-n1-out.js
Active/O8.6/oto/v4-closure/shard-n2-out.js
Active/O8.6/oto/v4-closure/shard-u-out.js
Active/O8.6/oto/v5-terser
Active/O8.6/oto/v5-terser/shard-a-out.js
Active/O8.6/oto/v5-terser/shard-aux-out.js
Active/O8.6/oto/v5-terser/shard-e-out.js
Active/O8.6/oto/v5-terser/shard-m-out.js
Active/O8.6/oto/v5-terser/shard-n1-out.js
Active/O8.6/oto/v5-terser/shard-n2-out.js
Active/O8.6/oto/v5-terser/shard-u-out.js
Active/O8.6/oto/v6-esbuild
Active/O8.6/oto/v6-esbuild/shard-a-out.js
Active/O8.6/oto/v6-esbuild/shard-aux-out.js
Active/O8.6/oto/v6-esbuild/shard-e-out.js
Active/O8.6/oto/v6-esbuild/shard-m-out.js
Active/O8.6/oto/v6-esbuild/shard-n1-out.js
Active/O8.6/oto/v6-esbuild/shard-n2-out.js
Active/O8.6/oto/v6-esbuild/shard-u-out.js
Active/O8.6/oto/v7-swc
Active/O8.6/oto/v7-swc/shard-a-out.js
Active/O8.6/oto/v7-swc/shard-aux-out.js
Active/O8.6/oto/v7-swc/shard-e-out.js
Active/O8.6/oto/v7-swc/shard-m-out.js
Active/O8.6/oto/v7-swc/shard-n1-out.js
Active/O8.6/oto/v7-swc/shard-n2-out.js
Active/O8.6/oto/v7-swc/shard-u-out.js
Active/O8.6/oto/v8-uglify
Active/O8.6/oto/v8-uglify/shard-a-out.js
Active/O8.6/oto/v8-uglify/shard-aux-out.js
Active/O8.6/oto/v8-uglify/shard-e-out.js
Active/O8.6/oto/v8-uglify/shard-m-out.js
Active/O8.6/oto/v8-uglify/shard-n1-out.js
Active/O8.6/oto/v8-uglify/shard-n2-out.js
Active/O8.6/oto/v8-uglify/shard-u-out.js
Active/O8.6/shards
Active/O8.6/shards/shard-a.js
Active/O8.6/shards/shard-aux.js
Active/O8.6/shards/shard-e.js
Active/O8.6/shards/shard-m.js
Active/O8.6/shards/shard-n1.js
Active/O8.6/shards/shard-n2.js
Active/O8.6/shards/shard-u.js
Active/O8.6/tools
Active/O8.6/tools/README.md
Active/O8.6/tools/discordlike.mjs
Active/O8.6/tools/feff-sprinkle.js
Active/O8.6/tools/heap-probe.mjs
Active/O8.6/tools/heap-scan.mjs
Active/O8.6/tools/marker-swap.py
Active/O8.6/tools/stitch-o85.py
Active/O8.6/tools/term-sweep.py
Active/O8.6/tools/test-var.mjs
Active/O8.6/tools/typed-pool-o85.mjs
Active/O8.6/tools/zw-suffix.js
Active/Stego/README.md
Active/Stego/bmp-to-js.js
Active/Stego/build-entangled-stego.js
Active/Stego/build-stego2.js
Active/Stego/cover-gen.py
Active/Stego/decoy-garden.js
Active/Stego/make-photo-cover.py
Active/Stego/output
Active/Stego/output-stego2
Active/Stego/output-stego2/O8.7-Stego-2-cover.bmp
Active/Stego/output-stego2/O8.7-Stego-2-runner.js
Active/Stego/output-stego2/stego2-decoy.min.js
Active/Stego/output-stego2/stego2-real.min.js
Active/Stego/output/O8.6-S5-entangled-cover.bmp
Active/Stego/output/O8.6-S5-entangled-stego-runner.js
Active/Stego/pack-stego-bmp.js
Active/Stego/stego2-loader.js
```
## Rolling Stego-3 bytes v1 (instance a9e0ecca; superseded 2026-09-13)

Second rolling iteration overwrote `packages/O8.7-Stego-3/` (rule: move the
iteration, don't mint revisions). v1 ARCHIVE/BUILD prose matches v2 structure;
changed numbers recorded here. Old SHA256SUMS.txt (verified 6/6 at v1 freeze):
```
3a050f94dd40d82d21644049c51d6032b616ca311d018f91a9d4a93f4a1ec859  O8.7-Stego-3-cover.bmp
37d9acb164594bde67c6a0ce43996bd2f08367adc94af9ba57379fab2d84d52a  O8.7-Stego-3-runner.js
a8292176e78e8d42025378787d577b53522d42bcd4832035ceb68cf86a3431c0  stego3-real.min.js
3be45a575815c62f2f364dfbfed7d40101aace4b9236ede0b4972029fa3baccc  stego3-decoy.min.js
```
- v1 inputs: S6 bundle `afb12c9029991cab80546c4bb9dda2643a99af82aae8c75710fa8acd2ff37464`
  (stress-test rebuild), decoy-src `2ea7857c...f93894f`, cover-src `b1590ea3...` (unchanged).
- v1 payloads: real min 1264598 chars -> gz 512519 B (73.77% of R); decoy min
  1590 chars -> gz 855 B; photo maxDelta 15, PSNR 32.5dB (pin >= 32.0); seed 0xea66676d.
- v1 tests: tiers 20/20, carrier 12/12, battery 25/25, stress 11/11,
  O8.6 double-build 3/3 + stego double-build 4/4.
- Why superseded: shut-11 bundle (enrollment-miss fix + resurgence/AKQJT/view
  bridge passwords + shut on all 11 terminal paths) + grown garden-v2 decoy
  source; v2 = CHANGELOG 2026-09-13 (instance 39e738eb).
## Rolling Stego-3 bytes v2 (instance 39e738eb; superseded 2026-09-13)

Third rolling iteration overwrote `packages/O8.7-Stego-3/`. v2 ARCHIVE/BUILD
prose matches v3 structure; changed numbers recorded here. Old SHA256SUMS.txt
(was 6/6):
```
2b39f39ad2e330824f30e0a032851cce16256c3127fc5781d2942559d8ffd030  O8.7-Stego-3-cover.bmp
9c474ce7b2384e9cf327f6d5ff410ac1c28bcefb0e624a716ba95fce8eaa8eb2  O8.7-Stego-3-runner.js
93cdf3376e5841c27f40335795c53b46740def0dd6a4c90f6cf368208c3745f4  stego3-real.min.js
```
(stego3-decoy.min.js `55895e58...` UNCHANGED v2 -> v3, still current.)
- v2 inputs: S6 bundle `e7240515932f730722405ce0c4973a00468d27c93f15b82eae48d723f440108c`
  (shut-11 rebuild), decoy-src `39c9f94c...` (unchanged), cover-src `b1590ea3...` (unchanged).
- v2 payloads: real min 1222967 chars -> gz 503092 B (72.41% of R); decoy min
  3066 chars -> gz 1658 B; photo maxDelta 15, PSNR 32.6dB; seed 0xea66676d.
- v2 tests: tiers 20/20, carrier green, battery 25/25, stress 19/19 + seeds,
  stego double-build identical, mins byte-identical to re-minify.
- Why superseded: refill-resilience bundle (per-quest scan armor, dead-store
  whimper, skip-reason notes) after 4 silent-skip mechanisms reproduced the
  live enrollment-miss symptom on v2 bytes; v3 = CHANGELOG 2026-09-13 (52b86386).

---

## 2026-09-17 — O8.13 go-live freeze; what it supersedes

**Frozen:** `Archives/packages/O8.13/` (9 files, `sha256sum -c` 9/9 OK) + `Working-Stable/O8.13/`.
Bundle `ef1dac5e…` 1,873,322 B · runner `e008b377…` 3,371,189 B · cover `627ae142…` 2,359,350 B.
Instance `7e953faa` · BUILD-SEED `851b28e5` · rotation `o812`.

### Nothing was deleted, because nothing had been frozen

`O8.12-r4` was never archived to `Archives/packages/` — the handoff of 2026-09-16 says so plainly
(*"Current live `O8.12-r4` not yet archived to `Archives/packages/O8.13/` until you freeze"*). So
this entry documents supersession rather than retirement:

| superseded bytes | sha256 (first 16) | size | where they still exist |
|---|---|---|---|
| `O8.12-r4` bundle | `1e03f483c12f1132` | 1,660,881 B | `Active/O8.12-r4/final-package/O8.6-Final-final-bundle.js` — **FROZEN, untouched, re-verified this session** |
| `O8.12-r4` runner | `f36e792fd0447560` | 3,362,896 B | `_ARCHIVE_TRIM/superseded-carriers-2026-09-17.tar.gz` |
| `O8.12-r4` cover | `a206aaa39297d1ec` | 2,359,350 B | same tarball |
| `stego-bench` carrier | cover `72785ec5…` / runner `280fe0ac…` | 5.7 MB | same tarball (16 entries) |

The r4 carrier pair was **FROZEN-BROKEN for the garden tier** (`DSEED` desync, CHANGELOG 2026-09-17
(d)); it is kept for audit, not for use.

### Intermediate O8.13 builds superseded inside this session

Each was fully rebuilt over by the next; none was frozen, so none needs a tarball. Recorded so the
hash trail is not mistaken for missing artifacts:

`b82e0ef1…` (HNT-W) → `d534d413…` (A1 + cover slack) → `4e5033e1…` → `41304645…` → `b8ae6fa5…`
→ `c42157a9…` → `d37375c8…` → `834ba805…` → `f949354b…` → `2d58e645…` → **`ef1dac5e…` (frozen)**.

The long chain is the HNT-GREP targeting work; each of the four failed targeting strategies is
documented in `build-s4-final-package.js` so it is not re-litigated.

### Dictionaries changed in place (not retired — augmented)

`identifiers-dictionary-5k.csv` 5,288 → 6,068 words · `identifiers-dictionary-runner-5k.csv`
3,400 → 3,920 words, by `oto/scripts/dict-augment.mjs` (marker-guarded, idempotent). The
pre-augmentation bytes are reproducible by deleting the appended block before the
`/*dict-augment-v1*/` marker. `identifiers-dictionary-jso.csv` is unchanged at 340 words and is
**no longer read by any lane** — kept for rollback only.

---

## 2026-09-18 — trim before bundle 4 (snapshot 116.29 -> 102.10 MB)

Nothing deleted without a `diff -r` verification against the tarball first.

| retired to | contents | verified |
|---|---|---|
| `_COMPRESSED-HISTORY/superseded-carriers-stego-r5-r6-2026-09-18.tar.xz` (8.4 MB, 16 entries) | `Active/Stego/stego-r5/output/` (the live carrier's build output, frozen in `Archives/packages/O8.13/`) + `Active/Stego/stego-r6/output/` (the r2 candidate's output, frozen in `Archives/packages/O8.13-r2-candidate/`) | `diff -r` clean on both |
| `_COMPRESSED-HISTORY/ARCHIVE_TRIM-2026-09-18.tar.xz` (9.4 MB) | all of `_ARCHIVE_TRIM/` — the superseded carriers incl. the r4 pair | already tarballed, so xz gained little |
| `_COMPRESSED-HISTORY/Archives-packages-O8.8-O8.9-O8.11-2026-09-18.tar.xz` (8.9 MB) | `Archives/packages/O8.8` `O8.9` `O8.11` | `diff -r` clean on all three |

**Grep confirmed no build dependency** on `packages/O8.8|O8.9|O8.11` from any `.js`/`.mjs`.
`Archives/packages/` now holds only the live mirror `O8.13/` and `O8.13-r2-candidate/`.

To restore any of them: `tar -xJf <tarball> -C /home/user` (each tarball carries its own
`Archives/` or `Active/` prefix, so extract from the repo root — this is the mistake that created
`Archives/Archives/` on 2026-09-17).

## Superseded candidate bytes — 2026-09-18 rolling freeze

The prior contents of `Archives/packages/O8.13-r2-candidate/` were overwritten in place per the
operator's rolling-freeze rule. The superseded candidate was:

- cover `4eadcc99c3797847…` (2,359,350 B)
- runner `df13b45662e74467…`
- bundle `27b74b9c49d052e9…`
- real min `7526048176a7af8b…`

The replacement candidate now carries R2-03 string-table shattering, R2-04 sensitive-core VM,
R2-05a latency plausibility FaC, and R2-05b runtime dispatch-key derivation. The untouched live
line remains `packages/O8.13/` / `Working-Stable/O8.13/`; no go-live promotion was performed.

## 2026-09-18 (R2-06) — O8.13-r2-candidate superseded (rolling freeze)

- Was: `Archives/packages/O8.13-r2-candidate/` — 9.5 MB, 8 files, bundle `6886c39e594b5628b525e9e675b6532e85fe92527f1446c5d31d6372c160714b` (pipeline TUBE `reel layer / chunk / gate…`, `vault seal -- lattice quiet`), cover `28870fde36a7624131bbbe41a4a223046dce5deb24c16b3399fcf406ce027548` (2359350 B), runner `c09004e44db4d3eed713432ddea06b2133eacaaf71c08dab59180e6e6d8298a1` (3384800 chars), stego11p-real `516ec872f4be7e7e932a5e53366c2ed288c012c0ea1ea2d2a9cbc1e1108530e9` (1.9M), plus `stego11p-decoy 55895e58 / honey f84995d1 / tube 9dad7c20`, `rotation.json 5bc7746c`
- Now: same 9 files, bundle `f3c20bfb152582ff92e295245bc170ff33317e80ed3a903e0d8b0e947e7d4368` (garden R2-06 `moss/amber/owl + calm/still/quiet`, `vault quiet`, G7 `1100/259`, S4 `1945.4KB` `1992067→1992261` +500 Q-guard +2596 HNT-GREP, G8 `aa38a57b,7f534a77,80c7c` → stego repin `67f885d1,bbf757a4,75e26371`), cover `e11cc893d9de7f15d62d38011085beb4d5dbfa60ba6e9bbd812aa96af39342fb`, runner `bfa48714d939b11aed3049122f4ddfbae64506d129917d0b450b1d8026cf5e84` (3372798 chars, 75.23% occupancy, slack 574), stego11p-real `efac0bc1c7133ba5341da0401c7dae248f1eac8abf7defc86946ac89aa3c5607` (1738275 min → 850180 gz), decoy/honey/tube unchanged (still 55895e58/f84995d1/9dad7c20), `rotation.json` unchanged.
- Reason: R2-06 strip pipeline log templates (PLAN-O8.13-r2 §F5) — 8 pipeline literals replaced with garden vocab already in use for fiction camo; `tubeLayer` fallback `vault seal … -- lattice quiet` → `vault quiet`; no V2 regeneration (frozen `7082ce98…` kept), so S4 remains compatible (garden V2 alone fails S4, pipeline V2 + garden G7/V1 passes `16/16`).
- Verification: `G7 12/12 round-trip` · `V1 10/10` · `S4 16/16` · `25/25` · `stego 43/0` (43 passed 0 failed with `--debug-name='佐藤 結衣'`) on `Active/Stego/output-stego12` (now frozen).
- Reproduce: `node oto/scripts/obf-strings-g7.js` (garden) → `obf-v1-s3matrix.js` (no `obf-v2-jsc.js`) → `obf-minify-family.js` → `obf-u-canon/per-type` → `build-s4-final-package.js` → `build-stego12-r2.mjs Active/O8.13/final-package/O8.6-Final-final-bundle.js Uploads/stego2-cover-1024-scaled.bmp Active/Stego/output-stego12 --line1=0`

