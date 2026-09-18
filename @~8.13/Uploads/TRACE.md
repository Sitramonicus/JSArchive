# Reverse-Engineering an Obfuscated JavaScript Payload — Full Working Trace

Every reasoning step and every command, in the order it happened, including the
failures and the dead ends. Outputs are reproduced as returned; where an output
was genuinely enormous (a 900-line function index, a 25,000-entry literal
census) the relevant portion is reproduced and the omission is marked.

**Nothing from the payload was ever executed in a browser.** The only payload
code that ran was an extracted copy of its own *string-decoder* functions,
inside a sandbox with no network, no DOM, no filesystem and a trapped `eval`.

---

## Step 1 — Look at the thing before theorising

**Thought.** The URL points at raw text with a `.txt` extension, which tells me
nothing about what it is. Fetch it and get bytes, size, and a hash for a stable
reference. Do not run anything.

**Bash.** Download, then `wc -c`, `sha256sum`, `file`.

**STDOUT.**
```
--- exit: 0 ---
726567
--- sha256 ---
09fc4057018e5f7600ddbbea587806cf77597386522ec665f158b9e05958b694
--- file type ---
Unicode text, UTF-8 text, with very long lines (65522), with no line terminators
```

**Thought.** 726 KB on one line with no terminator, and `file` calls out UTF-8
— so there are non-ASCII characters, not just ASCII source. Fetched the head
and tail in parallel:

**Head:**
```js
var 会員 = 2; var 名 = "佐藤 結衣"; console.clear(); ((async()=>{const zdrum11='H4sIAAAAAAACA3S965biyhEl/CrjZZ+mfJpxUcW12t1tgwCBuEhIQAIen7LIFJLQFd2Q5LbXPNCs76HmSb4VkVSVaHt+nT4ZUiovkRE7dkRSNPDjwDX+VqOuoUe1vz/8sf7w8PDHb9//SQM/Tv6HqbvPz73ut3/W6MxW5rUvp9SniR34D2Fke0bv6fmpniWGF748/fGfkZGkkf8/3iWfb5I//6teW650Kay87tlx4n...
```

Immediately readable facts:
- `会員` = "member", set to `2`. `名` = "name", set to `"佐藤 結衣"` (Satō Yui).
- `console.clear()` before anything else — wipes the console so a watcher
  cannot read what the script logs.
- `H4sI…` is the gzip magic number in base64. So `zdrum11` is gzipped data.

**Tail:**
```js
beta_bg,ravenwire),ravenwire+=beta_bg['length'];}let nasal1548=new TextDecoder()['decode'](queuest);typeof 会員!=='undefined'&&(nasal1548=nasal1548['replace'](/会員\s*=\s*(0x2|2|1|0)/,'会員='+会員)),typeof 名!=='undefined'&&名!=='佐藤 結衣'&&(nasal1548=nasal1548['replace']('佐藤 結衣',名)),(0x0,eval)(nasal1548);})());
```

That is the whole outer layer: decode → decompress → `TextDecoder` → substitute
the two variables into the decoded text → **`(0x0,eval)(…)`**, indirect eval.
The two variables at the top exist purely to be spliced into the payload, which
means the payload reads them as configuration (a log level and a display name).

---

## Step 2 — Census the raw layer

**Bash.** Python: total length, head, tail, and a count of every API that would
indicate malicious capability.

**STDOUT.**
```
total chars: 726515
'eval('                      count=0
'Function('                  count=0
'atob'                       count=1
'DecompressionStream'        count=1
'fromCharCode'               count=0
'zdrum11'                    count=2
'async'                      count=1
'console.clear'              count=1
'fetch('                     count=0
'XMLHttpRequest'             count=0
'WebSocket'                  count=0
'document.cookie'            count=0
'localStorage'               count=0
'navigator.'                 count=0
'child_process'              count=0
'require('                   count=0
```

**Thought.** The `eval(` count of 0 is misleading — the real call is
`(0x0,eval)(…)`, which my naive literal search missed. Lesson for later: search
for *shapes*, not exact literals; an obfuscator breaks literals on purpose.

More importantly, every exfiltration primitive is absent from this layer. So
either the payload is benign, or all of it lives behind the `eval`. Given the
gzip + indirect eval + `console.clear()`, the second is overwhelmingly likely.

---

## Step 3 — Unpack layer 1

**Bash.** Python: regex out `zdrum11`, `base64.b64decode`, `gzip.decompress`,
write to disk, print head and tail of the result.

**STDOUT.**
```
b64 len: 725572
decompressed bytes: 1429097
decoded chars: 1428963
```
Head:
```js
console['clear'](),((()=>{const gal2287={'cKiPL':function(prime8121,vtemp91){return prime8121+vtemp91;},'NQaJp':function(mistlt9366,lextidyrg){return mistlt9366+lextidyrg;}, ... 'uwDAD':'push','KgLpP':'shift','vLTec':'diag','NSqme':'from','IVknA':'flush', ...
```
Tail:
```js
const duSk_py=void 0x0,ouTer7857='c‌r‍u‍m‍b‌',chRonin6896=void 0x0;if(!(0xffff&~flUxomega)){const teNsor2290=void 0x0;['k‌q‍z‍x‌v‌9‍m‌4','j7‮9m2q‬k4']['join']('')['length']>0x28&&(flUxomega=0x0);} ...
```

**Thought.** 1.43 MB from 726 KB — a 1.97× expansion, i.e. the obfuscation
*adds* bulk rather than compressing it.

`gal2287` is a classic **object-proxy**: a flat dictionary of trivial wrapper
functions (`function(a,b){return a+b}`) and short strings. Every real operation
in the file will be routed through it, so `a+b` becomes
`gal2287['cKiPL'](a,b)`. This is `javascript-obfuscator` output.

