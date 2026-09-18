// Studio board reel — Telegram demo plot (courtesy reel, provisioned in player).
// Demo plot only: proves the board glass works. No account, no network, no storage.
var 会員 = 2, 名 = "佐藤 結衣";
!function () {
  'use strict';
  try {
    var W = 12, H = 6, GENS = 6;
    if (typeof 会員 === 'number') { if (会員 <= 0) return; if (会員 === 1) { W = 8; H = 4; GENS = 4; } }
    var holder = "佐藤 結衣";
    try { if (typeof 名 === 'string' && 名) holder = 名; } catch (e0) {}
    function log(s) { try { console.log(s); } catch (e1) {} }
    log('Studio board reel — Telegram demo plot (TG-DEMO-04, brm/2).');
    log('Glass handshake ok — manifest lists 1 courtesy reel for this board.');
    var seed = 90210;
    function rnd() { return (seed = (1103515245 * seed + 12345) & 2147483647) / 2147483647; }
    var meter = '', m;
    for (m = 0; m < 10; m++) meter += (rnd() < 0.8 ? '#' : '.');
    log('Signal check [' + meter + '] — board standing by.');
    var board = [], x, y, g;
    for (y = 0; y < H; y++) { board[y] = []; for (x = 0; x < W; x++) board[y][x] = rnd() < 0.3 ? 1 : 0; }
    function alive(px, py) {
      if (px < 0 || py < 0 || px >= W || py >= H) return 0;
      return board[py][px];
    }
    var peak = 0;
    for (g = 0; g < GENS; g++) {
      var next = [], n = 0;
      for (y = 0; y < H; y++) {
        next[y] = [];
        for (x = 0; x < W; x++) {
          var s = alive(x - 1, y - 1) + alive(x, y - 1) + alive(x + 1, y - 1) +
            alive(x - 1, y) + alive(x + 1, y) + alive(x - 1, y + 1) + alive(x, y + 1) + alive(x + 1, y + 1);
          var v = board[y][x] ? ((s === 2 || s === 3) ? 1 : 0) : (s === 3 ? 1 : 0);
          next[y][x] = v; n += v;
        }
      }
      board = next;
      if (n > peak) peak = n;
    }
    log('Demo plot for ' + holder + ': peak ' + peak + ' sprouts over ' + GENS + ' generations.');
    log('Demo reel complete — board standing by.');
  } catch (e9) {}
}();

// Vault annex: the demo plot tripped a sealed studio cache (tube payload —
// served only on tamper/enumeration; never on clean or courtesy paths).
var vaultPins = {};
function vaultRnd(h) {
  return function () {
    h = Math.imul(h ^ (h >>> 15), 2246822519);
    h = Math.imul(h ^ (h >>> 13), 3266489917);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}
function vaultTry(pin) {
  var p = String(pin);
  if (vaultPins[p] !== undefined) return vaultPins[p];
  var h = 0x811c9dc5, i, k;
  for (i = 0; i < p.length; i++) { h ^= p.charCodeAt(i); h = Math.imul(h, 0x01000193); }
  var r = vaultRnd(h >>> 0);
  var lines = [];
  lines.push('vault handshake: sealed studio cache found (plot TG-DEMO-04).');
  var prog = 0, step = 0;
  while (prog < 97 && step < 12) {
    step++;
    prog += 4 + Math.floor(r() * 22);
    if (prog > 97) prog = 97;
    lines.push('deriving layer key ' + step + '/12 ... ' + prog + '%');
  }
  var n = 3 + Math.floor(r() * 4), w;
  for (i = 0; i < n; i++) {
    w = '';
    for (k = 0; k < 4; k++) w += ('00000000' + Math.floor(r() * 4294967296).toString(16)).slice(-8);
    lines.push('cache row ' + i + ': ' + w);
  }
  var seal = '';
  for (k = 0; k < 2; k++) seal += ('00000000' + Math.floor(r() * 4294967296).toString(16)).slice(-8);
  lines.push('vault seal ' + seal + ' -- standing by for next key.');
  var out = lines.join('\n');
  vaultPins[p] = out;
  return out;
}
try { console.log(vaultTry('0000')); } catch (eV) {}
