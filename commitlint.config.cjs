// Conventional commits (AGENTS.md "Como trabalhar"). Habilita changelog automático.
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "docs", "chore", "refactor", "test", "perf", "build", "ci", "style", "revert"],
    ],
    // Relaxado para repo dirigido por agentes: o tipo importa (changelog); casing do
    // subject e comprimento de linha do corpo são fricção sem valor em commits detalhados.
    "subject-case": [0],
    "body-max-line-length": [0, "always", Infinity],
  },
};
