const jwt = require('jsonwebtoken');
const { poolExecute } = require('../config/database.config');
require('dotenv').config();

/**
 * Generates token for student
 * @param {User type} user object must contain id, role : student, admin
 */
module.exports = async (user) => {
  const token = jwt.sign(user, process.env.STUDENT_JWT_SECRET, { expiresIn: '5m' });

  const table = (user.role === 'student' ? 'student' : 'admin') + 'Auth';
  const query = `UPDATE "${table}" SET "resetPasswordToken" = '${token}' `
              + `WHERE "id" = ${user.id}`;
  await poolExecute(query);

  return token;
};
