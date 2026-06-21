# D-10 — Mídia — Cloudflare R2 + Images

**Status:** fechada · **Data:** — · **Tags:** stack

## Contexto

Decisão registrada no ledger legado; corpo migrado na reestruturação índice + ADR (2026-06-20).

## Decisão

**Mídia/imagem:** originais em **Cloudflare R2** (S3-compatível, sem egress fee, via plugin de storage do Payload — nunca no filesystem do runtime/container); derivados via **Cloudflare Images** (resize/AVIF/WebP on-the-fly na URL — foto subida no admin está otimizada no site sem rebuild). Zero provedor novo: tudo no edge que já está na frente do site (D-2).

## Consequências

Ver ecos nos docs que citam `D-10` (`grep -r "D-10" docs/`).

## Histórico de emendas

| ID | O que mudou |
|---|---|
| _(nenhuma)_ | — |
