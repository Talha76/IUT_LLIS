const express = require('express');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');

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
    secret:'secret',
    resave: true,
    saveUninitalized : true,
  })
);
app.use(flash());

// Importing and using routes
const studentRoutes = require('./routes/users/student.routes');
app.use('/student', studentRoutes);

const adminRoutes = require('./routes/users/admin.routes');
app.use('/admin', adminRoutes);

module.exports = app;