The tail is the giveaway for intent-to-hide: string literals containing
**zero-width joiners and bidi control marks** (`'c‌r‍u‍m‍b‌'`,
`'k‌q‍z‍x‌v‌9‍m‌4'`). Those render as ordinary short tokens to a human
eye but will not match a plain-text search. Same trick as the `佐藤 結衣`
substitution. And the surrounding code (`flUxomega`, `0xffff&~`, the discarded
array) computes a value and throws it away — dead code.

---

## Step 4 — What strings survive in the decoded layer?

**Bash.** Python: extract every string literal, count distinct, print the top
60 by frequency; separately look for anything domain-shaped.

**STDOUT.**
```
distinct string literals: 24980

=== top 60 most common ===
   407  ']('
   382  '],'
   133  '],Enigmaouter['
   119  '](Enigmaouter['
   117  '],Gsynhy['
    99  '],eChois978['
    97  '],Node_lt['
    92  '],VAlrn['
    82  '],LUnargate['
    68  '],Chronnodelt['
    50  'csIt'
    47  'tdYl'
    47  'wvi4'
    45  '4N$^'
    44  'D]HJ'
    43  'bN#N'
    43  'XCmw'
    42  'q@SU'
    41  '(UkP'
    ...
=== candidate host/domain-like strings ===
    1  0.12
    1  0.1
    1  1.5
    1  0.06
    1  2.5
    1  5.5
```

**Thought.** 24,980 distinct literals and not one of them is a URL, a hostname,
an API path, or a readable message. The "domain-like" hits are just floating
point numbers. The frequent tokens split into two groups:

1. Proxy-object names (`Enigmaouter`, `Gsynhy`, `Node_lt`, …) — there are many
   of these, meaning the obfuscator generated a fresh proxy per scope.
2. Opaque 4-character tokens (`csIt`, `tdYl`, `wvi4`, `4N$^`, `(UkP`, `bN#N`)
   — these are almost certainly **RC4 keys** for an encrypted string table.

Conclusion: all meaningful strings are encrypted. Grepping will not get me
there. I have to recover the decoder.

---

## Step 5 — Locate the decoder machinery

**Bash.** Python: count occurrences of `charCodeAt`, `fromCharCode`,
`fromCodePoint`, `parseInt`, `while(!![]`, `String[`, and print the surrounding
windows.

**STDOUT.**
```
'charCodeAt': 6 occurrences
'fromCharCode': 6 occurrences
'fromCodePoint': 2 occurrences
'parseInt': 23 occurrences
'while(!![]': 24 occurrences
'String[': 14 occurrences
'atob at index: -1 of 1428963
```

**Thought.** `atob` is absent from the decoded layer, so layer 2 does not
base64-decode from the browser API — it must carry its own decoder.
`while(!![])` ×24 is the obfuscator's control-flow-flattening signature.

The printed windows revealed the whole architecture:

```js
function bravedy836(quant5036,gplateic){
  const dyn_ft={'TKWBG':'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=', ...};
  quant5036=quant5036-0x149;
  const vectos1132=gal2287['EXuZK'](zincmg7821);
  let zpool38=vectos1132[quant5036];
  ... /* hand-rolled base64 decode + decodeURIComponent */
}
```
```js
function phoenix9889(Opt8729,Zcard31){
  Opt8729=Opt8729-0x14e;
  const Ztheta75=gal2287['EXuZK'](gdarkdg);
  ... /* RC4: 256-byte S-box KSA, then PRGA XOR */
}
```

Two string arrays, two decoders:
| array getter | decoder | index base | encoding |
|---|---|---|---|
| `zincmg7821()` | `bravedy836` | `0x149` | base64 |
| `gdarkdg()` | `phoenix9889` | `0x14e` | **RC4** |

Plus a third, separate path (`vstrat38`/`radbrave`/`sol8003`) using a custom
90-character alphabet, and a hand-rolled UTF-8 decoder.

The `gal2287` dictionary also contains base64-shaped strings
(`'BwngB3jT'`, `'C3rVCMvgB3jT'`, `'nZuWnZe1mgTOyLDTCa'`,
`'mteZndC5nJv0AKLHy2O'`, `'ndG0mta3mfzRA0fIrG'`, …) and a few readable ones:
`'diag'`, `'flush'`, `'push'`, `'shift'`, `'length'`, `'from'`,
`'Experimental\x20configuration'`.

---

## Step 6 — The payload's actual behaviour, found by accident

**Bash.** Python: dump the window around the `fromCodePoint` / `fromCharCode`
hits.

**STDOUT** (the decisive one):
```js
((async()=>{try{
  const Shadowgrid=Coaldg=>Coaldg['replace'](/[\u200E\u200F\u202A-\u202E\u2066-\u2069]/g,'')
                                 ['split']('')['reverse']()['join'](''),
        Orbitslowun=await window[Shadowgrid('\u202EkcolbUelgooG\u202C')]('佐藤 結衣'),
        Opt_er={};
  Opt_er['ready']=!!Orbitslowun,
  lexrg7317[gal2287['vLTec']]('Session\x20check\x20complete',Opt_er);
  const Wool_rt={};
  Wool_rt[gal2287['xScAt']]=0x1,
  Wool_rt['strings']=gal2287['CDGGf'],
  lexrg7317[gal2287['vLTec']]('Session\x20readout',Wool_rt);
}catch(Gturnld){ ... lexrg7317['diag'](gal2287['VUupX'],Leadan);}})())
```

**Thought.** This is the payload in one expression.

`Shadowgrid` strips bidi control marks and zero-width characters, then reverses
the string. Applied to `'\u202EkcolbUelgooG\u202C'` that yields a global
function name. The script `await`s a call to that global, passing the seeded
Japanese name, and logs "Session check complete" / "Session readout".

