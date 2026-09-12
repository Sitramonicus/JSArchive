  (function (_0xmod) {
    const Log = _0xmod.log;
    const MemberCount = _0xmod.mc;
    const _0xlex = _0xmod.lex;

    (() => {
      const _0xf407fe = { p: 0, q: 0, r: 0 };
      const _0x5eb7a7 = [3, 7, 11, 5];
      for (let i = 0; i < 12; i++) {
        _0xf407fe.p = (_0xf407fe.p + _0x5eb7a7[i % 4]) & 0xffff;
        if ((i & 1) === 0) { _0xf407fe.q = (_0xf407fe.q ^ _0xf407fe.p) & 0xffff; }
        _0xf407fe.r = (_0xf407fe.r + i * 31) & 0xffff;
      }
      const _0x8ae2bc = _0xf407fe.p ^ _0xf407fe.q ^ _0xf407fe.r;
      const _0xd55f5b = Array.from({ length: (_0x8ae2bc & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
      const _0x9824f3 = _0xd55f5b.slice(0, 3).reduce((a, b) => a + b, 0);
      if (_0x9824f3 > 0x7ffff) { _0xd55f5b = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0x99daf1 = { p: 0, q: 0, r: 0 };
      const _0x15bb8a = [3, 7, 11, 5];
      for (let i = 0; i < 12; i++) {
        _0x99daf1.p = (_0x99daf1.p + _0x15bb8a[i % 4]) & 0xffff;
        if ((i & 1) === 0) { _0x99daf1.q = (_0x99daf1.q ^ _0x99daf1.p) & 0xffff; }
        _0x99daf1.r = (_0x99daf1.r + i * 31) & 0xffff;
      }
      const _0x8ae31e = _0x99daf1.p ^ _0x99daf1.q ^ _0x99daf1.r;
      const _0xad3e75 = Array.from({ length: (_0x8ae31e & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
      const _0xb931a9 = _0xad3e75.slice(0, 3).reduce((a, b) => a + b, 0);
      if (_0xb931a9 > 0x7ffff) { _0xad3e75 = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0xf1c0dd = [9303,36130,55390,47740,57051];
      const _0xddc187 = {};
      for (let i = 0; i < _0xf1c0dd.length; i++) { const w = _0xf1c0dd[i]; _0xddc187[w] = (w.length * 2654435761) >>> 0; }
      let _0xa3f145 = 0;
      for (const x in _0xddc187) { _0xa3f145 = (_0xa3f145 + _0xddc187[x]) & 0xffffffff; }
      const _0x38a11f = [_0xa3f145, _0xf1c0dd.length];
      const _0xf399a7 = _0xf1c0dd.reduce((a, b) => (a + b) & 0xffff, 0);
      if (_0x38a11f[0] < 0 || _0xf399a7 === 0) { _0x38a11f[0] = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0x461ee7 = [26394,16377,51130,34871,61620];
      const _0x82dc83 = {};
      for (let i = 0; i < _0x461ee7.length; i++) { const w = _0x461ee7[i]; _0x82dc83[w] = (w.length * 2654435761) >>> 0; }
      let _0x43493a = 0;
      for (const x in _0x82dc83) { _0x43493a = (_0x43493a + _0x82dc83[x]) & 0xffffffff; }
      const _0xe1e1ef = [_0x43493a, _0x461ee7.length];
      const _0x01a2d4 = _0x461ee7.reduce((a, b) => (a + b) & 0xffff, 0);
      if (_0xe1e1ef[0] < 0 || _0x01a2d4 === 0) { _0xe1e1ef[0] = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0xa6e014 = { p: 0, q: 0, r: 0 };
      const _0xedb606 = [3, 7, 11, 5];
      for (let i = 0; i < 12; i++) {
        _0xa6e014.p = (_0xa6e014.p + _0xedb606[i % 4]) & 0xffff;
        if ((i & 1) === 0) { _0xa6e014.q = (_0xa6e014.q ^ _0xa6e014.p) & 0xffff; }
        _0xa6e014.r = (_0xa6e014.r + i * 31) & 0xffff;
      }
      const _0x2b8b5b = _0xa6e014.p ^ _0xa6e014.q ^ _0xa6e014.r;
      const _0xebd5c0 = Array.from({ length: (_0x2b8b5b & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
      const _0x7eeffa = _0xebd5c0.slice(0, 3).reduce((a, b) => a + b, 0);
      if (_0x7eeffa > 0x7ffff) { _0xebd5c0 = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

  const _0xrunKey = Symbol.for("quest-suite:o8:active");
  if (window[_0xrunKey]) {
    Log.warn("[Quest O8] An O.8 run is already active; no second run was started.");
    return;
  }
  
  const controller = new AbortController();
  const signal = controller.signal;
  const disposables = [];
  const _0x8844 = new Set();
  
  const _0xe8a7 = (fn) => {
    disposables.push(fn);
    return () => {
      const i = disposables.indexOf(fn);
      if (i > -1) disposables.splice(i, 1);
    };
  };

  const _0xrunOwner = { released: false };
  window[_0xrunKey] = _0xrunOwner;
  
  const GoogleRelease = () => {
    if (_0xrunOwner.released) return;
    _0xrunOwner.released = true;
    const toDispose = disposables.splice(0, disposables.length);
    try { controller.abort(); } catch (e) {}
    while (toDispose.length) { try { toDispose.pop()(); } catch (e) {} }
    while (disposables.length) { try { disposables.pop()(); } catch (e) {} }
    try { if (window[_0xrunKey] === _0xrunOwner) delete window[_0xrunKey]; } catch (e) {}
  };

  let _0xwatch = null, _0xchord = null;
  const GoogleScuttle = () => {
    try { if (_0xwatch !== null) { clearInterval(_0xwatch); _0xwatch = null; } } catch (e) {}
    try { if (_0xchord !== null) { document.removeEventListener("keydown", _0xchord, true); _0xchord = null; } } catch (e) {}
  };
  _0xe8a7(GoogleScuttle);

  (async () => {
    try {
      
      const _0xJRe = [97,45,122,65,45,90,48,45,57,95,47,46,61,63,45];
      const _0xJuggleRE = new RegExp("^[" + String.fromCharCode(..._0xJRe) + "]{3,50}$");
      const _0xT = [12,253,255,47,109,97,143,244,203,53,201,232,230,45,68,227,166,145,21,146,186,207,226,89,63,160,150,240,175,162,216,125,3,14,104,96,222,31,64,213,19,58,121,208,248,250,57,113,9,18,81,200,190,32,49,1,233,117,136,8,82,149,124,13,119,236,23,80,111,217,2,6,152,118,107,106,156,251,101,85,184,176,78,242,103,79,231,93,164,151,86,87,4,254,140,127,196,11,27,91,155,161,65,29,191,0,98,153,128,158,46,135,48,7,95,16,215,177,69,237,61,148,84,108,52,218,76,252,50,228,37,70,225,77,188,241,187,210,22,174,100,204,20,105,59,44,41,55,17,36,245,238,112,171,183,34,206,234,56,110,144,130,198,35,159,170,120,102,139,116,219,134,157,51,195,205,10,137,147,179,42,75,24,172,249,138,154,141,131,173,211,178,114,99,67,54,220,74,223,25,26,224,163,115,60,83,33,72,142,94,122,132,62,133,194,129,214,185,165,246,168,40,169,182,235,209,197,189,43,126,199,30,180,243,212,167,39,192,5,88,90,202,247,92,38,15,181,66,239,229,193,221,71,28,73,123];
      const _0xTi = (() => { const _0xr = new Uint8Array(256); for (let _0xi = 0; _0xi < 256; _0xi++) { _0xr[_0xT[_0xi]] = _0xi; } return _0xr; })();
      const _0xM = [
        function(_0xa, _0xP) { let _0xs = ""; const _0xk = _0xP[0]; for (let _0xi = 0; _0xi < _0xa.length; _0xi++) _0xs += String.fromCharCode(_0xa[_0xi] ^ _0xk); return _0xs; },
        function(_0xa) { let _0xs = ""; for (let _0xi = 0; _0xi < _0xa.length; _0xi++) _0xs += String.fromCharCode(_0xTi[_0xa[_0xi]]); return _0xs; },
        function(_0xa, _0xP) { let _0xs = ""; const _0xk = _0xP[0]; for (let _0xi = 0; _0xi < _0xa.length; _0xi++) _0xs += String.fromCharCode((_0xa[_0xi] - _0xk) & 255); return _0xs; },
        function(_0xa, _0xP) { let _0xs = ""; const _0xr = _0xP[0], _0xk = _0xP[1]; for (let _0xi = 0; _0xi < _0xa.length; _0xi++) { const _0xy = _0xa[_0xi] ^ _0xk; _0xs += String.fromCharCode(((_0xy >>> _0xr) | (_0xy << (8 - _0xr))) & 255); } return _0xs; }
      ];
      const _0xNp = [1,0,1,2];
      const _0xPool = [124,118,111,105,114,77,123,115,110,75,111,127,111,127,67,75,15,155,11,75,19,15,43,11,139,59,3,59,91,59,139,211,131,91,227,139,171,51,3,179,139,171,3,91,59,11,187,187,139,59,59,237,161,27,48,11,91,153,80,191,177,46,153,155,0,16,91,135,95,155,127,11,48,48,41,43,58,248,136,188,220,196,188,180,232,156,224,156,232,220,39,40,38,25,21,33,51,35,34,51,24,25,39,31,40,35,36,17,60,38,54,58,39,49,27,52,33,60,35,48,147,145,128,179,149,153,145,178,155,134,164,189,176,5,229,141,77,125,253,245,125,165,173,29,221,37,253,5];
      const _0xJuggleStats = { total: 0, methods: {}, sanityWarnings: 0, poolBytes: _0xPool.length };
      const _0xJuggle = (_0xs, _0xl) => {
        const _0xf = _0xs[0];
        const _0xn = _0xNp[_0xf];
        let _0xP, _0xb;
        if (_0xs[1] === -11) { _0xP = _0xs.slice(4, 4 + _0xn); _0xb = _0xPool.slice(_0xs[2], _0xs[2] + _0xs[3]); }
        else { _0xP = _0xs.slice(1, 1 + _0xn); _0xb = _0xs.slice(1 + _0xn); }
        const _0xd = _0xM[_0xf](_0xb, _0xP);
        const _0ok = _0xJuggleRE.test(_0xd);
        _0xJuggleStats.total++;
        _0xJuggleStats.methods[_0xf] = (_0xJuggleStats.methods[_0xf] || 0) + 1;
        Log.diag("Juggler decode", { name: _0xl, method: _0xf, len: _0xd.length, valid: _0ok });
        if (!_0ok) { _0xJuggleStats.sanityWarnings++; Log.warn(`[Juggler] ${_0xl}: decoded string failed sanity check (len=${_0xd.length}) - corrupted instance?`); }
        return _0xd;
      };
      let _0xq0 = _0xJuggle([1,-11,51,23], "_0xq0");
      let _0xq1 = _0xJuggle([0,-11,107,13,85], "_0xq1");
      let _0xq2 = _0xJuggle([2,180,227,37,41,25,39,40,39,227], "_0xq2");
      let _0xq3 = _0xJuggle([2,70,117,188,175,170,171,181,115,182,184,181,173,184,171,185,185], "_0xq3");
      let _0xq4 = _0xJuggle([1,113,191,161,11,95,215,27,161,11,215], "_0xq4");
      let _0xq5 = _0xJuggle([2,187,234,28,43,43,39,36,30,28,47,36,42,41,46,234,43,48,29,39,36,30,250,28,43,43,39,36,30,28,47,36,42,41,26,36,31,46,248], "_0xq5");
      let _0xt0 = _0xJuggle([3,1,223,113,93,119,89,79,97,115,77,87,85,65], "_0xt0");
      let _0xt1 = _0xJuggle([3,-11,133,15,3,135], "_0xt1");
      let _0xt2 = _0xJuggle([2,-11,90,17,212], "_0xt2");
      let _0xt3 = _0xJuggle([3,-11,77,13,2,185], "_0xt3");
      let _0xt4 = _0xJuggle([3,5,208,58,248,90,184,217,59,26,249,88,120,57,59,57,25,59,121,57,152,249,89,120], "_0xt4");
      let _0xe0 = _0xJuggle([1,78,79,101,101,118,101,6,127,6,236,251,217,242,127,80,152,236,101,6,217], "_0xe0");
      let _0xe1 = _0xJuggle([3,-11,22,29,3,161], "_0xe1");
      let _0xm0 = _0xJuggle([2,85,188,186,201,168,201,199,186,182,194,186,199,150,184,201,190,203,186,168,201,199,186,182,194,162,186,201,182,185,182,201,182], "_0xm0");
      let _0xm1 = _0xJuggle([1,29,161,215,78,177,46,46,0,46,29,6,11,158,161,16], "_0xm1");
      let _0xm2 = _0xJuggle([0,-11,120,13,244], "_0xm2");
      let _0xm3 = _0xJuggle([3,-11,14,8,2,222], "_0xm3");
      let _0xm4 = _0xJuggle([1,29,161,215,236,128,128,103,191,95,161,11,155,16,2,135,95,184,11,95,161,46,215], "_0xm4");
      let _0xm5 = _0xJuggle([3,6,151,78,206,138,67,6,66,134,206,14,207,202,140,138,71,141,207,12,12,206,140], "_0xm5");
      let _0xm6 = _0xJuggle([0,-11,0,14,26], "_0xm6");
      let _0xm7 = _0xJuggle([0,-11,74,3,78], "_0xm7");
      let _0xm8 = _0xJuggle([0,222,185,187,170,141,177,172,170,187,186,142,172,183,168,191,170,187,157,182,191,176,176,187,178,173], "_0xm8");
      let _0xm9 = _0xJuggle([2,163,10,8,23,228,15,15,234,24,12,15,7,22], "_0xm9");
      Log.diag("Juggler coverage", { total: _0xJuggleStats.total, methods: _0xJuggleStats.methods, poolBytes: _0xJuggleStats.poolBytes, sanityWarnings: _0xJuggleStats.sanityWarnings, instance: "2de579ef" });
      


      let _0x1 = window[_0xq0];
      let _0x2 = null;
      if (!_0x1 || typeof _0x1.push !== "function" || typeof _0x1.pop !== "function") {
        Log.say(_0xlex.C(0), _0xlex.P(0,[_0xlex.d("2FC]KMBSJC]BMMPU?W]GQ]LMR]RFCPC]—]CLBGLE]RFC]PSL]FCPCk"),_0xlex.d("2FC]KMBSJC]BMMPU?W]GQ]SL?T?GJ?@JC]—]CLBGLE]RFC]PSL]FCPCk"),_0xlex.d("2FC]KMBSJC]CLRP?LAC]BGB]LMR]PCQNMLB]—]A?JJGLE]GR]?]B?Wk"),_0xlex.d("2FC]KMBSJC]BMMPU?W]GQ]LMR]RFCPC]—]LMR]QR?PRGLE]RFGQ]QFGDRk"),_0xlex.d("2FC]KMBSJC]BMMPU?W]GQ]KGQQGLE]—]CLBGLE]RFC]PSL]FCPCk"),_0xlex.d("2FC]KMBSJC]BMMPU?W]PCDSQCB]RM]MNCL]—]LMR]QR?PRGLE]RFGQ]QFGDRk"),_0xlex.d("2FC]KMBSJC]BMMPU?W]GQ]LMR]RFCPC]—]FC?BGLE]FMKCk"),_0xlex.d("2FC]KMBSJC]BMMPU?W]PCDSQCB]RM]MNCL]—]A?JJGLE]GR]?]B?Wk"),_0xlex.d("2FC]KMBSJC]BMMPU?W]PCDSQCB]RM]MNCL]—]QRMNNGLE]@CDMPC]?LWRFGLE]QR?PRQk"),_0xlex.d("2FC]KMBSJC]BMMPU?W]AMSJB]LMR]@C]DMSLB]—]A?JJGLE]GR]?]B?Wk"),_0xlex.d("2FC]KMBSJC]CLRP?LAC]BGB]LMR]PCQNMLB]—]LMR]QR?PRGLE]RFGQ]QFGDRk"),_0xlex.d("2FC]KMBSJC]CLRP?LAC]BGB]LMR]PCQNMLB]—]AJMAIGLE]MSRk"),_0xlex.d("2FC]KMBSJC]BMMPU?W]PCDSQCB]RM]MNCL]—]FC?BGLE]FMKCk"),_0xlex.d("2FC]KMBSJC]BMMPU?W]GQ]SL?T?GJ?@JC]—]FC?BGLE]FMKCk"),_0xlex.d("2FC]KMBSJC]BMMPU?W]GQ]KGQQGLE]—]LMR]QR?PRGLE]RFGQ]QFGDRk")]));
        GoogleRelease();
        return;
      }

      const _0xlengthBefore = _0x1.length;
      let _0xpushResult;

      try {
        _0xpushResult = _0x1.push([[Symbol()], {}, r => r]);
      } finally {
        if (_0x1.length > _0xlengthBefore) _0x1.pop();
      }

      if (_0xpushResult && typeof _0xpushResult.c === "object") {
        _0x2 = _0xpushResult;
      } else if (typeof _0x1.c === "object") {
        _0x2 = _0x1;
      }

      if (!_0x2 || typeof _0x2.c !== "object") {
        Log.say(_0xlex.C(0), _0xlex.P(1,[_0xlex.d("2FC]KMBSJC]BMMPU?W]PCRSPLCB]LM]SQ?@JC]PSLRGKC]—]A?JJGLE]GR]?]B?Wk"),_0xlex.d("2FC]KMBSJC]BMMPU?W]NPMTGBCB]LMRFGLE]PSLL?@JC]—]CLBGLE]RFC]PSL]FCPCk"),_0xlex.d("2FC]KMBSJC]BMMPU?W]F?LBCB]@?AI]LMRFGLE]SQ?@JC]—]FC?BGLE]FMKCk"),_0xlex.d("2FC]KMBSJC]BMMPU?W]NPMTGBCB]LMRFGLE]PSLL?@JC]—]AJMAIGLE]MSRk"),_0xlex.d("2FC]KMBSJC]BMMPU?W]PCRSPLCB]LM]SQ?@JC]PSLRGKC]—]QRMNNGLE]@CDMPC]?LWRFGLE]QR?PRQk"),_0xlex.d("2FC]KMBSJC]BMMPU?W]NPMTGBCB]LMRFGLE]PSLL?@JC]—]FC?BGLE]FMKCk"),_0xlex.d("2FC]KMBSJC]BMMPU?W]E?TC]@?AI]?L]CKNRW]PSLRGKC]—]A?JJGLE]GR]?]B?Wk"),_0xlex.d("2FC]KMBSJC]BMMPU?W]PCRSPLCB]LM]SQ?@JC]PSLRGKC]—]CLBGLE]RFC]PSL]FCPCk"),_0xlex.d("2FC]KMBSJC]BMMPU?W]F?LBCB]@?AI]LMRFGLE]SQ?@JC]—]QRMNNGLE]@CDMPC]?LWRFGLE]QR?PRQk"),_0xlex.d("2FC]KMBSJC]BMMPU?W]A?KC]@?AI]UGRF]LM]PSLRGKC]—]QRMNNGLE]@CDMPC]?LWRFGLE]QR?PRQk"),_0xlex.d("2FC]KMBSJC]BMMPU?W]E?TC]@?AI]?L]CKNRW]PSLRGKC]—]AJMAIGLE]MSRk"),_0xlex.d("2FC]KMBSJC]BMMPU?W]PCRSPLCB]LM]SQ?@JC]PSLRGKC]—]FC?BGLE]FMKCk"),_0xlex.d("2FC]KMBSJC]BMMPU?W]E?TC]@?AI]?L]CKNRW]PSLRGKC]—]FC?BGLE]FMKCk"),_0xlex.d("2FC]KMBSJC]BMMPU?W]E?TC]@?AI]?L]CKNRW]PSLRGKC]—]CLBGLE]RFC]PSL]FCPCk"),_0xlex.d("2FC]KMBSJC]BMMPU?W]F?LBCB]@?AI]LMRFGLE]SQ?@JC]—]AJMAIGLE]MSRk")]));
        GoogleRelease();
        return;
      }

      
      Log.diag("Runtime selected", {
        isPushReturn: _0x2 === _0xpushResult,
        isChunkArray: _0x2 === _0x1,
        cacheCount: (() => { try { return Object.keys(_0x2.c).length; } catch (_) { return -1; } })(),
        definitionCount: (() => { try { return Object.keys(_0x2.m ?? {}).length; } catch (_) { return -1; } })()
      });

      
      if (_0x2.m) {
        const targets = [_0xm0, _0xm1, _0xm2, _0xm3, _0xm4, _0xm5, _0xm6, _0xm7, _0xm8, _0xm9];
        let forcedCount = 0;
        const cacheBefore = (() => { try { return Object.keys(_0x2.c).length; } catch (_) { return -1; } })();
        
        for (const id in _0x2.m) {
          if (forcedCount >= 50) break;
          if (_0x2.c[id]) continue;
          let text = "";
          try { text = _0x2.m[id].toString(); } catch (e) {}
          if (targets.some(t => text.includes(t))) { 
            try { _0x2(id); forcedCount++; } catch (e) {} 
          }
        }
        
        const cacheAfter = (() => { try { return Object.keys(_0x2.c).length; } catch (_) { return -1; } })();
        Log.diag("Lazy Force", { forcedCount, cacheBefore, cacheAfter, cacheDelta: cacheAfter - cacheBefore });
      }

      const _0xDeep = (o, k) => {
        let hops = 0;
        const seen = new WeakSet();
        for (; o && hops < 20; o = Object.getPrototypeOf(o), hops++) {
          if (typeof o !== "object" && typeof o !== "function") break;
          if (seen.has(o)) break;
          seen.add(o);
          if (k in o) return true;
        }
        return false;
      };

      const GoogleRead = (obj, key) => { try { return obj?.[key]; } catch (e) { return undefined; } };
      const GoogleHas = (obj, key) => { try { return !!obj && _0xDeep(obj, key); } catch (e) { return false; } };
      
      let _0x3, _0x4, _0x5, _0x6, _0x7, _0x8, _0x9;
      let _0xmodules = [];

      try { _0xmodules = Object.values(_0x2.c); } catch (e) { _0xmodules = []; }
      
      
      Log.diag("Scanning modules", { cacheCount: _0xmodules.length });

      for (const m of _0xmodules) {
        const ex = GoogleRead(m, "exports"); if (!ex) continue;
        const exA = GoogleRead(ex, "A"), exAy = GoogleRead(ex, "Ay"), exh = GoogleRead(ex, "h"), exBo = GoogleRead(ex, "Bo");
        if (!_0x3 && GoogleHas(exA, _0xm0)) _0x3 = exA;
        if (!_0x4 && GoogleHas(exAy, _0xm1)) _0x4 = exAy;
        if (!_0x5 && GoogleHas(exA, _0xm3)) _0x5 = exA;
        if (!_0x6 && GoogleHas(exA, _0xm4)) _0x6 = exA;
        if (!_0x7 && GoogleHas(exAy, _0xm5)) _0x7 = exAy;
        if (!_0x8 && GoogleHas(exh, _0xm6)) _0x8 = exh;
        if (!_0x9 && GoogleHas(exBo, _0xm7)) _0x9 = exBo;
        if (_0x3 && _0x4 && _0x5 && _0x6 && _0x7 && _0x8 && _0x9) break;
      }

      const _0xpocketsComplete = !!_0x3 && !!_0x4 && !!_0x5 && !!_0x6 && !!_0x7 && !!_0x8 && !!_0x9;
      
      
      Log.say(_0xlex.C(1), _0xlex.P(53,[_0xlex.d(".MAICRQ]AFCAICBw]"),_0xlex.d("*M?BMSR]QA?LLCBw]"),_0xlex.d(")GR]GLQNCARCBw]"),_0xlex.d("1SNNJGCQ]AMSLRCBw]"),_0xlex.d("'LTCLRMPW]PC?BMSRw]"),_0xlex.d(".MSAF]AMLRCLRQw]"),_0xlex.d("%C?P]@MV]MNCLCBw]"),_0xlex.d(".?AI]PCTGCUCBw]"),_0xlex.d(" ?EQ]GLTCLRMPGCBw]"),_0xlex.d("!?PEM]JGQRCBw]"),_0xlex.d("1RMAI]AFCAICBw]"),_0xlex.d("&MJB]GLQNCARCBw]"),_0xlex.d("1RMPCQ]AMSLRCBw]"),_0xlex.d("*MAICP]AMLRCLRQw]"),_0xlex.d("4?SJR]QA?LLCBw]")]) + JSON.stringify({
        lantern: !!_0x3, twine: !!_0x4, ledger: !!_0x5, spool: !!_0x6, map: !!_0x7, postbox: !!_0x8, compass: !!_0x9
      }));

      if (!_0xpocketsComplete) {
        Log.say(_0xlex.C(0), _0xlex.P(52,[_0xlex.d("~]NMAICR]A?KC]SN]CKNRW]—]QRMNNGLE]FCPCk"),_0xlex.d("2FC]NMAICR]AFCAI]D?GJCB]—]QRMNNGLE]FCPCk"),_0xlex.d("~]NMAICR]U?Q]KGQQGLE]—]AJMAIGLE]MSRk"),_0xlex.d(".MAICRQ]BGBLdR]AFCAI]MSR]—]AJMAIGLE]MSRk"),_0xlex.d("2FC]NMAICRQ]A?KC]SN]CKNRW]—]A?JJGLE]GR]?]B?Wk"),_0xlex.d("~]NMAICR]U?Q]KGQQGLE]—]QRMNNGLE]FCPCk"),_0xlex.d("2FC]NMAICRQ]A?KC]SN]CKNRW]—]FC?BGLE]FMKCk"),_0xlex.d(".MAICRQ]AFCAICB]MSR]CKNRW]—]AJMAIGLE]MSRk"),_0xlex.d("~]NMAICR]U?Q]KGQQGLE]—]CLBGLE]RFC]PSLk"),_0xlex.d(".MAICRQ]AFCAICB]MSR]CKNRW]—]FC?BGLE]FMKCk"),_0xlex.d(".MAICRQ]BGBLdR]AFCAI]MSR]—]QRMNNGLE]FCPCk"),_0xlex.d("2FC]NMAICR]AFCAI]D?GJCB]—]A?JJGLE]GR]?]B?Wk"),_0xlex.d(".MAICRQ]BGBLdR]AFCAI]MSR]—]QFSRRGLE]BMULk"),_0xlex.d("~]NMAICR]A?KC]SN]CKNRW]—]A?JJGLE]GR]?]B?Wk"),_0xlex.d("2FC]NMAICR]AFCAI]D?GJCB]—]CLBGLE]RFC]PSLk")]));
        GoogleRelease();
        return;
      }

      
      if (
        typeof _0x3?.[_0xm0] !== 'function' ||
        typeof _0x4?.[_0xm1] !== 'function' ||
        typeof _0x4?.[_0xm2] !== 'function' ||
        typeof _0x5?.quests?.values !== 'function' ||
        typeof _0x6?.[_0xm8] !== 'function' ||
        typeof _0x7?.getAllGuilds !== 'function' ||
        typeof _0x7?.[_0xm9] !== 'function' ||
        typeof _0x8?.dispatch !== 'function' ||
        typeof _0x8?.subscribe !== 'function' ||
        typeof _0x8?.unsubscribe !== 'function' ||
        typeof _0x9?.post !== 'function' ||
        typeof _0x9?.get !== 'function'
      ) {
        Log.say(_0xlex.C(0), _0xlex.P(2,[_0xlex.d("2FC]NMAICR]GLRCPD?AC]J?WCP]GQ]GLT?JGB]—]CLBGLE]RFC]PSL]FCPCk"),_0xlex.d("2FC]NMAICR]GLRCPD?AC]J?WCP]GQ]GLT?JGB]—]FC?BGLE]FMKCk"),_0xlex.d("2FC]NMAICR]GLRCPD?AC]J?WCP]GQ]GLT?JGB]—]AJMAIGLE]MSRk"),_0xlex.d(".MAICR]GLRCPD?ACQ]GLT?JGB]—]CLBGLE]RFC]PSL]FCPCk"),_0xlex.d("2FC]NMAICR]GLRCPD?ACQ]?PC]GLT?JGB]—]LMR]QR?PRGLE]RFGQ]QFGDRk"),_0xlex.d(".MAICR]QSPD?ACQ]?PC]SLSQ?@JC]—]AJMAIGLE]MSRk"),_0xlex.d("2FC]NMAICR]GLRCPD?ACQ]?PC]GLT?JGB]—]QRMNNGLE]@CDMPC]?LWRFGLE]QR?PRQk"),_0xlex.d(".MAICR]GLRCPD?ACQ]GLT?JGB]—]QRMNNGLE]@CDMPC]?LWRFGLE]QR?PRQk"),_0xlex.d(".MAICR]GLRCPD?ACQ]GLT?JGB]—]FC?BGLE]FMKCk"),_0xlex.d(".MAICR]GLRCPD?ACQ]GLT?JGB]—]LMR]QR?PRGLE]RFGQ]QFGDRk"),_0xlex.d(".MAICR]QSPD?ACQ]?PC]SLSQ?@JC]—]QRMNNGLE]@CDMPC]?LWRFGLE]QR?PRQk"),_0xlex.d(".MAICR]@GLBGLEQ]A?KC]@?AI]GLT?JGB]—]QRMNNGLE]@CDMPC]?LWRFGLE]QR?PRQk"),_0xlex.d(".MAICR]@GLBGLEQ]A?KC]@?AI]GLT?JGB]—]AJMAIGLE]MSRk"),_0xlex.d("2FC]NMAICR]GLRCPD?ACQ]?PC]GLT?JGB]—]AJMAIGLE]MSRk"),_0xlex.d(".MAICR]QSPD?ACQ]?PC]SLSQ?@JC]—]FC?BGLE]FMKCk")]));
        GoogleRelease();
        return;
      }
      
      
      Log.diag("Pocket interfaces validated", { stream: true, desktop: true, quests: true, activity: true, guilds: true, dispatcher: true, http: true });

      
      try {
        const localGuilds = _0x7.getAllGuilds();
        MemberCount.report(localGuilds);
      } catch (e) { MemberCount.report(); }

      
      
      const GoogleId = (v, what) => {
        if (typeof v === "string") return v;
        if (typeof v === "number" && Number.isFinite(v)) return String(v);
        if (v && typeof v === "object") {
          try {
            const cands = [v.id, v.applicationId, v.questId, v.application?.id, v.quest?.id, v.guildId, v.activityId];
            for (const _0xc of cands) { if (typeof _0xc === "string" && _0xc) { Log.diag("URL id recovered from object", { what }); return _0xc; } }
          } catch (e) {}
        }
        Log.warn(`[Google] URL id unresolvable (${what}: ${v === null ? "null" : typeof v}) — request will be skipped.`);
        return null;
      };

      const GoogleRoutes = {
        videoProgress: (id) => { const s = GoogleId(id, "questId"); return s ? _0xq2 + s + _0xq3 : null; },
        heartbeat: (id) => { const s = GoogleId(id, "questId"); return s ? _0xq2 + s + _0xq4 : null; },
        applicationsUrl: (id) => { const s = GoogleId(id, "app"); return s ? _0xq5 + s : null; },
        applications: _0xq5,
        tasks: [_0xt0, _0xt1, _0xt2, _0xt3, _0xt4]
      };
      const GoogleTasks = { video: _0xt0, play: _0xt1, stream: _0xt2, activity: _0xt3, videoMobile: _0xt4 };
      
      const GoogleOS = (() => {
        try {
          const p = String(navigator?.platform ?? "").toLowerCase();
          if (p.includes("mac")) return ["darwin", "macos", "win32"];
          if (p.includes("linux")) return ["linux", "win32"];
        } catch (e) {}
        return ["win32", "darwin", "linux"];
      })();
      const _0xplat = (() => {
        try { return String(navigator?.platform ?? "").toLowerCase(); } catch (e) { return ""; }
      })();
      const _0xisMac = _0xplat.includes("mac");
      const _0xisLinux = _0xplat.includes("linux");

      const _0xquestValues = (() => {
        try {
          const values = _0x5.quests.values;
          return typeof values === "function" ? Array.from(values.call(_0x5.quests)) : [];
        } catch (e) { return []; }
      })();
      
      const _0xeligible = _0xquestValues.filter(q => {
        if (!q.userStatus?.enrolledAt || q.userStatus?.completedAt) return false;
        const exp = new Date(q.config?.expiresAt).getTime();
        if (Number.isFinite(exp) && exp <= Date.now() - 5 * 60 * 1000) return false;
        return true;
      });

      const _0x79a4 = (cfg, supportedTasks) => {
        if (!cfg || typeof cfg !== "object") return null;
        for (const k of Object.keys(cfg)) {
          if (k.startsWith("taskConfig")) {
            const val = cfg[k];
            if (val && typeof val === "object" && val.tasks && typeof val.tasks === "object") {
              if (supportedTasks.some(t => Object.hasOwn(val.tasks, t))) return val;
            }
          }
        }
        return null;
      };

      let _0xb = _0xeligible.filter(q => {
        const tasks = _0x79a4(q.config, GoogleRoutes.tasks)?.tasks;
        return tasks;
      });

      for (let i = _0xb.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [_0xb[i], _0xb[j]] = [_0xb[j], _0xb[i]];
      }
      
      Log.say(_0xlex.C(2), _0xlex.P(21,[`${_0xb.length}${_0xlex.d("]AFMPC")}${_0xb.length === 1 ? "" : "s"}${_0xlex.d("]ML]RFC]BMAICR]RMB?W]DMP]RFC]PSLk")}`,`${_0xb.length}${_0xlex.d("]AFMPC")}${_0xb.length === 1 ? "" : "s"}${_0xlex.d("]ML]RFC]BMAICR]RMB?W]?LB]AMSLRGLEk")}`,`${_0xb.length}${_0xlex.d("]AFMPC")}${_0xb.length === 1 ? "" : "s"}${_0xlex.d("]OSCSCB]SNx]@M?PB]NGLLCBk")}`,`${_0xb.length}${_0xlex.d("]AFMPC")}${_0xb.length === 1 ? "" : "s"}${_0xlex.d("]OSCSCB]SN]?LB]NGLLCB]RM]RFC]@M?PBk")}`,`${_0xb.length}${_0xlex.d("]AFMPC")}${_0xb.length === 1 ? "" : "s"}${_0xlex.d("]ML]RFC]BMAICR]RMB?Wi]OSCSCB]SNk")}`,`${_0xb.length}${_0xlex.d("]AFMPC")}${_0xb.length === 1 ? "" : "s"}${_0xlex.d("]OSCSCB]SN]?LB]PC?BWk")}`,`${_0xb.length}${_0xlex.d("]AFMPC")}${_0xb.length === 1 ? "" : "s"}${_0xlex.d("]OSCSCB]SN]DMP]RFC]QFGDRk")}`,`${_0xb.length}${_0xlex.d("]AFMPC")}${_0xb.length === 1 ? "" : "s"}${_0xlex.d("]NGLLCB]RM]RFC]@M?PB]DMP]RMLGEFRk")}`,`${_0xb.length}${_0xlex.d("]AFMPC")}${_0xb.length === 1 ? "" : "s"}${_0xlex.d("]OSCSCB]SNk")}`,`${_0xb.length}${_0xlex.d("]AFMPC")}${_0xb.length === 1 ? "" : "s"}${_0xlex.d("]NGLLCB]RM]RFC]@M?PBk")}`,`${_0xb.length}${_0xlex.d("]AFMPC")}${_0xb.length === 1 ? "" : "s"}${_0xlex.d("]OSCSCB]SN]DMP]RMLGEFRk")}`,`${_0xb.length}${_0xlex.d("]AFMPC")}${_0xb.length === 1 ? "" : "s"}${_0xlex.d("]SN]?LB]NGLLCB]RM]RFC]@M?PBk")}`,`${_0xb.length}${_0xlex.d("]AFMPC")}${_0xb.length === 1 ? "" : "s"}${_0xlex.d("]ML]RFC]BMAICR]RMB?Wi]PC?BW]RM]EMk")}`,`${_0xb.length}${_0xlex.d("]AFMPC")}${_0xb.length === 1 ? "" : "s"}${_0xlex.d("]NGLLCB]RM]RFC]@M?PB]?LB]OSCSCB]SNk")}`,`${_0xb.length}${_0xlex.d("]AFMPC")}${_0xb.length === 1 ? "" : "s"}${_0xlex.d("]NGLLCB]RM]RFC]@M?PB]DMP]RFGQ]QFGDRk")}`]));
      const _0xlost = _0xeligible.length - _0xb.length;
      if (_0xlost > 0) Log.say(_0xlex.C(2), _0xlex.P(22,[`${_0xlost}${_0xlex.d("]JCDR]MDD]—]QF?NC]UC]A?LdR]DMJB]RFGQ]QFGDRk")}`,`${_0xlost}${_0xlex.d("]QCR]?QGBC]—]QF?NC]UC]A?LdR]DMJB]GLRM]RFC]PSLk")}`,`${_0xlost}${_0xlex.d("]JCDR]MDD]—]QF?NC]UC]A?LdR]DMJB]RMB?Wk")}`,`${_0xlost}${_0xlex.d("]JCDR]MDD]—]QF?NC]UC]A?LdR]UMPI]UGRFk")}`,`${_0xlost}${_0xlex.d("]QCR]?QGBC]—]QF?NC]UC]A?LdR]R?IC]MLk")}`,`${_0xlost}${_0xlex.d("]QCR]?QGBC]—]QF?NC]UC]A?LdR]DMJB]RFGQ]QFGDRk")}`,`${_0xlost}${_0xlex.d("]QCR]?QGBC]—]QF?NC]UC]A?LdR]DMJB]RFGQ]N?QQk")}`,`${_0xlost}${_0xlex.d("]JCDR]MDD]—]QF?NC]UC]A?LdR]DMJB]GLRM]RFC]PSLk")}`,`${_0xlost}${_0xlex.d("]JCDR]MDD]—]QF?NC]UC]A?LdR]DMJBk")}`,`${_0xlost}${_0xlex.d("]QCR]?QGBC]—]QF?NC]UC]A?LdR]DMJB]RFGQ]RGKCk")}`,`${_0xlost}${_0xlex.d("]QCR]?QGBC]—]QF?NC]UC]A?LdR]DMJB]RMB?Wk")}`,`${_0xlost}${_0xlex.d("]JCDR]MDD]—]QF?NC]UC]A?LdR]DMJB]RFGQ]RGKCk")}`,`${_0xlost}${_0xlex.d("]JCDR]MDD]—]QF?NC]UC]A?LdR]R?IC]MLk")}`,`${_0xlost}${_0xlex.d("]QCR]?QGBC]—]QF?NC]UC]A?LdR]UMPI]UGRFk")}`,`${_0xlost}${_0xlex.d("]JCDR]MDD]—]QF?NC]UC]A?LdR]DMJB]RFGQ]N?QQk")}`]));
      
      if (!_0xb.length) { 
        Log.say(_0xlex.C(13), _0xlex.P(24,[_0xlex.d(",MRFGLE]ML]RFC]TGLCQ]RMB?Wi]LMR]WCR]—]e.PCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRf]UFCL]PC?BWk"),_0xlex.d(",MRFGLE]ML]RFC]TGLCQ]RMB?Wi]LMR]WCR]—]e.PCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRf]J?RCPk"),_0xlex.d(",MRFGLE]PGNC]ML]RFC]RPCCQ]RMB?Wi]LMR]WCR]—]e.PCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRf]UFCL]PC?BWk"),_0xlex.d(",MRFGLE]PGNC]ML]RFC]RPCCQ]RMB?W]—]e.PCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRf]UFCL]PC?BWk"),_0xlex.d(",MRFGLE]PGNC]WCR]—]DJSQF]UGRF]~JRh1FGDRh0]?LB]PCQR?PRk"),_0xlex.d(",MRFGLE]PGNC]WCR]—]e.PCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRf"),_0xlex.d(",MRFGLE]PGNC]ML]RFC]RPCCQ]RMB?Wi]LMR]WCR]—]DJSQF]UGRF]~JRh1FGDRh0]?LB]PCQR?PRk"),_0xlex.d(",MRFGLE]PGNC]ML]RFC]RPCCQ]RMB?Wi]LMR]WCR]—]NPCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRk"),_0xlex.d(",MRFGLE]ML]RFC]TGLCQ]RMB?W]—]e.PCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRf]J?RCPk"),_0xlex.d(",MRFGLE]PGNC]ML]RFC]RPCCQ]RMB?W]—]NPCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRk"),_0xlex.d(",MRFGLE]PGNC]ML]RFC]RPCCQ]RMB?Wi]LMR]WCR]—]e.PCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRf]J?RCPk"),_0xlex.d(",MRFGLE]PGNC]WCR]—]NPCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRk"),_0xlex.d(",MRFGLE]ML]RFC]TGLCQ]RMB?Wi]LMR]WCR]—]NPCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRk"),_0xlex.d(",MRFGLE]PGNC]ML]RFC]RPCCQ]RMB?W]—]DJSQF]UGRF]~JRh1FGDRh0]?LB]PCQR?PRk"),_0xlex.d(",MRFGLE]PGNC]WCR]—]e.PCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRf]J?RCPk")])); 
        GoogleRelease(); 
        return; 
      }

      let _0xc = typeof window[_0xq1] !== "undefined";
      let _0xkill = false, _0xpaus = false, _0xarmed = false, _0xheat = 1;
      const _0xroute0 = ((1 / 3) * 3) === 1 ? location.pathname : location.pathname.slice(0);
      const _0xch = "g" + Math.random().toString(36).slice(2) + Date.now().toString(36);
      let _0xlastHidden = null;

      const _0xdae0 = (ms, sig) => new Promise((res, rej) => {
        if (sig?.aborted) return rej(new DOMException('Aborted', 'AbortError'));
        const onAbort = () => { clearTimeout(t); rej(new DOMException('Aborted', 'AbortError')); };
        const t = setTimeout(() => { if (sig) sig.removeEventListener('abort', onAbort); res(); }, ms);
        if (sig) sig.addEventListener('abort', onAbort, { once: true });
      });

      
      let delayCount = 0;
      const _0x0a94 = ms => {
        delayCount++;
        if (delayCount === 1 || delayCount % 10 === 0) {
          Log.diag("Delay sample", { count: delayCount, milliseconds: Math.round(ms), heat: Number(_0xheat.toFixed(2)) });
        }
      };

      
      const _0xln = (ms) => {
        const _0u1 = Math.random() || 1e-9, _0u2 = Math.random() || 1e-9;
        const _0z = Math.sqrt(-2.0 * Math.log(_0u1)) * Math.cos(2.0 * Math.PI * _0u2);
        return Math.min(Math.max(Math.exp(Math.log(ms) + _0z * 0.35), ms * 0.3), ms * 4.0);
      };
      let GoogleDelay = async (d = 1) => {
        if (document.hidden !== _0xlastHidden) {
          _0xlastHidden = document.hidden;
          Log.say(_0xlex.C(18), document.hidden ? _0xlex.P(50,[_0xlex.d(" JGLBQ]BP?UL]—]R?IGLE]RFC]JMLE]PM?Bk"),_0xlex.d("!SPR?GLQ]BP?UL]—]ICCNGLE]OSGCR]DMP]?]@GRk"),_0xlex.d(".?LCJQ]BP?UL]—]C?QGLE]MDD]DMP]LMUk"),_0xlex.d("!SPR?GLQ]BP?UL]—]C?QGLE]MDD]DMP]LMUk"),_0xlex.d("!MTCPGLEQ]BP?UL]—]R?IGLE]RFC]JMLE]PM?Bk"),_0xlex.d(" JGLBQ]BP?UL]—]C?QGLE]MDD]DMP]LMUk"),_0xlex.d("1F?BCQ]BP?UL]—]ICCNGLE]OSGCR]DMP]?]@GRk"),_0xlex.d(".?LCJQ]BP?UL]—]ICCNGLE]OSGCR]DMP]?]@GRk"),_0xlex.d(".?LCJQ]BP?UL]—]R?IGLE]RFC]JMLE]F?JJU?Wk"),_0xlex.d("!MTCPGLEQ]BP?UL]—]C?QGLE]MDD]DMP]LMUk"),_0xlex.d(".?LCJQ]BP?UL]—]R?IGLE]RFC]JMLE]PM?Bk"),_0xlex.d(" JGLBQ]BP?UL]—]ICCNGLE]OSGCR]DMP]?]@GRk"),_0xlex.d(" JGLBQ]BP?UL]—]R?IGLE]RFC]JMLE]F?JJU?Wk"),_0xlex.d("!MTCPGLEQ]BP?UL]—]ICCNGLE]OSGCR]DMP]?]@GRk"),_0xlex.d("!SPR?GLQ]BP?UL]—]EMGLE]RFC]QJMU]U?Wk")]) : _0xlex.P(51,[_0xlex.d(" JGLBQ]MNCL]—]@?AI]RM]LMPK?Jk"),_0xlex.d("1F?BCQ]MNCL]—]PCQSKGLE]?R]N?ACk"),_0xlex.d(".?LCJQ]MNCL]—]@?AI]RM]LMPK?Jk"),_0xlex.d(".?LCJQ]MNCL]—]PCQSKGLE]?R]N?ACk"),_0xlex.d("1F?BCQ]MNCL]—]@?AI]RM]LMPK?Jk"),_0xlex.d("1F?BCQ]MNCL]—]@?AI]ML]RFC]K?GL]PM?Bk"),_0xlex.d("!MTCPGLEQ]MNCL]—]@?AI]RM]LMPK?Jk"),_0xlex.d(" JGLBQ]MNCL]—]@?AI]ML]GRk"),_0xlex.d("!MTCPGLEQ]MNCL]—]PCQSKGLE]?R]N?ACk"),_0xlex.d(".?LCJQ]MNCL]—]@?AI]ML]RFC]K?GL]PM?Bk"),_0xlex.d("!SPR?GLQ]MNCL]—]@?AI]ML]GRk"),_0xlex.d("!SPR?GLQ]MNCL]—]@?AI]?R]DSJJ]QNCCBk"),_0xlex.d(" JGLBQ]MNCL]—]PCQSKGLE]?R]N?ACk"),_0xlex.d("!SPR?GLQ]MNCL]—]PCQSKGLE]?R]N?ACk"),_0xlex.d(" JGLBQ]MNCL]—]@?AI]?R]DSJJ]QNCCBk")]));
        }
        let base = _0xln(d * 1000);
        if (document.hidden) base += Math.random() * 4000 + 2000;
        if (Math.random() < 0.12) base += 1800 + Math.random() * 2200;
        base *= _0xheat;
        
        _0x0a94(base);

        let remaining = base;
        while (remaining > 0 && !signal.aborted) {
          if (_0xpaus) { await _0xdae0(900, signal); continue; }
          const chunk = Math.min(remaining, 5000);
          const start = Date.now();
          try { await _0xdae0(chunk, signal); } catch(e) { if(e.name === 'AbortError') return; throw e; }
          remaining -= (Date.now() - start);
        }
      };

      
      const GoogleDelayRaw = async (ms) => {
        let remaining = Math.max(0, ms);
        while (remaining > 0 && !signal.aborted) {
          const chunk = Math.min(remaining, 5000);
          const start = Date.now();
          try { await _0xdae0(chunk, signal); } catch(e) { if(e.name === 'AbortError') return; throw e; }
          remaining -= (Date.now() - start);
        }
      };

      _0xchord = (e) => {
        if (!(e.altKey && e.shiftKey)) return;
        const key = String(e?.key ?? '').toLowerCase();
        if (key === 'x' && !_0xkill && !_0xarmed) { _0xkill = true; controller.abort(); Log.say(_0xlex.C(6), _0xlex.P(25,[_0xlex.d("5GLBGLE]BMUL]?DRCP]RFGQ]AFMPC]—]N?SQGLE]?R]RFC]AFCAINMGLRk"),_0xlex.d("#LBGLE]RFC]QFGDR]?DRCP]RFGQ]AFMPC]—]ASRRGLE]MSR]?DRCP]RFC]AFCAINMGLRk"),_0xlex.d("5GLBGLE]BMUL]?DRCP]RFGQ]AFMPC]—]QRMNNGLE]?R]RFC]LCVR]AFCAINMGLRk"),_0xlex.d("5GLBGLE]BMUL]?DRCP]RFGQ]AFMPC]—]AFCAIGLE]MSR]?R]RFC]@MSLB?PWk"),_0xlex.d("5GLBGLE]BMUL]?DRCP]RFGQ]AFMPC]—]QRMNNGLE]?R]RFC]AFCAINMGLRk"),_0xlex.d(".?AIGLE]SN]?DRCP]RFGQ]AFMPC]—]QRMNNGLE]?R]RFC]LCVR]AFCAINMGLRk"),_0xlex.d("5P?NNGLE]SN]?DRCP]RFGQ]AFMPC]—]QRMNNGLE]?R]RFC]LCVR]AFCAINMGLRk"),_0xlex.d("5P?NNGLE]SN]?DRCP]RFGQ]AFMPC]—]ASRRGLE]MSR]?DRCP]RFC]AFCAINMGLRk"),_0xlex.d(".?AIGLE]SN]?DRCP]RFGQ]AFMPC]—]QRMNNGLE]?R]RFC]AFCAINMGLRk"),_0xlex.d("!JMQGLE]MSR]?DRCP]RFGQ]AFMPC]—]QRMNNGLE]?R]RFC]AFCAINMGLRk"),_0xlex.d("#LBGLE]RFC]QFGDR]?DRCP]RFGQ]AFMPC]—]N?SQGLE]?R]RFC]AFCAINMGLRk"),_0xlex.d(".?AIGLE]SN]?DRCP]RFGQ]AFMPC]—]AFCAIGLE]MSR]?R]RFC]@MSLB?PWk"),_0xlex.d("5P?NNGLE]SN]?DRCP]RFGQ]AFMPC]—]QRMNNGLE]?R]RFC]AFCAINMGLRk"),_0xlex.d("5P?NNGLE]SN]?DRCP]RFGQ]AFMPC]—]N?SQGLE]?R]RFC]AFCAINMGLRk"),_0xlex.d("!JMQGLE]MSR]?DRCP]RFGQ]AFMPC]—]ASRRGLE]MSR]?DRCP]RFC]AFCAINMGLRk")])); }
        if (key === 'r' && _0xarmed) { Log.say(_0xlex.C(9), _0xlex.P(27,[_0xlex.d("%GTGLE]RFC]PSE]?]QF?IC]—]QCC]WMS]ML]RFC]MRFCP]QGBCk"),_0xlex.d("0MJJGLE]SN]RFC]PSE]—]@?AI]GL]?]KMKCLRk"),_0xlex.d("0MJJGLE]SN]RFC]PSE]—]QCC]WMS]?DRCP]RFC]PCDPCQFk"),_0xlex.d("1F?IGLE]RFGLEQ]MSR]—]QCC]WMS]ML]RFC]DJGN]QGBCk"),_0xlex.d("1F?IGLE]RFGLEQ]MSR]—]@?AI]GL]?]KMKCLRk"),_0xlex.d("1F?IGLE]RFGLEQ]MSR]—]QCC]WMS]?DRCP]RFC]PCDPCQFk"),_0xlex.d("%GTGLE]RFC]PSE]?]QF?IC]—]QCC]WMS]ML]RFC]DJGN]QGBCk"),_0xlex.d("0MJJGLE]SN]RFC]PSE]—]A?RAF]WMS]ML]RFC]PCJM?Bk"),_0xlex.d("1F?IGLE]MSR]RFC]PSE]—]A?RAF]WMS]ML]RFC]PCJM?Bk"),_0xlex.d("1F?IGLE]MSR]RFC]PSE]—]QCC]WMS]ML]RFC]DJGN]QGBCk"),_0xlex.d("1F?IGLE]MSR]RFC]PSE]—]@?AI]GL]?]KMKCLRk"),_0xlex.d("0MJJGLE]SN]RFC]PSE]—]QCC]WMS]ML]RFC]DJGN]QGBCk"),_0xlex.d("%GTGLE]RFC]PSE]?]QF?IC]—]@?AI]GL]?]KMKCLRk"),_0xlex.d("1F?IGLE]MSR]RFC]K?R]—]QCC]WMS]ML]RFC]DJGN]QGBCk"),_0xlex.d("1F?IGLE]MSR]RFC]K?R]—]QCC]WMS]?DRCP]RFC]PCDPCQFk")])); GoogleRelease(); setTimeout(() => location.reload(), 1500); }
      };
      document.addEventListener("keydown", _0xchord, true);
      _0xe8a7(() => document.removeEventListener("keydown", _0xchord, true));

      const GooglePost = _0x9.post.bind(_0x9);
      const GoogleGet = _0x9.get.bind(_0x9);
      const _0xsend = _0x8.dispatch.bind(_0x8);
      const _0xon = _0x8.subscribe.bind(_0x8);
      const _0xoff = _0x8.unsubscribe.bind(_0x8);

      const GoogleCall = (fn, critical = false) => async (opts) => {
        let tries = 0;
        while (tries < 3 && !signal.aborted) {
          try {
            const finalOpts = (opts && typeof opts.url === "string") ? opts : null;
            if (!finalOpts || finalOpts.url === "" || !finalOpts.url.startsWith("/")) {
              Log.warn(`[Google] Request skipped — unusable URL (${opts && opts.url !== null && opts.url !== undefined ? typeof opts.url : "none"}).`);
              return { body: {}, skipped: true };
            }
            const res = await fn(finalOpts);
            if (_0xheat > 1) _0xheat = Math.max(1, _0xheat - 0.1);
            return res;
          } catch (e) {
            const st = e?.status ?? e?.body?.status ?? 0;
            if (st === 401) { if (critical) { _0xkill = true; controller.abort(); Log.say(_0xlex.C(0), _0xlex.P(3,[_0xlex.d("~SRF]QRMNNCB]FMJBGLE]—]N?AIGLE]SNk"),_0xlex.d(")CW]QRMNNCB]DGRRGLE]—]N?AIGLE]SNk"),_0xlex.d("1CQQGML]ICW]RSPLCB]QR?JC]—]UP?NNGLE]RFC]EC?Pk"),_0xlex.d("2FC]ICW]LM]JMLECP]DGRQ]—]N?AIGLE]SNk"),_0xlex.d("1CQQGML]ICW]RSPLCB]QR?JC]—]A?JJGLE]GR]FCPCk"),_0xlex.d("~SRF]QRMNNCB]FMJBGLE]—]CLBGLE]RFC]PSLk"),_0xlex.d("~SRF]QRMNNCB]FMJBGLE]—]UP?NNGLE]RFC]EC?Pk"),_0xlex.d("1CQQGML]ICW]RSPLCB]QR?JC]—]N?AIGLE]SNk"),_0xlex.d("2FC]ICW]LM]JMLECP]DGRQ]—]UP?NNGLE]RFC]EC?Pk"),_0xlex.d("~SRF]QRMNNCB]FMJBGLE]—]QRMNNGLE]AJC?LJWk"),_0xlex.d(")CW]QRMNNCB]DGRRGLE]—]A?JJGLE]GR]FCPCk"),_0xlex.d("2FC]ICW]A?KC]@?AI]PCHCARCB]—]UP?NNGLE]RFC]EC?Pk"),_0xlex.d(")CW]QRMNNCB]DGRRGLE]—]QRMNNGLE]AJC?LJWk"),_0xlex.d("1CQQGML]ICW]RSPLCB]QR?JC]—]DMJBGLE]SN]QFMNk"),_0xlex.d("-SP]ICW]QRMNNCB]SLJMAIGLE]—]UP?NNGLE]RFC]EC?Pk")])); } throw e; }
            if (st === 429) {
              _0xheat = Math.min(4, _0xheat * 1.5);
              const retryAfter = Number(e?.body?.retry_after ?? e?.retry_after ?? 4);
              const s = Number.isFinite(retryAfter) && retryAfter >= 0 ? Math.min(300, Math.ceil(retryAfter) + 1 + Math.random()) : 5 + Math.random() * 2;
              Log.say(_0xlex.C(7), _0xlex.P(30,[`${_0xlex.d("2FC]A?JJ]U?Q]RFPMRRJCB]—]@?AIGLE]MDD]\\")}${Math.ceil(s)}${_0xlex.d("Qi]RFCL]ILMAIGLE]?E?GLk")}`,`${_0xlex.d("-SP]ILMAI]U?Q]RFPMRRJCB]—]PCRPWGLE]GL]\\")}${Math.ceil(s)}${_0xlex.d("Qk")}`,`${_0xlex.d("0COSCQR]A?KC]@?AI]RFPMRRJCB]—]PCRPWGLE]GL]\\")}${Math.ceil(s)}${_0xlex.d("Qk")}`,`${_0xlex.d("2FC]A?JJ]U?Q]RFPMRRJCB]—]RPWGLE]?E?GL]GL]\\")}${Math.ceil(s)}${_0xlex.d("Qk")}`,`${_0xlex.d(")LMAI]A?KC]@?AI]RFPMRRJCB]—]LCVR]?RRCKNR]GL]\\")}${Math.ceil(s)}${_0xlex.d("Qk")}`,`${_0xlex.d("0COSCQR]A?KC]@?AI]RFPMRRJCB]—]@?AIGLE]MDD]\\")}${Math.ceil(s)}${_0xlex.d("Qi]RFCL]ILMAIGLE]?E?GLk")}`,`${_0xlex.d("2FC]A?JJ]U?Q]RFPMRRJCB]—]PCRPWGLE]GL]\\")}${Math.ceil(s)}${_0xlex.d("Qk")}`,`${_0xlex.d("2FC]ILMAI]EMR]RFPMRRJCB]—]@?AIGLE]MDD]\\")}${Math.ceil(s)}${_0xlex.d("Qi]RFCL]ILMAIGLE]?E?GLk")}`,`${_0xlex.d("0COSCQR]A?KC]@?AI]RFPMRRJCB]—]RPWGLE]?E?GL]GL]\\")}${Math.ceil(s)}${_0xlex.d("Qk")}`,`${_0xlex.d(")LMAI]A?KC]@?AI]RFPMRRJCB]—]PCRPWGLE]GL]\\")}${Math.ceil(s)}${_0xlex.d("Qk")}`,`${_0xlex.d("0COSCQR]A?KC]@?AI]RFPMRRJCB]—]ILMAIGLE]?E?GL]GL]\\")}${Math.ceil(s)}${_0xlex.d("Qk")}`,`${_0xlex.d("2FC]A?JJ]U?Q]RFPMRRJCB]—]ILMAIGLE]?E?GL]GL]\\")}${Math.ceil(s)}${_0xlex.d("Qk")}`,`${_0xlex.d("-SP]ILMAI]U?Q]RFPMRRJCB]—]ILMAIGLE]?E?GL]GL]\\")}${Math.ceil(s)}${_0xlex.d("Qk")}`,`${_0xlex.d("-SP]ILMAI]U?Q]RFPMRRJCB]—]RPWGLE]?E?GL]GL]\\")}${Math.ceil(s)}${_0xlex.d("Qk")}`,`${_0xlex.d(")LMAI]A?KC]@?AI]RFPMRRJCB]—]@?AIGLE]MDD]\\")}${Math.ceil(s)}${_0xlex.d("Qi]RFCL]ILMAIGLE]?E?GLk")}`]));
              await GoogleDelayRaw(s * 1000); tries++; continue;
            }
            if (st >= 500 && st < 600) { 
              const backoff = Math.pow(2, tries) * 2 + (Math.random() * 2); 
              Log.say(_0xlex.C(7), _0xlex.P(31,[`${_0xlex.d("1CPTCP]CPPMP]")}${st}${_0xlex.d("]RFCPC]—]@?AIGLE]MDD]DMP]")}${backoff.toFixed(1)}${_0xlex.d("Qk")}`,`${_0xlex.d("1CPTCP]D?SJR]")}${st}${_0xlex.d("]ML]RF?R]ILMAI]—]PCQRGLE]")}${backoff.toFixed(1)}${_0xlex.d("Q]@CDMPC]PCRPWk")}`,`${_0xlex.d("1CPTCP]CPPMP]")}${st}${_0xlex.d("]ML]RF?R]ILMAI]—]N?SQGLE]DMP]")}${backoff.toFixed(1)}${_0xlex.d("Qk")}`,`${_0xlex.d("1CPTCP]D?SJR]")}${st}${_0xlex.d("]ML]RF?R]ILMAI]—]AMMJGLE]MDD]DMP]")}${backoff.toFixed(1)}${_0xlex.d("Qk")}`,`${_0xlex.d("1CPTCP]CPPMP]")}${st}${_0xlex.d("]RFCPC]—]AMMJGLE]MDD]DMP]")}${backoff.toFixed(1)}${_0xlex.d("Qk")}`,`${_0xlex.d("1CPTCP]D?SJR]")}${st}${_0xlex.d("]—]PCQRGLE]")}${backoff.toFixed(1)}${_0xlex.d("Q]@CDMPC]PCRPWk")}`,`${_0xlex.d("1CPTCP]CPPMP]")}${st}${_0xlex.d("]ML]RF?R]ILMAI]—]@?AIGLE]MDD]")}${backoff.toFixed(1)}${_0xlex.d("Qk")}`,`${_0xlex.d("1CPTCP]CPPMP]")}${st}${_0xlex.d("]RFCPC]—]@?AIGLE]MDD]")}${backoff.toFixed(1)}${_0xlex.d("Qk")}`,`${_0xlex.d("1CPTCP]D?SJR]")}${st}${_0xlex.d("]ML]RF?R]ILMAI]—]@?AIGLE]MDD]")}${backoff.toFixed(1)}${_0xlex.d("Qk")}`,`${_0xlex.d("1CPTCP]CPPMP]")}${st}${_0xlex.d("]—]AMMJGLE]MDD]DMP]")}${backoff.toFixed(1)}${_0xlex.d("Qk")}`,`${_0xlex.d("1CPTCP]D?SJR]")}${st}${_0xlex.d("]—]N?SQGLE]DMP]")}${backoff.toFixed(1)}${_0xlex.d("Qk")}`,`${_0xlex.d("1CPTCP]CPPMP]")}${st}${_0xlex.d("]RFCPC]—]PCQRGLE]")}${backoff.toFixed(1)}${_0xlex.d("Q]@CDMPC]PCRPWk")}`,`${_0xlex.d("1CPTCP]CPPMP]")}${st}${_0xlex.d("]ML]RF?R]ILMAI]—]@?AIGLE]MDD]DMP]")}${backoff.toFixed(1)}${_0xlex.d("Qk")}`,`${_0xlex.d("1CPTCP]D?SJR]")}${st}${_0xlex.d("]RFCPC]—]@?AIGLE]MDD]DMP]")}${backoff.toFixed(1)}${_0xlex.d("Qk")}`,`${_0xlex.d("1CPTCP]D?SJR]")}${st}${_0xlex.d("]ML]RF?R]ILMAI]—]@?AIGLE]MDD]DMP]")}${backoff.toFixed(1)}${_0xlex.d("Qk")}`])); 
              await GoogleDelayRaw(backoff * 1000); tries++; continue; 
            }
            throw e;
          }
        }
        throw new Error("Max retries exceeded");
      };
      const GooglePostSafe = GoogleCall(GooglePost, true);
      const GoogleGetSafe = GoogleCall(GoogleGet, false);

      const GoogleHook = (obj, key, fn) => {
        if (!obj || Object.isFrozen(obj) || Object.isSealed(obj)) { Log.say(_0xlex.C(0), _0xlex.P(4,[`${_0xlex.d("2?PECR]")}${key}${_0xlex.d("]PCHCARQ]FMMIQ]—]JC?TGLE]GR]SLRMSAFCBk")}`,`${_0xlex.d("2?PECR]")}${key}${_0xlex.d("]GQ]DPMXCL]—]JC?TGLE]GR]SLRMSAFCBk")}`,`${_0xlex.d("2?PECR]")}${key}${_0xlex.d("]PCHCARQ]FMMIQ]—]QIGNNGLE]RFC]FMMIk")}`,`${_0xlex.d("2?PECR]")}${key}${_0xlex.d("]GQ]PC?BjMLJW]—]QIGNNGLE]RFC]FMMIk")}`,`${_0xlex.d("2?PECR]")}${key}${_0xlex.d("]GQ]PC?BjMLJW]—]JC?TGLE]GR]SLRMSAFCBk")}`,`${_0xlex.d("2?PECR]")}${key}${_0xlex.d("]GQ]PC?BjMLJW]—]FMMI]D?GJCBk")}`,`${_0xlex.d("2?PECR]")}${key}${_0xlex.d("]GQ]GKKSR?@JC]—]A?LLMR]@C]FMMICBk")}`,`${_0xlex.d("2?PECR]")}${key}${_0xlex.d("]GQ]QC?JCB]—]QIGNNGLE]RFC]FMMIk")}`,`${_0xlex.d("2?PECR]")}${key}${_0xlex.d("]GQ]QC?JCB]—]A?LLMR]@C]FMMICBk")}`,`${_0xlex.d("2?PECR]")}${key}${_0xlex.d("]GQ]DPMXCL]—]FMMI]D?GJCBk")}`,`${_0xlex.d("2?PECR]")}${key}${_0xlex.d("]GQ]QC?JCB]—]JC?TGLE]GR]SLRMSAFCBk")}`,`${_0xlex.d("2?PECR]")}${key}${_0xlex.d("]PCHCARQ]FMMIQ]—]FMMI]D?GJCBk")}`,`${_0xlex.d("2?PECR]")}${key}${_0xlex.d("]GQ]DPMXCL]—]A?LLMR]@C]FMMICBk")}`,`${_0xlex.d("2?PECR]")}${key}${_0xlex.d("]GQ]GKKSR?@JC]—]FMMI]D?GJCBk")}`,`${_0xlex.d("2?PECR]")}${key}${_0xlex.d("]GQ]PC?BjMLJW]—]A?LLMR]@C]FMMICBk")}`])); return null; }
        try {
          const own = Object.getOwnPropertyDescriptor(obj, key);
          let cur = Object.getPrototypeOf(obj), d = null;
          while (cur && !d) { d = Object.getOwnPropertyDescriptor(cur, key); cur = d ? cur : Object.getPrototypeOf(cur); }
          const flags = d && !d.get ? { writable: !!d.writable, configurable: !!d.configurable, enumerable: !!d.enumerable } : { writable: false, configurable: true, enumerable: false };
          Object.defineProperty(obj, key, { value: fn, ...flags });
          return () => { try { if (own) Object.defineProperty(obj, key, own); else delete obj[key]; } catch (e) {} };
        } catch (e) { Log.say(_0xlex.C(0), _0xlex.P(5,[`${_0xlex.d("&MMI]KMSLRGLE]DMP]")}${key}${_0xlex.d("]CPPMPCB]")}${e.message}`,`${_0xlex.d("&MMI]QCRSN]DMP]")}${key}${_0xlex.d("]D?GJCB]")}${e.message}`,`${_0xlex.d("1CRRGLE]SN]RFC]FMMI]ML]")}${key}${_0xlex.d("]RFPCU]")}${e.message}`,`${_0xlex.d("!MSJB]LMR]KMSLR]RFC]FMMI]ML]")}${key}${_0xlex.d("]")}${e.message}`,`${_0xlex.d("&MMI]GLQR?JJ?RGML]D?GJCB]DMP]")}${key}${_0xlex.d("]")}${e.message}`,`${_0xlex.d("~RR?AFGLE]FMMIQ]RM]")}${key}${_0xlex.d("]D?GJCB]")}${e.message}`,`${_0xlex.d("+MSLRGLE]?]FMMI]ML]")}${key}${_0xlex.d("]D?GJCB]")}${e.message}`,`${_0xlex.d("2FC]")}${key}${_0xlex.d("]FMMI]PCDSQCB]RM]GLQR?JJ]")}${e.message}`,`${_0xlex.d("&MMI]UGPGLE]CPPMP]ML]")}${key}${_0xlex.d("]")}${e.message}`,`${_0xlex.d("!MSJB]LMR]UGPC]")}${key}${_0xlex.d("]")}${e.message}`,`${_0xlex.d(".?RAFGLE]")}${key}${_0xlex.d("]D?GJCB]")}${e.message}`,`${_0xlex.d("'LQR?JJGLE]RFC]FMMI]ML]")}${key}${_0xlex.d("]CPPMPCB]")}${e.message}`,`${_0xlex.d("&MMI]?RRCKNR]ML]")}${key}${_0xlex.d("]D?GJCB]")}${e.message}`,`${_0xlex.d("&MMI]GLQR?JJ]D?GJCB]ML]")}${key}${_0xlex.d("]")}${e.message}`,`${_0xlex.d("2FC]FMMI]AMSJB]LMR]@C]?RR?AFCB]RM]")}${key}${_0xlex.d("]")}${e.message}`])); return null; }
      };

      const GoogleNative = (fn, nativeStr, nameStr, lenNum) => new Proxy(fn, {
        get(target, prop, receiver) { if (prop === 'toString') return () => nativeStr; if (prop === 'name' && nameStr != null) return nameStr; if (prop === 'length' && lenNum != null) return lenNum; return Reflect.get(target, prop, receiver); },
        getOwnPropertyDescriptor(target, prop) { if (prop === 'toString') return Object.getOwnPropertyDescriptor(Function.prototype, 'toString'); return Reflect.getOwnPropertyDescriptor(target, prop); },
        apply(target, thisArg, args) { return Reflect.apply(target, thisArg, args); },
        has(target, prop) { return prop === 'toString' || Reflect.has(target, prop); },
        deleteProperty() { return false; }, defineProperty() { return false; }
      });

      const GoogleProgress = (data, task, cfgv) => {
        try {
          const candidates = cfgv === 1 ? [data?.userStatus?.streamProgressSeconds, data?.userStatus?.progress?.[task]?.value] : [data?.userStatus?.progress?.[task]?.value, data?.userStatus?.streamProgressSeconds, data?.progress?.[task]?.value];
          const valid = candidates.find(n => { if (n === null || n === undefined || n === "" || typeof n === "boolean") return false; const value = Number(n); return Number.isFinite(value) && value >= 0; });
          return valid === undefined ? null : Number(valid);
        } catch (e) { return null; }
      };

      const _0xbb86 = (body, taskName) => {
        if (!body || typeof body !== 'object') return null;
        if (typeof body.progress === 'number' && Number.isFinite(body.progress) && body.progress >= 0) return body.progress;
        const prog = body.progress?.[taskName] ?? body[taskName];
        if (prog === null || prog === undefined) return null;
        const val = typeof prog === 'object' ? prog.value : prog;
        const num = Number(val);
        return Number.isFinite(num) && num >= 0 ? num : null;
      };

      const _0x8d20 = (str) => String(str || "").replace(/[\/\\:*?"<>|]/g, "");

      const _0xvideo = async (v) => {
        Log.say(_0xlex.C(12), _0xlex.P(32,[`${_0xlex.d("-NCLGLE]RFC]@MMI]RM]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d(" PGLEGLE]MSR]")}${v.name}${_0xlex.d("]DPMK]RFC]QR?AIk")}`,`${_0xlex.d("1R?PRGLE]SN]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d(".SJJGLE]")}${v.name}${_0xlex.d("]MDD]RFC]QFCJDk")}`,`${_0xlex.d("-NCLGLE]")}${v.name}${_0xlex.d("dQ]AF?NRCPk")}`,`${_0xlex.d("1R?PRGLE]")}${v.name}${_0xlex.d("]DPMK]RFC]QFCJDk")}`,`${_0xlex.d("*?SLAFGLE]")}${v.name}${_0xlex.d("]DPMK]RFC]QFCJDk")}`,`${_0xlex.d("2SPLGLE]RM]")}${v.name}${_0xlex.d("]GL]RFC]@MMIk")}`,`${_0xlex.d(".GAIGLE]SN]RFC]@MMI]?R]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d("%CRRGLE]")}${v.name}${_0xlex.d("]EMGLEk")}`,`${_0xlex.d("2?IGLE]BMUL]")}${v.name}${_0xlex.d("]DPMK]RFC]QFCJDk")}`,`${_0xlex.d("$JGNNGLE]RM]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d("-NCLGLE]")}${v.name}${_0xlex.d("]GL]RFC]PC?BCPk")}`,`${_0xlex.d("1CRRJGLE]GL]UGRF]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d("-NCLGLE]RFC]PC?BGLE]@MMI]DMP]")}${v.name}${_0xlex.d("k")}`]));
        let tick = 0, lastTs = 0;
        while (v.cur < v.goal && !_0xkill && !signal.aborted) {
          let _0x1c = Math.min(v.goal - v.cur, 4 + Math.random() * 8);
          await GoogleDelay(_0x1c); if (_0xkill || signal.aborted) break;
          if (Math.random() < 0.06) { Log.say(_0xlex.C(15), _0xlex.P(33,[_0xlex.d("~]OSGAI]QRCCN]—]RFCL]@?AI]RM]GRk"),_0xlex.d(")CRRJCdQ]ML]—]@PGCD]QRCCNk"),_0xlex.d("1RCCNGLE]@PGCDJW]—]ICRRJC]GQ]SNk"),_0xlex.d("2C?NMRdQ]ML]—]OSGAI]QRCCNk"),_0xlex.d(".MRdQ]QGLEGLE]—]@PGCD]N?SQCk"),_0xlex.d(")CRRJCdQ]ML]—]HSQR]?]QRCCNk"),_0xlex.d(")CRRJCdQ]AMKGLE]RM]RFC]@MGJ]—]QFMPR]U?GRk"),_0xlex.d(")CRRJC]ML]—]QRCNNGLE]?U?W]@PGCDJWk"),_0xlex.d(")CRRJC]QGLEGLE]—]OSGAI]N?SQCk"),_0xlex.d(".MRdQ]ML]—]OSGAI]QRCCNk"),_0xlex.d(" PGCD]QRCCN]UFGJC]RFC]NMR]EMCQk"),_0xlex.d("5?RCPdQ]FC?RGLE]—]@PGCD]QRCCNk"),_0xlex.d(".MRdQ]ML]RFC]@MGJ]—]@PGCD]N?SQCk"),_0xlex.d("/SGAI]QRCCN]—]ICRRJCdQ]MLk"),_0xlex.d(")CRRJCdQ]SN]—]QFMPR]N?SQCk")])); await GoogleDelay(18 + Math.random() * 24); if (_0xkill || signal.aborted) break; }
          const lastBeat = v.cur + _0x1c >= v.goal;
          let rawTs = lastBeat ? (v.goal + Math.random() * 1.4) : Math.min(v.goal, v.cur + _0x1c + Math.random());
          let ts = Math.round(Math.max(lastTs + 0.01, rawTs) * 100000) / 100000;
          const _0xmono = ts > lastTs;
          lastTs = ts;
          
          
          Log.diag("Timestamp sample", { tick, monotonic: _0xmono, decimals: String(ts).split(".")[1]?.length ?? 0 });
          
          if (tick === 0) Log.say(_0xlex.C(16), _0xlex.P(34,[`${_0xlex.d("2MAI]J?LBGLE]UFMJCw]")}${Number.isInteger(ts)}${_0xlex.d("]—]EP?GL]`")}${ts}`,`${_0xlex.d("1?LBQ]J?LBGLE]UFMJCw]")}${Number.isInteger(ts)}${_0xlex.d("]—]Q?LB]`")}${ts}`,`${_0xlex.d("1?LBQ]J?LBGLE]UFMJCw]")}${Number.isInteger(ts)}${_0xlex.d("]—]RMAI]`")}${ts}`,`${_0xlex.d("2MAI]J?LBGLE]UFMJCw]")}${Number.isInteger(ts)}${_0xlex.d("]—]Q?LB]`")}${ts}`,`${_0xlex.d("2MAI]J?LBGLE]UFMJCw]")}${Number.isInteger(ts)}${_0xlex.d("]—]RGAI]`")}${ts}`,`${_0xlex.d("1?LBQ]J?LBGLE]UFMJCw]")}${Number.isInteger(ts)}${_0xlex.d("]—]EP?GL]`")}${ts}`,`${_0xlex.d("%P?GLQ]J?LBGLE]UFMJCw]")}${Number.isInteger(ts)}${_0xlex.d("]—]RMAI]`")}${ts}`,`${_0xlex.d("1?LBQ]J?LBGLE]UFMJCw]")}${Number.isInteger(ts)}${_0xlex.d("]—]NC@@JC]`")}${ts}`,`${_0xlex.d("1CAMLBQ]J?LBGLE]UFMJCw]")}${Number.isInteger(ts)}${_0xlex.d("]—]Q?LB]`")}${ts}`,`${_0xlex.d(".C@@JCQ]J?LBGLE]UFMJCw]")}${Number.isInteger(ts)}${_0xlex.d("]—]Q?LB]`")}${ts}`,`${_0xlex.d("2MAI]J?LBGLE]UFMJCw]")}${Number.isInteger(ts)}${_0xlex.d("]—]NC@@JC]`")}${ts}`,`${_0xlex.d(".C@@JCQ]J?LBGLE]UFMJCw]")}${Number.isInteger(ts)}${_0xlex.d("]—]RMAI]`")}${ts}`,`${_0xlex.d("%P?GLQ]J?LBGLE]UFMJCw]")}${Number.isInteger(ts)}${_0xlex.d("]—]Q?LB]`")}${ts}`,`${_0xlex.d("%P?GLQ]J?LBGLE]UFMJCw]")}${Number.isInteger(ts)}${_0xlex.d("]—]EP?GL]`")}${ts}`,`${_0xlex.d(".C@@JCQ]J?LBGLE]UFMJCw]")}${Number.isInteger(ts)}${_0xlex.d("]—]RGAI]`")}${ts}`]));
          let _0x1d = await GooglePostSafe({ url: GoogleRoutes.videoProgress(v.q.id), body: { timestamp: ts } });
          const reported = _0xbb86(_0x1d?.body, v.taskType);
          if (reported !== null) v.cur = reported; else v.cur = Math.min(v.goal, v.cur + _0x1c);
          if (++tick % 3 === 1 || v.cur >= v.goal) Log.say(_0xlex.C(4), _0xlex.P(35,[`${_0xlex.d("0SLLGLE]R?JJWw]")}${v.cur.toFixed(2)}${_0xlex.d("l")}${v.goal}${_0xlex.d("k")}`,`${_0xlex.d("0?LBMK]DP?ARGMLw]")}${v.cur.toFixed(2)}${_0xlex.d("l")}${v.goal}${_0xlex.d("k")}`,`${_0xlex.d(".PMEPCQQ]JGLCw]")}${v.cur.toFixed(2)}${_0xlex.d("l")}${v.goal}${_0xlex.d("]JMEECBk")}`,`${_0xlex.d("0SLLGLE]R?JJWw]")}${v.cur.toFixed(2)}${_0xlex.d("l")}${v.goal}${_0xlex.d("]RM]B?RCk")}`,`${_0xlex.d("0?LBMK]DP?ARGMLw]")}${v.cur.toFixed(2)}${_0xlex.d("l")}${v.goal}${_0xlex.d("]GL]RFC]@MMIQk")}`,`${_0xlex.d("0?LBMK]DP?ARGMLw]")}${v.cur.toFixed(2)}${_0xlex.d("l")}${v.goal}`,`${_0xlex.d("0SLLGLE]R?JJWw]")}${v.cur.toFixed(2)}${_0xlex.d("l")}${v.goal}${_0xlex.d("]GL]RFC]@MMIQk")}`,`${_0xlex.d("!SPPCLR]@C?Rw]")}${v.cur.toFixed(2)}${_0xlex.d("l")}${v.goal}${_0xlex.d("k")}`,`${_0xlex.d("!SPPCLR]@C?Rw]")}${v.cur.toFixed(2)}${_0xlex.d("l")}${v.goal}`,`${_0xlex.d(",MU]PC?BGLEw]")}${v.cur.toFixed(2)}${_0xlex.d("l")}${v.goal}${_0xlex.d("]QM]D?Pk")}`,`${_0xlex.d("0?LBMK]DP?ARGMLw]")}${v.cur.toFixed(2)}${_0xlex.d("l")}${v.goal}${_0xlex.d("]QM]D?Pk")}`,`${_0xlex.d("0SLLGLE]R?JJWw]")}${v.cur.toFixed(2)}${_0xlex.d("l")}${v.goal}${_0xlex.d("]JMEECBk")}`,`${_0xlex.d(".PMEPCQQ]JGLCw]")}${v.cur.toFixed(2)}${_0xlex.d("l")}${v.goal}${_0xlex.d("k")}`,`${_0xlex.d("!SPPCLR]@C?Rw]")}${v.cur.toFixed(2)}${_0xlex.d("l")}${v.goal}${_0xlex.d("]JMEECBk")}`,`${_0xlex.d("!SPPCLR]@C?Rw]")}${v.cur.toFixed(2)}${_0xlex.d("l")}${v.goal}${_0xlex.d("]RM]B?RCk")}`]));
          if (_0x1d?.body?.completed_at) break;
        }
        if (v.cur >= v.goal) Log.say(_0xlex.C(3), _0xlex.P(39,[`${_0xlex.d("0MSLBCB]MSRw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d("5P?NNCB]SNw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d(" MVCB]SNw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d(")LMAICB]MSRw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d(".SR]RM]@CBw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d("\"CJGTCPCBw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d("&?LBCB]MDDw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d("1CRRJCBw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d("!FCAICB]MDDw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d("!MKNJCRCBw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d("!?QFCB]MSRw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d("!JMQCB]MSRw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d("!JC?PCBw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d("!MLAJSBCBw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d("1C?JCBw]")}${v.name}${_0xlex.d("k")}`]));
      };

      const _0xplay = async (v) => {
        const taskId = Symbol(); _0x8844.add(taskId);
        let taskFinished = false; 
        const finishTask = () => { if (!taskFinished) { taskFinished = true; _0x8844.delete(taskId); } };
        
        return new Promise((resolve, reject) => {
          (async () => {
            let handedOff = false;
            try {
              if (!_0xc) { Log.say(_0xlex.C(0), _0xlex.P(6,[`${_0xlex.d("2F?R]AFMPC]e")}${v.name}${_0xlex.d("f]LCCBQ]RFC]K?GL]F?JJ]—]QIGNNGLE]GR]DMP]LMUk")}`,`${_0xlex.d("2F?R]AFMPC]e")}${v.name}${_0xlex.d("f]LCCBQ]?]@GEECP]PGE]—]QIGNNGLE]GR]DMP]LMUk")}`,`${_0xlex.d("2F?R]AFMPC]e")}${v.name}${_0xlex.d("f]LCCBQ]RFC]K?GL]F?JJ]—]JC?TGLE]GR]DMP]?]@GEECP]QCQQGMLk")}`,`${_0xlex.d("!FMPC]")}${v.name}${_0xlex.d("]LCCBQ]RFC]FC?TW]@CLAF]—]QIGNNGLE]GR]DMP]LMUk")}`,`${_0xlex.d("2F?R]AFMPC]e")}${v.name}${_0xlex.d("f]LCCBQ]RFC]K?GL]F?JJ]—]KMTGLE]N?QR]GRk")}`,`${_0xlex.d("!FMPC]")}${v.name}${_0xlex.d("]LCCBQ]RFC]FC?TW]@CLAF]—]LMR]R?IGLE]GR]RFGQ]QFGDRk")}`,`${_0xlex.d("2FGQ]R?QI]e")}${v.name}${_0xlex.d("f]LCCBQ]RFC]DSJJ]UMPIQFMN]—]KMTGLE]N?QR]GRk")}`,`${_0xlex.d("2F?R]AFMPC]e")}${v.name}${_0xlex.d("f]LCCBQ]?]@GEECP]PGE]—]KMTGLE]N?QR]GRk")}`,`${_0xlex.d("2F?R]AFMPC]e")}${v.name}${_0xlex.d("f]LCCBQ]RFC]@GE]UMPIQFMN]—]QIGNNGLEk")}`,`${_0xlex.d("2FGQ]R?QI]e")}${v.name}${_0xlex.d("f]LCCBQ]RFC]DSJJ]UMPIQFMN]—]QIGNNGLEk")}`,`${_0xlex.d("2F?R]AFMPC]e")}${v.name}${_0xlex.d("f]LCCBQ]?]@GEECP]PGE]—]LMR]R?IGLE]GR]RFGQ]QFGDRk")}`,`${_0xlex.d("2FGQ]R?QI]e")}${v.name}${_0xlex.d("f]LCCBQ]RFC]DSJJ]UMPIQFMN]—]QIGNNGLE]GR]DMP]LMUk")}`,`${_0xlex.d("!FMPC]")}${v.name}${_0xlex.d("]LCCBQ]RFC]FC?TW]@CLAF]—]JC?TGLE]GR]DMP]?]@GEECP]QCQQGMLk")}`,`${_0xlex.d("2F?R]AFMPC]e")}${v.name}${_0xlex.d("f]LCCBQ]RFC]K?GL]F?JJ]—]LMR]R?IGLE]GR]RFGQ]QFGDRk")}`,`${_0xlex.d("!FMPC]")}${v.name}${_0xlex.d("]LCCBQ]RFC]FC?TW]@CLAF]—]KMTGLE]N?QR]GRk")}`])); resolve(); return; }
              let _0x1e = await GoogleGetSafe({ url: GoogleRoutes.applicationsUrl(v.app) });
              if (signal.aborted || _0xrunOwner.released) { resolve(); return; }
              let _0x1f = _0x1e?.body?.[0]; if (!_0x1f) { Log.say(_0xlex.C(0), _0xlex.P(7,[_0xlex.d("2FC]LMRC]DMP]RFC]AFMPC]A?KC]@?AI]CKNRW]—]QIGNNGLEk"),_0xlex.d("!FMPC]LMRC]A?KC]@?AI]@J?LI]—]KMTGLE]MLk"),_0xlex.d("2FC]AFMPC]PCRSPLCB]?]@J?LI]LMRC]—]LMR]QR?PRGLE]GRk"),_0xlex.d("2FC]AFMPC]PCRSPLCB]?]@J?LI]LMRC]—]JC?TGLE]GR]@Ck"),_0xlex.d("!FMPC]LMRC]A?KC]@?AI]@J?LI]—]JC?TGLE]GR]@Ck"),_0xlex.d("2FC]LMRC]DMP]RFC]AFMPC]A?KC]@?AI]CKNRW]—]LMR]QR?PRGLE]GRk"),_0xlex.d("2FC]AFMPC]LMRC]U?Q]@J?LI]—]QIGNNGLEk"),_0xlex.d("!FMPC]LMRC]A?KC]@?AI]@J?LI]—]QIGNNGLE]RFGQ]MLCk"),_0xlex.d("2FC]AFMPC]PCRSPLCB]?]@J?LI]LMRC]—]KMTGLE]MLk"),_0xlex.d(",MRC]DMP]RFC]AFMPC]U?Q]CKNRW]—]LMR]QR?PRGLE]GRk"),_0xlex.d("2FC]AFMPC]LMRC]U?Q]@J?LI]—]JC?TGLE]GR]@Ck"),_0xlex.d(",MRC]DMP]RFC]AFMPC]U?Q]CKNRW]—]KMTGLE]MLk"),_0xlex.d("2FC]LMRC]DMP]RFC]AFMPC]A?KC]@?AI]CKNRW]—]JC?TGLE]GR]@Ck"),_0xlex.d(",MRC]DMP]RFC]AFMPC]U?Q]CKNRW]—]JC?TGLE]GR]@Ck"),_0xlex.d("2FC]AFMPC]PCRSPLCB]?]@J?LI]LMRC]—]QIGNNGLEk")])); resolve(); return; }
              let _0x20 = _0x1f.executables?.find(x => x && GoogleOS.includes(x.os))?.name?.replace(">", "") ?? _0x1f.name;
              let running = []; try { const currentGames = _0x4?.[_0xm1]?.(); running = Array.isArray(currentGames) ? currentGames : []; } catch (e) { running = []; }
              let _0x1bReal = (running.length > 0 && Number.isFinite(running[0]?.pid)) ? running[0].pid : Math.floor(Math.random() * 60000) + 4096;
              Log.say(_0xlex.C(5), _0xlex.P(41,[`${_0xlex.d("$JMMP]N?RRCPLQ]JGLC]SN]GL]DMSPQw]")}${_0x1bReal % 4 === 0}${_0xlex.d("]—]N?LC]`")}${_0x1bReal}`,`${_0xlex.d("$JMMP]RGJCQ]JGLC]SN]GL]DMSPQw]")}${_0x1bReal % 4 === 0}${_0xlex.d("]—]QOS?PC]`")}${_0x1bReal}`,`${_0xlex.d("2FC]RGJCB]DJMMP]JGLCQ]SN]GL]DMSPQw]")}${_0x1bReal % 4 === 0}${_0xlex.d("]—]@JMAI]`")}${_0x1bReal}`,`${_0xlex.d("$JMMP]N?RRCPLQ]JGLC]SN]GL]DMSPQw]")}${_0x1bReal % 4 === 0}${_0xlex.d("]—]QRMLC]`")}${_0x1bReal}`,`${_0xlex.d("2FC]RGJCB]DJMMP]JGLCQ]SN]GL]DMSPQw]")}${_0x1bReal % 4 === 0}${_0xlex.d("]—]N?LC]`")}${_0x1bReal}`,`${_0xlex.d("$JMMP]RGJCQ]JGLC]SN]GL]DMSPQw]")}${_0x1bReal % 4 === 0}${_0xlex.d("]—]@JMAI]`")}${_0x1bReal}`,`${_0xlex.d("$JMMP]RGJCQ]JGLC]SN]GL]DMSPQw]")}${_0x1bReal % 4 === 0}${_0xlex.d("]—]QJ?@]`")}${_0x1bReal}`,`${_0xlex.d("2FC]RGJCB]DJMMP]JGLCQ]SN]GL]DMSPQw]")}${_0x1bReal % 4 === 0}${_0xlex.d("]—]QOS?PC]`")}${_0x1bReal}`,`${_0xlex.d("2FC]DJMMP]EPGB]JGLCQ]SN]GL]DMSPQw]")}${_0x1bReal % 4 === 0}${_0xlex.d("]—]QRMLC]`")}${_0x1bReal}`,`${_0xlex.d("$JMMP]AFCAIQ]JGLC]SN]GL]DMSPQw]")}${_0x1bReal % 4 === 0}${_0xlex.d("]—]QRMLC]`")}${_0x1bReal}`,`${_0xlex.d("$JMMP]AFCAIQ]JGLC]SN]GL]DMSPQw]")}${_0x1bReal % 4 === 0}${_0xlex.d("]—]N?LC]`")}${_0x1bReal}`,`${_0xlex.d("$JMMP]N?RRCPLQ]JGLC]SN]GL]DMSPQw]")}${_0x1bReal % 4 === 0}${_0xlex.d("]—]QJ?@]`")}${_0x1bReal}`,`${_0xlex.d("$JMMP]RGJCQ]JGLC]SN]GL]DMSPQw]")}${_0x1bReal % 4 === 0}${_0xlex.d("]—]N?LC]`")}${_0x1bReal}`,`${_0xlex.d("2FC]DJMMP]EPGB]JGLCQ]SN]GL]DMSPQw]")}${_0x1bReal % 4 === 0}${_0xlex.d("]—]RGJC]`")}${_0x1bReal}`,`${_0xlex.d("$JMMP]RGJCQ]JGLC]SN]GL]DMSPQw]")}${_0x1bReal % 4 === 0}${_0xlex.d("]—]QRMLC]`")}${_0x1bReal}`]));
              const safeName = _0x8d20(_0x1f.name); const safeExe = _0x8d20(_0x20);
              let cmdLine, exePath;
              if (_0xisMac) { cmdLine = `/Applications/${safeName}.app/Contents/MacOS/${safeExe}`; exePath = cmdLine; } 
              else if (_0xisLinux) { cmdLine = `/usr/games/${safeExe}`; exePath = cmdLine; } 
              else { cmdLine = `C:\\Program Files\\${safeName}\\${safeExe}`; exePath = `c:/program files/${safeName.toLowerCase()}/${safeExe.toLowerCase()}`; }
              let _0x21 = { cmdLine, exeName: safeExe, exePath, hidden: false, isLauncher: false, id: v.app, name: safeName, pid: _0x1bReal, pidPath: [_0x1bReal], processName: safeName, start: Date.now() - (120000 + Math.floor(Math.random() * 300000)) };
              Log.say(_0xlex.C(17), _0xlex.P(43,[_0xlex.d("2FC]ASRJCPW]BP?UCP]U?Q]PCjQMPRCBw]"),_0xlex.d("1GJTCPU?PC]GL]RFC]BP?UCP]U?Q]PCMPBCPCBw]"),_0xlex.d("2FC]BP?UCP]AMLRCLRQ]UCPC]PCjQMPRCBw]"),_0xlex.d("2FC]BP?UCP]U?Q]EGTCL]?]LCU]MPBCPw]"),_0xlex.d("\"P?UCP]QJMRQ]UCPC]PCQFSDDJCBw]"),_0xlex.d("\"P?UCP]MPBCP]U?Q]PCBP?ULw]"),_0xlex.d("\"P?UCP]?PP?LECKCLR]U?Q]PCDPCQFCBw]"),_0xlex.d("2FC]BP?UCP]U?Q]PCQFSDDJCBw]"),_0xlex.d("2FC]BP?UCP]EMR]?]PCQFSDDJCw]"),_0xlex.d("\"P?UCP]GRCKQ]UCPC]PC?PP?LECBw]"),_0xlex.d("2FC]DJ?RU?PC]BP?UCP]U?Q]PCQFSDDJCBw]"),_0xlex.d("\"P?UCP]AMLRCLRQ]UCPC]PCMPBCPCBw]"),_0xlex.d("2FC]BP?UCP]J?WMSR]AF?LECBw]"),_0xlex.d("2FC]BP?UCP]EMR]PCjQMPRCBw]"),_0xlex.d("2FC]BP?UCP]U?Q]KGVCB]SN]?E?GLw]")]) + Object.keys(_0x21).join(", "));
              let _0x23 = [_0x21]; let undo1 = null, undo2 = null;
              try {
                undo1 = GoogleHook(_0x4, _0xm1, GoogleNative(() => _0x23, "function getRunningGames() { [native code] }", _0xm1, 0));
                undo2 = GoogleHook(_0x4, _0xm2, GoogleNative(p => _0x23.find(x => x.pid === p), "function getGameForPID() { [native code] }", _0xm2, 1));
                if (!undo1 || !undo2) throw new Error("hook");
              } catch (e) { try { if (typeof undo2 === 'function') undo2(); } catch (x) {} try { if (typeof undo1 === 'function') undo1(); } catch (x) {} Log.say(_0xlex.C(0), _0xlex.P(8,[_0xlex.d("2FC]BCQIRMN]BMMPU?W]UMSJB]LMR]MNCL]—]JC?TGLE]GR]DMP]J?RCPk"),_0xlex.d("2FC]BCQIRMN]BMMPU?W]AMSJB]LMR]@C]NPCN?PCB]—]QIGNNGLEk"),_0xlex.d("2FC]BCQIRMN]PMSRC]AMSJB]LMR]@C]?PKCB]—]JC?TGLE]GR]DMP]J?RCPk"),_0xlex.d("2FC]BCQIRMN]BMMPU?W]D?GJCB]RM]AMKC]SN]—]QIGNNGLE]RFGQ]MLCk"),_0xlex.d("2FC]BCQIRMN]BMMPU?W]PCDSQCB]RM]@C]QCR]SN]—]JC?TGLE]GR]DMP]J?RCPk"),_0xlex.d("2FC]BCQIRMN]CLRPW]AMSJB]LMR]@C]MNCLCB]—]KMTGLE]MLk"),_0xlex.d("2FC]BCQIRMN]PMSRC]AMSJB]LMR]@C]?PKCB]—]KMTGLE]MLk"),_0xlex.d("2FC]BCQIRMN]BMMPU?W]PCDSQCB]RM]@C]QCR]SN]—]LMR]R?IGLE]GR]RFGQ]QFGDRk"),_0xlex.d("2FC]BCQIRMN]PMSRC]AMSJB]LMR]@C]?PKCB]—]QIGNNGLE]RFGQ]MLCk"),_0xlex.d("2FC]BCQIRMN]CLRPW]AMSJB]LMR]@C]MNCLCB]—]JC?TGLE]GR]DMP]J?RCPk"),_0xlex.d("2FC]BCQIRMN]BMMPU?W]PCDSQCB]RM]@C]QCR]SN]—]QIGNNGLEk"),_0xlex.d("2FC]BCQIRMN]BMMPU?W]UMSJB]LMR]MNCL]—]KMTGLE]MLk"),_0xlex.d("2FC]BCQIRMN]BMMPU?W]AMSJB]LMR]@C]NPCN?PCB]—]JC?TGLE]GR]DMP]J?RCPk"),_0xlex.d("2FC]BCQIRMN]BMMPU?W]D?GJCB]RM]AMKC]SN]—]LMR]R?IGLE]GR]RFGQ]QFGDRk"),_0xlex.d("2FC]BCQIRMN]BMMPU?W]UMSJB]LMR]MNCL]—]LMR]R?IGLE]GR]RFGQ]QFGDRk")])); resolve(); return; }
              
              let cleanupCalled = false, removeSelf = null, watchdog = null, GoogleDesktopHandler = null;
              const cleanup = () => { 
                if (cleanupCalled) return; 
                cleanupCalled = true; 
                
                finishTask();
                Log.diag("Desktop task cleanup", { state: "cleaned", activeTaskCount: _0x8844.size }); 
                if (removeSelf) removeSelf(); 
                try { undo1?.(); undo2?.(); } catch (e) {} 
                try { _0xsend({ type: _0xe0, removed: [_0x21], added: [], games: [] }); } catch (e) {} 
                if (GoogleDesktopHandler) { try { _0xoff(_0xe1, GoogleDesktopHandler); } catch (e) {} } 
                if (watchdog !== null) { clearTimeout(watchdog); watchdog = null; } 
                resolve(); 
              };
              removeSelf = _0xe8a7(cleanup);
              
              try { _0xsend({ type: _0xe0, removed: running, added: [_0x21], games: _0x23 }); } catch (e) { cleanup(); Log.say(_0xlex.C(0), _0xlex.P(9,[_0xlex.d("'LGRG?J]QR?RC]BGQN?RAF]D?GJCB]—]QIGNNGLE]RFGQ]MLCk"),_0xlex.d("2FC]GLGRG?J]BGQN?RAF]UCLR]UPMLE]—]QIGNNGLE]RFGQ]MLCk"),_0xlex.d("2FC]GLGRG?J]QR?RC]AMSJB]LMR]@C]BGQN?RAFCB]—]KMTGLE]MLk"),_0xlex.d("1CLBGLE]RFC]GLGRG?J]QR?RC]D?GJCB]—]JC?TGLE]GR]@Ck"),_0xlex.d("2FC]GLGRG?J]BGQN?RAF]UCLR]UPMLE]—]KMTGLE]MLk"),_0xlex.d("2FC]GLGRG?J]BGQN?RAF]UCLR]UPMLE]—]LMR]QR?PRGLE]GRk"),_0xlex.d("$GPQR]QR?RC]NSQF]D?GJCB]—]LMR]QR?PRGLE]GRk"),_0xlex.d("'LGRG?J]QR?RC]BGQN?RAF]D?GJCB]—]JC?TGLE]GR]@Ck"),_0xlex.d("2FC]GLGRG?J]BGQN?RAF]UCLR]UPMLE]—]JC?TGLE]GR]@Ck"),_0xlex.d("1CLBGLE]RFC]GLGRG?J]QR?RC]D?GJCB]—]KMTGLE]MLk"),_0xlex.d("$GPQR]QR?RC]NSQF]D?GJCB]—]JC?TGLE]GR]@Ck"),_0xlex.d("2FC]GLGRG?J]QR?RC]AMSJB]LMR]@C]BGQN?RAFCB]—]QIGNNGLE]RFGQ]MLCk"),_0xlex.d("1CLBGLE]RFC]GLGRG?J]QR?RC]D?GJCB]—]QIGNNGLEk"),_0xlex.d("'LGRG?J]QR?RC]BGQN?RAF]D?GJCB]—]LMR]QR?PRGLE]GRk"),_0xlex.d("2FC]GLGRG?J]QR?RC]AMSJB]LMR]@C]BGQN?RAFCB]—]QIGNNGLEk")])); resolve(); return; }
              if (cleanupCalled || signal.aborted || _0xrunOwner.released) { resolve(); return; }
              
              let stick = 0;
              GoogleDesktopHandler = data => { if (_0xpaus || _0xkill || signal.aborted || cleanupCalled) return; let _0x26 = GoogleProgress(data, GoogleTasks.play, v.cfgv); if (_0x26 === null) return; if (++stick % 3 === 1 || _0x26 >= v.goal) Log.say(_0xlex.C(4), _0xlex.P(36,[`${_0xlex.d("!SPPCLR]@C?Rw]")}${_0x26}${_0xlex.d("l")}${v.goal}`,`${_0xlex.d("0SLLGLE]R?JJWw]")}${_0x26}${_0xlex.d("l")}${v.goal}${_0xlex.d("k")}`,`${_0xlex.d("0?LBMK]DP?ARGMLw]")}${_0x26}${_0xlex.d("l")}${v.goal}${_0xlex.d("k")}`,`${_0xlex.d(",MU]PC?BGLEw]")}${_0x26}${_0xlex.d("l")}${v.goal}${_0xlex.d("]GL]RFC]@MMIQk")}`,`${_0xlex.d(",MU]PC?BGLEw]")}${_0x26}${_0xlex.d("l")}${v.goal}`,`${_0xlex.d("0SLLGLE]R?JJWw]")}${_0x26}${_0xlex.d("l")}${v.goal}${_0xlex.d("]JMEECBk")}`,`${_0xlex.d("0SLLGLE]R?JJWw]")}${_0x26}${_0xlex.d("l")}${v.goal}${_0xlex.d("]RM]B?RCk")}`,`${_0xlex.d("0?LBMK]DP?ARGMLw]")}${_0x26}${_0xlex.d("l")}${v.goal}${_0xlex.d("]RM]B?RCk")}`,`${_0xlex.d(",MU]PC?BGLEw]")}${_0x26}${_0xlex.d("l")}${v.goal}${_0xlex.d("]JMEECBk")}`,`${_0xlex.d("0?LBMK]DP?ARGMLw]")}${_0x26}${_0xlex.d("l")}${v.goal}${_0xlex.d("]GL]RFC]@MMIQk")}`,`${_0xlex.d("!SPPCLR]@C?Rw]")}${_0x26}${_0xlex.d("l")}${v.goal}${_0xlex.d("]QM]D?Pk")}`,`${_0xlex.d(".PMEPCQQ]JGLCw]")}${_0x26}${_0xlex.d("l")}${v.goal}${_0xlex.d("k")}`,`${_0xlex.d("0SLLGLE]R?JJWw]")}${_0x26}${_0xlex.d("l")}${v.goal}${_0xlex.d("]GL]RFC]@MMIQk")}`,`${_0xlex.d("!SPPCLR]@C?Rw]")}${_0x26}${_0xlex.d("l")}${v.goal}${_0xlex.d("]RM]B?RCk")}`,`${_0xlex.d("!SPPCLR]@C?Rw]")}${_0x26}${_0xlex.d("l")}${v.goal}${_0xlex.d("]JMEECBk")}`])); if (_0x26 >= v.goal) Log.say(_0xlex.C(3), _0xlex.P(39,[`${_0xlex.d("0MSLBCB]MSRw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d("5P?NNCB]SNw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d(" MVCB]SNw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d(")LMAICB]MSRw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d(".SR]RM]@CBw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d("\"CJGTCPCBw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d("&?LBCB]MDDw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d("1CRRJCBw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d("!FCAICB]MDDw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d("!MKNJCRCBw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d("!?QFCB]MSRw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d("!JMQCB]MSRw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d("!JC?PCBw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d("!MLAJSBCBw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d("1C?JCBw]")}${v.name}${_0xlex.d("k")}`])); if (_0x26 >= v.goal || _0xkill) cleanup(); };
              watchdog = setTimeout(() => cleanup(), Math.max(10 * 60 * 1000, (v.goal - v.cur) * 120000));
              
              try { _0xon(_0xe1, GoogleDesktopHandler); } catch (e) { cleanup(); Log.say(_0xlex.C(0), _0xlex.P(10,[_0xlex.d("\"CQIRMN]NPMEPCQQ]QS@QAPGNRGML]D?GJCB]—]QIGNNGLE]RFGQ]MLCk"),_0xlex.d("\"CQIRMN]NPMEPCQQ]SNB?RCQ]AMSJB]LMR]@C]QS@QAPG@CB]—]LMR]QR?PRGLE]GRk"),_0xlex.d("1S@QAPG@GLE]RM]BCQIRMN]NPMEPCQQ]D?GJCB]—]QIGNNGLE]RFGQ]MLCk"),_0xlex.d("2FC]BCQIRMN]DCCB]QS@QAPGNRGML]D?GJCB]—]JC?TGLE]GR]@Ck"),_0xlex.d("1S@QAPG@GLE]RM]BCQIRMN]NPMEPCQQ]D?GJCB]—]JC?TGLE]GR]@Ck"),_0xlex.d("1S@QAPG@GLE]RM]BCQIRMN]NPMEPCQQ]D?GJCB]—]QIGNNGLEk"),_0xlex.d("2FC]BCQIRMN]NPMEPCQQ]DCCB]UMSJB]LMR]QS@QAPG@C]—]KMTGLE]MLk"),_0xlex.d("2FC]BCQIRMN]NPMEPCQQ]DCCB]UMSJB]LMR]QS@QAPG@C]—]QIGNNGLE]RFGQ]MLCk"),_0xlex.d("2FC]BCQIRMN]NPMEPCQQ]DCCB]UMSJB]LMR]QS@QAPG@C]—]LMR]QR?PRGLE]GRk"),_0xlex.d("\"CQIRMN]NPMEPCQQ]SNB?RCQ]AMSJB]LMR]@C]QS@QAPG@CB]—]QIGNNGLE]RFGQ]MLCk"),_0xlex.d("2FC]BCQIRMN]DCCB]QS@QAPGNRGML]D?GJCB]—]KMTGLE]MLk"),_0xlex.d("\"CQIRMN]NPMEPCQQ]SNB?RCQ]AMSJB]LMR]@C]QS@QAPG@CB]—]JC?TGLE]GR]@Ck"),_0xlex.d("2FC]BCQIRMN]DCCB]QS@QAPGNRGML]D?GJCB]—]QIGNNGLE]RFGQ]MLCk"),_0xlex.d("2FC]BCQIRMN]DCCB]QS@QAPGNRGML]D?GJCB]—]LMR]QR?PRGLE]GRk"),_0xlex.d("2FC]BCQIRMN]DCCB]QS@QAPGNRGML]D?GJCB]—]QIGNNGLEk")])); resolve(); return; }
              
              
              Log.diag("Desktop task handoff", { state: "subscribed", activeTaskCount: _0x8844.size });
              handedOff = true; 
              Log.say(_0xlex.C(10), _0xlex.P(44,[`${_0xlex.d(",MRCQ]DMP]")}${safeName}${_0xlex.d("]—]BMSEFdQ]EMR]\\")}${Math.ceil((v.goal - v.cur) / 60)}${_0xlex.d("]RM]EMk")}`,`${_0xlex.d("!FCAIGLE]ML]")}${safeName}${_0xlex.d("]—]@PC?B]LCCBQ]\\")}${Math.ceil((v.goal - v.cur) / 60)}${_0xlex.d("]KMPC]KGLSRCQk")}`,`${_0xlex.d(",MRCQ]DMP]")}${safeName}${_0xlex.d("]—]\\")}${Math.ceil((v.goal - v.cur) / 60)}${_0xlex.d("]KGLSRCQ]JCDR]ML]RFC]BMSEFk")}`,`${_0xlex.d("!FCAIGLE]ML]")}${safeName}${_0xlex.d("]—]BMSEFdQ]EMR]\\")}${Math.ceil((v.goal - v.cur) / 60)}${_0xlex.d("]RM]EMk")}`,`${_0xlex.d("+SJJGLE]MTCP]LMRCQ]DMP]")}${safeName}${_0xlex.d("]—]BMSEFdQ]EMR]\\")}${Math.ceil((v.goal - v.cur) / 60)}${_0xlex.d("]RM]EMk")}`,`${_0xlex.d(".CCIGLE]?R]")}${safeName}${_0xlex.d("]—]BMSEF]LCCBQ]\\")}${Math.ceil((v.goal - v.cur) / 60)}${_0xlex.d("]KMPC]KGLSRCQk")}`,`${_0xlex.d("5?RAFGLE]RFC]MTCL]DMP]")}${safeName}${_0xlex.d("]—]BMSEF]LCCBQ]\\")}${Math.ceil((v.goal - v.cur) / 60)}${_0xlex.d("]KMPC]KGLSRCQk")}`,`${_0xlex.d("+SJJGLE]MTCP]LMRCQ]DMP]")}${safeName}${_0xlex.d("]—]@PC?B]LCCBQ]\\")}${Math.ceil((v.goal - v.cur) / 60)}${_0xlex.d("]KMPC]KGLSRCQk")}`,`${_0xlex.d(".CCIGLE]?R]")}${safeName}${_0xlex.d("]—]@PC?B]LCCBQ]\\")}${Math.ceil((v.goal - v.cur) / 60)}${_0xlex.d("]KMPC]KGLSRCQk")}`,`${_0xlex.d(".CCIGLE]?R]")}${safeName}${_0xlex.d("]—]\\")}${Math.ceil((v.goal - v.cur) / 60)}${_0xlex.d("]KGLSRCQ]JCDR]ML]RFC]BMSEFk")}`,`${_0xlex.d(")CCNGLE]?L]CWC]ML]")}${safeName}${_0xlex.d("]—]BMSEF]LCCBQ]\\")}${Math.ceil((v.goal - v.cur) / 60)}${_0xlex.d("]KMPC]KGLSRCQk")}`,`${_0xlex.d(",MRCQ]DMP]")}${safeName}${_0xlex.d("]—]@PC?B]LCCBQ]\\")}${Math.ceil((v.goal - v.cur) / 60)}${_0xlex.d("]KMPC]KGLSRCQk")}`,`${_0xlex.d("5?RAFGLE]RFC]MTCL]DMP]")}${safeName}${_0xlex.d("]—]@PC?B]LCCBQ]\\")}${Math.ceil((v.goal - v.cur) / 60)}${_0xlex.d("]KMPC]KGLSRCQk")}`,`${_0xlex.d("+SJJGLE]MTCP]LMRCQ]DMP]")}${safeName}${_0xlex.d("]—]BMSEF]LCCBQ]\\")}${Math.ceil((v.goal - v.cur) / 60)}${_0xlex.d("]KMPC]KGLSRCQk")}`,`${_0xlex.d("!FCAIGLE]ML]")}${safeName}${_0xlex.d("]—]\\")}${Math.ceil((v.goal - v.cur) / 60)}${_0xlex.d("]KGLSRCQ]JCDR]ML]RFC]BMSEFk")}`]));
            } catch (err) {
              finishTask();
              reject(err);
            } finally {
              if (!handedOff) finishTask();
            }
          })();
        });
      };

      const _0xstream = async (v) => {
        const taskId = Symbol(); _0x8844.add(taskId);
        let taskFinished = false; 
        const finishTask = () => { if (!taskFinished) { taskFinished = true; _0x8844.delete(taskId); } };
        
        return new Promise((resolve, reject) => {
          (async () => {
            let handedOff = false;
            try {
              if (!_0xc) { Log.say(_0xlex.C(0), _0xlex.P(6,[`${_0xlex.d("2F?R]AFMPC]e")}${v.name}${_0xlex.d("f]LCCBQ]RFC]K?GL]F?JJ]—]QIGNNGLE]GR]DMP]LMUk")}`,`${_0xlex.d("2F?R]AFMPC]e")}${v.name}${_0xlex.d("f]LCCBQ]?]@GEECP]PGE]—]QIGNNGLE]GR]DMP]LMUk")}`,`${_0xlex.d("2F?R]AFMPC]e")}${v.name}${_0xlex.d("f]LCCBQ]RFC]K?GL]F?JJ]—]JC?TGLE]GR]DMP]?]@GEECP]QCQQGMLk")}`,`${_0xlex.d("!FMPC]")}${v.name}${_0xlex.d("]LCCBQ]RFC]FC?TW]@CLAF]—]QIGNNGLE]GR]DMP]LMUk")}`,`${_0xlex.d("2F?R]AFMPC]e")}${v.name}${_0xlex.d("f]LCCBQ]RFC]K?GL]F?JJ]—]KMTGLE]N?QR]GRk")}`,`${_0xlex.d("!FMPC]")}${v.name}${_0xlex.d("]LCCBQ]RFC]FC?TW]@CLAF]—]LMR]R?IGLE]GR]RFGQ]QFGDRk")}`,`${_0xlex.d("2FGQ]R?QI]e")}${v.name}${_0xlex.d("f]LCCBQ]RFC]DSJJ]UMPIQFMN]—]KMTGLE]N?QR]GRk")}`,`${_0xlex.d("2F?R]AFMPC]e")}${v.name}${_0xlex.d("f]LCCBQ]?]@GEECP]PGE]—]KMTGLE]N?QR]GRk")}`,`${_0xlex.d("2F?R]AFMPC]e")}${v.name}${_0xlex.d("f]LCCBQ]RFC]@GE]UMPIQFMN]—]QIGNNGLEk")}`,`${_0xlex.d("2FGQ]R?QI]e")}${v.name}${_0xlex.d("f]LCCBQ]RFC]DSJJ]UMPIQFMN]—]QIGNNGLEk")}`,`${_0xlex.d("2F?R]AFMPC]e")}${v.name}${_0xlex.d("f]LCCBQ]?]@GEECP]PGE]—]LMR]R?IGLE]GR]RFGQ]QFGDRk")}`,`${_0xlex.d("2FGQ]R?QI]e")}${v.name}${_0xlex.d("f]LCCBQ]RFC]DSJJ]UMPIQFMN]—]QIGNNGLE]GR]DMP]LMUk")}`,`${_0xlex.d("!FMPC]")}${v.name}${_0xlex.d("]LCCBQ]RFC]FC?TW]@CLAF]—]JC?TGLE]GR]DMP]?]@GEECP]QCQQGMLk")}`,`${_0xlex.d("2F?R]AFMPC]e")}${v.name}${_0xlex.d("f]LCCBQ]RFC]K?GL]F?JJ]—]LMR]R?IGLE]GR]RFGQ]QFGDRk")}`,`${_0xlex.d("!FMPC]")}${v.name}${_0xlex.d("]LCCBQ]RFC]FC?TW]@CLAF]—]KMTGLE]N?QR]GRk")}`])); resolve(); return; }
              if (signal.aborted || _0xrunOwner.released) { resolve(); return; }
              let _0xpid = Math.floor(Math.random() * 60000) + 4096;
              Log.say(_0xlex.C(5), _0xlex.P(42,[`${_0xlex.d("2FC]DJMMP]EPGB]JGLCQ]SN]GL]DMSPQw]")}${_0xpid % 4 === 0}${_0xlex.d("]—]@JMAI]`")}${_0xpid}`,`${_0xlex.d("$JMMP]N?RRCPLQ]JGLC]SN]GL]DMSPQw]")}${_0xpid % 4 === 0}${_0xlex.d("]—]RGJC]`")}${_0xpid}`,`${_0xlex.d("2FC]DJMMP]EPGB]JGLCQ]SN]GL]DMSPQw]")}${_0xpid % 4 === 0}${_0xlex.d("]—]QJ?@]`")}${_0xpid}`,`${_0xlex.d("$JMMP]RGJCQ]JGLC]SN]GL]DMSPQw]")}${_0xpid % 4 === 0}${_0xlex.d("]—]QOS?PC]`")}${_0xpid}`,`${_0xlex.d("$JMMP]AFCAIQ]JGLC]SN]GL]DMSPQw]")}${_0xpid % 4 === 0}${_0xlex.d("]—]QJ?@]`")}${_0xpid}`,`${_0xlex.d("2FC]RGJCB]DJMMP]JGLCQ]SN]GL]DMSPQw]")}${_0xpid % 4 === 0}${_0xlex.d("]—]QRMLC]`")}${_0xpid}`,`${_0xlex.d("2FC]RGJCB]DJMMP]JGLCQ]SN]GL]DMSPQw]")}${_0xpid % 4 === 0}${_0xlex.d("]—]QOS?PC]`")}${_0xpid}`,`${_0xlex.d("2FC]DJMMP]EPGB]JGLCQ]SN]GL]DMSPQw]")}${_0xpid % 4 === 0}${_0xlex.d("]—]N?LC]`")}${_0xpid}`,`${_0xlex.d("2FC]RGJCB]DJMMP]JGLCQ]SN]GL]DMSPQw]")}${_0xpid % 4 === 0}${_0xlex.d("]—]QJ?@]`")}${_0xpid}`,`${_0xlex.d("2FC]RGJCB]DJMMP]JGLCQ]SN]GL]DMSPQw]")}${_0xpid % 4 === 0}${_0xlex.d("]—]@JMAI]`")}${_0xpid}`,`${_0xlex.d("$JMMP]N?RRCPLQ]JGLC]SN]GL]DMSPQw]")}${_0xpid % 4 === 0}${_0xlex.d("]—]QJ?@]`")}${_0xpid}`,`${_0xlex.d("$JMMP]AFCAIQ]JGLC]SN]GL]DMSPQw]")}${_0xpid % 4 === 0}${_0xlex.d("]—]@JMAI]`")}${_0xpid}`,`${_0xlex.d("2FC]RGJCB]DJMMP]JGLCQ]SN]GL]DMSPQw]")}${_0xpid % 4 === 0}${_0xlex.d("]—]RGJC]`")}${_0xpid}`,`${_0xlex.d("$JMMP]AFCAIQ]JGLC]SN]GL]DMSPQw]")}${_0xpid % 4 === 0}${_0xlex.d("]—]QRMLC]`")}${_0xpid}`,`${_0xlex.d("2FC]DJMMP]EPGB]JGLCQ]SN]GL]DMSPQw]")}${_0xpid % 4 === 0}${_0xlex.d("]—]RGJC]`")}${_0xpid}`]));
              let undo = null;
              try { undo = GoogleHook(_0x3, _0xm0, GoogleNative(() => ({ id: v.app, pid: _0xpid, sourceName: null }), "function getStreamerActiveStreamMetadata() { [native code] }", _0xm0, 0)); if (!undo) throw new Error("hook"); } catch (e) { Log.say(_0xlex.C(0), _0xlex.P(11,[_0xlex.d("2FC]QRPC?K]BMMPU?W]UMSJB]LMR]MNCL]—]QIGNNGLE]RFGQ]MLCk"),_0xlex.d("2FC]QRPC?K]PMSRC]AMSJB]LMR]@C]?PKCB]—]KMTGLE]MLk"),_0xlex.d("2FC]QRPC?K]BMMPU?W]AMSJB]LMR]@C]NPCN?PCB]—]QIGNNGLEk"),_0xlex.d("2FC]QRPC?K]PMSRC]AMSJB]LMR]@C]?PKCB]—]QIGNNGLEk"),_0xlex.d("2FC]QRPC?K]PMSRC]AMSJB]LMR]@C]?PKCB]—]QIGNNGLE]RFGQ]MLCk"),_0xlex.d("2FC]QRPC?K]BMMPU?W]D?GJCB]RM]AMKC]SN]—]JC?TGLE]GR]DMP]J?RCPk"),_0xlex.d("2FC]QRPC?K]BMMPU?W]AMSJB]LMR]@C]NPCN?PCB]—]LMR]R?IGLE]GR]RFGQ]QFGDRk"),_0xlex.d("2FC]QRPC?K]BMMPU?W]PCDSQCB]RM]@C]QCR]SN]—]LMR]R?IGLE]GR]RFGQ]QFGDRk"),_0xlex.d("2FC]QRPC?K]BMMPU?W]PCDSQCB]RM]@C]QCR]SN]—]QIGNNGLE]RFGQ]MLCk"),_0xlex.d("2FC]QRPC?K]BMMPU?W]D?GJCB]RM]AMKC]SN]—]KMTGLE]MLk"),_0xlex.d("2FC]QRPC?K]CLRPW]AMSJB]LMR]@C]MNCLCB]—]KMTGLE]MLk"),_0xlex.d("2FC]QRPC?K]BMMPU?W]D?GJCB]RM]AMKC]SN]—]LMR]R?IGLE]GR]RFGQ]QFGDRk"),_0xlex.d("2FC]QRPC?K]CLRPW]AMSJB]LMR]@C]MNCLCB]—]LMR]R?IGLE]GR]RFGQ]QFGDRk"),_0xlex.d("2FC]QRPC?K]BMMPU?W]PCDSQCB]RM]@C]QCR]SN]—]KMTGLE]MLk"),_0xlex.d("2FC]QRPC?K]BMMPU?W]UMSJB]LMR]MNCL]—]KMTGLE]MLk")])); resolve(); return; }
              
              let cleanupCalled = false, removeSelf = null, watchdog = null, GoogleStreamHandler = null;
              const cleanup = () => { 
                if (cleanupCalled) return; 
                cleanupCalled = true; 
                
                finishTask();
                Log.diag("Stream task cleanup", { state: "cleaned", activeTaskCount: _0x8844.size }); 
                if (removeSelf) removeSelf(); 
                try { undo?.(); } catch (e) {} 
                if (GoogleStreamHandler) { try { _0xoff(_0xe1, GoogleStreamHandler); } catch (e) {} } 
                if (watchdog !== null) { clearTimeout(watchdog); watchdog = null; } 
                resolve(); 
              };
              removeSelf = _0xe8a7(cleanup);
              
              let stick = 0;
              GoogleStreamHandler = data => { if (_0xpaus || _0xkill || signal.aborted || cleanupCalled) return; let _0x28 = GoogleProgress(data, GoogleTasks.stream, v.cfgv); if (_0x28 === null) return; if (++stick % 3 === 1 || _0x28 >= v.goal) Log.say(_0xlex.C(4), _0xlex.P(37,[`${_0xlex.d("0?LBMK]DP?ARGMLw]")}${_0x28}${_0xlex.d("l")}${v.goal}${_0xlex.d("]QM]D?Pk")}`,`${_0xlex.d(".PMEPCQQ]JGLCw]")}${_0x28}${_0xlex.d("l")}${v.goal}`,`${_0xlex.d(",MU]PC?BGLEw]")}${_0x28}${_0xlex.d("l")}${v.goal}`,`${_0xlex.d(".PMEPCQQ]JGLCw]")}${_0x28}${_0xlex.d("l")}${v.goal}${_0xlex.d("]RM]B?RCk")}`,`${_0xlex.d("!SPPCLR]@C?Rw]")}${_0x28}${_0xlex.d("l")}${v.goal}${_0xlex.d("]GL]RFC]@MMIQk")}`,`${_0xlex.d("0?LBMK]DP?ARGMLw]")}${_0x28}${_0xlex.d("l")}${v.goal}`,`${_0xlex.d(",MU]PC?BGLEw]")}${_0x28}${_0xlex.d("l")}${v.goal}${_0xlex.d("k")}`,`${_0xlex.d("0?LBMK]DP?ARGMLw]")}${_0x28}${_0xlex.d("l")}${v.goal}${_0xlex.d("]JMEECBk")}`,`${_0xlex.d(",MU]PC?BGLEw]")}${_0x28}${_0xlex.d("l")}${v.goal}${_0xlex.d("]RM]B?RCk")}`,`${_0xlex.d("!SPPCLR]@C?Rw]")}${_0x28}${_0xlex.d("l")}${v.goal}${_0xlex.d("]QM]D?Pk")}`,`${_0xlex.d("0?LBMK]DP?ARGMLw]")}${_0x28}${_0xlex.d("l")}${v.goal}${_0xlex.d("]RM]B?RCk")}`,`${_0xlex.d(".PMEPCQQ]JGLCw]")}${_0x28}${_0xlex.d("l")}${v.goal}${_0xlex.d("]JMEECBk")}`,`${_0xlex.d("0SLLGLE]R?JJWw]")}${_0x28}${_0xlex.d("l")}${v.goal}${_0xlex.d("]GL]RFC]@MMIQk")}`,`${_0xlex.d(".PMEPCQQ]JGLCw]")}${_0x28}${_0xlex.d("l")}${v.goal}${_0xlex.d("]GL]RFC]@MMIQk")}`,`${_0xlex.d("0?LBMK]DP?ARGMLw]")}${_0x28}${_0xlex.d("l")}${v.goal}${_0xlex.d("]GL]RFC]@MMIQk")}`])); if (_0x28 >= v.goal) Log.say(_0xlex.C(3), _0xlex.P(39,[`${_0xlex.d("0MSLBCB]MSRw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d("5P?NNCB]SNw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d(" MVCB]SNw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d(")LMAICB]MSRw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d(".SR]RM]@CBw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d("\"CJGTCPCBw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d("&?LBCB]MDDw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d("1CRRJCBw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d("!FCAICB]MDDw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d("!MKNJCRCBw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d("!?QFCB]MSRw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d("!JMQCB]MSRw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d("!JC?PCBw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d("!MLAJSBCBw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d("1C?JCBw]")}${v.name}${_0xlex.d("k")}`])); if (_0x28 >= v.goal || _0xkill) cleanup(); };
              watchdog = setTimeout(() => cleanup(), Math.max(10 * 60 * 1000, (v.goal - v.cur) * 120000));
              
              try { _0xon(_0xe1, GoogleStreamHandler); } catch (e) { cleanup(); Log.say(_0xlex.C(0), _0xlex.P(12,[_0xlex.d("2FC]QRPC?K]NPMEPCQQ]DCCB]UMSJB]LMR]QS@QAPG@C]—]QIGNNGLEk"),_0xlex.d("1S@QAPG@GLE]RM]QRPC?K]NPMEPCQQ]D?GJCB]—]QIGNNGLEk"),_0xlex.d("1RPC?K]NPMEPCQQ]SNB?RCQ]AMSJB]LMR]@C]QS@QAPG@CB]—]KMTGLE]MLk"),_0xlex.d("1RPC?K]NPMEPCQQ]SNB?RCQ]AMSJB]LMR]@C]QS@QAPG@CB]—]QIGNNGLE]RFGQ]MLCk"),_0xlex.d("2FC]QRPC?K]DCCB]QS@QAPGNRGML]D?GJCB]—]LMR]QR?PRGLE]GRk"),_0xlex.d("1S@QAPG@GLE]RM]QRPC?K]NPMEPCQQ]D?GJCB]—]JC?TGLE]GR]@Ck"),_0xlex.d("1RPC?K]NPMEPCQQ]QS@QAPGNRGML]D?GJCB]—]LMR]QR?PRGLE]GRk"),_0xlex.d("2FC]QRPC?K]NPMEPCQQ]DCCB]UMSJB]LMR]QS@QAPG@C]—]LMR]QR?PRGLE]GRk"),_0xlex.d("2FC]QRPC?K]DCCB]QS@QAPGNRGML]D?GJCB]—]QIGNNGLEk"),_0xlex.d("1S@QAPG@GLE]RM]QRPC?K]NPMEPCQQ]D?GJCB]—]KMTGLE]MLk"),_0xlex.d("1S@QAPG@GLE]RM]QRPC?K]NPMEPCQQ]D?GJCB]—]LMR]QR?PRGLE]GRk"),_0xlex.d("2FC]QRPC?K]DCCB]QS@QAPGNRGML]D?GJCB]—]QIGNNGLE]RFGQ]MLCk"),_0xlex.d("1RPC?K]NPMEPCQQ]QS@QAPGNRGML]D?GJCB]—]QIGNNGLEk"),_0xlex.d("1RPC?K]NPMEPCQQ]SNB?RCQ]AMSJB]LMR]@C]QS@QAPG@CB]—]LMR]QR?PRGLE]GRk"),_0xlex.d("2FC]QRPC?K]NPMEPCQQ]DCCB]UMSJB]LMR]QS@QAPG@C]—]QIGNNGLE]RFGQ]MLCk")])); resolve(); return; }
              
              
              Log.diag("Stream task handoff", { state: "subscribed", activeTaskCount: _0x8844.size });
              handedOff = true; 
              Log.say(_0xlex.C(11), _0xlex.P(45,[`${_0xlex.d("1FMUdQ]?@MSR]RM]QR?PR]—]ICCN]TA]JGTC]DMP]\\")}${Math.ceil((v.goal - v.cur) / 60)}${_0xlex.d("]KMPC]KGLSRCQk")}`,`${_0xlex.d(" ?AIQR?EC]JGEFRQ]ML]—]ICCN]?]UGLBMU]JGTC]GL]TA]DMP]\\")}${Math.ceil((v.goal - v.cur) / 60)}${_0xlex.d("]KMPC]KGLSRCQk")}`,`${_0xlex.d("*GEFRQ]?PC]ML]@?AIQR?EC]—]ICCN]?]UGLBMU]JGTC]GL]TA]DMP]\\")}${Math.ceil((v.goal - v.cur) / 60)}${_0xlex.d("]KMPC]KGLSRCQk")}`,`${_0xlex.d("2FC]QR?EC]GQ]QCR]—]ICCN]?]UGLBMU]MNCL]GL]TA]\\")}${Math.ceil((v.goal - v.cur) / 60)}${_0xlex.d("]KMPC]KGLSRCQk")}`,`${_0xlex.d("*GEFRQ]?PC]ML]@?AIQR?EC]—]ICCN]?]UGLBMU]JGTC]GL]TA]\\")}${Math.ceil((v.goal - v.cur) / 60)}${_0xlex.d("]KGL]RM]EMk")}`,`${_0xlex.d(" ?AIQR?EC]JGEFRQ]ML]—]ICCN]TA]JGTC]DMP]\\")}${Math.ceil((v.goal - v.cur) / 60)}${_0xlex.d("]KMPC]KGLSRCQk")}`,`${_0xlex.d("2FC]QR?EC]GQ]QCR]—]ICCN]?]UGLBMU]JGTC]GL]TA]DMP]\\")}${Math.ceil((v.goal - v.cur) / 60)}${_0xlex.d("]KMPC]KGLSRCQk")}`,`${_0xlex.d(" ?AIQR?EC]JGEFRQ]ML]—]ICCN]?]UGLBMU]JGTC]GL]TA]\\")}${Math.ceil((v.goal - v.cur) / 60)}${_0xlex.d("]KGL]RM]EMk")}`,`${_0xlex.d("2FC]QR?EC]GQ]QCR]—]ICCN]TA]JGTC]DMP]\\")}${Math.ceil((v.goal - v.cur) / 60)}${_0xlex.d("]KMPC]KGLSRCQk")}`,`${_0xlex.d("!SPR?GLdQ]SN]—]ICCN]?]UGLBMU]JGTC]GL]TA]\\")}${Math.ceil((v.goal - v.cur) / 60)}${_0xlex.d("]KGL]RM]EMk")}`,`${_0xlex.d("*GEFRQ]?PC]ML]@?AIQR?EC]—]ICCN]TA]JGTC]DMP]\\")}${Math.ceil((v.goal - v.cur) / 60)}${_0xlex.d("]KMPC]KGLSRCQk")}`,`${_0xlex.d("1FMUdQ]?@MSR]RM]QR?PR]—]ICCN]?]UGLBMU]JGTC]GL]TA]\\")}${Math.ceil((v.goal - v.cur) / 60)}${_0xlex.d("]KGL]RM]EMk")}`,`${_0xlex.d("2FC]QR?EC]GQ]QCR]—]ICCN]?]UGLBMU]JGTC]GL]TA]\\")}${Math.ceil((v.goal - v.cur) / 60)}${_0xlex.d("]KGL]RM]EMk")}`,`${_0xlex.d(" ?AIQR?EC]JGEFRQ]ML]—]ICCN]?]UGLBMU]MNCL]GL]TA]\\")}${Math.ceil((v.goal - v.cur) / 60)}${_0xlex.d("]KMPC]KGLSRCQk")}`,`${_0xlex.d("1FMUdQ]?@MSR]RM]QR?PR]—]ICCN]?]UGLBMU]JGTC]GL]TA]DMP]\\")}${Math.ceil((v.goal - v.cur) / 60)}${_0xlex.d("]KMPC]KGLSRCQk")}`]));
            } catch (err) {
              finishTask();
              reject(err);
            } finally {
              if (!handedOff) finishTask();
            }
          })();
        });
      };

      const _0xact = async (v) => {
        if (!_0x6 || !_0x7) { Log.say(_0xlex.C(0), _0xlex.P(13,[_0xlex.d(",M]?PA?BC]BMMPU?W]AMSJB]@C]DMSLB]—]LMR]R?IGLE]GR]RFGQ]QFGDRk"),_0xlex.d("2FC]?PA?BC]A?@GLCR]F?B]LM]BMMPU?W]—]KMTGLE]MLk"),_0xlex.d("2FC]A?@GLCRdQ]BMMPU?W]U?Q]LMR]DMSLB]—]QIGNNGLE]RFGQ]MLCk"),_0xlex.d(",M]BMMPU?W]DMSLB]DMP]RFC]?PA?BC]A?@GLCR]—]JC?TGLE]GR]DMP]J?RCPk"),_0xlex.d("2FC]?PA?BC]A?@GLCR]F?B]LM]BMMPU?W]—]JC?TGLE]GR]DMP]J?RCPk"),_0xlex.d("2FC]A?@GLCRdQ]BMMPU?W]U?Q]LMR]DMSLB]—]JC?TGLE]GR]DMP]J?RCPk"),_0xlex.d(",M]BMMPU?W]DMSLB]DMP]RFC]?PA?BC]A?@GLCR]—]QIGNNGLE]RFGQ]MLCk"),_0xlex.d("2FC]?PA?BC]A?@GLCR]F?B]LM]BMMPU?W]—]LMR]R?IGLE]GR]RFGQ]QFGDRk"),_0xlex.d(",M]BMMPU?W]DMSLB]DMP]RFC]A?@GLCR]—]KMTGLE]MLk"),_0xlex.d(",M]?PA?BC]BMMPU?W]AMSJB]@C]DMSLB]—]KMTGLE]MLk"),_0xlex.d("2FC]A?@GLCRdQ]BMMPU?W]U?Q]LMR]DMSLB]—]KMTGLE]MLk"),_0xlex.d("2FC]A?@GLCRdQ]BMMPU?W]U?Q]LMR]DMSLB]—]LMR]R?IGLE]GR]RFGQ]QFGDRk"),_0xlex.d(",M]BMMPU?W]DMSLB]DMP]RFC]A?@GLCR]—]LMR]R?IGLE]GR]RFGQ]QFGDRk"),_0xlex.d(",M]BMMPU?W]DMSLB]DMP]RFC]?PA?BC]A?@GLCR]—]QIGNNGLEk"),_0xlex.d(",M]?PA?BC]BMMPU?W]AMSJB]@C]DMSLB]—]JC?TGLE]GR]DMP]J?RCPk")])); return; }
        let _0x29; try { _0x29 = _0x6[_0xm8]()[0]?.id; } catch (e) {}
        if (!_0x29) { try { const guilds = Object.values(_0x7[_0xm9]()); const voiceGuild = guilds.find(x => x && x.VOCAL && x.VOCAL.length); if (voiceGuild) _0x29 = voiceGuild.VOCAL[0].channel.id; } catch (e) {} if (!_0x29) { Log.say(_0xlex.C(0), _0xlex.P(13,[_0xlex.d(",M]?PA?BC]BMMPU?W]AMSJB]@C]DMSLB]—]LMR]R?IGLE]GR]RFGQ]QFGDRk"),_0xlex.d("2FC]?PA?BC]A?@GLCR]F?B]LM]BMMPU?W]—]KMTGLE]MLk"),_0xlex.d("2FC]A?@GLCRdQ]BMMPU?W]U?Q]LMR]DMSLB]—]QIGNNGLE]RFGQ]MLCk"),_0xlex.d(",M]BMMPU?W]DMSLB]DMP]RFC]?PA?BC]A?@GLCR]—]JC?TGLE]GR]DMP]J?RCPk"),_0xlex.d("2FC]?PA?BC]A?@GLCR]F?B]LM]BMMPU?W]—]JC?TGLE]GR]DMP]J?RCPk"),_0xlex.d("2FC]A?@GLCRdQ]BMMPU?W]U?Q]LMR]DMSLB]—]JC?TGLE]GR]DMP]J?RCPk"),_0xlex.d(",M]BMMPU?W]DMSLB]DMP]RFC]?PA?BC]A?@GLCR]—]QIGNNGLE]RFGQ]MLCk"),_0xlex.d("2FC]?PA?BC]A?@GLCR]F?B]LM]BMMPU?W]—]LMR]R?IGLE]GR]RFGQ]QFGDRk"),_0xlex.d(",M]BMMPU?W]DMSLB]DMP]RFC]A?@GLCR]—]KMTGLE]MLk"),_0xlex.d(",M]?PA?BC]BMMPU?W]AMSJB]@C]DMSLB]—]KMTGLE]MLk"),_0xlex.d("2FC]A?@GLCRdQ]BMMPU?W]U?Q]LMR]DMSLB]—]KMTGLE]MLk"),_0xlex.d("2FC]A?@GLCRdQ]BMMPU?W]U?Q]LMR]DMSLB]—]LMR]R?IGLE]GR]RFGQ]QFGDRk"),_0xlex.d(",M]BMMPU?W]DMSLB]DMP]RFC]A?@GLCR]—]LMR]R?IGLE]GR]RFGQ]QFGDRk"),_0xlex.d(",M]BMMPU?W]DMSLB]DMP]RFC]?PA?BC]A?@GLCR]—]QIGNNGLEk"),_0xlex.d(",M]?PA?BC]BMMPU?W]AMSJB]@C]DMSLB]—]JC?TGLE]GR]DMP]J?RCPk")])); return; } }
        let _0x2a = "call:" + _0x29 + ":" + Array.from({length: 16}, () => Math.floor(Math.random() * 16).toString(16)).join('');
        Log.say(_0xlex.C(19), _0xlex.P(46,[`${_0xlex.d("\"PMNNGLE]AMGLQ]GL]RFC]A?@GLCR]—]e\\")}${Math.ceil((v.goal - v.cur) / 60)}${_0xlex.d("]KGLfk")}`,`${_0xlex.d("0SLLGLE]RFC]A?@GLCR]—]\\")}${Math.ceil((v.goal - v.cur) / 60)}${_0xlex.d("]KGL]JCDRk")}`,`${_0xlex.d("$CCBGLE]AMGLQ]RM]RFC]A?@GLCR]—]e\\")}${Math.ceil((v.goal - v.cur) / 60)}${_0xlex.d("]KMPC]KGLfk")}`,`${_0xlex.d("$CCBGLE]RFC]A?@GLCR]AMGLQ]—]e\\")}${Math.ceil((v.goal - v.cur) / 60)}${_0xlex.d("]KGLfk")}`,`${_0xlex.d("$CCBGLE]RFC]A?@GLCR]AMGLQ]—]?@MSR]")}${Math.ceil((v.goal - v.cur) / 60)}${_0xlex.d("]KGL]RM]EMk")}`,`${_0xlex.d("\"PMNNGLE]AMGLQ]GL]RFC]A?@GLCR]—]\\")}${Math.ceil((v.goal - v.cur) / 60)}${_0xlex.d("]KGL]JCDRk")}`,`${_0xlex.d("$CCBGLE]AMGLQ]RM]RFC]A?@GLCR]—]?@MSR]")}${Math.ceil((v.goal - v.cur) / 60)}${_0xlex.d("]KGL]RM]EMk")}`,`${_0xlex.d("$CCBGLE]AMGLQ]RM]RFC]A?@GLCR]—]\\")}${Math.ceil((v.goal - v.cur) / 60)}${_0xlex.d("]KGL]JCDRk")}`,`${_0xlex.d("$CCBGLE]RFC]A?@GLCR]AMGLQ]—]\\")}${Math.ceil((v.goal - v.cur) / 60)}${_0xlex.d("]KGL]JCDRk")}`,`${_0xlex.d("$CCBGLE]RFC]A?@GLCR]AMGLQ]—]e\\")}${Math.ceil((v.goal - v.cur) / 60)}${_0xlex.d("]KMPC]KGLfk")}`,`${_0xlex.d("$CCBGLE]AMGLQ]RM]RFC]A?@GLCR]—]e\\")}${Math.ceil((v.goal - v.cur) / 60)}${_0xlex.d("]KGLfk")}`,`${_0xlex.d("0SLLGLE]RFC]A?@GLCR]—]e\\")}${Math.ceil((v.goal - v.cur) / 60)}${_0xlex.d("]KGLfk")}`,`${_0xlex.d("\"PMNNGLE]AMGLQ]GL]RFC]A?@GLCR]—]?@MSR]")}${Math.ceil((v.goal - v.cur) / 60)}${_0xlex.d("]KGL]RM]EMk")}`,`${_0xlex.d("\"PMNNGLE]AMGLQ]GL]RFC]A?@GLCR]—]e\\")}${Math.ceil((v.goal - v.cur) / 60)}${_0xlex.d("]KMPC]KGLfk")}`,`${_0xlex.d("!MGLQ]GLRM]RFC]A?@GLCR]—]?@MSR]")}${Math.ceil((v.goal - v.cur) / 60)}${_0xlex.d("]KGL]RM]EMk")}`]));
        const _0xactivityDeadline = Date.now() + Math.max(10 * 60 * 1000, (v.goal - v.cur) * 120000);
        let tick = 0;
        while (v.cur < v.goal && !_0xkill && !signal.aborted && Date.now() < _0xactivityDeadline) {
          if (_0xpaus) { await GoogleDelay(3); continue; }
          let _0x2b = await GooglePostSafe({ url: GoogleRoutes.heartbeat(v.q.id), body: { stream_key: _0x2a, terminal: false } });
          const reportedProgress = _0xbb86(_0x2b?.body, GoogleTasks.activity);
          if (reportedProgress !== null) v.cur = reportedProgress;
          if (++tick % 3 === 1 || v.cur >= v.goal) Log.say(_0xlex.C(4), _0xlex.P(38,[`${_0xlex.d("0?LBMK]DP?ARGMLw]")}${v.cur}${_0xlex.d("l")}${v.goal}${_0xlex.d("]QM]D?Pk")}`,`${_0xlex.d(",MU]PC?BGLEw]")}${v.cur}${_0xlex.d("l")}${v.goal}${_0xlex.d("]JMEECBk")}`,`${_0xlex.d(",MU]PC?BGLEw]")}${v.cur}${_0xlex.d("l")}${v.goal}${_0xlex.d("k")}`,`${_0xlex.d("!SPPCLR]@C?Rw]")}${v.cur}${_0xlex.d("l")}${v.goal}${_0xlex.d("]JMEECBk")}`,`${_0xlex.d(".PMEPCQQ]JGLCw]")}${v.cur}${_0xlex.d("l")}${v.goal}${_0xlex.d("]JMEECBk")}`,`${_0xlex.d("0?LBMK]DP?ARGMLw]")}${v.cur}${_0xlex.d("l")}${v.goal}${_0xlex.d("]JMEECBk")}`,`${_0xlex.d("0SLLGLE]R?JJWw]")}${v.cur}${_0xlex.d("l")}${v.goal}${_0xlex.d("k")}`,`${_0xlex.d(",MU]PC?BGLEw]")}${v.cur}${_0xlex.d("l")}${v.goal}${_0xlex.d("]RM]B?RCk")}`,`${_0xlex.d("0SLLGLE]R?JJWw]")}${v.cur}${_0xlex.d("l")}${v.goal}${_0xlex.d("]GL]RFC]@MMIQk")}`,`${_0xlex.d("0?LBMK]DP?ARGMLw]")}${v.cur}${_0xlex.d("l")}${v.goal}`,`${_0xlex.d(",MU]PC?BGLEw]")}${v.cur}${_0xlex.d("l")}${v.goal}${_0xlex.d("]QM]D?Pk")}`,`${_0xlex.d(".PMEPCQQ]JGLCw]")}${v.cur}${_0xlex.d("l")}${v.goal}${_0xlex.d("]QM]D?Pk")}`,`${_0xlex.d("!SPPCLR]@C?Rw]")}${v.cur}${_0xlex.d("l")}${v.goal}${_0xlex.d("k")}`,`${_0xlex.d("0?LBMK]DP?ARGMLw]")}${v.cur}${_0xlex.d("l")}${v.goal}${_0xlex.d("k")}`,`${_0xlex.d(".PMEPCQQ]JGLCw]")}${v.cur}${_0xlex.d("l")}${v.goal}`]));
          await GoogleDelay(20);
          if (v.cur >= v.goal) { await GoogleDelay(2); if (_0xkill || signal.aborted) break; if (!_0xkill && !signal.aborted) await GooglePostSafe({ url: GoogleRoutes.heartbeat(v.q.id), body: { stream_key: _0x2a, terminal: true } }); break; }
        }
        if (v.cur >= v.goal) Log.say(_0xlex.C(3), _0xlex.P(39,[`${_0xlex.d("0MSLBCB]MSRw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d("5P?NNCB]SNw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d(" MVCB]SNw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d(")LMAICB]MSRw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d(".SR]RM]@CBw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d("\"CJGTCPCBw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d("&?LBCB]MDDw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d("1CRRJCBw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d("!FCAICB]MDDw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d("!MKNJCRCBw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d("!?QFCB]MSRw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d("!JMQCB]MSRw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d("!JC?PCBw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d("!MLAJSBCBw]")}${v.name}${_0xlex.d("k")}`,`${_0xlex.d("1C?JCBw]")}${v.name}${_0xlex.d("k")}`]));
        else if (!_0xkill && !signal.aborted && Date.now() >= _0xactivityDeadline) Log.say(_0xlex.C(0), _0xlex.P(14,[`${_0xlex.d("~ARGTGRW]")}${v.name}${_0xlex.d("]NPMBSACB]LM]NPMEPCQQ]@CDMPC]QRMNNGLE]—]AMSLRGLE]GR]?Q]QR?JJCBk")}`,`${_0xlex.d("~ARGTGRW]")}${v.name}${_0xlex.d("]CLBCB]UGRFMSR]AMLDGPKCB]NPMEPCQQ]—]AMSLRGLE]GR]?Q]QR?JJCBk")}`,`${_0xlex.d("~ARGTGRW]")}${v.name}${_0xlex.d("]NPMBSACB]LM]NPMEPCQQ]@CDMPC]QRMNNGLE]—]RPC?RGLE]GR]?Q]?]QR?JJk")}`,`${_0xlex.d("~ARGTGRW]")}${v.name}${_0xlex.d("]QRMNNCB]?DRCP]LM]AMLDGPKCB]NPMEPCQQ]—]RPC?RGLE]GR]?Q]?]QR?JJk")}`,`${_0xlex.d("~ARGTGRW]")}${v.name}${_0xlex.d("]QR?JJCB]UGRF]LM]AMLDGPKCB]NPMEPCQQ]—]RPC?RGLE]GR]?Q]?]QR?JJk")}`,`${_0xlex.d("~ARGTGRW]")}${v.name}${_0xlex.d("]QRMNNCB]?DRCP]LM]AMLDGPKCB]NPMEPCQQ]—]?QQSKGLE]GR]QR?JJCBk")}`,`${_0xlex.d("~ARGTGRW]")}${v.name}${_0xlex.d("]NPMBSACB]LM]NPMEPCQQ]@CDMPC]QRMNNGLE]—]K?PIGLE]GR]BMUL]?Q]QR?JJCBk")}`,`${_0xlex.d("~ARGTGRW]")}${v.name}${_0xlex.d("]NPMBSACB]LM]NPMEPCQQ]@CDMPC]QRMNNGLE]—]?QQSKGLE]GR]QR?JJCBk")}`,`${_0xlex.d("~ARGTGRW]")}${v.name}${_0xlex.d("]UCLR]OSGCR]UGRFMSR]NPMEPCQQ]—]RPC?RGLE]GR]?Q]?]QR?JJk")}`,`${_0xlex.d("~ARGTGRW]")}${v.name}${_0xlex.d("]UCLR]OSGCR]UGRFMSR]NPMEPCQQ]—]AMSLRGLE]GR]?Q]QR?JJCBk")}`,`${_0xlex.d("~ARGTGRW]")}${v.name}${_0xlex.d("]CLBCB]UGRFMSR]AMLDGPKCB]NPMEPCQQ]—]K?PIGLE]GR]BMUL]?Q]QR?JJCBk")}`,`${_0xlex.d("~ARGTGRW]")}${v.name}${_0xlex.d("]CLBCB]UGRFMSR]AMLDGPKCB]NPMEPCQQ]—]?QQSKGLE]GR]QR?JJCBk")}`,`${_0xlex.d("~ARGTGRW]")}${v.name}${_0xlex.d("]QRMNNCB]?DRCP]LM]AMLDGPKCB]NPMEPCQQ]—]K?PIGLE]GR]BMUL]?Q]QR?JJCBk")}`,`${_0xlex.d("~ARGTGRW]")}${v.name}${_0xlex.d("]CLBCB]UGRFMSR]AMLDGPKCB]NPMEPCQQ]—]DJ?EEGLE]LM]NPMEPCQQk")}`,`${_0xlex.d("~ARGTGRW]")}${v.name}${_0xlex.d("]UCLR]OSGCR]UGRFMSR]NPMEPCQQ]—]?QQSKGLE]GR]QR?JJCBk")}`]));
      };

      const GoogleHandlers = { [GoogleTasks.video]: _0xvideo, [GoogleTasks.videoMobile]: _0xvideo, [GoogleTasks.play]: _0xplay, [GoogleTasks.stream]: _0xstream, [GoogleTasks.activity]: _0xact };

      const _0x10 = async (_0x11) => {
        let _0x15 = _0x79a4(_0x11.config, GoogleRoutes.tasks);
        if (!_0x15?.tasks) { Log.say(_0xlex.C(0), _0xlex.P(15,[_0xlex.d(",M]AFMPCQ]UCPC]ML]RFC]JGQR]—]JC?TGLE]GR]DMP]LCVR]RGKCk"),_0xlex.d("!FMPC]JGQR]U?Q]@J?LI]—]JC?TGLE]GR]DMP]LCVR]RGKCk"),_0xlex.d("!FMPC]JGQR]A?KC]@?AI]CKNRW]—]QIGNNGLE]RFGQ]MLCk"),_0xlex.d("2FC]JGQR]MD]AFMPCQ]U?Q]CKNRW]—]KMTGLE]MLk"),_0xlex.d("!FMPC]JGQR]A?KC]@?AI]CKNRW]—]KMTGLE]MLk"),_0xlex.d("2FC]JGQR]MD]AFMPCQ]U?Q]CKNRW]—]QIGNNGLE]RFGQ]MLCk"),_0xlex.d("!FMPC]JGQR]A?KC]@?AI]CKNRW]—]JC?TGLE]GR]DMP]LCVR]RGKCk"),_0xlex.d("!FMPC]JGQR]A?KC]@?AI]CKNRW]—]LMRFGLE]RM]BM]RFGQ]N?QQk"),_0xlex.d("2FC]JGQR]MD]AFMPCQ]U?Q]CKNRW]—]JC?TGLE]GR]DMP]LCVR]RGKCk"),_0xlex.d("!FMPC]JGQR]A?KC]@?AI]CKNRW]—]QIGNNGLE]RFC]PMSLBk"),_0xlex.d(",M]AFMPCQ]UCPC]ML]RFC]JGQR]—]QIGNNGLE]RFGQ]MLCk"),_0xlex.d("2FC]JGQR]MD]AFMPCQ]U?Q]CKNRW]—]QIGNNGLE]RFC]PMSLBk"),_0xlex.d(",M]AFMPCQ]UCPC]ML]RFC]JGQR]—]QIGNNGLE]RFC]PMSLBk"),_0xlex.d("2FC]AFMPC]JGQR]A?KC]@?AI]@J?LI]—]KMTGLE]MLk"),_0xlex.d("2FC]AFMPC]JGQR]A?KC]@?AI]@J?LI]—]QIGNNGLE]RFC]PMSLBk")])); return "skipped"; }
        let _0x16 = GoogleRoutes.tasks.find(t => Object.hasOwn(_0x15.tasks, t));
        let _0x17 = _0x16 ? _0x15.tasks[_0x16] : null;
        let _0x19 = Number(_0x17?.target);
        if (!Number.isFinite(_0x19) || _0x19 <= 0) { Log.say(_0xlex.C(0), _0xlex.P(16,[_0xlex.d("!FMPC]R?PECR]BGB]LMR]N?PQC]—]KMTGLE]MLk"),_0xlex.d("!FMPC]R?PECR]U?Q]GLT?JGB]—]QIGNNGLE]RFGQ]MLCk"),_0xlex.d("!FMPC]R?PECR]U?Q]GLT?JGB]—]LMR]QR?PRGLE]GRk"),_0xlex.d("!FMPC]R?PECR]BGB]LMR]N?PQC]—]JC?TGLE]GR]@Ck"),_0xlex.d("!FMPC]R?PECR]A?KC]@?AI]SLSQ?@JC]—]LMR]QR?PRGLE]GRk"),_0xlex.d("2FC]AFMPC]R?PECR]U?Q]K?JDMPKCB]—]JC?TGLE]GR]@Ck"),_0xlex.d("!FMPC]R?PECR]BGB]LMR]N?PQC]—]LMR]QR?PRGLE]GRk"),_0xlex.d("!FMPC]R?PECR]BGB]LMR]N?PQC]—]QIGNNGLE]RFGQ]MLCk"),_0xlex.d("2FC]AFMPC]R?PECR]U?Q]K?JDMPKCB]—]KMTGLE]MLk"),_0xlex.d("2FC]R?PECR]DMP]RFC]AFMPC]U?Q]@?B]—]QIGNNGLE]RFGQ]MLCk"),_0xlex.d("2FC]R?PECR]DMP]RFC]AFMPC]U?Q]@?B]—]JC?TGLE]GR]@Ck"),_0xlex.d("!FMPC]R?PECR]U?Q]GLT?JGB]—]KMTGLE]MLk"),_0xlex.d("!FMPC]R?PECR]A?KC]@?AI]SLSQ?@JC]—]QIGNNGLE]GRk"),_0xlex.d("!FMPC]R?PECR]U?Q]GLT?JGB]—]JC?TGLE]GR]@Ck"),_0xlex.d("!FMPC]R?PECR]A?KC]@?AI]SLSQ?@JC]—]QIGNNGLE]RFGQ]MLCk")])); return "skipped"; }
        let _0x18 = _0x11.config?.application?.id ?? _0x17?.applications?.[0]?.id;
        if ((_0x16 === GoogleTasks.play || _0x16 === GoogleTasks.stream) && !_0x18) { Log.say(_0xlex.C(0), _0xlex.P(17,[_0xlex.d("!FMPC]A?KC]UGRFMSR]?L]?NNJGA?RGML]GB]—]QIGNNGLEk"),_0xlex.d("!FMPC]A?KC]UGRFMSR]?L]?NNJGA?RGML]GB]—]QIGNNGLE]RFGQ]MLCk"),_0xlex.d("!FMPC]F?B]LM]?NN]GBCLRGDGCP]—]QIGNNGLE]RFGQ]MLCk"),_0xlex.d("2FC]AFMPC]J?AICB]?L]?NNJGA?RGML]GB]—]QIGNNGLE]RFGQ]MLCk"),_0xlex.d("!FMPC]F?B]LM]?NN]GBCLRGDGCP]—]KMTGLE]MLk"),_0xlex.d(",M]?NNJGA?RGML]GB]ML]RFC]AFMPC]—]QIGNNGLEk"),_0xlex.d("2FC]AFMPC]J?AICB]?L]?NNJGA?RGML]GB]—]KMTGLE]MLk"),_0xlex.d("!FMPC]F?B]LM]?NNJGA?RGML]GBCLRGDGCP]—]JC?TGLE]GR]@Ck"),_0xlex.d(",M]?NNJGA?RGML]GB]ML]RFC]AFMPC]—]KMTGLE]MLk"),_0xlex.d(",M]?NNJGA?RGML]GB]ML]RFC]AFMPC]—]QIGNNGLE]RFGQ]MLCk"),_0xlex.d(",M]?NNJGA?RGML]GB]ML]RFC]AFMPC]—]LMR]QR?PRGLE]GRk"),_0xlex.d("2FC]AFMPC]J?AICB]?L]?NNJGA?RGML]GB]—]JC?TGLE]GR]@Ck"),_0xlex.d("!FMPC]A?KC]UGRFMSR]?L]?NNJGA?RGML]GB]—]LMR]QR?PRGLE]GRk"),_0xlex.d("!FMPC]A?KC]UGRFMSR]?L]?NNJGA?RGML]GB]—]JC?TGLE]GR]@Ck"),_0xlex.d("!FMPC]F?B]LM]?NNJGA?RGML]GBCLRGDGCP]—]LMR]QR?PRGLE]GRk")])); return "skipped"; }
        let _0x1a = _0x11.userStatus?.progress?.[_0x16]?.value ?? 0;
        let _0x1b = Math.floor(Math.random() * 60000) + 4096;
        const fn = GoogleHandlers[_0x16]; if (!fn) return "unsupported";
        await fn({ q: _0x11, taskType: _0x16, name: _0x11.config?.messages?.questName ?? "that quest", app: _0x18, goal: _0x19, cur: _0x1a, pid: _0x1b, cfgv: _0x11.config?.configVersion });
        return "processed";
      };

      let _0xstarted = false;
      const _0x2c = async () => {
        if (_0xstarted) return; _0xstarted = true;
                let didWork = false; const _0xresults = []; const _0xdone = new Set();
        const _0xrefill = () => {
          try {
            const _0v = _0x5.quests.values;
            const _0list = typeof _0v === "function" ? Array.from(_0v.call(_0x5.quests)) : [];
            let _0added = 0;
            for (const q of _0list) {
              if (!q || typeof q !== "object" || !q.id || _0xdone.has(q.id)) continue;
              if (_0xb.some(x => x && x.id === q.id)) continue;
              if (!q.userStatus?.enrolledAt || q.userStatus?.completedAt) continue;
              const _0e = new Date(q.config?.expiresAt).getTime();
              if (Number.isFinite(_0e) && _0e <= Date.now() - 5 * 60 * 1000) continue;
              if (!_0x79a4(q.config, GoogleRoutes.tasks)?.tasks) continue;
              _0xb.push(q); _0xdone.add(q.id); _0added++;
            }
            return _0added;
          } catch (e) { return 0; }
        };
        try {
          _0xwatch = setInterval(() => { if (_0xkill || signal.aborted) { clearInterval(_0xwatch); _0xwatch = null; return; } const p = location.pathname; if (!_0xpaus && p !== _0xroute0) { _0xpaus = true; Log.say(_0xlex.C(8), _0xlex.P(48,[_0xlex.d("2P?GJ]K?PICP]KMTCB]—]N?PICB]FCPCk"),_0xlex.d("+MTCB]MDD]RFC]K?GL]RP?GJ]—]FMJBGLE]DMP]LMUk"),_0xlex.d("2P?GJ]K?PICP]QFGDRCB]—]QR?WGLE]NSRk"),_0xlex.d("+MTCB]MDD]RFC]K?GL]RP?GJ]—]QR?WGLE]NSRk"),_0xlex.d(".?SQCB]ML]RFC]RP?GJ]—]N?PICB]FCPCk"),_0xlex.d(".?SQCB]ML]RFC]RP?GJ]—]FMJBGLE]NMQGRGMLk"),_0xlex.d("1RCNNCB]MDD]RFC]RP?GJ]—]FMJBGLE]NMQGRGMLk"),_0xlex.d("1RCNNCB]MDD]RFC]RP?GJ]—]QR?WGLE]NSRk"),_0xlex.d("1RCNNCB]MDD]RFC]RP?GJ]—]N?PICB]FCPCk"),_0xlex.d(".?SQCB]ML]RFC]RP?GJ]—]FMJBGLE]DMP]LMUk"),_0xlex.d(".?SQCB]ML]RFC]RP?GJ]—]QR?WGLE]NSRk"),_0xlex.d("+MTCB]MDD]RFC]K?GL]RP?GJ]—]FMJBGLE]NMQGRGMLk"),_0xlex.d("2P?GJ]K?PICP]QFGDRCB]—]FMJBGLE]QRGJJk"),_0xlex.d("2P?GJ]K?PICP]QFGDRCB]—]N?PICB]FCPCk"),_0xlex.d("1RCNNCB]MDD]RFC]RP?GJ]—]FMJBGLE]QRGJJk")])); } else if (_0xpaus && p === _0route0) { _0xpaus = false; Log.say(_0xlex.C(8), _0xlex.P(49,[_0xlex.d("0CRSPLCB]RM]RFC]RP?GJ]—]ML]RFC]KMTC]?E?GLk"),_0xlex.d(" ?AI]ML]RFC]K?GL]RP?GJ]—]NGAIGLE]SN]?E?GLk"),_0xlex.d(" ?AI]ML]RFC]RP?GJ]—]KMTGLE]?E?GLk"),_0xlex.d(" ?AI]ML]RFC]RP?GJ]—]PCQSKGLEk"),_0xlex.d("-L]RFC]RP?GJ]?E?GL]—]NGAIGLE]SN]?E?GLk"),_0xlex.d("-L]RFC]RP?GJ]?E?GL]—]ML]RFC]KMTC]?E?GLk"),_0xlex.d("0CRSPLCB]RM]RFC]RP?GJ]—]KMTGLE]?E?GLk"),_0xlex.d(" ?AI]RM]RFC]RP?GJ]—]ML]RFC]KMTC]?E?GLk"),_0xlex.d(" ?AI]RM]RFC]RP?GJ]—]PCQSKGLEk"),_0xlex.d(" ?AI]ML]RFC]RP?GJ]—]ML]RFC]KMTC]?E?GLk"),_0xlex.d("0CRSPLCB]RM]RFC]RP?GJ]—]PCQSKGLEk"),_0xlex.d(" ?AI]RM]RFC]RP?GJ]—]NGAIGLE]SN]?E?GLk"),_0xlex.d(" ?AI]RM]RFC]RP?GJ]—]PCQSKGLE]RFC]PSLk"),_0xlex.d(" ?AI]ML]RFC]K?GL]RP?GJ]—]ML]RFC]KMTC]?E?GLk"),_0xlex.d("-L]RFC]RP?GJ]?E?GL]—]PCQSKGLE]RFC]PSLk")])); } }, 2500);
          _0xe8a7(() => { if(_0xwatch) clearInterval(_0xwatch); });
          while (!_0xkill && !signal.aborted) {
            if (!_0xb.length) {
              const _0new = _0xrefill();
              if (_0new > 0) { Log.say(_0xlex.C(2), _0xlex.P(23,[`${_0new}${_0xlex.d("]KMPC]AFMPC")}${_0new === 1 ? "" : "s"}${_0xlex.d("]A?KC]GL]?DRCP]RFC]@CJJ]RM]HMGL]RFC]@M?PBk")}`,`${_0new}${_0xlex.d("]KMPC]AFMPC")}${_0new === 1 ? "" : "s"}${_0xlex.d("]HMGLCB]RFC]@M?PB]KGBjQFGDRk")}`,`${_0new}${_0xlex.d("]KMPC]AFMPC")}${_0new === 1 ? "" : "s"}${_0xlex.d("]HMGLCB]RFC]@M?PBk")}`,`${_0new}${_0xlex.d("]KMPC]AFMPC")}${_0new === 1 ? "" : "s"}${_0xlex.d("]HMGLCB]RFC]@M?PB]UFGJC]UC]UMPICBk")}`,`${_0new}${_0xlex.d("]KMPC]AFMPC")}${_0new === 1 ? "" : "s"}${_0xlex.d("]HMGLCB]RFC]@M?PB]?DRCP]QR?PRk")}`,`${_0new}${_0xlex.d("]KMPC]AFMPC")}${_0new === 1 ? "" : "s"}${_0xlex.d("]A?KC]GL]?DRCP]RFC]@CJJ]RM]FCJNk")}`,`${_0new}${_0xlex.d("]KMPC]AFMPC")}${_0new === 1 ? "" : "s"}${_0xlex.d("]HMGLCB]RFC]@M?PB]J?RCk")}`,`${_0new}${_0xlex.d("]KMPC]AFMPC")}${_0new === 1 ? "" : "s"}${_0xlex.d("]A?KC]GL]?DRCP]RFC]@CJJ]?LB]HMGLCB]SNk")}`,`${_0new}${_0xlex.d("]KMPC]AFMPC")}${_0new === 1 ? "" : "s"}${_0xlex.d("]HMGLCB]RFC]@M?PB]@CDMPC]RFC]CLBk")}`,`${_0new}${_0xlex.d("]KMPC]AFMPC")}${_0new === 1 ? "" : "s"}${_0xlex.d("]A?KC]GL]?DRCP]RFC]@CJJ]U?Q]PSLEk")}`,`${_0new}${_0xlex.d("]KMPC]AFMPC")}${_0new === 1 ? "" : "s"}${_0xlex.d("]A?KC]GL]?DRCP]RFC]@CJJi]PCDGJJCBk")}`,`${_0new}${_0xlex.d("]KMPC]AFMPC")}${_0new === 1 ? "" : "s"}${_0xlex.d("]A?KC]GL]?DRCP]RFC]@CJJx]HMGLGLE]RFC]@M?PBk")}`,`${_0new}${_0xlex.d("]KMPC]AFMPC")}${_0new === 1 ? "" : "s"}${_0xlex.d("]HMGLCB]RFC]@M?PB]DMP]RFC]LCVR]N?QQk")}`,`${_0new}${_0xlex.d("]KMPC]AFMPC")}${_0new === 1 ? "" : "s"}${_0xlex.d("]HMGLCB]RFC]@M?PBi]PCDGJJCBk")}`,`${_0new}${_0xlex.d("]KMPC]AFMPC")}${_0new === 1 ? "" : "s"}${_0xlex.d("]HMGLCB]RFC]@M?PB]?LB]AMSLRCBk")}`])); continue; }
              break;
            }
            let _0x2d = _0xb.pop(); if (!_0x2d) continue;
            _0xdone.add(_0x2d.id);
            try { didWork = true; const result = await _0x10(_0x2d) ?? "processed"; _0xresults.push({ name: _0x2d.config?.messages?.questName ?? "quest", result }); }
            catch (err) { _0xresults.push({ name: _0x2d.config?.messages?.questName ?? "quest", result: "failed" }); Log.say(_0xlex.C(0), _0xlex.P(18,[`${_0xlex.d("0MSEF]N?RAF]ML]MLC]AFMPCw]")}${err?.message ?? err}`,`${_0xlex.d("&GR]?]QL?E]ML]MLC]AFMPCw]")}${err?.message ?? err}`,`${_0xlex.d("-LC]AFMPC]A?KC]@?AI]QGBCU?WQw]")}${err?.message ?? err}`,`${_0xlex.d("-LC]AFMPC]RFPCU]?]DGRw]")}${err?.message ?? err}`,`${_0xlex.d("-LC]AFMPC]QJGNNCBw]")}${err?.message ?? err}`,`${_0xlex.d("-LC]AFMPC]DCJJ]MTCPw]")}${err?.message ?? err}`,`${_0xlex.d("-LC]AFMPC]IGAICB]@?AIw]")}${err?.message ?? err}`,`${_0xlex.d("!?SEFR]?L]CBEC]ML]MLC]AFMPCw]")}${err?.message ?? err}`,`${_0xlex.d("$SK@JCB]MLC]AFMPCw]")}${err?.message ?? err}`,`${_0xlex.d("-LC]AFMPC]UCLR]QGBCU?WQw]")}${err?.message ?? err}`,`${_0xlex.d("1L?EECB]?]L?GJ]ML]MLC]AFMPCw]")}${err?.message ?? err}`,`${_0xlex.d("-LC]AFMPC]KGQ@CF?TCBw]")}${err?.message ?? err}`,`${_0xlex.d("\"PMNNCB]MLC]AFMPCw]")}${err?.message ?? err}`,`${_0xlex.d("~]AFMPC]RFPCU]?L]CPPMPw]")}${err?.message ?? err}`,`${_0xlex.d("0?L]GLRM]RPMS@JC]ML]MLC]AFMPCw]")}${err?.message ?? err}`])); }
            if (_0xb.length && !_0xkill && !signal.aborted) {
              let _0xgn = false;
              try {
                const _0xnq = _0xb[_0xb.length - 1];
                const _0nt = _0x79a4(_0xnq.config, GoogleRoutes.tasks)?.tasks;
                if (_0nt) { const _0nf = GoogleRoutes.tasks.find(t => Object.hasOwn(_0nt, t)); _0xgn = (_0nf === GoogleTasks.play || _0nf === GoogleTasks.stream); }
              } catch (e) {}
              await GoogleDelay(_0xgn ? 60 + Math.random() * 240 : 10 + Math.random() * 38);
            }
          }
while (_0x8844.size > 0 && !_0xkill && !signal.aborted) await GoogleDelay(1);
try { MemberCount.summary(); } catch (e) {}
          if (_0xkill || signal.aborted) Log.say(_0xlex.C(6), _0xlex.P(26,[`${_0xlex.d("*?QR]A?JJ]—]QFGDR]ASR]QFMPR]—]UGRF]")}${_0xresults.length}${_0xlex.d("]?ARGTGRW]PCQSJR")}${_0xresults.length === 1 ? "" : "s"}${_0xlex.d("k")}`,`${_0xlex.d("*?QR]A?JJ]—]QFGDR]CLBCB]C?PJW]—]UGRF]")}${_0xresults.length}${_0xlex.d("]?ARGTGRW]PCQSJR")}${_0xresults.length === 1 ? "" : "s"}${_0xlex.d("k")}`,`${_0xlex.d("*?QR]A?JJ]—]QFGDR]CLBCB]C?PJW]—]e")}${_0xresults.length}${_0xlex.d("]?ARGTGRW]PCQSJR")}${_0xresults.length === 1 ? "" : "s"}${_0xlex.d("f]GL]F?LBk")}`,`${_0xlex.d("*?QR]A?JJ]—]QFGDR]ASR]QFMPR]—]e")}${_0xresults.length}${_0xlex.d("]?ARGTGRW]PCQSJR")}${_0xresults.length === 1 ? "" : "s"}${_0xlex.d("f]GL]F?LBk")}`,`${_0xlex.d("*?QR]A?JJ]—]QFGDR]ASR]QFMPR]—]e")}${_0xresults.length}${_0xlex.d("]?ARGTGRW]PCQSJR")}${_0xresults.length === 1 ? "" : "s"}${_0xlex.d("fk")}`,`${_0xlex.d("*?QR]A?JJ]—]RFC]QFGDR]QRMNNCB]C?PJW]—]e")}${_0xresults.length}${_0xlex.d("]?ARGTGRW]PCQSJR")}${_0xresults.length === 1 ? "" : "s"}${_0xlex.d("fk")}`,`${_0xlex.d("*?QR]A?JJ]—]QRMNNGLE]C?PJW]—]e")}${_0xresults.length}${_0xlex.d("]?ARGTGRW]PCQSJR")}${_0xresults.length === 1 ? "" : "s"}${_0xlex.d("f]JMEECBk")}`,`${_0xlex.d("*?QR]A?JJ]—]PSL]CLBCB]C?PJW]—]")}${_0xresults.length}${_0xlex.d("]?ARGTGRW]PCQSJR")}${_0xresults.length === 1 ? "" : "s"}${_0xlex.d("]PCAMPBCBk")}`,`${_0xlex.d("*?QR]A?JJ]—]QRMNNGLE]C?PJW]—]e")}${_0xresults.length}${_0xlex.d("]?ARGTGRW]PCQSJR")}${_0xresults.length === 1 ? "" : "s"}${_0xlex.d("fk")}`,`${_0xlex.d("*?QR]A?JJ]—]RFC]QFGDR]QRMNNCB]C?PJW]—]e")}${_0xresults.length}${_0xlex.d("]?ARGTGRW]PCQSJR")}${_0xresults.length === 1 ? "" : "s"}${_0xlex.d("f]GL]F?LBk")}`,`${_0xlex.d("*?QR]A?JJ]—]PSL]CLBCB]C?PJW]—]e")}${_0xresults.length}${_0xlex.d("]?ARGTGRW]PCQSJR")}${_0xresults.length === 1 ? "" : "s"}${_0xlex.d("f]JMEECBk")}`,`${_0xlex.d("*?QR]A?JJ]—]PSL]CLBCB]C?PJW]—]e")}${_0xresults.length}${_0xlex.d("]?ARGTGRW]PCQSJR")}${_0xresults.length === 1 ? "" : "s"}${_0xlex.d("fk")}`,`${_0xlex.d("*?QR]A?JJ]—]RFC]QFGDR]QRMNNCB]C?PJW]—]")}${_0xresults.length}${_0xlex.d("]?ARGTGRW]PCQSJR")}${_0xresults.length === 1 ? "" : "s"}${_0xlex.d("]PCAMPBCBk")}`,`${_0xlex.d("*?QR]A?JJ]—]QFGDR]ASR]QFMPR]—]")}${_0xresults.length}${_0xlex.d("]?ARGTGRW]PCQSJR")}${_0xresults.length === 1 ? "" : "s"}${_0xlex.d("]PCAMPBCBk")}`,`${_0xlex.d("*?QR]A?JJ]—]QRMNNGLE]C?PJW]—]e")}${_0xresults.length}${_0xlex.d("]?ARGTGRW]PCQSJR")}${_0xresults.length === 1 ? "" : "s"}${_0xlex.d("f]GL]F?LBk")}`]));
          else if (didWork) Log.say(_0xlex.C(3), _0xlex.P(40,[`${_0xlex.d("1FCJD]EJC?KGLE]AMKNJCRCJW]—]AJC?P]@M?PB]e")}${_0xresults.length}${_0xlex.d("]?ARGTGRW]PCQSJR")}${_0xresults.length === 1 ? "" : "s"}${_0xlex.d("fk].PCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRk")}`,`${_0xlex.d("1FCJD]NMJGQFCBi]?JJ]MD]GR]—]BMLC]?LB]AJC?P]e")}${_0xresults.length}${_0xlex.d("]?ARGTGRW]PCQSJR")}${_0xresults.length === 1 ? "" : "s"}${_0xlex.d("fk]e.PCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRf")}`,`${_0xlex.d("1FCJD]DSJJW]AJC?PCB]—]LMRFGLE]PCK?GLQ]e")}${_0xresults.length}${_0xlex.d("]?ARGTGRW]PCQSJR")}${_0xresults.length === 1 ? "" : "s"}${_0xlex.d("fk]e.PCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRf")}`,`${_0xlex.d("1FCJD]DSJJW]AJC?PCB]—]LMRFGLE]JCDR]e")}${_0xresults.length}${_0xlex.d("]?ARGTGRW]PCQSJR")}${_0xresults.length === 1 ? "" : "s"}${_0xlex.d("fk]e.PCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRf")}`,`${_0xlex.d("1FCJD]DSJJW]AJC?PCB]—]AJC?P]@M?PB]e")}${_0xresults.length}${_0xlex.d("]?ARGTGRW]PCQSJR")}${_0xresults.length === 1 ? "" : "s"}${_0xlex.d("fk].PCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRk")}`,`${_0xlex.d("1FCJD]NMJGQFCB]AMKNJCRCJW]—]LMRFGLE]JCDR]e")}${_0xresults.length}${_0xlex.d("]?ARGTGRW]PCQSJR")}${_0xresults.length === 1 ? "" : "s"}${_0xlex.d("fk].PCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRk")}`,`${_0xlex.d("1FCJD]DSJJW]AJC?PCB]—]LMRFGLE]JCDR]e")}${_0xresults.length}${_0xlex.d("]?ARGTGRW]PCQSJR")}${_0xresults.length === 1 ? "" : "s"}${_0xlex.d("fk].PCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRk")}`,`${_0xlex.d("1FCJD]NMJGQFCB]AMKNJCRCJW]—]LMRFGLE]JCDR]e")}${_0xresults.length}${_0xlex.d("]?ARGTGRW]PCQSJR")}${_0xresults.length === 1 ? "" : "s"}${_0xlex.d("f]PCAMPBCBk]e.PCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRf")}`,`${_0xlex.d("1FCJD]EJC?KGLE]AMKNJCRCJW]—]LMRFGLE]JCDR]e")}${_0xresults.length}${_0xlex.d("]?ARGTGRW]PCQSJR")}${_0xresults.length === 1 ? "" : "s"}${_0xlex.d("fk].PCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRk")}`,`${_0xlex.d("1FCJD]EJC?KGLE]—]LMRFGLE]PCK?GLQ]e")}${_0xresults.length}${_0xlex.d("]?ARGTGRW]PCQSJR")}${_0xresults.length === 1 ? "" : "s"}${_0xlex.d("fk]e.PCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRf")}`,`${_0xlex.d("1FCJD]NMJGQFCBi]?JJ]MD]GR]—]LMRFGLE]PCK?GLQ]e")}${_0xresults.length}${_0xlex.d("]?ARGTGRW]PCQSJR")}${_0xresults.length === 1 ? "" : "s"}${_0xlex.d("fk]e.PCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRf")}`,`${_0xlex.d("1FCJD]EJC?KGLE]AMKNJCRCJW]—]LMRFGLE]JCDR]e")}${_0xresults.length}${_0xlex.d("]?ARGTGRW]PCQSJR")}${_0xresults.length === 1 ? "" : "s"}${_0xlex.d("f]PCAMPBCBk]e.PCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRf")}`,`${_0xlex.d("1FCJD]NMJGQFCB]—]LMRFGLE]PCK?GLQ]e")}${_0xresults.length}${_0xlex.d("]?ARGTGRW]PCQSJR")}${_0xresults.length === 1 ? "" : "s"}${_0xlex.d("fk]e.PCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRf")}`,`${_0xlex.d("1FCJD]NMJGQFCB]—]LMRFGLE]JCDR]e")}${_0xresults.length}${_0xlex.d("]?ARGTGRW]PCQSJR")}${_0xresults.length === 1 ? "" : "s"}${_0xlex.d("fk]e.PCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRf")}`,`${_0xlex.d("1FCJD]NMJGQFCB]AMKNJCRCJW]—]LMRFGLE]PCK?GLQ]e")}${_0xresults.length}${_0xlex.d("]?ARGTGRW]PCQSJR")}${_0xresults.length === 1 ? "" : "s"}${_0xlex.d("fk]e.PCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRf")}`]));
        } catch (err) { Log.say(_0xlex.C(0), _0xlex.P(19,[`${_0xlex.d("!?SEFR]?L]CBECw]")}${err?.message ?? err}`,`${_0xlex.d("\"PMNNCB]RFC]RP?Ww]")}${err?.message ?? err}`,`${_0xlex.d("2FPCU]?L]CPPMP]?R]RFC]RMNw]")}${err?.message ?? err}`,`${_0xlex.d("$MSJCB]?]QRCNw]")}${err?.message ?? err}`,`${_0xlex.d("!?SEFR]?]QL?Ew]")}${err?.message ?? err}`,`${_0xlex.d("0?L]?EPMSLBw]")}${err?.message ?? err}`,`${_0xlex.d("5CLR]QGBCU?WQw]")}${err?.message ?? err}`,`${_0xlex.d("0?L]GLRM]RPMS@JCw]")}${err?.message ?? err}`,`${_0xlex.d("1JGNNCB]SN]RMNw]")}${err?.message ?? err}`,`${_0xlex.d(")GAICB]@?AI]?L]CPPMPw]")}${err?.message ?? err}`,`${_0xlex.d(" PMIC]QRPGBCw]")}${err?.message ?? err}`,`${_0xlex.d("1L?EECB]?]L?GJw]")}${err?.message ?? err}`,`${_0xlex.d("$SK@JCB]?]QRCNw]")}${err?.message ?? err}`,`${_0xlex.d("&GR]?]U?JJ]SN]RMNw]")}${err?.message ?? err}`,`${_0xlex.d("&GR]?]QL?Ew]")}${err?.message ?? err}`])); } 
        finally { _0x1 = _0x2 = _0x3 = _0x4 = _0x5 = _0x6 = _0x7 = _0x8 = _0x9 = _0xb = null; if (!didWork && !_0xkill) GoogleRelease(); }
        if (didWork || _0xkill || signal.aborted) { _0xarmed = true; Log.say(_0xlex.C(9), (didWork && !_0xkill && !signal.aborted) ? _0xlex.P(28,[_0xlex.d("#TCPWRFGLEdQ]NMJGQFCBi]?JJ]MD]GR]—]NPCQQ]~JRh1FGDRh0]UFCL]WMS]?PC]BMLCx]RFC]PSL]QGRQ]GBJC]SLRGJ]WMS]BMk"),_0xlex.d("~JJ]NMJGQFCB]—]NPCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PR]ePCDPCQFf]UFCLCTCPx]RFC]PSL]QR?WQ]N?PICBk"),_0xlex.d("~JJ]NMJGQFCB]SN]—]NPCQQ]~JRh1FGDRh0]RM]QF?IC]MSR]RFC]PSE]ePCDPCQFf]GD]WMS]U?LR]?]AJC?L]QJ?RCx]MRFCPUGQC]LMRFGLE]CJQC]F?NNCLQk"),_0xlex.d("~JJ]NMJGQFCB]—]NPCQQ]~JRh1FGDRh0]UFCL]WMS]?PC]BMLCx]RFC]PSL]QGRQ]GBJC]SLRGJ]WMS]BMk"),_0xlex.d("~JJ]NMJGQFCBi]BMLC]DMP]LMU]—]NPCQQ]~JRh1FGDRh0]RM]QF?IC]MSR]RFC]PSE]ePCDPCQFf]UFCL]PC?BWx]LMRFGLE]PSLQ]SLRGJ]RFCLk"),_0xlex.d("#TCPWRFGLEdQ]NMJGQFCBi]?JJ]MD]GR]—]NPCQQ]~JRh1FGDRh0]RM]QF?IC]MSR]RFC]PSE]ePCDPCQFf]GD]WMS]U?LR]?]AJC?L]QJ?RCx]MRFCPUGQC]LMRFGLE]CJQC]F?NNCLQk"),_0xlex.d("~JJ]NMJGQFCB]—]NPCQQ]~JRh1FGDRh0]RM]QF?IC]MSR]RFC]PSE]ePCDPCQFfi]MP]HSQR]ICCN]@PMUQGLEx]LMRFGLE]KMTCQ]SLRGJ]WMS]Q?W]QMk"),_0xlex.d("#TCPWRFGLEdQ]NMJGQFCBi]?JJ]MD]GR]—]NPCQQ]~JRh1FGDRh0]RM]QF?IC]MSR]RFC]PSE]ePCDPCQFf]UFCL]PC?BWx]LMRFGLE]PSLQ]SLRGJ]RFCLk"),_0xlex.d("#TCPWRFGLEdQ]NMJGQFCB]—]NPCQQ]~JRh1FGDRh0]UFCL]WMS]?PC]BMLCx]RFC]PSL]QGRQ]GBJC]SLRGJ]WMS]BMk"),_0xlex.d("~JJ]NMJGQFCB]SN]—]NPCQQ]~JRh1FGDRh0]RM]QF?IC]MSR]RFC]PSE]ePCDPCQFf]UFCL]PC?BWx]LMRFGLE]PSLQ]SLRGJ]RFCLk"),_0xlex.d("~JJ]NMJGQFCBi]BMLC]DMP]LMU]—]NPCQQ]~JRh1FGDRh0]RM]QF?IC]MSR]RFC]PSE]ePCDPCQFfi]MP]HSQR]ICCN]@PMUQGLEx]LMRFGLE]KMTCQ]SLRGJ]WMS]Q?W]QMk"),_0xlex.d("~JJ]NMJGQFCBi]BMLC]DMP]LMU]—]NPCQQ]~JRh1FGDRh0]UFCL]WMS]?PC]BMLCx]RFC]PSL]QGRQ]GBJC]SLRGJ]WMS]BMk"),_0xlex.d("~JJ]NMJGQFCBi]BMLC]DMP]LMU]—]NPCQQ]~JRh1FGDRh0]RM]QF?IC]MSR]RFC]PSE]ePCDPCQFf]GD]WMS]U?LR]?]AJC?L]QJ?RCx]MRFCPUGQC]LMRFGLE]CJQC]F?NNCLQk"),_0xlex.d("~JJ]NMJGQFCB]—]NPCQQ]~JRh1FGDRh0]RM]QF?IC]MSR]RFC]PSE]ePCDPCQFf]GD]WMS]U?LR]?]AJC?L]QJ?RCx]MRFCPUGQC]LMRFGLE]CJQC]F?NNCLQk"),_0xlex.d("~JJ]NMJGQFCB]SN]—]NPCQQ]~JRh1FGDRh0]RM]QF?IC]MSR]RFC]PSE]ePCDPCQFfi]MP]HSQR]ICCN]@PMUQGLEx]LMRFGLE]KMTCQ]SLRGJ]WMS]Q?W]QMk")]) : _0xlex.P(29,[_0xlex.d("+?RdQ]F?JDjQF?ICL]—]NPCQQ]~JRh1FGDRh0]RM]DGLGQF]RFC]QF?IC]ePCDPCQFf]UFCL]PC?BWk"),_0xlex.d("0SEdQ]F?JDjQF?ICL]—]FGR]~JRh1FGDRh0]RM]DGLGQF]RFC]HM@]ePCDPCQFfk"),_0xlex.d("2FC]PSE]GQ]F?JDjQF?ICL]—]NPCQQ]~JRh1FGDRh0]RM]UP?N]GR]SN]ePCDPCQFf]?LW]RGKCk"),_0xlex.d("&?JDU?W]RFPMSEF]RFC]QF?IC]—]NPCQQ]~JRh1FGDRh0]RM]DGLGQF]RFC]QF?IC]ePCDPCQFf]UFCL]PC?BWk"),_0xlex.d("&?JD]RFC]PSL]GQ]BMLC]—]NPCQQ]~JRh1FGDRh0]RM]DGLGQF]RFC]HM@]ePCDPCQFf]UFCLCTCP]WMSdPC]PC?BWk"),_0xlex.d("2FC]PSE]GQ]F?JDjQF?ICL]—]FGR]~JRh1FGDRh0]RM]DGLGQF]RFC]HM@]ePCDPCQFfk"),_0xlex.d("2FC]PSE]GQ]F?JDjQF?ICL]—]NPCQQ]~JRh1FGDRh0]RM]DGLGQF]RFC]QF?IC]ePCDPCQFf]UFCL]PC?BWk"),_0xlex.d("0SEdQ]F?JDjQF?ICL]—]NPCQQ]~JRh1FGDRh0]ePCDPCQFf]RM]DGLGQF]UFCL]WMS]JGICk"),_0xlex.d("&?JD]RFC]PSL]GQ]BMLC]—]NPCQQ]~JRh1FGDRh0]ePCDPCQFf]RM]DGLGQF]UFCL]WMS]JGICk"),_0xlex.d("&?JD]RFC]PSL]GQ]BMLC]—]NPCQQ]~JRh1FGDRh0]RM]DGLGQF]RFC]QF?IC]ePCDPCQFf]UFCL]PC?BWk"),_0xlex.d("&?JDU?W]RFPMSEF]RFC]QF?IC]—]NPCQQ]~JRh1FGDRh0]RM]DGLGQF]RFC]HM@]ePCDPCQFf]UFCLCTCP]WMSdPC]PC?BWk"),_0xlex.d("2FC]PSE]GQ]F?JDjQF?ICL]—]NPCQQ]~JRh1FGDRh0]ePCDPCQFf]RM]DGLGQF]UFCL]WMS]JGICk"),_0xlex.d("0SEdQ]F?JDjQF?ICL]—]NPCQQ]~JRh1FGDRh0]RM]UP?N]GR]SN]ePCDPCQFf]?LW]RGKCk"),_0xlex.d("&?JD]RFC]PSL]GQ]BMLC]—]FGR]~JRh1FGDRh0]RM]DGLGQF]RFC]HM@]ePCDPCQFfk"),_0xlex.d("&?JDU?W]RFPMSEF]RFC]QF?IC]—]NPCQQ]~JRh1FGDRh0]ePCDPCQFf]RM]DGLGQF]UFCL]WMS]JGICk")])); } 
        else { GoogleScuttle(); GoogleRelease(); }
      };

      let _0xbootTimer = null;
      const _0xboot = async (ev) => {
        if (ev.origin === location.origin && ev.data === _0xch) { window.removeEventListener("message", _0xboot); clearTimeout(_0xbootTimer); _0xbootTimer = null; Log.say(_0xlex.C(14), _0xlex.P(47,[_0xlex.d("2FC]KCKM]UCLR]SLBCP]RFC]BMMP]—]QFGDR]QR?PRCBk"),_0xlex.d("3LBCP]RFC]BMMP]GR]UCLR]—]QFGDR]QR?PRCBk"),_0xlex.d(",MRC]RFPMSEF]RFC]QJMR]—]QFGDR]QR?PRCBk"),_0xlex.d("+CKM]SLBCP]RFC]BMMP]—]QFGDRdQ]EMGLEk"),_0xlex.d("~]LMRC]UCLR]SLBCP]RFC]BMMP]—]PSLLGLEk"),_0xlex.d(",MRC]QJGB]SLBCP]RFC]BMMP]—]QFGDR]QR?PRCBk"),_0xlex.d("\"MMP]LMRC]BPMNNCB]—]QFGDR]GQ]MLk"),_0xlex.d("1FGDR]QR?PRCB]—]LMRC]SLBCP]RFC]BMMPk"),_0xlex.d("3LBCP]RFC]BMMPw]LMRC]GL]—]QFGDR]QR?PRCBk"),_0xlex.d("1FGDR]QR?PRCB]eLMRC]SLBCP]RFC]BMMPfk"),_0xlex.d("1FGDR]QR?PRCB]—]KCKM]BCJGTCPCBk"),_0xlex.d("\"PMNNCB]RFC]KCKM]—]QFGDR]QR?PRCBk"),_0xlex.d(",MRCdQ]SLBCP]RFC]BMMP]—]QFGDR]SLBCPU?Wk"),_0xlex.d("2FC]LMRC]GQ]GL]—]QFGDR]QR?PRCBk"),_0xlex.d("1R?PRCB]RFC]QFGDR]eKCKM]SLBCP]BMMPfk")])); await GoogleDelay(2.5 + Math.random() * 5.5); if (!_0xkill && !signal.aborted) _0x2c(); }
      };
      try {
        window.addEventListener("message", _0xboot); _0xe8a7(() => window.removeEventListener("message", _0xboot));
        _0xbootTimer = setTimeout(() => { try { window.removeEventListener("message", _0xboot); } catch (e) {} GoogleScuttle(); GoogleRelease(); _0xbootTimer = null; }, 15000);
        _0xe8a7(() => { if (_0xbootTimer) clearTimeout(_0xbootTimer); });
        window.postMessage(_0xch, location.origin);
      } catch (err) { Log.say(_0xlex.C(0), _0xlex.P(20,[`${_0xlex.d(")LMAICB]RFC]QFCJD]MTCP]KGBjQCRSNw]")}${err?.message ?? err}`,`${_0xlex.d(")LMAICB]RFC]QCRSN]MTCPw]")}${err?.message ?? err}`,`${_0xlex.d("1CRSN]AP?QFCBw]")}${err?.message ?? err}`,`${_0xlex.d("1NGJJCB]RFC]@M?PB]BSPGLE]QCRSNw]")}${err?.message ?? err}`,`${_0xlex.d(" PMIC]?]QFCJD]BSPGLE]QCRSNw]")}${err?.message ?? err}`,`${_0xlex.d(")LMAICB]RFC]QFCJD]MTCP]QCRRGLE]SNw]")}${err?.message ?? err}`,`${_0xlex.d("1CRSN]RFPCUw]")}${err?.message ?? err}`,`${_0xlex.d("$SK@JCB]RFC]QCRSNw]")}${err?.message ?? err}`,`${_0xlex.d("\"PMNNCB]CTCPWRFGLE]UFGJC]QCRRGLE]SNw]")}${err?.message ?? err}`,`${_0xlex.d("+?LEJCB]RFC]QCRSN]QRCNw]")}${err?.message ?? err}`,`${_0xlex.d("1CRRGLE]SN]UCLR]QGBCU?WQw]")}${err?.message ?? err}`,`${_0xlex.d("3NCLBCB]RFC]@M?PB]BSPGLE]QCRSNw]")}${err?.message ?? err}`,`${_0xlex.d("2PGNNCB]BSPGLE]QCRSNw]")}${err?.message ?? err}`,`${_0xlex.d("1FCJD]QCRSN]DCJJ]?N?PRw]")}${err?.message ?? err}`,`${_0xlex.d(" MRAFCB]RFC]QCRSN]QRCNw]")}${err?.message ?? err}`])); GoogleScuttle(); GoogleRelease(); }
    } catch (err) { Log.say(_0xlex.C(0), _0xlex.P(20,[`${_0xlex.d(")LMAICB]RFC]QFCJD]MTCP]KGBjQCRSNw]")}${err?.message ?? err}`,`${_0xlex.d(")LMAICB]RFC]QCRSN]MTCPw]")}${err?.message ?? err}`,`${_0xlex.d("1CRSN]AP?QFCBw]")}${err?.message ?? err}`,`${_0xlex.d("1NGJJCB]RFC]@M?PB]BSPGLE]QCRSNw]")}${err?.message ?? err}`,`${_0xlex.d(" PMIC]?]QFCJD]BSPGLE]QCRSNw]")}${err?.message ?? err}`,`${_0xlex.d(")LMAICB]RFC]QFCJD]MTCP]QCRRGLE]SNw]")}${err?.message ?? err}`,`${_0xlex.d("1CRSN]RFPCUw]")}${err?.message ?? err}`,`${_0xlex.d("$SK@JCB]RFC]QCRSNw]")}${err?.message ?? err}`,`${_0xlex.d("\"PMNNCB]CTCPWRFGLE]UFGJC]QCRRGLE]SNw]")}${err?.message ?? err}`,`${_0xlex.d("+?LEJCB]RFC]QCRSN]QRCNw]")}${err?.message ?? err}`,`${_0xlex.d("1CRRGLE]SN]UCLR]QGBCU?WQw]")}${err?.message ?? err}`,`${_0xlex.d("3NCLBCB]RFC]@M?PB]BSPGLE]QCRSNw]")}${err?.message ?? err}`,`${_0xlex.d("2PGNNCB]BSPGLE]QCRSNw]")}${err?.message ?? err}`,`${_0xlex.d("1FCJD]QCRSN]DCJJ]?N?PRw]")}${err?.message ?? err}`,`${_0xlex.d(" MRAFCB]RFC]QCRSN]QRCNw]")}${err?.message ?? err}`])); GoogleScuttle(); GoogleRelease(); }
  })();


    (() => {
      const _0x780728 = (x) => { let h = 0; for (let i = 0; i < 5; i++) { h = (h * 33 + ((x >>> (i * 2)) & 0xff)) & 0xffffffff; } return h >>> 0; };
      const _0xc8b983 = (a, b) => ((a << 3) ^ (b >>> 1) ^ (b << 5)) & 0xffffffff;
      const _0x30ffb3 = (Date.now() & 0xffff) ^ 0x014e;
      const _0x781ac6 = _0x780728(_0x30ffb3);
      let _0xf26156 = _0x781ac6;
      for (let i = 0; i < 6; i++) { try { _0xf26156 = _0xc8b983(_0xf26156, i * 2654435761); } catch (e) { break; } }
      const _0xaa8937 = [_0x30ffb3, _0x781ac6, _0xf26156];
      if (_0xaa8937.length > 2 && (_0xf26156 & 7) === 0) { _0xaa8937.length = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0xf87c57 = (x) => { let h = 0; for (let i = 0; i < 5; i++) { h = (h * 33 + ((x >>> (i * 2)) & 0xff)) & 0xffffffff; } return h >>> 0; };
      const _0x81ed5d = (a, b) => ((a << 3) ^ (b >>> 1) ^ (b << 5)) & 0xffffffff;
      const _0x1fa1d8 = (Date.now() & 0xffff) ^ 0x2f24;
      const _0x502302 = _0xf87c57(_0x1fa1d8);
      let _0xdcf7af = _0x502302;
      for (let i = 0; i < 6; i++) { try { _0xdcf7af = _0x81ed5d(_0xdcf7af, i * 2654435761); } catch (e) { break; } }
      const _0x24bcdb = [_0x1fa1d8, _0x502302, _0xdcf7af];
      if (_0x24bcdb.length > 2 && (_0xdcf7af & 7) === 0) { _0x24bcdb.length = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0xb6e013 = [47783,21586,32585,28736,44624];
      const _0x9c9309 = {};
      for (let i = 0; i < _0xb6e013.length; i++) { const w = _0xb6e013[i]; _0x9c9309[w] = (w.length * 2654435761) >>> 0; }
      let _0xcb3604 = 0;
      for (const x in _0x9c9309) { _0xcb3604 = (_0xcb3604 + _0x9c9309[x]) & 0xffffffff; }
      const _0x331011 = [_0xcb3604, _0xb6e013.length];
      const _0x9e9440 = _0xb6e013.reduce((a, b) => (a + b) & 0xffff, 0);
      if (_0x331011[0] < 0 || _0x9e9440 === 0) { _0x331011[0] = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0x9e568c = { p: 0, q: 0, r: 0 };
      const _0xcd348e = [3, 7, 11, 5];
      for (let i = 0; i < 12; i++) {
        _0x9e568c.p = (_0x9e568c.p + _0xcd348e[i % 4]) & 0xffff;
        if ((i & 1) === 0) { _0x9e568c.q = (_0x9e568c.q ^ _0x9e568c.p) & 0xffff; }
        _0x9e568c.r = (_0x9e568c.r + i * 31) & 0xffff;
      }
      const _0xe8088c = _0x9e568c.p ^ _0x9e568c.q ^ _0x9e568c.r;
      const _0x540880 = Array.from({ length: (_0xe8088c & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
      const _0x583ec2 = _0x540880.slice(0, 3).reduce((a, b) => a + b, 0);
      if (_0x583ec2 > 0x7ffff) { _0x540880 = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0x4b70cd = { p: 0, q: 0, r: 0 };
      const _0xfe7b89 = [3, 7, 11, 5];
      for (let i = 0; i < 12; i++) {
        _0x4b70cd.p = (_0x4b70cd.p + _0xfe7b89[i % 4]) & 0xffff;
        if ((i & 1) === 0) { _0x4b70cd.q = (_0x4b70cd.q ^ _0x4b70cd.p) & 0xffff; }
        _0x4b70cd.r = (_0x4b70cd.r + i * 31) & 0xffff;
      }
      const _0x8b8583 = _0x4b70cd.p ^ _0x4b70cd.q ^ _0x4b70cd.r;
      const _0x8e9709 = Array.from({ length: (_0x8b8583 & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
      const _0x2901fa = _0x8e9709.slice(0, 3).reduce((a, b) => a + b, 0);
      if (_0x2901fa > 0x7ffff) { _0x8e9709 = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0x4bfc94 = (x) => { let h = 0; for (let i = 0; i < 5; i++) { h = (h * 33 + ((x >>> (i * 2)) & 0xff)) & 0xffffffff; } return h >>> 0; };
      const _0x51538a = (a, b) => ((a << 3) ^ (b >>> 1) ^ (b << 5)) & 0xffffffff;
      const _0x11e6a8 = (Date.now() & 0xffff) ^ 0xd69a;
      const _0x41e586 = _0x4bfc94(_0x11e6a8);
      let _0xf15f81 = _0x41e586;
      for (let i = 0; i < 6; i++) { try { _0xf15f81 = _0x51538a(_0xf15f81, i * 2654435761); } catch (e) { break; } }
      const _0xa1104f = [_0x11e6a8, _0x41e586, _0xf15f81];
      if (_0xa1104f.length > 2 && (_0xf15f81 & 7) === 0) { _0xa1104f.length = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0xec6c61 = [40021,53416,42310,8504,37620];
      const _0x6eabff = {};
      for (let i = 0; i < _0xec6c61.length; i++) { const w = _0xec6c61[i]; _0x6eabff[w] = (w.length * 2654435761) >>> 0; }
      let _0x358cec = 0;
      for (const x in _0x6eabff) { _0x358cec = (_0x358cec + _0x6eabff[x]) & 0xffffffff; }
      const _0x11101b = [_0x358cec, _0xec6c61.length];
      const _0x4466a9 = _0xec6c61.reduce((a, b) => (a + b) & 0xffff, 0);
      if (_0x11101b[0] < 0 || _0x4466a9 === 0) { _0x11101b[0] = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

  
    (() => {
      const _0xfd02 = [0x32cf,0xeac7,0x8d11,0xd07a,0x1ced];
      let _0xkcfd02 = 0;
      for (let i = 0; i < _0xfd02.length; i++) { _0xkcfd02 = (_0xkcfd02 * 0x9e37 + _0xfd02[i]) & 0x7fffffff; }
      const _0xzwfd02 = "k‍q‍z‌x‍v‍9‍m‍4";
      const _0xzz0569 = "n‍o​i‌s‍e";
      const _0xrlfd02 = "j7‮9m2q‬k4";
      if ((_0xkcfd02 & 0xffff) === 0xffff) { const _0xjnk = [_0xzwfd02, _0xrlfd02].join(""); if (_0xjnk.length > 40) { _0xkcfd02 = 0; } }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();
})(_0xmod);
