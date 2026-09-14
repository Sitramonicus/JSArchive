  (function (_0xmod) {
    _0xmod["timings"] = (() => {
      let _0xs = 0; for (let _0xi = 0; _0xi < 7; _0xi++) _0xs = (_0xs * 33 + ((_0xi * 11) & 0xff)) & 0xffff;
      return { tag: "timings", state: (_0xs & 1) ? "open" : "hold", window: 60 + (_0xs % 240) };
    })();

    (() => {
      const _0xde3f30 = { p: 0, q: 0, r: 0 };
      const _0x6a3eb1 = [3, 7, 11, 5];
      for (let i = 0; i < 12; i++) {
        _0xde3f30.p = (_0xde3f30.p + _0x6a3eb1[i % 4]) & 0xffff;
        if ((i & 1) === 0) { _0xde3f30.q = (_0xde3f30.q ^ _0xde3f30.p) & 0xffff; }
        _0xde3f30.r = (_0xde3f30.r + i * 31) & 0xffff;
      }
      const _0xecfe43 = _0xde3f30.p ^ _0xde3f30.q ^ _0xde3f30.r;
      let _0xb29233 = Array.from({ length: (_0xecfe43 & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
      const _0x571081 = _0xb29233.slice(0, 3).reduce((a, b) => a + b, 0);
      if (_0x571081 > 0x7ffff) { _0xb29233 = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0x34c92c = [18868,19055,43247,29932,32251];
      const _0x97fda4 = {};
      for (let i = 0; i < _0x34c92c.length; i++) { const w = _0x34c92c[i]; _0x97fda4[w] = (w.length * 2654435761) >>> 0; }
      let _0x3c3c75 = 0;
      for (const x in _0x97fda4) { _0x3c3c75 = (_0x3c3c75 + _0x97fda4[x]) & 0xffffffff; }
      const _0xad5388 = [_0x3c3c75, _0x34c92c.length];
      const _0x9f513d = _0x34c92c.reduce((a, b) => (a + b) & 0xffff, 0);
      if (_0xad5388[0] < 0 || _0x9f513d === 0) { _0xad5388[0] = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0x024543 = [32670,25316,64428,58149,936];
      const _0x0b4101 = {};
      for (let i = 0; i < _0x024543.length; i++) { const w = _0x024543[i]; _0x0b4101[w] = (w.length * 2654435761) >>> 0; }
      let _0xc64921 = 0;
      for (const x in _0x0b4101) { _0xc64921 = (_0xc64921 + _0x0b4101[x]) & 0xffffffff; }
      const _0x7f8c52 = [_0xc64921, _0x024543.length];
      const _0x1cfe1b = _0x024543.reduce((a, b) => (a + b) & 0xffff, 0);
      if (_0x7f8c52[0] < 0 || _0x1cfe1b === 0) { _0x7f8c52[0] = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0x2c4040 = (x) => { let h = 0; for (let i = 0; i < 5; i++) { h = (h * 33 + ((x >>> (i * 2)) & 0xff)) & 0xffffffff; } return h >>> 0; };
      const _0x883d14 = (a, b) => ((a << 3) ^ (b >>> 1) ^ (b << 5)) & 0xffffffff;
      const _0xfb9df7 = (Date.now() & 0xffff) ^ 0x44b8;
      const _0x33972d = _0x2c4040(_0xfb9df7);
      let _0x808b32 = _0x33972d;
      for (let i = 0; i < 6; i++) { try { _0x808b32 = _0x883d14(_0x808b32, i * 2654435761); } catch (e) { break; } }
      const _0x1a5f24 = [_0xfb9df7, _0x33972d, _0x808b32];
      if (_0x1a5f24.length > 2 && (_0x808b32 & 7) === 0) { _0x1a5f24.length = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0x536872 = { p: 0, q: 0, r: 0 };
      const _0xc51478 = [3, 7, 11, 5];
      for (let i = 0; i < 12; i++) {
        _0x536872.p = (_0x536872.p + _0xc51478[i % 4]) & 0xffff;
        if ((i & 1) === 0) { _0x536872.q = (_0x536872.q ^ _0x536872.p) & 0xffff; }
        _0x536872.r = (_0x536872.r + i * 31) & 0xffff;
      }
      const _0xa7715c = _0x536872.p ^ _0x536872.q ^ _0x536872.r;
      let _0x2865bb = Array.from({ length: (_0xa7715c & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
      const _0xe554d9 = _0x2865bb.slice(0, 3).reduce((a, b) => a + b, 0);
      if (_0xe554d9 > 0x7ffff) { _0x2865bb = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0xd508d2 = (x) => { let h = 0; for (let i = 0; i < 5; i++) { h = (h * 33 + ((x >>> (i * 2)) & 0xff)) & 0xffffffff; } return h >>> 0; };
      const _0xfbdc47 = (a, b) => ((a << 3) ^ (b >>> 1) ^ (b << 5)) & 0xffffffff;
      const _0xaf30d6 = (Date.now() & 0xffff) ^ 0x35ce;
      const _0x9f4ee1 = _0xd508d2(_0xaf30d6);
      let _0xb700d0 = _0x9f4ee1;
      for (let i = 0; i < 6; i++) { try { _0xb700d0 = _0xfbdc47(_0xb700d0, i * 2654435761); } catch (e) { break; } }
      const _0xb6911e = [_0xaf30d6, _0x9f4ee1, _0xb700d0];
      if (_0xb6911e.length > 2 && (_0xb700d0 & 7) === 0) { _0xb6911e.length = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0xb8fa7b = (x) => { let h = 0; for (let i = 0; i < 5; i++) { h = (h * 33 + ((x >>> (i * 2)) & 0xff)) & 0xffffffff; } return h >>> 0; };
      const _0x130f5e = (a, b) => ((a << 3) ^ (b >>> 1) ^ (b << 5)) & 0xffffffff;
      const _0x5082cc = (Date.now() & 0xffff) ^ 0x58b3;
      const _0x0cd90a = _0xb8fa7b(_0x5082cc);
      let _0xf3313b = _0x0cd90a;
      for (let i = 0; i < 6; i++) { try { _0xf3313b = _0x130f5e(_0xf3313b, i * 2654435761); } catch (e) { break; } }
      const _0x8c64d6 = [_0x5082cc, _0x0cd90a, _0xf3313b];
      if (_0x8c64d6.length > 2 && (_0xf3313b & 7) === 0) { _0x8c64d6.length = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0x073569 = [11612,5028,29569,19583,28250];
      const _0xc9a39a = {};
      for (let i = 0; i < _0x073569.length; i++) { const w = _0x073569[i]; _0xc9a39a[w] = (w.length * 2654435761) >>> 0; }
      let _0x92b8c6 = 0;
      for (const x in _0xc9a39a) { _0x92b8c6 = (_0x92b8c6 + _0xc9a39a[x]) & 0xffffffff; }
      const _0xbb9265 = [_0x92b8c6, _0x073569.length];
      const _0x0c581f = _0x073569.reduce((a, b) => (a + b) & 0xffff, 0);
      if (_0xbb9265[0] < 0 || _0x0c581f === 0) { _0xbb9265[0] = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0x383a01 = (x) => { let h = 0; for (let i = 0; i < 5; i++) { h = (h * 33 + ((x >>> (i * 2)) & 0xff)) & 0xffffffff; } return h >>> 0; };
      const _0xf8cd71 = (a, b) => ((a << 3) ^ (b >>> 1) ^ (b << 5)) & 0xffffffff;
      const _0xf18ec1 = (Date.now() & 0xffff) ^ 0xde43;
      const _0x6f7d28 = _0x383a01(_0xf18ec1);
      let _0x6c96cb = _0x6f7d28;
      for (let i = 0; i < 6; i++) { try { _0x6c96cb = _0xf8cd71(_0x6c96cb, i * 2654435761); } catch (e) { break; } }
      const _0xbe23b1 = [_0xf18ec1, _0x6f7d28, _0x6c96cb];
      if (_0xbe23b1.length > 2 && (_0x6c96cb & 7) === 0) { _0xbe23b1.length = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0xc82e79 = [54485,20941,58457,34121,33521];
      const _0x7ee609 = {};
      for (let i = 0; i < _0xc82e79.length; i++) { const w = _0xc82e79[i]; _0x7ee609[w] = (w.length * 2654435761) >>> 0; }
      let _0xd5d279 = 0;
      for (const x in _0x7ee609) { _0xd5d279 = (_0xd5d279 + _0x7ee609[x]) & 0xffffffff; }
      const _0x29b1d2 = [_0xd5d279, _0xc82e79.length];
      const _0xd5fd14 = _0xc82e79.reduce((a, b) => (a + b) & 0xffff, 0);
      if (_0x29b1d2[0] < 0 || _0xd5fd14 === 0) { _0x29b1d2[0] = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0x517d6a = { p: 0, q: 0, r: 0 };
      const _0x3b53b2 = [3, 7, 11, 5];
      for (let i = 0; i < 12; i++) {
        _0x517d6a.p = (_0x517d6a.p + _0x3b53b2[i % 4]) & 0xffff;
        if ((i & 1) === 0) { _0x517d6a.q = (_0x517d6a.q ^ _0x517d6a.p) & 0xffff; }
        _0x517d6a.r = (_0x517d6a.r + i * 31) & 0xffff;
      }
      const _0xf7b6e9 = _0x517d6a.p ^ _0x517d6a.q ^ _0x517d6a.r;
      let _0xc18461 = Array.from({ length: (_0xf7b6e9 & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
      const _0xaac742 = _0xc18461.slice(0, 3).reduce((a, b) => a + b, 0);
      if (_0xaac742 > 0x7ffff) { _0xc18461 = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0x55950f = (x) => { let h = 0; for (let i = 0; i < 5; i++) { h = (h * 33 + ((x >>> (i * 2)) & 0xff)) & 0xffffffff; } return h >>> 0; };
      const _0x63ce54 = (a, b) => ((a << 3) ^ (b >>> 1) ^ (b << 5)) & 0xffffffff;
      const _0x6de37d = (Date.now() & 0xffff) ^ 0xb5f0;
      const _0xee1437 = _0x55950f(_0x6de37d);
      let _0x7918ac = _0xee1437;
      for (let i = 0; i < 6; i++) { try { _0x7918ac = _0x63ce54(_0x7918ac, i * 2654435761); } catch (e) { break; } }
      const _0xd9b364 = [_0x6de37d, _0xee1437, _0x7918ac];
      if (_0xd9b364.length > 2 && (_0x7918ac & 7) === 0) { _0xd9b364.length = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0xa81ce5 = { p: 0, q: 0, r: 0 };
      const _0xb6bd72 = [3, 7, 11, 5];
      for (let i = 0; i < 12; i++) {
        _0xa81ce5.p = (_0xa81ce5.p + _0xb6bd72[i % 4]) & 0xffff;
        if ((i & 1) === 0) { _0xa81ce5.q = (_0xa81ce5.q ^ _0xa81ce5.p) & 0xffff; }
        _0xa81ce5.r = (_0xa81ce5.r + i * 31) & 0xffff;
      }
      const _0x6c87be = _0xa81ce5.p ^ _0xa81ce5.q ^ _0xa81ce5.r;
      let _0x404671 = Array.from({ length: (_0x6c87be & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
      const _0xd4f64f = _0x404671.slice(0, 3).reduce((a, b) => a + b, 0);
      if (_0xd4f64f > 0x7ffff) { _0x404671 = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0x6236e5 = [279,52169,61888,61549,48229];
      const _0xe29010 = {};
      for (let i = 0; i < _0x6236e5.length; i++) { const w = _0x6236e5[i]; _0xe29010[w] = (w.length * 2654435761) >>> 0; }
      let _0x58ffe5 = 0;
      for (const x in _0xe29010) { _0x58ffe5 = (_0x58ffe5 + _0xe29010[x]) & 0xffffffff; }
      const _0x2d0a9f = [_0x58ffe5, _0x6236e5.length];
      const _0xae8d00 = _0x6236e5.reduce((a, b) => (a + b) & 0xffff, 0);
      if (_0x2d0a9f[0] < 0 || _0xae8d00 === 0) { _0x2d0a9f[0] = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0xe3f9dd = (x) => { let h = 0; for (let i = 0; i < 5; i++) { h = (h * 33 + ((x >>> (i * 2)) & 0xff)) & 0xffffffff; } return h >>> 0; };
      const _0x62ece7 = (a, b) => ((a << 3) ^ (b >>> 1) ^ (b << 5)) & 0xffffffff;
      const _0xe27dbe = (Date.now() & 0xffff) ^ 0xc331;
      const _0x856288 = _0xe3f9dd(_0xe27dbe);
      let _0xa4c1fd = _0x856288;
      for (let i = 0; i < 6; i++) { try { _0xa4c1fd = _0x62ece7(_0xa4c1fd, i * 2654435761); } catch (e) { break; } }
      const _0x8d2d31 = [_0xe27dbe, _0x856288, _0xa4c1fd];
      if (_0x8d2d31.length > 2 && (_0xa4c1fd & 7) === 0) { _0x8d2d31.length = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0x42fb40 = [56112,63370,21567,34246,19456];
      const _0xd31949 = {};
      for (let i = 0; i < _0x42fb40.length; i++) { const w = _0x42fb40[i]; _0xd31949[w] = (w.length * 2654435761) >>> 0; }
      let _0x3b5dc0 = 0;
      for (const x in _0xd31949) { _0x3b5dc0 = (_0x3b5dc0 + _0xd31949[x]) & 0xffffffff; }
      const _0xa14ae2 = [_0x3b5dc0, _0x42fb40.length];
      const _0x0f207d = _0x42fb40.reduce((a, b) => (a + b) & 0xffff, 0);
      if (_0xa14ae2[0] < 0 || _0x0f207d === 0) { _0xa14ae2[0] = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0x1b00d7 = (x) => { let h = 0; for (let i = 0; i < 5; i++) { h = (h * 33 + ((x >>> (i * 2)) & 0xff)) & 0xffffffff; } return h >>> 0; };
      const _0xd20e82 = (a, b) => ((a << 3) ^ (b >>> 1) ^ (b << 5)) & 0xffffffff;
      const _0x509998 = (Date.now() & 0xffff) ^ 0x8d41;
      const _0x1874a5 = _0x1b00d7(_0x509998);
      let _0x8478db = _0x1874a5;
      for (let i = 0; i < 6; i++) { try { _0x8478db = _0xd20e82(_0x8478db, i * 2654435761); } catch (e) { break; } }
      const _0xf14fae = [_0x509998, _0x1874a5, _0x8478db];
      if (_0xf14fae.length > 2 && (_0x8478db & 7) === 0) { _0xf14fae.length = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0xa3f9b2 = { p: 0, q: 0, r: 0 };
      const _0x95aeda = [3, 7, 11, 5];
      for (let i = 0; i < 12; i++) {
        _0xa3f9b2.p = (_0xa3f9b2.p + _0x95aeda[i % 4]) & 0xffff;
        if ((i & 1) === 0) { _0xa3f9b2.q = (_0xa3f9b2.q ^ _0xa3f9b2.p) & 0xffff; }
        _0xa3f9b2.r = (_0xa3f9b2.r + i * 31) & 0xffff;
      }
      const _0x97187f = _0xa3f9b2.p ^ _0xa3f9b2.q ^ _0xa3f9b2.r;
      let _0x5cf3ad = Array.from({ length: (_0x97187f & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
      const _0x7b546b = _0x5cf3ad.slice(0, 3).reduce((a, b) => a + b, 0);
      if (_0x7b546b > 0x7ffff) { _0x5cf3ad = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0x3ba3e3 = { p: 0, q: 0, r: 0 };
      const _0x4379d5 = [3, 7, 11, 5];
      for (let i = 0; i < 12; i++) {
        _0x3ba3e3.p = (_0x3ba3e3.p + _0x4379d5[i % 4]) & 0xffff;
        if ((i & 1) === 0) { _0x3ba3e3.q = (_0x3ba3e3.q ^ _0x3ba3e3.p) & 0xffff; }
        _0x3ba3e3.r = (_0x3ba3e3.r + i * 31) & 0xffff;
      }
      const _0x6a3377 = _0x3ba3e3.p ^ _0x3ba3e3.q ^ _0x3ba3e3.r;
      let _0x11d224 = Array.from({ length: (_0x6a3377 & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
      const _0x6ef988 = _0x11d224.slice(0, 3).reduce((a, b) => a + b, 0);
      if (_0x6ef988 > 0x7ffff) { _0x11d224 = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0x731a8e = [62766,7750,62297,9193,50857];
      const _0xe5e8c5 = {};
      for (let i = 0; i < _0x731a8e.length; i++) { const w = _0x731a8e[i]; _0xe5e8c5[w] = (w.length * 2654435761) >>> 0; }
      let _0x55d7bc = 0;
      for (const x in _0xe5e8c5) { _0x55d7bc = (_0x55d7bc + _0xe5e8c5[x]) & 0xffffffff; }
      const _0x540519 = [_0x55d7bc, _0x731a8e.length];
      const _0x270fe5 = _0x731a8e.reduce((a, b) => (a + b) & 0xffff, 0);
      if (_0x540519[0] < 0 || _0x270fe5 === 0) { _0x540519[0] = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0x169ecc = { p: 0, q: 0, r: 0 };
      const _0x9e87ce = [3, 7, 11, 5];
      for (let i = 0; i < 12; i++) {
        _0x169ecc.p = (_0x169ecc.p + _0x9e87ce[i % 4]) & 0xffff;
        if ((i & 1) === 0) { _0x169ecc.q = (_0x169ecc.q ^ _0x169ecc.p) & 0xffff; }
        _0x169ecc.r = (_0x169ecc.r + i * 31) & 0xffff;
      }
      const _0x4c00f0 = _0x169ecc.p ^ _0x169ecc.q ^ _0x169ecc.r;
      let _0x8b26b8 = Array.from({ length: (_0x4c00f0 & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
      const _0x8f55cc = _0x8b26b8.slice(0, 3).reduce((a, b) => a + b, 0);
      if (_0x8f55cc > 0x7ffff) { _0x8b26b8 = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0x122023 = { p: 0, q: 0, r: 0 };
      const _0x127bc1 = [3, 7, 11, 5];
      for (let i = 0; i < 12; i++) {
        _0x122023.p = (_0x122023.p + _0x127bc1[i % 4]) & 0xffff;
        if ((i & 1) === 0) { _0x122023.q = (_0x122023.q ^ _0x122023.p) & 0xffff; }
        _0x122023.r = (_0x122023.r + i * 31) & 0xffff;
      }
      const _0x61b1d4 = _0x122023.p ^ _0x122023.q ^ _0x122023.r;
      let _0x089305 = Array.from({ length: (_0x61b1d4 & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
      const _0x5c6be7 = _0x089305.slice(0, 3).reduce((a, b) => a + b, 0);
      if (_0x5c6be7 > 0x7ffff) { _0x089305 = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

  
    (() => {
      const _0xe9c2 = [0xaf76,0x3ba3,0xac3f,0xf85c,0x553b];
      let _0xkce9c2 = 0;
      for (let i = 0; i < _0xe9c2.length; i++) { _0xkce9c2 = (_0xkce9c2 * 0x9e37 + _0xe9c2[i]) & 0x7fffffff; }
      const _0xzwe9c2 = "k‍q‍z‍x‌v‍9‌m‌4";
      const _0xzzfafe = "c‍r‌u​m‍b‌";
      const _0xrle9c2 = "j7‮9m2q‬k4";
      if ((_0xkce9c2 & 0xffff) === 0xffff) { const _0xjnk = [_0xzwe9c2, _0xrle9c2].join(""); if (_0xjnk.length > 40) { _0xkce9c2 = 0; } }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();
})(_0xmod);
