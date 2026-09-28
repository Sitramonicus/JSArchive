# Detector postmortem — why r3 survived and CC-32 did not

**Date:** 2026-09-20 (Asia/Shanghai)
**Artifact under test:** `O8.14-runner-8963dc92.js` — paste `00775cfc…`, carrier `24b6826a…`,
stage-3 payload `5ebef0c1…` (232,051 B), shipped from `Working-Stable/O8.14/`.
**Detector runs:** `ctxt.io/3/oLdYZKUqQ.md` (run A, 8.14 paste) and `ctxt.io/3/ua7o7ALde.md` (run B, 8.14 paste,
diec-assisted). Both produced a **complete, correct unravel**.
**Baseline compared against:** r3-line runs `…1789733839891` and `…1789734700367` (plus the r3 panel inside run A).

---

## 1. The result in one line

**Layer 1 did not regress — the carrier was cracked in the r3 era too. Layer 2 regressed badly:
we now ship a small, self-labelling payload that publishes its own module map.**
r3's "win" was a *reader* failure on a 2.0 MB control-flow-flattened blob plus a detector sandbox whose
timers and probes were dead. We removed exactly the two things that made that failure possible.

---

## 2. What the detector actually did to CC-32 (the unfolding chain)

Reconstructed from run A/B. Ten steps, none of which required breaking the stego:

| # | Step | Evidence in trace |
|---|---|---|
| 1 | `curl` the paste, note banner `Pixel Garden Player v3.3.2`, `会員 = 2`, `名 = "佐藤 結衣"` | stage 0 |
| 2 | Read `r(97,116,111,98)` = `atob`, spot `eval`, `DiscordNative`, venue strings | static |
| 3 | Verify self-integrity pins `lexPinsB = ["681f66ff","c755a5f8"]` by re-computing FNV of `lexProbeL1/L2.toString()` — **exact match, untouched** | "verified exact match" |
| 4 | Un-permute 18,185 base64 chunks → 2,359,350-byte BMP; `v5 = FNV(BMP header) = 0x3f72a1ec`; `v7 = FNV(name) = 2976548990`; stretch `vz = O((v5^v7)^0x9E3779B9·vB)` (32,768 rounds) | stage 1 |
| 5 | Extract the **PG3 garden strip** (`vu = P + (vS&1023)`, XOR keystream `vd()`), gunzip → `garden.js` | stage 2 |
| 6 | Decrypt every inline table (`R9B/I/J/K/T`) → all four venue boards are byte-identical Telegram demo decoys | stage 2 |
| 7 | Extract all seven `X` lane stubs, brute `vB = 1..7` → **lane 7 = real** (`P3` magic, CRC-32, gzip magic) | "BOOM. vB=7 is the real channel" |
| 8 | Run `legacyReel`: `RS = 54 + (headerHash&1023) + 98400`, seeded Fisher–Yates, low-nibble unpack, XOR keystream, skip `32+(seed%64)` decoy prefix → **85,766 B gzip → 232 KB stage-3** | stage 2 |
| 9 | **Load stage-3 in a harness and read `globalThis._testMod`** → complete module registry (`host, log, _anteMix, _m, _wipeTables, mc, lex, timings, _carrier, r2, _e, shift, leases, _rcdGate, pockets`); dump `mod00..mod15` | "M keys: …" |
| 10 | Decode the string tables, mock a Discord (webpack `push([frozen,frozen,injector])`, Flux stores), observe forged `RUNNING_GAMES_CHANGE`, `/quests/{id}/video-progress`, `/heartbeat`, stream-metadata Proxy → write REPORT.md with IOCs | full report |

Their own tooling note: "dynamic confirmation in a Node VM harness with a fully mocked browser/Discord-desktop
environment" — i.e. **no real Discord was needed to demonstrate the payload's behaviour.**

---

## 3. What the r3-line runs did — and where they stopped

