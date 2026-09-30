# S1-B fixed-item inventory — 2026-09-28

Inputs: `provisional/S1-A-fixed-2026-09-28/weave-in-chainA.js` (2219300 chars) → `provisional/S1-A-fixed-2026-09-28/weave-out-S1-A-fixed.js` (2222628 chars), map `provisional/S1-A-fixed-2026-09-28/weave-map.json`.

Every fixed statement row intersecting a window above 0.25, weighted by its bytes inside those windows. Exactly one classification per item (`split` / `movable-whole` / `rejected:<reason>`).

## Ruler state (acceptance: windows above 0.25 must reach 0)

```text
windows 73 · above target 49/73 · worst 0.4025 (bucket 15 @ 1555792)
top10 0.4025 0.3994 0.3955 0.3844 0.3837 0.3676 0.3609 0.3596 0.354 0.3508
```

## Classification totals

| classification | in-window bytes | items |
| --- | ---: | ---: |
| rejected | 6285567 | 1212 |
| split | 1960780 | 639 |
| movable-whole | 660960 | 1653 |
| **total** | **8907307** | **3504** |

## Transform unlock ranking (one mechanism per item, in-window bytes)

| via | class | in-window bytes | items |
| --- | --- | ---: | ---: |
| split:literal | split | 925773 | 8 |
| movable:relax-span | movable-whole | 607271 | 1431 |
| split:wrap | split | 506337 | 238 |
| split:seq | split | 343055 | 367 |
| split:fnbody | split | 185615 | 26 |
| movable:decl-reloc | movable-whole | 53689 | 222 |

## Rejected-hazard histogram (checklist vocabulary)

| reason | in-window bytes | items |
| --- | ---: | ---: |
| binding | 2310728 | 678 |
| slice-rewrite | 1820853 | 93 |
| exception-timing | 1343269 | 195 |
| return | 738781 | 241 |
| async/generator | 66488 | 4 |
| this | 5448 | 1 |

## Wrap-run aggregation (consecutive `split:wrap` items, same block)

Runs ≥ 2 KB: **4**, total **77464 B** (the byte-preserving body-split material).

```text
    3276 B     1 stmts  block@1493005  span 1493487..1496763
    3234 B     1 stmts  block@1474211  span 1474631..1477865
    2198 B     1 stmts  block@1258147  span 1259375..1261573
    2069 B     1 stmts  block@1572145  span 1572409..1574478
    1946 B     1 stmts  block@508  span 1525261..1527207
    1537 B     1 stmts  block@2001719  span 2002630..2004167
    1425 B     1 stmts  block@1409105  span 1417686..1419111
    1410 B     1 stmts  block@1409105  span 1409253..1410663
    1378 B     1 stmts  block@2151769  span 2154747..2156125
    1364 B     1 stmts  block@1846011  span 1848377..1849741
    1131 B     2 stmts  block@2182792  span 2187590..2188743
    1008 B     1 stmts  block@1385114  span 1385115..1386123
```

## Top 30 fixed items by in-window bytes

