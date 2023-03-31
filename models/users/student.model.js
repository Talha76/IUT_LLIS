const { pool } = require('../../config/database.config');

async function getStudentById(id) {
  const query = `SELECT "students".*, "studentAuth".password `
              + `FROM "students" LEFT OUTER JOIN "studentAuth" ON "students"."id" = "studentAuth"."studentId" `
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

async function saveLeaveInfo(id, info) {
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

async function deleteLeaveInfo(leaveId) {
  const query = `DELETE FROM "leaveInfo" WHERE "id" = ${leaveId}`;
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

async function saveLateInfo(id, info) {
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

async function deleteLateInfo(lateId) {
  const query = `DELETE FROM "lateInfo" WHERE "id" = ${lateId}`;
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

async function destroy() { pool.end(); }

module.exports = {
  getStudentById,
  saveLeaveInfo,
  deleteLeaveInfo,
  saveLateInfo,
  deleteLateInfo,
  destroy,
};
