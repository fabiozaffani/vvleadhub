# .agents/memory — memória do agente (versionada)

Conhecimento durável e **específico deste repo**, versionado em git (viaja com o repo, vale
em qualquer máquina e em qualquer agente). É a **store única** de auto-memória do projeto: o
Claude Code aponta `autoMemoryDirectory` para cá (via `.claude/settings.local.json`, caminho
absoluto **por máquina** — escrito pelo `setup-links.sh` do vvcore), então o agente **drafta
sozinho** aqui durante o trabalho, em formato nativo.

Por que `.agents/` e não `.claude/`: a pasta é **tool-neutral** — qualquer agente lê (o
Claude via `autoMemoryDirectory`; Cursor/Codex via referência no `AGENTS.md` / `.cursor/rules`).

## Modelo: rascunho → promoção

1. **rascunho** — o agente grava aqui assim que um fato se mostra durável (gotcha técnico,
   convenção, decisão). Escrita livre, baixa curadoria. **A localização é o status:** tudo o
   que está nesta pasta É rascunho.
2. **promovido** — quando o fato se confirma, é promovido para a doc permanente e o rascunho
   aqui é removido:
   - específico do repo → `AGENTS.md` (conduta) ou `docs/`;
   - **VV-wide** (vale em todo repo VV) → **vvcore** (`@import` em todo projeto).
3. **obsoleto** — fato superado pelo HEAD: remover (não deixar memória stale).

A fonte de verdade de conduta continua sendo o `AGENTS.md`; esta pasta é o caderno de campo
que o alimenta, não o substitui.

## Formato

O auto-writer nativo usa `name` / `description` / `metadata.type` (`project` | `reference` |
`user`). **Não** dependa de campos extras (`status`/`verified`) — não são aplicados
automaticamente; a localização já é o status. Arquivos antigos podem tê-los; tudo bem.

## Notas operacionais

- **Versionada (Path 2):** commitar os rascunhos. Várias máquinas escrevendo podem gerar
  conflito de merge no `MEMORY.md` (volume baixo = trivial de resolver à mão).
- `settings.local.json` (onde mora o `autoMemoryDirectory`, caminho absoluto por máquina) é
  **gitignored** — nunca versionar.
- Memória `user` (sobre a pessoa) e `reference` cross-repo **não** moram aqui — vão pro
  user-global ou pro vvcore.
