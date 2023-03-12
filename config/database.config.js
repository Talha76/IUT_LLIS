const { Client, Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.PoolURI });
const client = new Client(process.env.ClientURI);

// client.connect().catch((err) => console.error(err));
// client.query('select now()', (err, res) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(res.rows[0].now);
//   }
//   client.end();
// });

module.exports = { pool, client };
