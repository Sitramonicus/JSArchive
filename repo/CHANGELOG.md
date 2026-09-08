# Quest Script Series — Dropdown & Changelog

A plain-language history of every version, what changed, and which disguises/evasions were added along the way. No code included — descriptions only.

> ⚠️ **Heads-up:** tooling like this goes against the platform's terms of service and can get an account flagged or banned. This document describes history; it isn't an endorsement of running any of it.

---

## 📦 Latest Script

<details>
<summary><strong>Click to expand — the current release (O.8.5-S3) goes here</strong></summary>

```
PASTE THE FINAL SCRIPT HERE
```

</details>

**Integrity check:** only run a copy whose SHA-256 fingerprint matches the canonical one:
`d26984e73ca9b58c6e55f47690993bb40083217f8350f3c7642cc8493f47c2e6`
(`sha256sum file.js` on Linux/macOS, `Get-FileHash file.js` in PowerShell). If the fingerprint doesn't match, the copy was modified by someone — don't run it.

---

<details>
<summary><strong>Version Timeline — at a glance (click to expand)</strong></summary>

| Version | Size | One-line summary |
|---|---|---|
| A (Original) | ~7 KB | The readable starting point — no disguises at all |
| G | ~6 KB (one blob) | First disguise: everything squashed into a single unreadable line |
| H | ~7 KB | Fake functions learn to claim "I'm built into the app" |
| I | ~6 KB | Slim experiment — strips the disguise layer back out |
| J | ~7 KB | Disguise returns, plus tamper-proofing of the fake functions |
| L | ~7 KB | Lightweight variant — drops the heavy wrapper again |
| J (relisted) | ~7 KB | Full disguise reinstated; becomes the foundation layout |
| J.5 | ~7 KB | Adds a manual stop-switch so you can halt it mid-run |
| K / K.5 | ~7–8 KB | Reliability passes — sturdier internals, same features |
| L.5 / L.7 | ~9 KB | Swaps how the module system is unlocked; micro-fixes |
| M.4 | ~9 KB | Queue gains graceful skipping of unsupported quests |
| N.1 – N.3 | ~7–7.5 KB | First real error-safety scaffolding; disguise logic deduplicated |
| N.5 – N.6 | ~8–8.5 KB | Logs return in whisper-code; all server addresses moved into one hidden table |
| N.7 – N.10 | ~8.5–9 KB | Human-like timing; every event name hidden behind runtime decoding |
| N.11 – N.13.2 | ~9–9.6 KB | Tagged logs, guaranteed cleanup, the corrected "stable" cut |
| N.14 | ~13.5 KB | Big stealth wave: self-check logs, scrambled strings, laundered startup |
| N.15 | ~18.5 KB | Full hardening: mirrored tamper-proofing, rate-limit manners, kill chord |
| O.1 | ~20 KB | Bug-fix release: no more silent skips, blocking popup removed |
| O.2 | ~19 KB | Subtraction release: fake mouse-movement deleted entirely |
| O.3 | ~20 KB | Hardening release: future-proofed lookups, leak-proof teardown, sealed startup channel |
| O.4 | ~25 KB | Reliability & local-features release: console-only member readout, duplicate-run lock, release on every exit path, fail-closed capability checks |
| O.7 | ~26 KB | Consolidated reliability release built directly on O.4 (the incomplete candidate drafts in between were never shipped) |
| O.7.1 – O.7.2 | ~26–27 KB | First pair: terminal-listener ownership fix, then the audit actionables — strict validation, observation deadlines, instant rollback |
| O.7.3 – O.7.8 | ~27–28 KB | Audited loop: cancellation-cleanup regression fixed, single-start guard, safe queue extraction, bounded per-quest accounting |
| O.7.9 – O.7.12 | ~28 KB | Follow-up loop: startup-timeout ownership leak fixed; skipped/unsupported accounting corrected |
| O.7.13 – O.7.16 | ~29 KB | Parity loop: terminal-ownership fix, multi-guild member aggregation, doorway validation, failure isolation |
| O.7.26 | ~34 KB | First fully validated materialization after the O.7.17–O.7.25 supplied-revision chain: conditional handoff ownership, ordered cleanup |
| O.7.27 – O.7.30 | ~34 KB | Reliability loop: keyboard normalization, guarded abort, bounded retry parsing, cancellation guard |
| O.7.31 | ~34 KB | Dual capture accepts both registration styles the app has used — the capture regression is repaired |
| O.7.38 – O.7.41 | ~35–42 KB | O.7 finish line: live-confirmed capture repair, centralized logging, gated diagnostics, deterministic cleanup (the O.7.42-era experiments were excluded) |
| O.8.1 | ~37 KB | Experimental fork (poisson-style delays, hex keys, bounded lazy loader) — explored and archived, not the maintained line |
| O.8.2-Juggler-1 – O.8.2-Juggler-7 | ~41–53 KB | The juggler line: rebuilt on the stable baseline with per-instance string juggling, decoy noise, red-herring member region |
| O.8.3 | ~55 KB | Queue refill at drain boundaries, fail-closed destination guard, log/timestamp ordering fixes — clean graduation |
| O.8.4 | ~57 KB | Humanized pacing and rest cycles, per-instance helper names, character-coded regex noise |
| O.8.4.1 | ~58 KB | Static alias lexicon; verbose logs behind a salted unlock; task-aware pauses |
| O.8.4.2 | ~58 KB | Word pools (15 alternatives, occurrence-rotated); default run silent except the member readout |
| O.8.4.3 | ~58 KB | Uniform alternatives for every phrase, collision-screened; the O.8.4 line is finalized |
| O.8.5-S1 | ~59 KB | First partition: scope-isolated pieces behind a tiny shared contract — enables per-part treatment |
| O.8.5-S2 | ~175 KB | Six balanced parts; wording chosen per call from rotating pools; noise inside every part |
| O.8.5-S3 | ~192 KB | Word lists locked at rest; comment-free payload; stitcher and checksums ship in the bundle |

