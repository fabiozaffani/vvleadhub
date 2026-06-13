import type { Access } from 'payload'

type Role = 'admin' | 'marketing' | 'editor' | 'leitura'

const roleOf = (req: { user?: { role?: Role } | null }): Role | undefined => req.user?.role

export const anyone: Access = () => true

export const isLoggedIn: Access = ({ req }) => Boolean(req.user)

export const isAdmin: Access = ({ req }) => roleOf(req) === 'admin'

export const isAdminOrEditor: Access = ({ req }) => {
  const role = roleOf(req)
  return role === 'admin' || role === 'marketing' || role === 'editor'
}
