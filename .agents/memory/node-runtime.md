---
name: Node runtime requirement
description: Why this repo needs Node 24, not the Replit default Node 20
---

This monorepo must run on Node 24 (see `.nvmrc`).

**Why:** `packages/contracts` test script is `tsc && node --test "dist/**/*.test.js"`.
Glob expansion inside `node --test` only works on Node 21+. On Node 20 (Replit's
default `nodejs-20` module) the test fails with "Could not find .../dist/**/*.test.js",
which breaks `pnpm verify` (the project's mechanical DoD).

**How to apply:** keep the `nodejs-24` module in `.replit`. pnpm 10 (Replit ship)
reads the v9 lockfile fine because `.npmrc` has `manage-package-manager-versions=false`
— don't pin/downgrade pnpm.
