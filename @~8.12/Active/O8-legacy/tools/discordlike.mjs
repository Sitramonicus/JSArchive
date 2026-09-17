// discordlike.mjs — minimal Discord-client-like global shim for TOP-LEVEL module boots.
// Purpose: let the stitched quest script execute in Node exactly as it would when
// pasted at the top level of the client console. Provides browser globals + inert
// window listeners; provides NO webpack pockets (the seven-pocket gate must
// fail closed on its own). Never give this shim real module stores.
const g = globalThis;

// window === globalThis (console = global scope semantics)
g.window = g;

// navigator (platform drives GoogleOS probing)
if (!g.navigator) {
  g.navigator = {
    platform: 'Win32',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) discord/1.0.9000 Chrome/120.0.0.0 Electron/28.0.0 Safari/537.36',
    languages: ['en-US', 'en'],
    language: 'en-US',
  };
}

// location: /channels/@me (the client "home")
g.location = {
  href: 'https://discord.com/channels/@me',
  origin: 'https://discord.com',
  protocol: 'https:',
  host: 'discord.com',
  hostname: 'discord.com',
  pathname: '/channels/@me',
  search: '', hash: '',
  reload() {}, assign() {}, replace() {},
};

// document stub: visible tab, inert nodes
const inertEl = () => ({
  style: {}, dataset: {}, classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
  setAttribute() {}, getAttribute() { return null; }, removeAttribute() {},
  appendChild() {}, removeChild() {}, addEventListener() {}, removeEventListener() {},
  querySelector() { return null; }, querySelectorAll() { return []; },
  focus() {}, blur() {}, click() {}, remove() {},
});
g.document = {
  hidden: false, visibilityState: 'visible', readyState: 'complete',
  addEventListener() {}, removeEventListener() {},
  querySelector() { return null; }, querySelectorAll() { return []; },
  getElementById() { return null; }, getElementsByTagName() { return []; },
  createElement: inertEl, createElementNS: inertEl,
  body: inertEl(), head: inertEl(), documentElement: inertEl(),
  cookie: '', title: 'Discord',
};

// events + input primitives
g.PointerEvent = g.PointerEvent || class PointerEvent { constructor(t, o = {}) { this.type = t; Object.assign(this, o); } };
g.CustomEvent = g.CustomEvent || class CustomEvent { constructor(t, o = {}) { this.type = t; this.detail = o.detail; } };
g.Event = g.Event || class Event { constructor(t) { this.type = t; } };
g.addEventListener = () => {};
g.removeEventListener = () => {};
g.dispatchEvent = () => true;

// misc browser surface
g.confirm = () => false;                 // end-of-run confirm must not block
g.alert = () => {}; g.prompt = () => null;
g.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 16);
g.cancelAnimationFrame = (id) => clearTimeout(id);
g.MutationObserver = g.MutationObserver || class { constructor() {} observe() {} disconnect() {} takeRecords() { return []; } };
g.localStorage = g.localStorage || { getItem: () => null, setItem() {}, removeItem() {}, clear() {}, key: () => null, length: 0 };
g.sessionStorage = g.sessionStorage || { getItem: () => null, setItem() {}, removeItem() {}, clear() {}, key: () => null, length: 0 };

export const shimReady = true;
