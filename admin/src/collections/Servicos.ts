import type { CollectionConfig } from 'payload'
import { anyone, isAdmin, isAdminOrEditor } from '../access/roles'
import { slugField } from '../fields/slug'
import { seoField } from '../fields/seo'

// TipoDeAssunto `serviço` (02 §2.2). papel: padrão|adicional (canônico — 00 §6).
export const Servicos: CollectionConfig = {
  slug: 'servicos',
  labels: { singular: 'Serviço', plural: 'Serviços' },
  admin: {
    useAsTitle: 'nome',
    group: 'Registros (Assuntos)',
    defaultColumns: ['nome', 'papel', 'status'],
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
      name: 'papel',
      type: 'select',
      required: true,
      options: [
        { label: 'Padrão', value: 'padrao' },
        { label: 'Adicional', value: 'adicional' },
      ],
    },
    { name: 'descricao', type: 'textarea', label: 'Descrição' },
    { name: 'escopo', type: 'textarea', label: 'Escopo' },
    {
      name: 'galeria',
      type: 'array',
      label: 'Galeria / moodboard',
      fields: [{ name: 'imagem', type: 'upload', relationTo: 'media' }],
    },
    seoField,
  ],
}
