const jwtStrategy = require('passport-jwt').Strategy;
const passport = require('passport');
const studentModel = require('../models/student.model');
require('dotenv').config();

const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error', 'Access Denied!');
  res.redirect('/');
};

const ensureNotAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    req.flash('error', 'Access Denied!');
    return res.redirect('/student/dashboard');
  }
  next();
};

const ensureAdminAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error', 'Access Denied!');
  res.redirect('/admin');
};

const ensureAdminNotAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    req.flash('error', 'Access Denied!');
    return res.redirect('/admin/dashboard');
  }
  next();
}

const validateToken = async (req, res, next) => {
  passport.use('jwt-student', new jwtStrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
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
    session: false,
    failureFlash: true,
    failureRedirect: '/student'
  })(req, res, next);
}

module.exports = {
  ensureAuth,
  ensureNotAuth,
  ensureAdminAuth,
  ensureAdminNotAuth,
  validateToken
};