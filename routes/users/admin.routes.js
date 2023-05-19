const express = require('express');
const router = express.Router();
const adminModules = require('../../controllers/users/admin.controllers');
const { ensureAdminAuth, ensureAdminNotAuth } = require('../../middlewares/auth.middlewares');

router.get ('/', ensureAdminNotAuth, adminModules.getAdminIndex);
router.post('/', ensureAdminNotAuth, adminModules.postAdminIndex);
router.get('/dashboard', ensureAdminAuth, adminModules.getAdminDashboard);
router.get('/searchStudent', ensureAdminAuth,  adminModules.getSearchStudent);
router.post('/searchStudent', ensureAdminAuth,  adminModules.postSearchStudent);
router.get('/logout', ensureAdminAuth, adminModules.getLogout);

module.exports = router;
