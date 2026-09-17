# O8.6-S6 + O8.7-Stego-2 — build plan (gated)

> Completed 2026-09-12 (all gates ✅); rollback point is now
> `Archives/o8.7-Stego-2-r2-live.tar.gz` (`o8.6-S6-live.tar.gz` kept as the
> v0/r1-era rollback). Same-day trim retired the G0 baseline tarball
> (`o8.6-S5-live.tar.gz`), r4, and the v1/v2/re evidence dirs — context in
> `Archives/RETIRED.md`.

Kicked off 2026-09-12, driven by the 58-step attacker RE log (ctxt.io `sHpNMNmr6`,
script paste since expired). Designations: **8.7-Stega-1** = current entangled
pair (r4 bytes, frozen); **8.7-Stego-2** = new outer/carrier; **O8.6-S6** = new bundle.

User decisions (2026-09-12): full S6 rebuild + Stego-2 **without worsening state**;
self-contained delivery; Line 1 wrapper may vary (vars stay searchable);
mixed fail mode (silent early / decoy late); dual-payload carrier (real = grain,
visible static = red herring).

## 0. Threat model (distilled from the attacker log)

Their playbook, cheapest-first: (1) one shadowed-`eval` in bare Node popped the
entire outer layer — JSO + BMP + XOR + gzip bypassed without analysis;
(2) Babel + sandbox resolvers recovered the inner skeleton + 179 strings;
(3) vm-harness execution yielded the `[Host 8.6-S1]` self-ID, the `[Google *]`
abort narratives, the runtime-callback source. What stopped them: the
Discord-runtime gate (0 URLs, 0 exfil) and string-wrapper depth. Stego-2 counters
each step: env-gated outer (kills step 1), silence + decoy (kills step 3's intel),
de-signatured loader (kills fingerprinting), dual carrier (their "obvious static
block" finding becomes a trap).

## 1. S6 bundle changes (G1–G4)

- **B1 early-silent** ✅ in scrub6: genuine-browser pre-check in shard-a
  (`window`/`document`/`navigator` presence); fail → set noop log, return before
  any log/install. discordlike passes; bare Node / thin sandboxes exit silent.
- **B2 deep-decoy** ✅ in scrub6: shard-e Abort A (no chunk array) + Abort B (no
  usable runtime) run a benign board/vine session (existing C(13)/P(24) +
  C(2)/P(21 or 22) phrases, zero new phrases) instead of the P(0)/P(1) doorway
  narratives. Same cleanup (GoogleRelease + return), no timers (battery-safe).
  Error paths (P(20) etc.) deliberately untouched.
- **B3**: boot logs behind B1 (free via B1 placement — early return precedes Log).
- **B4 master-pass tune-up** (rollback-triggered, at G3): try `deadCodeInjection`
  (low threshold) + higher CFF threshold on the master bundle pass. ANY battery or
  behavioral deviation beyond intended B1–B3 deltas → revert to S5 config.
  Shard-level OTO configs re-run, not redesigned.
- **B5**: `SUITE_VERSION` 8.6-S1 → 8.6-S6 ✅. `INSTANCE_ID` stays static.
- Verified pre-edit: P(0)=doorway/no-array (15 variants), P(1)=doorway/no-runtime
  (15); q0=`webpackChunkdiscord_app`, q1=`DiscordNative`, q2=`/quests/`;
  all 1,401 `_0xed` indices decode cleanly; battery asserts no version strings.

## 2. Stego-2 dual-payload carrier + loader (G5) — FINALIZED 2026-09-12

- **Cover** ✅ v3: `Uploads/stego2-cover.bmp`, 800×620 **24-bit**, derived from the
  pristine concert photo (`Uploads/stego2-cover-source.png` 618×408, `cb5dd70a…`;
  center-crop 526×408 → LANCZOS → σ2.2 film grain; `make-photo-cover.py`,
  seed 0xC0FFEE — v2 synthetic `cover-gen.py` superseded, kept for history).
  24-bit so 1 scattered byte corrupts 1 color channel. Capacity 1,488,000 B;
  budget 38.34%: real 472,307 B (S6 min 1,161,200 → gzip -9) + 98,304 B decoy
  band. Runner BMP blob ≈ 1.98 MB b64. sha256 `b1590ea3bdc6…`.
- **Real payload**: scattered per-byte via seeded permutation
  (seed = embedded salt ⊕ runtime-confirmed name hash); bytes XOR'd with
  header⊕salt keystream; 4 length bytes split across 4 keyed positions (no fixed
  header/length/magic anywhere). Reads as film grain over a pre-grained cover.
- **Decoy block**: contiguous bottom rows, Stego-1 layout (u32 length +
  header-keystream XOR + chaff pad to 96 KB) holding Pixel Garden. The
  Stego-1 extractor (which the attacker already owns) recovers exactly this.
- **Loader tiers** (hand-written, Terser-minified, no JSO shape; all sensitive
  API names char-code-built — `strings` shows only game/asset words):
  T0 no `window`/`document` → silent return BEFORE any decode (bare Node,
  hooked or not, yields zero bytes — decoy legitimately needs DOM);
  T1 browser-but-not-Discord → decoy extract + run (analyst harness lands here);
  T2 genuine Discord → scattered-real extract + run.
- **Gate stealth**: T2 check NEVER names the webpack global — key-scans `window`
  for chunk-shaped arrays (bundle-fallback style), blended into the same
  feature-detection the decoy performs. No single high-signal global probe;
  no literal Discord strings anywhere in the loader.
- **Decoy game** ✅ (`Active/Stego/decoy-garden.js`): "Pixel Garden" —
  deterministic console Game of Life (2,442 B source → 1,443 min → 792 B gzip),
  DOM strictly optional (try/catch), no network/storage/eval/Discord; receives
  会員/名 substitution (plot size + gardener tag); header comment explains the
  carrier grain as its backdrop aesthetic. Tested bare Node + discordlike +
  substitution — all green.
- **Steering (why analysts stop at the decoy)**: valid BMP header (triagers say
  "image" unprompted) → viewable photo + glitch band (salience) → Stego-1-layout
  block (their tooling works first try) → decodes/runs benign game that renders
  the carrier as art (in-fiction grain explanation) → static+dynamic+carving all
  converge on one story. Real branch needs T2 execution they can't reach.
- **Honest limit**: keys are build-time-known, so a determined expert CAN
  reimplement T2 offline after rejecting the decoy. The wall is economic +
  psychological (10–100× S5's cost, satisfying false summit), not cryptographic.
  True env-keying needs split delivery (rejected) — recorded, not pursued.
- **Loader (G5.3)** ✅: `Active/Stego/stego2-loader.js` (hand-written, shipped
  Terser-minified mangle-OFF with fiction identifiers; T0 checked first;
  tile-feed chunk-scan; SALT `0x57E602A1`; seed = SALT ⊕ FNV-1a(runtime 名);
  scatter = mulberry32 Fisher–Yates over `[pixelOff+98304, EOF)`; length u32
  salt-XOR'd at first 4 perm positions; gzip-magic confirm else T1 fallthrough).
  Behavior change vs Stego-1: RENAMED pastes fail the magic confirm and run the
  garden everywhere (even Discord) — personalized copies never yield real bytes.
  Builder invariants: payloads minified UTF-8 (ascii_only FORBIDDEN — escapes
  the 会員/名 anchors and silently kills substitution, T1-rename caught it);
  real payload uses reduce_vars:false (default Terser constant-folds
  `var 会員=0x2` + all its reads and hardcodes mode 2 — costs +50 KB gz,
  budget 38.3%); TextDecoder decode.
  Stream invariant: gunzip write issued un-awaited + chained close (awaiting a
  big write before draining deadlocks on readable backpressure — caught by
  tier tests, would have bricked T2 in real browsers too).
- **Line 1**: template variants per build (order/spacing/`0x2`/quotes);
  battery asserts searchability + replaceability, not exact bytes.

## 3. Battery S6 updates (with G3)

- Passes 1–12 green as-is (scrub6 edits additive/surgical; content assertions kept).
- Pass 13 → flexible Line-1 check (vars present + searchable).
- Passes 18/19 → S6 expectations in discordlike: Host line + decoy markers,
  ZERO doorway/pocket narratives. Pass 20 (mode 0) stays silent.
- New passes: outer eval-gate (shadowed-eval in bare Node → silent, no decode);
  deep-gate decoy markers; Line-1 replaceability (`名` swap still works).

## 4. Stage gates (deliverables frozen until G6; working tree evolves G1+)

- **G0 baseline** ✅ 2026-09-12: `Archives/o8.6-S5-live.tar.gz` (rollback),
  TRUE 3-mode behavior baselined, engines installed (162 pkgs).
- **G1 scrub6 sources** ✅ 2026-09-12: B1+B2+B3+B5 in; `node --check` clean;
  full battery 25/25 on mixed tree; B1 verified (bare Node 0 lines + noop log,
  browser-ish prints Host 8.6-S6).
- **G2 OTO matrix** ✅ 2026-09-12: full re-run on installed engines (JSO 4.2.2);
  43/43 + marker ×1 + dict quotas + 0 term hits; battery 25/25; 50-file layout
  matches S5 (43 + 5 family-u + 2 per-type u, both marker-PASS).
- **G3 bundle** ✅ 2026-09-12: S5-config build; B4 attempted → JSO deadcode broke
  the bundle (`already declared`, +58% size) → reverted, S5 config retained;
  master/runner passes seeded (`6b5eed01/02`) → rebuilds byte-identical;
  battery S6-updated (passes 18/19/20: true mechanism + decoy assertions +
  strict mode-0) → 25/25. S6 deliverables: bundle `c4f13057…`, gzip `6671e96b…`,
  deflateraw `09b5377c…`.
- **G4 behavioral parity** ✅ 2026-09-12: 3-mode diff vs §5 shows ONLY intended
  deltas (8.6-S5 version; doorway→garden/board decoy; mode 0 silent);
  bare-Node parity (same ReferenceError throw, S5 emits 0 pre-logs vs S5's 1).
- **G5 stego-2** ✅ 2026-09-12: dual-carrier build + tier tests 14/14 (T0 silent /
  T1 garden byte-exact+executes / T2 bundle byte-exact) → frozen
  `Archives/packages/O8.7-Stego-2-r1/` (7 files, sums OK). Caught en route:
  stream-write deadlock, ascii_only anchor escape, Terser 会員-fold (all fixed,
  all asserted). Line-1 v1/v2 smoked 4/4; rebuilds byte-identical.
- **G6 promote** ✅ 2026-09-12: S6 + Stego-2 live; HANDOFF + CHANGELOG updated;
  re-frozen (`Archives/o8.6-S6-live.tar.gz`). Stego-1 pair kept in `output/`.
- Rollback at any gate: restore `o8.6-S5-live.tar.gz` (+ r4 for stego).

## 5. S5 baseline (rollback/comparison reference, 2026-09-12)

Live = r4 bytes. Deliverables: gzip `dec4e4c9b…`, deflateraw `553f85d7…`,
bundle `f46f5496…`, cover `2c9ebf58…`, runner `14e3ffc8…` (full: HANDOFF §4).
Shards: a `a7e80dd1…`, aux `714c61b7…`, e `654c14f8…`, m `de637d21…`,
n1 `4ac79fb6…`, n2 `90cc6bcb…`, u `6f70bf89…`.

TRUE per-mode behavior (replace-mechanism, discordlike, no real Discord;
`[Google <word>]` rotates — C(0): Mishap/Grumble/Snag/Wrinkle/Falter/Kink/
Stumble/Blunder/Tangle/Hiccup/Glitch/Mischance/Sputter/Tripup/Bungle):

- Mode 2: `[Host 8.6-S1] initialized — worker instance 2de579ef.` +
  doorway narrative (2 lines)
- Mode 1: Host line + doorway-narrative variant (2 lines)
- Mode 0: 0 lines (true silent)

S6 intended deltas: bare-Node any-mode → 0 lines (B1/B3); discordlike mode 2/1
→ Host line + decoy board/vine lines, no doorway narratives (B2); mode 0 → 0 lines.
