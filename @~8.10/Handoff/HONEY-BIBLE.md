# HONEY-BIBLE — the O8.9 deviation trap (doctrine + operation)

Date: 2026-09-14 · Status: shipped in O8.9 freeze (bundle PIN13 `52cea204…`,
runner `d64e28e6`). Read with `TRAP-CORRECTION-2026-09-14.md` (the correction
that governs this design: pasted third-party designs are evaluation material,
never the goal; K-walk crypto framing is VOID).

## 1. What the trap is (and is not)

- Deviation-only entry: clean runs pay ~nothing (one integer range-check per
  decode). There is NO tamper branch — only many subtle interleaved conditions
  that gradually diverge.
- Gradual divergence: 8 bad reads honey a namespace, 24 tube it; the tube
  re-presents (same mirror unrecognisable on revisit), fakes convergence
  (progress %, sealed layers, subkeys), and terminates (vault-seal garbage
  after SW_END 40–119 visits). Perceived endless, always bounded.
- FP rate is the go/no-go metric, measured FIRST. Every claim below has a gate.

## 2. M1 sensor (bundle side, all 7 G7 namespaces)

- Raw-pos invalid counter at the TOP of `dec`, single site:
  `pos ∉ [0, NREAL)` → `SW_BAD++`. Never count after the honey-map (the lvl1
  map launders garbage into valid — counting there stuck at 8 and blinded the
  tube; fixed 2026-09-14).
- Thresholds 8 honey / 24 tube, sticky-UP per namespace (`SW_LVL` 0→1→2):
  lvl1 serves fiction for ALL calls, lvl2 serves tube for ALL calls
  (valid-call poisoning: post-trip, even canon queries get tube).
- `CS_TRIP_DIAG=1` emits `[TRIPDIAG] <tag> bad=N lvl=L` per invalid to
  `console.debug`. Shipped in production bytes (silent unless armed).
- Proof: `trap-fp-harness.mjs` (G5) — quest path + all suites, zero trip
  lines; `trap-tube-gates.mjs` part 1 — pre-trip canon, 24th-flip,
  terminal skeleton `vault seal \0 -- lattice quiet`.

## 3. Tube (bundle side)

- 8 seeded-shuffle fiction templates (`TUBE_TPL`, `{n}/{p}/{h}` params — every
  visit textually distinct) + `tubeLayer` mixer + terminal past `SW_END`.
- Census records 9 skeletons (`tubeSkeletons`: 8 + terminal) for the FP sweep.
- Size discipline: trap code multiplies ~10× through JSO CFF/deadCode
  (per-function cost). Trimmed 16→8 templates and merged tubeEnd into
  tubeLayer to hold the carrier cap (gzReal 684,720 / 694,800 B).

## 4. M2/M3 depth (bundle→loader)

- M2: runner reprint serves the TUBE byte-exact (was: honey). Gate: G8
  `runner reprint serves tube byte-exact` (2,196 B, sha8 `9dad7c20`).
- M3: sandbox/wrapped-atob stays CANON (fail-closed, no tube — probes are not
  confirmed deviation; the tube is never free). Gate: G9.

## 5. M4/M5 loader enum sensor + tube-vault (loader side)

- Session key `pgs<hex>` on the page window holds `{tag, vb, nTag, nVen}`.
  `diverted = (lexMode != 0) || (nTag + nVen >= 4)`. Threshold 4 = legit
  rename margin (2 renames safe); reload clears residual (reload is a new page).
- Tube served FIRST on tamper/diversion; dead-venue-no-tamper keeps courtesy
  honey; venue-switch mid-session fail-opens to decoy (pre-existing).
- tube-vault = honey shell verbatim + PIN-vault annex (`vaultPins/vaultRnd/
  vaultTry` + auto-demo). Markers: `vault seal`, `deriving layer key`,
  `cache row `. Same-PIN stable, distinct-PIN distinct, ≥5 progress lines,
  NO reject language, no real markers. Reversed KG
  `fnv1a(SALT_HEX+'board8:')` vs honey K8 `fnv1a('board8:'+SALT_HEX)`.
