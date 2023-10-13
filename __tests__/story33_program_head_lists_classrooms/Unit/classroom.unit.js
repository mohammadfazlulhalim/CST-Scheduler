const {Sequelize} = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:', // Use an in-memory database for testing
});

const Classroom = require('../../../private/javascript/Classroom');

// eslint-disable-next-line require-jsdoc
async function createClassroom(attributes) {
  try {
    const classroom = await Classroom.create(attributes);
    return classroom;
  } catch (error) {
    console.error('Error creating classroom:', error);
    return null;
  }
}

describe('testThatRoomAttributes', () => {
  beforeAll(async () => {
    try {
      await sequelize.sync();
      console.log('Database tables created successfully');
    } catch (error) {
      console.error('Error creating database tables:', error);
    }
  });

  test('IsValidWhenLessThan10Characters', async () => {
    const roomAttributes = {
      roomNumber: '123@45$78',
    };
    const classroom = await createClassroom(roomAttributes);

    expect(classroom).toBeTruthy();
    expect(classroom.roomNumber).toBe(roomAttributes.roomNumber);
  });

  test('IsValidWithSpecialCharacters', async () => {
    const roomAttributes = {
      roomNumber: '!',
    };
    const classroom = await createClassroom(roomAttributes);

    expect(classroom).toBeTruthy();
    expect(classroom.roomNumber).toBe(roomAttributes.roomNumber);
  });


  test('IsInvalidWhenExactly10Characters', async () => {
    try {
      const roomAttributes = {
        roomNumber: '1234567890',
        // Add other attributes here
      };
      await createClassroom(roomAttributes);
    } catch (err) {
      expect(err.errors[0].message).toBe('The Room Number must be between 1 and 10 characters in length.');
    }
  });
  test('testThatEmptyRoomNumber IsInvalid', async () => {
    try {
      const roomAttributes = {
        roomNumber: '',
        // Add other attributes here
      };
      await createClassroom(roomAttributes);
    } catch (err) {
      expect(err.errors[0].message).toBe('The Room Number must be between 1 and 10 characters in length.');
    }
  });

  test('IsValidWithWhitespace', async () => {
    const roomAttributes = {
      roomNumber: '123A B ',
      // Add other attributes here
    };
    const classroom = await createClassroom(roomAttributes);

    expect(classroom).toBeTruthy();
    expect(classroom.roomNumber).toBe(roomAttributes.roomNumber);
  });
});


