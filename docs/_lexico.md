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
| **Serviço** | componente do pacote; atributo `papel: padrão \| adicional` | [`business/comercial/_dominio.md`](business/comercial/_dominio.md) |
| **Espaço** | local; atributo `categoria: festa \| hospedagem` | [`business/comercial/_dominio.md`](business/comercial/_dominio.md) |
| **Hospedagem** | produto ortogonal ligado a Espaços `hospedagem` | [`business/comercial/_dominio.md`](business/comercial/_dominio.md) |

## Depreciados (proibidos)

> Enquadramento superado é **removido**, não deixado apodrecer. Nenhum doc emite estes termos.

| Termo proibido | Usar no lugar |
|---|---|
| **venue** | Assunto tipo `espaço` / `subjects[]` |
| **"intenção × unidade"** | "Molde × Assunto × Objetivo" |
| **Foco** (sentido plataforma) | **Assunto** |
| **TipoDeFoco** | **TipoDeAssunto** |
