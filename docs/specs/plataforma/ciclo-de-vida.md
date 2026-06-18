# Ciclo de vida (sem deploy)

**Camada:** spec · **Domínio:** plataforma · **Origem:** 02-fundacao-plataforma.md · **Tom:** trabalho

> **Depende de:** [`primitivas.md`](primitivas.md) (define `Assunto`, `Molde`, `Objetivo`, `TipoDeAssunto`).
> **Responsabilidade única:** o ciclo de vida das primitivas — ativar, descontinuar, arquivar — como operação de dado, sem deploy; e o tratamento de páginas órfãs (despublish / 301) e expiração de campanhas por período.

---

## 5. Ciclo de vida (sem deploy)

`status: ativo · descontinuado · arquivado` em Assunto, Molde e Objetivo.

- **Adicionar Assunto:** criar a linha no admin.
- **Descontinuar Assunto:** LPs vinculadas entram em despublish ou `301` para substituta definida no admin. Nunca página órfã indexada.
- **Campanhas** expiram sozinhas pelo `período`.
- **TipoDeAssunto:** descontinuar só sem Assuntos ativos; criar = código (ver a emenda Payload em [`primitivas.md`](primitivas.md) §2.2).

Materializa INV-09 (replicável entre unidades) e CONTEXTO-IA §6 (crescer/encolher por dados).

> **Despublish / 301 e canônico:** a regra de não deixar página órfã indexada conecta com o tratamento de canônico das LPs — ver [`../landing-pages/seo-canonico.md`](../landing-pages/seo-canonico.md).
