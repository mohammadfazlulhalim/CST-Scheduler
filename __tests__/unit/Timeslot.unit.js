const {sequelize} = require('../../dataSource');
const CourseOffering = require('../../private/javascript/CourseOffering');
const Course = require('../../private/javascript/Course');
const Classroom = require('../../private/javascript/Classroom');
const Timeslot = require('../../private/javascript/Timeslot.js');
const Term = require('../../private/javascript/Term');
const Instructor = require('../../private/javascript/Instructor');
const Program = require('../../private/javascript/Program');
const Associations = (require('../../private/javascript/Associations'));
const CreateTables = require('../../fixtures/ClearAndDefineTables');
const instructor1 = require('../../fixtures/Instructor.fix').instructor1;
const courseOffering1 = require('../../fixtures/CourseOffering.fix').courseOffering1;
const term1 = require('../../fixtures/Term.fix').term1;
const course1 = require('../../fixtures/Course.fix').course1;
const program1 = require('../../fixtures/Program.fix').program1;
const classroom1 = require('../../fixtures/Classroom.fix').classroom1;
const timeSlot1 = require('../../fixtures/Timeslot.fix').timeSlot1


let timeSlotInstance;

describe('timeslotStartTime', () => {
  beforeAll(async function() {
    await sequelize.sync();
    await CreateTables();

    Associations.addAssociations();
    await Course.create(course1);
    await Term.create(term1);
    await Instructor.create(instructor1);
    await Program.create(program1);
    await CourseOffering.create(courseOffering1);
    await Classroom.create(classroom1);
  });
  beforeEach(async () => {
    timeSlotInstance = timeSlot1;
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

  test('testDayUpperInvalid', async () => {
    try {
      timeSlotInstance.endTime = '17:00';
      timeSlotInstance.day = 7;

      const createdTimeSlot = await Timeslot.create(timeSlotInstance);
      fail();
    } catch (error) {
      expect(error.errors.length).toBe(1);
      expect(error.errors[0].message)
          .toBe('Invalid Day for TimeSlot');
    }
  });

  test('testDayLowerValid', async() => {
    timeSlotInstance.day = 0;
    const createdTimeSlot = await Timeslot.create(timeSlotInstance);
    expect(createdTimeSlot).toBeTruthy();
    expect(createdTimeSlot.day).toBe(0);
  });

  test('testDayLowerInvalid', async() => {
    try {
      timeSlotInstance.day = -2;

      const createdTimeSlot = await Timeslot.create(timeSlotInstance);
      fail();
    } catch (error) {
      expect(error.errors.length).toBe(1);
      expect(error.errors[0].message)
        .toBe('Invalid Day for TimeSlot');
    }
    timeSlotInstance.day = 0;
  })

  test('testDayUpperValid', async() => {
    timeSlotInstance.day = 6;
    const createdTimeSlot = await Timeslot.create(timeSlotInstance);
    expect(createdTimeSlot).toBeTruthy();
    expect(createdTimeSlot.day).toBe(6);
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

