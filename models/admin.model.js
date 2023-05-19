const { pool } = require('../config/database.config');

const getAdminById = async (id) => {
  const query = `SELECT "email", "password", "adminType" FROM "adminAuth"`
              + `WHERE "id" = ${id}`;
  
  return new Promise((resolve, reject) => {
    pool.connect()
      .then((client) => {
        client.query(query)
          .then((res) => {
            if (res.rowCount < 1) {
              resolve(null);
            } else {
              resolve(res.rows[0]);
            }
          })
          .catch((err) => reject(err))
          .finally(() => client.release());
      })
      .catch((err) => reject(err));
  });
}

const destroy = async() => pool.end();

module.exports = {
  getAdminById,
  destroy
}
