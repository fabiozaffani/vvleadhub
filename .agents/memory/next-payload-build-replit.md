---
name: Next 16 + Payload production build on Replit
description: Why admin build uses --webpack, and why long builds must run as a workflow not a detached bash process
---

# Next 16 Turbopack production build hangs on the Payload admin stack

`next build` (Next 16, default = Turbopack) hangs/crash-loops at the `compile`
stage on the Payload 3.85 admin (`@payloadcms/next` + `db-postgres` + lexical).
Symptoms: stuck at "Creating an optimized production build ...", ~0% CPU,
`.next` never grows, process eventually dies with **no error** and plenty of free
RAM (so it is NOT OOM). `next build --webpack` compiles cleanly in ~30–60s.

**Rule:** admin `build` script must be `next build --webpack`. Do not switch back
to Turbopack for the production build without re-testing the full compile.
**Why:** restoring `pnpm verify` green (DoD) required a stable build path; Turbopack
build was the only failing step.
**How to apply:** if a future Next/Payload upgrade is done, re-test plain
`next build`; only drop `--webpack` once it compiles to completion.

# Long builds must run as a Replit workflow, not a detached bash process

A `next build` of the admin takes well over the 2-min bash tool limit. Running it
detached from a bash tool call (`setsid ... &` / `nohup`) is unreliable — the
process gets reaped after the tool call's session ends, dying mid-compile with no
error. Broad `pkill -f "next ..."` from a bash call also tends to SIGKILL the
caller's own shell (exit 137).

**Rule:** to run a >2-min one-off (build/verify), configure a temporary `console`
workflow (`configureWorkflow`), poll `getWorkflowStatus` until `state==="finished"`,
read its output, then `removeWorkflow`. The admin `next build` and `next dev` also
contend on the same `.next` dir — stop the Admin dev workflow before building.
**Why:** platform-managed workflows survive across tool calls; detached bash
children do not.
