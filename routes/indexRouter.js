const express = require('express');
const router = express.Router();
const title = require('../constants').pageTitles.index;

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', {title});
});
router.get('/admin', function(req, res, next) {
  res.render('admin', {title});
});


module.exports = router;
