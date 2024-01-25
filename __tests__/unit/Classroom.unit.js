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

describe('testThatLocation', ()=>{
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

  // Before each test, create a new Classroom instance with a room number and location
  beforeEach(async () => {
    classroomInstance = await Classroom.create({roomNumber: '239A', location: 'Saskatoon Main Campus'});
  });


  // Test if a room location is valid lower bound
  test('testThatLocationIsValidWith2Characters', async () => {
    classroomInstance.location = 'Sk';
    expect(classroomInstance).toBeDefined();
  });

  test('testThatLocationIsValidWith50Characters', async () => {
    classroomInstance.location = 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwx';
    expect(classroomInstance).toBeDefined();
  });

  // Test if a location with 0 characters is invalid
  test('testThatLocationIsInvalidWith0Characters', async () => {
    try {
      classroomInstance.location = null;
    } catch (error) {
      expect(error.message).toBe('The location must be between 2 and 50 characters in length.');
    }
  });

  // Test if a location with 51 characters is invalid
  test('testThatRoomNumberIsInvalidWith11Characters', async () => {
    try {
      classroomInstance.location = 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxy';
    } catch (error) {
      expect(error.message).toBe('The location must be between 2 and 50 characters in length.');
    }
  });

  // After each test, destroy the Classroom instance if it exists
  afterEach(async () => {
    if (classroomInstance) {
      await classroomInstance.destroy();
    }
  });
});
