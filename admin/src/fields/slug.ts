import type { Field } from 'payload'

export const slugField: Field = {
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  index: true,
  admin: { description: 'Identificador na URL (ex.: acqua). Sem espaços nem acentos.' },
}
