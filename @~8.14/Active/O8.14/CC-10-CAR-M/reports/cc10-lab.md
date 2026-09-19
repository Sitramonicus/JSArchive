# CC-10 / CAR-M laboratory report

- **Status:** PASS; candidate-only
- **Runtime integration:** none; non-executable fixture only
- **Input cover:** `Uploads/stego2-cover-1024-scaled.bmp`
- **Input SHA-256:** `d53a257478996d607499728cadc894d1b3dc3d51f04a7d7c417a9795b9d8d738`
- **Expanded alternative:** `candidate/cc10-carm-expanded-cover.bmp`

## Capacity

- Same-cover positions: **2260322**
- Four-bit payload symbols: **1741740**
- Naive two-bit payload symbols: **3483480**
- Naive same-cover result: **over-capacity:3483528:2260322**
- Expanded-cover positions: **4619822**

## Measurements

- Four-bit round trip: PASS
- Four-bit PSNR / max delta: 33.57 dB / 15
- Expanded two-bit round trip: PASS
- Expanded two-bit PSNR / max delta: 45.73 dB / 3
- Corruption rejection: PASS
- Repeated extraction: 8 runs; byte-identical
- Peak/retained memory samples recorded; explicit GC available: true
- Security hardening negatives: PASS

This laboratory result does not approve a carrier, loader, executable payload, or live delivery path.
