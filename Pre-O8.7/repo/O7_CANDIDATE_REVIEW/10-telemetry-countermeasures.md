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
