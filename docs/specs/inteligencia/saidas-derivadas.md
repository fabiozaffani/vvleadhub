# Saídas derivadas — SWOT, Reputação, Mapa, Delta

**Camada:** spec · **Domínio:** inteligência-competitiva · **Origem:** business/inteligencia-competitiva/ (analise.md §1, INTEL-ANL-03; _domain-map.md §3.4) · **Tom:** trabalho

> **Depende de:** [`modelo-de-dados.md`](modelo-de-dados.md) (Observação/Finding de origem).
> **Responsabilidade única:** decidir **materialização × computação** das saídas de síntese, sem reabrir a classificação de negócio. Quase tudo aqui é **congelado** (D-19) — a spec crava a forma, não constrói.

---

## 1. Princípio: derivada, não atributo primário (`INTEL-ANL-03`)

SWOT, Reputação, Mapa e Delta são **produtos da análise**, não atributos do Espaço-Concorrente. **Não viram colunas** em `espacos-concorrentes` — a coleta registra identidade/observações; a análise *produz* as saídas. Persistir uma saída como atributo primário é o erro que ANL-03 proíbe.

## 2. Materialização por saída

| Saída | Forma | Build |
|---|---|---|
| **Delta** ("o que mudou": no ar/novo/parado/reaparição) | **computado, NÃO persistido**. Se preciso registrar, o artefato é o **Finding** do ciclo (não uma tabela de Delta) — _domain-map.md §3.4 | congelado (motor) |
| **SWOT** (Forças/Fraquezas/Oportunidades/Ameaças) | síntese derivada; a **Fraqueza** é o quadrante W (não saída irmã). "Carrega data de validade" = **semântica de frescor**, não coluna `valid_until` pré-comprometida | congelado (anel 2) |
| **Reputação** | agregado das Observações de review | congelado (motor) |
| **Mapa de posicionamento** | **view** dos eixos `estética × nível de mercado × Espaço-VVF` — computado sobre o registro curado | computável já com o registro; render congelado (L3) |
| **Intensidade da Disputa** | **contagem derivada** das `citacoes` por par (rival × Espaço-VVF) — não persistida; é o *top-of-mind share* que alimenta o Mapa (DR7) | computável já com as citações |

## 3. Regra de frescor (sem reabrir negócio)

- O gatilho-primeiro de invalidação é o **Delta material** (INTEL-MUN-05, na munição); o tempo é só rede de segurança. As faixas exatas de staleness/cadência são **L7** (calibram com dado, não cravadas no business).
- As saídas são **re-sintetizadas no ciclo** (o Delta entra na síntese por construção — _dominio.md §6), não persistidas como verdade congelada com TTL.

> **Tudo aqui é congelado para build (D-19)**, exceto o **Mapa** que já é computável sobre o registro curado assim que houver Disputas semeadas (o *render* L3 no Tracker Hub é que segue congelado). A spec define a forma; a construção das saídas espera o gate.
