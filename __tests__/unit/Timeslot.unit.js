const {sequelize} = require('../../dataSource');

const {testConst} = require('../../constants');

const CourseOffering = require('../../private/javascript/CourseOffering');
const Classroom = require('../../private/javascript/Classroom');
const Timeslot = require('../../private/javascript/Timeslot.js');
const Term = require('../../private/javascript/Term');
const Instructor = require('../../private/javascript/Instructor');
const Program = require('../../private/javascript/Program');
const Associations = (require('../../private/javascript/Associations'));
const CreateTables = require('../../fixtures/ClearAndDefineTables');

let timeSlotInstance;

describe('timeslotStartTime', () => {
  beforeAll(async function() {
    await sequelize.sync();
    await CreateTables();

    Associations.addAssociations();
    await Term.create(testConst.term1);
    await Instructor.create(testConst.instructor1);
    await Program.create(testConst.program1);
    await CourseOffering.create(testConst.courseOffering1);
    await Classroom.create(testConst.classroom1);
  });
  beforeEach(async () => {
    timeSlotInstance = testConst.timeSlot1;
  });

  afterEach(async function() {
    await Timeslot.truncate();
  });

  // lower bound 24hrs - 00:00
  test('testStartTimeLowerBoundValid', async () => {
    try {
      timeSlotInstance.startTime = '00:00';

      const createdTimeSlot = await Timeslot.create(timeSlotInstance);
      expect(createdTimeSlot).toBeTruthy();
      expect(createdTimeSlot.startTime).toBe('00:00');
    } catch (error) {
      console.error(error.message);
    }
  });

  // testing valid at upper bound 23:59
  test('testStartTimeUpperBound24HrsValid', async () => {
    try {
      timeSlotInstance.startTime = '23:59';

      const createdTimeSlot = await Timeslot.create(timeSlotInstance);
      expect(createdTimeSlot).toBeTruthy();
      expect(createdTimeSlot.startTime).toBe('23:59');
    } catch (error) {
      console.error(error.message);
    }
  });

  // testing invalid at 24:00 since max is 23:59
  test('testStartTimeUpperBoundHourInvalid', async () => {
    try {
      timeSlotInstance.startTime = '24:00';

      const createdTimeSlot = await Timeslot.create(timeSlotInstance);
      fail();
    } catch (error) {
      expect(error.errors.length).toBe(1);
      expect(error.errors[0].message)
          .toBe('Invalid Start Time for TimeSlot');
    }
  });

  // random string
  test('testStartTimeInvalid', async () => {
    try {
      timeSlotInstance.startTime = 'non-numeric';

      const createdTimeSlot = await Timeslot.create(timeSlotInstance);
      fail();
    } catch (error) {
      expect(error.errors.length).toBe(1);
      expect(error.errors[0].message)
          .toBe('Invalid Start Time for TimeSlot');
    }
  });

  test('testEndTimeValid', async () => {
    try {
      timeSlotInstance.startTime = '16:00';
      timeSlotInstance.endTime = '17:00';

      const createdTimeSlot = await Timeslot.create(timeSlotInstance);
      expect(createdTimeSlot).toBeTruthy();
      expect(createdTimeSlot.endTime).toBe('17:00');
    } catch (error) {
      console.error(error.message);
    }
  });

  test('testEndTimeInvalid', async () => {
    try {
      timeSlotInstance.endTime = 'non-numeric';

      const createdTimeSlot = await Timeslot.create(timeSlotInstance);
      fail();
    } catch (error) {
      expect(error.errors.length).toBe(1);
      expect(error.errors[0].message)
          .toBe('Invalid end Time for TimeSlot');
    }
  });


  test('testDayValid', async () => {
    try {
      timeSlotInstance.endTime = '17:00';
      timeSlotInstance.day = 2;

      const createdTimeSlot = await Timeslot.create(timeSlotInstance);
      expect(createdTimeSlot).toBeTruthy();
      // TODO: check that the day is Tuesday
      expect(createdTimeSlot.day).toBe(2);
    } catch (error) {
      console.error(error.message);
    }
  });

  test('testDayInvalid', async () => {
    try {
      timeSlotInstance.day = 7;

      const createdTimeSlot = await Timeslot.create(timeSlotInstance);
      fail();
    } catch (error) {
      expect(error.errors.length).toBe(1);
      expect(error.errors[0].message)
          .toBe('Invalid Day for TimeSlot');
    }
  });

  test('testNoAssociationsValid', async () => {
    try {
      timeSlotInstance.day = 3;
      timeSlotInstance.termID = '';
      timeSlotInstance.courseOfferingID = '';
      timeSlotInstance.programID = '';
      timeSlotInstance.roomID = '';
      timeSlotInstance.instructorID = '';

      const createdTimeSlot = await Timeslot.create(timeSlotInstance);
      expect(createdTimeSlot).toBeTruthy();
    } catch (error) {
      console.error(error.message);
    }
  });
});

