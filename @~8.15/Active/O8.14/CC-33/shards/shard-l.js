  (function (_0xmod) {
    if (_0xmod._anteMix != null) return;
    const _0xfnv = (s) => { let h = 0x811c9dc5; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; } return h >>> 0; };
    const _0xboot = _0xfnv(String.fromCharCode(56,53,49,98,50,56,101,53));
    const _0xsh = (s => { const t = new Uint16Array(s.length); for (let i = 0; i < s.length; i++) t[i] = s.charCodeAt(i); return t; })("!\"\"!\"#!#\"%");
    const _0xoff = [0,3,6];
    const _0xshd = (o) => {
      const t = _0xsh;
      const rot = 47 + (_0xboot % 94);
      const n = (t[o] - 0x21) * 94 + (t[o + 1] - 0x21);
      let r = "";
      for (let j = 0; j < n; j++) {
        const c = t[o + 2 + j];
        r += String.fromCharCode(c < 0x80 ? 0x20 + (((c - 0x20 - rot) % 0x5F) + 0x5F) % 0x5F : c);
      }
      return r;
    };
    const _0xvmMix = (prog) => {
      if (!Array.isArray(prog) || prog.length > 32) throw new Error('vm-length');
      const st = [];
      const push = (v) => { if (st.length >= 16) throw new Error('vm-stack'); st.push(v >>> 0); };
      const pop = () => { if (!st.length) throw new Error('vm-stack'); return st.pop(); };
      const tab = Object.create(null);
      tab[1] = (pc) => { push(prog[pc + 1] >>> 0); return 2; };
      tab[6] = () => { const b = pop(), a = pop(); push(a ^ b); return 1; };
      tab[15] = () => 0;
      let pc = 0, ops = 0;
      for (;;) {
        if (++ops > 64) throw new Error('vm-budget');
        const op = prog[pc];
        const fn = tab[op];
        if (typeof fn !== 'function') throw new Error('vm-op');
        if (op === 15) return pop();
        pc += fn(pc);
      }
    };
    const s0 = Number(_0xshd(_0xoff[0]));
    const s1 = Number(_0xshd(_0xoff[1]));
    const s2 = Number(_0xshd(_0xoff[2]));
    if (!s0 || !s1 || !s2) return;
    const _0wasm = Uint8Array.of(0x00,0x61,0x73,0x6d,0x01,0x00,0x00,0x00);
    if (_0wasm[1] === 0xff) { try { WebAssembly.instantiate(_0wasm); } catch (e) {} }
    _0xmod._anteMix = _0xvmMix([1, _0xboot, 1, s0, 6, 1, s1, 6, 1, s2, 6, 15]);
  })(_0xmod);
