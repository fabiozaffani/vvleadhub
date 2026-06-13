import type { CollectionConfig } from 'payload'
import { anyone, isAdmin, isAdminOrEditor } from '../access/roles'
import { slugField } from '../fields/slug'
import { seoField } from '../fields/seo'

// TipoDeAssunto `espaço` (02 §2.2). Instâncias = dados (Acqua, Florest, ...).
export const Espacos: CollectionConfig = {
  slug: 'espacos',
  labels: { singular: 'Espaço', plural: 'Espaços' },
  admin: {
    useAsTitle: 'nome',
    group: 'Registros (Assuntos)',
    defaultColumns: ['nome', 'categoria', 'status'],
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
      name: 'categoria',
      type: 'select',
      required: true,
      options: [
        { label: 'Festa', value: 'festa' },
        { label: 'Hospedagem', value: 'hospedagem' },
      ],
    },
    { name: 'descricao', type: 'textarea', label: 'Descrição sensorial' },
    { name: 'capacidade', type: 'number', label: 'Capacidade (convidados)' },
    { name: 'localizacao', type: 'text', label: 'Localização' },
    { name: 'videoTour', type: 'text', label: 'Vídeo-tour (URL)' },
    {
      name: 'bullets',
      type: 'array',
      label: 'Destaques (bullets do card)',
      fields: [{ name: 'texto', type: 'text', required: true }],
    },
    {
      name: 'galeria',
      type: 'array',
      label: 'Galeria',
      fields: [{ name: 'imagem', type: 'upload', relationTo: 'media' }],
    },
    seoField,
  ],
}
