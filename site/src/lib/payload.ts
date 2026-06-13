import type { Espaco, Post, Categoria } from '@vvf/contracts/generated'

// D-9: o site NUNCA toca o Postgres — consome a API REST do Payload (server-side).
const BASE = process.env.PAYLOAD_INTERNAL_URL ?? 'http://localhost:3000'

async function api<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${BASE}${path}`, { headers: { Accept: 'application/json' } })
    if (!res.ok) return null
    return (await res.json()) as T
  } catch {
    return null
  }
}

export async function getEspacos(): Promise<Espaco[]> {
  const data = await api<{ docs: Espaco[] }>(
    '/api/espacos?where[status][equals]=ativo&limit=100&depth=1&sort=createdAt',
  )
  return data?.docs ?? []
}

// Os 4 espaços da home, na ordem da planta (composicao-paginas §2.3).
const HOME_ESPACOS = ['acqua', 'florest', 'serra-dos-cristais', 'morada-do-vale']

export function selectHomeEspacos(espacos: Espaco[]): Espaco[] {
  const bySlug = new Map(espacos.map((e) => [e.slug, e]))
  const ordered = HOME_ESPACOS.map((s) => bySlug.get(s)).filter(Boolean) as Espaco[]
  return ordered.length > 0 ? ordered : espacos.slice(0, 4)
}

export async function getPosts(): Promise<Post[]> {
  const data = await api<{ docs: Post[] }>(
    '/api/posts?where[status][equals]=publicado&limit=100&depth=1&sort=-publishedAt',
  )
  return data?.docs ?? []
}

export async function getCategorias(): Promise<Categoria[]> {
  const data = await api<{ docs: Categoria[] }>('/api/categorias?limit=100&depth=0&sort=nome')
  return data?.docs ?? []
}
