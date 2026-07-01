---
id: WO-ADMIN-004
status: done
traces: [system/design-system.md, specs/design-system/tokens.md, specs/design-system/tipografia.md, system/admin.md]
deps: [WO-ADMIN-001]
skills: [app-react-best-practices]
review: pass
reviewed_by: wo-review/normal-1
reviewed_sha: d6f59d1f4eecc88f769bf5a18a64e69bd16a5288
---
# WO-ADMIN-004 · Branding do admin (Payload) com os tokens do design-system VV

**Quem executa:** Claude Code (delegado). **Camada de tom:** trabalho. **Origem:** pedido do fundador — o chrome do admin está no visual de fábrica do Payload.

## 1. Objetivo (o quê & por quê)
Vestir o chrome do admin do Payload com a identidade visual VV (paleta, tipografia, logo), reusando os tokens canônicos do design-system. Hoje o admin está no tema de fábrica; o objetivo é a marca + mais respiração/tipografia própria — **sem redesenhar telas**. É ferramenta interna, então o retorno é conforto de uso, não superfície de cliente.

## 2. Dependências
`WO-ADMIN-001` (Payload + registros) — `done`; é o admin que este WO reveste.

## 3. Restrições de design
- **Fonte dos tokens:** `specs/design-system/tokens.md` (paleta HSL) + `tipografia.md` (Playfair Display títulos / Work Sans corpo). Não inventar cor fora da paleta canônica (CONTEXTO-IA §5).
- **Adaptar, não copiar literal** — o design-system é do site público (marketing); o admin é CRUD denso:
  - Paleta e fontes: fiéis (creme `#FFFBF7` fundo, verde `#143C37` texto/nav, dourado `#C69F3F` em accents).
  - **Raio:** NÃO aplicar o `--radius: 30px` (pílula de CTA de marketing) em inputs/tabelas — ficaria estranho. Raio funcional moderado; pílula no máximo em botão primário.
  - **Espaçamento:** afinar modestamente a variável base de espaçamento do Payload para mais respiração — sem redesenhar densidade/layout.
- **Tema travado claro** (`admin.theme: 'light'`) — marca é creme-dominante (dark mode é opcional, tokens.md §1.4).
- **Sem emojis / ícones decorativos** no chrome (regra de marca).
- **Compat de upgrade:** override só por variáveis CSS + componentes de branding (Logo/Icon); **sem fork** de componentes internos do Payload, para não brigar com upgrades.
- **Não tocar** collections, access, fields, contratos — só a camada visual.

## 4. Passos
1. Adicionar Playfair Display + Work Sans ao `admin/` via `@fontsource` (as mesmas famílias do site).
2. Criar a folha de estilo custom do admin — mecanismo do Payload 3 (`src/app/(payload)/custom.scss`, auto-importada pelo route group `(payload)`); **verificar o mecanismo exato contra `@payloadcms/ui` 3.85 na execução**.
3. Mapear a paleta VV nas variáveis de tema do Payload (fundo, texto, elevações, sucesso/erro, accent) + setar famílias de fonte (títulos serif / corpo sans) + nudge modesto da variável base de espaçamento.
4. Criar componentes `Logo` e `Icon` de marca e ligá-los em `admin.components.graphics` (ver decisão aberta em §6 sobre o asset).
5. Travar `admin.theme: 'light'`; manter o `titleSuffix` atual.
6. Subir o admin e conferir visualmente (login + dashboard + 1 collection); rodar `pnpm verify` na raiz.

## Arquivos permitidos
- `admin/src/app/(payload)/`
- `admin/src/components/`
- `admin/src/styles/`
- `admin/payload.config.ts`
- `admin/package.json`
- `pnpm-lock.yaml`

## 6. Fora de escopo
- Reskin completo de layout/densidade, telas custom, nav custom — **diferido** (decisão do fundador).
- Qualquer mudança no site público, `packages/contracts`, collections, access.
- **Decisão aberta (fundador):** não há asset de logo VV no repo. Default proposto = **logo textual em Playfair** ("Vale Verde"); havendo SVG oficial, o fundador fornece e troca-se o componente.

## 7. Skills a carregar (ordem)
- `app-react-best-practices` — Logo/Icon são componentes React no admin (Next); seguir os padrões de render/bundle.
- Nenhuma skill dona §6.1: a cerca é só código de app em `admin/`, não toca artefato canônico.

## 8. Critérios de aceite (done looks like)
- Admin abre com fundo creme, Playfair nos títulos + Work Sans no corpo, accents verde/dourado — **provar** por screenshot (login + dashboard + 1 collection).
- Logo/ícone de marca no lugar do logo Payload — inspeção visual.
- Tema travado claro; **sem regressão funcional** (login, navegação e edição de uma collection funcionam).
- `pnpm verify` verde na raiz (typecheck/lint/boundaries/test/build).
- Diff ⊆ cerca; zero mudança em collections/contracts.

## 9. Refs (ler antes)
- `specs/design-system/tokens.md`, `specs/design-system/tipografia.md` (paleta/tipografia)
- `system/design-system.md` (visão coesa), `system/admin.md` (admin = Payload, editor brand-locked)
- `@payloadcms/ui` 3.85 — mecanismo de CSS custom + `admin.components.graphics` (verificar na execução)
