# Guardrails de coleta — fonte, PII e cerca de marca

**Camada:** spec · **Domínio:** inteligência-competitiva · **Origem:** business/inteligencia-competitiva/ (_dominio.md §5; D-19, D-24) · **Tom:** trabalho

> **Depende de:** [`modelo-de-dados.md`](modelo-de-dados.md) (campos `fonte`, `contato_origem`, `visibilidade`).
> **Responsabilidade única:** traduzir as regras `INTEL-GERAL` e `INTEL-FONTE` em **pontos de imposição** no registro curado (critério de aceite #7 — "guardrails D-19 escritos na spec"). NÃO redecide as regras (moram no Business Doc).

---

## 1. Cerca de marca (saída) — `INTEL-GERAL-01/02/03`

Não viram constraint de tabela — são **guard de fronteira de saída**: nada adversarial, me-too ou preço do rival cruza para **copy público** (INV-01/03/05). O registro curado **não emite copy** (a munição que emitiria é congelada, D-19), então a imposição vive na **borda intel→landing/comercial**, a construir quando a munição descongelar. Aqui fica **documentado** que:

- `INTEL-GERAL-01` (INV-01): saída de análise nunca justifica me-too/cópia/caça-tendência.
- `INTEL-GERAL-02` (INV-03): comparação só por experiência integrada, nunca componente isolado.
- `INTEL-GERAL-03` (INV-05): preço do rival = inteligência interna; **saber sim, comunicar por preço não**.

## 2. Coleta legítima — `INTEL-FONTE-01..05`

| Regra | Tipo | Ponto de imposição no registro curado |
|---|---|---|
| `INTEL-FONTE-01` | Política | cliente oculto/*mystery shopping* **no escopo** (D-24) — `fonte=cliente_oculto` é valor válido |
| `INTEL-FONTE-02` | Restrição | só meios legítimos — **nota de processo** (não constraint) |
| `INTEL-FONTE-03` *(emendada)* | Restrição | **§3** abaixo |
| `INTEL-FONTE-04` | Restrição | nunca reusar criativo alheio — **nota de processo** |
| `INTEL-FONTE-05` | Política | `fonte` **obrigatória** em toda Observação; `confiabilidade` **derivada** dela |

## 3. PII e a emenda do `INTEL-FONTE-03`

A regra foi **emendada** (jun/2026, aval do fundador): o intel **guarda** a origem e quem originou, para **uso interno** (validação + prospecção), e **nunca divulga**. Pontos de imposição:

- **`origem_url` obrigatória** na Observação — a proveniência pública (link/print) que dá respaldo à afirmação.
- **`contato_origem`** (nome/handle + contato + `lead_potential`) — quem originou; capturado para prospecção.
- **`visibilidade=interna` travada** — `contato_origem` e a identidade **nunca** afloram em superfície pública nem viram copy. A construir como guard de acesso/render no passo G (a spec crava a invariante; o repo ainda não impõe visibilidade em lugar nenhum).
- **Base legal:** dado **público** + **legítimo interesse** (D-19). Mantém-se o **gancho de retenção/visibilidade** (LGPD diferida — AGENTS.md "deferidos"); **não** se implementa LGPD completa agora, mas o campo de visibilidade e a política de retenção ficam como gancho.

## 4. Confiabilidade derivada — `SYS-INTEL-04`

`confiabilidade` **não é campo de entrada** — deriva de `fonte` (enum ordinal **fechado**):

```
publico  <  inferido_de_anuncio  <  cliente_oculto
```

A ordenação é *load-bearing* (pesa a Observação na síntese e na munição sensível). `fonte` (modo de aquisição) é **eixo distinto** de `canal` (a superfície) — ver [`modelo-de-dados.md`](modelo-de-dados.md) §3.6. *(resolve F1: S-FONTE + S-CONFIAB)*
