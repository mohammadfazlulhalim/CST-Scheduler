const Classroom = require('../../private/javascript/Classroom');
const {sequelize} = require('../../datasource');
const {ClassroomController} = require('../../routes/classroom')

describe('create', ()=>{
  let classroomInstance;

  // Before all tests, create the Classroom table in the database
  beforeAll(async () => {
    try {
      await sequelize.sync();
      console.log('Classroom table created successfully');
    } catch (error) {
      console.error('Error creating Classroom table:', error);
    }
  });

  // Valid classroom
  beforeEach(async () => {
    classroomInstance = await ClassroomController({roomNumber: '239A'});
  });


  // Test that a valid room has been added to the database
  test('testThatValidRoomIsAddedToDatabase', async() => {
    const pk = classroomInstance.primaryKey;
    expect(Classroom.findByPk(pk)).toBeDefined();
  });

  test('testThatInValidRoomIsAddedToDatabase', async() =>{
    try {
      await Classroom.create({roomNumber: '12345678901'});
    } catch (error) {
      // Going to do nothing with the catch, but needed
    }
    expect(Classroom.findOne(roomNumber='12345678901')).toBeUndefined();
  })
})
