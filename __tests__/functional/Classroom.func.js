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
    // classroomInstance = await ClassroomController({roomNumber: '239A'});
    classroomInstance = {roomNumber: '239A'};
  });

  test('testThatValidRoomIsAddedToDatabase', async() => {
    const createResult = await ClassroomController.createClassroom(classroomInstance);
    expect(Classroom.findByPk(createResult.pk)).toBeDefined();
  });

  test('testThatInValidRoomIsAddedToDatabase', async() =>{
    classroomInstance.roomNumber = '12345678901';
    const createResult = await ClassroomController.createClassroom(classroomInstance);
    expect(createResult.roomNumberErr).toBe('error message');
    expect(Classroom.findByPk(createResult.pk)).toBeUndefined();
  })
})

describe('update', ()=>{
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
    classroomInstance = ClassroomController.createClassroom({roomNumber: '239A'});
  });

  test('testThatValidRoomIsUpdatedInDatabase', async() => {
    classroomInstance.roomNumber = '239B';
    const updateResult = await ClassroomController.updateClassroom(classroomInstance);
    expect(Classroom.findByPk(updateResult.id).roomNumber).toBe('239B');

  });

  test('testThatInValidRoomIsNotUpdatedDatabase', async() =>{
    classroomInstance.roomNumber = '12345678901';
    const updateResult = await ClassroomController.updateClassroom(classroomInstance);
    expect(updateResult.roomNumberErr).toBe('error message');
    expect(Classroom.findByPk(updateResult.id).roomNumber).toBe('239A');
  })
})

describe('delete', ()=>{
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
    classroomInstance = ClassroomController.createClassroom({roomNumber: '239A'});
  });

  test('testThatRoomIsDeletedInDatabase', async() => {
    const deleteResult = await ClassroomController.deleteClassroom(classroomInstance)
    expect(Classroom.findByPk(deleteResult.pk)).toBeUndefined();
  });
})
