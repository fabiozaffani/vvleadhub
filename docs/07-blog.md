# 07 · Blog

**Status:** draft v1 · **Camada de tom:** trabalho · **Depende de:** 02 (Fundação), 03 (Arquitetura), 06 (Admin); usa o contrato de evento do 05.
**Responsabilidade única:** o motor de conteúdo e SEO — clusters temáticos, modelo de post, e a ponte do conteúdo para a conversão. O 06 é onde o post é editado; aqui está **como** o blog é modelado e por que existe.

> **Tom:** esta spec é trabalho. **Todo texto publicado no blog é tom de marca** (§4 do Contexto): sereno, acolhedor, segunda pessoa. Conteúdo de autoridade, sem perder a voz da marca.

---

## 1. Princípios

1. **Autoridade por clusters, não posts soltos.** SEO de casamento premium é jogo de autoridade temática: pilar + satélites + internal linking forte.
2. **Conteúdo é dado.** Posts, clusters e metadados de SEO são editáveis no 06 — sem deploy.
3. **Performance herdada.** SSG/ISR, imagens otimizadas, fontes self-hosted; o orçamento de CWV do 03 vale aqui.
4. **O blog converte.** Não é vitrine: é topo/meio de funil que encaminha para LP/WhatsApp (§9).
5. **Marca por construção.** Edição brand-locked (tokens §5, guardrails §4). Conteúdo de IA, se usado, passa pelo lint de marca (06 §8).

---

## 2. Papel no ecossistema (Ecossistema de Growth)

O blog serve três estágios do funil de growth:
- **Aquisição (orgânica):** ranqueia e traz tráfego de busca — complementa Meta/Google pagos.
- **Autoridade:** prova de repertório e excelência; sustenta a percepção premium.
- **Nutrição:** conteúdo reaproveitado em e-mail/CRM (Kommo) para leads em consideração.

Vetor ideológico (§3.3 do Contexto): histórias vividas e comemoradas, família e legado — aplicar na pauta quando couber.

---

## 3. Modelo de post

`Post{ id, slug, título, subtítulo, hero (imagem colorida sangrada), corpo (rich-text), cluster_ref, assuntos_relacionados[], lps_relacionadas[], seo{ title, description, og, canonical }, structured_data, status, publicado_em, atualizado_em }`

Notas:
- `assuntos_relacionados[]` aponta para Assuntos (espaço/serviço/campanha — 02) → habilita internal linking automático para as LPs daquele Assunto.
- `lps_relacionadas[]` define os CTAs de conversão do post (§9).
- Imagens seguem §5 (coloridas, sangradas, sem banco genérico; P&B só para detalhe).

---

## 4. Arquitetura de conteúdo (clusters)

- **Cluster = dado** (não enum): um tema-pilar + N posts satélite.
- **Pilar:** página/post abrangente sobre o tema (ex.: "como planejar um casamento no interior").
- **Satélites:** posts específicos que linkam de volta ao pilar e entre si.
- **Internal linking** orienta autoridade para os pilares e dos pilares para as LPs (via `assuntos_relacionados`).
- **Formato âncora: "casamentos reais"** (auditoria growth) — um casamento real por post: o espaço, a história do casal, a experiência conduzida. É simultaneamente o melhor conteúdo de busca do segmento (casais pesquisam o espaço pelo nome + "casamento real"), prova social viva e matéria-prima de nutrição via Kommo. Cada post referencia o Assunto `espaço` correspondente (internal linking automático para a LP). **Exige termo de uso de imagem do casal** — item do inventário de conteúdo (`docs/conteudo/inventario.md`); sem termo, não publica.

---

## 5. SEO on-page

- **Structured data (JSON-LD):** `BlogPosting`/`Article`, `BreadcrumbList`, `ImageObject`; `FAQPage` quando houver FAQ; `VideoObject` quando houver vídeo (D-13).
- Canonical em todo post · OG/Twitter cards · `sitemap.xml` e `robots.txt` automáticos.
- URLs limpas e estáveis: `/blog/{slug}` (slug não muda após publicar; mudança gera `301`).
- `hreflang` pt-BR (preparado para futuro internacional).
- Heading hierarchy semântica; alt text descritivo nas imagens.

