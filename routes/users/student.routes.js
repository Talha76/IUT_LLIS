const express = require('express');
const router = express.Router();
const ensureAuth = require('../../middlewares/auth.middleware');
const studentModules = require('../../controllers/users/student.controllers');

router.get('/dashboard', ensureAuth, studentModules.getDashboard);
router.get('/logout', studentModules.getLogout);

module.exports = router;
