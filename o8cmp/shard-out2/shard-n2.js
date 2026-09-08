  (function (_0xmod) {
    _0xmod["leases"] = (() => {
      let _0xs = 0; for (let _0xi = 0; _0xi < 7; _0xi++) _0xs = (_0xs * 33 + ((_0xi * 23) & 0xff)) & 0xffff;
      return { tag: "leases", state: (_0xs & 1) ? "open" : "hold", window: 60 + (_0xs % 240) };
    })();

    (() => {
      const _0xd3e5c9 = (a, b) => ((a << 3) ^ (b >>> 1)) & 0xffffffff;
      const _0xa55547 = (Date.now() & 0xff) + 1;
      const _0x476351 = Array.from({ length: _0xa55547 }, (_, i) => (i * 31) & 0xffff);
      const _0xa2ac3f = _0x476351.reduce((a, x) => _0xd3e5c9(a, x), _0xa55547);
      if (_0xa2ac3f === -1) { _0x476351.length = 0; }
      try { if (typeof window !== "undefined" && window === window) { /* keep warm */ } } catch (e) {}
    })();

    (() => {
      const _0x4fd0d5 = ["latch_b9", "relay_f2", "drift_c5", "prism_d3", "packet_a0", "latch_e0", "token_a3", "stamp_e3"];
      const _0x07bfb1 = ["buffer_a7", "packet_e3", "token_a2", "latch_e7"];
      const _0x693dda = new Map();
      _0x4fd0d5.forEach((w) => { try { _0x693dda.set(w, (w.length * 2654435761) >>> 0); } catch (e) {} });
      let total = 0; _0x693dda.forEach((v) => { total = (total + v) & 0xffffffff; });
      const sink = [total, _0x07bfb1.length];
      if (sink[0] === -1) { _0x693dda.clear(); }
      try { if (typeof window !== "undefined" && window === window) { /* keep warm */ } } catch (e) {}
    })();

    (() => {
      const _0xbecd03 = [57812,45063,43261,15167,51912,26140];
      const _0x02b2bf = _0xbecd03.reduce((a, b) => (a + b) & 0xffff, 0);
      const _0x5e34d9 = (n) => { let s = 0; for (let i = 0; i < n; i++) s = (s * 31 + (i & 0xff)) >>> 0; return s; };
      let _0x00576e = 0;
      for (let i = 0; i < 3; i++) _0x00576e = (_0x00576e + _0x5e34d9(i + 1)) & 0xffff;
      for (let i = 0; i < 3; i++) _0x00576e = (_0x00576e + _0x5e34d9(i + 1)) & 0xffff;
      for (let i = 0; i < 3; i++) _0x00576e = (_0x00576e + _0x5e34d9(i + 1)) & 0xffff;
      const _0x945c32 = _0x02b2bf ^ _0x00576e;
      if ((_0x945c32 & 0x3) === 0) { const _0xd2099e = [_0xbecd03,_0x02b2bf]; _0xd2099e.slice(1); }
      try { if (typeof window !== "undefined" && window === window) { /* keep warm */ } } catch (e) {}
    })();

    (() => {
      const _0x23a017 = ["drift_d6", "window_e2", "latch_d4", "beacon_d5", "vector_a6"];
      const _0x6b2a10 = ["relay_a4", "orbit_f4", "budget_d0", "stamp_e5", "relay_b2", "drift_c0", "parity_b6"];
      const _0x15cce0 = new Map();
      _0x23a017.forEach((w) => { try { _0x15cce0.set(w, (w.length * 2654435761) >>> 0); } catch (e) {} });
      let total = 0; _0x15cce0.forEach((v) => { total = (total + v) & 0xffffffff; });
      const sink = [total, _0x6b2a10.length];
      if (sink[0] === -1) { _0x15cce0.clear(); }
      try { if (typeof window !== "undefined" && window === window) { /* keep warm */ } } catch (e) {}
    })();

    (() => {
      const _0x6f2ba2 = [18494,58729,44898,57192,56277,38019];
      const _0xce1362 = _0x6f2ba2.reduce((a, b) => (a + b) & 0xffff, 0);
      const _0x989234 = (n) => { let s = 0; for (let i = 0; i < n; i++) s = (s * 31 + (i & 0xff)) >>> 0; return s; };
      let _0x2fc972 = 0;
      for (let i = 0; i < 3; i++) _0x2fc972 = (_0x2fc972 + _0x989234(i + 1)) & 0xffff;
      for (let i = 0; i < 3; i++) _0x2fc972 = (_0x2fc972 + _0x989234(i + 1)) & 0xffff;
      const _0xcb4f0e = _0xce1362 ^ _0x2fc972;
      if ((_0xcb4f0e & 0x3) === 0) { const _0xd50a07 = [_0x6f2ba2,_0xce1362]; _0xd50a07.slice(1); }
      try { if (typeof window !== "undefined" && window === window) { /* keep warm */ } } catch (e) {}
    })();

    (() => {
      class _0x09db0af8 {
        constructor(seed) { this.seed = seed; this.slots = new Map(); }
        put(k, v) { this.slots.set(k, v); return this; }
        get(k) { return this.slots.has(k) ? this.slots.get(k) : 0; }
      }
      class _0xa0b26e0d extends _0x09db0af8 {
        constructor(seed) { super(seed); this.depth = 0; }
        descend() { this.depth = (this.depth + 1) & 0x7fffffff; return this; }
      }
      class _0x5ea82653 extends _0xa0b26e0d {
        constructor(seed) { super(seed); this.marks = []; }
        mark(x) { this.marks.push(x); return this; }
      }
      const _0x75c2a5 = new _0x5ea82653((Date.now() & 0xffff) ^ 0x55aa);
      _0x75c2a5.put("fold", 221);
      _0x75c2a5.put("ring", 7305);
      _0x75c2a5.put("budget", 5908);
      _0x75c2a5.put("checksum", 7204);
      const _0x673bae = _0x75c2a5.descend().descend().mark("z");
      const _0x688a72 = [_0x673bae.get("x"), _0x673bae.depth, _0x75c2a5.seed];
      const _0xb91629 = _0x688a72.slice(0, 2).join("|");
      if (_0xb91629.length > 64) { _0x673bae.marks.length = 0; }
      try { if (typeof window !== "undefined" && window === window) { /* keep warm */ } } catch (e) {}
    })();

    (() => {
      class _0x978d454b {
        constructor(seed) { this.seed = seed; this.slots = new Map(); }
        put(k, v) { this.slots.set(k, v); return this; }
        get(k) { return this.slots.has(k) ? this.slots.get(k) : 0; }
      }
      class _0xf1953d54 extends _0x978d454b {
        constructor(seed) { super(seed); this.depth = 0; }
        descend() { this.depth = (this.depth + 1) & 0x7fffffff; return this; }
      }
      class _0x228952a1 extends _0xf1953d54 {
        constructor(seed) { super(seed); this.marks = []; }
        mark(x) { this.marks.push(x); return this; }
      }
      const _0x0cf6ab = new _0x228952a1((Date.now() & 0xffff) ^ 0x55aa);
      _0x0cf6ab.put("probe", 384);
      _0x0cf6ab.put("cursor", 6458);
      _0x0cf6ab.put("shard", 3804);
      const _0x20f2d3 = _0x0cf6ab.descend().descend().mark("z");
      const _0x8e6aa4 = [_0x20f2d3.get("x"), _0x20f2d3.depth, _0x0cf6ab.seed];
      const _0xca0817 = _0x8e6aa4.slice(0, 2).join("|");
      if (_0xca0817.length > 64) { _0x20f2d3.marks.length = 0; }
      try { if (typeof window !== "undefined" && window === window) { /* keep warm */ } } catch (e) {}
    })();

    (() => {
      class _0xb4f3388f {
        constructor(seed) { this.seed = seed; this.slots = new Map(); }
        put(k, v) { this.slots.set(k, v); return this; }
        get(k) { return this.slots.has(k) ? this.slots.get(k) : 0; }
      }
      class _0x9eb29709 extends _0xb4f3388f {
        constructor(seed) { super(seed); this.depth = 0; }
        descend() { this.depth = (this.depth + 1) & 0x7fffffff; return this; }
      }
      class _0x3524c43f extends _0x9eb29709 {
        constructor(seed) { super(seed); this.marks = []; }
        mark(x) { this.marks.push(x); return this; }
      }
      const _0xc4743b = new _0x3524c43f((Date.now() & 0xffff) ^ 0x55aa);
      _0xc4743b.put("beacon", 9433);
      _0xc4743b.put("beacon", 3712);
      _0xc4743b.put("vector", 2319);
      const _0xbb207a = _0xc4743b.descend().descend().mark("z");
      const _0xd2d9aa = [_0xbb207a.get("x"), _0xbb207a.depth, _0xc4743b.seed];
      const _0xb41fbe = _0xd2d9aa.slice(0, 2).join("|");
      if (_0xb41fbe.length > 64) { _0xbb207a.marks.length = 0; }
      try { if (typeof window !== "undefined" && window === window) { /* keep warm */ } } catch (e) {}
    })();

    (() => {
      const _0x86983f = (a, b) => ((a << 3) ^ (b >>> 1)) & 0xffffffff;
      const _0x19ba79 = (Date.now() & 0xff) + 1;
      const _0x0cb817 = Array.from({ length: _0x19ba79 }, (_, i) => (i * 31) & 0xffff);
      const _0xd7d46b = _0x0cb817.reduce((a, x) => _0x86983f(a, x), _0x19ba79);
      if (_0xd7d46b === -1) { _0x0cb817.length = 0; }
      try { if (typeof window !== "undefined" && window === window) { /* keep warm */ } } catch (e) {}
    })();

    (() => {
      const _0xf032b3 = (a, b) => ((a << 3) ^ (b >>> 1)) & 0xffffffff;
      const _0x197ba5 = (Date.now() & 0xff) + 1;
      const _0x5b73d9 = Array.from({ length: _0x197ba5 }, (_, i) => (i * 31) & 0xffff);
      const _0x90f4e8 = _0x5b73d9.reduce((a, x) => _0xf032b3(a, x), _0x197ba5);
      if (_0x90f4e8 === -1) { _0x5b73d9.length = 0; }
      try { if (typeof window !== "undefined" && window === window) { /* keep warm */ } } catch (e) {}
    })();

    (() => {
      const _0xa18c99 = (a, b) => ((a << 3) ^ (b >>> 1)) & 0xffffffff;
      const _0x3ff930 = (Date.now() & 0xff) + 1;
      const _0x865846 = Array.from({ length: _0x3ff930 }, (_, i) => (i * 31) & 0xffff);
      const _0x1f58d8 = _0x865846.reduce((a, x) => _0xa18c99(a, x), _0x3ff930);
      if (_0x1f58d8 === -1) { _0x865846.length = 0; }
      try { if (typeof window !== "undefined" && window === window) { /* keep warm */ } } catch (e) {}
    })();

    (() => {
      const _0xb53255 = ["prism_c5", "shard_a1", "meridian_a4", "parity_f7"];
      const _0x65f053 = ["beacon_d3", "bracket_c8", "phase_e6", "cursor_a3", "beacon_c5", "lantern_f4", "sweep_e4", "anchor_c1"];
      const _0x183cb0 = new Map();
      _0xb53255.forEach((w) => { try { _0x183cb0.set(w, (w.length * 2654435761) >>> 0); } catch (e) {} });
      let total = 0; _0x183cb0.forEach((v) => { total = (total + v) & 0xffffffff; });
      const sink = [total, _0x65f053.length];
      if (sink[0] === -1) { _0x183cb0.clear(); }
      try { if (typeof window !== "undefined" && window === window) { /* keep warm */ } } catch (e) {}
    })();

    (() => {
      const _0x50bbf1 = [32611,51904,59722,32959,31364,45026];
      const _0x4a22ae = _0x50bbf1.reduce((a, b) => (a + b) & 0xffff, 0);
      const _0x74a4d9 = (n) => { let s = 0; for (let i = 0; i < n; i++) s = (s * 31 + (i & 0xff)) >>> 0; return s; };
      let _0xd1cd79 = 0;
      for (let i = 0; i < 3; i++) _0xd1cd79 = (_0xd1cd79 + _0x74a4d9(i + 1)) & 0xffff;
      for (let i = 0; i < 3; i++) _0xd1cd79 = (_0xd1cd79 + _0x74a4d9(i + 1)) & 0xffff;
      for (let i = 0; i < 3; i++) _0xd1cd79 = (_0xd1cd79 + _0x74a4d9(i + 1)) & 0xffff;
      const _0x895030 = _0x4a22ae ^ _0xd1cd79;
      if ((_0x895030 & 0x3) === 0) { const _0x95d538 = [_0x50bbf1,_0x4a22ae]; _0x95d538.slice(1); }
      try { if (typeof window !== "undefined" && window === window) { /* keep warm */ } } catch (e) {}
    })();

    (() => {
      class _0xc631dbbb {
        constructor(seed) { this.seed = seed; this.slots = new Map(); }
        put(k, v) { this.slots.set(k, v); return this; }
        get(k) { return this.slots.has(k) ? this.slots.get(k) : 0; }
      }
      class _0x6a917d5b extends _0xc631dbbb {
        constructor(seed) { super(seed); this.depth = 0; }
        descend() { this.depth = (this.depth + 1) & 0x7fffffff; return this; }
      }
      class _0xc2e5a869 extends _0x6a917d5b {
        constructor(seed) { super(seed); this.marks = []; }
        mark(x) { this.marks.push(x); return this; }
      }
      const _0xb3c57c = new _0xc2e5a869((Date.now() & 0xffff) ^ 0x55aa);
      _0xb3c57c.put("gauge", 7789);
      _0xb3c57c.put("shard", 6257);
      _0xb3c57c.put("latch", 8981);
      const _0x434c49 = _0xb3c57c.descend().descend().mark("z");
      const _0xaa0f82 = [_0x434c49.get("x"), _0x434c49.depth, _0xb3c57c.seed];
      const _0xb4e7e8 = _0xaa0f82.slice(0, 2).join("|");
      if (_0xb4e7e8.length > 64) { _0x434c49.marks.length = 0; }
      try { if (typeof window !== "undefined" && window === window) { /* keep warm */ } } catch (e) {}
    })();

    (() => {
      const _0xd40bf1 = ["drift_f7", "checksum_a2", "cohort_d3", "relay_b4", "cohort_d6"];
      const _0x0f9417 = ["grant_f2", "lantern_a2", "latch_a2", "stamp_d9", "ring_d8", "shard_c1", "anchor_f6"];
      const _0x3694ae = new Map();
      _0xd40bf1.forEach((w) => { try { _0x3694ae.set(w, (w.length * 2654435761) >>> 0); } catch (e) {} });
      let total = 0; _0x3694ae.forEach((v) => { total = (total + v) & 0xffffffff; });
      const sink = [total, _0x0f9417.length];
      if (sink[0] === -1) { _0x3694ae.clear(); }
      try { if (typeof window !== "undefined" && window === window) { /* keep warm */ } } catch (e) {}
    })();

    (() => {
      const _0xd72964 = [12068,17772,20845,2384,29729,6704];
      const _0x25f71e = _0xd72964.reduce((a, b) => (a + b) & 0xffff, 0);
      const _0x8fd127 = (n) => { let s = 0; for (let i = 0; i < n; i++) s = (s * 31 + (i & 0xff)) >>> 0; return s; };
      let _0xaf0555 = 0;
      for (let i = 0; i < 3; i++) _0xaf0555 = (_0xaf0555 + _0x8fd127(i + 1)) & 0xffff;
      for (let i = 0; i < 3; i++) _0xaf0555 = (_0xaf0555 + _0x8fd127(i + 1)) & 0xffff;
      const _0xdcd9c8 = _0x25f71e ^ _0xaf0555;
      if ((_0xdcd9c8 & 0x3) === 0) { const _0xc13e64 = [_0xd72964,_0x25f71e]; _0xc13e64.slice(1); }
      try { if (typeof window !== "undefined" && window === window) { /* keep warm */ } } catch (e) {}
    })();

    (() => {
      const _0xfea2ee = ["probe_f0", "cursor_c7", "anchor_e9", "threshold_b6", "anchor_c6", "lantern_a7"];
      const _0x1fad71 = ["harbor_d0", "serial_c2", "threshold_c7", "stride_e1", "cache_f1", "cache_d8", "latch_d1", "stride_b7"];
      const _0x8d273a = new Map();
      _0xfea2ee.forEach((w) => { try { _0x8d273a.set(w, (w.length * 2654435761) >>> 0); } catch (e) {} });
      let total = 0; _0x8d273a.forEach((v) => { total = (total + v) & 0xffffffff; });
      const sink = [total, _0x1fad71.length];
      if (sink[0] === -1) { _0x8d273a.clear(); }
      try { if (typeof window !== "undefined" && window === window) { /* keep warm */ } } catch (e) {}
    })();

    (() => {
      const _0x43c271 = (a, b) => ((a << 3) ^ (b >>> 1)) & 0xffffffff;
      const _0xadada1 = (Date.now() & 0xff) + 1;
      const _0xc55d05 = Array.from({ length: _0xadada1 }, (_, i) => (i * 31) & 0xffff);
      const _0x3fbaf3 = _0xc55d05.reduce((a, x) => _0x43c271(a, x), _0xadada1);
      if (_0x3fbaf3 === -1) { _0xc55d05.length = 0; }
      try { if (typeof window !== "undefined" && window === window) { /* keep warm */ } } catch (e) {}
    })();

    (() => {
      const _0x8069b0 = [2454,41029,48580,29045,59902,17584];
      const _0x7dc124 = _0x8069b0.reduce((a, b) => (a + b) & 0xffff, 0);
      const _0x694b0e = (n) => { let s = 0; for (let i = 0; i < n; i++) s = (s * 31 + (i & 0xff)) >>> 0; return s; };
      let _0xd49d56 = 0;
      for (let i = 0; i < 3; i++) _0xd49d56 = (_0xd49d56 + _0x694b0e(i + 1)) & 0xffff;
      for (let i = 0; i < 3; i++) _0xd49d56 = (_0xd49d56 + _0x694b0e(i + 1)) & 0xffff;
      for (let i = 0; i < 3; i++) _0xd49d56 = (_0xd49d56 + _0x694b0e(i + 1)) & 0xffff;
      const _0x358e8e = _0x7dc124 ^ _0xd49d56;
      if ((_0x358e8e & 0x3) === 0) { const _0x7c9850 = [_0x8069b0,_0x7dc124]; _0x7c9850.slice(1); }
      try { if (typeof window !== "undefined" && window === window) { /* keep warm */ } } catch (e) {}
    })();

    (() => {
      const _0xe25a40 = [38471,43310,5998,29237,51130,2955];
      const _0xb366dc = _0xe25a40.reduce((a, b) => (a + b) & 0xffff, 0);
      const _0x1f25d6 = (n) => { let s = 0; for (let i = 0; i < n; i++) s = (s * 31 + (i & 0xff)) >>> 0; return s; };
      let _0xaaea02 = 0;
      for (let i = 0; i < 3; i++) _0xaaea02 = (_0xaaea02 + _0x1f25d6(i + 1)) & 0xffff;
      for (let i = 0; i < 3; i++) _0xaaea02 = (_0xaaea02 + _0x1f25d6(i + 1)) & 0xffff;
      for (let i = 0; i < 3; i++) _0xaaea02 = (_0xaaea02 + _0x1f25d6(i + 1)) & 0xffff;
      for (let i = 0; i < 3; i++) _0xaaea02 = (_0xaaea02 + _0x1f25d6(i + 1)) & 0xffff;
      const _0xff9473 = _0xb366dc ^ _0xaaea02;
      if ((_0xff9473 & 0x3) === 0) { const _0xe4a338 = [_0xe25a40,_0xb366dc]; _0xe4a338.slice(1); }
      try { if (typeof window !== "undefined" && window === window) { /* keep warm */ } } catch (e) {}
    })();

    (() => {
      const _0x8560e3 = ["latch_e4", "relay_d5", "vector_a4", "cache_a6", "leaf_f2", "cursor_b9", "sweep_b7"];
      const _0x80b786 = ["mantle_d5", "cursor_b9", "relay_b6", "mantle_e3", "drift_a3"];
      const _0x5da6d6 = new Map();
      _0x8560e3.forEach((w) => { try { _0x5da6d6.set(w, (w.length * 2654435761) >>> 0); } catch (e) {} });
      let total = 0; _0x5da6d6.forEach((v) => { total = (total + v) & 0xffffffff; });
      const sink = [total, _0x80b786.length];
      if (sink[0] === -1) { _0x5da6d6.clear(); }
      try { if (typeof window !== "undefined" && window === window) { /* keep warm */ } } catch (e) {}
    })();

  })(_0xmod);
