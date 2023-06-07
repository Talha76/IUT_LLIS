const bcrypt = require('bcryptjs');
const { poolExecute } = require('../config/database.config');

const getToken = async (req, res) => {
  req.session.user = req.user;
  res.render('new-password', { error: req.flash('error') });
}

const postToken = (req, res) => {
  const user = req.session.user;
  const { newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    req.flash('error', 'Passwords do not match');
    return res.redirect(`/student/token?token=${user.resetPasswordToken}`);
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(newPassword, salt);

  const query = `UPDATE "studentAuth" SET "password" = '${hash}' WHERE "id" = ${user.id}`;
  poolExecute(query);
  req.flash('success', 'Password changed successfully');
  res.redirect('/student');
}

module.exports = {
  getToken,
  postToken
}
