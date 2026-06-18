# Editor de LP (block-based)

**Camada:** spec · **Domínio:** admin · **Origem:** 06-admin-cms.md (§4) · **Tom:** trabalho

O editor de LP do admin opera o modelo de Bloco da plataforma (`specs/plataforma/primitivas.md`) dentro do editor block-based do Payload (D-1: o modelo de Bloco mapeia direto nos blocks do Payload). A spec da própria LP — capacidades dos Blocos, contrato de lead, SEO/canônico — vive em `system/landing-pages.md` e suas specs irmãs; aqui fica a operação de edição.

---

## 4. Edição

- Adicionar/reordenar/preencher **Blocos**; vincular **Assunto(s)** (N:N) e **Objetivo**.
- **Preview** fiel mobile + desktop.
- **Variantes A/B** a partir de uma LP base (referência ao experimento em `system/experimentacao.md`).
- **Publish/unpublish** com versionamento; **expiração** para Molde de campanha.
- Validação ao salvar: bloco só renderiza capacidade que o Assunto tem (`specs/plataforma/primitivas.md`); avisa slot com conteúdo ausente.

---

## 4.1 Níveis de edição visual (escopo declarado)

1. **Composição por blocos** — adicionar/reordenar por drag-and-drop: nativo, **na v1**.
2. **Live preview** — iframe da página real (Astro, rota de draft/preview) atualizando durante a edição: **na v1**, critério de aceite da Fase 2 (ver `roadmap/fases.md`).
3. **Click-to-edit in-place** (overlay estilo Storyblok): **fora da v1** — no Payload é feature Enterprise; replicar custom só se a dor justificar, como evolução.

Os níveis 1+2 são suficientes para o modelo brand-locked: marketing compõe a partir de blocos aprovados e vê o resultado real — liberdade visual total não é objetivo, é risco de marca.
