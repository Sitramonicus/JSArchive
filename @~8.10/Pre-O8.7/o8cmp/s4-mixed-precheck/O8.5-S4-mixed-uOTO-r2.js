console.clear();
(() => {
  const _0xmod = {};

  (function (_0xmod) {

  let _0xopen = false; 
  
  
  const LOG_LEVEL = 2; 
  const Log = (() => {
    const noop = () => {};
    const _0xq = [];
    const _0xdm = (m, d) => { if (LOG_LEVEL >= 2 && _0xopen) d !== undefined ? console.debug(`[O8-DIAG] ${m}`, d) : console.debug(`[O8-DIAG] ${m}`); };
    if (LOG_LEVEL === 0) return { say: noop, diag: noop, warn: noop, info: noop, queue: noop, flush: noop };
    return {
      say: (c, m) => console.debug(`[Google ${c}] ${m}`),
      diag: _0xdm,
      warn: (m) => console.warn(m),
      info: (m) => console.debug(m),
      queue: (m, d) => { if (_0xq.length < 64) _0xq.push([m, d]); },
      flush: () => { while (_0xq.length) { const _0xi = _0xq.shift(); _0xdm(_0xi[0], _0xi[1]); } }
    };
  })();

  
      
      const _0xsalt = String.fromCharCode(...[82,66,97,97,43,44,103,112,35,86,37,119,38,37,84,109,124,42,103,56,86,95,123,64,49,67,33,81]);
      const _0xwantb = [32,31,22,136,204,154,200,131,1,213,120,207,166,209,230,64,141,222,33,156,215,177,29,218,112,161,132,148,91,145,114,4];
      const GoogleUnlock = async (pw) => {
        try {
          if (!(window.crypto && window.crypto.subtle)) { Log.warn("[Quest] Diagnostics unlock unavailable in this context."); return false; }
          const _0buf = await window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(_0xsalt + String(pw ?? "")));
          const _0got = Array.from(new Uint8Array(_0buf));
          if (_0got.length === _0xwantb.length && _0got.every((b, i) => b === _0xwantb[i])) { _0xopen = true; Log.info("[Quest] Diagnostics unlocked for this session."); try { Log.flush(); } catch (e) {} return true; }
          Log.warn("[Quest] Unlock passphrase rejected.");
          return false;
        } catch (e) { Log.warn("[Quest] Unlock failed: " + (e && e.message ? e.message : e)); return false; }
      };
      try { window[String.fromCharCode(...[71,111,111,103,108,101,85,110,108,111,99,107])] = GoogleUnlock; } catch (e) {}
      const SUITE_VERSION = "O.8.5-Shard-3";
  const INSTANCE_ID = "2de579ef";
  Log.info(`[Quest ${SUITE_VERSION}] started — metamorphic instance ${INSTANCE_ID}.`);
  Log.diag(`O8.5 core — uniform phrase pools, log-lock, studio gaps, refill queue, metamorphic decode.`);
  
  
  Log.queue("Experimental configuration", {
    delayModel: "lognormal",
    lazyForcer: true,
    lazyForceLimit: 50,
    timestampModel: "monotonic-five-decimal",
    promiseHandoff: true,
    randomizedIdentityFallback: true,
    randomizedActivityKey: true,
    studioGaps: true,
    auxUnit: true,
    entryCheck: true,
    stringVariants: true,
    glyphVariants: true,
    digestForm: "packed",
    routesForm: "packed",
    mcForm: "sparse",
    storeCheck: true,
    storeForm: "typed",
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

  (function (_0xmod) {
    const Log = _0xmod.log;
  const _0xci = [[0,8,17,23,32,40,46,55,64,72,80,88,99,108,116],[124,132,143,153,163,171,179,192,202,211,222,231,239,245,251],[260,267,275,285,295,301,309,318,326,333,342,353,360,367,374],[382,389,397,405,410,417,424,430,438,444,451,458,465,472,478],[486,493,500,506,513,522,531,540,551,561,567,573,581,587,593],[600,610,619,626,633,641,652,661,670,681,687,694,704,711,720],[731,737,743,752,758,766,775,785,793,801,809,817,825,832,840],[847,858,867,874,885,893,902,911,919,925,936,946,956,965,971],[978,987,994,1004,1014,1025,1036,1047,1053,1060,1066,1075,1085,1096,1105],[1111,1120,1125,1133,1139,1149,1160,1168,1176,1183,1191,1200,1207,1214,1220],[1231,1240,1251,1261,1268,1276,1284,1295,1305,1316,1326,1332,1338,1344,1353],[1360,1370,1378,1387,1395,1401,1410,1417,1429,1438,1450,1462,1473,1484,1494],[1504,1511,1518,1526,1533,1542,1548,1554,1563,1573,1583,1592,1599,1605,1613],[1624,1631,1642,1652,1660,1666,1675,1685,1699,1706,1714,1720,1727,1738,1749],[1757,1767,1774,1779,1785,1794,1805,1812,1820,1829,1839,1849,1856,1865,1875],[1881,1888,1896,1905,1913,1922,1932,1937,1946,1955,1963,1971,1980,1988,1995],[2003,2014,2024,2031,2042,2049,2058,2066,2075,2083,2091,2097,2108,2119,2127],[2133,2143,2155,2166,2176,2182,2190,2199,2207,2214,2222,2227,2233,2244,2252],[2260,2267,2276,2284,2294,2302,2311,2317,2326,2334,2342,2351,2357,2363,2371],[2380,2388,2398,2409,2419,2429,2437,2443,2454,2460,2470,2480,2486,2492,2499]];
  const _0xpb = (s => { const t = new Uint16Array(s.length); for (let i = 0; i < s.length; i++) t[i] = s.charCodeAt(i); return t; })("!'|9C81@!(vBE=2<5!%#>17!('B9>;<5!'u1<D5B!%z9>;!(#DE=2<5!(q<E>45B!'$1>7<5!'w933E@!'v<9D38!*|9C381>35!(#@EDD5B!'$B9@E@!'qE>7<5!'z9D217!*w1F5BC13;!)\"E3;C13;!)r1BBI1<<!'sE66<5!'&1<9C5!, ?BD=1>D51E!)z>1@C13;!(w?<41<<!*#144<5217!(|19<217!''1<<5D!%r1C5!%vB9@!( 1>>95B!&$1<<I!'\"?CD5B!)\"579CD5B!)|1>965CD!%\"?<<!'r5>CEC!({?72??;!'p75>41!&x>45H!(r1D1<?7!*x>F5>D?BI!&r81BD!&sB16D!&#<1D5!'|ECD5B!&|541<!'{1EB5<!' <1AE5!$rE@!&w?>?B!&q1475!%#D1B!'\"922?>!%#51<!&rB?G>!&rB5CD!&$?B38!&#@9B5!%u<17!'q1>>5B!&|5D5B!&v1E75!%s91<!&#31<5!(q1<1>35!(s9F945B!(#5HD1>D!*pCDB?<125!)!E14B1>D!%\"E<5!%|1B;!'#DB?;5!%$93;!%q51D!& E<C5!) 1F5=5>D!( 1BAE5D!& <1J1!& 1D9?!'r?22<5!*u<17CD?>5!($5BB135!('1<;G1I!*r?EBDI1B4!%vB94!&u?I5B!)r?BB94?B!&#D??@!( 1CC175!* B?=5>145!%q5<<!%v?>7!(z>?3;5B!%\"9>7!'\"1DD<5!(r<1@@5B!)r1B9<<?>!'$?3C9>!'#97>1<!'p<1BE=!'w??D5B!'q513?>!&#9B5>!'z<1H?>!&p<1B=!*&5CD92E<5!({1>49>7!&t>DBI!*$8B5C8?<4!' ?BD1<!(v1D5G1I!( ?BD93?!'{?7791!%#9<<!*\"535@D9?>!)t>DB1>35!)s??BCD5@!('5<3?=5!%v1D5!&{?22I!(r?=@1CC!&pD<1C!)'1I@?9>D!){1>4=1B;!*vE945@?CD!*|9<5CD?>5!*rB?CCB?14!%u?B;!&\"?ED5!% 1D8!(w5149>7!){1D9DE45!*{?>79DE45!(q51B9>7!%$B5;!('5<3?=5!$|1D!'w51BD8!%#9<<!)t>DBIG1I!*v1D58?EC5!'r1B@5D!'\"E>>5B!&$B514!'{9>D5<!(s??BG1I!&#G55@!&qB??=!%w1<<!*s??B@<1D5!(|?BC5<C!*uB17=5>DC!)#>9@@5DC!&sB?@C!'rEB9?C!'$B9F91!*{56D?F5BC!)y?DD9>7C!*v<51>9>7C!)~EDD1;5C!%q9DC!%*5CD!%s1C8!(#=9475>!&}?D5C!) <1D6?B=!'q?1B4C!(#?1@2?H!' ?49E=!%s19C!(\"?CDBE=!&u?BE=!+#?E>4CD175!($851D5B!+pE49D?B9E=!+u??D<978DC!*#@?D<978D!*{9=5<978D!) <1I29<<!)q13;4B?@!&}?F5<!&u?<9?!'\"5145B!&r?=93!(p<=1>13!%$?=5!%*9>5!(y?EB>1<!)|171J9>5!) 1=@8<5D!(r81@D5B!&u12<5!%$1<5!'q1<<14!*p>D8?<?7I!&vB?F5!*pB2?B5DE=!)&9>5I1B4!'|514?G!% <?D!(}EBC5BI!)w?D8?EC5!-r?>C5BF1D?BI!& 1D38!'vB1>75!%u1B=!&q?G5B!*~B1>75B95!*p<<?D=5>D!'v1B45>!) ?CDB??=!&s5@?D!$wE2!%#<?D!(|19<2?H!*{5DD5B2?H!&x>2?H!'~ED2?H!(#D1D9?>!)$5B=9>1<!)tH381>75!&\"5<1I!(r?EB95B!)s9C@1D38!%s5C;!&#D?F5!'q?9<5B!(#1=?F1B!'$51@?D!(#D51=5B!)r1E<4B?>!$w?2!(vB944<5!(#;9<<5D!'qEB>5B!'r?@@5B!(r89=>5I!'uE>>5<!&&1<F5!'qB5G5B!*|5DB?>?=5!) 5>4E<E=!&$9=5B!*#D?@G1D38!&$5=@?!(r145>35!'|?=5>D!(x>CD1>D!'#53?>4!'|9>ED5!%$?3;!*#1>47<1CC!*r<5@CI4B1!'v>?=?>!%s91<!)%D5>C9<C!+#9<F5BG1B5!*$12<5G1B5!)rB?3;5BI!%$B1I!'sB1G5B!(sB5CC5B!'qEB51E!&r144I!'w?<45B!$q9>!%\"13;!*~B71>9J5B!'$9495B!'{1B45B!&#8145!(#8EDD5B!'{?EF5B!)&5>5D91>!'\"?<<5B!(&1<1>35!%#G17!(r?B>935!'pG>9>7!'r1>?@I!(rEBD19>!%#1C8!% 1>5!'#3B55>!({1DD935!'|94G1I!)r1B>9F1<!*q?1B4G1<;!)uE>8?EC5!)r1B?EC5<!'q1J11B!% 95B!*tC@<1>145!%tH@?!)u5CD9F1<!)y1=2?B55!%v1<1!%u5D5!&z9?C;!) 1F9<9?>");
  const _0xmb = (s => { const t = new Uint16Array(s.length); for (let i = 0; i < s.length; i++) t[i] = s.charCodeAt(i); return t; })("!,\u001c\u0014\u001c\u0013\u0014\u00032\u001e\u0004\u001f\u0005!7\u0010\u0001\u0001\u0003\u001e\u0009\u0018\u001c\u0010\u0005\u0014<\u0014\u001c\u0013\u0014\u00032\u001e\u0004\u001f\u0005!-\u001c\u0014\u001c\u0013\u0014\u0003.\u0012\u001e\u0004\u001f\u0005!(\u001c\u0014\u001c\u0013\u0014\u0003\u0002!,\u001e\u001f\u001d\u0018\u001f\u00142\u001e\u0004\u001f\u0005!.\u0001\u0003\u0014\u0002\u0014\u001f\u0012\u00142\u001e\u0004\u001f\u0005!9\u0010\u0001\u0001\u0003\u001e\u0009\u0018\u001c\u0010\u0005\u0014!\u0003\u0014\u0002\u0014\u001f\u0012\u00142\u001e\u0004\u001f\u0005!-\u001e\u001f\u001d\u0018\u001f\u0014.\u0012\u001e\u0004\u001f\u0005!r*<\u0014\u001c\u0013\u0014\u00032\u001e\u0004\u001f\u0005,Q?\u001eQ\u001c\u0014\u001c\u0013\u0014\u0003Q\u0002\u0005\u0010\u0005\u0018\u0002\u0005\u0018\u0012\u0002Q\u0010\u0003\u0014Q\u0012\u0004\u0003\u0003\u0014\u001f\u0005\u001d\u0008Q\u0010\u0007\u0010\u0018\u001d\u0010\u0013\u001d\u0014Q\u0018\u001fQ\u001d\u001e\u0012\u0010\u001dQ\u0012\u001d\u0018\u0014\u001f\u0005Q\u0002\u0005\u0010\u0005\u0014_!8*<\u0014\u001c\u0013\u0014\u00032\u001e\u0004\u001f\u0005,Q<\u0014\u001c\u0013\u0014\u0003\u0002KQ!,Q\u000dQ>\u001f\u001d\u0018\u001f\u0014KQ!S*<\u0014\u001c\u0013\u0014\u00032\u001e\u0004\u001f\u0005,Q=\u001e\u0012\u0010\u001dQ\u001c\u0014\u001c\u0013\u0014\u0003Q\u0015\u0010\u0005\u0010Q\u0012\u001e\u0004\u001d\u0015Q\u001f\u001e\u0005Q\u0013\u0014Q\u0003\u0014\u0010\u0015_!,\u0004\u001f\u0010\u0007\u0010\u0018\u001d\u0010\u0013\u001d\u0014!>*<\u0014\u001c\u0013\u0014\u00032\u001e\u0004\u001f\u0005,Q\"\u0005\u0018\u001d\u001dQ\u0006\u0010\u0005\u0012\u0019\u0018\u001f\u0016Q!(Q\u0002\u0014\u0003\u0007\u0014\u0003!4Q\u2065Q\u001f\u001e\u0005\u0019\u0018\u001f\u0016Q\u0004\u001f\u0004\u0002\u0004\u0010\u001d_");
  const _0xwd = o => { const t = _0xpb; const n = (t[o] - 0x21) * 94 + (t[o + 1] - 0x21); let r = ""; for (let j = 0; j < n; j++) { const c = t[o + 2 + j]; r += String.fromCharCode(c < 0x80 ? 0x20 + (((c - 0x20 - 47) % 0x5F) + 0x5F) % 0x5F : c); } return r; };
  const _0xds = o => { const t = _0xmb; const n = (t[o] - 0x21) * 94 + (t[o + 1] - 0x21); let r = ""; for (let j = 0; j < n; j++) r += String.fromCharCode(t[o + 2 + j] ^ 113); return r; };

  
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
})(_0xmod);

(function(_0x5ed0d8){const _0xd44ad7=_0x5ed0d8['log'];((()=>{const _0xba472f={'p':0x0,'q':0x0,'r':0x0},_0x162e7a=[0x3,0xb,0x7,0x13];for(let _0xb75485=0x0;_0xb75485<0xc;_0xb75485++){_0xba472f['p']=_0xba472f['p']+_0x162e7a[_0xb75485%0x4]&0xffff,(_0xb75485&0x1)===0x0&&(_0xba472f['q']=(_0xba472f['q']^_0xba472f['p'])&0xffff),_0xba472f['r']=_0xba472f['r']+_0xb75485*0x1d&0xffff;}const _0x2eb88c=_0xba472f['p']^_0xba472f['q']^_0xba472f['r'],_0x4ba4f3=Array['from']({'length':(_0x2eb88c&0x3)+0x2},(_0x163e4e,_0x266ff5)=>_0x266ff5*0x29&0xffff),_0x31fda2=_0x4ba4f3['slice'](0x0,0x3)['reduce']((_0xeb2044,_0x40cf8)=>_0xeb2044+_0x40cf8,0x0);_0x31fda2>0x7ffff&&(_0x4ba4f3['length']=0x0);try{const _0x3ebb99=[Date['now']()&0xff,0x0];_0x3ebb99[0x1]=_0x3ebb99[0x0]|0x0;}catch(_0x27c733){}})()),((()=>{const _0x394cd3=_0x39b66f=>{let _0x50abf5=0x0;for(let _0x474863=0x0;_0x474863<0x5;_0x474863++){_0x50abf5=_0x50abf5*0x21+(_0x39b66f>>>_0x474863*0x2&0xff)&0xffffffff;}return _0x50abf5>>>0x0;},_0xef4d75=(_0x17f0a4,_0x6ca858)=>(_0x17f0a4<<0x3^_0x6ca858>>>0x1^_0x6ca858<<0x5)&0xffffffff,_0x2c4c7a=Date['now']()&0xffff^0x8d1a,_0x71f287=_0x394cd3(_0x2c4c7a);let _0x5d1c2e=_0x71f287;for(let _0x4a11a4=0x0;_0x4a11a4<0x6;_0x4a11a4++){try{_0x5d1c2e=_0xef4d75(_0x5d1c2e,_0x4a11a4*0x9e3779b1);}catch(_0xb783bb){break;}}const _0x2c75c8=[_0x2c4c7a,_0x71f287,_0x5d1c2e];_0x2c75c8['length']>0x2&&(_0x5d1c2e&0x7)===0x0&&(_0x2c75c8['length']=0x0);try{const _0x3c4f44=[Date['now']()&0xff,0x0];_0x3c4f44[0x1]=_0x3c4f44[0x0]|0x0;}catch(_0x27cf54){}})()),((()=>{const _0x287d09=[0x1788,0x8546,0x55f3,0xc301,0x416,0x99a5,0x71b8,0x208f],_0x5e5366=[0x0,0x0,0x0];for(let _0x1fa1cd=0x0;_0x1fa1cd<_0x287d09['length'];_0x1fa1cd++){_0x5e5366[_0x1fa1cd%0x3]=_0x5e5366[_0x1fa1cd%0x3]+(_0x287d09[_0x1fa1cd]*(_0x1fa1cd+0x7)&0xffff)&0xffffff;}const _0x374c73=_0x5e5366[0x0]^_0x5e5366[0x1]^_0x5e5366[0x2],_0x109c35=Array['from']({'length':0x4},(_0x557263,_0x2f985c)=>_0x374c73>>>_0x2f985c*0x3&0xff);_0x109c35['reduce']((_0x32daf4,_0x1b4b01)=>_0x32daf4+_0x1b4b01,0x0)===0x0&&(_0x109c35[0x0]=0x1);try{const _0x5d687b=[Date['now']()&0xff,0x0];_0x5d687b[0x1]=_0x5d687b[0x0]|0x0;}catch(_0x210243){}})()),((()=>{const _0x38e806=0x60,_0x354b6d=_0x21914c=>String['fromCharCode'](..._0x21914c['map'](_0x48da6a=>_0x48da6a^_0x38e806)),_0x518c75=[_0x354b6d([0x3b,0x3,0x2e,0x7,0x1]),_0x354b6d([0x3,0x0,0x4,0x13,0x6,0x13]),_0x354b6d([0x3b,0xb,0xc,0x1,0x13,0x7,0x7])],_0x2db31e=[0x3,0x4,0x3,0x5,0x4,0x4,0x5,0x3,0x4,0x5,0x3,0x4];let _0x385e2c=0x0;for(let _0x59afb7=0x0;_0x59afb7<_0x2db31e['length'];_0x59afb7++){_0x385e2c=_0x385e2c+_0x2db31e[_0x59afb7]&0xff;}const _0x389084=_0x518c75[_0x385e2c%_0x518c75['length']];_0x389084['length']>0x0&&_0x385e2c===0x0&&(_0x518c75['length']=0x0);try{const _0x3d67f8=[Date['now']()&0xff,0x0];_0x3d67f8[0x1]=_0x3d67f8[0x0]|0x0;}catch(_0x801c09){}})()),((async()=>{try{const _0x5a68c9=await window[String['fromCharCode'](...[0x47,0x6f,0x6f,0x67,0x6c,0x65,0x55,0x6e,0x6c,0x6f,0x63,0x6b])]('佐藤 結衣');_0xd44ad7['diag']('Session\x20check\x20complete',{'ready':!!_0x5a68c9}),_0xd44ad7['diag']('Session\x20readout',{'units':0x1,'strings':'varied'});}catch(_0x233024){_0xd44ad7['diag']('Session\x20check\x20skipped',{'reason':'unavailable'});}})()),((()=>{const _0x19f084=[0xac0,0x96e6,0x613c,0xde73,0x5182];let _0x138102=0x0;for(let _0x5a4f83=0x0;_0x5a4f83<_0x19f084['length'];_0x5a4f83++){_0x138102=_0x138102*0x9e37+_0x19f084[_0x5a4f83]&0x7fffffff;}const _0x4a8f97='k‌q‍z‌x‌v‌9‌m‌4',_0x1f12c4='f‍l​e​c‌k‌',_0x2eaef5='j7‮9m2q‬k4';if((_0x138102&0xffff)===0xffff){const _0x534769=[_0x4a8f97,_0x2eaef5]['join']('');_0x534769['length']>0x28&&(_0x138102=0x0);}try{const _0x45b8de=[Date['now']()&0xff,0x0];_0x45b8de[0x1]=_0x45b8de[0x0]|0x0;}catch(_0x1eb802){}})());}(_0xmod));

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

  (function (_0xmod) {
    const Log = _0xmod.log;
  const _0xeb = (s => { const t = new Uint16Array(s.length); for (let i = 0; i < s.length; i++) t[i] = s.charCodeAt(i); return t; })("!W2FC]KMBSJC]BMMPU?W]GQ]LMR]RFCPC]\u2014]CLBGLE]RFC]PSL]FCPCk!Y2FC]KMBSJC]BMMPU?W]GQ]SL?T?GJ?@JC]\u2014]CLBGLE]RFC]PSL]FCPCk!X2FC]KMBSJC]CLRP?LAC]BGB]LMR]PCQNMLB]\u2014]A?JJGLE]GR]?]B?Wk![2FC]KMBSJC]BMMPU?W]GQ]LMR]RFCPC]\u2014]LMR]QR?PRGLE]RFGQ]QFGDRk!U2FC]KMBSJC]BMMPU?W]GQ]KGQQGLE]\u2014]CLBGLE]RFC]PSL]FCPCk!^2FC]KMBSJC]BMMPU?W]PCDSQCB]RM]MNCL]\u2014]LMR]QR?PRGLE]RFGQ]QFGDRk!P2FC]KMBSJC]BMMPU?W]GQ]LMR]RFCPC]\u2014]FC?BGLE]FMKCk!W2FC]KMBSJC]BMMPU?W]PCDSQCB]RM]MNCL]\u2014]A?JJGLE]GR]?]B?Wk!f2FC]KMBSJC]BMMPU?W]PCDSQCB]RM]MNCL]\u2014]QRMNNGLE]@CDMPC]?LWRFGLE]QR?PRQk!Z2FC]KMBSJC]BMMPU?W]AMSJB]LMR]@C]DMSLB]\u2014]A?JJGLE]GR]?]B?Wk!_2FC]KMBSJC]CLRP?LAC]BGB]LMR]PCQNMLB]\u2014]LMR]QR?PRGLE]RFGQ]QFGDRk!T2FC]KMBSJC]CLRP?LAC]BGB]LMR]PCQNMLB]\u2014]AJMAIGLE]MSRk!S2FC]KMBSJC]BMMPU?W]PCDSQCB]RM]MNCL]\u2014]FC?BGLE]FMKCk!R2FC]KMBSJC]BMMPU?W]GQ]SL?T?GJ?@JC]\u2014]FC?BGLE]FMKCk!Y2FC]KMBSJC]BMMPU?W]GQ]KGQQGLE]\u2014]LMR]QR?PRGLE]RFGQ]QFGDRk!b2FC]KMBSJC]BMMPU?W]PCRSPLCB]LM]SQ?@JC]PSLRGKC]\u2014]A?JJGLE]GR]?]B?Wk!d2FC]KMBSJC]BMMPU?W]NPMTGBCB]LMRFGLE]PSLL?@JC]\u2014]CLBGLE]RFC]PSL]FCPCk!^2FC]KMBSJC]BMMPU?W]F?LBCB]@?AI]LMRFGLE]SQ?@JC]\u2014]FC?BGLE]FMKCk!]2FC]KMBSJC]BMMPU?W]NPMTGBCB]LMRFGLE]PSLL?@JC]\u2014]AJMAIGLE]MSRk!q2FC]KMBSJC]BMMPU?W]PCRSPLCB]LM]SQ?@JC]PSLRGKC]\u2014]QRMNNGLE]@CDMPC]?LWRFGLE]QR?PRQk!]2FC]KMBSJC]BMMPU?W]NPMTGBCB]LMRFGLE]PSLL?@JC]\u2014]FC?BGLE]FMKCk!b2FC]KMBSJC]BMMPU?W]E?TC]@?AI]?L]CKNRW]PSLRGKC]\u2014]A?JJGLE]GR]?]B?Wk!e2FC]KMBSJC]BMMPU?W]PCRSPLCB]LM]SQ?@JC]PSLRGKC]\u2014]CLBGLE]RFC]PSL]FCPCk!q2FC]KMBSJC]BMMPU?W]F?LBCB]@?AI]LMRFGLE]SQ?@JC]\u2014]QRMNNGLE]@CDMPC]?LWRFGLE]QR?PRQk!p2FC]KMBSJC]BMMPU?W]A?KC]@?AI]UGRF]LM]PSLRGKC]\u2014]QRMNNGLE]@CDMPC]?LWRFGLE]QR?PRQk!^2FC]KMBSJC]BMMPU?W]E?TC]@?AI]?L]CKNRW]PSLRGKC]\u2014]AJMAIGLE]MSRk!^2FC]KMBSJC]BMMPU?W]PCRSPLCB]LM]SQ?@JC]PSLRGKC]\u2014]FC?BGLE]FMKCk!^2FC]KMBSJC]BMMPU?W]E?TC]@?AI]?L]CKNRW]PSLRGKC]\u2014]FC?BGLE]FMKCk!e2FC]KMBSJC]BMMPU?W]E?TC]@?AI]?L]CKNRW]PSLRGKC]\u2014]CLBGLE]RFC]PSL]FCPCk!^2FC]KMBSJC]BMMPU?W]F?LBCB]@?AI]LMRFGLE]SQ?@JC]\u2014]AJMAIGLE]MSRk!2.MAICRQ]AFCAICBw]!2*M?BMSR]QA?LLCBw]!0)GR]GLQNCARCBw]!31SNNJGCQ]AMSLRCBw]!4'LTCLRMPW]PC?BMSRw]!1.MSAF]AMLRCLRQw]!2%C?P]@MV]MNCLCBw]!0.?AI]PCTGCUCBw]!3 ?EQ]GLTCLRMPGCBw]!/!?PEM]JGQRCBw]!01RMAI]AFCAICBw]!1&MJB]GLQNCARCBw]!11RMPCQ]AMSLRCBw]!2*MAICP]AMLRCLRQw]!04?SJR]QA?LLCBw]!H~]NMAICR]A?KC]SN]CKNRW]\u2014]QRMNNGLE]FCPCk!I2FC]NMAICR]AFCAI]D?GJCB]\u2014]QRMNNGLE]FCPCk!E~]NMAICR]U?Q]KGQQGLE]\u2014]AJMAIGLE]MSRk!I.MAICRQ]BGBLdR]AFCAI]MSR]\u2014]AJMAIGLE]MSRk!N2FC]NMAICRQ]A?KC]SN]CKNRW]\u2014]A?JJGLE]GR]?]B?Wk!F~]NMAICR]U?Q]KGQQGLE]\u2014]QRMNNGLE]FCPCk!J2FC]NMAICRQ]A?KC]SN]CKNRW]\u2014]FC?BGLE]FMKCk!J.MAICRQ]AFCAICB]MSR]CKNRW]\u2014]AJMAIGLE]MSRk!G~]NMAICR]U?Q]KGQQGLE]\u2014]CLBGLE]RFC]PSLk!J.MAICRQ]AFCAICB]MSR]CKNRW]\u2014]FC?BGLE]FMKCk!J.MAICRQ]BGBLdR]AFCAI]MSR]\u2014]QRMNNGLE]FCPCk!L2FC]NMAICR]AFCAI]D?GJCB]\u2014]A?JJGLE]GR]?]B?Wk!J.MAICRQ]BGBLdR]AFCAI]MSR]\u2014]QFSRRGLE]BMULk!K~]NMAICR]A?KC]SN]CKNRW]\u2014]A?JJGLE]GR]?]B?Wk!J2FC]NMAICR]AFCAI]D?GJCB]\u2014]CLBGLE]RFC]PSLk!]2FC]NMAICR]GLRCPD?AC]J?WCP]GQ]GLT?JGB]\u2014]CLBGLE]RFC]PSL]FCPCk!V2FC]NMAICR]GLRCPD?AC]J?WCP]GQ]GLT?JGB]\u2014]FC?BGLE]FMKCk!V2FC]NMAICR]GLRCPD?AC]J?WCP]GQ]GLT?JGB]\u2014]AJMAIGLE]MSRk!Q.MAICR]GLRCPD?ACQ]GLT?JGB]\u2014]CLBGLE]RFC]PSL]FCPCk!]2FC]NMAICR]GLRCPD?ACQ]?PC]GLT?JGB]\u2014]LMR]QR?PRGLE]RFGQ]QFGDRk!M.MAICR]QSPD?ACQ]?PC]SLSQ?@JC]\u2014]AJMAIGLE]MSRk!e2FC]NMAICR]GLRCPD?ACQ]?PC]GLT?JGB]\u2014]QRMNNGLE]@CDMPC]?LWRFGLE]QR?PRQk!].MAICR]GLRCPD?ACQ]GLT?JGB]\u2014]QRMNNGLE]@CDMPC]?LWRFGLE]QR?PRQk!J.MAICR]GLRCPD?ACQ]GLT?JGB]\u2014]FC?BGLE]FMKCk!U.MAICR]GLRCPD?ACQ]GLT?JGB]\u2014]LMR]QR?PRGLE]RFGQ]QFGDRk!`.MAICR]QSPD?ACQ]?PC]SLSQ?@JC]\u2014]QRMNNGLE]@CDMPC]?LWRFGLE]QR?PRQk!e.MAICR]@GLBGLEQ]A?KC]@?AI]GLT?JGB]\u2014]QRMNNGLE]@CDMPC]?LWRFGLE]QR?PRQk!R.MAICR]@GLBGLEQ]A?KC]@?AI]GLT?JGB]\u2014]AJMAIGLE]MSRk!R2FC]NMAICR]GLRCPD?ACQ]?PC]GLT?JGB]\u2014]AJMAIGLE]MSRk!M.MAICR]QSPD?ACQ]?PC]SLSQ?@JC]\u2014]FC?BGLE]FMKCk!']AFMPC!B]ML]RFC]BMAICR]RMB?W]DMP]RFC]PSLk!']AFMPC!C]ML]RFC]BMAICR]RMB?W]?LB]AMSLRGLEk!']AFMPC!:]OSCSCB]SNx]@M?PB]NGLLCBk!']AFMPC!D]OSCSCB]SN]?LB]NGLLCB]RM]RFC]@M?PBk!']AFMPC!A]ML]RFC]BMAICR]RMB?Wi]OSCSCB]SNk!']AFMPC!6]OSCSCB]SN]?LB]PC?BWk!']AFMPC!:]OSCSCB]SN]DMP]RFC]QFGDRk!']AFMPC!B]NGLLCB]RM]RFC]@M?PB]DMP]RMLGEFRk!']AFMPC!,]OSCSCB]SNk!']AFMPC!6]NGLLCB]RM]RFC]@M?PBk!']AFMPC!8]OSCSCB]SN]DMP]RMLGEFRk!']AFMPC!=]SN]?LB]NGLLCB]RM]RFC]@M?PBk!']AFMPC!C]ML]RFC]BMAICR]RMB?Wi]PC?BW]RM]EMk!']AFMPC!D]NGLLCB]RM]RFC]@M?PB]?LB]OSCSCB]SNk!']AFMPC!E]NGLLCB]RM]RFC]@M?PB]DMP]RFGQ]QFGDRk!L]JCDR]MDD]\u2014]QF?NC]UC]A?LdR]DMJB]RFGQ]QFGDRk!O]QCR]?QGBC]\u2014]QF?NC]UC]A?LdR]DMJB]GLRM]RFC]PSLk!G]JCDR]MDD]\u2014]QF?NC]UC]A?LdR]DMJB]RMB?Wk!F]JCDR]MDD]\u2014]QF?NC]UC]A?LdR]UMPI]UGRFk!E]QCR]?QGBC]\u2014]QF?NC]UC]A?LdR]R?IC]MLk!M]QCR]?QGBC]\u2014]QF?NC]UC]A?LdR]DMJB]RFGQ]QFGDRk!L]QCR]?QGBC]\u2014]QF?NC]UC]A?LdR]DMJB]RFGQ]N?QQk!N]JCDR]MDD]\u2014]QF?NC]UC]A?LdR]DMJB]GLRM]RFC]PSLk!A]JCDR]MDD]\u2014]QF?NC]UC]A?LdR]DMJBk!L]QCR]?QGBC]\u2014]QF?NC]UC]A?LdR]DMJB]RFGQ]RGKCk!H]QCR]?QGBC]\u2014]QF?NC]UC]A?LdR]DMJB]RMB?Wk!K]JCDR]MDD]\u2014]QF?NC]UC]A?LdR]DMJB]RFGQ]RGKCk!D]JCDR]MDD]\u2014]QF?NC]UC]A?LdR]R?IC]MLk!G]QCR]?QGBC]\u2014]QF?NC]UC]A?LdR]UMPI]UGRFk!K]JCDR]MDD]\u2014]QF?NC]UC]A?LdR]DMJB]RFGQ]N?QQk!{,MRFGLE]ML]RFC]TGLCQ]RMB?Wi]LMR]WCR]\u2014]e.PCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRf]UFCL]PC?BWk!v,MRFGLE]ML]RFC]TGLCQ]RMB?Wi]LMR]WCR]\u2014]e.PCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRf]J?RCPk\"\",MRFGLE]PGNC]ML]RFC]RPCCQ]RMB?Wi]LMR]WCR]\u2014]e.PCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRf]UFCL]PC?BWk!w,MRFGLE]PGNC]ML]RFC]RPCCQ]RMB?W]\u2014]e.PCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRf]UFCL]PC?BWk!W,MRFGLE]PGNC]WCR]\u2014]DJSQF]UGRF]~JRh1FGDRh0]?LB]PCQR?PRk!\\,MRFGLE]PGNC]WCR]\u2014]e.PCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRf!o,MRFGLE]PGNC]ML]RFC]RPCCQ]RMB?Wi]LMR]WCR]\u2014]DJSQF]UGRF]~JRh1FGDRh0]?LB]PCQR?PRk!s,MRFGLE]PGNC]ML]RFC]RPCCQ]RMB?Wi]LMR]WCR]\u2014]NPCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRk!m,MRFGLE]ML]RFC]TGLCQ]RMB?W]\u2014]e.PCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRf]J?RCPk!j,MRFGLE]PGNC]ML]RFC]RPCCQ]RMB?W]\u2014]NPCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRk!{,MRFGLE]PGNC]ML]RFC]RPCCQ]RMB?Wi]LMR]WCR]\u2014]e.PCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRf]J?RCPk![,MRFGLE]PGNC]WCR]\u2014]NPCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRk!n,MRFGLE]ML]RFC]TGLCQ]RMB?Wi]LMR]WCR]\u2014]NPCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRk!f,MRFGLE]PGNC]ML]RFC]RPCCQ]RMB?W]\u2014]DJSQF]UGRF]~JRh1FGDRh0]?LB]PCQR?PRk!c,MRFGLE]PGNC]WCR]\u2014]e.PCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRf]J?RCPk!E JGLBQ]BP?UL]\u2014]R?IGLE]RFC]JMLE]PM?Bk!J!SPR?GLQ]BP?UL]\u2014]ICCNGLE]OSGCR]DMP]?]@GRk!C.?LCJQ]BP?UL]\u2014]C?QGLE]MDD]DMP]LMUk!E!SPR?GLQ]BP?UL]\u2014]C?QGLE]MDD]DMP]LMUk!H!MTCPGLEQ]BP?UL]\u2014]R?IGLE]RFC]JMLE]PM?Bk!C JGLBQ]BP?UL]\u2014]C?QGLE]MDD]DMP]LMUk!H1F?BCQ]BP?UL]\u2014]ICCNGLE]OSGCR]DMP]?]@GRk!H.?LCJQ]BP?UL]\u2014]ICCNGLE]OSGCR]DMP]?]@GRk!H.?LCJQ]BP?UL]\u2014]R?IGLE]RFC]JMLE]F?JJU?Wk!F!MTCPGLEQ]BP?UL]\u2014]C?QGLE]MDD]DMP]LMUk!E.?LCJQ]BP?UL]\u2014]R?IGLE]RFC]JMLE]PM?Bk!H JGLBQ]BP?UL]\u2014]ICCNGLE]OSGCR]DMP]?]@GRk!H JGLBQ]BP?UL]\u2014]R?IGLE]RFC]JMLE]F?JJU?Wk!K!MTCPGLEQ]BP?UL]\u2014]ICCNGLE]OSGCR]DMP]?]@GRk!E!SPR?GLQ]BP?UL]\u2014]EMGLE]RFC]QJMU]U?Wk!> JGLBQ]MNCL]\u2014]@?AI]RM]LMPK?Jk!@1F?BCQ]MNCL]\u2014]PCQSKGLE]?R]N?ACk!>.?LCJQ]MNCL]\u2014]@?AI]RM]LMPK?Jk!@.?LCJQ]MNCL]\u2014]PCQSKGLE]?R]N?ACk!>1F?BCQ]MNCL]\u2014]@?AI]RM]LMPK?Jk!E1F?BCQ]MNCL]\u2014]@?AI]ML]RFC]K?GL]PM?Bk!A!MTCPGLEQ]MNCL]\u2014]@?AI]RM]LMPK?Jk!: JGLBQ]MNCL]\u2014]@?AI]ML]GRk!C!MTCPGLEQ]MNCL]\u2014]PCQSKGLE]?R]N?ACk!E.?LCJQ]MNCL]\u2014]@?AI]ML]RFC]K?GL]PM?Bk!<!SPR?GLQ]MNCL]\u2014]@?AI]ML]GRk!D!SPR?GLQ]MNCL]\u2014]@?AI]?R]DSJJ]QNCCBk!@ JGLBQ]MNCL]\u2014]PCQSKGLE]?R]N?ACk!B!SPR?GLQ]MNCL]\u2014]PCQSKGLE]?R]N?ACk!B JGLBQ]MNCL]\u2014]@?AI]?R]DSJJ]QNCCBk![5GLBGLE]BMUL]?DRCP]RFGQ]AFMPC]\u2014]N?SQGLE]?R]RFC]AFCAINMGLRk!f#LBGLE]RFC]QFGDR]?DRCP]RFGQ]AFMPC]\u2014]ASRRGLE]MSR]?DRCP]RFC]AFCAINMGLRk!a5GLBGLE]BMUL]?DRCP]RFGQ]AFMPC]\u2014]QRMNNGLE]?R]RFC]LCVR]AFCAINMGLRk!^5GLBGLE]BMUL]?DRCP]RFGQ]AFMPC]\u2014]AFCAIGLE]MSR]?R]RFC]@MSLB?PWk!\\5GLBGLE]BMUL]?DRCP]RFGQ]AFMPC]\u2014]QRMNNGLE]?R]RFC]AFCAINMGLRk!_.?AIGLE]SN]?DRCP]RFGQ]AFMPC]\u2014]QRMNNGLE]?R]RFC]LCVR]AFCAINMGLRk!`5P?NNGLE]SN]?DRCP]RFGQ]AFMPC]\u2014]QRMNNGLE]?R]RFC]LCVR]AFCAINMGLRk!a5P?NNGLE]SN]?DRCP]RFGQ]AFMPC]\u2014]ASRRGLE]MSR]?DRCP]RFC]AFCAINMGLRk!Z.?AIGLE]SN]?DRCP]RFGQ]AFMPC]\u2014]QRMNNGLE]?R]RFC]AFCAINMGLRk![!JMQGLE]MSR]?DRCP]RFGQ]AFMPC]\u2014]QRMNNGLE]?R]RFC]AFCAINMGLRk!_#LBGLE]RFC]QFGDR]?DRCP]RFGQ]AFMPC]\u2014]N?SQGLE]?R]RFC]AFCAINMGLRk!\\.?AIGLE]SN]?DRCP]RFGQ]AFMPC]\u2014]AFCAIGLE]MSR]?R]RFC]@MSLB?PWk![5P?NNGLE]SN]?DRCP]RFGQ]AFMPC]\u2014]QRMNNGLE]?R]RFC]AFCAINMGLRk!Z5P?NNGLE]SN]?DRCP]RFGQ]AFMPC]\u2014]N?SQGLE]?R]RFC]AFCAINMGLRk!a!JMQGLE]MSR]?DRCP]RFGQ]AFMPC]\u2014]ASRRGLE]MSR]?DRCP]RFC]AFCAINMGLRk!T%GTGLE]RFC]PSE]?]QF?IC]\u2014]QCC]WMS]ML]RFC]MRFCP]QGBCk!G0MJJGLE]SN]RFC]PSE]\u2014]@?AI]GL]?]KMKCLRk!P0MJJGLE]SN]RFC]PSE]\u2014]QCC]WMS]?DRCP]RFC]PCDPCQFk!O1F?IGLE]RFGLEQ]MSR]\u2014]QCC]WMS]ML]RFC]DJGN]QGBCk!G1F?IGLE]RFGLEQ]MSR]\u2014]@?AI]GL]?]KMKCLRk!P1F?IGLE]RFGLEQ]MSR]\u2014]QCC]WMS]?DRCP]RFC]PCDPCQFk!S%GTGLE]RFC]PSE]?]QF?IC]\u2014]QCC]WMS]ML]RFC]DJGN]QGBCk!N0MJJGLE]SN]RFC]PSE]\u2014]A?RAF]WMS]ML]RFC]PCJM?Bk!O1F?IGLE]MSR]RFC]PSE]\u2014]A?RAF]WMS]ML]RFC]PCJM?Bk!P1F?IGLE]MSR]RFC]PSE]\u2014]QCC]WMS]ML]RFC]DJGN]QGBCk!H1F?IGLE]MSR]RFC]PSE]\u2014]@?AI]GL]?]KMKCLRk!O0MJJGLE]SN]RFC]PSE]\u2014]QCC]WMS]ML]RFC]DJGN]QGBCk!K%GTGLE]RFC]PSE]?]QF?IC]\u2014]@?AI]GL]?]KMKCLRk!P1F?IGLE]MSR]RFC]K?R]\u2014]QCC]WMS]ML]RFC]DJGN]QGBCk!Q1F?IGLE]MSR]RFC]K?R]\u2014]QCC]WMS]?DRCP]RFC]PCDPCQFk!C~SRF]QRMNNCB]FMJBGLE]\u2014]N?AIGLE]SNk!B)CW]QRMNNCB]DGRRGLE]\u2014]N?AIGLE]SNk!N1CQQGML]ICW]RSPLCB]QR?JC]\u2014]UP?NNGLE]RFC]EC?Pk!E2FC]ICW]LM]JMLECP]DGRQ]\u2014]N?AIGLE]SNk!L1CQQGML]ICW]RSPLCB]QR?JC]\u2014]A?JJGLE]GR]FCPCk!G~SRF]QRMNNCB]FMJBGLE]\u2014]CLBGLE]RFC]PSLk!J~SRF]QRMNNCB]FMJBGLE]\u2014]UP?NNGLE]RFC]EC?Pk!G1CQQGML]ICW]RSPLCB]QR?JC]\u2014]N?AIGLE]SNk!L2FC]ICW]LM]JMLECP]DGRQ]\u2014]UP?NNGLE]RFC]EC?Pk!I~SRF]QRMNNCB]FMJBGLE]\u2014]QRMNNGLE]AJC?LJWk!G)CW]QRMNNCB]DGRRGLE]\u2014]A?JJGLE]GR]FCPCk!P2FC]ICW]A?KC]@?AI]PCHCARCB]\u2014]UP?NNGLE]RFC]EC?Pk!H)CW]QRMNNCB]DGRRGLE]\u2014]QRMNNGLE]AJC?LJWk!L1CQQGML]ICW]RSPLCB]QR?JC]\u2014]DMJBGLE]SN]QFMNk!O-SP]ICW]QRMNNCB]SLJMAIGLE]\u2014]UP?NNGLE]RFC]EC?Pk!G2FC]A?JJ]U?Q]RFPMRRJCB]\u2014]@?AIGLE]MDD]\\!8Qi]RFCL]ILMAIGLE]?E?GLk!H-SP]ILMAI]U?Q]RFPMRRJCB]\u2014]PCRPWGLE]GL]\\!#Qk!L0COSCQR]A?KC]@?AI]RFPMRRJCB]\u2014]PCRPWGLE]GL]\\!#Qk!K2FC]A?JJ]U?Q]RFPMRRJCB]\u2014]RPWGLE]?E?GL]GL]\\!#Qk!N)LMAI]A?KC]@?AI]RFPMRRJCB]\u2014]LCVR]?RRCKNR]GL]\\!#Qk!L0COSCQR]A?KC]@?AI]RFPMRRJCB]\u2014]@?AIGLE]MDD]\\!8Qi]RFCL]ILMAIGLE]?E?GLk!G2FC]A?JJ]U?Q]RFPMRRJCB]\u2014]PCRPWGLE]GL]\\!#Qk!H2FC]ILMAI]EMR]RFPMRRJCB]\u2014]@?AIGLE]MDD]\\!8Qi]RFCL]ILMAIGLE]?E?GLk!P0COSCQR]A?KC]@?AI]RFPMRRJCB]\u2014]RPWGLE]?E?GL]GL]\\!#Qk!J)LMAI]A?KC]@?AI]RFPMRRJCB]\u2014]PCRPWGLE]GL]\\!#Qk!R0COSCQR]A?KC]@?AI]RFPMRRJCB]\u2014]ILMAIGLE]?E?GL]GL]\\!#Qk!M2FC]A?JJ]U?Q]RFPMRRJCB]\u2014]ILMAIGLE]?E?GL]GL]\\!#Qk!N-SP]ILMAI]U?Q]RFPMRRJCB]\u2014]ILMAIGLE]?E?GL]GL]\\!#Qk!L-SP]ILMAI]U?Q]RFPMRRJCB]\u2014]RPWGLE]?E?GL]GL]\\!#Qk!J)LMAI]A?KC]@?AI]RFPMRRJCB]\u2014]@?AIGLE]MDD]\\!8Qi]RFCL]ILMAIGLE]?E?GLk!.1CPTCP]CPPMP]!:]RFCPC]\u2014]@?AIGLE]MDD]DMP]!#Qk!.1CPTCP]D?SJR]!:]ML]RF?R]ILMAI]\u2014]PCQRGLE]!0Q]@CDMPC]PCRPWk!.1CPTCP]CPPMP]!>]ML]RF?R]ILMAI]\u2014]N?SQGLE]DMP]!#Qk!.1CPTCP]D?SJR]!B]ML]RF?R]ILMAI]\u2014]AMMJGLE]MDD]DMP]!#Qk!.1CPTCP]CPPMP]!:]RFCPC]\u2014]AMMJGLE]MDD]DMP]!#Qk!.1CPTCP]D?SJR]!,]\u2014]PCQRGLE]!0Q]@CDMPC]PCRPWk!.1CPTCP]CPPMP]!>]ML]RF?R]ILMAI]\u2014]@?AIGLE]MDD]!#Qk!.1CPTCP]CPPMP]!6]RFCPC]\u2014]@?AIGLE]MDD]!#Qk!.1CPTCP]D?SJR]!>]ML]RF?R]ILMAI]\u2014]@?AIGLE]MDD]!#Qk!.1CPTCP]CPPMP]!4]\u2014]AMMJGLE]MDD]DMP]!#Qk!.1CPTCP]D?SJR]!0]\u2014]N?SQGLE]DMP]!#Qk!.1CPTCP]CPPMP]!2]RFCPC]\u2014]PCQRGLE]!0Q]@CDMPC]PCRPWk!.1CPTCP]CPPMP]!B]ML]RF?R]ILMAI]\u2014]@?AIGLE]MDD]DMP]!#Qk!.1CPTCP]D?SJR]!:]RFCPC]\u2014]@?AIGLE]MDD]DMP]!#Qk!.1CPTCP]D?SJR]!B]ML]RF?R]ILMAI]\u2014]@?AIGLE]MDD]DMP]!#Qk!(2?PECR]!G]PCHCARQ]FMMIQ]\u2014]JC?TGLE]GR]SLRMSAFCBk!(2?PECR]!C]GQ]DPMXCL]\u2014]JC?TGLE]GR]SLRMSAFCBk!(2?PECR]!D]PCHCARQ]FMMIQ]\u2014]QIGNNGLE]RFC]FMMIk!(2?PECR]!C]GQ]PC?BjMLJW]\u2014]QIGNNGLE]RFC]FMMIk!(2?PECR]!F]GQ]PC?BjMLJW]\u2014]JC?TGLE]GR]SLRMSAFCBk!(2?PECR]!=]GQ]PC?BjMLJW]\u2014]FMMI]D?GJCBk!(2?PECR]!B]GQ]GKKSR?@JC]\u2014]A?LLMR]@C]FMMICBk!(2?PECR]!@]GQ]QC?JCB]\u2014]QIGNNGLE]RFC]FMMIk!(2?PECR]!?]GQ]QC?JCB]\u2014]A?LLMR]@C]FMMICBk!(2?PECR]!:]GQ]DPMXCL]\u2014]FMMI]D?GJCBk!(2?PECR]!C]GQ]QC?JCB]\u2014]JC?TGLE]GR]SLRMSAFCBk!(2?PECR]!>]PCHCARQ]FMMIQ]\u2014]FMMI]D?GJCBk!(2?PECR]!?]GQ]DPMXCL]\u2014]A?LLMR]@C]FMMICBk!(2?PECR]!=]GQ]GKKSR?@JC]\u2014]FMMI]D?GJCBk!(2?PECR]!B]GQ]PC?BjMLJW]\u2014]A?LLMR]@C]FMMICBk!3&MMI]KMSLRGLE]DMP]!*]CPPMPCB]!0&MMI]QCRSN]DMP]!)]D?GJCB]!81CRRGLE]SN]RFC]FMMI]ML]!(]RFPCU]!=!MSJB]LMR]KMSLR]RFC]FMMI]ML]!\"]!>&MMI]GLQR?JJ?RGML]D?GJCB]DMP]!\"]!4~RR?AFGLE]FMMIQ]RM]!)]D?GJCB]!4+MSLRGLE]?]FMMI]ML]!)]D?GJCB]!%2FC]!:]FMMI]PCDSQCB]RM]GLQR?JJ]!6&MMI]UGPGLE]CPPMP]ML]!\"]!0!MSJB]LMR]UGPC]!\"]!*.?RAFGLE]!)]D?GJCB]!8'LQR?JJGLE]RFC]FMMI]ML]!*]CPPMPCB]!1&MMI]?RRCKNR]ML]!)]D?GJCB]!8&MMI]GLQR?JJ]D?GJCB]ML]!\"]!C2FC]FMMI]AMSJB]LMR]@C]?RR?AFCB]RM]!\"]!5-NCLGLE]RFC]@MMI]RM]!\"k!. PGLEGLE]MSR]!1]DPMK]RFC]QR?AIk!-1R?PRGLE]SN]!\"k!).SJJGLE]!0]MDD]RFC]QFCJDk!)-NCLGLE]!,dQ]AF?NRCPk!*1R?PRGLE]!1]DPMK]RFC]QFCJDk!+*?SLAFGLE]!1]DPMK]RFC]QFCJDk!,2SPLGLE]RM]!.]GL]RFC]@MMIk!8.GAIGLE]SN]RFC]@MMI]?R]!\"k!)%CRRGLE]!(]EMGLEk!-2?IGLE]BMUL]!1]DPMK]RFC]QFCJDk!-$JGNNGLE]RM]!\"k!)-NCLGLE]!0]GL]RFC]PC?BCPk!21CRRJGLE]GL]UGRF]!\"k!>-NCLGLE]RFC]PC?BGLE]@MMI]DMP]!\"k!A~]OSGAI]QRCCN]\u2014]RFCL]@?AI]RM]GRk!;)CRRJCdQ]ML]\u2014]@PGCD]QRCCNk!A1RCCNGLE]@PGCDJW]\u2014]ICRRJC]GQ]SNk!;2C?NMRdQ]ML]\u2014]OSGAI]QRCCNk!=.MRdQ]QGLEGLE]\u2014]@PGCD]N?SQCk!<)CRRJCdQ]ML]\u2014]HSQR]?]QRCCNk!J)CRRJCdQ]AMKGLE]RM]RFC]@MGJ]\u2014]QFMPR]U?GRk!C)CRRJC]ML]\u2014]QRCNNGLE]?U?W]@PGCDJWk!>)CRRJC]QGLEGLE]\u2014]OSGAI]N?SQCk!8.MRdQ]ML]\u2014]OSGAI]QRCCNk!@ PGCD]QRCCN]UFGJC]RFC]NMR]EMCQk!?5?RCPdQ]FC?RGLE]\u2014]@PGCD]QRCCNk!A.MRdQ]ML]RFC]@MGJ]\u2014]@PGCD]N?SQCk!;/SGAI]QRCCN]\u2014]ICRRJCdQ]MLk!;)CRRJCdQ]SN]\u2014]QFMPR]N?SQCk!52MAI]J?LBGLE]UFMJCw]!+]\u2014]EP?GL]`!61?LBQ]J?LBGLE]UFMJCw]!*]\u2014]Q?LB]`!61?LBQ]J?LBGLE]UFMJCw]!*]\u2014]RMAI]`!52MAI]J?LBGLE]UFMJCw]!*]\u2014]Q?LB]`!52MAI]J?LBGLE]UFMJCw]!*]\u2014]RGAI]`!61?LBQ]J?LBGLE]UFMJCw]!+]\u2014]EP?GL]`!7%P?GLQ]J?LBGLE]UFMJCw]!*]\u2014]RMAI]`!61?LBQ]J?LBGLE]UFMJCw]!,]\u2014]NC@@JC]`!81CAMLBQ]J?LBGLE]UFMJCw]!*]\u2014]Q?LB]`!8.C@@JCQ]J?LBGLE]UFMJCw]!*]\u2014]Q?LB]`!52MAI]J?LBGLE]UFMJCw]!,]\u2014]NC@@JC]`!8.C@@JCQ]J?LBGLE]UFMJCw]!*]\u2014]RMAI]`!7%P?GLQ]J?LBGLE]UFMJCw]!*]\u2014]Q?LB]`!7%P?GLQ]J?LBGLE]UFMJCw]!+]\u2014]EP?GL]`!8.C@@JCQ]J?LBGLE]UFMJCw]!*]\u2014]RGAI]`!00SLLGLE]R?JJWw]!\"l!\"k!20?LBMK]DP?ARGMLw]!\"l!\"k!0.PMEPCQQ]JGLCw]!\"l!)]JMEECBk!00SLLGLE]R?JJWw]!\"l!*]RM]B?RCk!20?LBMK]DP?ARGMLw]!\"l!/]GL]RFC]@MMIQk!20?LBMK]DP?ARGMLw]!\"l!00SLLGLE]R?JJWw]!\"l!/]GL]RFC]@MMIQk!/!SPPCLR]@C?Rw]!\"l!\"k!/!SPPCLR]@C?Rw]!\"l!.,MU]PC?BGLEw]!\"l!)]QM]D?Pk!20?LBMK]DP?ARGMLw]!\"l!)]QM]D?Pk!00SLLGLE]R?JJWw]!\"l!)]JMEECBk!0.PMEPCQQ]JGLCw]!\"l!\"k!/!SPPCLR]@C?Rw]!\"l!)]JMEECBk!/!SPPCLR]@C?Rw]!\"l!*]RM]B?RCk!.0MSLBCB]MSRw]!\"k!-5P?NNCB]SNw]!\"k!+ MVCB]SNw]!\"k!.)LMAICB]MSRw]!\"k!-.SR]RM]@CBw]!\"k!,\"CJGTCPCBw]!\"k!-&?LBCB]MDDw]!\"k!*1CRRJCBw]!\"k!.!FCAICB]MDDw]!\"k!,!MKNJCRCBw]!\"k!-!?QFCB]MSRw]!\"k!-!JMQCB]MSRw]!\"k!*!JC?PCBw]!\"k!,!MLAJSBCBw]!\"k!)1C?JCBw]!\"k!-2F?R]AFMPC]e!Mf]LCCBQ]RFC]K?GL]F?JJ]\u2014]QIGNNGLE]GR]DMP]LMUk!-2F?R]AFMPC]e!Lf]LCCBQ]?]@GEECP]PGE]\u2014]QIGNNGLE]GR]DMP]LMUk!-2F?R]AFMPC]e!Yf]LCCBQ]RFC]K?GL]F?JJ]\u2014]JC?TGLE]GR]DMP]?]@GEECP]QCQQGMLk!'!FMPC]!N]LCCBQ]RFC]FC?TW]@CLAF]\u2014]QIGNNGLE]GR]DMP]LMUk!-2F?R]AFMPC]e!Hf]LCCBQ]RFC]K?GL]F?JJ]\u2014]KMTGLE]N?QR]GRk!'!FMPC]!S]LCCBQ]RFC]FC?TW]@CLAF]\u2014]LMR]R?IGLE]GR]RFGQ]QFGDRk!,2FGQ]R?QI]e!Lf]LCCBQ]RFC]DSJJ]UMPIQFMN]\u2014]KMTGLE]N?QR]GRk!-2F?R]AFMPC]e!Gf]LCCBQ]?]@GEECP]PGE]\u2014]KMTGLE]N?QR]GRk!-2F?R]AFMPC]e!Ef]LCCBQ]RFC]@GE]UMPIQFMN]\u2014]QIGNNGLEk!,2FGQ]R?QI]e!Ff]LCCBQ]RFC]DSJJ]UMPIQFMN]\u2014]QIGNNGLEk!-2F?R]AFMPC]e!Qf]LCCBQ]?]@GEECP]PGE]\u2014]LMR]R?IGLE]GR]RFGQ]QFGDRk!,2FGQ]R?QI]e!Qf]LCCBQ]RFC]DSJJ]UMPIQFMN]\u2014]QIGNNGLE]GR]DMP]LMUk!'!FMPC]!Z]LCCBQ]RFC]FC?TW]@CLAF]\u2014]JC?TGLE]GR]DMP]?]@GEECP]QCQQGMLk!-2F?R]AFMPC]e!Rf]LCCBQ]RFC]K?GL]F?JJ]\u2014]LMR]R?IGLE]GR]RFGQ]QFGDRk!'!FMPC]!I]LCCBQ]RFC]FC?TW]@CLAF]\u2014]KMTGLE]N?QR]GRk!S2FC]LMRC]DMP]RFC]AFMPC]A?KC]@?AI]CKNRW]\u2014]QIGNNGLEk!H!FMPC]LMRC]A?KC]@?AI]@J?LI]\u2014]KMTGLE]MLk!S2FC]AFMPC]PCRSPLCB]?]@J?LI]LMRC]\u2014]LMR]QR?PRGLE]GRk!Q2FC]AFMPC]PCRSPLCB]?]@J?LI]LMRC]\u2014]JC?TGLE]GR]@Ck!L!FMPC]LMRC]A?KC]@?AI]@J?LI]\u2014]JC?TGLE]GR]@Ck!Z2FC]LMRC]DMP]RFC]AFMPC]A?KC]@?AI]CKNRW]\u2014]LMR]QR?PRGLE]GRk!E2FC]AFMPC]LMRC]U?Q]@J?LI]\u2014]QIGNNGLEk!P!FMPC]LMRC]A?KC]@?AI]@J?LI]\u2014]QIGNNGLE]RFGQ]MLCk!M2FC]AFMPC]PCRSPLCB]?]@J?LI]LMRC]\u2014]KMTGLE]MLk!P,MRC]DMP]RFC]AFMPC]U?Q]CKNRW]\u2014]LMR]QR?PRGLE]GRk!J2FC]AFMPC]LMRC]U?Q]@J?LI]\u2014]JC?TGLE]GR]@Ck!J,MRC]DMP]RFC]AFMPC]U?Q]CKNRW]\u2014]KMTGLE]MLk!X2FC]LMRC]DMP]RFC]AFMPC]A?KC]@?AI]CKNRW]\u2014]JC?TGLE]GR]@Ck!N,MRC]DMP]RFC]AFMPC]U?Q]CKNRW]\u2014]JC?TGLE]GR]@Ck!L2FC]AFMPC]PCRSPLCB]?]@J?LI]LMRC]\u2014]QIGNNGLEk!B$JMMP]N?RRCPLQ]JGLC]SN]GL]DMSPQw]!*]\u2014]N?LC]`!?$JMMP]RGJCQ]JGLC]SN]GL]DMSPQw]!,]\u2014]QOS?PC]`!D2FC]RGJCB]DJMMP]JGLCQ]SN]GL]DMSPQw]!+]\u2014]@JMAI]`!B$JMMP]N?RRCPLQ]JGLC]SN]GL]DMSPQw]!+]\u2014]QRMLC]`!D2FC]RGJCB]DJMMP]JGLCQ]SN]GL]DMSPQw]!*]\u2014]N?LC]`!?$JMMP]RGJCQ]JGLC]SN]GL]DMSPQw]!+]\u2014]@JMAI]`!?$JMMP]RGJCQ]JGLC]SN]GL]DMSPQw]!*]\u2014]QJ?@]`!D2FC]RGJCB]DJMMP]JGLCQ]SN]GL]DMSPQw]!,]\u2014]QOS?PC]`!C2FC]DJMMP]EPGB]JGLCQ]SN]GL]DMSPQw]!+]\u2014]QRMLC]`!@$JMMP]AFCAIQ]JGLC]SN]GL]DMSPQw]!+]\u2014]QRMLC]`!@$JMMP]AFCAIQ]JGLC]SN]GL]DMSPQw]!*]\u2014]N?LC]`!B$JMMP]N?RRCPLQ]JGLC]SN]GL]DMSPQw]!*]\u2014]QJ?@]`!?$JMMP]RGJCQ]JGLC]SN]GL]DMSPQw]!*]\u2014]N?LC]`!C2FC]DJMMP]EPGB]JGLCQ]SN]GL]DMSPQw]!*]\u2014]RGJC]`!?$JMMP]RGJCQ]JGLC]SN]GL]DMSPQw]!+]\u2014]QRMLC]`!C2FC]ASRJCPW]BP?UCP]U?Q]PCjQMPRCBw]!I1GJTCPU?PC]GL]RFC]BP?UCP]U?Q]PCMPBCPCBw]!E2FC]BP?UCP]AMLRCLRQ]UCPC]PCjQMPRCBw]!C2FC]BP?UCP]U?Q]EGTCL]?]LCU]MPBCPw]!?\"P?UCP]QJMRQ]UCPC]PCQFSDDJCBw]!;\"P?UCP]MPBCP]U?Q]PCBP?ULw]!C\"P?UCP]?PP?LECKCLR]U?Q]PCDPCQFCBw]!<2FC]BP?UCP]U?Q]PCQFSDDJCBw]!=2FC]BP?UCP]EMR]?]PCQFSDDJCw]!?\"P?UCP]GRCKQ]UCPC]PC?PP?LECBw]!E2FC]DJ?RU?PC]BP?UCP]U?Q]PCQFSDDJCBw]!A\"P?UCP]AMLRCLRQ]UCPC]PCMPBCPCBw]!<2FC]BP?UCP]J?WMSR]AF?LECBw]!;2FC]BP?UCP]EMR]PCjQMPRCBw]!@2FC]BP?UCP]U?Q]KGVCB]SN]?E?GLw]![2FC]BCQIRMN]BMMPU?W]UMSJB]LMR]MNCL]\u2014]JC?TGLE]GR]DMP]J?RCPk!V2FC]BCQIRMN]BMMPU?W]AMSJB]LMR]@C]NPCN?PCB]\u2014]QIGNNGLEk!]2FC]BCQIRMN]PMSRC]AMSJB]LMR]@C]?PKCB]\u2014]JC?TGLE]GR]DMP]J?RCPk![2FC]BCQIRMN]BMMPU?W]D?GJCB]RM]AMKC]SN]\u2014]QIGNNGLE]RFGQ]MLCk!a2FC]BCQIRMN]BMMPU?W]PCDSQCB]RM]@C]QCR]SN]\u2014]JC?TGLE]GR]DMP]J?RCPk!S2FC]BCQIRMN]CLRPW]AMSJB]LMR]@C]MNCLCB]\u2014]KMTGLE]MLk!R2FC]BCQIRMN]PMSRC]AMSJB]LMR]@C]?PKCB]\u2014]KMTGLE]MLk!e2FC]BCQIRMN]BMMPU?W]PCDSQCB]RM]@C]QCR]SN]\u2014]LMR]R?IGLE]GR]RFGQ]QFGDRk!Z2FC]BCQIRMN]PMSRC]AMSJB]LMR]@C]?PKCB]\u2014]QIGNNGLE]RFGQ]MLCk!^2FC]BCQIRMN]CLRPW]AMSJB]LMR]@C]MNCLCB]\u2014]JC?TGLE]GR]DMP]J?RCPk!U2FC]BCQIRMN]BMMPU?W]PCDSQCB]RM]@C]QCR]SN]\u2014]QIGNNGLEk!P2FC]BCQIRMN]BMMPU?W]UMSJB]LMR]MNCL]\u2014]KMTGLE]MLk!b2FC]BCQIRMN]BMMPU?W]AMSJB]LMR]@C]NPCN?PCB]\u2014]JC?TGLE]GR]DMP]J?RCPk!b2FC]BCQIRMN]BMMPU?W]D?GJCB]RM]AMKC]SN]\u2014]LMR]R?IGLE]GR]RFGQ]QFGDRk!_2FC]BCQIRMN]BMMPU?W]UMSJB]LMR]MNCL]\u2014]LMR]R?IGLE]GR]RFGQ]QFGDRk!S'LGRG?J]QR?RC]BGQN?RAF]D?GJCB]\u2014]QIGNNGLE]RFGQ]MLCk!U2FC]GLGRG?J]BGQN?RAF]UCLR]UPMLE]\u2014]QIGNNGLE]RFGQ]MLCk!W2FC]GLGRG?J]QR?RC]AMSJB]LMR]@C]BGQN?RAFCB]\u2014]KMTGLE]MLk!R1CLBGLE]RFC]GLGRG?J]QR?RC]D?GJCB]\u2014]JC?TGLE]GR]@Ck!M2FC]GLGRG?J]BGQN?RAF]UCLR]UPMLE]\u2014]KMTGLE]MLk!S2FC]GLGRG?J]BGQN?RAF]UCLR]UPMLE]\u2014]LMR]QR?PRGLE]GRk!K$GPQR]QR?RC]NSQF]D?GJCB]\u2014]LMR]QR?PRGLE]GRk!O'LGRG?J]QR?RC]BGQN?RAF]D?GJCB]\u2014]JC?TGLE]GR]@Ck!Q2FC]GLGRG?J]BGQN?RAF]UCLR]UPMLE]\u2014]JC?TGLE]GR]@Ck!N1CLBGLE]RFC]GLGRG?J]QR?RC]D?GJCB]\u2014]KMTGLE]MLk!I$GPQR]QR?RC]NSQF]D?GJCB]\u2014]JC?TGLE]GR]@Ck!_2FC]GLGRG?J]QR?RC]AMSJB]LMR]@C]BGQN?RAFCB]\u2014]QIGNNGLE]RFGQ]MLCk!M1CLBGLE]RFC]GLGRG?J]QR?RC]D?GJCB]\u2014]QIGNNGLEk!Q'LGRG?J]QR?RC]BGQN?RAF]D?GJCB]\u2014]LMR]QR?PRGLE]GRk!V2FC]GLGRG?J]QR?RC]AMSJB]LMR]@C]BGQN?RAFCB]\u2014]QIGNNGLEk!/!SPPCLR]@C?Rw]!\"l!00SLLGLE]R?JJWw]!\"l!\"k!20?LBMK]DP?ARGMLw]!\"l!\"k!.,MU]PC?BGLEw]!\"l!/]GL]RFC]@MMIQk!.,MU]PC?BGLEw]!\"l!00SLLGLE]R?JJWw]!\"l!)]JMEECBk!00SLLGLE]R?JJWw]!\"l!*]RM]B?RCk!20?LBMK]DP?ARGMLw]!\"l!*]RM]B?RCk!.,MU]PC?BGLEw]!\"l!)]JMEECBk!20?LBMK]DP?ARGMLw]!\"l!/]GL]RFC]@MMIQk!/!SPPCLR]@C?Rw]!\"l!)]QM]D?Pk!0.PMEPCQQ]JGLCw]!\"l!\"k!00SLLGLE]R?JJWw]!\"l!/]GL]RFC]@MMIQk!/!SPPCLR]@C?Rw]!\"l!*]RM]B?RCk!/!SPPCLR]@C?Rw]!\"l!)]JMEECBk!.0MSLBCB]MSRw]!\"k!-5P?NNCB]SNw]!\"k!+ MVCB]SNw]!\"k!.)LMAICB]MSRw]!\"k!-.SR]RM]@CBw]!\"k!,\"CJGTCPCBw]!\"k!-&?LBCB]MDDw]!\"k!*1CRRJCBw]!\"k!.!FCAICB]MDDw]!\"k!,!MKNJCRCBw]!\"k!-!?QFCB]MSRw]!\"k!-!JMQCB]MSRw]!\"k!*!JC?PCBw]!\"k!,!MLAJSBCBw]!\"k!)1C?JCBw]!\"k!Z\"CQIRMN]NPMEPCQQ]QS@QAPGNRGML]D?GJCB]\u2014]QIGNNGLE]RFGQ]MLCk!d\"CQIRMN]NPMEPCQQ]SNB?RCQ]AMSJB]LMR]@C]QS@QAPG@CB]\u2014]LMR]QR?PRGLE]GRk!\\1S@QAPG@GLE]RM]BCQIRMN]NPMEPCQQ]D?GJCB]\u2014]QIGNNGLE]RFGQ]MLCk!V2FC]BCQIRMN]DCCB]QS@QAPGNRGML]D?GJCB]\u2014]JC?TGLE]GR]@Ck!X1S@QAPG@GLE]RM]BCQIRMN]NPMEPCQQ]D?GJCB]\u2014]JC?TGLE]GR]@Ck!S1S@QAPG@GLE]RM]BCQIRMN]NPMEPCQQ]D?GJCB]\u2014]QIGNNGLEk![2FC]BCQIRMN]NPMEPCQQ]DCCB]UMSJB]LMR]QS@QAPG@C]\u2014]KMTGLE]MLk!c2FC]BCQIRMN]NPMEPCQQ]DCCB]UMSJB]LMR]QS@QAPG@C]\u2014]QIGNNGLE]RFGQ]MLCk!a2FC]BCQIRMN]NPMEPCQQ]DCCB]UMSJB]LMR]QS@QAPG@C]\u2014]LMR]QR?PRGLE]GRk!f\"CQIRMN]NPMEPCQQ]SNB?RCQ]AMSJB]LMR]@C]QS@QAPG@CB]\u2014]QIGNNGLE]RFGQ]MLCk!R2FC]BCQIRMN]DCCB]QS@QAPGNRGML]D?GJCB]\u2014]KMTGLE]MLk!b\"CQIRMN]NPMEPCQQ]SNB?RCQ]AMSJB]LMR]@C]QS@QAPG@CB]\u2014]JC?TGLE]GR]@Ck!Z2FC]BCQIRMN]DCCB]QS@QAPGNRGML]D?GJCB]\u2014]QIGNNGLE]RFGQ]MLCk!X2FC]BCQIRMN]DCCB]QS@QAPGNRGML]D?GJCB]\u2014]LMR]QR?PRGLE]GRk!Q2FC]BCQIRMN]DCCB]QS@QAPGNRGML]D?GJCB]\u2014]QIGNNGLEk!+,MRCQ]DMP]!1]\u2014]BMSEFdQ]EMR]\\!(]RM]EMk!-!FCAIGLE]ML]!1]\u2014]@PC?B]LCCBQ]\\!/]KMPC]KGLSRCQk!+,MRCQ]DMP]!%]\u2014]\\!<]KGLSRCQ]JCDR]ML]RFC]BMSEFk!-!FCAIGLE]ML]!1]\u2014]BMSEFdQ]EMR]\\!(]RM]EMk!8+SJJGLE]MTCP]LMRCQ]DMP]!1]\u2014]BMSEFdQ]EMR]\\!(]RM]EMk!,.CCIGLE]?R]!1]\u2014]BMSEF]LCCBQ]\\!/]KMPC]KGLSRCQk!75?RAFGLE]RFC]MTCL]DMP]!1]\u2014]BMSEF]LCCBQ]\\!/]KMPC]KGLSRCQk!8+SJJGLE]MTCP]LMRCQ]DMP]!1]\u2014]@PC?B]LCCBQ]\\!/]KMPC]KGLSRCQk!,.CCIGLE]?R]!1]\u2014]@PC?B]LCCBQ]\\!/]KMPC]KGLSRCQk!,.CCIGLE]?R]!%]\u2014]\\!<]KGLSRCQ]JCDR]ML]RFC]BMSEFk!3)CCNGLE]?L]CWC]ML]!1]\u2014]BMSEF]LCCBQ]\\!/]KMPC]KGLSRCQk!+,MRCQ]DMP]!1]\u2014]@PC?B]LCCBQ]\\!/]KMPC]KGLSRCQk!75?RAFGLE]RFC]MTCL]DMP]!1]\u2014]@PC?B]LCCBQ]\\!/]KMPC]KGLSRCQk!8+SJJGLE]MTCP]LMRCQ]DMP]!1]\u2014]BMSEF]LCCBQ]\\!/]KMPC]KGLSRCQk!-!FCAIGLE]ML]!%]\u2014]\\!<]KGLSRCQ]JCDR]ML]RFC]BMSEFk!-2F?R]AFMPC]e!Mf]LCCBQ]RFC]K?GL]F?JJ]\u2014]QIGNNGLE]GR]DMP]LMUk!-2F?R]AFMPC]e!Lf]LCCBQ]?]@GEECP]PGE]\u2014]QIGNNGLE]GR]DMP]LMUk!-2F?R]AFMPC]e!Yf]LCCBQ]RFC]K?GL]F?JJ]\u2014]JC?TGLE]GR]DMP]?]@GEECP]QCQQGMLk!'!FMPC]!N]LCCBQ]RFC]FC?TW]@CLAF]\u2014]QIGNNGLE]GR]DMP]LMUk!-2F?R]AFMPC]e!Hf]LCCBQ]RFC]K?GL]F?JJ]\u2014]KMTGLE]N?QR]GRk!'!FMPC]!S]LCCBQ]RFC]FC?TW]@CLAF]\u2014]LMR]R?IGLE]GR]RFGQ]QFGDRk!,2FGQ]R?QI]e!Lf]LCCBQ]RFC]DSJJ]UMPIQFMN]\u2014]KMTGLE]N?QR]GRk!-2F?R]AFMPC]e!Gf]LCCBQ]?]@GEECP]PGE]\u2014]KMTGLE]N?QR]GRk!-2F?R]AFMPC]e!Ef]LCCBQ]RFC]@GE]UMPIQFMN]\u2014]QIGNNGLEk!,2FGQ]R?QI]e!Ff]LCCBQ]RFC]DSJJ]UMPIQFMN]\u2014]QIGNNGLEk!-2F?R]AFMPC]e!Qf]LCCBQ]?]@GEECP]PGE]\u2014]LMR]R?IGLE]GR]RFGQ]QFGDRk!,2FGQ]R?QI]e!Qf]LCCBQ]RFC]DSJJ]UMPIQFMN]\u2014]QIGNNGLE]GR]DMP]LMUk!'!FMPC]!Z]LCCBQ]RFC]FC?TW]@CLAF]\u2014]JC?TGLE]GR]DMP]?]@GEECP]QCQQGMLk!-2F?R]AFMPC]e!Rf]LCCBQ]RFC]K?GL]F?JJ]\u2014]LMR]R?IGLE]GR]RFGQ]QFGDRk!'!FMPC]!I]LCCBQ]RFC]FC?TW]@CLAF]\u2014]KMTGLE]N?QR]GRk!C2FC]DJMMP]EPGB]JGLCQ]SN]GL]DMSPQw]!+]\u2014]@JMAI]`!B$JMMP]N?RRCPLQ]JGLC]SN]GL]DMSPQw]!*]\u2014]RGJC]`!C2FC]DJMMP]EPGB]JGLCQ]SN]GL]DMSPQw]!*]\u2014]QJ?@]`!?$JMMP]RGJCQ]JGLC]SN]GL]DMSPQw]!,]\u2014]QOS?PC]`!@$JMMP]AFCAIQ]JGLC]SN]GL]DMSPQw]!*]\u2014]QJ?@]`!D2FC]RGJCB]DJMMP]JGLCQ]SN]GL]DMSPQw]!+]\u2014]QRMLC]`!D2FC]RGJCB]DJMMP]JGLCQ]SN]GL]DMSPQw]!,]\u2014]QOS?PC]`!C2FC]DJMMP]EPGB]JGLCQ]SN]GL]DMSPQw]!*]\u2014]N?LC]`!D2FC]RGJCB]DJMMP]JGLCQ]SN]GL]DMSPQw]!*]\u2014]QJ?@]`!D2FC]RGJCB]DJMMP]JGLCQ]SN]GL]DMSPQw]!+]\u2014]@JMAI]`!B$JMMP]N?RRCPLQ]JGLC]SN]GL]DMSPQw]!*]\u2014]QJ?@]`!@$JMMP]AFCAIQ]JGLC]SN]GL]DMSPQw]!+]\u2014]@JMAI]`!D2FC]RGJCB]DJMMP]JGLCQ]SN]GL]DMSPQw]!*]\u2014]RGJC]`!@$JMMP]AFCAIQ]JGLC]SN]GL]DMSPQw]!+]\u2014]QRMLC]`!C2FC]DJMMP]EPGB]JGLCQ]SN]GL]DMSPQw]!*]\u2014]RGJC]`!W2FC]QRPC?K]BMMPU?W]UMSJB]LMR]MNCL]\u2014]QIGNNGLE]RFGQ]MLCk!Q2FC]QRPC?K]PMSRC]AMSJB]LMR]@C]?PKCB]\u2014]KMTGLE]MLk!U2FC]QRPC?K]BMMPU?W]AMSJB]LMR]@C]NPCN?PCB]\u2014]QIGNNGLEk!P2FC]QRPC?K]PMSRC]AMSJB]LMR]@C]?PKCB]\u2014]QIGNNGLEk!Y2FC]QRPC?K]PMSRC]AMSJB]LMR]@C]?PKCB]\u2014]QIGNNGLE]RFGQ]MLCk!]2FC]QRPC?K]BMMPU?W]D?GJCB]RM]AMKC]SN]\u2014]JC?TGLE]GR]DMP]J?RCPk!e2FC]QRPC?K]BMMPU?W]AMSJB]LMR]@C]NPCN?PCB]\u2014]LMR]R?IGLE]GR]RFGQ]QFGDRk!d2FC]QRPC?K]BMMPU?W]PCDSQCB]RM]@C]QCR]SN]\u2014]LMR]R?IGLE]GR]RFGQ]QFGDRk!]2FC]QRPC?K]BMMPU?W]PCDSQCB]RM]@C]QCR]SN]\u2014]QIGNNGLE]RFGQ]MLCk!R2FC]QRPC?K]BMMPU?W]D?GJCB]RM]AMKC]SN]\u2014]KMTGLE]MLk!R2FC]QRPC?K]CLRPW]AMSJB]LMR]@C]MNCLCB]\u2014]KMTGLE]MLk!a2FC]QRPC?K]BMMPU?W]D?GJCB]RM]AMKC]SN]\u2014]LMR]R?IGLE]GR]RFGQ]QFGDRk!a2FC]QRPC?K]CLRPW]AMSJB]LMR]@C]MNCLCB]\u2014]LMR]R?IGLE]GR]RFGQ]QFGDRk!U2FC]QRPC?K]BMMPU?W]PCDSQCB]RM]@C]QCR]SN]\u2014]KMTGLE]MLk!O2FC]QRPC?K]BMMPU?W]UMSJB]LMR]MNCL]\u2014]KMTGLE]MLk!20?LBMK]DP?ARGMLw]!\"l!)]QM]D?Pk!0.PMEPCQQ]JGLCw]!\"l!.,MU]PC?BGLEw]!\"l!0.PMEPCQQ]JGLCw]!\"l!*]RM]B?RCk!/!SPPCLR]@C?Rw]!\"l!/]GL]RFC]@MMIQk!20?LBMK]DP?ARGMLw]!\"l!.,MU]PC?BGLEw]!\"l!\"k!20?LBMK]DP?ARGMLw]!\"l!)]JMEECBk!.,MU]PC?BGLEw]!\"l!*]RM]B?RCk!/!SPPCLR]@C?Rw]!\"l!)]QM]D?Pk!20?LBMK]DP?ARGMLw]!\"l!*]RM]B?RCk!0.PMEPCQQ]JGLCw]!\"l!)]JMEECBk!00SLLGLE]R?JJWw]!\"l!/]GL]RFC]@MMIQk!0.PMEPCQQ]JGLCw]!\"l!/]GL]RFC]@MMIQk!20?LBMK]DP?ARGMLw]!\"l!/]GL]RFC]@MMIQk!.0MSLBCB]MSRw]!\"k!-5P?NNCB]SNw]!\"k!+ MVCB]SNw]!\"k!.)LMAICB]MSRw]!\"k!-.SR]RM]@CBw]!\"k!,\"CJGTCPCBw]!\"k!-&?LBCB]MDDw]!\"k!*1CRRJCBw]!\"k!.!FCAICB]MDDw]!\"k!,!MKNJCRCBw]!\"k!-!?QFCB]MSRw]!\"k!-!JMQCB]MSRw]!\"k!*!JC?PCBw]!\"k!,!MLAJSBCBw]!\"k!)1C?JCBw]!\"k!Y2FC]QRPC?K]NPMEPCQQ]DCCB]UMSJB]LMR]QS@QAPG@C]\u2014]QIGNNGLEk!R1S@QAPG@GLE]RM]QRPC?K]NPMEPCQQ]D?GJCB]\u2014]QIGNNGLEk!]1RPC?K]NPMEPCQQ]SNB?RCQ]AMSJB]LMR]@C]QS@QAPG@CB]\u2014]KMTGLE]MLk!e1RPC?K]NPMEPCQQ]SNB?RCQ]AMSJB]LMR]@C]QS@QAPG@CB]\u2014]QIGNNGLE]RFGQ]MLCk!W2FC]QRPC?K]DCCB]QS@QAPGNRGML]D?GJCB]\u2014]LMR]QR?PRGLE]GRk!W1S@QAPG@GLE]RM]QRPC?K]NPMEPCQQ]D?GJCB]\u2014]JC?TGLE]GR]@Ck!W1RPC?K]NPMEPCQQ]QS@QAPGNRGML]D?GJCB]\u2014]LMR]QR?PRGLE]GRk!`2FC]QRPC?K]NPMEPCQQ]DCCB]UMSJB]LMR]QS@QAPG@C]\u2014]LMR]QR?PRGLE]GRk!P2FC]QRPC?K]DCCB]QS@QAPGNRGML]D?GJCB]\u2014]QIGNNGLEk!S1S@QAPG@GLE]RM]QRPC?K]NPMEPCQQ]D?GJCB]\u2014]KMTGLE]MLk!Y1S@QAPG@GLE]RM]QRPC?K]NPMEPCQQ]D?GJCB]\u2014]LMR]QR?PRGLE]GRk!Y2FC]QRPC?K]DCCB]QS@QAPGNRGML]D?GJCB]\u2014]QIGNNGLE]RFGQ]MLCk!P1RPC?K]NPMEPCQQ]QS@QAPGNRGML]D?GJCB]\u2014]QIGNNGLEk!c1RPC?K]NPMEPCQQ]SNB?RCQ]AMSJB]LMR]@C]QS@QAPG@CB]\u2014]LMR]QR?PRGLE]GRk!b2FC]QRPC?K]NPMEPCQQ]DCCB]UMSJB]LMR]QS@QAPG@C]\u2014]QIGNNGLE]RFGQ]MLCk!K1FMUdQ]?@MSR]RM]QR?PR]\u2014]ICCN]TA]JGTC]DMP]\\!/]KMPC]KGLSRCQk!U ?AIQR?EC]JGEFRQ]ML]\u2014]ICCN]?]UGLBMU]JGTC]GL]TA]DMP]\\!/]KMPC]KGLSRCQk!Y*GEFRQ]?PC]ML]@?AIQR?EC]\u2014]ICCN]?]UGLBMU]JGTC]GL]TA]DMP]\\!/]KMPC]KGLSRCQk!N2FC]QR?EC]GQ]QCR]\u2014]ICCN]?]UGLBMU]MNCL]GL]TA]\\!/]KMPC]KGLSRCQk!U*GEFRQ]?PC]ML]@?AIQR?EC]\u2014]ICCN]?]UGLBMU]JGTC]GL]TA]\\!,]KGL]RM]EMk!I ?AIQR?EC]JGEFRQ]ML]\u2014]ICCN]TA]JGTC]DMP]\\!/]KMPC]KGLSRCQk!R2FC]QR?EC]GQ]QCR]\u2014]ICCN]?]UGLBMU]JGTC]GL]TA]DMP]\\!/]KMPC]KGLSRCQk!Q ?AIQR?EC]JGEFRQ]ML]\u2014]ICCN]?]UGLBMU]JGTC]GL]TA]\\!,]KGL]RM]EMk!F2FC]QR?EC]GQ]QCR]\u2014]ICCN]TA]JGTC]DMP]\\!/]KMPC]KGLSRCQk!J!SPR?GLdQ]SN]\u2014]ICCN]?]UGLBMU]JGTC]GL]TA]\\!,]KGL]RM]EMk!M*GEFRQ]?PC]ML]@?AIQR?EC]\u2014]ICCN]TA]JGTC]DMP]\\!/]KMPC]KGLSRCQk!S1FMUdQ]?@MSR]RM]QR?PR]\u2014]ICCN]?]UGLBMU]JGTC]GL]TA]\\!,]KGL]RM]EMk!N2FC]QR?EC]GQ]QCR]\u2014]ICCN]?]UGLBMU]JGTC]GL]TA]\\!,]KGL]RM]EMk!Q ?AIQR?EC]JGEFRQ]ML]\u2014]ICCN]?]UGLBMU]MNCL]GL]TA]\\!/]KMPC]KGLSRCQk!W1FMUdQ]?@MSR]RM]QR?PR]\u2014]ICCN]?]UGLBMU]JGTC]GL]TA]DMP]\\!/]KMPC]KGLSRCQk!],M]?PA?BC]BMMPU?W]AMSJB]@C]DMSLB]\u2014]LMR]R?IGLE]GR]RFGQ]QFGDRk!O2FC]?PA?BC]A?@GLCR]F?B]LM]BMMPU?W]\u2014]KMTGLE]MLk!Y2FC]A?@GLCRdQ]BMMPU?W]U?Q]LMR]DMSLB]\u2014]QIGNNGLE]RFGQ]MLCk!`,M]BMMPU?W]DMSLB]DMP]RFC]?PA?BC]A?@GLCR]\u2014]JC?TGLE]GR]DMP]J?RCPk!Z2FC]?PA?BC]A?@GLCR]F?B]LM]BMMPU?W]\u2014]JC?TGLE]GR]DMP]J?RCPk!\\2FC]A?@GLCRdQ]BMMPU?W]U?Q]LMR]DMSLB]\u2014]JC?TGLE]GR]DMP]J?RCPk!],M]BMMPU?W]DMSLB]DMP]RFC]?PA?BC]A?@GLCR]\u2014]QIGNNGLE]RFGQ]MLCk!^2FC]?PA?BC]A?@GLCR]F?B]LM]BMMPU?W]\u2014]LMR]R?IGLE]GR]RFGQ]QFGDRk!N,M]BMMPU?W]DMSLB]DMP]RFC]A?@GLCR]\u2014]KMTGLE]MLk!N,M]?PA?BC]BMMPU?W]AMSJB]@C]DMSLB]\u2014]KMTGLE]MLk!Q2FC]A?@GLCRdQ]BMMPU?W]U?Q]LMR]DMSLB]\u2014]KMTGLE]MLk!`2FC]A?@GLCRdQ]BMMPU?W]U?Q]LMR]DMSLB]\u2014]LMR]R?IGLE]GR]RFGQ]QFGDRk!],M]BMMPU?W]DMSLB]DMP]RFC]A?@GLCR]\u2014]LMR]R?IGLE]GR]RFGQ]QFGDRk!T,M]BMMPU?W]DMSLB]DMP]RFC]?PA?BC]A?@GLCR]\u2014]QIGNNGLEk!Y,M]?PA?BC]BMMPU?W]AMSJB]@C]DMSLB]\u2014]JC?TGLE]GR]DMP]J?RCPk!],M]?PA?BC]BMMPU?W]AMSJB]@C]DMSLB]\u2014]LMR]R?IGLE]GR]RFGQ]QFGDRk!O2FC]?PA?BC]A?@GLCR]F?B]LM]BMMPU?W]\u2014]KMTGLE]MLk!Y2FC]A?@GLCRdQ]BMMPU?W]U?Q]LMR]DMSLB]\u2014]QIGNNGLE]RFGQ]MLCk!`,M]BMMPU?W]DMSLB]DMP]RFC]?PA?BC]A?@GLCR]\u2014]JC?TGLE]GR]DMP]J?RCPk!Z2FC]?PA?BC]A?@GLCR]F?B]LM]BMMPU?W]\u2014]JC?TGLE]GR]DMP]J?RCPk!\\2FC]A?@GLCRdQ]BMMPU?W]U?Q]LMR]DMSLB]\u2014]JC?TGLE]GR]DMP]J?RCPk!],M]BMMPU?W]DMSLB]DMP]RFC]?PA?BC]A?@GLCR]\u2014]QIGNNGLE]RFGQ]MLCk!^2FC]?PA?BC]A?@GLCR]F?B]LM]BMMPU?W]\u2014]LMR]R?IGLE]GR]RFGQ]QFGDRk!N,M]BMMPU?W]DMSLB]DMP]RFC]A?@GLCR]\u2014]KMTGLE]MLk!N,M]?PA?BC]BMMPU?W]AMSJB]@C]DMSLB]\u2014]KMTGLE]MLk!Q2FC]A?@GLCRdQ]BMMPU?W]U?Q]LMR]DMSLB]\u2014]KMTGLE]MLk!`2FC]A?@GLCRdQ]BMMPU?W]U?Q]LMR]DMSLB]\u2014]LMR]R?IGLE]GR]RFGQ]QFGDRk!],M]BMMPU?W]DMSLB]DMP]RFC]A?@GLCR]\u2014]LMR]R?IGLE]GR]RFGQ]QFGDRk!T,M]BMMPU?W]DMSLB]DMP]RFC]?PA?BC]A?@GLCR]\u2014]QIGNNGLEk!Y,M]?PA?BC]BMMPU?W]AMSJB]@C]DMSLB]\u2014]JC?TGLE]GR]DMP]J?RCPk!C\"PMNNGLE]AMGLQ]GL]RFC]A?@GLCR]\u2014]e\\!']KGLfk!80SLLGLE]RFC]A?@GLCR]\u2014]\\!+]KGL]JCDRk!B$CCBGLE]AMGLQ]RM]RFC]A?@GLCR]\u2014]e\\!,]KMPC]KGLfk!?$CCBGLE]RFC]A?@GLCR]AMGLQ]\u2014]e\\!']KGLfk!C$CCBGLE]RFC]A?@GLCR]AMGLQ]\u2014]?@MSR]!,]KGL]RM]EMk!B\"PMNNGLE]AMGLQ]GL]RFC]A?@GLCR]\u2014]\\!+]KGL]JCDRk!F$CCBGLE]AMGLQ]RM]RFC]A?@GLCR]\u2014]?@MSR]!,]KGL]RM]EMk!A$CCBGLE]AMGLQ]RM]RFC]A?@GLCR]\u2014]\\!+]KGL]JCDRk!>$CCBGLE]RFC]A?@GLCR]AMGLQ]\u2014]\\!+]KGL]JCDRk!?$CCBGLE]RFC]A?@GLCR]AMGLQ]\u2014]e\\!,]KMPC]KGLfk!B$CCBGLE]AMGLQ]RM]RFC]A?@GLCR]\u2014]e\\!']KGLfk!90SLLGLE]RFC]A?@GLCR]\u2014]e\\!']KGLfk!G\"PMNNGLE]AMGLQ]GL]RFC]A?@GLCR]\u2014]?@MSR]!,]KGL]RM]EMk!C\"PMNNGLE]AMGLQ]GL]RFC]A?@GLCR]\u2014]e\\!,]KMPC]KGLfk!@!MGLQ]GLRM]RFC]A?@GLCR]\u2014]?@MSR]!,]KGL]RM]EMk!20?LBMK]DP?ARGMLw]!\"l!)]QM]D?Pk!.,MU]PC?BGLEw]!\"l!)]JMEECBk!.,MU]PC?BGLEw]!\"l!\"k!/!SPPCLR]@C?Rw]!\"l!)]JMEECBk!0.PMEPCQQ]JGLCw]!\"l!)]JMEECBk!20?LBMK]DP?ARGMLw]!\"l!)]JMEECBk!00SLLGLE]R?JJWw]!\"l!\"k!.,MU]PC?BGLEw]!\"l!*]RM]B?RCk!00SLLGLE]R?JJWw]!\"l!/]GL]RFC]@MMIQk!20?LBMK]DP?ARGMLw]!\"l!.,MU]PC?BGLEw]!\"l!)]QM]D?Pk!0.PMEPCQQ]JGLCw]!\"l!)]QM]D?Pk!/!SPPCLR]@C?Rw]!\"l!\"k!20?LBMK]DP?ARGMLw]!\"l!\"k!0.PMEPCQQ]JGLCw]!\"l!.0MSLBCB]MSRw]!\"k!-5P?NNCB]SNw]!\"k!+ MVCB]SNw]!\"k!.)LMAICB]MSRw]!\"k!-.SR]RM]@CBw]!\"k!,\"CJGTCPCBw]!\"k!-&?LBCB]MDDw]!\"k!*1CRRJCBw]!\"k!.!FCAICB]MDDw]!\"k!,!MKNJCRCBw]!\"k!-!?QFCB]MSRw]!\"k!-!JMQCB]MSRw]!\"k!*!JC?PCBw]!\"k!,!MLAJSBCBw]!\"k!)1C?JCBw]!\"k!*~ARGTGRW]!`]NPMBSACB]LM]NPMEPCQQ]@CDMPC]QRMNNGLE]\u2014]AMSLRGLE]GR]?Q]QR?JJCBk!*~ARGTGRW]!\\]CLBCB]UGRFMSR]AMLDGPKCB]NPMEPCQQ]\u2014]AMSLRGLE]GR]?Q]QR?JJCBk!*~ARGTGRW]!`]NPMBSACB]LM]NPMEPCQQ]@CDMPC]QRMNNGLE]\u2014]RPC?RGLE]GR]?Q]?]QR?JJk!*~ARGTGRW]!_]QRMNNCB]?DRCP]LM]AMLDGPKCB]NPMEPCQQ]\u2014]RPC?RGLE]GR]?Q]?]QR?JJk!*~ARGTGRW]!^]QR?JJCB]UGRF]LM]AMLDGPKCB]NPMEPCQQ]\u2014]RPC?RGLE]GR]?Q]?]QR?JJk!*~ARGTGRW]!\\]QRMNNCB]?DRCP]LM]AMLDGPKCB]NPMEPCQQ]\u2014]?QQSKGLE]GR]QR?JJCBk!*~ARGTGRW]!d]NPMBSACB]LM]NPMEPCQQ]@CDMPC]QRMNNGLE]\u2014]K?PIGLE]GR]BMUL]?Q]QR?JJCBk!*~ARGTGRW]!]]NPMBSACB]LM]NPMEPCQQ]@CDMPC]QRMNNGLE]\u2014]?QQSKGLE]GR]QR?JJCBk!*~ARGTGRW]!W]UCLR]OSGCR]UGRFMSR]NPMEPCQQ]\u2014]RPC?RGLE]GR]?Q]?]QR?JJk!*~ARGTGRW]!W]UCLR]OSGCR]UGRFMSR]NPMEPCQQ]\u2014]AMSLRGLE]GR]?Q]QR?JJCBk!*~ARGTGRW]!`]CLBCB]UGRFMSR]AMLDGPKCB]NPMEPCQQ]\u2014]K?PIGLE]GR]BMUL]?Q]QR?JJCBk!*~ARGTGRW]!Y]CLBCB]UGRFMSR]AMLDGPKCB]NPMEPCQQ]\u2014]?QQSKGLE]GR]QR?JJCBk!*~ARGTGRW]!c]QRMNNCB]?DRCP]LM]AMLDGPKCB]NPMEPCQQ]\u2014]K?PIGLE]GR]BMUL]?Q]QR?JJCBk!*~ARGTGRW]!Z]CLBCB]UGRFMSR]AMLDGPKCB]NPMEPCQQ]\u2014]DJ?EEGLE]LM]NPMEPCQQk!*~ARGTGRW]!T]UCLR]OSGCR]UGRFMSR]NPMEPCQQ]\u2014]?QQSKGLE]GR]QR?JJCBk!W,M]AFMPCQ]UCPC]ML]RFC]JGQR]\u2014]JC?TGLE]GR]DMP]LCVR]RGKCk!Q!FMPC]JGQR]U?Q]@J?LI]\u2014]JC?TGLE]GR]DMP]LCVR]RGKCk!P!FMPC]JGQR]A?KC]@?AI]CKNRW]\u2014]QIGNNGLE]RFGQ]MLCk!J2FC]JGQR]MD]AFMPCQ]U?Q]CKNRW]\u2014]KMTGLE]MLk!H!FMPC]JGQR]A?KC]@?AI]CKNRW]\u2014]KMTGLE]MLk!R2FC]JGQR]MD]AFMPCQ]U?Q]CKNRW]\u2014]QIGNNGLE]RFGQ]MLCk!W!FMPC]JGQR]A?KC]@?AI]CKNRW]\u2014]JC?TGLE]GR]DMP]LCVR]RGKCk!V!FMPC]JGQR]A?KC]@?AI]CKNRW]\u2014]LMRFGLE]RM]BM]RFGQ]N?QQk!Y2FC]JGQR]MD]AFMPCQ]U?Q]CKNRW]\u2014]JC?TGLE]GR]DMP]LCVR]RGKCk!Q!FMPC]JGQR]A?KC]@?AI]CKNRW]\u2014]QIGNNGLE]RFC]PMSLBk!P,M]AFMPCQ]UCPC]ML]RFC]JGQR]\u2014]QIGNNGLE]RFGQ]MLCk!S2FC]JGQR]MD]AFMPCQ]U?Q]CKNRW]\u2014]QIGNNGLE]RFC]PMSLBk!Q,M]AFMPCQ]UCPC]ML]RFC]JGQR]\u2014]QIGNNGLE]RFC]PMSLBk!L2FC]AFMPC]JGQR]A?KC]@?AI]@J?LI]\u2014]KMTGLE]MLk!U2FC]AFMPC]JGQR]A?KC]@?AI]@J?LI]\u2014]QIGNNGLE]RFC]PMSLBk!H!FMPC]R?PECR]BGB]LMR]N?PQC]\u2014]KMTGLE]MLk!N!FMPC]R?PECR]U?Q]GLT?JGB]\u2014]QIGNNGLE]RFGQ]MLCk!L!FMPC]R?PECR]U?Q]GLT?JGB]\u2014]LMR]QR?PRGLE]GRk!L!FMPC]R?PECR]BGB]LMR]N?PQC]\u2014]JC?TGLE]GR]@Ck!S!FMPC]R?PECR]A?KC]@?AI]SLSQ?@JC]\u2014]LMR]QR?PRGLE]GRk!P2FC]AFMPC]R?PECR]U?Q]K?JDMPKCB]\u2014]JC?TGLE]GR]@Ck!N!FMPC]R?PECR]BGB]LMR]N?PQC]\u2014]LMR]QR?PRGLE]GRk!P!FMPC]R?PECR]BGB]LMR]N?PQC]\u2014]QIGNNGLE]RFGQ]MLCk!L2FC]AFMPC]R?PECR]U?Q]K?JDMPKCB]\u2014]KMTGLE]MLk!V2FC]R?PECR]DMP]RFC]AFMPC]U?Q]@?B]\u2014]QIGNNGLE]RFGQ]MLCk!R2FC]R?PECR]DMP]RFC]AFMPC]U?Q]@?B]\u2014]JC?TGLE]GR]@Ck!F!FMPC]R?PECR]U?Q]GLT?JGB]\u2014]KMTGLE]MLk!O!FMPC]R?PECR]A?KC]@?AI]SLSQ?@JC]\u2014]QIGNNGLE]GRk!J!FMPC]R?PECR]U?Q]GLT?JGB]\u2014]JC?TGLE]GR]@Ck!U!FMPC]R?PECR]A?KC]@?AI]SLSQ?@JC]\u2014]QIGNNGLE]RFGQ]MLCk!Q!FMPC]A?KC]UGRFMSR]?L]?NNJGA?RGML]GB]\u2014]QIGNNGLEk!Z!FMPC]A?KC]UGRFMSR]?L]?NNJGA?RGML]GB]\u2014]QIGNNGLE]RFGQ]MLCk!Q!FMPC]F?B]LM]?NN]GBCLRGDGCP]\u2014]QIGNNGLE]RFGQ]MLCk!X2FC]AFMPC]J?AICB]?L]?NNJGA?RGML]GB]\u2014]QIGNNGLE]RFGQ]MLCk!I!FMPC]F?B]LM]?NN]GBCLRGDGCP]\u2014]KMTGLE]MLk!K,M]?NNJGA?RGML]GB]ML]RFC]AFMPC]\u2014]QIGNNGLEk!P2FC]AFMPC]J?AICB]?L]?NNJGA?RGML]GB]\u2014]KMTGLE]MLk!U!FMPC]F?B]LM]?NNJGA?RGML]GBCLRGDGCP]\u2014]JC?TGLE]GR]@Ck!L,M]?NNJGA?RGML]GB]ML]RFC]AFMPC]\u2014]KMTGLE]MLk!T,M]?NNJGA?RGML]GB]ML]RFC]AFMPC]\u2014]QIGNNGLE]RFGQ]MLCk!R,M]?NNJGA?RGML]GB]ML]RFC]AFMPC]\u2014]LMR]QR?PRGLE]GRk!T2FC]AFMPC]J?AICB]?L]?NNJGA?RGML]GB]\u2014]JC?TGLE]GR]@Ck!X!FMPC]A?KC]UGRFMSR]?L]?NNJGA?RGML]GB]\u2014]LMR]QR?PRGLE]GRk!V!FMPC]A?KC]UGRFMSR]?L]?NNJGA?RGML]GB]\u2014]JC?TGLE]GR]@Ck!W!FMPC]F?B]LM]?NNJGA?RGML]GBCLRGDGCP]\u2014]LMR]QR?PRGLE]GRk!B2P?GJ]K?PICP]KMTCB]\u2014]N?PICB]FCPCk!L+MTCB]MDD]RFC]K?GL]RP?GJ]\u2014]FMJBGLE]DMP]LMUk!D2P?GJ]K?PICP]QFGDRCB]\u2014]QR?WGLE]NSRk!H+MTCB]MDD]RFC]K?GL]RP?GJ]\u2014]QR?WGLE]NSRk!C.?SQCB]ML]RFC]RP?GJ]\u2014]N?PICB]FCPCk!H.?SQCB]ML]RFC]RP?GJ]\u2014]FMJBGLE]NMQGRGMLk!J1RCNNCB]MDD]RFC]RP?GJ]\u2014]FMJBGLE]NMQGRGMLk!E1RCNNCB]MDD]RFC]RP?GJ]\u2014]QR?WGLE]NSRk!E1RCNNCB]MDD]RFC]RP?GJ]\u2014]N?PICB]FCPCk!G.?SQCB]ML]RFC]RP?GJ]\u2014]FMJBGLE]DMP]LMUk!C.?SQCB]ML]RFC]RP?GJ]\u2014]QR?WGLE]NSRk!M+MTCB]MDD]RFC]K?GL]RP?GJ]\u2014]FMJBGLE]NMQGRGMLk!F2P?GJ]K?PICP]QFGDRCB]\u2014]FMJBGLE]QRGJJk!D2P?GJ]K?PICP]QFGDRCB]\u2014]N?PICB]FCPCk!G1RCNNCB]MDD]RFC]RP?GJ]\u2014]FMJBGLE]QRGJJk!K0CRSPLCB]RM]RFC]RP?GJ]\u2014]ML]RFC]KMTC]?E?GLk!K ?AI]ML]RFC]K?GL]RP?GJ]\u2014]NGAIGLE]SN]?E?GLk!B ?AI]ML]RFC]RP?GJ]\u2014]KMTGLE]?E?GLk!> ?AI]ML]RFC]RP?GJ]\u2014]PCQSKGLEk!G-L]RFC]RP?GJ]?E?GL]\u2014]NGAIGLE]SN]?E?GLk!H-L]RFC]RP?GJ]?E?GL]\u2014]ML]RFC]KMTC]?E?GLk!F0CRSPLCB]RM]RFC]RP?GJ]\u2014]KMTGLE]?E?GLk!G ?AI]RM]RFC]RP?GJ]\u2014]ML]RFC]KMTC]?E?GLk!> ?AI]RM]RFC]RP?GJ]\u2014]PCQSKGLEk!G ?AI]ML]RFC]RP?GJ]\u2014]ML]RFC]KMTC]?E?GLk!B0CRSPLCB]RM]RFC]RP?GJ]\u2014]PCQSKGLEk!F ?AI]RM]RFC]RP?GJ]\u2014]NGAIGLE]SN]?E?GLk!F ?AI]RM]RFC]RP?GJ]\u2014]PCQSKGLE]RFC]PSLk!L ?AI]ML]RFC]K?GL]RP?GJ]\u2014]ML]RFC]KMTC]?E?GLk!G-L]RFC]RP?GJ]?E?GL]\u2014]PCQSKGLE]RFC]PSLk!,]KMPC]AFMPC!K]A?KC]GL]?DRCP]RFC]@CJJ]RM]HMGL]RFC]@M?PBk!,]KMPC]AFMPC!=]HMGLCB]RFC]@M?PB]KGBjQFGDRk!,]KMPC]AFMPC!3]HMGLCB]RFC]@M?PBk!,]KMPC]AFMPC!C]HMGLCB]RFC]@M?PB]UFGJC]UC]UMPICBk!,]KMPC]AFMPC!?]HMGLCB]RFC]@M?PB]?DRCP]QR?PRk!,]KMPC]AFMPC!A]A?KC]GL]?DRCP]RFC]@CJJ]RM]FCJNk!,]KMPC]AFMPC!8]HMGLCB]RFC]@M?PB]J?RCk!,]KMPC]AFMPC!G]A?KC]GL]?DRCP]RFC]@CJJ]?LB]HMGLCB]SNk!,]KMPC]AFMPC!B]HMGLCB]RFC]@M?PB]@CDMPC]RFC]CLBk!,]KMPC]AFMPC!B]A?KC]GL]?DRCP]RFC]@CJJ]U?Q]PSLEk!,]KMPC]AFMPC!C]A?KC]GL]?DRCP]RFC]@CJJi]PCDGJJCBk!,]KMPC]AFMPC!L]A?KC]GL]?DRCP]RFC]@CJJx]HMGLGLE]RFC]@M?PBk!,]KMPC]AFMPC!E]HMGLCB]RFC]@M?PB]DMP]RFC]LCVR]N?QQk!,]KMPC]AFMPC!=]HMGLCB]RFC]@M?PBi]PCDGJJCBk!,]KMPC]AFMPC!?]HMGLCB]RFC]@M?PB]?LB]AMSLRCBk!;0MSEF]N?RAF]ML]MLC]AFMPCw]!:&GR]?]QL?E]ML]MLC]AFMPCw]!?-LC]AFMPC]A?KC]@?AI]QGBCU?WQw]!8-LC]AFMPC]RFPCU]?]DGRw]!4-LC]AFMPC]QJGNNCBw]!6-LC]AFMPC]DCJJ]MTCPw]!8-LC]AFMPC]IGAICB]@?AIw]!>!?SEFR]?L]CBEC]ML]MLC]AFMPCw]!4$SK@JCB]MLC]AFMPCw]!:-LC]AFMPC]UCLR]QGBCU?WQw]!>1L?EECB]?]L?GJ]ML]MLC]AFMPCw]!7-LC]AFMPC]KGQ@CF?TCBw]!4\"PMNNCB]MLC]AFMPCw]!9~]AFMPC]RFPCU]?L]CPPMPw]!@0?L]GLRM]RPMS@JC]ML]MLC]AFMPCw]!D*?QR]A?JJ]\u2014]QFGDR]ASR]QFMPR]\u2014]UGRF]!1]?ARGTGRW]PCQSJR!\"k!F*?QR]A?JJ]\u2014]QFGDR]CLBCB]C?PJW]\u2014]UGRF]!1]?ARGTGRW]PCQSJR!\"k!B*?QR]A?JJ]\u2014]QFGDR]CLBCB]C?PJW]\u2014]e!1]?ARGTGRW]PCQSJR!+f]GL]F?LBk!@*?QR]A?JJ]\u2014]QFGDR]ASR]QFMPR]\u2014]e!1]?ARGTGRW]PCQSJR!+f]GL]F?LBk!@*?QR]A?JJ]\u2014]QFGDR]ASR]QFMPR]\u2014]e!1]?ARGTGRW]PCQSJR!#fk!H*?QR]A?JJ]\u2014]RFC]QFGDR]QRMNNCB]C?PJW]\u2014]e!1]?ARGTGRW]PCQSJR!#fk!?*?QR]A?JJ]\u2014]QRMNNGLE]C?PJW]\u2014]e!1]?ARGTGRW]PCQSJR!*f]JMEECBk!?*?QR]A?JJ]\u2014]PSL]CLBCB]C?PJW]\u2014]!1]?ARGTGRW]PCQSJR!+]PCAMPBCBk!?*?QR]A?JJ]\u2014]QRMNNGLE]C?PJW]\u2014]e!1]?ARGTGRW]PCQSJR!#fk!H*?QR]A?JJ]\u2014]RFC]QFGDR]QRMNNCB]C?PJW]\u2014]e!1]?ARGTGRW]PCQSJR!+f]GL]F?LBk!@*?QR]A?JJ]\u2014]PSL]CLBCB]C?PJW]\u2014]e!1]?ARGTGRW]PCQSJR!*f]JMEECBk!@*?QR]A?JJ]\u2014]PSL]CLBCB]C?PJW]\u2014]e!1]?ARGTGRW]PCQSJR!#fk!G*?QR]A?JJ]\u2014]RFC]QFGDR]QRMNNCB]C?PJW]\u2014]!1]?ARGTGRW]PCQSJR!+]PCAMPBCBk!?*?QR]A?JJ]\u2014]QFGDR]ASR]QFMPR]\u2014]!1]?ARGTGRW]PCQSJR!+]PCAMPBCBk!?*?QR]A?JJ]\u2014]QRMNNGLE]C?PJW]\u2014]e!1]?ARGTGRW]PCQSJR!+f]GL]F?LBk!J1FCJD]EJC?KGLE]AMKNJCRCJW]\u2014]AJC?P]@M?PB]e!1]?ARGTGRW]PCQSJR!Kfk].PCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRk!M1FCJD]NMJGQFCBi]?JJ]MD]GR]\u2014]BMLC]?LB]AJC?P]e!1]?ARGTGRW]PCQSJR!Lfk]e.PCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRf!H1FCJD]DSJJW]AJC?PCB]\u2014]LMRFGLE]PCK?GLQ]e!1]?ARGTGRW]PCQSJR!Lfk]e.PCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRf!E1FCJD]DSJJW]AJC?PCB]\u2014]LMRFGLE]JCDR]e!1]?ARGTGRW]PCQSJR!Lfk]e.PCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRf!D1FCJD]DSJJW]AJC?PCB]\u2014]AJC?P]@M?PB]e!1]?ARGTGRW]PCQSJR!Kfk].PCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRk!K1FCJD]NMJGQFCB]AMKNJCRCJW]\u2014]LMRFGLE]JCDR]e!1]?ARGTGRW]PCQSJR!Kfk].PCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRk!E1FCJD]DSJJW]AJC?PCB]\u2014]LMRFGLE]JCDR]e!1]?ARGTGRW]PCQSJR!Kfk].PCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRk!K1FCJD]NMJGQFCB]AMKNJCRCJW]\u2014]LMRFGLE]JCDR]e!1]?ARGTGRW]PCQSJR!Uf]PCAMPBCBk]e.PCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRf!K1FCJD]EJC?KGLE]AMKNJCRCJW]\u2014]LMRFGLE]JCDR]e!1]?ARGTGRW]PCQSJR!Kfk].PCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRk!C1FCJD]EJC?KGLE]\u2014]LMRFGLE]PCK?GLQ]e!1]?ARGTGRW]PCQSJR!Lfk]e.PCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRf!N1FCJD]NMJGQFCBi]?JJ]MD]GR]\u2014]LMRFGLE]PCK?GLQ]e!1]?ARGTGRW]PCQSJR!Lfk]e.PCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRf!K1FCJD]EJC?KGLE]AMKNJCRCJW]\u2014]LMRFGLE]JCDR]e!1]?ARGTGRW]PCQSJR!Uf]PCAMPBCBk]e.PCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRf!C1FCJD]NMJGQFCB]\u2014]LMRFGLE]PCK?GLQ]e!1]?ARGTGRW]PCQSJR!Lfk]e.PCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRf!@1FCJD]NMJGQFCB]\u2014]LMRFGLE]JCDR]e!1]?ARGTGRW]PCQSJR!Lfk]e.PCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRf!N1FCJD]NMJGQFCB]AMKNJCRCJW]\u2014]LMRFGLE]PCK?GLQ]e!1]?ARGTGRW]PCQSJR!Lfk]e.PCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PRf!1!?SEFR]?L]CBECw]!3\"PMNNCB]RFC]RP?Ww]!<2FPCU]?L]CPPMP]?R]RFC]RMNw]!0$MSJCB]?]QRCNw]!0!?SEFR]?]QL?Ew]!.0?L]?EPMSLBw]!05CLR]QGBCU?WQw]!30?L]GLRM]RPMS@JCw]!11JGNNCB]SN]RMNw]!7)GAICB]@?AI]?L]CPPMPw]!/ PMIC]QRPGBCw]!11L?EECB]?]L?GJw]!1$SK@JCB]?]QRCNw]!4&GR]?]U?JJ]SN]RMNw]!-&GR]?]QL?Ew]\"*#TCPWRFGLEdQ]NMJGQFCBi]?JJ]MD]GR]\u2014]NPCQQ]~JRh1FGDRh0]UFCL]WMS]?PC]BMLCx]RFC]PSL]QGRQ]GBJC]SLRGJ]WMS]BMk\"\"~JJ]NMJGQFCB]\u2014]NPCQQ]~JRh1FGDRh0]RM]DJSQF]?LB]PCQR?PR]ePCDPCQFf]UFCLCTCPx]RFC]PSL]QR?WQ]N?PICBk\"@~JJ]NMJGQFCB]SN]\u2014]NPCQQ]~JRh1FGDRh0]RM]QF?IC]MSR]RFC]PSE]ePCDPCQFf]GD]WMS]U?LR]?]AJC?L]QJ?RCx]MRFCPUGQC]LMRFGLE]CJQC]F?NNCLQk!t~JJ]NMJGQFCB]\u2014]NPCQQ]~JRh1FGDRh0]UFCL]WMS]?PC]BMLCx]RFC]PSL]QGRQ]GBJC]SLRGJ]WMS]BMk\"5~JJ]NMJGQFCBi]BMLC]DMP]LMU]\u2014]NPCQQ]~JRh1FGDRh0]RM]QF?IC]MSR]RFC]PSE]ePCDPCQFf]UFCL]PC?BWx]LMRFGLE]PSLQ]SLRGJ]RFCLk\"Q#TCPWRFGLEdQ]NMJGQFCBi]?JJ]MD]GR]\u2014]NPCQQ]~JRh1FGDRh0]RM]QF?IC]MSR]RFC]PSE]ePCDPCQFf]GD]WMS]U?LR]?]AJC?L]QJ?RCx]MRFCPUGQC]LMRFGLE]CJQC]F?NNCLQk\":~JJ]NMJGQFCB]\u2014]NPCQQ]~JRh1FGDRh0]RM]QF?IC]MSR]RFC]PSE]ePCDPCQFfi]MP]HSQR]ICCN]@PMUQGLEx]LMRFGLE]KMTCQ]SLRGJ]WMS]Q?W]QMk\";#TCPWRFGLEdQ]NMJGQFCBi]?JJ]MD]GR]\u2014]NPCQQ]~JRh1FGDRh0]RM]QF?IC]MSR]RFC]PSE]ePCDPCQFf]UFCL]PC?BWx]LMRFGLE]PSLQ]SLRGJ]RFCLk!}#TCPWRFGLEdQ]NMJGQFCB]\u2014]NPCQQ]~JRh1FGDRh0]UFCL]WMS]?PC]BMLCx]RFC]PSL]QGRQ]GBJC]SLRGJ]WMS]BMk\"*~JJ]NMJGQFCB]SN]\u2014]NPCQQ]~JRh1FGDRh0]RM]QF?IC]MSR]RFC]PSE]ePCDPCQFf]UFCL]PC?BWx]LMRFGLE]PSLQ]SLRGJ]RFCLk\"H~JJ]NMJGQFCBi]BMLC]DMP]LMU]\u2014]NPCQQ]~JRh1FGDRh0]RM]QF?IC]MSR]RFC]PSE]ePCDPCQFfi]MP]HSQR]ICCN]@PMUQGLEx]LMRFGLE]KMTCQ]SLRGJ]WMS]Q?W]QMk\"$~JJ]NMJGQFCBi]BMLC]DMP]LMU]\u2014]NPCQQ]~JRh1FGDRh0]UFCL]WMS]?PC]BMLCx]RFC]PSL]QGRQ]GBJC]SLRGJ]WMS]BMk\"K~JJ]NMJGQFCBi]BMLC]DMP]LMU]\u2014]NPCQQ]~JRh1FGDRh0]RM]QF?IC]MSR]RFC]PSE]ePCDPCQFf]GD]WMS]U?LR]?]AJC?L]QJ?RCx]MRFCPUGQC]LMRFGLE]CJQC]F?NNCLQk\"=~JJ]NMJGQFCB]\u2014]NPCQQ]~JRh1FGDRh0]RM]QF?IC]MSR]RFC]PSE]ePCDPCQFf]GD]WMS]U?LR]?]AJC?L]QJ?RCx]MRFCPUGQC]LMRFGLE]CJQC]F?NNCLQk\"=~JJ]NMJGQFCB]SN]\u2014]NPCQQ]~JRh1FGDRh0]RM]QF?IC]MSR]RFC]PSE]ePCDPCQFfi]MP]HSQR]ICCN]@PMUQGLEx]LMRFGLE]KMTCQ]SLRGJ]WMS]Q?W]QMk!p+?RdQ]F?JDjQF?ICL]\u2014]NPCQQ]~JRh1FGDRh0]RM]DGLGQF]RFC]QF?IC]ePCDPCQFf]UFCL]PC?BWk!a0SEdQ]F?JDjQF?ICL]\u2014]FGR]~JRh1FGDRh0]RM]DGLGQF]RFC]HM@]ePCDPCQFfk!m2FC]PSE]GQ]F?JDjQF?ICL]\u2014]NPCQQ]~JRh1FGDRh0]RM]UP?N]GR]SN]ePCDPCQFf]?LW]RGKCk!x&?JDU?W]RFPMSEF]RFC]QF?IC]\u2014]NPCQQ]~JRh1FGDRh0]RM]DGLGQF]RFC]QF?IC]ePCDPCQFf]UFCL]PC?BWk!|&?JD]RFC]PSL]GQ]BMLC]\u2014]NPCQQ]~JRh1FGDRh0]RM]DGLGQF]RFC]HM@]ePCDPCQFf]UFCLCTCP]WMSdPC]PC?BWk!f2FC]PSE]GQ]F?JDjQF?ICL]\u2014]FGR]~JRh1FGDRh0]RM]DGLGQF]RFC]HM@]ePCDPCQFfk!u2FC]PSE]GQ]F?JDjQF?ICL]\u2014]NPCQQ]~JRh1FGDRh0]RM]DGLGQF]RFC]QF?IC]ePCDPCQFf]UFCL]PC?BWk!i0SEdQ]F?JDjQF?ICL]\u2014]NPCQQ]~JRh1FGDRh0]ePCDPCQFf]RM]DGLGQF]UFCL]WMS]JGICk!l&?JD]RFC]PSL]GQ]BMLC]\u2014]NPCQQ]~JRh1FGDRh0]ePCDPCQFf]RM]DGLGQF]UFCL]WMS]JGICk!s&?JD]RFC]PSL]GQ]BMLC]\u2014]NPCQQ]~JRh1FGDRh0]RM]DGLGQF]RFC]QF?IC]ePCDPCQFf]UFCL]PC?BWk\"#&?JDU?W]RFPMSEF]RFC]QF?IC]\u2014]NPCQQ]~JRh1FGDRh0]RM]DGLGQF]RFC]HM@]ePCDPCQFf]UFCLCTCP]WMSdPC]PC?BWk!n2FC]PSE]GQ]F?JDjQF?ICL]\u2014]NPCQQ]~JRh1FGDRh0]ePCDPCQFf]RM]DGLGQF]UFCL]WMS]JGICk!h0SEdQ]F?JDjQF?ICL]\u2014]NPCQQ]~JRh1FGDRh0]RM]UP?N]GR]SN]ePCDPCQFf]?LW]RGKCk!d&?JD]RFC]PSL]GQ]BMLC]\u2014]FGR]~JRh1FGDRh0]RM]DGLGQF]RFC]HM@]ePCDPCQFfk!q&?JDU?W]RFPMSEF]RFC]QF?IC]\u2014]NPCQQ]~JRh1FGDRh0]ePCDPCQFf]RM]DGLGQF]UFCL]WMS]JGICk!N2FC]KCKM]UCLR]SLBCP]RFC]BMMP]\u2014]QFGDR]QR?PRCBk!H3LBCP]RFC]BMMP]GR]UCLR]\u2014]QFGDR]QR?PRCBk!G,MRC]RFPMSEF]RFC]QJMR]\u2014]QFGDR]QR?PRCBk!E+CKM]SLBCP]RFC]BMMP]\u2014]QFGDRdQ]EMGLEk!F~]LMRC]UCLR]SLBCP]RFC]BMMP]\u2014]PSLLGLEk!J,MRC]QJGB]SLBCP]RFC]BMMP]\u2014]QFGDR]QR?PRCBk!A\"MMP]LMRC]BPMNNCB]\u2014]QFGDR]GQ]MLk!E1FGDR]QR?PRCB]\u2014]LMRC]SLBCP]RFC]BMMPk!I3LBCP]RFC]BMMPw]LMRC]GL]\u2014]QFGDR]QR?PRCBk!E1FGDR]QR?PRCB]eLMRC]SLBCP]RFC]BMMPfk!@1FGDR]QR?PRCB]\u2014]KCKM]BCJGTCPCBk!B\"PMNNCB]RFC]KCKM]\u2014]QFGDR]QR?PRCBk!H,MRCdQ]SLBCP]RFC]BMMP]\u2014]QFGDR]SLBCPU?Wk!@2FC]LMRC]GQ]GL]\u2014]QFGDR]QR?PRCBk!E1R?PRCB]RFC]QFGDR]eKCKM]SLBCP]BMMPfk!C)LMAICB]RFC]QFCJD]MTCP]KGBjQCRSNw]!9)LMAICB]RFC]QCRSN]MTCPw]!01CRSN]AP?QFCBw]!A1NGJJCB]RFC]@M?PB]BSPGLE]QCRSNw]!= PMIC]?]QFCJD]BSPGLE]QCRSNw]!D)LMAICB]RFC]QFCJD]MTCP]QCRRGLE]SNw]!.1CRSN]RFPCUw]!4$SK@JCB]RFC]QCRSNw]!F\"PMNNCB]CTCPWRFGLE]UFGJC]QCRRGLE]SNw]!9+?LEJCB]RFC]QCRSN]QRCNw]!;1CRRGLE]SN]UCLR]QGBCU?WQw]!A3NCLBCB]RFC]@M?PB]BSPGLE]QCRSNw]!72PGNNCB]BSPGLE]QCRSNw]!91FCJD]QCRSN]DCJJ]?N?PRw]!9 MRAFCB]RFC]QCRSN]QRCNw]!C)LMAICB]RFC]QFCJD]MTCP]KGBjQCRSNw]!9)LMAICB]RFC]QCRSN]MTCPw]!01CRSN]AP?QFCBw]!A1NGJJCB]RFC]@M?PB]BSPGLE]QCRSNw]!= PMIC]?]QFCJD]BSPGLE]QCRSNw]!D)LMAICB]RFC]QFCJD]MTCP]QCRRGLE]SNw]!.1CRSN]RFPCUw]!4$SK@JCB]RFC]QCRSNw]!F\"PMNNCB]CTCPWRFGLE]UFGJC]QCRRGLE]SNw]!9+?LEJCB]RFC]QCRSN]QRCNw]!;1CRRGLE]SN]UCLR]QGBCU?WQw]!A3NCLBCB]RFC]@M?PB]BSPGLE]QCRSNw]!72PGNNCB]BSPGLE]QCRSNw]!91FCJD]QCRSN]DCJJ]?N?PRw]!9 MRAFCB]RFC]QCRSN]QRCNw]");
  const _0xed = i => { const t = _0xeb; const n = (t[i] - 0x21) * 94 + (t[i + 1] - 0x21); let r = ""; for (let j = 0; j < n; j++) { const c = t[i + 2 + j]; r += String.fromCharCode(c < 0x80 ? 0x20 + (((c - 0x20 - 61) % 0x5F) + 0x5F) % 0x5F : c); } return r; };
  try { const _0xsm = _0xed(0); Log.queue("Store check", { unit: "e", stores: 1, packed: _0xeb instanceof Uint16Array, sample: typeof _0xsm === "string" && _0xsm.length > 0, retained: _0xeb instanceof Uint16Array ? 0 : 1 }); } catch (e) {}
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

  const _0x5c1e = Symbol.for("_0xq2de579ef");
  if (window[_0x5c1e]) {
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

  const _0x5c1f = { released: false };
  window[_0x5c1e] = _0x5c1f;
  
  const GoogleRelease = () => {
    if (_0x5c1f.released) return;
    _0x5c1f.released = true;
    const toDispose = disposables.splice(0, disposables.length);
    try { controller.abort(); } catch (e) {}
    while (toDispose.length) { try { toDispose.pop()(); } catch (e) {} }
    while (disposables.length) { try { disposables.pop()(); } catch (e) {} }
    try { if (window[_0x5c1e] === _0x5c1f) delete window[_0x5c1e]; } catch (e) {}
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
        Log.say(_0xlex.C(0), _0xlex.P(0,[_0xed(0),_0xed(56),_0xed(114),_0xed(171),_0xed(231),_0xed(285),_0xed(348),_0xed(397),_0xed(453),_0xed(524),_0xed(583),_0xed(647),_0xed(700),_0xed(752),_0xed(803)]));
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
        Log.say(_0xlex.C(0), _0xlex.P(1,[_0xed(861),_0xed(928),_0xed(997),_0xed(1060),_0xed(1122),_0xed(1204),_0xed(1266),_0xed(1333),_0xed(1403),_0xed(1485),_0xed(1566),_0xed(1629),_0xed(1692),_0xed(1755),_0xed(1825)]));
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
      
      
      Log.say(_0xlex.C(1), _0xlex.P(53,[_0xed(1888),_0xed(1907),_0xed(1926),_0xed(1943),_0xed(1963),_0xed(1984),_0xed(2002),_0xed(2021),_0xed(2038),_0xed(2058),_0xed(2074),_0xed(2091),_0xed(2109),_0xed(2127),_0xed(2146)]) + JSON.stringify({
        lantern: !!_0x3, twine: !!_0x4, ledger: !!_0x5, spool: !!_0x6, map: !!_0x7, postbox: !!_0x8, compass: !!_0x9
      }));

      if (!_0xpocketsComplete) {
        Log.say(_0xlex.C(0), _0xlex.P(52,[_0xed(2163),_0xed(2204),_0xed(2246),_0xed(2284),_0xed(2326),_0xed(2373),_0xed(2412),_0xed(2455),_0xed(2498),_0xed(2538),_0xed(2581),_0xed(2624),_0xed(2669),_0xed(2712),_0xed(2756)]));
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
        Log.say(_0xlex.C(0), _0xlex.P(2,[_0xed(2799),_0xed(2861),_0xed(2916),_0xed(2971),_0xed(3021),_0xed(3083),_0xed(3129),_0xed(3199),_0xed(3261),_0xed(3304),_0xed(3358),_0xed(3423),_0xed(3493),_0xed(3544),_0xed(3595)]));
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
      
      Log.say(_0xlex.C(2), _0xlex.P(21,[`${_0xb.length}${_0xed(3641)}${_0xb.length === 1 ? "" : "s"}${_0xed(3649)}`,`${_0xb.length}${_0xed(3684)}${_0xb.length === 1 ? "" : "s"}${_0xed(3692)}`,`${_0xb.length}${_0xed(3728)}${_0xb.length === 1 ? "" : "s"}${_0xed(3736)}`,`${_0xb.length}${_0xed(3763)}${_0xb.length === 1 ? "" : "s"}${_0xed(3771)}`,`${_0xb.length}${_0xed(3808)}${_0xb.length === 1 ? "" : "s"}${_0xed(3816)}`,`${_0xb.length}${_0xed(3850)}${_0xb.length === 1 ? "" : "s"}${_0xed(3858)}`,`${_0xb.length}${_0xed(3881)}${_0xb.length === 1 ? "" : "s"}${_0xed(3889)}`,`${_0xb.length}${_0xed(3916)}${_0xb.length === 1 ? "" : "s"}${_0xed(3924)}`,`${_0xb.length}${_0xed(3959)}${_0xb.length === 1 ? "" : "s"}${_0xed(3967)}`,`${_0xb.length}${_0xed(3980)}${_0xb.length === 1 ? "" : "s"}${_0xed(3988)}`,`${_0xb.length}${_0xed(4011)}${_0xb.length === 1 ? "" : "s"}${_0xed(4019)}`,`${_0xb.length}${_0xed(4044)}${_0xb.length === 1 ? "" : "s"}${_0xed(4052)}`,`${_0xb.length}${_0xed(4082)}${_0xb.length === 1 ? "" : "s"}${_0xed(4090)}`,`${_0xb.length}${_0xed(4126)}${_0xb.length === 1 ? "" : "s"}${_0xed(4134)}`,`${_0xb.length}${_0xed(4171)}${_0xb.length === 1 ? "" : "s"}${_0xed(4179)}`]));
      const _0xlost = _0xeligible.length - _0xb.length;
      if (_0xlost > 0) Log.say(_0xlex.C(2), _0xlex.P(22,[`${_0xlost}${_0xed(4217)}`,`${_0xlost}${_0xed(4262)}`,`${_0xlost}${_0xed(4310)}`,`${_0xlost}${_0xed(4350)}`,`${_0xlost}${_0xed(4389)}`,`${_0xlost}${_0xed(4427)}`,`${_0xlost}${_0xed(4473)}`,`${_0xlost}${_0xed(4518)}`,`${_0xlost}${_0xed(4565)}`,`${_0xlost}${_0xed(4599)}`,`${_0xlost}${_0xed(4644)}`,`${_0xlost}${_0xed(4685)}`,`${_0xlost}${_0xed(4729)}`,`${_0xlost}${_0xed(4766)}`,`${_0xlost}${_0xed(4806)}`]));
      
      if (!_0xb.length) { 
        Log.say(_0xlex.C(13), _0xlex.P(24,[_0xed(4850),_0xed(4942),_0xed(5029),_0xed(5126),_0xed(5214),_0xed(5270),_0xed(5331),_0xed(5411),_0xed(5495),_0xed(5573),_0xed(5648),_0xed(5740),_0xed(5800),_0xed(5879),_0xed(5950)])); 
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
          Log.say(_0xlex.C(18), document.hidden ? _0xlex.P(50,[_0xed(6018),_0xed(6056),_0xed(6099),_0xed(6135),_0xed(6173),_0xed(6214),_0xed(6250),_0xed(6291),_0xed(6332),_0xed(6373),_0xed(6412),_0xed(6450),_0xed(6491),_0xed(6532),_0xed(6576)]) : _0xlex.P(51,[_0xed(6614),_0xed(6645),_0xed(6678),_0xed(6709),_0xed(6742),_0xed(6773),_0xed(6811),_0xed(6845),_0xed(6872),_0xed(6908),_0xed(6946),_0xed(6975),_0xed(7012),_0xed(7045),_0xed(7080)]));
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
        if (key === 'x' && !_0xkill && !_0xarmed) { _0xkill = true; controller.abort(); Log.say(_0xlex.C(6), _0xlex.P(25,[_0xed(7115),_0xed(7175),_0xed(7246),_0xed(7312),_0xed(7375),_0xed(7436),_0xed(7500),_0xed(7565),_0xed(7631),_0xed(7690),_0xed(7750),_0xed(7814),_0xed(7875),_0xed(7935),_0xed(7994)])); }
        if (key === 'r' && _0xarmed) { Log.say(_0xlex.C(9), _0xlex.P(27,[_0xed(8060),_0xed(8113),_0xed(8153),_0xed(8202),_0xed(8250),_0xed(8290),_0xed(8339),_0xed(8391),_0xed(8438),_0xed(8486),_0xed(8535),_0xed(8576),_0xed(8624),_0xed(8668),_0xed(8717)])); GoogleRelease(); setTimeout(() => location.reload(), 1500); }
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
            if (st === 401) { if (critical) { _0xkill = true; controller.abort(); Log.say(_0xlex.C(0), _0xlex.P(3,[_0xed(8767),_0xed(8803),_0xed(8838),_0xed(8885),_0xed(8923),_0xed(8968),_0xed(9008),_0xed(9051),_0xed(9091),_0xed(9136),_0xed(9178),_0xed(9218),_0xed(9267),_0xed(9308),_0xed(9353)])); } throw e; }
            if (st === 429) {
              _0xheat = Math.min(4, _0xheat * 1.5);
              const retryAfter = Number(e?.body?.retry_after ?? e?.retry_after ?? 4);
              const s = Number.isFinite(retryAfter) && retryAfter >= 0 ? Math.min(300, Math.ceil(retryAfter) + 1 + Math.random()) : 5 + Math.random() * 2;
              Log.say(_0xlex.C(7), _0xlex.P(30,[`${_0xed(9401)}${Math.ceil(s)}${_0xed(9441)}`,`${_0xed(9466)}${Math.ceil(s)}${_0xed(9507)}`,`${_0xed(9511)}${Math.ceil(s)}${_0xed(9556)}`,`${_0xed(9560)}${Math.ceil(s)}${_0xed(9604)}`,`${_0xed(9608)}${Math.ceil(s)}${_0xed(9655)}`,`${_0xed(9659)}${Math.ceil(s)}${_0xed(9704)}`,`${_0xed(9729)}${Math.ceil(s)}${_0xed(9769)}`,`${_0xed(9773)}${Math.ceil(s)}${_0xed(9814)}`,`${_0xed(9839)}${Math.ceil(s)}${_0xed(9888)}`,`${_0xed(9892)}${Math.ceil(s)}${_0xed(9935)}`,`${_0xed(9939)}${Math.ceil(s)}${_0xed(9990)}`,`${_0xed(9994)}${Math.ceil(s)}${_0xed(10040)}`,`${_0xed(10044)}${Math.ceil(s)}${_0xed(10091)}`,`${_0xed(10095)}${Math.ceil(s)}${_0xed(10140)}`,`${_0xed(10144)}${Math.ceil(s)}${_0xed(10187)}`]));
              await GoogleDelayRaw(s * 1000); tries++; continue;
            }
            if (st >= 500 && st < 600) { 
              const backoff = Math.pow(2, tries) * 2 + (Math.random() * 2); 
              Log.say(_0xlex.C(7), _0xlex.P(31,[`${_0xed(10212)}${st}${_0xed(10227)}${backoff.toFixed(1)}${_0xed(10254)}`,`${_0xed(10258)}${st}${_0xed(10273)}${backoff.toFixed(1)}${_0xed(10300)}`,`${_0xed(10317)}${st}${_0xed(10332)}${backoff.toFixed(1)}${_0xed(10363)}`,`${_0xed(10367)}${st}${_0xed(10382)}${backoff.toFixed(1)}${_0xed(10417)}`,`${_0xed(10421)}${st}${_0xed(10436)}${backoff.toFixed(1)}${_0xed(10463)}`,`${_0xed(10467)}${st}${_0xed(10482)}${backoff.toFixed(1)}${_0xed(10495)}`,`${_0xed(10512)}${st}${_0xed(10527)}${backoff.toFixed(1)}${_0xed(10558)}`,`${_0xed(10562)}${st}${_0xed(10577)}${backoff.toFixed(1)}${_0xed(10600)}`,`${_0xed(10604)}${st}${_0xed(10619)}${backoff.toFixed(1)}${_0xed(10650)}`,`${_0xed(10654)}${st}${_0xed(10669)}${backoff.toFixed(1)}${_0xed(10690)}`,`${_0xed(10694)}${st}${_0xed(10709)}${backoff.toFixed(1)}${_0xed(10726)}`,`${_0xed(10730)}${st}${_0xed(10745)}${backoff.toFixed(1)}${_0xed(10764)}`,`${_0xed(10781)}${st}${_0xed(10796)}${backoff.toFixed(1)}${_0xed(10831)}`,`${_0xed(10835)}${st}${_0xed(10850)}${backoff.toFixed(1)}${_0xed(10877)}`,`${_0xed(10881)}${st}${_0xed(10896)}${backoff.toFixed(1)}${_0xed(10931)}`])); 
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
        if (!obj || Object.isFrozen(obj) || Object.isSealed(obj)) { Log.say(_0xlex.C(0), _0xlex.P(4,[`${_0xed(10935)}${key}${_0xed(10944)}`,`${_0xed(10984)}${key}${_0xed(10993)}`,`${_0xed(11029)}${key}${_0xed(11038)}`,`${_0xed(11075)}${key}${_0xed(11084)}`,`${_0xed(11120)}${key}${_0xed(11129)}`,`${_0xed(11168)}${key}${_0xed(11177)}`,`${_0xed(11207)}${key}${_0xed(11216)}`,`${_0xed(11251)}${key}${_0xed(11260)}`,`${_0xed(11293)}${key}${_0xed(11302)}`,`${_0xed(11334)}${key}${_0xed(11343)}`,`${_0xed(11370)}${key}${_0xed(11379)}`,`${_0xed(11415)}${key}${_0xed(11424)}`,`${_0xed(11455)}${key}${_0xed(11464)}`,`${_0xed(11496)}${key}${_0xed(11505)}`,`${_0xed(11535)}${key}${_0xed(11544)}`])); return null; }
        try {
          const own = Object.getOwnPropertyDescriptor(obj, key);
          let cur = Object.getPrototypeOf(obj), d = null;
          while (cur && !d) { d = Object.getOwnPropertyDescriptor(cur, key); cur = d ? cur : Object.getPrototypeOf(cur); }
          const flags = d && !d.get ? { writable: !!d.writable, configurable: !!d.configurable, enumerable: !!d.enumerable } : { writable: false, configurable: true, enumerable: false };
          Object.defineProperty(obj, key, { value: fn, ...flags });
          return () => { try { if (own) Object.defineProperty(obj, key, own); else delete obj[key]; } catch (e) {} };
        } catch (e) { Log.say(_0xlex.C(0), _0xlex.P(5,[`${_0xed(11579)}${key}${_0xed(11599)}${e.message}`,`${_0xed(11610)}${key}${_0xed(11627)}${e.message}`,`${_0xed(11637)}${key}${_0xed(11662)}${e.message}`,`${_0xed(11671)}${key}${_0xed(11701)}${e.message}`,`${_0xed(11704)}${key}${_0xed(11735)}${e.message}`,`${_0xed(11738)}${key}${_0xed(11759)}${e.message}`,`${_0xed(11769)}${key}${_0xed(11790)}${e.message}`,`${_0xed(11800)}${key}${_0xed(11806)}${e.message}`,`${_0xed(11833)}${key}${_0xed(11856)}${e.message}`,`${_0xed(11859)}${key}${_0xed(11876)}${e.message}`,`${_0xed(11879)}${key}${_0xed(11890)}${e.message}`,`${_0xed(11900)}${key}${_0xed(11925)}${e.message}`,`${_0xed(11936)}${key}${_0xed(11954)}${e.message}`,`${_0xed(11964)}${key}${_0xed(11989)}${e.message}`,`${_0xed(11992)}${key}${_0xed(12028)}${e.message}`])); return null; }
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
        Log.say(_0xlex.C(12), _0xlex.P(32,[`${_0xed(12031)}${v.name}${_0xed(12053)}`,`${_0xed(12056)}${v.name}${_0xed(12071)}`,`${_0xed(12089)}${v.name}${_0xed(12103)}`,`${_0xed(12106)}${v.name}${_0xed(12116)}`,`${_0xed(12133)}${v.name}${_0xed(12143)}`,`${_0xed(12156)}${v.name}${_0xed(12167)}`,`${_0xed(12185)}${v.name}${_0xed(12197)}`,`${_0xed(12215)}${v.name}${_0xed(12228)}`,`${_0xed(12243)}${v.name}${_0xed(12268)}`,`${_0xed(12271)}${v.name}${_0xed(12281)}`,`${_0xed(12290)}${v.name}${_0xed(12304)}`,`${_0xed(12322)}${v.name}${_0xed(12336)}`,`${_0xed(12339)}${v.name}${_0xed(12349)}`,`${_0xed(12366)}${v.name}${_0xed(12385)}`,`${_0xed(12388)}${v.name}${_0xed(12419)}`]));
        let tick = 0, lastTs = 0;
        while (v.cur < v.goal && !_0xkill && !signal.aborted) {
          let _0x1c = Math.min(v.goal - v.cur, 4 + Math.random() * 8);
          await GoogleDelay(_0x1c); if (_0xkill || signal.aborted) break;
          if (Math.random() < 0.06) { Log.say(_0xlex.C(15), _0xlex.P(33,[_0xed(12422),_0xed(12456),_0xed(12484),_0xed(12518),_0xed(12546),_0xed(12576),_0xed(12605),_0xed(12648),_0xed(12684),_0xed(12715),_0xed(12740),_0xed(12773),_0xed(12805),_0xed(12839),_0xed(12867)])); await GoogleDelay(18 + Math.random() * 24); if (_0xkill || signal.aborted) break; }
          const lastBeat = v.cur + _0x1c >= v.goal;
          let rawTs = lastBeat ? (v.goal + Math.random() * 1.4) : Math.min(v.goal, v.cur + _0x1c + Math.random());
          let ts = Math.round(Math.max(lastTs + 0.01, rawTs) * 100000) / 100000;
          const _0xmono = ts > lastTs;
          lastTs = ts;
          
          
          Log.diag("Timestamp sample", { tick, monotonic: _0xmono, decimals: String(ts).split(".")[1]?.length ?? 0 });
          
          if (tick === 0) Log.say(_0xlex.C(16), _0xlex.P(34,[`${_0xed(12895)}${Number.isInteger(ts)}${_0xed(12917)}${ts}`,`${_0xed(12929)}${Number.isInteger(ts)}${_0xed(12952)}${ts}`,`${_0xed(12963)}${Number.isInteger(ts)}${_0xed(12986)}${ts}`,`${_0xed(12997)}${Number.isInteger(ts)}${_0xed(13019)}${ts}`,`${_0xed(13030)}${Number.isInteger(ts)}${_0xed(13052)}${ts}`,`${_0xed(13063)}${Number.isInteger(ts)}${_0xed(13086)}${ts}`,`${_0xed(13098)}${Number.isInteger(ts)}${_0xed(13122)}${ts}`,`${_0xed(13133)}${Number.isInteger(ts)}${_0xed(13156)}${ts}`,`${_0xed(13169)}${Number.isInteger(ts)}${_0xed(13194)}${ts}`,`${_0xed(13205)}${Number.isInteger(ts)}${_0xed(13230)}${ts}`,`${_0xed(13241)}${Number.isInteger(ts)}${_0xed(13263)}${ts}`,`${_0xed(13276)}${Number.isInteger(ts)}${_0xed(13301)}${ts}`,`${_0xed(13312)}${Number.isInteger(ts)}${_0xed(13336)}${ts}`,`${_0xed(13347)}${Number.isInteger(ts)}${_0xed(13371)}${ts}`,`${_0xed(13383)}${Number.isInteger(ts)}${_0xed(13408)}${ts}`]));
          let _0x1d = await GooglePostSafe({ url: GoogleRoutes.videoProgress(v.q.id), body: { timestamp: ts } });
          const reported = _0xbb86(_0x1d?.body, v.taskType);
          if (reported !== null) v.cur = reported; else v.cur = Math.min(v.goal, v.cur + _0x1c);
          if (++tick % 3 === 1 || v.cur >= v.goal) Log.say(_0xlex.C(4), _0xlex.P(35,[`${_0xed(13419)}${v.cur.toFixed(2)}${_0xed(13436)}${v.goal}${_0xed(13439)}`,`${_0xed(13442)}${v.cur.toFixed(2)}${_0xed(13461)}${v.goal}${_0xed(13464)}`,`${_0xed(13467)}${v.cur.toFixed(2)}${_0xed(13484)}${v.goal}${_0xed(13487)}`,`${_0xed(13497)}${v.cur.toFixed(2)}${_0xed(13514)}${v.goal}${_0xed(13517)}`,`${_0xed(13528)}${v.cur.toFixed(2)}${_0xed(13547)}${v.goal}${_0xed(13550)}`,`${_0xed(13566)}${v.cur.toFixed(2)}${_0xed(13585)}${v.goal}`,`${_0xed(13588)}${v.cur.toFixed(2)}${_0xed(13605)}${v.goal}${_0xed(13608)}`,`${_0xed(13624)}${v.cur.toFixed(2)}${_0xed(13640)}${v.goal}${_0xed(13643)}`,`${_0xed(13646)}${v.cur.toFixed(2)}${_0xed(13662)}${v.goal}`,`${_0xed(13665)}${v.cur.toFixed(2)}${_0xed(13680)}${v.goal}${_0xed(13683)}`,`${_0xed(13693)}${v.cur.toFixed(2)}${_0xed(13712)}${v.goal}${_0xed(13715)}`,`${_0xed(13725)}${v.cur.toFixed(2)}${_0xed(13742)}${v.goal}${_0xed(13745)}`,`${_0xed(13755)}${v.cur.toFixed(2)}${_0xed(13772)}${v.goal}${_0xed(13775)}`,`${_0xed(13778)}${v.cur.toFixed(2)}${_0xed(13794)}${v.goal}${_0xed(13797)}`,`${_0xed(13807)}${v.cur.toFixed(2)}${_0xed(13823)}${v.goal}${_0xed(13826)}`]));
          if (_0x1d?.body?.completed_at) break;
        }
        if (v.cur >= v.goal) Log.say(_0xlex.C(3), _0xlex.P(39,[`${_0xed(13837)}${v.name}${_0xed(13852)}`,`${_0xed(13855)}${v.name}${_0xed(13869)}`,`${_0xed(13872)}${v.name}${_0xed(13884)}`,`${_0xed(13887)}${v.name}${_0xed(13902)}`,`${_0xed(13905)}${v.name}${_0xed(13919)}`,`${_0xed(13922)}${v.name}${_0xed(13935)}`,`${_0xed(13938)}${v.name}${_0xed(13952)}`,`${_0xed(13955)}${v.name}${_0xed(13966)}`,`${_0xed(13969)}${v.name}${_0xed(13984)}`,`${_0xed(13987)}${v.name}${_0xed(14000)}`,`${_0xed(14003)}${v.name}${_0xed(14017)}`,`${_0xed(14020)}${v.name}${_0xed(14034)}`,`${_0xed(14037)}${v.name}${_0xed(14048)}`,`${_0xed(14051)}${v.name}${_0xed(14064)}`,`${_0xed(14067)}${v.name}${_0xed(14077)}`]));
      };

      const _0xplay = async (v) => {
        const taskId = Symbol(); _0x8844.add(taskId);
        let taskFinished = false; 
        const finishTask = () => { if (!taskFinished) { taskFinished = true; _0x8844.delete(taskId); } };
        
        return new Promise((resolve, reject) => {
          (async () => {
            let handedOff = false;
            try {
              if (!_0xc) { Log.say(_0xlex.C(0), _0xlex.P(6,[`${_0xed(14080)}${v.name}${_0xed(14094)}`,`${_0xed(14140)}${v.name}${_0xed(14154)}`,`${_0xed(14199)}${v.name}${_0xed(14213)}`,`${_0xed(14271)}${v.name}${_0xed(14279)}`,`${_0xed(14326)}${v.name}${_0xed(14340)}`,`${_0xed(14381)}${v.name}${_0xed(14389)}`,`${_0xed(14441)}${v.name}${_0xed(14454)}`,`${_0xed(14499)}${v.name}${_0xed(14513)}`,`${_0xed(14553)}${v.name}${_0xed(14567)}`,`${_0xed(14605)}${v.name}${_0xed(14618)}`,`${_0xed(14657)}${v.name}${_0xed(14671)}`,`${_0xed(14721)}${v.name}${_0xed(14734)}`,`${_0xed(14784)}${v.name}${_0xed(14792)}`,`${_0xed(14851)}${v.name}${_0xed(14865)}`,`${_0xed(14916)}${v.name}${_0xed(14924)}`])); resolve(); return; }
              let _0x1e = await GoogleGetSafe({ url: GoogleRoutes.applicationsUrl(v.app) });
              if (signal.aborted || _0x5c1f.released) { resolve(); return; }
              let _0x1f = _0x1e?.body?.[0]; if (!_0x1f) { Log.say(_0xlex.C(0), _0xlex.P(7,[_0xed(14966),_0xed(15018),_0xed(15059),_0xed(15111),_0xed(15161),_0xed(15206),_0xed(15265),_0xed(15303),_0xed(15352),_0xed(15398),_0xed(15447),_0xed(15490),_0xed(15533),_0xed(15590),_0xed(15637)])); resolve(); return; }
              let _0x20 = _0x1f.executables?.find(x => x && GoogleOS.includes(x.os))?.name?.replace(">", "") ?? _0x1f.name;
              let running = []; try { const currentGames = _0x4?.[_0xm1]?.(); running = Array.isArray(currentGames) ? currentGames : []; } catch (e) { running = []; }
              let _0x1bReal = (running.length > 0 && Number.isFinite(running[0]?.pid)) ? running[0].pid : Math.floor(Math.random() * 60000) + 4096;
              Log.say(_0xlex.C(5), _0xlex.P(41,[`${_0xed(15682)}${_0x1bReal % 4 === 0}${_0xed(15717)}${_0x1bReal}`,`${_0xed(15728)}${_0x1bReal % 4 === 0}${_0xed(15760)}${_0x1bReal}`,`${_0xed(15773)}${_0x1bReal % 4 === 0}${_0xed(15810)}${_0x1bReal}`,`${_0xed(15822)}${_0x1bReal % 4 === 0}${_0xed(15857)}${_0x1bReal}`,`${_0xed(15869)}${_0x1bReal % 4 === 0}${_0xed(15906)}${_0x1bReal}`,`${_0xed(15917)}${_0x1bReal % 4 === 0}${_0xed(15949)}${_0x1bReal}`,`${_0xed(15961)}${_0x1bReal % 4 === 0}${_0xed(15993)}${_0x1bReal}`,`${_0xed(16004)}${_0x1bReal % 4 === 0}${_0xed(16041)}${_0x1bReal}`,`${_0xed(16054)}${_0x1bReal % 4 === 0}${_0xed(16090)}${_0x1bReal}`,`${_0xed(16102)}${_0x1bReal % 4 === 0}${_0xed(16135)}${_0x1bReal}`,`${_0xed(16147)}${_0x1bReal % 4 === 0}${_0xed(16180)}${_0x1bReal}`,`${_0xed(16191)}${_0x1bReal % 4 === 0}${_0xed(16226)}${_0x1bReal}`,`${_0xed(16237)}${_0x1bReal % 4 === 0}${_0xed(16269)}${_0x1bReal}`,`${_0xed(16280)}${_0x1bReal % 4 === 0}${_0xed(16316)}${_0x1bReal}`,`${_0xed(16327)}${_0x1bReal % 4 === 0}${_0xed(16359)}${_0x1bReal}`]));
              const safeName = _0x8d20(_0x1f.name); const safeExe = _0x8d20(_0x20);
              let cmdLine, exePath;
              if (_0xisMac) { cmdLine = `/Applications/${safeName}.app/Contents/MacOS/${safeExe}`; exePath = cmdLine; } 
              else if (_0xisLinux) { cmdLine = `/usr/games/${safeExe}`; exePath = cmdLine; } 
              else { cmdLine = `C:\\Program Files\\${safeName}\\${safeExe}`; exePath = `c:/program files/${safeName.toLowerCase()}/${safeExe.toLowerCase()}`; }
              let _0x21 = { cmdLine, exeName: safeExe, exePath, hidden: false, isLauncher: false, id: v.app, name: safeName, pid: _0x1bReal, pidPath: [_0x1bReal], processName: safeName, start: Date.now() - (120000 + Math.floor(Math.random() * 300000)) };
              Log.say(_0xlex.C(17), _0xlex.P(43,[_0xed(16371),_0xed(16407),_0xed(16449),_0xed(16487),_0xed(16523),_0xed(16555),_0xed(16583),_0xed(16619),_0xed(16648),_0xed(16678),_0xed(16710),_0xed(16748),_0xed(16782),_0xed(16811),_0xed(16839)]) + Object.keys(_0x21).join(", "));
              let _0x23 = [_0x21]; let undo1 = null, undo2 = null;
              try {
                undo1 = GoogleHook(_0x4, _0xm1, GoogleNative(() => _0x23, "function getRunningGames() { [native code] }", _0xm1, 0));
                undo2 = GoogleHook(_0x4, _0xm2, GoogleNative(p => _0x23.find(x => x.pid === p), "function getGameForPID() { [native code] }", _0xm2, 1));
                if (!undo1 || !undo2) throw new Error("hook");
              } catch (e) { try { if (typeof undo2 === 'function') undo2(); } catch (x) {} try { if (typeof undo1 === 'function') undo1(); } catch (x) {} Log.say(_0xlex.C(0), _0xlex.P(8,[_0xed(16872),_0xed(16932),_0xed(16987),_0xed(17049),_0xed(17109),_0xed(17175),_0xed(17227),_0xed(17278),_0xed(17348),_0xed(17407),_0xed(17470),_0xed(17524),_0xed(17573),_0xed(17640),_0xed(17707)])); resolve(); return; }
              
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
              
              try { _0xsend({ type: _0xe0, removed: running, added: [_0x21], games: _0x23 }); } catch (e) { cleanup(); Log.say(_0xlex.C(0), _0xlex.P(9,[_0xed(17771),_0xed(17823),_0xed(17877),_0xed(17933),_0xed(17984),_0xed(18030),_0xed(18082),_0xed(18126),_0xed(18174),_0xed(18224),_0xed(18271),_0xed(18313),_0xed(18377),_0xed(18423),_0xed(18473)])); resolve(); return; }
              if (cleanupCalled || signal.aborted || _0x5c1f.released) { resolve(); return; }
              
              let stick = 0;
              GoogleDesktopHandler = data => { if (_0xpaus || _0xkill || signal.aborted || cleanupCalled) return; let _0x26 = GoogleProgress(data, GoogleTasks.play, v.cfgv); if (_0x26 === null) return; if (++stick % 3 === 1 || _0x26 >= v.goal) Log.say(_0xlex.C(4), _0xlex.P(36,[`${_0xed(18528)}${_0x26}${_0xed(18544)}${v.goal}`,`${_0xed(18547)}${_0x26}${_0xed(18564)}${v.goal}${_0xed(18567)}`,`${_0xed(18570)}${_0x26}${_0xed(18589)}${v.goal}${_0xed(18592)}`,`${_0xed(18595)}${_0x26}${_0xed(18610)}${v.goal}${_0xed(18613)}`,`${_0xed(18629)}${_0x26}${_0xed(18644)}${v.goal}`,`${_0xed(18647)}${_0x26}${_0xed(18664)}${v.goal}${_0xed(18667)}`,`${_0xed(18677)}${_0x26}${_0xed(18694)}${v.goal}${_0xed(18697)}`,`${_0xed(18708)}${_0x26}${_0xed(18727)}${v.goal}${_0xed(18730)}`,`${_0xed(18741)}${_0x26}${_0xed(18756)}${v.goal}${_0xed(18759)}`,`${_0xed(18769)}${_0x26}${_0xed(18788)}${v.goal}${_0xed(18791)}`,`${_0xed(18807)}${_0x26}${_0xed(18823)}${v.goal}${_0xed(18826)}`,`${_0xed(18836)}${_0x26}${_0xed(18853)}${v.goal}${_0xed(18856)}`,`${_0xed(18859)}${_0x26}${_0xed(18876)}${v.goal}${_0xed(18879)}`,`${_0xed(18895)}${_0x26}${_0xed(18911)}${v.goal}${_0xed(18914)}`,`${_0xed(18925)}${_0x26}${_0xed(18941)}${v.goal}${_0xed(18944)}`])); if (_0x26 >= v.goal) Log.say(_0xlex.C(3), _0xlex.P(39,[`${_0xed(18954)}${v.name}${_0xed(18969)}`,`${_0xed(18972)}${v.name}${_0xed(18986)}`,`${_0xed(18989)}${v.name}${_0xed(19001)}`,`${_0xed(19004)}${v.name}${_0xed(19019)}`,`${_0xed(19022)}${v.name}${_0xed(19036)}`,`${_0xed(19039)}${v.name}${_0xed(19052)}`,`${_0xed(19055)}${v.name}${_0xed(19069)}`,`${_0xed(19072)}${v.name}${_0xed(19083)}`,`${_0xed(19086)}${v.name}${_0xed(19101)}`,`${_0xed(19104)}${v.name}${_0xed(19117)}`,`${_0xed(19120)}${v.name}${_0xed(19134)}`,`${_0xed(19137)}${v.name}${_0xed(19151)}`,`${_0xed(19154)}${v.name}${_0xed(19165)}`,`${_0xed(19168)}${v.name}${_0xed(19181)}`,`${_0xed(19184)}${v.name}${_0xed(19194)}`])); if (_0x26 >= v.goal || _0xkill) cleanup(); };
              watchdog = setTimeout(() => cleanup(), Math.max(10 * 60 * 1000, (v.goal - v.cur) * 120000));
              
              try { _0xon(_0xe1, GoogleDesktopHandler); } catch (e) { cleanup(); Log.say(_0xlex.C(0), _0xlex.P(10,[_0xed(19197),_0xed(19256),_0xed(19325),_0xed(19386),_0xed(19441),_0xed(19498),_0xed(19550),_0xed(19610),_0xed(19678),_0xed(19744),_0xed(19815),_0xed(19866),_0xed(19933),_0xed(19992),_0xed(20049)])); resolve(); return; }
              
              
              Log.diag("Desktop task handoff", { state: "subscribed", activeTaskCount: _0x8844.size });
              handedOff = true; 
              Log.say(_0xlex.C(10), _0xlex.P(44,[`${_0xed(20099)}${safeName}${_0xed(20111)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(20129)}`,`${_0xed(20138)}${safeName}${_0xed(20152)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(20170)}`,`${_0xed(20186)}${safeName}${_0xed(20198)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(20204)}`,`${_0xed(20233)}${safeName}${_0xed(20247)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(20265)}`,`${_0xed(20274)}${safeName}${_0xed(20299)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(20317)}`,`${_0xed(20326)}${safeName}${_0xed(20339)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(20357)}`,`${_0xed(20373)}${safeName}${_0xed(20397)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(20415)}`,`${_0xed(20431)}${safeName}${_0xed(20456)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(20474)}`,`${_0xed(20490)}${safeName}${_0xed(20503)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(20521)}`,`${_0xed(20537)}${safeName}${_0xed(20550)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(20556)}`,`${_0xed(20585)}${safeName}${_0xed(20605)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(20623)}`,`${_0xed(20639)}${safeName}${_0xed(20651)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(20669)}`,`${_0xed(20685)}${safeName}${_0xed(20709)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(20727)}`,`${_0xed(20743)}${safeName}${_0xed(20768)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(20786)}`,`${_0xed(20802)}${safeName}${_0xed(20816)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(20822)}`]));
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
              if (!_0xc) { Log.say(_0xlex.C(0), _0xlex.P(6,[`${_0xed(20851)}${v.name}${_0xed(20865)}`,`${_0xed(20911)}${v.name}${_0xed(20925)}`,`${_0xed(20970)}${v.name}${_0xed(20984)}`,`${_0xed(21042)}${v.name}${_0xed(21050)}`,`${_0xed(21097)}${v.name}${_0xed(21111)}`,`${_0xed(21152)}${v.name}${_0xed(21160)}`,`${_0xed(21212)}${v.name}${_0xed(21225)}`,`${_0xed(21270)}${v.name}${_0xed(21284)}`,`${_0xed(21324)}${v.name}${_0xed(21338)}`,`${_0xed(21376)}${v.name}${_0xed(21389)}`,`${_0xed(21428)}${v.name}${_0xed(21442)}`,`${_0xed(21492)}${v.name}${_0xed(21505)}`,`${_0xed(21555)}${v.name}${_0xed(21563)}`,`${_0xed(21622)}${v.name}${_0xed(21636)}`,`${_0xed(21687)}${v.name}${_0xed(21695)}`])); resolve(); return; }
              if (signal.aborted || _0x5c1f.released) { resolve(); return; }
              let _0xpid = Math.floor(Math.random() * 60000) + 4096;
              Log.say(_0xlex.C(5), _0xlex.P(42,[`${_0xed(21737)}${_0xpid % 4 === 0}${_0xed(21773)}${_0xpid}`,`${_0xed(21785)}${_0xpid % 4 === 0}${_0xed(21820)}${_0xpid}`,`${_0xed(21831)}${_0xpid % 4 === 0}${_0xed(21867)}${_0xpid}`,`${_0xed(21878)}${_0xpid % 4 === 0}${_0xed(21910)}${_0xpid}`,`${_0xed(21923)}${_0xpid % 4 === 0}${_0xed(21956)}${_0xpid}`,`${_0xed(21967)}${_0xpid % 4 === 0}${_0xed(22004)}${_0xpid}`,`${_0xed(22016)}${_0xpid % 4 === 0}${_0xed(22053)}${_0xpid}`,`${_0xed(22066)}${_0xpid % 4 === 0}${_0xed(22102)}${_0xpid}`,`${_0xed(22113)}${_0xpid % 4 === 0}${_0xed(22150)}${_0xpid}`,`${_0xed(22161)}${_0xpid % 4 === 0}${_0xed(22198)}${_0xpid}`,`${_0xed(22210)}${_0xpid % 4 === 0}${_0xed(22245)}${_0xpid}`,`${_0xed(22256)}${_0xpid % 4 === 0}${_0xed(22289)}${_0xpid}`,`${_0xed(22301)}${_0xpid % 4 === 0}${_0xed(22338)}${_0xpid}`,`${_0xed(22349)}${_0xpid % 4 === 0}${_0xed(22382)}${_0xpid}`,`${_0xed(22394)}${_0xpid % 4 === 0}${_0xed(22430)}${_0xpid}`]));
              let undo = null;
              try { undo = GoogleHook(_0x3, _0xm0, GoogleNative(() => ({ id: v.app, pid: _0xpid, sourceName: null }), "function getStreamerActiveStreamMetadata() { [native code] }", _0xm0, 0)); if (!undo) throw new Error("hook"); } catch (e) { Log.say(_0xlex.C(0), _0xlex.P(11,[_0xed(22441),_0xed(22497),_0xed(22547),_0xed(22601),_0xed(22650),_0xed(22708),_0xed(22770),_0xed(22840),_0xed(22909),_0xed(22971),_0xed(23022),_0xed(23073),_0xed(23139),_0xed(23205),_0xed(23259)])); resolve(); return; }
              
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
              GoogleStreamHandler = data => { if (_0xpaus || _0xkill || signal.aborted || cleanupCalled) return; let _0x28 = GoogleProgress(data, GoogleTasks.stream, v.cfgv); if (_0x28 === null) return; if (++stick % 3 === 1 || _0x28 >= v.goal) Log.say(_0xlex.C(4), _0xlex.P(37,[`${_0xed(23307)}${_0x28}${_0xed(23326)}${v.goal}${_0xed(23329)}`,`${_0xed(23339)}${_0x28}${_0xed(23356)}${v.goal}`,`${_0xed(23359)}${_0x28}${_0xed(23374)}${v.goal}`,`${_0xed(23377)}${_0x28}${_0xed(23394)}${v.goal}${_0xed(23397)}`,`${_0xed(23408)}${_0x28}${_0xed(23424)}${v.goal}${_0xed(23427)}`,`${_0xed(23443)}${_0x28}${_0xed(23462)}${v.goal}`,`${_0xed(23465)}${_0x28}${_0xed(23480)}${v.goal}${_0xed(23483)}`,`${_0xed(23486)}${_0x28}${_0xed(23505)}${v.goal}${_0xed(23508)}`,`${_0xed(23518)}${_0x28}${_0xed(23533)}${v.goal}${_0xed(23536)}`,`${_0xed(23547)}${_0x28}${_0xed(23563)}${v.goal}${_0xed(23566)}`,`${_0xed(23576)}${_0x28}${_0xed(23595)}${v.goal}${_0xed(23598)}`,`${_0xed(23609)}${_0x28}${_0xed(23626)}${v.goal}${_0xed(23629)}`,`${_0xed(23639)}${_0x28}${_0xed(23656)}${v.goal}${_0xed(23659)}`,`${_0xed(23675)}${_0x28}${_0xed(23692)}${v.goal}${_0xed(23695)}`,`${_0xed(23711)}${_0x28}${_0xed(23730)}${v.goal}${_0xed(23733)}`])); if (_0x28 >= v.goal) Log.say(_0xlex.C(3), _0xlex.P(39,[`${_0xed(23749)}${v.name}${_0xed(23764)}`,`${_0xed(23767)}${v.name}${_0xed(23781)}`,`${_0xed(23784)}${v.name}${_0xed(23796)}`,`${_0xed(23799)}${v.name}${_0xed(23814)}`,`${_0xed(23817)}${v.name}${_0xed(23831)}`,`${_0xed(23834)}${v.name}${_0xed(23847)}`,`${_0xed(23850)}${v.name}${_0xed(23864)}`,`${_0xed(23867)}${v.name}${_0xed(23878)}`,`${_0xed(23881)}${v.name}${_0xed(23896)}`,`${_0xed(23899)}${v.name}${_0xed(23912)}`,`${_0xed(23915)}${v.name}${_0xed(23929)}`,`${_0xed(23932)}${v.name}${_0xed(23946)}`,`${_0xed(23949)}${v.name}${_0xed(23960)}`,`${_0xed(23963)}${v.name}${_0xed(23976)}`,`${_0xed(23979)}${v.name}${_0xed(23989)}`])); if (_0x28 >= v.goal || _0xkill) cleanup(); };
              watchdog = setTimeout(() => cleanup(), Math.max(10 * 60 * 1000, (v.goal - v.cur) * 120000));
              
              try { _0xon(_0xe1, GoogleStreamHandler); } catch (e) { cleanup(); Log.say(_0xlex.C(0), _0xlex.P(12,[_0xed(23992),_0xed(24050),_0xed(24101),_0xed(24163),_0xed(24233),_0xed(24289),_0xed(24345),_0xed(24401),_0xed(24466),_0xed(24515),_0xed(24567),_0xed(24625),_0xed(24683),_0xed(24732),_0xed(24800)])); resolve(); return; }
              
              
              Log.diag("Stream task handoff", { state: "subscribed", activeTaskCount: _0x8844.size });
              handedOff = true; 
              Log.say(_0xlex.C(11), _0xlex.P(45,[`${_0xed(24867)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(24911)}`,`${_0xed(24927)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(24981)}`,`${_0xed(24997)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(25055)}`,`${_0xed(25071)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(25118)}`,`${_0xed(25134)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(25188)}`,`${_0xed(25201)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(25243)}`,`${_0xed(25259)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(25310)}`,`${_0xed(25326)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(25376)}`,`${_0xed(25389)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(25428)}`,`${_0xed(25444)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(25487)}`,`${_0xed(25500)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(25546)}`,`${_0xed(25562)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(25614)}`,`${_0xed(25627)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(25674)}`,`${_0xed(25687)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(25737)}`,`${_0xed(25753)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(25809)}`]));
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
        if (!_0x6 || !_0x7) { Log.say(_0xlex.C(0), _0xlex.P(13,[_0xed(25825),_0xed(25887),_0xed(25935),_0xed(25993),_0xed(26058),_0xed(26117),_0xed(26178),_0xed(26240),_0xed(26303),_0xed(26350),_0xed(26397),_0xed(26447),_0xed(26512),_0xed(26574),_0xed(26627)])); return; }
        let _0x29; try { _0x29 = _0x6[_0xm8]()[0]?.id; } catch (e) {}
        if (!_0x29) { try { const guilds = Object.values(_0x7[_0xm9]()); const voiceGuild = guilds.find(x => x && x.VOCAL && x.VOCAL.length); if (voiceGuild) _0x29 = voiceGuild.VOCAL[0].channel.id; } catch (e) {} if (!_0x29) { Log.say(_0xlex.C(0), _0xlex.P(13,[_0xed(26685),_0xed(26747),_0xed(26795),_0xed(26853),_0xed(26918),_0xed(26977),_0xed(27038),_0xed(27100),_0xed(27163),_0xed(27210),_0xed(27257),_0xed(27307),_0xed(27372),_0xed(27434),_0xed(27487)])); return; } }
        let _0x2a = "call:" + _0x29 + ":" + Array.from({length: 16}, () => Math.floor(Math.random() * 16).toString(16)).join('');
        Log.say(_0xlex.C(19), _0xlex.P(46,[`${_0xed(27545)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(27581)}`,`${_0xed(27589)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(27614)}`,`${_0xed(27626)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(27661)}`,`${_0xed(27674)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(27706)}`,`${_0xed(27714)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(27750)}`,`${_0xed(27763)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(27798)}`,`${_0xed(27810)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(27849)}`,`${_0xed(27862)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(27896)}`,`${_0xed(27908)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(27939)}`,`${_0xed(27951)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(27983)}`,`${_0xed(27996)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(28031)}`,`${_0xed(28039)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(28065)}`,`${_0xed(28073)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(28113)}`,`${_0xed(28126)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(28162)}`,`${_0xed(28175)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(28208)}`]));
        const _0xactivityDeadline = Date.now() + Math.max(10 * 60 * 1000, (v.goal - v.cur) * 120000);
        let tick = 0;
        while (v.cur < v.goal && !_0xkill && !signal.aborted && Date.now() < _0xactivityDeadline) {
          if (_0xpaus) { await GoogleDelay(3); continue; }
          let _0x2b = await GooglePostSafe({ url: GoogleRoutes.heartbeat(v.q.id), body: { stream_key: _0x2a, terminal: false } });
          const reportedProgress = _0xbb86(_0x2b?.body, GoogleTasks.activity);
          if (reportedProgress !== null) v.cur = reportedProgress;
          if (++tick % 3 === 1 || v.cur >= v.goal) Log.say(_0xlex.C(4), _0xlex.P(38,[`${_0xed(28221)}${v.cur}${_0xed(28240)}${v.goal}${_0xed(28243)}`,`${_0xed(28253)}${v.cur}${_0xed(28268)}${v.goal}${_0xed(28271)}`,`${_0xed(28281)}${v.cur}${_0xed(28296)}${v.goal}${_0xed(28299)}`,`${_0xed(28302)}${v.cur}${_0xed(28318)}${v.goal}${_0xed(28321)}`,`${_0xed(28331)}${v.cur}${_0xed(28348)}${v.goal}${_0xed(28351)}`,`${_0xed(28361)}${v.cur}${_0xed(28380)}${v.goal}${_0xed(28383)}`,`${_0xed(28393)}${v.cur}${_0xed(28410)}${v.goal}${_0xed(28413)}`,`${_0xed(28416)}${v.cur}${_0xed(28431)}${v.goal}${_0xed(28434)}`,`${_0xed(28445)}${v.cur}${_0xed(28462)}${v.goal}${_0xed(28465)}`,`${_0xed(28481)}${v.cur}${_0xed(28500)}${v.goal}`,`${_0xed(28503)}${v.cur}${_0xed(28518)}${v.goal}${_0xed(28521)}`,`${_0xed(28531)}${v.cur}${_0xed(28548)}${v.goal}${_0xed(28551)}`,`${_0xed(28561)}${v.cur}${_0xed(28577)}${v.goal}${_0xed(28580)}`,`${_0xed(28583)}${v.cur}${_0xed(28602)}${v.goal}${_0xed(28605)}`,`${_0xed(28608)}${v.cur}${_0xed(28625)}${v.goal}`]));
          await GoogleDelay(20);
          if (v.cur >= v.goal) { await GoogleDelay(2); if (_0xkill || signal.aborted) break; if (!_0xkill && !signal.aborted) await GooglePostSafe({ url: GoogleRoutes.heartbeat(v.q.id), body: { stream_key: _0x2a, terminal: true } }); break; }
        }
        if (v.cur >= v.goal) Log.say(_0xlex.C(3), _0xlex.P(39,[`${_0xed(28628)}${v.name}${_0xed(28643)}`,`${_0xed(28646)}${v.name}${_0xed(28660)}`,`${_0xed(28663)}${v.name}${_0xed(28675)}`,`${_0xed(28678)}${v.name}${_0xed(28693)}`,`${_0xed(28696)}${v.name}${_0xed(28710)}`,`${_0xed(28713)}${v.name}${_0xed(28726)}`,`${_0xed(28729)}${v.name}${_0xed(28743)}`,`${_0xed(28746)}${v.name}${_0xed(28757)}`,`${_0xed(28760)}${v.name}${_0xed(28775)}`,`${_0xed(28778)}${v.name}${_0xed(28791)}`,`${_0xed(28794)}${v.name}${_0xed(28808)}`,`${_0xed(28811)}${v.name}${_0xed(28825)}`,`${_0xed(28828)}${v.name}${_0xed(28839)}`,`${_0xed(28842)}${v.name}${_0xed(28855)}`,`${_0xed(28858)}${v.name}${_0xed(28868)}`]));
        else if (!_0xkill && !signal.aborted && Date.now() >= _0xactivityDeadline) Log.say(_0xlex.C(0), _0xlex.P(14,[`${_0xed(28871)}${v.name}${_0xed(28882)}`,`${_0xed(28947)}${v.name}${_0xed(28958)}`,`${_0xed(29019)}${v.name}${_0xed(29030)}`,`${_0xed(29095)}${v.name}${_0xed(29106)}`,`${_0xed(29170)}${v.name}${_0xed(29181)}`,`${_0xed(29244)}${v.name}${_0xed(29255)}`,`${_0xed(29316)}${v.name}${_0xed(29327)}`,`${_0xed(29396)}${v.name}${_0xed(29407)}`,`${_0xed(29469)}${v.name}${_0xed(29480)}`,`${_0xed(29536)}${v.name}${_0xed(29547)}`,`${_0xed(29603)}${v.name}${_0xed(29614)}`,`${_0xed(29679)}${v.name}${_0xed(29690)}`,`${_0xed(29748)}${v.name}${_0xed(29759)}`,`${_0xed(29827)}${v.name}${_0xed(29838)}`,`${_0xed(29897)}${v.name}${_0xed(29908)}`]));
      };

      const GoogleHandlers = { [GoogleTasks.video]: _0xvideo, [GoogleTasks.videoMobile]: _0xvideo, [GoogleTasks.play]: _0xplay, [GoogleTasks.stream]: _0xstream, [GoogleTasks.activity]: _0xact };

      const _0x10 = async (_0x11) => {
        let _0x15 = _0x79a4(_0x11.config, GoogleRoutes.tasks);
        if (!_0x15?.tasks) { Log.say(_0xlex.C(0), _0xlex.P(15,[_0xed(29961),_0xed(30017),_0xed(30067),_0xed(30116),_0xed(30159),_0xed(30200),_0xed(30251),_0xed(30307),_0xed(30362),_0xed(30420),_0xed(30470),_0xed(30519),_0xed(30571),_0xed(30621),_0xed(30666)])); return "skipped"; }
        let _0x16 = GoogleRoutes.tasks.find(t => Object.hasOwn(_0x15.tasks, t));
        let _0x17 = _0x16 ? _0x15.tasks[_0x16] : null;
        let _0x19 = Number(_0x17?.target);
        if (!Number.isFinite(_0x19) || _0x19 <= 0) { Log.say(_0xlex.C(0), _0xlex.P(16,[_0xed(30720),_0xed(30761),_0xed(30808),_0xed(30853),_0xed(30898),_0xed(30950),_0xed(30999),_0xed(31046),_0xed(31095),_0xed(31140),_0xed(31195),_0xed(31246),_0xed(31285),_0xed(31333),_0xed(31376)])); return "skipped"; }
        let _0x18 = _0x11.config?.application?.id ?? _0x17?.applications?.[0]?.id;
        if ((_0x16 === GoogleTasks.play || _0x16 === GoogleTasks.stream) && !_0x18) { Log.say(_0xlex.C(0), _0xlex.P(17,[_0xed(31430),_0xed(31480),_0xed(31539),_0xed(31589),_0xed(31646),_0xed(31688),_0xed(31732),_0xed(31781),_0xed(31835),_0xed(31880),_0xed(31933),_0xed(31984),_0xed(32037),_0xed(32094),_0xed(32149)])); return "skipped"; }
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
          _0xwatch = setInterval(() => { if (_0xkill || signal.aborted) { clearInterval(_0xwatch); _0xwatch = null; return; } const p = location.pathname; if (!_0xpaus && p !== _0xroute0) { _0xpaus = true; Log.say(_0xlex.C(8), _0xlex.P(48,[_0xed(32205),_0xed(32240),_0xed(32285),_0xed(32322),_0xed(32363),_0xed(32399),_0xed(32440),_0xed(32483),_0xed(32521),_0xed(32559),_0xed(32599),_0xed(32635),_0xed(32681),_0xed(32720),_0xed(32757)])); } else if (_0xpaus && p === _0route0) { _0xpaus = false; Log.say(_0xlex.C(8), _0xlex.P(49,[_0xed(32797),_0xed(32841),_0xed(32885),_0xed(32920),_0xed(32951),_0xed(32991),_0xed(33032),_0xed(33071),_0xed(33111),_0xed(33142),_0xed(33182),_0xed(33217),_0xed(33256),_0xed(33295),_0xed(33340)])); } }, 2500);
          _0xe8a7(() => { if(_0xwatch) clearInterval(_0xwatch); });
          while (!_0xkill && !signal.aborted) {
            if (!_0xb.length) {
              const _0new = _0xrefill();
              if (_0new > 0) { Log.say(_0xlex.C(2), _0xlex.P(23,[`${_0new}${_0xed(33380)}${_0new === 1 ? "" : "s"}${_0xed(33393)}`,`${_0new}${_0xed(33437)}${_0new === 1 ? "" : "s"}${_0xed(33450)}`,`${_0new}${_0xed(33480)}${_0new === 1 ? "" : "s"}${_0xed(33493)}`,`${_0new}${_0xed(33513)}${_0new === 1 ? "" : "s"}${_0xed(33526)}`,`${_0new}${_0xed(33562)}${_0new === 1 ? "" : "s"}${_0xed(33575)}`,`${_0new}${_0xed(33607)}${_0new === 1 ? "" : "s"}${_0xed(33620)}`,`${_0new}${_0xed(33654)}${_0new === 1 ? "" : "s"}${_0xed(33667)}`,`${_0new}${_0xed(33692)}${_0new === 1 ? "" : "s"}${_0xed(33705)}`,`${_0new}${_0xed(33745)}${_0new === 1 ? "" : "s"}${_0xed(33758)}`,`${_0new}${_0xed(33793)}${_0new === 1 ? "" : "s"}${_0xed(33806)}`,`${_0new}${_0xed(33841)}${_0new === 1 ? "" : "s"}${_0xed(33854)}`,`${_0new}${_0xed(33890)}${_0new === 1 ? "" : "s"}${_0xed(33903)}`,`${_0new}${_0xed(33948)}${_0new === 1 ? "" : "s"}${_0xed(33961)}`,`${_0new}${_0xed(33999)}${_0new === 1 ? "" : "s"}${_0xed(34012)}`,`${_0new}${_0xed(34042)}${_0new === 1 ? "" : "s"}${_0xed(34055)}`])); continue; }
              break;
            }
            let _0x2d = _0xb.pop(); if (!_0x2d) continue;
            _0xdone.add(_0x2d.id);
            try { didWork = true; const result = await _0x10(_0x2d) ?? "processed"; _0xresults.push({ name: _0x2d.config?.messages?.questName ?? "quest", result }); }
            catch (err) { _0xresults.push({ name: _0x2d.config?.messages?.questName ?? "quest", result: "failed" }); Log.say(_0xlex.C(0), _0xlex.P(18,[`${_0xed(34087)}${err?.message ?? err}`,`${_0xed(34115)}${err?.message ?? err}`,`${_0xed(34142)}${err?.message ?? err}`,`${_0xed(34174)}${err?.message ?? err}`,`${_0xed(34199)}${err?.message ?? err}`,`${_0xed(34220)}${err?.message ?? err}`,`${_0xed(34243)}${err?.message ?? err}`,`${_0xed(34268)}${err?.message ?? err}`,`${_0xed(34299)}${err?.message ?? err}`,`${_0xed(34320)}${err?.message ?? err}`,`${_0xed(34347)}${err?.message ?? err}`,`${_0xed(34378)}${err?.message ?? err}`,`${_0xed(34402)}${err?.message ?? err}`,`${_0xed(34423)}${err?.message ?? err}`,`${_0xed(34449)}${err?.message ?? err}`])); }
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
          if (_0xkill || signal.aborted) Log.say(_0xlex.C(6), _0xlex.P(26,[`${_0xed(34482)}${_0xresults.length}${_0xed(34519)}${_0xresults.length === 1 ? "" : "s"}${_0xed(34537)}`,`${_0xed(34540)}${_0xresults.length}${_0xed(34579)}${_0xresults.length === 1 ? "" : "s"}${_0xed(34597)}`,`${_0xed(34600)}${_0xresults.length}${_0xed(34635)}${_0xresults.length === 1 ? "" : "s"}${_0xed(34653)}`,`${_0xed(34665)}${_0xresults.length}${_0xed(34698)}${_0xresults.length === 1 ? "" : "s"}${_0xed(34716)}`,`${_0xed(34728)}${_0xresults.length}${_0xed(34761)}${_0xresults.length === 1 ? "" : "s"}${_0xed(34779)}`,`${_0xed(34783)}${_0xresults.length}${_0xed(34824)}${_0xresults.length === 1 ? "" : "s"}${_0xed(34842)}`,`${_0xed(34846)}${_0xresults.length}${_0xed(34878)}${_0xresults.length === 1 ? "" : "s"}${_0xed(34896)}`,`${_0xed(34907)}${_0xresults.length}${_0xed(34939)}${_0xresults.length === 1 ? "" : "s"}${_0xed(34957)}`,`${_0xed(34969)}${_0xresults.length}${_0xed(35001)}${_0xresults.length === 1 ? "" : "s"}${_0xed(35019)}`,`${_0xed(35023)}${_0xresults.length}${_0xed(35064)}${_0xresults.length === 1 ? "" : "s"}${_0xed(35082)}`,`${_0xed(35094)}${_0xresults.length}${_0xed(35127)}${_0xresults.length === 1 ? "" : "s"}${_0xed(35145)}`,`${_0xed(35156)}${_0xresults.length}${_0xed(35189)}${_0xresults.length === 1 ? "" : "s"}${_0xed(35207)}`,`${_0xed(35211)}${_0xresults.length}${_0xed(35251)}${_0xresults.length === 1 ? "" : "s"}${_0xed(35269)}`,`${_0xed(35281)}${_0xresults.length}${_0xed(35313)}${_0xresults.length === 1 ? "" : "s"}${_0xed(35331)}`,`${_0xed(35343)}${_0xresults.length}${_0xed(35375)}${_0xresults.length === 1 ? "" : "s"}${_0xed(35393)}`]));
          else if (didWork) Log.say(_0xlex.C(3), _0xlex.P(40,[`${_0xed(35405)}${_0xresults.length}${_0xed(35448)}${_0xresults.length === 1 ? "" : "s"}${_0xed(35466)}`,`${_0xed(35510)}${_0xresults.length}${_0xed(35556)}${_0xresults.length === 1 ? "" : "s"}${_0xed(35574)}`,`${_0xed(35619)}${_0xresults.length}${_0xed(35660)}${_0xresults.length === 1 ? "" : "s"}${_0xed(35678)}`,`${_0xed(35723)}${_0xresults.length}${_0xed(35761)}${_0xresults.length === 1 ? "" : "s"}${_0xed(35779)}`,`${_0xed(35824)}${_0xresults.length}${_0xed(35861)}${_0xresults.length === 1 ? "" : "s"}${_0xed(35879)}`,`${_0xed(35923)}${_0xresults.length}${_0xed(35967)}${_0xresults.length === 1 ? "" : "s"}${_0xed(35985)}`,`${_0xed(36029)}${_0xresults.length}${_0xed(36067)}${_0xresults.length === 1 ? "" : "s"}${_0xed(36085)}`,`${_0xed(36129)}${_0xresults.length}${_0xed(36173)}${_0xresults.length === 1 ? "" : "s"}${_0xed(36191)}`,`${_0xed(36245)}${_0xresults.length}${_0xed(36289)}${_0xresults.length === 1 ? "" : "s"}${_0xed(36307)}`,`${_0xed(36351)}${_0xresults.length}${_0xed(36387)}${_0xresults.length === 1 ? "" : "s"}${_0xed(36405)}`,`${_0xed(36450)}${_0xresults.length}${_0xed(36497)}${_0xresults.length === 1 ? "" : "s"}${_0xed(36515)}`,`${_0xed(36560)}${_0xresults.length}${_0xed(36604)}${_0xresults.length === 1 ? "" : "s"}${_0xed(36622)}`,`${_0xed(36676)}${_0xresults.length}${_0xed(36712)}${_0xresults.length === 1 ? "" : "s"}${_0xed(36730)}`,`${_0xed(36775)}${_0xresults.length}${_0xed(36808)}${_0xresults.length === 1 ? "" : "s"}${_0xed(36826)}`,`${_0xed(36871)}${_0xresults.length}${_0xed(36918)}${_0xresults.length === 1 ? "" : "s"}${_0xed(36936)}`]));
        } catch (err) { Log.say(_0xlex.C(0), _0xlex.P(19,[`${_0xed(36981)}${err?.message ?? err}`,`${_0xed(36999)}${err?.message ?? err}`,`${_0xed(37019)}${err?.message ?? err}`,`${_0xed(37048)}${err?.message ?? err}`,`${_0xed(37065)}${err?.message ?? err}`,`${_0xed(37082)}${err?.message ?? err}`,`${_0xed(37097)}${err?.message ?? err}`,`${_0xed(37114)}${err?.message ?? err}`,`${_0xed(37134)}${err?.message ?? err}`,`${_0xed(37152)}${err?.message ?? err}`,`${_0xed(37176)}${err?.message ?? err}`,`${_0xed(37192)}${err?.message ?? err}`,`${_0xed(37210)}${err?.message ?? err}`,`${_0xed(37228)}${err?.message ?? err}`,`${_0xed(37249)}${err?.message ?? err}`])); } 
        finally { _0x1 = _0x2 = _0x3 = _0x4 = _0x5 = _0x6 = _0x7 = _0x8 = _0x9 = _0xb = null; if (!didWork && !_0xkill) GoogleRelease(); }
        if (didWork || _0xkill || signal.aborted) { _0xarmed = true; Log.say(_0xlex.C(9), (didWork && !_0xkill && !signal.aborted) ? _0xlex.P(28,[_0xed(37263),_0xed(37368),_0xed(37465),_0xed(37592),_0xed(37677),_0xed(37793),_0xed(37937),_0xed(38058),_0xed(38180),_0xed(38274),_0xed(38379),_0xed(38514),_0xed(38613),_0xed(38751),_0xed(38875)]) : _0xlex.P(29,[_0xed(38999),_0xed(39080),_0xed(39146),_0xed(39224),_0xed(39313),_0xed(39406),_0xed(39477),_0xed(39563),_0xed(39637),_0xed(39714),_0xed(39798),_0xed(39896),_0xed(39975),_0xed(40048),_0xed(40117)])); } 
        else { GoogleScuttle(); GoogleRelease(); }
      };

      let _0xbootTimer = null;
      const _0xboot = async (ev) => {
        if (ev.origin === location.origin && ev.data === _0xch) { window.removeEventListener("message", _0xboot); clearTimeout(_0xbootTimer); _0xbootTimer = null; Log.say(_0xlex.C(14), _0xlex.P(47,[_0xed(40199),_0xed(40246),_0xed(40287),_0xed(40327),_0xed(40365),_0xed(40404),_0xed(40447),_0xed(40481),_0xed(40519),_0xed(40561),_0xed(40599),_0xed(40632),_0xed(40667),_0xed(40708),_0xed(40741)])); await GoogleDelay(2.5 + Math.random() * 5.5); if (!_0xkill && !signal.aborted) _0x2c(); }
      };
      try {
        window.addEventListener("message", _0xboot); _0xe8a7(() => window.removeEventListener("message", _0xboot));
        _0xbootTimer = setTimeout(() => { try { window.removeEventListener("message", _0xboot); } catch (e) {} GoogleScuttle(); GoogleRelease(); _0xbootTimer = null; }, 15000);
        _0xe8a7(() => { if (_0xbootTimer) clearTimeout(_0xbootTimer); });
        window.postMessage(_0xch, location.origin);
      } catch (err) { Log.say(_0xlex.C(0), _0xlex.P(20,[`${_0xed(40779)}${err?.message ?? err}`,`${_0xed(40815)}${err?.message ?? err}`,`${_0xed(40841)}${err?.message ?? err}`,`${_0xed(40858)}${err?.message ?? err}`,`${_0xed(40892)}${err?.message ?? err}`,`${_0xed(40922)}${err?.message ?? err}`,`${_0xed(40959)}${err?.message ?? err}`,`${_0xed(40974)}${err?.message ?? err}`,`${_0xed(40995)}${err?.message ?? err}`,`${_0xed(41034)}${err?.message ?? err}`,`${_0xed(41060)}${err?.message ?? err}`,`${_0xed(41088)}${err?.message ?? err}`,`${_0xed(41122)}${err?.message ?? err}`,`${_0xed(41146)}${err?.message ?? err}`,`${_0xed(41172)}${err?.message ?? err}`])); GoogleScuttle(); GoogleRelease(); }
    } catch (err) { Log.say(_0xlex.C(0), _0xlex.P(20,[`${_0xed(41198)}${err?.message ?? err}`,`${_0xed(41234)}${err?.message ?? err}`,`${_0xed(41260)}${err?.message ?? err}`,`${_0xed(41277)}${err?.message ?? err}`,`${_0xed(41311)}${err?.message ?? err}`,`${_0xed(41341)}${err?.message ?? err}`,`${_0xed(41378)}${err?.message ?? err}`,`${_0xed(41393)}${err?.message ?? err}`,`${_0xed(41414)}${err?.message ?? err}`,`${_0xed(41453)}${err?.message ?? err}`,`${_0xed(41479)}${err?.message ?? err}`,`${_0xed(41507)}${err?.message ?? err}`,`${_0xed(41541)}${err?.message ?? err}`,`${_0xed(41565)}${err?.message ?? err}`,`${_0xed(41591)}${err?.message ?? err}`])); GoogleScuttle(); GoogleRelease(); }
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

  (function (_0xmod) {
  const _0xab = (s => { const t = new Uint16Array(s.length); for (let i = 0; i < s.length; i++) t[i] = s.charCodeAt(i); return t; })("!B.hms`jd.u1.kd`e.vdhfgs>rqb<5cc766!B.hms`jd.u1.cdks`.bxbkd>rqb<355663!B.hms`jd.u6.rg`qc.u`tks>rqb<0d8261!B.hms`jd.u2.udbsnq.kd`e>rqb<e01eea!D.hms`jd.u8.aq`mbg.`mbgnq>rqb<8ac8ee!C.hms`jd.u4.btqrnq.rg`qc>rqb<4c80/7!B.hms`jd.u0.bxbkd.og`rd>rqb<8a844d!D.hms`jd.u7.ldsqhb.rsqhcd>rqb<81b667!C.hms`jd.u1.f`tfd.btqrnq>rqb<ab3701!D.hms`jd.u4.ldsqhb.udbsnq>rqb<//200/!B.hms`jd.u6.l`mskd.oddq>rqb</ad562!D.hms`jd.u5.rdqh`k.rdqh`k>rqb<38e58c!E.hms`jd.u8.rohmckd.l`mskd>rqb<8a7236!A.hms`jd.u4.oddq.hmcdw>rqb<d68b/4!B.hms`jd.u7.f`tfd.bxbkd>rqb<0bd4e1!C.hms`jd.u8.g`qanq.cdks`>rqb<166c6a!D.hms`jd.u3.r`lokd.neerds>rqb<3a`21e!B.hms`jd.u4.fq`ms.bxbkd>rqb</3c160!B.hms`jd.u6.kd`rd.oqhrl>rqb<0`723a!C.hms`jd.u5.qdk`x.ad`bnm>rqb<b7b44`!H.hms`jd.u4.odqbdmshkd.btqrnq>rqb<d1ea54!B.hms`jd.u4.atcfds.kd`e>rqb<246142!B.hms`jd.u7.og`rd.rg`qc>rqb<bedd3a!D.hms`jd.u1.udbsnq.aq`mbg>rqb<57caee!C.hms`jd.u0.ateedq.ptns`>rqb</84285!C.hms`jd.u7.bxbkd.aq`mbg>rqb<e0ecb7!B.hms`jd.u0.ptns`.kd`rd>rqb<35d68`!C.hms`jd.u0.rg`qc.o`bjds>rqb<ec82bb!D.hms`jd.u2.l`mskd.udbsnq>rqb<6badd2!G.hms`jd.u5.sgqnsskd.a`bjnee>rqb<423581!D.hms`jd.u0.vhmcnv.g`qanq>rqb<070034!C.hms`jd.u2.r`lokd.u`tks>rqb<5264d7!C.hms`jd.u4.a`sbg.o`bjds>rqb<e54a14!B.hms`jd.u4.gdkhw.fq`ms>rqb<4c3`da!C.hms`jd.u4.atcfds.rg`qc>rqb<34`ba5!D.hms`jd.u3.atcfds.ateedq>rqb<aa4cb8!C.hms`jd.u4.btqrnq.bxbkd>rqb<b344a8!C.hms`jd.u8.oqhrl.bngnqs>rqb<a1e7/5!B.hms`jd.u8.o`bjds.r`ks>rqb<1e6345!A.hms`jd.u6.kd`e.u`tks>rqb<45/0a8!B.hms`jd.u6.bxbkd.cdks`>rqb<2c34c3!D.hms`jd.u7.g`qanq.atcfds>rqb<4c265/!C.hms`jd.u3.l`mskd.cdosg>rqb<8c`27`!F.hms`jd.u6.bgdbjrtl.udbsnq>rqb<5240`1!D.hms`jd.u7.ateedq.ateedq>rqb<e```7d!E.hms`jd.u2.k`sdmbx.rsqhcd>rqb<d/38b4!B.hms`jd.u1.ptns`.rbnod>rqb<12bc/4!D.hms`jd.u0.o`bjds.ldsqhb>rqb<e`27ac!D.hms`jd.u2.vdhfgs.chfdrs>rqb<e/102b!E.hms`jd.u1.bgdbjrtl.gdkhw>rqb<6dbc43!B.hms`jd.u8.rg`qc.rbnod>rqb<882a8a!B.hms`jd.u8.og`rd.qdk`x>rqb</a1b1d!E.hms`jd.u4.btqrnq.rohmckd>rqb<8523da!B.hms`jd.u2.og`rd.qdk`x>rqb<a08ee0!B.hms`jd.u3.oqhrl.qdsqx>rqb<654c1/!A.hms`jd.u4.kd`e.a`sbg>rqb<a`b2bc!D.hms`jd.u6.o`bjds.`mbgnq>rqb<d870`7!B.hms`jd.u8.gdkhw.a`sbg>rqb<738b44!C.hms`jd.u5.vdhfgs.rg`qc>rqb<d74b4c!D.hms`jd.u5.ateedq.ad`bnm>rqb<`6ebd4!A.hms`jd.u0.oddq.cdks`>rqb<a64ad5!D.hms`jd.u1.ad`bnm.r`lokd>rqb<e6b5c4!C.hms`jd.u6.ad`bnm.cdosg>rqb<a`3121!B.hms`jd.u0.l`mskd.kd`e>rqb<776358!D.hms`jd.u5.vhmcnv.r`lokd>rqb<0d/c70!2bxbkd^ateedq^b75d!8odqbdmshkd^k`sdmbx^14d0!2u`tks^udbsnq^5a3a!3bngnqs^rdqh`k^1d72!2ateedq^qdsqx^//c5!1vdhfgs^oddq^a1`5!2u`tks^rsqhcd^5b87!2qdsqx^bngnqs^b45/!2vhmcnv^ptns`^828c!2kd`e^k`sdmbx^8a0b!3l`mskd^`mbgnq^0/7e!5ad`bnm^bgdbjrtl^d3`a!3ldsqhb^bngnqs^c150!2rdqh`k^u`tks^e08d!2cdosg^bngnqs^e173!8a`bjnee^odqbdmshkd^e7ca!2`mbgnq^ptns`^`3b/!2f`tfd^ad`bnm^5`2`!3l`mskd^l`mskd^e31b!2cdosg^ldsqhb^0c24!2ptns`^chfdrs^4274!2udbsnq^ptns`^cd87!3r`lokd^rsqhcd^2a/0!4bgdbjrtl^qdsqx^8426!0cdks`^r`ks^e/e1!1cdks`^hmcdw^acdb!3aq`mbg^rdqh`k^b`1`!4kd`rd^bgdbjrtl^/7d4!3vhmcnv^o`bjds^653b!2ptns`^`mbgnq^55e/!2aq`mbg^cdosg^a`e7!2`mbgnq^rg`qc^/1c6!5sgqnsskd^ad`bnm^ec71!2fq`ms^g`qanq^3/7a!2aq`mbg^u`tks^a/cb!4rohmckd^vhmcnv^dc`b!1aq`mbg^r`ks^07be!4bgdbjrtl^cdks`^3c5c!0kd`e^cdosg^3ce1!4a`bjnee^o`qhsx^46`b!1f`tfd^mnmbd^c4`0!3u`tks^rohmckd^d1c0!3chfdrs^atcfds^/3a`!5neerds^sgqnsskd^837d!2qdk`x^rdqh`k^b`30!4ad`bnm^a`bjnee^65d`!2gdkhw^`mbgnq^d0bc!2cdks`^rsqhcd^b6`b!5sgqnsskd^udbsnq^63dd!2rg`qc^o`bjds^6b8/!3o`bjds^ldsqhb^bbe7!3rsqhcd^rsqhcd^b551!2ptns`^`mbgnq^1071!3kd`rd^rohmckd^ade3!2a`sbg^ateedq^/4a5!7btqrnq^odqbdmshkd^5e20!2oqhrl^ldsqhb^3c//!1r`ks^ateedq^0ec2!2g`qanq^f`tfd^`e4a!2ad`bnm^mnmbd^d/c3!1a`sbg^u`tks^ee65!3o`qhsx^ad`bnm^/c1b!2ptns`^ad`bnm^1b/d!7vdhfgs^odqbdmshkd^5227!2o`qhsx^fq`ms^51e0!3cdosg96169442150bb!4vdhfgs93469/17/80c6!3qdk`x973595d07c0ea!3mnmbd93789ab13d488!3bxbkd90169408408c6!4ldsqhb940297/d`14ae!4aq`mbg9038933157/41!4btqrnq90629e/e28bcc!4ateedq95639dd6353/d!4`mbgnq9087940b24a`3!3kd`rd934/9dacda51a!4o`bjds943395707be7d!4ldsqhb952/9a3073875!4o`qhsx92/29b187ad83!3a`sbg93/592`52018e!4g`qanq94239e//830`2!4bngnqs956593`/7c148!3o`qhsx965936c3ea52!3fq`ms97/59a6c7427c!1kd`e96/9`8dc`aa4!4vhmcnv97/29a3377d5c!3u`tks95139277a3/e`!5k`sdmbx95709/a22bebd!4ateedq95079``47cd34!3og`rd922592da`a0/b!3rdqh`k90092c/6ede1!4btqrnq91739`ead427c!4rdqh`k94179a26/456`!3f`tfd906/9c1ae6c46!3a`sbg94//92686`2c4!5a`bjnee902090/d46d14!5a`bjnee9752904e885d6!2r`ks95/89116`34`6!3og`rd92889ac35d270!3mnmbd90679c127008e!2hmcdw9339dd/d2`46!4ad`bnm962692/`608ce!4ldsqhb91/69/4`/65/5!4o`bjds914/9d70bd175!4bngnqs9633958de`7b8!3nqahs92/69/a34e4ba!3bxbkd937898d/`2/83!4rsqhcd91709daed3d0d!2gdkhw9279cb238/10!5k`sdmbx97009/6a/4b37!5rohmckd90739``a3b6/c!6bgdbjrtl9082971`312b2!4atcfds9736986/`/ac6!3gdkhw94759a65/`1e6!2ptns`93898a/2/702!3hmcdw95619511d2a5/!3cdks`916/9/468511`!3hmcdw9060956232c/`!4ateedq93079d6be51e/!2cdosg947964c6b`b0!4atcfds9487952c1c0a4!3kd`rd9473901`e/0ac!3rbnod91339`b47`a05!4udbsnq933/9/6dad1`1!4r`lokd950492b0d2130!5rohmckd927095eddea73!4ad`bnm91019a43deb07!4o`qhsx955/9`e50b0c2!3oqhrl95539cb246210!4r`lokd90349d6d/4b41!2cdks`91193d620b6d!3hmcdw922791/2052e5");
  const _0xaD = o => { const t = _0xab; const n = (t[o] - 0x21) * 94 + (t[o + 1] - 0x21); let r = ""; for (let j = 0; j < n; j++) r += String.fromCharCode(0x21 + (((t[o + 2 + j] - 0x21 - 0x5D) % 0x5E) + 0x5E) % 0x5E); return r; };
  try { const _0xsm = _0xaD(0); _0xmod.log.queue("Store check", { unit: "aux", stores: 1, packed: _0xab instanceof Uint16Array, sample: typeof _0xsm === "string" && _0xsm.length > 0, retained: _0xab instanceof Uint16Array ? 0 : 1 }); } catch (e) {}
  
  (() => {
    const _0x2dea0 = [0,35,70,105,140,177,213,248,285,321,358,393,430,468,502,537,573,610,645,680,716,757,792,827,864,900,936,971,1007,1044,1084,1121,1157,1193,1228,1264,1301,1337,1373,1408,1442,1477,1514,1550,1589,1626,1664,1699,1736,1773,1811,1846,1881,1919,1954,1989,2023,2060,2095,2131,2168,2202,2239,2275,2310];;
    const _0x2dea1 = [2347,2366,2391,2410,2430,2449,2467,2486,2505,2524,2543,2563,2585,2605,2624,2643,2668,2687,2706,2726,2745,2764,2783,2803,2824,2841,2859,2879,2900,2920,2939,2958,2977,2999,3018,3037,3058,3076,3097,3114,3135,3153,3173,3193,3215,3234,3255,3274,3293,3315,3334,3354,3374,3393,3413,3432,3456,3475,3493,3512,3531,3549,3569,3588,3612];;
    const _0x2dea2 = [3631,3651,3672,3692,3712,3732,3753,3774,3795,3816,3837,3857,3878,3899,3920,3940,3961,3982,4002,4022,4040,4061,4081,4103,4124,4144,4164,4185,4206,4226,4246,4268,4290,4309,4329,4349,4368,4389,4410,4431,4452,4472,4492,4513,4532,4554,4576,4599,4620,4640,4659,4679,4699,4719,4740,4759,4780,4800,4820,4841,4862,4884,4905,4926,4946,4967,4986];;
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
})(_0xmod);

})();
