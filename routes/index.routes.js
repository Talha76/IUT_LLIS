const express=require('express');
const router=express.Router();
const indexModules = require('../controllers/index.controllers');

router.get('/', indexModules.getIndex);
router.post('/', indexModules.postIndex);

module.exports=router;
