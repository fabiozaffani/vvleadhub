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

// D-9: o Payload conecta com o role ISOLADO `vvf_payload` (DATABASE_URL_PAYLOAD), nunca o
// superuser — é o que torna o isolamento de schema real em runtime (ver infra/db/roles.sql).
const connectionString = process.env.DATABASE_URL_PAYLOAD ?? ''
// SSL por ambiente: DATABASE_SSL=require liga TLS (Postgres gerenciado costuma exigir);
// default desligado para Postgres local de dev sem SSL.
const dbSsl = process.env.DATABASE_SSL === 'require' ? { rejectUnauthorized: true } : false

// serverURL: PUBLIC_SITE_URL (domínio publicado) quando setado; em dev cai para
// PAYLOAD_PUBLIC_SERVER_URL e então localhost:3000.
const serverURL =
  process.env.PUBLIC_SITE_URL ??
  process.env.PAYLOAD_PUBLIC_SERVER_URL ??
  'http://localhost:3000'

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
    pool: { connectionString, ssl: dbSsl },
  }),
  sharp,
  cors: [serverURL],
  csrf: [serverURL],
})