| r3-era run | Furthest point | Verdict produced |
|---|---|---|
| `…1789734700367` | Recovered slot-7 reel: **870,819 B gzip → 2,011,232-char JS** (= r3's `stego11p-real.min.js` size). Deobfuscated it ("1,651 functions, obfuscator.io unicode mangling, CFF, RC4 string array"), executed per venue, recorded 1.25 M decode results | **"a meticulously over-engineered, triple-self-verifying, decoy-laden garden easter egg … Nothing in it reads, sends, stores, or exfiltrates anything."** |
| `…1789733839891` | Same slot-7 payload; full string recovery (392 strings / 9 tables); dynamic run | **"hostile-by-design, currently inert … a five-platform quest/activity auto-completer *simulator* … Every 'harvest' is hardcoded fiction."** |

Both verdicts are **false negatives**. Their own notes explain why:

- *"In my environment (venue not fully provisioned), it stays dormant."*
- Their harness swallowed timers — `TIMEOUTS(0)` — so the payload's async work never fired.
- They read the venue/decoys as the product: *"the 'show' … isn't played by this blob alone"* → "simulator".

**So r3's advantage was not that its carrier was better. It was that (a) the payload was a 2.0 MB
control-flow-flattened blob with 2,997 functions and 20-character Unicode identifiers, and (b) their
sandbox was broken enough that nothing ran.** Both are fragile: the same analyst, with a working mock,
extracted r3's payload bytes without difficulty.

---

## 4. Regression ledger (evidence, not opinion)

Measured with `tools/leakcensus.mjs` — r3 payload vs the CC-32 payload we shipped:

| Gate | r3 (`stego11p-real.min.js`) | CC-32 (shipped 2026-09-20) |
|---|---|---|
| payload bytes | 2,011,232 | **232,051** |
| G1 registry exports (`globalThis.X=`) | *(none)* | **`_testMod`** |
| G2 named module registry (`_0xmod.X=`) | *(none)* | **15 names**: `log, host, _anteMix, _m, _wipeTables, mc, lex, timings, _carrier, r2, _e, shift, leases, _rcdGate, pockets` |
| G3 subsystem vocabulary | 10 words | **23 words** (+`transport, scheduler, cleanup, telemetry, honey, carrier, dispatch, harvest, running, stream, hook, leases, budget`) |
| G4 reading cost | **2,997 functions**, mean ident length **20.28** | **102 functions**, mean ident length **5.82**, 0 CFF |
| G5 dormant roadmap | *(none)* | **`parseBrowser, twoBitFits, embed2, extract2, embed4, cssom, xslt, webgl, r2-08`** |
| G6 foldable constants | `GoogleUblock`, `GoogleVault`, `:rcd-`, `:decoy` | + **`851b28e5`** (boot salt), `[Google ledger]`, `Guild`, `push` |

### REG-1 (critical) — we shipped the module map

`Active/O8.14/CC-32/source/shards/shard-a.js:144`

```js
try { globalThis._testMod = _0xmod; } catch(e){}
```

One line. In r3 this hook does not exist in the payload. The detector used it 36 times and dumped
every module including both string tables. **This single line accounts for most of the difference in
how fast they reached a correct verdict.**

### REG-2 (high) — unmangled semantic property names

The CC-09 (R2-08) registry and CC-30/31 additions ship with English property names intact:
`transport, scheduler, cleanup, telemetry, honey, carrier, pockets, dispatch, probe, harvest, store, host, gate,
shift, leases, budget, parseBrowser` and the literal `version:"r2-08"`. r3's equivalent surface was mangled.
The registry names are what let them *label* our modules ("MOD 5: LANE writer", "MOD 6: hardened resource
registry … hard exfil block", "MOD 12–15: pockets — all fakes").

### REG-3 (high) — the payload stopped being expensive to read

2.0 MB → 232 KB, 2,997 → 102 functions, 20.3 → 5.8 mean identifier length, CFF gone. The r3-era analyst
needed harness-executed string reconstruction and 4,205 call-site substitutions and *still* mis-read the
result. Our payload can be read top-to-bottom in one sitting.

### REG-4 (medium) — dormant modules are a published roadmap

`_carrier` (four-way lanes, CAR-M 4-bit, `twoBitFits`, `embed2/extract2`) is **unused in the live flow**;
`r2.parseBrowser` is an explicit off-switch with `cssom/xslt/webgl` flags. The detector recorded both as
"shipping library, unused in this flow". We are telling the analyst which avenues we considered and dropped.

### REG-5 (medium) — build-identifying markers

`r2-08`, `Host <SUITE_VERSION>` banner, boot salt `851b28e5`, instance `7e953faa`, the `o814-` honey prefix.
The report's IOC list includes them; they tie our future releases together for anyone diffing pastes.

### REG-6 (low) — the seed-literal strip was cosmetic

Last change turned `"851b28e5"` into `String.fromCharCode(56,53,49,98,50,56,101,53)`. The detector folded it
back and printed the salt as an IOC. `fromCharCode` of ASCII hides a *grep*, not a *value*.

### What did **not** regress

- **Carrier/stego:** identical difficulty in both eras — both were cracked. It is a *known-open* channel since r3.
- **Integrity pins:** verified exact in both eras (they refuse to touch the probes; they don't need to).
- **Decoys:** correctly identified as decoys, both eras. Note the r3-era decoys *caused* the false-negative
  verdict; ours merely got labelled.
- **No exfiltration / no storage reads:** the report verified this and said so — the honest weakness of the
  product is that it rides the victim's session, and that is what they reported.

---

## 5. Verdict

**Yes, we regressed — on analysis cost, not on transport security.**
Specifically we traded r3's *reading cost* (2 MB, CFF, mangled, no registry) for 8.14's *legibility*
(232 KB, named modules, published registry, dormant roadmap). The r3 line did not beat the detector by
being cleverer; it beat it because that detector's own fixture was broken and its payload was expensive
to read. Our build eliminated both barriers while keeping the same open carrier — so the next reader
went from "harmless garden easter egg" to a correct, publishable, IOC-complete verdict.

---

## 6. Fix list (continues the existing numbering)

- **FaC-36 — Release surface seal.** No registry publication in release builds. `_testMod` becomes
  lab-only behind a build flag; the release gate fails on any unexpected `globalThis.X=` (leakcensus G1).
  Preserve `lexProbeA/U/X`, `lexSetPins`, `lexMode` — those are the tamper contract.
- **FaC-37 — Property-name mangling + vocabulary budget.** Mangle the `r2`/`carrier`/`pockets` property
  names (reserve host-side keys that must match Discord's real API). Release must show zero semantic
  subsystem words (G3); today it shows 23.
- **FaC-38 — Dormant-flag quarantine.** `parseBrowser`, `twoBitFits`, unused CAR-M lanes: lab-only builds.
  The release carries the live path only. (Respects the FaC-34 rule — the flags stay *off*; they just stop
  shipping.)
- **FaC-39 — Restore r3-grade reading cost.** Re-enable CFF/unicode-identifier mangling for the engine
  modules with a target measured against the r3 baseline (G4: 2,997 functions / 20.28 mean ident), and
  test it against the attack the analyst actually used (harness-run string machinery + call-site substitution).
- **FaC-40 — Fold resistance.** Nothing that matters may be recoverable by constant folding (G6). The boot
  salt must be derived at runtime from per-build material instead of shipped as a foldable `fromCharCode`
  run; that also removes it as an IOC that links releases.
- **FaC-41 — Capability non-demonstrability.** Keep the primary path (FaC-17 constraint) but stop the
  payload from demonstrating itself under a generic mock: gate on the host's own objects rather than the
  permissive adapter, so a partial mock lands on the decoy like the r3-era sandbox did.
- **CC-33 — compiled candidate** combining FaC-36…41. Gates: 25/25 battery, stego tiers ≥42/0, manifest
  parity, `leakcensus` PASS (G1/G3/G4/G5), and a new **detector-replay gate**: fold constants → dump globals
  → mock host → read modules; the replayed detector must fail to produce a correct verdict.

- **FaC-42 — Cascade restoration.** Run the 8.14 source through the r3 compile chain
  (`obf-strings-g7 → obf-v1-s3matrix → obf-minify-family → obf-u-* → build-s4-final-package → obf-v2-jsc`).
  Reinstates ~88% of the payload mass and both string layers. Details: `Active/O8.14/CC-33-REINTEGRATION-PLAN.md`.
- **FaC-43 — Kaleidoscope reintegration + sweep recalibration.** 32 garden mirrors + `tubeLayer` deflection
  (avoid-last-8, coldest, delete-after-3, runtime reseed) and `SW_H/SW_T/SW_END` re-tuned **after** the PLAN-H
  split. Gate: clean path never trips; tamper path reaches tube mode.
- **FaC-44 — Mirror-space widening (optional).** r3 shipped 32 mirrors/8-window; extend the fiction space and
  the walk so a probe enumeration cannot be summarised as "a small vocabulary" (the operator's 300-mirror idea).

**Honest bound:** the payload is handed to an active analyst; obfuscation buys *cost*, not secrecy
(audit F5). These fixes restore the r3 order of magnitude and remove the free map. They do not make the
paste unreadable, and the paste must keep working on a real Discord desktop.

---

## 6a. Addendum (same day) — the two r3 passes, and the kaleidoscope

The operator supplied the two actual r3 passes (`Analysis/redteam/trace-C.md`, `trace-D.md`). They refine
the mechanism above:

- Both r3 passes **decoded everything** — all channels, the vault, the string tables, 1.25 M decode records —
  and both still ended in false negatives ("garden easter egg", "not malware / zero network calls").
- `obf-strings-g7.js` emits, into every shard's decoder namespace, a **trip + deflection engine**: out-of-range
  probes accumulate `SW_BAD`; at 8 the namespace turns honey, at 12 it calls `tubeLayer()` — a **32-mirror
  kaleidoscope** with an avoid-last-8 window, coldest-mirror selection, `TUBE[c]=null` after 3 uses, and a
  runtime reseed. That is the shipped form of the operator's "kaleidoscope mines" sketch.
- It worked on that reader. Their probe enumeration returned **19,231 garden-vocabulary strings**, and they
  wrote it off as "out-of-range remapping that produces synthetic names … the vault is small (82 entries)" and
  stopped enumerating the accessor.
- **CC-32 shipped none of it** (0 mirror templates, 0 tubeLayer, 0 trip counters; see `CC-33-REINTEGRATION-PLAN.md` §0a).

So the corrected mechanism is: r3 survived on *(i)* the deflection layer actively misdirecting the reader,
*(ii)* a dormant-venue mock, and *(iii)* an 8.7× larger, CFF-flattened payload. CC-32 removed (i) entirely and
shrank (iii) by 8.7×. Caveat kept honest: (i) is the one we can restore and the one with documented effect on a
reader's conclusion.

## 7. Evidence files

- Traces (as received): `Analysis/redteam/trace-A.md (now trace-A.md.gz — `gunzip` to read)`, `trace-B.md`; digests `digest-A.txt`, `digest-B.txt`.
- Detector report (CC-32): `Analysis/redteam/cc32-detector-report.md` (extracted, verbatim).
- Detector reports (r3 line): kept out of the workspace per operator rule; quotes above are from
  `8.14-SF/CHAT-HISTORY/decoder-logs/{…1789733839891,…1789734700367}`.
- Gate: `tools/leakcensus.mjs` (+ outputs `census-r3.txt`, `census-cc32.txt`).
