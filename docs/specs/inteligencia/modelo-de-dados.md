# Modelo de dados — registro curado do radar competitivo

**Camada:** spec · **Domínio:** inteligência-competitiva · **Origem:** business/inteligencia-competitiva/ (coleta.md §1, _dominio.md §3; D-20, D-9, D-25) · **Tom:** trabalho

> **Depende de:** [`status-registry.md`](status-registry.md) (estados/transições), [`seed-bootstrap.md`](seed-bootstrap.md) (chave natural, carga), [`guardrails-coleta.md`](guardrails-coleta.md) (PII/fonte), [`saidas-derivadas.md`](saidas-derivadas.md) (SWOT/Delta).
> **Responsabilidade única:** as entidades do domínio → collections Payload, campos, FKs e a fronteira **materializado-agora (D-20) × congelado (D-19)**. NÃO define estados (status-registry), nem o seed (seed-bootstrap), nem a imposição das regras de fonte (guardrails-coleta).

---

## 1. Stack e convenções (herdadas do repo — não redecididas aqui)

Captura do estado real do `admin/` (template: [`../../../admin/src/collections/Espacos.ts`](../../../admin/src/collections/Espacos.ts)):

- **Banco:** Postgres via `@payloadcms/db-postgres`, **schema `payload`** (D-9; role `vvf_payload`, `DATABASE_URL_PAYLOAD`). Sem FK cruzando schema.
- **PK:** serial **integer** (`defaultIDType: number`) automática em toda linha — a identidade interna. **Não** é uuid.
- **Chave natural:** campo `unique` adicional (`slug` via `slugField`, ou composta) — a identidade **portável** que o seed usa (o serial não atravessa ambientes). Ver [`seed-bootstrap.md`](seed-bootstrap.md).
- **Nomes de tabela:** derivados do slug pelo Payload (snake_case); o dev escolhe o **slug**, não o nome de tabela.
- **Status:** `select` por collection (padrão `ativo/…`); transições = ponto de imposição **documentado**, não guard construído agora (ver [`status-registry.md`](status-registry.md)).
- **Migração:** push/dev-sync (sem migração versionada hoje); tipos desaguam em `packages/contracts/generated/payload-types.ts`.
- **admin.group:** todas as collections deste domínio agrupam em **`Inteligência`**.

## 2. Partição de build (a cerca do passo G)

| Partição | Collections | Build |
|---|---|---|
| **Materializado agora** (D-20) | `grupos`, `espacos-concorrentes`, `canais`, `esteticas`, `disputas`, `observacoes` (slice mínimo), `citacoes` | passo G |
| **Congelado** (D-19) | motor de `observacoes` (tipos automatizados, time-series Anúncio/Sinal), `findings`, anel 2 (`perguntas-de-inteligencia`, `objecoes-argumento`, `provas`, `battlecards`) | §6 — modelado, não construído |

> O WO §G previa 4 collections (`Concorrentes/Canais/Esteticas/Classificacao`). O modelo refinado pede **7** materializadas: `grupos` (entidade econômica distinta), `espacos-concorrentes` (ex-"Concorrentes"), `canais`, `esteticas`, `disputas` (ex-"Classificacao"), `observacoes` (slice mínimo de captura) e `citacoes` (intensidade da disputa). → item de limpeza: atualizar o WO §G.

## 3. Collections materializadas

### 3.1 `grupos` — Grupo *(Origem: coleta.md §1.1, INTEL-COL-02/03)*
O operador econômico (dono de N Espaços-Concorrentes; inclui grupo unitário).

| Campo | Tipo | Nota |
|---|---|---|
| `nome` | text, required, `useAsTitle` | |
| `slug` | `slugField` (unique) | **chave natural** |
| `apelidos` | array(text), opt | nomes/sub-marcas alternativos |
| `status` | select | namespace `intel.grupo` |
| `absorvido_por` | relationship → `grupos`, opt | **SYS-INTEL-02**: preenchido ⇒ absorvido numa aquisição (sucessor); vazio ⇒ saiu do mercado. Substitui o 2º estado terminal. |
| `perfil_economico` | group, nullable | aporte, playbook de mídia, sub-marcas — **L4**, cresce com a coleta |

