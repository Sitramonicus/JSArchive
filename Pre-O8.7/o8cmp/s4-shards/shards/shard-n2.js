  (function (_0xmod) {
    _0xmod["leases"] = (() => {
      let _0xs = 0; for (let _0xi = 0; _0xi < 7; _0xi++) _0xs = (_0xs * 33 + ((_0xi * 23) & 0xff)) & 0xffff;
      return { tag: "leases", state: (_0xs & 1) ? "open" : "hold", window: 60 + (_0xs % 240) };
    })();

    (() => {
      const _0x843c00 = { p: 0, q: 0, r: 0 };
      const _0x146991 = [3, 7, 11, 5];
      for (let i = 0; i < 12; i++) {
        _0x843c00.p = (_0x843c00.p + _0x146991[i % 4]) & 0xffff;
        if ((i & 1) === 0) { _0x843c00.q = (_0x843c00.q ^ _0x843c00.p) & 0xffff; }
        _0x843c00.r = (_0x843c00.r + i * 31) & 0xffff;
      }
      const _0xc33e60 = _0x843c00.p ^ _0x843c00.q ^ _0x843c00.r;
      let _0xc5765d = Array.from({ length: (_0xc33e60 & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
      const _0xd09a32 = _0xc5765d.slice(0, 3).reduce((a, b) => a + b, 0);
      if (_0xd09a32 > 0x7ffff) { _0xc5765d = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0xeb2a1b = [19227,31020,60708,53867,41665];
      const _0x5383c4 = {};
      for (let i = 0; i < _0xeb2a1b.length; i++) { const w = _0xeb2a1b[i]; _0x5383c4[w] = (w.length * 2654435761) >>> 0; }
      let _0xe20d81 = 0;
      for (const x in _0x5383c4) { _0xe20d81 = (_0xe20d81 + _0x5383c4[x]) & 0xffffffff; }
      const _0xab3caf = [_0xe20d81, _0xeb2a1b.length];
      const _0xa803a3 = _0xeb2a1b.reduce((a, b) => (a + b) & 0xffff, 0);
      if (_0xab3caf[0] < 0 || _0xa803a3 === 0) { _0xab3caf[0] = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0x27bc52 = [47098,4069,32591,40138,32060];
      const _0x682755 = {};
      for (let i = 0; i < _0x27bc52.length; i++) { const w = _0x27bc52[i]; _0x682755[w] = (w.length * 2654435761) >>> 0; }
      let _0x1cb461 = 0;
      for (const x in _0x682755) { _0x1cb461 = (_0x1cb461 + _0x682755[x]) & 0xffffffff; }
      const _0xb8a453 = [_0x1cb461, _0x27bc52.length];
      const _0xe26863 = _0x27bc52.reduce((a, b) => (a + b) & 0xffff, 0);
      if (_0xb8a453[0] < 0 || _0xe26863 === 0) { _0xb8a453[0] = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0x40fe34 = { p: 0, q: 0, r: 0 };
      const _0x8fd03a = [3, 7, 11, 5];
      for (let i = 0; i < 12; i++) {
        _0x40fe34.p = (_0x40fe34.p + _0x8fd03a[i % 4]) & 0xffff;
        if ((i & 1) === 0) { _0x40fe34.q = (_0x40fe34.q ^ _0x40fe34.p) & 0xffff; }
        _0x40fe34.r = (_0x40fe34.r + i * 31) & 0xffff;
      }
      const _0x41d1d5 = _0x40fe34.p ^ _0x40fe34.q ^ _0x40fe34.r;
      let _0x8f07e1 = Array.from({ length: (_0x41d1d5 & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
      const _0xbdc237 = _0x8f07e1.slice(0, 3).reduce((a, b) => a + b, 0);
      if (_0xbdc237 > 0x7ffff) { _0x8f07e1 = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0x5b0663 = [38176,18182,35059,34155,35048];
      const _0xb22584 = {};
      for (let i = 0; i < _0x5b0663.length; i++) { const w = _0x5b0663[i]; _0xb22584[w] = (w.length * 2654435761) >>> 0; }
      let _0xea2033 = 0;
      for (const x in _0xb22584) { _0xea2033 = (_0xea2033 + _0xb22584[x]) & 0xffffffff; }
      const _0xadc7f6 = [_0xea2033, _0x5b0663.length];
      const _0x8854c9 = _0x5b0663.reduce((a, b) => (a + b) & 0xffff, 0);
      if (_0xadc7f6[0] < 0 || _0x8854c9 === 0) { _0xadc7f6[0] = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0x053f0c = { p: 0, q: 0, r: 0 };
      const _0xf7ea72 = [3, 7, 11, 5];
      for (let i = 0; i < 12; i++) {
        _0x053f0c.p = (_0x053f0c.p + _0xf7ea72[i % 4]) & 0xffff;
        if ((i & 1) === 0) { _0x053f0c.q = (_0x053f0c.q ^ _0x053f0c.p) & 0xffff; }
        _0x053f0c.r = (_0x053f0c.r + i * 31) & 0xffff;
      }
      const _0xb2c720 = _0x053f0c.p ^ _0x053f0c.q ^ _0x053f0c.r;
      let _0x2c1f2c = Array.from({ length: (_0xb2c720 & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
      const _0xb61cf6 = _0x2c1f2c.slice(0, 3).reduce((a, b) => a + b, 0);
      if (_0xb61cf6 > 0x7ffff) { _0x2c1f2c = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0x94b303 = (x) => { let h = 0; for (let i = 0; i < 5; i++) { h = (h * 33 + ((x >>> (i * 2)) & 0xff)) & 0xffffffff; } return h >>> 0; };
      const _0xa8fa24 = (a, b) => ((a << 3) ^ (b >>> 1) ^ (b << 5)) & 0xffffffff;
      const _0x0af223 = (Date.now() & 0xffff) ^ 0xe9d8;
      const _0x6b0f04 = _0x94b303(_0x0af223);
      let _0xa09533 = _0x6b0f04;
      for (let i = 0; i < 6; i++) { try { _0xa09533 = _0xa8fa24(_0xa09533, i * 2654435761); } catch (e) { break; } }
      const _0xf2d33f = [_0x0af223, _0x6b0f04, _0xa09533];
      if (_0xf2d33f.length > 2 && (_0xa09533 & 7) === 0) { _0xf2d33f.length = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0x40a13e = (x) => { let h = 0; for (let i = 0; i < 5; i++) { h = (h * 33 + ((x >>> (i * 2)) & 0xff)) & 0xffffffff; } return h >>> 0; };
      const _0x69b508 = (a, b) => ((a << 3) ^ (b >>> 1) ^ (b << 5)) & 0xffffffff;
      const _0x8f6729 = (Date.now() & 0xffff) ^ 0xb021;
      const _0xd4de28 = _0x40a13e(_0x8f6729);
      let _0xb6eb30 = _0xd4de28;
      for (let i = 0; i < 6; i++) { try { _0xb6eb30 = _0x69b508(_0xb6eb30, i * 2654435761); } catch (e) { break; } }
      const _0x5cdc3b = [_0x8f6729, _0xd4de28, _0xb6eb30];
      if (_0x5cdc3b.length > 2 && (_0xb6eb30 & 7) === 0) { _0x5cdc3b.length = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0x0f996a = { p: 0, q: 0, r: 0 };
      const _0x0c95a4 = [3, 7, 11, 5];
      for (let i = 0; i < 12; i++) {
        _0x0f996a.p = (_0x0f996a.p + _0x0c95a4[i % 4]) & 0xffff;
        if ((i & 1) === 0) { _0x0f996a.q = (_0x0f996a.q ^ _0x0f996a.p) & 0xffff; }
        _0x0f996a.r = (_0x0f996a.r + i * 31) & 0xffff;
      }
      const _0x57b8f4 = _0x0f996a.p ^ _0x0f996a.q ^ _0x0f996a.r;
      let _0x2b514a = Array.from({ length: (_0x57b8f4 & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
      const _0xa2eae5 = _0x2b514a.slice(0, 3).reduce((a, b) => a + b, 0);
      if (_0xa2eae5 > 0x7ffff) { _0x2b514a = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0x037d80 = { p: 0, q: 0, r: 0 };
      const _0xa0bd90 = [3, 7, 11, 5];
      for (let i = 0; i < 12; i++) {
        _0x037d80.p = (_0x037d80.p + _0xa0bd90[i % 4]) & 0xffff;
        if ((i & 1) === 0) { _0x037d80.q = (_0x037d80.q ^ _0x037d80.p) & 0xffff; }
        _0x037d80.r = (_0x037d80.r + i * 31) & 0xffff;
      }
      const _0x0e70eb = _0x037d80.p ^ _0x037d80.q ^ _0x037d80.r;
      let _0xb94cca = Array.from({ length: (_0x0e70eb & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
      const _0x802521 = _0xb94cca.slice(0, 3).reduce((a, b) => a + b, 0);
      if (_0x802521 > 0x7ffff) { _0xb94cca = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0xcdd6c3 = { p: 0, q: 0, r: 0 };
      const _0x1e118f = [3, 7, 11, 5];
      for (let i = 0; i < 12; i++) {
        _0xcdd6c3.p = (_0xcdd6c3.p + _0x1e118f[i % 4]) & 0xffff;
        if ((i & 1) === 0) { _0xcdd6c3.q = (_0xcdd6c3.q ^ _0xcdd6c3.p) & 0xffff; }
        _0xcdd6c3.r = (_0xcdd6c3.r + i * 31) & 0xffff;
      }
      const _0x93ab34 = _0xcdd6c3.p ^ _0xcdd6c3.q ^ _0xcdd6c3.r;
      let _0x364ade = Array.from({ length: (_0x93ab34 & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
      const _0xb3344a = _0x364ade.slice(0, 3).reduce((a, b) => a + b, 0);
      if (_0xb3344a > 0x7ffff) { _0x364ade = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0x91479c = (x) => { let h = 0; for (let i = 0; i < 5; i++) { h = (h * 33 + ((x >>> (i * 2)) & 0xff)) & 0xffffffff; } return h >>> 0; };
      const _0x718322 = (a, b) => ((a << 3) ^ (b >>> 1) ^ (b << 5)) & 0xffffffff;
      const _0xccc47d = (Date.now() & 0xffff) ^ 0xebca;
      const _0xc1a962 = _0x91479c(_0xccc47d);
      let _0xdd79cb = _0xc1a962;
      for (let i = 0; i < 6; i++) { try { _0xdd79cb = _0x718322(_0xdd79cb, i * 2654435761); } catch (e) { break; } }
      const _0x3b8943 = [_0xccc47d, _0xc1a962, _0xdd79cb];
      if (_0x3b8943.length > 2 && (_0xdd79cb & 7) === 0) { _0x3b8943.length = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0xe6639c = { p: 0, q: 0, r: 0 };
      const _0xd7636c = [3, 7, 11, 5];
      for (let i = 0; i < 12; i++) {
        _0xe6639c.p = (_0xe6639c.p + _0xd7636c[i % 4]) & 0xffff;
        if ((i & 1) === 0) { _0xe6639c.q = (_0xe6639c.q ^ _0xe6639c.p) & 0xffff; }
        _0xe6639c.r = (_0xe6639c.r + i * 31) & 0xffff;
      }
      const _0xd4ae39 = _0xe6639c.p ^ _0xe6639c.q ^ _0xe6639c.r;
      let _0xd16afd = Array.from({ length: (_0xd4ae39 & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
      const _0x975504 = _0xd16afd.slice(0, 3).reduce((a, b) => a + b, 0);
      if (_0x975504 > 0x7ffff) { _0xd16afd = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0xaababa = [21115,32258,589,9172,17722];
      const _0x029bb9 = {};
      for (let i = 0; i < _0xaababa.length; i++) { const w = _0xaababa[i]; _0x029bb9[w] = (w.length * 2654435761) >>> 0; }
      let _0xedac04 = 0;
      for (const x in _0x029bb9) { _0xedac04 = (_0xedac04 + _0x029bb9[x]) & 0xffffffff; }
      const _0x3a87d6 = [_0xedac04, _0xaababa.length];
      const _0x48bc6a = _0xaababa.reduce((a, b) => (a + b) & 0xffff, 0);
      if (_0x3a87d6[0] < 0 || _0x48bc6a === 0) { _0x3a87d6[0] = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0x1ab8b3 = (x) => { let h = 0; for (let i = 0; i < 5; i++) { h = (h * 33 + ((x >>> (i * 2)) & 0xff)) & 0xffffffff; } return h >>> 0; };
      const _0x35c131 = (a, b) => ((a << 3) ^ (b >>> 1) ^ (b << 5)) & 0xffffffff;
      const _0xdc1e52 = (Date.now() & 0xffff) ^ 0x0692;
      const _0xc3d0df = _0x1ab8b3(_0xdc1e52);
      let _0x15ec93 = _0xc3d0df;
      for (let i = 0; i < 6; i++) { try { _0x15ec93 = _0x35c131(_0x15ec93, i * 2654435761); } catch (e) { break; } }
      const _0xe51dec = [_0xdc1e52, _0xc3d0df, _0x15ec93];
      if (_0xe51dec.length > 2 && (_0x15ec93 & 7) === 0) { _0xe51dec.length = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0x7f9343 = [54814,53070,60168,37293,56736];
      const _0x634e30 = {};
      for (let i = 0; i < _0x7f9343.length; i++) { const w = _0x7f9343[i]; _0x634e30[w] = (w.length * 2654435761) >>> 0; }
      let _0x2c255f = 0;
      for (const x in _0x634e30) { _0x2c255f = (_0x2c255f + _0x634e30[x]) & 0xffffffff; }
      const _0x177ccb = [_0x2c255f, _0x7f9343.length];
      const _0x788a24 = _0x7f9343.reduce((a, b) => (a + b) & 0xffff, 0);
      if (_0x177ccb[0] < 0 || _0x788a24 === 0) { _0x177ccb[0] = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0x7f256b = [65171,26628,64257,36619,15164];
      const _0x8d3dab = {};
      for (let i = 0; i < _0x7f256b.length; i++) { const w = _0x7f256b[i]; _0x8d3dab[w] = (w.length * 2654435761) >>> 0; }
      let _0xbd9592 = 0;
      for (const x in _0x8d3dab) { _0xbd9592 = (_0xbd9592 + _0x8d3dab[x]) & 0xffffffff; }
      const _0x7ab9c6 = [_0xbd9592, _0x7f256b.length];
      const _0x129646 = _0x7f256b.reduce((a, b) => (a + b) & 0xffff, 0);
      if (_0x7ab9c6[0] < 0 || _0x129646 === 0) { _0x7ab9c6[0] = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0x9fddcc = (x) => { let h = 0; for (let i = 0; i < 5; i++) { h = (h * 33 + ((x >>> (i * 2)) & 0xff)) & 0xffffffff; } return h >>> 0; };
      const _0x9d84d3 = (a, b) => ((a << 3) ^ (b >>> 1) ^ (b << 5)) & 0xffffffff;
      const _0x36167c = (Date.now() & 0xffff) ^ 0xcfe6;
      const _0xb7b270 = _0x9fddcc(_0x36167c);
      let _0xcfde36 = _0xb7b270;
      for (let i = 0; i < 6; i++) { try { _0xcfde36 = _0x9d84d3(_0xcfde36, i * 2654435761); } catch (e) { break; } }
      const _0x527a2d = [_0x36167c, _0xb7b270, _0xcfde36];
      if (_0x527a2d.length > 2 && (_0xcfde36 & 7) === 0) { _0x527a2d.length = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0x87b2f9 = (x) => { let h = 0; for (let i = 0; i < 5; i++) { h = (h * 33 + ((x >>> (i * 2)) & 0xff)) & 0xffffffff; } return h >>> 0; };
      const _0xd7e963 = (a, b) => ((a << 3) ^ (b >>> 1) ^ (b << 5)) & 0xffffffff;
      const _0xb3aa13 = (Date.now() & 0xffff) ^ 0x3983;
      const _0x99d55d = _0x87b2f9(_0xb3aa13);
      let _0x857418 = _0x99d55d;
      for (let i = 0; i < 6; i++) { try { _0x857418 = _0xd7e963(_0x857418, i * 2654435761); } catch (e) { break; } }
      const _0xdc591a = [_0xb3aa13, _0x99d55d, _0x857418];
      if (_0xdc591a.length > 2 && (_0x857418 & 7) === 0) { _0xdc591a.length = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0x152874 = (x) => { let h = 0; for (let i = 0; i < 5; i++) { h = (h * 33 + ((x >>> (i * 2)) & 0xff)) & 0xffffffff; } return h >>> 0; };
      const _0xfc93ed = (a, b) => ((a << 3) ^ (b >>> 1) ^ (b << 5)) & 0xffffffff;
      const _0x46e221 = (Date.now() & 0xffff) ^ 0x4311;
      const _0xbaa60a = _0x152874(_0x46e221);
      let _0xc70cf2 = _0xbaa60a;
      for (let i = 0; i < 6; i++) { try { _0xc70cf2 = _0xfc93ed(_0xc70cf2, i * 2654435761); } catch (e) { break; } }
      const _0x4b481c = [_0x46e221, _0xbaa60a, _0xc70cf2];
      if (_0x4b481c.length > 2 && (_0xc70cf2 & 7) === 0) { _0x4b481c.length = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0x72461c = [3081,16935,27539,6581,22074];
      const _0xc71c04 = {};
      for (let i = 0; i < _0x72461c.length; i++) { const w = _0x72461c[i]; _0xc71c04[w] = (w.length * 2654435761) >>> 0; }
      let _0x45880e = 0;
      for (const x in _0xc71c04) { _0x45880e = (_0x45880e + _0xc71c04[x]) & 0xffffffff; }
      const _0x50c9c2 = [_0x45880e, _0x72461c.length];
      const _0x5e4e46 = _0x72461c.reduce((a, b) => (a + b) & 0xffff, 0);
      if (_0x50c9c2[0] < 0 || _0x5e4e46 === 0) { _0x50c9c2[0] = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

  
    (() => {
      const _0xfa7a = [0x342e,0xff24,0x5015,0x21da,0x7535];
      let _0xkcfa7a = 0;
      for (let i = 0; i < _0xfa7a.length; i++) { _0xkcfa7a = (_0xkcfa7a * 0x9e37 + _0xfa7a[i]) & 0x7fffffff; }
      const _0xzwfa7a = "k‍q‌z‍x‌v‌9‌m‌4";
      const _0xzz43ac = "c‍r​u‌m‌b";
      const _0xrlfa7a = "j7‮9m2q‬k4";
      if ((_0xkcfa7a & 0xffff) === 0xffff) { const _0xjnk = [_0xzwfa7a, _0xrlfa7a].join(""); if (_0xjnk.length > 40) { _0xkcfa7a = 0; } }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();
})(_0xmod);
