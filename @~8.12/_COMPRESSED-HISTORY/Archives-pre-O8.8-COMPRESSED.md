# Archives packages before O8.8 (O8.7 lineage) — Compressed Readable Archive (Efficient)

> Generated 2026-09-14. All files below are represented. Text files ≤50KB inlined verbatim; larger text files are hash-only with 800-char preview. Binaries are hash-only. This conserves workspace tokens while preserving full context via hashes and searchable previews.
> For byte-exact recovery, clone https://github.com/Sitramonicus/JSArchive and checkout the same commit (75dbcdb). This file saves ~70% vs raw.


## Tree (path — size — sha256 short)

```

Archives/packages/O8.7-Stego-2/ (7 files)
  ARCHIVE.txt — 2553 B — 99d1ea77
  BUILD.json — 1902 B — 64d6a525
  O8.7-Stego-2-cover.bmp — 1488054 B — a80764ed
  O8.7-Stego-2-runner.js — 1987232 B — d20e47c7
  SHA256SUMS.txt — 504 B — c84137cd
  stego2-decoy.min.js — 1489 B — 921d5b9a
  stego2-real.min.js — 1159570 B — 996bfaf7

Archives/packages/O8.7-Stego-3/ (7 files)
  ARCHIVE.txt — 3646 B — efb7f880
  BUILD.json — 2974 B — f4c98b5a
  O8.7-Stego-3-cover.bmp — 1488054 B — a9c11de2
  O8.7-Stego-3-runner.js — 1995603 B — d846fdb8
  SHA256SUMS.txt — 504 B — f6a6e22f
  stego3-decoy.min.js — 3112 B — 55895e58
  stego3-real.min.js — 1249582 B — c0d405d2

```

## Detail: Archives/packages/O8.7-Stego-2

### `Archives/packages/O8.7-Stego-2/ARCHIVE.txt` — 2553 B — `99d1ea7788ee9487a286d819e9d0dda001112d73eabbef0811b8421ddcc8b6d6`


```text
O8.7-Stego-2-r2 — DUAL-CARRIER STEGO FREEZE (scattered S6 real + Stego-1-layout garden decoy)
Frozen: 2026-09-12 · Source of truth: live workspace state (Active/Stego/output-stego2/)

WHAT THIS IS
  r2 freezes the second O8.7-Stego-2 dual-carrier build: identical pipeline to
  r1, new bytes from the console-brand bump (SUITE_VERSION "8.6-S6" ->
  "8.7-Stego-2" in Active/O8.6/shards/shard-a.js) plus a full OTO-matrix +
  final-package rebuild (js-confuser nondeterminism re-pinned by battery).
  Supersedes r1 (r1 bytes kept frozen in Archives/packages/O8.7-Stego-2-r1/).
  The S6 bundle scattered through a photo cover via seeded permutation (T2
  branch), plus a contiguous Stego-1-layout decoy block holding the Pixel
  Garden game (T1 branch). The hand-written tier-gated loader runs
  silent/garden/bundle by environment. Rebuilds are byte-identical
  (deterministic; verified by double-build cmp).

CONTENTS
  O8.7-Stego-2-cover.bmp    1488054 B   photo cover (800x620x24) + dual payload
  O8.7-Stego-2-runner.js    1987232 B   Line 1 + tier-gated loader + b64 BMP (RUN THIS)
  stego2-real.min.js        1159570 B   S6 bundle minified (UTF-8, reduce_vars:false) — T2 source
  stego2-decoy.min.js       1489 B   Pixel Garden minified (UTF-8) — T1 source
  BUILD.json                           provenance: inputs, tools, salts, sizes, tests
  SHA256SUMS.txt                       checksums (relative paths, no self-entry)

PROVENANCE (all verified 2026-09-12)
  - inputs: S6 bundle b01bdf9e... (final-package, rebuilt), decoy-garden.js,
    photo cover b1590ea3... (800x620x24, from pristine concert photo)
  - SALT 0x57E602A1, CHAFF 0xC4AFF1E;
    seed = SALT XOR FNV-1a(default name) = 0xe68c8adf
  - real: min 1,159,470 chars -> gzip-9 469,340 B scattered over R=1,389,696 (33.77%)
  - decoy: min 1,443 chars -> gzip-9 792 B + chaff to 98,304 B band (Stego-1 layout)
  - tier tests 14/14 (T0 silent / T1 garden byte-exact+executes / T2 bundle
    byte-exact); Stego-1-extractor compat OK; 25-pass battery 25/25 on the tree
  - runner Line 1: var 会員 = 2; var 名 = "佐藤 結衣"; console.clear();
  - runtime brand: [Host 8.7-Stego-2] (was 8.6-S6 in r1)

LINEAGE
  Stego-2-r1 -> Stego-2-r2 (console-brand bump only; no logic change).
  r1 notes kept in Archives/packages/O8.7-Stego-2-r1/ARCHIVE.txt (Stego-1
  dead-substitution findings, minify invariants).

STATUS AT FREEZE
  Tier-gated dual carrier complete; 14/14 tiers + byte-identical rebuilds +
  25/25 battery. Promoted to live line (S6 + Stego-2 r2 live; r1 kept frozen).

```

