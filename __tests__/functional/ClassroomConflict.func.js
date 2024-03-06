const request =require('supertest');
const app = require('../../app');
const Classroom= require('../../private/javascript/Classroom');
const Course= require('../../private/javascript/Course');
const Instructor= require('../../private/javascript/Instructor');
const CourseOffering= require('../../private/javascript/CourseOffering');
const Term= require('../../private/javascript/Term');
const Program= require('../../private/javascript/Program');
const TimeSlot=require('../../private/javascript/Timeslot');
const {sequelize} = require('../../dataSource');
const ClassroomConflictReportController= require('../../routes/classroomConflictReportRouter');
// the ClearAndDefineTables file exports the function for clearing and defining tables
const setupTables = require('../../fixtures/ClearAndDefineTables');


describe('Classroom Conflict Report Router', ()=>{

  const classroomObj = {
    roomNumber: '239A',
    location: 'Saskatoon Main Campus',
  };

  const classroomObj2 = {
    roomNumber: '241',
    location: 'Saskatoon Main Campus',
  };



  // use the imported function to clear and define tables from the established fixtures
  beforeAll( async () => {

    try {
      await sequelize.sync({force: true});
    } catch (error) {
      console.error('Error creating Timeslots table: ', error);
    }
    const createdClassroom = await Classroom.create(classroomObj);

    const courseObj =
      {
        courseCode: 'MATH282',
        courseName: 'Mathematics of Computation',
        courseNumCredits: 3,
        courseNumHoursPerWeek: 3,
      };

    const createdCourse = await Course.create(courseObj);

    const courseOfferingObj={name: 'Mathematics of Computation', startDate: '2023-03-06', endDate: '2023-05-24', group: 'A', CourseId: createdCourse.id};

    const createdCourseOffering = await CourseOffering.create(courseOfferingObj);

    const  instructorObj={firstName: 'Micheal', lastName: 'Grzesina', officeNum: '123B.1', phoneNum: '(306)-456-6859', email: 'grzesina@saskpolytech.ca'};

    const  createdInstructor = await  Instructor.create(instructorObj);
    const termObj= {termNumber: 3, startDate: '2023-05-01', endDate: '2023-05-24'};
    const createdTerm = await Term.create(termObj);

    const programObj= {      programAbbreviation: 'CST',      programName: 'Computer Systems Technology',    };
    const createdProgram = await Program.create(programObj);



    const timeslotObj1 =
      {startDate: '2023-05-01', endDate: '2023-05-24', startTime: '13:00', endTime: '14:00', day: 5, group: 'A'};
    const timeslotObj2 =
      {startDate: '2023-05-01', endDate: '2023-05-24', startTime: '13:00', endTime: '14:00', day: 5, group: 'A'};


    //below timeslots should have same information including the same classroom ID
    const createdTimeslot1 = await TimeSlot.create(timeslotObj1);
    await createdTimeslot1.setClassroom(createdClassroom);
    await createdTimeslot1.setTerm(createdTerm);
    await createdTimeslot1.setInstructor(createdInstructor);
    await createdTimeslot1.setProgram(createdProgram);
    await createdTimeslot1.setCourseOffering(createdCourseOffering);

    const createdTimeslot2 = await TimeSlot.create(timeslotObj2);
    await createdTimeslot2.setClassroom(createdClassroom);
    await createdTimeslot2.setTerm(createdTerm);
    await createdTimeslot2.setInstructor(createdInstructor);
    await createdTimeslot2.setProgram(createdProgram);
    await createdTimeslot2.setCourseOffering(createdCourseOffering);

  } );


  // Test endpoint for fetching classroom conflict reports

  it('testClassConflictURL', async ()=>{
    const response = await request(app)
        .get('/classroomConflictReport');
    // TODO statusCode has to be declared back in the router file to be stored in the response object
    expect(response.statusCode).toBe(200);
    // TODO additional assertion to check the structure of the response
  });

  //Expecting two timeslots having the same information against provided classroom
  it('testClassroomConflictsFound ', async ()=>{
    // TODO  TODO Provide necessary data to create a new report


    const classroomInstance = await Classroom.findOne({where: {roomNumber:classroomObj.roomNumber}});

    const resultConflictingTimeslots = await ClassroomConflictReportController.checkForConflict(classroomInstance);

    expect(resultConflictingTimeslots.length).toBe(2);
  });

  //Expecting no timeslots having the same information against provided classroom
  it('testClassroomConflictsNotFound ', async ()=>{
    const classroomInstance2 = await  Classroom.findOne({where: {roomNumber:classroomObj2.roomNumber}});

    const resultConflictingTimeslots2 = await ClassroomConflictReportController.checkForConflict(classroomInstance2);

    expect(resultConflictingTimeslots2.length).toBe(0);

  });

  // Clean up after tests
  afterAll(async ()=>{
    await sequelize.close(); // close the database connection
  });
});
