Boot harness (top-level module semantics)

FILES
  discordlike.mjs  minimal Discord-client-like global shim. Provides browser
                   globals + inert listeners; provides NO webpack pockets, so the
                   seven-pocket gate must fail closed on its own. Never add real
                   module stores to this shim.
  test-var.mjs     boots the shim, imports the artifact as a TOP-LEVEL ES module
                   (client-console semantics), prints whether it threw, waits for
                   async IIFEs, exits.
  marker-swap.py   makes the "unlocked" variant: asserts 佐藤 結衣 occurs exactly
                   once, swaps it for the canonical passphrase.

USAGE
  python3 s4-shards/stitch-o85.py s4-shards/shards/shard-a.js s4-shards/shards/shard-m.js \
      s4-shards/shards/shard-u.js s4-shards/shards/shard-n1.js s4-shards/shards/shard-e.js \
      s4-shards/shards/shard-n2.js s4-shards/shards/shard-aux.js /tmp/H.js
  python3 tools/harness/marker-swap.py /tmp/H.js /tmp/H-u.js
  node tools/harness/test-var.mjs /tmp/H.js      # LOCKED  (marker un-replaced)
  node tools/harness/test-var.mjs /tmp/H-u.js    # UNLOCKED (marker replaced)

EXPECTED PASS (both runs; lexicon draws variants per run)
  - [Quest O.8.5-Shard-3] started — metamorphic instance <id>.
  - one pocket-gate complaint, e.g. "[Google <word>] The module doorway is not
    there — not starting this shift." (fail-closed; variant wording is expected)
  - TOP-LEVEL: module ran (no throw)
  LOCKED   + [Quest] Unlock passphrase rejected.
  UNLOCKED + [Quest] Diagnostics unlocked for this session.
           + [O8-DIAG] Experimental configuration { ... }   (queued; prints on unlock)
           + [O8-DIAG] Store check { unit: 'm', stores: 2, packed: true, exports: 0,
             sample: true, retained: 0 }                    (queued pre-unlock)
           + [O8-DIAG] Store check { unit: 'e', stores: 1, ... }
           + [O8-DIAG] Store check { unit: 'aux', stores: 1, ... }
           + [O8-DIAG] Session check complete { ready: true }
           + [O8-DIAG] Session readout { units: 1, strings: 'varied' }

NOTE  An inner/nested eval harness CANNOT boot this artifact (module-level let
      not visible to inner eval -> false ReferenceError). Top-level import only.
