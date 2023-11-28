const CourseOffering = require('../private/javascript/CourseOffering');
const Program = require('../private/javascript/Program');
const testConst = require('../constants').testConst;

/**
 * This function clears the courseOffering table if it exists and fills it with 15 course offerings.
 */
async function fillCourseOfferingTable() {
  // clear the db table
  await CourseOffering.sync({force: true});
  await Program.sync({force: true});

  Program.create(testConst.program1);
  CourseOffering.create(testConst.courseOffering1);

}


module.exports = fillCourseOfferingTable;
