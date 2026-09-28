# JSArchive — O8.14 (frozen) · O8.15 (empty)

## Current state — 2026-09-22

**O8.14 is FROZEN at build 23.** The paste target is:

```text
Working-Stable/O8.14/O8.14-runner-ad898afb.js
```

Freeze record with digests, verification and provenance: `Working-Stable/O8.14/FROZEN-2026-09-22.md`.
Both mirrors (`Working-Stable/O8.14/`, `Archives/packages/O8.14/`) hold digest-identical bytes and verify
8/8 against their `SHA256SUMS.txt`.

**O8.15 has nothing in it.** No plan, no branch, no build — only the carried-forward list in
`Handoff/O8.15-BACKLOG.md`, which is mostly questions for the operator rather than work.

**O8.13-r3 is the immutable previous line** (`Working-Stable/O8.13/`, `GO-LIVE.md`). It is not the active
line and must not be overwritten, renamed or rebuilt in place.

Previous 8.14 builds are superseded. Do not paste `71b73a15` (build 22), `4bdc2279` (20), `da36606e` (19),
`b5773b53` (18), `42b84dc8` (17), `a3de4ad2` (16), `96073d39` (12) or anything older. Build 22 is preserved
bit-exactly in `Archives/rollback-b22/` because the js-confuser stage is not seed-reproducible.

## Start here

1. `Working-Stable/O8.14/FROZEN-2026-09-22.md` — the freeze (identity, digests, how to verify).
2. `Working-Stable/O8.14/README.md` — how to use the pack; the four live-test modes.
3. `Handoff/O8.15-BACKLOG.md` — everything not done, with what each item needs.
4. `Handoff/HANDOFF.md`, `Handoff/HANDOFF-NEXT.md` — the running handoff set.
5. `Handoff/CHANGELOG.md` — full change history (build 23 is the last entry on this line).

## Directory map

| path | role |
|---|---|
| `Working-Stable/O8.14/` | **frozen 8.14 pack** — paste runner, cover, bundle, payload, decoy/honey/tube, rotation, SHA256SUMS, freeze record |
| `Working-Stable/O8.13/` | immutable O8.13-r3 pack (previous line) |
| `Archives/packages/O8.14/` | canonical archive mirror of the frozen pack (digest-identical to the working mirror) |
| `Archives/packages/O8.13/`, `O8.13-r3/` | immutable O8.13 archives |
| `Archives/rollback-b22/` | the only bit-exact rollback point for 8.14 (build 22) |
| `Active/O8.14/CC-33/` | the 8.14 line as built: `shards/` sources, `oto/` pipeline (seed `851b28e5`), `final-package/`, `stego-build/`, `reports/` evidence logs |
| `Active/O8.13/`, `Active/Stego/` | retained sources/tools for the previous line and the stego builder |
| `Active/engines/` | build dependencies; `node_modules/` is git-ignored and reinstalled on demand by `tools/cc33-build.sh` |
| `Handoff/` | freeze/incident/trace records, changelog, handoff set, 8.15 backlog, this export plan |
| `Analysis/` | redteam dumps and deobfuscation notes (payload text dump lives here) |
| `tools/` | the check battery: `board.sh`, `chain-revive-check.mjs`, `gate-replay.mjs`, `hold-check.mjs`, `repaste-check.mjs`, `leakcensus.mjs`, `dangling-refs.mjs`, … |
| `Uploads/` | clean carrier source used by the board (`stego2-cover-1024-scaled.bmp`) |
| `uploads/` | historical agent-run dumps (redacted); not pack content |
| `Documentation/` | supporting notes |

## Rebuilding on a fresh clone

```bash
bash Active/O8.14/CC-33/tools/cc33-build.sh      # installs engines/node_modules on demand; seed 851b28e5
```

The build reproduces **structure and behaviour**, not identical bytes: the v2-jsc (js-confuser) stage is not
seedable, so payload digests move build to build. That is why frozen artifacts are shipped in the mirrors
and why a rollback copy is kept by hand.

## Contributing / state rules

- Frozen means frozen: no edits to the eight artifacts in `Working-Stable/O8.14/` or to O8.13-r3.
- New work belongs to a new line (8.15) and starts from `Handoff/O8.15-BACKLOG.md`.
- Passphrase slots are **never** written to files; they are supplied per-invocation only. This workspace was
  scrubbed on 2026-09-22 — see `Handoff/GITHUB-EXPORT-2026-09-22.md` §3 for what was removed and the one
  documented exception (`ripcord`).

## O8.15 saved context

The move-ready O8.15 SF folder is `/home/user/8.15-SF/`. It is intended to move as one directory to
`@~8.15/8.15-SF/` in JSArchive. Do not remove it locally until the GitHub archive checksums verify.
