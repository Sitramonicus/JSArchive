# 🟢 GO LIVE FROM HERE — O8.13

**The one directory that matters:**

```
Working-Stable/O8.13/
```

Paste **`Working-Stable/O8.13/O8.13-runner-e008b377.js`** into Discord. That is the deliverable.

The `e008b377` is the first 8 hex of that file's own SHA-256 — the name is self-verifying, so a
stale copy cannot carry it. Same for `O8.13-bundle-ef1dac5e.js`.
Everything else in this repo is source, tooling, history, or a frozen older line.

Frozen 2026-09-17 · instance `7e953faa` · BUILD-SEED `851b28e5` · rotation `o812`.

---

## The 9 files, and what each one is for

| file | bytes | sha256 (first 12) | what it is |
|---|---|---|---|
| **`O8.13-runner-e008b377.js`** | 3,371,189 | `e008b37736ce` | **← PASTE THIS.** Self-contained: BMP is embedded, no `fetch`, no external cover. |
| `O8.12-cover.bmp` | 2,359,350 | `627ae142f2fd` | The photo the runner carries. **Do not paste this.** Kept so the build is reproducible and so the tier suite can re-verify it. |
| `O8.13-bundle-ef1dac5e.js` | 1,873,322 | `ef1dac5e02a6` | The payload source, before stego. Not pasted; the runner already contains it. |
| `stego11p-real.min.js` | 1,613,098 | `d89930d23603` | The real tier's minified source (T2). |
| `stego11p-decoy.min.js` | 3,112 | `55895e58b97e` | Pixel Garden decoy (T1). |
| `stego11p-honey.min.js` | 1,232 | `f84995d19017` | Courtesy-board honey. |
| `stego11p-tube.min.js` | 2,244 | `9dad7c20adbf` | Sealed tube vault. |
| `SHA256SUMS.txt` | 764 | — | **The authority.** If a file's hash isn't in here, it isn't part of the build. |
| `BUILD.json` | 3,396 | `98cb41b5` | Provenance + the honest not-implemented list. |
| `ARCHIVE.txt` | 4,900 | — | Human-readable build note + the go-live caveat below. |

`Archives/packages/O8.13/` holds the **same bytes** under the pipeline's internal names
(`O8.12-runner.js`, `O8.6-Final-final-bundle.js`) — that is what the build scripts write and what
the frozen `SHA256SUMS.txt` lists. Two names, one build. **Use `Working-Stable/O8.13/`**; its names
are the ones that tell you what you are holding.

---

## Before you paste — one command

```bash
cd /home/user/Working-Stable/O8.13 && sha256sum -c SHA256SUMS.txt
```

Nine `OK` lines and nothing else means these are the bytes that passed the gate suite. `node verify-golive.mjs` from the repo root does the same thing plus checks the static build pins
and lists every lookalike file elsewhere in the tree, so you can see at a glance which copies are
the same bytes and which are not.

### The boot line, and a trap in checking it

In Discord the runner must announce:

```
[Host 8.12] initialized — worker instance 7e953faa.
```

If the instance id is anything other than `7e953faa`, **you are running a stale build.** Stop.

Two things worth knowing, both of which I got wrong the first time and have now corrected:

- **You cannot grep the runner for `7e953faa`.** Zero hits on a perfectly good build. The instance
  id is derived at runtime via `toString(16)` — never stored as a literal. Same for seed
  `0x6d7f0c87`, salt `0x3f72a1ec` and dseed `52375`. That is the obfuscation working.
- **The runner prints nothing under `node`.** That is stealth mode (会員 = 2, strict silence
  outside Discord), not a failure. Don't mistake silence for a dead build.

What *is* statically checkable, and what `verify-golive.mjs` uses: loader pins `681f66ff` and
`c755a5f8` in the runner, G8 pins `2c5117b5` and `248c1e0b` in the bundle. For real proof run the
43-assertion tier suite — the exact command is printed by the checker, and it currently returns
**43 passed, 0 failed** against `Working-Stable/O8.13/`.


---

## ⚠️ The caveat, so it can't be forgotten

The automated gate set is green — battery 25/25, tiers 43/0, gated `S8 S9 S10 S12 S15` × 2 targets
= 10/10 — **but the Discord paste test has not yet been run against these bytes.** That end-to-end
confirmation is the operator's to do. This is a go-live *candidate* that is frozen and verified up
to the point where only a real client can confirm it.

Also still the operator's, before anything is pushed anywhere: rotate the five console passwords
and scrub them from history. The repo measured `private=False` and four handoff snapshots under
`Active/O8.13/` and `Active/O8.12-r4/` still hold all five in plaintext.

---

## What is NOT the deliverable (the decoys that caused this question)

| path | what it actually is |
|---|---|
| `Active/Stego/stego-r5/output/` | The build output these were copied *from*. Same hashes. Ignore it — use `Working-Stable/`. |
| `Active/O8.13/final-package/` | Build intermediates. Its `SHA256SUMS.txt` names exactly 3 files and they now match the directory exactly. |
| `Active/O8.12-r4/` | **FROZEN PREVIOUS LINE**, bundle `1e03f483`, 1,660,881 B. Not live. Its carrier was garden-broken. Marked in place. |
| `Archives/packages/O8.11/` `O8.9/` `O8.8/` | Older frozen lines (`fb32c3a8`, `79c74331`, `5de1b5b0`). History only. |
| `Uploads/stego2-cover-1024-scaled.bmp` | **Blank clean cover** — build *input*, hash `d53a2574`. Not a carrier, contains no payload. |
| `Uploads/stego2-cover.bmp` | The old 800×660 source. Input only. |
| `_ARCHIVE_TRIM/` `_COMPRESSED-HISTORY/` | Compressed superseded carriers and old history. Nothing runnable. |

### Two traps that have now been removed

- **`Active/O8.13/final-package/O8.12-r2-Final-bundle.js`** — a 1,873,274 B file sitting next to the
  real 1,873,322 B bundle, differing by 48 bytes. It was a byte-identical *second* write from the
  builder under a legacy name (plus `-gzip.js` / `-deflateraw.js` twins, md5-identical to the
  canonical files). Nothing read those names. Deleted, and `build-s4-final-package.js` no longer
  writes them, so they cannot come back. Same cleanup was already done for `O8.12-r3`.
- **`Archives/Archives/packages/`** — a 17 MB accidental duplicate created by a bad extraction
  flag. Deleted after verifying it was byte-identical to `Archives/packages/`.

---

## Still not implemented (unchanged by this cleanup)

TRP-E cross-pocket decoy · W-full honey-count jitter · CAR-M 2-bit dither · H `shard-e` split ·
D true 4-way · DIC-E/F/G · wasm (CSP-blocked) · the comprehensive naming scheme (proposed, never
approved — this cleanup is a local fix, not that scheme) · Pt13 salted digest · `jso∩runner = 340`.

Full detail in `Archives/packages/O8.13/BUILD.json` and `Active/O8.13/AVENUES-O8.13-COLLATED.md`.
