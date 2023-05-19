const express=require('express');
const router=express.Router();
const indexModules = require('../controllers/index.controllers');
const { ensureNotAuth } = require('../middlewares/auth.middlewares')

router.get('/', ensureNotAuth, indexModules.getIndex);
router.post('/', ensureNotAuth, indexModules.postIndex);

module.exports=router;
