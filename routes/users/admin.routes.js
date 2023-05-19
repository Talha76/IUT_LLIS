const express = require('express');
const router = express.Router();
const adminModules = require('../../controllers/users/admin.controllers');
const { ensureAdminAuth, ensureAdminNotAuth } = require('../../middlewares/auth.middlewares');

router.get ('/', ensureAdminNotAuth, adminModules.getAdminIndex);
router.post('/', ensureAdminNotAuth, adminModules.postAdminIndex);
router.get('/dashboard', ensureAdminAuth, adminModules.getAdminDashboard);
router.post('/dashboard', ensureAdminAuth, adminModules.postAdminDashboard);
router.get ('/searchUnapproved', ensureAdminAuth, adminModules.getSearchUnapproved);
router.post('/searchUnapproved', ensureAdminAuth, adminModules.postSearchUnapproved);
router.get('/searchStudent', ensureAdminAuth,  adminModules.getSearchStudent);
router.post('/searchStudent', ensureAdminAuth,  adminModules.postSearchStudent);
module.exports = router;
