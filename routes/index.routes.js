const express=require('express');
const router=express.Router();
const indexModules = require('../controllers/index.controllers');
const { ensureNotAuthenticated } = require('../middlewares/auth.middlewares')

router.get('/', ensureNotAuthenticated, indexModules.getIndex);
router.post('/', ensureNotAuthenticated, indexModules.postIndex);

module.exports=router;
