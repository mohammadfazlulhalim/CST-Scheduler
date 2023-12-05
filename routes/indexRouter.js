const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/admin', function(req, res, next) {
  res.render('admin', {title: 'Administration'});
});


module.exports = router;
