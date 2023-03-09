const pool = require('../config/database.config');
const assert = require('assert');

describe('Pool connection testing', () => {
  it('Should return numbers from 1 to 3', () => {
    pool.connect()
      .then((client) => {
        client.query('select * from generate_series(1, 3) as num')
          .then((result) => {
            assert.deepEqual(result.rows, [{num: 1}, {num: 2}, {num: 3}]);
          })
          .catch((err) => {
            console.error(err);
          })
          .finally(() => {
            client.release();
          });
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        pool.end();
      });
  })
})
