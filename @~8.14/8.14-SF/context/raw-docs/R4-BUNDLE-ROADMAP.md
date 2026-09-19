# O8.13-r4 bundle roadmap — SUPERSEDED

> **2026-09-19:** O8.14 is now the active planning line. Use `Active/O8.14/O8.14-FAC-CC-PLAN.md` for the locked FaC/CC list and next bundles. This O8.13 note is retained only as historical context.

**Status:** historical design decision record; no r4 runtime mechanism was added.  
**Objective:** make analysis more expensive while reducing unnecessary host calls, memory spikes,
and delivery footprint. The decoder traces are threat-intelligence about analysis paths, not a
statement about project intent.

## F2–F9 resolution plan

| item | owner-side resolution | r4 measure | priority |
|---|---|---|---:|
| F2 dynamic evaluation boundary | Prefer static modules or a restricted data-only interpreter. If dynamic evaluation remains, keep the decoded lifetime and capability scope bounded and treat the boundary as observable. | evaluator-hook visibility, decoded-buffer lifetime, peak/retained heap, abort cleanup | P0 |
| F3 host calls / telemetry | Remove unused routes; local/mock default; explicit host method/route/body allowlist; no telemetry falsification. | host-call count, route/method/body inventory, bytes and timing per call | P0 |
| F4 branch-sensitive decoys | Keep useful decoys, but add a private deterministic branch matrix that exercises every branch and records I/O and allocations. | branch coverage, host-call coverage, false-fallback rate, repeated-run determinism | P0 |
| F5 recoverable string/representation layer | Remove repeated pipeline templates; separate stable data from code; benchmark representation variants. Do not claim client-side secrecy. | static recovery effort on a fixed fixture, bundle size, parse time, memory | P1 |
| F6 global unlock surfaces | Remove unnecessary globals; close over state; expose the minimum capability; keep test gates explicitly non-sensitive. | global export census, same-origin replacement test, unlock-surface count | P1 |
| F7 memory/cleanup | Bound decoded length before allocation; chunk/stream data where practical; restore hooks/listeners/timers in `finally` paths. | peak heap, retained heap after cleanup, timers/listeners, repeated-paste stability | P0 |
| F8 same-origin messaging | Minimize or remove the handshake; send no sensitive values; use a small explicit schema. | message count/bytes, race behavior, retained listeners | P1 |
| F9 release assurance | Keep current manifests, self-identifying names, live link, and verifier. Label historical results clearly. | manifest parity, verifier, artifact provenance | P0 |

## Four mechanism decisions

### 1. Bounded table-driven parser / state machine — **implementable in a lab fixture**

Use for a small, finite, non-executable data grammar. It is the best tradeoff among the four for
memory and portability if it replaces a large ad-hoc decoder. It must be linear-time, allocation-
bounded, and separate from host capabilities. It is not a general code interpreter.

### 2. Compact micro-interpreter — **conditional**

Only consider it if it replaces arbitrary source evaluation with a restricted data language. Keep
it small, deterministic, capability-free by default, and measured for opcode-table size, peak heap,
and execution time. Do not wrap the existing hidden JavaScript in another layer; that adds a second
landmark without removing the final evaluation boundary.

### 3. XSLT/XML — **offline/fixture only for r4**

It is a genuinely different parser surface, but runtime DOM/XML allocation, CSP, browser support,
and escaping costs are too high for the critical loader without a compatibility bench. It can be
used as an offline representation experiment, not as a required live dependency.

### 4. WebGL/GLSL — **do not use as a required runtime layer**

GPU context availability, driver variation, shader compilation, CSP, startup variance, and memory
uncertainty make it a poor r4 dependency. A bounded optional data-transform bench is acceptable;
core correctness must not depend on it.

### Non-JavaScript representation option

R2-09's HTML/CSS route is separate from the four above. It is the only non-JavaScript surface worth a
small bounded experiment, but a live `<style>`/CSSOM path gives up the current zero-DOM property and
adds retained memory. It may carry a small decoy or metadata layer; do not move the real executable
payload into CSS. A 100–200 KB text ceiling is a research cap, not an acceptance result.

