# Composição de páginas (planta) — v1

**Status:** proposta a curar pelo fundador (resolve 99 §1.5 — "composição por Molde, proposta pela IA e curada"). **Camada de tom:** trabalho.
**Fonte:** protótipo de referência `lead-generator-hub` (lido jun/2026) + catálogo de Blocos ([04 §4](../04-landing-pages.md)) + Design Guidelines (`docs/brand/vvf-design-guidelines.md`).
**Regra:** preserva **look-and-feel e a disposição dos elementos** do protótipo; **diagramação e animações são ajustáveis**. **Mobile-first sempre.** Conteúdo v1 = **placeholders marcados** (fotos reais e números dependem do inventário — 🔴 1.4; nunca inventar números/depoimentos como fato).

> O protótipo é a **referência de arranjo**, não de código (D-7 greenfield). Reimplementar em Astro com os Blocos registrados (02/04). Todas as páginas (home, LP, blog) usam **o mesmo look-and-feel**.

---

## 0. Princípios herdados (valem para todas as páginas)
- Mesmo sistema visual em tudo: tokens, **Playfair Display** (títulos) + **Work Sans** (corpo), paleta creme/verde/dourado, **botões pílula** (~30px), movimento sereno (Ken Burns, hovers lentos). Sem emojis, sem ícones decorativos. pt-BR.
- **Mobile-first:** as seções **empilham** verticalmente; grids (cards de espaço, grid do blog) viram **coluna única** no mobile e expandem em colunas no desktop.
- Cada seção = um **Bloco** registrado (04 §4), com capacidades por TipoDeAssunto — montável no admin, nunca hardcoded.
- **Sem preço** em nenhuma página (INV-05). Copy em **tom de marca** (sereno, 2ª pessoa, "sem surpresas").

---

## 1. Chrome global (header + footer)
**Header** (sticky, translúcido sobre o hero): logo **"Vale Verde"** (→ `/`) · nav **"O Espaço"** (→ `/`) · **"Blog"** (→ `/blog`) · CTA pílula **"Agende uma visita"** (→ `#contato`/WhatsApp). Mobile: nav colapsa em menu; o CTA "Agende uma visita" permanece visível.
**Footer** (não existe no protótipo — especificado por necessidade): **NAP** (nome · endereço · telefone) **idêntico ao structured data** (07 §5.1, SEO local) · redes (Instagram…) · **links legais** (privacidade/termos — 3.6, exigência de aprovação de ads) · selo de prêmios/avaliações.

---

## 2. Home (`/`) — Molde "Institucional/Conversão"
Ordem (mobile-first, de cima para baixo). Mapeamento → Bloco do 04 §4:

1. **Hero** → *Bloco Hero.* Eyebrow = slogan **"EXCELÊNCIA EM EXPERIÊNCIA"** (INV-02, literal) · headline serif (ex. protótipo: "Onde o seu para sempre começa") · subhead em tom de marca (sereno, "as únicas surpresas são as boas") · **CTA primário "AGENDE UMA VISITA"**. Fundo: imagem colorida sangrada (vídeo no desktop / Ken Burns still no mobile — Guidelines §6). Sem preço.
2. **Números / prova social** → *Bloco Diferenciais ou Prova Social.* Faixa com 3 métricas (protótipo: "1.000+ eventos realizados" · "5x vencedor [prêmio]" · "4.7 em 1.300+ avaliações Google"). **Placeholders a verificar — não inventar.** Mobile: empilha ou carrossel curto.
3. **Espaços** → *Bloco Galeria/Espaços.* Eyebrow "NOSSOS AMBIENTES" + título "Nossos Espaços" + intro · **4 cards**: **Acqua**, **Florest**, **Serra dos Cristais**, **Morada do Vale**. Cada card = nome + descrição sensorial (itálico para nome do espaço — Guidelines §3) + **3 bullets** (incl. capacidade). Mobile: cards empilham; desktop: grid simétrico (padrão 2-col das Guidelines). Cada card **linka para a futura LP do espaço** (Assunto tipo `espaço` — §4). **Morada do Vale** é `categoria: hospedagem` (01 §3.2), tratada como produto ortogonal.
4. **Form de captura** → *Bloco Form de Lead* (âncora `#contato`). Eyebrow "AGENDE SUA VISITA" + título ("Venha conhecer seu futuro altar") + intro · campos do protótipo: **Nome · E-mail · Telefone/WhatsApp · Tipo de evento · Data prevista · Nº de convidados (aprox.) · Mensagem** · CTA "SOLICITAR ORÇAMENTO E VISITA". **Opt-in mínimo** (gancho LGPD — 00 §7). Submete ao **contrato de lead** (04 §7) → api-server → Kommo.

**Globais na home:** CTA **WhatsApp sticky** no mobile (Bloco CTA sticky — Guidelines §6; oculta o float global p/ não empilhar).

**Enriquecimentos sugeridos (ajustáveis — o protótipo é enxuto; o catálogo 04 §4 permite, mantendo o look):** inserir **Experiência Integrada** (jornada planejamento→execução→pós, encarna INV-03) entre Hero e Espaços; **História & Exclusividade**/**Depoimentos** antes do form. Marcar como proposta a curar.

---

## 3. Blog index (`/blog`) — Molde "Blog"
1. **Hero de blog** → título "Nosso Journal" + intro ("Dicas, tendências e histórias de amor…").
2. **Filtro de categorias** → "Categorias: Todas | …" (clusters do 07).
3. **Grid de posts** → cards: **imagem de capa OU fallback em gradiente verde/dourado** (Guidelines §7 — `coverImage` pode ser null) + título + categoria + data. Mobile: 1 coluna; desktop: grid.
4. Chrome global + CTA de conversão ao fim (encaminha p/ LP/WhatsApp — 07 §9).

---

## 4. Página de espaço / LP — **a construir (não existe no protótipo)**
Mesmo look-and-feel. Molde "Conversão" (02 §6) + Assunto tipo `espaço`. Ordem sugerida (curar):
Hero do espaço (galeria + vídeo-tour) → **Experiência Integrada** (INV-03) → Galeria → **Diferenciais** ("sem surpresas", INV-04) → Depoimentos → **FAQ** (emite `FAQPage`) → **Form/CTA WhatsApp**. Sem preço. Structured data **`EventVenue`** (skill `seo-schema-org`). Indexável (04 §9).

---

## 5. Post de blog — **a construir**
Mesmo look. Hero do post (título serif; imagem de capa ou fallback gradiente) → corpo rich-text → CTAs contextuais p/ `lps_relacionadas` (07 §9) → posts relacionados. Structured data **`BlogPosting`**. `/blog/{slug}`.

---

## 6. Preservar × ajustável (resumo para o builder)
| Preservar (look-and-feel) | Ajustável (curar com o fundador) |
|---|---|
| Tokens, Playfair+Work Sans, paleta, botões pílula, serenidade do movimento | Diagramação fina, animações, grid × carrossel |
| Tom de marca do copy; slogan literal (INV-02); "sem surpresas" | Microcopy, ordem dos blocos de enriquecimento |
| Home: Hero → Espaços → Form; header com "Agende uma visita" | Inserção de Experiência Integrada / Depoimentos / História |
| Mobile-first; 4 espaços; `/blog` como rota | Quantidade de bullets, layout dos cards |
| **Placeholders v1** (fotos, números, depoimentos marcados como tal) | Substituição por conteúdo real (inventário 🔴 1.4) |
