const Instructor = require('../private/javascript/Instructor');
const constants = require('../constants');

/**
 * This function clears the courseOffering table if it exists and fills it with 15 course offerings.
 */
async function fillInstructorTable() {
  // clear the db table
  await Instructor.sync({force: true});

  // create 15 offerings
  await createInstructor();
}


/**
 * Creates a bunch of course offerings to add to the database.
 *
 * @param {number} amount - The amount of offerings to create
 */
async function createInstructor(amount) {
  // list of viable groups

  // const instructorID = ['']
  // const firstNames = ['Ben', 'Bryce', 'Coralee', 'Ernesto'];
  // const lastNames = ['Benson', 'Barrie', 'Kaban', 'Basoalto'];
  /*   const instrArray = [
    fixtureConst.instructor1,
    fixtureConst.instructor2,
    fixtureConst.instructor3,
    fixtureConst.instructor4];

  // create valid entries
  for (let i = 0; i < instrArray.length; i++) {
    await Instructor.create(
        instrArray[i],
    );
  } */

  for (const instructor of constants.testConst.validInstructor) {
    await Instructor.create(instructor);
  }
}

module.exports = fillInstructorTable;
