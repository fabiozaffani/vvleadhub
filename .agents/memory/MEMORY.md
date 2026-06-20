# Índice de memória — VVLEADHUB

- [Node runtime requirement](node-runtime.md) — repo needs Node >=21 (currently 24); `node --test` glob in contracts test breaks on Node 20.
- [D-9 schema isolation](db-isolation.md) — each runtime connects with its own isolated role (DATABASE_URL_APP / DATABASE_URL_PAYLOAD); connecting as a superuser defeats D-9 even with roles.sql correct.
- [Next+Payload build needs --webpack](next-payload-build.md) — Turbopack hangs on the Payload admin build; admin build script must be `next build --webpack`.
- [payload run quebra no Node 24](payload-run-node24-tsx.md) — `payload run` quebra no Node 24 (tsx trata `node:` como arquivo); usar `node --import tsx/esm` + `--env-file`.
- [Auto-merge não arma sozinho](pr-auto-merge-armar.md) — abrir todo PR já com `gh pr merge <n> --auto --squash --delete-branch`; branch protection exige armar explícito.
- [Hook-wo-fence trava governança](wo-fence-edicao-governanca.md) — promover WO via Bash (`docs/tasks/` é deny ao Edit); editar superfície de governança exige WO promovido cobrindo a cerca.
- [Commitlint: #N no corpo estoura footer](commitlint-hash-no-corpo.md) — `#N` no corpo do commit vira issue-ref → `footer-max-line-length`; use hash ou "PR N" e corpo em linhas curtas.
- [Ad Library via Chrome](ad-library-chrome-captura.md) — page_id sai da URL no typeahead; screenshot trava na grade de resultados (use `find`); landing leve p/ screenshot; permissão pendente bloqueia 300s.
