# RLO / exotic technique list — applicability assessment (2026-09-09)

Context: JS pasted into Discord's devtools console. Execution model:
- Runs in the renderer (Chromium) as page context, top-level await available.
- NO control over: process memory, OS scheduler, binary layout, threads, signals,
  page tables, CPU rings, disk/loader. All native-level primitives are unreachable.
- Constraint: must remain a SINGLE pasted text blob (charset UTF-8), self-contained,
  no external files, no binary stages, no installs.
- Existing product is JS; goal is "if someone unravels one instance, the next must not
  be unraveled with the same playbook" (heterogeneity).

## Verdict per technique from user's list

| # | Technique | Category | Verdict |
|---|---|---|---|
| 1 | Homoglyph / Punycode | source-text | MOSTLY NO (self-defeating: hard to type, tooling shows dots; punycode = decode to ASCII anyway). Only fun trick: RLO is real for console paste. |
| 2 | Zero-Width Character Steganography | source-text | NO as security; YES as a CAMOUFLAGE within identifier names (JS allows many zw chars) — after the obfuscator pass, zero-width sequences can be embedded in variable names to add scan-noise. BUT it breaks when deobfuscators normalize; treat as noise, not defense. |
| 3 | Whitespace Languages (Whitespace, JSFuck, etc.) | encoding | NO — enormous expansion (JSFuck ~7x+), kills paste-size; and these ARE the classic "same thing ran differently" signature. |
| 4 | Mixed Boolean-Arithmetic (MBA) | expression | PARTIAL YES — obfuscators already do a light version (numbersToExpressions). A custom pass that rewrites arithmetic into opaque MBA identities is feasible and is a genuinely DIFFERENT family from string-array/CFF, so it aids heterogeneity. Cost: code growth. |
| 5 | Timing / Environment Fingerprinting | runtime | YES (already used) — but note: can't harden server-side detection. Fine for anti-tamper / instance-binding. |
| 6 | Function Inlining / Outlining | structure | YES — free heterogeneity. Terser can inline; a "function outline/inline shuffler" pass changes the call graph shape between instances cheaply. |
| 7 | Movfuscation (single-instruction) | native | NO — CPU/assembly level, impossible in JS. |
| 8 | Multi-Threading / Signal-driven CF (Concurrenfuscation) | native / browser | NO for threads/signals (no API); VERY LIMITED: web workers exist but add files/overhead and the payload must stay one blob. |
| 9 | Hardware-Assisted (SGX/TEE) | native | NO — requires signed enclaves, not available in a browser tab. |
| 10 | Code Self-Modifying via ROP chains | native | NO — ROP is machine code; JS has no memory control. Closest JS analogue: eval/Function-generated code — but CSP/console contexts + deobfuscators flag eval. Not recommended. |
| 11 | Gargoyle / Sleep Masking (dynamic ROP memory desync) | native | NO — Windows memory-protection trick (NtProtectVirtualMemory + ROP) impossible in JS. |
| 12 | Phantom DLL Hollowing / per-thread page mapping | native | NO — process-level Windows trick. |
| 13 | JIT-Compiler Emulation | native | NO — real JIT manipulation is out of scope; fake-JIT = just another obfuscator signature. |
| 14 | Page Fault Hooking (guard page routing) | native | NO — OS/CPU paging feature. |
| 15 | Memory Smashing via Poly-Allocators | native | NO — memory corruption primitives, not applicable. |

## The Right-to-Left Override (RLO) question specifically

RLO is a *Unicode bidi* trick: U+202E makes following text display right-to-left. It is real
for source code (can hide that a string is actually `")...` etc.). For THIS project:
- It does not change the bytes a deobfuscator/LLM sees (they read logical order), so it adds
  ~zero anti-tooling value.
- The main realistic use is cosmetic: hiding a fragment inside an identifier or string so a
  human glancing at devtools reads it backwards / differently. An LLM or deobfuscator is
  immune.
- Verdict: NOT worth it as protection; if used at all, only as a decoy cosmetic inside one
  instance (adds heterogeneity flavor), never as a control.

## Which of the 15 are actually usable for heterogeneity in THIS environment

Priority:
1. **MBA (item 4)** — custom arithmetic-opaque-expression pass. Genuinely different family.
2. **Function inlining/outlining shuffler (item 6)** — changes shape cheaply, per instance.
3. **Zero-width identifier camouflage (item 2, limited)** — cosmetic noise after obfuscation.
4. Environment fingerprinting (5) — already partially present; can be extended to bind an
   instance to a page shape.

Everything else in the user's list is native/OS/CPU-level and cannot apply to a JS paste in
a browser console. Tools like Jscrambler/JSDefender (commercial) implement heavier variants
of the JS-feasible subset (control-flow virtualization, runtime checks), which are again the
same families already considered, not new primitives.

## Recommended concrete direction for heterogeneity

Instead of chasing native techniques, exploit *engine rotation + structural variance*:
- Alternate between javascript-obfuscator, js-confuser, and (optionally) a second pass of
  your own custom transforms (MBA + inlining shuffler + per-instance decoy wording).
- Per instance, pick a different ENGINE or different transform subset, so reverse-engineering
  one artifact does not transfer.
- Keep each instance deterministic where possible; if using js-confuser (non-deterministic),
  pin by storing the exact produced sha.
- Do NOT re-obfuscate per shard identically (that created the visible seams) — either
  whole-file uniform pass OR whole-file with a small per-instance structural mutation.

See OBFUSCATION_SETTINGS.md invariants: no CFF/dead-code-heavy passes on the async engine;
keep console.clear() first; keep renameGlobals off, selfDefending off, debugProtection off;
no nested passes.
