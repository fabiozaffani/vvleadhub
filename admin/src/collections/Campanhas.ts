import type { CollectionConfig } from 'payload'
import { anyone, isAdmin, isAdminOrEditor } from '../access/roles'
import { slugField } from '../fields/slug'
import { seoField } from '../fields/seo'

// TipoDeAssunto `campanha` (02 §2.2). Sem preço na copy (INV-05).
export const Campanhas: CollectionConfig = {
  slug: 'campanhas',
  labels: { singular: 'Campanha', plural: 'Campanhas' },
  admin: {
    useAsTitle: 'nome',
    group: 'Registros (Assuntos)',
    defaultColumns: ['nome', 'status'],
  },
  access: { read: anyone, create: isAdminOrEditor, update: isAdminOrEditor, delete: isAdmin },
  fields: [
    { name: 'nome', type: 'text', required: true },
    slugField,
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'ativo',
      options: [
        { label: 'Ativo', value: 'ativo' },
        { label: 'Descontinuado', value: 'descontinuado' },
        { label: 'Arquivado', value: 'arquivado' },
      ],
    },
    {
      name: 'periodo',
      type: 'group',
      label: 'Período',
      fields: [
        { name: 'inicio', type: 'date', label: 'Início' },
        { name: 'fim', type: 'date', label: 'Fim' },
      ],
    },
    { name: 'tese', type: 'textarea', label: 'Tese / conceito' },
    { name: 'narrativa', type: 'textarea', label: 'Narrativa de oferta (sem preço)' },
    {
      name: 'relacionados',
      type: 'relationship',
      relationTo: ['espacos', 'servicos'],
      hasMany: true,
      label: 'Relacionados (espaço/serviço)',
    },
    seoField,
  ],
}
