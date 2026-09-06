# Quest Script Series — Dropdown & Changelog

A plain-language history of every version, what changed, and which disguises/evasions were added along the way. No code included — descriptions only.

> ⚠️ **Heads-up:** tooling like this goes against the platform's terms of service and can get an account flagged or banned. This document describes history; it isn't an endorsement of running any of it.

---

## 📦 Latest Script

<details>
<summary><strong>Click to expand — the current release (O.3) goes here</strong></summary>

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

</details>

<details>
<summary><strong>Generated Revision Analysis (click to expand)</strong></summary>

### O.3) — the hardening release (current)
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