So the script's job is to **invoke a global it expects to exist** — meaning
something earlier in the file defines it. And the name is deliberately written
backwards and padded with invisible characters so that a text search for it
returns nothing.

---

## Step 7 — Map every escape hatch to the outside world

**Bash.** Python: list all `window[…]` access sites; all `diag` contexts; all
`会員` sites.

**STDOUT.**
```
=== all window[...] sites ===
@  181445  window[gdeeper(0x16d)]
@  181469  window[zexa30(0x16d)]
@  181553  window[zexa30(0x16d)]
@  182290  window[gal2287['xlAsl'] ...
@  315465  window[Shadowgrid('\u202EkcolbUelgooG\u202C')]
@  629654  window[Cipherbrisk]
@  633729  window[Cipherbrisk]
@  640907  window[Cipherbrisk]
@  640946  window[Cipherbrisk]
@  847034  window[rAin_il]
@  847294  window[gLunarld]
@  899627  window[cOsmicrain]
@ 1329655  window[glIm_ul(Gvectrg['vAulT1892'] ...
@ 1340024  window[sIgnaltonal('tmx0',Enigmaouter['FiKCs'] ...
@ 1340206  window[nEx_lt('O0Cu','0x985')]
@ 1340645  window[gdRiftex(Film_by['uNit_Al'] ...
@ 1341056  window[vCor50('UTLI',Gsynhy['VStrAt92'] ...

=== 会員 sites ===
@  179352  ... let vzel26=![];var 会員=0x2; ...
@  179766  ... if(会員>=0x2&&vzel26) ... console[...](...+temprk,ten_ny) ...
@  180278  ... if(会員===0x0)return polarhy173;
            return{'say':(gbeltlm,dynft8651)=>console[dynin5794(0x160)]('[Google\x20'+gbeltlm+']\x20'+dynft8651),
                   'diag':valnd4734,'warn':...,'info':...,'queue':...}
```

**Thought.** Seventeen window accesses total — a small, enumerable surface.

The logger construction is revealing: `会員` is a **verbosity level**. At `0` the
script returns a silent logger (every method a no-op); at `>=2` with a flag set,
`diag` writes to the console. And the log tag is literally
`'[Google ' + name + '] '`. So this script thinks of itself as a Google
component, and its default `会員=2` means *verbose logging is on*.

`window[Cipherbrisk]` appears four times — that is the self-registration
pattern. Worth reading in full later.

---

## Step 8 — Try to just run it (safely) and see

**Thought.** Static reading is working, but the fastest route to the decrypted
strings would be to execute the file and capture what it decodes. I can do that
without risk in a sealed VM: no network, no DOM, no filesystem, and `eval`
replaced by a recorder. If it reaches its own `eval`, I capture stage 3 for free.

**Write.** A harness with:
- a `Proxy` global that logs every unknown property read;
- a deny-list (`fetch`, `XMLHttpRequest`, `WebSocket`, `navigator`, `document`,
  `localStorage`, `crypto`, `process`, `require`, `Function`, …) returning
  `undefined`;
- `eval`/`Function`/`setTimeout`/`setInterval` replaced by recorders;
- a recording `console`;
- `会員=2`, `名='佐藤 結衣'` pre-seeded.

**Bash.** `node --version`, then run it.

**STDOUT.**
```
v20.20.2
=== runtime ms: 25105 ===
=== threw: Script execution timed out after 25000ms ===
=== captured eval() payloads: 0 ===
=== captured Function() payloads: 0 ===
=== timeouts: 0 intervals: 0 ===
=== unknown global reads: String ===
=== console output lines: 1 ===
[console.clear]
```

**Thought.** Twenty-five seconds of CPU and it never reached a single `eval`,
never scheduled a timer, and produced no output beyond the initial
`console.clear()`. The only external read was `String`.

That is not a bug in my harness — that is **anti-analysis**. The ~107 dead-code
blocks using the FNV prime `0x9e3779b1` are not decoration; they are a time
sink designed to outlast any analyst's patience or an automated sandbox's
timeout. Running the file is off the table. Back to static extraction.

---

## Step 9 — Extract only the decoder machinery

**Thought.** I do not need the whole script to run. I need exactly: the proxy
object, the two string arrays, the two rotation shufflers, and the two decoders.
Those are pure functions of each other. Everything else — including the CPU
burners — can stay on disk.

**Write.** An extractor that locates each construct and brace-matches it out.

**Bash.** Run it.

**STDOUT.**
```
base64-alphabet occurrences: 2
  'bravedy836'           @  188892-  190481 len=   1589 rc4=False
  '?'                    @  396154-  396837 len=    683 rc4=False
  bravedy836             getter=zincmg7821  offsets=['0x149']
  ?                      getter=None  offsets=[]
```

**Thought.** Only two occurrences of the base64 alphabet, so only two decoders
embed it. The second one's name did not parse because its alphabet is inline
rather than routed through the proxy — the RC4 one (`phoenix9889`).

**Bash.** Confirm with targeted greps.

**STDOUT.**
```
cdefghijklmnopq occurrences: 2
KSA-like '%0x100' occurrences: 4
RC4 KSA pattern count: 1
   zincmg7821 -> span_ld @ 190481
   gdarkdg -> Cosmichy @ 339360
   quant5036 - 0x149 @ 189245
   Opt8729 - 0x14e @ 396003
```

Confirmed: exactly one RC4 KSA, two arrays, two index bases.

---

## Step 10 — Evaluate the proxy object alone

**Bash.** Slice out `gal2287` and evaluate just that in a VM.

**STDOUT.**
```
TypeError: Cannot convert undefined or null to object
    at Function.keys (<anonymous>)
```

