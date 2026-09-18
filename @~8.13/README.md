# JSArchive — O8.13

## If you only want one thing

**Paste `Working-Stable/O8.13/O8.13-runner-e008b377.js`.**

That file is the entire deliverable. It is self-contained — the cover image is embedded, there is
no `fetch`, no external asset. Nothing else in this repository needs to leave this machine.

The `e008b377` in the name is the first 8 hex of that file's own SHA-256. If a filename's hash
doesn't match its bytes, the file is stale. Check with:

```bash
node verify-golive.mjs
```

Then read **`GO-LIVE.md`** (what to paste, the pre-paste checks) and **`MANIFEST-FEATURES.md`**
(which requested features are actually in this build, and how each was verified).

---

## Directory map

| path | files | what it is | do you ever need it? |
|---|---|---|---|
| **`Working-Stable/O8.13/`** | 11 | **THE DELIVERABLE.** Live build, self-identifying filenames. | **Yes — this is the one.** |
| `GO-LIVE.md` | 1 | Paste instructions, the 9 files explained, pre-paste checks. | Yes, before pasting. |
| `MANIFEST-FEATURES.md` | 1 | Feature → build mapping. Answers "is my feature in this file?" | Yes, when in doubt. |
| `verify-golive.mjs` | 1 | Integrity + stale-copy sweep. Exit 0 = safe to paste. | Yes, any time. |
| `Active/O8.13/` | ~190 | **The live source bench.** Shards, obfuscation scripts, dictionaries, tools. The build runs from here. | Only to rebuild or edit. |
| `Active/Stego/` | 53 | Carrier builder + the tier test suite. | Only to rebuild or verify. |
| `Active/engines/` | 9 + `node_modules` | The obfuscation engines. `node_modules` is gitignored (245 MB) — `cd Active/engines && npm install`. | Only to rebuild. |
| `Archives/packages/` | 69 | **Frozen lines**: O8.13 (live, byte-identical mirror), O8.11, O8.9, O8.8. Canonical pipeline filenames. | No — history. |
| `Archives/INDEX.md` · `RETIRED.md` | 2 | What was kept, what was superseded, with hashes. Read before assuming anything is lost. | When archaeology is needed. |
| `Handoff/` | 32 | **Start with `Handoff/HANDOFF-NEXT.md`** — written to be read cold. Then `CHANGELOG.md` for reasoning. | Yes, for context. |
| `Uploads/` | 8 | **Build inputs.** `stego2-cover-1024-scaled.bmp` is the clean 1024×768 cover the carrier is built into. Not a deliverable — it contains no payload. | Only to rebuild. |
| `uploads/` | 1 | `unicode_list.csv` (889 KB), the source data for `dict-augment.mjs`. Lowercase by accident; **do not merge into `Uploads/`** — the script reads this exact path. | Only to rebuild dictionaries. |
| `8.13-SF/` | ~50 MB | **Saved Files / Superfluous Files.** Staged for upload to `<repo>/@~8.13/8.13-SF` on GitHub. Contains `_COMPRESSED-HISTORY/` (historical tarballs), `_BACKUPS/`, `Docs/`, `shards-history/`, `@~8.12/`, `WORKSPACE-STATUS.md`, `README.md.old`. Once pushed to GitHub, safely remove from sandbox root (`rm -rf 8.13-SF`) to leave sandbox at ~52.8 MB. | No — context staged for repo. |
| `tools/` | 2 | Auto-trim and repo restore scripts. | Rarely. |

**421 files total** (excluding gitignored `node_modules`). Of those, **1 is the deliverable**,
~250 are the build bench, and the rest are history and context.

---

## Naming rule

A deliverable filename states its line and its own hash:

```
O8.13-runner-e008b377.js
└┬─┘ └─┬──┘ └───┬────┘
line  role   first 8 of its own sha256
```

The frozen archive under `Archives/packages/O8.13/` keeps the pipeline's internal names
(`O8.12-runner.js`, `O8.6-Final-final-bundle.js`) because the build scripts write those names and
the frozen `SHA256SUMS.txt` lists them. **Same bytes, two names.** The `Working-Stable/` name is
the one you read; the archive name is the one the toolchain writes.

This exists because `O8.6-Final-final-bundle.js` meant five different builds across five line
directories, and the O8.13 runner was called `O8.12-runner.js`. Neither name told you what was
inside. See `MANIFEST-FEATURES.md` for the full rule.

---

## Rebuilding

The cascade, in order — proven, and the only way to reproduce these bytes:

```bash
cd Active/engines && npm install && cd ../..
node Active/O8.13/oto/scripts/obf-strings-g7.js
node Active/O8.13/oto/scripts/obf-v1-s3matrix.js
node Active/O8.13/oto/scripts/obf-minify-family.js
node Active/O8.13/oto/scripts/obf-u-canon.js
node Active/O8.13/oto/scripts/obf-u-per-type.js
node Active/O8.13/oto/scripts/build-s4-final-package.js
node Active/O8.13/oto/scripts/run-25pass-battery.mjs                      # expect 25/25
node Active/Stego/build-stego12-r2.mjs <bundle> Uploads/stego2-cover-1024-scaled.bmp <out-dir>
node Active/Stego/test-stego11-tiers.mjs <runner> <cover> \
     Uploads/stego2-cover-1024-scaled.bmp --debug-name='佐藤 結衣'          # expect 43/0
rm -rf ~/.npm     # the npm cache is ~86 MB and lands inside the workspace snapshot
```

**Passwords are never stored in files.** Five slots, ephemeral argv only, in this order:
`pwDbg pwRes pwAK pwView pwRcd`. Ask the operator; verify by `S8 PASS`; never guess.

Full detail, gotchas and the exact verification set: `Handoff/HANDOFF.md`.

---

## State as of 2026-09-17

Live build `ef1dac5e02a6…` (runner `e008b377…`), frozen on the operator's explicit go-live.
Battery **25/25** · tiers **43/0** · gated `S8 S9 S10 S12 S15` × 2 targets **10/10 ALL PASS** ·
16-point **14/16** · `sha256sum -c` **9/9 OK**.

**The Discord paste test has not been run.** Everything above is automated; the end-to-end
confirmation in a real client is still outstanding.

Open items are listed honestly in `MANIFEST-FEATURES.md` under *NOT in this build*.
