const { pool, client } = require('../config/database.config');

describe('PostgreSQL integration tests', () => {
  test('pool should connect to database', async () => {
    const results = [];
    const clnt = await pool.connect();
    const res = await clnt.query('SELECT NOW()');
    res.rows.forEach(row => results.push(row));
    clnt.release();
    await pool.end();

    expect(results.length).toBe(1);
    expect(results[0].now).toBeDefined();
    expect(results[0].then).toBeUndefined();
  });
});

