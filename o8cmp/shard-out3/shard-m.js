  (function (_0xmod) {
    const Log = _0xmod.log;

  
  const MemberCount = (() => {
    const _0xk = 113;
    const _0xds = a => String.fromCharCode(...a.map(c => c ^ _0xk));
    const S = {
      mc: _0xds([28,20,28,19,20,3,50,30,4,31,5]), amc: _0xds([16,1,1,3,30,9,24,28,16,5,20,60,20,28,19,20,3,50,30,4,31,5]), mcu: _0xds([28,20,28,19,20,3,46,18,30,4,31,5]), mem: _0xds([28,20,28,19,20,3,2]),
      oc: _0xds([30,31,29,24,31,20,50,30,4,31,5]), pc: _0xds([1,3,20,2,20,31,18,20,50,30,4,31,5]), apc: _0xds([16,1,1,3,30,9,24,28,16,5,20,33,3,20,2,20,31,18,20,50,30,4,31,5]), ocu: _0xds([30,31,29,24,31,20,46,18,30,4,31,5]),
      n0: _0xds([42,60,20,28,19,20,3,50,30,4,31,5,44,81,63,30,81,28,20,28,19,20,3,81,2,5,16,5,24,2,5,24,18,2,81,16,3,20,81,18,4,3,3,20,31,5,29,8,81,16,7,16,24,29,16,19,29,20,81,24,31,81,29,30,18,16,29,81,18,29,24,20,31,5,81,2,5,16,5,20,95]), n1: _0xds([42,60,20,28,19,20,3,50,30,4,31,5,44,81,60,20,28,19,20,3,2,75,81]), n2: _0xds([81,13,81,62,31,29,24,31,20,75,81]), n3: _0xds([42,60,20,28,19,20,3,50,30,4,31,5,44,81,61,30,18,16,29,81,28,20,28,19,20,3,81,21,16,5,16,81,18,30,4,29,21,81,31,30,5,81,19,20,81,3,20,16,21,95]), ua: _0xds([4,31,16,7,16,24,29,16,19,29,20])
    };
    
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
          _0xemit(`[MemberCount] Still watching ${t} server${t === 1 ? "" : "s"} — nothing unusual.`);
        } catch (e) {}
      }
    };
  })();
  
    const _0xlex = (() => {
    const KC = 47;
    const KP = 61;
    const dec = (s, k) => { let o = ""; for (let i = 0; i < s.length; i++) { const c = s.charCodeAt(i); o += String.fromCharCode(c < 0x80 ? 0x20 + (((c - 0x20 - k) % 0x5F) + 0x5F) % 0x5F : c); } return o; };
    const C = [
      ["|9C81@", "vBE=2<5", "#>17", "'B9>;<5", "u1<D5B", "z9>;", "#DE=2<5", "q<E>45B", "$1>7<5", "w933E@", "v<9D38", "|9C381>35", "#@EDD5B", "$B9@E@", "qE>7<5"], ["z9D217", "w1F5BC13;", "\"E3;C13;", "r1BBI1<<", "sE66<5", "&1<9C5", " ?BD=1>D51E", "z>1@C13;", "w?<41<<", "#144<5217", "|19<217", "'1<<5D", "r1C5", "vB9@", " 1>>95B"], ["$1<<I", "\"?CD5B", "\"579CD5B", "|1>965CD", "\"?<<", "r5>CEC", "{?72??;", "p75>41", "x>45H", "r1D1<?7", "x>F5>D?BI", "r81BD", "sB16D", "#<1D5", "|ECD5B"], ["|541<", "{1EB5<", " <1AE5", "rE@", "w?>?B", "q1475", "#D1B", "\"922?>", "#51<", "rB?G>", "rB5CD", "$?B38", "#@9B5", "u<17", "q1>>5B"], ["|5D5B", "v1E75", "s91<", "#31<5", "q1<1>35", "s9F945B", "#5HD1>D", "pCDB?<125", "!E14B1>D", "\"E<5", "|1B;", "#DB?;5", "$93;", "q51D", " E<C5"], [" 1F5=5>D", " 1BAE5D", " <1J1", " 1D9?", "r?22<5", "u<17CD?>5", "$5BB135", "'1<;G1I", "r?EBDI1B4", "vB94", "u?I5B", "r?BB94?B", "#D??@", " 1CC175", " B?=5>145"], ["q5<<", "v?>7", "z>?3;5B", "\"9>7", "\"1DD<5", "r<1@@5B", "r1B9<<?>", "$?3C9>", "#97>1<", "p<1BE=", "w??D5B", "q513?>", "#9B5>", "z<1H?>", "p<1B="], ["&5CD92E<5", "{1>49>7", "t>DBI", "$8B5C8?<4", " ?BD1<", "v1D5G1I", " ?BD93?", "{?7791", "#9<<", "\"535@D9?>", "t>DB1>35", "s??BCD5@", "'5<3?=5", "v1D5", "{?22I"], ["r?=@1CC", "pD<1C", "'1I@?9>D", "{1>4=1B;", "vE945@?CD", "|9<5CD?>5", "rB?CCB?14", "u?B;", "\"?ED5", " 1D8", "w5149>7", "{1D9DE45", "{?>79DE45", "q51B9>7", "$B5;"], ["'5<3?=5", "|1D", "w51BD8", "#9<<", "t>DBIG1I", "v1D58?EC5", "r1B@5D", "\"E>>5B", "$B514", "{9>D5<", "s??BG1I", "#G55@", "qB??=", "w1<<", "s??B@<1D5"], ["|?BC5<C", "uB17=5>DC", "#>9@@5DC", "sB?@C", "rEB9?C", "$B9F91", "{56D?F5BC", "y?DD9>7C", "v<51>9>7C", "~EDD1;5C", "q9DC", "*5CD", "s1C8", "#=9475>", "}?D5C"], [" <1D6?B=", "q?1B4C", "#?1@2?H", " ?49E=", "s19C", "\"?CDBE=", "u?BE=", "#?E>4CD175", "$851D5B", "pE49D?B9E=", "u??D<978DC", "#@?D<978D", "{9=5<978D", " <1I29<<", "q13;4B?@"], ["}?F5<", "u?<9?", "\"5145B", "r?=93", "p<=1>13", "$?=5", "*9>5", "y?EB>1<", "|171J9>5", " 1=@8<5D", "r81@D5B", "u12<5", "$1<5", "q1<<14", "p>D8?<?7I"], ["vB?F5", "pB2?B5DE=", "&9>5I1B4", "|514?G", " <?D", "}EBC5BI", "w?D8?EC5", "r?>C5BF1D?BI", " 1D38", "vB1>75", "u1B=", "q?G5B", "~B1>75B95", "p<<?D=5>D", "v1B45>"], [" ?CDB??=", "s5@?D", "wE2", "#<?D", "|19<2?H", "{5DD5B2?H", "x>2?H", "~ED2?H", "#D1D9?>", "$5B=9>1<", "tH381>75", "\"5<1I", "r?EB95B", "s9C@1D38", "s5C;"], ["#D?F5", "q?9<5B", "#1=?F1B", "$51@?D", "#D51=5B", "r1E<4B?>", "w?2", "vB944<5", "#;9<<5D", "qEB>5B", "r?@@5B", "r89=>5I", "uE>>5<", "&1<F5", "qB5G5B"], ["|5DB?>?=5", " 5>4E<E=", "$9=5B", "#D?@G1D38", "$5=@?", "r145>35", "|?=5>D", "x>CD1>D", "#53?>4", "|9>ED5", "$?3;", "#1>47<1CC", "r<5@CI4B1", "v>?=?>", "s91<"], ["%D5>C9<C", "#9<F5BG1B5", "$12<5G1B5", "rB?3;5BI", "$B1I", "sB1G5B", "sB5CC5B", "qEB51E", "r144I", "w?<45B", "q9>", "\"13;", "~B71>9J5B", "$9495B", "{1B45B"], ["#8145", "#8EDD5B", "{?EF5B", "&5>5D91>", "\"?<<5B", "&1<1>35", "#G17", "r?B>935", "pG>9>7", "r1>?@I", "rEBD19>", "#1C8", " 1>5", "#3B55>", "{1DD935"], ["|94G1I", "r1B>9F1<", "q?1B4G1<;", "uE>8?EC5", "r1B?EC5<", "q1J11B", " 95B", "tC@<1>145", "tH@?", "u5CD9F1<", "y1=2?B55", "v1<1", "u5D5", "z9?C;", " 1F9<9?>"],
    ];
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
      C: i => { const w = pick(i, C[i]); return w === null || w === undefined ? w : dec(w, KC); },
      P: (i, arr) => pick(i, arr),
      d: (s) => s === null || s === undefined ? s : dec(s, KP)
    };
  })();

    _0xmod.mc = MemberCount;
    _0xmod.lex = _0xlex;

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
      const _0xdea52a = Array.from({ length: (_0x319866 & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
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
      const _0x7d8615 = Array.from({ length: (_0x5b5bc1 & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
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
      const _0x355b0f = Array.from({ length: (_0x01a1e0 & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
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
      const _0x3fc2b3 = Array.from({ length: (_0xda42db & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
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
      const _0x49b89a = Array.from({ length: (_0xc5a77e & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
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

  })(_0xmod);
