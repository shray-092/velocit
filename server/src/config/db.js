import pg from 'pg';

console.log('DB URL:', process.env.DATABASE_URL);

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const query = (text, params) => pool.query(text, params);
export { pool };
