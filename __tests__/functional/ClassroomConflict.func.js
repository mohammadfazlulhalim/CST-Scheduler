const request =require('supertest');
const app = require('../../app');
const Classroom= require('../../private/javascript/Classroom');
const Course= require('../../private/javascript/Course');
const CourseOffering= require('../../private/javascript/CourseOffering');
const TimeSlot=require('../../private/javascript/Timeslot');
const {sequelize} = require('../../dataSource');
const ClassroomConflictReportController= require('../../routes/classroomConflictReportRouter');
// the ClearAndDefineTables file exports the function for clearing and defining tables
const setupTables = require('../../fixtures/ClearAndDefineTables');


describe('Classroom Conflict Report Router', ()=>{
  // Before all tests clear the tables in the database
  beforeAll(async ()=>{
    try {
      await sequelize.sync({force: true});
    } catch (error) {
      console.error('Error creating Timeslots table: ', error);
    }
  });

  // use the imported function to clear and define tables from the established fixtures
  beforeEach( async () => {
    const classroomObj = {
      roomNumber: '239A',
      location: 'Saskatoon Main Campus',
    };
    const createdClassroom = await Classroom.create(classroomObj);

    const courseObj =
      {
        courseCode: 'MATH282',
        courseName: 'Mathematics of Computation',
        courseNumCredits: 3,
        courseNumHoursPerWeek: 3,
      };

    const createdCourse = await Course.create(courseObj);

    const timeslotObj1 =
      {startDate: '2023-03-06', endDate: '2023-05-24', startTime: '13:00', endTime: '14:00', day: 5, group: 'A'};
    const timeslotObj2 =
      {startDate: '2023-03-06', endDate: '2023-05-24', startTime: '13:00', endTime: '14:00', day: 5, group: 'A'};

    const createdTimeslot1 = await TimeSlot.create(timeslotObj);
    createdTimeslot.setClassroom(createdClassroom);
  } );


  // Test endpoint for fetching classroom conflict reports

  it('testClassConflictURL', async ()=>{
    const response = await request(app)
        .get('/classroomConflictReport');
    // TODO statusCode has to be declared back in the router file to be stored in the response object
    expect(response.statusCode).toBe(200);
    // TODO additional assertion to check the structure of the response
  });

  it('testClassroomConflictsFound ', async ()=>{
    // TODO  TODO Provide necessary data to create a new report


    const newClassroom = await Classroom.create(classroomObj);

    const class239a = Classroom.create({
      where: {roomNumber: roomNumber239a},
    });


    const timeslotTemp = await TimeSlot.create(

    );

    timeslotTemp.setClassroom(classroom);

    const response = await request(app)
        .send(newReportData);
    expect(response.statusCode).toEqual(201);

    const resultConflictingTimeslots = ClassroomConflictReportController.checkForConflict(class239a);

    expect();
  });

  it('testClassroomConflictsNotFound ', async ()=>{
    const newReportData = {
      // TODO Provide necessary data to create a new report
      roomNumber: '241',
    };
    const response = await request(app)
        .send(newReportData);
    expect(response.statusCode).toEqual(404);
  });

  // Clean up after tests
  afterAll(async ()=>{
    await sequelize.close(); // close the database connection
  });
});
