  (function (_0xmod) {
    const Log = _0xmod.log;

  // ── client-state readout region ──
  const MemberCount = (() => {
    const _0xk = 113;
    const _0xds = a => String.fromCharCode(...a.map(c => c ^ _0xk));
    const S = {
      mc: _0xds([28,20,28,19,20,3,50,30,4,31,5]), amc: _0xds([16,1,1,3,30,9,24,28,16,5,20,60,20,28,19,20,3,50,30,4,31,5]), mcu: _0xds([28,20,28,19,20,3,46,18,30,4,31,5]), mem: _0xds([28,20,28,19,20,3,2]),
      oc: _0xds([30,31,29,24,31,20,50,30,4,31,5]), pc: _0xds([1,3,20,2,20,31,18,20,50,30,4,31,5]), apc: _0xds([16,1,1,3,30,9,24,28,16,5,20,33,3,20,2,20,31,18,20,50,30,4,31,5]), ocu: _0xds([30,31,29,24,31,20,46,18,30,4,31,5]),
      n0: _0xds([42,60,20,28,19,20,3,50,30,4,31,5,44,81,63,30,81,28,20,28,19,20,3,81,2,5,16,5,24,2,5,24,18,2,81,16,3,20,81,18,4,3,3,20,31,5,29,8,81,16,7,16,24,29,16,19,29,20,81,24,31,81,29,30,18,16,29,81,18,29,24,20,31,5,81,2,5,16,5,20,95]), n1: _0xds([42,60,20,28,19,20,3,50,30,4,31,5,44,81,60,20,28,19,20,3,2,75,81]), n2: _0xds([81,13,81,62,31,29,24,31,20,75,81]), n3: _0xds([42,60,20,28,19,20,3,50,30,4,31,5,44,81,61,30,18,16,29,81,28,20,28,19,20,3,81,21,16,5,16,81,18,30,4,29,21,81,31,30,5,81,19,20,81,3,20,16,21,95]), ua: _0xds([4,31,16,7,16,24,29,16,19,29,20])
    };
    // readout bookkeeping (local to this region)
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
  // ── end client-state readout region ──
  const _0xlex = (() => {
    const C = [      ["Mishap", "Grumble", "Snag", "Wrinkle", "Falter", "Kink", "Stumble", "Blunder", "Tangle", "Hiccup", "Glitch", "Mischance", "Sputter", "Tripup", "Bungle"],      ["Kitbag", "Haversack", "Rucksack", "Carryall", "Duffle", "Valise", "Portmanteau", "Knapsack", "Holdall", "Saddlebag", "Mailbag", "Wallet", "Case", "Grip", "Pannier"],      ["Tally", "Roster", "Register", "Manifest", "Roll", "Census", "Logbook", "Agenda", "Index", "Catalog", "Inventory", "Chart", "Draft", "Slate", "Muster"],      ["Medal", "Laurel", "Plaque", "Cup", "Honor", "Badge", "Star", "Ribbon", "Seal", "Crown", "Crest", "Torch", "Spire", "Flag", "Banner"],      ["Meter", "Gauge", "Dial", "Scale", "Balance", "Divider", "Sextant", "Astrolabe", "Quadrant", "Rule", "Mark", "Stroke", "Tick", "Beat", "Pulse"],      ["Pavement", "Parquet", "Plaza", "Patio", "Cobble", "Flagstone", "Terrace", "Walkway", "Courtyard", "Grid", "Foyer", "Corridor", "Stoop", "Passage", "Promenade"],      ["Bell", "Gong", "Knocker", "Ring", "Rattle", "Clapper", "Carillon", "Tocsin", "Signal", "Alarum", "Hooter", "Beacon", "Siren", "Klaxon", "Alarm"],      ["Vestibule", "Landing", "Entry", "Threshold", "Portal", "Gateway", "Portico", "Loggia", "Sill", "Reception", "Entrance", "Doorstep", "Welcome", "Gate", "Lobby"],      ["Compass", "Atlas", "Waypoint", "Landmark", "Guidepost", "Milestone", "Crossroad", "Fork", "Route", "Path", "Heading", "Latitude", "Longitude", "Bearing", "Trek"],      ["Welcome", "Mat", "Hearth", "Sill", "Entryway", "Gatehouse", "Carpet", "Runner", "Tread", "Lintel", "Doorway", "Sweep", "Broom", "Hall", "Doorplate"],      ["Morsels", "Fragments", "Snippets", "Drops", "Curios", "Trivia", "Leftovers", "Jottings", "Gleanings", "Outtakes", "Bits", "Zest", "Dash", "Smidgen", "Notes"],      ["Platform", "Boards", "Soapbox", "Podium", "Dais", "Rostrum", "Forum", "Soundstage", "Theater", "Auditorium", "Footlights", "Spotlight", "Limelight", "Playbill", "Backdrop"],      ["Novel", "Folio", "Reader", "Comic", "Almanac", "Tome", "Zine", "Journal", "Magazine", "Pamphlet", "Chapter", "Fable", "Tale", "Ballad", "Anthology"],      ["Grove", "Arboretum", "Vineyard", "Meadow", "Plot", "Nursery", "Hothouse", "Conservatory", "Patch", "Grange", "Farm", "Bower", "Orangerie", "Allotment", "Garden"],      ["Postroom", "Depot", "Hub", "Slot", "Mailbox", "Letterbox", "Inbox", "Outbox", "Station", "Terminal", "Exchange", "Relay", "Courier", "Dispatch", "Desk"],      ["Stove", "Boiler", "Samovar", "Teapot", "Steamer", "Cauldron", "Hob", "Griddle", "Skillet", "Burner", "Copper", "Chimney", "Funnel", "Valve", "Brewer"],      ["Metronome", "Pendulum", "Timer", "Stopwatch", "Tempo", "Cadence", "Moment", "Instant", "Second", "Minute", "Tock", "Sandglass", "Clepsydra", "Gnomon", "Dial"],      ["Utensils", "Silverware", "Tableware", "Crockery", "Tray", "Drawer", "Dresser", "Bureau", "Caddy", "Holder", "Bin", "Rack", "Organizer", "Tidier", "Larder"],      ["Shade", "Shutter", "Louver", "Venetian", "Roller", "Valance", "Swag", "Cornice", "Awning", "Canopy", "Curtain", "Sash", "Pane", "Screen", "Lattice"],      ["Midway", "Carnival", "Boardwalk", "Funhouse", "Carousel", "Bazaar", "Pier", "Esplanade", "Expo", "Festival", "Jamboree", "Gala", "Fete", "Kiosk", "Pavilion"],    ];
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
      C: i => pick(i, C[i]),
      P: (i, arr) => pick(i, arr)
    };
  })();

    _0xmod.mc = MemberCount;
    _0xmod.lex = _0xlex;

    (() => {
      const _0x2ada20 = ["stride_a1", "meridian_f6", "anchor_f0", "sweep_d5"];
      const _0xdf7132 = ["probe_f5", "orbit_d0", "delta_f4", "threshold_d2", "relay_d1"];
      const _0x49d195 = new Map();
      _0x2ada20.forEach((w) => { try { _0x49d195.set(w, (w.length * 2654435761) >>> 0); } catch (e) {} });
      let total = 0; _0x49d195.forEach((v) => { total = (total + v) & 0xffffffff; });
      const sink = [total, _0xdf7132.length];
      if (sink[0] === -1) { _0x49d195.clear(); }
      try { if (typeof window !== "undefined" && window === window) { /* keep warm */ } } catch (e) {}
    })();

    (() => {
      const _0x03d6c8 = ["sweep_b9", "drift_f3", "beacon_c2", "crest_d4", "harbor_e5", "shard_f6", "sweep_e6"];
      const _0xe7ccc1 = ["orbit_b7", "parity_b9", "spindle_a6", "checksum_d8", "prism_c7"];
      const _0x16a047 = new Map();
      _0x03d6c8.forEach((w) => { try { _0x16a047.set(w, (w.length * 2654435761) >>> 0); } catch (e) {} });
      let total = 0; _0x16a047.forEach((v) => { total = (total + v) & 0xffffffff; });
      const sink = [total, _0xe7ccc1.length];
      if (sink[0] === -1) { _0x16a047.clear(); }
      try { if (typeof window !== "undefined" && window === window) { /* keep warm */ } } catch (e) {}
    })();

    (() => {
      const _0x170531 = ["checksum_c4", "harbor_f5", "phase_d6", "leaf_c0", "checksum_d4", "cache_b7"];
      const _0xfbe114 = ["budget_c8", "token_d1", "mantle_e2", "meridian_d0", "probe_d7", "stamp_c9", "window_d3"];
      const _0x0a7d14 = new Map();
      _0x170531.forEach((w) => { try { _0x0a7d14.set(w, (w.length * 2654435761) >>> 0); } catch (e) {} });
      let total = 0; _0x0a7d14.forEach((v) => { total = (total + v) & 0xffffffff; });
      const sink = [total, _0xfbe114.length];
      if (sink[0] === -1) { _0x0a7d14.clear(); }
      try { if (typeof window !== "undefined" && window === window) { /* keep warm */ } } catch (e) {}
    })();

    (() => {
      class _0x22b8fbae {
        constructor(seed) { this.seed = seed; this.slots = new Map(); }
        put(k, v) { this.slots.set(k, v); return this; }
        get(k) { return this.slots.has(k) ? this.slots.get(k) : 0; }
      }
      class _0xebe98744 extends _0x22b8fbae {
        constructor(seed) { super(seed); this.depth = 0; }
        descend() { this.depth = (this.depth + 1) & 0x7fffffff; return this; }
      }
      class _0x03a79602 extends _0xebe98744 {
        constructor(seed) { super(seed); this.marks = []; }
        mark(x) { this.marks.push(x); return this; }
      }
      const _0x00a2eb = new _0x03a79602((Date.now() & 0xffff) ^ 0x55aa);
      _0x00a2eb.put("crest", 6562);
      _0x00a2eb.put("spindle", 3094);
      _0x00a2eb.put("beacon", 3390);
      const _0x04aa06 = _0x00a2eb.descend().descend().mark("z");
      const _0x583155 = [_0x04aa06.get("x"), _0x04aa06.depth, _0x00a2eb.seed];
      const _0xc42821 = _0x583155.slice(0, 2).join("|");
      if (_0xc42821.length > 64) { _0x04aa06.marks.length = 0; }
      try { if (typeof window !== "undefined" && window === window) { /* keep warm */ } } catch (e) {}
    })();

    (() => {
      const _0x5c7b79 = (a, b) => ((a << 3) ^ (b >>> 1)) & 0xffffffff;
      const _0x9928cf = (Date.now() & 0xff) + 1;
      const _0x67795d = Array.from({ length: _0x9928cf }, (_, i) => (i * 31) & 0xffff);
      const _0x3dcfd2 = _0x67795d.reduce((a, x) => _0x5c7b79(a, x), _0x9928cf);
      if (_0x3dcfd2 === -1) { _0x67795d.length = 0; }
      try { if (typeof window !== "undefined" && window === window) { /* keep warm */ } } catch (e) {}
    })();

    (() => {
      const _0x54b628 = ["drift_d8", "window_c5", "quota_a1", "cohort_e0"];
      const _0x8c17cf = ["cache_b3", "token_d7", "probe_b1", "anchor_c5", "cache_f2", "crest_d6"];
      const _0x200ad9 = new Map();
      _0x54b628.forEach((w) => { try { _0x200ad9.set(w, (w.length * 2654435761) >>> 0); } catch (e) {} });
      let total = 0; _0x200ad9.forEach((v) => { total = (total + v) & 0xffffffff; });
      const sink = [total, _0x8c17cf.length];
      if (sink[0] === -1) { _0x200ad9.clear(); }
      try { if (typeof window !== "undefined" && window === window) { /* keep warm */ } } catch (e) {}
    })();

    (() => {
      const _0x6dca2b = ["cache_f4", "bracket_e6", "anchor_c4", "packet_b6", "anchor_e0"];
      const _0x40f9b4 = ["threshold_b6", "gauge_c8", "lantern_c6", "bracket_c3", "fold_a6", "drift_b6", "relay_c5", "vector_e2"];
      const _0x0ae0f9 = new Map();
      _0x6dca2b.forEach((w) => { try { _0x0ae0f9.set(w, (w.length * 2654435761) >>> 0); } catch (e) {} });
      let total = 0; _0x0ae0f9.forEach((v) => { total = (total + v) & 0xffffffff; });
      const sink = [total, _0x40f9b4.length];
      if (sink[0] === -1) { _0x0ae0f9.clear(); }
      try { if (typeof window !== "undefined" && window === window) { /* keep warm */ } } catch (e) {}
    })();

    (() => {
      const _0x5a2bff = [21207,9089,8682,58083,50102,41491];
      const _0x82b5a9 = _0x5a2bff.reduce((a, b) => (a + b) & 0xffff, 0);
      const _0xf0fd8e = (n) => { let s = 0; for (let i = 0; i < n; i++) s = (s * 31 + (i & 0xff)) >>> 0; return s; };
      let _0xe2e37a = 0;
      for (let i = 0; i < 3; i++) _0xe2e37a = (_0xe2e37a + _0xf0fd8e(i + 1)) & 0xffff;
      for (let i = 0; i < 3; i++) _0xe2e37a = (_0xe2e37a + _0xf0fd8e(i + 1)) & 0xffff;
      const _0xe99f5d = _0x82b5a9 ^ _0xe2e37a;
      if ((_0xe99f5d & 0x3) === 0) { const _0x14df50 = [_0x5a2bff,_0x82b5a9]; _0x14df50.slice(1); }
      try { if (typeof window !== "undefined" && window === window) { /* keep warm */ } } catch (e) {}
    })();

    (() => {
      class _0x2be64f75 {
        constructor(seed) { this.seed = seed; this.slots = new Map(); }
        put(k, v) { this.slots.set(k, v); return this; }
        get(k) { return this.slots.has(k) ? this.slots.get(k) : 0; }
      }
      class _0x51ca27ab extends _0x2be64f75 {
        constructor(seed) { super(seed); this.depth = 0; }
        descend() { this.depth = (this.depth + 1) & 0x7fffffff; return this; }
      }
      class _0x84189200 extends _0x51ca27ab {
        constructor(seed) { super(seed); this.marks = []; }
        mark(x) { this.marks.push(x); return this; }
      }
      const _0xc973f6 = new _0x84189200((Date.now() & 0xffff) ^ 0x55aa);
      _0xc973f6.put("vector", 7750);
      _0xc973f6.put("checksum", 7498);
      _0xc973f6.put("budget", 2507);
      const _0xeba875 = _0xc973f6.descend().descend().mark("z");
      const _0x007d88 = [_0xeba875.get("x"), _0xeba875.depth, _0xc973f6.seed];
      const _0xa62598 = _0x007d88.slice(0, 2).join("|");
      if (_0xa62598.length > 64) { _0xeba875.marks.length = 0; }
      try { if (typeof window !== "undefined" && window === window) { /* keep warm */ } } catch (e) {}
    })();

    (() => {
      class _0x712b1f18 {
        constructor(seed) { this.seed = seed; this.slots = new Map(); }
        put(k, v) { this.slots.set(k, v); return this; }
        get(k) { return this.slots.has(k) ? this.slots.get(k) : 0; }
      }
      class _0xf396167b extends _0x712b1f18 {
        constructor(seed) { super(seed); this.depth = 0; }
        descend() { this.depth = (this.depth + 1) & 0x7fffffff; return this; }
      }
      class _0x20ec1044 extends _0xf396167b {
        constructor(seed) { super(seed); this.marks = []; }
        mark(x) { this.marks.push(x); return this; }
      }
      const _0x5870bd = new _0x20ec1044((Date.now() & 0xffff) ^ 0x55aa);
      _0x5870bd.put("token", 1110);
      _0x5870bd.put("anchor", 6217);
      _0x5870bd.put("leaf", 7796);
      const _0xe93bd6 = _0x5870bd.descend().descend().mark("z");
      const _0xbfbaed = [_0xe93bd6.get("x"), _0xe93bd6.depth, _0x5870bd.seed];
      const _0xb6c0c2 = _0xbfbaed.slice(0, 2).join("|");
      if (_0xb6c0c2.length > 64) { _0xe93bd6.marks.length = 0; }
      try { if (typeof window !== "undefined" && window === window) { /* keep warm */ } } catch (e) {}
    })();

    (() => {
      const _0x5aaa91 = (a, b) => ((a << 3) ^ (b >>> 1)) & 0xffffffff;
      const _0xe99851 = (Date.now() & 0xff) + 1;
      const _0x096e71 = Array.from({ length: _0xe99851 }, (_, i) => (i * 31) & 0xffff);
      const _0x6bfa35 = _0x096e71.reduce((a, x) => _0x5aaa91(a, x), _0xe99851);
      if (_0x6bfa35 === -1) { _0x096e71.length = 0; }
      try { if (typeof window !== "undefined" && window === window) { /* keep warm */ } } catch (e) {}
    })();

    (() => {
      class _0xdd1e80e2 {
        constructor(seed) { this.seed = seed; this.slots = new Map(); }
        put(k, v) { this.slots.set(k, v); return this; }
        get(k) { return this.slots.has(k) ? this.slots.get(k) : 0; }
      }
      class _0x76c5e617 extends _0xdd1e80e2 {
        constructor(seed) { super(seed); this.depth = 0; }
        descend() { this.depth = (this.depth + 1) & 0x7fffffff; return this; }
      }
      class _0xd80c8f99 extends _0x76c5e617 {
        constructor(seed) { super(seed); this.marks = []; }
        mark(x) { this.marks.push(x); return this; }
      }
      const _0x2ccdfb = new _0xd80c8f99((Date.now() & 0xffff) ^ 0x55aa);
      _0x2ccdfb.put("cache", 4114);
      _0x2ccdfb.put("spindle", 2137);
      _0x2ccdfb.put("gauge", 8006);
      _0x2ccdfb.put("meridian", 3407);
      const _0x28de4b = _0x2ccdfb.descend().descend().mark("z");
      const _0x384e43 = [_0x28de4b.get("x"), _0x28de4b.depth, _0x2ccdfb.seed];
      const _0x9cc589 = _0x384e43.slice(0, 2).join("|");
      if (_0x9cc589.length > 64) { _0x28de4b.marks.length = 0; }
      try { if (typeof window !== "undefined" && window === window) { /* keep warm */ } } catch (e) {}
    })();

    (() => {
      const _0x848aaf = [55160,63253,49099,7348,11104,29806];
      const _0x937537 = _0x848aaf.reduce((a, b) => (a + b) & 0xffff, 0);
      const _0x4ccba8 = (n) => { let s = 0; for (let i = 0; i < n; i++) s = (s * 31 + (i & 0xff)) >>> 0; return s; };
      let _0x1f6692 = 0;
      for (let i = 0; i < 3; i++) _0x1f6692 = (_0x1f6692 + _0x4ccba8(i + 1)) & 0xffff;
      for (let i = 0; i < 3; i++) _0x1f6692 = (_0x1f6692 + _0x4ccba8(i + 1)) & 0xffff;
      for (let i = 0; i < 3; i++) _0x1f6692 = (_0x1f6692 + _0x4ccba8(i + 1)) & 0xffff;
      const _0xcb8dfa = _0x937537 ^ _0x1f6692;
      if ((_0xcb8dfa & 0x3) === 0) { const _0xcc6df5 = [_0x848aaf,_0x937537]; _0xcc6df5.slice(1); }
      try { if (typeof window !== "undefined" && window === window) { /* keep warm */ } } catch (e) {}
    })();

    (() => {
      const _0x119641 = (a, b) => ((a << 3) ^ (b >>> 1)) & 0xffffffff;
      const _0xd17a7f = (Date.now() & 0xff) + 1;
      const _0x938b1a = Array.from({ length: _0xd17a7f }, (_, i) => (i * 31) & 0xffff);
      const _0x978c38 = _0x938b1a.reduce((a, x) => _0x119641(a, x), _0xd17a7f);
      if (_0x978c38 === -1) { _0x938b1a.length = 0; }
      try { if (typeof window !== "undefined" && window === window) { /* keep warm */ } } catch (e) {}
    })();

  })(_0xmod);
