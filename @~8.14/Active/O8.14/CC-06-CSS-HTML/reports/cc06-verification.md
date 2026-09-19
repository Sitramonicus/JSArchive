# CC-06 candidate verification

- **Gate status:** PASS
- **Status:** candidate-only; no live promotion
- **Candidate bundle:** `Active/O8.14/CC-06-CSS-HTML/candidate/cc06-css-html-raw-bundle.js`
- **Candidate SHA-256:** `6ac7702c5e59d920dbf9bf4322331ab27aa1cf5291e4152b0e6f5b7d4a38c28f`
- **Representation:** css-html; serialized record; parser-free normal path
- **Budget slot:** 731 bytes before / 731 bytes after
- **Network calls:** 0 outside the in-process simulated host; scenario HTTP counts are simulated
- **Frozen O8.13-r3 files modified:** none

## Gates

- PASS — sourceAndSyntax
- PASS — parserVmVectors
- PASS — simulatedRegression
- PASS — primaryPreserved
- PASS — networkIsolation
- PASS — noPromotion

## Static checks

- PASS — syntax
- PASS — markerInSource
- PASS — markerInBundle
- PASS — kindInSource
- PASS — boundedRecord
- PASS — budgetNeutralSourceSlot
- PASS — noNewRuntimeParserApi
- PASS — noRecordEvaluation
- PASS — f5Instruction
- PASS — parserVmBasePreserved

## VM/parser vectors inherited from CC-05

- PASS — add
- PASS — vars
- PASS — store
- PASS — lengthBound
- PASS — opcodeBound
- PASS — stackBound
- PASS — keyBound
- PASS — valueBound
- PASS — parserCaps
- PASS — parserDuplicateBound
- PASS — parserGrammarBound
- PASS — parserValueBound

## Simulated scenarios

- PASS — S0: logs=14, http=7, dispatches=0
- PASS — S1: logs=26, http=9, dispatches=102
- PASS — S4a: logs=20, http=1, dispatches=82
- PASS — S6: logs=25, http=11, dispatches=50
- PASS — S14: logs=61, http=25, dispatches=100

The candidate is not live-eligible. Full OTO/obfuscation, renderer, heap, cleanup, and real-host review remain separate gates.
