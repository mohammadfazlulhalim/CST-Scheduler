const express = require('express');
const router = express.Router();

const CourseOfferingRouter = require('../private/javascript/CourseOffering');

// GET handler for http://localhost:3000/course-offering
router.get('/', async function(req, res, next) {
  let courseOfferings;

  // retrieve all course offerings from the database
  try {
    courseOfferings = await CourseOfferingRouter.findAll({order: ['courseCode']});
  } catch (err) {
    // if unable to retrieve from database; e.g., no records exist
    courseOfferings = undefined;
  }

  // render the courseOffering template file with appropriate title and the retrieved list of course offerings
  res.render('courseOffering', {
    title: 'Course Offerings',
    offerings: courseOfferings,
  });
});

function createCourseOffering(createCO){

}

function updateCourseOffering(updateCO){

}

function deleteCourseOffering(deleteCO){

}

module.exports = {router, createCourseOffering, updateCourseOffering, deleteCourseOffering};