## CAR-M — definite next steps

1. Build an isolated, non-executable carrier fixture.
2. Measure the current r3 4-bit baseline first.
3. Test three branches separately: larger carrier, split reels, and reduced data stream.
4. Record capacity, PSNR, maximum channel delta, low-bit distribution, clean round-trip, wrong-cover,
   wrong-seed, wrong-length, wrong-CRC, truncation, bit-flip, decode compatibility, peak heap, and
   retained heap after repeated extraction.
5. Reject any candidate that needs unbounded allocation, evaluates extracted data, or fails to beat
   the r3 baseline on required visual/compatibility metrics.
6. Keep CAR-M out of the live mirror until a separate go-live decision.

The current same-cover 2-bit one-reel arithmetic remains over capacity: 3,483,480 required symbols
versus 2,260,322 available positions. That is why the research branches are necessary.

## R2-08 — definite next steps

1. Capture B0 baselines for source size, generated output size, host calls, startup, peak/retained
   heap, listener/timer count, and cleanup.
2. Split the host/store adapter, scheduler/progress state machine, transport allowlist, cleanup,
   and telemetry plumbing in a mock-host branch.
3. Evaluate the extended H split beyond `shard-e`; measure whether source and generated output become
   less concentrated rather than assuming they will.
4. Keep new modules free of new endpoints, storage/cookie access, global exports, and dynamic code
   generation.
5. Run syntax, unit, malformed-input, abort, repeated-run, host-call, memory, 25-pass, 16-point,
   and 43/0 checks.
6. Promote only if the measured footprint and reviewability improve without increasing host surface.

R2-08 is not rejected and is not automatically bundled with CAR-M. They should be integrated only
after their separate measurements pass.

## R2-09 and R2-10

### R2-09 — HTML/CSS decoy: **conditional and subject to change**

Keep it P2. First run an offline CSSOM/memory/compatibility bench with a small non-executable fixture.
If it breaks zero-DOM assumptions, raises retained heap, or adds unwanted host/DOM traceability, keep
it offline or drop it. Do not make it part of the r4 core by default.

### R2-10 — D/CAR-R true four-way carrier: **subject to change**

Separate codec research from delivery integration:

- R2-10A: test `R9R0..R9R3` interleave and extraction on an offline fixture;
- R2-10B: measure carrier capacity, corruption behavior, PSNR, memory, compatibility, and delivery
  URL/loader constraints;
- only integrate it if the four-way form is materially better than the single outer lane and does
  not break the supported delivery path.

Do not combine R2-10 with CAR-M in the first integrated candidate; otherwise failures cannot be
attributed cleanly.

## Bundle sequence

### B0 — baseline and instrumentation

No runtime behavior change. Capture F2–F9 metrics and lock the r3 comparison set.

### B0.5 — low-risk F5 template cleanup (optional, separate candidate)

Apply the R2-06 idea separately: remove or neutralize plain pipeline-label strings that provide a
free structural map. Measure bundle size, decoded size, diagnostics, and test behavior. Do not mix
this with CAR-M or the first R2-08 split so any change is attributable.

### B1 — R2-08 modularization

Mock-host branch only. Source/module organization, memory, host-call, and cleanup changes. No carrier
format change.

### B2 — CAR-M laboratory branch

Non-executable carrier fixture only. Capacity/PSNR/corruption/compatibility/memory report. No live
promotion.

### B3 — one representation experiment

Choose either the bounded data parser or the restricted data VM. CSS/XML/WebGL remain offline-only
unless B0 measurements justify otherwise. Keep the experiment isolated from B1 and B2.

### B4 — integration candidate

Only after B1–B3 pass their own gates. Re-run 25/25, corrected 16/16, 43/0, manifest checks,
host-call allowlist, memory, cleanup, and operator-authorized live testing. Do not silently rewrite
the historical 14/16 into a new security claim.

## Recommended decision

Proceed with **B0 → optional B0.5 → B1**, run **B2 in parallel as a separate laboratory branch**,
and defer B3 until the baseline shows which footprint/analysis-cost problem is worth addressing. Treat R2-09 and R2-10
as conditional research items, not fixed commitments.
