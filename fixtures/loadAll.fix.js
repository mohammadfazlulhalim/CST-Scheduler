// import individual fixture files here
const fillCourseOfferingTable = require('./CourseOffering.fix');
const fillInstructorTable = require('./Instructor.fix');
const fillCourseTable = require('./Course.fix'); // story34
const fillTermTable = require('./Term.fix');
const fillClassroomTable = require('./Classroom.fix');
const fillProgramTable = require('./Program.fix');

// call individual fixture methods here
fillTermTable();
fillCourseOfferingTable();
fillInstructorTable();
fillClassroomTable();
fillCourseTable();
fillProgramTable();

