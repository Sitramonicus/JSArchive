# Extended H × R2-05 — interaction design

**2026-09-18, bundle 3.** This is the design the operator asked for: extended H, factored against
R2-05, plus the finding that reorders the r2 queue.

---

## 1. The finding that changes the priority: R2-01a is void as designed

I was going to widen the string key from 32 to 128 bits. Working through the key flow showed that
**on its own it accomplishes nothing.**

`obf-strings-g7.js:227` emits the key into the generated decoder:

```js
+ `var NREAL = ${N}, C1 = ${c1}, C2 = ${c2}, SKEY = ${skey};\n`
```

So **the key ships as a literal inside the payload.** I confirmed the name is mangled away by
`javascript-obfuscator` (`SKEY=` appears **0×** in the shipped `stego11p-real.min.js`) — but the
*value* is still there, assigned to a mangled name. An analyst who wants it does not brute force
2³²; they locate one assignment.

Therefore:

- Widening 32 → 128 bits changes nothing for an analyst who reads the file. The key is handed over
  either way.
- Widening **does** close one narrow path: recovering the key by brute force *without* locating the
  assignment, using known plaintext. That path is already closed more cheaply by **R2-01b**, which
  removes the oracle.
- **The only change that actually protects the strings is not emitting the key at all** — deriving it
  at runtime from something the file does not contain. That is R2-05's problem, not a cipher-width
  problem.

**Two attack paths, and they need different answers:**

| path | cost to attacker | our defence |
|---|---|---|
| **static** — read the file, no execution | low: find the key literal, or brute force 2³² with an oracle | R2-01b (oracle removed ✅) + not emitting the key |
| **dynamic** — run it in an emulated client | the red-team already paid this: 27 sandboxes, Proxy Discord, *"all gates forced"* | **only R2-05**. No cipher change helps. |

Against a determined analyst who executes the code, **no amount of string-layer work keeps the
strings secret.** They call `dec()` themselves. That is the honest ceiling and it should be stated
plainly rather than buried under more obfuscation.

**⇒ R2-01a is dropped. R2-05 moves to the top of the queue**, and it is the item that extended H has
to be designed around.

---

## 2. R2-05: what "unforceable" can and cannot mean

Every gate we have today is an **environment query** — `DiscordNative`, `webpackChunktelegram_app`,
`__coverage__`, `location.origin`, and so on. A `Proxy` answers queries. That is why all of them
fell.

There is no such thing as a truly unforceable gate: anything observable can be replayed once
measured. What is achievable is a gate whose **cost to fake exceeds the value of faking it**. Two
candidates, in order of practicality:

**R2-05a — latency plausibility (recommended, cheap).**
Real Discord store hydration, module force-load and HTTP to `/applications/public` take measurable
wall-clock time. A `Proxy` resolves **instantly**. So gate on *duration*, not on *value*: record
`performance.now()` across a forced sequence and require the elapsed time to fall inside a plausible
band. An emulator can fake this, but only by deliberately inserting realistic delays across every
faked call — which means hand-tuning a whole emulation rather than dropping in a Proxy.

This is cheap, needs no secret, and cannot be satisfied by the tooling the red-team actually used.

**R2-05b — key stretching on the string key (pairs with §1).**
Stop emitting `SKEY`. Derive it at runtime as `stretch(observed_1, observed_2, …)` through enough
rounds that offline brute force is infeasible, and make at least one input latency-derived per
R2-05a. Static extraction then fails outright; dynamic extraction still works, but only in a
faithfully-timed emulation.

R2-05b **must not** be attempted before R2-05a exists, and it is the single riskiest change in r2:
the build-time twin and the generated `dec()` must agree exactly, and the failure mode is a silently
dead payload — the same class of failure as the R2-02 attempt. It needs a round-trip harness run as
a build assertion, not a manual check.

---

## 3. Extended H, designed around that

### The measurement

| shard | bytes | |
|---|---|---|
| **shard-e** | **146,650** | **6.0× the next largest** |
| shard-m | 24,495 | |
| shard-aux | 24,159 | |
| shard-n1 | 17,363 | |
| shard-n2 | 16,626 | |
| shard-a | 14,022 | |
| shard-p-zoom | 11,836 | |
| shard-u | 5,391 | |
| shard-p-{telegram,teams,discord,slack} | 4,723 / 4,261 / 3,980 / 3,804 | deliberately uniform |

Max/median today: **10.4×**.

### ⚠️ Blocker found by measurement, 2026-09-18: H is a refactor, not a cut

`shard-e.js` is 145,308 chars / 1,246 lines, and it is **one closure**:
`(function (_0xmod) { const Log = _0xmod.log; … })`. It has **12 top-level closure bindings**
(`_0xeb`, `_0xed`, `_0x5c1e`, `controller`, `signal`, `disposables`, `_0x8844`, `_0xe8a7`,
`_0x5c1f`, `GoogleRelease`, `_0xwatch`, `GoogleScuttle`) and **all 12 are referenced more than
once**. Cutting it into four files therefore produces four IIFEs that each throw `ReferenceError` on
the first cross-piece reference.

The correct split is to **hoist the 12 bindings onto shared state** (e.g. `_0xmod._e = {}`) and
rewrite every reference, then partition. That is a genuine refactor of a 145 KB file, and it needs
the full cascade plus the gate set to verify. It was **not attempted** rather than attempted badly —
the R2-02 failure in bundle 1 is the precedent for what a rushed structural change costs.

