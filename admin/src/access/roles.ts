import type { Access } from 'payload'

type Role = 'admin' | 'marketing' | 'editor' | 'leitura'

const roleOf = (req: { user?: unknown }): Role | undefined =>
  (req.user as { role?: Role } | null | undefined)?.role

export const anyone: Access = () => true

export const isLoggedIn: Access = ({ req }) => Boolean(req.user)

export const isAdmin: Access = ({ req }) => roleOf(req) === 'admin'

export const isAdminOrEditor: Access = ({ req }) => {
  const role = roleOf(req)
  return role === 'admin' || role === 'marketing' || role === 'editor'
}
