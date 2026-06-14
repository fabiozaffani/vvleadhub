import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'
import { anyone, isAdmin, isAdminOrEditor } from '../access/roles'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export const Media: CollectionConfig = {
  slug: 'media',
  admin: { group: 'Sistema' },
  access: { read: anyone, create: isAdminOrEditor, update: isAdminOrEditor, delete: isAdmin },
  upload: {
    staticDir: path.resolve(dirname, '../../media'),
  },
  fields: [{ name: 'alt', type: 'text', required: true, label: 'Texto alternativo' }],
}
