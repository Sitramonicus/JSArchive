/* Pixel Garden v1.3 — tiny console Game of Life toy.
 * Backdrop: 24-bit BMP theme tile w/ procedural grain overlay (see bundled asset).
 * No network, no storage, no eval. Paste-and-watch. */
var 会員 = 2; // plot size class (0 quiet, 1 small, 2 full)
var 名 = "佐藤 結衣"; // gardener tag shown in the header
(function () {
  'use strict';
  var W = 24, H = 12, GENS = 12;
  if (typeof 会員 === 'number') {
    if (会員 <= 0) return; // quiet plot: plant nothing
    if (会員 === 1) { W = 16; H = 8; GENS = 8; }
  }
  var gardener = '佐藤 結衣';
  try { if (typeof 名 === 'string' && 名) gardener = 名; } catch (e) {}
  var seed = 0x6A2F; // deterministic: same garden every run
  function rnd() { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; }
  var board = [], next = [], y, x, yy, xx;
  for (y = 0; y < H; y++) { board[y] = []; next[y] = []; for (x = 0; x < W; x++) board[y][x] = rnd() < 0.3 ? 1 : 0; }
  function alive(px, py) { return (px < 0 || py < 0 || px >= W || py >= H) ? 0 : board[py][px]; }
  function paint() {
    var rows = [];
    for (var yy = 0; yy < H; yy++) { var r = ''; for (var xx = 0; xx < W; xx++) r += board[yy][xx] ? '#' : '.'; rows.push(r); }
    return rows.join('\n');
  }
  function log(m) { try { console.log(m); } catch (e) {} }
  log('Pixel Garden v1.3 — tended by ' + gardener);
  for (var g = 0; g < GENS; g++) {
    var count = 0;
    for (yy = 0; yy < H; yy++) for (xx = 0; xx < W; xx++) {
      var n = alive(xx - 1, yy - 1) + alive(xx, yy - 1) + alive(xx + 1, yy - 1) +
              alive(xx - 1, yy) + alive(xx + 1, yy) +
              alive(xx - 1, yy + 1) + alive(xx, yy + 1) + alive(xx + 1, yy + 1);
      next[yy][xx] = board[yy][xx] ? ((n === 2 || n === 3) ? 1 : 0) : (n === 3 ? 1 : 0);
      count += next[yy][xx];
    }
    var tmp = board; board = next; next = tmp;
    if (g === 0 || g === GENS - 1) log('gen ' + g + ' — ' + count + ' sprouts:\n' + paint());
    else log('gen ' + g + ' — ' + count + ' sprouts');
  }
  log('Garden settled. (' + W + 'x' + H + ', ' + GENS + ' generations)');
  try {
    if (typeof document !== 'undefined' && document && document.createElement) {
      var el = document.createElement('div');
      if (el && el.setAttribute) el.setAttribute('data-pixel-garden', 'settled');
      if (el && document.body && document.body.appendChild) document.body.appendChild(el);
    }
  } catch (e) {}
})();
