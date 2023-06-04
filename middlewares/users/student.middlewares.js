const passport = require("passport");

const authenticateLeaveData = (req, res, next) => {
  const { studentContact, placeOfVisit, purposeOfVisit, contactPersonContact, departureDate, arrivalDate } = req.body;
  req.body.purposeOfVisit = (purposeOfVisit === 'others' ? req.body.othersDescription : purposeOfVisit);
  next();
}

const authenticateLateData = (req, res, next) => {
  const { studentContact, placeOfVisit, lateReason, accompanyingPersonContact, departureTime, arrivalTime } = req.body;
  req.body.lateReason = (lateReason === 'others' ? req.body.othersDescription : lateReason);
  next();
}

const indexPassportAuth = (req, res, next) => {
  passport.authenticate('localStudent', {
    failureRedirect:'/',
    failureFlash: true
  })(req, res, next);
}

const isStudent = (req, res, next) => {
  if (req.user && req.user.role === 'student') {
    return next();
  }

  req.flash('error', 'Access Denied!');
  res.status(403).send('Unauthorized');
}

const validateToken = async (req, res, next) => {
  const jwtStrategy = require('passport-jwt').Strategy;
  require('dotenv').config();
  const studentModel = require('../../models/student.model');

  passport.use('jwt-student', new jwtStrategy(
    {
      secretOrKey: process.env.STUDENT_JWT_SECRET,
      jwtFromRequest: (req) => req.query.token
    }, (payload, done) => {
      if (payload) {
        studentModel.getStudentById(payload.id)
          .then((user) => {
            if (!user) {
              return done(null, false, { message: 'User not found!' });
            } else if (user.gender.toLowerCase() === 'male' ||
                       user.resetPasswordToken !== req.query.token) {
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

  await passport.authenticate('jwt-student', {
    failureFlash: true,
    failureRedirect: '/student'
  })(req, res, next);
  // await passport.authenticate('jwt-student', (err, user, info) => {
  //   if (err)
  //     throw err;
      
  //   if (!user) {
  //     req.flash('error', info.message);
  //     res.redirect('/student');
  //   } else {
  //     res.render('new-password');
  //   }
  // })(req, res, next);
}

module.exports = {
  authenticateLeaveData,
  authenticateLateData,
  indexPassportAuth,
  isStudent,
  validateToken
}
