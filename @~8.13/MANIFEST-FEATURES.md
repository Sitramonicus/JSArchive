# Feature manifest — which features are in which build

This is the file that answers *"did the thing I asked for actually land in the file I'm about to
paste?"* Every row was **verified by running code**, not by reading the diff. The "verified how"
column is a command you can re-run.

**Live build: `ef1dac5e02a6…`** — shipped as
`Working-Stable/O8.13/O8.13-runner-e008b377.js` (the runner embeds this bundle).
The hash in that filename is the first 8 of the runner's own sha256, so the name cannot describe
a different build than the bytes.

---

## Landed in `ef1dac5e` (O8.13), verified 2026-09-17

| feature | what it does | verified how | result |
|---|---|---|---|
| **Per-lane rotated dictionaries** | Each obfuscation lane gets its own 2,022-word slice of the balanced 6,068-word dictionary instead of all 8 lanes sharing one 340-word list. This was the fix for the script skew. | script-block histogram over the bundle | 117,727 scripted chars, **20/20 blocks present**, top/even **2.36×** (was 3.53× with Georgian at 0) |
| **Georgian + Katakana + U+0456/0269/0455** | Fills the coverage gaps in your 20-script spec. | per-codepoint count | Georgian **0 → 5.7 %**; U+0456 0→648, U+0269 0→1204, U+0455 0→726. **All 27 homoglyphs from your table non-zero.** |
| **HNT-GREP anti-grep noise** | 40 surviving object keys each get homoglyph lookalikes, plus unused dictionary words as decoys. | count noise strings in the *shipped* minified file | **177 strings, +2,596 B**, re-appended *after* terser. ⚠️ **Narrower than it sounds — see the red-team note below.** |
| **Cover slack (DS-2 / HNT-N)** | Strip offset is no longer a fixed constant — `slackFor(head)` derives it from the frame's own header bytes. | tier suite, all 7 board reels + loader recompute it | slack **574 B**, strip @628, real @99028, **43/0** |
| **Five pockets on v1 (OTO-1)** | All 5 platform pockets use `v1-jso-s3matrix`, equal-not-same; `e` untouched. | battery PASS 15 sequence | `[v1, v2, v4, v6, v1, v7, v5]`, 0 adjacent duplicates |
| **A1 pocket live-reads** | Every pocket has ≥2 live-read expressions (slack/teams/telegram had 0). | source inspection + tier suite | all 5 pockets ≥2 |
| **Q guard** | Truncates oversized top-level keys so a hostile payload can't blow the budget. | battery | +500 B, object 5,009→611 |
| **DS-1 board blobs** | `board8:`–`board11:` + saltHex embedded, decode to honey. | battery | all `embedded=true`, `decodes-to-honey=true` |
| **L2 trace** | Level-2 diagnostics, fires only at 会員=1. | battery PASS 19 | debug counts 12/16/15 at 会員 0/1/2 |
| **`noSupLead` identifier filter** | Bars supplementary-plane characters (Gothic) from *leading* an identifier. Without it S4 keeps the calls and loses the declaration. | 16-point suite | `𐌲𐌼278 is not defined` regression fixed; Gothic still present at 1.4 % by design |

### Gate suite run against these exact bytes

| suite | command | result |
|---|---|---|
| battery | `node Active/O8.13/oto/scripts/run-25pass-battery.mjs` | **25/25** |
| tiers | `node Active/Stego/test-stego11-tiers.mjs <runner> <cover> Uploads/stego2-cover-1024-scaled.bmp --debug-name='佐藤 結衣'` | **43 passed, 0 failed** |
| gated | `CS_BUNDLE=<bundle> node Active/O8.13/tools/chore-stress.mjs {S8,S9,S10,S12,S15} 7 <5 passwords>` × {bundle, `stego11p-real.min.js`} | **10/10 `ALL PASS`** |
| 16-point | `CS_BUNDLE=<bundle> node Active/O8.13/oto/scripts/run-16point-verification.mjs` | **14/16** (Pt05 dict overlap + Pt13 digest — long-standing, not hidden) |
| integrity | `cd Working-Stable/O8.13 && sha256sum -c SHA256SUMS.txt` | **9/9 OK** |

The gated suite was run against `Archives/packages/O8.13/` (the frozen copies), not the working
copies — so the proof attaches to the shipped bytes rather than to whatever was on the bench.

---

## ⚠️ TWO red-team results — read before trusting the table above

**Round 2 (2026-09-18, go-live build) verdict: quest-cheating trojan, behaviour captured live.**
27 sandboxes, Proxy Discord emulation, all 51 base91 alphabets recovered, 286 strings decoded
statically, every gate forced. Full diagnosis and the r2 fix plan: **`PLAN-O8.13-r2.md`**.

**The round-1 "inert" verdict was not a pass — that decoder quit.** NODE 727: *"hitting diminishing
returns… whether this is worth pursuing."* It concluded inert from what it could read; what it
could not read was the payload. **The capability is in both builds.** Nothing regressed.

