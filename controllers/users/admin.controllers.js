const { pool } = require('../../config/database.config');
const reportGenerator = require('../../server');
const hallAdmin = require('../../models/hallAdmin.model');

const leave_history = [];
const late_history = [];
const getAdminIndex = (req, res) => {
  res.render('users/adminLogin.ejs', {
    error: req.flash('error'),
    success: req.flash('success')
  });
}

const postAdminIndex = (req, res) => res.redirect('/admin/dashboard');

const getAdminDashboard = async (req, res) => {
  const current_date = new Date();
  
  const id = typeof req.query.studentId === 'undefined' ? '' : req.query.studentId;
  const from = typeof req.query.from === 'undefined' || req.query.from === '' ? current_date.toISOString().split('T')[0] : req.query.from;
  
  const next_date = new Date();
  next_date.setFullYear(next_date.getFullYear() + 100);
  const to = typeof req.query.to === 'undefined' || req.query.to === '' ? next_date.toISOString().split('T')[0] : req.query.to;
  
  const query = `SELECT * `
              + `FROM "leaveInfo", "students" WHERE `
              + (req.user.role === 'supervisor' ? `"leaveInfo"."supervisorStatus" = 'unapproved' ` : `"leaveInfo"."supervisorStatus" = 'approved' AND "leaveInfo"."provostStatus" = 'unapproved' `)
                + `AND "students"."id" = "leaveInfo"."studentId" `
                + `AND "students"."id"::TEXT LIKE '%' || TRIM('${id}') || '%' `
                + `AND "leaveInfo"."departureDate" BETWEEN '${from}' AND '${to}'`
  const search_results = [];
  const client = await pool.connect();
  await client.query(query)
    .then((result) => {
      result.rows.forEach(row => search_results.push(row));
    })
    .catch((err) => console.error(err + 'error'))

  if(search_results.length)
    req.flash('search_results', search_results);
  else 
    req.flash('search_results');

  // for leave history
  const query1 = `SELECT * `
               + `from "leaveInfo", "students" WHERE `
               + `"leaveInfo"."${req.user.role}Status" != 'unapproved' `
               + `AND "students"."gender" ilike 'female' `
               + `AND "students"."id" = "leaveInfo"."studentId" `
               + `AND "students"."id"::text like '%' || trim('${id}') || '%'`;

  while(leave_history.length) {
    leave_history.pop();
  }
  await client.query(query1)
    .then((result) => {
      result.rows.forEach(row => leave_history.push(row));
    })
    .catch((err) => console.error(err + 'errorLeave'))

  if(leave_history.length)
    req.flash('leave_history', leave_history);
  else
    req.flash('leave_history');

  // for late history
  const query2 = `select * 
           from "lateInfo", "students"
           where "lateInfo"."priorAuthorization" = 'TRUE'
             and "students"."gender" ilike 'female'
             and "students"."id" = "lateInfo"."studentId"
             and "students"."id"::text like '%' || trim('${id}') || '%'`;

  while(late_history.length) {
    late_history.pop();
  }
  await client.query(query2)
    .then((result) => {
      result.rows.forEach(row => late_history.push(row));
    })
    .catch((err) => console.error(err + 'errorlate'))
    .finally(() => client.release());
  
  if(late_history.length)
    req.flash('late_history', late_history);
  else
    req.flash('late_history');



  res.render('../views/users/adminDashboard.ejs', { 
    user: req.user,
    searchResults: req.flash('search_results'),
    leaveHistory: req.flash('leave_history'),
    lateHistory: req.flash('late_history')
  });
}

const getLogout = async (req, res) => {
  req.logout((err) => console.error(err));
  req.flash('success', 'You are successfully logged out');
  res.redirect('/admin');
}

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
      result.rows.forEach(row => leave_details.push(row));
    })
    .catch((err) => console.error(err + 'error'))
    .finally(() => clnt.release());

    if(leave_details.length)
    req.flash('leave_details', leave_details[0]);
  else
    req.flash('leave_details');

  res.render('users/studentDetails.ejs', {
    user: req.user,
    success: req.flash('success'),
    leaveDetails: req.flash('leave_details')
  });
}

const getHistoryDetails = async (req, res) => {
  res.render('users/studentHistoryDetailsAdmin.ejs', {
    student: req.user,
    success: req.flash('success')
  });
}

const getLeaveReport = (req, res) => {
  columnNames = ['Leave ID', 'Time', 'Student ID', 'Student Name', 'Status'];
  reportGenerator(leave_history, 'leave_report', columnNames);
  res.sendFile('pdfs/leave_report.pdf', { root: './' });
}

const getLateReport = (req, res) => {
  columnNames = ['Late ID', 'Time', 'Student ID', 'Student Name', 'Status'];
  reportGenerator(late_history, 'late_report', columnNames);
  res.sendFile('pdfs/late_report.pdf', { root: './' });
}

const getApprove = (req, res) => {
  const { leaveId, role } = req.query;
  const studentId = typeof req.query.studentId === 'undefined' ? '' : req.query.studentId;
  const from = typeof req.query.from === 'undefined' ? '' : req.query.from;
  const to = typeof req.query.to === 'undefined' ? '' : req.query.to;
  hallAdmin.approveLeave(leaveId, role);
  res.redirect(`/admin/dashboard?studentId=${studentId}&from=${from}&to=${to}`);
}

const getReject = (req, res) => {
  const { leaveId, role } = req.query;
  const studentId = typeof req.query.studentId === 'undefined' ? '' : req.query.studentId;
  const from = typeof req.query.from === 'undefined' ? '' : req.query.from;
  const to = typeof req.query.to === 'undefined' ? '' : req.query.to;
  hallAdmin.rejectLeave(leaveId, role);
  res.redirect(`/admin/dashboard?studentId=${studentId}&from=${from}&to=${to}`);
}

const getForgotPassword = (req, res) => {
  res.render('users/forgot-password-admin', {
    error: req.flash('error'),
    message: req.flash('message')
  })
}

const postForgotPassword = async (req, res) => {
  const id = req.body.id;
  
  const userResult = await hallAdmin.getAdminById(id);
  if (!userResult) {
    req.flash('error', 'No user found');
    return res.redirect('/admin/forgot-password');
  }

  const user = { id: userResult.id, role: userResult.role };

  const token = await require('../../config/jwt')(user);
  const message = {
    from: 'mushfiqurtalha@iut-dhaka.edu',
    to: 'mushfiqurtalha@iut-dhaka.edu',
    subject: 'Reset your password for IUT LLIS',
    text: `Hi,\n Please click the below link for resetting your password. This link will expire after 5 minutes.\n`
        + `http://localhost:3000/admin/token?token=${token}`,
    html: `<p>Hi</p><br><p>Please click the <a href="http://localhost:3000/admin/token?token=${token}">link</a> to reset your password. This link will expire after 5 minutes.</p>`
  };
  await require('../../config/mail')(message);

  req.flash('message', 'A Mail has been sent to your email address');
  res.redirect('/admin/forgot-password');
}

module.exports = {
  getAdminIndex, 
  postAdminIndex,
  getAdminDashboard,
  getLeaveReport,
  getLateReport,
  getLogout,
  getDetails,
  getHistoryDetails,
  getApprove,
  getReject,
  getForgotPassword,
  postForgotPassword
};
