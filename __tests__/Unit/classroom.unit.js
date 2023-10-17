const Classroom = require('../../private/javascript/Classroom');
const {sequelize}= require('../../datasource');

let classroomInstance;

describe('testThatRoomNumber', () => {
  beforeAll(async () => {
    const defaultRoomAttributes = {
      roomNumber: '1234',
    };
    classroomInstance = await Classroom.build(defaultRoomAttributes);
    await createDatabaseTables();
  });

  test('IsValidWhenLessThan10CharactersAndMoreThan0', async () => {
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

  test('IsValidWithSingleCharacter', async () => {
    // Test if a room number with a single character is valid
    classroomInstance.set({roomNumber: '1'});
    await classroomInstance.save();
    const updatedClassroom = await Classroom.findOne({
      where: {roomNumber: '1'},
    });
    expect(updatedClassroom).toBeTruthy();
  });

  test('IsInvalidWhenExactly11Characters', async () => {
    // Test if a room number with exactly 10 characters is invalid
    classroomInstance.set({roomNumber: '12345678901'});
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
