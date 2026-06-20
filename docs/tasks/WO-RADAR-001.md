---
id: WO-RADAR-001
status: done
traces: [D-19]
deps: []
skills: [skill-creator]   # anthropic-skills:skill-creator — dona do ato de criar skill
---

# WO-RADAR-001 — Skill local `discovery-radar` (dona do log do radar)

## 1. Objetivo (o quê & por quê)
Criar a skill local `discovery-radar` que **codifica** a coleta assistida + síntese do radar de
inteligência competitiva (D-19) e passa a ser a **dona operacional do log** em
`docs/discovery/radar/*`. Resolve o gap: a `doc-discovery-mapper` é avaliadora de **ideias**
(veredito), não logger de **observações** — hoje os edits do radar caem na skill errada.

## 2. Dependências
**Nenhuma** (`deps: []`). O radar v0 já está montado (estrutura, registro, 1ª finding, captura
ao vivo provada) — esta WO só codifica o procedimento numa skill reutilizável.

## 3. Restrições de design
- **Guardrails D-19 embutidos:** LGPD (só conteúdo público de negócio, sem PII, retenção,
  uso interno); sem me-too/caça-tendência (INV-01); sem guerra de componente (INV-03);
  **preço = inteligência interna de 1ª classe**, INV-05 restringe só o **copy público**.
- **A skill coleta e sintetiza; NÃO julga ideias** — marca handoff `→ doc-discovery-mapper`.
- **Convenção de skill local** (`.agents/skills/<nome>/SKILL.md`); **nome não pode colidir** com
  skill do core (gotcha: skill de usuário sombreia a de projeto sem aviso). `discovery-radar`
  não colide.
- **Coleta logada-fora / dado público** (postura legal D-19): Claude-in-Chrome nas ad libraries
  (por `page_id` **ou** typeahead de anunciante — keyword search é ruidoso, ver finding 19/06).
- **Segredo** da YouTube Data API só em secret store, nunca em código/doc (`gitleaks`).
- **Não toca o app** (módulo L3 é Fase 3, congelado) nem implementa scraping caseiro (v1 = Apify).
- Radar é **exploratório** (§6.4): não alimenta léxico/business/specs até ideia validada e promovida.

## 4. Passos
1. **Usar a `skill-creator`** (anthropic-skills) para criar/estruturar
   `.agents/skills/discovery-radar/SKILL.md` — frontmatter (`name`, `description` rica para
   triggar) + corpo. É a ferramenta dona da autoria de skill.
2. Corpo documenta o ciclo: **(a)** carregar CONTEXTO-IA (invariantes) + ler `concorrentes.md` e
   `fontes.md`; **(b)** coletar — ad libraries via Claude-in-Chrome, YouTube via Data API v3,
   tendências via WebSearch; **(c)** diff vs ciclo anterior (novo/parado/no ar); **(d)** escrever
   `diario/AAAA-MM-DD.md` e rollups `semanal/mensal/anual` pelos templates; **(e)** marcar
   ideias-candidatas com `→ doc-discovery-mapper`; **(f)** guardrails D-19 como checklist de saída.
3. Documentar na própria skill que ela é a **dona do log do radar** (a resposta ao aviso do hook
   ao editar `docs/discovery/radar/*`).
4. Rodar **um ciclo assistido** ponta a ponta (a captura Di Terrá de 19/06 serve de validação) e
   confirmar que produz um `diario/` válido com ≥1 handoff.

## Arquivos permitidos (a cerca)
- `.agents/skills/discovery-radar/**` (criar)

## 6. Fora de escopo
- Módulo no app (L3 do Tracker Hub — Fase 3, congelado).
- Scraping caseiro / integração Apify (v1 desatendido — WO própria futura).
- Pinterest pago, TikTok per-concorrente.
- Formalizar a posse no `ARQUITETURA-IA §6.1` + mapping do `hook-wo-fence` (mudança no **vvcore**,
  CODEOWNERS — follow-up separado; o hook hoje só **avisa** em `docs/discovery/`, não bloqueia).
- Editar `docs/discovery/radar/*` fora do ciclo de validação (cada finding é ato da própria skill).

## 7. Skills obrigatórias (ordem)
1. **`skill-creator`** (anthropic-skills) — dona do **ato de criar skill**: cria e formata a
   `SKILL.md` (frontmatter, `description` que dispara, corpo). Análoga ao `skill-auditor`, que é
   dona de *editar/melhorar* skill (§6.1).
2. **`doc-discovery-mapper`** — **não** exigida para construir; citada só como **destino do
   handoff** das ideias-candidatas que o radar levantar.

A cerca (`.agents/skills/discovery-radar/**`) **não toca `docs/` canônico** — o log do radar que a
skill escreverá depois é ato **da própria skill criada** (auto-dono).

> **Follow-up de governança (vvcore, CODEOWNERS):** o `ARQUITETURA-IA §6.1` nomeia `skill-auditor`
> para *editar/melhorar* skill, mas **não** nomeia a dona de *criar* skill. Vale reconhecer as
> skills da Anthropic no roteamento (`skill-creator` p/ criar) — proposta à parte (`/sync-governanca`).

## 8. Critérios de aceite (done looks like)
- [ ] `.agents/skills/discovery-radar/SKILL.md` existe, com `name: discovery-radar` e `description`
  que dispara nos gatilhos certos. **Prova:** inspeção do arquivo.
- [ ] O corpo cobre os 6 passos do ciclo (carregar → coletar → diff → escrever → handoff →
  guardrails) e nomeia a skill como dona do log do radar. **Prova:** inspeção.
- [ ] Os guardrails D-19 (LGPD, INV-01/03, distinção de preço) estão no corpo como checklist de
  saída. **Prova:** inspeção.
- [ ] Um ciclo assistido roda ponta a ponta e produz/atualiza um `diario/AAAA-MM-DD.md` válido com
  ≥1 ideia-candidata marcada `→ doc-discovery-mapper`. **Prova:** demo (o `diario/2026-06-19.md` já
  satisfaz o formato; a skill o reproduz).
- [ ] Nome não colide com skill do core. **Prova:** `ls ~/.claude/skills` não tem `discovery-radar`.

## 9. Refs (ler antes)
1. [`docs/discovery/inteligencia-competitiva.md`](../discovery/inteligencia-competitiva.md) — veredito + faseamento.
2. [`docs/_decisoes.md`](../_decisoes.md) — D-19 (guardrails, LGPD, preço).
3. [`docs/discovery/radar/README.md`](../discovery/radar/README.md) · [`fontes.md`](../discovery/radar/fontes.md) · [`concorrentes.md`](../discovery/radar/concorrentes.md) · [`diario/2026-06-19.md`](../discovery/radar/diario/2026-06-19.md).
4. [`.agents/skills/README.md`](../../.agents/skills/README.md) — convenção de skill local.
5. `CONTEXTO-IA.md` (vvcore, via @import) — invariantes.