- G11 `grainCal==0x12345678` decoy sits after the seed (tiers prove never
  fires). G4 printability-range assert (`<0.15` across b1–b7) in matrix.
- Proof: `trap-tube-gates.mjs` part 2 (5-paste name/venue enum → 5th tube;
  vault behaviour; 50-PIN boundedness).

## 6. K-walk (d3 one-way walk, bundle side)

- d3 was SELF-CANCELLING theater (`^C1` twice, rotl7+rotr7 — identity, so
  d3 ≡ d2 and one xor decoded everything statically). Now a real per-namespace
  walk: `x=(a^b^C2)`, `r&7` rounds of `u=imul(x^SKEY^(x>>>13), MC);
  x=u^(u>>>15)`, with per-namespace odd `MC` draw. Emission inverts at build
  (Newton `modInv32` + xorshift inverses, 5,000-round-trip checked + G7
  self-test round-trips every regen). Ships mix only. d3 args no longer
  contain pos algebraically — static grep-decode is dead; the analyst executes
  or reimplements per namespace.
- Heterogeneity rule: op-vocabulary / schedule-shape ONLY. Never key by
  schedule (dead by calibration: legit `e`/`aux` hit 64/64 at n=64).

## 7. Honest ceilings (do not oversell)

- Differential evaluation collapses surface forms to 1 behaviour; AST
  similarity ~0.43; small-constant tells; dressing ~9.4× (cost falls only on
  the diverted). The tube buys analyst-hours, not impossibility.

## 8. Operation

- Health: battery 25/25, `CS_TRIP_DIAG=1` battery → 0 lines, stress 23/23
  (password scenarios need argv `pwDbg pwRes pwAK pwView`, ephemeral-only —
  NEVER persist; order is dbg/res/ak/view, verify by S8 not by guessing),
  tiers 37/37, matrix 20/20 (incl MINREAL gate), G7/G8/G9, trap-tube, trap-fp.
- Rebuild cascade: G7 → V2 (repin EXPECTED_V2_M) → V1 → family → S4 →
  stego EXPECT loop (minReal/gzReal move; minTube/gzTube stable; G8 repins
  probes from minified bytes automatically).
- Min-smoke (mandatory after every stego build — live runs MINIFIED bytes,
  and no execution suite did before tG7HexxSM 2026-09-14):
  `CS_BUNDLE=Active/Stego/output-stego10/stego10-real.min.js node
  Active/O8.6/tools/chore-stress.mjs S0 7` must print ALL PASS (plus matrix
  gate `MINREAL probe pins verify`).
- Rejected: M6 (counting after honey-map — blinds), schedule-keyed sensing
  (FP death), per-customer builds, K-walk crypto framing (VOID).
- Rotation (red-forge item 3, live since O8.10): rotate-ioc.mjs derives new
  IOCs deterministically from a tag (o810r1: instance/IOC-symbol/7 codenames/
  cycleMs 15000→13000) and asserts exact 8.9-state preconditions before
  writing shards + recording oto/rotation.json (the manifest is the RECORD).
  Sim reads the manifest (CS_ROTATION > bundle-sibling > oto/rotation.json >
  legacy). Stego outdirs MUST ship rotation.json beside the runner. Reverse =
  substitute manifest pairs new→old in shards (proven: dry-run green after
  reverse, --apply round-trips all 3 files sha-identical). rotate-ioc is
  currently one-shot 8.9→8.10 (OLD_NAMES hardcoded); generalizing it is
  future work for the next rotation.
- Known flake (pre-existing, NOT 8.10): S11 'parks on empty board' pins one
  stochastic park frame, fails 10/20 seeds with an identical 8.9 fingerprint.
  Canonical seed 7 stays green. S11 also carries a mid-run HELD presence
  assert so a wrong-manifest IOC fails loud (absence checks alone are
  vacuous).
