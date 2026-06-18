# docs/ — onde o conhecimento mora

Os MD da raiz ([`../AGENTS.md`](../AGENTS.md), [`../CLAUDE.md`](../CLAUDE.md)) são roteador + regras. O conteúdo vive aqui. Documento de controle (índice, glossário, log de decisões D-1..D-18): [`00-indice-regras.md`](00-indice-regras.md).

**Convenção deste repo (exceção documentada à taxonomia canônica):** as camadas **specs** e **system** vivem como **docs numerados `01`–`09` + `99`** na raiz de `docs/` (legado consolidado), não em `specs/`/`system/`. A ordem de precedência é marca > `01` > `02` > `03` > demais (`00` §5).

| Pasta / arquivo | Papel no pipeline VV |
|---|---|
| `brand/` | Camada de marca (System Context + Design Guidelines). Exceção registrada em `00` §1. |
| `business/` · `system/` | Business/System Docs (padrão vvdomain) — hoje placeholders; serão preenchidos retroativamente. |
| `01`–`09`, `99` | Specs + arquitetura de sistema + engenharia (a camada técnica de fato). |
| `conteudo/` | Inventário de conteúdo (insumo). |
| `tasks/` · `tasks-drafts/` | Work-orders ativas / sugeridas. |

**Pendente (gap conhecido):** `discovery/`, `specs/`, `roadmap/` como pastas — o roadmap hoje vive embutido em `03-arquitetura-sistema.md` §7. Rastreado para criação na padronização da taxonomia.
