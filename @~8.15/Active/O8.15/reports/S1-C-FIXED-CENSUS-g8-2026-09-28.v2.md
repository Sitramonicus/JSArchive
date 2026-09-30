# S1-B fixed-item inventory — 2026-09-29

Inputs: `provisional/S1-A-fixed-2026-09-28/weave-in-chainA.js` (2219300 chars) → `/var/tmp/s1d-grid2/g4-declAllExp.js` (2224166 chars), map `/var/tmp/s1d-grid2/g4-declAllExp.map.json`.

Every fixed statement row intersecting a window above 0.25, weighted by its bytes inside those windows. Exactly one classification per item (`split` / `movable-whole` / `rejected:<reason>`).

## Ruler state (acceptance: windows above 0.25 must reach 0)

```text
windows 73 · above target 54/73 · worst 0.4325 (bucket 16 @ 1640318)
top10 0.4325 0.4325 0.4274 0.4274 0.4274 0.4209 0.4209 0.4187 0.4187 0.414
```

## Classification totals

| classification | in-window bytes | items |
| --- | ---: | ---: |
| rejected | 6989410 | 1661 |
| split | 2339632 | 725 |
| movable-whole | 849557 | 1759 |
| **total** | **10178599** | **4145** |

## Transform unlock ranking (one mechanism per item, in-window bytes)

| via | class | in-window bytes | items |
| --- | --- | ---: | ---: |
| split:literal | split | 937319 | 8 |
| movable:relax-span | movable-whole | 708660 | 1515 |
| split:wrap | split | 602977 | 281 |
| split:seq | split | 495396 | 409 |
| split:fnbody | split | 303940 | 27 |
| movable:decl-reloc | movable-whole | 140897 | 244 |

## Rejected-hazard histogram (checklist vocabulary)

| reason | in-window bytes | items |
| --- | ---: | ---: |
| binding | 2683615 | 752 |
| slice-rewrite | 1931315 | 148 |
| exception-timing | 1328166 | 221 |
| return | 989268 | 535 |
| async/generator | 51598 | 4 |
| this | 5448 | 1 |

## Wrap-run aggregation (consecutive `split:wrap` items, same block)

Runs ≥ 2 KB: **6**, total **93610 B** (the byte-preserving body-split material).

```text
    3276 B     1 stmts  block@1493005  span 1493487..1496763
    3234 B     1 stmts  block@1474211  span 1474631..1477865
    2598 B     1 stmts  block@613520  span 615788..618386
    2366 B     1 stmts  block@638054  span 639119..641485
    2198 B     1 stmts  block@1258147  span 1259375..1261573
    2069 B     1 stmts  block@1572145  span 1572409..1574478
    2029 B     2 stmts  block@619083  span 622471..624528
    1946 B     1 stmts  block@508  span 1525261..1527207
    1537 B     1 stmts  block@2001719  span 2002630..2004167
    1425 B     1 stmts  block@1409105  span 1417686..1419111
    1410 B     1 stmts  block@1409105  span 1409253..1410663
    1378 B     1 stmts  block@2151769  span 2154747..2156125
```

## Top 12 fixed items by in-window bytes

| in-win B | src B | bucket | class | via / reason | shape | head |
| ---: | ---: | ---: | --- | --- | --- | --- |
| 335832 | 47137 | 15 | rejected | rejected:binding | variable-declaration(const,34) | "const sEѐ541=pRairieҽ539.log,nE蟈鷑896=pRairieҽ539._e[bR뾓뾃676 |
| 258376 | 32286 | 5 | split | split:fnbody | synthetic-row(ExpressionStatement) | "!function(o륜991){var q‍蟈aӎ624={A:452},ri320={A:651},brin와40 |
| 214408 | 26775 | 16 | rejected | rejected:slice-rewrite | variable-declaration(var,3) | "var hAven330=lAttice462=>{var pもAiriばчぢ945=2166136261;funct |
| 192912 | 26777 | 8 | rejected | rejected:slice-rewrite | ExpressionStatement | "!function(s핵ro랒975){var flint6564={\"Latticeҥ얓ј썚588\":\"W2n |
| 190608 | 23811 | 16 | rejected | rejected:exception-timing | IfStatement | "if(!pRairie773[fL550(1546,1709)]){try{if(cגNde5164._e.signa |
| 181032 | 22661 | 4 | split | split:seq | comma-sequence | "(function(sभreӈ३प3364){const sp419={A:259,c:130,T:399,S:242 |
| 180432 | 22554 | 9 | split | split:literal | variable-declaration(var,17) | "var Mos쉃뮶륜922={A:784,c:\"0x29b\",T:\"0x4c2\",S:835,U:\"0x30 |
| 175188 | 29156 | 14 | rejected | rejected:slice-rewrite | variable-declaration(const,15) | "const Latticeҽ498=Mo௩сோ284=>{function G췈ove쐸조4703(Piלשצ֧701 |
| 154123 | 28860 | 20 | rejected | rejected:slice-rewrite | variable-declaration(const,10) | "const kE314={mkNonce:()=>(65535&Date[oW607(\"G%l[\",\"0x40f |
| 150720 | 18831 | 15 | rejected | rejected:return | ReturnStatement | "return new Promise((lํTticeא619,s꼒Ire윍517)=>{const lAttice3 |
| 141608 | 17768 | 17 | rejected | rejected:binding | variable-declaration(var,2) | "var lAttice蟈ֶ鐦727,cinde892=function(){function c涒Ndeлӆ245(l |
| 136360 | 17036 | 5 | rejected | rejected:binding | variable-declaration(var,5) | "var signa714,marsh4823,latt냢낥썚642,fo689,prairie와ώы냢621=func |

Authoritative per-item records: JSON `items[]` (`classification`, `via`, `reason`, `note`).
