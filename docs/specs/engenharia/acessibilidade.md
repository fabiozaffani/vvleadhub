# Acessibilidade & contraste

**Camada:** spec · **Domínio:** engenharia · **Origem:** 09-engenharia.md · **Tom:** trabalho

Alvo WCAG 2.1 AA no site público e a ordem de resolução do conflito estética × contraste. Formaliza o achado da auditoria 2.4.1.

## 8. Acessibilidade & contraste (formaliza auditoria 2.4.1)

- Alvo: **WCAG 2.1 AA** no site público; axe no CI fiscaliza (ver [`ci-gates.md`](ci-gates.md) e [`testes.md`](testes.md)).
- **Princípio (abstrato — vale para qualquer elemento, atual ou futuro):** estética de marca **nunca embarca reprovada em contraste nem às custas de UX**. Quando paleta e legibilidade conflitarem, ajusta-se o **uso** — jamais se publica abaixo do mínimo e jamais se inventa cor fora da paleta.
- **Ordem de resolução do conflito:** (1) inverter o papel do par (texto da cor escura sobre superfície da cor clara — ex.: verde sobre dourado, que o token `secondary-foreground` já induz); (2) elevar tamanho/peso até o limiar AA de texto grande; (3) usar a variante mais escura da própria família (ex.: dourado escuro `#7D5900` no lugar do claro); (4) se nada resolver, o elemento muda de design.
- Caso conhecido que originou o princípio: dourado claro `#C69F3F` sobre creme reprova como texto pequeno — resolvido pelos passos acima.
- Foco visível, skip-link e reduced-motion: já especificados no design system (ver `specs/design-system/movimento.md` e `specs/design-system/componentes.md`).

> A paleta e os tokens de cor canônicos vivem em `specs/design-system/tokens.md`. O scanner axe e suas rotas-chave estão em [`testes.md`](testes.md).
