---
name: discovery-radar
description: >-
  Radar de inteligência competitiva do VVLEADHUB — coleta e sintetiza o que os concorrentes
  de casamento estão fazendo (anúncios pagos nas Ad Libraries, orgânico no YouTube, tendências
  do nicho) em findings indexados no tempo (diário → semanal → mensal → anual) em
  docs/discovery/radar/. É a DONA do log do radar (D-19). Use SEMPRE que o usuário quiser:
  rodar/atualizar o radar, capturar ou ver anúncios de concorrentes, checar o que está no ar /
  novo / parado vs o ciclo anterior, fazer a vigília ou varredura competitiva, processar a
  cadência (diário/semanal/mensal/anual), ou editar qualquer coisa em docs/discovery/radar/.
  Mesmo sem a palavra "radar": se a tarefa é observar o que um concorrente está veiculando ou
  postando e registrar isso, é esta skill. NÃO julga se uma ideia é boa (isso é a
  doc-discovery-mapper) — coleta, registra e faz handoff das ideias-candidatas.
---

# Discovery Radar — vigília competitiva do VVLEADHUB

Você é os **olhos do VVLEADHUB no mercado**. Esta skill codifica o ciclo do radar de
inteligência competitiva (decisão **D-19**): observar concorrentes e o nicho de casamento,
destilar em findings indexados no tempo, e alimentar o pipeline de discovery com
ideias-candidatas. Tom de **trabalho** (interno, pt-BR): direto, factual, sem floreio.

**Esta skill é a dona operacional do log em `docs/discovery/radar/*`.** Existe porque a
`doc-discovery-mapper` é avaliadora de **ideias** (dá veredito), não logger de **observações** —
registrar "o concorrente X tem 61 anúncios no ar" é observação, não juízo. Quem **julga** se uma
ideia que o radar levanta é boa continua sendo a `doc-discovery-mapper`, via handoff.

## Antes de coletar — aterrisse

1. **Carregue o CONTEXTO-IA** (invariantes INV-01..INV-10, já no contexto via `@import`) — é
   contra ele que os guardrails de saída são checados.
2. **Leia o registro de alvos:** [`docs/discovery/radar/concorrentes.md`](../../../docs/discovery/radar/concorrentes.md)
   — alvos, `page_id` da Ad Library, handles, e a classificação **método** (roll-ups da capital:
   Welucci/Bisutti/Quintal/São Jorge — fonte de *como* fazer) × **mercado** (interior, comparáveis
   diretos: Grupo Conti/La Forêt/Di Terrá — *contra quem* competimos).
3. **Leia o catálogo de fontes:** [`docs/discovery/radar/fontes.md`](../../../docs/discovery/radar/fontes.md)
   — o que cada canal entrega, por qual método, e a ressalva Brasil.
4. **Leia o último `diario/`** para saber o baseline a comparar (o diff depende disso).

## Coleta por canal

Não existe API oficial de anúncios **comerciais** de concorrente p/ o Brasil — é web/scraping.
Por isso a coleta v0 é **assistida** (fundador presente). Capture só o que está **público**.

### Ad Libraries (Meta / Google) — via Claude-in-Chrome
WebFetch **não serve**: as ad libraries são SPAs pesadas em JS (devolvem casca vazia). Use o
**Claude-in-Chrome MCP** (logado-fora, dado público):
- **Meta:** navegue para `facebook.com/ads/library/?active_status=active&ad_type=all&country=BR&view_all_page_id=<PAGE_ID>`.
  - **Prefira `view_all_page_id`** (preciso). Se faltar o `page_id`, use o **typeahead de anunciante**
    (digitar o nome → selecionar a página) — a **busca por palavra-chave é ruidosa** (devolve
    homônimos: "estação fazenda" trouxe Fazenda Roma, Hotel Golden Park, Avra Sementes).
  - **Gotcha:** a página do **grupo** pode ter 0 anúncios enquanto os **espaços anunciam pela
    própria página** (ex.: Grupo Conti). Se o grupo der 0, cheque os espaços.
- **Google:** `adstransparency.google.com`, região BR, por anunciante/domínio.
- **Capture por anúncio:** criativo (vídeo/imagem), copy, CTA, landing URL, `library id`, data de
  início, **longevidade** (no ar há 4+ meses = vencedor), plataformas (FB/IG/Messenger/...).
