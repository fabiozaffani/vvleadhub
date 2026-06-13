import { getPayload } from 'payload'
import config from '../payload.config'

// Seed idempotente dos registros do 02 (WO-01). Conteúdo = placeholders marcados
// (nunca inventar números/fotos/depoimentos — composicao-paginas §5 / Design Guidelines §7).

type CollSlug =
  | 'espacos'
  | 'servicos'
  | 'objetivos'
  | 'tipos-de-evento'
  | 'categorias'
  | 'posts'

async function main() {
  const payload = await getPayload({ config })

  const upsert = async (collection: CollSlug, slug: string, data: Record<string, unknown>) => {
    const existing = await payload.find({
      collection,
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 0,
    })
    if (existing.docs.length > 0) {
      payload.logger.info(`= ${collection}/${slug} já existe — pulando`)
      return
    }
    await payload.create({ collection, data: { slug, ...data } })
    payload.logger.info(`+ ${collection}/${slug} criado`)
  }

  const bullets = (cap: string) => [
    { texto: cap },
    { texto: 'Ambiente a descrever (texto provisório)' },
    { texto: 'Estrutura a detalhar (texto provisório)' },
  ]

  // --- Espaços (5) — categoria festa|hospedagem -------------------------------
  const espacos: Array<{ slug: string; nome: string; categoria: 'festa' | 'hospedagem' }> = [
    { slug: 'acqua', nome: 'Acqua', categoria: 'festa' },
    { slug: 'florest', nome: 'Florest', categoria: 'festa' },
    { slug: 'serra-dos-cristais', nome: 'Serra dos Cristais', categoria: 'festa' },
    { slug: 'morada-do-vale', nome: 'Morada do Vale', categoria: 'hospedagem' },
    { slug: 'villa-do-vale', nome: 'Villa do Vale', categoria: 'hospedagem' },
  ]
  for (const e of espacos) {
    await upsert('espacos', e.slug, {
      nome: e.nome,
      categoria: e.categoria,
      status: 'ativo',
      descricao: `${e.nome}: descrição sensorial a definir (texto provisório — inventário 🔴 1.4).`,
      bullets: bullets('Capacidade a confirmar'),
    })
  }

  // --- Serviços (9) — papel padrão|adicional ----------------------------------
  const servicos: Array<{ slug: string; nome: string; papel: 'padrao' | 'adicional' }> = [
    { slug: 'assessoria-cerimonial', nome: 'Assessoria Cerimonial', papel: 'padrao' },
    { slug: 'planejamento', nome: 'Planejamento', papel: 'padrao' },
    { slug: 'buffet', nome: 'Buffet', papel: 'padrao' },
    { slug: 'decoracao', nome: 'Decoração', papel: 'padrao' },
    { slug: 'som-e-iluminacao', nome: 'Som e Iluminação', papel: 'padrao' },
    { slug: 'bartender', nome: 'Bartender', papel: 'adicional' },
    { slug: 'cerveja', nome: 'Cerveja', papel: 'adicional' },
    { slug: 'chope', nome: 'Chope', papel: 'adicional' },
    { slug: 'entretenimento', nome: 'Entretenimento', papel: 'adicional' },
  ]
  for (const s of servicos) {
    await upsert('servicos', s.slug, {
      nome: s.nome,
      papel: s.papel,
      status: 'ativo',
      descricao: `${s.nome}: descrição a definir (texto provisório).`,
    })
  }

  // --- Objetivos de conversão (registro) --------------------------------------
  const objetivos: Array<{ slug: string; nome: string }> = [
    { slug: 'handoff_whatsapp', nome: 'Handoff WhatsApp' },
    { slug: 'captura_lead', nome: 'Captura de lead' },
    { slug: 'agendar_visita', nome: 'Agendar visita' },
    { slug: 'roteamento', nome: 'Roteamento (Bio Page)' },
    { slug: 'contato_qualificado', nome: 'Contato qualificado' },
  ]
  for (const o of objetivos) {
    await upsert('objetivos', o.slug, { nome: o.nome })
  }

  // --- Tipos de evento (dimensão transversal) ---------------------------------
  const tiposEvento: Array<{ slug: string; nome: string }> = [
    { slug: 'casamento', nome: 'Casamento' },
    { slug: 'aniversario', nome: 'Aniversário' },
    { slug: 'debutante', nome: 'Debutante' },
    { slug: 'corporativo', nome: 'Corporativo' },
  ]
  for (const t of tiposEvento) {
    await upsert('tipos-de-evento', t.slug, { nome: t.nome })
  }

  // --- Categorias do blog (taxonomia estrutural) ------------------------------
  const categorias: Array<{ slug: string; nome: string }> = [
    { slug: 'casamentos', nome: 'Casamentos' },
    { slug: 'planejamento', nome: 'Planejamento' },
    { slug: 'inspiracoes', nome: 'Inspirações' },
  ]
  for (const c of categorias) {
    await upsert('categorias', c.slug, { nome: c.nome })
  }

  // --- Posts de blog (placeholders marcados, sem capa → fallback gradiente) ----
  const catBySlug = async (slug: string) => {
    const r = await payload.find({ collection: 'categorias', where: { slug: { equals: slug } }, limit: 1, depth: 0 })
    return r.docs[0]?.id
  }
  const posts: Array<{ slug: string; titulo: string; categoria: string }> = [
    { slug: 'post-exemplo-1', titulo: 'Texto provisório: história de um sim', categoria: 'casamentos' },
    { slug: 'post-exemplo-2', titulo: 'Texto provisório: por onde começar o planejamento', categoria: 'planejamento' },
    { slug: 'post-exemplo-3', titulo: 'Texto provisório: inspirações para o seu dia', categoria: 'inspiracoes' },
  ]
  for (const p of posts) {
    await upsert('posts', p.slug, {
      titulo: p.titulo,
      status: 'publicado',
      resumo: 'Resumo provisório — conteúdo real depende do inventário (🔴 1.4).',
      categoria: await catBySlug(p.categoria),
      publishedAt: new Date().toISOString(),
    })
  }

  payload.logger.info('Seed concluído.')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
