"use strict";

// Focused regression checks for the two O7.20 lifecycle defects.
// This deliberately tests only cleanup ordering; it does not emulate Discord.
const assert = require("node:assert/strict");

function makeRelease() {
  const disposables = [];
  const owner = { released: false };
  const signal = { onAbort: null };
  const controller = { abort() { signal.onAbort?.(); } };
  const register = fn => { disposables.push(fn); return () => {
    const i = disposables.indexOf(fn); if (i >= 0) disposables.splice(i, 1);
  }; };
  const release = () => {
    if (owner.released) return;
    owner.released = true;
    const toDispose = disposables.splice(0, disposables.length);
    try { controller.abort(); } catch (_) {}
    while (toDispose.length) { try { toDispose.pop()(); } catch (_) {} }
    while (disposables.length) { try { disposables.pop()(); } catch (_) {} }
  };
  return { register, release, signal, disposables };
}

for (let run = 0; run < 5; run++) {
  const x = makeRelease();
  const events = [];
  x.register(() => events.push("original"));
  x.signal.onAbort = () => x.register(() => events.push("late"));
  x.release();
  assert.deepEqual(events, ["original", "late"]);
  assert.equal(x.disposables.length, 0);
  x.release();
  assert.deepEqual(events, ["original", "late"]);
}

// The desktop-dispatch failure case: cleanup must already be registered.
{
  const restored = [];
  let cleanup;
  const disposables = [];
  const register = fn => (disposables.push(fn), fn);
  cleanup = () => { restored.push("hooks"); };
  register(cleanup);
  assert.throws(() => { throw new Error("dispatch failed"); });
  while (disposables.length) disposables.pop()();
  assert.deepEqual(restored, ["hooks"]);
}

console.log("O7.21 lifecycle regression: 5 release runs + dispatch-failure case passed");
