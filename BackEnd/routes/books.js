var express = require('express');
var router = express.Router();
var authenticate=require('../authenticate.js')

const bookoperations=require('../operations/bookoperations')
router.use(authenticate)
router.post('/addbooks',bookoperations.addbooks)
router.get('/getbooks/:authorid',bookoperations.getbooks)
router.get('/getallbooks',bookoperations.getallbooks)
//router.get('/searchbooks/:id',bookoperations.searchbooks)
router.delete('/deletebooks/:id',bookoperations.deletebooks)
//router.put('/borrowbooks/:id',bookoperations.borrowbooks)
router.put('/updatebooks/:id',bookoperations.updatebooks)
router.get('/searchanybooks',bookoperations.searchanybooks)
module.exports = router;