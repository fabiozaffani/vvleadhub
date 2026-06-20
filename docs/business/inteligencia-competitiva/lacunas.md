# Domínio Inteligência-Competitiva — Lacunas Conhecidas e Decisões Futuras

**Camada:** business · **Dominio:** inteligencia-competitiva · **Origem:** WO-INTEL-001 (passo B) · **Tom:** trabalho

> Companheiro de [`_dominio.md`](_dominio.md). Lacunas = **incógnitas** a descobrir; Decisões Futuras = escolhas **deliberadamente adiadas**. Nenhuma destas bloqueia o núcleo curável (D-20).

---

## §1 — Lacunas (incógnitas)

- **L1 (ALTA) — camada Pessoa/Party (cross-domain):** o vendedor do rival (cliente oculto), o autor de review, o casal são **pessoas**. A entidade Pessoa **não se modela aqui** — é transversal, para o `doc-domain-architect`. A regra que protege o doc enquanto isso é `INTEL-FONTE-03` (guardar o conteúdo de negócio, nunca a identidade do indivíduo).
- **L2 (ALTA) — fronteira intel ↔ comercial:** **onde** a munição é consumida (a superfície no ponto-de-uso — card no funil? admin?) e o **ownership fino** de Ganho/Perda. Decidido em nível de princípio (dono = comercial; consumo no ponto-de-uso), mas a fronteira fina é do Domain Map (passo C) + do mapeamento do funil comercial (B1, adiado).
- **L3 — ownership de Observação/Finding:** confirmar no Domain Map que a captura/síntese são deste domínio (esperado, mas o map é quem crava).
- **L4 — atributos econômicos do Grupo:** aporte, playbook de mídia (centralizado × por-espaço), sub-marcas de serviço que atendem terceiros — a firmar **com** a coleta, não cravados agora.
- **L5 — granularidade sub-espaço a sub-espaço:** sub-marcas/sub-espaços de um mesmo Concorrente-Espaço seguem como atributo/lista leve; o detalhamento fino é adiado até o dado provar necessidade recorrente (camada cara, atribuição muda por aquisição) — Fase 3, congelada.
- **L6 — taxonomia fina de munição:** as formas *landmine / trap-question / quick-dismiss / counter-FUD* (FUD = medo, incerteza e dúvida) — revisitar quando a faceta descongelar **e** houver feedback de closer (gate D-19).
- **L7 — limiares temporais:** faixas exatas de longevidade ("vencedor"), de cadência (diário/semanal/mensal) e de frescor/staleness — calibrar com dado real (são detalhe de spec, não cravados no business).
- **L8 — custo/cadência de manutenção:** o custo operacional de manter o radar + a base de conhecimento (KB) curados ao longo do tempo.
- **L9 — taxonomia fina de Estética, subtipos de Canal e tipos de Observação:** a estabilizar com o uso.

> **Pendência de léxico:** os termos novos deste domínio — Grupo, Concorrente-Espaço, Observação, Finding, Estética, Disputa, Pergunta de Inteligência, Battlecard, e os rótulos dos eixos (nível de mercado, movimento de negócio) — ainda **não** estão em [`../../_lexico.md`](../../_lexico.md). Fixá-los é o **passo D** da WO-INTEL-001 (`doc-lexicon-keeper`); até a validação, vale §6.4 (discovery não alimenta léxico).

---

## §2 — Decisões Futuras (adiadas deliberadamente)

| ID | Decisão | Contexto |
|---|---|---|
| **DR1** | Build **faseado**: só o registro curado + seed agora (D-20); o motor de coleta automatizada (robôs) e o render no Tracker Hub seguem **congelados** atrás do gate (D-19). | O modelo descreve o domínio inteiro; a construção respeita o gate. |
| **DR2** | O termo "Concorrente" desdobra-se em **Grupo + Concorrente-Espaço**; formalizar no léxico. | Decidido nesta sessão (raiz observada = Concorrente-Espaço). Passo D. |
| **DR3** | Cliente oculto / *mystery shopping* **no escopo** de coleta. | D-24 (emenda à D-19), com a cerca mínima de `INTEL-FONTE-01..05`. |
| **DR4** | Aprovação de munição = **dono único** (o fundador) + **dois níveis** (autonomia para munição em-tom; aval explícito para sensível/PII/ataque). | Decidido nesta sessão — reverte o "comitê de gestão" inicial; alinha a D-1 e ao padrão autonomia-com-revisão-a-posteriori. |
| **DR5** | **Ganho/Perda é do comercial**; a inteligência consome por conexão. | Decidido nesta sessão — evita duplo-dono (respeita D-9); fronteira fina ao Domain Map. |

---

## §3 — Próximos passos do pipeline (WO-INTEL-001)

Este Business Doc (passo B) habilita, na ordem: **C** Domain Map (`doc-domain-architect`, com 2 Business Docs: comercial + inteligência-competitiva), **D** léxico (`doc-lexicon-keeper`), **E** specs (`doc-specs-mapper`), **F** System Doc (`doc-system-mapper`), e então **G** implementação do registro curado + seed.
