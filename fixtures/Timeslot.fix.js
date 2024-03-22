const Timeslot = require('../private/javascript/Timeslot');
const Instructor = require('../private/javascript/Instructor');
const Program = require('../private/javascript/Program');
const Classroom = require('../private/javascript/Classroom');
const Term = require('../private/javascript/Term');
const courseOffering = require('../private/javascript/CourseOffering');
const validInstructor = require('./Instructor.fix').validInstructor;
const validCourseOfferingsA = require('./CourseOffering.fix').validCourseOfferingsA;
const validCourseOfferingsB = require('./CourseOffering.fix').validCourseOfferingsB;

// TODO refine the s48 timeslots
const s48validTimeslots = [
  {startDate: '2023-01-02', endDate: '2023-04-28', startTime: '08:00', endTime: '09:00', day: 1, group: 'A'},
  {startDate: '2023-01-02', endDate: '2023-04-28', startTime: '14:00', endTime: '15:00', day: 1, group: 'A'},
  {startDate: '2023-01-02', endDate: '2023-04-28', startTime: '09:00', endTime: '10:00', day: 2, group: 'A'},
  {startDate: '2023-01-02', endDate: '2023-04-28', startTime: '13:00', endTime: '14:00', day: 2, group: 'A'},
  // TODO watch for conflicts
  {startDate: '2023-01-02', endDate: '2023-04-28', startTime: '10:00', endTime: '11:00', day: 3, group: 'A'},
  {startDate: '2023-01-02', endDate: '2023-04-28', startTime: '11:00', endTime: '12:00', day: 5, group: 'A'},
  {startDate: '2023-02-06', endDate: '2023-04-28', startTime: '10:00', endTime: '11:00', day: 4, group: 'A'},
  {startDate: '2023-01-02', endDate: '2023-03-06', startTime: '11:00', endTime: '12:00', day: 3, group: 'A'},
  {startDate: '2023-02-06', endDate: '2023-03-06', startTime: '11:00', endTime: '12:00', day: 4, group: 'A'},
  {startDate: '2023-03-06', endDate: '2023-05-24', startTime: '13:00', endTime: '14:00', day: 5, group: 'A'},
  //   TODO timeslots for room 241 - term 2 - either separately from the list or dynamically use existing list - but with changed start and end date values - could algorithmic
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
  const RealTimeSlots2 = await Timeslot.bulkCreate(validTimeslots);


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
    RealTimeSlots[i].setInstructor(await Instructor.findByPk((i%validInstructor.length)+1));
    RealTimeSlots[i].setCourseOffering(await courseOffering.findByPk((i%validCourseOfferingsB.length)+2));
    RealTimeSlots[i].setInstructor(await Instructor
        .findByPk((i%validInstructor.length)+1));
    RealTimeSlots[i].setCourseOffering(await courseOffering
        .findByPk((i%validCourseOfferingsB.length)+2));
  }

  classroom = await Classroom.findByPk(1);

  for (let i=0; i<RealTimeSlots2.length; i++) {
    RealTimeSlots2[i].setTerm(term);
    RealTimeSlots2[i].setProgram(program);
    // RealTimeSlots2[i].setInstructor(instructor);
    RealTimeSlots2[i].setClassroom(classroom);
    RealTimeSlots2[i].setInstructor(await Instructor.findByPk((i % validInstructor.length) + 1));
    RealTimeSlots2[i].setCourseOffering(await courseOffering.findByPk((i % validCourseOfferingsA.length) + 9));
    RealTimeSlots2[i].setInstructor(await Instructor
        .findByPk((i % validInstructor.length) + 1));
    RealTimeSlots2[i].setCourseOffering(await courseOffering
        .findByPk((i %validCourseOfferingsA.length) + 9));
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
        .findByPk((i%validInstructor.length)+1));
    RealTimeSlots3[i].setCourseOffering(await courseOffering
        .findByPk((i%validCourseOfferingsB.length)+2));
  }
}

function GenerateTimeSlotData() {
  const TimeArray = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];
  const TimeSlotDataArray = [];

  for (let i = 1; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      if (j === 4) {
        continue;
      }
      TimeSlotDataArray.push({
        startDate: '2023-08-01', endDate: '2023-12-01',
        startTime: TimeArray[j], endTime: TimeArray[j+1], day: i, group: 'B',
      });
    }
  }

  return TimeSlotDataArray;
}

validTimeslots = [
  {startDate: '2023-01-01', endDate: '2023-04-01', startTime: '08:00', endTime: '09:00', day: 1, group: 'A'},
  {startDate: '2023-01-01', endDate: '2023-04-01', startTime: '14:00', endTime: '15:00', day: 1, group: 'A'},
  {startDate: '2023-01-01', endDate: '2023-04-01', startTime: '09:00', endTime: '10:00', day: 2, group: 'A'},
  {startDate: '2023-01-01', endDate: '2023-04-01', startTime: '13:00', endTime: '14:00', day: 2, group: 'A'},
  {startDate: '2023-01-01', endDate: '2023-04-01', startTime: '10:00', endTime: '11:00', day: 3, group: 'A'},
  {startDate: '2023-01-01', endDate: '2023-04-01', startTime: '11:00', endTime: '12:00', day: 3, group: 'A'},
  {startDate: '2023-01-01', endDate: '2023-04-01', startTime: '10:00', endTime: '11:00', day: 4, group: 'A'},
  {startDate: '2023-01-01', endDate: '2023-04-01', startTime: '11:00', endTime: '12:00', day: 4, group: 'A'},
  {startDate: '2023-01-01', endDate: '2023-04-01', startTime: '09:00', endTime: '10:00', day: 5, group: 'A'},
  {startDate: '2023-01-01', endDate: '2023-04-01', startTime: '13:00', endTime: '14:00', day: 5, group: 'A'},
];

const timeSlot1 = {
  startTime: '10:00', // The value is 24h for now
    endTime: '11:00', // replaced duration for now
    startDate: '2023-09-01',
    endDate: '2023-12-15',
    day: 0,
    group: 'B',
};

module.exports = { timeSlot1, validTimeslots, fillTimeslotTable};
