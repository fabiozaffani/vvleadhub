# Domínio Comercial — Lacunas Conhecidas

**Camada:** business · **Dominio:** comercial · **Origem:** 01-modelo-dominio.md · **Tom:** trabalho

> Lacunas que **não bloqueiam a plataforma**, mas precisam ser mapeadas formalmente. Companheiro de [`_dominio.md`](_dominio.md), que carrega o modelo validado.

---

## §1 — A mapear (escopo de Business Docs formais)

Os seguintes recortes do domínio comercial seguem **não mapeados** — são escopo de Business Docs formais (skill `doc-business-mapper`) e do Domain Map (skill `doc-domain-architect`), quando rodados:

- **Ciclo de vida das entidades** — estados e transições de `Tipo de Evento`, `Espaço`, `Pacote`, `Serviço` e `Hospedagem` ao longo do tempo (do registro à oferta ativa à descontinuação).
- **Regras de negócio numeradas** — as regras que regem composição de pacote, elegibilidade de adicionais, condições de hospedagem etc. ainda não estão enumeradas de forma rastreável.
- **Atores e responsabilidades** — quem cria/edita/aprova cada entidade (comercial, controladoria, marketing) não está formalizado.
- **Ownership canônico fino** — a fronteira exata entre o domínio comercial e os domínios de serviço (Buffet, Decoração, Cerimonial, …) precisa de Domain Map. O `Serviço` da camada de composição é representação; o dono canônico é o domínio de serviço (ver nota de ownership em [`_dominio.md`](_dominio.md) §3.4).

A camada estrutural cross-domain do `_dominio.md` §2 fica registrada como **input** para esse futuro Domain Map.
