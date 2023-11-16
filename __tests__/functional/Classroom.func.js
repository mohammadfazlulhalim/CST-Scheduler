const Classroom = require('../../private/javascript/Classroom');
const {sequelize} = require('../../datasource');
const {ClassroomController} = require('../../routes/classroom')
const request = require('supertest')
const app = require('../../app')

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
    const res = await request(app)
      .post('/classroom')
      .send(classroomInstance)
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('post')
  });

  test('testThatInValidRoomIsAddedToDatabase', async() =>{
    classroomInstance.roomNumber = '12345678901';
    const res = await request(app)
      .post('/classroom')
      .send(classroomInstance)
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('post')
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
    const res = await request(app)
      .update('/classroom')
      .send(classroomInstance)
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('update')


  });

  test('testThatInValidRoomIsNotUpdatedDatabase', async() =>{
    classroomInstance.roomNumber = '12345678901';
    const res = await request(app)
      .update('/classroom')
      .send(classroomInstance)
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('update')
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
    const res = await request(app)
      .delete('/classroom')
      .send(classroomInstance)
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('delete')
  });
})
