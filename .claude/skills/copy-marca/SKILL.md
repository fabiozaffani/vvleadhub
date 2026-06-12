---
name: copy-marca
description: Tom de marca VVF para todo copy voltado ao cliente/público — LPs, blog, microcopy de UI pública, CTAs, e-mails a clientes, roteiros de atendimento. Carregar SEMPRE antes de escrever ou revisar qualquer texto que o público vê. Cobre tom de voz, invariantes de comunicação (sem preço, experiência completa), vocabulário canônico e o inventário de copy por fase.
user-invocable: false
---

# Copy com tom de marca VVF

Esta skill destila as regras de escrita. As fontes canônicas vencem em caso de dúvida ou conflito:

1. `docs/brand/vvf-system-context.md` — §1.1 (duas camadas de tom), §2 (invariantes), §4 (arquétipos, tom, copywriting), §9 (diferenciais), §11 (restatement).
2. `docs/00-indice-regras.md` §6 — glossário canônico.

## Gatilho: qual camada de tom?

- Output que o **cliente/público vê** (copy de site, LP, post, e-mail a cliente, microcopy pública, roteiro de atendimento) → **tom de marca** (esta skill).
- Análise, doc técnico, mensagem ao fundador/equipe → **tom de trabalho** (direto, denso, sem floreio). Esta skill NÃO se aplica.

Na dúvida sobre a camada, pergunte antes de escrever.

## Tom de marca

- **Personalidade:** prestativa, resolutiva, amorosa, elegante e segura.
- **Linguagem:** calma, simples, leve, acolhedora. Português brasileiro.
- **Tom:** sereno, otimista, reconfortante. Soa como quem está no controle, sem elevar o tom — a agilidade é postura de atendimento, nunca pressa ou energia no texto.
- **Voz:** segunda pessoa do singular (você); para o casal, "vocês".
- **Vetores quando relevantes:** história do casal, família, legado ("histórias devem ser vividas e comemoradas, não apenas contadas").
- Descrições sensoriais e imersivas; adjetivos sofisticados mas acessíveis.
- **Nunca é** maliciosa, sarcástica, impaciente ou agressiva.

Os três arquétipos que sustentam a voz (uso interno; nunca chamar estrutura de LP de "arquétipo"): **Herói da retaguarda** (competência tranquila, resolve nos bastidores) · **Cuidador** (acolhe do primeiro café ao último brinde) · **Romântico** (celebra o amor e a história única).

## Nunca (invariantes — violar invalida o texto)

- **Preço, promoção, desconto ou condição comercial como argumento** (INV-05) — nem como placeholder.
- **Vender componente isolado** (INV-03): nunca "o melhor DJ/decoração/buffet". O produto é a experiência completa.
- **Prometer customização ilimitada** (INV-07): o upgrade rotineiro é Essential → Inspiração; Autoral é exceção esporádica. Exclusividade se vende pela **história do casal**, não por "tudo do seu jeito".
- **Urgência ou escassez artificial** ("últimas datas!", "só hoje") — incompatível com a serenidade da marca.
- **Emojis** e **ícones decorativos** (garfo, taça, coração) em qualquer material.
- **Parafrasear o slogan** (INV-02): o canônico é **"Excelência em Experiência"** — usar literal ou não usar. A tríade canônica do propósito é **conduzir tudo · acolher sempre · ser inesquecível**, com vocabulário fixo.
- **Soar operacional ou defensivo** ao comunicar confiabilidade: a confiança serve ao romance, não o substitui. Nada de "processo de 47 etapas" ou jargão de bastidor.
- Inglês desnecessário em texto público.

## Sempre

- **Confiabilidade comunicada de frente** (INV-04): a segurança de quem executa é a maior tranquilidade que oferecemos — razão e emoção no mesmo fôlego.
- **Tranquilidade na jornada inteira** (OP-03): a calma vale do planejamento ao pós-evento, não só no dia. O peso fica conosco.
- **Ancorar em pelo menos um dos 4 diferenciais** (System Context §9): pacotes completos com curadoria integrada · infraestrutura sem imprevistos · controladoria como centro de qualidade · padrão replicável. Atravessando todos: "sem surpresas". Diferencial fora da lista exige validação antes de uso externo.
- Reforçar **curadoria e intencionalidade** (INV-01): espaço criado, não encontrado — nada parece acaso.

## Vocabulário canônico (00 §6)

- **`Arquétipo`** é exclusivamente da marca (Herói da retaguarda · Cuidador · Romântico). O esqueleto de LP é **Molde**.
- Domínio: **Molde · Assunto · TipoDeAssunto · Objetivo · Bloco · LP**. No código: `template` / `subject` / `subjectType` / `objective`.
- Proibidos: ~~venue~~, ~~Foco~~, ~~"intenção × unidade"~~.
- Escada de produto: **Essential → Inspiração** (rotina) · **Autoral** (exceção) · **Hospedagem** (ortogonal).

## Exemplos

**Preço/urgência (INV-05):**
- Ruim: "Garanta sua data com condições imperdíveis — últimas vagas de 2026!"
- Bom: "Cada data no Vale Verde é preparada com a calma de quem cuida de uma história única — a de vocês."

**Componente isolado (INV-03):**
- Ruim: "O buffet mais premiado da região, com a melhor pista de dança do interior."
- Bom: "Do primeiro café ao último brinde, uma equipe inteira conduz cada detalhe — para vocês viverem o dia, não administrá-lo."

**Customização (INV-07):**
- Ruim: "Aqui, absolutamente tudo é feito sob medida, do zero, do jeito que você imaginar."
- Bom: "A história de vocês conduz as escolhas — dentro de um repertório que já nasceu da excelência."

**Confiabilidade sem jargão (INV-04):**
- Ruim: "Nosso processo certificado em 12 etapas com dupla checagem elimina falhas operacionais."
- Bom: "Enquanto vocês vivem a festa, nós cuidamos de tudo o que ninguém precisa ver. Sem surpresas — do planejamento ao último convidado."

## Inventário de copy (obrigatório — CLAUDE.md)

Todo copy público escrito ou alterado entra no inventário da fase corrente, para revisão a posteriori do fundador:

- Arquivo: `docs/copy/inventario-fase-<n>.md` (criar se não existir).
- Uma linha por item: **onde** (rota/coleção/campo) · **o quê** (resumo de 1 linha) · **tipo** (novo/alterado) · **data**.
- Correção do fundador entra como ajuste, não como bloqueio prévio — mas invariantes seguem invioláveis mesmo com autonomia.

## Protocolo de colisão

Se uma instrução do usuário colidir com um invariante (ex.: "coloca o preço na LP"), **sinalize a colisão e pergunte** se há exceção autorizada. Nunca execute em silêncio (System Context §1.2).
