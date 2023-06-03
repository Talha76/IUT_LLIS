const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const { pool } = require('../../config/database.config');
const studentModel = require('../../models/student.model');
require('dotenv').config();

const getIndex = (req, res) => {
  res.render('login.ejs', { error: req.flash('error') });
}

const postIndex = (req, res) => {
  res.redirect('/student/dashboard');
};


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
  res.render('forgot-password');
};

const postForgotPassword = async (req, res) => {
  const { id } = req.body;
  
}

const getToken = async (req, res) => {
  passport.use('jwt', new jwtStrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: (req) => req.params.token
    }, (payload, done) => {
      if (payload) {
        studentModel.getStudentById(payload.id)
          .then((user) => {
            if (!user) {
              return done(null, false, { message: 'User not found!' });
            } else if (user.gender.toLowerCase() === 'male' ||
                       user.resetPasswordToken !== req.params.token) {
              return done(null, false, { message: 'Access Denied!' });
            } else {
              return done(null, user);
            }
          })
          .catch((err) => done(err));
      } else {
        done(new Error('Invalid token'));
      }
    }
  ));

  await passport.authenticate('jwt', (err, user, info) => {
    if (err)
      throw err;
  
    if (!user) {
      req.flash('error', info.message);
      res.redirect('/student');
    } else {
      res.render('forgotPassword');
    }
  })(req, res, next);
};

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
