import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'

import { Users } from './src/collections/Users'
import { Media } from './src/collections/Media'
import { Espacos } from './src/collections/Espacos'
import { Servicos } from './src/collections/Servicos'
import { Campanhas } from './src/collections/Campanhas'
import { Objetivos } from './src/collections/Objetivos'
import { TiposDeEvento } from './src/collections/TiposDeEvento'
import { Categorias } from './src/collections/Categorias'
import { Posts } from './src/collections/Posts'

const dirname = path.dirname(fileURLToPath(import.meta.url))

// D-9: o Postgres do Replit (helium) anuncia sslmode na URL mas não fala SSL.
// Removemos o parâmetro e desligamos ssl explicitamente.
const connectionString = (process.env.DATABASE_URL ?? '')
  .replace(/([?&])sslmode=[^&]*/g, '$1')
  .replace(/[?&]$/, '')

const serverURL = process.env.PAYLOAD_PUBLIC_SERVER_URL ?? 'http://localhost:3000'

export default buildConfig({
  serverURL,
  admin: {
    user: Users.slug,
    meta: { titleSuffix: ' · Vale Verde' },
  },
  collections: [
    Users,
    Media,
    Espacos,
    Servicos,
    Campanhas,
    Objetivos,
    TiposDeEvento,
    Categorias,
    Posts,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET ?? '',
  typescript: {
    // D-9 / restrição de build 5: tipos do Payload desaguam em packages/contracts/generated.
    outputFile: path.resolve(dirname, '../packages/contracts/generated/payload-types.ts'),
  },
  // D-9: Payload é dono APENAS do schema `payload`.
  db: postgresAdapter({
    schemaName: 'payload',
    pool: { connectionString, ssl: false },
  }),
  sharp,
  cors: [serverURL],
  csrf: [serverURL],
})
