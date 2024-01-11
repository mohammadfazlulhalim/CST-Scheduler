const Classroom = require('../private/javascript/Classroom');
const Course = require('../private/javascript/Course');
const CourseOffering = require('../private/javascript/CourseOffering');
const Instructor = require('../private/javascript/Instructor');
const ProgramFix = require('../private/javascript/Program');
const Term = require('../private/javascript/Term');
const Timeslot = require('../private/javascript/Timeslot');

// eslint-disable-next-line require-jsdoc
async function createAllTables() {
  await Classroom.sync({force: true});
  await Course.sync({force: true});
  await Instructor.sync({force: true});
  await ProgramFix.sync({force: true});
  await Term.sync({force: true});
  await CourseOffering.sync({force: true});
  await Timeslot.sync({force: true});
}

module.exports = createAllTables;
