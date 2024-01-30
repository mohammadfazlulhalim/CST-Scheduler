const Timeslot = require('../private/javascript/Timeslot');
const Instructor = require('../private/javascript/Instructor');
const Program = require('../private/javascript/Program');
const Classroom = require('../private/javascript/Classroom');
const Term = require('../private/javascript/Term');
const courseOffering = require('../private/javascript/CourseOffering');
const constants = require('../constants');
const {GenerateTimeSlotData, testConst} = require('../constants');

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

  const instructor = await Instructor.findByPk(4);
  const program = await Program.findByPk(1);
  let classroom = await Classroom.findByPk(2);
  const term = await Term.findByPk(1);
  for (let i=0; i<RealTimeSlots.length; i++) {
    RealTimeSlots[i].setTerm(term);
    RealTimeSlots[i].setProgram(program);
    RealTimeSlots[i].setInstructor(instructor);
    RealTimeSlots[i].setClassroom(classroom);
    RealTimeSlots[i].setInstructor(await Instructor.findByPk((i%constants.testConst.validInstructor.length)+1));
    RealTimeSlots[i].setCourseOffering(await courseOffering.findByPk((i%constants.testConst.validCourseOfferingsB.length)+2));
  }

  classroom = await Classroom.findByPk(1);

  for (let i=0; i<RealTimeSlots2.length; i++) {
    RealTimeSlots2[i].setTerm(term);
    RealTimeSlots2[i].setProgram(program);
    RealTimeSlots2[i].setInstructor(instructor);
    RealTimeSlots2[i].setClassroom(classroom);
    RealTimeSlots2[i].setInstructor(await Instructor.findByPk((i % constants.testConst.validInstructor.length) + 1));
    RealTimeSlots2[i].setCourseOffering(await courseOffering.findByPk((i % constants.testConst.validCourseOfferingsA.length) + 9));
  }
}

module.exports = fillTimeslotTable;
