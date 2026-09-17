O8cmp working tree — directory guide (cleaned 2026-09-10)

ACTIVE (the current deliverable line)
  s4-shards/    7 clean comment-free pieces (a, m, u, n1, e, n2, aux) = single source
                of truth for the S4 sweep + stitch-o85.py + tools/ (post-OTO micro-passes)
                + README.txt (order, marker swap UI, checkpoint blocks) + SHA256SUMS.txt
                + TRANSPORT_SHAPE.md (D-phase audit). A+B+C+D complete on this set.
  s4-oto/       PARKED OTO placeholder (v1 jso-s3matrix / v2 jsc / v3 jso-lite / u canon)
                + scripts/obf-*.js. Built against A+B-only shards: REGENERATE from the
                final s4-shards/ set (see README.txt inside + tools/harness/README.txt).
  cores/        o85-shard3-enc-core.js — regeneration seed for the next round.
  release/      frozen release bundles: O8.5-Shard-2/ , O8.5-Shard-3/ (+ zips). Source of
                the V1 replication; O8.5-Shard-3/ carries OBFUSCATION_SETTINGS.md + dict.
  seamless/     O8.5 seamlessness trial (jsc/ + jso/ engine package.json homes, trial
                outputs, TECHNIQUE_MAP.md, COMPRESSION_MAP.md, RESULTS.md, SHA256SUMS).

SUPPORT
  docs/         every record/plan/triage/register .md (S4 register, S4 plan, VM
                feasibility, Shard records, Juggler records, FLAGS assessment, ...).
                Records written before 2026-09-10 may reference bare filenames that now
                live under builds/ or tools/ — resolve by name, not by old path.
  builds/       all standalone .js artifacts, O7.38 → O8.5 (incl. O8.5-Shard-3.js
                stitched, O8.4.3.js frozen, O8.5-current-obf-edit.js).
  tools/        builders/generators/tests (.py + juggler-*.js + unlock-unit.js +
                juggler-strings.json) + harness/ (top-level boot rig: discordlike.mjs,
                test-var.mjs, marker-swap.py, README.txt).
                NOTE: tools/stitch-o85.py is the historical copy; the LIVE stitcher is
                s4-shards/stitch-o85.py (part of the hash-pinned bundle).
  attic/        superseded intermediates and dead ends: shard-out{,2,2-stripped,3}/,
                obfkit/ (defunct npm kit), o742 attempts, raw dumps, stray lockfile.
                Nothing here is part of the live line; regenerators write their
                historical outputs here (paths patched in tools/*.py).

OUTSIDE THIS TREE
  ../HANDOFF.md      master continuation document — START THERE (zero-context).
  ../repo/           local checkout of the JSArchive GitHub archive (O7-era content +
                     some later updates; uncommitted changes present; lags o8cmp).
  ../uploads/        user-supplied artifacts (obfuscated.js = user-obfuscated O8.4.3,
                     analyzed in docs/O8.5_VM_OBFUSCATION_FEASIBILITY.md §9).
