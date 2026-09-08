# 4. Timing changes intended to defeat statistical fingerprinting

## Candidate 1
```javascript
const id = setTimeout(resolve, ms);
const check = setInterval(() => {
  if (stopCheck && stopCheck()) { clearTimeout(id); clearInterval(check); resolve(); }
}, 120);
```

**Scores:** Structure 3/5 | Feasibility 4/5 | Reliability 3/5

## Candidate 2
```javascript
const _0x_interval = 100;
setTimeout(_0x_tick, _0x_interval);
```

**Scores:** Structure 3/5 | Feasibility 4/5 | Reliability 3/5

## Candidate 3
```javascript
const base = d * 1000 + (850 + Math.random() * 700);
await safeDelay(base);
```

**Scores:** Structure 3/5 | Feasibility 4/5 | Reliability 3/5

## Candidate 4
```javascript
let durationMs = (seconds * 1000 + (850 + Math.random() * 700)) * _0xheat;
if (document.hidden) durationMs += Math.random() * 4000 + 2000;
```

**Scores:** Structure 4/5 | Feasibility 3/5 | Reliability 2/5

## Candidate 5
Uses the same variable delay and hidden-page adjustment as Candidate 4.

**Scores:** Structure 3/5 | Feasibility 3/5 | Reliability 2/5

## Ranking
1. Candidate 3 — simplest implementation.
2. Candidate 1 — strongest cancellation concept.
3. Candidate 2 — simple recurring delay.
4. Candidate 4 — most coupled to heat and visibility state.
5. Candidate 5 — similar behavior with more lifecycle coupling.

**Review:** O.7 may retain cancellation-aware waiting as a reliability feature, but not timing changes whose purpose is to defeat statistical analysis.
