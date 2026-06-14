/**
 * Travas de fronteira (09 §2) — não são convenção, são CI.
 * Violação = build falha. Regras derivadas das decisões D-9 e da arquitetura 03 §2.
 */
module.exports = {
  forbidden: [
    {
      name: "site-nao-importa-runtime",
      comment:
        "site só pode importar de packages/* — nunca de admin ou api-server (03 §2, 09 §2).",
      severity: "error",
      from: { path: "^site/" },
      to: { path: "^(admin|api-server)/" },
    },
    {
      name: "admin-nao-importa-runtime",
      comment: "admin só pode importar de packages/* — nunca de site ou api-server.",
      severity: "error",
      from: { path: "^admin/" },
      to: { path: "^(site|api-server)/" },
    },
    {
      name: "api-server-nao-importa-runtime",
      comment: "api-server só pode importar de packages/* — nunca de site ou admin.",
      severity: "error",
      from: { path: "^api-server/" },
      to: { path: "^(site|admin)/" },
    },
    {
      name: "site-sem-banco",
      comment:
        "D-9: o site (Astro) jamais acessa Postgres. Conteúdo via API do Payload; eventos via /collect.",
      severity: "error",
      from: { path: "^site/" },
      to: {
        path: "node_modules/(drizzle-orm|drizzle-kit|pg|postgres|@neondatabase|pg-boss|@payloadcms/db-postgres)",
      },
    },
    {
      name: "api-server-camadas-routes",
      comment:
        "09 §1.1: routes nunca importa repositories/integrations direto — sempre via services.",
      severity: "error",
      from: { path: "^api-server/src/routes/" },
      to: { path: "^api-server/src/(repositories|integrations)/" },
    },
    {
      name: "services-sem-http",
      comment:
        "09 §1.1: services são lógica pura/testável — não conhecem Express/HTTP.",
      severity: "error",
      from: { path: "^api-server/src/services/" },
      to: { path: "node_modules/express" },
    },
    {
      name: "sem-dependencia-circular",
      comment: "Ciclos de import são proibidos.",
      severity: "error",
      from: {},
      to: { circular: true },
    },
    {
      name: "sem-orfaos",
      comment: "Módulo órfão (não importado por ninguém) — provável código morto.",
      severity: "warn",
      from: {
        orphan: true,
        pathNot: ["\\.d\\.ts$", "(^|/)index\\.ts$", "\\.config\\.(js|cjs|ts)$", "(^|/)db/schema\\.ts$", "\\.test\\.ts$"],
      },
      to: {},
    },
  ],
  options: {
    doNotFollow: { path: "node_modules" },
    exclude: { path: "(^|/)(\\.next|\\.astro|dist|build|\\.output)/" },
    tsPreCompilationDeps: true,
    tsConfig: { fileName: "tsconfig.base.json" },
    enhancedResolveOptions: {
      extensions: [".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".astro"],
    },
    includeOnly: "^(site|admin|api-server|packages)/",
    reporterOptions: { text: { highlightFocused: true } },
  },
};