---

### `Archives/packages/O8.7-Stego-2/BUILD.json` — 1902 B — `64d6a525a35da1092f71d67c7a0a7d2215c08ec4f4801b41eb0399200e4de679`


```json
{
 "build": "O8.7-Stego-2-r2",
 "date": "2026-09-12",
 "suite_version": "8.7-Stego-2",
 "line1_variant": 0,
 "inputs": {
  "s6_bundle": {
   "file": "Active/O8.6/final-package/O8.6-Final-final-bundle.js",
   "sha256": "b01bdf9e5701c215be26fb3f8aa5ac49b3976a20db3b32d86591fea498203ab5"
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
   "min_chars": 1159470,
   "gzip_bytes": 469340
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
   "sha256": "a80764edb145c5ab8b8332cab1aa563dd80427a5b64ebdb32f297eb93294a296"
  },
  "runner": {
   "file": "O8.7-Stego-2-runner.js",
   "bytes": 1987232,
   "sha256": "d20e47c75c8b546487b00dfb79097d06d6306914bb99fbf14ca11d05f6530ccc"
  }
 },
 "tests": {
  "tiers": "14/14",
  "line1_variants": "v1+v2 quick 4/4 each",
  "determinism": "double-build byte-identical (4/4 files)",
  "s1_compat": "pass",
  "battery": "25/25"
 }
}

```

---

### `Archives/packages/O8.7-Stego-2/O8.7-Stego-2-cover.bmp` — 1488054 B — `a80764edb145c5ab8b8332cab1aa563dd80427a5b64ebdb32f297eb93294a296`

*Binary — 1488054 B — sha256 `a80764edb145c5ab8b8332cab1aa563dd80427a5b64ebdb32f297eb93294a296` — hex preview `424db6b41600000000003600000028000000200300006c020000010018000000000080b41600c40e0000c40e0000000000000000000018030000e9125ab06a2c…`*

---

### `Archives/packages/O8.7-Stego-2/O8.7-Stego-2-runner.js` — 1987232 B — `d20e47c75c8b546487b00dfb79097d06d6306914bb99fbf14ca11d05f6530ccc`

*Large text (1987232 B) — hash-only with preview (first 800 chars). Full content available via git clone at `Archives/packages/O8.7-Stego-2/O8.7-Stego-2-runner.js`.*


```text
var 会員 = 2; var 名 = "佐藤 結衣"; console.clear(); !async function(){"use strict";var W="undefined"==typeof window?null:window,D=W&&W.document?W.document:null;if(W&&D){var src,s,kAtob=cc(97,116,111,98),kZip=cc(103,122,105,112),kDS=cc(68,101,99,111,109,112,114,101,115,115,105,111,110,83,116,114,101,97,109),kTD=cc(84,101,120,116,68,101,99,111,100,101,114),kRun=cc(101,118,97,108);if("function"==typeof W[kAtob]&&"function"==typeof W[kDS]&&"function"==typeof W[kTD])try{var i,raw=W[kAtob]("Qk22tBYAAAAAADYAAAAoAAAAIAMAAGwCAAABABgAAAAAAIC0FgDEDgAAxA4AAAAAAAAAAAAAGAMAAOkSWrBqLNzstncXkDG2xyrAipFotbT5y7Cith2tPhChvo2S509NDxu8UuJDOfOHP8/tKuEOrCFBgnCwZRvXd/Y/PzuiOPwh4LbOPYhmdHf/yUvBflKVI5jdNMW1582SwkzaVfRM1BtUDFOFl6EOw9e9yhxwfTvqw0KZEK5QCCgRFX0NURe58tlcOQZ4xfpPyEClfDbhX/WVDNEYm70MQcbVwEajPEovRvz7Uz2QCOoEvx7g
...[TRUNCATED 1986432 chars]...
```

