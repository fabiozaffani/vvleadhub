---
id: WO-SITE-003
status: pending
traces: [system/arquitetura.md, specs/admin/editor-lp.md, specs/admin/tracker-hub.md]
deps: [WO-SITE-001, WO-ADMIN-001]
skills: [work-order]
---
# WO-SITE-003 · publish→purge + preview de draft

**Quem executa:** Cursor Composer. **Camada de tom:** trabalho. **Origem:** ex-WO-04.

## Objetivo
Fechar o loop de publicação: editar no Payload reflete no site; preview de draft seguro.

## Arquivos permitidos (a cerca)
`admin/src/hooks/**`, `site/src/pages/preview/**`, `site/src/lib/**`.

## Aceite
- Hook de publish do Payload lista URLs afetadas → **purge no Cloudflare** (Astro não tem ISR; o "incremental" é purge por URL — `system/arquitetura.md` §SEO/cache, D-8).
- Rota `/preview` no Astro SSR com **token assinado** (segredo compartilhado) + `noindex` — nunca draft por query param aberto (restrição de build 6).

## Refs
[`system/arquitetura.md`](../system/arquitetura.md) (render/cache/purge), [`specs/admin/editor-lp.md`](../specs/admin/editor-lp.md) (live preview, nível 2).
