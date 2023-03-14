const getDashboard = (req, res) => {
  res.render('./users/studentDashboard.ejs', { student: req.user });
}

const getLogout = (req, res) => {
  req.logout((err) => console.error(err));
  req.flash('success_msg', 'You are successfully logged out');
  res.redirect('/');
}

module.exports = {
  getDashboard,
  getLogout,
};
