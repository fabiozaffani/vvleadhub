import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access/roles'

// RBAC (D-12, doc 06 §6): papéis nativos do Payload, sem provedor externo.
export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: { useAsTitle: 'email', group: 'Sistema', defaultColumns: ['nome', 'email', 'role'] },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    { name: 'nome', type: 'text' },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'marketing',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Marketing', value: 'marketing' },
        { label: 'Editor de conteúdo', value: 'editor' },
        { label: 'Leitura', value: 'leitura' },
      ],
    },
  ],
}
