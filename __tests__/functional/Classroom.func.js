const Classroom = require('../../private/javascript/Classroom');
const {sequelize} = require('../../datasource');
const ClassroomController = require('../../routes/classroomRouter');


const request = require('supertest');
const app = require('../../app');
const {createClassroom, updateClassroom} = require('../../routes/classroomRouter');

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
    classroomInstance = {roomNumber: '239A', location: 'Saskatoon Main Campus'};
  });

  test('testThatValidRoomIsAddedToEmptyDatabase', async () => {
    const res = await request(app)
        .post('/classroom')
        .send(classroomInstance);
    expect(res.statusCode).toEqual(201);
    // expect(res.body).toHaveProperty('post')

    // now need to check that it exists in database
    // Maybe change these to queries using a where clause
    const addedClassroom = await Classroom.findOne({where: {roomNumber: classroomInstance.roomNumber}});
    expect(addedClassroom).toBeDefined();
    expect(addedClassroom.roomNumber).toBe(classroomInstance.roomNumber);
  });
  test('testThatValidRoomIsAddedToDatabase', async () => {
    classroomInstance.roomNumber = '239B';
    const res = await request(app)
        .post('/classroom')
        .send(classroomInstance);
    expect(res.statusCode).toEqual(201);
    // expect(res.body).toHaveProperty('post')

    const addedClassroom = await Classroom.findOne({where: {roomNumber: classroomInstance.roomNumber}});
    expect(addedClassroom).toBeDefined();
    expect(addedClassroom.roomNumber).toBe(classroomInstance.roomNumber);
  });

  test('testThatInValidRoomIsAddedToDatabase', async () =>{
    classroomInstance.roomNumber = '12345678901';
    const res = await request(app)
        .post('/classroom')
        .send(classroomInstance);
    expect(res.statusCode).toEqual(422);
    // expect(res.body).toHaveProperty('post')

    const addedClassroom = await Classroom.findOne({where: {roomNumber: classroomInstance.roomNumber}});
    expect(addedClassroom).toBeNull();
  });
});

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
    // clearing the database before each test
    await Classroom.destroy({
      where: {},
      truncate: true,
    });
    // creating an object literal with valid db properties, so that when I modify attributes it does not call validation
    const classTemp = await ClassroomController.createClassroom({roomNumber: '239A', location: 'Saskatoon Main Campus'});
    classroomInstance = {id: classTemp.pk, roomNumber: '239a', location: 'Saskatoon Main Campus'};
  });

  test('testThatValidRoomIsUpdatedInDatabase', async () => {
    let classroomList = await Classroom.findAll();
    const intialCountSize = classroomList.length;

    classroomInstance.roomNumber = '239B';
    classroomInstance.location = 'Regina Campus';
    const res = await request(app)
        .put('/classroom')
        .send(classroomInstance);
    expect(res.statusCode).toEqual(200);
    // expect(res.body).toHaveProperty('put');

    classroomList = await Classroom.findAll();
    // expect(classroomList.includes({roomNumber:'239B'})).toBeTruthy();

    const changedClassroom = await Classroom.findOne({where: {roomNumber: classroomInstance.roomNumber}});
    expect(changedClassroom).toBeDefined();
    expect(changedClassroom.roomNumber).toBe(classroomInstance.roomNumber);
    expect(changedClassroom.location).toBe(classroomInstance.location);
    expect(classroomList.length).toEqual(intialCountSize);
  });

  test('testThatInValidRoomIsNotUpdatedDatabase', async () =>{
    classroomInstance.roomNumber = '12345678901';
    const res = await request(app)
        .put('/classroom')
        .send(classroomInstance);
    expect(res.statusCode).toEqual(422);
    // expect(res.body).toHaveProperty('put')

    let changedClassroom = await Classroom.findOne({where: {roomNumber: classroomInstance.roomNumber}});
    expect(changedClassroom).toBeNull();
    changedClassroom = await Classroom.findByPk(classroomInstance.id);
    expect(changedClassroom).toBeDefined();
    expect(changedClassroom.roomNumber).not.toBe(classroomInstance.roomNumber);
  });
  test('testThatUnknownRoomErrorsWhenUpdated', async () =>{
    classroomInstance.id = 99;
    const res = await request(app)
        .put('/classroom')
        .send(classroomInstance);
    expect(res.statusCode).toEqual(404);
    // expect(res.body).toHaveProperty('put')

    const changedClassroom = await Classroom.findOne({where: {roomNumber: classroomInstance.roomNumber}});
    expect(changedClassroom).toBeNull();
  });
});

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
    // clearing the database before each test
    await Classroom.destroy({
      where: {},
      truncate: true,
    });
    // creating an object literal with valid db properties, so that when I modify attributes it does not call validation
    let classTemp = await ClassroomController.createClassroom({roomNumber: '239A'});
    classroomInstance1 = {id: classTemp.pk, roomNumber: '239A'};
    classTemp = await ClassroomController.createClassroom({roomNumber: '239B'});
    classroomInstance2 = {id: classTemp.pk, roomNumber: '239B'};
  });

  test('testThatRoomIsDeletedInDatabase', async () => {
    const res = await request(app)
        .delete('/classroom')
        .send(classroomInstance1);
    expect(res.statusCode).toEqual(200);
    // expect(res.body).toHaveProperty('delete')

    const classroomList = await Classroom.findAll();
    expect(classroomList.includes({id: classroomInstance1.id})).toBeFalsy();
  });

  test('testThatLastRoomIsDeletedInDatabase', async () => {
    const res = await request(app)
        .delete('/classroom')
        .send(classroomInstance2);
    expect(res.statusCode).toEqual(200);
    // expect(res.body).toHaveProperty('delete')

    const classroomList = await Classroom.findAll();
    expect(classroomList.includes({id: classroomInstance2.id})).toBeFalsy();
  });

  test('testThatUnknownRoomErrorsWhenDeleted', async () => {
    classroomInstance1.id=99;
    const res = await request(app)
        .delete('/classroom')
        .send(classroomInstance1);
    expect(res.statusCode).toEqual(404);
    // expect(res.body).toHaveProperty('delete')
  });
});