### 3.2 `espacos-concorrentes` — Espaço-Concorrente *(Origem: coleta.md §1.2, INTEL-COL-02/03/10/11)*
A unidade observada que disputa um casal — **a raiz observada** do v1 venue-only.

| Campo | Tipo | Nota |
|---|---|---|
| `nome` | text, required, `useAsTitle` | |
| `slug` | `slugField` (unique) | **chave natural** |
| `apelidos_anteriores` | array(text), opt | identidade longitudinal preservada no re-parentamento (COL-03) |
| `grupo` | relationship → `grupos`, required | COL-02/03 |
| `relacao_competitiva` | select `{direto, indireto}` | eixo fechado — COL-05 |
| `nivel_de_mercado` | select extensível `{premium-full, premium-partial, mid, below}` | "aspiracional" **não** é nível — COL-05 |
| `esteticas` | relationship → `esteticas`, `hasMany` | **N:N**, filtrável no admin — COL-05 |
| `localizacao` | group | **SYS-INTEL-08**: `endereco_completo` · `cidade` · `cep` · `bairro` (texto) + `coordenada` (**ponto geo** lat/long, campo *load-bearing*). A coordenada habilita a distância derivável a cada Espaço-VVF e o mapa geolocalizado dos rivais |
| `status` | select | namespace `intel.espaco_concorrente` |
| `perfil_estrategico` | group, nullable | capacidade, modelo de pacote, hospedagem on-site, fornecedores, anos, posicionamento de preço — **não bloqueia o núcleo** (COL-10), L4/L5 |

> **SYS-INTEL-01** — as *superfícies onde se observa* **não** ficam aqui (resolve S-CANAL): são linhas em `canais`. Um Espaço-Concorrente "tem" suas superfícies via os Canais cujo `owner` aponta para ele.

### 3.3 `canais` — Canal *(Origem: coleta.md §1.3, INTEL-COL-04; refinamento B1)*
A procedência — **toda** superfície onde se observa, padronizada e aberta.

| Campo | Tipo | Nota |
|---|---|---|
| `owner` | relationship polimórfico → `['grupos','espacos-concorrentes']`, required | **SYS-INTEL-01/B1.1**: um Canal pendura no Grupo (Instagram do grupo) **ou** no Espaço-Concorrente; cobre "só tem Instagram, sem espaço próprio" |
| `tipo` | select **extensível** | instagram · youtube · pinterest · tiktok · facebook · site · google-maps · ficha-marketplace · feira… — "padronizado e aberto": conhecidos como opção, novos por dado |
| `identificador` | text, required | handle/URL/`page_id`/`channel_id`. O `facebook_page_id` de dedupe da Ad Library vive aqui (`tipo=facebook/instagram`) |
| `status` | select `{ativo, arquivado}` | |

**Chave natural:** (`tipo` + `identificador`).

### 3.4 `esteticas` — Estética *(Origem: coleta.md §1.5, INTEL-COL-05)*
Eixo de classificação N:N (registro curado, extensível — L9).

| Campo | Tipo | Nota |
|---|---|---|
| `nome` | text, required, `useAsTitle` | rústico, clássico, boho, garden, romântico… |
| `slug` | `slugField` (unique) | **chave natural** |
| `status` | select `{ativo, arquivado}` | |

### 3.5 `disputas` — Disputa *(Origem: coleta.md §1.6, INTEL-COL-11; D-9, D-25)*
A relação associativa N:N "este Espaço-Concorrente disputa tal Espaço-VVF". Eixo central do radar.

| Campo | Tipo | Nota |
|---|---|---|
| `espaco_concorrente` | relationship → `espacos-concorrentes`, required | end **interno** |
| `espaco_vvf_slug` | text, required | **SYS-INTEL-03 / F3**: ref por **slug** ao registro de Espaço-VVF (`espacos.slug`), **não** relationship nativo, **sem FK cross-schema** (D-9). Validado na aplicação. Espaço-VVF nasce na operação (D-25) — a Disputa **aponta, não possui**. |
| `nota` | textarea, opt | |
| `status` | select `{ativa, encerrada}` | |

