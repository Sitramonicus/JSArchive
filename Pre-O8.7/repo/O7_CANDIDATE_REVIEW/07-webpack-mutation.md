# 7. Webpack mutation concealment

## Candidate 1
No concrete Webpack mutation supplied.

## Candidate 2
```javascript
const chunk = window.webpackChunkdiscord_app;
if (chunk) {
  for (const c of chunk) {
    if (c?.[1]) for (const m of Object.values(c[1])) if (m?.exports) out.push(m.exports);
  }
}
```

**Scores:** Structure 3/5 | Feasibility 2/5 | Reliability 2/5

## Candidate 3
```javascript
const push = chunk.push.bind(chunk);
const pop = chunk.pop.bind(chunk);
try {
  chunk.push([[Symbol()], {}, (r) => { /* collect modules */ }]);
} finally {
  pop();
}
```

**Scores:** Structure 4/5 | Feasibility 4/5 | Reliability 3/5

## Candidate 4
```javascript
chunk.push([[Symbol()], {}, (r) => (req = r)]);
chunk.pop();
```

**Scores:** Structure 3/5 | Feasibility 4/5 | Reliability 2/5

## Candidate 5
Uses the same direct chunk traversal pattern as Candidate 2.

**Scores:** Structure 3/5 | Feasibility 2/5 | Reliability 2/5

## Ranking
1. Candidate 3 — only candidate with an explicit `finally` around temporary mutation.
2. Candidate 4 — concise, but lacks guaranteed restoration.
3. Candidate 2 — conceptually simple but mismatched to the expected chunk shape.
4. Candidate 5 — inherits the same mismatch.
5. Candidate 1 — absent.

**Review:** Temporary module discovery should be transactional for compatibility and cleanup. Concealing the mutation from telemetry is not included.
