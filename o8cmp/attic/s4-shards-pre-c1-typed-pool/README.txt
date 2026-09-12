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
