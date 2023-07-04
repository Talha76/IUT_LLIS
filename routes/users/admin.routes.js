const express = require('express');
const router = express.Router();
const controller = require('../../controllers/users/admin.controllers');
const middleware = require('../../middlewares/users/admin.middlewares');
const { ensureAdminAuth, ensureAdminNotAuth } = require('../../middlewares/auth.middlewares');
const { getToken, postToken, getLogout } = require('../../controllers/auth.controllers');

router.get ('/', ensureAdminNotAuth, controller.getAdminIndex);
router.post('/', ensureAdminNotAuth, middleware.indexPassportAuth, controller.postAdminIndex);

router.get('/forgot-password', ensureAdminNotAuth, controller.getForgotPassword);
router.post('/forgot-password', ensureAdminNotAuth, controller.postForgotPassword);

router.get('/token', ensureAdminNotAuth, middleware.validateToken, getToken);
router.post('/token', ensureAdminNotAuth, postToken);

router.get('/logout', ensureAdminAuth, getLogout);

router.get('/dashboard', ensureAdminAuth, middleware.isAdmin, controller.getAdminDashboard);

router.get('/generate-leave-report', ensureAdminAuth, middleware.isAdmin, controller.getLeaveReport);

router.get('/details', ensureAdminAuth, middleware.isAdmin, controller.getDetails);

router.get('/history/details', ensureAdminAuth, middleware.isAdmin, controller.getHistoryDetails);

router.get('/generate-late-report', ensureAdminAuth, middleware.isAdmin, controller.getLateReport);

router.get('/approve', ensureAdminAuth, middleware.isAdmin, controller.getApprove);

router.get('/reject', ensureAdminAuth, middleware.isAdmin, controller.getReject);

module.exports = router;
