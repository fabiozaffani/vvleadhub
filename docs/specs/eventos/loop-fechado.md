# Loop fechado (Kommo → HUB → mídia)

**Camada:** spec · **Domínio:** eventos · **Origem:** 05-event-hub-mensuracao.md (§9, §9.1, §9.2) · **Tom:** trabalho

O desfecho comercial no Kommo retorna ao HUB e alimenta os canais pagos com conversão qualificada. É a cola fina própria (api-server) — nenhuma plataforma entrega o join eventos web + desfecho Kommo + valor. O contrato de evento está em [`schema-evento.md`](schema-evento.md); a ingestão de lead via formulário no site, em [`../landing-pages/contrato-lead.md`](../landing-pages/contrato-lead.md). O CTWA (anúncio→WhatsApp direto) tem spec própria — ver [`ctwa.md`](ctwa.md).

---

## 1. Mecânica do loop

1. **Criação de card emite `lead`** (webhook Kommo → cola fina → PostHog) em **todos** os caminhos — inclusive o A (`wa.me`), onde parte dos cliques nunca vira mensagem: a conversão real é o card, não o clique; o funil mede `whatsapp_handoff` vs `lead` e expõe o vazamento (ver [`../landing-pages/conversao-cta.md`](../landing-pages/conversao-cta.md)). *Mecanismo: webhooks da Kommo (push) — a API de Events dela é pull/auditoria histórica e não serve a tempo real.*
2. Kommo emite os marcos do funil — `visita_agendada` / `visita_realizada` / `no_show` (D-14) — e o desfecho — `Ganho` / `Perdido` + motivo / `Pipeline Recuperável` — via webhook à cola fina (api-server).
3. A cola grava no PostHog (painel) **e** dispara conversão qualificada aos canais pagos (CAPI/offline conversions/EC4L), casando por `click_ids`/telefone/`event_id`/`correlation_id`.
4. Sem isso, Meta/Google otimizam por clique/preenchimento, não por lead qualificado.
5. **Dedup do loop (D-11):** `lead_qualificado`/`ganho` disparam **por card** (idempotência pela identidade do card no Kommo), nunca por interação — evita reportar conversão duplicada e inflar o CPA artificialmente.
6. **Tempo é requisito (D-14):** o ciclo de venda é longo, mas a janela útil de otimização das plataformas é de **dias** — `ganho` chega tarde e serve a reporting/audiências, não a bidding. O sinal de qualidade que otimiza é `lead_qualificado` com **SLA de qualificação ≤ 72h** (acordado com a SDR; nuance na implementação, como D-11). *Enforcement é nosso, não da Kommo (que não monitora SLA nativamente): timer na cola fina via webhook de card, ou automação no Digital Pipeline/Salesbot.* E a aritmética de volume manda: no alvo M-03/M-04 (~90 leads/semana na conta inteira), evento raro não sustenta learning phase por ad set — **otimização primária roda em `lead`**; qualificado entra como sinal secundário/consolidado.
7. **Valores (D-14):** `lead_qualificado`/`ganho` carregam **valor por faixa** derivado da matriz M-02 (configuração × dia) para value-based bidding — a plataforma aprende a puxar perfil de sábado/pacote cheio, não volume barato. É telemetria server-side às plataformas, não comunicação: **INV-05 intacto** (aval registrado na D-14; ver CONTEXTO-IA §2).

Eventos adicionais ao catálogo (origem: Kommo): `lead` (criação de card), `lead_qualificado`, `visita_agendada`, `visita_realizada`, `no_show`, `ganho`, `perdido` (ver [`schema-evento.md`](schema-evento.md)).

---

## 2. Ingestão de lead forms nativos (D-13)

Leads gerados **dentro das plataformas** (Meta Instant Forms/Lead Ads, TikTok Lead Generation, Google Lead Form assets, Pinterest Lead Ads) nunca tocam o site. Caminho: webhook da plataforma → api-server (cola fina) → normalização para o contrato de lead ([`../landing-pages/contrato-lead.md`](../landing-pages/contrato-lead.md), com `origin_channel` da plataforma e metadados do formulário) → **dedup D-11** (telefone E.164, upsert-e-anexar) → card no Kommo. Consequências: (a) o loop fechado cobre esses leads sem trabalho extra (dispara por card); (b) a atribuição os enxerga (campanha/form id no lugar do xcode de página); (c) campanhas de lead form viram formato utilizável sem furo de funil. Evento `lead` correspondente é emitido ao PostHog para o painel.

**Portais/marketplaces sem webhook** (ex.: portais de casamento que entregam lead por e-mail/painel): parse de e-mail na cola fina **ou** entrada manual etiquetada no Kommo (`origin_channel: marketplace`) — mecânica decidida na Fase 3; até lá, entrada manual etiquetada. O dedup D-11 e o loop cobrem ambos os casos (disparam por card).

---

## 3. Sync de audiências (D-13)

Capacidade da cola fina (ou Destinations, onde houver conector): exportar **segmentos do funil** — ex.: cards `Ganho`, `lead_qualificado`, visitantes de alta intenção — como **custom audiences** (Meta Customer List, Google Customer Match, TikTok Audiences) com PII **hasheada**. É o que semeia lookalikes de alta qualidade, a prática nº 1 dos playbooks do segmento. Sync é incremental e idempotente.

**Gate desde o dia 1 (auditoria growth):** o sync exporta **somente leads com o opt-in mínimo do form registrado** (o gancho da D-5 que já existe por decisão) — exportar PII sem nenhum registro de consentimento é o flanco LGPD mais exposto do sistema, e fechá-lo custa zero. Quando o consent gate pleno ativar (Fase 4), ele assume; isso não antecipa o build diferido da D-5, só usa o gancho existente. Ver [`consent-gate.md`](consent-gate.md).
