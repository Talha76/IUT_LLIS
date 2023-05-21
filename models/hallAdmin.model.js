const { pool } = require('../config/database.config');

const approveLeave = async (leaveId, role) => {
  const query = `UPDATE "leaveInfo" SET "${role}Status" = 'approved' `
              + `WHERE "leaveId" = ${leaveId}`;
  
  return new Promise((resolve, reject) => {
    pool.connect()
      .then((client) => {
        client.query(query)
          .then((result) => resolve(null))
          .catch((err) => reject(err))
          .finally(() => client.release());
      })
      .catch((err) => reject(err));
  });
}

const rejectLeave = async (leaveId, role) => {
  const query = `UPDATE "leaveInfo" SET "${role}Status" = 'rejected' `
              + `WHERE "leaveId" = ${leaveId}`;
  
  return new Promise((resolve, reject) => {
    pool.connect()
      .then((client) => {
        client.query(query)
          .then((result) => resolve(null))
          .catch((err) => reject(err))
          .finally(() => client.release());
      })
      .catch((err) => reject(err));
  });
}

const getAdminById = async (id) => {
  const query = `SELECT "id", "name", "email", "password", "adminType" as "role" FROM "adminAuth"`
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
  approveLeave,
  rejectLeave,
  destroy
}
