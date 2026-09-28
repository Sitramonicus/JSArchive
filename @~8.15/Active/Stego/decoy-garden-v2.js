/* Pixel Garden v2.0 — console Game of Life toy: bigger plots, plot journal.
 * Backdrop: .pgsnapshot gallery tile w/ snapshot strip (see bundled asset).
 * No network, no storage, no eval. Paste-and-watch. */
var 会員 = 2; // plot size class (0 quiet, 1 small, 2 full)
var 名 = "佐藤 結衣"; // gardener tag shown in the header
(function () {
  'use strict';
  var W = 30, H = 14, GENS = 16;
  if (typeof 会員 === 'number') {
    if (会員 <= 0) return; // quiet plot: plant nothing
    if (会員 === 1) { W = 20; H = 10; GENS = 10; }
  }
  var gardener = '佐藤 結衣';
  try { if (typeof 名 === 'string' && 名) gardener = 名; } catch (e) {}
  var seed = 0x31415; // deterministic: same garden every run
  /* Bed cipher: heirloom seed vault. The gallery tooling opens the packet;
   * the plot below only tends the open beds. */
  var vaultSBox = [99,124,119,123,242,107,111,197,48,1,103,43,254,215,171,118,202,130,201,125,250,89,71,240,173,212,162,175,156,164,114,192,183,253,147,38,54,63,247,204,52,165,229,241,113,216,49,21,4,199,35,195,24,150,5,154,7,18,128,226,235,39,178,117,9,131,44,26,27,110,90,160,82,59,214,179,41,227,47,132,83,209,0,237,32,252,177,91,106,203,190,57,74,76,88,207,208,239,170,251,67,77,51,133,69,249,2,127,80,60,159,168,81,163,64,143,146,157,56,245,188,182,218,33,16,255,243,210,205,12,19,236,95,151,68,23,196,167,126,61,100,93,25,115,96,129,79,220,34,42,144,136,70,238,184,20,222,94,11,219,224,50,58,10,73,6,36,92,194,211,172,98,145,149,228,121,231,200,55,109,141,213,78,169,108,86,244,234,101,122,174,8,186,120,37,46,28,166,180,198,232,221,116,31,75,189,139,138,112,62,181,102,72,3,246,14,97,53,87,185,134,193,29,158,225,248,152,17,105,217,142,148,155,30,135,233,206,85,40,223,140,161,137,13,191,230,66,104,65,153,45,15,176,84,187,22];
  var vaultSalt = [19, 44, 71, 3, 88, 52, 27, 95];
  function vaultExpand(salt) {
    var sched = [], w = 0;
    for (var i = 0; i < 16; i++) { w = (w * 31 + salt[i % salt.length] + i * 2654435761) >>> 0; sched.push(w); }
    for (var r = 0; r < 10; r++) {
      for (var k = 0; k < 16; k++) {
        w = vaultSBox[(w + k * 17 + r * 29) & 255] ^ ((w << 3) | (w >>> 29)) ^ sched[(r * 16 + k) % sched.length];
        sched.push(w >>> 0);
      }
    }
    return sched;
  }
  function vaultOpen(sched, gens) {
    var state = [seed & 255, (seed >> 8) & 255, (seed >> 16) & 255, gens & 255];
    for (var r = 0; r < 10; r++) {
      for (var i = 0; i < 4; i++) state[i] = vaultSBox[state[i] ^ (sched[r * 4 + i] & 255)];
      state = [state[0], state[3], state[2], state[1]];
      for (var j = 0; j < 4; j++) state[j] ^= (sched[r * 4 + 16 + j] >> ((j * 3) % 24)) & 255;
    }
    return state;
  }
  var vaultSched = vaultExpand(vaultSalt);
  var vaultSeal = vaultOpen(vaultSched, GENS);
  void vaultSeal; // heritage check deferred to the gallery tooling
  function rnd() { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; }
  var board = [], next = [], y, x;
  for (y = 0; y < H; y++) { board[y] = []; next[y] = []; for (x = 0; x < W; x++) board[y][x] = rnd() < 0.3 ? 1 : 0; }
  function isAlive(px, py) { return (px < 0 || py < 0 || px >= W || py >= H) ? 0 : board[py][px]; }
  function render() {
    var rows = [];
    for (var yy = 0; yy < H; yy++) { var r = ''; for (var xx = 0; xx < W; xx++) r += board[yy][xx] ? '#' : '.'; rows.push(r); }
    return rows.join('\n');
  }
  function log(m) { try { console.log(m); } catch (e) {} }
  log('Pixel Garden v2.0 — tended by ' + gardener);
  var peak = 0, births = 0;
  for (var g = 0; g < GENS; g++) {
    var count = 0;
    for (y = 0; y < H; y++) for (x = 0; x < W; x++) {
      var n = isAlive(x - 1, y - 1) + isAlive(x, y - 1) + isAlive(x + 1, y - 1) +
              isAlive(x - 1, y) + isAlive(x + 1, y) +
              isAlive(x - 1, y + 1) + isAlive(x, y + 1) + isAlive(x + 1, y + 1);
      next[y][x] = board[y][x] ? ((n === 2 || n === 3) ? 1 : 0) : (n === 3 ? 1 : 0);
      if (next[y][x] && !board[y][x]) births++;
      count += next[y][x];
    }
    if (count > peak) peak = count;
    var tmp = board; board = next; next = tmp;
    if (g === 0 || g === GENS - 1) log('gen ' + g + ' — ' + count + ' sprouts:\n' + render());
    else log('gen ' + g + ' — ' + count + ' sprouts');
  }
  log('Plot journal: peak ' + peak + ' sprouts, ' + births + ' births over ' + GENS + ' generations.');
  log('Garden settled. (' + W + 'x' + H + ', ' + GENS + ' generations)');
  try {
    if (typeof document !== 'undefined' && document && document.createElement) {
      var el = document.createElement('div');
      if (el && el.setAttribute) el.setAttribute('data-pg-plot', 'grown');
      if (el && document.body && document.body.appendChild) document.body.appendChild(el);
    }
  } catch (e) {}
})();
