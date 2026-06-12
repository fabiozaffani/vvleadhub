---
name: checklist-fase
description: Verifica os critérios de aceite de uma fase do roadmap (docs/03 §7.1) com evidência executável, antes de declarar a fase pronta. Produz relatório item a item com prova por comando. Uso - /checklist-fase 0 (ou 1, 2, 3, 4; sem argumento, inferir a fase corrente pelo estado do repo).
disable-model-invocation: true
argument-hint: "[fase 0-4]"
---

# Checklist de fase — definition of done verificável

Regra do CLAUDE.md: declarar pronto **somente** pelos critérios de aceite da fase (03 §7.1). Esta skill transforma isso em procedimento. Princípio: **nenhum item recebe ✓ sem evidência** — saída de comando, captura de comportamento no preview ou referência verificável. "Parece ok" não existe.

## Procedimento

1. **Identificar a fase.** Usar o argumento (`$ARGUMENTS`); se ausente, inferir pelo estado do repo (o que existe de runtimes/funcionalidades) e confirmar com o usuário antes de prosseguir.
2. **Ler a fonte.** Abrir `docs/03-arquitetura-sistema.md` §7.1 e extrair a lista literal de critérios da fase. A lista do doc é a verdade — não usar lista decorada de memória.
3. **Mapear cada critério para uma verificação.** Tipos de verificação, do mais ao menos automatizável:
   - **Comando:** `pnpm typecheck` · `pnpm lint` · `pnpm test` · Lighthouse CI + axe (usar `/audit-quality`, que detém os comandos canônicos e o orçamento) · trava de fronteiras (dependency-cruiser, 09 §2) · build dos runtimes.
   - **Demonstração:** comportamento observável no preview (ex.: publicar no Payload reflete no site; dedup D-11 anexa em vez de duplicar; round-trip `test:true` verde no sandbox). Registrar o passo a passo executado e o resultado observado.
   - **Inspeção:** existência/conteúdo verificável (ex.: registros seedados — contar via API; sitemap/robots/canonical/OG presentes nas rotas; structured data validando).
   - **Aval do fundador:** itens que exigem aprovação humana (ex.: páginas legais com placeholder jurídico aprovado; promoção preview → produção). Marcar como `pendente de aval` — nunca como ✓ por conta própria.
4. **Executar as verificações** uma a uma. Falhou? Registrar a saída relevante (resumida) como evidência do ✗ — não relançar até passar sem investigar a causa.
5. **Verificar transversais da fase** (valem para todas):
   - Inventário de copy da fase existe e está atualizado (`docs/copy/inventario-fase-<n>.md` — ver skill `copy-marca`).
   - Diferidos intactos: ganchos `consent` pass-through, `correlation_id`, opt-in mínimo presentes onde a fase os toca (00 §7) — não implementados antes da hora, não removidos.
   - Nenhum segredo em código/log/doc.
6. **Relatório final**, em tom de trabalho:

```
## Checklist Fase <n> — <data>
| # | Critério (literal do 03 §7.1) | Verificação | Resultado | Evidência |
|---|---|---|---|---|
| 1 | ... | pnpm test | OK | 42 testes, 0 falhas |
| 2 | ... | demonstração no preview | FALHOU | purge não invalida /espacos |
| 3 | ... | aval do fundador | PENDENTE | páginas legais aguardando aprovação |
Veredicto: fase NÃO pronta (1 falha, 1 pendência de aval).
```

## Regras de veredicto

- Qualquer ✗ → **fase não pronta**. Sem exceção, sem "quase".
- Item `pendente de aval` não bloqueia o trabalho técnico, mas bloqueia a declaração de fase pronta — listar explicitamente o que falta ao fundador decidir.
- Critério impossível de verificar hoje (tooling ainda não existe)? Isso é um ✗ com a causa "verificação indisponível" — e a instalação do tooling vira tarefa da própria fase, não desculpa.
- O relatório nunca propõe relaxar um critério. Se um critério parecer errado na prática: parar e perguntar ao fundador (decisões fechadas não se rediscutem por conta própria).