// Tests to check my wrapper emthods are returning properly formatted error messatgtes
describe('wrapperMethodsErrorTests', ()=>{
  let classroomInstance1;
  let classroomInstance2;
  let classroomInstance3;
  let response;

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
    // clearing the database before each test
    await Classroom.destroy({
      where: {},
      truncate: true,
    });
    // creating an object literal with valid db properties, so that when I modify attributes it does not call validation
    let classTemp = await ClassroomController.createClassroom({roomNumber: '239A', location: 'Saskatoon Main'});
    classroomInstance1 = {id: classTemp.pk, roomNumber: '239A', location: 'Saskatoon Main'};
    classTemp = await ClassroomController.createClassroom({roomNumber: '239B', location: 'Saskatoon Main'});
    classroomInstance2 = {id: classTemp.pk, roomNumber: '239B', location: 'Saskatoon Main'};
    classTemp = await ClassroomController.createClassroom({roomNumber: '239C', location: 'Saskatoon Main'});
    classroomInstance3 = {id: classTemp.pk, roomNumber: '239B', location: 'Saskatoon Main'};
  });

  test('createClassroomErrorMessages', async ()=>{
    // just roomNumber
    classroomInstance1.roomNumber='12345678901';
    response = await createClassroom(classroomInstance1);
    expect(response.error.roomNumber).toBeDefined();
    expect(response.error.location).not.toBeDefined();
    // just location
    classroomInstance2.location='A';
    response = await createClassroom(classroomInstance2);
    expect(response.error.roomNumber).not.toBeDefined();
    expect(response.error.location).toBeDefined();
    // both
    classroomInstance3.roomNumber='12345678901';
    classroomInstance3.location='A';
    response = await createClassroom(classroomInstance3);
    expect(response.error.roomNumber).toBeDefined();
    expect(response.error.location).toBeDefined();
  });

  test('updateClassroomErrorMessages', async ()=>{
    // just roomNumber
    classroomInstance1.roomNumber='12345678901';
    response = await updateClassroom(classroomInstance1);
    expect(response.error.roomNumber).toBeDefined();
    expect(response.error.location).not.toBeDefined();
    // just location
    classroomInstance2.location='A';
    response = await updateClassroom(classroomInstance2);
    expect(response.error.roomNumber).not.toBeDefined();
    expect(response.error.location).toBeDefined();
    // both
    classroomInstance3.roomNumber='12345678901';
    classroomInstance3.location='A';
    response = await updateClassroom(classroomInstance3);
    expect(response.error.roomNumber).toBeDefined();
    expect(response.error.location).toBeDefined();
  });
});
