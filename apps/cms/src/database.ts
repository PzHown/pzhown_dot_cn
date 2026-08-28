import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'

const databaseAdapter = process.env.DATABASE_ADAPTER ?? 'sqlite'

if (databaseAdapter !== 'sqlite' && databaseAdapter !== 'postgres') {
  throw new Error(`Unsupported DATABASE_ADAPTER: ${databaseAdapter}`)
}

const getPostgresConnectionString = () => {
  const connectionString = process.env.DATABASE_URL

  if (!connectionString) {
    throw new Error('DATABASE_URL is required when DATABASE_ADAPTER=postgres')
  }

  return connectionString
}

export const db =
  databaseAdapter === 'postgres'
    ? postgresAdapter({
        pool: {
          connectionString: getPostgresConnectionString(),
        },
      })
    : sqliteAdapter({
        client: {
          url: process.env.DATABASE_URL ?? 'file:./payload.db',
        },
        wal: true,
      })
