# Painel de mensuração interno

**Camada:** spec · **Domínio:** eventos · **Origem:** 05-event-hub-mensuracao.md (§12, §12.1) · **Tom:** trabalho

O painel que lê do store e o consolida com o reporting de plataforma (single pane of glass, D-17). É consumido pelo Tracker Hub (ver [`../admin/tracker-hub.md`](../admin/tracker-hub.md)). O store de origem está em [`destinos.md`](destinos.md); o closed-loop que produz a atribuição por card, em [`loop-fechado.md`](loop-fechado.md).

---

## 1. Painel (leitura do store)

Lê do store, **agregando por `type` de Assunto e por Assunto** (ambos dados — não quebra quando o portfólio muda):
- Scroll & engajamento por LP/página.
- Click maps / heatmap-lite.
- Fluxo de navegação: entrada → saída, caminhos, bounce.
- **Funil M-04** (ver CONTEXTO-IA §7): LP → form_start → lead/handoff → (visita → venda, do Kommo).
- Conversão por variante (+ significância — detalhe em [`../experimentacao/guardrails-estatisticos.md`](../experimentacao/guardrails-estatisticos.md)).
- Atribuição por canal/UTM (lead **qualificado**, não só clique).
- Session replay (se Opção A), PII mascarada, respeitando consentimento (ver [`consent-gate.md`](consent-gate.md)).

## 2. Single pane of glass — ingestão de reporting de plataforma (D-17)

O Tracker Hub (ver [`../admin/tracker-hub.md`](../admin/tracker-hub.md)) é o **ponto único de leitura de marketing**: o time não tabula entre Meta/Google/Pinterest/TikTok/YouTube pra cruzar número. Duas camadas, naturezas opostas — **não confundir**:

- **L1 — diferencial (nosso, *pull* do nosso store):** tudo acima nesta spec — atribuição closed-loop *por card* (lead→qualificado→visita→ganho + valor) por canal/UTM. Custom; nada off-the-shelf entrega o join eventos web + desfecho Kommo + valor.
- **L2 — reporting de plataforma (commodity, novo — *pull* das APIs das plataformas):** investimento, impressões, cliques, CPM, conversas iniciadas, **lacuna de abandono CTWA** (ver [`ctwa.md`](ctwa.md)). Direção oposta às Destinations (que são *push*). É o que hoje força o tab-hopping.

**Escopo faseado (D-1 — não hand-buildar o commodity):**
- **Fase 3, Nível 1 (vale possuir — cruza com o diferencial):** puxar **investimento por canal/dia** (slice pequeno e estável de cada API: custo por campanha por dia) e blendar com qualificado+valor (L1) → **CAC e custo-por-lead-qualificado por canal** no painel. É o número que decide verba; o valor está no *join*, não no dado cru. Pull agendado na cola fina via `pg-boss` (ver [`confiabilidade.md`](confiabilidade.md)), gravado em `app` (agregados diários, não evento-a-evento).
- **Nível 2 (superfície completa de reporting):** **não** manter N integrações à mão. **Inclinação PostHog-first (D-17, fundador 13/06):** convergir no PostHog (já D-3) — **check de cobertura de ingestão de custo na Fase 1** (ver [`../../roadmap/fases.md`](../../roadmap/fases.md); esp. Pinterest/TikTok BR); se furar, **Windsor.ai** como connector barato *canalizado ao pane* (dado do connector → `app`/store → Tracker Hub, nunca só o dashboard deles), e Looker Studio como stopgap grátis no Google. **Build-vs-buy fecha na Fase 3 com custo como input** (liga [`../../discovery/auditoria-pre-build.md`](../../discovery/auditoria-pre-build.md), §3.5); há tempo, não bloqueia.

**Guardrail (inegociável — liga [`../../discovery/auditoria-pre-build.md`](../../discovery/auditoria-pre-build.md), §2.3.2):** métrica reportada pela plataforma ≠ métrica nossa por card (modelos e janelas de atribuição diferentes). O painel **rotula a fonte de cada número** (plataforma X vs. nosso store/Kommo); **nunca** soma "conversões" entre plataformas nem as compara com nossos cards como mesmo denominador. Centralização sem rótulo de fonte é "confiantemente errado" — pior que tab-hopping.
