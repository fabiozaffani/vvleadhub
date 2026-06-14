import type { APIRoute } from 'astro'

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL('http://localhost:5000')
  // Apenas rotas existentes na Fase 0b (páginas de detalhe entram em WO posteriores).
  const paths = ['/', '/blog']
  const urls = paths
    .map((p) => `  <url><loc>${new URL(p, base).toString()}</loc></url>`)
    .join('\n')
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } })
}