**Chave natural:** (`espaco_concorrente` + `espaco_vvf_slug`). A "categoria da VVF" (festa/hospedagem) **deriva** do `categoria` do Espaço-VVF referenciado — não é um 2º tipo de alvo (F3).

> **Intensidade da Disputa** = contagem **derivada** das `citacoes` daquele par (§3.7) — não é campo digitado nem coluna armazenada (ver [`saidas-derivadas.md`](saidas-derivadas.md)).

### 3.6 `observacoes` — Observação *(slice mínimo)* *(Origem: coleta.md §1.4, INTEL-COL-01/04, INTEL-FONTE-03 emendada/-05; D-20 slice)*
Átomo do radar, **datado e append-only**. **Slice mínimo agora** = só a captura **manual** de prospecção (review/comentário); o motor automatizado e os demais tipos são congelados (§6).

| Campo | Tipo | Nota |
|---|---|---|
| `espaco_concorrente` | relationship → `espacos-concorrentes`, required | COL-04 |
| `canal` | relationship → `canais`, required | COL-04 |
| `tipo` | select | slice mínimo: `{review, comentario}` (anúncio/preço/casamento-real/orgânico = congelado) |
| `verbatim` | textarea | conteúdo de negócio (COL-01) |
| `fonte` | select ordinal `{publico, inferido_de_anuncio, cliente_oculto}` | **SYS-INTEL-04 / F1** — FONTE-05 |
| `quando_viu` | date, required | quando se observou (COL-07) |
| `quando_aconteceu` | date, opt | quando o fato ocorreu (COL-07) |
| `origem_url` | text, required | link/print da fonte pública — `INTEL-FONTE-03` emendada |
| `contato_origem` | group, nullable | **quem originou**: `nome_ou_handle`, `contato`, `lead_potential` (bool). `INTEL-FONTE-03` emendada — **visibilidade interna**, ver guardrails |
| `visibilidade` | select `{interna}` (travado) | nunca aflora em superfície pública |

> `confiabilidade` **não é coluna** — **SYS-INTEL-04**: deriva de `fonte` (enum ordinal `publico < inferido_de_anuncio < cliente_oculto`); a regra de derivação mora em [`guardrails-coleta.md`](guardrails-coleta.md). *(resolve F1: Fonte = modo de aquisição; Canal = superfície — eixos distintos.)*
> **SYS-INTEL-05** — `observacoes` é append-only por convenção (sem update destrutivo; correção = nova linha) — Payload não impõe nativamente; ver [`status-registry.md`](status-registry.md).
> **SYS-INTEL-06** — `contato_origem` é group na Observação no v1; a promoção a collection própria (`contatos`/`leads`, reutilizável p/ parceria) é adiada à generalização **L10/DR6**.

### 3.7 `citacoes` — Citação *(Origem: refinamento jun/2026, DR7; sinal comercial→intel)*
Cada vez que um cliente menciona um rival na **pesquisa de preço**, registra-se uma citação. A contagem por Disputa é a **intensidade objetiva** da concorrência (mais citado = mais top-of-mind vs nossos espaços).

| Campo | Tipo | Nota |
|---|---|---|
| `disputa` | relationship → `disputas`, required | o grão é o par (rival × Espaço-VVF consultado) = a Disputa |
| `data` | date, required | quando a citação ocorreu |
| `fonte` | select | pesquisa-de-preço, conversa… — de onde veio o sinal |
| `lead_ref` | text, opt | ref à consulta/lead de origem — texto livre agora; **vira FK ao lead quando o funil comercial (B1) for mapeado** |
| `nota` | textarea, opt | |

> **SYS-INTEL-07** — a Citação é um **sinal comercial→intel** (Publica→Consome): a captura nasce na pesquisa de preço (comercial). Como o **funil comercial (B1) ainda não é mapeado**, o intel a captura **manualmente agora** (interino) — o lado **estável** é a **agregação** (intensidade por Disputa = contagem). Quando o B1 for mapeado, a captura migra para o registro de lead (comercial publica) e esta collection vira o ponto de **consumo** — é o **handoff bidirecional** que o Domain Map §7 marcou para vigiar. Ver DR7. **Append-only** (cada menção é uma linha).

