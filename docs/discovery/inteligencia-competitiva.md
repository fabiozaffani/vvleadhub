# Inteligência competitiva (L3 do Tracker Hub)

**Camada:** discovery · **Status:** ✅ Validar (faseado) · **Avaliado:** 2026-06-19 · **Tom:** trabalho
**Origem:** ideia do fundador (jun/2026) + pesquisa de viabilidade adversarial (9 dimensões).

> Registro de discovery (exploratório — §6.4). Não alimenta léxico/business/specs até promovido pelo pipeline.
>
> **Atualização D-20 (jun/2026):** a fatia de **registro curado** (casa-de-dados no Payload + seed) foi **descongelada** e está em build via **WO-INTEL-001** — o domínio é promovido ao pipeline (business→specs→system). A **coleta automatizada** (Apify/YouTube) e o **render L3** seguem congelados atrás do gate. Lacuna "dono de schema" **resolvida: Payload** (D-9).

## Inteligência competitiva como L3 do single pane — Veredito: ✅ Validar (faseado)

_Boa ideia, com casa na governança (estende a D-17), mas o **build** não pode roubar foco da Fase 0b: valida-se **agora** o mapeamento + o radar v0 (barato, reversível, testa a hipótese); **congela-se o build do módulo no app** atrás de um gate de capacidade + evidência._

**Gate de invariantes:** ✅ passou — sem violação. **Guardrails ativos** (a ideia tangencia 3 invariantes e precisa de cerca, não de veto):
- **INV-01 (espaço criado, não encontrado):** o maior risco de marca. Vigiar concorrente **não pode virar me-too reativo / caça-tendência** — a marca é curadoria intencional, não eco do mercado. A intel serve estratégia **intencional**, nunca cópia.
- **INV-03 (experiência integrada):** não transformar a vigília em **guerra de componente** ("melhor DJ/decoração") — observa-se o concorrente como experiência, não peça a peça.
- **INV-05 (preço — distinção §1.1, corrigido com o fundador):** preço de concorrente e disposição-a-pagar do mercado **são inteligência de 1ª classe** (interno, alimenta M-02/ticket) — coletar e analisar é **central**, não tangente. O guardrail INV-05 aplica-se **só ao copy público derivado**: nenhuma LP/post usa preço/desconto/promoção como argumento. **Saber o preço = sim; comunicar por preço = não.**
- **Crescimento (§8):** não é movimento de vertical/volume/Autoral/infra — **nenhum gate §8 é disparado**. O risco real é **capacidade**, não gate.

| Critério | Sinal | Análise |
|---|---|---|
| Alinhamento estratégico | 🟡 | Encaixe **arquitetural forte** (L3 da D-17, mesma superfície de admin — não reinventa nada). Encaixe **de marca neutro-a-cuidadoso**: market-intel não está nos diferenciais §9 e flerta com caça-tendência (INV-01). Reforça a **máquina comercial** (funil M-04, campanhas), não a marca diretamente. |
| Problema real | 🟡 | **Hipótese, não fato.** Drive do fundador é sinal legítimo, mas não há evidência documentada de que a falta de intel custa conversão/upgrade hoje. A cadeia "intel → LP melhor → mais conversão" tem vários saltos. O **radar v0 é exatamente o teste barato** de que o insight é usável. |
| Capacidade & gates | 🟡 | **O ponto sensível.** App na Fase 0b (site nem no ar); roadmap é caminho crítico (site→eventos→leads). Build do módulo **agora** desviaria capacidade escassa (Cursor/fundador) — risco a M-01 por **foco**, não por qualidade. 🟡 **só porque o escopo escolhido evita o golpe**: mapear + radar agora (barato), build na ordem do roadmap. Sem o faseamento seria 🔴. |
| Retorno | 🟡 | Move **M-04** (conversão — LPs mais afiadas a partir do modelo de LP do concorrente) e **M-02** (campanhas → upgrade/ticket), de forma **indireta e de 2ª ordem**. É ferramenta de **afiação**, não step-change. Liga ao diferencial §9 #4 (padrão replicável) e ao tema controladoria-como-qualidade. |
| Risco & reversibilidade | 🟢 | Escopo escolhido é **barato e reversível** (docs + skill local). Legal/LGPD **gerenciável** (dado público deslogado, Apify absorve o scraping, LIA, minimizar PII). Riscos — custo/manutenção de scraper, drift me-too, custo de oportunidade na 0b — todos **mitigados pelo faseamento** e por guardrail. |

**O que precisaria ser verdade pra dar certo:**
- O radar v0 (barato, assistido) produzir **insights usáveis de fato** — ex.: ≥3 ideias de LP/campanha que sobrevivem ao `doc-discovery-mapper` em ~4–6 semanas. Esse é o sinal de "problema real".
- O build do módulo entrar **só** quando o admin/Tracker Hub existir (Fase 2–3) — sem antecipar à custa do caminho crítico.
- Os guardrails de marca (sem me-too, sem guerra de componente, sem eixo de preço) virarem **regra escrita** na spec, não boa intenção.

**Lacunas a confirmar antes de apostar (no build):**
- Custo real mensal do Apify + YouTube para a lista de concorrentes do fundador (input do build-vs-buy, espelha D-17).
- Dono de schema do dado indexado (Payload collection × `app` schema — D-9) — decisão de spec.
- Se o radar v0 mostrar que o insight **não** é usável, o módulo do app **não se constrói** — congela-se de vez.

