import type { CollectionConfig } from 'payload'
import { anyone, isAdmin, isAdminOrEditor } from '../access/roles'
import { slugField } from '../fields/slug'

// Objetivo de conversão (02 §2.4) — registro extensível.
export const Objetivos: CollectionConfig = {
  slug: 'objetivos',
  labels: { singular: 'Objetivo', plural: 'Objetivos' },
  admin: { useAsTitle: 'nome', group: 'Registros (Assuntos)' },
  access: { read: anyone, create: isAdminOrEditor, update: isAdminOrEditor, delete: isAdmin },
  fields: [
    { name: 'nome', type: 'text', required: true },
    slugField,
    { name: 'descricao', type: 'textarea', label: 'Descrição' },
  ],
}
