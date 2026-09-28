17142 chars)
/home/user/pg\_analyze/

# Analysis Report — `https://ctxt.io/3/qAdKrMvAs.md` ("Pixel Garden Player v3.3.2")

\*\*Analyst verdict:\*\* An extremely engineered, multi-stage \*\*Discord Quest‑farming bot\*\* (auto‑completer for Discord "Quests" reward campaigns) delivered as a \*paste‑in‑DevTools‑console\* script, wrapped in 3 nested layers of steganography, per‑victim key derivation, decoy payloads, and commercial‑grade anti‑analysis. It is \*\*not\*\* a token stealer and \*\*not\*\* a credential thief: it never reads `localStorage`, `document.cookie`, or network tokens, and its transport layer is structurally incapable of contacting any origin other than the host page. It abuses the victim's own authenticated Discord \*\*desktop client\*\* to lie to Discord's Quest API (forged watch progress, fake "game is running" dispatches, fake stream metadata hooks) so Quests complete without any real gameplay/watching — a Terms‑of‑Service and anti‑fraud violation whose worst‑case outcome is account action by Discord / game publishers.

Distribution flavor: commercial grayware "member build" — file is personalized (`会員 = 2`, `名 = "佐藤 結衣"` = Japanese "\*member = 2, name = Yui Sato\*"), i.e. sold/per‑issued to individual users. The cute cover ("Pixel Garden Player", pasted console shows a Game‑of‑Life "garden plot") tells the user the paste did something harmless while the real work happens silently in the background.

---

## 1. What actually happens when someone pastes it

1. The pasted blob runs in the page. It fingerprints the host app (Discord / Telegram / Teams / Zoom / Slack detection).

2. It decodes an embedded \*\*1024×768 24‑bit BMP\*\* (2.36 MB) hidden in a permuted base64 blob.

3. Depending on the environment it extracts \*\*one of several hidden channels\*\* steganographically embedded \*inside the BMP pixel data\* — every channel is a gzip'd JavaScript payload — and \*\*`eval()`s the winner\*\*.

4. \*\*Only inside the real Discord desktop app\*\* (bitmask = 7: webpack chunk array with custom `push` + `window.DiscordNative` + Electron/discord marker) does the \*real\* channel (K7) decrypt: a \*\*232 KB quest‑farming agent\*\* that hijacks Discord's webpack module system (grabs the `\_0x2 = require` via a fake `webpackChunkdiscord\_app.push`), locates the Flux stores (Quests, RunningGames, Streaming, Channels, Guilds, HTTP REST, Dispatcher), and then auto‑completes the account's enrolled, unexpired Discord Quests:

- `WATCH\_VIDEO` → `POST /quests/{id}/video-progress` with fabricated, monotonically‑increasing jittered `timestamp` values until the server reports `completed\_at`.

- `PLAY\_ON\_DESKTOP` / `PLAY\_ACTIVITY` → fabricates a `RUNNING\_GAMES\_CHANGE` Flux dispatch carrying a \*\*fake game record\*\* (synthesized exe path per OS, random PID, backdated start time) so the client believes the quest game is running, and drives `POST /quests/{id}/heartbeat` progress.

- `STREAM\_ON\_DESKTOP` → \*\*monkey‑patches the streaming store's `getStreamerActiveStreamMetadata`\*\* with a Proxy whose `toString()` returns `function getStreamerActiveStreamMetadata() { [native code] }`, so the client thinks the user is streaming; progress accrues via heartbeats.

Everything is human‑paced (log‑normal delays, slows when the tab is hidden, 429‑aware "heat" backoff honoring `retry\_after`, exponential 5xx backoff, abort‑all on 401, verification loop against the Quests store, max 3 tries).

5. On completion (or kill chord \*\*Alt+Shift+X\*\*) it scuttles itself: clears timers/listeners, restores hooked functions, \*\*wipes its string tables and salts\*\* (`\_wipeTables()`), removes its global bridges, and tells the user to press F5 / "Alt+Shift+R to flush and restart" (misdirection — no such listener for R exists; the real kill chord is X).