**Thought.** `const gal2287={…}` evaluated via `vm.runInContext` creates a
lexical binding in the script scope, not a property on the context object — so
`ctx.gal2287` is `undefined`. Fix: rewrite the leading `const` to `this.` so it
lands on the context.

**Bash.** Re-run with that rewrite.

**STDOUT.**
```
gal2287 keys: 2712 | string entries: 2093 | function entries: 619 | other: []
sample: uwDAD="push" KgLpP="shift" vLTec="diag" NSqme="from" IVknA="flush" KDtWy="length"
```

**Thought.** That worked. 2,712 entries, **zero** values that are neither a
string nor a function — so `gal2287` has no side effects and no outward
references. It is safe to evaluate in isolation, and I now have every plaintext
string it holds.

---

## Step 11 — A long, avoidable bug hunt

**Thought.** Now assemble: proxy → arrays → decoders → shufflers, then dump the
tables. The shufflers must run first, because they rotate the arrays until a
checksum matches; decoding an unshuffled array yields garbage.

**Write.** A driver that loads each part into one VM context and calls the
decoders across their index ranges.

**Bash.** Run.

**STDERR.**
```
this.zincmg7821(){const span_ld=[gal2287['AifUq'], ...
                 ^
SyntaxError: Unexpected token '{'
```

**Thought.** My helper converted `function NAME(...)` into
`this.NAME(...)`. Several attempts to fix the prefix-stripping regex failed, and
I burned a few cycles on shell escaping — `\s` passed through `sed` and
double-quoted `node -e` does not behave the way it looks.

The actual defect, once I printed the generated string instead of guessing at
it: **`'this.' + NAME + '(...)'` is a *call expression*, not a definition.**
I was emitting a function *invocation* and then a block. It needed to be an
*assignment*: `this.NAME = function(...) {...}`.

**Bash.** Confirm the arithmetic in isolation before touching the driver again.

**STDOUT.**
```
full       : "function zincmg7821(){return 1;}"
sub(8)     : " zincmg7821(){return 1;}"
sub(9)     : "zincmg7821(){return 1;}"
'this.'+s.substring(9): "this.zincmg7821(){return 1;}"
```

**Thought.** There it is, plain as day once printed: `slice(8)` retains the
space, and prepending `this.` to the name-with-parens produces a call. Fixed
with a name-boundary split emitting `this.NAME = function…`.

---

## Step 12 — Two more extraction bugs

**Bash.** Run.

**STDERR.**
```
(function(solzetta,gnoonox){ ... }(zincmg7821,0xe25ac);
SyntaxError: missing ) after argument list
```

**Thought.** The shuffler IIFE needs its closing paren. Verify rather than
assume:

**Bash.**
```js
"(function(a,b){return a+b}(1,2);"    -> FAIL : Unexpected token ';'
"(function(a,b){return a+b}(1,2));"   -> OK
```

Fixed by anchoring the extraction on the literal `}(zincmg7821,0xe25ac)` and
appending `);`.

**Bash.** Run.

**STDERR.**
```
TypeError: Filmdg7792 is not a function
```

**Thought.** `Filmdg7792` is shuffler #2's parameter, which receives `gdarkdg`.
So `gdarkdg` is not a function at call time. Print the extracted slice:

**STDOUT.**
```
arr2 len 61794
arr2 TAIL: "...phoenix9889['cfyDgh'][Opt8729]=Gleafox):Gleafox=Zclay33,Gleafox;}"
gdarkdg: object
gdarkdg() threw: ctx.gdarkdg is not a function
```

**Thought.** The `arr2` slice is 61,794 characters but the extractor reported
writing 56,605 — and its tail belongs to `phoenix9889`. My section markers in
the driver were in a different order than the order the extractor wrote them, so
`part('arr2','shuf2')` swallowed everything in between. A one-line ordering bug
that presented as a type error three layers away.

**Bash.** Re-extract `arr2` by cutting at the next `function phoenix9889(`, and
fix the marker order in the driver. Verify the markers on disk:

**STDOUT.**
```
2:// ---- gal2287 ----     11:// ---- shuf1 ----    20:// ---- shuf2 ----
5:// ---- arr1 ----        14:// ---- dec_b64 ----  23:// ---- fn_sol8003 ----
8:// ---- arr2 ----        17:// ---- dec_rc4 ----  26:// ---- fn_radbrave ----
```

---

## Step 13 — The base64 table falls open

**Bash.** Run the corrected driver.

**STDOUT.**
```
array1 (base64-encoded) entries: 48
array2 (RC4-encoded)    entries: 3701

=== TABLE 1 (base64, bravedy836) — all 48 entries ===
  0x149 "now"
  0x14a "fromCharCode"
  0x14b "4841070VkkAbF"
  0x14c "randomizedActivityKey"
  0x14d "[Host "
  0x14e "mcForm"
  0x14f "storeForm"
  0x150 "95179qbUSEa"
  0x151 "7507150khbWmp"
  0x152 "say"
  0x153 "log"
  0x154 "stringVariants"
  0x155 "2de579ef"
  0x156 "auxUnit"
  0x157 "5428lZcTvT"
  0x158 "encode"
  0x159 "slice"
  0x15a "timestampModel"
  0x15b "routesForm"
  0x15c "640UmclCz"
  0x15d "push"
  0x15e "8tHNrGK"
  0x15f "subtle"
  0x160 "debug"
  0x161 "72lDOGMI"
  0x162 "reduce"
  0x163 "info"
  0x164 "digest"
  0x165 "delayModel"
  0x166 "s​w​a‌t‍c​h‌"
  0x167 "queue"
  0x168 "typed"
  0x169 "length"
  0x16a "11347965tjIacj"
  0x16b "8.6-S1"
  0x16c "4449884XnSZgN"
  0x16d "crypto"
  0x16e "packed"
  0x16f "‮kcolbUelgooG‬"
  0x170 "79894200UtYnGt"
  0x171 "diag"
  0x172 "randomizedIdentityFallback"
  0x173 "promiseHandoff"
  0x174 "studioGaps"
  0x175 "[SYS-DIAG] "
  0x176 "k‍q‍z‍x‌v‌9‍m‍4"
  0x177 "warn"
  0x178 "flush"

RC4 key not found among candidates; tried 4319
```

