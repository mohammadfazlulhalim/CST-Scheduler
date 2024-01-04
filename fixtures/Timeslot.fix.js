const Timeslot = require('../private/javascript/Timeslot');
const Classroom = require('../private/javascript/Classroom');

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
  await Timeslot.create({
    name: 'Hardware',
    startDate: '2023-09-01',
    endDate: '2023-12-15',
    startTime: '800',
    endTime: '900',
    day: 'Monday',
    group: 'B',
    termID: 1,
    programID: 1,
    instructorID: 1,
    courseID: 1,
    roomID: 1,
  });
  await Timeslot.create({
    'name': '',
    'startDate': '',
    'endDate': '',
    'startTime': null,
    'endTime': null,
    'day': '',
    'group': '',
    'termID': null,
    'programID': null,
    'instructorID': null,
    'courseID': null,
    'roomID': null,
  });
  await Timeslot.create({
    'name': '',
    'startDate': '',
    'endDate': '',
    'startTime': null,
    'endTime': null,
    'day': '',
    'group': '',
    'termID': null,
    'programID': null,
    'instructorID': null,
    'courseID': null,
    'roomID': null,
  });
}

module.exports = fillTimeslotTable;
