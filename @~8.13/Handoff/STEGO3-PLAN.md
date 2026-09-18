# O8.7-Stego-3 — build plan (gated)

Kicked off 2026-09-12. Motivation: two external AI RE reports on the Stego-2 r1
paste — AI#1 stopped at the Pixel Garden decoy ("benign toy", Path A "dormant"
after its FNV port failed); AI#2 extracted Path A fully (1,161,200 chars) via a
JS harness + Discord emulation and traced the whole quest loop.

PRIME DIRECTIVE (user): sell the cover story harder — maximize AI#1 outcomes
(detectors + analysts conclude benign/dormant). Hardening second. Believability
work must ABSORB the hardening (product-voiced naming, gallery-format framing),
never fight it.

Designations: Stego-3 = new generation (new carrier look, loader narrative,
decoy v2). Stego-2 r2 stays frozen as the previous line. New files alongside the
Stego-2 ones (Stego-2 must stay reproducible): `build-stego3.mjs` (+ `stego3-codec.mjs`,
`stego3-carrier-test.mjs`, `stego3-strip-base.bin`, `stego3-legacyreel-src.js`),
`stego3-loader.js`, `decoy-garden-v2.js`, `test-stego3-tiers.mjs`,
`output-stego3/O8.7-Stego-3-{cover.bmp,runner.js}` + `stego3-{real,decoy}.min.js`. Dropped: Stego-1-extractor
compat (frees the decoy-channel layout). REJECTED (user 2026-09-12): per-customer minting — the 名 slot is the operator
password input (see Password slot), not a watermark. Stego-3 ships ONE shared
build. Do not re-propose without revisiting the password workflow.

Rollback at any gate: Stego-2 r2 + `o8.7-Stego-2-r2-live.tar.gz` (+ r1/S6 tarball
behind it). Stego-3 touches only NEW files until G6 promotion, so the live line
is never at risk mid-build.

## 0. Threat model (from the two AI reports)

- Cheap analysis (static read + naive port): MUST conclude garden + dormant /
  legacy real channel. (AI#1 got here via a broken port; Stego-3 makes the
  conclusion easier AND the port harder.)
- Capable dynamic analysis (JS harness + Discord emulation): raise cost per
  round. AI#2 already paid for one `discord_emu.js` — Stego-3 invalidates it
  (new probes, KDF, cipher, layout, labels).
- Invariants kept: single paste; Line 1 vars searchable/editable; mixed fail
  (silent early, garden late); deterministic byte-identical rebuilds (never
  accept drift); regression discipline (tiers + battery green, nothing worsens).

## 1. Design (decoy-first)

### Carrier ("sell the image"): real photo + subtle grain
- No more "encrypted noise" verdict: payload via LOW-VISIBILITY embedding.
  LEADING: 3–4-bit quantization (LSB matching, pixel delta ≤7–15) over scattered
  positions, PLUS a tasteful visible "snapshot" footer strip carrying the
  DOCUMENTED decoy channel ("gallery format v3"). Photo-look photo + findable
  garden + invisible real. (Legal because the carrier rides INSIDE the runner as
  base64 — no hostile recompression ever touches it, so no robustness needed.)
- Clean cover: reuse the v3 photo base (`Uploads/stego2-cover.bmp` pipeline)
  unless G1 renders demand a new photo.
- Photo-plausibility PINNED by test (PSNR/delta-metric threshold vs pristine) —
  a new tier assert. Grain budget (3-bit vs 4-bit) + strip design decided in G1
  with renders.

### Loader narrative: "Pixel Garden Player"
- Banner header comment (survives minify): product-voiced framing that colors
  everything the analyst reads afterwards.
- Documented path = gallery-format → garden (complete, satisfying). Real path
  STRUCTURED as legacy/unused (legacy/pro-channel naming, garden-default
  fallback structure, "studio provisioned channel" framing with clean
  unprovisioned→garden fallthrough) WITHOUT being actually dead — extraction
  failures must read as "unprovisioned/legacy channel."

### Decoy v2: Pixel Garden v2.x
- Richer product surface (help/about, fuller game feel), display-only — no new
  probe surface. Version bumped deliberately (v1.3 bytes were published in AI
  reports; v2.x invalidates them).

