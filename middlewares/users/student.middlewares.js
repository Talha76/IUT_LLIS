const passport = require("passport");
const jwtStrategy = require('passport-jwt').Strategy;
const studentModel = require('../../models/student.model');
require('dotenv').config();

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
  passport.use('jwt-student', new jwtStrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: (req) => req.query.token
    }, (payload, done) => {
      if (!payload) {
        return done(new Error('Invalid token'));
      }

      const user = studentModel.getStudentById(payload.id);
      if (!user) {
        return done(null, false, { message: 'User not found!' });
      } if (user.gender.toLowerCase() === 'male' ||
            user.resetPasswordToken !== req.query.token) {
        return done(null, false, { message: 'Access Denied!' });
      }

      return done(null, user);
    }
  ));

  await passport.authenticate('jwt-student', {
    session: false,
    failureFlash: true,
    failureRedirect: '/student/forgot-password'
  })(req, res, next);
}

module.exports = {
  authenticateLeaveData,
  authenticateLateData,
  indexPassportAuth,
  isStudent,
  validateToken
}
