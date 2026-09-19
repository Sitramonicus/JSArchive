# Security and red-team review — CC-01 through CC-14

**Date:** 2026-09-19 (Asia/Shanghai)  
**Scope:** O8.14 candidate trees only  
**Status:** review finding; not a security certification, release approval, or GO LIVE authorization

## Executive finding

The user's criticism is substantially correct. The current CC-01 through CC-14 work is mostly bounded
engineering, representation experiments, provenance, and compatibility scaffolding. It is not a strong
new obfuscation layer. A capable red-team analyst would not be materially diverted from understanding
or dismantling the system by the current changes.

The main benefits are resource/capability containment and testability:

- bounded parsing and VM execution;
- bounded diagnostic capture;
- explicit cleanup;
- allowlisted injected delivery in the isolated CC-12 loader;
- provenance and compatibility checks.

Those are safety and review improvements, not secrecy. The current runtime candidates remain raw
source/stitch assemblies, and they retain the pre-existing host/evaluator surface. The runtime bundles
also contain a statically visible `(0, eval)("/* runtime unpacked hook */")` branch in the inherited
shell. The branch appears unreachable under its current masked comparison, but its presence means the
strong claim "no dynamic-code path" should not be used as a static security claim.

## Direct answers

### Does masking only the activity-deadline calculator improve obfuscation?

Not materially. The VM makes that small arithmetic recipe less obvious to a casual reader, but it does
not hide the worker's purpose, host routes, task names, activity flow, or cleanup model. The instruction
handlers, limits, call sites, and arithmetic can all be recovered from the candidate source. The runtime
key is a small FNV-derived value with a fixed fallback; it is not a secret and is not cryptographic.

The real value of the VM is bounded execution and a smaller input surface. It should be described as a
safety/control mechanism with minor superficial obfuscation, not as a meaningful anti-red-team barrier.

### What does “shard-n2 is replaced” mean?

`shard-n2.js` is one concatenated source fragment, not a complete second runtime. Inside it is an
existing serialized/no-op budget slot. CC-06, CC-07, and CC-08 replace the record in that slot while
keeping the slot at 731 bytes. They do not append three new active layers.

The inserted CSS/HTML, XML/XSLT, and GLSL records are strings. Each is length-checked, checksummed, and
then discarded. No DOM, CSSOM, XML parser, XSLT processor, WebGL context, shader compiler, or renderer
is invoked. That was deliberate for footprint safety, but it means these records are not meaningful
runtime obfuscation layers. They are serialized representation/footprint experiments.

They are also mutually exclusive because they occupy the same slot. CC-13 therefore builds three
profiles rather than pretending all three are active simultaneously.

## CC-by-CC assessment

| CC | What it actually changes | Obfuscation value | Security/resilience value | Red-team effect |
|---|---|---:|---:|---|
| CC-01 | Measurement observers and provenance around existing boundaries | None | Measurement only | Neutral; observers may reveal more structure |
| CC-02+03 | Bounded diagnostics and a single-flight primary activity adapter; preserves activity signal | Low | Medium | Not a meaningful diversion; boundaries are easier to describe |
| CC-04 | Small VM-S interpreter for two numeric decisions | Low/superficial | Medium | Static handlers and call sites expose it quickly |
| CC-05 | Five-field bounded parser for VM limits | Low | Medium | Adds validation, not meaningful concealment |
| CC-06 | Serialized CSS/HTML string in the existing n2 slot | None | Low | Marker and dead-data shape make it easy to classify |
| CC-07 | Serialized XML/XSLT string in the existing n2 slot | None | Low | Same; XML namespace text is not execution or network access |
| CC-08 | Serialized GLSL string in the existing n2 slot | None | Low | Same; `#version 300 es` is an obvious signature |
| CC-09 | Named host/store/transport/scheduler/cleanup/telemetry adapters under `_0xmod.r2` | Low/possibly negative | Medium | Centralizes the capability map; helps audit more than it hides |
| CC-10 | Offline CAR-M measurements on printable metadata | None in runtime | Laboratory only | No effect on runtime teardown or analysis |
| CC-11 | Offline four-lane `R9R0..R9R3` codec | None in runtime | Codec integrity only | Tags, CRCs, and lane structure are explicit |
| CC-12 | Bounded loader with caller allowlist and injected sender | None in current runtime | Medium in its isolated boundary | Improves fail-closed behavior; not an obfuscation layer |
| CC-13 | Three pairwise profiles and 55 compatibility rows | None | Compatibility/provenance | Multiple raw profiles give an analyst more comparison material |
| CC-14 | Multi-profile candidate manifest and copied artifacts | None | Provenance/review | Names, hashes, and profile relationships improve attribution |

