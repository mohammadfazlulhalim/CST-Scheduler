const Classroom = require('../../private/javascript/Classroom');
const {sequelize} = require('../../datasource');
const ClassroomController = require('../../routes/classroom')
const request = require('supertest')
const app = require('../../app')

describe('create', ()=>{
  let classroomInstance;

  // Before all tests, create the Classroom table in the database
  beforeAll(async () => {
    try {
      await sequelize.sync();
    } catch (error) {
      console.error('Error creating Classroom table: ', error);
    }
  });

  // Valid classroom
  beforeEach(async () => {
    classroomInstance = {roomNumber: '239A'};
  });

  test('testThatValidRoomIsAddedToEmptyDatabase', async() => {
    const res = await request(app)
      .post('/classroom')
      .send(classroomInstance)
    expect(res.statusCode).toEqual(201);
    // expect(res.body).toHaveProperty('post')

    // now need to check that it exists in database
    // Maybe change these to queries using a where clause
    const addedClassroom = await Classroom.findOne({where: {roomNumber: classroomInstance.roomNumber}});
    expect(addedClassroom).toBeDefined();
    expect(addedClassroom.roomNumber).toBe(classroomInstance.roomNumber);
  });
  test('testThatValidRoomIsAddedToDatabase', async() => {
    classroomInstance.roomNumber = '239B';
    const res = await request(app)
      .post('/classroom')
      .send(classroomInstance)
    expect(res.statusCode).toEqual(201);
    // expect(res.body).toHaveProperty('post')

    const addedClassroom = await Classroom.findOne({where: {roomNumber: classroomInstance.roomNumber}});
    expect(addedClassroom).toBeDefined();
    expect(addedClassroom.roomNumber).toBe(classroomInstance.roomNumber);
  });

  test('testThatInValidRoomIsAddedToDatabase', async() =>{
    classroomInstance.roomNumber = '12345678901';
    const res = await request(app)
      .post('/classroom')
      .send(classroomInstance)
    expect(res.statusCode).toEqual(400);
    // expect(res.body).toHaveProperty('post')

    const addedClassroom = await Classroom.findOne({where: {roomNumber: classroomInstance.roomNumber}});
    expect(addedClassroom).toBeNull();
  })
})

describe('update', ()=>{
  let classroomInstance;

  // Before all tests, create the Classroom table in the database
  beforeAll(async () => {
    try {
      await sequelize.sync();
    } catch (error) {
      console.error('Error creating Classroom table: ', error);
    }
  });

  // Valid classroom
  beforeEach(async () => {
    classroomInstance = ClassroomController.createClassroom({roomNumber: '239A'});
  });

  test('testThatValidRoomIsUpdatedInDatabase', async() => {
    classroomInstance.roomNumber = '239B';
    const res = await request(app)
      .put('/classroom')
      .send(classroomInstance)
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('put');

    const classroomList = await Classroom.findAll();
    expect(classroomList.includes({roomNumber:'239B'})).toBeTruthy();

    const changedClassroom = await Classroom.findOne({where: {roomNumber: classroomInstance.roomNumber}});
    expect(changedlassroom).toBeDefined();
    expect(changedClassroom.roomNumber).toBe(classroomInstance.roomNumber);
  });

  test('testThatInValidRoomIsNotUpdatedDatabase', async() =>{
    classroomInstance.roomNumber = '12345678901';
    const res = await request(app)
      .put('/classroom')
      .send(classroomInstance)
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('put')

    let changedClassroom = await Classroom.findOne({where: {roomNumber: classroomInstance.roomNumber}})
    expect(changedClassroom).toBeNull();
    expect(changedClassroom.roomNumber).not.toBe(classroomInstance.roomNumber);
    changedClassroom = await Classroom.findOne({where: {roomNumber: '239A'}})
    expect(changedClassroom).toBeDefined();
  })
  test('testThatUnknownRoomErrorsWhenUpdated', async() =>{
    classroomInstance.id = 99;
    const res = await request(app)
      .put('/classroom')
      .send(classroomInstance)
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('put')

    const changedClassroom = await Classroom.findOne({where: {roomNumber: classroomInstance.roomNumber}})
    expect(changedClassroom).toBeNull();

  })
})

describe('delete', ()=>{
  let classroomInstance1;
  let classroomInstance2;

  // Before all tests, create the Classroom table in the database
  beforeAll(async () => {
    try {
      await sequelize.sync();
    } catch (error) {
      console.error('Error creating Classroom table: ', error);
    }
  });

  // Valid classroom
  beforeEach(async () => {
    classroomInstance1 = ClassroomController.createClassroom({roomNumber: '239A'});
    classroomInstance2 = ClassroomController.createClassroom({roomNumber: '239B'});
  });

  test('testThatRoomIsDeletedInDatabase', async() => {
    const res = await request(app)
      .delete('/classroom')
      .send(classroomInstance1)
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('delete')

    const classroomList = await Classroom.findAll();
    expect(classroomList.includes({id:classroomInstance1.id})).toBeFalsy();
  });

  test('testThatLastRoomIsDeletedInDatabase', async() => {
    const res = await request(app)
      .delete('/classroom')
      .send(classroomInstance2)
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('delete')

    const classroomList = await Classroom.findAll();
    expect(classroomList.includes({id:classroomInstance2.id})).toBeFalsy();
  });

  test('testThatUnknownRoomErrorsWhenDeleted', async() => {
    classroomInstance1.id=99;
    const res = await request(app)
      .delete('/classroom')
      .send(classroomInstance1)
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('delete')
  });
})
