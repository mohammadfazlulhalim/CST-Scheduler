// import individual fixture files here
const fillCourseOfferingTable = require('./AssociatedCourseOffering.fix');
// const fillInstructorTable = require('./Instructor.fix');
// const fillCourseTable = require('./Course.fix'); // story34
// const fillTermTable = require('./Term.fix');
// const fillClassroomTable = require('./Classroom.fix');
// const fillProgramTable = require('./Program.fix');
const fillTimeslot = require('./AssociatedTimeSlot.fix');
const Associations = require('../private/javascript/Associations');
const Program = require("../private/javascript/Program");
const Instructor = require("../private/javascript/Instructor");
const Term = require("../private/javascript/Term");
const Course = require("../private/javascript/Course");
const Timeslot = require("../private/javascript/Timeslot");
const Classroom = require("../private/javascript/Classroom");
const CourseOffering = require("../private/javascript/CourseOffering");

async function createTables() {
    await Program.sync({force: true});
    await Instructor.sync({force: true});
    await Term.sync({force: true});
    await Course.sync({force: true});

    await Associations.addAssociations();

    await CourseOffering.sync({force: true});
    await Classroom.sync({force:true});
    await Timeslot.sync({force: true});


    await createData();
}

async function createData() {
    // await fillCourseOfferingTable();
    // await Associations.addAssociations();
    await fillTimeslot();
}

createTables();

