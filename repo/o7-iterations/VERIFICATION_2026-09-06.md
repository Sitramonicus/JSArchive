# O7 Verification Run — 2026-09-06 (headless)

Follow-up handoff verification executed on the cloned repository
(`https://github.com/Sitramonicus/JSArchive`), per the handoff's ordered task list.
No live client run was performed. No quest-script source was modified.

## 1. Inventory — latest complete source available

- Latest **checked-in** complete source: `o7-iterations/O7.31.js`
  (sha256 `4cf0725024c7c60870606527c2019807cfdd1548078e12aacc0dd045b3c0dd56`).
- O7.32–O7.37 exist only as diagnostic reports/MDs; O7.38–O7.42 sources are
  chat-only and were never checked in (README.md and CURRENT_STATE.md both state this).
- The recommended deterministic pre-O7.42 baseline (O7.41) is therefore **not
  materialized in the repository**. Its exact requirements are documented in
  `O7.39-41_COMPLETE_CHANGE_CHECKLIST.md`.
- `dev/all_scripts.txt` and `compiled-scripts-A-to-O7.js` contain no O7.x
  iteration sources beyond what is already checked in.

## 2. Syntax validation

`node --check` over all 38 checked-in `.js` files (O7.1–O7.31, root O1–O4, N14–N15,
harnesses, lifecycle regression): **38/38 pass, 0 failures.**

Standalone lifecycle regression (`tests/lifecycle-regression-o721.js`): **pass**
(5 release-ordering runs + dispatch-failure case).

## 3. Capture-block comparison (O7.12 vs O7.30 vs O7.31 vs documented O7.41)

| Version | Capture form | Selection priority | Chunk-entry removal |
|---|---|---|---|
| O7.12 (line 105) | `_0x2 = _0x1.push([[Symbol()], {}, r => r])` | push return only | unconditional `pop()` |
| O7.30 (155–162) | callback assignment `r => { _0x2 = r; }` | callback only; exits "no usable runtime" if `_0x2.c` missing | `try…finally`, length-checked |
| O7.31 (155–162) | callback assignment + push return stored | callback first; push return only as fallback | `try…finally`, length-checked |
| O7.38/O7.41 (documented, chat-only) | callback arg + push return | **push return first when `.c` usable**; falls back to the chunk array, not the callback | `try…finally`, length-checked |

O7.31's priority order (callback-first) is the **inverse** of the O7.38-confirmed
repair (push-return-first). The repository's newest source does not yet carry the
confirmed capture ordering; that ordering exists only in chat-era docs.

Other capture-line invariants verified present in O7.12/O7.30/O7.31:
- fixed-key decoder `_0xK = 0x2A`, `_0xD = a => String.fromCharCode(...a.map(c => c ^ _0xK))` — present unchanged;
- no lazy-module forcer — no code iterates `_0x2.m` executing definitions (scan is read-only over `_0x2.c`); confirmed absent in all three.

## 4. Seven-pocket gate — fail-closed audit

- Discovery loop and loop-break require **all seven** pockets in every checked-in version.
- The **post-scan return guard is five-pocket** in O7.12 (line 137), O7.30 (199),
  and O7.31 (203):

  ```js
  if (!_0x3 || !_0x4 || !_0x5 || !_0x8 || !_0x9) { …GoogleRelease(); return; }
  ```

  It does **not** check `_0x6` or `_0x7`. If the module scan is exhausted with
  only those five found, the run proceeds with `_0x6`/`_0x7` unset.
- `_0x6`/`_0x7` are used later (e.g. activity-doorway guard at O7.31 line 671;
  MemberCount guild path at line 206), so this guard is **fail-open** for those two.
- The corrected all-seven `pocketsComplete` gate exists **only in chat-era docs**
  (CURRENT_STATE.md, CHAT_REVISION_CONTEXT.md, O7.39-41 checklist). Repo-wide grep
  for `pocketsComplete` returns zero hits in source files.

