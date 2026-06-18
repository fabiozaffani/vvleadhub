# Testes (pirâmide pragmática)

**Camada:** spec · **Domínio:** engenharia · **Origem:** 09-engenharia.md · **Tom:** trabalho

A pirâmide de testes do repo e suas regras de runner/tooling. Todo bug corrigido ganha o teste que o reproduz.

## 3. Testes (pirâmide pragmática)

- **Unit (obrigatório):** funções puras da cola fina — adapters `map(event)`, normalização de lead, dedup D-11, geração de xcode. **Runner: `node:test` (built-in, zero dependência)** — escolha deliberada: roda em qualquer Node sem adicionar dependência de tooling à árvore. (Nota histórica: a escolha também evitou, no setup original em Replit, um firewall que bloqueava o vitest — restrição não mais vigente após a D-18; o runner permanece por mérito próprio, não há razão para reintroduzir o Vitest.) Para TS, compila antes e roda o emitido (`tsc` → `node --test "dist/**/*.test.js"`), como em `packages/contracts`.
- **Integração:** contrato lead→Kommo (Kommo mockado), webhook de desfecho→loop, ingestão de lead form nativo (D-13), purge de cache no publish.
- **E2E (mínimo vital, Playwright):** caminho de conversão — LP renderiza → CTA → form → card mock criado com xcode; e A/B sem flicker (asserção de zero CLS na variante).
- **A11y:** axe-core nas rotas-chave do site (home, 1 LP, 1 post) no CI. Critérios e ordem de resolução de conflito em [`acessibilidade.md`](acessibilidade.md).
- **Validar tooling pesado no ambiente de CI/runtime cedo:** Playwright (baixa browsers), `@lhci/cli` e `@axe-core/playwright` podem esbarrar em restrições de rede/sandbox do ambiente de execução. Fazer o smoke-test de instalação na primeira WO que os usa (WO-03) — se falhar, escalar/achar alternativa antes do gate depender deles.
- Regra: bug corrigido = teste que o reproduz, junto no PR.

> A localização física dos testes (colocalizados + `/e2e` na raiz) está em [`monorepo.md`](monorepo.md). A pipeline que roda estes testes está em [`ci-gates.md`](ci-gates.md).
