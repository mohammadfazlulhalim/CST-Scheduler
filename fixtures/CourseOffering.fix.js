const CourseOffering = require('../private/javascript/CourseOffering');
const testConst = require('../constants').testConst;
const Associations = require('../private/javascript/Associations');

/**
 * This function clears the courseOffering table if it exists and fills it with 15 course offerings.
 */
async function fillCourseOfferingTable() {
  // clear the db table
  await CourseOffering.sync({force: true});

  Associations.addAssociations();

  CourseOffering.create(testConst.courseOffering1);
}


module.exports = fillCourseOfferingTable;
