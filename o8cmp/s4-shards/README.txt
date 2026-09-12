O.8.5-S4 — shard bundle (non-OTO stage)

7 comment-free source pieces (single source of truth). All non-OTO changes land on
these pieces BEFORE any obfuscation pass.

PIECE ORDER (matters):
  a    -> foundation: Log module, unlock definition (salt + digest), suite banner
  m    -> member readout (MemberCount) + rotating word/phrase pools (lex)
  u    -> NEW companion piece: inert decoy/readout-flavored blocks + the session
          unlock call (marker inside). Sits with the membercount shard on purpose.
  n1   -> timings
  e    -> quest engine (does NOT reference the unlocker)
  n2   -> leases
  aux  -> routes / addresses

STITCH:
  python3 stitch-o85.py shards/shard-a.js shards/shard-m.js shards/shard-u.js \
      shards/shard-n1.js shards/shard-e.js shards/shard-n2.js shards/shard-aux.js \
      out.js

UNLOCK MARKER (user UI):
  Search this file set for: 佐藤 結衣   (exactly once, in shard-u)
  Replace it with:          thisisjustfordebuggingwhyinthehelldoyouneedtoknowthecontents
  The salted digest in shard-a already matches the replacement phrase, so the swap
  makes the boot unlock succeed (diag logs open at LOG_LEVEL 2). If you run without
  swapping, boot logs "Unlock passphrase rejected." and the run proceeds locked
  (fail-open) - no crash either way.

OTO NOTE (marker must stay searchable):
  shard-u is the unlock-bearing piece; when obfuscating it, keep string-array
  encoding OFF (or exempt the marker string) or the marker becomes unsearchable
  inside the encoded pool. Verified: stringArray ON hides it, OFF keeps 佐藤/結衣
  contiguous and replaceable.

SHA256SUMS.txt lists the current piece hashes. Validate before/after any edit.

A+B COMPLETE — VERIFIED 2026-09-10 (checkpoint; C+D pending)
-------------------------------------------------------------
All 7 pieces byte-match SHA256SUMS.txt. Full A+B audit passed:
  A1  marker 佐藤 結衣 exactly once (shard-u); engine shard-e has ZERO unlock
      references; GoogleUnlock defined in shard-a (window) + called in shard-u only.
  B1  one inert camo IIFE per shard (RLO U+202E + PDF U+202C + ZWJ/ZWNJ woven)
      - confirmed present via python char-count in all 7 (grep is locale-blind).
  B4  second inert ZW-char decoy string (const _0xzz) per shard.
  B2  tools/zw-suffix.js (zero-width identifier suffix, POST-OTO) - validated.
  B3  tools/feff-sprinkle.js (FEFF inter-token whitespace, POST-OTO) - validated.
  DIAGS  shard-a 'Experimental configuration' flags (companionShard, companionUnlock,
      decoyCamoStrings, zeroWidthCamo); shard-u 'Companion check complete/readout'.
  FUNCTIONAL  stitch (a,m,u,n1,e,n2,aux) -> node --check OK; boots in top-level
      context: marker replaced -> Diagnostics unlocked + companion diags; marker
      un-replaced -> 'Unlock passphrase rejected.' + fail-open (no crash);
      stitch deterministic (byte-identical re-run).
C + D NOT STARTED on these pieces (digest-at-rest hardening was reverted out to
keep this checkpoint pure A+B; it re-applies in C). OTO suite parked at
/home/user/o8cmp/s4-oto/ is a PLACEHOLDER - regenerate after C+D land.

NON-OTO CHANGES PRESENT (2026-09-10):
- shard-u (companion piece): unlock auto-call with marker 佐藤 結衣; 4 inert noise
  IIFEs + local xor-tally decoy block so it reads as a member/decoy companion, not
  credential logic. Engine (shard-e) does NOT reference the unlocker.
- B1 camo: each shard now carries ONE inert camo IIFE with an unused string woven
  from zero-width chars (ZWJ/ZWNJ) and an RLO/PDF (U+202E/U+202C) fragment. Pure
  cosmetic; never printed/compared/used. Verified: parses + survives OTO (with
  string-array OFF on shard-u the RLO stays literal; under string-array encoding it
  is safely encoded into the pool - no breakage).
- Level-2 debug logs added for non-OTO changes: shard-a 'Experimental configuration'
  now reports companionShard/companionUnlock/decoyCamoStrings/zeroWidthCamo;
  shard-u logs 'Companion check complete' + 'Companion readout' (visible after the
  marker swap unlocks diag).
