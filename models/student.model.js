const { pool } = require('../config/database.config');

const getStudentById = async (id) => {
  const query = `SELECT "students".*, "studentAuth".password, 'student' `
              + `FROM "students" LEFT OUTER JOIN "studentAuth" ON "students"."id" = "studentAuth"."studentId" `
              + `WHERE "students"."id" = ${id}`;
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

const saveLeaveInfo = async (id, info) => {
  const query = `INSERT INTO "leaveInfo" ("studentId", "placeOfVisit", "purposeOfVisit", "departureDate", "arrivalDate", "contact", "guardianContact") `
              + `VALUES (${id}, '${info.placeOfVisit}', '${info.purposeOfVisit}', '${info.departureDate}', '${info.arrivalDate}', `
              + `'${info.studentContact}', '${info.contactPersonContact}')`;
  return new Promise((resolve, reject) => {
    pool.connect()
      .then((client) => {
        client.query(query, (err, res) => {
          client.release();
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      })
      .catch((err) => reject(err));
  });
}

const saveLateInfo = async (id, info) => {
  const query = `INSERT INTO "lateInfo" ("studentId", "placeOfVisit", "reason", "departureTime", "arrivalTime", "contact", "accompanyingPersonContact") `
              + `VALUES (${id}, '${info.placeOfVisit}', '${info.lateReason}', '${info.departureTime}', '${info.arrivalTime}', `
              + `'${info.studentContact}', '${info.accompanyingPersonContact}')`;
  return new Promise((resolve, reject) => {
    pool.connect()
      .then((client) => {
        client.query(query, (err, res) => {
          client.release();
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      })
      .catch((err) => reject(err));
  });
}

const destroy = async() => pool.end();

module.exports = {
  getStudentById,
  saveLeaveInfo,
  saveLateInfo,
  destroy
};
