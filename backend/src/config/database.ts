import { Pool } from 'pg'
import { createClient } from '@supabase/supabase-js'

// PostgreSQL pool
export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
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
