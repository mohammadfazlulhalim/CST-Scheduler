// import individual fixture files here
const fillCourseOfferingTable = require('./CourseOffering.fix');
const fillInstructorTable = require('./Instructor.fix');
const fillCourseTable = require('./Course.fix'); // story34
const fillTermTable = require('./Term.fix');
const fillClassroomTable = require('./Classroom.fix');
const fillProgramTable = require('./Program.fix');
const fillTimeslotTable = require('./Timeslot.fix');
const {addAssociations} = require('../private/javascript/Associations');
// call individual fixture methods here

addAssociations();
fillTermTable();
fillInstructorTable();
fillClassroomTable();
fillCourseTable();
fillProgramTable();
fillCourseOfferingTable();
fillTimeslotTable();
