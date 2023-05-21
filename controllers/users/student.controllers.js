const { pool } = require('../../config/database.config');
const studentModel = require('../../models/student.model');

const getDashboard = (req, res) => {
  res.render('users/studentDashboard.ejs', {
    student: req.user,
    success: req.flash('success'),
  });
}

const getLogout = (req, res) => {
  req.logout((err) => console.error(err));
  req.flash('success', 'You are successfully logged out');
  res.redirect('/');
}

const postLeaveSave = async (req, res) => {
  const info = req.body;
  await studentModel.saveLeaveInfo(req.user.id, info)
    .catch((err) => console.error(err));
  req.flash('success', 'Request sent successfully');
  res.redirect('/student/dashboard');
}

const postLateSave = async (req, res) => {
  const info = req.body;
  await studentModel.saveLateInfo(req.user.id, info)
    .catch((err) => console.error(err));
  req.flash('success', 'Information saved successfully');
  res.redirect('/student/dashboard');
}

const getHistory = async (req, res) => {
  const id = typeof req.query.studentId === 'undefined' ? '' : req.query.studentId;
  const from = typeof req.query.from === 'undefined' ? '' : req.query.from;
  const to = typeof req.query.to === 'undefined' ? '' : req.query.to;
  const clnt = await pool.connect();
  
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
           where "students"."gender" ilike 'female'
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

  res.render('users/studentHistoryStudent.ejs', {
    student: req.user,
    success: req.flash('success'),
    leaveHistory: req.flash('leave_history'),
    lateHistory: req.flash('late_history')
  });
}

const getHistoryDetails = async (req, res) => {
  res.render('users/studentHistoryDetailsStudent.ejs', {
    student: req.user,
    success: req.flash('success'),
  });
};
module.exports = {
  getDashboard,
  getLogout,
  postLeaveSave,
  postLateSave,
  getHistory,
  getHistoryDetails
};
