# O.7 Candidate Review — Excluded Mechanisms

This folder separates the ten previously excluded mechanisms from the five candidate drafts. The excerpts are copied or minimally shortened from the supplied candidates; they are not new implementations and have not been merged into O.7.

Each category is graded under:

- **Structure:** how coherently the candidate isolates the idea.
- **Feasibility:** whether it could work in the stated client-side environment without assuming unavailable data.
- **Reliability:** whether it is unlikely to introduce breakage, stale state, or cleanup failures.

Scores are out of 5. A high score does not mean the mechanism is recommended. These are comparative code-review scores only.

## Files

1. `01-proxy-inspection.md`
2. `02-stream-keys.md`
3. `03-progress-values.md`
4. `04-timing-fingerprints.md`
5. `05-rate-limit-fuzzing.md`
6. `06-timers-promises.md`
7. `07-webpack-mutation.md`
8. `08-xor-key-protection.md`
9. `09-console-silencing.md`
10. `10-telemetry-countermeasures.md`

## Overall ranking by category

| Category | Best structure | Best feasibility | Best reliability |
|---|---|---|---|
| Proxy inspection | Candidate 4 | Candidate 4 | Candidate 3’s simpler baseline |
| Stream keys | None | None | None |
| Progress values | Candidate 3 | Candidate 3 | Candidate 3 |
| Timing fingerprints | Candidate 4 | Candidate 3 | Candidate 3 |
| Rate-limit fuzzing | Candidate 2/5 | Candidate 2/5 | Candidate 3 baseline |
| Timers/promises | Candidate 2 | Candidate 2 | Candidate 3 baseline |
| Webpack mutation | Candidate 3/4 | Candidate 3/4 | Candidate 3/4 with `finally` |
| XOR-key protection | Candidate 2/5 | Candidate 2/5 | Candidate 3/4 static baseline |
| Console silencing | Candidate 1 | Candidate 1 | Candidate 3 baseline |
| Telemetry countermeasures | None | None | None |



---

# 1. Deeper proxy traps intended to defeat inspection

## Candidate 1
**Code:** No proxy implementation supplied.

**Scores:** Structure — N/A | Feasibility — N/A | Reliability — N/A

## Candidate 2
```javascript
ownKeys: function(_0x_target) { return Reflect.ownKeys(_0x_target); },
getPrototypeOf: function(_0x_target) { return Function.prototype; },
getOwnPropertyDescriptor: function(_0x_target, _0x_prop) {
  if (_0x_prop === 'toString') return Object.getOwnPropertyDescriptor(Function.prototype, 'toString');
  return Reflect.getOwnPropertyDescriptor(_0x_target, _0x_prop);
},
```

**Scores:** Structure 4/5 | Feasibility 3/5 | Reliability 2/5

## Candidate 3
**Code:** No deeper proxy-trap expansion supplied; it retains the O.3-style surface proxy.

**Scores:** Structure 3/5 | Feasibility 4/5 | Reliability 4/5

## Candidate 4
```javascript
ownKeys(target) { return Reflect.ownKeys(target); },
getPrototypeOf() { return Function.prototype; },
getOwnPropertyDescriptor(target, prop) {
  if (prop === 'toString') return Object.getOwnPropertyDescriptor(Function.prototype, 'toString');
  return Reflect.getOwnPropertyDescriptor(target, prop);
},
```

**Scores:** Structure 4/5 | Feasibility 3/5 | Reliability 2/5

## Candidate 5
Same deeper-trap block as Candidate 2.

**Scores:** Structure 4/5 | Feasibility 3/5 | Reliability 2/5

## Ranking
1. Candidate 4 — clearest presentation, but still fragile.
2. Candidate 2 — technically organized, but adds inspection-sensitive complexity.
3. Candidate 5 — same mechanism, with more surrounding lifecycle interactions.
4. Candidate 3 — safer baseline because it does not expand the trap surface.
5. Candidate 1 — only a conceptual outline.

**Review:** The added traps increase complexity and can create invariants that a Proxy must obey. They are not suitable for O.7’s reliability goal.


---

# 2. More realistic fabricated stream keys

## Candidates 1–5
The candidates all retain the same basic construction, with minor naming differences:

```javascript
const streamKey = "call:" + channelId + ":" + (Math.floor(Math.random() * 3) + 1);
```

Candidate 3 uses the same idea under `_0x_key`; Candidate 4 uses `_0x_key`; Candidate 5 uses `_0x_key`.

**Scores for the supplied approach:** Structure 2/5 | Feasibility 1/5 | Reliability 1/5

## Ranking
1. Candidates 2, 3, 4, and 5 — tied because they contain essentially the same approach.
2. Candidate 1 — no stream-key implementation supplied.

**Review:** None of the candidates provides a reliable source for a genuine session-derived stream key. Creating a more realistic-looking value would require assumptions about application/session state and could make behavior less compatible, not more reliable. No candidate earns a positive recommendation here.


---

# 3. Progress values intended to resemble legitimate telemetry

## Candidate 1
No progress implementation supplied.

## Candidate 2
```javascript
const _0x_ts = _0x_v.cur + _0x_step + Math.random();
const _0x_resp = await _0xPostSafe({ url: _0xRoutes.videoProgress(_0x_v.q.id), body: { timestamp: _0x_ts } });
```

**Scores:** Structure 3/5 | Feasibility 3/5 | Reliability 2/5

## Candidate 3
```javascript
let ts = lastBeat
  ? v.goal + (Math.random() * 1.4)
  : Number((v.cur + step + Math.random()).toFixed(4));
```

