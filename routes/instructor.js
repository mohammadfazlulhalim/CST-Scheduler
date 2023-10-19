const express = require('express');
const router = express.Router();
const Instructor = require('../private/javascript/Instructor');

router.get('/', async function(req, res, next) {
  const instructorList = await Instructor.findAll();
  res.render('instructor', {
    title: 'View Instructor',
    instructorList: instructorList,
  });
});

module.exports = router;
