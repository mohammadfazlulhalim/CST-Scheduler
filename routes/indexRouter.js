const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const image = {src: "../private/Fancy.png", name:"backgroundImage"}
  res.render('index', {image});
});
router.get('/admin', function(req, res, next) {
  res.render('admin', {title: 'Administration'});
});


module.exports = router;