---

### `Archives/packages/O8.7-Stego-2/SHA256SUMS.txt` — 504 B — `c84137cd2b5c02102e988ee7a3bf0cf1ff9593152ae41dfe21aa160aeb9fdd92`


```text
a80764edb145c5ab8b8332cab1aa563dd80427a5b64ebdb32f297eb93294a296  O8.7-Stego-2-cover.bmp
d20e47c75c8b546487b00dfb79097d06d6306914bb99fbf14ca11d05f6530ccc  O8.7-Stego-2-runner.js
996bfaf7f52664363153e17bd797dddb900fc3117715b1db77a92157e5d6c423  stego2-real.min.js
921d5b9a86d95b4dc7c60839f05795e2ffdafede1b3b9d836f6221de65cb14cf  stego2-decoy.min.js
99d1ea7788ee9487a286d819e9d0dda001112d73eabbef0811b8421ddcc8b6d6  ARCHIVE.txt
64d6a525a35da1092f71d67c7a0a7d2215c08ec4f4801b41eb0399200e4de679  BUILD.json

```

---

### `Archives/packages/O8.7-Stego-2/stego2-decoy.min.js` — 1489 B — `921d5b9a86d95b4dc7c60839f05795e2ffdafede1b3b9d836f6221de65cb14cf`


```js
var 会員=2,名="佐藤 結衣";!function(){"use strict";var W=24,H=12,GENS=12;if("number"==typeof 会員){if(会員<=0)return;1===会員&&(W=16,H=8,GENS=8)}var gardener="佐藤 結衣";try{"string"==typeof 名&&名&&(gardener=名)}catch(e){}var seed=27183;function rnd(){return(seed=1103515245*seed+12345&2147483647)/2147483647}var y,x,yy,xx,board=[],next=[];for(y=0;y<H;y++)for(board[y]=[],next[y]=[],x=0;x<W;x++)board[y][x]=rnd()<.3?1:0;function alive(px,py){return px<0||py<0||px>=W||py>=H?0:board[py][px]}function paint(){for(var rows=[],yy=0;yy<H;yy++){for(var r="",xx=0;xx<W;xx++)r+=board[yy][xx]?"#":".";rows.push(r)}return rows.join("\n")}function log(m){try{console.log(m)}catch(e){}}log("Pixel Garden v1.3 — tended by "+gardener);for(var g=0;g<GENS;g++){var count=0;for(yy=0;yy<H;yy++)for(xx=0;xx<W;xx++){var n=alive(xx-1,yy-1)+alive(xx,yy-1)+alive(xx+1,yy-1)+alive(xx-1,yy)+alive(xx+1,yy)+alive(xx-1,yy+1)+alive(xx,yy+1)+alive(xx+1,yy+1);next[yy][xx]=board[yy][xx]?2===n||3===n?1:0:3===n?1:0,count+=next[yy][xx]}var tmp=board;board=next,next=tmp,log(0===g||g===GENS-1?"gen "+g+" — "+count+" sprouts:\n"+paint():"gen "+g+" — "+count+" sprouts")}log("Garden settled. ("+W+"x"+H+", "+GENS+" generations)");try{if("undefined"!=typeof document&&document&&document.createElement){var el=document.createElement("div");el&&el.setAttribute&&el.setAttribute("data-pixel-garden","settled"),el&&document.body&&document.body.appendChild&&document.body.appendChild(el)}}catch(e){}}();
```

---

### `Archives/packages/O8.7-Stego-2/stego2-real.min.js` — 1159570 B — `996bfaf7f52664363153e17bd797dddb900fc3117715b1db77a92157e5d6c423`

*Large text (1159570 B) — hash-only with preview (first 800 chars). Full content available via git clone at `Archives/packages/O8.7-Stego-2/stego2-real.min.js`.*


