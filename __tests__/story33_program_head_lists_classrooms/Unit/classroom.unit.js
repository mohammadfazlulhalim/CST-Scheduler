const Classroom = require('../../../private/javascript/Classroom');
const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('sqlite::memory:');

describe('testThatRoomNumber', () => {
  beforeAll(async () => {
    try {
      await sequelize.sync();
      console.log('Instructors table created successfully');
    } catch (error) {
      console.error('Error creating Instructors table:', error);
    }
  });

  test('IsValidWhenLessThan10Characters', async () => {
    const roomNumber = '123@45$78';
    const classroom = await Classroom.create({roomNumber});

    expect(classroom).toBeTruthy();
    expect(classroom.roomNumber).toBe(roomNumber);
  });

  test('IsValidWithSpecialCharacters', async () => {
    const roomNumber = '!';
    const classroom = await Classroom.create({roomNumber});

    expect(classroom).toBeTruthy();
    expect(classroom.roomNumber).toBe(roomNumber);
  });

  test('IsValidWithSingleCharacter', async () => {
    const roomNumber = 'AB#12';
    const classroom = await Classroom.create({roomNumber});

    expect(classroom).toBeTruthy();
    expect(classroom.roomNumber).toBe(roomNumber);
  });

  test('IsInvalidWhenExactly10Characters', async () => {
    try {
      await Classroom.create({roomNumber: '1234567890'});
    } catch (err) {
      expect(err.errors[0].message).toBe('The Room Number must be between 1 and 10 characters in length.');
    }
  });

  test('testThatEmptyRoomNumber IsInvalid', async () => {
    try {
      await Classroom.create({roomNumber: ''});
    } catch (err) {
      expect(err.errors[0].message).toBe('The Room Number must be between 1 and 10 characters in length.');
    }
  });

  test('IsValidWithWhitespace', async () => {
    const roomNumber = '123A B ';
    const classroom = await Classroom.create({roomNumber});

    expect(classroom).toBeTruthy();
    expect(classroom.roomNumber).toBe(roomNumber);
  });
});
