const studentModel = require('../models/student.model');
const hallAdminModel = require('../models/hallAdmin.model');

module.exports = async (passport) => {
  passport.serializeUser((user, done) => done(null, user));

  passport.deserializeUser((user, done) => {
    if (user.role === 'student') {
      studentModel.getStudentById(user.id)
        .then((user) => {
          return done(null, user);
        })
        .catch((err) => {
          return done(err, null);
        });
    } else if (user.role === 'provost' || user.role === 'supervisor') {
      hallAdminModel.getAdminById(user.id)
        .then((user) => {
          return done(null, user);
        })
        .catch((err) => {
          return done(err, null);
        });
    } else {
      return done(err, null);
    }
  });
}
