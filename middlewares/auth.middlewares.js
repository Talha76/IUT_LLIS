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

module.exports = {
  ensureAuth,
  ensureNotAuth,
  ensureAdminAuth,
  ensureAdminNotAuth
};