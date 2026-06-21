# Domínio Inteligência-Competitiva — Lacunas Conhecidas e Decisões Futuras

**Camada:** business · **Dominio:** inteligencia-competitiva · **Origem:** WO-INTEL-001 (passo B) · **Tom:** trabalho

> Companheiro de [`_dominio.md`](_dominio.md). Lacunas = **incógnitas** a descobrir; Decisões Futuras = escolhas **deliberadamente adiadas**. Nenhuma destas bloqueia o núcleo curável (D-20).

---

## §1 — Lacunas (incógnitas)

- **L1 (ALTA) — camada Pessoa/Party (cross-domain):** o vendedor do rival (cliente oculto), o autor de review, o casal são **pessoas**. A entidade **canônica** Pessoa **não se modela aqui** — é transversal, para o `doc-domain-architect`. O intel guarda um **contato-origem leve** (quem originou + contato), de **visibilidade interna**, para validação e prospecção (`INTEL-FONTE-03` emendada — nunca divulgado).
- **L2 (ALTA) — fronteira intel ↔ comercial:** **onde** a munição é consumida (a superfície no ponto-de-uso — card no funil? admin?) e o **ownership fino** de Ganho/Perda. Decidido em nível de princípio (dono = comercial; consumo no ponto-de-uso), mas a fronteira fina é do Domain Map (passo C) + do mapeamento do funil comercial (B1, adiado).
- **L3 — ownership de Observação/Finding:** confirmar no Domain Map que a captura/síntese são deste domínio (esperado, mas o map é quem crava).
- **L4 — atributos econômicos do Grupo:** aporte, playbook de mídia (centralizado × por-espaço), sub-marcas de serviço que atendem terceiros — a firmar **com** a coleta, não cravados agora.
- **L5 — granularidade sub-espaço a sub-espaço:** sub-marcas/sub-espaços de um mesmo Espaço-Concorrente seguem como atributo/lista leve; o detalhamento fino é adiado até o dado provar necessidade recorrente (camada cara, atribuição muda por aquisição) — Fase 3, congelada.
- **L6 — taxonomia fina de munição:** as formas *landmine / trap-question / quick-dismiss / counter-FUD* (FUD = medo, incerteza e dúvida) — revisitar quando a faceta descongelar **e** houver feedback de closer (gate D-19).
- **L7 — limiares temporais:** faixas exatas de longevidade ("vencedor"), de cadência (diário/semanal/mensal) e de frescor/staleness — calibrar com dado real (são detalhe de spec, não cravados no business).
- **L8 — custo/cadência de manutenção:** o custo operacional de manter o radar + a base de conhecimento (KB) curados ao longo do tempo.
- **L9 — taxonomia fina de Estética, subtipos de Canal e tipos de Observação:** a estabilizar com o uso.
- **L10 (ALTA) — generalização "Operador de mercado" + vertical Assessoria (cross-domain + discovery):** o fundador sinalizou (jun/2026) que a entidade observada tende a generalizar de **Espaço-Concorrente** para **Operador de mercado** — empresa do mercado de casamento cruzando dois eixos ortogonais: **tipo de serviço[]** (espaço, buffet, decoração, bar, som/DJ, foto, filmagem, assessoria…) e **relação com a VVF** (concorrente, potencial-parceiro, fornecedor, referência-de-curadoria). Motivos: (a) concorrente que não é venue (Buffet com pacote; empresa que vende Buffet+Decor; Buffet que compra espaço → pacote); (b) **vertical futura Assessoria/Planejamento** (absorver leads perdidos; aconselhar o casal em qual fornecedor fechar — curadoria/avaliação interna); (c) **parcerias** (foto/filmagem que trocam conteúdo por indicação) — o mesmo banco serve **intel + curadoria + parceria**. **Espaço-Concorrente vira um recorte** (`tipo⊇espaço & relação=concorrente`). Encaminhamento: a vertical Assessoria é **iniciativa nova → `doc-discovery-mapper`** (validar vs invariantes/gates — a marca: vertical não dilui o foco); o re-root é do **`doc-domain-architect`** (a fronteira cresce além de "competitiva"). **Não se modela aqui** até validado (Arquitetura §6.4). Ver DR6.
- **L11 (ALTA) — banco de endereços agnóstico/compartilhado (transversal):** o fundador sugeriu (jun/2026) um registro de **endereços agnóstico** que qualquer entidade referencia, habilitando um **mapa geolocalizado** dos rivais (e, depois, dos operadores de mercado). É **camada transversal** (família da Pessoa/Party, L1) — não se modela dentro do intel; é do **`doc-domain-architect`**, junto da generalização (L10). No v1, `localizacao` é um grupo embutido no Espaço-Concorrente (endereço completo + coordenada geo); a promoção a referência ao endereço compartilhado é a evolução.

