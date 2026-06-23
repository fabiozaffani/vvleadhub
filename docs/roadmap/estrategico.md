# Roadmap estratégico — ideias validadas × horizonte

**Camada:** roadmap · **Domínio:** estratégia · **Origem:** [`discovery/curadoria-desintermediacao.md`](../discovery/curadoria-desintermediacao.md) (✅ Validar) + [D-26](../decisoes/D-26-emendas-canon-tese-curadoria.md) · **Tom:** trabalho

O registro **estratégico** do roadmap — *o que vem e quando*, no nível de **negócio** (ideias validadas × horizonte), distinto do registro de **execução** ([`fases.md`](fases.md), *o que já aconteceu e o que falta* no build). Aqui mora a direção; lá moram as fases de construção. Num app, a execução domina o dia-a-dia; este registro existe para a estratégia não se perder entre as fases de build.

> ⚠️ **Dois sentidos de "Fase" — não confundir.** Neste registro, **Fase 1 / Fase 2** são as **fases estratégicas de crescimento do negócio** (Fase 1 = ser o dono do casamento de alto padrão da Grande SP; Fase 2 = cercar outras capitais — [`discovery/curadoria-desintermediacao.md`](../discovery/curadoria-desintermediacao.md) §1). Em [`fases.md`](fases.md), **Fase 0–4** são as **fases de build** do app (Fase 1 ali = *Eventos*). Uma coisa é a estratégia do negócio; outra é a ordem de construção do software. O app hoje está na **Fase 0b de build**; a Fase 1 **estratégica** é posterior ao core no ar.

---

## §1 — A aposta dominante: curadoria / desintermediação / segundo funil (espinha da Fase 1 estratégica)

Construir o **dono indiscutível do casamento de alto padrão da Grande SP** — catedrais próprias vendidas **por sonho, não por preço**, alimentadas por uma **curadoria digital radicalmente transparente** cujo ativo real é um **segundo funil de relacionamento** que captura os ~98,8% de leads que hoje vazam (não são "perdidos" — são "ainda não": a decisão de casamento premium leva 1+ ano). Nutridos por coorte/estágio, viram, depois de ~1 ano, **um segundo funil melhor que o primeiro**, convertendo **em espaço VVF** (Cenário 2). **Reforça o core, não o dilui.** Fio condutor: **desintermediação** — remover, um a um, os agentes interessados entre a noiva e o sonho dela (princípio organizador, lente interna — D-26 §C; nunca ataque público à assessoria).

A curadoria *terá* um serviço vendável, mas **precificado de propósito para não ser vendido avulso** — funciona como **âncora de valor**: ao fechar um espaço VVF, o serviço caro **vem incluso**. É mecanismo de funil do core, **não** vertical com P&L próprio.

**Fonte:** [`discovery/curadoria-desintermediacao.md`](../discovery/curadoria-desintermediacao.md) (veredito) · [`discovery/tese-base-curadoria-v4.md`](../discovery/tese-base-curadoria-v4.md) (tese-base, exploratória). **Canon:** [D-26](../decisoes/D-26-emendas-canon-tese-curadoria.md) fechou as 3 colisões (exceção de crise à INV-05, gate de preço/M-02 baseline×alvo, desintermediação como princípio organizador). O resto da tese **segue em discovery** (§6.4) — não promovido a business/specs até a Fase 1 abrir.

---

## §2 — Matriz Impacto × Esforço

```
        ALTO IMPACTO
┌────────────────────┬────────────────────┐
│ 🎯 curadoria/      │                    │
│   2º funil         │                    │
│ (aposta grande —   │                    │
│  planeje e faseie) │                    │
├────────────────────┼────────────────────┤
│                    │                    │
└────────────────────┴────────────────────┘
        BAIXO IMPACTO
 ALTO ESFORÇO            BAIXO ESFORÇO
```

**🎯 Aposta grande.** **Impacto alto** — é motor de crescimento do core: ticket/upgrade (M-02), ocupação (M-03) e conversão (M-04), sem tocar o eixo de preço (INV-05). **Esforço alto** — depende do core no ar, do funil comercial (B1) mapeado, de governança anti-BV travada e de uma camada digital ainda por definir. Regra do quadrante: **faseie** — qual o menor primeiro passo que já entrega valor sem violar gate.

---

## §3 — Prioridades

