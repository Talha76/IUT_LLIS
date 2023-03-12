const express = require('express');
const router = express.Router();
const { getDashboard } = require('../../controllers/users/student.controllers');

router.get('/dashboard', getDashboard);

module.exports = router;
