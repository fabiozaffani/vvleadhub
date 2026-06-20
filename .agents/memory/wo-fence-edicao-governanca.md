---
name: wo-fence-edicao-governanca
description: "editar superfície de governança / promover WO esbarra no hook-wo-fence — use Bash para docs/tasks/, e tenha um WO promovido cobrindo a cerca antes do Edit."
metadata: 
  node_type: memory
  type: project
  originSessionId: 2c6c3e14-d4f9-4386-b158-8face9edc41c
---

O `hook-wo-fence.sh` (PreToolUse `Edit|Write|MultiEdit`) **bloqueia** (deny) em dois casos que aparecem na prática ao mexer em governança:

- **Escrita em `docs/tasks/`** → promover um WO (mover o draft de `docs/tasks-drafts/` para `docs/tasks/` + virar `status: pending`) faz-se via **Bash** (`mv` + `sed`), **não** via Edit/Write. `docs/tasks-drafts/` é livre (é o rascunho).
- **Mutação de artefato canônico** (`AGENTS.md`, `.github/CODEOWNERS`, `.cursor/rules/*`, `docs/`) **sem um WO promovido** (`pending`/`in_progress`) cuja cerca ("Arquivos permitidos") cubra aquele arquivo. Promova o WO **antes** de editar a cerca, senão o Edit é negado.

Carregar a skill dona (`sync-governanca`) **não basta** para o hook — ele detecta **cobertura-de-WO + caminho**, não skill carregada; por isso essa parte sai só como **aviso**, e o **bloqueio** real é WO+caminho. É fail-open (node/git ausente → permite).

Ordem que funcionou no WO-CORE-002 (#44): draftar WO em `tasks-drafts/` → **promover via Bash** (`mv` + `sed 's/status: draft/status: pending/'`) → editar a cerca (Edit já permitido) → commit. O pre-commit `validate-wo` exige `deps`/`skills` no frontmatter. Ver [[pr-auto-merge-armar]].

**Gotcha do parser da cerca (custou um deny):** o header da seção tem de ser **exatamente** `## Arquivos permitidos` — `_canon-lib.sh:allowlist()` casa `^##\s*Arquivos permitidos`, então **numerar** (`## 5. Arquivos permitidos`) faz o parser não achar a seção, a cerca lê **vazia** e o `hook-wo-fence` **NEGA** a edição do artefato canônico **mesmo com o WO promovido cobrindo o caminho**. (WO-RADAR-001 usa header numerado mas passou só porque a cerca dele é não-canônica — o parser nunca foi exercido.) Arquivo raso em `docs/` (ex.: `_decisoes.md`/`_lexico.md`) só casa por **path exato** na cerca (o `reldir` vira `""`), não por prefixo de pasta.

Vale também para o **canon do vvcore** (`ARQUITETURA-IA`/`CONTEXTO-IA` em `vvcore/docs/tasks/`): a cerca cobre o caminho na forma `vvcore/plugins/vvcore/context/...` (ramo `<reponame>/<rel>` do `vv_covers`). Só skills `doc-*` são isentas de WO (§6.5); `sync-governanca`/`skill-auditor` **não** são. Precedente: WO-CORE-013.

**Gotcha do `.cursor`:** `.cursor/rules/00-canon-vvf.mdc` é **gerado** por `sync-cursor-rules.sh` do canon do vvcore (nunca editar à mão). Rodar o script com canon **uncommitted** propaga a mudança pros working trees de **todos** os repos app de uma vez (VVLEADHUB, vvleadhub-radar…) — deixe a regen do `.cursor` pro **pós-commit** do canon, senão bundla mudança não-aprovada na WIP de cada repo.
