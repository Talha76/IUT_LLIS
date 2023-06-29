const localStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const studentModel = require('../models/student.model');

module.exports = (passport) => {
  passport.use('localStudent', new localStrategy({ usernameField: 'id' }, async (id, password, done) => {
    const user = await studentModel.getStudentById(id);
    if (!user) {
      return done(null, false, { message: 'Student ID not found!' });
    }

    if (user.gender.toLowerCase() === 'male') {
      return done(null, false, { message: 'Access denied!' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return done(null, user);
    } else {
      return done(null, false, { message:'Password incorrect' });
    }
  }));
}
