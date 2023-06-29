const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();

// Using the public folder as specified static resources
app.use(express.static('public'));

// Body Parser
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

// view engine setup
app.set('view engine', 'ejs');

// Session and Flash
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

require('./config/passportStudent')(passport);
require('./config/passportAdmin')(passport);
require('./config/passport')(passport);

app.use(flash());

// Importing and using routes
const indexRoutes = require('./routes/index.routes');
app.use(indexRoutes);

const studentRoutes = require('./routes/users/student.routes');
app.use('/student', studentRoutes);

const adminRoutes = require('./routes/users/admin.routes');
app.use('/admin', adminRoutes);
module.exports = app;
