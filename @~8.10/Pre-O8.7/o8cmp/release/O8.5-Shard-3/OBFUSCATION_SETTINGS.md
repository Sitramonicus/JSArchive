O8.5-Shard-3 — OBFUSCATION SETTINGS v2 (differentiated matrix, validated 2026-09-08)
=========================================================================================
All six pieces were obfuscated with the settings below via javascript-obfuscator
5.6.0 and the stitched result passed: smoke lifecycle (boot -> completion ->
armed reload), consumer runs x2 (0 shared log lines), unlock unit 5/5,
MemberCount cross-shard (200|57), node --check on every piece.
Reference artifact: O8.5-Shard-3-obf-reference.js (in this folder).

Design: every shard gets its OWN toolchain (naming scheme, string-array
encoding, wrapper machinery, seeds). Cracking one shard must NOT transfer to
the others. Worst case (e understood) ends the game regardless - so e gets the
heaviest pass and the rest maximize the cost of getting there.

----------------------------------------------------------------------
ALWAYS OFF - every shard, no exceptions (the seam/contract invariants)
----------------------------------------------------------------------
Nests 0 | Strict OFF | VM OFF | Renaming Globals OFF (window.GoogleUnlock)
Renaming Properties OFF (_0xmod.{log,mc,lex} seam + real Discord field reads)
selfDefending OFF | debugProtection OFF | disableConsoleOutput OFF
unicodeEscapeSequence OFF | transformObjectKeys OFF | domainLock/sourceMap OFF

----------------------------------------------------------------------
PER-SHARD (obfuscator.io equivalents in parentheses)
----------------------------------------------------------------------
shard-a  foundation - "ordinary-looking" shard (mangled-shuffled letters)
  Identifier Naming: Mangled Shuffled | Prefix: (none) | Seed 1f7a2c0e
  String Array: ON | Threshold 0.55 | Rotate ON | Shuffle ON | Encoding: Base64
  Index Shift ON | Indexes Type: Hexadecimal Number
  Calls Transform ON | Wrappers: 3, Variable, Max Params 2, Chained ON
  CFF OFF | Dead Code OFF | Split Strings OFF (has ${} templates)
  Numbers to Expressions OFF
  -> stays ~5.5KB, looks like a trivial minified module.

shard-m  MemberCount + lexicon - the hex shard (your call)
  Identifier Naming: Hexadecimal (leave prefix empty - generator emits _0x<hex>
  itself; a second prefix doubles into _0x_0x30d5) | Seed 9c4b7d3a
  String Array: ON | Threshold 0.9 | Rotate ON | Shuffle OFF | Encoding: Base64
  Index Shift ON | Indexes Type: Hexadecimal Numeric String
  Calls Transform ON | Wrappers: 5, Variable, Max Params 2, Chained OFF
  CFF ON @ 0.45 | Dead Code OFF | Split Strings OFF (has ${} templates)
  Numbers to Expressions OFF (member char-code arrays would explode)
  -> 19.3KB -> 62KB. Pure _0x<hex> surface, base64 machinery - unlike e.

shard-n1  camo noise - dictionary + rc4 + split + dead code
  Identifier Naming: Dictionary (same identifiers-dictionary.txt) | Seed e5d2b8f1
  String Array: ON | Threshold 0.75 | Rotate ON | Shuffle ON | Encoding: RC4
  Index Shift ON | Indexes Type: both (Hex Number + Hex Numeric String)
  Calls Transform ON | Wrappers: 5, Function, Max Params 3, Chained ON
  CFF ON @ 0.6 | Dead Code ON @ 0.08 | Split Strings ON, Chunk 6 (no templates)
  Numbers to Expressions OFF

shard-e  ENGINE - the crown jewels
  Identifier Naming: Dictionary (same dictionary file) | Seed 2de579ef
  String Array: ON | Threshold 1.0 | Rotate ON | Shuffle ON | Encoding: RC4
  Index Shift ON | Indexes Type: both
  Calls Transform ON | Wrappers: 12, Function, Max Params 2, Chained ON
  CFF ON @ 0.75 | Dead Code ON @ 0.12
  Split Strings OFF (35 template literals - never split) 
  Numbers to Expressions OFF (decode tables are int arrays - never explode)
  -> 117.5KB -> 559KB. If one shard gets understood this is the one that ends
     it - so this is where the budget goes.

shard-n2  camo noise - dictionary but base64 + variable wrappers + other seed
  Identifier Naming: Dictionary | Seed 6b3a9f14   <-- different seed on purpose:
  same wordlist, completely different name assignment than n1/e
  String Array: ON | Threshold 0.85 | Rotate ON | Shuffle ON | Encoding: Base64
  Index Shift ON | Indexes Type: both
  Calls Transform ON | Wrappers: 6, Variable, Max Params 2, Chained ON
  CFF ON @ 0.5 | Dead Code OFF | Split Strings ON, Chunk 8 (no templates)
  Numbers to Expressions OFF

shard-aux decoy block - the "plain" shard: no string array at all
  Identifier Naming: Mangled | Seed c8f4a25d
  String Array: OFF (whole array machinery absent - structurally different)
  CFF OFF | Dead Code OFF | Split Strings ON, Chunk 5 | Numbers to Expressions ON
  -> 13.7KB -> 19KB of plain-looking but string-split, number-bloated code.

----------------------------------------------------------------------
WHY THESE SPECIFIC DIFFERENCES (vs the v1 uniform table)
----------------------------------------------------------------------
- 4 naming schemes across 6 shards: mangled-shuffled (a), hexadecimal (m),
  dictionary (n1/e/n2), mangled (aux). Same-scheme shards differ by seed,
  encoding and wrapper type, so even n1 vs e vs n2 look unrelated.
- Encodings split 2/2/1/0: rc4 (e, n1), base64 (m, n2), split-only (aux).
- Wrapper types alternate function (n1, e) vs variable (a, m, n2); counts
  3/5/5/6/12.
- splitStrings + numbersToExpressions only on template-free shards (n1, n2,
  aux) - a/m/e contain ${} templates or big int arrays and must keep both OFF.
- Different seeds everywhere so identical settings never yield identical
  output between two shards.
- Sizes now 5.5 / 62 / 59 / 559 / 33 / 19 KB - no two shards share a profile,
  which also obscures which one is the engine (e is big but 62+59 of noise
  flank it; m at 62 is exactly the decoy-sized shard you would poke first).

SIZE KNOB: total ~755KB. Cut order: e wrappers 12->6, e CFF 0.75->0.6, then
m CFF 0.45->0.3. Expect ~550-600KB.

RUN IT LOCALLY: npm install javascript-obfuscator@5.6.0 ; node obf-all.js ;
python3 stitch-o85.py obf/shard-a-out.js obf/shard-m-out.js obf/shard-n1-out.js
obf/shard-e-out.js obf/shard-n2-out.js obf/shard-aux-out.js OUT.js ;
node obf-smoke.js OUT.js
Obfuscator.io equivalents are in the table; the dictionary box accepts the
whitespace-separated identifiers-dictionary.txt.
