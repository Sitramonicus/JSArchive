O8.5-Shard-3 release bundle
===========================
Suite  : O.8.5-Shard-3
Seed   : 2de579ef (metamorphic instance id)
SHA256 : 76da265ca051b1e8e7a999d4fd8263bcc073e87a6dcd4f3292bba249ca03922c  O8.5-Shard-3.js
Date   : 2026-09-08

WHAT IS IN THIS FOLDER
----------------------
O8.5-Shard-3.js            the payload: paste into Discord's devtools console.
                           console.clear() first; paste ONCE per session
                           (a second paste in the same window is refused by the
                           duplicate-run guard - that is expected).
shards/shard-*.js          the six scope-isolated pieces the payload is built
                           from (a=foundation, m=MemberCount+lexicon, n1/e/n2/aux).
                           These are the files you obfuscate SEPARATELY with
                           different per-piece settings, then stitch.
stitch-o85.py              reassembly tool: python3 stitch-o85.py <piece1> <piece2>
                           ... <pieceN> <output.js>. Pure text join - it does NOT
                           validate; run `node --check` on the result before use.
SHA256SUMS.txt             hashes of every file in this folder.

WHAT CHANGED IN THIS BUILD (vs O8.5-Shard-2)
--------------------------------------------
1. NO COMMENTS anywhere in the shipped JS (artifact + pieces). The files are
   now scanner-clean of every comment that previously described regions,
   unlock, delay models, etc.
2. LEXICON ENCODED AT REST. The 20 codename word pools and all phrase-variant
   sentences (and their arrays) are no longer present as readable text. They
   are stored Caesar-rotated over the printable band and decoded in memory at
   the moment a log fires - so console output still reads exactly as before
   (e.g. "[Google Valise] Inventory readout: ..."), but a static scan of the
   file finds no word lists and no sentence fragments ("Bungle", "Rounded
   out:", the pool table, etc. are all absent - verified 0 occurrences).
   Logs stay per-call randomized within their term/phrase families exactly
   like Shard-2.
3. Noise inside the shards was rewritten without common API words
   (.set/.get/.push/.map/.forEach/Map/Set/class), so naive keyword scanners
   no longer light up on the camouflage either.
4. Fresh metamorphic instance (new decode tables, new decoy block, new seed).
5. Per-piece size profile is close to Shard-2: foundation ~115 / MemberCount
   ~315 / camo ~295 / engine ~886 / camo ~280 / aux ~154 lines.

THE OBfuscATION + STITCH RECIPE (obfuscator.io, one tab per piece)
-------------------------------------------------------------------
For each piece in shards/, paste it into obfuscator.io with DIFFERENT settings:

  shard-a.js   (foundation)     low: stringArray off, controlFlowFlattening off
  shard-m.js   (lexicon+MC)     medium: stringArray on (threshold 0.6), rc4 OFF
                                (rc4 would break nothing, but strings here are
                                already ciphertext; keep readability of decoders)
  shard-n1.js  (camo noise)     medium, stringArray on
  shard-e.js   (engine)         HEAVY: stringArray on + rc4, rotateStringArray,
                                stringArrayThreshold 1, controlFlowFlattening
                                moderate, deadCodeInjection 4-8
  shard-n2.js  (camo noise)     medium, stringArray on
  shard-aux.js (decoy block)    light/medium

KEEP OFF everywhere: selfDefending, debugProtection, disableConsoleOutput,
renameGlobals, unicodeEscapeSequence, splitStrings, numbersToExpressions
(ok to enable the last one if you like noise; keep off for determinism).
console.clear() must stay the FIRST statement of the stitched file - the
pieces keep it in shard-a's container line, so it survives stitching.

Then stitch in ORDER (a, m, n1, e, n2, aux):
  python3 stitch-o85.py ^
    shards/shard-a.js shards/shard-m.js shards/shard-n1.js ^
    shards/shard-e.js shards/shard-n2.js shards/shard-aux.js ^
    O8.5-Shard-3-obf.js
  node --check O8.5-Shard-3-obf.js

Order matters: a exports log; m imports log, exports mc+lex; e imports all
three; n1/n2/aux are self-contained.

Optional CLI (same obfuscator engine, reproducible):
  npm install javascript-obfuscator@5.6.0   (local folder)
  then one node -e invocation per piece with the settings above and --seed.

EXPECTED LIVE BEHAVIOR (sanity checks while it runs)
----------------------------------------------------
- First line after paste: console cleared, then
  [Quest O.8.5-Shard-3] started - metamorphic instance 2de579ef.
- Lines print as "[Google <word>] <human-readable message>"; words/messages
  vary between runs and between lines (per-call random draw). If you see
  gibberish in the console messages (e.g. "]ML]RFC..."), the runtime decoder
  was broken by an obfuscator option - usually rc4 or unicodeEscapeSequence on
  the m piece - retry with those off.
- MemberCount line appears once near startup.
- When everything is done it prints a completion line and then, once armed,
  pressing Alt+Shift+R reloads.

VERIFICATION ON THIS MACHINE (node available)
---------------------------------------------
  node --check O8.5-Shard-3.js
  node --check shards/shard-a.js   (and each other piece)
  # parity of the 23 embedded constants vs the manifest:
  node juggler-instance-check.js O8.5-Shard-3.js juggler-strings.json
  # -> "PARITY OK: 23/23 ..."

Full validation battery (consumer runs, unlocked diagnostics 31 lines,
LOG_LEVEL variants, unlock unit 5/5, negative gate, stress multi/midrun/
srvdone/blip, determinism byte-exact, duplicate-paste guard) passed on the
shipped file; record: o8cmp/O8.5-Shard-3_RECORD.md (local workspace).
