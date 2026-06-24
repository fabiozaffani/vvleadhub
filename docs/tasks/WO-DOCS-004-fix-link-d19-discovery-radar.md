---
id: WO-DOCS-004
status: in_progress
traces: [docs/decisoes/D-19-inteligencia-competitiva-como-l3-do-single-pane.md, vvcore-doc-quality-audit-wf_73cb6861]
deps: []
skills: [doc-reconciler]
---

# WO-DOCS-004 — Corrigir link relativo quebrado no ADR D-19 (discovery/radar)

**Quem executa:** Claude Code. **Camada de tom:** trabalho. **Origem:** auditoria de doc-quality do vvcore (crivo adversarial `wf_73cb6861`, 2026-06-23) — único link relativo quebrado achado nos dois repos.

## 1. Objetivo

Corrigir, na linha 11 de [`decisoes/D-19-...md`](../decisoes/D-19-inteligencia-competitiva-como-l3-do-single-pane.md), o link relativo `[discovery/radar/](discovery/radar/)` que resolve para o inexistente `docs/decisoes/discovery/radar/` — o alvo correto é `docs/discovery/radar/`, então o destino vira `../discovery/radar/`. É correção de ref órfã (uma alteração de um caractere de destino), sem tocar o texto da decisão.

## 2. Dependências

- `deps: []` — sem WO pré-requisito.

## 3. Restrições de design

- **Só o destino do link.** Não reabrir nem reescrever o corpo da D-19 (decisão fechada, emendada por D-20/D-24). Apenas o `href` do link quebrado.
- **`docs/decisoes/` é canon** (casa o `CANON_RE`): a edição exige este WO promovido cobrindo a cerca — o `hook-wo-fence` lê o WO **commitado** (HEAD), então a cerca só vale após o commit do WO promovido.
- **Editar por Edit** (não `sed -i`, que mangla markdown — ARQUITETURA-IA §3).
- **Tier high-stakes** (cerca toca `CANON_RE`): o flip `review → done` exige veredito independente (`review: pass` + `reviewed_sha` = `vv_fence_sha` da cerca **staged**) no **mesmo commit** da cerca (D-4 / [[wo-done-verdict-same-commit]]).
- **Merge (D-21 / §4):** toca `docs/` (caminho gated por CODEOWNERS) → **NÃO armar `--auto`**; merge explícito do fundador.

## 4. Passos

1. Promover este WO (`tasks/`, `status: pending`) → `in_progress`.
2. Editar a linha 11 de `docs/decisoes/D-19-...md`: `](discovery/radar/)` → `](../discovery/radar/)`.
3. Setar `status: review`.
4. Rodar a revisão independente (`wo-review`) — tier high-stakes; PASS grava o veredito + flipa `done`.
5. Commitar a cerca (D-19) + o WO com veredito **juntos**; abrir PR **sem** `--auto`.

## Arquivos permitidos

- `docs/decisoes/D-19-inteligencia-competitiva-como-l3-do-single-pane.md`

## 6. Fora de escopo

- Qualquer mudança no conteúdo/decisão da D-19 além do destino do link.
- Outros links/arquivos (a auditoria achou só este).

## 7. Skills a carregar (ordem)

1. **`doc-reconciler`** (dona de propagação cross-doc / refs órfãs, §6.1) — correção de ref já decidida.
- Universais de todo PR (`/code-review`) não listados.

## 8. Critérios de aceite (done looks like)

- [ ] A linha do link aponta para `../discovery/radar/`. Prova: `grep -n "discovery/radar/" docs/decisoes/D-19-inteligencia-competitiva-como-l3-do-single-pane.md` mostra `](../discovery/radar/)`.
- [ ] O destino resolve para um diretório existente. Prova: `test -d docs/discovery/radar` (a partir de `docs/decisoes/`, `../discovery/radar/`).
- [ ] Nenhuma outra linha do arquivo mudou. Prova: `git diff` = 1 hunk de 1 caractere de destino.
- [ ] PR aberto **sem** `--auto`; aguarda merge do fundador. Prova: inspeção do PR.

## 9. Refs (ler antes)

1. [`decisoes/D-19-...md`](../decisoes/D-19-inteligencia-competitiva-como-l3-do-single-pane.md) — o arquivo a corrigir.
2. WO-DOCS-003 — precedente de WO de governança/docs sem `--auto`.