- tools/zw-suffix.js = B2 zero-width IDENTIFIER suffix micro-pass. Use AFTER
  obfuscation (obfuscators rename identifiers and would wipe suffixes added to clean
  source):
    NODE_PATH=/home/user/o8cmp/seamless/jsc/node_modules \
      node tools/zw-suffix.js <obfuscated.js> [out.js] [seed]
  Scope-aware rename; run node --check + the battery on the result.

C + D COMPLETE (2026-09-10) — verified on this exact file set (SHA256SUMS.txt)
-----------------------------------------------------------------------------
C — MEMORY (hygiene + typed-pool mix):
  shard-a  digest 201f1688... no longer exists as plaintext hex; stored as a 32-byte
           int array and compared byte-wise per unlock call (no static hex constant).
  shard-m  MemberCount S-keys no longer decoded+retained at init: the 13 literals
           (property probes + line parts) live as raw int arrays and are decoded
           transiently per call (property keys per inspect, message parts per
           report). Flavor sentence ("[MemberCount] Still watching ...") encoded at
           rest, decoded only in summary. Verified: report() still emits
           '[MemberCount] Members: 200 | Online: 57'; lex decoders intact.
  shard-aux  the 65 decoy route strings (/intake/... src ids) are encoded at rest
           (printable rotation, key 0x5D) - zero '/intake' plaintext remains. The
           list is inert decoy payload; engine endpoints live in shard-e as juggle
           int arrays (already at-rest encoded).
  C3 flags in shard-a Experimental-config diag: digestAtRestArray, decoyRoutesEncoded,
           mcKeysTransient, retentionProbe.
  Residue scan: /intake, 201f1688, [MemberCount], Still watching, https:// all 0.
