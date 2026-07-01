import React from 'react'

// WO-ADMIN-004 — Logo de marca (tela de login do admin). Wordmark em Playfair.
// Sem asset de imagem ainda (decisão aberta no WO §6): se houver SVG oficial, troca-se aqui.
export const Logo: React.FC = () => (
  <div style={{ textAlign: 'center', lineHeight: 1.05 }}>
    <div
      style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: '2.6rem',
        fontWeight: 600,
        color: '#143C37',
        letterSpacing: '0.01em',
      }}
    >
      Vale Verde
    </div>
    <div
      style={{
        fontFamily: "'Work Sans', sans-serif",
        fontSize: '0.72rem',
        fontWeight: 500,
        letterSpacing: '0.4em',
        textTransform: 'uppercase',
        color: '#7D5900',
        marginTop: '0.55rem',
      }}
    >
      Festas
    </div>
  </div>
)
