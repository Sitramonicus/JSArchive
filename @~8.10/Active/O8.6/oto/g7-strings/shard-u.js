var textCacheU = (function () {
var TBL = ["7xJbPaWSnG0BHrhMPCjahS+cYzs=","7SruHiC0lYLTW9kr","XBwlRt54jKGBFsJoJx5Txbqp0gxQsQ==","zTAFAF9E8soR8VfWCV8jYlMVIqKwtDXorDnpDNtj","M6dEuHlNcTKAWktdYnOFcOkANw2mfkfqgpVSnMrIKwJvgBErr7vequy9AVw=","qVQdkJfpdyrERXz35ggvIl5xO9mtEVIMUy6KWpMvlnXdECOjP4H4OZvC","27z5VRdhOGJf5KKALRt8lrq6YWqAHY8BwS2iQpxv","32Zt/tGfhNfs2PzXwJgi1WAGd1o=","ObE4UiFpWH1vejmF56E3xC8ANzhf9y0UZlOyWvT/QvNN6w==","K0iY5JIlsKCnFfFwobU95Lo5Gp8PzRvNZwnnZsKSi9UuYxhjbNc=","k7inzilpZzSB9neaDzOo8Ta86mFzbbrBQV/lXBLe1LEqbmQp9KD4dN6ujQaM2jlPm8MfDApvyy1Mp/Ij64pXHL/QfyvdGg59hU+9aoG3"];
var NREAL = 8, C1 = 2298177917, C2 = 2686832753, SKEY = 3765435166;
var SW_BAD = 0, SW_LVL = 0, SW_VISIT = 0;
var SW_H = 8, SW_T = 24, SW_END = 62;
var TUBE = ["lattice L{n} settled ({p}%)","chunk {n} sealed, key {h}","wheel W{n} aligned: {h}","gate {n} open -- subkey {h}","reel layer {n} ok ({p}% mapped)","shroud {n} lifted ({p}%)","chain {n}: {p}% converged","schedule K{n}: {h}"];
function tubeLayer(v) { var hx = ((SKEY ^ Math.imul(v + 3, 2654435761)) >>> 0).toString(16); hx = ('00000000' + hx).slice(-8); if (v >= SW_END) return 'vault seal ' + hx + ' -- lattice quiet'; var t = TUBE[v % TUBE.length]; var prog = 100 - Math.floor(100 / (v + 2)); return t.split('{n}').join(v).split('{p}').join(prog).split('{h}').join(hx); }
function dec(pos) {
if (!(pos >= 0 && pos < NREAL)) { SW_BAD++; if (SW_BAD >= SW_T) SW_LVL = 2; else if (SW_BAD >= SW_H) SW_LVL = 1;
if (typeof process !== 'undefined' && process.env && process.env.CS_TRIP_DIAG === '1') { try { console.debug('TRIPDIAG u bad=' + SW_BAD + ' lvl=' + SW_LVL); } catch (e9) {} } }
if (SW_LVL >= 2) return tubeLayer(SW_VISIT++);
var honey = (typeof lexMode !== 'undefined' && lexMode !== 0) || SW_LVL >= 1;
var p = honey ? (NREAL + (pos % (TBL.length - NREAL))) : pos;
if (!(p >= 0 && p < TBL.length) || typeof TBL[p] !== 'string') {
var w = (SKEY ^ Math.imul(pos, 2654435761)) >>> 0, acc = 0, iw;
for (iw = 0; iw < 48; iw++) { w ^= (w << 13) >>> 0; w ^= w >>> 17; w ^= (w << 5) >>> 0; acc = (acc + (w & 255)) >>> 0; }
p = NREAL + (acc % (TBL.length - NREAL)); }
var raw = atob(TBL[p]);
var out = '', i2;
var st = (SKEY ^ Math.imul((p + 1) >>> 0, 2654435761)) >>> 0;
for (i2 = 0; i2 < raw.length; i2++) { st ^= (st << 13) >>> 0; st ^= st >>> 17; st ^= (st << 5) >>> 0;
out += String.fromCharCode(raw.charCodeAt(i2) ^ (st & 255)); }
var s = '', k;
for (k = 0; k + 1 < out.length; k += 2) s += String.fromCharCode(out.charCodeAt(k) | (out.charCodeAt(k + 1) << 8));
return s; }
function d1(a) { return dec((a ^ C1) >>> 0); }
function d2(a, b) { return dec((a ^ b ^ C2) >>> 0); }
function d3(a, b, r) { var x = (a ^ b ^ C2) >>> 0, i, u;
for (i = 0; i < (r & 7); i++) { u = Math.imul((x ^ SKEY ^ (x >>> 13)) >>> 0, 1787628489) >>> 0; x = (u ^ (u >>> 15)) >>> 0; }
return dec(x); }
var memo = {};
function pcache(a) { var k = (a ^ C1) >>> 0; if (memo[k] === undefined) memo[k] = dec(k); return memo[k]; }
function pfmt(f, a) { var w = (SKEY ^ a) >>> 0, i;
for (i = 0; i < 32; i++) { w ^= (w << 13) >>> 0; w ^= w >>> 17; w ^= (w << 5) >>> 0; }
return dec(NREAL + (w % (TBL.length - NREAL))); }
return { d1: d1, d2: d2, d3: d3, pcache: pcache, pfmt: pfmt }; })();
(function(_0xmod){const Log=_0xmod.log;(()=>{const _0x1c4a9e={p:0,q:0,r:0};const _0x9037c2=[3,11,7,19];for(let i=0;i<12;i++){_0x1c4a9e.p=_0x1c4a9e.p+_0x9037c2[i%4]&0xffff;if((i&1)===0){_0x1c4a9e.q=(_0x1c4a9e.q^_0x1c4a9e.p)&0xffff;}_0x1c4a9e.r=_0x1c4a9e.r+i*29&0xffff;}const _0x77b2d1=_0x1c4a9e.p^_0x1c4a9e.q^_0x1c4a9e.r;const _0x48e03a=Array.from({length:(_0x77b2d1&3)+2},(_,i)=>i*41&0xffff);const _0xbfb112=_0x48e03a.slice(0,3).reduce((a,b)=>a+b,0);if(_0xbfb112>0x7ffff){_0x48e03a.length=0;}try{const probe=[Date.now()&255,0];probe[1]=probe[0]|0;}catch(e){}})();(()=>{const _0x33e8d7=x=>{let h=0;for(let i=0;i<5;i++){h=h*33+(x>>>i*2&0xff)&0xffffffff;}return h>>>0;};const _0x5a2c1b=(a,b)=>(a<<3^b>>>1^b<<5)&0xffffffff;const _0xc0d9e4=Date.now()&0xffff^0x8d1a;const _0x3b6f52=_0x33e8d7(_0xc0d9e4);let _0x9e14c0=_0x3b6f52;for(let i=0;i<6;i++){try{_0x9e14c0=_0x5a2c1b(_0x9e14c0,i*2654435761);}catch(e){break;}}const _0x7140fa=[_0xc0d9e4,_0x3b6f52,_0x9e14c0];if(_0x7140fa.length>2&&(_0x9e14c0&7)===0){_0x7140fa.length=0;}try{const probe=[Date.now()&255,0];probe[1]=probe[0]|0;}catch(e){}})();(()=>{const _0x2e05c8=[6024,34118,22003,49921,1046,39333,29112,8335];const _0x8c4bb7=[0,0,0];for(let i=0;i<_0x2e05c8.length;i++){_0x8c4bb7[i%3]=_0x8c4bb7[i%3]+(_0x2e05c8[i]*(i+7)&0xffff)&0xffffff;}const _0x5d0f92=_0x8c4bb7[0]^_0x8c4bb7[1]^_0x8c4bb7[2];const _0xf2a9d1=Array.from({length:4},(_,i)=>_0x5d0f92>>>i*3&0xff);if(_0xf2a9d1.reduce((a,b)=>a+b,0)===0){_0xf2a9d1[0]=1;}try{const probe=[Date.now()&255,0];probe[1]=probe[0]|0;}catch(e){}})();(()=>{const _0xa43f10=96;const _0x6e1b2a=a=>String.fromCharCode(...a.map(c=>c^_0xa43f10));const _0x61d79c=[_0x6e1b2a([59,3,46,7,1]),_0x6e1b2a([3,0,4,19,6,19]),_0x6e1b2a([59,11,12,1,19,7,7])];const _0xd2c55a=[3,4,3,5,4,4,5,3,4,5,3,4];let _0x9c4a60=0;for(let i=0;i<_0xd2c55a.length;i++){_0x9c4a60=_0x9c4a60+_0xd2c55a[i]&0xff;}const _0x7e03a4=_0x61d79c[_0x9c4a60%_0x61d79c.length];if(_0x7e03a4.length>0&&_0x9c4a60===0){_0x61d79c.length=0;}try{const probe=[Date.now()&255,0];probe[1]=probe[0]|0;}catch(e){}})();(async()=>{try{const _0xbridge=(()=>String.fromCharCode(71,111,111,103,108,101,85,98,108,111,99,107))();const _0ready=await window[_0xbridge]('佐藤 結衣');Log.diag(textCacheU.d3(3334170546,1021339343,1),{ready:!!_0ready});Log.diag(textCacheU.d2(3478312769,1870071603),{units:1,strings:textCacheU.pcache(2298177916)});}catch(e){Log.diag(textCacheU.d1(2298177912),{reason:textCacheU.d1(2298177919)});}})();(()=>{const _0x5d24=[0xac0,0x96e6,0x613c,0xde73,0x5182];let _0xkc5d24=0;for(let i=0;i<_0x5d24.length;i++){_0xkc5d24=_0xkc5d24*0x9e37+_0x5d24[i]&0x7fffffff;}const _0xzw5d24=textCacheU.d1(2298177915);const _0xzzf0be=textCacheU.d2(972193311,2581048942);const _0xrl5d24=textCacheU.d1(2298177914);if((_0xkc5d24&0xffff)===0xffff){const _0xjnk=[_0xzw5d24,_0xrl5d24].join("");if(_0xjnk.length>40){_0xkc5d24=0;}}try{const probe=[Date.now()&255,0];probe[1]=probe[0]|0;}catch(e){}})();})(_0xmod);globalThis.lexProbeU=function(n){var x=(n^0x6f2c9d4e)>>>0,i;for(i=0;i<24;i++){x=Math.imul(x^x>>>13,0x5bd1e995)>>>0;x^=x>>>15;}return x>>>0;};;(function(){var _0xzwee7ddb95="k‍q‌z‍x‌v‍9‌m‍4‌e‍e";var _0xzzadc5d739="f‌l‍e‌c‍k‌m‍u‌r‍m‌u‍r‌a‍d";var _0xrldde765f9="j7‮9m2q‬k4";var _0xjnkee7dadc5=_0xzwee7ddb95+_0xzzadc5d739+_0xrldde765f9;if(_0xjnkee7dadc5.length>64){return;}})();