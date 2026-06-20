# Inteligência-Competitiva — Anel 2: Leitura / Análise (Estratégia)

**Camada:** business · **Dominio:** inteligencia-competitiva · **Origem:** WO-INTEL-001 (passo B) · **Tom:** trabalho

> Pré-requisito de leitura: [`_dominio.md`](_dominio.md). Este arquivo cobre a **leitura humana** sobre o núcleo de coleta ([`coleta.md`](coleta.md)): o que transforma observação em decisão. É **incremental** — cresce com a curadoria — e parte fica em Lacuna.

---

## §1 — Entidades e saídas

### §1.1 — `Pergunta de Inteligência`
**O que é:** a pergunta de negócio que direciona o **esforço caro** de coleta (cliente oculto, perfil profundo) — ex.: "quem está roubando minhas datas de alta temporada?".
**Papel:** o baseline recorrente do radar **não** depende dela (`INTEL-ANL-01`); ela aponta onde investir o esforço que não escala.
**Tipos / ciclo de vida:**
- **pontual** — tem estado terminal `respondida`.
- **monitoramento contínuo** — nunca terminal: `ativa ↔ pausada`, guardando a última leitura.

O default é **contínua** — perguntas de monitoramento são permanentes.

### §1.2 — `SWOT` e `Reputação` *(saídas de síntese)*
**O que são:** consolidados **derivados** da coleta — produtos da análise, **não** atributos primários do Concorrente-Espaço (o robô *coleta* identidade/anúncios/reviews; a análise *produz* SWOT). SWOT = **Forças, Fraquezas, Oportunidades, Ameaças**. Carregam data de validade. A Reputação é o agregado derivado das Observações de review.
**Célula W (Fraquezas) do SWOT:** a Fraqueza é o **quadrante W** — **não** uma saída irmã — nutrida sobretudo pelo **negativo** dos reviews + o cliente oculto (D-24), a matéria-prima mais rica do domínio (o reverso da força).

### §1.3 — `Ganho/Perda` *(conexão, não entidade deste domínio)*
**O que é:** o registro de **por que o casal escolheu a VVF ou o rival** — o feedback que dá vida à munição e aos diferenciadores/vulnerabilidades.
**Ownership:** **é do domínio comercial.** O motivo é capturado no **funil**, pelo time comercial, no momento da decisão; a inteligência o **consome por conexão** (o agregado), não o origina nem o possui.
**Realidade da venda premium:** o casal perdido raramente diz o motivo real — por isso um registro de Ganho/Perda é **válido mesmo sem motivo** ("sumiu sem dizer" é dado de 1ª classe), e a contribuição de intel de campo é responsabilidade de **baixa fricção**, no fluxo onde o ator já está (a superfície fica na spec).

### §1.4 — `Mapa de posicionamento` *(saída derivada)*
**O que é:** uma visão que plota os rivais em eixos (ex.: rústico ↔ clássico, intimista ↔ grande porte) para enxergar **a posição que ninguém ocupa** (o chamado *white space*). É view derivada, não entidade.

---

## §2 — Regras de negócio (`INTEL-ANL-`)

- `INTEL-ANL-01` (Heurística): a **varredura recorrente do núcleo é baseline contínuo** e não depende de pergunta prévia; a Pergunta de Inteligência direciona o **esforço caro** (cliente oculto, perfil profundo). *(Coleta de rotina sem pergunta não é "acúmulo" — é o radar fazendo o seu trabalho.)*
- `INTEL-ANL-02` (Restrição): o motivo de **Ganho/Perda é dado do comercial** (dono = comercial); a inteligência o **consome por conexão**, não o origina nem possui. Um registro é válido **mesmo sem motivo**.
- `INTEL-ANL-03` (Heurística): **SWOT (Forças/Fraquezas/Oportunidades/Ameaças) e Reputação são saídas de síntese** (derivadas), não atributos primários; a **Fraqueza é o quadrante W do SWOT** — não saída irmã —, nutrida sobretudo pelo negativo de reviews + cliente oculto.
- `INTEL-ANL-04` (Heurística): o mapa de posicionamento busca a **posição não ocupada** — reforça `INTEL-GERAL-01` (criar espaço, não seguir).
