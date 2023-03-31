const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../../middlewares/auth.middlewares');
const studentMiddlewares = require('../../middlewares/users/student.middlewares')
const studentModules = require('../../controllers/users/student.controllers');

router.get('/dashboard', ensureAuthenticated, studentModules.getDashboard);
router.post('/leave-save', ensureAuthenticated, studentMiddlewares.authenticateLeaveData, studentModules.postLeaveSave); 
router.post('/late-save', ensureAuthenticated, studentMiddlewares.authenticateLateData, studentModules.postLateSave);
router.get('/logout', studentModules.getLogout);

module.exports = router;
