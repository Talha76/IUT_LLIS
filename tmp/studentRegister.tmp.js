const bcrypt = require('bcryptjs');
const { client } = require('../config/database.config');

// (async () => {
//   const salt = await bcrypt.genSalt(10);
//   const hash = await bcrypt.hash('1234', salt);

//   await client.connect();
//   await client.query(`insert into "studentAuth" values(40, '${hash}')`);
//   await client.end();
// })();

client.connect()
  .then(() => {
    client.query('select password from "studentAuth" where "studentId" = 40')
      .then((res) => console.log(res.rows))
      .catch((err) => console.error(err));
  })
  .catch((err) => console.log(err ? err : `connected`))
  .finally(() => client.end());
