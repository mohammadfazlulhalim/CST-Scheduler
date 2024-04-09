// import individual fixture files here
const fillCourseOfferingTable = require('./CourseOffering.fix').fillCourseOfferingTable;
const fillInstructorTable = require('./Instructor.fix').fillInstructorTable;
const fillCourseTable = require('./Course.fix').fillCourseTable; // story34
const fillTermTable = require('./Term.fix').fillTermTable;
const fillClassroomTable = require('./Classroom.fix').fillClassroomTable;
const fillProgramTable = require('./Program.fix').fillProgramTable;
const fillTimeslotTable = require('./Timeslot.fix').fillTimeslotTable;
const {addAssociations} = require('../private/javascript/Associations');
const createAllTables = require('./createTables.fix');
const fillTimeslot = require('./AssociatedTimeSlot.fix');

// eslint-disable-next-line require-jsdoc
async function loadEverything() {
  await createAllTables(true);

  await fillTermTable();
  await fillInstructorTable();
  await fillClassroomTable();
  await fillProgramTable();
  await fillCourseTable();
  await fillCourseOfferingTable();
  await fillTimeslotTable();
  await fillTimeslot();
}

loadEverything();

module.exports= {loadEverything};
