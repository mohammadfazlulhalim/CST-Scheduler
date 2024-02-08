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

  let COHB = testConst.courseOffering1;
  let COSB = testConst.courseOffering2;
  COHB.group = 'B';
  COSB.group = 'B';
  COHB = await CourseOffering.create(COHB);
  COSB = await CourseOffering.create(COSB);
  COHB.setTerm(3);
  COSB.setTerm(3);
  COHB.setProgram(1);
  COSB.setProgram(1);
  COHB.setInstructor(11);
  COSB.setInstructor(3);
  COHB.setCourse(15);
  COSB.setCourse(4);

  let COHC = testConst.courseOffering1;
  let COSC = testConst.courseOffering2;
  COHC.group = 'C';
  COSC.group = 'C';
  COHC = await CourseOffering.create(COHC);
  COSC = await CourseOffering.create(COSC);
  COHC.setTerm(3);
  COSC.setTerm(3);
  COHC.setProgram(1);
  COSC.setProgram(1);
  COHC.setInstructor(11);
  COSC.setInstructor(3);
  COHC.setCourse(15);
  COSC.setCourse(4);

  let COHD = testConst.courseOffering1;
  let COSD = testConst.courseOffering2;
  COHD.group = 'D';
  COSD.group = 'D';
  COHD = await CourseOffering.create(COHD);
  COSD = await CourseOffering.create(COSD);
  COHD.setTerm(3);
  COSD.setTerm(3);
  COHD.setProgram(1);
  COSD.setProgram(1);
  COHD.setInstructor(11);
  COSD.setInstructor(3);
  COHD.setCourse(15);
  COSD.setCourse(4);

  
  
}


module.exports = fillCourseOfferingTable;
