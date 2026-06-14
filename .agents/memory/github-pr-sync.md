---
name: GitHub PR sync from the isolated Replit env
description: How to turn a session's local work into GitHub PRs when the platform git UI fails to authenticate.
---

# Syncing session work to GitHub PRs from inside the isolated env

The Replit platform manages version control of the workspace (`.git` remotes `main-repl` =
git+ssh to the workspace, and `gitsafe-backup`). Pushing to the **GitHub `origin`** is a
*separate* remote and does not touch those — but the platform's own Git/GitHub UI push
fails with `UNAUTHENTICATED` (the token isn't wired into platform git).

**Why this matters:** every session's work lands on the local `main` as platform
checkpoint commits, but governance (D-16) requires branch + PR per work-order. So each
session you need a way to publish branches/PRs to GitHub yourself.

## What works
- The `GITHUB_TOKEN` secret (classic PAT, `repo` scope) **is** present in the env, and the
  `gh` CLI is installed. The platform UI doesn't use them, but you can.

## How to apply (proven pattern)
1. **Never touch the workspace `.git`.** Do all git orchestration in an isolated clone in
   `/tmp` so platform checkpoints aren't disturbed.
2. Auth without persisting the token: a `GIT_ASKPASS` script that echoes `x-access-token`
   for Username and `$GITHUB_TOKEN` for Password (remote URL stays tokenless). For `gh`,
   pass `GH_TOKEN="$GITHUB_TOKEN"` inline. Never echo the token.
3. Create branches **from `origin/<base>`** and **copy the work-order's files from the
   workspace working tree** (= local HEAD) into them — do NOT rebase the checkpoint commits.
   Any file you don't copy keeps the origin version (origin wins, e.g. `replit.md`).
4. **`rsync` is NOT installed** in the shell. Use `tar -C <src> --exclude=... -cf - <dir> | tar -C <dst> -xf -`,
   `cp`, and `diff -rq` (an `rsync` call silently produced a false empty diff — trust `diff -rq`).
5. **Verify in the WORKSPACE**, not the clone (workspace has `node_modules` + Node 24).
   Full `pnpm verify` (typecheck·lint·boundaries·test·build) ran ~100s — fits under the
   120s bash cap at current repo size, so no workflow needed for the build. `boundaries`
   emits orphan **warnings** (page entrypoints) but exits 0.
6. The admin `next build` writes `admin/.next`, shared with the running Admin dev server —
   restart `Admin` (and `Site`) workflows after building to keep the preview clean.
7. Push all branches first, then `gh pr create` with stacked bases (each PR's base = the
   previous branch). Never push/force `origin/main`.
