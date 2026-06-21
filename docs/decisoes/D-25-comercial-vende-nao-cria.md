# D-25 — Comercial vende, não cria (régua de ownership)

**Status:** fechada · **Data:** 2026-06-21 · **Tags:** gov, arquitetura

## Contexto

No passo C da WO-INTEL-001 (1º Domain Map do repo), ao cravar o ownership cross-domain entre `comercial` e `inteligencia-competitiva`, surgiu a pergunta de quem é dono de `Serviço`, `Espaço` e `Hospedagem`. A análise inicial — e a verificação adversarial — supôs que `Serviço` **nascia** no comercial. O fundador corrigiu: o comercial **não cria** serviço nenhum; todo serviço passa por **análise de viabilidade, existência e processos internos** antes de existir, e isso é da **operação**. O comercial **vende o que a empresa disponibiliza**. Confirmado que a régua vale para **tudo** que a empresa provê (Serviço, Espaço, Hospedagem), não só para Serviço.

## Decisão

O domínio **comercial é de venda, não de criação**.

- **Possui** as construções da venda: **Pacote/oferta** (escada Essential → Inspiração → Autoral), **funil** de venda, **Ganho/Perda**.
- Tudo que a empresa **provê** — **Serviço** (Buffet, Decoração, Som & Iluminação, DJ, Bartender…), **Espaço-VVF** (Acqua, Florest, Serra, Morada, Villa), **Hospedagem** — **nasce e é vetado na operação (vvdomain)** por gate de viabilidade/existência/processo interno; no comercial essas entidades são **representação de venda**, nunca fonte canônica.

## Consequências

- **Recorte de domínios:** o vvleadhub é **comercial (vende) + inteligencia-competitiva (observa)**; o backbone de operação/ativos (Serviço/Espaço/Hospedagem) é do **vvdomain** (bounded context externo, ainda não mapeado).
- **Ownership no Domain Map** ([`_domain-map.md`](../_domain-map.md) §3.2 / Princípio **P1**): `Serviço`/`Espaço-VVF`/`Hospedagem` têm fonte canônica = **operações**; comercial = representação. Dispara a **Reconciliação R2** (§6 do mapa): os business docs do comercial que hoje os apresentam como entidades próprias serão reconciliados quando a operação (vvdomain) for mapeada.
- **Proibido:** atribuir a criação ou a definição canônica de um serviço/espaço/hospedagem ao comercial. O comercial empacota e comercializa; não cria oferta de serviço por conta própria.
- **Relação com D-9:** a D-9 isola o ownership no nível de **schema** (cada runtime migra o seu); a D-25 fixa o ownership no nível de **negócio** (quem cria × quem vende). Complementares — a referência cross-context (ex.: a Disputa da inteligência → Espaço-VVF) é **por id**, validada na aplicação, sem FK atravessando schema.

## Histórico de emendas

| ID | O que mudou |
|---|---|
| _(nenhuma)_ | — |