Also note the lane wiring is per-tag and explicit: `build-s4-final-package.js:26-28` maps each tag
to a *lane directory* (`v1-jso-s3matrix/shard-a-out.js`, `v2-jsc/shard-m-out.js`,
`u/shard-u-out.js`, …), and `obf-strings-g7.js:33` carries the 12-entry `TAGS` list. So 12 → 18
shards means editing `TAGS`, adding six lane entries, and re-checking the OTO lane assignment and
the stochastic selection that battery **PASS 15** pins.

### The split

Operator instruction: more than just `shard-e`, because splitting only `e` into two leaves a 3.0×
outlier — it moves the tell instead of removing it.

**Plan: 12 → 18 shards.** `shard-e` → 4, `shard-m` → 2, `shard-aux` → 2. Largest becomes ~36.7 KB
against a median near 15 KB → **max/median ≈ 2.4×**. Cost: census 1070 → ~1400, scaled for 18.

**Leave the four `shard-p-*` pockets alone.** Their size uniformity *is* the OTO equal-not-same
property, not a defect.

### The interaction with R2-05 — this is the part that matters

**H and R2-05 pull in opposite directions on one axis, and the split has to be planned around it.**

1. **`shard-e` holds the sensitive core.** It is 6× everything else precisely because the Discord
   store lookup, force-load and quest dispatch live there. R2-04 (custom VM) also targets that same
   core. So `shard-e` is about to be edited by two different work items.
   → **Split `shard-e` first, then VM the core inside the new layout.** Doing it the other way means
   splitting a VM'd blob, which is far harder to do safely.

2. **A latency gate needs a sequence to time.** R2-05a measures elapsed time across a *chain* of
   real operations. If that chain lives entirely inside one split piece, the gate is local and easy
   to locate. **Spread the timed chain across at least three of the new `shard-e` pieces** so the
   gate has no single home — the analyst must reconstruct the sequence across shards to find it.

3. **More shards means more independently-decodable string tables.** Each tag gets its own `skey`
   (`:162`, one per tag). Going 12 → 18 tags means **18 keys instead of 12**. That is a genuine,
   free side-benefit of H: more independent tables to lift, and the fiction/real boundary has to be
   re-derived per tag.
   → But it also means **18 places where R2-05b must derive a key correctly.** The round-trip
   assertion in §2 has to cover every tag, not one.

4. **Census growth interacts with the sweep traps.** `SWEEP_HONEY_N = 8` / `SWEEP_TUBE_N = 12`
   (`obf-strings-g7.js:71`) are calibrated to *distinct positions in the last 64*. Splitting shards
   changes how many distinct positions a legitimate boot touches. **These thresholds must be
   re-calibrated after the split, not before** — the comment at `:69-70` says exactly this
   ("set HUGE for the calibration build, then pin from measured legitimate maxes").

### Sequencing that respects all of the above

1. **Split `shard-e` → 4** (and `m`/`aux` → 2). Re-calibrate `SWEEP_*` from a HUGE-threshold
   calibration build.
2. **R2-05a latency gate**, with the timed chain deliberately spread across ≥3 of the new `e`
   pieces.
3. **R2-04 custom VM** over the sensitive core, now inside the split layout.
4. **R2-05b** runtime-derived keys across all 18 tags, behind a per-tag round-trip build assertion.

Doing H first is not just tidier — steps 2 and 4 both get materially harder if the shard layout
moves underneath them afterwards.

---

## 4. Status after bundle 3

| item | state |
|---|---|
| **R2-01b** remove the KPA oracle | **✅ landed and verified.** Templates now composed from `TUBE_NOUN`/`TUBE_VERB`/`TUBE_TAIL` fragments; **0 complete templates remain as literals** in the repo. |
| **R2-01a** widen the key | **dropped** — void while the key ships as a literal (§1). |
| **R2-02** known-plaintext prefix | still needs the two-sided loader change + repin (bundle 1 finding). |
| **R2-04** custom VM, core-only | unchanged; now sequenced after H. |
| **R2-05a/b** | **promoted to the top** of the queue (§1). |
| **R2-08** extended H | designed above, sequenced first. |
| **R2-09** CSS/HTML decoy | approved by operator; still P2, capped 200 KB, decoy-only. |
| **CAR-M** | unchanged; capacity blocker gone, halves known-plaintext leakage. |

### Verification of the R2-01b build

Full cascade re-run end to end:

`obf-strings-g7` → `obf-v1-s3matrix` → `obf-minify-family` → `obf-u-canon` → `obf-u-per-type` →
`build-s4` all **OK** · battery **25/25** · carrier built (occupancy 61.86 %, 1,398,198/2,260,322;
G8 auto-repinned `a65deda2,15fbffdc,832bd1a6`; HNT-GREP 173 strings +2,545 B) · tiers **43/0** ·
gated `S8 S9 S10 S12 S15` × {bundle, real.min} **10/10 ALL PASS** · 16-point **14/16** (Pt05 +
Pt13, the same two long-standing failures).

**Not paste-tested.** The live `Working-Stable/O8.13` build (`e008b377`) is left in place; this r2
candidate needs a Discord paste before it is promoted.
