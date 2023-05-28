const jwt = require('jsonwebtoken');
const { pool } = require('../config/database.config');

const user = { id: 400 };

jwt.sign(user, 'top_level_secret', { expiresIn: '2m' }, (err, token) => {
  if (err)
    throw err;

  console.log(token);
  // pool.connect()
  //   .then((client) => {
  //     const query = `UPDATE "studentAuth" SET "resetPasswordToken" = '${token}' WHERE "studentId" = ${user.id}`;
  //     client.query(query)
  //       .catch((err) => console.error(err))
  //       .finally(() => client.release());
  //   })
  //   .catch((err) => console.error(err));
});
