// just the basic express code: nothing custom yet
// router needs router link in app.js


const express = require('express');
const router = express.Router();

/* course page. */
router.get('/', function(req, res, next) {
    res.render('index', {title: 'Express'});
});

module.exports = router;