*Note: the naming jumps straight from O.4 to O.7 — the candidate drafts in between were incomplete. O.7.17–O.7.25 were supplied-revision reviews and O.7.32–O.7.37 diagnostics-only steps; their conclusions landed in the listed files. The O.7.42-era concealment experiments were excluded from the maintained line.*

</details>

<details>
<summary><strong>Generated Revision Analysis (click to expand)</strong></summary>

### O.8.5-S3) — the sealed release (current)
- **Word lists locked at rest:** every codename and phrase is stored in a rotated-character cipher and decoded only at the instant a log fires — the file itself holds no readable wording, while the console text stays exactly as before.
- **Comment-free payload:** the shipped script carries no explanatory comments at all.
- **Kit discipline:** the delivery travels with its own six-piece breakdown, the reassembly tool, a checksum list, and a readme — the whole bundle verifies end to end, so a tampered copy fails the checksum before it ever runs.

### O.8.5-S2) — the balanced-shards release
- **Rotating word lists:** codenames and phrases are chosen at runtime from pools of fifteen equivalents with no immediate repeat — two runs share none of their log lines, and no fixed wording maps one-to-one to a disguise.
- **Six balanced parts:** the payload is split into six near-equal pieces joined by one tiny shared contract — no single oversized chunk stands out, and no standalone decoy appendix exists.
- **Noise inside every part:** inert filler is woven into each piece rather than parked at the end of the file.
- **Cross-part readout preserved:** the console-only member counter lives in one part and still reports correctly across the seam.

### O.8.5-S1) — the first partition
- **The split:** internals are separated into scope-isolated pieces — the foundation, the engine, and the decoys — joined by a contract object that exposes only two functions.
- The seam is the whole point: it is what later lets each piece receive different treatment.
- Pools, log lock, and member readout are unchanged from the finalized O.8.4 line.

### O.8.4.3) — the uniform-alias release
- **Uniform pools:** every phrase now carries exactly fifteen alternative wordings, matching the codename pools — the same message alternates through fifteen slots as a run progresses.
- The whole alias map is collision-screened against every previously shipped wording: zero overlap with anything that ever went out before.
- With this round, the O.8.4 line is finalized.

