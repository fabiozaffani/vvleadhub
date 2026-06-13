---
name: seo-schema-org
description: Detectar, validar e gerar structured data (Schema.org, JSON-LD) para o site VVF — EventVenue/LocalBusiness, Event, Article/BlogPosting, VideoObject, BreadcrumbList, Organization/WebSite. Usar quando a tarefa mencionar schema, structured data, rich results, JSON-LD ou markup, e na verificação do critério de aceite "structured data validando" da Fase 0.
license: MIT
metadata:
  vendored-from: https://github.com/AgriciDaniel/claude-seo (skills/seo-schema v2.0.0, commit dabfc1a, 2026-05-25)
  vendored-changes: >
    adaptacao substancial — subconjunto de tipos relevante ao VVF,
    templates reescritos para o dominio (espaco de eventos, pt-BR,
    endereco BR), regra INV-05 (sem preco) adicionada, referencias ao
    roadmap do projeto; tabela de tipos depreciados mantida da fonte
    (references/deprecated-types-2024-2026.md)
---

# Structured data (JSON-LD) — VVF

## Regras do projeto (vencem qualquer template)

1. **JSON-LD sempre, no HTML server-rendered.** O site é Astro SSR/SSG — o JSON-LD entra no HTML inicial (`<script type="application/ld+json">`), nunca injetado via JavaScript (processamento atrasado pelo Google).
2. **Sem preço — INV-05 vale para markup.** Nunca emitir `Offer`, `price`, `priceRange` ou qualquer campo comercial, mesmo que o tipo aceite. O schema descreve o negócio e o conteúdo, não condições comerciais.
3. **Só dado verdadeiro e verificável.** Dados do negócio (nome, endereço, telefone, redes) vêm de registro/seed (tudo business-concreto é dado, 02 §1) — nunca inventar ou deixar placeholder em produção. Placeholder só em rascunho, claramente marcado.
4. **pt-BR:** `inLanguage: "pt-BR"`, `addressCountry: "BR"`, datas ISO (`YYYY-MM-DD`).
5. **NAP consistente** (Name, Address, Phone): os mesmos valores em todo o site, no schema e no Google Business Profile — divergência custa SEO local.
6. **Validação é critério de aceite** (Fase 0: "structured data validando — Rich Results Test"). Validar antes de declarar pronto: https://search.google.com/test/rich-results e https://validator.schema.org.

## Tipos canônicos do VVF

| Página | Tipo(s) | Notas |
|---|---|---|
| Site todo (uma vez, home/layout) | `Organization` + `WebSite` | logo, `sameAs` (Instagram etc.), telefone |
| Página de espaço | `["EventVenue", "LocalBusiness"]` (multi-type) | `EventVenue` é `Place > CivicStructure` — **não** é LocalBusiness; o multi-type garante o tratamento de negócio local do Google. Endereço, geo, foto; sem `priceRange`. Nunca `AggregateRating` self-serving (Google ignora desde 2019 — a estrela vem do GBP) |
| Post de blog | `BlogPosting` (ou `Article`) | autor, datas, publisher; imagem se houver |
| Post/página com vídeo | `VideoObject` | previsto na D-13; thumbnail, duração, uploadDate |
| Toda página interna | `BreadcrumbList` | trilha real de navegação |
| LP de campanha | herda o tipo do Assunto (espaço → `EventVenue`+`LocalBusiness`) | LPs efêmeras são `noindex` e LPs extras de um Assunto apontam canonical para a página evergreen (04 §9 — um Assunto = uma página indexada): markup completo só na canônica |
| Evento público (se houver, ex.: open house) | `Event` | local = o `EventVenue`; sem `offers` |

**FAQPage:** rich result restrito pelo Google (ago/2023) a sites governamentais/saúde — não esperar rich result; o markup ainda é válido e pode ajudar AEO/GEO, usar com expectativa correta.

**Tipos depreciados:** consultar `references/deprecated-types-2024-2026.md` antes de recomendar tipo fora da tabela (HowTo, SpecialAnnouncement etc. já eram).

## Templates

### Organization (home/layout)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Vale Verde Festas",
  "url": "[URL canônica do site]",
  "logo": "[URL absoluta do logo]",
  "telephone": "[telefone E.164, o mesmo do Kommo/GBP]",
  "sameAs": ["[Instagram]", "[demais perfis oficiais]"]
}
```

### EventVenue (página de espaço)
```json
{
  "@context": "https://schema.org",
  "@type": ["EventVenue", "LocalBusiness"],
  "name": "[Nome do espaço — do registro Assunto tipo espaço]",
  "url": "[URL canônica da página]",
  "image": "[foto principal — pipeline D-10]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[rua, número]",
    "addressLocality": "[cidade]",
    "addressRegion": "SP",
    "postalCode": "[CEP]",
    "addressCountry": "BR"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": "[lat]", "longitude": "[long]" },
  "containedInPlace": { "@type": "Organization", "name": "Vale Verde Festas" }
}
```

### BlogPosting
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "[título do post]",
  "inLanguage": "pt-BR",
  "author": { "@type": "Person", "name": "[autor]" },
  "datePublished": "[YYYY-MM-DD]",
  "dateModified": "[YYYY-MM-DD]",
  "image": "[URL absoluta, se houver]",
  "publisher": {
    "@type": "Organization",
    "name": "Vale Verde Festas",
    "logo": { "@type": "ImageObject", "url": "[logo]" }
  },
  "mainEntityOfPage": "[URL canônica do post]"
}
```

## Procedimento

**Detecção/validação (página existente):**
1. Buscar `<script type="application/ld+json">` no HTML renderizado (e Microdata/RDFa legados — recomendar migração para JSON-LD).
2. Checar: `@context` presente · `@type` válido e não-depreciado · propriedades obrigatórias do tipo · URLs absolutas · datas ISO · sem placeholder · **sem campo de preço**.
3. Reportar em tabela (schema × status × problemas) com a correção pronta.

**Geração (página nova):**
1. Identificar o tipo pela tabela canônica acima (não inventar tipo novo sem checar depreciados).
2. Preencher com dados reais do registro (Payload) — apontar a origem de cada campo.
3. Validar no Rich Results Test antes de dar o item por pronto.
