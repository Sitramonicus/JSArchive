/*
 * O7.26 integration template
 *
 * Place the complete supplied O7.26 source below the marker. The lifecycle
 * contract that must remain integrated is recorded in O7.26_CORRECTED_LIFECYCLE.md.
 * This file is intentionally a template, not an executable build.
 */

(() => {
  "use strict";

  // O7.26 lifecycle state
  const controller = new AbortController();
  const signal = controller.signal;
  const disposables = [];
  const activeTasks = new Set();
  const owner = { released: false };

  const registerCleanup = fn => {
    disposables.push(fn);
    return () => {
      const index = disposables.indexOf(fn);
      if (index >= 0) disposables.splice(index, 1);
    };
  };

  const release = () => {
    if (owner.released) return;
    owner.released = true;
    const primary = disposables.splice(0, disposables.length);
    try { controller.abort(); } catch (_) {}
    while (primary.length) {
      try { primary.pop()(); } catch (_) {}
    }
    while (disposables.length) {
      try { disposables.pop()(); } catch (_) {}
    }
  };

  // Event-driven task ownership helper. Successful handoff remains active
  // until its cleanup callback runs.
  const beginTask = () => {
    const id = Symbol("o7-task");
    activeTasks.add(id);
    let finished = false;
    let handedOff = false;
    const finish = () => {
      if (!finished) {
        finished = true;
        activeTasks.delete(id);
      }
    };
    const handoff = () => { handedOff = true; };
    const finishIfNotHandedOff = () => {
      if (!handedOff) finish();
    };
    return { finish, handoff, finishIfNotHandedOff };
  };

  // BEGIN SUPPLIED O7.26 SOURCE INTEGRATION
  // The complete source is intentionally inserted here when materialized.
  // END SUPPLIED O7.26 SOURCE INTEGRATION

  void signal;
  void registerCleanup;
  void release;
  void beginTask;
})();
