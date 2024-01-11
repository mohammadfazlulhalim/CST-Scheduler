// import individual fixture files here
const fillCourseOfferingTable = require('./CourseOffering.fix');
const fillInstructorTable = require('./Instructor.fix');
const fillCourseTable = require('./Course.fix'); // story34
const fillTermTable = require('./Term.fix');
const fillClassroomTable = require('./Classroom.fix');
const fillProgramTable = require('./Program.fix');
const fillTimeslotTable = require('./Timeslot.fix');
const {addAssociations} = require('../private/javascript/Associations');
const createAllTables = require('./createTables.fix');

// call individual fixture methods here

async function TestingDisShiz() {
    await createAllTables();
    await addAssociations();
    fillTermTable();
    fillInstructorTable();
    fillClassroomTable();
    fillCourseTable();
    fillProgramTable();
    fillCourseOfferingTable();
    fillTimeslotTable();
}

TestingDisShiz();
