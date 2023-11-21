const ProgramFix = require('../private/javascript/Program');


/**
 * This function clears the program table if it exists and fills it with new enteries
 */
async function fillProgramTable() {
  // clear the db table
  await ProgramFix.sync({force: true});

  // create 15 offerings
  await createProgram();
}

/**
 * Create some programs in the table
 */
async function createProgram() {
// list of viable groups
  const programName = ['Computer Systems Technology', 'Computer Networking Technician', 'Early Childhood Education'];
  const programAbbreviation = ['CST', 'CNT', 'ECE'];

  // create valid entries
  for (let i = 0; i < programName.length; i++) {
    await ProgramFix.create({
      programName: programName[i],
      programAbbreviation: programAbbreviation[i],
    });
  }
}

module.exports = fillProgramTable;