6. In any other environment, the \*same\* carrier instead runs a \*\*decoy\*\*: a "Telegram demo plot" Game‑of‑Life (Teams/Zoom/Slack/Telegram paths), or the "Pixel Garden" demo (fallback), or — if tampering is detected — the same demo plus a fake "sealed studio vault cache" progress log to amuse/mislead the analyst.

---

## 2. Defense‑in‑depth: the 3 unpacking layers

### Stage 0 — the paste file (`snapshot.html`, 3.37 MB)

- Markdown‑escaped (`\\*` → `\*`) single‑line JS. Header claims: "loads `.pgsnapshot` gallery files (24‑bit BMP + PG3 snapshot strip)", "Paste‑and‑watch".

- Bootstrap: `var 会員 = 2; var 名 = "佐藤 結衣"; console.clear();`

- \*\*Self‑integrity pins\*\*: FNV‑1a hashes of `lexProbeL1.toString()` / `lexProbeL2.toString()` pinned to `["681f66ff","c755a5f8"]` — \*\*verified exact match\*\*. Any beautification/reformat flips `lexMode=1` → decoy path.

### Stage 1 — loader logic (74 KB) + data section

- `v.c` = 18,185 base64 chunks × `v.o` permutation → 2,359,350‑byte BMP. Header fully valid (BM, 1024×768, 24 bpp, size fields exact — pixel data ends at EOF; \*everything\* is stego).

- Key material: `v5 = FNV(BMP header)` = `0x3f72a1ec`; `v6 = name`; `v7 = FNV(name) = 2976548990` (the `3885874422` special‑case branch is dormant for the shipped name — it fires only for a \*different\* member build); `v8 = g()` environment bitmask; `vB = v8 & 7`; stretch `vz = O((v5 ^ v7) ^ (0x9E3779B9·vB))` (32,768 rounds of murmur/xorshift mixing).

- \*\*Anti‑analyst persistence counter\*\*: identity `{tag,vb,nTag,nVen}` stored at `window["pgs"+hash]`; ≥4 identity changes across pastes also flips into the tamper branch `vi`.

- Channel selection (last success wins): `k()` (tamper), `I()` (bits 3–6 → "board8"), `t()` (bits 4/5/6 → boards 9/10/11), \*\*`X()` (vB≠0 → per‑vB encrypted lane)\*\*, `U()` (PG3 fallback), then `J()` personalizes `会員`/`名` markers and `window.eval(...)` runs it.

### Stage 2 — payload roster (all decrypted & verified)

| Channel | Trigger | Content |

|---|---|---|

| R9T (`k`) | tamper / ≥4 identity changes | "Telegram demo plot" Game‑of‑Life \*\*+ fake 'sealed vault cache' console spam\*\* (`vaultTry`) |

| R9B (`I`) | Telegram/Teams/Zoom/Slack bits | same TG demo (board8) |

| R9I/J/K (`t`) | Teams(16)/Zoom(32)/Slack(64) | byte‑identical copy of the same TG demo (boards 9/10/11) |

| `U` | fallback | \*\*garden.js\*\* — innocent "Pixel Garden v2.0" Game‑of‑Life console art (+ decoy AES S‑box, DOM marker `data-pg-plot`) |

| \*\*X lane 7\*\* | \*\*Discord desktop (vB=7)\*\* | \*\*`legacyReel` extractor → 85,766 B gzip → stage3\_vB7.js (232 KB) — THE PAYLOAD\*\* |

| X lanes 1–6 | other vB combos | decoy extractors (wrong offsets/magic/CRC — always `null`) |

`legacyReel` (decrypted `plugin\_vB7.js`) reads the \*second\* stego region: offset `RS = 54 + (headerHash & 1023) + 98400`, seeded Fisher–Yates over the remainder, extracts nibbles (low 4 bits) via the permutation, XOR‑keystream keyed by `vz`, validates `P3` magic + CRC‑32, skips a `32+(seed%64)` decoy prefix, requires gzip magic — i.e. an authenticated, CRC‑checked, seed‑spread, low‑nibble DCT‑style image stego scheme ("HNT‑N / DS‑2 cover slack" per its own comments).

