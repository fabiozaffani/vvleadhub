import React from 'react'

// WO-ADMIN-004 — Ícone de marca (header da navegação). Monograma VV em Playfair.
export const Icon: React.FC = () => (
  <div
    style={{
      fontFamily: "'Playfair Display', Georgia, serif",
      fontSize: '1.5rem',
      fontWeight: 700,
      lineHeight: 1,
      color: '#143C37',
    }}
  >
    VV
  </div>
)
