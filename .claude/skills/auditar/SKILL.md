---
name: auditar
description: Confere uma área inteira contra a spec estrutural dona dela (conformidade impl-vs-spec, read-only) — camadas do api-server, schema de evento, capacidades de Bloco — citando doc+seção+linha em cada achado. Não caça bug, não re-roda o CI, não remonta lista de fase. Uso - /auditar <area> (ex.: /auditar api-server | /auditar site/blocks | /auditar admin | /auditar contracts).
disable-model-invocation: true
argument-hint: "<area>"
---

# Auditar — área inteira × spec dona, conformidade estrutural

Régua nova, órfã hoje: o dependency-cruiser pega import ilegal (09 §2), mas **não** pega lógica que vazou de camada (09 §1.1), adapter que inventou campo (05 §4) ou `switch` por Assunto (02 §4). Esta skill confere uma **área inteira** contra a **spec estrutural dona dela** — aderência, não correção. Veredito **consultivo, read-only**, fora do gate de fase. `<area>` é **obrigatória**: uma área = uma spec dona por invocação; nunca "audita tudo".

> Ressalva honesta: hoje (Fase 0) **não há `artifacts/` nem código legado Replit no working tree** — confirmar antes de prometer auditoria de legado. A justificativa permanente desta skill é o **gap estrutural** (lógica fora de camada, adapter com campo ad-hoc, `switch` por Assunto), não o legado; a cadência de legado (D-18) só ativa quando esse código existir.

## Os 3 cortes (literais — sem eles a skill degenera)

1. **Não caça bugs.** Conformidade, não correção. Bug puro → "fora do escopo: rode `/code-review` no diff que o introduziu".
2. **Não re-roda o que a máquina já trava.** Roda `pnpm verify` / `pnpm boundaries` (dependency-cruiser), **reporta o resultado da ferramenta** e investiga por leitura só o **delta não-travado** — as regras de camada da 09 §1.1 que a 09 §2 ainda não codifica. Silêncio sobre o que CI/gitleaks/codegen já cobrem.
3. **Não remonta a lista de fase.** O `/checklist-fase` é quem **chama** `/auditar` nas células estruturais — nunca o inverso.

## Mapa área → spec dona (resolver pelo 00 §2, não decorar)

| `<area>` | Spec dona | A régua estrutural |
|---|---|---|
| `api-server` | 09 §1.1 + 05 §4 | `routes`→`services`→`repositories`/`integrations`; `routes` nunca importam `repositories`/`integrations` direto; `services` não conhecem HTTP/Express; `repositories` é o único que toca o banco (09 §1.1, l.41). Adapter = `Destino.map(event)` sobre o schema canônico — **sem campo ad-hoc** (05 §4, l.97) |
| `site/blocks` | 02 §4 + 04 §4 | **bloco conhece capacidade, não instância — zero `switch` por nome de Assunto** (02 §4, l.84); degradação graciosa quando o tipo não responde à capacidade (02 §4, l.82); biblioteca do 04 §4 |
| `admin` | 06 + 02 | control plane Payload pela **convenção nativa do framework** (09 §1.1); blocos espelho 1:1 do site; tipo = código, instância = dado (02) |
| `contracts` | 05 §4 + 04 §7 | schema canônico sem campo ad-hoc (05 §4, l.97); contrato de lead (04 §7); `generated/` nunca editado à mão |

## Procedimento

1. **Receber `<area>`** (obrigatória). Resolver a spec dona via 00 §2 (responsabilidade única de cada doc).
2. **Rodar `pnpm verify` / `pnpm boundaries`** e reportar o que a máquina já cobre (corte 2). O que estiver verde no CI não vira achado. (Atenção: runtime com script ausente passa por `--if-present` como no-op — "verde por ausência de target" não é cobertura real; não tratar como tal.)
3. **Ler o código da área** e confrontar com a spec **item a item**, citando **doc+seção+linha**. Sem âncora textual, não é achado.
4. **Rotular conformidade-por-decisão (00 §7) como "OK por decisão"** — ex.: `node:test` por escolha deliberada (D-18; 09 §3); `next build --webpack` no admin (09 §7). Não é defeito; D-1..D-18 não se rediscutem.
5. **Achado cross-owner ou que toque `packages/contracts`/`docs/`** (gated por CODEOWNERS) → **PARAR e escalar ao fundador**. Não emitir patch.
6. **Relatório** em tom de trabalho: achado × `spec:seção:linha` × `arquivo:linha` × severidade — consultivo, read-only, sem patch.

```
## Auditoria <area> — <data> (máquina: pnpm verify <verde/falha>)
| Achado | Spec | Arquivo:linha | Severidade |
|---|---|---|---|
| route importa repository direto | 09 §1.1 l.41 | api-server/src/routes/lead.ts:22 | alta |
| adapter grava campo fora do schema | 05 §4 l.97 | …/integrations/meta/map.ts:8 | alta |
| `node:test` em vez de Vitest | OK por decisão | — | — |
```

## Regras / veredito

- **Read-only HARD:** nunca edita, nunca `--fix`, nunca patch.
- Todo achado cita **doc+seção+linha** da spec dona (como o `/audit-quality` cita o número do Lighthouse). Sem âncora textual → descartar.
- **NUNCA declara "fase pronta"** — isso é o `/checklist-fase`.
- Conformidade a decisão fechada (00 §7) é "OK por decisão", não defeito.
- Cadência: **sob demanda · dívida técnica contínua · auditoria do legado (D-18)** — fora do gate de fase.
- **Fronteiras (não embrulha skill que já existe):** `/code-review` caça bug no **diff** de um PR; **`/auditar` confere a área inteira contra a spec dona** — diff→code-review, aderência-a-spec→auditar. `/checklist-fase` pergunta "a fase entrega a lista literal do 03 §7.1, no gate?"; **`/auditar` pergunta "o subsistema honra a spec estrutural dona, sob demanda?"** — checklist chama auditar, nunca o inverso. `/audit-quality` mede CWV+axe do site **buildado** em runtime; **`/auditar` lê estrutura/contrato/invariante do código-fonte** — planos ortogonais.