> **Léxico (resolvido):** os termos deste domínio — Grupo, Espaço-Concorrente, Observação, Finding, Estética, Disputa, Pergunta de Inteligência, Battlecard, e os rótulos dos eixos (nível de mercado, movimento de negócio) — estão em [`../../_lexico.md`](../../_lexico.md), **fixados no passo D** (WO-INTEL-001, jun/2026). O antigo `Concorrente-Espaço` foi renomeado para `Espaço-Concorrente` (`doc-reconciler`).

---

## §2 — Decisões Futuras (adiadas deliberadamente)

| ID | Decisão | Contexto |
|---|---|---|
| **DR1** | Build **faseado**: só o registro curado + seed agora (D-20); o motor de coleta automatizada (robôs) e o render no Tracker Hub seguem **congelados** atrás do gate (D-19). | O modelo descreve o domínio inteiro; a construção respeita o gate. |
| **DR2** | O termo "Concorrente" desdobra-se em **Grupo + Espaço-Concorrente**; formalizar no léxico. | Decidido nesta sessão (raiz observada = Espaço-Concorrente). Passo D. |
| **DR3** | Cliente oculto / *mystery shopping* **no escopo** de coleta. | D-24 (emenda à D-19), com a cerca mínima de `INTEL-FONTE-01..05`. |
| **DR4** | Aprovação de munição = **dono único** (o fundador) + **dois níveis** (autonomia para munição em-tom; aval explícito para sensível/PII/ataque). | Decidido nesta sessão — reverte o "comitê de gestão" inicial; alinha a D-1 e ao padrão autonomia-com-revisão-a-posteriori. |
| **DR5** | **Ganho/Perda é do comercial**; a inteligência consome por conexão. | Decidido nesta sessão — evita duplo-dono (respeita D-9); fronteira fina ao Domain Map. |
| **DR6** | **Sequência da generalização:** o passo E (spec) fecha **venue-only** (Espaço-Concorrente); a generalização "Operador de mercado" + a vertical Assessoria rodam como **mapeamento próprio** (discovery + Domain Map + léxico) **antes** do System Doc (passo F) e da implementação — o System pode abranger ambos os domínios. | Decidido com o fundador (jun/2026): não deixar vertical não-validada re-rootar um domínio validado, mas capturar o gancho agora p/ o scraping aproveitar. Ver L10. |
| **DR7** | **Citação → intensidade da Disputa:** a intensidade da concorrência é a **contagem de citações** de cada rival na pesquisa de preço (sinal comercial→intel). Captura **interina no intel agora** (manual, collection `citacoes`); o **feed automático do funil comercial (B1)** e a migração da captura para o registro de lead são o **handoff bidirecional** do Domain Map §7 — a firmar quando o B1 for mapeado. | Pedido do fundador (jun/2026): métrica importante, **não** futuro distante — o lado intel (agregação) entra já; só a automação espera o B1. |

---

## §3 — Próximos passos do pipeline (WO-INTEL-001)

Este Business Doc (passo B) habilita, na ordem: **C** Domain Map (`doc-domain-architect`, com 2 Business Docs: comercial + inteligência-competitiva), **D** léxico (`doc-lexicon-keeper`), **E** specs (`doc-specs-mapper`), **F** System Doc (`doc-system-mapper`), e então **G** implementação do registro curado + seed.
