const Classroom = require('../private/javascript/Classroom');
const Course = require('../private/javascript/Course');
const CourseOffering = require('../private/javascript/CourseOffering');
const Instructor = require('../private/javascript/Instructor');
const ProgramFix = require('../private/javascript/Program');
const Term = require('../private/javascript/Term');
const Timeslot = require('../private/javascript/Timeslot');
const {addAssociations} = require('../private/javascript/Associations');

// eslint-disable-next-line require-jsdoc
async function createAllTables(bForce) {
  await addAssociations();
  await Classroom.sync({force: bForce});
  await Course.sync({force: bForce});
  await Instructor.sync({force: bForce});
  await ProgramFix.sync({force: bForce});
  await Term.sync({force: bForce});
  await CourseOffering.sync({force: bForce});
  await Timeslot.sync({force: bForce});
}

module.exports = createAllTables;
