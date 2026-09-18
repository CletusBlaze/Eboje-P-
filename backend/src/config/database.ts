import { Pool } from 'pg'
import { createClient } from '@supabase/supabase-js'

// Parse DATABASE_URL manually to avoid pg's SSL mode parsing
const dbUrl = new URL((process.env.DATABASE_URL || '').replace('?sslmode=require', '').replace('&sslmode=require', ''))

export const db = new Pool({
  host: dbUrl.hostname,
  port: parseInt(dbUrl.port || '5432'),
  user: decodeURIComponent(dbUrl.username),
  password: decodeURIComponent(dbUrl.password),
  database: dbUrl.pathname.replace('/', ''),
  ssl: { rejectUnauthorized: false },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

db.on('error', (err) => {
  console.error('PostgreSQL pool error:', err)
})

// Supabase client — for storage only
export const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

export async function testConnection(): Promise<void> {
  const client = await db.connect()
  await client.query('SELECT 1')
  client.release()
  console.log('PostgreSQL connected')
}