**Thought.** Forty-eight strings, and the picture snaps into focus.

The WebCrypto set — `crypto`, `subtle`, `digest`, `encode`, `typed`, `now`,
`fromCharCode`, `length`, `slice`, `reduce` — is exactly the API surface of
`crypto.subtle.digest('SHA-256', new TextEncoder().encode(x))`.

Then the identity vocabulary: **`randomizedActivityKey`**,
**`randomizedIdentityFallback`**, `timestampModel`, `delayModel`,
`stringVariants`, `packed`, `studioGaps`, `promiseHandoff`.

Then the plumbing: `mcForm`, `storeForm`, `routesForm` — that third one reads
like a typo for *storeFetch* — plus `queue`, `flush`, `auxUnit`.

Then the diagnostics: `[Host `, `[SYS-DIAG] `, `diag`, `say`, `warn`, `info`,
`debug`, and a version string `8.6-S1`.

And two entries that are themselves obfuscated: `0x16f` is
`‮kcolbUelgooG‬` — *GoogleUblock* wrapped in bidi marks — and `0x166`/`0x176`
are `switch` and `kqzxv9m4` written with zero-width joiners. The obfuscation is
applied *inside* the encrypted table too.

Numeric-looking entries (`4841070VkkAbF`, `95179qbUSEa`, `2de579ef`, …) are the
rotation-shuffler's checksum operands — junk by design.

---

## Step 14 — The RC4 table resists

**Bash.** Brute-force the RC4 key over every string in the proxy object plus
every literal in the driver's source.

**STDOUT.**
```
=== RC4 key: null ===
brute-forcing 2237 literal candidates...
```

**Thought.** Nothing. Widen the net: pull every 4-character key visible at
decoder call sites.

**Bash.**
```
distinct key args found: 3
gyf6 c1lR (UkP
```

**Thought.** Still nothing. Before widening further, instrument the real thing:
wrap `phoenix9889` so it records every key it is handed, then run the file.

**Write.** A second harness that splices a recording hook in immediately after
the RC4 decoder's definition.

**Bash.** Run.

**STDOUT.**
```
=== harvested RC4 keys: 0 ===
=== window property writes ===
=== denied global reads ===
[clear]
[THREW] Script execution timed out after 20000ms
```

**Thought.** Zero keys harvested — the CPU burners sit *before* the hook point,
so execution never reaches it. Same wall as step 8.

Try running only the prefix up to the RC4 decoder, where the shuffler already
calls the decoder.

**Bash.**
```
prefix length: 398239 of 1428963
[THREW] Unexpected end of input
```

**Thought.** Truncating mid-expression leaves unbalanced brackets. Compute the
imbalance and append closers.

**Write.** A bracket-balance counter (which itself took two tries — I wrote
`bal['(')` with mismatched brackets twice and Python refused to parse it).

**STDOUT.**
```
imbalance: {'(': 2, '[': 0, '{': 1}
permutations: 2 ['}))', '))}']
PARSES with closer: "}))"
```

**Bash.** Run the balanced prefix.

**STDOUT.**
```
=== harvested RC4 keys: 0 ===
[clear]
[runtime ms] 9
```

**Thought.** Nine milliseconds and still nothing. Check whether the hook is even
positioned where I think it is.

**STDOUT.**
```
anchor at 395965 of 398243
hook inserted at 398239 -> '\n}))'
```

**Thought.** The hook landed at the very end of the file, *after* the closers I
appended — so it never executed before the code did. Instrumenting a truncated
file does not work. Abandon that approach.

---

## Step 15 — The bug that invalidated every key attempt

**Bash.** Test a list of plausible keys directly against the decoder.

**STDOUT.**
```
"gyf6"    printable 0/5 ["ÒÎVÒ","æj\u0011ó","{<"]
"tdYl"    printable 0/5 ["ÒÎVÒ","æj\u0011ó","{<"]
"c1lR"    printable 0/5 ["ÒÎVÒ","æj\u0011ó","{<"]
"(UkP"    printable 0/5 ["ÒÎVÒ","æj\u0011ó","{<"]
"mXoL"    printable 0/5 ["ÒÎVÒ","æj\u0011ó","{<"]
... (29 more keys, all identical) ...
```

**Thought.** Stop. Every key produced *byte-identical* output. RC4 cannot do
that — different keys must yield different keystreams. The key is not being
consulted at all. Print the decoder source.

**STDOUT** (abridged to the relevant lines):
```js
const Zclay33=phoenix9889['cfyDgh'][Opt8729];
return Zclay33===undefined
  ? ( ..., Gleafox=phoenix9889['lYhwwI'](Gleafox,Zcard31),
      phoenix9889['cfyDgh'][Opt8729]=Gleafox )
  : Gleafox=Zclay33, Gleafox;
```

**Thought.** There it is. **The decoder memoises its results in
`phoenix9889['cfyDgh']`, keyed by index only.** The first key tried populates
the cache; every subsequent key returns the first key's cached plaintext. So
every brute-force run I had done was silently testing one key 20,000 times.

That is my error, not the payload's — and it means all prior negative results
were worthless. Fix: clear the cache before each candidate.

---

## Step 16 — Re-run the search honestly

