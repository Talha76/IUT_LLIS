const { pool, client } = require('../../config/database.config');
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
// const getLeaveHistory = async (req, res) => {
//   const id = typeof req.query.id === 'undefined' ? '' : req.query.id;
 

//     res.render('../views/users/adminDashboard.ejs', {leaveHistory: req.flash('leave_history')});
    
// }

// const getLateHistory = async (req, res) => {
//   const id = typeof req.query.id === 'undefined' ? '' : req.query.id;
  
//     res.render('../views/users/adminDashboard.ejs', {lateHistory: req.flash('late_history')});
    
// }
const getAdminDashboard = async (req, res) => {
  const id = typeof req.query.studentId === 'undefined' ? '' : req.query.studentId;
  const from = typeof req.query.from === 'undefined' ? '' : req.query.from;
  const to = typeof req.query.to === 'undefined' ? '' : req.query.to;

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
    .catch((err) => console.error(err + 'error'))
    // .finally(() => clnt.release());

  if(search_results.length)
    req.flash('search_results', search_results);
  else 
    req.flash('search_results');

  // for leave history
  const leave_history = [];
  const query1 = `select * 
           from "leaveInfo", "students"
           where "leaveInfo"."supervisorStatus" = 'approved'
             and "students"."gender" ilike 'female'
             and "students"."id" = "leaveInfo"."studentId"
             and "students"."id"::text like '%' || trim('${id}') || '%'`;
  await clnt.query(query1)
    .then((result) => {
      result.rows.forEach(row => leave_history.push(row));
    })
    .catch((err) => console.error(err + 'errorLeave'))
    // .finally(() => clnt.release());
  
  if(leave_history.length)
    req.flash('leave_history', leave_history);
  else
    req.flash('leave_history');

  // for late history
  const late_history = [];;
  const query2 = `select * 
           from "lateInfo", "students"
           where "lateInfo"."priorAuthorization" = 'TRUE'
             and "students"."gender" ilike 'female'
             and "students"."id" = "lateInfo"."studentId"
             and "students"."id"::text like '%' || trim('${id}') || '%'`;
  await clnt.query(query2)
    .then((result) => {
      result.rows.forEach(row => late_history.push(row));
    })
    .catch((err) => console.error(err + 'errorlate'))
    .finally(() => clnt.release());
  
  if(late_history.length)
    req.flash('late_history', late_history);
  else
    req.flash('late_history');


  res.render('../views/users/adminDashboard.ejs', { 
    searchResults: req.flash('search_results'),
    leaveHistory: req.flash('leave_history'),
    lateHistory: req.flash('late_history')
  });
};

const getLogout = async (req, res) => {
  req.logout((err) => console.error(err));
  req.flash('success', 'You are successfully logged out');
  res.redirect('/admin');
};

const getDetails = async (req, res) => {
  const leaveId = req.query.leaveId;
  const query = `select * 
                  from "leaveInfo", "students"
                  where "leaveInfo"."leaveId" = '${leaveId}' 
                    and "students"."id" = "leaveInfo"."studentId"`;

  
  const leave_details = [];
  const clnt = await pool.connect();

  await clnt.query(query)
    .then((result) => {
      // console.log(result.rows);
      result.rows.forEach(row => leave_details.push(row));
    })
    .catch((err) => console.error(err + 'error'))
    .finally(() => clnt.release());

    // console.log(leave_details);
    if(leave_details.length)
    req.flash('leave_details', leave_details);
  else
    req.flash('leave_details');

  res.render('users/studentDetails.ejs', {
    student: req.user,
    success: req.flash('success'),
    leaveDetails: req.flash('leave_details')
  });
};

const getHistoryDetails = async (req, res) => {
  res.render('users/studentHistoryDetailsAdmin.ejs', {
    student: req.user,
    success: req.flash('success')
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
  getDetails,
  getHistoryDetails
};
