const {client, pool} = require('../../config/database.config');

const getAdminLogin = (req, res) => {
  res.render('../views/users/adminLogin.ejs')
};

const postAdminLogin = (req, res) => {
  res.send('<h1>Login Admin POST</h1>');
};

const getAdminIndex = async (req, res) => {
  const query = `select * 
                from "leaveInfo", "students"
                where "leaveInfo"."supervisorStatus" = 'unapproved'
                      and "students"."gender" ilike 'female'
                      and "students"."id" = "leaveInfo"."studentId"`;
  const search_results = [];
  const clnt = await pool.connect();
  await clnt.query(query)
    .then((result) => {
      result.rows.forEach(row => search_results.push(row));
    })
    .catch((err) => console.log(err + "Error hoise"))
    .finally(() => clnt.release());

  console.log(search_results);
  if(search_results.length)
    req.flash('search_results', search_results);
  else 
    req.flash('search_results');
  res.render('../views/users/adminDashboard.ejs', {searchResults: req.flash('search_results')});
};
const postAdminIndex = (req, res) => {
  const {id} = req.body;

  client.connect((err) => {
    console.log(err ? err + " = hello eror hoise": "Database Connected");
  });
  
  const query = {
    text: 'select * from students where id ilike $1',
    values: [id],
  };
  // const query = `select * from "students" where gender = '${gender}'`;
  const search_results = [];
  pool.conn;
  client.query(query, (err, result) => {
    if(err){
      console.log(err + 'EERRRRRROOOORRR');
    } else {
      result.rows.forEach((row) => {
        let dummy = {
          id : row.id,
          name :  row.name,
          description : row.description
        };
        search_results.push(dummy);
      });
    }
    if(search_results.length == 0) search_results.push({id : -1, name : 'dummy', description : 'dummy'});
    
    req.flash('search_results', search_results);
    
    res.redirect('/admin');
  });
};

const getSearchUnapproved = async (req, res) => {
  const {id} = req.query;
  const query = `select * from "leaveInfo", "students"
                 where "leaveInfo"."studentId" = ${id}
                 and "students"."id" = ${id}
                 and "gender" ilike 'female'`;
  // const query = {
  //   text : `select * from "leaveInfo" where "leaveInfo.studentId" = $1`,
  //   values : [id]
  // };
  const search_results = [];
  const clnt = await pool.connect();
  await clnt.query(query)
    .then((result) => {
      result.rows.forEach(row => search_results.push(row));
    })
    .catch((err) => console.log(err + " Error hoise"))
    .finally(() => clnt.release());
    console.log(search_results);
  if(search_results.length)
    req.flash('search_results', search_results);
    else {
      search_results.push({id : -1});
      req.flash('search_results', search_results);
  }
  res.render('../views/users/searchUnapproved.ejs', {searchResults: req.flash('search_results')});

};

const postSearchUnapproved = (req, res) => {

};
const getSearchStudent = (req, res) => {

};
const postSearchStudent = (req, res) => {

};

module.exports = {
  getAdminLogin, 
  postAdminLogin,
  getAdminIndex,
  postAdminIndex,
  getSearchUnapproved,
  postSearchUnapproved,
  getSearchStudent,
  postSearchStudent
};