### Stage 3 — the agent (232 KB, `stage3\_vB7.js`)

Starts `console.clear(),(()=>{const \_0xmod={}; ... })()`. 16 IIFE modules:

| # | Role | Notes |

|---|---|---|

| 0 | Boot, gated logging, \*\*operator bridge `window.GoogleUblock(pw)`\*\* | fake "Host 8.12" worker banner; log caps (256 events/64 KB); password derives `\_0xopen` (verbose `[G:...]` unmask). |

| 1 | `\_anteMix` | tiny stack VM (push/xor/ret) computing a salt over a ROT‑coded string |

| 2 | `\_m` tables | packed string stores (index matrix + 2 byte tables) |

| 3 | `mc`/`lex` cover engines + `\_wipeTables()` | `lex.C/P` = randomized cover‑phrase generator (15 variants per message); `MemberCount` = guild member‑count console cover |

| 4/9 | junk math filler | deterministic no‑op churn ("timings"/"leases") |

| 5 | `\_carrier` LANES | CRC'd 2‑bit lane stego write helpers — \*\*shipping library, unused in this flow\*\* |

| 6 | `r2` | \*\*hardened resource registry\*\*: 128‑call budget, cleanup registry, scheduler, dispatcher adapter, \*\*`transport` that only permits relative `/…` URLs\*\* (hard exfil block), "honey" no‑op |

| 7 | `\_e` | ~2,000‑entry encrypted string table (`eb`/`ed`, per‑index rotating Vigenère over printable range) |

| 8 | \*\*CORE\*\* (see below) | wipes `\_m` tables + salt on exit |

| 10 | catalog + `window.GoogleVault(pin)` | cover store + second operator gate (10,000‑round double hash by design brute‑deterrent; on success returns 4 random "one‑time keys") |