### 5.1 SEO local (elevado pela auditoria growth — fecha 99 §2.4.3)

Para "espaço de casamento em <cidade>", o **map pack** decide mais que o orgânico tradicional — o investimento em clusters não substitui isto:

- **Google Business Profile por espaço** (categoria correta, fotos reais, descrição em tom de marca), reivindicado/criado até o fim da Fase 1 (critério em 03 §7.1).
- **NAP idêntico** em todo lugar: site, structured data (skill `seo-schema-org` §5) e GBP — divergência custa ranking local.
- **Reviews acoplados ao NPS (M-01):** quando a medição de NPS estiver rodando, resposta com nota alta dispara o convite de avaliação no GBP — é a sinergia entre a meta de qualidade e o ativo de SEO local. (Não usar `AggregateRating` self-serving no markup do próprio site — o Google ignora desde 2019; a estrela vem do GBP.)
- Operação contínua (responder avaliações, posts no perfil) é pós-go-live (00 §4.9); a **estrutura** — perfis criados, NAP consistente, gancho NPS→review — é pré-go-live.

---

## 6. Performance

- SSG/ISR (estático com revalidação), servido do edge.
- Imagens AVIF/WebP responsivas (`next/image` ou equivalente); lazy abaixo da dobra.
- Fontes conforme Design Guidelines §3 (Playfair + Work Sans; exceção registrada), carregamento não-bloqueante.
- JS mínimo em rota de conteúdo; sem libs pesadas. CWV como gate (03).

---

## 7. Relação Blog ↔ Assunto ↔ LP

O blog é a camada de descoberta; a LP é a de conversão. A ligação é dado:
- Post sobre gastronomia → `assuntos_relacionados: [Gastronomia (serviço)]` → CTA/links para a LP de Gastronomia.
- Post sobre um espaço → linka a LP daquele espaço.
- Quando um Assunto é descontinuado (02 §5), links para ele entram em redirect — sem link quebrado.

---

## 8. Eventos do blog para o HUB

Reusa o contrato canônico (05 §4): `page_view`, `scroll_depth`, `cta_click` (para LP/WhatsApp), `whatsapp_handoff`/`lead` (se houver CTA de captura inline). Permite medir qual conteúdo gera lead, não só tráfego — alimenta o painel (05 §12) e a atribuição.

---

## 9. Conversão a partir do blog

- **CTAs contextuais** para as `lps_relacionadas` ou WhatsApp (com `xcode`/UTM — 06 §7).
- **Sem eixo de preço (INV-05):** conteúdo nunca usa preço/promoção como gancho.
- **Nutrição:** posts viram material de e-mail/CRM (Kommo) para leads em consideração.
- Meta de conversão do blog é encaminhamento qualificado para a LP/WhatsApp, não pageview.

---

## 10. Edição no admin (handoff 06)

Posts são criados/editados no 06: rich-text, mídia, campos de SEO, escolha de cluster e de Assuntos/LPs relacionados, preview, publish/versionamento. RBAC: Editor de conteúdo e Marketing publicam; brand-locked.

---

## 11. Decisões & diferidos (fonte: 00 §6)

- **D-1** (CMS) — aberto; modelo de post é agnóstico.
- Geração de conteúdo por IA — opção, não requisito; sempre via lint de marca (06 §8). Sem decisão travada.

---

## 12. Validação contra invariantes VVF

- **Tom:** spec = trabalho ✓ · conteúdo publicado = marca ✓
- **INV-03 (experiência integrada):** conteúdo conduz à experiência completa, nunca a um componente isolado ✓
- **INV-05 (sem preço):** nenhum gancho de preço/promoção ✓
- **INV-09 (replicável):** clusters e posts por dado; internal linking automático por Assunto ✓
- **Performance:** SSG/ISR + CWV como gate ✓
- **§3.3 (legado/histórias):** pauta ancora no vetor ideológico quando couber ✓