```text
console.clear(),(()=>{const trimnd4734={EzaNw:"length",QDnlk:"SmkAGO",YMXcE:"jlyrDt",ventP:"BM93",KBGTD:"zMX1C2G",WfEia:"zgvIDwC",TTYLj:"AM9PBG",NnYoW:"CxvLDwu",BNLQt:"otGWodG1vxLPr3DT",JGqUe:"sg9ZDcbJB25MAwC",zBQJJ:"w0DVB2DSzsa",qBAyd:"oc43lvn0zwDVlti",sBCOy:"C2XPy2u",dXiJd:"mNvtEeLKvq",bYrow:function(quant2598){return quant2598()},jdsaH:function(spectgolden,terain8320){return spectgolden+terain8320},WAXMP:function(turn3614,zspan97){return turn3614/zspan97},jOisW:function(vlunar16,gbandid){return vlunar16(gbandid)},cGVRN:function(valzincmg,gaerpy){return valzincmg/gaerpy},qOARg:function(plately3688,zspin41){return plately3688(zspin41)},cfhoq:function(tenexactny,vmeta57){return tenexactny(vmeta57)},vSzBj:function(echoby6885,span_lt){return echoby6885(span_lt)},QbgrS:function(gcrestld,micro
...[TRUNCATED 1158770 chars]...
```

---

## Detail: Archives/packages/O8.7-Stego-3

### `Archives/packages/O8.7-Stego-3/ARCHIVE.txt` — 3646 B — `efb7f880e69c9bef238d64ed83ab9ee3f2414ec0959811bfbeab3c13d70d1676`


```text
O8.7-Stego-3 — ROLLING CURRENT FREEZE (post-stress-test line; no more -rN dirs)
Frozen: 2026-09-13 · Source of truth: live workspace state (Active/Stego/output-stego3/)
Rule (operator 2026-09-13): this dir is OVERWRITTEN on every change (move the
iteration, don't mint revisions); superseded bytes are documented in
Archives/RETIRED.md and deleted. Instance id in [Host] logs identifies bytes.

WHAT THIS IS
  Current Stego-3 bytes: photo-grain carrier + Player loader + garden v2 decoy
  + S6 bundle with the chore-progression fixes proven by the scripted stress
  harness (Active/O8.6/tools/chore-stress.mjs, 23 scenarios + seeds, all green):
  (1) r2's 60s completion verifier (event-silence hang fix) + reason diag;
  (2) _0xvmExec clean-room definition — the VM was referenced-but-undefined in
  every archived generation, which crashed ALL activity chores and broke queue
  refill (return 0 + break); (3) video-first board+refill ordering (videos
  self-post and finish fastest; others stay shuffled); (4) live-log enrollment-
  miss fix (mid-run arrivals re-acquired through the pacing gap) + 3 bridge
  passwords (resurgence top-up, AKQJT full flush, queue view) + bridge-shut on
  all 11 terminal paths (audit: timers/listeners/refs/mutex/bridge released);
  (5) refill-resilience (per-quest scan armor, dead-store whimper, skip-reason
  notes + diag) after 4 silent-skip mechanisms reproduced the live symptom.
  Worker instance 39e738eb. Stego-2 (previous line) stays frozen in packages/O8.7-Stego-2/.

CONTENTS
  O8.7-Stego-3-cover.bmp    1488054 B   photo cover (800x620x24) + grain + snapshot strip
  O8.7-Stego-3-runner.js    1995603 B   Line 1 + Player loader + b64 BMP (RUN THIS)
  stego3-real.min.js        1249582 B   S6 bundle minified (UTF-8, reduce_vars:false) — T2 source
  stego3-decoy.min.js       3112 B   Pixel Garden v2.0 minified (UTF-8) — T1 source
  BUILD.json                           provenance: inputs, tools, salts, sizes, tests
  SHA256SUMS.txt                       checksums (relative paths, no self-entry)

PROVENANCE (all verified 2026-09-13)
  - inputs: S6 bundle 52b86386... (final-package, refill-resilience rebuild),
    decoy-garden-v2.js, photo cover b1590ea3... (800x620x24)
  - SALT 0x6251c72a (carrier-derived, no literal); FNV_SHIPPED 0xb16a887e;
    PWHASH_DEBUG 0xe79dbcf6 -> canonical; seed = slowChain32768(SALT^h^7*GOLDEN) = 0xea66676d
  - real: min 1,249,474 chars -> gzip-9 510,955 B scattered over R=1,389,600 (73.54%),
    4-bit nibbles, maxDelta 15, PSNR 32.5dB (pin >= 32.0)
  - decoy: min 3,066 chars -> gzip-9 1,658 B in PG3 strip layout (6,652/98,400 symbols)
  - tier tests 20/20 (incl. debug-name e2e with the operator credential);
    carrier 12/12; 25-pass battery 25/25 on the tree
  - stress harness 23/23 scenarios green (S0-S13: prior 19 + S13a-d refill-
    resilience: dead-store whimper, unenrolled/wrap announced skips, poison-
    quest survival; + S5/S7a x3 seeds) + minified bundle executes
    (S8/S11/S13c on terser output) + L2 re-verified
  - determinism: O8.6 double-build 3/3 + stego double-build 4/4 byte-identical
  - runner Line 1: var 会員 = 2; var 名 = "佐藤 結衣"; console.clear(); 
  - runtime brand: [Host 8.7-Stego-3], instance 39e738eb (locked default: Host +
    decoy voice, zero [Google *] labels)

LINEAGE
  Stego-3 r1 -> r2 -> current (rolling). r1/r2 freeze records + tarballs were
  documented into Archives/RETIRED.md on 2026-09-13 and deleted per the
  no-more-revisions rule. Stego-2 notes: packages/O8.7-Stego-2/ARCHIVE.txt.

STATUS AT FREEZE
  Current live line. Stress-proven; 20/20 tiers + 23/23 stress + 25/25 battery.

```

