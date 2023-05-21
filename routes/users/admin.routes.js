const express = require('express');
const router = express.Router();
const adminModules = require('../../controllers/users/admin.controllers');
const middleware = require('../../middlewares/users/admin.middlewares');
const { ensureAdminAuth, ensureAdminNotAuth } = require('../../middlewares/auth.middlewares');

router.get ('/', ensureAdminNotAuth, adminModules.getAdminIndex);
router.post('/', ensureAdminNotAuth, middleware.indexPassportAuth, adminModules.postAdminIndex);
router.get('/dashboard', ensureAdminAuth, middleware.isAdmin, adminModules.getAdminDashboard);
router.get('/searchStudent', ensureAdminAuth, middleware.isAdmin, adminModules.getSearchStudent);
router.get('/logout', ensureAdminAuth, adminModules.getLogout);
router.get('/details', ensureAdminAuth, middleware.isAdmin, adminModules.getDetails);

module.exports = router;
