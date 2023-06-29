const studentModel = require('../models/student.model');
const hallAdminModel = require('../models/hallAdmin.model');

module.exports = (passport) => {
  passport.serializeUser((user, done) => done(null, user));

  passport.deserializeUser(async (user, done) => {
    if (user.role === 'student') {
      const student = await studentModel.getStudentById(user.id);
      return done(null, student);
    } else if (user.role === 'provost' || user.role === 'supervisor') {
      const hallAdmin = await hallAdminModel.getAdminById(user.id);
      return done(null, hallAdmin);
    }
  });
}
