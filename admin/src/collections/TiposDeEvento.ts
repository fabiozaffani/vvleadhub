import type { CollectionConfig } from 'payload'
import { anyone, isAdmin, isAdminOrEditor } from '../access/roles'
import { slugField } from '../fields/slug'

// Dimensão transversal `Tipo de Evento` (02 §7) — não é Assunto.
export const TiposDeEvento: CollectionConfig = {
  slug: 'tipos-de-evento',
  labels: { singular: 'Tipo de Evento', plural: 'Tipos de Evento' },
  admin: { useAsTitle: 'nome', group: 'Registros (Assuntos)' },
  access: { read: anyone, create: isAdminOrEditor, update: isAdminOrEditor, delete: isAdmin },
  fields: [
    { name: 'nome', type: 'text', required: true },
    slugField,
  ],
}
