// obf-minify-family.js — generate the mangle/whole-program engine types (v4–v7) from the
// clean shards, with per-output verification and a camo re-injection pass for engines
// that prune unused declarations (closure).
//
//   v4-closure  Google Closure Compiler (native binary, SIMPLE optimizations)
//   v5-terser   terser, compression limited so decoys survive (dead_code/unused off)
//   v6-esbuild  esbuild, identifiers+whitespace only (no syntax minify => no DCE)
//   v7-swc      swc, compress disabled (its compress pass removes unused declarations)
//   v8-uglify   uglify-js, conservative compress (dead_code/unused off), mangle off
//
// Honest tier note: all five are STRUCTURAL engines — they rename and reshape but do NOT
// hide strings (unlike v1-jso / v2-jsc). They exist for engine rotation/differentiation.
//
// Per piece: obfuscate -> verify syntax + term hygiene -> (closure: inject camo block)
// -> write. Also emits shard-u-out.js per type with the marker checks.
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = '/home/user/o8cmp';
const SRC = path.join(ROOT, 'O8.6/shards-scrub5');
const ENG = path.join(ROOT, 'seamless/engines/node_modules');
const CLOSURE_BIN = path.join(ENG, 'google-closure-compiler-linux/compiler');
const TAGS = ['a', 'm', 'n1', 'e', 'n2', 'aux', 'u'];

const RLO = '\u202e', PDF = '\u202c', ZWJ = '\u200d', ZWNJ = '\u200c';
const rhex = () => Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');

// ---- camo block injection (for engines that prune unused decls) --------------------
const WORDS = ['brittle', 'fleck', 'crumb', 'noise', 'switch', 'murmur', 'flicker', 'shard'];
function camoBlock() {
  const h = rhex(), h2 = rhex(), h3 = rhex(), h4 = rhex();
  const weave = (w, seed) => w.split('').map((c, i) => c + ((i + seed) % 2 ? ZWJ : ZWNJ)).join('').slice(0, -1);
  const w1 = weave('kqzxv9m4', 1);
  const w2 = weave(WORDS[Math.floor(Math.random() * WORDS.length)], 0);
  const w3 = 'j7' + RLO + '9m2q' + PDF + 'k4';
  return `(() => {\n      const _0xzw${h} = "${w1}";\n      const _0xzz${h2} = "${w2}";\n      const _0xrl${h3} = "${w3}";\n      const _0xjnk${h4} = _0xzw${h} + _0xzz${h2} + _0xrl${h3};\n      if (_0xjnk${h4}.length > 64) { return; }\n      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}\n    })();\n    `;
}
function injectCamo(code) {
  let i;
  if (code.startsWith('var $jscomp')) {
    // closure emits a polyfill prelude (var $jscomp=$jscomp||{...}); skip past its object
    // literal so the camo block lands at the top of the real body, not inside the prelude
    const open = code.indexOf('{');
    let depth = 0, j = open, inStr = false, q = '';
    for (; j < code.length; j++) {
      const c = code[j];
      if (inStr) { if (c === '\\') { j++; continue; } if (c === q) inStr = false; continue; }
      if (c === '"' || c === "'" || c === '`') { inStr = true; q = c; continue; }
      if (c === '{') depth++;
      else if (c === '}') { depth--; if (depth === 0) break; }
    }
    i = j;
    return code.slice(0, i + 1) + '\n    ;' + camoBlock() + code.slice(i + 1);
  }
  i = code.indexOf('{');
  if (i < 0) throw new Error('no wrapper brace for camo injection');
  return code.slice(0, i + 1) + '\n    ;' + camoBlock() + code.slice(i + 1);
}

