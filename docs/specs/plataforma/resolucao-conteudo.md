# Resolução de conteúdo (Bloco ↔ Assunto)

**Camada:** spec · **Domínio:** plataforma · **Origem:** 02-fundacao-plataforma.md · **Tom:** trabalho

> **Depende de:** [`primitivas.md`](primitivas.md) (define `Bloco` e `Assunto`).
> **Responsabilidade única:** como um Bloco resolve o conteúdo que renderiza a partir do(s) Assunto(s) vinculado(s) à LP — por capacidade, nunca por instância — e como degrada quando a capacidade não existe.

---

## 4. Resolução de conteúdo (Bloco ↔ Assunto)

Um Bloco resolve conteúdo **por referência** ao(s) Assunto(s) vinculado(s), consultando **capacidades** do TipoDeAssunto — não o nome da instância.

- Bloco *Galeria* → "a galeria do Assunto vinculado" → qualquer Assunto cujo tipo tenha `galeria` responde.
- Bloco *Período* → só `campanha` tem `período`; em outro tipo o bloco **não se renderiza** (degradação graciosa).
- **Overrides:** a LP pode sobrescrever um slot no admin sem alterar o Assunto.
- Regra dura: **bloco conhece capacidade, não instância.**

### Degradação graciosa

Quando o Assunto vinculado não tem a capacidade que o Bloco pede, o Bloco **não se renderiza** — não quebra, não exibe placeholder vazio. É o mecanismo que mantém um mesmo Molde compondo Assuntos de tipos diferentes sem `switch` por instância (ver a regra de agnosticidade em [`primitivas.md`](primitivas.md) §1.4).

### Overrides no admin

A LP pode sobrescrever um slot específico diretamente no admin, sem tocar no Assunto de origem. Isso preserva o Assunto como fonte de conteúdo reutilizável enquanto permite ajuste pontual por página.

> **Guardrail relacionado** (ver [`primitivas.md`](primitivas.md) §10): Bloco renderizar capacidade ausente é mitigado por capacidades declaradas + degradação graciosa + validação no admin.
