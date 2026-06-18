# specs/ — ingredientes técnicos (por domínio)

Os **detalhes técnicos granulares** derivados do business, organizados **por domínio**. Vários specs por domínio (ex.: `eventos/` tem schema-evento, collector, destinos, loop-fechado, ctwa…). A **coesão** de cada domínio vive em [`../system/`](../system/) (que agrega estas specs); a execução vira work-order em [`../tasks/`](../tasks/).

Domínios: `plataforma/` · `landing-pages/` · `eventos/` · `admin/` · `blog/` · `experimentacao/` · `engenharia/` · `design-system/`.

> Cada arquivo declara, na 2ª linha, `Camada · Domínio · Origem · Tom`. O campo **Origem** registra o doc legado de onde o conteúdo veio (rastreabilidade), não um link vivo.
