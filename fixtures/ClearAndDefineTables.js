const Associations = require('../private/javascript/Associations');
const Program = require('../private/javascript/Program');
const Instructor = require('../private/javascript/Instructor');
const Term = require('../private/javascript/Term');
const Course = require('../private/javascript/Course');
const Timeslot = require('../private/javascript/Timeslot');
const Classroom = require('../private/javascript/Classroom');
const CourseOffering = require('../private/javascript/CourseOffering');

/**
 * This method deletes all tables and then recreates them, with associations
 * @return {Promise<void>} Nothing
 */
async function createTables() {
  await Program.sync({force: true});
  await Instructor.sync({force: true});
  await Term.sync({force: true});
  await Course.sync({force: true});

  await Associations.addAssociations();

  await CourseOffering.sync({force: true});
  await Classroom.sync({force: true});
  await Timeslot.sync({force: true});
}

module.exports = createTables;
