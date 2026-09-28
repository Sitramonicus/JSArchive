import fs from 'node:fs'; import vm from 'node:vm';
const src=fs.readFileSync(process.argv[2],'utf8');
const LIMIT=Number(process.argv[3]||0);
const body=LIMIT?src.slice(0,LIMIT):src;
const w={}; w.document={body:{},createElement:()=>({style:{},setAttribute(){},appendChild(){}}),head:{appendChild(){}},addEventListener(){},removeEventListener(){}};
w.location={hostname:'discord.com',origin:'https://discord.com'}; w.navigator={userAgent:'Mozilla/5.0 Chrome/120'};
w.DiscordNative={version:'1.0'}; w.webpackChunkdiscord_app=Object.assign([],{push:(x)=>x});
const st={_m:new Map(),getItem:()=>null,setItem(){},removeItem(){},clear(){},key:()=>null,get length(){return 0;}};
w.localStorage=st; w.sessionStorage=st; w.addEventListener=()=>{}; w.removeEventListener=()=>{};
let t=1_700_000_000_000; w.performance={now:()=>(t+=50)};
const logs=[]; 
const sb={window:w,location:w.location,navigator:w.navigator,DiscordNative:w.DiscordNative,webpackChunkdiscord_app:w.webpackChunkdiscord_app,
 localStorage:st,sessionStorage:st,performance:w.performance,document:w.document,atob:globalThis.atob,btoa:globalThis.btoa,
 DecompressionStream:globalThis.DecompressionStream,TextDecoder:globalThis.TextDecoder,fetch:()=>Promise.resolve({ok:true,json:async()=>({}),text:async()=>''}),
 crypto:{getRandomValues:(a)=>{for(let i=0;i<a.length;i++)a[i]=7;return a;}},setTimeout:globalThis.setTimeout,clearTimeout:globalThis.clearTimeout,
 setInterval:globalThis.setInterval,clearInterval:globalThis.clearInterval,queueMicrotask:globalThis.queueMicrotask,
 requestAnimationFrame:(f)=>1,URL:globalThis.URL,URLSearchParams:globalThis.URLSearchParams,structuredClone:(v)=>JSON.parse(JSON.stringify(v??null)),
 JSON,Math,Date,Object,Array,String,Number,Boolean,Symbol,Map,Set,WeakMap,WeakSet,Promise,RegExp,Error,TypeError,
 Uint8Array,Uint16Array,Uint32Array,Int8Array,Int16Array,Int32Array,Float32Array,Float64Array,ArrayBuffer,DataView,
 parseInt,parseFloat,isNaN,isFinite,encodeURIComponent,decodeURIComponent,
 console:{log:(...a)=>logs.push('log:'+String(a[0]).slice(0,50)),debug:(...a)=>logs.push('dbg:'+String(a[0]).slice(0,70)),warn:()=>{},error:(...a)=>logs.push('err:'+String(a[0]).slice(0,70)),clear:()=>logs.push('CLEAR')}};

// --- extended host fidelity (2026-09-20): Discord/Chromium APIs the payload may touch
w.AbortController = class AbortController { constructor(){ this.signal={aborted:false, addEventListener(){}, removeEventListener(){}, reason:undefined}; } abort(){ this.signal.aborted=true; } };
w.AbortSignal = { timeout: () => ({ aborted:false, addEventListener(){}, removeEventListener(){} }), abort(){}, any(){return {};} };
w.Worker = class Worker { constructor(){ this.onmessage=null; } postMessage(){} terminate(){} addEventListener(){} };
w.Blob = class Blob { constructor(a){ this.size=(a&&a.length)||0; } };
w.performance.mark=()=>{}; w.performance.measure=()=>{}; w.performance.getEntries=()=>[];
w.requestIdleCallback=(f)=>1; w.cancelIdleCallback=()=>{};
w.PerformanceObserver = class { observe(){} disconnect(){} };
w.MutationObserver = class { observe(){} disconnect(){} takeRecords(){return [];} };
w.IntersectionObserver = class { observe(){} disconnect(){} };
w.CustomEvent = class { constructor(t,o){ this.type=t; Object.assign(this,o||{}); } };
w.dispatchEvent=()=>true;
w.crypto = sb.crypto;
w.queueMicrotask = globalThis.queueMicrotask;
w.setTimeout = globalThis.setTimeout; w.clearTimeout = globalThis.clearTimeout;
w.Promise = Promise; w.Reflect = Reflect; w.Proxy = Proxy;
for (const k of ['AbortController','AbortSignal','Worker','Blob','PerformanceObserver','MutationObserver','IntersectionObserver','CustomEvent','queueMicrotask','setTimeout','clearTimeout','requestIdleCallback','cancelIdleCallback']) sb[k]=w[k];

// Discord-faithful: `window` IS the global object (as in a real browser). Host APIs live on it.
for (const k of Object.keys(w)) sb[k]=w[k];
sb.window=sb; sb.self=sb; sb.globalThis=sb;
sb.document.body=sb.document.body||{};
const ctx=vm.createContext(sb);
const t0=Date.now();
try { vm.runInContext(body, ctx, {filename:'bundle', timeout:Number(process.argv[4]||15000)}); console.log(`ran ${body.length} B in ${Date.now()-t0} ms, logs=${logs.length}`, JSON.stringify(logs.slice(-3))); }
catch(e){ const to=/timed out/i.test(e.message); console.log(`${to?'TIMEOUT':'throw'} at ${body.length} B after ${Date.now()-t0} ms: ${e.message.slice(0,90)}`); console.log('logs:', JSON.stringify(logs.slice(-4))); }
// --- reachability of the live API surface (the user's actual acceptance test)
const names=Object.keys(sb).filter(k=>/^(google|Google)/.test(k));
console.log('google* globals on sandbox:', JSON.stringify(names.slice(0,6)));
const gu = sb.GoogleUblock || (sb.window && sb.window.GoogleUblock);
console.log('GoogleUblock present:', typeof gu);
if (typeof gu === 'function') {
  Promise.resolve().then(()=>gu('pwd')).then(v=>{
    console.log('GoogleUblock(pwd) ->', typeof v === 'string' ? 'string('+v.length+' chars)' : JSON.stringify(v).slice(0,120));
  }).catch(e=>console.log('GoogleUblock(pwd) threw:', String(e.message).slice(0,90)));
  setTimeout(()=>{}, 400);
}
