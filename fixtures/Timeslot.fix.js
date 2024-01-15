const Timeslot = require('../private/javascript/Timeslot');
const constants = require('../constants');

/**
 * This clears the table for Classroom and then recreates the table
 * with valid entries
 * @return {Promise<void>}
 */
async function fillTimeslotTable() {
  await createTimeslot();
}

// eslint-disable-next-line require-jsdoc
async function createTimeslot() {
  // for (const timeslot of constants.testConst.validTimeslots) {
  //   await Timeslot.create(timeslot);
  // }
  // const timeslot1 = TimeSlot.Create(
  //     startDate = constants.testConst.validTimeslots(0).startDate,
  //
  // )
  // await Timeslot.create(constants.testConst.validTimeslots[0]);
}

module.exports = fillTimeslotTable;
