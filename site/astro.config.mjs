import { defineConfig } from 'astro/config'
import node from '@astrojs/node'

const site =
  process.env.PUBLIC_SITE_URL ??
  (process.env.REPLIT_DEV_DOMAIN ? `https://${process.env.REPLIT_DEV_DOMAIN}` : 'http://localhost:5000')

// Restrição de build 1: output:'server' (SSR) + adapter Node. Nunca 'static'.
export default defineConfig({
  site,
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  server: { host: '0.0.0.0', port: 5000 },
  // O preview do Replit é um iframe proxied (origem diferente) — liberar hosts.
  vite: { server: { allowedHosts: true } },
})
