const studentModel = require('../../models/student.model');

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

module.exports = {
  getDashboard,
  getLogout,
  postLeaveSave,
  postLateSave,
};
