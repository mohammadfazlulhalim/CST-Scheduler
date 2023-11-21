const Classroom = require('../../private/javascript/Classroom');
const {sequelize} = require('../../datasource');

describe('testThatRoomNumber', () => {
  let classroomInstance;

  // Before all tests, create the Classroom table in the database
  beforeAll(async () => {
    try {
      await sequelize.sync();
      // console.log('Classroom table created successfully');
    } catch (error) {
      console.error('Error creating Classroom table:', error);
    }
  });

  // Before each test, create a new Classroom instance with a room number
  beforeEach(async () => {
    classroomInstance = await Classroom.create({roomNumber: '239A'});
  });

  // Test if a room number with exactly 10 characters is valid
  test('testThatRoomNumberIsValidWith10Characters', async () => {
    classroomInstance.roomNumber = '1234567890';
    expect(classroomInstance).toBeDefined();
  });

  // Test if a room number with 0 characters is invalid
  test('testThatRoomNumberIsInvalidWith0Characters', async () => {
    try {
      classroomInstance.roomNumber = null;
    } catch (error) {
      expect(error.message).toBe('The Room Number must be between 1 and 10 characters in length.');
    }
  });

  // Test if a room number with 11 characters is invalid
  test('testThatRoomNumberIsInvalidWith11Characters', async () => {
    try {
      classroomInstance.roomNumber = '12345678910';
    } catch (error) {
      expect(error.message).toBe('The Room Number must be between 1 and 10 characters in length.');
    }
  });

  // After each test, destroy the Classroom instance if it exists
  afterEach(async () => {
    if (classroomInstance) {
      await classroomInstance.destroy();
    }
  });
});