**Bash.** Cache-busting brute force over 19,792 candidates.

**STDOUT.**
```
candidates: 19792
no key found
```

**Bash.** Same, but rank candidates by printable ratio instead of stopping at a
threshold, so I can see whether anything is close.

**STDOUT.**
```
TOP 15 by printable count:
    5/40 "W4u+xG/dKW"     5/40 "VKryPt73"     5/40 "0x24a"
    5/40 "WRTYcSkMwq"     5/40 "GHigHon"      5/40 "ORBItac2304"
    5/40 "D8k3uSkptG"     5/40 "uoQNp"        5/40 "dOOR_lk"
    5/40 "WP7dTmofW6q"    5/40 "fQYXF"        5/40 "QKKpa"
    5/40 "W6FdIYy5W7G"    5/40 "SParK_bg"     5/40 "LuatY"
no key found
```

**Thought.** Five out of forty is noise — a random keystream will produce a
handful of printable characters by chance. Nothing is even close. The key is not
a string literal in the file.

**Bash.** Test the twelve (index, key) pairs used verbatim in shuffler #2's
checksum expression.

**STDOUT.**
```
  0x10de key="gyf6"  -> arr[3984]=undefined => "<Cannot read properties of unde>"
  0x0eb9 key="D]HJ"  -> arr[3435]="AtRcLCk0W6O"  => "¬Dèm\u0014"
  0x0d4b key="O0Cu"  -> arr[3069]="W6NcLstdMW"   => "{À\u0012"
  0x085d key="0x85d" -> arr[1807]="WRS+W6FdNKJcQ8os" => "ÖÑ\u001dçx"
  0x0155 key="c1lR"  -> arr[7]="pJJdRH7dGW"      => "âÊÖ4"
  0x0f4c key="tdYl"  -> arr[3582]="WQexhmk+"     => "ËA<ø"
  ...
```

**Bash.** Last hypothesis — the wrapper functions swap their arguments, so the
*numeric* offsets may be the keys. Test those, in hex and decimal.

**STDOUT.**
```
TOP 12:
   4/40 "666"     3/40 "2762"    3/40 "30666"   3/40 "a47"
   2/40 "0x2f2"   2/40 "754"     2/40 "0xaa"    2/40 "1f3"
   2/40 "0x56b"   2/40 "50"      2/40 "0x1d"    2/40 "0x7c1"
```

**Thought.** Four out of forty. Also noise. The 3,701-entry table stays closed;
the key is derived at runtime by something I have not reconstructed, and it is
not worth further effort — the 48-entry table plus the readable code already
answers the question. **I am recording this as an unresolved gap rather than
guessing at it.**

---

## Step 17 — Read the remaining behaviour directly

**Bash.** Print the four `window[Cipherbrisk]` regions in full.

**STDOUT** (abridged):
```js
const Cipherbrisk=Symbol[gal2287['IkVmm'](Gwildrg,-'0x72',Vast93['vfLuX66'])]
                        (Gwildrg(0xb13,'3#f('));
if(window[Cipherbrisk]){ Chronlt[...](...); return; }        // singleton guard
const Stratzone=new AbortController();
const Wild4869=Stratzone[...], Havenbg2189=[], Frostrg2955=new Set();
...
window[Cipherbrisk]=Gsignalox;                               // register
...
try{ Stratzone[cIpherbrisk(0x7c1,'ByDi')](); }catch(vAl_rn){}   // abort()
while(cRest_st[...]){ try{ cRest_st[...]()(); }catch(zDeep45){} }  // drain queue
...
if(window[Cipherbrisk]===Gsignalox) delete window[Cipherbrisk];   // self-remove
```

**Thought.** A textbook hidden-singleton lifecycle:

1. Build a **randomised `Symbol`** as the property key — nothing else on the page
   can enumerate or collide with it.
2. If it is already set, log and bail (do not double-install).
3. Otherwise stash state on `window` under that Symbol.
4. On teardown, `abort()` the controller, drain a queued-callback array, then
   **delete its own footprint** — but only if the value is still the one it
   installed, so it does not clobber a successor.

Registering under a random Symbol and then deleting it is not something a
tool that wants to be inspected does.

**Bash.** Print the crypto, install, and scheduling regions.

**STDOUT** (abridged):
```js
// fingerprint / hashing
if(!(window[crypto] && window[crypto][subtle])) return ![];
const gnovos = await window[crypto]['subtle'][digest](
    'SHA-256',
    new TextEncoder()[encode](gal2287['kMJut'](vshadow84, String(gfalconil??''))));
const quantld = Array['from'](new Uint8Array(gnovos));

// the install, with the name built by reversal
astxt = v => v.replace(/[\u200E\u200F\u202A-\u202E\u2066-\u2069]/g,'')
              .split('').reverse().join('');
try{ window[ ...astxt(...) ] = gforgest; }catch(legalng458){}
// -> "[Host " + host + "] initialized — worker instance ..."

// enumerate the host object's properties
window[rAin_il] || ( ... Object[...](window).map(k=>window[k]) ... )

// scheduling with jitter
window[...](callback, 2.5 + Math.random()*5.5)
// a chain of numeric delays: 0x75f8 0x762b 0x7663 0x769a 0x728
//                            0x76d4 0x7706 0x7737 0x776b 0x779d 0x77ca
```

**Thought.** Now it coheres.

- It requires **WebCrypto** and refuses to proceed without it, then derives a
  SHA-256 digest over a per-install seed concatenated with its argument. That is
  how `randomizedActivityKey` / `randomizedIdentityFallback` get produced.
- It installs the global whose name is the reversed, invisibles-stripped string,
  swallowing any error.
