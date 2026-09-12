(() => {
  // --- LOGGING MODULE ---
  // 0 = Silent, 1 = Default Operational, 2 = Extensive Diagnostics
  const LOG_LEVEL = 2; 
  const Log = (() => {
    const noop = () => {};
    if (LOG_LEVEL === 0) return { say: noop, diag: noop, warn: noop, info: noop };
    return {
      say: (c, m) => console.debug(`[Google ${c}] ${m}`),
      diag: (m, d) => { if (LOG_LEVEL >= 2) d !== undefined ? console.debug(`[O7-DIAG] ${m}`, d) : console.debug(`[O7-DIAG] ${m}`); },
      warn: (m) => console.warn(m),
      info: (m) => console.debug(m)
    };
  })();