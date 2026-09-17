!! SUPERSEDED (2026-09-10, rev 10) — HISTORICAL EVIDENCE ONLY, DO NOT TEST AGAINST !!
Both bundles below are built on the r4 clean lineage. The active clean set is r5
(const->let fix; stitch 103cf0ee…, sums fa008958…) and the active OTO family is
../s4-oto/ (six types + u). Keep these files as the record of the user's successful LIVE
client run (r1) — do not regenerate, stash, or reuse them for validation.

CAVEAT for the r1 live-pass credit: the run happened on the r4 lineage. The const->let
change is mechanically behavior-neutral (29 noise-block bindings, never-true guards) and
every r5 artifact re-passed the headless battery in both marker states, but the CLIENT
run itself has not been repeated on r5.

O.8.5-S4 — MIXED PRE-CHECK BUNDLES (u OTO'd, six pieces clean)
================================================================

WHAT THIS IS
  One stitched, paste-ready artifact:
      a (clean) + m (clean) + u (AGENT-OBFUSCATED) + n1 (clean) + e (clean)
      + n2 (clean) + aux (clean)
  Purpose: verify that the final shard set works when the unlock shard u carries its
  OTO (obfuscated) form while the other six are still clean — the exact mixed state
  the full OTO handoff will be built from. If anything is wrong, we fix it BEFORE
  the user-side obfuscator.io passes on the six.

ARTIFACT
  O8.5-S4-mixed-uOTO.js        209,705 bytes
  sha256 8bc342110eb4dcd5bba6fef0ec2201f4c52071e6e86ad7e39af2c5eda4f73fc8

u SOURCE (regenerated from the FINAL shard)
  input : s4-shards/shards/shard-u.js      sha256 7bd3d77960abc3794148193893c125f2f428e96d60d51c973121e84db938e63f
  output: s4-oto/u/shard-u-out.js          sha256 d653208d11e62565c46d08c805cc5b44815c383064229132ba638a9adb6d4a4d
  script: s4-oto/scripts/obf-u-canon.js (deterministic; seed c8d4a17e)
  config: stringArray OFF (marker searchable), CFF/dead-code OFF, hex names,
          compact, renameGlobals OFF.

MARKER (your replace-slot, unchanged)
  Search this file for:  佐藤 結衣        (exactly ONE occurrence, inside the u piece)
  Replace with your passphrase. Without the swap the run proceeds locked (fail-open);
  with it, diagnostics unlock (LOG_LEVEL 2) and the retention/companion lines appear.

VERIFIED BEFORE SHIPPING (headless, both marker states)
  - node --check: OK; stitched bytes deterministic (re-stitch x2 identical).
  - Marker: exactly 1 occurrence; survives u's obfuscation literal + contiguous
    (no \x20 escape — the script restores the space if the tool escapes it).
  - LOCKED boot: banner -> seven-pocket gate fails closed with a variant complaint ->
    "TOP-LEVEL: module ran (no throw)" -> "[Quest] Unlock passphrase rejected."
  - UNLOCKED boot: "Diagnostics unlocked for this session." ->
    3x "[O8-DIAG] Retention probe { shard: m|e|aux, typed: true,
    decodedTablesRetained: 0 }" ->
    "[O8-DIAG] Companion check complete { ready: true }" (emitted BY the obfuscated u)
    + Companion readout. No throw in either state.
  - Duplicate-paste guard: pre-armed second run refuses ("An O.8 run is already active").
  - Camo survived the u pass and the stitch: RLO=7 / PDF=7 (one per piece),
    ZWJ/ZWNJ woven, ZWSP strings-only, LRM=0.
  - Residue scan on the bundle: /intake, 201f1688, [MemberCount], Still watching,
    https://, quest-suite all 0. No debugger/eval. console.clear() first statement.
  - Heap probe (C5) on the unlocked bundle: 10/10 sensitive needles = 0.

WHAT THIS DOES *NOT* COVER (expected — that is why you test live)
  - Headless there are no webpack pockets, so the gate always fails closed here.
    In the client it must PASS the gate and proceed to quest processing.
  - Real quest execution (network layer, pacing, refills) and long-run stability.
  - The six pieces' obfuscator.io passes (next phase); this bundle only proves the
    clean+OTO mix is structurally sound.

IF IT MISBEHAVES, REPORT
  - the console line(s) around the failure (the [Google <word>] gate line is lexicon-
    rotated per run; wording varies, the structure does not),
  - whether the marker swap was applied,
  - and the file's sha256 (above) so we know exactly what you ran.


================================================================
r2 — TERM SWEEP + UNLOCK-TERM BREAKDOWN (2026-09-10)
  O8.5-S4-mixed-uOTO-r2.js   sha256 b5ff6bbbb1fc6eca5c08d41d269fb947e16429819fdfc1acd32f20f7bcf08725
  u source: s4-oto/u/shard-u-out.js sha 1d1fba0bb771bf3a6beb1d2f2410838a38179e59432258f7b9f882f286c1796e

CHANGES vs the v1 file you tested (v1 PASSED live — its log is recorded in the register):
  - Wording de-conspicuoused: "Companion ..." diags -> "Session ..."; probe payload
    {shard,pools,typed,dataExports,decodeOk,decodedTablesRetained} ->
    "Store check" {unit,stores,packed,exports,sample,retained}; config flags renamed to
    bland forms (auxUnit/entryCheck/stringVariants/glyphVariants/digestForm/routesForm/
    mcForm/storeCheck/storeForm).
  - The unlock property is now built from char codes in BOTH shard-a and shard-u, so no
    literal "GoogleUnlock" exists anywhere in obfuscated output (runtime name unchanged).
  - The "Experimental configuration" diag now QUEUES and prints on unlock (previously it
    ran before the unlock opened diag and was silently swallowed — the change-flags were
    never visible; now they are, as the first line after "Diagnostics unlocked").
  - Marker 佐藤 結衣: unchanged semantics; swap = same phrase; exactly ONE occurrence.

EXPECTED on unlock (r2): "Experimental configuration {...}" then three "Store check"
lines then "Session check complete { ready: true }" + "Session readout { units: 1,
strings: 'varied' }". Locked run: same as before ("Unlock passphrase rejected.").

Re-verified headless on r2: syntax, deterministic stitch, both marker-state boots,
duplicate-paste guard, camo survival, residue scan (all swept terms 0; marker 1),
C5 heap probe PASS.
