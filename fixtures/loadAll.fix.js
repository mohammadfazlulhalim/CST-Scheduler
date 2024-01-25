// import individual fixture files here

const fillTimeslot = require('./AssociatedTimeSlot.fix');
const CreateTables = require("./ClearAndDefineTables");
const CreateInstructors = require('./Instructor.fix');

async function createData() {
    // await fillCourseOfferingTable();
    // await Associations.addAssociations();

    await CreateTables();
    await CreateInstructors();
    await fillTimeslot();
}

createData();

