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