**Próximo passo:**
- **Validado (agora):** → `doc-roadmap-keeper` posiciona a capacidade (Fase 3-adjacente) + → registrar **D-19** (estende D-17) + → `doc-business-mapper` mapeia o domínio + o **radar v0** começa a rodar.
- **Congelado (build do módulo no app):** revisitar quando **(a)** admin/Tracker Hub existir **e (b)** o radar v0 provar insight usável (≥3 ideias sobreviventes). Até lá, mapeia-se mas não se constrói.

---

## Emenda (2026-06-20) — extensão sales-enablement + coleta ampliada

**Gatilho:** o radar v0 (test de mapeamento, `radar/_raw/`) revelou inteligência reutilizável pelo comercial. Estende esta D-19 de *"observar para estratégia"* para *"empoderar o comercial"*. Plano aprovado pelo fundador: `~/.claude/plans/como-parte-do-projeto-encapsulated-unicorn.md`. Esta rodada é **discovery + business** (não produz specs/system/WO); o **build segue congelado** (gate inalterado).

### Ideia A — KB de Competidor p/ empoderar o comercial — ✅ Validar (faseado)
SWOT + reviews/reputação + fraquezas + **munição comercial** (objeção típica → argumento de defesa) para SDR/Closer na conversão, com gancho futuro Kommo+IA.

**Gate de invariantes:** ✅ passou — sem violação nova; os 3 guardrails da D-19, mais afiados (abaixo).

| Critério | Sinal | Análise |
|---|---|---|
| Alinhamento estratégico | 🟡 | Operacionaliza a **confiabilidade/"sem surpresas"** (INV-04, diferencial §9 atravessador) como arma de conversão (funil M-04) — usa o pilar da marca, não dilui. Casa o Herói-da-retaguarda. 🟡 porque a segurança **depende dos guardrails**: sem eles vira guerra de componente (INV-03)/preço (INV-05). |
| Problema real | 🟡 | Objeção de concorrente é real na venda premium, mas a **magnitude é hipótese** (sem deal-perdido documentado; funil/atores nem mapeados — `business/comercial/lacunas.md`). Fato + achismo na magnitude. |
| Capacidade & gates | 🟡 | Nenhum gate §8 disparado. Rodada **só doc** (barata, reversível, não toca build). Build do KB-no-admin **congelado** p/ Fase 3. |
| Retorno | 🟡 | Move **M-04** (conversão) se funcionar; secundário **M-02** (defende ticket vs. preço). Afiação de 2ª ordem, não step-change. |
| Risco & reversibilidade | 🟢 | Escopo doc é barato/reversível. Drift (guardrails), KB stale (cadência do radar), build cedo (freeze) — mitigados. Coleta ampliada dentro da cerca mínima. |

**O que precisaria ser verdade:** comercial usar a munição e mover o close (≥3 argumentos usáveis + feedback de closer) · guardrails como regra escrita no business/spec · funil/atores mapeados (B1).
**Lacunas:** onde o vendedor consome a KB (card Kommo? admin?) · custo/cadência de **manter** a KB curada · ownership da entidade `Competidor`.
**Próximo passo:** → `doc-business-mapper` (B1 funil/atores + B2 KB/Competidor) → `doc-domain-architect` (ownership) → `doc-roadmap-keeper` (Fase 3-adjacente) → `sync-governanca` (emenda da coleta).

### Ideia B — Afiar LP/campanha a partir do concorrente — ✅ Já coberto pela D-19
Não é ideia nova (é o retorno já previsto: LPs/campanhas mais afiadas → M-04/M-02). **Sem novo registro.** Roteia como handoff recorrente **radar → `nova-lp`/specs de LP** (Fase 2). Alimenta o gate ≥3. Guardrail INV-01 (adaptar, não copiar) já é da D-19.

### Guardrails — refinados/emendados com o fundador (2026-06-20)
1. ⚠️ **COLETA AMPLIADA — emenda à D-19 (registrada como D-24):** coletar é **público OU não** — **cliente oculto/mystery shopping no escopo** (preço real, script de venda, processo, pontos fracos do atendimento; é a fonte mais rica p/ fraquezas/SWOT/munição). **Substitui** o guardrail *"só conteúdo público de negócio"* da avaliação de 2026-06-19 (e a linha equivalente no `radar/README.md` §Guardrails). **Cerca mínima que permanece:** meios **legítimos** (sem meio ilícito/invasão/quebra de NDA); **LGPD sobre dado pessoal de indivíduos** — minimizar PII (rostos/nomes de vendedores, depoimentos de casais reais), alvo é a inteligência **de negócio** do concorrente; **nunca reusar criativo alheio nos nossos ads** (copyright). **Registrado:** a emenda à D-19 é a **D-24** em `../_decisoes.md`; os guardrails ativos do radar (`radar/README.md` + `radar/concorrentes.md`) foram alinhados via **WO-RADAR-002**.
2. **INV-03 — distinção fina:** força **objetiva e comprovável** é defesa **válida** quando sobe para *experiência integrada / sem surpresas / confiabilidade* (ex.: zeladoria + manutenção superiores → espaço impecável no dia → §9 #2 + INV-04/INV-08). **Proibido** só: comparação de **componente isolado** ("nosso DJ é melhor") e defender por **preço** (INV-05). Teste: escala para um diferencial §9 / eixo "sem surpresas"? ✅ — senão ❌.

### Gate (inalterado)
≥3 ideias usáveis sobreviventes ao `doc-discovery-mapper` **+** admin/Tracker Hub no ar. Build congelado p/ Fase 3.