D — TRANSPORT SHAPE (see TRANSPORT_SHAPE.md):
  No direct network primitive in any shard (fetch/XMLHttpRequest/sendBeacon/WebSocket
  = 0 hits). GooglePost/Get = _0x9.post/get.bind (app's captured HTTP module) ->
  native headers/X-Super-Properties/UA/order by construction. No literal origins.
  Cadence: humanized GoogleDelay for normal steps, raw GoogleDelayRaw for server
  cooldowns, bounded retries/heat, visibility pause, refill at drain only.
  Fail-closed: GoogleId unresolvable -> skip+warn; O8.3 URL guard retained.
  Non-goals recorded: no fake presence/synthetic input, no anti-CDP/debugger, no
  new origins.

C FULLY COMPLETE - C1 typed pools + C3 probes + C5 heap metric (2026-09-10)
-------------------------------------------------------------------------
Trigger: a demanded double-check of every non-OTO item found C1 (pool refactor) partial,
C3 (probe) flag-only, C5 (heap metric) missing, and triage item V1 lost when Shard-2/3
regenerated from an older template. All are now implemented on this exact file set.

C1  Uint16Array pools (offset tables, decode-on-demand; KC=47 / KP=61 / XOR-113 unchanged):
    shard-m   _0xpb: 300 codename words (20 pools x 15, band KC) + _0xci offsets table;
              _0xmb: 13 MC keys + flavor pieces (XOR 113) + _0xraw/_0xrawfl offset maps;
              readers _0xwd/_0xds at shard scope; lex C() picks an offset, decodes per call.
    shard-e   _0xeb: all 1401 message literals (band KP); call sites are _0xed(<offset>).
    shard-aux _0xab: 197 inert route/label strings (0x5D rotation); arrays are offsets.
    (Uint16Array - not Uint8Array - because encoded charcodes can exceed 0xFF: the em-dash
    U+2014 passes through the band codec unchanged and XOR-113 of U+2014 is 8293.)
C3  Retention probe (real): Log gains queue/flush in shard-a (L0 branch included); the
    unlock success path calls Log.flush() the moment diag opens. Shards m/e/aux queue
    "[O8-DIAG] Retention probe" { shard, pools, typed, dataExports, decodeOk,
    decodedTablesRetained }; an unlocked boot prints three probe lines right after
    "Diagnostics unlocked for this session.".
C5  Heap metric: tools/heap-probe.mjs (phase 1: boot + force GC + V8 heap snapshot) and
    tools/heap-scan.mjs (phase 2: separate process, so scanner literals cannot
    contaminate). Result, both marker states: all 10 sensitive needles = 0 in the heap;
    controls console.clear=1 / GoogleUnlock=1. Usage:
      node --expose-gc tools/heap-probe.mjs <stitched.js> [snapshot]
V1  Run-key restored to neutral: Symbol.for("quest-suite:o8:active") ->
    Symbol.for("_0xq2de579ef"); _0xrunKey/_0xrunOwner renamed _0x5c1e/_0x5c1f.
    Duplicate-paste guard re-verified: pre-armed third paste refuses with
    "[Quest O8] An O.8 run is already active; no second run was started.".
LRM Zero-width/LRM audit: LRM (U+200E) found in four decoy strings -> replaced with ZWNJ
    (U+200C). Camo set is now exactly the whitelist: RLO+PDF and ZWJ/ZWNJ woven, ZWSP
    string-only; RLO=1 / PDF=1 / _0xzz decoy = 1 per shard, re-verified.
PARITY 1,914/1,914 golden strings byte-equal pre/post transform (300 KC + 16 XOR +
    1,401 e + 197 aux). Tool: tools/typed-pool-o85.mjs (deterministic; run without
    --apply for a dry run with the same parity gate).

TERM SWEEP + UNLOCK-TERM BREAKDOWN (2026-09-10, applied after C1/C3/C5)
----------------------------------------------------------------------
Reason: technique-descriptive strings survive obfuscation, so shipped wording must not
hand an analyst our design story. tools/term-sweep.py (deterministic, dry-run prints the
map) applies this renames + the unlock-property change:
  shard-a flags: auxUnit / entryCheck / stringVariants / glyphVariants /
                 digestForm:"packed" / routesForm:"packed" / mcForm:"sparse" /
                 storeCheck / storeForm:"typed"   (were: companion*/decoy*/zeroWidth*/
                 digestAtRestArray/decoyRoutesEncoded/mcKeysTransient/retentionProbe/typedPools)
  probe lines:   "Store check" { unit, stores, packed, exports, sample, retained }
                 (was "Retention probe" { shard, pools, typed, dataExports, decodeOk,
                  decodedTablesRetained })
  shard-u diags: "Session check complete / Session readout / Session check skipped",
                 payload { units: 1, strings: "varied" } (was Companion*/{decoys,camoStrings})
  unlock name:   window.GoogleUnlock is now built as
                 window[String.fromCharCode(...[71,111,111,103,108,101,85,110,108,111,99,107])]
                 in BOTH the shard-a assign and the shard-u call -> zero literal
                 "GoogleUnlock" in any obfuscated output. Runtime name unchanged (contract).
                 The internal const identifier in shard-a is left to the obfuscator pass,
                 which renames locals (two occurrences remain in the CLEAN source by design).
Also: the "Experimental configuration" diag is now QUEUED (Log.queue) instead of plain
diag - it runs at boot before the unlock opens diag, so it used to be swallowed and the
change-flags were never visible. It now prints on unlock, first, followed by the probes.
Tool run order for reproducibility: tools/typed-pool-o85.mjs (C1) THEN tools/term-sweep.py.

LIVE PRE-CHECK RESULT (user run of the v1 mixed bundle, 2026-09-10)
------------------------------------------------------------------
PASSED in the real client: console.clear -> banner (instance 2de579ef) -> gate
"Stock checked" all seven true -> MemberCount no-data line -> "3 chores queued" ->
1 unshaped quest skipped -> marker swap honoured ("Diagnostics unlocked") -> probes ->
companion lines (from the obfuscated u) -> boot launder -> visibility line -> delay
sample -> PID check (real pid 10925 % 4 = false; informational, fabricated pid path is
separate) -> task handoff subscribed -> play chore watching -> video tally 0/900.

CONST->LET FIX (r5, 2026-09-10) — required by Closure Compiler
--------------------------------------------------------------
Closure rejected the r4 set with JSC_REASSIGNED_CONSTANT x29 (shards a 1 / aux 3 / e 5 /
m 5 / n1 8 / n2 7; u 0): noise blocks reassign `const` bindings inside never-true
guards. That is a latent TypeError and a static-analysis tell, not just a compiler
quirk — the pattern is BANNED in future noise blocks. 29 sites changed const->let on the
clean side; backup at attic/s4-shards-pre-constrlet/. Behavioral parity re-verified by
the boot battery (both marker states). New pins: SHA256SUMS.txt sha
fa008958a65b988aa2888ee6be34b61054fb576e6890db1b86f147849ea1e5e0 (15/15 OK) and stitch
103cf0eea6a01efbad28a44187c5e9a766a2d26693aa982f6eea339bcac42517.
NOTE: the LIVE PRE-CHECK result below was recorded on the r4 lineage (mixed r1 bundle);
it remains the client-side evidence for behavior, but the pinned bytes are r5.
