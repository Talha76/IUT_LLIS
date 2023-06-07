const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const hallAdminModel = require('../../models/hallAdmin.model');
require('dotenv').config();

const indexPassportAuth = (req, res, next) => {
  passport.authenticate('localAdmin', {
    failureRedirect:'/admin',
    failureFlash: true
  })(req, res, next);
}

const isAdmin = (req, res, next) => {
  if (req.user && (req.user.role === 'provost' || req.user.role === 'supervisor')) {
    return next();
  }

  req.flash('error', 'Access Denied!');
  res.status(403).send('Unauthorized');
}

const validateToken = async (req, res, next) => {
  passport.use('jwt-admin', new jwtStrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: (req) => req.query.token
    }, (payload, done) => {
      if (!payload) {
        return done(new Error('Invalid token'));
      }

      hallAdminModel.getAdminById(payload.id)
        .then((user) => {
          console.log(user.resetPasswordToken);
          console.log(req.query.token);
          if (!user) {
            return done(null, false, { message: 'User not found!' });
          } else if (user.resetPasswordToken !== req.query.token) {
            return done(null, false, { message: 'Access Denied!' });
          } else {
            return done(null, user);
          }
        })
        .catch((err) => done(err));
    }
  ));

  await passport.authenticate('jwt-admin', {
    session: false,
    failureFlash: true,
    failureRedirect: '/admin'
  })(req, res, next);
}

module.exports = {
  indexPassportAuth,
  isAdmin,
  validateToken
}
