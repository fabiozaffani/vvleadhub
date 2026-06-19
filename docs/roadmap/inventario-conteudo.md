# Inventário de conteúdo — dependência não-técnica do build

**Camada:** roadmap · **Origem:** conteudo/inventario.md · **Tom:** trabalho
**Status:** ativo (criado pela auditoria growth jun/2026 — fecha o mecanismo de [`../discovery/auditoria-pre-build.md`](../discovery/auditoria-pre-build.md) §1.4)
**Função:** a plataforma é construída pela IA; o conteúdo real, não. Este arquivo lista o que existe, o que falta, quem produz e até quando. **Critério de aceite da Fase 0** ([`fases.md`](fases.md)): os 5 espaços seedados com galeria real. CONTEXTO-IA §5 proíbe banco de imagens — sem conteúdo real, o item não fecha.

**Regras:**
- `dono` e `prazo` são preenchidos pelo fundador — a IA construtora nunca os inventa.
- Copy em tom de marca a IA produz com autonomia (AGENTS.md) e registra no inventário de copy (`docs/copy/inventario-fase-<n>.md`) — aqui entram só os insumos que **não** se inventam: foto, vídeo, depoimento, dado factual.
- Item `bloqueante` = trava critério de aceite de fase; os demais degradam graciosamente (bloco não renderiza — [`../specs/plataforma/resolucao-conteudo.md`](../specs/plataforma/resolucao-conteudo.md)).

**Política de placeholders (decisão do fundador, 12/06/2026 — conteúdo final não bloqueia o build):**
- **Build/dev/preview:** placeholders liberados (imagem/vídeo gerados ou provisórios), **sempre marcados** — sufixo `-placeholder` no arquivo e no `alt` — para serem encontráveis por grep na hora da troca.
- **Produção/indexável: proibido.** O CONTEXTO-IA §5 (só imagens próprias) vale para o que o público vê. A troca placeholder→asset final é pré-condição do **veredicto de fase** (`/app-checklist-fase`), não do build diário — o critério da Fase 0 ("5 espaços com galeria real") gate o *sign-off*, não o início.
- **Copy não é placeholder:** a IA escreve copy real desde o primeiro dia; o que ela não inventa são os fatos (§5 abaixo) — campo factual ausente fica vazio/marcado, nunca preenchido com dado fictício.
- **Prioridade de entrega ao marketing:** 1 espaço completo primeiro (galeria + foto de hero em alta) — destrava a validação de direção de arte no preview com asset real; os demais encaixam depois sem retrabalho (seed é dado, troca não gera rebuild — D-10).

## 1. Galerias dos espaços (bloqueante — Fase 0)

| Espaço | Categoria | O que precisa | Status | Dono | Prazo |
|---|---|---|---|---|---|
| Acqua | festa | galeria (≥ 8 fotos próprias, coloridas, sangráveis) | pendente | _a definir_ | _a definir_ |
| Florest | festa | galeria (≥ 8 fotos) | pendente | _a definir_ | _a definir_ |
| Serra | festa | galeria (≥ 8 fotos) | pendente | _a definir_ | _a definir_ |
| Morada do Vale | hospedagem | galeria (≥ 8 fotos) | pendente | _a definir_ | _a definir_ |
| Villa do Vale | hospedagem | galeria (≥ 8 fotos) | pendente | _a definir_ | _a definir_ |

## 2. Vídeo-tours (Fase 0–2 · habilita `VideoObject` — D-13)

| Espaço | Status | Dono | Prazo |
|---|---|---|---|
| Acqua · Florest · Serra · Morada · Villa | pendente (1 vídeo-tour por espaço) | _a definir_ | _a definir_ |

## 3. Fotos de serviços (Fase 0–2)

| Serviço | O que precisa | Status | Dono | Prazo |
|---|---|---|---|---|
| Buffet / gastronomia | pratos reais, coloridas (CONTEXTO-IA §5: gastronomia nunca em P&B) | pendente | _a definir_ | _a definir_ |
| Decoração | moodboards/eventos reais | pendente | _a definir_ | _a definir_ |
| Cerimonial · Som e Iluminação · adicionais | cobertura de evento real | pendente | _a definir_ | _a definir_ |

## 4. Prova social (Fase 0–2)

| Item | O que precisa | Status | Dono | Prazo |
|---|---|---|---|---|
| Depoimentos de casais | ≥ 5 com autorização de uso (nome/foto) | pendente | _a definir_ | _a definir_ |
| Casamentos reais (formato âncora do blog — [`../specs/blog/clusters.md`](../specs/blog/clusters.md)) | ≥ 2 casamentos com fotos + **termo de uso de imagem assinado** | pendente | _a definir_ | _a definir_ |

## 5. Institucional & legal (Fase 0)

| Item | Nota | Status | Dono | Prazo |
|---|---|---|---|---|
| Dados factuais (endereços, telefone E.164, CNPJ, perfis sociais) | alimentam NAP/structured data/GBP — idênticos em tudo ([`../specs/blog/seo-local.md`](../specs/blog/seo-local.md)) | pendente | _a definir_ | _a definir_ |
| Logo e assets de identidade em alta | conforme [`../specs/design-system/`](../specs/design-system/) | pendente | _a definir_ | _a definir_ |
| Páginas legais (privacidade/termos) | conteúdo jurídico — placeholder precisa de aval ([`fases.md`](fases.md)) | pendente | _a definir_ (jurídico) | _a definir_ |
| História/sobre (insumo factual para copy da IA) | datas, fatos, números reais | pendente | _a definir_ | _a definir_ |
