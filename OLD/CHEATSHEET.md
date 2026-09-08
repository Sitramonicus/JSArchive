# O.3 Log Cheatsheet — decode table

Every console line is tagged `[Google <descriptor>] <vague phrase>`. Here's what each actually means.

## Controls (not logs)

- **Kill switch:** `Alt+Shift+X` (keydown chord) — no window properties are installed anymore. Stops all loops at the next checkpoint and runs all pending restores.
- **Reload switch:** `Alt+Shift+R` — armed by EITHER terminal state (all quests done **or** kill), never before; pressing it mid-run does nothing (fails-closed). **The old `confirm()` dialog stays removed** — blocking modals freeze Discord's gateway heartbeat and can force a disconnect/reload. If no terminal state is ever reached (e.g. the queue never had work), the chord listener is removed at teardown — nothing lingers.
- **`GoogleChatter`** flag at top of script: `false` (default) = progress/check logs throttled; `true` = log every twitch, grain, and tick.

## Startup & module audit

| Log | Real meaning |
|---|---|
| `[Google Satchel] Pockets checked: {...}` | Webpack module resolution audit (single-pass scan). `lantern`=stream-metadata store, `twine`=running-games store, `ledger`=quests store, `spool`=channels/threads store, `map`=guilds store, `postbox`=flux dispatcher, `compass`=REST client. `true`=bound OK, `false`=Discord's module layout changed. |
| `[Google Puddle] Satchel's missing pockets — heading home.` | A required module failed to resolve → script aborted before touching anything. |
| `[Google Ledger] N chore(s) pinned to the board.` | Boot-time queue size — how many quests the filter accepted. Check this against what you see in the UI. |
| `[Google Ledger] N left off — shape we can't fold.` | N eligible quests use a task type the script doesn't handle → excluded from the queue (never run). |
| `[Google Orchard] Nothing ripe on the trees today.` | No eligible quests (enrolled, incomplete, unexpired) found → nothing to do. |
| `[Google Mailroom] Memo slipped under the door — shift started.` | Boot laundered through `window.postMessage` (native event-loop initiator, not a direct IIFE call). |

## Environment & pacing

| Log | Real meaning |
|---|---|
| `[Google Blinds] Curtains drawn — taking the long hallway.` | `document.hidden` became true → delays scaled +2–6s while backgrounded. |
| `[Google Blinds] Curtains open — back on the main road.` | Tab visible → normal pacing. (Fires once at startup too — that's the visibility check announcing its initial state.) |
| `[Google Map] Trail marker moved — holding position.` | You navigated to a different route/path mid-run → all timed loops are paused (desync guard). |
| `[Google Map] Back on the trail — resuming.` | You returned to the original route → loops resumed. |

## Video quests

| Log | Real meaning |
|---|---|
| `[Google Picturebook] Fiddling the picturebook for X.` | Started spoofing `/video-progress` posts for quest X. Steps are now randomized 4–11s per post. |
| `[Google Hourglass] Grains landing whole: true — grain #N` | Timestamp integer-truncation check passed; `#N` = timestamp sent. Final beat deliberately overshoots the target by up to ~1.4s (human end-of-video behavior). |
| `[Google Kettle] Letting the kettle whistle — brief steep.` | Random analog stall (~6% of beats, 18–42s) — mimics buffering / attention drift in the watch curve. |

## Desktop / stream / activity quests

| Log | Real meaning |
|---|---|
| `[Google Tiles] Floor tiles line up in fours: true — tile #N` | PID multiple-of-4 check; N = PID in use (real game's PID if one is running). |
| `[Google Cutlery] Drawer reshuffled: ...` | Fake game object was built with shuffled key order; list shows this run's layout. Game's `start` is backdated 1–4 min. |
| `[Google Tidbits] Fiddling tidbits for X — dough needs ~N more minutes.` | PLAY_ON_DESKTOP spoofed for X; ~N min remain. Automated. |
| `[Google Stage] Fiddling tidbits onstage — keep any window live in vc for ~N more minutes.` | STREAM_ON_DESKTOP metadata spoofed. **You must still actually stream any window in a VC** ~N min. |
| `[Google Arcade] Feeding coins to the cabinet (~N min).` | PLAY_ACTIVITY heartbeats running; ~N min. Terminal heartbeat is sent ~2s after completion (human leave-latency). |
| `[Google Puddle] No doorway found for the arcade cabinet — skipping.` | PLAY_ACTIVITY couldn't find a DM call or guild voice channel. |
| `[Google Puddle] That chore (X) needs the big workshop — skipping.` | Quest X requires the desktop app (`DiscordNative`); you're in a browser. **This was silent in N.15 — it is likely what made your queue look like it "ended early."** |
| `[Google Puddle] Chore note came back blank — skipping.` | `/applications/public` lookup returned nothing usable (desktop quest skipped). |
| `[Google Puddle] Chore list was blank — skipping this one.` | Quest had no usable task config/target. |

## Network health

| Log | Real meaning |
|---|---|
| `[Google Porch] Knock came back throttled — knocking again in ~Ns.` | HTTP 429 hit; waiting `retry_after`+1s, retrying (max 2 retries). |
| `[Google Puddle] Key stopped fitting — packing up.` | HTTP 401 (bad session) → immediate clean abort, no further requests. |

## Housekeeping

| Log | Real meaning |
|---|---|
| `[Google Abacus] Random fraction: x/y` | Progress x of y seconds (all task types; logged every 3rd tick by default, every tick if GoogleChatter). |
| `[Google Trophy] Polished: X.` | Quest X complete. |
| `[Google Trophy] Shelf polished — nothing left on the list.` | Everything queued is fully done (waits for desktop/stream event completion too). |
| `[Google Taps] Wrapping up after this chore.` | Alt+Shift+X pressed → stopping at next checkpoint, restoring hooks. |
| `[Google Taps] Last call — shift ended early.` | Main loop exited via kill. |
| `[Google Doormat] All polished — press Alt+Shift+R...` | Everything is truly done (including event-driven quests); the reload chord is now armed. Nothing happens until you press it. |
| `[Google Doormat] Rug's half-shaken — press Alt+Shift+R...` | Run was killed early; reload chord armed anyway so you can refresh-wipe the partial state at will. |
| `[Google Puddle] Knocked the shelf over setting up: <msg>` | Fatal error during setup or boot registration → everything scuttled (intervals cleared, listeners removed) on the way out. |
| `[Google Doormat] Shaking out the rug — see you on the other side.` | Alt+Shift+R pressed → reload fires in 1.5s. |
| `[Google Puddle] Stubbed a toe (on one chore): <msg>` | Runtime error; quest-queue version says "moving on" — one quest failed, queue continues. |

## Opsec notes

- All API routes, task names, event types, and internal method names are XOR-encoded at rest (`key 0x2A`); rotate `_0xK` per paste to beat per-string signatures.
- Hooked methods are installed with property descriptors mirrored from the originals (prototype-chain walk), and restored by exact undo (original descriptor re-applied, or shadow deleted).
- Hooks' `toString` is spoofed via Proxy `get` trap only — no own `toString` descriptor exists to sniff.
- Decoys (`_0xlag`, `_0xdrift`, `_0xskew`, `_0xgrit`, `_0xpacing`) are woven mid-file with live-variable references + an opaque predicate; they are inert.
- O.1 pacing: quest order shuffled; 10–48s pause between quests; 2.5–8s pre-run delay after paste; 429 "heat" multiplier (×1.5 per throttle, cools on successes); cursor twitches now wander spatially instead of jumping to uncorrelated rectangles.
