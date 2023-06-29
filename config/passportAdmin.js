const localStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const hallAdminModel = require('../models/hallAdmin.model');

module.exports = (passport) => {
  passport.use('localAdmin', new localStrategy({ usernameField: 'admin-id' }, async (id, password, done) => {
    const user = await hallAdminModel.getAdminById(id);
    if (!user) {
      return done(null, false, { message: 'Admin ID not found!' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return done(null, user);
    } else {
      return done(null, false, { message:'Password incorrect' });
    }
  }));
}