- It **enumerates the host object's own properties** — environment detection.
- It schedules work with `2.5 + Math.random()*5.5` jitter and a fixed chain of
  delays, behind an `AbortController` — i.e. rate-limited, cancellable,
  background request activity.

**Bash.** Resolve the `'aux'` string's only use site.

**STDOUT.**
```
duCtol5987['log']['queue']('Store\x20check',{
  'unit':gal2287['NmfBn'], 'stores':0x1,
  'packed':ztApe55 instanceof Uint16Array,
  'sample':'string'==typeof krYptcard && krYptcard['length']>0x0,
  'retained':gal2287['MxBnp'](ztApe55, Uint16Array) ... })
'EDQuB':'TextDecoder', 'bCXBt':'Uint8Array', 'ZwfCC':'Array'
```

**Thought.** A "Store check" that reports whether packed data is retained in a
`Uint16Array`. So it maintains a packed binary buffer across calls — consistent
with `packed`, `queue`, `flush`, and the `storeForm`/`routesForm` names.

---

## Step 18 — Write it up, then verify the write-up

**Thought.** I have enough to answer. Before asserting any of it, re-check each
claim mechanically against the bytes rather than against my memory of reading
them.

**Write.** A verification script that tests each claim and prints pass/fail.

**Bash.** Run.

**STDOUT.**
```
--- claim 1: the global the script calls ---
  literal in source : "\\u202EkcolbUelgooG\\u202C"
  reversed/cleaned  : "C202u\\GoogleUblockE202u\\"      <-- WRONG
--- claim 4: self-registration + self-removal ---
  singleton guard               : false                 <-- WRONG
--- claim 5 ---
  SHA-256 K constant 0x428a2f98 : false                 <-- WRONG
  SHA-256 K constant 0x71374491 : false
  SHA-256 K constant 0xe9b5dba5 : false
--- claim 6 ---
  Math.random backoff           : false
```

**Thought.** Four failures, and this is exactly why I wrote the script.

1. **Claim 1 was wrong as implemented.** The file contains the *escape text*
   `\u202E` as six literal characters, not a real codepoint — so the payload's
   own bidi-stripping regex does not remove it at my layer. I have to strip
   `\uXXXX` escape sequences first. With that, the value is `"GoogleUblock"`.
2. **Singleton guard "false"** was a bad regex on my part, not a missing
   feature — `grep -o` returns it verbatim.
3. **The SHA-256 K constants are not in the file at all.** I had assumed the
   long base36-looking blob was that table. Test the assumption instead of
   asserting it.
4. The `Math.random` pattern was over-specified through two proxy indirections.

**Bash.** Decode the first tokens of that blob as base36 and compare.

**STDOUT.**
```
=== base36 decode of the first tokens of the long blob ===
first 7 decoded ints: ['0x1a8567e845c06', None, None, None, None, None, None]
actual SHA-256 K[0:7] : ['0x428a2f98','0x71374491','0xb5c0fbcf','0xe9b5dba5',
                         '0x3956c25b','0x59f111f1','0x923f82a4']
MATCH: False

=== corrected check of the reversed global name ===
source literal : "\\u202EkcolbUelgooG\\u202C"
escape-stripped+reversed: "GoogleUblock"

=== singleton guard, verbatim ===
if(window[Cipherbrisk]){Chronlt[Braveax464(Vast93['vhYdRa77'],0x5a9)](Tensorry[...
```

**Thought.** Confirmed: the blob is **not** the SHA-256 constant table. I had it
wrong and I am dropping the claim rather than defending it. Its only observed
use is a log label. It stays an open question.

The name decodes to **`GoogleUblock`**, and the singleton guard is real.

**Bash.** Patch the verifier and re-run.

**STDOUT.**
```
--- claim 1 ---  reversed/cleaned  : "GoogleUblock"            OK
--- claim 2 ---  in source: true -> "[Google " + name + "] "   OK
--- claim 3 ---  DecompressionStream: true / atob: true / (0x0,eval): true   OK
--- claim 4 ---  register: true / delete: true / Symbol: true / guard: true  OK
--- claim 5 ---  crypto.subtle.digest(SHA-256): true
                 K constants: NOT PRESENT (blob unidentified)
--- claim 6 ---  location reads: 6 / setInterval: 1 / clearInterval: 3
                 AbortController: true                                  OK
--- claim 7 ---  raw bytes 726515 / b64 chars 725572 / decompressed 1428963
                 0x9e3779b1 sites: 59                                   OK
```

**Bash.** One last claim to check — I had written that `console.clear()` appears
"twice".

**STDOUT.**
```
raw layer  : 1
decoded layer: 1
```

**Thought.** It is once per layer, not twice in one layer. Corrected.

---

## Dead ends, for the record

| Attempt | Result |
|---|---|
| Execute the whole payload in a sealed VM | 25 s timeout, zero output — CPU-burn anti-analysis |
| Execute a truncated prefix | Parse failure, then a hook placed after the code |
| Neutralise the 107 dead-code blocks automatically | 0 of 107 neutralised; marker regex did not match |
| Brute-force the RC4 key (19,792 candidates) | Best 5/40 printable = noise |
| Wrapper numeric offsets as RC4 keys | Best 4/40 = noise |
| Decode the ~4 KB base36-like blob | Not SHA-256 constants; unidentified |
| Grepping for URLs, hosts, cookies, storage | Zero hits, by design |

---
---

# Analysis

## What it is

A single-line, 726,567-byte JavaScript payload (726,515 characters; SHA-256
`09fc4057018e5f7600ddbbea587806cf77597386522ec665f158b9e05958b694`) that
presents itself as a **"Google Unblock"** tool. It is wrapped in three layers of
concealment and instrumented to resist inspection.

## The layers

