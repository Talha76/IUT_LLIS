const localStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const studentModel = require('../models/student.model');

module.exports = async (passport) => {
  await passport.use('localStudent', new localStrategy({ usernameField: 'id' }, (id, password, done) => {
    studentModel.getStudentById(id)
      .then((user) => {
        if (!user) {
          return done(null, false, { message: 'Student ID not found!' });
        } else {
          if (user.gender.toLowerCase() === 'male') {
            return done(null, false, { message: 'Access denied!' });
          }
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
