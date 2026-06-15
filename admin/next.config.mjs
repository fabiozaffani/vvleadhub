import { withPayload } from '@payloadcms/next/withPayload'

// Origens extras de dev (ex.: preview proxied) via env: DEV_ALLOWED_ORIGINS="host1,host2".
const devOrigins = process.env.DEV_ALLOWED_ORIGINS?.split(',').filter(Boolean) ?? []

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@vvf/contracts'],
  ...(devOrigins.length ? { allowedDevOrigins: devOrigins } : {}),
}

export default withPayload(nextConfig)
