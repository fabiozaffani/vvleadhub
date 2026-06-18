# Modo de teste, realtime e saúde de integração

**Camada:** spec · **Domínio:** eventos · **Origem:** 05-event-hub-mensuracao.md (§11) · **Tom:** trabalho

As três capacidades que o **Tracker Hub** opera (ver [`../admin/tracker-hub.md`](../admin/tracker-hub.md)). Definidas aqui (donas do pipeline), operadas lá (console). O campo `test` no contrato está em [`schema-evento.md`](schema-evento.md); os endpoints de teste por destino, em [`destinos.md`](destinos.md).

---

## 1. Modo de teste / validação de integração

O HUB aceita eventos `test:true` (sintéticos, disparados do Tracker Hub). Eles atravessam o pipeline real (intake → enrich → adapters) mas:
- vão para os **endpoints de teste/sandbox** de cada destino (ver [`destinos.md`](destinos.md)) — nunca para produção;
- ficam em **namespace segregado** no store; não entram em métricas, funis nem otimização de mídia;
- retornam um **resultado de round-trip por destino** (aceito/rejeitado + payload + resposta), para validar uma integração de ponta a ponta antes de confiar nela.

## 2. Realtime tap

Stream ao vivo dos eventos no intake (tail), assinável por filtro (tipo, sessão, Assunto, LP, `test`). É o que alimenta o inspetor de eventos do Tracker Hub.

## 3. Saúde de integração

Por destino: taxa de sucesso/erro de dispatch, latência, profundidade de fila, itens em retry e em dead-letter (ver [`confiabilidade.md`](confiabilidade.md)), timestamp da última sincronização. Permite ver "Meta está aceitando? Kommo respondeu?" em um olhar.

## 4. Replay/depuração

Reenviar um `event_id` específico (idempotente) para depurar um destino. Ação sensível → restrita a Admin (ver [`../admin/rbac.md`](../admin/rbac.md)).
