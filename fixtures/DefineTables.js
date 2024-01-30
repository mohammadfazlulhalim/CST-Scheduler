const Associations = require('../private/javascript/Associations');
const Program = require('../private/javascript/Program');
const Instructor = require('../private/javascript/Instructor');
const Term = require('../private/javascript/Term');
const Course = require('../private/javascript/Course');
const Timeslot = require('../private/javascript/Timeslot');
const Classroom = require('../private/javascript/Classroom');
const CourseOffering = require('../private/javascript/CourseOffering');

/**
 * This method redfines all tables, with associations
 * It will not delete any data stored in the DB
 * @return {Promise<void>} Nothing
 */
async function createTables(bfor) {
  await Program.sync();
  await Instructor.sync();
  await Term.sync();
  await Course.sync();

  await Associations.addAssociations();

  await CourseOffering.sync();
  await Classroom.sync();
  await Timeslot.sync();
}

module.exports = createTables;