### O.8.4.2) — the word-pool release
- **Pools replace fixed aliases:** each codename draws from a pool of fifteen static words and rotates through them by occurrence count — same subsystem, different alias each time; old alias spellings are byte-absent from the payload.
- **Almost-silent default:** the default run logs nothing except the member readout's own occasional line; the verbose diary needs the unlock.

### O.8.4.1) — the locked-log release
- **Static alias lexicon:** one canonical codeword per subsystem and one per phrase family, all using the same disguise prefix.
- **Logs under lock:** the verbose diary no longer prints freely — it opens only through a salted passphrase check, and the passphrase lives nowhere in the script.
- **Task-aware pauses:** long gaps after game sessions (1–5 minutes), short gaps otherwise; the fixed rest block is gone.

### O.8.4) — the pacing & rest release
- **Human-shaped waits:** delays are drawn from a skewed bell curve around the target (median equals the target, occasional longer tails), while server-throttle responses stay strict and immediate — never humanized.
- **Macro rest cycles:** after a 35–50 minute activity budget, the script takes a 12–20 minute rest, only between chores.
- **Per-instance cosmetics:** neutral helper names rotate to hex per build, the pattern for one internal match is assembled from character codes, and a same-effect decoy branch hides the main route.

### O.8.3) — the queue-refill release
- **Refill at the drain:** if new chores join the board while the run is finishing, they are picked up at queue boundaries — the run no longer ends early — with no new timers added.
- **Fail-closed destination guard:** an unreadable destination is never acted on; the move is skipped with a warning instead.
- Log and timestamp ordering fixes.

### O.8.2-Juggler-1 through O.8.2-Juggler-7) — the juggler line
- **J-1 / J-2 (the archive pair):** the incoming payload and its first repair attempt are archived as-is and become the line's reference.
- **J-3 (the rebuild):** rebuilt from the stable baseline with exactly three changes — a verified recovery routine for the protected strings (embedded probe plus fallback), hardened destination checks, and the new banner.
- **J-4 (self-proof):** every protected string's recovery is now logged and compared against an embedded reference copy, so a wrong recovery can never pass silently; the shipped build relies on the embedded reference only.
- **J-5 (per-instance juggling):** each build re-encodes its strings with a fresh mix of four mechanisms, per-string keys, and a per-instance alphabet — no reusable global table survives across builds.
- **J-6 (housekeeping):** the first line of a run wipes the pasted source from the console; the banner logs the suite and instance id first.
- **J-7 (decoys):** a generator-driven block of inert noise (about 7 KB) is woven in, and the member-counter region is rewritten as a deliberate red herring — encoded strings plus inert scaffolding around it, behavior unchanged.

### O.8.1) — the experimental fork
- **The experiment:** poisson-style delays between moves, hex-encoded key tables, and a bounded lazy loader that may wake unloaded definitions by text-matching the keys it needs (hard-capped).
- Diagnostics sit behind a level switch, so a default run reads nearly silent.
- Explored and archived — the maintained line continues from the O.7 finish line instead.

### O.7.38 – O.7.41) — the O.7 finish line
- **O.7.38:** the capture repair, confirmed live — the module handshake again reads the push-call's return value first, while the O.7.30-era lifecycle work (progression, cleanup, cancellation, retries) is kept. This is the deterministic baseline for everything after it.
- **O.7.39:** all logging is centralized behind one module with a level switch, and the module inventory check is completed.
- **O.7.40:** diagnostics are reduced to operational logging.
- **O.7.41:** deterministic maintenance cleanup and wording corrections — the last confirmed working O.7 build.
- The O.7.42-era concealment experiments are not part of the maintained line.

### O.7.31) — the dual capture
- The app's module registry has accepted two different registration styles across versions (callback-style and return-value-style). The capture now accepts both — callback assignment plus a validated return-value fallback, keeping the length-safety check — so the inventory comes back true whichever style the running build actually honors.

### O.7.27 – O.7.30) — the standard loop
- Four local reliability fixes spread across the line: keyboard-event normalization (the stop chord must fire regardless of the keyboard event shape), a guarded abort that cannot release twice, bounded parsing of retry-after headers, and a cancellation guard on the final post.

