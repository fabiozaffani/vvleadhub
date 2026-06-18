<!-- AGENTS.md: PR pequeno e temático; conventional commits; bug corrigido = teste junto. -->

## O quê / Por quê
<!-- 1–3 linhas. Qual work-order (docs/tasks/) e qual critério de aceite (docs/roadmap/fases.md §7.1) este PR atende? -->

## Autor (D-16, emendada pela D-18)
- [ ] Cursor Composer (builder primário)
- [ ] Claude Code (auxiliar — auditoria/revisão/gates; build escopado quando delegado)
- [ ] Toca `packages/contracts` ou `docs/` → **requer aval do fundador (CODEOWNERS)**

## Checklist (DoD — AGENTS.md)
- [ ] `pnpm verify` passa local (typecheck · lint · boundaries · test · build)
- [ ] Fronteiras respeitadas (dependency-cruiser verde) — sem import cruzado entre runtimes
- [ ] Sem segredo em código/log/doc
- [ ] Diferidos intactos (consent pass-through · `correlation_id` · opt-in mínimo) onde tocados
- [ ] Copy público em tom de marca, sem preço (INV-05); inventário de copy atualizado se houve copy
- [ ] `/code-review` rodado (e `/simplify` se cruzou o threshold do AGENTS.md)
- [ ] Bug corrigido tem teste que o reproduz

## Evidência
<!-- saída de comando, screenshot do preview, número do Lighthouse/axe — não "parece ok" -->
