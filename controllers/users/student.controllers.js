const studentModel = require('../../models/student.model');

const getIndex = (req, res) => {
  res.render('login.ejs', { error: req.flash('error') });
}

const postIndex = (req, res) => {
  res.redirect('/student/dashboard');
};


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

const getHistory = async (req, res) => {
  res.render('users/studentHistory.ejs', {
    student: req.user,
    success: req.flash('success'),
  });
}

module.exports = {
  getIndex,
  postIndex,
  getDashboard,
  getLogout,
  postLeaveSave,
  postLateSave,
  getHistory
};
