const localStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const hallAdminModel = require('../models/hallAdmin.model');

module.exports = async (passport) => {
  await passport.use('localAdmin', new localStrategy({ usernameField: 'admin-id' }, (id, password, done) => {
    hallAdminModel.getAdminById(id)
    .then((user) => {
        if (!user) {
          return done(null, false, { message: 'Admin ID not found!' });
        } else {
          bcrypt.compare(password, user.password)
            .then((isMatch) => {
              if (isMatch) {
                return done(null, user);
              } else {
                return done(null, false, { message:'Password incorrect' });
              }
            })
            .catch((err) => done(err));
        }
      })
      .catch((err) => done(err));
  }));
}
