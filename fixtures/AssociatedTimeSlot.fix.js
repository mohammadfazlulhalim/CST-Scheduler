const CourseOfferingScript = require('./AssociatedCourseOffering.fix')
const Timeslot = require('../private/javascript/Timeslot')
const CourseOffering = require('../private/javascript/CourseOffering');
const Classroom = require('../private/javascript/Classroom');
const Associations = require('../private/javascript/Associations');
const {testConst} = require("../constants");

async function loadTimeslots() {
  // Create course offering fixtures
  const courseObj = await CourseOfferingScript();

  console.log('offering1 term' + JSON.stringify(courseObj.offering1.termID));

  // const coObj1 = await CourseOffering.create(courseObj.offering1, {include: [{
  //     association: CourseOffering.Term,
  //     include: [courseObj.offering1.termID]
  //   }]});
  const coObj1 = courseObj.offering1;
  const coObj2 =await CourseOffering.create(courseObj.offering2);

  const ClassroomObj = await Classroom.create(testConst.classroom1);

  var TimeslotAObj = {
    courseOfferingID: coObj1,
    instructorID: coObj1.instructorID,
    classroomID: ClassroomObj,
    term: coObj1.termID,
    starttime: '8:00',
    endtime: '9:00',
    day: 1,
    group: coObj1.group
  }
  // creating timeslots
  // Group A top-left to bottom-right diagonal
  await Timeslot.create(TimeslotAObj); //8-9 Monday
  TimeslotAObj.day = 2
  TimeslotAObj.starttime = '9:00';
  TimeslotAObj.endtime = '10:00';
  await Timeslot.create(TimeslotAObj); //9-10 Tue
  TimeslotAObj.day = 3
  TimeslotAObj.starttime = '10:00';
  TimeslotAObj.endtime = '11:00';
  await Timeslot.create(TimeslotAObj); //10-11 Wed
  TimeslotAObj.day = 4
  TimeslotAObj.starttime = '11:00';
  TimeslotAObj.endtime = '12:00';
  await Timeslot.create(TimeslotAObj); //11-12 Thur
  TimeslotAObj.day = 5
  TimeslotAObj.starttime = '13:00';
  TimeslotAObj.endtime = '14:00';
  await Timeslot.create(TimeslotAObj); //1-2 Fri
  TimeslotAObj.day = 5
  TimeslotAObj.starttime = '14:00';
  TimeslotAObj.endtime = '15:00';
  await Timeslot.create(TimeslotAObj); //2-3 Fri

  var TimeslotBObj = {
    courseOfferingID: coObj2,
    instructorID: coObj2.instructorID,
    classroomID: ClassroomObj,
    term: coObj2.termID,
    starttime: '14:00',
    endtime: '15:00',
    day: 1,
    group: coObj2.group
  }
  await Timeslot.create(TimeslotBObj); //2-3 Monday
  TimeslotBObj.day = 2
  TimeslotBObj.starttime = '13:00';
  TimeslotBObj.endtime = '14:00';
  await Timeslot.create(TimeslotBObj); //1-2 Tue
  TimeslotBObj.day = 3
  TimeslotBObj.starttime = '11:00';
  TimeslotBObj.endtime = '12:00';
  await Timeslot.create(TimeslotBObj); //11-12 Wed
  TimeslotBObj.day = 4
  TimeslotBObj.starttime = '10:00';
  TimeslotBObj.endtime = '11:00';
  await Timeslot.create(TimeslotBObj); //10-11 Thur
  TimeslotBObj.day = 5
  TimeslotBObj.starttime = '9:00';
  TimeslotBObj.endtime = '10:00';
  await Timeslot.create(TimeslotBObj); //9-10 Fri
  TimeslotBObj.day = 5
  TimeslotBObj.starttime = '8:00';
  TimeslotBObj.endtime = '9:00';
  await Timeslot.create(TimeslotBObj); //8-9 Fri









}

module.exports = loadTimeslots;