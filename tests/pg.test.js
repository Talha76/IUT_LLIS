const { pool, client } = require('../config/database.config');

describe('Postgres Integration Tests', () => {
  test('client should connect to database', async () => {
    client.connect();
    client.query('select now()', (err, res) => {
      if (err) {
        console.error(err);
      } else {
        expect(res.rows[0].now).toBeDefined();
      }
      client.end();
    });
  });

  test('pool should connect to database', async () => {
    pool.connect()
      .then((clnt) => {
        clnt.query('select now()', (err, res) => {
          if (err) {
            console.error(err);
          } else {
            expect(res.rows[0].now).toBeDefined();
          }
          clnt.release();
        });
      })
      .catch((err) => console.error(err))
      .finally(() => pool.end());
  });
});
