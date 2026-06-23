# Léxico — vvleadhub

> ⚠️ **Edições só via `/doc-lexicon-keeper`** (ARQUITETURA-IA §6.1) — essa skill decide o termo; renomes espalhados propagam via `/doc-reconciler`. **Não editar à mão.** Doc de discovery **não** alimenta o léxico até ser validado (§6.4).
>
> Índice de termos canônicos do repo. Um termo por conceito. As definições moram no
> doc dono (system/specs/business); aqui só ponteiro. Termos de marca/negócio são
> canônicos no [`CONTEXTO-IA.md`](../CLAUDE.md) (vvcore, entregue por `@import` no
> `CLAUDE.md`) — aqui só ponteiro.

## Convenção de língua (EN × pt-BR)

- **Português** — vocabulário de domínio (Tipo de Evento, Pacote, Serviço, Espaço,
  Hospedagem) e da plataforma (Molde de LP, Assunto, TipoDeAssunto, Objetivo, Bloco, LP)
  e a prosa dos docs.
- **Inglês** — termos de **código** (os nomes que aparecem em `packages/contracts`:
  `subject`/`subjectType`/`objective`/`template`) e **termos de arte** já consagrados
  (gate, funnel, click ID, structured data, feature flag, dispatcher).
- Língua mista é aceitável; **termo misto para o mesmo conceito, não**.

## Termos da plataforma

| Termo canônico | Significa | Definição (ponteiro) |
|---|---|---|
| **Molde de LP** | esqueleto reaproveitável de uma LP (composição default de Blocos + tipos de Assunto aceitos + Objetivo default) | [`specs/plataforma/primitivas.md`](specs/plataforma/primitivas.md) |
| **Assunto** | sobre o quê a LP fala (polimórfico) | [`specs/plataforma/primitivas.md`](specs/plataforma/primitivas.md) |
| **TipoDeAssunto** | registro extensível de tipos de Assunto (tipo novo = collection nova) | [`specs/plataforma/primitivas.md`](specs/plataforma/primitivas.md) |
| **Objetivo de conversão** | o que a LP quer que a pessoa faça | [`specs/plataforma/primitivas.md`](specs/plataforma/primitivas.md) |
| **Bloco** | pedaço visual da LP; puxa conteúdo do Assunto; conhece capacidades, nunca instâncias | [`specs/plataforma/primitivas.md`](specs/plataforma/primitivas.md) |
| **LP** | a página = Molde + Assunto + Objetivo + variante | [`specs/plataforma/primitivas.md`](specs/plataforma/primitivas.md) |
| **Event HUB / Dispatcher** | endpoint first-party que recebe eventos, aplica consentimento e despacha | [`system/eventos.md`](system/eventos.md) |

## Mapeamento domínio → código

> O termo de domínio é pt-BR; o identificador no código (em `packages/contracts/src/shared.ts`) é EN. Mesmo conceito, registro diferente — nunca um termo misto.

| Termo de domínio (pt) | Identificador no código (EN) |
|---|---|
| **Assunto** | `subject` |
| **TipoDeAssunto** | `subjectType` |
| **Objetivo de conversão** | `objective` |
| **Molde de LP** | `template` |

## Termo da MARCA (não reusar)

| Termo | Significa | Onde é canônico |
|---|---|---|
| **Arquétipo** | a voz da marca: **Herói da retaguarda · Cuidador · Romântico** | [`CONTEXTO-IA.md`](../CLAUDE.md) §4.1 |

> `Arquétipo` é **exclusivamente** da marca. O esqueleto de LP é **Molde**. Nunca usar
> "arquétipo" para falar de estrutura de página.

## Termos do domínio comercial

| Termo | Significa | Definição (ponteiro) |
|---|---|---|
| **Tipo de Evento** | Casamento (núcleo) · Aniversário · Debutante · Corporativo | [`business/comercial/_dominio.md`](business/comercial/_dominio.md) |
| **Pacote** | o que se vende; espectro locação pura → completo | [`business/comercial/_dominio.md`](business/comercial/_dominio.md) |
| **Serviço** | componente do pacote (`papel: padrão \| adicional`); **dono canônico = operação (vvdomain); no comercial é representação de venda** (D-25) | [`business/comercial/_dominio.md`](business/comercial/_dominio.md) |
| **Espaço** | local (`categoria: festa \| hospedagem`); no comercial **sempre VVF**. Formas qualificadas cross-domain: **Espaço-VVF** × **Espaço-Concorrente** (intel) | [`business/comercial/_dominio.md`](business/comercial/_dominio.md) |
| **Hospedagem** | produto ortogonal ligado a Espaços `hospedagem` | [`business/comercial/_dominio.md`](business/comercial/_dominio.md) |

## Termos do domínio inteligência-competitiva

> Fixados no passo D da WO-INTEL-001. Definições no doc dono (`business/inteligencia-competitiva/`); aqui só ponteiro. **`Espaço-Concorrente`** substitui o antigo `Concorrente-Espaço` — rename na fila do `doc-reconciler` (fim do arquivo). O **re-root** (jun/2026, D-26/L10) acrescentou **Operador de mercado** (transversal, `_domain-map.md` §5) e reclassificou Espaço-Concorrente como seu **recorte venue-only**.

