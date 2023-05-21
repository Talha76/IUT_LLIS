const bcrypt = require('bcryptjs');
const { client } = require('../config/database.config');

(async () => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash('1234', salt);
  console.log(hash);

  await client.connect();
  await client.query(`insert into "studentAuth" values(40, '${hash}')`);
  await client.end();
})();
