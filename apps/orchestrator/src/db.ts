import { Pool } from 'pg';

let pool: Pool | null = null;

export function createDatabasePool(): Pool {
  if (pool) return pool;

  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.warn('⚠️  DATABASE_URL not set, database features will be disabled');
    return null as any;
  }

  pool = new Pool({
    connectionString: databaseUrl,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });

  pool.on('error', (err) => {
    console.error('Unexpected database error:', err);
  });

  console.log('✅ Database pool created');
  return pool;
}

export function getPool(): Pool | null {
  return pool;
}

export async function testConnection(): Promise<boolean> {
  if (!pool) return false;

  try {
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Database connection test successful:', result.rows[0].now);
    return true;
  } catch (error) {
    console.error('❌ Database connection test failed:', error);
    return false;
  }
}
