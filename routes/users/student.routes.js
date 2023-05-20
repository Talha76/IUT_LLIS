const express = require('express');
const router = express.Router();
const { ensureAuth, ensureNotAuth } = require('../../middlewares/auth.middlewares');
const middleware = require('../../middlewares/users/student.middlewares')
const studentModules = require('../../controllers/users/student.controllers');

router.get('/', ensureNotAuth, studentModules.getIndex);
router.post('/', ensureNotAuth, middleware.indexPassportAuth, studentModules.postIndex);
router.get('/dashboard', ensureAuth, studentModules.getDashboard);
router.post('/leave-save', ensureAuth, middleware.authenticateLeaveData, studentModules.postLeaveSave); 
router.post('/late-save', ensureAuth, middleware.authenticateLateData, studentModules.postLateSave);
router.get('/logout', ensureAuth, studentModules.getLogout);
router.get('/history', ensureAuth, studentModules.getHistory);

module.exports = router;
