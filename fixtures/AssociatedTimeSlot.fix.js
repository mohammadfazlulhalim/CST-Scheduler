const CourseOfferingScript = require('./AssociatedCourseOffering.fix')
const Timeslot = require('../private/javascript/Timeslot')
const CourseOffering = require('../private/javascript/CourseOffering');
const Associations = require('../private/javascript/Associations');

async function loadTimeslots() {
  // Create course offering fixtures
  const courseObj = await CourseOfferingScript();

  const coObj1 = await CourseOffering.create(courseObj.offering1);
  const coObj2 =await CourseOffering.create(courseObj.offering2);

  // Setting up timeslots
  await Timeslot.sync({force: true});

  Associations.addAssociations();

  var TimeslotAObj = {
    courseOfferingID: coObj1,
    instructorID: coObj1.instructorID,
    classroomID: 2,// create
    term: coObj1.termID,
    starttime: '8:00',
    endtime: '9:00',
    day: 'Monday',
    group: coObj1.group
  }
  // creating timeslots
  // Group A top-left to bottom-right diagonal
  await Timeslot.create(TimeslotAObj); //8-9 Monday
  TimeslotAObj.day = 'Tuesday'
  TimeslotAObj.starttime = '9:00';
  TimeslotAObj.endtime = '10:00';
  await Timeslot.create(TimeslotAObj); //9-10 Tue
  TimeslotAObj.day = 'Wednesday'
  TimeslotAObj.starttime = '10:00';
  TimeslotAObj.endtime = '11:00';
  await Timeslot.create(TimeslotAObj); //10-11 Wed
  TimeslotAObj.day = 'Thursday'
  TimeslotAObj.starttime = '11:00';
  TimeslotAObj.endtime = '12:00';
  await Timeslot.create(TimeslotAObj); //11-12 Thur
  TimeslotAObj.day = 'Friday'
  TimeslotAObj.starttime = '13:00';
  TimeslotAObj.endtime = '14:00';
  await Timeslot.create(TimeslotAObj); //1-2 Fri
  TimeslotAObj.day = 'Friday'
  TimeslotAObj.starttime = '14:00';
  TimeslotAObj.endtime = '15:00';
  await Timeslot.create(TimeslotAObj); //2-3 Fri

  var TimeslotBObj = {
    courseOfferingID: coObj2,
    instructorID: coObj2.instructorID,
    classroomID: 2,// create 
    term: coObj2.termID,
    starttime: '14:00',
    endtime: '15:00',
    day: 'Monday',
    group: coObj2.group
  }
  await Timeslot.create(TimeslotBObj); //2-3 Monday
  TimeslotBObj.day = 'Tuesday'
  TimeslotBObj.starttime = '13:00';
  TimeslotBObj.endtime = '14:00';
  await Timeslot.create(TimeslotBObj); //1-2 Tue
  TimeslotBObj.day = 'Wednesday'
  TimeslotBObj.starttime = '11:00';
  TimeslotBObj.endtime = '12:00';
  await Timeslot.create(TimeslotBObj); //11-12 Wed
  TimeslotBObj.day = 'Thursday'
  TimeslotBObj.starttime = '10:00';
  TimeslotBObj.endtime = '11:00';
  await Timeslot.create(TimeslotBObj); //10-11 Thur
  TimeslotBObj.day = 'Friday'
  TimeslotBObj.starttime = '9:00';
  TimeslotBObj.endtime = '10:00';
  await Timeslot.create(TimeslotBObj); //9-10 Fri
  TimeslotBObj.day = 'Friday'
  TimeslotBObj.starttime = '8:00';
  TimeslotBObj.endtime = '9:00';
  await Timeslot.create(TimeslotBObj); //8-9 Fri









}