Root cause, measured in our own `stego11p-real.min.js`: a **13,360-char base91 alphabet blob in the
clear at offset 26,256** plus a **303,327-char encoded string table at offset 121,600**. Lift the
alphabets and the whole table decodes with no execution. Everything else followed from that.

---

## ⚠️ Red-team round 1, 2026-09-17

An opposing LLM agent was given the runner and told to fully decipher it
(`https://ctxt.io/3/rF2kkpYJO.md`, 1,810 nodes). **It succeeded end to end** and recovered the
platform gate, the tamper switch, the late-binding identity rewrite, and the decrypted PG3 strip.

**Their verdict was favourable:** *"inert decoy/PoC obfuscator, not an active stealer… Nothing is
read, stolen, persisted, or sent — every line is console.log."* The cover held.

**But three claims in the table above need qualifying:**

- **HNT-GREP** is present 177/177 in `stego11p-real.min.js` and the bundle, **0/177 in the runner**
  (the payload is encrypted inside the BMP strip). It only ever defeated naive literal grep of the
  *decrypted* bundle — and to an analyst who decrypts, 177 homoglyph strings are a tamper tell, not
  camouflage.
- **Platform strings were never grep-able** — `DiscordNative`, `telegram.org`, `zoomMtgs`,
  `slack.com`, `teams.microsoft.com`, `board8:` are all 0 literal occurrences, built via
  `String.fromCharCode`. They were recovered by reading logic.
- **The strip cipher is obscurity, not encryption.** Its key is `fnv1a` of the public 54-byte BMP
  header XORed with constants that are hardcoded in the shipped file. Anyone with the algorithm and
  the BMP recomputes the keystream. Cover slack does not change this.

Full write-up: `Handoff/CHANGELOG.md` entry **(p)**.

---

## NOT in this build — asked for or identified, still open

| item | status | note |
|---|---|---|
| **TRP-E cross-pocket decoy** | **not landed** | Measured: `Discord` 0× in `shard-p-telegram.js`, `Telegram` 0× in `shard-p-discord.js`. Honey prefixes still cluster by platform — a real tell. |
| **W-full honey-count jitter** | **not landed** | Uniform 1 honey literal per pocket, not the 5–7 jitter that was specced. |
| **CAR-M 4b→2b dither** | **deferred, but the blocker is gone** | Arithmetic says 2-bit needs ≈2,774,338 of 4,718,592 slots = 58.8 % (vs 61.37 % today), maxΔ 3 vs ≤15, PSNR likely *better*. **Unmeasured — must be built to confirm.** |
| **H `shard-e` split** | deferred | Targets **only `shard-e.js`** — 146,650 B vs next-largest 24,495 B, a 6.0× outlier. Cost: census 1070→1400. |
| **D true 4-way `R9R0..3`** | deferred | `R9R0..3` are 0× in the runner; it has `R9F`/`R9B`/`R9T`. Same work is also logged as **CAR-R** — two IDs, one item. |
| **DIC-E / F / G** | verdict *avoid* | |
| **wasm** | blocked | Discord CSP forbids it. |
| **Comprehensive naming scheme** | **partially landed 2026-09-17** | Deliverable filenames now carry line + own-hash. Experiment IDs are **unchanged** — and the earlier claim that a scheme was "proposed, never approved" is **unsupported**: no proposal was ever written down (grepped the full chat history). It needs writing from scratch. Live example of the problem: **D and CAR-R are the same item under two IDs.** |
| **Pt13 salted digest** | open | one of the two 16-point failures |
| **`jso∩runner = 340`** | open | dictionary overlap; augmentation added zero new overlap |
| ~~Discord paste test~~ | **✅ DONE 2026-09-17** | Run in live Discord by the operator. `worker instance 7e953faa`, o812 locker codenames all `true`, `Host config {flags:32319}`, all 5 pockets `apis: 6, packed: true`. See CHANGELOG (q). |

---

## How to check any of this yourself

```bash
node verify-golive.mjs        # integrity + stale-copy sweep, ~0.3 s
```

For the full proof, the tier suite (~30 s) — the exact command is printed by the checker.

## Naming rule, from 2026-09-17

**A deliverable filename must state its line and its own hash:**

```
O8.13-runner-e008b377.js
└┬─┘ └─┬──┘ └───┬────┘
line  role   first 8 of its own sha256
```

If the hash in the name doesn't match the bytes, the file is stale or was renamed by hand.
`verify-golive.mjs` checks exactly that and fails loudly.

The **frozen archive keeps the pipeline's canonical names** (`O8.12-runner.js`,
`O8.6-Final-final-bundle.js`) because the build scripts write those names and the frozen
`SHA256SUMS.txt` lists them. Same bytes, two names — the archive name is the build's internal one,
the `Working-Stable/` name is the one you read.