| in-win B | src B | bucket | class | via / reason | shape | head |
| ---: | ---: | ---: | --- | --- | --- | --- |
| 377292 | 47137 | 15 | rejected | rejected:binding | variable-declaration(const,34) | "const sEѐ541=pRairieҽ539.log,nE蟈鷑896=pRairieҽ539._e[bR뾓뾃676 |
| 233590 | 29156 | 14 | rejected | rejected:slice-rewrite | variable-declaration(const,15) | "const Latticeҽ498=Mo௩сோ284=>{function G췈ove쐸조4703(Piלשצ֧701 |
| 214414 | 26775 | 16 | rejected | rejected:slice-rewrite | variable-declaration(var,3) | "var hAven330=lAttice462=>{var pもAiriばчぢ945=2166136261;funct |
| 192918 | 26777 | 8 | rejected | rejected:slice-rewrite | ExpressionStatement | "!function(s핵ro랒975){var flint6564={\"Latticeҥ얓ј썚588\":\"W2n |
| 190614 | 23811 | 16 | rejected | rejected:exception-timing | IfStatement | "if(!pRairie773[fL550(1546,1709)]){try{if(cגNde5164._e.signa |
| 180438 | 22554 | 9 | split | split:literal | variable-declaration(var,17) | "var Mos쉃뮶륜922={A:784,c:\"0x29b\",T:\"0x4c2\",S:835,U:\"0x30 |
| 155972 | 32286 | 5 | split | split:fnbody | synthetic-row(ExpressionStatement) | "!function(o륜991){var q‍蟈aӎ624={A:452},ri320={A:651},brin와40 |
| 150720 | 18831 | 15 | rejected | rejected:return | ReturnStatement | "return new Promise((lํTticeא619,s꼒Ire윍517)=>{const lAttice3 |
| 140175 | 28860 | 20 | rejected | rejected:slice-rewrite | variable-declaration(const,10) | "const kE314={mkNonce:()=>(65535&Date[oW607(\"G%l[\",\"0x40f |
| 137624 | 17203 | 11 | split | split:literal | variable-declaration(const,16) | "const M鷑υ枚158={SHr693:\"&LZ&\",CI168:2273,MOdul811:\"0x7ef\ |
| 135158 | 16885 | 15 | rejected | rejected:return | ReturnStatement | "return new Promise((vEctorӂ뒜휔621,lAttice髣ά鐦781)=>{const mOҗ |
| 135048 | 16875 | 15 | rejected | rejected:exception-timing | TryStatement | "try{if(!mAtriьͼ積787)return sEѐ541[sHroudӹо609(-489,-393)](b |
| 134958 | 16804 | 8 | split | split:literal | variable-declaration(const,7) | "const prairie끸춃횧161=shroud뜣낥496,q횧illӽ뜣598={add(embe5045){v |
| 128296 | 15987 | 13 | rejected | rejected:slice-rewrite | variable-declaration(const,3) | "const Moduϵｖﾫ511=Harө343=>{const Vector呎鞢積ѽ643={\"p斟aIrieν6 |
| 126496 | 15812 | 12 | split | split:literal | variable-declaration(const,89) | "const Vector943={maTrix521:1882,\"moӠ316\":\"pyqf\",\"st뾓븆Ѫ |
| 124410 | 17768 | 17 | rejected | rejected:binding | variable-declaration(var,2) | "var lAttice蟈ֶ鐦727,cinde892=function(){function c涒Ndeлӆ245(l |
| 119254 | 14900 | 15 | split | split:literal | variable-declaration(var,5) | "var lAttice똛핵֣828=cגNde5164._e.S._0xvmExec,sE悚ҋ欞143=cגNde51 |
| 104030 | 12994 | 16 | rejected | rejected:binding | variable-declaration(var,2) | "var cAi儅鷑8851,ho쫛끸조끸794=function(){var sIgnal927=[[\"XX9lau |
| 98503 | 14071 | 18 | split | split:literal | variable-declaration(var,26) | "var kҞӆ205={\"P떚airieӡ363\":\"0xfb\",\"Bl옑и떗280\":\"DrVP\", |
| 94774 | 11840 | 15 | rejected | rejected:exception-timing | TryStatement | "try{if(!mAtriьͼ積787)return sEѐ541[h핵Rborѿ240(-13,275)](bIrc |
| 87160 | 11259 | 9 | rejected | rejected:slice-rewrite | ExpressionStatement | "!function(L鷑tticeυ656){var N톚963={A:535,c:\"0x36d\",T:\"0x3 |
| 85225 | 17036 | 5 | rejected | rejected:binding | variable-declaration(var,5) | "var signa714,marsh4823,latt냢낥썚642,fo689,prairie와ώы냢621=func |
| 83550 | 13925 | 19 | split | split:literal | variable-declaration(var,24) | "var c‍Indeӎ춃썖288={Gr143:\"ke*k\",\"Maィピサ265\":763,Lattice44 |
| 83126 | 10390 | 16 | rejected | rejected:exception-timing | IfStatement | "if(pRairie773[mͿψ254(1680,1458)]&&pRairie773[mOdul쉃톚309(597 |
| 74229 | 22661 | 4 | split | split:seq | comma-sequence | "(function(sभreӈ३प3364){const sp419={A:259,c:130,T:399,S:242 |
| 70581 | 11389 | 19 | rejected | rejected:slice-rewrite | variable-declaration(const,1) | "const mOϯφΰ794=()=>{var pRairiӛ烋威343={Si725:\"lZoX\",\"Engi |
| 66344 | 9486 | 10 | rejected | rejected:slice-rewrite | ExpressionStatement | "(function(Gじo855){if(Gじo855._e=Gじo855._e\|\|{},Gじo855._e.strS |
| 62754 | 13063 | 20 | rejected | rejected:slice-rewrite | TryStatement | "try{if(ORbit랒742(pRairieぢҳ834[\"F퀼intҭ545\"],pRairieぢҳ834[\ |
| 61120 | 7640 | 10 | rejected | rejected:binding | variable-declaration(var,8) | "var Shroud655=[31232,31233,31234,31235,31236,31237,31238,24 |
| 59696 | 7462 | 16 | rejected | rejected:exception-timing | TryStatement | "try{var lAttice414=[],cЫnderҍыθ130=null;try{var hAven397=cA |

Authoritative per-item records: JSON `items[]` (`classification`, `via`, `reason`, `note`).

---

## Post-generation outcome note (2026-09-28, after the weave-transform gate battery)

This annotation is NOT part of the generated ledger (the JSON remains the authoritative per-item record).
Measured outcomes for the three unlock classes this ledger sized — full battery in
`reports/S1-B-WEAVE-TRANSFORMS-2026-09-28.md`:

- `movable:decl-reloc` (222 items / 53,689 B): implemented as `WEAVE_DECL_RELOC_ALL=1` and **KEPT** in the
  default stack. Relocations widen reader windows (27,819 KB total in the combined run) and are what make
  the other classes spread at all — the class's small item mass understates its leverage.
- `movable:relax-span` (1,431 items / 607,271 B): implemented as `WEAVE_RELAX_SPAN=1` and **REJECTED as a
  default** — freed members can only spread inside their own reader windows (worst 0.4025→0.4039, excess
  3.145→3.248 alone). The class stays window-limited; its value needs further window widening first.
- `split:wrap` (238 items / 506,337 B): implemented as `WEAVE_RUN_WRAP_SOLO=1` (+18 helpers / +147 KB) and
  **REJECTED as a default** (worst 0.4025→0.4104) though it is the biggest single total-exposure cut
  (excess → 2.854). The combined stack (all three) reaches mean 0.2770 · excess 2.850 with worst 0.4026.
- `split:literal` (8 items / 925,773 B) remains the largest unlock and is payload-level work in
  `tools/split-runs.mjs` (not byte-preserving at weave level). `split:fnbody` (26 items / 185,615 B) is
  implemented only as a ledger class so far.