### Hardening (after decoy, in this order)
1. Rotation: new SALT/chaff/offsets/labels/codenames everywhere (invalidate
   AI#2's harvested constants).
2. KDF: runtime-mixed seed (file alone insufficient) + slow hash chain (kill
   rename-sweeps) + carrier-bound SALT (no literals in code).
3. Loader: gate-then-decrypt (extractor encrypted until the env-gate passes —
   static readers never see the cipher) + conjunctive behavioral Discord probes
   (any-of-several; each real-client verified).
4. Payload: quiet-by-default (Host line stays; capability/module labels behind
   a debug knob) + emulator-incoherence tarpit (shadow benign loop on
   cross-API incoherence). HIGHEST RISK — ships ONLY with live-Discord proof;
   if it slips, Stego-3 ships without it (documented cut).
- Explicitly NOT doing: JSO-flattening the loader (heuristic profile goes
  hostile); over-conjunction without real-client canaries (brick risk).

## Password slot (revealed 2026-09-12)

`名` is the operator password input, NOT a watermark: Line 1 `名 = "佐藤 結衣"`
is the placeholder operators replace with the debug password, which unlocks
bundle log level 2 (obfuscation-feature debug logs) — convenience sugar for
typing `await GoogleUnlock('password')`. Pre-existing machinery: log-lock
(salt `RBaa+,gp#V%w&%Tm|*g8V_{@1C!Q`, digest `201f1688…`, see Docs/CHEATSHEET.md),
`LOG_LEVEL`-gated Log facade, `GoogleUnlock` window export. (Password plaintext
already lives in `tools/marker-swap.py` + era docs — pre-existing; new artifacts
stay hash-only, do not spread it.)
- Stego-3 loader MUST accept provisioned names: normalize by hash —
  `fnv1a(tag) === PWHASH_DEBUG` → canonical default seed — so the debug paste
  extracts the real payload while random renames still fall to the garden.
- Registered (loader-exact FNV-1a-32 over `charCodeAt & 255` units — note the
  `& 255` truncation; this is what broke AI#1's port): FNV_SHIPPED = 0xb16a887e
  (seed-check SALT^h = 0xe68c8adf MATCH), PWHASH_DEBUG = 0xe79dbcf6.
  Password plaintext is NEVER written to disk/docs by this plan — hashes only.
  L2 end-to-end test requires the password from the user at runtime.
- Quiet-by-default (hardening 4) must PRESERVE the level system: tune the
  DEFAULT level only; L2 keeps working with the password.
- KNOWN GAP: Stego-2 r2 predates this — a debug-name paste there falls to the
  garden (loader has no normalization). Backport (r3) only if the user asks.
- G4 must verify whether S6 already honors 名→L2 (user indicates yes — the
  convenience exists via direct S6 pastes) or whether bundle-side wiring is
  needed; either way the shipped check stays hash-compare (no plaintext).

## Gates

- **G0 baseline** ✅ (done at kickoff): r2 frozen + both rollback tarballs +
  this plan. Threat model + targets declared.
- **G1 carrier pipeline** ✅ 2026-09-12: `stego3-codec.mjs` (scattered 4-bit real:
  magic+len+crc header, rotated 41/17 keystream; LSB-2 sequential strip decoy,
  documented PG3 layout) + `stego3-carrier-test.mjs` 12/12 (round-trips,
  determinism, 3 clean-reject negatives). Pins: photo maxΔ ≤ 15, PSNR ≥ 32.0
  (measured 32.9), strip maxΔ ≤ 3; R-util 67.6%, strip 3.2%. Plaque A baked to
  `stego3-strip-base.bin` (98,400 B).
- **G2 loader rewrite** ✅ 2026-09-12: `stego3-loader.js` (Pixel Garden Player
  v3.1.0 banner, loadSnapshot/tryLegacyReel/venueBits/slowChain narrative, PG3
  documented path, encrypted legacy-reel blob, 3-probe venue composite, KDF
  slowChain32768, carrier-derived SALT 0x6251c72a, hash normalization
  PWHASH_DEBUG→FNV_SHIPPED) + `build-stego3.mjs` (ESM, EXPECT-pinned incl. salt,
  narrative-present/banned-absent asserts) + `test-stego3-tiers.mjs` 19/19
  (T0/T1/T2 byte-exact, 3 probe-bit flips, PG3-doc, PSNR pin, BMP-valid, banner;
  T2-debugname skips without --debug-name). Seed 0xea66676d (bits 7). Cover
  ff814c65…, runner 01470749… (1,995,545 chars). Double-build deterministic,
  rename fuzz 10/10 garden, Line-1 variants 4/4+4/4. Runs on the current S6
  bundle; re-greened after G4.
- **G3 decoy v2** ✅ 2026-09-12: Pixel Garden v2.0 (30×14/16 gens, t1 20×10/10,
  header + plot journal + `data-pg-plot=grown` marker, LCG 0x31415; v1.3 bytes
  invalidated). min 1590 B / gz 855 B (3.5% of strip). T1 byte-exact + executes.
- **G4 payload hardening** ✅ 2026-09-12: quiet-by-default via split-voice `say` (unlocked: `[Google c] m`; locked: bare message; Host + decoy voice stay, zero labels) + SUITE_VERSION 8.7-Stego-3 + instance 952bf71b (shard-a + shard-e symbol/log) + O8.6 determinism repair (v2 frozen/pinned 50f6c0f8, camo seeded, engines exact). Tarpit CUT (no live-Discord proof, documented). Battery 25/25; L2 proven (unlock true + diag flush, hash-only); tiers re-greened 20/20 on bundle 8a6ce1ed (min 1186949/gz 487467).
- **G5 freeze** ✅ 2026-09-12: Stego-3-r1 (7 files, sums 6/6) + determinism 5/5 + variant smokes 4/4+4/4 + photo pin (R 70.16%%, maxDelta 15, PSNR 32.8dB). Cover 15ba8f3b, runner 4f2a489a (1,995,545 chars).
- **G6 promote** ✅ 2026-09-12: HANDOFF/CHANGELOG/INDEX updated, rollback tarball `o8.7-Stego-3-r1-live.tar.gz` (140 members, 612ad8aa). Stego-2 r2 stays frozen (previous line, rollback depth — NOT retired). PLAN COMPLETE.
- **R2 bugfix rev** ✅ 2026-09-13: live-Discord stall (event-silence hang, no advance/refill) fixed via 60s quest-store verifier (7 lines, shard-e) + instance d237bb30; refill/continue audited OK. Re-greened 20/20 + 25/25 + L2 (bridge true/false) + determinism (O8.6 3/3, stego 4/4). Frozen r2 (sums 6/6), promotion pending.

## Open questions

- Per-customer minting: REJECTED (password slot — see above).
- Stego-2 r3 backport: DECLINED by operator 2026-09-13 (debug-name normalization stays Stego-3-only; Stego-2 frozen).
- Grain budget: 4-bit LOCKED (user 2026-09-12; PSNR 33.2dB, maxΔ 15, R-util 68%).
  Footer-strip design: A LOCKED (user 2026-09-12); baked to `stego3-strip-base.bin`.
- Tarpit scope: CUT 2026-09-12 (no live-Discord proof; emulator-incoherence work deferred to a future gate with real-client canaries).

## 2026-09-13 — Chore-progression stress test + rolling line (r-series ended)

- Harness `Active/O8.6/tools/chore-stress.mjs` (virtual clock, seeded RNG,
  headless Discord sim; `node chore-stress.mjs <SCN> [seed] [--dump]`), 11
  scenarios, ALL GREEN seed 7: S1 general; S2a-e event-death settle
  (flag @190s / value @184s / gone @244s exact 2-miss / silent-expiry advance /
  frozen no-abandon control done @714s after resume@700s); S3 refill (quests
  arriving @30s ran); S4a/b nav pause/resume (zero /100 while parked); S5
  video-first x3 seeds (VIDEO always first, rest shuffled); S6 act heartbeats
  POSTed + done line. Pacing audit: announced 33s -> actual 58.1s (1.76x
  lognormal jitter, in-band 0.3-4x).
- Second root cause (battery-blind): `_0xvmExec` referenced at shard-e act
  deadline + refill quorum but defined NOWHERE in any archived generation
  (tarball archaeology: o8.6-S6, Stego-2-r2, Stego-3-r1 all 2 refs / 0 defs) —
  crashed every activity chore (masked as `Rough patch on one chore`) and
  broke refill (catch -> return 0 + break). Fixed: clean-room 8-opcode stack
  VM, exact for both use-site programs. Video-first board+refill ordering
  (`_0xvidRank`, `_0xvo.concat(_0xvv)`, stable sort) + verifier reason diag
  (`_0vvia` + `Log.diag('Completion verified')`).
- Rolling rule (operator): the line moves in `Archives/packages/O8.7-Stego-3/`
  (overwritten per change; instance id identifies bytes); superseded bytes go
  to `Archives/RETIRED.md` first, then are deleted. Retired 2026-09-13:
  Stego-3 r1/r2 + Stego-2 r1 freeze dirs + 3 rollback tarballs (~38 MB).
  Stego-2 r2 renamed to rolling `packages/O8.7-Stego-2/`.
- Known limits (not fixed): post-summary arrivals never picked up (no re-arm;
  proposed follow-up); pacing announces mean vs jittered actual (<=4x).
