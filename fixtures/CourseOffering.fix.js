const CourseOffering = require('../private/javascript/CourseOffering');
const Instructor = require('../private/javascript/Instructor');
const course = require('../private/javascript/Course');
const constants = require('../constants');
const courseOffering = require('../private/javascript/CourseOffering');
const testConst = require('../constants').testConst;

/**
 * This function clears the courseOffering table if it exists and fills it with 15 course offerings.
 */
async function fillCourseOfferingTable() {
  // await CourseOffering.create(testConst.courseOffering1);
  const COA = await CourseOffering.bulkCreate(testConst.validCourseOfferingsA);
  const COB = await CourseOffering.bulkCreate(testConst.validCourseOfferingsB);

  for (let i=0; i<COA.length; i++) {
    COA[i].setCourse(await course.findByPk((i%constants.testConst.validCourses.length)+1));
    COB[i].setCourse(await course.findByPk((i%constants.testConst.validCourses.length)+1));
  }

  let COHA = testConst.courseOffering1;
  let COSA = testConst.courseOffering2;
  COSA.group = 'A';
  COHA = await CourseOffering.create(COHA);
  COSA = await CourseOffering.create(COSA);
  COHA.setTerm(3);
  COSA.setTerm(3);
  COHA.setProgram(1);
  COSA.setProgram(1);
  COHA.setInstructor(11);
  COSA.setInstructor(3);
  COHA.setCourse(15);
  COSA.setCourse(4);


  const COHB = testConst.courseOffering1;
  const COSB = testConst.courseOffering2;

  const COHC = testConst.courseOffering1;
  const COSC = testConst.courseOffering2;

  const COHD = testConst.courseOffering1;
  const COSD = testConst.courseOffering2;
}


module.exports = fillCourseOfferingTable;
