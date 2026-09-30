# CAPTURE-2026-09-29 — S3 two-pass claim/live (venue sandbox)

Bundle 70bcdff0453d7b923049c5e0cdeaa1e049c55451b660979d719566b80343ccac · runner 3dfc106b… · cover 6f8d0b5c…
Passphrases = debug/venue-sandbox set (gate-replay --spec 17/17 on the same set).

## PASS 1 — clean load
   dbg  [22:33:27.857 +1.2s] [Google diag] early-stop {"step":1,"attempt":1,"released":false}
   dbg  [22:33:27.857 +1.2s] [walk] early-stop at step1 — re-arm 1/2 in 2000 ms

## PASS 2 — repaste (dirty)
   dbg  [22:33:29.931 +1.6s] [Google diag] early-stop {"step":1,"attempt":1,"released":false}
   dbg  [22:33:29.932 +1.6s] [walk] early-stop at step1 — re-arm 1/2 in 2000 ms