### O.7.26) — the materialized revision
- The first supplied revision to be fully materialized and validated: task completion now hands ownership over conditionally, and cleanup registration is pure again so teardown always runs in the right order.
- The earlier supplied revisions (O.7.17–O.7.25) were reviewed in place; the ones with confirmed regressions were never accepted as files.

### O.7.13 – O.7.16) — the parity loop
- The supplied candidate is brought up to the O.7.12 baseline without removing any of its existing task paths: the terminal-ownership regression is fixed, the member readout aggregates correctly across many guilds and is isolated from failures, and the module doorway is validated before scanning.

### O.7.9 – O.7.12) — the follow-up loop
- **Startup-timeout ownership leak fixed:** an expired bootstrap no longer leaves the run marked as owned forever.
- Skipped and unsupported activities are no longer reported as processed; the last two iterations of the loop are clean carries.

### O.7.3 – O.7.8) — the audited loop
- **The big one — cancellation cleanup:** restoring temporary hooks used to strip the terminal refresh listener while the run stayed locked. The two now never interfere.
- Also: a single-start guard (repeated delivery cannot enter the runner twice), guarded quest-collection extraction, strict numeric validation of progress responses, and bounded per-quest accounting.

### O.7.1 – O.7.2) — the first pair
- Terminal-listener ownership is corrected, and the member readout is pinned to a trusted local source — it can no longer fall back to arbitrary records.
- Progress values that are negative, invalid, or merely coercible are rejected; heartbeats get a bounded observation deadline and report stalls; desktop/stream subscriptions roll back the instant setup fails; application tasks require an application id before proceeding.

### O.7) — the consolidated reliability release
- One maintained file on the O.4 baseline: strict progress parsing (empty, boolean, null, and non-finite values are rejected instead of coerced to zero), a hardened member readout, bounded watchdogs for event-driven handlers, transactional rollback, and cross-platform executable selection.
- The incomplete candidate drafts between O.4 and O.7 were not used as replacements.

### O.4) — the reliability & local-features release
- **Console-only member readout:** a separate utility at the top of the file reads member totals already resident in the page — it makes no requests and never touches quest behavior.
- **Duplicate-run lock:** a second injection cannot create an independent set of listeners and timers.
- **Guaranteed release:** ownership is released on setup failure, empty queues, normal completion, cancellation, and outer failures alike.
- **Fail-closed reads:** throwing getters or malformed exports cannot take the run down; progress extraction is capability-based with safe fallbacks; a small expiry grace window absorbs minor local-clock skew; replacement installs are transactional and roll back before a skip.
- No new telemetry countermeasures, traffic-shape manipulation, or synthetic input were added.

### O.3) — the hardening release
- **Future-proofed module lookups:** replaced a deprecated traversal shortcut with a proper, bounded prototype-chain walk that tolerates the platform reshuffling its internals (up to a few hops) — a common way older versions used to break after app updates.
- **Sealed startup channel:** the self-addressed startup note is now addressed to this page only, and the receiver checks the return address before acting — the trigger can't be spoofed or overheard by other frames.
- **Leak-proof teardown:** the whole setup sits behind a single big guard; if anything fails during preparation, every listener and timer the script touched is dismantled on the way out — no ghost timers or phantom key listeners left behind.
- **Chords on both endings:** whether the run finished cleanly or you killed it early, the refresh chord arms afterward so you can wipe the state whenever you're ready.
- **Provenance:** the canonical copy's fingerprint is pinned (see the integrity check above) — paste only bytes that match it.

### O.2) — the subtraction release
- **Fake presence signals deleted entirely.** Reason: any script-invented input event is permanently stamped "not genuine," and the platform can read that stamp. If the platform checks it, every nudge was a signed confession; if it doesn't check, the nudge was useless. Losing under both outcomes = removal.
- Net effect: fewer background writes, fewer live objects hanging around, smaller inspection surface — the only release that improved every quality axis by *removing* something.

