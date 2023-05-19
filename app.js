const express = require('express');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const passport = require('passport');
const studentPassport = require('./config/passportStudent');
const adminPassport = require('./config/passportAdmin');
// const studentPassport = require('passport');
// const adminPassport = require('passport');

// Using the public folder as specified static resources
app.use(express.static('public'));

// Body Parser
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

// view engine setup
app.set('view engine', 'ejs');

// Session and Flash
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitalized : false
  })
);

app.use(passport.initialize());
app.use(passport.session());

studentPassport(passport);
adminPassport(passport);

// Passport Strategy
// require('./config/passportStudent')(studentPassport);
// app.use(studentPassport.initialize());
// app.use(studentPassport.session());

// require('./config/passportAdmin')(adminPassport);
// app.use(adminPassport.initialize());
// app.use(adminPassport.session());

app.use(flash());

// Importing and using routes
const indexRoutes = require('./routes/index.routes');
app.use(indexRoutes);

const studentRoutes = require('./routes/users/student.routes');
app.use('/student', studentRoutes);

const adminRoutes = require('./routes/users/admin.routes');
app.use('/admin', adminRoutes);

module.exports = app;
