const CourseOfferingScript = require('./AssociatedCourseOffering.fix');
const Timeslot = require('../private/javascript/Timeslot');
const CourseOffering = require('../private/javascript/CourseOffering');
const Classroom = require('../private/javascript/Classroom');
const {testConst} = require('../constants');

/**
 * Calls AssociatedCourseOffering, creates those course offerings
 * and then creates timeslots that are used for testing for story 41
 */
async function loadTimeslots() {
  // Create course offering fixtures
  const courseObj = await CourseOfferingScript();

  // Creating course offerings into the database
  const coObj1 = await CourseOffering.create(courseObj.offering1);
  await coObj1.setTerm(courseObj.offering1.termID);
  await coObj1.setInstructor(courseObj.offering1.instructorID);
  await coObj1.setCourse(courseObj.offering1.courseID);
  await coObj1.setProgram(courseObj.offering1.programID);

  const coObj2 =await CourseOffering.create(courseObj.offering2);
  await coObj2.setTerm(courseObj.offering2.termID);
  await coObj2.setInstructor(courseObj.offering2.instructorID);
  await coObj2.setCourse(courseObj.offering2.courseID);
  await coObj2.setProgram(courseObj.offering2.programID);

  // const termTest = await coObj2.getTerm();
  // console.log('getter test: ' + JSON.stringify(termTest));

  const ClassroomObj = await Classroom.create(testConst.classroom1);

  // creating the object literals for easy use
  const TimeslotAObj = {
    startDate: coObj1.startDate,
    endDate: coObj1.endDate,
    CourseOfferingId: coObj1.id,
    InstructorId: coObj1.InstructorId,
    ClassroomId: ClassroomObj.id,
    TermId: coObj1.TermId,
    ProgramId: coObj1.ProgramId,
    startTime: '8:00',
    endTime: '9:00',
    day: 1,
    group: coObj1.group,
  };

  const TimeslotBObj = {
    startDate: coObj2.startDate,
    endDate: coObj2.endDate,
    CourseOfferingId: coObj2.id,
    InstructorId: coObj2.InstructorId,
    ClassroomId: ClassroomObj.id,
    TermId: coObj2.TermId,
    ProgramId: coObj2.ProgramId,
    startTime: '14:00',
    endTime: '15:00',
    day: 1,
    group: coObj2.group,
  };

  // creating timeslots
  // Group A top-left to bottom-right diagonal
  const timeslotCreated = await Timeslot.create(TimeslotAObj); // 8-9 Monday
  TimeslotAObj.day = 2;
  TimeslotAObj.startTime = '9:00';
  TimeslotAObj.endTime = '10:00';

  const response = await Timeslot.findByPk(timeslotCreated.id, {include: CourseOffering});

  // console.log("Eager test: " + JSON.stringify(response));

  // console.log('Testing format response: ' + JSON.stringify(timeslotCreated));
  // const termTest2 = await timeslotCreated.getCourseOffering();
  // console.log('getter test 2: ' + JSON.stringify(termTest2));

  await Timeslot.create(TimeslotAObj); // 9-10 Tue
  TimeslotAObj.day = 3;
  TimeslotAObj.startTime = '10:00';
  TimeslotAObj.endTime = '11:00';
  await Timeslot.create(TimeslotAObj); // 10-11 Wed
  TimeslotAObj.day = 4;
  TimeslotAObj.startTime = '11:00';
  TimeslotAObj.endTime = '12:00';
  await Timeslot.create(TimeslotAObj); // 11-12 Thur
  TimeslotAObj.day = 5;
  TimeslotAObj.startTime = '13:00';
  TimeslotAObj.endTime = '14:00';
  await Timeslot.create(TimeslotAObj); // 1-2 Fri
  TimeslotAObj.day = 5;
  TimeslotAObj.startTime = '14:00';
  TimeslotAObj.endTime = '15:00';
  await Timeslot.create(TimeslotAObj); // 2-3 Fri

  // Group B bottom-left to top-right diagonal
  await Timeslot.create(TimeslotBObj); // 2-3 Monday
  TimeslotBObj.day = 2;
  TimeslotBObj.startTime = '13:00';
  TimeslotBObj.endTime = '14:00';
  await Timeslot.create(TimeslotBObj); // 1-2 Tue
  TimeslotBObj.day = 3;
  TimeslotBObj.startTime = '11:00';
  TimeslotBObj.endTime = '12:00';
  await Timeslot.create(TimeslotBObj); // 11-12 Wed
  TimeslotBObj.day = 4;
  TimeslotBObj.startTime = '10:00';
  TimeslotBObj.endTime = '11:00';
  await Timeslot.create(TimeslotBObj); // 10-11 Thur
  TimeslotBObj.day = 5;
  TimeslotBObj.startTime = '9:00';
  TimeslotBObj.endTime = '10:00';
  await Timeslot.create(TimeslotBObj); // 9-10 Fri
  TimeslotBObj.day = 5;
  TimeslotBObj.startTime = '8:00';
  TimeslotBObj.endTime = '9:00';
  await Timeslot.create(TimeslotBObj); // 8-9 Fri
}

module.exports = loadTimeslots;
