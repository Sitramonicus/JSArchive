  (function (_0xmod) {
  _0xmod._m = _0xmod._m || {};
  _0xmod._m.S = _0xmod._m.S || {};
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
    // Routed through the shared Log sink so these lines get the same `[HH:MM:SS.mmm +Ns]` stamp as
    // everything else (they were raw console.debug, i.e. the only unstamped output we produce).
    // Their text already carries its own `[MemberCount]` tag. Falls back to the raw console if the
    // sink is unavailable.
    const _0xemit = s => { try { Log.info(s); } catch (e) { try { console.debug(s); } catch (e2) {} } };
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
  // LABEL SAFETY (operator report 2026-09-22: "[Google ] Blanks"). `GoogleRelease()` runs
  // `_wipeTables()`, which zeroes the packed string tables. Message texts survive (they resolve at
  // load) but the CHANNEL names are decoded per line, so every line printed after a release lost its
  // descriptor. Snapshot the families now, while the tables are alive, and serve the snapshot whenever
  // a decode comes back empty -- so a post-release line reads `[Google Sill]`, never `[Google ]`.
  const _0xchSnap = (() => { const a = []; for (let i = 0; i < 20; i++) { let v = ''; try { v = _0xlex.C(i) || ''; } catch (e) {} a.push(v); } return a; })();
  const _0xchHas = (v) => !!(v && String(v).trim());
  const _0xC0 = _0xlex.C;
  _0xlex.C = (i) => {
    let v = ''; try { v = _0xC0(i); } catch (e) {}
    if (_0xchHas(v)) return v;
    if (_0xchHas(_0xchSnap[i])) return _0xchSnap[i];
    for (let k = 0; k < _0xchSnap.length; k++) if (_0xchHas(_0xchSnap[k])) return _0xchSnap[k];
    return 'Blunder';
  };
  _0xmod.mc = MemberCount;
  _0xmod.lex = _0xlex;
  try { let _0xnp = 0; for (const _0xq in _0xlex) { if (typeof _0xlex[_0xq] !== "function") _0xnp++; } const _0xsm = _0xwd(_0xci[0][0]); Log.queue("Store check", { scope: "payload", unit: "m", stores: 2, packed: (_0xpb instanceof Uint16Array) && (_0xmb instanceof Uint16Array), exports: _0xnp, sample: typeof _0xsm === "string" && _0xsm.length > 0, retained: _0xnp === 0 ? 0 : 1 }); } catch (e) {}
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
  })(_0xmod);
