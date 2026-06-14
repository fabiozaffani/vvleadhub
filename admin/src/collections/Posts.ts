import type { CollectionConfig } from 'payload'
import { anyone, isAdmin, isAdminOrEditor } from '../access/roles'
import { slugField } from '../fields/slug'
import { seoField } from '../fields/seo'

// Posts do blog (07). coverImage pode ser null → o site renderiza fallback gradiente.
export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Post', plural: 'Posts' },
  admin: {
    useAsTitle: 'titulo',
    group: 'Blog',
    defaultColumns: ['titulo', 'categoria', 'status', 'publishedAt'],
  },
  access: { read: anyone, create: isAdminOrEditor, update: isAdminOrEditor, delete: isAdmin },
  fields: [
    { name: 'titulo', type: 'text', required: true },
    slugField,
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'rascunho',
      options: [
        { label: 'Rascunho', value: 'rascunho' },
        { label: 'Publicado', value: 'publicado' },
      ],
    },
    { name: 'categoria', type: 'relationship', relationTo: 'categorias' },
    { name: 'resumo', type: 'textarea', label: 'Resumo' },
    { name: 'coverImage', type: 'upload', relationTo: 'media', label: 'Imagem de capa' },
    { name: 'conteudo', type: 'richText', label: 'Conteúdo' },
    { name: 'publishedAt', type: 'date', label: 'Data de publicação' },
    seoField,
  ],
}
