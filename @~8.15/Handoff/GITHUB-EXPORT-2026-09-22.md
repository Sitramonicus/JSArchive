# GitHub export — preparing `8.14-Working` (2026-09-22)

**Nothing has been pushed, and no repository has been initialised.** This file is the plan for the move
you described; the git commands at the bottom are yours to run (or tell me to).

## 1. Name

GitHub repository names allow only `A-Z a-z 0-9 . _ -`. **`@~8.14-Working` is not a valid repo name** — it
works as the internal alias (`@~8.14/…` in the existing docs), but the repo itself wants something like:

```text
8.14-Working          (or)  o8.14-working
```

I have not renamed anything in the workspace, so the alias in your docs still resolves to whatever you
create.

## 2. What will be tracked

| path | why it is in the repo | size |
|---|---|---|
| `Working-Stable/O8.14/`, `Working-Stable/O8.13/` | the frozen packs (paste targets) + READMEs + SHA256SUMS | 20.0 MB, 22 files |
| `Archives/packages/`, `Archives/rollback-b22/` | canonical archive mirrors + the bit-exact b22 rollback | 42.3 MB, 40 files |
| `Active/O8.14/` | shard sources, build pipeline, reports/evidence logs for the current line | 40.5 MB, 685 files |
| `Active/O8.13/`, `Active/Stego/` | retained sources/tools for the previous frozen line and the stego builder | 1.0 MB, 74 files |
| `Handoff/`, `tools/`, `Uploads/`, `Analysis/`, root docs | handoff set, check battery, clean cover source, redteam dumps, freeze records | 10.1 MB, 68 files |
| `uploads/` | one historical agent-run dump (redacted — see §3) — **candidate for exclusion** | 3.6 MB, 1 file |

**Excluded by `.gitignore`:** `Active/engines/node_modules/` (246 MB, reinstallable with `npm ci` — the
build script installs it on demand), `.npm/` (87 MB cache), sandbox/editor/OS noise. Verified with a dry
pattern check: those paths ignore, the pack artifacts stay tracked.

**Measured tracked total: 117.7 MB across 908 files**, largest file 3.6 MB (`uploads/` dump), nothing over
10 MB — so no Git LFS is needed and no GitHub size limit is anywhere near. (`du` reports far more because
it counts allocation: `Active/engines/node_modules` alone is 246 MB and `.npm` is another 87 MB, both
ignored.) `.gitattributes` keeps carriers and engine binaries out of line-ending normalisation and
marks the single-line runners/payloads as `-diff` so diffs stay readable.

## 3. Secrets — what was done, and the one open decision

**Redacted across the workspace (2026-09-22, before any push):**

| literal | where it was | now |
|---|---|---|
| the `pwdDbg` phrase | `Handoff/CHANGELOG.md`, `uploads/…agent-run….txt` | `<dbg-slot literal withheld>` |
| the `pwdRes` value | `Handoff/O8.14-TRACE4-…md`, `Archives/RETIRED.md`, `Active/O8.13/tools/chore-stress.mjs`, the upload dump | `<res-slot>` |
| the `pwdAK` value | `Handoff/O8.14-SLOTS-AND-FALLBACK-…md`, `Archives/RETIRED.md`, `chore-stress.mjs`, the upload dump | `<ak-slot>` |
| the `pwdView` value | `Handoff/CHANGELOG.md`, `Handoff/O8.14-TRACE4-…md`, the upload dump | `<view-slot>` |

Verified after the pass: **zero** occurrences of any of the four remain anywhere in the workspace. The
slot *names* (`pwdDbg`, `pwdRes`, `pwdAK`, `pwdView`, `pwdRcd`) and the evidence they carried are intact —
only the values became labels. Test labels in `chore-stress.mjs` changed text only (e.g. `'<res-slot> call'`);
the file still parses and its behaviour is unchanged (labels are not asserted on).

Also verified: the **shipped bytes contain none of the literals** — the payload compares hashes, so no
passphrase is recoverable from the runner, payload or bundle in either line.

**Open decision — `ripcord`.** That word is both the level-1 slot value *and* a shipped verb: the T2
acceptance is literally `--debug-name=ripcord`, and the pack README tells you to call
`GoogleUblock("ripcord")`. I left it in place rather than gut the functional docs. If the repo is public and
you want it clean, the options are (a) rotate slot 1 and update the handful of doc references, or (b) accept
it as a documented, low-value key. Say which and I will do it.

## 4. Suggested push

```bash
cd /home/user
git init -b main
git add -A
git status --short | wc -l          # sanity: expect ~908 entries, none under Active/engines/node_modules or .npm
git commit -m "O8.14 frozen (build 23) + 8.15 backlog"
git remote add origin git@github.com:<account>/8.14-Working.git
git push -u origin main
```

Two notes:

1. **First commit is large (~118 MB).** That is the three-copy mirror design, not cruft. If you would rather
   the published repo carried only one copy, the archivable candidate is `Archives/packages/O8.14/` (the
   mirrors are digest-identical — `Working-Stable/` is the working one, `Archives/` the canonical one).
2. **Do not add `uploads/` if you consider it private working material** — it is the only path here that is
   history rather than pack, and it is the file the passphrase scrub touched. Excluding it is one line in
   `.gitignore`; I left it in because you have kept it through several passes.

## 5. Suggested repository front page

The root `README.md` now opens with the frozen state, the paste target and the directory map, so it works
as the GitHub landing page as-is. The three documents a stranger should be pointed at:

1. `Working-Stable/O8.14/FROZEN-2026-09-22.md` — what is frozen, digests, how to verify, provenance.
2. `Working-Stable/O8.14/README.md` — how to use the pack and the four live-test modes.
3. `Handoff/O8.15-BACKLOG.md` — everything that is *not* done, and why.