### O.1) — the bug-fix & pacing release
- **The silent-skip bug is killed:** previously, quests that needed the desktop app (when you were in a browser) vanished without a word, which made it look like the run "ended early." Every skip now announces itself and says why.
- **Boot-time headcount:** at startup it reports how many quests it accepted and how many it left off as unsupportable — the queue is never a mystery.
- **The disconnect bug is killed:** the old end-of-run popup was a *blocking* dialog — left unattended it froze the app's connection heartbeat until the server gave up and force-reloaded the page. The popup is gone; refreshing is now done by a key chord, armed only after everything is genuinely finished (including long-running background quests — another quiet race-condition fixed).
- **Anti-robot pacing:** the final video check-in overshoots the goal by a hair instead of landing exactly on it; occasional "buffering" stalls are mixed in; a short settling delay happens before the first move; quests shuffle their order and pause between each other; server throttling now gently stretches all future waits for a while instead of just the one retry.
- Fake mouse nudges now wander around gradually instead of teleporting to random spots.

### N.15) — the hardening pass
- **Stronger scrambling:** every sensitive string — server addresses, task names, event names, even the names used to find internal modules — moves behind a lightweight runtime cipher. Readable text exists only while it's actually being used.
- **Faster, quieter module lookup:** the seven separate hunts through the app's module collection merge into a single pass that stops early once everything is found.
- **Mirrored tamper-proofing:** when the script swaps an internal function for a lookalike, it now copies the original's exact permission flags first — so integrity checks that compare "was this property modified?" see nothing unusual. Removal is a perfect undo, not a rewrite.
- **Keyboard switch:** the console-typed off-switch is replaced by a key chord. Nothing new is planted on the page's global object at all.
- **Rate-limit manners:** if the server says "slow down" or "who are you?", the script honors the cooldown or stops cleanly instead of hammering — with strict retry caps.
- **Failure isolation:** one quest going sideways no longer sinks the others; each is wrapped in its own safety net.
- **Navigation awareness:** if you click away to another page mid-run, the loops pause instead of drifting out of sync, and resume when you come back.
- **Humanized details:** random-length steps instead of a fixed clip size; the fake game's "launched at" time is backdated a few minutes; the final "I'm done" message waits a beat like a real app closing something.
- **Interwoven decoys:** a few inert, meaningless calculations are scattered between real ones so the whole thing reads like scrappy human code rather than a sterile machine-generated blob.

### N.14) — the stealth wave
- **Self-auditing logs:** the script now *proves* its disguises are active — reporting (in codewords) that all internal modules were found, that fake process IDs follow real-world numbering rules, that integer rounding worked, and so on.
- **Scrambled strings:** readable text is replaced by encoded blobs only decoded in memory at the instant of use.
- **Shuffled data:** the fake "running game" record is rebuilt with its fields in a different random order every run, so its shape never repeats.
- **Realistic process IDs:** fake process numbers now follow the platform's real allocation habits instead of flat random values.
- **Laundered startup:** the script no longer starts itself directly — it mails itself a one-time secret note and only starts when the note is delivered, so its beginning looks like an ordinary page event.
- **Fake presence signals:** before each check-in with the server, a synthetic "the mouse moved" nudge is fired, on the theory that total silence looks artificial.
- **End-of-run popup:** when everything finishes, a dialog offers to refresh the page to wipe all traces.
- **Situational awareness:** it finally says something when there's simply nothing to do, instead of exiting silently.

### N.13.2) — the stable N-series cut
- Corrected edition: event-name tables and the video-quest logs that had gone missing in the shuffle are restored; dead leftovers removed.
- This is the version that was verified working end-to-end before the big redesign.

### N.13.1)
- Network helpers are rebound more firmly (attached once, permanently, instead of re-referenced each use); the request layer gets another structural pass.

### N.12)
- **Guaranteed cleanup:** a "no matter what happens, run this last" block is added, so even a crash mid-quest restores the app's original functions and tidies up instead of leaving a broken state behind.

### N.11)
- **Tagged logs:** every status message now carries a short codeword label, making it easy to scan what subsystem is talking without the text ever saying so.

### N.10)
- **Centralized name registry:** the property names used to locate the app's internal modules move into one lookup table, so a platform rename only has to be fixed in one place.

### N.9)
- Small internal polish pass.

### N.8)
- Event-type names fully retire into runtime decoding — the last plain-code event constant is replaced by on-demand reconstruction.

