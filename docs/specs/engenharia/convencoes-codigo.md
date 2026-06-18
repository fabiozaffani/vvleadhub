# Convenções de código

**Camada:** spec · **Domínio:** engenharia · **Origem:** 09-engenharia.md · **Tom:** trabalho

Regras transversais de escrita de código: tipagem, lint, validação de borda, datas, idioma e mapeamento do vocabulário canônico para o código.

## 9. Convenções de código

TypeScript `strict` em tudo · ESLint + Prettier compartilhados na raiz · Zod para validação de borda (props de Bloco, payloads de webhook, contrato de lead) — **o mesmo schema de `packages/contracts` valida os dois lados** (o form do site e a borda da API checam o lead pelo mesmo `leadContractSchema`; validação é agnóstica de ambiente e mora em `contracts`) · datas sempre ISO-8601/UTC no armazenamento, exibição em `America/Sao_Paulo` · UI em pt-BR, sem emojis (ver `specs/design-system/regras-fazer-nunca.md`) · nomes de código em inglês, domínio em português conforme o léxico (ver [`_lexico.md`](../../_lexico.md)) — ex.: `subject`, `subjectType`, `objective` no código mapeiam Assunto/TipoDeAssunto/Objetivo.

> O contrato de lead validado pelo `leadContractSchema` está em `specs/landing-pages/contrato-lead.md`; o schema de evento em `system/eventos.md`. A localização física de `packages/contracts` está em [`monorepo.md`](monorepo.md).
