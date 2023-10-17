const express = require('express');
const router = express.Router();

const CourseOffering = require('/private/javascript/CourseOffering');

// GET handler hor http://localhost:3000/
router.get('/', async function(req, res, next) {
  const courseOfferings = await CourseOffering.findAll();
  res.render('courseOffering', {
    title: 'Course Offerings',
    offerings: courseOfferings,
  });
});
