const passport = require('passport');

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

module.exports = {
  indexPassportAuth,
  isAdmin
}
