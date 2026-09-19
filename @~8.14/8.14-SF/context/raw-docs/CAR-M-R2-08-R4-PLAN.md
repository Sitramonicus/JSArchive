# R4 research plan — CAR-M and R2-08

**Status:** queued research after the r3 freeze; no r3 bytes are changed by this plan.  
**Purpose:** explore additional representation avenues for analysis resistance while measuring memory,
footprint, portability, correctness, and host telemetry. This is not a claim that a client-side
artifact can become impossible to decipher.

## Baseline: what r3 actually contains

The r3 carrier is a 1024×768, 24-bit BMP. The current codec is:

- scattered **4-bit** real-channel embedding;
- `R_LEN = 2,260,322` available byte positions after the strip and header-derived slack;
- live real channel: **1,741,740** 4-bit symbols, **77.06%** occupancy;
- `need = stream.length * 2` in `stego3-codec.mjs`;
- bytewise `KS_A=41`, `KS_B=17` transform;
- a deterministic random prefix before gzip, skipped by the loader;
- no 2-bit dither, ChaCha8 carrier, variable-RS layout, or split reel in the frozen bytes.

The last point matters: older notes describe a research branch as if it shipped. It did not.

## CAR-M — 4-bit to 2-bit

### Capacity verdict

A same-cover, one-reel conversion is **not viable** for the current payload:

```text
current 4-bit symbols       1,741,740 / 2,260,322 = 77.06%
naive 2-bit symbols         3,483,480 / 2,260,322 = 154.11%
over capacity                1,223,158 symbols
```

With this carrier geometry, a 2-bit one-reel experiment would need the total encoded stream to be no
more than about **565,080 bytes**, including its header; the current compressed payload is materially
larger. The earlier claim that 2-bit would fit used a different slot definition and should be retired.

### Viable research alternatives

1. **Larger carrier:** measure a new carrier with enough byte positions. Compare delivery size,
   memory, visual quality, and analysis cost against r3 rather than assuming “more layers” is better.
2. **Two independent reels:** split data with an explicit manifest, per-reel length, integrity tag,
   and bounded allocation. The first fixture must contain non-executable data.
3. **Payload reduction:** measure whether a benign data payload can be reduced below the approximately
   565 KB stream limit. Do not trade away integrity or reviewability for compression.
4. **Hybrid channel:** keep 4-bit for the current verified data and use 2-bit only for a separately
   measured data region. Treat it as a carrier-quality experiment, not a secrecy guarantee.

### CAR-M go/no-go gates

A candidate is not eligible for live testing unless all gates pass in an isolated fixture:

- exact round trip for clean and malformed carriers;
- wrong cover, wrong seed, wrong length, wrong CRC, truncation, and bit-flip rejection;
- hard maximum on decoded length and allocation before any buffer is created;
- no evaluation of decoded data in the carrier test;
- measured PSNR, maximum channel delta, low-bit entropy, row/strip boundary distribution, and
  compression size;
- repeated extraction memory stays bounded and returns to baseline;
- explicit comparison against r3's 77.06% / 43-0 / 25-25 baseline;
- independent review of the loader and host boundary before any live directory is touched.

**Decision for r4:** keep CAR-M as a separate measured research CC. It remains a planned next step,
not a rejected avenue and not a silent promotion to live.

## R2-08 — extended H / shard-e modularization

### Current size signal

The source shard outlier is real:

- `Active/O8.13/shards/shard-e.js`: **149,459 B**;
- next-largest source shard, `shard-m.js`: **24,495 B**;
- selected v1 output `shard-e-v1.js`: **1,312,805 B**;
- next-largest selected platform output, `shard-p-zoom-v1.js`: **174,115 B**.

Splitting only the source file does not guarantee a smaller or less concentrated compiled output. The
large generated tables may simply move to another file. That is why output size, peak memory, and
reviewability are acceptance measurements rather than assumptions.

### Safe interpretation of R2-08

R2-08 is ordinary functional modularization aimed at reducing concentrated footprint and improving
measurement:

1. isolate the host/store adapter;
2. isolate the task scheduler and progress state machine;
3. isolate the transport adapter and its explicit route allowlist;
4. isolate cleanup, abort, and telemetry plumbing;
5. keep interfaces documented and every host read/write traceable in the test fixture;
6. reduce dynamic source evaluation in the sensitive core where functionality permits;
7. measure whether moving any data or decoder boundary improves memory and analysis cost without
   adding host capability.

This does not require pretending the code is private. It makes the boundaries that an active analyst
will observe explicit, then measures whether the reorganization improves the owner's objectives.

### R2-08 acceptance gates

- same functional behavior in a local mock host;
- no new endpoint, storage access, cookie access, or global export;
- no dynamic code generation in any new module;
- no increase in maximum decoded allocation or listener/timer count;
- module-level syntax, unit, abort, malformed-input, and repeated-run tests;
- source map / provenance sufficient for a reviewer to follow every host read and write;
- size distribution, peak heap, retained heap, startup time, and host-call count measured;
- 16/16, 25/25, 43/0, and the host-side allowlist audit remain green.

**Decision for r4:** R2-08 is a planned, reviewable modularization CC after the security/host-boundary
measurements. It is not part of the r3 freeze and should not be bundled with a carrier-format change
until both sets of measurements are available.

## Proposed r4 order

1. Treat the decoder logs as analysis-path evidence, not as a statement about project intent.
2. Establish the host-call and memory baselines without writing or replaying credentials.
3. Prototype R2-08 in a benign mock-host branch and measure module/output/heap changes.
4. Prototype CAR-M on non-executable data and measure capacity, PSNR, corruption tolerance,
   compatibility, and memory.
5. Review G5/G6 separately; do not mix their behavior with either prototype.
6. Only after review, decide whether an r4 live candidate is justified.

## Explicit non-goals

- falsifying or suppressing telemetry;
- claiming that a client-side payload is confidential merely because it is represented differently;
- making WebGL, XML, regex, or a custom bytecode format a security boundary;
- adding host capability that is not in the explicit allowlist;
- changing `Working-Stable/O8.13/` without an explicit new go-live decision.
