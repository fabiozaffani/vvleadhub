# AGENTS.md — Manual de conduta do agente construtor (VVF)

**Fonte única, tool-neutral, de instruções de qualquer agente neste repositório** (Cursor Composer, Claude Code, ou outro). Promovido do antigo `CLAUDE.md` por decisão **D-16**, emendada pela **D-18** (00 §7). Se algo aqui conflitar com outro arquivo de instruções de agente, **este vence**. `CLAUDE.md` e `.cursor/rules/*` são ponteiros para este arquivo, com um resumo dos invioláveis inline — em conflito, o texto completo aqui prevalece.

## Antes de qualquer código

1. Leia, nesta ordem: `docs/brand/vvf-system-context.md` → `docs/brand/vvf-design-guidelines.md` → `docs/00-indice-regras.md` → `docs/01` → `02` → `03` → e a spec da tarefa (04–09).
2. O `docs/00` é o documento de controle: glossário canônico, log de decisões (D-1..D-18) e diferidos. **Decisões fechadas não se rediscutem** — implementam-se. Se uma decisão parecer errada na prática, pare e pergunte ao fundador; não contorne em silêncio.
3. Em conflito entre docs: camada de marca > 01 > 02 > 03 > demais (00 §5).
4. Leia o work-order da sua tarefa em `docs/tasks/` antes de escrever qualquer linha. Não existe "construa a Fase N" — existe um work-order por tarefa, com escopo, arquivos permitidos e critérios de aceite.

## Regras invioláveis

- **Marca:** nenhum copy voltado ao público sai do tom de marca (System Context §4); nenhuma UI sai das Design Guidelines (tokens, tipografia Playfair+Work Sans, sem emojis, sem ícones decorativos, pt-BR). Exceções registradas nas Guidelines não se revertem.
- **Vocabulário:** use o glossário do 00 §6. `Arquétipo` é só da marca. No código: `subject`/`subjectType`/`objective`/`template` mapeiam Assunto/TipoDeAssunto/Objetivo/Molde.
- **Fronteiras e estrutura (09 §1.1/§2):** `site` não importa de `admin`/`api-server`; tipos cruzados só via `packages/contracts`; `site` jamais acessa Postgres; cada schema é migrado só pelo seu dono (D-9); dados de outro runtime sempre via API. **Essas fronteiras são travadas no CI (dependency-cruiser) — violá-las quebra o build, não é estilo.**
- **Sem preço:** nenhuma LP, post ou copy usa preço/promoção como argumento (INV-05) — nem como placeholder.
- **Segredos:** só em Secrets do ambiente (secret store do provedor de hospedagem / GitHub Actions secrets). Nunca em código, log ou doc. `gitleaks` roda no CI.
- **Diferidos (00 §7):** LGPD, value-mapping do join key, mapa 301, edge-cache de variante são de etapa final — **mantenha os ganchos** (`consent` pass-through, `correlation_id`, opt-in mínimo no form), não os implemente antes nem os remova.

## Como trabalhar

- Construa **pela ordem do roadmap** (03 §7) e declare pronto **somente** pelos critérios de aceite da fase (03 §7.1). Não pule de fase.
- PRs pequenos e temáticos; conventional commits (validados por `commitlint` no CI); todo bug corrigido ganha teste (09 §3).
- **Todo trabalho entra por branch + Pull Request**, com `/code-review` antes do merge. Não há branch protection mecânica (decisão do fundador) — a disciplina é por convenção: não commitar direto na `main`. O CI roda em **todo PR** (typecheck/lint/boundaries/test/build); **check vermelho é bloqueio**, mesmo sem o merge estar travado por máquina.
- **Definition of done mecânico:** antes de declarar qualquer tarefa pronta, rode `pnpm verify` na raiz (typecheck + lint + boundaries + test + build) e ele precisa passar. "Parece ok" não existe.
- **Qualidade de diff:** todo PR passa por `/code-review` antes do merge — sem exceção de tamanho. Quem dispara depende do harness (ver §Governança multi-agente). `/simplify` roda quando o diff atender a qualquer um: > 150 linhas líquidas de código real (excluindo lockfile, seeds, migrações geradas e snapshots) · 5+ arquivos de código tocados · abstração nova criada (componente, helper, tipo em `contracts`) · o PR cresceu além do escopo planejado. Pequenas correções dispensam o `/simplify`.
- Tudo que é business-concreto é **dado, não código** (02 §1) — espaços, serviços, campanhas, moldes e objetivos entram por registro/seed, nunca hardcoded. Exceção registrada: TipoDeAssunto novo = collection nova (02 §2.2).
- Blocos conhecem **capacidades, nunca instâncias** (02 §4): zero `switch` por nome de Assunto.
- Eventos seguem o schema canônico (`packages/contracts`, 05 §4) sem campos ad-hoc; novo destino = novo adapter puro + testes.
- Teste de integração externa só com `test:true` e endpoints de sandbox (05 §11) — nunca polua dados/ads reais.