## Static observations across the candidate runtime bundles

The CC-02+03 through CC-14 runtime profiles retain the inherited host-oriented surface, including
`window`, `document`, timers, message/dispatch plumbing, and the pre-existing evaluator boundary.
CC-09 does not remove that surface; it routes selected operations through adapters.

The inherited runtime bundle contains:

```text
(0, eval)("/* runtime unpacked hook */")
```

It is located in a fake-trap branch whose accumulator is masked to a byte before comparison with
`0xdeadbeef`, so the ordinary branch is not expected to fire. Nevertheless, static presence matters:
it is visible to code review and prevents an honest blanket claim that all dynamic-code capability has
been removed. The candidate reports' `dynamicCodeGeneration: false` field should therefore be read
narrowly as "no new or exercised dynamic-code generation was observed by the candidate gate"; it is
not a proof that the assembled source contains no evaluator token.

A bounded static scan of the non-tool JavaScript confirms the same inherited shell across CC-02+03
through CC-09: one evaluator token in the source and the corresponding one in the raw candidate
bundle (two occurrences per CC tree), no `new Function`, and the same broad
`window`/`globalThis`/timer/listener/postMessage counts. CC-13 and CC-14 replicate that shell across
their three profiles. The scan is evidence of retained surface, not a claim that the fake branch is
normally executed.

The following are not cryptographic protections:

- the VM's runtime key and fallback key;
- additive checksums in CSS/HTML/XML/GLSL records;
- CRCs in the offline carrier codecs;
- serialized decoys;
- `Object.freeze` on local metadata;
- raw-bundle hashes in provenance reports.

They provide integrity checks, attribution, or bounded behavior, but not confidentiality or strong
anti-reverse-engineering protection.

## Red-team disposition

At a high level, a capable red team would likely:

1. Identify the raw candidate assembly and compare the CC-05/CC-09/CC-13 profiles.
2. Ignore the non-consumed serialized records after confirming they have no runtime consumer.
3. Recover the small VM instruction table and its two call sites.
4. Map the existing host routes, evaluator boundary, global symbols, dispatch/overlay surfaces, and
   cleanup paths from the inherited engine.
5. Treat CC-10 and CC-11 as offline experiments and CC-12 as a separate loader boundary rather than
   as protection around the primary runtime.

The current changes may make accidental misuse, malformed-input crashes, runaway parsing, and cleanup
leaks less likely. They do not meaningfully delay a determined analyst from mapping or dismantling the
system. In a few places they make the system easier to audit because the capabilities are now named and
separated.

## Recommendation before any CC-15 work

Do not describe CC-04, CC-06, CC-07, CC-08, or CC-09 as successful obfuscation merely because they
move code, serialize strings, or dispatch through an indirection table. Reclassify them as bounded
runtime/representation changes unless a separate review defines and measures a real confidentiality or
anti-analysis goal.

Keep CC-13 and CC-14 candidate-only. Before any go-live compilation, require a dedicated architecture
review that explicitly decides whether the objective is:

- runtime safety and cleanup;
- source confidentiality/anti-analysis;
- carrier confidentiality/authentication; or
- compatibility/provenance.

The current candidates demonstrate the first and fourth objectives more than the second or third.
O8.13-r3 remains frozen and the proper 14r1 sharding/stego/packaging/password-test path remains
unfinished.
