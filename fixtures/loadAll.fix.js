// import individual fixture files here

const fillTimeslot = require('./AssociatedTimeSlot.fix');
const CreateTables = require("./ClearAndDefineTables");

async function createData() {
    // await fillCourseOfferingTable();
    // await Associations.addAssociations();
    await CreateTables();
    await fillTimeslot();
}

createData();

