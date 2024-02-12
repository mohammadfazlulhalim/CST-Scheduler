const Timeslot = require('../private/javascript/Timeslot');
const Instructor = require('../private/javascript/Instructor');
const Program = require('../private/javascript/Program');
const Classroom = require('../private/javascript/Classroom');
const Term = require('../private/javascript/Term');
const courseOffering = require('../private/javascript/CourseOffering');
const constants = require('../constants');
const {GenerateTimeSlotData, testConst} = require('../constants');

// TODO refine the s48 timeslots
const s48validTimeslots = [
  {startDate: '2023-01-02', endDate: '2023-04-28', startTime: '8:00', endTime: '9:00', day: 1, group: 'A'},
  {startDate: '2023-01-02', endDate: '2023-04-28', startTime: '14:00', endTime: '15:00', day: 1, group: 'A'},
  {startDate: '2023-01-02', endDate: '2023-04-28', startTime: '9:00', endTime: '10:00', day: 2, group: 'A'},
  {startDate: '2023-01-02', endDate: '2023-04-28', startTime: '13:00', endTime: '14:00', day: 2, group: 'A'},
  // TODO watch for conflicts
  {startDate: '2023-01-02', endDate: '2023-04-28', startTime: '10:00', endTime: '11:00', day: 3, group: 'A'},
  {startDate: '2023-01-02', endDate: '2023-04-28', startTime: '11:00', endTime: '12:00', day: 3, group: 'A'},
  {startDate: '2023-02-06', endDate: '2023-04-28', startTime: '10:00', endTime: '11:00', day: 4, group: 'A'},
  // {startDate: '2023-01-02', endDate: '2023-04-28', startTime: '11:00', endTime: '12:00', day: 4, group: 'A'},
  // {startDate: '2023-01-02', endDate: '2023-04-28', startTime: '9:00', endTime: '10:00', day: 5, group: 'A'},
  // {startDate: '2023-01-02', endDate: '2023-04-28', startTime: '13:00', endTime: '14:00', day: 5, group: 'A'},
  // {startDate: '2023-01-02', endDate: '2023-04-28', startTime: '8:00', endTime: '9:00', day: 1, group: 'A'},
  // {startDate: '2023-01-02', endDate: '2023-04-28', startTime: '14:00', endTime: '15:00', day: 1, group: 'A'},
  // {startDate: '2023-01-02', endDate: '2023-04-28', startTime: '9:00', endTime: '10:00', day: 2, group: 'A'},
  // {startDate: '2023-01-02', endDate: '2023-04-28', startTime: '13:00', endTime: '14:00', day: 2, group: 'A'},

  // {startDate: '2023-01-02', endDate: '2023-03-06', startTime: '10:00', endTime: '11:00', day: 3, group: 'A'},
  {startDate: '2023-01-02', endDate: '2023-03-06', startTime: '11:00', endTime: '12:00', day: 3, group: 'A'},

  // {startDate: '2023-02-06', endDate: '2023-03-06', startTime: '10:00', endTime: '11:00', day: 4, group: 'A'},
  {startDate: '2023-02-06', endDate: '2023-03-06', startTime: '11:00', endTime: '12:00', day: 4, group: 'A'},

  //   {startDate: '2023-03-06', endDate: '2023-03-20', startTime: '9:00', endTime: '10:00', day: 5, group: 'A'},
  {startDate: '2023-03-06', endDate: '2023-05-24', startTime: '13:00', endTime: '14:00', day: 5, group: 'A'},
  //   TODO timeslots for room 241 - term 2 - either separately from the list or dynamically use existing list - but with changed start and end date values - could algorithmic
  // {startDate: '2023-01-01', endDate: '2023-04-01', startTime: '13:00', endTime: '14:00', day: 5, group: 'A'},
];

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
  const TimeSlotsArray = GenerateTimeSlotData();
  const RealTimeSlots = await Timeslot.bulkCreate(TimeSlotsArray);
  const RealTimeSlots2 = await Timeslot.bulkCreate(constants.testConst.validTimeslots);

  // for (const timeslot of constants.testConst.story9v2Timeslot) {
  //   await Timeslot.create(timeslot);
  // }
  //
  // const instructor = await Instructor.findByPk(4);

  // TODO comment program if necessary
  const program = await Program.findByPk(1);
  let classroom = await Classroom.findByPk(2);
  const term = await Term.findByPk(1);

  // s48 create term 2 for s48 related timeslots - split reports
  const term2 = await Term.findByPk(2);

  for (let i=0; i<RealTimeSlots.length; i++) {
    RealTimeSlots[i].setTerm(term);
    RealTimeSlots[i].setProgram(program);
    // RealTimeSlots[i].setInstructor(instructor);
    RealTimeSlots[i].setClassroom(classroom);
    RealTimeSlots[i].setInstructor(await Instructor
        .findByPk((i%constants.testConst.validInstructor.length)+1));
    RealTimeSlots[i].setCourseOffering(await courseOffering
        .findByPk((i%constants.testConst.validCourseOfferingsB.length)+2));
  }

  classroom = await Classroom.findByPk(1);

  for (let i=0; i<RealTimeSlots2.length; i++) {
    RealTimeSlots2[i].setTerm(term);
    RealTimeSlots2[i].setProgram(program);
    // RealTimeSlots2[i].setInstructor(instructor);
    RealTimeSlots2[i].setClassroom(classroom);
    RealTimeSlots2[i].setInstructor(await Instructor
        .findByPk((i % constants.testConst.validInstructor.length) + 1));
    RealTimeSlots2[i].setCourseOffering(await courseOffering
        .findByPk((i % constants.testConst.validCourseOfferingsA.length) + 9));
  }

  // -----s48-----
  // TODO try out two loops - one to create a new series of timeslots - reuse the validTimeslots for the time being and setTerm to term2! - classroom id 2 for now
  const RealTimeSlots3 = await Timeslot.bulkCreate(s48validTimeslots);

  const classroom3 = await Classroom.findOne({
    where: {roomNumber: '241'},
  });

  for (let i=0; i<RealTimeSlots3.length; i++) {
    RealTimeSlots3[i].setTerm(term2);
    RealTimeSlots3[i].setProgram(program);
    // RealTimeSlots[i].setInstructor(instructor);
    RealTimeSlots3[i].setClassroom(classroom3);
    RealTimeSlots3[i].setInstructor(await Instructor
        .findByPk((i%constants.testConst.validInstructor.length)+1));
    RealTimeSlots3[i].setCourseOffering(await courseOffering
        .findByPk((i%constants.testConst.validCourseOfferingsB.length)+2));
  }
}

module.exports = fillTimeslotTable;
