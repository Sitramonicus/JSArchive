O.8.5-S4 — OTO folder (regenerated 2026-09-10 from the FINAL clean set r5)
==========================================================================

STRUCTURE — subfolders are the OTO types (SEVEN types + canonical u)
  v1-jso-s3matrix/   javascript-obfuscator 5.6.0, O8.5-S3 differentiated matrix (PRIMARY —
                     this is the type you replicate on obfuscator.io; settings per shard
                     in ../SETTINGS-javascript-obfuscator.md, dictionary below)
  v2-jsc/            js-confuser 2.1.3, per-piece child processes (engine rotation)
  v4-closure/        Closure Compiler 20260907.0.0 SIMPLE (native binary), camo re-injected
  v5-terser/         terser 5.51.2 (structure-preserving for our signatures)
  v6-esbuild/        esbuild 0.28.2 (minifySyntax OFF)
  v7-swc/            @swc/core 1.16.2 (compress OFF)
  v8-uglify/         uglify-js 3.19.3 (conservative compress, mangle OFF)
  u/                 canonical unlock-shard pass (agent-only; stringArray OFF so the
                     marker stays literal). Same bytes as any type's shard-u-out.js base.
  scripts/           obf-v1-s3matrix.js · obf-v2-jsc.js · obf-u-canon.js ·
                     obf-u-per-type.js · obf-minify-family.js (v4–v7)
  identifiers-dictionary-jso.csv   1,000 names, COMMA-separated, single line — paste
                     into obfuscator.io's Identifiers Dictionary field
  SETTINGS-javascript-obfuscator.md per-shard settings tables + UI mapping

  NOTE: v3-jso-lite RETIRED (not up to par) -> ../attic/jso-lite-retired/. The v3 gap in
  the numbering is intentional; do not renumber the family.
  (uglify-js was probed OK and is now foldered as v8-uglify — same structural tier.)

EACH TYPE FOLDER CONTAINS
  shard-{a,m,n1,e,n2,aux}-out.js   the six pieces obfuscated under that type
  shard-u-out.js                   the unlock shard under that type (marker preserved;
                                   every type passed the marker rule)
  stitched-full.js                 reference stitch (a,m,u,n1,e,n2,aux) — booted headless
  SHA256SUMS.txt                   per-folder pins (refreshed for r5)

USER FLOW (your side)
  1. Take the clean pieces from ../s4-shards/shards/ and replicate the v1 matrix per
     SETTINGS-javascript-obfuscator.md on obfuscator.io (same seed + CSV dictionary).
  2. Use our shard-u-out.js (do NOT string-array it; marker must stay searchable).
  3. Stitch with ../s4-shards/stitch-o85.py (order a, m, u, n1, e, n2, aux).
  4. Marker swap: replace 佐藤 結衣 (exactly 1×) with your passphrase → unlock works.

STATUS / EVIDENCE (r5 regeneration — all six types verified)
  - Inputs: final clean r5 pieces (sums fa008958…; stitch 103cf0ee…). u regenerated from
    the r5 shard-u (per type); unlock property = strip-bidi + reverse of an RLO/PDF-wrapped reversed
    literal (_0xgr helper in shard-a + shard-u), zero "GoogleUnlock" literal anywhere.
  - Every type folder (7) boots in BOTH marker states: unlocked → 3× Store check →
    Session check complete { ready: true }; locked → "Unlock passphrase rejected." +
    fail-open (run proceeds, no crash).
  - Marker rule: literal ×1, contiguous, no \x20 escape in every u output (canonical +
    all six per-type). Post-restores applied where engines escape the marker.
  - Pins (sha256[:16] of stitched-full.js): v1 c94b69a37c258e99 (876KB) · v2 aff066f9ec7c7d2f
    (452KB) · v4 6a14806aabecec7a (136KB) · v5 1c82131d37dceb60 (136KB) · v6 413713d3ab61ce32
    (140KB) · v7 fafbd41d6d15f559 (140KB) · v8 3c131929acee5754 (116KB) ·
    u canonical d9feb296f2f1f94e. Full pins in each
    folder's SHA256SUMS.txt. v1/v4–v7 are deterministic; v2 (js-confuser) is not seedable —
    its per-run SHA256SUMS are the record.
  - v4 boot fix: camo injected after `var $jscomp=$jscomp||{}` was parsed via ASI as a call
    on the object literal (TypeError: {} is not a function) → injection now statement-
    prefixed with `;` (obf-minify-family.js). Per-piece outputs were always fine; only the
    stitch exposed it.
  - Mixed pre-check bundles for live testing live in ../s4-mixed-precheck/ (v1 = 8bc34211…
    PASSED live in the client; r2 = b5ff6bbb…) — SUPERSEDED by the r5 set; historical
    evidence only, do not test against them.

NOTES
  - v1 stitch is the paste-critical one (~876KB); v4–v7 sit at 136–140KB.
  - obfuscator.io results will differ from ours (engine/preset drift) — expected; the
    option set, seed and dictionary are what you replicate.
  - The parked-placeholder note from earlier rounds is SUPERSEDED by this regeneration.