**Conclusion: the checked-in line does not satisfy the documented fail-closed
invariant. The seven-pocket gate must be re-materialized (O7.41 source) or ported
as a minimal patch before the repo can be called baseline-complete.**

## 5. Harness matrix (headless)

Matrix = 3 versions × 6 harness regimes (`default`, `hidden`, `long-video`,
`real-array`, `real-hidden`, `real-long`). Two capture regimes are modeled:

- default-style stub: `push()` returns the runtime object; entry callback never invoked;
- real-array stub: real array push returns `length`; callback invoked with the runtime.

| Version | default / hidden / long | real-array / real-hidden / real-long |
|---|---|---|
| O7.12 | **full pass** (pockets true, quest complete, armed chord → reload) | gate exit, all pockets false (callback ignored; push return is `length`) |
| O7.30 | early exit "doorway returned no usable runtime" (callback never fed) | **full pass** |
| O7.31 | **full pass** (after harness fix; see §6) | **full pass** |

This headlessly reproduces the documented capture-regime split: pure push-return
capture (O7.12) needs a usable push return; callback-only capture (O7.30) needs
the callback to fire; dual capture (O7.31) survives both stubs. The harnesses
cannot emulate the live client's distinguishing case (both channels deliver
`.c`-bearing objects with different cache contents), which is why the live
O7.38 push-return-first result remains the decisive evidence.

Visibility pause observed in the O7.31 hidden run ("Curtains drawn — taking the
long hallway"), with clean completion.

## 6. Independent finding — harness tooling defect (fixed)

O7.12's `GoogleSay` uses `console.log`; O7.30+ uses `console.debug`. The
`harness-default/-hidden/-long-video` variants (and `dev/harness.js`) intercepted
only `console.log`, so for O7.30+ the "press Alt+Shift+R" arm message was never
seen, the chord was never simulated, and the armed script's route-watch interval
(`_0xwatch`, intentionally non-unref'd) kept the process alive until the run was
killed — exit 124 misread as a failure/hang.

Fix applied **in place** to `dev/harness.js` and the three harness variants: the
chord-simulation wrapper now hooks `console.debug` as well (the `real-*`
variants already did). Sanity rerun of O7.31 under the fixed default harness:
full lifecycle to `<<RELOAD CALLED>>`, exit 0 in ~19 s.

No independent quest-script lifecycle defect was confirmed by this run; the
earlier O7.26/O7.27–O7.30 audits stand (no new findings).

## 7. Status against the checklist (O7.39-41_COMPLETE_CHANGE_CHECKLIST.md)

| Question | Checked-in O7.31 | Documented O7.41 requirement |
|---|---|---|
| Push-return selected before callback candidate? | No (callback first) | Yes |
| Decoder fixed at 0x2A? | Yes | Yes |
| Exactly one complete seven-pocket gate? | No (five-pocket guard) | Yes |
| `_0x6`, `_0x7` in the gate? | No | Yes |
| Lazy-module forcer absent? | Yes | Yes |
| `LOG_LEVEL`/Log module (level 1)? | No (direct `console.debug`) | Yes |
| Lifecycle/progression/retry/cleanup parity | Present per O7.30 line | Yes |

## 8. Next actions (blocked on one input)

1. **User pastes the exact O7.41 source** (preferred deterministic baseline) — or the
   current O7.48 if the newer line is to be maintained instead.
2. Materialize as `o7-iterations/O7.41.js`; record sha256 before any edit
   (per LOOP_AND_VALIDATION.md and HANDOFF_SHA256SUMS convention).
3. Verify the seven-pocket fail-closed gate and push-return-first capture in the
   materialized source.
4. `node --check`; run the full fixed-harness matrix and lifecycle regression.
5. Update CURRENT_STATE.md with live result when the user next runs it in the client.

Files touched this run (all in the local clone, not pushed):
`dev/harness.js`, `o7-iterations/tests/harness-default.js`,
`o7-iterations/tests/harness-hidden.js`, `o7-iterations/tests/harness-long-video.js`
(chord simulation now hooks console.debug), `CURRENT_STATE.md` (state update),
and this report.
