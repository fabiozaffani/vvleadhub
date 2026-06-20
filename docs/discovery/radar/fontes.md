# fontes.md — catálogo de fontes do radar

O que cada fonte entrega, por qual método, e a ressalva Brasil. Base: pesquisa de
viabilidade adversarial (jun/2026). **Fato âncora:** não existe API oficial de anúncios
**comerciais** de concorrente para o Brasil — acesso é web/scraping (no v1, extrator pago).

| Fonte | O que entrega | Método (v0 → v1) | Ressalva Brasil |
|---|---|---|---|
| **Meta Ad Library** (FB/IG) | Anúncios **no ar**: criativo, copy, CTA, landing URL, plataformas, datas, ativo/inativo. **Sem** gasto/alcance. | v0: Claude-in-Chrome (página pública por `page_id`). v1: Apify Meta Ad Library Scraper (REST, `country=BR`). | API oficial só político/UE — inútil p/ comercial BR. Web UI é a fonte real. |
| **Google Ads Transparency** | Criativos no ar (Search/Display/**YouTube**), formato, domínio, datas. Sem gasto. | v0: Claude-in-Chrome (adstransparency.google.com, região BR). v1: SerpApi/Apify. | API oficial é EEA-only — não cobre BR. Web UI funciona do BR. |
| **YouTube Data API v3** | Orgânico do canal: uploads, títulos, descrições, views/likes/comentários. | v0 e v1: API oficial (key, grátis 10k/dia). **Único caminho oficial limpo.** | Sem obstáculo BR. Transcrição de terceiro ≠ oficial (API paga se valer). |
| **Instagram** (orgânico) | Nº/legendas/engajamento (Business Discovery, conta própria) + posts/Reels públicos. Vídeo só via scraper. | v0: Claude-in-Chrome. v1: Apify Instagram Scraper + Business Discovery. | Graph API só conta própria; concorrente = texto+nº ou scraper. |
| **TikTok** | Fraco p/ concorrente local (Creative Center não indexa venue pequeno; CCL é UE-only). | Melhor-esforço de tendência (Creative Center BR via Chrome). | Sem dataset de transparência BR. Per-concorrente não confiável. |
| **Pinterest** | **Pago = beco sem saída BR** (ad library é UE-only). Orgânico (boards/pins) é relevante (BR é #2 mercado). | Orgânico via Chrome/WebFetch. | Ad transparency exclui anúncios BR-targeted. |
| **Sites / blogs / LPs** | Modelo de LP, estrutura, ofertas, posicionamento, SEO, sub-marcas por espaço. | v0/v1: WebFetch (sites estáticos) + Chrome (dinâmico). | — |
| **Reviews / reputação** | Nota, volume, prêmios, sentimento, **verbatims +/−** (Google, **Casamentos.com.br**, TripAdvisor) — o reverso da força: onde o cliente reclama. | v0: WebFetch/Chrome + WebSearch. v1: Apify (Google Maps/Reviews) ou API. | Casamentos.com.br é vitrine-chave do segmento (prêmios/reviews). Review carrega **PII** (nomes de casais) → guardar o sinal, não a pessoa. |
| **Preço / oferta** | Pacotes/tabelas públicas, faixas em copy de anúncio, disposição-a-pagar do mercado. **Inteligência interna de 1ª classe** (alimenta M-02) — coletar é central; INV-05 só restringe o **copy público**. | WebFetch/Chrome nos sites/anúncios + pesquisa de mercado **+ cliente oculto (preço real)**. | Preço raramente público no segmento — inferir de ofertas/sinais ou obter via cliente oculto. |
| **Cliente oculto / mystery shopping** | A experiência de compra **por dentro**: preço real, pacotes, **script de venda**, processo de atendimento, **pontos fracos do atendimento**. Fonte mais rica p/ fraquezas/SWOT/munição. | **Humano-no-loop** — contato como prospect; registro estruturado no finding. | **Coleta ampliada (emenda D-19, 2026-06-20):** público **ou não**. Cerca: meios **legítimos** (sem meio ilícito/quebra de NDA); LGPD sobre **PII de indivíduos**; **nunca** reusar criativo alheio. |
| **Nicho / tendências** | "O que estão falando/fazendo", sinais de mercado. | WebSearch + leitura humana (juízo de ruído×real é humano-no-loop). | WebSearch sourcing é US, mas serve p/ descoberta. |

**Dimensões sintetizadas (derivadas — não são fontes):**
- **Fraquezas / sinais negativos:** IG parado, site 404/abandonado, lacunas de oferta, atendimento fraco — o reverso do que o radar já capta (o que *fazem*). Sai de reviews + cliente oculto + observação direta.
- **SWOT por concorrente:** forças · fraquezas · oportunidades (p/ nós) · ameaças (p/ nós) — consolidado no rollup **mensal** a partir de todas as fontes. Seed do KB de Competidor.
- **Munição comercial:** objeção típica → argumento de defesa (ancorado em diferencial §9 / "sem surpresas"; **nunca** componente isolado nem preço). Insumo do KB de Competidor (business — extensão D-19).

**Não-objetivos (registrado):** Pinterest pago, TikTok per-concorrente, transcrição oficial de
vídeo de terceiro — fora do escopo (ver D-19 / `../inteligencia-competitiva.md`).
