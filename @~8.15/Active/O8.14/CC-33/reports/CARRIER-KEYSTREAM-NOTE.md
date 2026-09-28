# Carrier keystream note — `r31_ksByte` is weak, and that is fine (if we stay consistent)

**Found:** 2026-09-20, while validating the R2-STEGO-TAIL grain.

## The measurement

```js
r31_ksByte(head, seed, i) = head[i % 54] ^ ((seed + KS_A * i) & 255) ^ ((KS_B * i) & 255)
```

Over 65,536 samples this produces **29 distinct byte values**, and its 2-bit symbol histogram is
`12.89 / 25.00 / 12.11 / 50.00 %` — not close to uniform. It is a repeating, invertible, low-entropy
stream. Nothing about it is cryptographic.

## Why the payload never exposed this

The payload region is `cipher = plaintext ^ keystream` where plaintext is **gzip output**. Gzip is
already near-uniform, so XOR with any fixed stream leaves a near-uniform result. Measured on the
shipped carrier: written-region symbol histogram 25.01 / 25.12 / 24.92 / 24.95 %, H ≈ 2.0000 —
indistinguishable from random. The weakness is invisible there because the *data* carried the
entropy, not the stream.

## What went wrong the first time

The first grain wrote raw keystream symbols into the tail, to continue the payload's stream. That
made the tail's own statistics **the stream's** statistics: histogram 20.99 / 18.07 / 40.52 / 20.41 %,
z(sym0) = 45.0 / 64.2 against the written region — a hard statistical edge exactly where the ungrained
carrier had a mild one.

## The rule that follows

**Any region of the carrier that must look like the payload region has to be built like the payload
region: uniform data XOR keystream.** The grain now draws a uniform byte from `r31_rng32(sd ^
R31_TAIL_DOM)` and XORs the reel's keystream into it, then writes the resulting 2 bits on the reel's
own plane. Result: written 25.01/25.12/24.92/24.95 %, tail 24.17/23.63/28.22/23.98 % (small tail,
n ≈ 262 k), z 0.88 / 2.51, tail entropy 1.99999.

Consequences worth remembering:

1. The grain is **not** recoverable by an analyst who does not have `head`, `sd` and the permutation —
   same standing as the payload.
2. Do **not** substitute a stronger stream "for safety". A different stream creates a *different*
   distribution and re-opens the boundary. Consistency with the payload is the requirement.
3. If the carrier is ever re-based on a real cipher (PLAN-H R2-05b), the tail must be rebuilt on that
   cipher too, in the same pass, or the two regions diverge again.
4. `R31_TAIL_DOM` is only a domain seed for the uniform component; it is not a security boundary.
