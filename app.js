const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

module.exports = app;
