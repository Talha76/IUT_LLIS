const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error', 'Access Denied!');
  res.redirect('/');
};

const ensureNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    req.flash('error', 'Access Denied!');
    return res.redirect('/student/dashboard');
  }
  next();
};

module.exports = {
  ensureAuthenticated,
  ensureNotAuthenticated,
};