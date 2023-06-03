const { pool, poolExecute } = require('../config/database.config');

const getStudentById = async (id) => {
  const query = `SELECT "students".*, "studentAuth".password, "studentAuth"."resetPasswordToken", 'student' as role `
              + `FROM "students", "studentAuth" `
              + `WHERE "students"."id" = "studentAuth"."id" AND `
                    + `"students"."id" = ${id}`;
  
  const result = await poolExecute(query);
  if (result.rowCount < 1) {
    return null;
  }
  return result[0];
}

const saveLeaveInfo = async (id, info) => {
  const query = `INSERT INTO "leaveInfo" ("studentId", "placeOfVisit", "purposeOfVisit", "departureDate", "arrivalDate", "contact", "guardianContact") `
              + `VALUES (${id}, '${info.placeOfVisit}', '${info.purposeOfVisit}', '${info.departureDate}', '${info.arrivalDate}', `
              + `'${info.studentContact}', '${info.contactPersonContact}')`;

  const result = await poolExecute(query);
  return result;
}

const saveLateInfo = async (id, info) => {
  const query = `INSERT INTO "lateInfo" ("studentId", "placeOfVisit", "reason", "departureTime", "arrivalTime", "contact", "accompanyingPersonContact") `
              + `VALUES (${id}, '${info.placeOfVisit}', '${info.lateReason}', '${info.departureTime}', '${info.arrivalTime}', `
              + `'${info.studentContact}', '${info.accompanyingPersonContact}')`;

  const result = await poolExecute(query);
  return result;
}

const destroy = async () => pool.end();

module.exports = {
  getStudentById,
  saveLeaveInfo,
  saveLateInfo,
  destroy
};
