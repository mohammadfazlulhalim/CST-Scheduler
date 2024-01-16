// import individual fixture files here
const fillCourseOfferingTable = require('./CourseOffering.fix');
const fillInstructorTable = require('./Instructor.fix');
const fillCourseTable = require('./Course.fix'); // story34
const fillTermTable = require('./Term.fix');
const fillClassroomTable = require('./Classroom.fix');
const fillProgramTable = require('./Program.fix');
const fillTimeslot = require('./AssociatedTimeSlot.fix');
const Associations = require('../private/javascript/Associations');

// call individual fixture methods here
Associations.addAssociations();
// fillTermTable();
// fillInstructorTable();
// fillClassroomTable();
// fillCourseTable();
// fillProgramTable();
// fillCourseOfferingTable();
fillTimeslot();
