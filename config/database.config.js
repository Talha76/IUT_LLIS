const { Client, Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.POOL_URI,
  connectionTimeoutMillis: 10000
});
const client = new Client({
  connectionString: process.env.CLIENT_URI,
  connectionTimeoutMillis: 10000
});

module.exports = { pool, client };
