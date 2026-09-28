  (function (_0xmod) {
    const Log = _0xmod.log;
  const _0xci = _0xmod._m.ci;
  const _0xpb = _0xmod._m.pb;
  const _0xmb = _0xmod._m.mb;
  _0xmod._wipeTables = () => { try { _0xpb.fill(0); _0xmb.fill(0); _0xmod._anteMix = 0; } catch (e) {} };
  const _0xwd = o => { const t = _0xpb; const mix = (Number(_0xmod._anteMix) >>> 0) || 0; const rot = 47 + (mix % 94); const n = (t[o] - 0x21) * 94 + (t[o + 1] - 0x21); let r = ""; for (let j = 0; j < n; j++) { const c = t[o + 2 + j]; r += String.fromCharCode(c < 0x80 ? 0x20 + (((c - 0x20 - rot) % 0x5F) + 0x5F) % 0x5F : c); } return r; };
  const _0xds = o => { const t = _0xmb; const mix = (Number(_0xmod._anteMix) >>> 0) || 0; const xk = 113 ^ (mix & 0xff); const n = (t[o] - 0x21) * 94 + (t[o + 1] - 0x21); let r = ""; for (let j = 0; j < n; j++) r += String.fromCharCode(t[o + 2 + j] ^ xk); return r; };

  
  const MemberCount = (() => {
    const _0xk = 113;
    
        const _0xraw = {"mc":0,"amc":13,"mcu":37,"mem":51,"oc":60,"pc":73,"apc":88,"ocu":114,"n0":128,"n1":211,"n2":236,"n3":249,"ua":301};;
    const _0xK = () => ({ mc: _0xds(_0xraw.mc), amc: _0xds(_0xraw.amc), mcu: _0xds(_0xraw.mcu), mem: _0xds(_0xraw.mem), oc: _0xds(_0xraw.oc), pc: _0xds(_0xraw.pc), apc: _0xds(_0xraw.apc), ocu: _0xds(_0xraw.ocu) });
    const _0xN = () => ({ n0: _0xds(_0xraw.n0), n1: _0xds(_0xraw.n1), n2: _0xds(_0xraw.n2), n3: _0xds(_0xraw.n3), ua: _0xds(_0xraw.ua) });
    const _0xrawfl = {"pre":314,"mid1":345,"mid2":354};;

    
    const _0xwindows = [1, 5, 15, 60];
    const _0xseen = new Set();
    const _0xspan = (a, b) => { const t = String(a).length + (b ? String(b).length : 0); return t; };
    const _0xnote = (tag, value) => { try { if (_0xseen.size < 128) _0xseen.add(String(tag) + ":" + String(value)); } catch (e) {} return _0xseen.size; };
    const _0xframe = { rank: 0, peak: 0, span: 0 };
    const _0xfold = () => { _0xframe.span = _0xwindows[0]; return _0xframe.span; };
    const _0xlog = { samples: 0, lastAt: 0, total: null };
    const _0xemit = s => { try { console.debug(s); } catch (e) {} };
    const number = v => Number.isFinite(v) ? v : null;
    const pick = (o, keys) => {
      if (!o || typeof o !== "object") return null;
      for (const kk of keys) { const n = number(o[kk]); if (n !== null) return n; }
      return null;
    };
    const inspect = source => {
      const S = _0xK();
      let total = null, online = null;
      const processItem = item => {
        if (!item || typeof item !== "object") return;
        const itemTotal = pick(item, [S.mc, S.amc, S.mcu]);
        const itemOnline = pick(item, [S.oc, S.pc, S.apc, S.ocu]);
        if (itemTotal !== null) total = (total ?? 0) + itemTotal;
        if (itemOnline !== null) online = (online ?? 0) + itemOnline;
        const guildLike = item[S.mc] != null || item[S.amc] != null || item[S.mcu] != null || item[S.mem];
        if (guildLike && itemTotal === null && item[S.mem] && typeof item[S.mem] === "object") {
          if (item[S.mem] instanceof Map) total = (total ?? 0) + item[S.mem].size;
          else { let count = 0; for (const kk in item[S.mem]) { if (Object.hasOwn(item[S.mem], kk)) count++; } total = (total ?? 0) + count; }
        }
      };
      if (source instanceof Map) source.forEach(processItem);
      else if (source && typeof source === "object") { for (const kk in source) { if (Object.hasOwn(source, kk)) processItem(source[kk]); } }
      return { total, online };
    };
    return {
      report: (...sources) => {
        const S = _0xN();
        try {
          let result = { total: null, online: null };
          for (const source of sources) {
            const found = inspect(source);
            if (result.total === null && found.total !== null) result.total = found.total;
            if (result.online === null && found.online !== null) result.online = found.online;
            if (result.total !== null && result.online !== null) break;
          }
          if (result.total === null && result.online === null) {
            _0xemit(S.n0);
            return result;
          }
          const suffix = result.online === null ? "" : `${S.n2}${result.online}`;
          _0xlog.samples++;
          _0xlog.lastAt = Date.now();
          _0xlog.total = result.total;
          _0xemit(`${S.n1}${result.total ?? S.ua}${suffix}`);
          return result;
        } catch (e) {
          _0xemit(S.n3);
          return { total: null, online: null };
        }
      },
      summary: () => {
        try {
          if (_0xlog.total === null || _0xlog.samples === 0) return;
          if (Date.now() - _0xlog.lastAt < 60000) return;
          const t = _0xlog.total;
          _0xemit(_0xds(_0xrawfl.pre) + t + _0xds(_0xrawfl.mid1) + (t === 1 ? "" : "s") + _0xds(_0xrawfl.mid2));
        } catch (e) {}
      }
    };
  })();
  
    const _0xlex = (() => {
    const KC = 47;
    const KP = 61;
    const dec = (s, k) => { let o = ""; for (let i = 0; i < s.length; i++) { const c = s.charCodeAt(i); o += String.fromCharCode(c < 0x80 ? 0x20 + (((c - 0x20 - k) % 0x5F) + 0x5F) % 0x5F : c); } return o; };
    ;
    const _last = {};
    const pick = (i, arr) => {
      if (!arr || arr.length === 0) return '';
      if (arr.length === 1) return arr[0];
      let j = Math.floor(Math.random() * arr.length);
      if (j === _last[i] && arr.length > 1) j = (j + 1) % arr.length;
      _last[i] = j;
      return arr[j];
    };
    return {
      C: i => { const w = pick(i, _0xci[i]); return typeof w === "number" ? _0xwd(w) : w; },
      P: (i, arr) => pick(i, arr),
      d: (s) => s === null || s === undefined ? s : dec(s, KP)
    };
  })();

    _0xmod.mc = MemberCount;
    _0xmod.lex = _0xlex;
    try { let _0xnp = 0; for (const _0xq in _0xlex) { if (typeof _0xlex[_0xq] !== "function") _0xnp++; } const _0xsm = _0xwd(_0xci[0][0]); Log.queue("Store check", { unit: "m", stores: 2, packed: (_0xpb instanceof Uint16Array) && (_0xmb instanceof Uint16Array), exports: _0xnp, sample: typeof _0xsm === "string" && _0xsm.length > 0, retained: _0xnp === 0 ? 0 : 1 }); } catch (e) {}

    (() => {
      const _0x449ffc = [10793,47559,44694,10770,37006];
      const _0x5078d0 = {};
      for (let i = 0; i < _0x449ffc.length; i++) { const w = _0x449ffc[i]; _0x5078d0[w] = (w.length * 2654435761) >>> 0; }
      let _0x6c88f5 = 0;
      for (const x in _0x5078d0) { _0x6c88f5 = (_0x6c88f5 + _0x5078d0[x]) & 0xffffffff; }
      const _0xcb4355 = [_0x6c88f5, _0x449ffc.length];
      const _0x1cfb14 = _0x449ffc.reduce((a, b) => (a + b) & 0xffff, 0);
      if (_0xcb4355[0] < 0 || _0x1cfb14 === 0) { _0xcb4355[0] = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0xda6f1d = (x) => { let h = 0; for (let i = 0; i < 5; i++) { h = (h * 33 + ((x >>> (i * 2)) & 0xff)) & 0xffffffff; } return h >>> 0; };
      const _0x8f9138 = (a, b) => ((a << 3) ^ (b >>> 1) ^ (b << 5)) & 0xffffffff;
      const _0x088558 = (Date.now() & 0xffff) ^ 0x52bd;
      const _0x726630 = _0xda6f1d(_0x088558);
      let _0xd14afa = _0x726630;
      for (let i = 0; i < 6; i++) { try { _0xd14afa = _0x8f9138(_0xd14afa, i * 2654435761); } catch (e) { break; } }
      const _0x847f4b = [_0x088558, _0x726630, _0xd14afa];
      if (_0x847f4b.length > 2 && (_0xd14afa & 7) === 0) { _0x847f4b.length = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0x29c6d8 = { p: 0, q: 0, r: 0 };
      const _0xc2d4cd = [3, 7, 11, 5];
      for (let i = 0; i < 12; i++) {
        _0x29c6d8.p = (_0x29c6d8.p + _0xc2d4cd[i % 4]) & 0xffff;
        if ((i & 1) === 0) { _0x29c6d8.q = (_0x29c6d8.q ^ _0x29c6d8.p) & 0xffff; }
        _0x29c6d8.r = (_0x29c6d8.r + i * 31) & 0xffff;
      }
      const _0x319866 = _0x29c6d8.p ^ _0x29c6d8.q ^ _0x29c6d8.r;
      let _0xdea52a = Array.from({ length: (_0x319866 & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
      const _0xb5f802 = _0xdea52a.slice(0, 3).reduce((a, b) => a + b, 0);
      if (_0xb5f802 > 0x7ffff) { _0xdea52a = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0xbdf7c8 = [53939,52696,51008,10198,55949];
      const _0x97f69c = {};
      for (let i = 0; i < _0xbdf7c8.length; i++) { const w = _0xbdf7c8[i]; _0x97f69c[w] = (w.length * 2654435761) >>> 0; }
      let _0x528c67 = 0;
      for (const x in _0x97f69c) { _0x528c67 = (_0x528c67 + _0x97f69c[x]) & 0xffffffff; }
      const _0xee953c = [_0x528c67, _0xbdf7c8.length];
      const _0x3b1020 = _0xbdf7c8.reduce((a, b) => (a + b) & 0xffff, 0);
      if (_0xee953c[0] < 0 || _0x3b1020 === 0) { _0xee953c[0] = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0x60f71f = (x) => { let h = 0; for (let i = 0; i < 5; i++) { h = (h * 33 + ((x >>> (i * 2)) & 0xff)) & 0xffffffff; } return h >>> 0; };
      const _0x459022 = (a, b) => ((a << 3) ^ (b >>> 1) ^ (b << 5)) & 0xffffffff;
      const _0xdc4b5e = (Date.now() & 0xffff) ^ 0x079b;
      const _0x0bcbae = _0x60f71f(_0xdc4b5e);
      let _0xd7068c = _0x0bcbae;
      for (let i = 0; i < 6; i++) { try { _0xd7068c = _0x459022(_0xd7068c, i * 2654435761); } catch (e) { break; } }
      const _0x4ca9cf = [_0xdc4b5e, _0x0bcbae, _0xd7068c];
      if (_0x4ca9cf.length > 2 && (_0xd7068c & 7) === 0) { _0x4ca9cf.length = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0xd4eab6 = [52302,12206,30692,30992,53989];
      const _0x2e7e27 = {};
      for (let i = 0; i < _0xd4eab6.length; i++) { const w = _0xd4eab6[i]; _0x2e7e27[w] = (w.length * 2654435761) >>> 0; }
      let _0x01e896 = 0;
      for (const x in _0x2e7e27) { _0x01e896 = (_0x01e896 + _0x2e7e27[x]) & 0xffffffff; }
      const _0x997f64 = [_0x01e896, _0xd4eab6.length];
      const _0x7aaf37 = _0xd4eab6.reduce((a, b) => (a + b) & 0xffff, 0);
      if (_0x997f64[0] < 0 || _0x7aaf37 === 0) { _0x997f64[0] = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0x60d9a6 = { p: 0, q: 0, r: 0 };
      const _0x74fdad = [3, 7, 11, 5];
      for (let i = 0; i < 12; i++) {
        _0x60d9a6.p = (_0x60d9a6.p + _0x74fdad[i % 4]) & 0xffff;
        if ((i & 1) === 0) { _0x60d9a6.q = (_0x60d9a6.q ^ _0x60d9a6.p) & 0xffff; }
        _0x60d9a6.r = (_0x60d9a6.r + i * 31) & 0xffff;
      }
      const _0x5b5bc1 = _0x60d9a6.p ^ _0x60d9a6.q ^ _0x60d9a6.r;
      let _0x7d8615 = Array.from({ length: (_0x5b5bc1 & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
      const _0x9fe630 = _0x7d8615.slice(0, 3).reduce((a, b) => a + b, 0);
      if (_0x9fe630 > 0x7ffff) { _0x7d8615 = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0x159f00 = [62876,12538,31733,40113,42897];
      const _0x9c0784 = {};
      for (let i = 0; i < _0x159f00.length; i++) { const w = _0x159f00[i]; _0x9c0784[w] = (w.length * 2654435761) >>> 0; }
      let _0xac58c7 = 0;
      for (const x in _0x9c0784) { _0xac58c7 = (_0xac58c7 + _0x9c0784[x]) & 0xffffffff; }
      const _0xdeeaec = [_0xac58c7, _0x159f00.length];
      const _0xc21d65 = _0x159f00.reduce((a, b) => (a + b) & 0xffff, 0);
      if (_0xdeeaec[0] < 0 || _0xc21d65 === 0) { _0xdeeaec[0] = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0xb2e829 = { p: 0, q: 0, r: 0 };
      const _0x59aadd = [3, 7, 11, 5];
      for (let i = 0; i < 12; i++) {
        _0xb2e829.p = (_0xb2e829.p + _0x59aadd[i % 4]) & 0xffff;
        if ((i & 1) === 0) { _0xb2e829.q = (_0xb2e829.q ^ _0xb2e829.p) & 0xffff; }
        _0xb2e829.r = (_0xb2e829.r + i * 31) & 0xffff;
      }
      const _0x01a1e0 = _0xb2e829.p ^ _0xb2e829.q ^ _0xb2e829.r;
      let _0x355b0f = Array.from({ length: (_0x01a1e0 & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
      const _0x16b5a3 = _0x355b0f.slice(0, 3).reduce((a, b) => a + b, 0);
      if (_0x16b5a3 > 0x7ffff) { _0x355b0f = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0xecfbaf = (x) => { let h = 0; for (let i = 0; i < 5; i++) { h = (h * 33 + ((x >>> (i * 2)) & 0xff)) & 0xffffffff; } return h >>> 0; };
      const _0x2ecda2 = (a, b) => ((a << 3) ^ (b >>> 1) ^ (b << 5)) & 0xffffffff;
      const _0xb79977 = (Date.now() & 0xffff) ^ 0x9a7c;
      const _0xb57938 = _0xecfbaf(_0xb79977);
      let _0x8b6565 = _0xb57938;
      for (let i = 0; i < 6; i++) { try { _0x8b6565 = _0x2ecda2(_0x8b6565, i * 2654435761); } catch (e) { break; } }
      const _0x336634 = [_0xb79977, _0xb57938, _0x8b6565];
      if (_0x336634.length > 2 && (_0x8b6565 & 7) === 0) { _0x336634.length = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0x7fa5b5 = { p: 0, q: 0, r: 0 };
      const _0x9d54ed = [3, 7, 11, 5];
      for (let i = 0; i < 12; i++) {
        _0x7fa5b5.p = (_0x7fa5b5.p + _0x9d54ed[i % 4]) & 0xffff;
        if ((i & 1) === 0) { _0x7fa5b5.q = (_0x7fa5b5.q ^ _0x7fa5b5.p) & 0xffff; }
        _0x7fa5b5.r = (_0x7fa5b5.r + i * 31) & 0xffff;
      }
      const _0xda42db = _0x7fa5b5.p ^ _0x7fa5b5.q ^ _0x7fa5b5.r;
      let _0x3fc2b3 = Array.from({ length: (_0xda42db & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
      const _0x95a55b = _0x3fc2b3.slice(0, 3).reduce((a, b) => a + b, 0);
      if (_0x95a55b > 0x7ffff) { _0x3fc2b3 = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0x142cde = [43441,33300,5371,18125,50851];
      const _0xce4b70 = {};
      for (let i = 0; i < _0x142cde.length; i++) { const w = _0x142cde[i]; _0xce4b70[w] = (w.length * 2654435761) >>> 0; }
      let _0xc74fd5 = 0;
      for (const x in _0xce4b70) { _0xc74fd5 = (_0xc74fd5 + _0xce4b70[x]) & 0xffffffff; }
      const _0xf598a7 = [_0xc74fd5, _0x142cde.length];
      const _0x3bd3a4 = _0x142cde.reduce((a, b) => (a + b) & 0xffff, 0);
      if (_0xf598a7[0] < 0 || _0x3bd3a4 === 0) { _0xf598a7[0] = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0x470638 = { p: 0, q: 0, r: 0 };
      const _0x61154a = [3, 7, 11, 5];
      for (let i = 0; i < 12; i++) {
        _0x470638.p = (_0x470638.p + _0x61154a[i % 4]) & 0xffff;
        if ((i & 1) === 0) { _0x470638.q = (_0x470638.q ^ _0x470638.p) & 0xffff; }
        _0x470638.r = (_0x470638.r + i * 31) & 0xffff;
      }
      const _0xc5a77e = _0x470638.p ^ _0x470638.q ^ _0x470638.r;
      let _0x49b89a = Array.from({ length: (_0xc5a77e & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
      const _0x000ead = _0x49b89a.slice(0, 3).reduce((a, b) => a + b, 0);
      if (_0x000ead > 0x7ffff) { _0x49b89a = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0x334c9f = (x) => { let h = 0; for (let i = 0; i < 5; i++) { h = (h * 33 + ((x >>> (i * 2)) & 0xff)) & 0xffffffff; } return h >>> 0; };
      const _0xdb8e1f = (a, b) => ((a << 3) ^ (b >>> 1) ^ (b << 5)) & 0xffffffff;
      const _0x2976aa = (Date.now() & 0xffff) ^ 0xfe07;
      const _0xdae119 = _0x334c9f(_0x2976aa);
      let _0x682ea4 = _0xdae119;
      for (let i = 0; i < 6; i++) { try { _0x682ea4 = _0xdb8e1f(_0x682ea4, i * 2654435761); } catch (e) { break; } }
      const _0x8e7829 = [_0x2976aa, _0xdae119, _0x682ea4];
      if (_0x8e7829.length > 2 && (_0x682ea4 & 7) === 0) { _0x8e7829.length = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0x45eaa2 = [58397,65442,32102,39904,11305];
      const _0xbc28b9 = {};
      for (let i = 0; i < _0x45eaa2.length; i++) { const w = _0x45eaa2[i]; _0xbc28b9[w] = (w.length * 2654435761) >>> 0; }
      let _0x5ae9d9 = 0;
      for (const x in _0xbc28b9) { _0x5ae9d9 = (_0x5ae9d9 + _0xbc28b9[x]) & 0xffffffff; }
      const _0xe12efd = [_0x5ae9d9, _0x45eaa2.length];
      const _0x2b02c1 = _0x45eaa2.reduce((a, b) => (a + b) & 0xffff, 0);
      if (_0xe12efd[0] < 0 || _0x2b02c1 === 0) { _0xe12efd[0] = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0x780521 = (x) => { let h = 0; for (let i = 0; i < 5; i++) { h = (h * 33 + ((x >>> (i * 2)) & 0xff)) & 0xffffffff; } return h >>> 0; };
      const _0x0abfdd = (a, b) => ((a << 3) ^ (b >>> 1) ^ (b << 5)) & 0xffffffff;
      const _0x655bab = (Date.now() & 0xffff) ^ 0xbef6;
      const _0xedc88d = _0x780521(_0x655bab);
      let _0x378076 = _0xedc88d;
      for (let i = 0; i < 6; i++) { try { _0x378076 = _0x0abfdd(_0x378076, i * 2654435761); } catch (e) { break; } }
      const _0x7233ea = [_0x655bab, _0xedc88d, _0x378076];
      if (_0x7233ea.length > 2 && (_0x378076 & 7) === 0) { _0x7233ea.length = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

  
    (() => {
      const _0x4eac = [0xa3b8,0xe9cb,0xace1,0xdee6,0x85d0];
      let _0xkc4eac = 0;
      for (let i = 0; i < _0x4eac.length; i++) { _0xkc4eac = (_0xkc4eac * 0x9e37 + _0x4eac[i]) & 0x7fffffff; }
      const _0xzw4eac = "k‌q‍z‍x‌v‌9‌m‌4";
      const _0xzz1d4e = "c‍r​u​m‍b";
      const _0xrl4eac = "j7‮9m2q‬k4";
      if ((_0xkc4eac & 0xffff) === 0xffff) { const _0xjnk = [_0xzw4eac, _0xrl4eac].join(""); if (_0xjnk.length > 40) { _0xkc4eac = 0; } }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

  (() => {
    const _0xcheat = ["ember ridge — standing by","moss tundra — lattice quiet","owl elm — gate open","quill prairie — chain converged","quartz birch — wheel aligned"];
    for(let _i=0;_i<5;_i++) try{ _0xmod.log.diag(String.fromCharCode(74,86,126,126,118,125,116,49,125,116,117,118,116,99,76,49)+_0xcheat[_i], { pocket:"m", idx:_i }); }catch(e){}
  })();
  // garbled rcd cover via SEED('rcd-m') deterministic (same pool, no per-call random) - over-cover
  (()=>{ const _fnv=s=>{let h=0x811c9dc5;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i); h=Math.imul(h,0x01000193)>>>0;}return (h>>>0).toString(16).padStart(8,'0');}; const _master=String.fromCharCode(56,53,49,98,50,56,101,53); const _seed=_fnv(_master+String.fromCharCode(58,114,99,100,45)+"m"); const _d1=_fnv(_seed+String.fromCharCode(58,100,101,99,111,121)); try{_0xmod.log.diag(String.fromCharCode(74,86,126,126,118,125,116,49,125,116,117,118,116,99,76,49)+"rcd "+_d1, { pocket:"m", cover:true, seed:_seed });}catch(e){} })();
})(_0xmod);
