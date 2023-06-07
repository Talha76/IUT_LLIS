const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth.middlewares');
const middleware = require('../../middlewares/users/student.middlewares')
const controller = require('../../controllers/users/student.controllers');
const { getToken, postToken } = require('../../controllers/auth.controllers')

router.get('/', auth.ensureNotAuth, controller.getIndex);
router.post('/', auth.ensureNotAuth, middleware.indexPassportAuth, controller.postIndex);

router.get('/token', auth.ensureNotAuth, auth.validateToken, getToken);
router.post('/token', auth.ensureNotAuth, postToken);

router.get('/logout', auth.ensureAuth, controller.getLogout);

router.get('/dashboard', auth.ensureAuth, middleware.isStudent, controller.getDashboard);

router.post('/leave-save', auth.ensureAuth, middleware.isStudent, middleware.authenticateLeaveData, controller.postLeaveSave); 
router.post('/late-save', auth.ensureAuth, middleware.isStudent, middleware.authenticateLateData, controller.postLateSave);

router.get('/history', auth.ensureAuth, middleware.isStudent, controller.getHistory);

router.get('/history/details', auth.ensureAuth, middleware.isStudent, controller.getHistoryDetails);

router.get('/forgot-password', auth.ensureNotAuth, controller.getForgotPassword);
router.post('/forgot-password', controller.postForgotPassword);


module.exports = router;
