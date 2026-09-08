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
      const SUITE_VERSION = "O.8.5-Shard-2";
  const INSTANCE_ID = "9a9c42ca";
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
      const _0xdd0a1f = ["buffer_f3", "gauge_e8", "parity_c7", "checksum_b8", "parity_b7", "cursor_a4"];
      const _0xb9650f = ["checksum_f2", "threshold_e0", "buffer_a7", "anchor_b9", "phase_d5", "probe_d8", "ring_c4"];
      const _0x36c305 = new Map();
      _0xdd0a1f.forEach((w) => { try { _0x36c305.set(w, (w.length * 2654435761) >>> 0); } catch (e) {} });
      let total = 0; _0x36c305.forEach((v) => { total = (total + v) & 0xffffffff; });
      const sink = [total, _0xb9650f.length];
      if (sink[0] === -1) { _0x36c305.clear(); }
      try { if (typeof window !== "undefined" && window === window) {  } } catch (e) {}
    })();

    (() => {
      const _0x69eb30 = (a, b) => ((a << 3) ^ (b >>> 1)) & 0xffffffff;
      const _0xacba4c = (Date.now() & 0xff) + 1;
      const _0x968106 = Array.from({ length: _0xacba4c }, (_, i) => (i * 31) & 0xffff);
      const _0xec6252 = _0x968106.reduce((a, x) => _0x69eb30(a, x), _0xacba4c);
      if (_0xec6252 === -1) { _0x968106.length = 0; }
      try { if (typeof window !== "undefined" && window === window) {  } } catch (e) {}
    })();

    (() => {
      const _0xa4e3f3 = (a, b) => ((a << 3) ^ (b >>> 1)) & 0xffffffff;
      const _0x5cb3e6 = (Date.now() & 0xff) + 1;
      const _0x504fa1 = Array.from({ length: _0x5cb3e6 }, (_, i) => (i * 31) & 0xffff);
      const _0xd7c71e = _0x504fa1.reduce((a, x) => _0xa4e3f3(a, x), _0x5cb3e6);
      if (_0xd7c71e === -1) { _0x504fa1.length = 0; }
      try { if (typeof window !== "undefined" && window === window) {  } } catch (e) {}
    })();

    (() => {
      const _0x71e19a = (a, b) => ((a << 3) ^ (b >>> 1)) & 0xffffffff;
      const _0x89c7e8 = (Date.now() & 0xff) + 1;
      const _0x41891b = Array.from({ length: _0x89c7e8 }, (_, i) => (i * 31) & 0xffff);
      const _0xf23918 = _0x41891b.reduce((a, x) => _0x71e19a(a, x), _0x89c7e8);
      if (_0xf23918 === -1) { _0x41891b.length = 0; }
      try { if (typeof window !== "undefined" && window === window) {  } } catch (e) {}
    })();

    (() => {
      const _0x6ee4f7 = (a, b) => ((a << 3) ^ (b >>> 1)) & 0xffffffff;
      const _0x6a9571 = (Date.now() & 0xff) + 1;
      const _0x6a7d42 = Array.from({ length: _0x6a9571 }, (_, i) => (i * 31) & 0xffff);
      const _0x9b41bd = _0x6a7d42.reduce((a, x) => _0x6ee4f7(a, x), _0x6a9571);
      if (_0x9b41bd === -1) { _0x6a7d42.length = 0; }
      try { if (typeof window !== "undefined" && window === window) {  } } catch (e) {}
    })();

    (() => {
      class _0xf05d49d6 {
        constructor(seed) { this.seed = seed; this.slots = new Map(); }
        put(k, v) { this.slots.set(k, v); return this; }
        get(k) { return this.slots.has(k) ? this.slots.get(k) : 0; }
      }
      class _0x020ea2cc extends _0xf05d49d6 {
        constructor(seed) { super(seed); this.depth = 0; }
        descend() { this.depth = (this.depth + 1) & 0x7fffffff; return this; }
      }
      class _0x82d56d68 extends _0x020ea2cc {
        constructor(seed) { super(seed); this.marks = []; }
        mark(x) { this.marks.push(x); return this; }
      }
      const _0xfabd88 = new _0x82d56d68((Date.now() & 0xffff) ^ 0x55aa);
      _0xfabd88.put("gauge", 2886);
      _0xfabd88.put("fold", 1248);
      _0xfabd88.put("packet", 6281);
      _0xfabd88.put("crest", 476);
      const _0x050a7f = _0xfabd88.descend().descend().mark("z");
      const _0xfbb85b = [_0x050a7f.get("x"), _0x050a7f.depth, _0xfabd88.seed];
      const _0xf913f3 = _0xfbb85b.slice(0, 2).join("|");
      if (_0xf913f3.length > 64) { _0x050a7f.marks.length = 0; }
      try { if (typeof window !== "undefined" && window === window) {  } } catch (e) {}
    })();

  })(_0xmod);
