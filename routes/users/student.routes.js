const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../../middlewares/auth.middlewares');
const studentMiddlewares = require('../../middlewares/users/student.middlewares')
const studentModules = require('../../controllers/users/student.controllers');

router.get('/dashboard', ensureAuth, studentModules.getDashboard);
router.post('/leave-save', ensureAuth, studentMiddlewares.authenticateLeaveData, studentModules.postLeaveSave); 
router.post('/late-save', ensureAuth, studentMiddlewares.authenticateLateData, studentModules.postLateSave);
router.get('/logout', ensureAuth, studentModules.getLogout);
router.get('/history', ensureAuth, studentModules.getHistory);
module.exports = router;