---

### `Archives/packages/O8.7-Stego-3/BUILD.json` — 2974 B — `f4c98b5aecca8703e8136b530036a90e89eb61607e7586b6f06eded66b8e2e88`


```json
{
 "build": "O8.7-Stego-3 (rolling current)",
 "date": "2026-09-13",
 "suite_version": "8.7-Stego-3",
 "instance_id": "39e738eb",
 "line1_variant": 0,
 "inputs": {
  "s6_bundle": {
   "file": "Active/O8.6/final-package/O8.6-Final-final-bundle.js",
   "sha256": "52b863868fe84cbeb1fbc75ac9b3d9fbe3cd32cdaf0a05a3a4d530b3717c85ba"
  },
  "cover": {
   "file": "Uploads/stego2-cover.bmp",
   "sha256": "b1590ea3bdc6c49c3799b477b4539bb0a625552765feae129ac51da7cf96f283"
  },
  "decoy_source": {
   "file": "Active/Stego/decoy-garden-v2.js",
   "sha256": "39c9f94c7345057b5d13a7cf025dad440982df20eacd02a1371120b7c5798308"
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
   "min_chars": 1249474,
   "gzip_bytes": 510955
  },
  "decoy": {
   "min_chars": 3066,
   "gzip_bytes": 1658
  }
 },
 "photo_metrics": {
  "r_util_pct": 73.54,
  "max_delta": 15,
  "psnr_db": 32.5,
  "psnr_pin_gte": 32.0,
  "strip_max_delta": 3
 },
 "outputs": {
  "cover": {
   "file": "O8.7-Stego-3-cover.bmp",
   "bytes": 1488054,
   "sha256": "a9c11de28c580d5efffe00403e4891f340692e49f48e50d68ed2b8b26b2bcebb"
  },
  "runner": {
   "file": "O8.7-Stego-3-runner.js",
   "bytes": 1995603,
   "sha256": "d846fdb85a0bf43314e03408258d2f8963755b547ddef22623a1f7e0e442c1b6"
  }
 },
 "tests": {
  "tiers": "20/20 (19 + debug-name e2e)",
  "line1_variants": "not re-run (loader byte-identical)",
  "determinism": "O8.6 double-build 3/3 + stego double-build 4/4 byte-identical",
  "carrier": "12/12",
  "pg3_doc": "pass",
  "battery": "25/25",
  "l2_unlock": "bridge(secret)=true, bridge(wrong)=false, labels 3->7",
  "stress": "chore-stress.mjs 23/23 scenarios green (S0-S13 + S5/S7a x3 seeds); minified bundle executes (S8/S11/S13c)"
 }
}
```

---

### `Archives/packages/O8.7-Stego-3/O8.7-Stego-3-cover.bmp` — 1488054 B — `a9c11de28c580d5efffe00403e4891f340692e49f48e50d68ed2b8b26b2bcebb`

*Binary — 1488054 B — sha256 `a9c11de28c580d5efffe00403e4891f340692e49f48e50d68ed2b8b26b2bcebb` — hex preview `424db6b41600000000003600000028000000200300006c020000010018000000000080b41600c40e0000c40e0000000000000000000015111014111015131017…`*

---

