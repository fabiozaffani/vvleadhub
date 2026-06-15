import { defineConfig } from 'astro/config'
import node from '@astrojs/node'

const site = process.env.PUBLIC_SITE_URL ?? 'http://localhost:5000'

// Restrição de build 1: output:'server' (SSR) + adapter Node. Nunca 'static'.
export default defineConfig({
  site,
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  server: { host: '0.0.0.0', port: 5000 },
  // Preview proxied (iframe de outra origem) precisa liberar host no dev-server: allowlist
  // explícita via env (DEV_ALLOWED_HOSTS="a.com,b.com"); vazio = só localhost. Só afeta `astro dev`.
  vite: { server: { allowedHosts: process.env.DEV_ALLOWED_HOSTS?.split(',').filter(Boolean) ?? [] } },
})
