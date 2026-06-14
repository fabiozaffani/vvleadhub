/**
 * Proxy de produção (porta 5000 → Payload :3000 | Site :5001).
 * Sem dependências externas — só Node.js built-in http.
 *
 * Regras de roteamento:
 *   /admin /api /_next /media  →  Payload/Next  :3000
 *   tudo o mais               →  Astro Site     :5001
 */
import http from 'http'

const ADMIN_PORT = 3000
const SITE_PORT  = 5001
const PROXY_PORT = parseInt(process.env.PORT ?? '5000', 10)

const ADMIN_PATH = /^\/(admin|api|_next|media)(\/|$)/

function pipe(req, res, targetPort) {
  const opts = {
    hostname: '127.0.0.1',
    port: targetPort,
    path: req.url,
    method: req.method,
    headers: { ...req.headers, host: `localhost:${targetPort}` },
  }
  const upstream = http.request(opts, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers)
    proxyRes.pipe(res, { end: true })
  })
  upstream.on('error', (err) => {
    console.error(`[proxy] error → :${targetPort} —`, err.message)
    if (!res.headersSent) {
      res.writeHead(502)
      res.end('Gateway error — backend not ready yet.')
    }
  })
  req.pipe(upstream, { end: true })
}

const server = http.createServer((req, res) => {
  const target = ADMIN_PATH.test(req.url ?? '/') ? ADMIN_PORT : SITE_PORT
  pipe(req, res, target)
})

server.listen(PROXY_PORT, '0.0.0.0', () => {
  console.warn(`[proxy] :${PROXY_PORT}  admin::${ADMIN_PORT}  site::${SITE_PORT}`)
})
