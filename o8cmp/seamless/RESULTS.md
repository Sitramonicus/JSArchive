# Seamless whole-file obfuscation trial (2026-09-09)

## VERDICT (user asked: determine the better option, do not just offer a menu)

**Winner for this case: javascript-obfuscator, one uniform whole-file pass
(`obfuscate-final.js`), run as the LAST-MILE step per final instance.**

Why it beats JSConfuser for *this* project:
1. **Determinism.** Fixed seed -> byte-identical artifact for the same input
   (verified: `obfuscate-final.js` reproduces the validated trial artifact,
   sha256 2f55b815...). JSConfuser has no seed; every rebuild is a new file,
   which breaks the project's byte-exact regeneration and canonical-sha
   provenance convention.
2. **Size.** 256 KB vs 353 KB. Paste-length matters (Discord/Telegram);
   the user already hit a 16 MB paste freeze with whole-file VM. The lighter
   uniform pass is the sane ceiling here.
3. **Tool identity vs. what we actually use.** JSConfuser's distinctive
   techniques are CFF, dispatcher, global concealing, variable masking —
   precisely the ones turned OFF for this project (async engine, obfuscator
   signature, author-admitted LLM peelability). Stripped to its basics it has
   no real advantage over javascript-obfuscator, which additionally gives us
   string-array rotate/shuffle and seeding. Nothing in js-confuser v2's
   default options survives that filter except cosmetic renames/concealing.
4. **Faster, same validation.** Both pass node --check, obf-smoke 3/3,
   unlock ALL PASS; jso took 1.3 s to jsc's 2.6 s.
5. **Seam hiding is equal.** Both emit one single line, zero `_0xmod`
   markers, zero seam headers, console.clear() preserved first.

JSConfuser remains a diversity fallback (rarer fingerprint) if a per-instance
alternating-engine scheme is ever wanted — at the cost of nondeterminism.

## Workflow

- Do NOT obfuscate during development. Build the clean stitched product,
  run the battery, and only then run:
  `node /home/user/o8cmp/seamless/obfuscate-final.js <clean-final.js> [out.js]`
- New features land in the clean product; the last-mile pass is agnostic to
  content, so it needs no config changes as the script evolves.

## Trial record (both candidates fully validated)

Goal: hide the six-shard seams in the final product (O8.5-Shard-3.js). Cause of visible
seams: six `(function (_0xmod) {` headers + 26 `_0xmod` contract refs + a 121 KB shard-e
next to 5-19 KB siblings, plus (in the per-piece obf reference) six different per-piece
obfuscation styles stitched together.

Fix: one UNIFORM obfuscation pass over the whole stitched body (after the
`console.clear();` first line, which is re-prepended — invariant kept).

| file | engine | size | run time | seam headers | `_0xmod` refs | lines | sha256 |
|---|---|---|---|---|---|---|---|
| final.js (current product) | none | 192,030 B | - | 6 | 26 | 2055 | 76da265c...922c |
| O8.5-Seamless-jso.js | javascript-obfuscator 5.6.0, uniform | 256,449 B | ~1.3 s | 0 | 0 | 1 | 2f55b815...4dd0 |
| O8.5-Seamless-jsc.js | js-confuser 2.1.3, uniform | 352,917 B | ~2.6 s | 0 | 0 | 1 | 07e05ca1...9df |

## Configs

- jso: stringArray base64 + rotate + shuffle (threshold 0.9), hex idents, no CFF/dead
  code, all standing invariants (renameGlobals off, selfDefending off, etc.), seed
  0x76da265c -> deterministic.
- jsc: renameVariables randomized, renameGlobals false, stringConcealing, calculator,
  hexadecimalNumbers, flatten, deadCode 0.02, compact single line, no CFF/dispatcher/
  objectExtraction/movedDeclarations/globalConcealing, pack off (no eval/Function).
  js-confuser v2 returns {code,map,ast} — use .code.

## Validation (both PASS)

- node --check: OK both.
- obf-smoke.js (full WATCH_VIDEO lifecycle + armed Alt+Shift+R reload): PASS 3/3 both
  (jso 11.6 s, jsc 45 s / 15 s rerun).
- unlock-unit.js: UNLOCK-UNIT: ALL PASS both.
- console.clear() first statement preserved in both.
- No comments emitted by either engine.

## Notes

- js-confuser = JSConfuser (npm js-confuser 2.1.3, MichaelXF, MIT, Babel-based). NOT the
  same project as javascript-obfuscator (npm, sanex3339/obfuscator.io, BSD-2). Different
  engines, option names, and output fingerprints. v2.1.3 author's own changelog: CFF is
  LLM-peelable ("one-shot-able by mid-tier models") — treat as cosmetic-plus, not armor.
- Both outputs single line; behavior text/logs identical at runtime (lexicon words intact).
- Whole-file uniform pass means the six piece styles are no longer distinguishable at the
  product level; per-piece differentiated pieces still exist for the modular delivery.
- Not done: promote to a release bundle (ask user which candidate); heavier jso variant
  (RC4/dictionary naming whole-file) untested; jsc variant with stringEncoding /
  stringSplitting / globalConcealing untested.
- Runners: run-jso.js, run-jsc.js (need node_modules: see jso/ and jsc/ dirs, reinstall
  js-confuser@2.1.3 / javascript-obfuscator@5.6.0 if wiped).
