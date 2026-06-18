# Caminho de conversão (CTA → Kommo)

**Camada:** spec · **Domínio:** landing-pages · **Origem:** 04-landing-pages.md · **Tom:** trabalho

Como o clique vira card no Kommo. Dois modelos de CTA, o requisito de speed-to-lead, o fallback por salesbot fora do horário comercial e o ponteiro para CTWA.

---

## Modelo A — deep-link WhatsApp

CTA abre `wa.me/...?text=<msg com xcode>`; integração WhatsApp↔Kommo cria o card. Menos fricção; default mobile/pago.

*Vazamento conhecido:* parte dos cliques nunca vira mensagem (troca de app, texto apagado — o que também mata o xcode). Por isso a **conversão real do caminho A é a criação do card** — o webhook do Kommo emite `lead` ao HUB (ver [`system/eventos.md`](../../system/eventos.md)) e o funil mede `whatsapp_handoff` (clique) vs `lead` (card), expondo o vazamento em vez de escondê-lo.

---

## Modelo B — captura na LP

Form curto (nome + WhatsApp) → api-server → card no Kommo + **notificação instantânea ao SDR (speed-to-lead)** — velocidade de resposta é a maior alavanca do topo do funil (CONTEXTO-IA §7, M-04).

---

## Speed-to-lead (requisito, não desejo)

Notificação ao SDR em **≤ 5 min** da criação do card, pelo canal de maior atenção (push do Kommo; canal/provedor definitivo na implementação — ver [`discovery/auditoria-pre-build.md`](../../discovery/auditoria-pre-build.md) §2.3.6). **Fora do horário comercial** (noites e fins de semana — quando casais navegam), resposta automática via salesbot do Kommo acolhe e segura o lead até o primeiro contato humano; o relógio do SLA humano começa na abertura do expediente.

---

## Fronteira a partir do card

A partir do card, cadência/follow-up/qualificação = Kommo (fronteira em [`system/arquitetura.md`](../../system/arquitetura.md)). **CTWA** (anúncio→WhatsApp direto, sem LP) é caminho de primeira classe spec'ado em [`specs/eventos/ctwa.md`](../eventos/ctwa.md) — entra pela mesma integração WhatsApp↔Kommo, com atribuição por `referral`/`ctwa_clid` (D-14).

---

## A/B na LP

Server-side, sem flicker; níveis página/bloco/flag; métrica primária = lead (qualificado quando possível); exposição via `experiment_exposure`. Motor e guardrails estatísticos em [`system/experimentacao.md`](../../system/experimentacao.md).
