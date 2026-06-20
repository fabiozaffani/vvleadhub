# discovery/radar/ — Radar de inteligência de mercado

Vigília contínua de concorrentes e do nicho de casamento premium, destilada em findings
indexados no tempo. É a camada **estratégica** (gera ideia) do par com a camada
**operacional** (dado indexado no app — Tracker Hub **L3**, D-19/D-17). Exploratório (§6.4):
nada aqui alimenta léxico/business/specs até virar ideia validada pelo `doc-discovery-mapper`
e promovida pelo pipeline.

## Fluxo

```
coleta  →  diario/  →  rollup semanal/  →  mensal/  →  coleção anual/
(v0 assistido: Chrome MCP nas ad libraries + YouTube Data API + WebSearch;
 v1: job no api-server com Apify pago + YouTube API — D-19)
```

Cada digest marca **ideias-candidatas** com handoff explícito `→ doc-discovery-mapper`, que
dá o veredito (validar/congelar/descartar). O radar **coleta e sintetiza; não julga ideias**.

## Estrutura

- [`concorrentes.md`](concorrentes.md) — registro de alvos (assets primários + secundários).
- [`panorama.md`](panorama.md) — mapa competitivo amplo por **estética × tier × espaço VVF**
  (~60 venues do catchment ~100 km). Companheiro do `concorrentes.md`: cruza quem disputa cada
  fantasia/espaço; o registro guarda os assets/page_id.
- [`fontes.md`](fontes.md) — catálogo de fontes × o que entrega × método × ressalva Brasil.
- `diario/AAAA-MM-DD.md` — findings do dia: novo / parado / no ar por concorrente + sinais de tendência.
- `semanal/AAAA-Www.md` · `mensal/AAAA-MM.md` · `anual/AAAA.md` — rollups.
- `_template-{diario,semanal,mensal}.md` — moldes.
- `_raw/*.json` — saídas brutas dos sweeps multi-agente (preservadas; o resumo curado vive em
  `panorama.md`/`concorrentes.md`).

## Guardrails (D-19)

- **Sem me-too / caça-tendência** (INV-01): observa-se pra estratégia intencional, nunca cópia.
- **Sem guerra de componente** (INV-03): o concorrente é lido como experiência, não peça a peça.
- **Preço** (INV-05, distinção §1.1): coletar preço de concorrente e disposição-a-pagar do mercado é **inteligência interna de 1ª classe** (alimenta M-02). O guardrail vale só pro **copy público** — nenhuma LP/post usa preço/desconto como argumento. Saber = sim; comunicar por preço = não.
- **LGPD:** só conteúdo público de negócio do concorrente; minimizar PII (rostos/nomes/
  depoimentos); uso interno; **nunca** reusar criativo alheio nos nossos ads.
