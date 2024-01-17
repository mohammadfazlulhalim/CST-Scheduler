const Timeslot = require('../private/javascript/Timeslot');
const Instructor = require('../private/javascript/Instructor');
const Program = require('../private/javascript/Program');
const Classroom = require('../private/javascript/Classroom');
const Term = require('../private/javascript/Term');
const courseOffering = require('../private/javascript/CourseOffering');
const constants = require('../constants');
const {GenerateTimeSlotData} = require('../constants');

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
  for (let i = 0; i < constants.testConst.validTimeslots.length; i++) {

  }
  const TimeSlotsArray = GenerateTimeSlotData();
  const RealTimeSlots = await Timeslot.bulkCreate(TimeSlotsArray);


  const instructor = await Instructor.findByPk(4);
  const program = await Program.findByPk(1);
  const classroom = await Classroom.findByPk(2);
  const term = await Term.findByPk(1);
  for (let i=0; i<RealTimeSlots.length; i++) {
    RealTimeSlots[i].setTerm(term);
    RealTimeSlots[i].setProgram(program);
    RealTimeSlots[i].setInstructor(instructor);
    RealTimeSlots[i].setClassroom(classroom);
    RealTimeSlots[i].setInstructor(await Instructor.findByPk((i%constants.testConst.validInstructor.length)+1));
  }


  /*   const courseOffering = null;
  const thisTimeSlot = await Timeslot.create({
    startDate: constants.testConst.validTimeslots[0].startDate,
    endDate: constants.testConst.validTimeslots[0].endDate,
    startTime: constants.testConst.validTimeslots[0].startTime,
    endTime: constants.testConst.validTimeslots[0].endTime,
    day: constants.testConst.validTimeslots[0].day,
    group: constants.testConst.validTimeslots[0].group,
  });
  await thisTimeSlot.setTerm(term);
  await thisTimeSlot.setProgram(program);
  await thisTimeSlot.setClassroom(classroom);
  await thisTimeSlot.setCourseOffering(courseOffering);
  await thisTimeSlot.setInstructor(instructor);
  console.log(thisTimeSlot); */

  // constants.testConst.

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
