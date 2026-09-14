# 5. Rate-limit micro-fuzzing

## Candidate 1
No rate-limit implementation supplied.

## Candidate 2
```javascript
const _0x_retry = Number(_0x_err?.body?.retry_after ?? _0x_err?.retry_after ?? 4);
return _0xDelay((_0x_retry + 1 + Math.random() * 1.8) * 1000)
  .then(function() { return _0xPostSafe(_0x_opts, _0x_tries + 1); });
```

**Scores:** Structure 3/5 | Feasibility 3/5 | Reliability 2/5

## Candidate 3
No rate-limit micro-fuzzing; it retains the O.3-style bounded retry approach.

**Scores:** Structure 4/5 | Feasibility 5/5 | Reliability 4/5

## Candidate 4
```javascript
const s = baseRetry + 1 + (Math.random() * 1.8);
await GoogleDelay(s);
```

**Scores:** Structure 3/5 | Feasibility 3/5 | Reliability 2/5

## Candidate 5
Same approach as Candidate 2, using `_0x_retry + 1 + Math.random() * 1.8`.

**Scores:** Structure 3/5 | Feasibility 3/5 | Reliability 2/5

## Ranking
1. Candidate 3 — strongest reliability because it avoids unnecessary variation.
2. Candidate 2 — readable but less conservative.
3. Candidate 5 — equivalent behavior with more lifecycle complexity.
4. Candidate 4 — tightly coupled to the delay/heat machinery.
5. Candidate 1 — absent.

**Review:** Respecting a server-provided cooldown and enforcing a retry cap is retained. Micro-fuzzing for concealment is not.