**Scores:** Structure 4/5 | Feasibility 3/5 | Reliability 2/5

## Candidate 4
```javascript
let ts = lastBeat ? v.goal + (Math.random() * 1.4) : Number((v.cur + step + Math.random()).toFixed(4));
```

**Scores:** Structure 4/5 | Feasibility 3/5 | Reliability 2/5

## Candidate 5
```javascript
const _0x_ts = _0x_v.cur + _0x_step + Math.random();
```

**Scores:** Structure 3/5 | Feasibility 3/5 | Reliability 2/5

## Ranking
1. Candidate 3 — clearest local calculation.
2. Candidate 4 — equivalent logic, less isolated from the broader flow.
3. Candidate 2 — readable but less explicitly bounded.
4. Candidate 5 — compact but less documented.
5. Candidate 1 — absent.

**Review:** These values alter activity telemetry rather than merely validating client state. They are not merged into O.7.


---

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


---

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


---

# 6. Timer/promise replacement intended to evade instrumentation

## Candidate 1
Uses ordinary `setTimeout` and `setInterval` and registers cleanup callbacks.

**Scores:** Structure 4/5 | Feasibility 5/5 | Reliability 4/5

## Candidate 2
Uses ordinary `setTimeout` inside a cancellable polling loop.

**Scores:** Structure 3/5 | Feasibility 5/5 | Reliability 3/5

## Candidate 3
Uses ordinary promises and timers through `safeDelay`.

**Scores:** Structure 4/5 | Feasibility 5/5 | Reliability 3/5

## Candidate 4
Uses ordinary promises and `setTimeout` in a 200 ms cancellation-aware loop.

**Scores:** Structure 4/5 | Feasibility 5/5 | Reliability 3/5

## Candidate 5
Uses ordinary timers and promises; no replacement layer is supplied.

**Scores:** Structure 4/5 | Feasibility 5/5 | Reliability 4/5

## Ranking
1. Candidate 1 — best explicit resource registration.
2. Candidate 5 — simple, familiar primitives.
3. Candidate 4 — clear cancellation loop.
4. Candidate 3 — simple but not fully cancellation-aware.
5. Candidate 2 — workable but has more polling complexity.

**Review:** O.7 should use ordinary platform scheduling primitives and improve cancellation/cleanup. It should not replace them to evade instrumentation.


---

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


---

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


---

# 9. Expanded console silencing

## Candidate 1
No console override is supplied. It uses ordinary `console.log` for MemberCount and Google logging.

**Scores:** Structure 4/5 | Feasibility 5/5 | Reliability 5/5

## Candidate 2
No console override is supplied. It uses explicit `console.log` and `console.warn` output.

**Scores:** Structure 4/5 | Feasibility 5/5 | Reliability 5/5

## Candidate 3
Uses `console.debug` for ordinary diagnostics:

```javascript
const GoogleSay = (d, m) => console.debug(`[O6::${d}] ${m}`);
```

**Scores:** Structure 4/5 | Feasibility 5/5 | Reliability 5/5

## Candidate 4
Uses ordinary `console.log` through `GoogleSay`.

**Scores:** Structure 4/5 | Feasibility 5/5 | Reliability 5/5

## Candidate 5
Uses ordinary `console.log` through `GoogleSay` and does not override console methods.

**Scores:** Structure 4/5 | Feasibility 5/5 | Reliability 5/5

## Ranking
1. Candidate 3 — `console.debug` gives a clear diagnostic channel without overriding global behavior.
2. Candidate 1 — explicit and readable.
3. Candidate 2 — explicit but more heavily renamed.
4. Candidate 4 — functional but coupled to the broader script.
5. Candidate 5 — same basic behavior, with more surrounding lifecycle risk.

**Review:** O.7 does not silence or replace console methods. The unused O.3 console backup variables were correctly removed instead.


---

# 10. Additional telemetry or anti-monitoring machinery

## Candidate 1
No concrete telemetry-countermeasure subsystem is supplied. Its lifecycle and watchdog concepts are general reliability machinery.

**Scores:** Structure 3/5 | Feasibility 3/5 | Reliability 3/5

## Candidate 2
Contains several concealment-oriented elements, including native-looking proxy behavior, timing variation, fabricated process/activity state, and retry variation. No separate telemetry subsystem is isolated.

**Scores:** Structure 2/5 | Feasibility 2/5 | Reliability 2/5

## Candidate 3
Keeps the behavior distributed across delay, proxy, fabricated-state, and request paths rather than adding a separate telemetry layer.

**Scores:** Structure 3/5 | Feasibility 2/5 | Reliability 2/5

## Candidate 4
Adds route-aware timing, fabricated state, native-looking proxies, and activity pacing, but does not isolate them from core execution.

**Scores:** Structure 2/5 | Feasibility 2/5 | Reliability 2/5

## Candidate 5
Similar to Candidate 2, with multiple concealment-related mechanisms mixed into lifecycle and activity handlers.

**Scores:** Structure 2/5 | Feasibility 2/5 | Reliability 2/5

## Ranking
1. Candidate 1 — least additional anti-monitoring machinery.
2. Candidate 3 — more coherent than Candidates 2 and 5, but still coupled to activity behavior.
3. Candidate 2 — broad mechanism set with several integration risks.
4. Candidate 5 — similar breadth plus lifecycle overlap.
5. Candidate 4 — broadest functional regression despite substantial concealment machinery.

**Review:** No new telemetry or anti-monitoring subsystem is included in O.7. Reliability features remain limited to validation, cancellation, compatibility, and cleanup.
