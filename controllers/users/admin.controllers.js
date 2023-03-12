const {client} = require('../../config/database.config');

const getAdminLogin = (req, res) => {
  res.render('../views/users/adminLogin.ejs')
};

const postAdminLogin = (req, res) => {
  res.send('<h1>Login Admin POST</h1>');
};

const getAdminIndex = (req, res, next) => {
  res.render('../views/users/adminDashboard.ejs', {searchResults: req.flash('search_results')});
};
const postAdminIndex = (req, res) => {
  const {gender} = req.body;

  client.connect((err) => {
    console.log(err ? err + " = hello eror hoise": "Database Connected");
  });
  
  const query = {
    text: 'select * from students where gender ilike $1',
    values: [gender],
  };
  // const query = `select * from "students" where gender = '${gender}'`;
  const search_results = [];
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

const getSearchUnapproved = (req, res) => {
  const {id} = req.query;
  res.send(`id = ${id}`);
};
const postSearchUnapproved = (req, res) => {

};
const getSearchStudent = (req, res) => {
  const {id} = req.query;
  res.send(`id = ${id}`);
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
