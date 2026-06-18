# Modelo de experimento — tipos de teste e estrutura

**Camada:** spec · **Domínio:** experimentacao · **Origem:** 08-experimentacao.md · **Tom:** trabalho

Detalhe dos tipos de teste suportados pelo motor e da estrutura de dados de `Experimento`/`Variante`. A visão coesa do domínio (motor agnóstico, princípios, fronteiras) está em `system/experimentacao.md`.

---

## Tipos de teste

- **Página/LP:** LP A vs LP B (mesmo Molde de LP, conteúdo/estrutura diferentes).
- **Bloco:** um Bloco em duas versões (ex.: Hero v1 vs v2) dentro da mesma LP.
- **Funcionalidade:** ligar/desligar comportamento via **feature flag** (não é A/B — é rollout/kill switch). Detalhe em `feature-flags.md`.

---

## Modelo de experimento

```
Experimento{ key, hipótese, métrica_primária, métricas_secundárias[], variantes[],
             alocação_tráfego, segmento, status, início, fim, significância_alvo }

Variante{ key, peso, referência (LP/bloco/flag) }
```

Regras:

- `métrica_primária` definida **antes** de iniciar (evita escolher a métrica que "deu certo" depois).
- `segmento` opcional (ex.: só mobile, só origem Meta).
- `status`: rascunho · rodando · pausado · concluído.

A `referência` de uma Variante aponta para o objeto sob teste — uma LP, um Bloco ou uma feature flag. As variantes de página/Bloco são definidas no domínio de landing pages (ver `system/landing-pages.md`), que *usa* o experimento e o referencia; aqui mora apenas a estrutura do experimento que as decide.

A mecânica de como a `métrica_primária` se conecta ao resultado real (lead/lead qualificado) e os limites estatísticos (`significância_alvo`, amostra/duração mínimas) estão em `guardrails-estatisticos.md`. A atribuição determinística da Variante por usuário está em `atribuicao-bucket.md`.
