# CI/CD e gates

**Camada:** spec · **Domínio:** engenharia · **Origem:** 09-engenharia.md · **Tom:** trabalho

O fiscal das regras: a pipeline por PR, o gate de Lighthouse CI sobre o orçamento de CWV, e o fluxo de deploy.

## 4. CI/CD e gates (o fiscal das regras)

Pipeline por PR: `typecheck → lint+boundaries → unit/integração → build → Lighthouse CI → axe → e2e`.

- **Lighthouse CI = o fiscal do orçamento de CWV (ver `system/arquitetura.md`):** budgets declarados em `lighthouserc` (LCP < 2,5s, CLS < 0,1, INP proxy via TBT, JS inicial); rota da home + 1 LP + 1 post. **Estourou = PR bloqueado** — o gate deixa de ser frase e vira máquina.
- Deploy: trunk-based; merge na main → deploy de preview; promoção a produção manual (loop de validação humana — ver [`discovery/auditoria-pre-build.md`](../../discovery/auditoria-pre-build.md) item 1.6).
- Conventional commits (`feat:`, `fix:`, `docs:`...) — habilita changelog automático.

> As travas de fronteira que o passo `lint+boundaries` executa estão em [`fronteiras.md`](fronteiras.md). A pirâmide de testes (unit/integração/e2e/axe) está em [`testes.md`](testes.md). O gate de acessibilidade (axe) em [`acessibilidade.md`](acessibilidade.md). Os ambientes de deploy (dev/preview/prod) em [`ambientes-secrets.md`](ambientes-secrets.md).
