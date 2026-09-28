# Why S1-B and S1-C are not closed

They are not proven impossible. They are open because their acceptance condition is not met.

## S1-B — control-flow run splitting

The mechanism is implemented and semantically gated. It can move ordinary eligible runs into helper declarations.
The remaining mass is not an ordinary eligible run:

- the worst window retains fixed material from buckets 12, 13, and 15;
- the remaining statements bind names whose visibility/initialisation is observable outside a helper boundary;
- some contain control flow, nested functions, async behavior, or labels;
- wrapping them without closure conversion changes scope or timing;
- the rejected `HOISTVAR` shortcut dropped source bytes and is therefore inadmissible.

Therefore S1-B is not “impossible”; the current run-wrap eligibility relation is too conservative to classify the
remaining fixed class as movable. Closing it requires either a safe closure-conversion/control-flow split or a
formal proof that each remaining class cannot cross a helper boundary.

## S1-C — reader-window placement

The reader-window machinery is implemented and its existing candidates pass the independent constraints. It does
not close S1-C because the remaining fixed statements are not merely misplaced run members. Their declarations and
control-flow bodies are the atoms occupying the worst window. A reader window can widen the legal placement range
for an already movable declaration/run; it cannot by itself turn a fixed control-flow statement into a movable item.

The current external ruler after the S1-A fix reads:

```text
worst 0.4025 · mean 0.2797 · excess 3.145 · windows above target 49/73
```

The next admissible mechanism is therefore an interface change between B and C: convert a fixed statement into a
scope-safe, order-safe movable unit first, then let reader-window placement distribute it. More reader-window
measurements alone cannot close the segment.

## Closure rule

- If the conversion is implemented and the integrated result reaches `windows_above_target = 0`, S1-B/C close.
- If every remaining fixed class is classified and a semantic proof shows conversion is unsafe, S1-B/C close with
  a formally unreachable proof.
- A green semantic battery with `49/73` windows above target does not close them.
