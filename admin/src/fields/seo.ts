import type { Field } from 'payload'

export const seoField: Field = {
  name: 'seo',
  type: 'group',
  label: 'SEO',
  fields: [
    { name: 'title', type: 'text', label: 'Título SEO' },
    { name: 'description', type: 'textarea', label: 'Descrição SEO' },
  ],
}
