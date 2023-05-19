const { Client, Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.POOL_URI
});

const client = new Client(process.env.CLIENT_URI);

module.exports = { pool, client };