## Governança multi-agente (D-16, emendada pela D-18)

Dois agentes podem tocar este repositório; cada um lê um arquivo, ambos apontam para este. **Mantenha-os sincronizados quando uma regra muda** (o ponteiro carrega o resumo dos invioláveis inline). O **Replit foi removido da operação (D-18, jun/2026)**: não há mais builder na nuvem que escreve na `main` — o código nasce local e entra por PR.

| Agente | Lê | Papel |
|---|---|---|
| **Cursor Composer** | `AGENTS.md` (nativo) + `.cursor/rules/*.mdc` (escopo por pasta) | **builder primário** — desenvolve o app (`site/` · `admin/` · `api-server/`), dirigido pelo fundador na IDE |
| **Claude Code** | `CLAUDE.md` | **auxiliar/backup** — auditoria e revisão (`/code-review` em todo PR, `/audit-quality`·`/checklist-fase` nos gates, `/security-review` quando couber) e trabalho de maior volume onde tokens mais baratos/contexto longo ajudam |

- **Um builder, um auxiliar.** O Cursor constrói (volante do fundador); o Claude Code entra para **auditar, revisar, melhorar e debugar** — e pode assumir tarefa de build escopada quando o fundador delegar. Quem editar código segue as mesmas regras (fronteiras, marca, `pnpm verify`) e trabalha em **branch + PR própria**.
- **Encontro gated:** `packages/contracts` e `docs/` mudam só sob `CODEOWNERS` (aval do fundador). Mudança de contrato afeta tudo — nunca passa sem olho humano.
- **`/code-review` em todo PR antes do merge.** A regra "todo PR passa por review" vale para qualquer autor.
- **Fluxo de código → `main`:** o código é escrito **localmente** (Cursor/Claude Code) → **branch + PR** → CI verde → merge na `main`. Sem branch protection mecânica (decisão do fundador): branch+PR é convenção, check de CI vermelho é bloqueio. Não há mais o desvio `replit/work` nem a regra "Publish ≠ push" — eram artefatos do builder na nuvem, aposentados pela D-18.
- **Deploy/runtime:** alvo de hospedagem **a definir na Fase 0b** (D-18). Cloudflare permanece no edge (site SSR, R2, proxy de analytics — D-2/D-10/D-15 intactos); os serviços Node (`admin`/`api-server`) + Postgres gerenciado vão para um host a escolher. Deploy é desacoplado do GitHub.
- Os papéis acima são o modelo de operação corrente; ajustá-los é editar `docs/tasks/fase-0.md` (e os ponteiros `.cursor/rules`/`CLAUDE.md`), não improvisar no meio de uma tarefa.

## Quando perguntar ao fundador (aval obrigatório)

- Qualquer mudança em decisão fechada (D-1..D-18) ou em invariante.
- Trade-off não coberto pelos docs (registre a pergunta + recomendação; não decida sozinho).
- Promoção de preview → produção (loop de validação humana).
- Qualquer alteração em `packages/contracts` ou `docs/` (gated por CODEOWNERS).

## Autonomia com revisão a posteriori

- **Copy voltado ao cliente:** o agente produz com autonomia, seguindo rigorosamente a camada de marca (tom §4 do System Context + guardrails dos Blocos no 04). Mantém um **inventário de copy** por fase (`docs/copy/inventario-fase-<n>.md`) para o fundador revisar na validação do preview — correção entra como ajuste, não como bloqueio prévio. Invariantes seguem invioláveis mesmo com autonomia (sem preço, sem componente isolado, exclusividade pela história).

## Definition of done (resumo; detalhe em 03 §7.1)

Código tipado e lintado, fronteiras respeitadas (dependency-cruiser verde), `pnpm verify` passando, testes verdes, **Lighthouse CI dentro do orçamento**, axe sem violações novas, secrets fora do código, e a funcionalidade demonstrável no preview com os critérios da fase marcados.
