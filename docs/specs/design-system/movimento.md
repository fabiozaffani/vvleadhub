# Design System — Movimento e animação

**Camada:** spec · **Dominio:** design-system · **Origem:** brand/vvf-design-guidelines.md · **Tom:** trabalho

Doutrina de movimento, Ken Burns, reduced-motion e CTA sticky mobile. A visão coesa do sistema visual está em [`system/design-system.md`](../../system/design-system.md). A timeline de hovers dos componentes está em [`componentes.md`](componentes.md).

---

## 1. Princípio

A marca é serena — **todo movimento é lento e discreto**. Timeline de hovers: cards `.8s`, botão dourado `.5s`, imagem de card `1.2s–1.6s` (detalhe em [`componentes.md`](componentes.md)).

## 2. Ken Burns (`.vv-kenburns`)

Zoom/pan lento e contínuo sobre a imagem still do hero. É o movimento do hero no mobile (sem baixar vídeo de fundo no celular) e o pôster do hero no desktop antes/sob o vídeo.

- `animation: vv-kenburns 28s ease-in-out infinite alternate`
- `transform-origin: 50% 45%`; `will-change: transform`
- Keyframes: `from { scale(1.02) translate3d(0,0,0) }` → `to { scale(1.12) translate3d(0,-2%,0) }` — zoom + deriva ascendente quase imperceptível.
- A still mantém seu filtro próprio `.vv-hero-img { filter: saturate(0.84) brightness(1.02) }`; o Ken Burns anima apenas o `transform`.

## 3. Entradas com Framer Motion

Animações de entrada / `whileInView` usam Framer Motion, controladas globalmente por `MotionConfig reducedMotion="user"`.

## 4. Reduced motion (`prefers-reduced-motion: reduce`)

Regra global neutraliza animações e transições CSS no site público:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**Cuidado (decisão registrada):** a regra global apenas *quase-zera* a duração, o que congelaria a still no meio do zoom. Por isso o Ken Burns tem um override explícito que neutraliza o transform por completo:

```css
@media (prefers-reduced-motion: reduce) {
  .vv-kenburns { animation: none !important; transform: none !important; }
}
```

Qualquer novo efeito de "still animada" precisa do mesmo override `animation:none + transform:none`, senão fica preso no frame final.

## 5. CTA sticky mobile

Quando a barra de CTA sticky mobile (Variant B) está montada (`html.vv-sticky-cta`), o float global do WhatsApp é ocultado em telas `≤ 767px` (`[data-wa-float] { display: none }`) para os dois controles não se empilharem no mesmo canto. O float continua no desktop.