| 11 | `\_rcdGate` | `GoogleUblock("佐藤 結衣")` self‑call; `fnv(name)` checks: `DbgHash=3885874422` (does \*\*not\*\* match this build's name → diagnostics stay masked), `RcdHash=3042209560` = \*\*operator password\*\* (unrecovered: not in dictionary/4–8‑digit space; full‑width Unicode FNV). Time‑locks after 60 s. |

| 12–15 | "pockets": Teams/Zoom/Slack/Telegram + Discord | \*\*all fakes\*\* (`\_fnv(seed+":decoy")` in the self‑log): log canned quest noise, register decoy `probe/harvest` with fabricated guilds/channels; the "Discord" pocket is also a decoy. Epilogue = inert homoglyph/canary watermark array + `lexSetPins([a3084424,4dfb09fe,75782343])` (3‑probe `lexProbeA/U/X` self‑hashes — \*\*verified exact match\*\*) |

Core behaviors baked in:

- \*\*Camouflage:\*\* plants `window.chromeExtensionGoogleInternal = {managedStorage:true, whitelist:["\*://\*.google.com/\*","\*://accounts.google.com/\*"], rev:134}` (fake Chrome enterprise policy object), plus a never‑true RC4‑check decoy that would eval an empty comment.

- \*\*Boot stealth:\*\* singleton via `Symbol.for("\_0xq7e953faa")`; posts a nonce to itself via `postMessage` and only proceeds on the same‑origin echo (14 s timeout); extra 2.5–8 s jitter before starting.

- \*\*Module doorway:\*\* `window.webpackChunkdiscord\_app` (fallback: scans all `window` values for a chunked array); bails with cover prose if absent (this is why it silently does nothing outside Discord). \*\*Steals the webpack runtime\*\* by pushing `[frozen[], frozen{}, injector]`, popping it, and keeping the injected `require` (gets `.c` cache + `.m` definitions); force‑instantiates up to 50 lazy modules whose source mentions target store signatures.

- \*\*Store selection by feature shape\*\* (minified‑export resilient): `exports.A`/`exports.Ay`/`exports.h`/`exports.Bo` probe‑tested against `getStreamerActiveStreamMetadata`, `getRunningGames`, `getGameForPID`, `getQuest`, `getAllThreadsForParent`, `getSFWDefaultChannel`, `flushWaitQueue` (Dispatcher), `get`, `getSortedPrivateChannels`, `getAllGuilds`.

- \*\*Anti‑detection hooks:\*\* `GoogleHook` refuses frozen/sealed targets, preserves property descriptors, returns an uninstaller; `GoogleNative` = Proxy serving native `toString`/`name`/`length` for patched functions.

- \*\*Human pacing:\*\* `\_0xln` log‑normal delay jitter (0.3×–4× clamp), `document.hidden` → +4–6 s padding, 6% random 18–42 s "kettle" tea breaks, `\_0xheat` 1–4× throttling on 429 (honoring `retry\_after`), 2^n+rand 5xx backoff, hard abort on 401 ("Session key turned stale").

- \*\*Verification:\*\* re‑reads the Quests store each tick (`completedAt`, server value, expiry, disappearance) — stops when the server itself confirms completion; gives up a quest if progress is server‑stuck 5 ticks.

- \*\*Eligibility:\*\* only enrolled (`enrolledAt`), uncompleted, unexpired quests; ranks video quests first, shuffles the rest; paces "shifts" with 8–35 s gaps; \*\*fake "shift" cover narrative in every log line\*\* (ember ridge / moss tundra / owl elm… + 15‑variant euphemisms).

- \*\*Kill switch:\*\* capture‑phase keydown \*\*Alt+Shift+X\*\* → graceful abort; `GoogleUblock` operator passwords can also extend/close/roster the "shift" (`\_0xmod.shift.\*`), and `GoogleRelease()` always ends by wiping tables and deleting the bridges.

\*\*Transport proof (no C2):\*\* every network call goes through `\_0xr2.transport.call`, which rejects anything not starting with `/` (and not `//`), ≤256 chars, and is budget‑capped — the internal Discord REST module (`exports.Bo` with `.get/.post`) is the \*only\* HTTP handle it ever takes. Whole stage‑3 contains \*\*zero `http://`/`https://` URL literals\*\* (the one `http` token is an object key), zero `fetch`/`XMLHttpRequest`/`WebSocket` references, \*\*zero `localStorage`/`sessionStorage`/`document.cookie` reads\*\*.

---

## 3. Capabilities summary

\*\*Does:\*\* hijack Discord's webpack/Flux internals; auto‑complete Discord Quests (video timestamp forgery, fake running‑game dispatches with synthesized cross‑OS exe paths/PIDs, fake stream‑metadata Proxy hook); human‑paced, rate‑limit‑polite forging; deep self‑camouflage (cover Game‑of‑Life in 4 variants, fake Google SDK logs, fake Chrome policy object, fake "worker" banner); operator control via password‑gated `window.GoogleUblock`/`window.GoogleVault` globals; full self‑wipe on exit; integrity pins that flip to decoys when modified (every pin above re‑verified by re‑computation).

\*\*Does not (verified):\*\* steal/exfiltrate tokens, passwords, cookies, or localStorage; contact any third‑party server; persist across reloads (everything is in‑memory & scuttled); escalate to raw OS access (stays in page JS; the fake games/streams are pure client‑side illusions, and PLAY/STREAM quests are even skipped when not in the desktop app); mine crypto; spread. (The only sensitive aspect is that it rides the victim's authenticated session — its API calls are indistinguishable from first‑party client traffic.)

\*\*Unrecovered secrets (do not affect the verdict):\*\* operator passwords for `\_0xRcdHash` (32‑bit full‑Unicode FNV) and `GoogleVault` (10,000‑round KDF) — these only toggle cosmetic verbosity/role‑play keys; the SHA‑256 challenges `sa1..sa4` are preimage‑hard by construction.

---

## 4. Delivery / lure model

The file is a \*\*per‑member build\*\* ("佐藤 結衣", tier `会員=2`): the buyer is told to open Discord \*\*desktop\*\*, open DevTools, and "paste‑and‑watch". The console shows a charming garden/demo (or "Nothing ripe today — refresh") while the quest farmer runs for minutes. The name doubles as a license key ingredient for the stego lane key (`vz`) and as the (here: non‑matching) debug‑unlock password. Venue strings (Telegram/Teams/Zoom/Slack "boards") exist only so the same generator can mint decoy builds and so static analysis finds plausible multi‑platform Qt — every venue's stage‑2 payload is byte‑identical cover.

## 5. IOCs

- Paste URL: `https://ctxt.io/3/qAdKrMvAs.md`

- SHA‑256: paste `00775cfc07ca8b8983becc7ec8deed51a51be49e08a20c0fb8067a447c7b04d4`; BMP carrier `24b6826ab510f78f90d73d1486200b06cfef8913324aee758bf25c64cda1642d`; stage‑3 agent `5ebef0c14744da42bcecac56e1fb2f42ebc3191955b0a0705d6d01de211780c7`

- Globals/symbols: `GoogleUblock`, `GoogleVault`, `chromeExtensionGoogleInternal`, `\_testMod`, `lexProbeA/U/X`, `lexSetPins`, `Symbol.for("\_0xq7e953faa")`, persistence key `window["pgs…"]`

- Network (same‑origin only): `POST /api/v9/quests/{id}/video-progress` `{timestamp}`, `POST …/quests/{id}/heartbeat`, `GET /api/v9/applications/public?application\_ids=…`

- Discord internals touched: `webpackChunkdiscord\_app`, `DiscordNative`, Flux stores (`getQuest`, `getRunningGames`, `getGameForPID`, `getStreamerActiveStreamMetadata`, …), events `RUNNING\_GAMES\_CHANGE`, `QUESTS\_SEND\_HEARTBEAT\_SUCCESS`

- Behavioral markers: kill chord Alt+Shift+X; log prefixes `[Google diag]`/`[Google ledger]`/`[DIAG-CAP]`; cover phrases ("ember ridge — standing by", "Nothing ripe…", "Press Alt+Shift+R to flush and restart"); homoglyph identifiers (`部分rоm Cyrillic`) in property names; CJK/RTL‑override canary tokens (`花検証花試検花927`, `j7‮9m2q‬k4`, …) that double as build watermarks

- Member/config markers: `会員`(U+4F1A U+54E1) variable, fixed instance `7e953faa`, boot salt `851b28e5`, version `8.12`

## 6. Detection & remediation advice

- Discord desktop: watch `devtools-protocol`/console for `window.GoogleUblock`, `GoogleVault`, `Symbol.for("\_0xq7e953faa")`, and `chromeExtensionGoogleInternal`; flag `webpackChunkdiscord\_app.push` calls whose chunk module is an injector returning its argument; flag Proxy'd store methods (`getStreamerActiveStreamMetadata.toString()` ≠ native).

- Server‑side: identical‑size bursts of `/quests/\*/video-progress` with perfectly monotonic float timestamps and no accompanying media CDN traffic = tampered quest progress (the telltale this bot cannot hide).

- If a user pasted it: it does not persist — reload the app (Ctrl+R / F5) and it is gone; nothing was exfiltrated. Still revoke active sessions out of caution (Sessions → Log out all), and never paste console snippets.

---

\*Method: full static deobfuscation (wrapper folding, string‑table extraction via harnessed runtime, 3 probe‑pin verifications), plus key derivation re‑implementation and extraction of all stego channels (all 6 inline tables, all 7 X‑lanes, the PG3 garden strip) with CRC‑validated decodes; dynamic confirmation in a Node VM harness with a fully mocked browser/Discord‑desktop environment (sandboxed, egress‑blocked). All recovered stage files are in `~/analysis/` — see `stages\_manifest.txt`.\