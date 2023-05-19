const localStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const adminModel = require('../models/admin.model');

module.exports = async (passport) => {
  await passport.use('local2',
    new localStrategy({usernameField: 'admin-id'}, (id, password, done) => {
      adminModel.getAdminById(id)
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
    })
  );

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => {
    adminModel.getAdminById(id)
      .then((user) => {
        return done(null, user);
      })
      .catch((err) => {
        return done(err, null);
      });
  })
}
