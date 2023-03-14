const { pool } = require('../../config/database.config');

async function getStudentById(id) {
  const query = `SELECT "students".*, "studentAuth".password `
              + `FROM "students" LEFT OUTER JOIN "studentAuth" ON "students"."id" = "studentAuth"."id" `
              + `WHERE "students"."id" = ${id}`;
  return new Promise((resolve, reject) => {
    pool.connect()
      .then((client) => {
        client.query(query)
          .then((res) => {
            if (res.rows < 1) {
              resolve(null);
            } else if (res.rows > 1) {
              reject(new Error('Returning multiple rows'));
            } else {
              resolve(res.rows[0]);
            }
          })
          .catch((err) => {
            reject(err);
          })
          .finally(() => client.release());
      })
      .catch((err) => reject(err));
  });
}

async function destroy() { pool.end(); }

module.exports = {
  getStudentById,
  destroy,
};
