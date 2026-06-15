---
name: Node runtime requirement
description: Why this repo needs Node >=21 (currently 24) — the contracts test's node --test glob breaks on Node 20
---

This monorepo must run on Node 24 (see `.nvmrc`).

**Why:** `packages/contracts` test script is `tsc && node --test "dist/**/*.test.js"`.
Glob expansion inside `node --test` only works on Node 21+. On Node 20 the test fails
with "Could not find .../dist/**/*.test.js", which breaks `pnpm verify` (the project's
mechanical DoD).

**How to apply:** keep `.nvmrc` at Node >=21 (currently 24); CI reads it via
`node-version-file`. `.npmrc` has `manage-package-manager-versions=false` so pnpm isn't
auto-swapped by the `packageManager` pin — CI stays deterministic via `pnpm/action-setup`.
