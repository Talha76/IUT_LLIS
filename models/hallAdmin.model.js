const { pool, poolExecute } = require('../config/database.config');

const approveLeave = async (leaveId, role) => {
  const query = `UPDATE "leaveInfo" SET "${role}Status" = 'approved' `
              + `WHERE "leaveId" = ${leaveId}`;

  await poolExecute(query);
}

const rejectLeave = async (leaveId, role) => {
  const query = `UPDATE "leaveInfo" SET "${role}Status" = 'rejected' `
              + `WHERE "leaveId" = ${leaveId}`;
  
  await poolExecute(query);
}

const getAdminById = async (id) => {
  const query = `SELECT "id", "name", "email", "password", "adminType" as "role" FROM "adminAuth"`
              + `WHERE "id" = ${id}`;
  
  const result = await poolExecute(query);
  if (result.rowCount < 1) {
    return null;
  }
  return result[0];
}

const destroy = async() => pool.end();

module.exports = {
  getAdminById,
  approveLeave,
  rejectLeave,
  destroy
}
