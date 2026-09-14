# O.8.5-S4 — Transport Shape Audit (D phase)

Date: 2026-09-10. Scope: verify every network sink rides the application's own
request layer with native shape, cadence, and fail-closed behavior — and that the
script adds NO detectable telemetry signature of its own. Audit is against the
clean pieces in `shards/` (non-OTO state).

## Verdict

CONFORMANT. No direct network primitive exists anywhere in the payload; all
requests are made through the app's own captured HTTP module, so headers, cookies,
X-Super-Properties, UA, JSON key order and TLS all belong to the genuine client.

## 1. Sink inventory (everything that touches the network)

| Sink | Where | What it does | Shape |
|---|---|---|---|
| `GooglePost` / `GoogleGet` | shard-e ~461 | `_0x9.post.bind(_0x9)` / `_0x9.get.bind(_0x9)` — the app's HTTP module captured via the webpack chunk doorway | native headers/order by construction |
| `GoogleCall(fn, critical)` | shard-e ~467 | wraps every request: retry policy, heat multiplier, kill/pause checks, fail-closed | added logic is CONTROL flow, never transport shape |
| `GooglePostSafe` / `GoogleGetSafe` | shard-e 499-500 | critical=post(true), get(false) | — |
| `GoogleRoutes` | shard-e ~321 | builds URLs: `videoProgress`, `heartbeat`, `applicationsUrl`, `applications`, `tasks` | endpoints assembled from per-instance decoded constants (juggle int arrays) — **no literal URL in the file** |
| `GoogleId(v, what)` | shard-e ~308 | resolves an id (string/number/object candidates) before any URL is built | fail-closed: unresolvable -> warn + `null` -> request skipped |

Verified: grep for `fetch(`, `XMLHttpRequest`, `sendBeacon`, `WebSocket(`,
`new Request(`, `navigator.send`, raw `.open(` across all seven shards -> **0 hits**.
No `https://` literal anywhere (endpoints are decoded from int arrays at boot).
No new origins, no synthetic endpoints, no beacons/keepalives.

## 2. Shape parity

- Every request is `_0x9.post/get(...)` on the app's own module: the app attaches
  its own headers, X-Super-Properties, user-agent, cookies, JSON serialization and
  key order. There is no code path where the script builds a raw request.
- Payloads are the minimal body the quest endpoints expect: `{ timestamp }` for
  video progress; `{ stream_key, terminal }` for heartbeat; application fetches are
  GETs. No extra query parameters are appended beyond what the app's own route
  strings carry (src ids are part of the captured endpoint constants).
- No custom `Content-Type`, no hand-built auth, no `Origin`/`Referer` games.

## 3. Cadence

- Normal pacing uses the humanized delay model (lognormal around target, tails
  clamped) for between-step waits (`GoogleDelay`).
- Server-directed waits are NOT humanized: `GoogleDelayRaw` is used for 429/5xx
  backoff (a client does not "jitter" a server cooldown).
- Retry policy (in `GoogleCall`): 429 honors `retry_after` (bounded); 5xx bounded
  retries; 401 on a critical call ends the run; other errors fail the chore and
  move on. Heat multiplier cools over time.
- Visibility/navigation awareness: loops pause when the tab is hidden and when the
  route changes, and resume on return — no calls at moments a real idle client
  would not be calling.
- Queue refill happens only at drain boundaries (no background polling).

## 4. Decoded-material handling (ties to C)

- Endpoints and task tokens are at rest as juggle int arrays; decoded to plaintext
  only at boot into short-lived module strings (they are needed for every request,
  so they persist for the run — unavoidable; they are not secrets, the quest ids
  they carry are per-quest).
- No credential/digest at rest (digest is a byte array compared per unlock).
- No decoded log wording retained (lexicon draws decode per log fire only).

## 5. Fail-closed surface

- `GoogleId` unresolvable -> warn + skip (never a guess at another origin).
- Hook installs mirror original descriptors and return exact undo closures.
- URL guard from O8.3 retained: unreadable destination -> skip + warn.
- Duplicate-paste guard; single-start guard; seven-pocket gate (fail closed if the
  app's module doorway is not present).

## 6. Non-goals (recorded, rejected)

- No fake presence signals / synthetic input events (removed since O.2 — a
  script-invented event is permanently stamped not-genuine; losing under both
  outcomes).
- No heartbeat/presence mimicry beyond the real per-quest heartbeat calls the
  engine legitimately makes.
- No active anti-CDP / anti-debugger / reactive hiding (the eggshells). The server
  always sees the real request stream either way; the edge is looking like a
  genuine client through the app's own transport, not evading instrumentation.
- No new origins ever; no telemetry of our own.

## 7. Re-audit commands

    grep -n 'fetch(\|XMLHttpRequest\|sendBeacon\|WebSocket(\|new Request(\|navigator.send\|\.open(' shards/*.js   # expect none
    grep -c 'https://' shards/*.js                                                              # expect 0
    grep -c 'GooglePost =\|GoogleGet =' shards/shard-e.js                                       # bind to _0x9
    python3 -c "print(open('shards/shard-aux.js',encoding='utf-8').read().count('/intake'))"      # 0 (encoded at rest)