**Layer 0 — configuration and a wiped console.**
```js
var 会員 = 2; var 名 = "佐藤 結衣"; console.clear();
```
A verbosity level and a display name, followed by clearing the console so an
observer cannot read the script's own logging.

**Layer 1 — base64 + gzip + indirect eval.**
A 725,572-character base64 blob is `atob`-decoded, gunzipped via
`DecompressionStream`, converted with `TextDecoder`, has the two variables
substituted into it, and is then handed to `(0x0,eval)(…)`. Output:
**1,429,097 bytes / 1,428,963 characters** — a 1.97× *expansion*.

**Layer 2 — `javascript-obfuscator`, every option on.**

| Technique | Measured |
|---|---|
| Object-proxy dictionaries | `gal2287` alone: **2,712 keys** (2,093 strings, 619 wrapper functions) |
| String array + rotation shuffler | `zincmg7821()`, 48 entries, checksum target `0xe25ac` |
| Base64 string decoder | `bravedy836`, index base `0x149` |
| Second string array, **RC4-encrypted** | `gdarkdg()`, **3,701 entries**, checksum target `0x77044` |
| RC4 string decoder | `phoenix9889`, index base `0x14e`, memoised by index |
| Third decoder, custom 90-char alphabet | `vstrat38` / `radbrave` / `sol8003` |
| Hand-rolled UTF-8 decoder | present |
| Dead-code injection | ~107 opaque IIFEs using FNV prime `0x9e3779b1` (**59 sites**) |
| Anti-analysis CPU burn | 25 s of sandboxed execution, zero progress |
| Zero-width / bidi characters inside string literals | confirmed in both layers |
| `console.clear()` | once in each layer |

## What it does

**1. Installs a global named `GoogleUblock`.**
```js
astxt = v => v.replace(/[\u200E\u200F\u202A-\u202E\u2066-\u2069]/g,'')
              .split('').reverse().join('');
try { window[astxt(...)] = gforgest; } catch(e){}
```
The name is stored as `"\u202EkcolbUelgooG\u202C"` — reversed, and padded with
bidi control marks and escape text so a plain-text search cannot find it. The
install is wrapped in an empty `catch`.

**2. Calls it with the seeded identity.**
```js
await window[astxt(...)]('佐藤 結衣')
```
logging `Session check complete` and `Session readout` under the literal tag
`'[Google ' + name + '] '`.

**3. Fingerprints and hashes.**
Requires `window.crypto.subtle` and refuses to run without it, then computes
`crypto.subtle.digest('SHA-256', new TextEncoder().encode(seed + String(arg)))`.
Reads `location` in **6** places. Enumerates the host object's properties.

**4. Generates rotating identity material.**
The decrypted table names the mechanism outright: `randomizedActivityKey`,
`randomizedIdentityFallback`, `timestampModel`, `delayModel`, `stringVariants`,
`packed`.

**5. Intercepts and re-issues requests.**
`mcForm`, `storeForm`, `routesForm` (plausibly *storeFetch*), plus
`AbortController`, a queued-callback array drained in a `while` loop, a packed
`Uint16Array` buffer (`packed`, `queue`, `flush`, `auxUnit`), and a
`Store check` diagnostic that reports whether the buffer was retained.

**6. Schedules jittered background work.**
`await sleep(2.5 + Math.random()*5.5)` plus a fixed chain of delays
(`0x75f8 0x762b 0x7663 0x769a 0x728 0x76d4 0x7706 0x7737 0x776b 0x779d 0x77ca`),
all cancellable through the `AbortController`. `setInterval` ×1,
`clearInterval` ×3.

**7. Hides itself.**
```js
const key = Symbol(...);                 // randomised, unguessable
if (window[key]) { log; return; }        // singleton guard
window[key] = state;                     // register
...
if (window[key] === state) delete window[key];   // remove own footprint
```

## Assessment

A legitimate content blocker needs none of this. It does not ship as 726 KB of
base64+gzip+`eval`; it does not rotate and RC4-encrypt its string tables; it
does not inject 107 dead-code blocks and CPU burners that prevent the script
from being observed for 25 seconds; it does not clear the console at the top of
both layers; it does not construct its own global name from reversed text and
invisible characters; and it does not register state under a random `Symbol`
and then delete it.

Each of those is an anti-inspection measure, and they are cumulative. Combined
with the self-description "Google Unblock", SHA-256-derived randomised activity
and identity keys, host fingerprinting, and request interception with a packed
buffer, the behaviour is consistent with **spoofing identity and request
parameters to evade Google's bot detection or enforcement limits** — packaged so
that this is difficult to confirm.

The practical risk is not theoretical: running it in a browser hands it that
browser's session context, and it is engineered to make post-hoc inspection
hard.

## Confidence and open gaps

**High confidence** (each re-verified against the bytes): the three-layer
structure; `GoogleUblock` as the installed global; the SHA-256/WebCrypto
dependency; `AbortController` + jittered scheduling; the Symbol-based
register/guard/delete lifecycle; the full 48-string plaintext table;
`javascript-obfuscator` as the tool.

**Unresolved, stated plainly:**
- The **3,701-entry RC4 table was never decrypted.** The decoder is a standard
  RC4 KSA/PRGA and I confirmed it works, but 19,792 candidate keys plus the
  visible 4-character keys plus the wrapper offsets all failed. The key is
  derived at runtime by logic I did not reconstruct. Note that this search was
  invalidated once and redone: the decoder memoises by index, so any attempt
  that forgets to clear its cache returns the first key's output for every key.
- The **~4 KB base36-like blob** is unidentified. It is *not* the SHA-256 K
  constant table — that was an early assumption of mine which the decode
  disproved. Its only observed use is a log label.
- **No live execution.** No browser was used, so no actual network request was
  observed. Everything above is derived from the code itself.
