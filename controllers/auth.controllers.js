const bcrypt = require('bcryptjs');
const { poolExecute } = require('../config/database.config');

const getToken = async (req, res) => {
  req.session.user = req.user;
  res.render('new-password', { error: req.flash('error') });
}

const postToken = (req, res) => {
  const user = req.session.user;
  const { password, confirmPassword } = req.body;

  const role = (user.role === 'student' ? 'student' : 'admin');

  if (password !== confirmPassword) {
    req.flash('error', 'Passwords do not match');
    return res.redirect(`/${role}/token?token=${user.resetPasswordToken}`);
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const query = `UPDATE "${role}Auth" SET "password" = '${hash}' WHERE "id" = ${user.id}`;
  poolExecute(query);
  req.flash('success', 'Password changed successfully');
  res.redirect(`/${role}`);
}

module.exports = {
  getToken,
  postToken
}
