O8.5-Shard-2 release bundle (stitcher edition)
===============================================
Suite  : O.8.5-Shard-2   Seed: 9a9c42ca
SHA256 : ff5937392707fbc2662bb81bc359168e17300d0513434c77fe6adf4d04250e6d  O8.5-Shard-2.js

Same contents/layout as the O8.5-Shard-3 bundle: paste O8.5-Shard-2.js (once),
obfuscate shards/ pieces separately, then:
  python3 stitch-o85.py shards/shard-a.js shards/shard-m.js shards/shard-n1.js ^
    shards/shard-e.js shards/shard-n2.js shards/shard-aux.js O8.5-Shard-2-obf.js
  node --check O8.5-Shard-2-obf.js
Order matters: a exports log; m imports log and exports mc+lex; e imports all.

Differences from Shard-3: this build predates the lexicon at-rest encoding and
comment stripping - shards/*.js here are comment-free, but O8.5-Shard-2.js
itself (as shipped/used on 2026-09-08) still contains its original comments
and plaintext lexicon. If you plan to run this one for real, prefer the
Shard-3 bundle instead; this folder is for experimenting with per-piece
obfuscation on the file you already have. Full Shard-2 record:
o8cmp/O8.5-Shard-2_RECORD.md.
