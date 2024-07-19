import pg from 'pg'

const { Pool } = pg

const pool = new Pool({
  connectionString: `postgresql://postgres:postgres@localhost:${process.env.PGPORT || 5432}/postgres`
});
 
export const query = <T extends pg.QueryResultRow = any[]>(
  queryText: string, 
  params?: any[],
) => {
  return pool.query<T>(queryText, params);
}
