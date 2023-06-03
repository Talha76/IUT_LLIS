const express = require('express');
const router = express.Router();
const { ensureAuth, ensureNotAuth } = require('../../middlewares/auth.middlewares');
const middleware = require('../../middlewares/users/student.middlewares')
const studentModules = require('../../controllers/users/student.controllers');

router.get('/', ensureNotAuth, studentModules.getIndex);
router.post('/', ensureNotAuth, middleware.indexPassportAuth, studentModules.postIndex);
router.get('/dashboard', ensureAuth, middleware.isStudent, studentModules.getDashboard);
router.post('/leave-save', ensureAuth, middleware.isStudent, middleware.authenticateLeaveData, studentModules.postLeaveSave); 
router.post('/late-save', ensureAuth, middleware.isStudent, middleware.authenticateLateData, studentModules.postLateSave);
router.get('/history', ensureAuth, middleware.isStudent, studentModules.getHistory);
router.get('/history/details', ensureAuth, middleware.isStudent, studentModules.getHistoryDetails);
router.get('/forgot-password/', ensureNotAuth, studentModules.getForgotPassword);
router.get('/logout', ensureAuth, studentModules.getLogout);

module.exports = router;