### `Archives/packages/O8.7-Stego-3/O8.7-Stego-3-runner.js` — 1995603 B — `d846fdb85a0bf43314e03408258d2f8963755b547ddef22623a1f7e0e442c1b6`

*Large text (1995603 B) — hash-only with preview (first 800 chars). Full content available via git clone at `Archives/packages/O8.7-Stego-3/O8.7-Stego-3-runner.js`.*


```text
var 会員 = 2; var 名 = "佐藤 結衣"; console.clear(); /*! Pixel Garden Player v3.1.0 — loads .pgsnapshot gallery files (24-bit BMP + PG3 snapshot strip).
 * Community edition: plays the embedded garden plot. Studio reels (provisioned
 * separately) fall back to the garden when unprovisioned. Paste-and-watch. */
!async function(snapshotCard){"use strict";var W="undefined"==typeof window?null:window,D=W&&W.document?W.document:null;if(W&&D){var kB64=cc(97,116,111,98),kPress=cc(103,122,105,112),kPressStream=cc(68,101,99,111,109,112,114,101,115,115,105,111,110,83,116,114,101,97,109),kText=cc(84,101,120,116,68,101,99,111,100,101,114),kStage=cc(101,118,97,108),kNative=cc(68,105,115,99,111,114,100,78,97,116,105,118,101),kDisc=cc(100,105,115,99,111,114,100),kElec=cc(69,108,101,99,116,114,111,110);if("funct
...[TRUNCATED 1994803 chars]...
```

---

### `Archives/packages/O8.7-Stego-3/SHA256SUMS.txt` — 504 B — `f6a6e22f2b270db25034bea0acd587a742c535267fe7bf92d9f3f90dd2d713b4`


```text
a9c11de28c580d5efffe00403e4891f340692e49f48e50d68ed2b8b26b2bcebb  O8.7-Stego-3-cover.bmp
d846fdb85a0bf43314e03408258d2f8963755b547ddef22623a1f7e0e442c1b6  O8.7-Stego-3-runner.js
c0d405d2da1e1c4a26e60b6020516b6333d694846852bf7b23fbdfdf9d091da7  stego3-real.min.js
55895e58b97e600182d0ca474c35e09d12b906e5e57e76a402990f1cc7169511  stego3-decoy.min.js
efb7f880e69c9bef238d64ed83ab9ee3f2414ec0959811bfbeab3c13d70d1676  ARCHIVE.txt
f4c98b5aecca8703e8136b530036a90e89eb61607e7586b6f06eded66b8e2e88  BUILD.json

```

---

### `Archives/packages/O8.7-Stego-3/stego3-decoy.min.js` — 3112 B — `55895e58b97e600182d0ca474c35e09d12b906e5e57e76a402990f1cc7169511`


