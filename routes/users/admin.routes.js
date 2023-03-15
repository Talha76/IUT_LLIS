const express = require('express');
const router = express.Router();
const adminModules = require('../../controllers/users/admin.controllers');

router.get ('/', adminModules.getAdminIndex);
router.post('/', adminModules.postAdminIndex);
router.get('/login', adminModules.getAdminLogin);
router.post('/login', adminModules.postAdminLogin);
router.get ('/searchUnapproved',adminModules.getSearchUnapproved);
router.post('/searchUnapproved',adminModules.postSearchUnapproved);
router.get('/searchStudent', adminModules.getSearchStudent);
router.post('/searchStudent', adminModules.postSearchStudent);
module.exports = router;
