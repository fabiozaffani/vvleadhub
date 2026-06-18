# Performance & SEO da LP — indexação seletiva e canônico

**Camada:** spec · **Domínio:** landing-pages · **Origem:** 04-landing-pages.md · **Tom:** trabalho

Orçamento de performance da LP, regra de indexação seletiva e a regra de canônico anti-canibalização: um Assunto = uma página indexada.

---

## Performance & indexação seletiva

Orçamento de CWV por LP (gate de publish — ver [`system/arquitetura.md`](../../system/arquitetura.md)), mobile como referência. **Indexação seletiva:** LPs evergreen (espaços, serviços, hospedagem) indexadas com structured data (`EventVenue`+`LocalBusiness`, `FAQPage`); campanhas efêmeras e Bio Pages `noindex` (evita thin/duplicado).

---

## Regra de canônico — anti-canibalização (auditoria growth)

**Um Assunto = uma página indexada.** A página evergreen do Assunto (ex.: `/espacos/acqua`) é a canônica — indexada, com structured data e blocos de conversão. Qualquer LP adicional do mesmo Assunto (campanha, variação para tráfego pago) publica `noindex` **ou** com `canonical` apontando para a evergreen. Nunca duas páginas indexadas competindo pela mesma query; o editor (ver [`specs/admin/editor-lp.md`](../admin/editor-lp.md)) valida isso no publish.
