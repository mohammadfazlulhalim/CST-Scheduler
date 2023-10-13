const Classroom = require('../../../private/javascript/Classroom');
Classroom.sequelize.storage = ':memory:';

let classroomInstance;

/**
 * Create database tables for testing.
 */
async function createDatabaseTables() {
  try {
    await Classroom.sync();
    console.log('Database tables created successfully');
  } catch (error) {
    console.error('Error creating database tables:', error);
  }
}

describe('TestRoomAttributes', () => {
  beforeAll(async () => {
    const defaultRoomAttributes = {
      roomNumber: '1234',
    };
    classroomInstance = await Classroom.build(defaultRoomAttributes);
    await createDatabaseTables();
  });

  test('IsValidWhenLessThan10Characters', async () => {
    // Test if a room number with less than 10 characters is valid
    classroomInstance.set({roomNumber: '123@45$78'});
    await classroomInstance.save();
    const updatedClassroom = await Classroom.findOne({
      where: {roomNumber: '123@45$78'},
    });
    expect(updatedClassroom).toBeTruthy();
  });

  test('IsValidWithSpecialCharacters', async () => {
    // Test if a room number with special characters is valid
    classroomInstance.set({roomNumber: '!'});
    await classroomInstance.save();
    const updatedClassroom = await Classroom.findOne({
      where: {roomNumber: '!'},
    });
    expect(updatedClassroom).toBeTruthy();
  });

  test('IsInvalidWhenExactly10Characters', async () => {
    // Test if a room number with exactly 10 characters is invalid
    classroomInstance.set({roomNumber: '1234567890'});
    try {
      await classroomInstance.save();
    } catch (err) {
      expect(err.errors[0].message).toBe('The Room Number must be between 1 and 10 characters in length.');
    }
  });

  test('IsInvalidWhenEmptyRoomNumber', async () => {
    // Test if an empty room number is invalid
    classroomInstance.set({roomNumber: ''});
    try {
      await classroomInstance.save();
    } catch (err) {
      expect(err.errors[0].message).toBe('The Room Number must be between 1 and 10 characters in length.');
    }
  });

  test('IsValidWithWhitespace', async () => {
    // Test if a room number with whitespace is valid
    classroomInstance.set({roomNumber: '123A B '});
    await classroomInstance.save();
    const updatedClassroom = await Classroom.findOne({
      where: {roomNumber: '123A B '},
    });
    expect(updatedClassroom).toBeTruthy();
  });

  afterAll(async () => {
    if (classroomInstance) {
      await classroomInstance.destroy();
    }
  });
});
