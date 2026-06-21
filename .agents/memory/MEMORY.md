# Índice de memória — VVLEADHUB

- [Node runtime requirement](node-runtime.md) — repo needs Node >=21 (currently 24); `node --test` glob in contracts test breaks on Node 20.
- [D-9 schema isolation](db-isolation.md) — each runtime connects with its own isolated role (DATABASE_URL_APP / DATABASE_URL_PAYLOAD); connecting as a superuser defeats D-9 even with roles.sql correct.
- [Next+Payload build needs --webpack](next-payload-build.md) — Turbopack hangs on the Payload admin build; admin build script must be `next build --webpack`.
- [payload run quebra no Node 24](payload-run-node24-tsx.md) — `payload run` quebra no Node 24 (tsx trata `node:` como arquivo); usar `node --import tsx/esm` + `--env-file`.
- [Auto-merge: docs sim, sensíveis não](pr-auto-merge-armar.md) — `main` sem required review (D-21): armar `--auto` em docs/código; **NUNCA** em caminhos sensíveis (contracts/.claude/AGENTS/infra) — esses ficam p/ merge manual do fundador.
- [Hook-wo-fence trava governança](wo-fence-edicao-governanca.md) — promover WO via Bash `mv` (`docs/tasks/` é deny ao Write-**novo**; Edit em WO existente é OK); editar superfície de governança exige WO promovido cobrindo a cerca.
- [Cerca do WO: heading sem número](wo-fence-allowlist-heading.md) — o hook só lê a cerca se o heading for exatamente `## Arquivos permitidos` (numerar zera a extração e bloqueia tudo); um token em backtick por linha; lê o WO **commitado**.
- [sed -i mangla markdown](sed-mangles-markdown.md) — um linter de fundo corrompe markdown escrito por `sed -i` (reposiciona backticks, dropa o `---` do frontmatter); use Write/Edit. `git add` antes salva a versão staged.
- [Commitlint: #N no corpo estoura footer](commitlint-hash-no-corpo.md) — `#N` no corpo do commit vira issue-ref → `footer-max-line-length`; use hash ou "PR N" e corpo em linhas curtas.
- [Ad Library via Chrome](ad-library-chrome-captura.md) — page_id sai da URL no typeahead; screenshot trava na grade de resultados (use `find`); landing leve p/ screenshot; permissão pendente bloqueia 300s.
- [Intel-competitiva: domínio mapeado](intel-competitiva-dominio-convergente.md) — WO-INTEL-001 passos C+D+D-25 FEITOS: Domain Map + léxico do intel + régua P1 (D-25: comercial vende, não cria). Pendente: rename Concorrente-Espaço→Espaço-Concorrente (doc-reconciler). Próximo: passo E (specs).
- [Worktree: caminho de escrita](worktree-write-path.md) — escrever via `C:\Github\VVLEADHUB\...` cai no main, não no worktree da sessão; use o caminho com prefixo do worktree p/ o trabalho entrar no branch/PR.
