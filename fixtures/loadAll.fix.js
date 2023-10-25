// import individual fixture files here
const fillCourseOfferingTable = require('./CourseOffering.fix');
const fillCourseTable = require('./Course.fix'); // story34
const fillTermTable = require('./Term.fix');

// call individual fixture methods here
fillTermTable();
fillCourseOfferingTable();
fillCourseTable();

