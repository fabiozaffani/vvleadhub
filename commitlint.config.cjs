// Conventional commits (AGENTS.md "Como trabalhar"). Habilita changelog automático.
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "docs", "chore", "refactor", "test", "perf", "build", "ci", "style", "revert"],
    ],
  },
};
