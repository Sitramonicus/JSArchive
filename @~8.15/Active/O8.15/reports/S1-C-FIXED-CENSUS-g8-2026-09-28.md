# S1-B fixed-item inventory — 2026-09-28

Inputs: `provisional/S1-A-fixed-2026-09-28/weave-in-chainA.js` (2219300 chars) → `/var/tmp/s1b2/grid/g8-all3Exp.js` (2224818 chars), map `/var/tmp/s1b2/grid/g8-all3Exp.map.json`.

Every fixed statement row intersecting a window above 0.25, weighted by its bytes inside those windows. Exactly one classification per item (`split` / `movable-whole` / `rejected:<reason>`).

## Ruler state (acceptance: windows above 0.25 must reach 0)

```text
windows 73 · above target 47/73 · worst 0.4258 (bucket 12 @ 1195830)
top10 0.4258 0.405 0.3899 0.3829 0.382 0.3791 0.3776 0.3676 0.3653 0.3597
```

## Classification totals

| classification | in-window bytes | items |
| --- | ---: | ---: |
| rejected | 5568924 | 1414 |
| split | 1389895 | 669 |
| movable-whole | 639971 | 1716 |
| **total** | **7598790** | **3799** |

## Transform unlock ranking (one mechanism per item, in-window bytes)

| via | class | in-window bytes | items |
| --- | --- | ---: | ---: |
| split:literal | split | 624798 | 8 |
| movable:relax-span | movable-whole | 593226 | 1469 |
| split:wrap | split | 449265 | 309 |
| split:seq | split | 170548 | 327 |
| split:fnbody | split | 145284 | 25 |
| movable:decl-reloc | movable-whole | 46745 | 247 |

## Rejected-hazard histogram (checklist vocabulary)

| reason | in-window bytes | items |
| --- | ---: | ---: |
| binding | 2252690 | 804 |
| exception-timing | 1301443 | 251 |
| slice-rewrite | 1258629 | 97 |
| return | 686949 | 257 |
| async/generator | 66489 | 4 |
| this | 2724 | 1 |

## Wrap-run aggregation (consecutive `split:wrap` items, same block)

Runs ≥ 2 KB: **5**, total **92223 B** (the byte-preserving body-split material).

```text
    3276 B     1 stmts  block@1493005  span 1493487..1496763
    3234 B     1 stmts  block@1474211  span 1474631..1477865
    2598 B     1 stmts  block@613520  span 615788..618386
    2198 B     1 stmts  block@1258147  span 1259375..1261573
    2069 B     1 stmts  block@1572145  span 1572409..1574478
    2029 B     2 stmts  block@619083  span 622471..624528
    1946 B     1 stmts  block@508  span 1525261..1527207
    1537 B     1 stmts  block@2001719  span 2002630..2004167
    1425 B     1 stmts  block@1409105  span 1417686..1419111
    1410 B     1 stmts  block@1409105  span 1409253..1410663
    1378 B     1 stmts  block@2151769  span 2154747..2156125
    1364 B     1 stmts  block@1846011  span 1848377..1849741
```

## Top 20 fixed items by in-window bytes

| in-win B | src B | bucket | class | via / reason | shape | head |
| ---: | ---: | ---: | --- | --- | --- | --- |
| 336418 | 47137 | 15 | rejected | rejected:binding | variable-declaration(const,34) | "const sEѐ541=pRairieҽ539.log,nE蟈鷑896=pRairieҽ539._e[bR뾓뾃676 |
| 233585 | 29156 | 14 | rejected | rejected:slice-rewrite | variable-declaration(const,15) | "const Latticeҽ498=Mo௩сோ284=>{function G췈ove쐸조4703(Piלשצ֧701 |
| 214409 | 26775 | 16 | rejected | rejected:slice-rewrite | variable-declaration(var,3) | "var hAven330=lAttice462=>{var pもAiriばчぢ945=2166136261;funct |
| 190608 | 23811 | 16 | rejected | rejected:exception-timing | IfStatement | "if(!pRairie773[fL550(1546,1709)]){try{if(cגNde5164._e.signa |
| 150984 | 18831 | 15 | rejected | rejected:return | ReturnStatement | "return new Promise((lํTticeא619,s꼒Ire윍517)=>{const lAttice3 |
| 135473 | 16885 | 15 | rejected | rejected:return | ReturnStatement | "return new Promise((vEctorӂ뒜휔621,lAttice髣ά鐦781)=>{const mOҗ |
| 135312 | 16875 | 15 | rejected | rejected:exception-timing | TryStatement | "try{if(!mAtriьͼ積787)return sEѐ541[sHroudӹо609(-489,-393)](b |
| 129192 | 32286 | 5 | split | split:fnbody | synthetic-row(ExpressionStatement) | "!function(o륜991){var q‍蟈aӎ624={A:452},ri320={A:651},brin와40 |
| 128296 | 15987 | 13 | rejected | rejected:slice-rewrite | variable-declaration(const,3) | "const Moduϵｖﾫ511=Harө343=>{const Vector呎鞢積ѽ643={\"p斟aIrieν6 |
| 123908 | 17768 | 17 | rejected | rejected:binding | variable-declaration(var,2) | "var lAttice蟈ֶ鐦727,cinde892=function(){function c涒Ndeлӆ245(l |
| 119248 | 14900 | 15 | split | split:literal | variable-declaration(var,5) | "var lAttice똛핵֣828=cגNde5164._e.S._0xvmExec,sE悚ҋ欞143=cגNde51 |
| 106683 | 28860 | 20 | rejected | rejected:slice-rewrite | variable-declaration(const,10) | "const kE314={mkNonce:()=>(65535&Date[oW607(\"G%l[\",\"0x40f |
| 104024 | 12994 | 16 | rejected | rejected:binding | variable-declaration(var,2) | "var cAi儅鷑8851,ho쫛끸조끸794=function(){var sIgnal927=[[\"XX9lau |
| 98497 | 14071 | 18 | split | split:literal | variable-declaration(var,26) | "var kҞӆ205={\"P떚airieӡ363\":\"0xfb\",\"Bl옑и떗280\":\"DrVP\", |
| 95088 | 11840 | 15 | rejected | rejected:exception-timing | TryStatement | "try{if(!mAtriьͼ積787)return sEѐ541[h핵Rborѿ240(-13,275)](bIrc |
| 94872 | 15812 | 12 | split | split:literal | variable-declaration(const,89) | "const Vector943={maTrix521:1882,\"moӠ316\":\"pyqf\",\"st뾓븆Ѫ |
| 83120 | 10390 | 16 | rejected | rejected:exception-timing | IfStatement | "if(pRairie773[mͿψ254(1680,1458)]&&pRairie773[mOdul쉃톚309(597 |
| 71458 | 17203 | 11 | split | split:literal | variable-declaration(const,16) | "const M鷑υ枚158={SHr693:\"&LZ&\",CI168:2273,MOdul811:\"0x7ef\ |
| 69625 | 13925 | 19 | split | split:literal | variable-declaration(var,24) | "var c‍Indeӎ춃썖288={Gr143:\"ke*k\",\"Maィピサ265\":763,Lattice44 |
| 68180 | 17036 | 5 | rejected | rejected:binding | variable-declaration(var,5) | "var signa714,marsh4823,latt냢낥썚642,fo689,prairie와ώы냢621=func |

Authoritative per-item records: JSON `items[]` (`classification`, `via`, `reason`, `note`).