## 4. Seam cross-domain

- **Disputa → Espaço-VVF:** por `espacos.slug` (SYS-INTEL-03; §3.5). Hoje ambos no schema `payload`; a forma por-slug já é a do seam D-9 para quando o Espaço-VVF migrar ao vvdomain.
- **Ganho/Perda ← comercial:** consumido por conexão, **não modelado aqui** (dono = comercial, DR5/INTEL-ANL-02; R1 do Domain Map).
- **camada Pessoa/Party:** a canônica é cross-domain (L1); o intel guarda só o `contato_origem` leve, visibilidade interna (`INTEL-FONTE-03` emendada).

## 5. Decisões só-de-sistema (registro)

| ID | Decisão |
|---|---|
| **SYS-INTEL-01** | Canal unifica as superfícies de observação; `owner` polimórfico `[grupos, espacos-concorrentes]` (resolve a sobreposição "superfícies × Canal", S-CANAL) |
| **SYS-INTEL-02** | Grupo: terminal único `arquivado` + `absorvido_por` (rel→grupos) em vez de 2 estados (F2) |
| **SYS-INTEL-03** | Disputa→Espaço-VVF por `espacos.slug` (não relationship, não FK cross-schema) — seam D-9 (F3) |
| **SYS-INTEL-04** | `confiabilidade` derivada de `fonte` (enum ordinal fechado); não persistida em separado (F1) |
| **SYS-INTEL-05** | `observacoes` append-only por convenção; slice mínimo (manual) agora, motor congelado (D-19/D-20) |
| **SYS-INTEL-06** | `contato_origem` como group na Observação (visibilidade interna); promoção a collection adiada (L10/DR6) |
| **SYS-INTEL-07** | `citacoes` (intel, interino) → intensidade da Disputa **derivada por contagem**; captura migra ao funil B1 quando mapeado (handoff §7) |
| **SYS-INTEL-08** | `localizacao` = grupo (endereço completo + **coordenada geo**) no EC; o **banco de endereços agnóstico/compartilhado** é camada transversal — flag p/ `doc-domain-architect` (L11) |

## 6. Extensão congelada (D-19 — modelado, NÃO construído)

A cerca de build do passo G **exclui** tudo abaixo. Modelado aqui para o System Doc (passo F) compor o todo e para o motor descongelar sem reabrir negócio:

- **`observacoes` (motor):** tipos automatizados (anúncio→longevidade, preço, casamento-real, orgânico, movimento-de-negócio), captura via jobs Apify/Meta Ad Library/YouTube no `api-server`, time-series **Anúncio/Sinal**. Detecção de mudança ao longo do tempo (Delta). *(D-19)*
- **`findings`** — síntese curada (rascunho→curado→obsoleto); cita Observações de origem (COL-01). *(congelado)*
- **Anel 2** — `perguntas-de-inteligencia`, `objecoes-argumento` (munição), `provas`, `battlecards`. Ancoram na Disputa; consumidos no ponto-de-uso pelo comercial (INTEL-MUN-04). *(congelado, D-19 munição)*
- **Saídas derivadas** (SWOT/Reputação/Mapa/Delta) — ver [`saidas-derivadas.md`](saidas-derivadas.md).

> **Generalização futura (L10/DR6):** a entidade-raiz pode generalizar de `espacos-concorrentes` para `operadores-de-mercado` (eixos `tipo_de_servico[]` × `relacao_com_vvf`), servindo intel + curadoria + parceria. **Fora do v1** — roda como mapeamento próprio (discovery + Domain Map) antes do System Doc.
> **Mapa geolocalizado dos rivais** (render sobre as `coordenada`s) e o **banco de endereços agnóstico/compartilhado** (L11) são, respectivamente, feature de render (congelado, família L3) e camada transversal (`doc-domain-architect`) — as `coordenada`s capturadas agora são a fundação de ambos.
