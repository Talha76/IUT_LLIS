(async () => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash('3', salt);
  console.log(hash);

  await client.connect();
  await client.query(`insert into "adminAuth" values(3, '${hash}')`);
  await client.end();
})();
