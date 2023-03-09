const { Pool } = require('pg');
const dotenv = require('dotenv').config();
const _ = require('lodash');

const pool = new Pool({ connectionString: process.env.PoolURI });

module.exports = pool;
