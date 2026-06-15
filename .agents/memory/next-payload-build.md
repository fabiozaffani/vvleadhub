---
name: Next 16 + Payload production build needs --webpack
description: Turbopack hangs on the Payload admin build; admin build script must be next build --webpack
---

`next build` (Next 16, default = Turbopack) hangs/crash-loops at the `compile` stage on the
Payload admin (`@payloadcms/next` + `db-postgres` + lexical): stuck at "Creating an
optimized production build ...", ~0% CPU, `.next` never grows, dies with **no error** and
free RAM (not OOM). `next build --webpack` compiles cleanly in ~30–60s.

**Rule:** the admin `build` script must be `next build --webpack`. Don't switch back to
Turbopack for the production build without re-testing the full compile. (Also recorded in
`docs/09` — incompatibilidade Turbopack×Payload.)

**How to apply:** on a future Next/Payload upgrade, re-test plain `next build`; only drop
`--webpack` once it compiles to completion.
