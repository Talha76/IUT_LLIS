const { pool } = require('../../config/database.config');
const studentModel = require('../../models/student.model');

const getIndex = (req, res) => {
  res.render('login.ejs', {
    error: req.flash('error'),
    success: req.flash('success')
  });
}

const postIndex = (req, res) => res.redirect('/student/dashboard');

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
  const id = req.user.id;
  const from = typeof req.query.from === 'undefined' ? '' : req.query.from;
  const to = typeof req.query.to === 'undefined' ? '' : req.query.to;
  const client = await pool.connect();
  
  // For leave History
  const leave_history = [];
  const query1 = `select *
                  from "leaveInfo", "students"
                  where "students"."id" = "leaveInfo"."studentId"
                    and "students"."id" = ${id}`;

  await client.query(query1)
    .then((result) => result.rows.forEach(row => leave_history.push(row)))
    .catch((err) => console.error(err))

  if(leave_history.length)
    req.flash('leave_history', leave_history);
  else
    req.flash('leave_history');

  // for late history
  const late_history = [];;
  const query2 = `select * 
                  from "lateInfo", "students"
                  where "students"."id" = "lateInfo"."studentId"
                    and "students"."id" = ${id}`;

  await client.query(query2)
    .then((result) => result.rows.forEach(row => late_history.push(row)))
    .catch((err) => console.error(err + 'errorlate'))
    
  if(late_history.length)
    req.flash('late_history', late_history);
  else
    req.flash('late_history');

  client.release();

  res.render('users/studentHistoryStudent.ejs', {
    student: req.user,
    success: req.flash('success'),
    leaveHistory: req.flash('leave_history'),
    lateHistory: req.flash('late_history')
  });
}

const getHistoryDetails = async (req, res) => {
  const leaveId = req.query.leaveId;
  const query = `SELECT * FROM "leaveInfo", "students" `
              + `WHERE "leaveInfo"."studentId" = "students"."id" and`
                    + `"leaveInfo"."leaveId" = ${leaveId}`;

  const leave_details = [];
  const client = await pool.connect();
  await client.query(query)
    .then((result) => result.rows.forEach(row => leave_details.push(row)))
    .catch((err) => console.error(err))
    .finally(client.release());

  if (leave_details.length) {
    req.flash('leave_details', leave_details);
  } else {
    req.flash('leave_details');
  }

  res.render('users/studentDetails.ejs', {
    student: req.user,
    leaveDetails: req.flash('leave_details'),
    success: req.flash('success')
  });
};

const getForgotPassword = async (req, res) => {
  res.render('users/forgot-password-student', {
    error: req.flash('error'),
    message: req.flash('message')
  });
}

const postForgotPassword = async (req, res) => {
  const id = req.body.id;

  const userResult = await studentModel.getStudentById(id);

  if (!userResult) {
    req.flash('error', 'No user found');
    return res.redirect('/student/forgot-password');
  }

  const user = { id: userResult.id, role: 'student' };
  const token = await require('../../config/jwt')(user);

  const recepientEmail = userResult.email;
  const mailText = `Hi,\n Please click the below link for resetting your password. This link will expire after 5 minutes.\n`
                 + `http://localhost:3000/student/token?token=${token}`;
  const mailHtml = `<p>Hi</p><br><p>Please click the <a href="http://localhost:3000/student/token?token=${token}">link</a> to reset your password.`
                 + ` This link will expire after 5 minutes.</p>`;
  
  const message = {
    from: 'mushfiqurtalha@iut-dhaka.edu',
    to: recepientEmail,
    subject: 'Reset your password for IUT LLIS',
    text: mailText,
    html: mailHtml
  };
  await require('../../config/mail')(message);

  req.flash('message', 'A Mail has been sent to your email address');
  res.redirect('/student/forgot-password');
}

module.exports = {
  getIndex,
  postIndex,
  getDashboard,
  getLogout,
  postLeaveSave,
  postLateSave,
  getHistory,
  getHistoryDetails,
  getForgotPassword,
  postForgotPassword
};
