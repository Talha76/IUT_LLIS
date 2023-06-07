const express = require('express');
const router = express.Router();
const adminModules = require('../../controllers/users/admin.controllers');
const middleware = require('../../middlewares/users/admin.middlewares');
const { ensureAdminAuth, ensureAdminNotAuth } = require('../../middlewares/auth.middlewares');

router.get ('/', ensureAdminNotAuth, adminModules.getAdminIndex);
router.post('/', ensureAdminNotAuth, middleware.indexPassportAuth, adminModules.postAdminIndex);

router.get('/forgot-password', ensureAdminNotAuth, (req, res) => {
  res.render('users/forgot-password-admin', {
    error: req.flash('error'),
    message: req.flash('message')
  })
})

router.get('/logout', ensureAdminAuth, adminModules.getLogout);

router.get('/dashboard', ensureAdminAuth, middleware.isAdmin, adminModules.getAdminDashboard);

router.get('/generate-leave-report', ensureAdminAuth, middleware.isAdmin, adminModules.getLeaveReport);

router.get('/details', ensureAdminAuth, middleware.isAdmin, adminModules.getDetails);

router.get('/history/details', ensureAdminAuth, middleware.isAdmin, adminModules.getHistoryDetails);

router.get('/generate-late-report', ensureAdminAuth, middleware.isAdmin, adminModules.getLateReport);

router.get('/approve', ensureAdminAuth, middleware.isAdmin, adminModules.getApprove);

router.get('/reject', ensureAdminAuth, middleware.isAdmin, adminModules.getReject);

module.exports = router;
