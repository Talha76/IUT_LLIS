const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

const studentRoutes = require('./routes/users/student.routes');
app.use('/student', studentRoutes);

module.exports = app;
