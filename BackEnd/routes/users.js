var express = require('express');
var router = express.Router();
const useroperations=require('../operations/useroperations')
router.post('/login',useroperations.login)
router.post('/addusers',useroperations.addusers)
router.get('/session',useroperations.checkSession)





module.exports = router;
