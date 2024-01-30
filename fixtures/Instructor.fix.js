const Instructor = require('../private/javascript/Instructor');
const constants = require('../constants');

/**
 * This function clears the courseOffering table if it exists and fills it with 15 course offerings.
 */
async function fillInstructorTable() {
  // create 15 offerings
  await createInstructor();
}


/**
 * Creates a bunch of course offerings to add to the database.
 *
 * @param {number} amount - The amount of offerings to create
 */
async function createInstructor(amount) {
  for (const instructor of constants.testConst.validInstructor) {
    await Instructor.create(instructor);
  }
}

module.exports = fillInstructorTable;