| Termo | Língua | Significa | Definição (ponteiro) |
|---|---|---|---|
| **Grupo** | pt | entidade econômica dona de N Espaços-Concorrentes (alias informal: *Operador* — **≠ Operador de mercado** §5; preferir "Grupo") | [`coleta.md §1.1`](business/inteligencia-competitiva/coleta.md) |
| **Operador de mercado** | pt | **conceito transversal — root da entidade observada**: ator econômico do mercado de casamento, eixos `tipo_de_servico[]` × `relacao_com_vvf[]` (ambos **multi**). **Modelado-não-construído** (build = Fase 1). Espaço-Concorrente é o **recorte venue-only**. **≠ o alias informal "Operador" do Grupo** — usar sempre o termo cheio | [`_domain-map.md §5`](_domain-map.md) |
| **Tipo de serviço** · **Relação com a VVF** | pt | os dois eixos do **Operador de mercado**: `tipo_de_servico[]` (espaço, buffet, decoração, foto, filmagem, assessoria… — multi) × `relacao_com_vvf[]` (concorrente · parceiro · fornecedor · referência-de-curadoria — multi). **Distintos** dos eixos do recorte EC (relação competitiva × nível de mercado) | [`_domain-map.md §5`](_domain-map.md) |
| **Espaço-Concorrente** | pt | **recorte venue-only do Operador de mercado** (`tipo ⊇ {espaço} ∧ relação ⊇ {concorrente}`); a unidade que de fato se materializa no radar v1 (ex-`Concorrente-Espaço`) | [`coleta.md §1.2`](business/inteligencia-competitiva/coleta.md) · [`_domain-map.md §3.3`](_domain-map.md) |
| **Canal** | pt | procedência: a superfície onde se observa um Espaço-Concorrente | [`coleta.md §1.3`](business/inteligencia-competitiva/coleta.md) |
| **Observação** | pt | captura **datada** de um fato, com Fonte + confiabilidade (átomo do radar) | [`coleta.md §1.4`](business/inteligencia-competitiva/coleta.md) |
| **Estética** | pt | eixo de classificação (rústico/clássico/boho…), N:N | [`coleta.md §1.5`](business/inteligencia-competitiva/coleta.md) |
| **Disputa** | pt | relação Espaço-Concorrente × Espaço-VVF disputado (por id, D-9) | [`coleta.md §1.6`](business/inteligencia-competitiva/coleta.md) |
| **Finding** | EN | síntese curada e legível ("o que isto significa"); cita as Observações de origem | [`coleta.md §1.7`](business/inteligencia-competitiva/coleta.md) |
| **Pergunta de Inteligência** | pt | a pergunta que direciona o esforço caro de coleta (alias: *KIT*) | [`analise.md §1.1`](business/inteligencia-competitiva/analise.md) |
| **SWOT** · **Reputação** | EN · pt | saídas de síntese **derivadas** (não entidades primárias) | [`analise.md §1.2`](business/inteligencia-competitiva/analise.md) |
| **Relação competitiva** · **Nível de mercado** | pt | os dois eixos ortogonais que classificam um Espaço-Concorrente (substituem o "tier") | [`coleta.md §1.6`](business/inteligencia-competitiva/coleta.md) |
| **Munição** | pt | inteligência empacotada p/ a venda (objeção → argumento) | [`municao.md §1.1`](business/inteligencia-competitiva/municao.md) |
| **Prova** | pt | evidência reutilizável que sustenta um diferencial (citável-ao-casal × interna) | [`municao.md §1.2`](business/inteligencia-competitiva/municao.md) |
| **Battlecard** | EN | resumo curado VVF vs rival, ancorado no nível da Disputa | [`municao.md §1.3`](business/inteligencia-competitiva/municao.md) |

> **`Espaço` × `Espaço-VVF` × `Espaço-Concorrente`:** o head é sempre **Espaço**, o qualificador vem por **sufixo**. **`Espaço`** nu = canônico (no comercial, sempre VVF). **`Espaço-VVF`** = forma qualificada p/ prosa cross-domain (ex.: a Disputa). **`Espaço-Concorrente`** = o local do rival (intel).

## Depreciados (proibidos)

> Enquadramento superado é **removido**, não deixado apodrecer. Nenhum doc emite estes termos.

| Termo proibido | Usar no lugar |
|---|---|
| **venue** | Assunto tipo `espaço` / `subjects[]` |
| **"intenção × unidade"** | "Molde × Assunto × Objetivo" |
| **Foco** (sentido plataforma) | **Assunto** |
| **TipoDeFoco** | **TipoDeAssunto** |
| **tier** (guarda-chuva de classificação) | **relação competitiva** + **nível de mercado** (2 eixos ortogonais) |
| **Aspiracional** (como nível/tier) | **nível de mercado** |

## Fila de renomes → doc-reconciler

> Renomes canônicos **decididos** aqui, a **propagar** pela árvore via `/doc-reconciler` (grep do repo inteiro). O item fica `pendente` até o reconciler aplicar — **ou** voltar com colisão (ex.: nome de collection/seed). Enquanto pendente, o termo antigo ainda aparece nos docs.

| De | Para | Escopo | Status |
|---|---|---|---|
| `Concorrente-Espaço` | `Espaço-Concorrente` | `business/inteligencia-competitiva/*`, `_domain-map.md`, notas de pendência de léxico | **resolvido (jun/2026)** — ADR D-25 não usava o termo |

> Nota p/ as specs — **resolvida (jun/2026, passo E)**: a collection que materializa o Espaço-Concorrente é **`espacos-concorrentes`** (honra o head `Espaço-`; o esboço inicial da WO dizia `Concorrentes`). A WO-INTEL-001 §G foi atualizada para as **7 collections** (`grupos`/`espacos-concorrentes`/`canais`/`esteticas`/`disputas`/`observacoes`/`citacoes`).
