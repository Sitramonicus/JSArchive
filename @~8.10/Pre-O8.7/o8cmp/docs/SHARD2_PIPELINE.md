O8.5-Shard-2 canonical pipeline (supersedes the pre-sharding experiment):
1. /tmp/o843-base.js          (final O.8.4.3 single-scope template)
2. python3 dyn-lex-o85.py      -> /tmp/o85dyn-base.js   (per-call dynamic lexicon)
3. node juggler-metamorph-generator.js --template /tmp/o85dyn-base.js \
       --suite O.8.5-Shard-2 --seed 9a9c42ca --out /tmp/o85core.js
4. python3 shardify-o85.py     -> O8.5-Shard-2.js + shard-out2/shard-*.js

KEY LESSON (why generate-then-shard): the generator performs region surgery
(cutRegion around the Juggler decode markers, replaceDecoys strip/re-emit of the
aux block, applyHead banner rewrite). Feeding it a PRE-sharded template breaks
wrapper/scope isolation (observed: wrappers merged, Log aliasing lost). Sharding
the INSTANCE afterwards at top-level statement seams is deterministic and safe:
the quest engine is one continuous async IIFE so it stays one wrapper; balance
comes from intra-shard noise + camo wrappers + wrapped decoys (engine 41% of the
file vs 82% in Shard-1), no standalone decoy shard, no seam banners.