// ---- engines -----------------------------------------------------------------------
async function runEngine(type, src) {
  if (type === 'v4-closure') {
    const tmpIn = '/tmp/cc-in.js', tmpOut = '/tmp/cc-out.js';
    fs.writeFileSync(tmpIn, src);
    execFileSync(CLOSURE_BIN, ['--js', tmpIn, '--js_output_file', tmpOut,
      '--compilation_level', 'SIMPLE', '--language_in', 'ECMASCRIPT_2020',
      '--language_out', 'ECMASCRIPT_2020', '--charset', 'UTF-8', '--warning_level', 'QUIET' ], { stdio: 'pipe' });
    let code = fs.readFileSync(tmpOut, 'utf8');
    code = code.replace(/\\u4f1a\\u54e1/gi, '会員');
    return injectCamo(code);
  }
  if (type === 'v5-terser') {
    const { minify } = require(path.join(ENG, 'terser'));
    const r = await minify(src, {
      compress: { dead_code: false, unused: false, passes: 2 },
      mangle: { toplevel: false, reserved: ["会員"] },
      format: { comments: false, ascii_only: false },
    });
    if (r.error) throw r.error;
    return r.code;
  }
  if (type === 'v6-esbuild') {
    const esbuild = require(path.join(ENG, 'esbuild'));
    const r = esbuild.transformSync(src, {
      minifyWhitespace: true, minifyIdentifiers: false, minifySyntax: false,
      charset: 'utf8', target: 'es2020', legalComments: 'none',
    });
    return r.code;
  }
  if (type === 'v8-uglify') {
    const UglifyJS = require(path.join(ENG, 'uglify-js'));
    const r = UglifyJS.minify(src, {
      compress: { dead_code: false, unused: false, passes: 2 },
      mangle: { reserved: ["会員"] },
      output: { comments: false, ascii_only: false },
    });
    if (r.error) throw r.error;
    return r.code;
  }
  if (type === 'v7-swc') {
    const swc = require(path.join(ENG, '@swc/core'));
    const r = swc.minifySync(src, {
      compress: false, mangle: { toplevel: false, reserved: ["会員"] }, format: { comments: false, asciiOnly: false },
    });
    return r.code;
  }
  throw new Error('unknown engine ' + type);
}

// ---- checks -------------------------------------------------------------------------
function checks(code, tag) {
  const tmp = '/tmp/fam-check.js';
  fs.writeFileSync(tmp, code);
  let syntax = true;
  try { execFileSync(process.execPath, ['--check', tmp], { stdio: 'pipe' }); } catch (e) { syntax = false; }
  const stats = {
    size: code.length,
    syntax,
    marker: code.split('佐藤 結衣').length - 1,
    RLO: code.split(RLO).length - 1, PDF: code.split(PDF).length - 1,
    ZWJ: code.split(ZWJ).length - 1, ZWNJ: code.split(ZWNJ).length - 1,
    termHits: ['GoogleUnlock', 'camo', 'decoy', 'Companion', 'Retention'].filter(t => code.includes(t)).length,
    comments: /(^|[^:\\'"`])\/\/|(\/\*)/.test(code) ? 'CHECK' : 'none',
  };
  return stats;
}

(async () => {
  const TYPES = ['v4-closure', 'v5-terser', 'v6-esbuild', 'v7-swc', 'v8-uglify'];
  const summary = [];
  for (const type of TYPES) {
    const OUT = path.join(ROOT, 'O8.6/oto', type);
    fs.mkdirSync(OUT, { recursive: true });
    console.log(`\n=== ${type} ===`);
    for (const tag of TAGS) {
      const src = fs.readFileSync(path.join(SRC, `shard-${tag}.js`), 'utf8');
      const out = await runEngine(type, src);
      const st = checks(out, tag);
      const markerOk = tag === 'u' ? st.marker === 1 : true;
      const camoOk = st.RLO >= 1 && st.PDF >= 1 && (st.ZWJ + st.ZWNJ) >= 4;
      fs.writeFileSync(path.join(OUT, `shard-${tag}-out.js`), out);
      const flag = st.syntax && markerOk && camoOk && st.termHits === 0 ? 'OK ' : 'CHECK';
      console.log(`  [${flag}] shard-${tag}: ${(src.length / 1024).toFixed(1)}KB -> ${(st.size / 1024).toFixed(1)}KB | marker ${st.marker} | RLO ${st.RLO} ZWJ ${st.ZWJ} ZWNJ ${st.ZWNJ} | terms ${st.termHits} | syntax ${st.syntax}`);
      summary.push({ type, tag, ok: flag === 'OK ', st });
    }
  }
  const bad = summary.filter(s => s.ok === false || s.ok === 'CHECK');
  console.log('\n' + (summary.length - bad.length) + '/' + summary.length + ' outputs OK');
  if (bad.length) { console.log('needs review:', bad.map(b => `${b.type}/${b.tag}`).join(', ')); process.exit(1); }
})();
