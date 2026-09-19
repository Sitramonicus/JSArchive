# CC-10 — CAR-M carrier laboratory candidate

**Status:** candidate-only; laboratory verification PASS  
**FaCs:** FaC-14, FaC-16

CC-10 is deliberately a separate carrier laboratory path. It uses a printable serialized metadata
fixture, not executable payload bytes and not a delivery/loader integration. The experiment compares
four-bit same-cover embedding with two-bit conversion. The naive same-cover two-bit variant is
correctly rejected as over capacity; the viable measured alternative is a deterministic expanded
carrier. The experiment records capacity, PSNR, maximum channel delta, corruption rejection,
repeated extraction, and memory samples.

## Artifacts

- `source/carm-codec.mjs` — bounded offline codec for non-executable records.
- `candidate/cc10-carm-expanded-cover.bmp` — deterministic two-times-height laboratory cover.
- `reports/cc10-lab.json` and `reports/cc10-lab.md` — measurements and gate result.
- `reports/security-hardening.json` — bounded malformed-input and capability-negative checks.
- `reports/security-hardening.json` — bounded malformed-input and capability-negative checks.
- `tools/run-cc10.mjs` — reproducible bounded lab runner.

The same-cover pin is preserved: 3,483,480 two-bit payload symbols versus 2,260,322 available
positions. With frame overhead, the rejected attempt reports 3,483,528 required symbols.

CC-10 does not modify O8.13-r3 and does not approve a carrier, loader, executable payload, or live
delivery path.
