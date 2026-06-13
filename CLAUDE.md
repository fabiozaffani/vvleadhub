# CLAUDE.md — Manual de conduta do agente construtor (VVF)

Fonte única de instruções do agente neste repositório (D-7). Se algo aqui conflitar com outro arquivo de instruções de agente, este vence.

## Antes de qualquer código

1. Leia, nesta ordem: `docs/brand/vvf-system-context.md` → `docs/brand/vvf-design-guidelines.md` → `docs/00-indice-regras.md` → `docs/01` → `02` → `03` → e a spec da tarefa (04–09).
2. O `docs/00` é o documento de controle: glossário canônico, log de decisões (D-1..D-15) e diferidos. **Decisões fechadas não se rediscutem** — implementam-se. Se uma decisão parecer errada na prática, pare e pergunte ao fundador; não contorne em silêncio.
3. Em conflito entre docs: camada de marca > 01 > 02 > 03 > demais (00 §5).

## Regras invioláveis

- **Marca:** nenhum copy voltado ao público sai do tom de marca (System Context §4); nenhuma UI sai das Design Guidelines (tokens, tipografia Playfair+Work Sans, sem emojis, sem ícones decorativos, pt-BR). Exceções registradas nas Guidelines não se revertem.
- **Vocabulário:** use o glossário do 00 §6. `Arquétipo` é só da marca. No código: `subject`/`subjectType`/`objective`/`template` mapeiam Assunto/TipoDeAssunto/Objetivo/Molde.
- **Fronteiras e estrutura (09 §1.1/§2):** `site` não importa de `admin`/`api-server`; tipos cruzados só via `packages/contracts`; `site` jamais acessa Postgres; cada schema é migrado só pelo seu dono (D-9); dados de outro runtime sempre via API.
- **Sem preço:** nenhuma LP, post ou copy usa preço/promoção como argumento (INV-05) — nem como placeholder.
- **Segredos:** só em Replit Secrets. Nunca em código, log ou doc.
- **Diferidos (00 §7):** LGPD, value-mapping do join key, mapa 301, edge-cache de variante são de etapa final — **mantenha os ganchos** (`consent` pass-through, `correlation_id`, opt-in mínimo no form), não os implemente antes nem os remova.

## Como trabalhar

- Construa **pela ordem do roadmap** (03 §7) e declare pronto **somente** pelos critérios de aceite da fase (03 §7.1). Não pule de fase.
- PRs pequenos e temáticos; conventional commits; todo bug corrigido ganha teste (09 §3).
- **Qualidade de diff:** todo PR roda `/code-review` antes do merge — sem exceção de tamanho. `/simplify` roda quando o diff atender a qualquer um: > 150 linhas líquidas de código real (excluindo lockfile, seeds, migrações geradas e snapshots) · 5+ arquivos de código tocados · abstração nova criada (componente, helper, tipo em `contracts`) · o PR cresceu além do escopo planejado. Pequenas correções e inserções pontuais dispensam o `/simplify`.
- Tudo que é business-concreto é **dado, não código** (02 §1) — espaços, serviços, campanhas, moldes e objetivos entram por registro/seed, nunca hardcoded. Exceção registrada: TipoDeAssunto novo = collection nova (02 §2.2).
- Blocos conhecem **capacidades, nunca instâncias** (02 §4): zero `switch` por nome de Assunto.
- Eventos seguem o schema canônico (05 §4) sem campos ad-hoc; novo destino = novo adapter puro + testes.
- Teste de integração externa só com `test:true` e endpoints de sandbox (05 §11) — nunca polua dados/ads reais.

## Quando perguntar ao fundador (aval obrigatório)

- Qualquer mudança em decisão fechada (D-1..D-15) ou em invariante.
- Trade-off não coberto pelos docs (registre a pergunta + recomendação; não decida sozinho).
- Promoção de preview → produção (loop de validação humana).

## Autonomia com revisão a posteriori

- **Copy voltado ao cliente:** o agente produz com autonomia, seguindo rigorosamente a camada de marca (tom §4 do System Context + guardrails dos Blocos no 04). Mantém um **inventário de copy** por fase (o que foi escrito/alterado e onde) para o fundador revisar na validação do preview — correção entra como ajuste, não como bloqueio prévio. Invariantes seguem invioláveis mesmo com autonomia (sem preço, sem componente isolado, exclusividade pela história).

## Definition of done (resumo; detalhe em 03 §7.1)

Código tipado e lintado, fronteiras respeitadas, testes verdes, **Lighthouse CI dentro do orçamento**, axe sem violações novas, secrets fora do código, e a funcionalidade demonstrável no preview com os critérios da fase marcados.
