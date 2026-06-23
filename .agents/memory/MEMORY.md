# Índice de memória — VVLEADHUB

- [Node runtime requirement](node-runtime.md) — repo needs Node >=21 (currently 24); `node --test` glob in contracts test breaks on Node 20.
- [D-9 schema isolation](db-isolation.md) — each runtime connects with its own isolated role (DATABASE_URL_APP / DATABASE_URL_PAYLOAD); connecting as a superuser defeats D-9 even with roles.sql correct.
- [Next+Payload build needs --webpack](next-payload-build.md) — Turbopack hangs on the Payload admin build; admin build script must be `next build --webpack`.
- [payload run quebra no Node 24](payload-run-node24-tsx.md) — `payload run` quebra no Node 24 (tsx trata `node:` como arquivo); usar `node --import tsx/esm` + `--env-file`.
- [Auto-merge: docs sim, sensíveis não](pr-auto-merge-armar.md) — `main` sem required review (D-21): armar `--auto` em docs/código; **NUNCA** em caminhos sensíveis (contracts/.claude/AGENTS/infra) — esses ficam p/ merge manual do fundador.
- [Commitlint: #N no corpo estoura footer](commitlint-hash-no-corpo.md) — `#N` no corpo do commit vira issue-ref → `footer-max-line-length`; use hash ou "PR N" e corpo em linhas curtas.
- [Ad Library via Chrome](ad-library-chrome-captura.md) — page_id sai da URL no typeahead; screenshot trava na grade de resultados (use `find`); landing leve p/ screenshot; permissão pendente bloqueia 300s.
- [Intel-competitiva: domínio mapeado](intel-competitiva-dominio-convergente.md) — WO-INTEL-001 passos C+D+D-25 FEITOS: Domain Map + léxico do intel + régua P1 (D-25: comercial vende, não cria). Rename Concorrente-Espaço→Espaço-Concorrente aplicado (doc-reconciler). Próximo: passo E (specs).
- [git sync limpa branch órfão](git-sync-branches-orfaos.md) — branch local "divergente" pós-squash-merge agora podado **automaticamente** no SessionStart (WO-CORE-024, `hook-session-sync.sh` VV-wide); alias `git sync` é o fallback manual. **Gotcha:** cópia derivada suja perene (`.cursor/rules/00-canon-vvf.mdc` sem commit) mantém a árvore suja e rebloqueia a poda — órfão "volta" toda sessão; fix = commitar a cópia.

- [WO done exige veredito no commit da cerca](wo-done-verdict-same-commit.md) — gate D-4: WO high-stakes→`done` precisa de `review:pass` + `reviewed_sha` (hash da cerca **staged**) no **mesmo commit** da cerca; commitar o canon separado → flip pra `done` **bloqueado** (VVLEADHUB bloqueia, vvcore advisory). Fix: `reset --soft` + `vv_fence_sha` + commitar junto.

> Gotchas de harness VV-wide (cerca do wo-fence, promoção de WO, `sed`/markdown, worktree write-path) foram **promovidos ao canon** `ARQUITETURA-IA` (§3/§5.4/§6.5, WO-CORE-025) e chegam por `@import` — não duplicar aqui.
