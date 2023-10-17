// just the basic express code: nothing custom yet
// router needs router link in app.js


const express = require('express');
const router = express.Router();

/* course page. */
router.get('/', getHandler);
function getHandler (req, res, next) {

}
module.exports = router;