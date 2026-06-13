import { withPayload } from '@payloadcms/next/withPayload'

const replitDomain = process.env.REPLIT_DEV_DOMAIN

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@vvf/contracts'],
  ...(replitDomain ? { allowedDevOrigins: [replitDomain] } : {}),
}

export default withPayload(nextConfig)
