import type { CollectionConfig } from 'payload'
import { anyone, isAdmin, isAdminOrEditor } from '../access/roles'
import { slugField } from '../fields/slug'

// Clusters/categorias do blog (07) — dados, não código.
export const Categorias: CollectionConfig = {
  slug: 'categorias',
  labels: { singular: 'Categoria', plural: 'Categorias' },
  admin: { useAsTitle: 'nome', group: 'Blog' },
  access: { read: anyone, create: isAdminOrEditor, update: isAdminOrEditor, delete: isAdmin },
  fields: [
    { name: 'nome', type: 'text', required: true },
    slugField,
    { name: 'descricao', type: 'textarea', label: 'Descrição' },
  ],
}
