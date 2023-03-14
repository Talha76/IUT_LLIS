const getDashboard = (req, res) => {
  res.send('<h1>Student Dashboard</h1>');
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
