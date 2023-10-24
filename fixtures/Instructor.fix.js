const Instructor = require('../private/javascript/Instructor');

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
  const firstNames = ['Ben', 'Bryce', 'Coralee', 'Ernesto'];
  const lastNames = ['Benson', 'Barrie', 'Kaban', 'Basoalto'];

  // create valid entries
  for (let i = 0; i < firstNames.length; i++) {
    await CourseOffering.create({
      firstName: firstNames[i],
      lastName: lastNames[i],
    });
  }
}

module.exports = fillInstructorTable;