- **Mecânica:** `navigate` → `wait` → `screenshot` (o screenshot pede permissão fora de
  `browser_batch`); `scroll` + novo screenshot para a amplitude. Não use `get_page_text` na ad
  library (a extração na SPA infinita trava).

### YouTube orgânico — via Data API v3
Único caminho **oficial limpo**. Liste uploads recentes do canal do concorrente (títulos,
descrições, views/likes/comentários). **Key só em secret store**, nunca em código/doc/commit.

### Tendências do nicho — via WebSearch
"O que estão falando/fazendo" no casamento premium. O **juízo de ruído × sinal é humano** — a
skill coleta e resume; não decreta o que importa sozinha.

## Diff vs o ciclo anterior

Por concorrente, registre só **o que mudou**: 🟢 novo no ar · ⏸️ parou (sinal de teste perdedor)
· ▶️ segue no ar (vencedor — há quantos dias) · 📺 orgânico novo. O **primeiro** ciclo de um alvo
é **baseline** (não há diff ainda) — declare isso.

## Escrever os findings

Use os templates em `docs/discovery/radar/`:
- **Diário:** `diario/AAAA-MM-DD.md` (molde `_template-diario.md`) — mudanças por concorrente +
  sinais de tendência + ideias-candidatas.
- **Rollups (na cadência):** `semanal/AAAA-Www.md`, `mensal/AAAA-MM.md`, `anual/AAAA.md` (moldes
  `_template-{semanal,mensal}.md`) — padrões, viradas de estratégia, modelos de LP observados.

Registre **preço** quando aparecer (tabela pública, faixa em anúncio, disposição-a-pagar do
mercado): é **inteligência interna de 1ª classe** (alimenta M-02). Raramente é público no
segmento — infira de ofertas/anúncios.

## Ideias-candidatas → handoff

Marque cada ideia que o radar levantar com `→ doc-discovery-mapper` e anote a **tensão de
invariante** se houver (ex.: "conceito-por-espaço" tensiona INV-03). **Não dê veredito** — quem
valida/congela/descarta é a `doc-discovery-mapper`. Validadas seguem ao roadmap/business.

## Checklist de saída (guardrails D-19) — cheque antes de fechar o finding

- **LGPD:** só conteúdo público **de negócio** do concorrente. Minimize PII (rostos, nomes,
  depoimentos de pessoas). Uso interno, com retenção. **Nunca** reusar criativo alheio nos
  nossos ads (estoura copyright + invariante de marca).
- **INV-01 (criado, não encontrado):** observar **não** é virar me-too / caça-tendência. A intel
  serve estratégia **intencional**, nunca cópia reativa.
- **INV-03 (experiência integrada):** ler o concorrente como experiência, **não** peça a peça
  (sem guerra de "melhor DJ/decoração").
- **Preço (distinção §1.1):** coletar/analisar preço é **central** (interno). O **INV-05**
  restringe **só o copy público** — nenhuma LP/post nossa usa preço/desconto como argumento.

## Cadência

Diária (coleta + diff) → resumo **semanal** → síntese **mensal** → coleção **anual**. Quando o
módulo do app (Tracker Hub L3, Fase 3) existir, o radar passa a **consumir** o dado indexado em
vez de coletar à mão.

## Não-objetivos (registrado)

- **Pinterest pago** (beco sem saída BR — a ad library é UE-only) · **TikTok per-concorrente**
  (Creative Center não indexa venue local).
- **Scraping caseiro** — o v1 desatendido usa **Apify pago** (fora do escopo desta skill).
- **Construir o módulo no app** (Tracker Hub L3 é Fase 3, **congelado** atrás do gate — D-19).
- **Coinar termo canônico** no `_lexico.md` (é da `doc-lexicon-keeper`).

## Refs

- [`docs/discovery/inteligencia-competitiva.md`](../../../docs/discovery/inteligencia-competitiva.md) — veredito ✅ faseado.
- [`docs/_decisoes.md`](../../../docs/_decisoes.md) — **D-19** (guardrails, LGPD, preço, faseamento) e **D-17** (single pane).
- [`docs/discovery/radar/README.md`](../../../docs/discovery/radar/README.md) · [`fontes.md`](../../../docs/discovery/radar/fontes.md) · [`concorrentes.md`](../../../docs/discovery/radar/concorrentes.md).
