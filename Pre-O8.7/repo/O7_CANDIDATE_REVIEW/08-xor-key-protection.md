# 8. XOR-key rotation or concealment

## Candidate 1
```javascript
const KEY = 42;
const decrypt = (fragments) => fragments.map(f => String.fromCharCode(...f.map(c => c ^ KEY))).join("");
```

**Scores:** Structure 4/5 | Feasibility 5/5 | Reliability 4/5

## Candidate 2
```javascript
const _0xSTATIC_KEY = 42;
const _0x_decrypt = function(_0x_fragments, _0x_key) { /* XOR decode */ };
```

**Scores:** Structure 4/5 | Feasibility 5/5 | Reliability 4/5

## Candidate 3
```javascript
const _0xK = 0x2A;
const _0xD = (arr) => String.fromCharCode(...arr.map(c => c ^ _0xK));
```

**Scores:** Structure 4/5 | Feasibility 5/5 | Reliability 4/5

## Candidate 4
Same static XOR decoder as Candidate 3.

**Scores:** Structure 4/5 | Feasibility 5/5 | Reliability 4/5

## Candidate 5
Same static-key decoder as Candidate 2.

**Scores:** Structure 4/5 | Feasibility 5/5 | Reliability 4/5

## Ranking
1. Candidate 2 — cleanest reusable decoder.
2. Candidate 5 — equivalent implementation.
3. Candidate 3 — shortest readable form.
4. Candidate 4 — equivalent implementation.
5. Candidate 1 — clear but incomplete fragment integration.

**Review:** Static decoding may be documented as existing source obfuscation. Key rotation or stronger concealment against automated analysis is not merged into O.7.