| # | Ideia | Impacto (métrica) | Esforço | Quadrante | Horizonte | Gate / Depende de |
|---|-------|-------------------|---------|-----------|-----------|-------------------|
| 1 | **Curadoria + segundo funil** (Fase 1 estratégica) | M-02/M-03/M-04 via core (não dilui M-01) | Alto | 🎯 Aposta grande | ⚪ Depois (build) · 🟡 Próximo (primeiros passos) | core no ar (build Fase 0b→2) · **funil B1 mapeado** · gate de preço (D-26) · governança anti-BV |
| 1a | *Primeiro passo:* validar **elasticidade no Serra** (quase-controle) | destrava o **gate de preço** (M-02 baseline→autoridade) | Médio | passo da aposta | 🟡 Próximo | desenho do quase-controle + métricas-de-abortar (D-26 provisório) |
| 1b | *Primeiro passo:* **travar governança anti-BV** antes de contratar curadoria | confiança vira processo, não boa-fé | Médio | passo da aposta | 🟡 Próximo | — (decisão de processo; precede a contratação) |
| 1c | *Primeiro passo:* **dimensionar o segundo funil** com grupo de controle desde o dia 1 | mede incrementalidade real do pool | Médio | passo da aposta | 🟡 Próximo | funil B1 mapeado (Party + funil comercial) |

> Registro **semente**: hoje a única aposta estratégica formalizada é a curadoria. Novas ideias ✅ validadas pelo `doc-discovery-mapper` entram aqui com seu horizonte.

---

## §4 — Sequenciamento, gates & dependências

- **Não é "agora".** A Fase 1 estratégica vem **depois do core no ar** — o app está na **Fase 0b de build** (site nem live). M-01 acima de tudo (CONTEXTO-IA §7): a qualidade do core de casamento não cede a esta aposta; primeiro o core, depois o crescimento.
- **Dependência dura — funil comercial (B1).** O segundo funil é **Pessoa/Party + funil comercial**, não "operador de mercado". Exige o B1 mapeado ([`business/comercial/lacunas.md`](../business/comercial/lacunas.md)) antes de modelar Curadoria/segundo-funil como business (Arquitetura §6.4).
- **Dois gates distintos (D-26):**
  - **Gate de preço** (anterior) — elasticidade validada no Serra (quase-controle: subir só num espaço e comparar no mesmo período, com métricas-de-abortar) **+** autoridade no ar. Destrava o pricing de autoridade (~1,5–2x) sobre a baseline M-02. Primeiro movimento por **empacotamento** (embutir Inspiração), não aumento seco de tabela.
  - **Gate de Fase-1 / abertura de vertical** (§8 / G-01) — **reusa o NPS ≥ 80** do core + processos documentados/auditados + fôlego para investir. Não se abre vertical sacrificando o core.
- **Gancho já preservado.** A generalização **Operador de mercado** ([`business/inteligencia-competitiva/lacunas.md`](../business/inteligencia-competitiva/lacunas.md) L10/L11; materializada no Domain Map pelo re-root da WO-INTEL-001) pré-cabla a camada de registro/relação que a curadoria/parceria vai consumir — sem modelar a Curadoria agora (§6.4).

---

## §5 — Encaixe nos horizontes

- 🔵 **Agora (0–12m):** **nada desta aposta entra no Agora** — o Agora é o build do core (execução em [`fases.md`](fases.md): Fundação → Eventos → Leads & LPs). O que pertence ao Agora é o que **destrava** a aposta sem deslocar o core: mapear o **funil comercial (B1)** quando a fase chegar, e — operacionalmente, fora do app — desenhar o **quase-controle do Serra**.
- 🟡 **Próximo (12–24m):** os **primeiros passos** (1a elasticidade, 1b governança anti-BV, 1c dimensionamento do segundo funil com grupo de controle), conforme o core consolida e o B1 é mapeado.
- ⚪ **Depois (24m+):** o **build** da curadoria digital + segundo funil (domínio Curadoria mapeado discovery→business→specs→system→tasks, precedido por B1) e a **Fase 2 estratégica** (cercar outras capitais).

---

## §6 — Ligação com a execução

A execução de build vive em [`fases.md`](fases.md) — **o core primeiro**. Esta aposta **não tem WO** e **não está em business/specs** (§6.4): segue em discovery até a Fase 1 estratégica abrir. O elo já preparado é o **gancho** da generalização Operador de mercado ([`lacunas.md`](../business/inteligencia-competitiva/lacunas.md) L10/L11), transversal modelado-não-construído — quando a Curadoria for mapeada, ela consome esse registro em vez de criar um paralelo.