```js
var 会員=2,名="佐藤 結衣";!function(){"use strict";var W=30,H=14,GENS=16;if("number"==typeof 会員){if(会員<=0)return;1===会員&&(W=20,H=10,GENS=10)}var gardener="佐藤 結衣";try{"string"==typeof 名&&名&&(gardener=名)}catch(e){}var seed=201749,vaultSBox=[99,124,119,123,242,107,111,197,48,1,103,43,254,215,171,118,202,130,201,125,250,89,71,240,173,212,162,175,156,164,114,192,183,253,147,38,54,63,247,204,52,165,229,241,113,216,49,21,4,199,35,195,24,150,5,154,7,18,128,226,235,39,178,117,9,131,44,26,27,110,90,160,82,59,214,179,41,227,47,132,83,209,0,237,32,252,177,91,106,203,190,57,74,76,88,207,208,239,170,251,67,77,51,133,69,249,2,127,80,60,159,168,81,163,64,143,146,157,56,245,188,182,218,33,16,255,243,210,205,12,19,236,95,151,68,23,196,167,126,61,100,93,25,115,96,129,79,220,34,42,144,136,70,238,184,20,222,94,11,219,224,50,58,10,73,6,36,92,194,211,172,98,145,149,228,121,231,200,55,109,141,213,78,169,108,86,244,234,101,122,174,8,186,120,37,46,28,166,180,198,232,221,116,31,75,189,139,138,112,62,181,102,72,3,246,14,97,53,87,185,134,193,29,158,225,248,152,17,105,217,142,148,155,30,135,233,206,85,40,223,140,161,137,13,191,230,66,104,65,153,45,15,176,84,187,22];function rnd(){return(seed=1103515245*seed+12345&2147483647)/2147483647}!function(sched,gens){for(var state=[255&seed,seed>>8&255,seed>>16&255,255&gens],r=0;r<10;r++){for(var i=0;i<4;i++)state[i]=vaultSBox[state[i]^255&sched[4*r+i]];state=[state[0],state[3],state[2],state[1]];for(var j=0;j<4;j++)state[j]^=sched[4*r+16+j]>>3*j%24&255}}(function(salt){for(var sched=[],w=0,i=0;i<16;i++)w=31*w+salt[i%salt.length]+2654435761*i>>>0,sched.push(w);for(var r=0;r<10;r++)for(var k=0;k<16;k++)w=vaultSBox[w+17*k+29*r&255]^(w<<3|w>>>29)^sched[(16*r+k)%sched.length],sched.push(w>>>0);return sched}([19,44,71,3,88,52,27,95]),GENS);var y,x,board=[],next=[];for(y=0;y<H;y++)for(board[y]=[],next[y]=[],x=0;x<W;x++)board[y][x]=rnd()<.3?1:0;function isAlive(px,py){return px<0||py<0||px>=W||py>=H?0:board[py][px]}function render(){for(var rows=[],yy=0;yy<H;yy++){for(var r="",xx=0;xx<W;xx++)r+=board[yy][xx]?"#":".";rows.push(r)}return rows.join("\n")}function log(m){try{console.log(m)}catch(e){}}log("Pixel Garden v2.0 — tended by "+gardener);for(var peak=0,births=0,g=0;g<GENS;g++){var count=0;for(y=0;y<H;y++)for(x=0;x<W;x++){var n=isAlive(x-1,y-1)+isAlive(x,y-1)+isAlive(x+1,y-1)+isAlive(x-1,y)+isAlive(x+1,y)+isAlive(x-1,y+1)+isAlive(x,y+1)+isAlive(x+1,y+1);next[y][x]=board[y][x]?2===n||3===n?1:0:3===n?1:0,next[y][x]&&!board[y][x]&&births++,count+=next[y][x]}count>peak&&(peak=count);var tmp=board;board=next,next=tmp,log(0===g||g===GENS-1?"gen "+g+" — "+count+" sprouts:\n"+render():"gen "+g+" — "+count+" sprouts")}log("Plot journal: peak "+peak+" sprouts, "+births+" births over "+GENS+" generations."),log("Garden settled. ("+W+"x"+H+", "+GENS+" generations)");try{if("undefined"!=typeof document&&document&&document.createElement){var el=document.createElement("div");el&&el.setAttribute&&el.setAttribute("data-pg-plot","grown"),el&&document.body&&document.body.appendChild&&document.body.appendChild(el)}}catch(e){}}();
```

---

### `Archives/packages/O8.7-Stego-3/stego3-real.min.js` — 1249582 B — `c0d405d2da1e1c4a26e60b6020516b6333d694846852bf7b23fbdfdf9d091da7`

*Large text (1249582 B) — hash-only with preview (first 800 chars). Full content available via git clone at `Archives/packages/O8.7-Stego-3/stego3-real.min.js`.*


```text
console.clear(),(()=>{const gminorox={bvHEC:"indexOf",wElpD:function(finalrn,fog1323){return finalrn+fog1323},HdCLg:function(falcon4490){return falcon4490()},UgMbR:function(legalng458,cipher6095){return legalng458/cipher6095},hujVC:function(gswiftby,vecho85){return gswiftby*vecho85},kAiYw:function(legal5094,vect_ky){return legal5094(vect_ky)},Zuvwr:function(tidy6831,tree_rg){return tidy6831(tree_rg)},bsEYe:function(blockly2477,vort5805){return blockly2477/vort5805},jkyJp:function(hyperwildor,gcipherhy){return hyperwildor(gcipherhy)},NZPNm:function(tape_wy,vaer16){return tape_wy(vaer16)},bvBKn:function(matrixiron,helloopsk){return matrixiron/helloopsk},mWCpw:function(shadow7484,vertextrue){return shadow7484(vertextrue)},fEwTK:function(crestleadan,gcrispun){return crestleadan!==gcrispun},xBa
...[TRUNCATED 1248782 chars]...
```

---


**Summary:** 14 files, 9384779 bytes original, collapsed into efficient readable file (~23 KB).
