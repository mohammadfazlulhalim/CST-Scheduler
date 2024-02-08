const CourseOffering = require('../private/javascript/CourseOffering');
const Instructor = require('../private/javascript/Instructor');
const course = require('../private/javascript/Course');
const constants = require('../constants');
const courseOffering = require('../private/javascript/CourseOffering');
const testConst = require('../constants').testConst;
const validCourses = require('../fixtures/Course.fix').validCourses;

/**
 * This function clears the courseOffering table if it exists and fills it with 15 course offerings.
 */
async function fillCourseOfferingTable() {
  await CourseOffering.create(testConst.courseOffering1);
  const COA = await CourseOffering.bulkCreate(testConst.validCourseOfferingsB);
  const COB = await CourseOffering.bulkCreate(testConst.validCourseOfferingsA);

  for (let i=0; i<COA.length; i++) {
    COA[i].setCourse(await course.findByPk((i%validCourses.length)+1));
    COB[i].setCourse(await course.findByPk((i%validCourses.length)+1));
  }
}


module.exports = fillCourseOfferingTable;
