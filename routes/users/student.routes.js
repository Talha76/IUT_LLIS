const express = require('express');
const router = express.Router();
const ensureAuth = require('../../middlewares/auth.middlewares');
const studentModules = require('../../controllers/users/student.controllers');
const studentMiddlewares = require('../../middlewares/users/student.middlewares')

router.get('/dashboard', ensureAuth, studentModules.getDashboard);
router.post('/leave-save', ensureAuth, studentMiddlewares.authenticateLeaveData, studentModules.postLeaveSave); 
router.post('/late-save', ensureAuth, studentMiddlewares.authenticateLateData, studentModules.postLateSave);
router.get('/logout', studentModules.getLogout);

module.exports = router;
