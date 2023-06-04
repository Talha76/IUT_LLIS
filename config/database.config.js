const { Client, Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.POOL_URI
});

const client = new Client(process.env.CLIENT_URI);
client.connect();

const poolExecute = async (queryString) => {
  const poolClient = await pool.connect();
  const result = await poolClient.query(queryString);
  poolClient.release();
  return result.rows;
}

const clientExecute = async (queryString) => {
  await client.connect();
  const result = client.query(queryString);
  await client.end();
  return result.rows;
}

module.exports = { 
  pool,
  client,
  poolExecute,
  clientExecute
}
