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
  for (const instructor of validInstructor) {
    await Instructor.create(instructor);
  }
}

const validInstructor = [
  {firstName: 'Bryce', lastName: 'Barrie',officeNum: '123A.1', phoneNum: '(306)-456-5467', email: 'barrie@saskpolytech.ca' },
  {firstName: 'Coralee', lastName: 'Kaban',officeNum: '123A.2', phoneNum: '(306)-567-5676', email: 'kaban@saskpolytech.ca' },
  {firstName: 'Ron', lastName: 'New', officeNum: '123B.0', phoneNum: '(306)-678-6585', email: 'new@saskpolytech.ca'},
  {firstName: 'Rick', lastName: 'Caron', officeNum: '123A.3', phoneNum: '(306)-123-7895', email: 'caron@saskpolytech.ca'},
  {firstName: 'Ernesto', lastName: 'Basoalto', officeNum: '123B.1', phoneNum: '(306)-456-6859', email: 'basalto@saskpolytech.ca'},
  {firstName: 'firstName', lastName: 'Holtslan', officeNum: '125B.1', phoneNum: '(306)-456-6859', email: 'holtslan@saskpolytech.ca'},
  {firstName: 'Donovan', lastName: 'Onishenko', officeNum: '123B.1', phoneNum: '(306)-456-6859', email: 'onishenko@saskpolytech.ca'},
  {firstName: 'Wade', lastName: 'Lahoda', officeNum: '123B.1', phoneNum: '(306)-456-6859', email: 'wade@saskpolytech.ca'},
  {firstName: 'Jason', lastName: 'Schmidt', officeNum: '123B.1', phoneNum: '(306)-456-6859', email: 'schmidt@saskpolytech.ca'},
  {firstName: 'Micheal', lastName: 'Grzesina', officeNum: '123B.1', phoneNum: '(306)-456-6859', email: 'grzesina@saskpolytech.ca'},
  {firstName: 'Ben', lastName: 'Benson', officeNum: '123B.1', phoneNum: '(306)-456-6859', email: 'benson@saskpolytech.ca'},
];


module.exports = {validInstructor, fillInstructorTable};