### N.7)
- **Humanized timing:** the metronome is gone. Each wait draws from a set of slightly-different jitter values, occasionally tossing in a longer pause — and if the tab is in the background, everything consciously slows down, because a "viewer" with a hidden tab behaves differently than one staring at the video.

### N.6)
- **Centralized address book:** every server destination the script talks to is gathered into one disguised table, built at runtime from number codes — no destination string appears in readable form anywhere else.
- The network "send" and "fetch" moves are pre-bound once and reused, removing repeated lookups.

### N.5)
- **Logs come back — in whisper-code.** Plain-English status lines are replaced with vague-but-evocative codeword messages (household-chore flavor), so a casual glance at the console reveals nothing about what's actually happening.

### N.3)
- **Deduplication:** the "act native" disguise logic, previously copy-pasted in a few places, is consolidated into one shared wrapper used everywhere — less code, fewer places to break.

### N.2)
- **First real safety net:** operations are wrapped in guarded blocks so a single failure no longer kills the whole session; the console's own error channels are backed up and restored afterward so nothing is left dangling.

### N.1)
- Reworks the just-added skip flow into a cleaner shape (same visible behavior, different plumbing).

### M.4)
- **Graceful skipping:** quests that can't be handled are now stepped over mid-queue instead of jamming the run on them.

### L.7)
- Micro-release: a single internal behavior adjusted.

### L.5)
- **New key for the same lock:** the token used to tap into the app's module system is switched from a timestamp-based token to a one-of-a-kind marker token — a common anti-breakage move when the platform tweaks its loader.

### K.5)
- A larger internal rework: noticeably more code devoted to keeping long-running quests stable and consistent, still no new features.

### K)
- Under-the-hood tidying pass. No new user-facing behavior — sturdier internal bookkeeping and slightly cleaner failure paths.

### J.5)
- **First manual stop switch:** a global off-switch you can flip from the console to halt everything mid-run, with the loops checking it between steps.
- Several internal flow fixes alongside it.

### J) (relisted in source)
- The full disguise stack is reinstated after the A/B experiments — this layout (wrapper + locked properties + checkpoint error-rewriting) becomes the settled foundation that all later versions build on.
- *Note: the source archive contains two entries both labeled "J"; this is the second one, which supersedes the lightweight "L" variant below it.*

### L) (file order)
- Another deliberate lightening: the wrapper's heaviest parts are peeled off, keeping only the locked properties. (Second half of the A/B test against J.)

### J)
- The "act native" wrapper returns, upgraded: calls routed through the fakes now pass through a checkpoint that **rewrites error messages** on the fly, so even a failure looks like it came from the app's own code.
- The fake functions also get **locked properties**, making casual tampering or inspection harder.

### I)
- **Deliberate slimming:** the just-added wrapper is removed again to field-test a lighter build, with a few internal paths reorganized. (Roughly an A/B experiment against H.)

### H)
- **First "act native" trick:** the script's fake replacement functions are wrapped so that, if the app interrogates them, they answer "I'm a built-in function" — mimicking what a real internal function would say about itself.

### G)
The first makeover — the goal was "unreadable at a glance."
- **Compression:** the entire script squashed into one long blob instead of tidy lines.
- **Renaming:** every readable name replaced with short arbitrary serial-style names.
- **String splitting:** the key used to open the app's module system is assembled from fragments at runtime, so searching the text for it finds nothing.
- **Number-coded names:** event names are stored as lists of numbers and converted back to text only at the moment they're used.
- Logs removed entirely — a silent run.

### A) Original
The plain, human-readable starting point.
- Finds the app's internal modules, filters your unfinished quests, and completes each supported type automatically (watch-video, play-game, stream, activity).
- Everything is in the open: real internal names, real server addresses written in plain text, plain-English console messages.
- Fixed, robotic timing — one identical-sized step about every 7 seconds.
- No disguises, no cleanup, no stop button. If something broke, the run simply crashed or stalled.

</details>

---

*Note: letters B–F were never archived — the naming jumps straight from A to G — and the archive also lists two entries both labeled "J," the second of which supersedes the lightweight variant above it.*
