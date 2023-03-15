const localStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const studentModel = require('../models/users/student.model');
const { Passport } = require('passport');

module.exports = async (passport)=>{
  await passport.use(
    new localStrategy({usernameField: 'id'}, (id, password, done) => {
      studentModel.getStudentById(id)
        .then((student) => {
          if (!student) {
            return done(null,false,{message: 'Student ID not found!'});
          } else {
            // bcrypt.compare(password, student.password, (err, isMatch) => {
            //   if (err)
            //     throw err;
            //   if (isMatch) {
            //     return done(null,user);
            //   } else {
            //     return done(null,false,{message:'Password incorrect'});
            //   }
            // });
            const isMatch = (password === student.password);
            if (student.gender === 'Male') {
              return done(null, false, { message: 'Access denied!' });
            } if (isMatch) {
              return done(null, student);
            } return done(null, false, { message: 'Incorrect Password!' });
          }
        })
        .catch((err) => done(err));
    })
  );
  passport.serializeUser((user, done)=>{
    done(null, user.id);
  })
  passport.deserializeUser((id,done)=>{
    studentModel.getStudentById(id)
      .then((student) => done(null, student))
      .catch((err) => done(err, null));
  })
}
