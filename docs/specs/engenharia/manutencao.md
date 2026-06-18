# Disciplina de manutenção

**Camada:** spec · **Domínio:** engenharia · **Origem:** 09-engenharia.md · **Tom:** trabalho

Obrigatória, não opcional: patch de segurança, política de upgrades e o gotcha do build do admin.

## 7. Disciplina de manutenção (obrigatória — não opcional)

- **Renovate/Dependabot ativo** com prioridade de segurança. Racional registrado: o Payload teve CVE crítico (SQLi 9.8) em adapters Postgres — corrigido, mas self-host sem disciplina de patch é exposição real. Janela: patch de segurança aplicado em **≤ 14 dias** (validado pelo fundador).
- Upgrades de minor agrupados quinzenais; major com changelog lido e teste de regressão.
- **Build do `admin/` (Payload) usa `next build --webpack`, não Turbopack** (descoberto no 1º build, jun/2026): o Turbopack — default do `next build` no Next 16 — entra em crash-loop na stack do Payload. Não é bug de código. **Regra de upgrade:** a cada bump de Next ou Payload, re-testar o `next build` puro (Turbopack); quando compilar limpo, remover o `--webpack`. Não reverter o `--webpack` sem esse teste passar.
