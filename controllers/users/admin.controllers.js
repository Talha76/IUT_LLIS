const { pool } = require('../../config/database.config');
const passport = require('passport');

const getAdminIndex = (req, res) => {
  res.render('users/adminLogin.ejs', {
    error: req.flash('error'),
    success: req.flash('success')
  });
};

const postAdminIndex = (req, res, next) => {
  passport.authenticate('local2', {
    successRedirect:'/admin/dashboard',
    failureRedirect:'/admin',
    successFlash: true,
    failureFlash: true,
  })(req, res, next);
};

const getAdminDashboard = async (req, res) => {
  const id = typeof req.query.id === 'undefined' ? '' : req.query.id;
  const query = `select * 
                 from "leaveInfo", "students"
                 where "leaveInfo"."supervisorStatus" = 'unapproved'
                   and "students"."gender" ilike 'female'
                   and "students"."id" = "leaveInfo"."studentId"
                   and "students"."id"::text like '%' || trim('${id}') || '%'`;
  const search_results = [];
  const clnt = await pool.connect();
  await clnt.query(query)
    .then((result) => {
      result.rows.forEach(row => search_results.push(row));
    })
    .catch((err) => console.error(err))
    .finally(() => clnt.release());

  if(search_results.length)
    req.flash('search_results', search_results);
  else 
    req.flash('search_results');
  res.render('../views/users/adminDashboard.ejs', { searchResults: req.flash('search_results') });
};

const getLogout = async (req, res) => {
  req.logout((err) => console.error(err));
  req.flash('success', 'You are successfully logged out');
  res.redirect('/admin');
};

const getDetails = async (req, res) => {
  res.render('users/studentDetails.ejs', {
    student: req.user,
    success: req.flash('success'),
  });
};
const getSearchStudent = (req, res) => {

};

module.exports = {
  getAdminIndex, 
  postAdminIndex,
  getAdminDashboard,
  getSearchStudent,
  getLogout,
  getDetails
};
