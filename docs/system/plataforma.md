# Plataforma — visão de domínio

**Camada:** system · **Domínio:** plataforma · **Origem:** 02-fundacao-plataforma.md · **Tom:** trabalho

> Visão coesa do **motor de LP** como domínio integrado. Aqui fica o *o quê* e o *como as partes compõem o todo*; o **detalhe** mora nas specs irmãs em [`../specs/plataforma/`](../specs/plataforma/). Em conflito de detalhe, a spec vence.

---

## O que é

A plataforma é **uma máquina única** que produz toda LP do produto. Não há "código da LP Acqua" nem "código da LP Campanha": existe **um** modelo abstrato, e cada página executada é uma **derivação** dele. O business-concreto (espaços, serviços, campanhas, moldes, objetivos) vive como **dado**, não como código — a indireção é o produto, pois é o que mantém o sistema vivo enquanto o negócio muda.

A equação que define o domínio:

> **uma LP = Molde + Assunto(s) + Objetivo + Variante (+ overrides)**

"LP Acqua", "LP Gastronomia" e "LP Campanha do Mês" são a **mesma máquina** apontando para Assuntos de tipos diferentes (`espaço`, `serviço`, `campanha`). Trocar de página é trocar de dado, não de código.

---

## Como as três specs compõem o todo

O domínio se decompõe em três specs, cada uma com uma responsabilidade fechada:

- **[`primitivas.md`](../specs/plataforma/primitivas.md)** — as seis primitivas (`Molde de LP`, `TipoDeAssunto`, `Assunto`, `Objetivo`, `Bloco`, `LP`), o princípio de agnosticidade, a emenda Payload (instância = dado; tipo novo = código), o diagrama do modelo, as derivações-exemplo, as dimensões transversais (Tipo de Evento, brand, Pacote — que **não** são Assuntos), a generalização para fora das LPs e os riscos/guardrails. É a fundação que as outras duas pressupõem.
- **[`resolucao-conteudo.md`](../specs/plataforma/resolucao-conteudo.md)** — o runtime do `Bloco`: como ele resolve conteúdo **por capacidade** do Assunto vinculado (nunca por instância), os overrides no admin e a degradação graciosa quando a capacidade não existe.
- **[`ciclo-de-vida.md`](../specs/plataforma/ciclo-de-vida.md)** — o estado das primitivas no tempo: `ativo · descontinuado · arquivado`, despublish/`301` para não deixar página órfã indexada, e a expiração de campanhas pelo `período` — tudo sem deploy.

Lendo na ordem: **primitivas** estabelece o vocabulário e o modelo; **resolução de conteúdo** explica como uma LP composta de um Molde se preenche a partir dos Assuntos; **ciclo de vida** cobre o que acontece quando um Assunto/Molde/Objetivo nasce, sai de cena ou expira.

---

## Fronteiras com outros domínios

- **Comercial (domínio de negócio):** o registro de Assuntos **espelha** o domínio comercial — "Buffet" na plataforma é a representação do domínio Buffet, nunca uma definição paralela. **Divergência de vocabulário é defeito.** Ver [`../business/comercial/_dominio.md`](../business/comercial/_dominio.md).
- **Landing-pages:** a plataforma é o motor; as LPs concretas (Blocos, CTA/conversão, contrato de lead, SEO/canônico, derivações) são o domínio [`landing-pages.md`](landing-pages.md). A regra de não deixar página órfã (despublish/301) conecta com o canônico das LPs.
- **Blog:** a generalização do princípio "concreto = dado" aplica-se a categorias/clusters do blog — ver [`blog.md`](blog.md).
- **Experimentação:** a `Variante (A/B)` da equação da LP é operada pelo domínio [`experimentacao.md`](experimentacao.md).

---

## Validação contra invariantes VVF (nota)

A plataforma é desenhada para honrar as invariantes de marca/negócio (canon em CONTEXTO-IA §2):

- **Tom:** doc = trabalho · copy derivado = marca.
- **INV-03:** Assuntos `serviço` são porta de entrada; a LP vende a experiência completa.
- **INV-07:** customização total vendida só como campanha de exceção (o Autoral).
- **INV-09:** replicação por dados.
- **CONTEXTO-IA §6:** verticais como dimensão (`brand`) atrás de gate; nada hardcoded.

A validação detalhada item a item e os guardrails operacionais estão nas specs (ver tabela de riscos em [`../specs/plataforma/primitivas.md`](../specs/plataforma/primitivas.md) §10).
