const Timeslot = require('../private/javascript/Timeslot');
const constants = require('../constants');

/**
 * This clears the table for Classroom and then recreates the table
 * with valid entries
 * @return {Promise<void>}
 */
async function fillTimeslotTable() {
  await Timeslot.sync({force: true});
  await createTimeslot();
}

// eslint-disable-next-line require-jsdoc
async function createTimeslot() {
  for (const timeslot of constants.testConst.validTimeslots) {
    await Timeslot.create(timeslot);
  }
}

module.exports = fillTimeslotTable;
