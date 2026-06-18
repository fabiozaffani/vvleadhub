# Biblioteca de Blocos da LP

**Camada:** spec · **Domínio:** landing-pages · **Origem:** 04-landing-pages.md · **Tom:** trabalho

Biblioteca núcleo de Blocos. Cada Bloco declara capacidades por TipoDeAssunto (ver [`specs/plataforma/primitivas.md`](../plataforma/primitivas.md)) e carrega seu guardrail de marca. O motor de composição não conhece instâncias de Assunto, só capacidades — adicionar Bloco = novo componente + registro, sem tocar no motor.

> **Tom:** spec = trabalho. **Todo copy de Bloco é tom de marca** (CONTEXTO-IA §4). Exemplos aqui são ilustrativos.

---

## Blocos núcleo

Cada Bloco abaixo lista o guardrail de marca que carrega por construção:

- **Hero** — imagem colorida sangrada, headline Playfair, CTA primário. *Sem preço/promo (INV-05).*
- **Experiência Integrada** — a jornada end-to-end (planejamento → execução → pós). *Encarna INV-03.*
- **Galeria** — capacidade `galeria[]` (espaço/serviço/campanha). Só imagens próprias; sem filtro artificial (CONTEXTO-IA §5).
- **Prova Social / Depoimentos** — histórias de casais. *Tom sereno, segunda pessoa.*
- **Diferenciais** — ancorado nos 4 diferenciais estratégicos (CONTEXTO-IA §9) + "sem surpresas". *INV-04: confiabilidade de frente sem soar operacional.*
- **Vídeo** — embed leve, lazy.
- **Moodboard/Decoração** — *INV-07: exclusividade pela história, dentro de um repertório de excelência; nunca "customização ilimitada".*
- **História & Exclusividade** — narrativo; vende o único pela história do casal.
- **Período da Campanha** — capacidade exclusiva de `campanha`.
- **Hospedagem** — tour (Morada/Villa); produto ortogonal (ver [`business/comercial/_dominio.md`](../../business/comercial/_dominio.md)).
- **FAQ** — emite `FAQPage`. *OP-03: tranquilidade na jornada inteira.*
- **Form de Lead / Captura** — ver [`conversao-cta.md`](conversao-cta.md). Campos mínimos; opt-in mínimo (diferido LGPD).
- **CTA WhatsApp sticky** — "Falar com especialista", deep-link + payload.
- **Bloco Assessores** — prova de parceria + contato dedicado.
- **Bloco Agendamento de visita** *(futuro — D-13/G3)* — auto-agendamento de tour como conversão de primeira classe (Objetivo `agendar_visita`); o funil M-04 é centrado em visita, e flexibilidade de tour aumenta conversão.

---

## Extensibilidade

Adicionar Bloco = novo componente + registro; não toca no motor. Os Blocos conhecem capacidades, nunca instâncias de Assunto — zero `switch` por nome de Assunto (ver [`specs/plataforma/primitivas.md`](../plataforma/primitivas.md)).
