const { pool, client } = require('../config/database.config');

describe('PostgreSQL integration tests', () => {
  test('client should connect to database', async () => {
    const results = [];
    try {
      await client.connect();
      const query = 'SELECT NOW()';
      const res = await client.query(query);
      res.rows.forEach(row => results.push(row));
    } catch (err) {
      console.error(err);
    } finally {
      await client.end();
    }

    expect(results.length).toBe(1);
    expect(results[0].now).toBeDefined();
    expect(results[0].then).toBeUndefined();
  });

  test('pool should connect to database', async () => {
    const results = [];
    try {
      const clnt = await pool.connect();
      const res = await clnt.query('SELECT NOW()');
      res.rows.forEach(row => results.push(row));
      await clnt.release();
    } catch (err) {
      console.error(err);
    } finally {
      await pool.end();
    }

    expect(results.length).toBe(1);
    expect(results[0].now).toBeDefined();
    expect(results[0].then).toBeUndefined();
  });
});

