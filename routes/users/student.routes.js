const express = require('express');
const router = express.Router();
const { ensureAuth, ensureNotAuth } = require('../../middlewares/auth.middlewares');
const middleware = require('../../middlewares/users/student.middlewares')
const controllers = require('../../controllers/users/student.controllers');

router.get('/', ensureNotAuth, controllers.getIndex);
router.post('/', ensureNotAuth, middleware.indexPassportAuth, controllers.postIndex);

router.get('/dashboard', ensureAuth, middleware.isStudent, controllers.getDashboard);

router.post('/leave-save', ensureAuth, middleware.isStudent, middleware.authenticateLeaveData, controllers.postLeaveSave); 
router.post('/late-save', ensureAuth, middleware.isStudent, middleware.authenticateLateData, controllers.postLateSave);

router.get('/history', ensureAuth, middleware.isStudent, controllers.getHistory);

router.get('/history/details', ensureAuth, middleware.isStudent, controllers.getHistoryDetails);

router.get('/forgot-password', ensureNotAuth, controllers.getForgotPassword);
router.post('/forgot-password', controllers.postForgotPassword);

router.get('/token', ensureNotAuth, middleware.validateToken, controllers.getToken);
router.post('/token', ensureNotAuth, controllers.postToken);

router.get('/logout', ensureAuth, controllers.getLogout);

module.exports = router;
