const express = require('express');
const router = express.Router();

const CourseOffering = require('../private/javascript/CourseOffering');

// GET handler for http://localhost:3000/course-offering
router.get('/', async function(req, res, next) {
  let courseOfferings;
  try {
    courseOfferings = await CourseOffering.findAll({order: ['courseCode']});
  } catch (err) {
    courseOfferings = undefined;
  }
  res.render('courseOffering', {
    title: 'Course Offerings',
    offerings: courseOfferings,
  });
});

module.exports = router;
