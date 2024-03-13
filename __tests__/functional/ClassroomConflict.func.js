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
const {instructor1} = require('../../fixtures/Instructor.fix');
const {program1} = require('../../fixtures/Program.fix');

/*
* VALIDATION ERROR THROWN:- Functional testing - while running Timeslot.create( {
      {startDate: '2023-05-01', endDate: '2023-05-24', startTime: '8:00', endTime: '9:00', day: 3, group: 'B'};
}

switching startTime and endTime to 08:00, 09:00 respectively resolves this...
THOUGH, if we run loaddb - it doesn't complain about the same validation that stops our test.
*
* */

describe('Classroom Conflict Report Router', ()=>{
  const classroomObj = {
    roomNumber: '239A',
    location: 'Saskatoon Main Campus',
  };

  const classroomObj2 = {
    roomNumber: '241',
    location: 'Saskatoon Main Campus',
  };

  // term objects for creating term instances
  const termObj= {termNumber: 3, startDate: '2023-05-01', endDate: '2023-05-24'};
  const termObj2={termNumber: 4, startDate: '2023-08-01', endDate: '2023-12-01'};

  let createdTerm;
  let createdTerm2;


  // use the imported function to clear and define tables from the established fixtures
  beforeAll( async () => {
    try {
      await sequelize.sync({force: true});
    } catch (error) {
      console.error('Error creating Timeslots table: ', error);
    }
    const createdClassroom = await Classroom.create(classroomObj);
    const createdClassroom2 = await Classroom.create(classroomObj2);
    const courseObj =
      {
        courseCode: 'MATH282',
        courseName: 'Mathematics of Computation',
        courseNumCredits: 3,
        courseNumHoursPerWeek: 3,
      };

    const createdCourse = await Course.create(courseObj);

    const courseObj2 =
        {
          courseCode: 'COHS190',
          courseName: 'Hardware',
          courseNumCredits: 3,
          courseNumHoursPerWeek: 3,
        };
    const createdCourse2 = await Course.create(courseObj2);
    const courseOfferingObj={name: 'Mathematics of Computation', startDate: '2023-03-06', endDate: '2023-05-24', group: 'A', CourseId: createdCourse.id};

    const createdCourseOffering = await CourseOffering.create(courseOfferingObj);
    const courseOfferingObj2={name: 'Hardware', startDate: '2023-03-06', endDate: '2023-05-24', group: 'A', CourseId: createdCourse2.id};
    const createdCourseOffering2 = await CourseOffering.create(courseOfferingObj2);

    // Instructor Created in DB
    const instructorObj={firstName: 'Micheal', lastName: 'Grzesina', officeNum: '123B.1', phoneNum: '(306)-456-6859', email: 'grzesina@saskpolytech.ca'};
    const createdInstructor = await Instructor.create(instructorObj);


    // TERMS created in database
    createdTerm = await Term.create(termObj);
    createdTerm2 = await Term.create(termObj2);

    const programObj= {programAbbreviation: 'CST', programName: 'Computer Systems Technology'};
    const createdProgram = await Program.create(programObj);


    const timeslotObj1 =
      {id: 1, startDate: '2023-05-01', endDate: '2023-05-24', startTime: '13:00', endTime: '14:00', day: 5, group: 'A'};
    const timeslotObj2 =
      {id: 2, startDate: '2023-05-01', endDate: '2023-05-24', startTime: '13:00', endTime: '14:00', day: 5, group: 'A'};

    const timeslotObj3 =
        {id: 3, startDate: '2023-05-01', endDate: '2023-05-24', startTime: '13:00', endTime: '14:00', day: 4, group: 'A'};

    const timeslotObj4 =
        {id: 4, startDate: '2023-05-01', endDate: '2023-05-24', startTime: '13:00', endTime: '14:00', day: 4, group: 'A'};

    const timeslotObj5 =
        {id: 5, startDate: '2023-05-01', endDate: '2023-05-24', startTime: '13:00', endTime: '14:00', day: 4, group: 'A'};

    const timeslotObj6 =
        {id: 6, startDate: '2023-05-01', endDate: '2023-05-24', startTime: '13:00', endTime: '14:00', day: 3, group: 'A'};
    const timeslotObj7 =
      {id: 7, startDate: '2023-05-01', endDate: '2023-05-24', startTime: '08:00', endTime: '09:00', day: 3, group: 'B'};
    const timeslotObj8 =
        {id: 8, startDate: '2023-05-01', endDate: '2023-05-24', startTime: '08:00', endTime: '09:00', day: 3, group: 'A'};


    // below timeslots should have same information including the same classroom ID
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
    await createdTimeslot2.setCourseOffering(createdCourseOffering2);

    const createdTimeslot3 = await TimeSlot.create(timeslotObj3);
    await createdTimeslot3.setClassroom(createdClassroom);
    await createdTimeslot3.setTerm(createdTerm);
    await createdTimeslot3.setInstructor(createdInstructor);
    await createdTimeslot3.setProgram(createdProgram);
    await createdTimeslot3.setCourseOffering(createdCourseOffering);

    const createdTimeslot4 = await TimeSlot.create(timeslotObj4);
    await createdTimeslot4.setClassroom(createdClassroom);
    await createdTimeslot4.setTerm(createdTerm);
    await createdTimeslot4.setInstructor(createdInstructor);
    await createdTimeslot4.setProgram(createdProgram);
    await createdTimeslot4.setCourseOffering(createdCourseOffering);

    const createdTimeslot5 = await TimeSlot.create(timeslotObj5);
    await createdTimeslot5.setClassroom(createdClassroom);
    await createdTimeslot5.setTerm(createdTerm);
    await createdTimeslot5.setInstructor(createdInstructor);
    await createdTimeslot5.setProgram(createdProgram);
    await createdTimeslot5.setCourseOffering(createdCourseOffering2);

    const createdTimeslot6 = await TimeSlot.create(timeslotObj6);
    await createdTimeslot6.setClassroom(createdClassroom);
    await createdTimeslot6.setTerm(createdTerm);
    await createdTimeslot6.setInstructor(createdInstructor);
    await createdTimeslot6.setProgram(createdProgram);
    await createdTimeslot6.setCourseOffering(createdCourseOffering);


    const createdTimeslot7 = await TimeSlot.create(timeslotObj7);
    await createdTimeslot7.setClassroom(createdClassroom2);
    await createdTimeslot7.setTerm(createdTerm);
    await createdTimeslot7.setInstructor(createdInstructor);
    await createdTimeslot7.setProgram(createdProgram);
    await createdTimeslot7.setCourseOffering(createdCourseOffering);


    const createdTimeslot8 = await TimeSlot.create(timeslotObj8);
    await createdTimeslot8.setClassroom(createdClassroom2);
    await createdTimeslot8.setTerm(createdTerm2);
    await createdTimeslot8.setInstructor(createdInstructor);
    await createdTimeslot8.setProgram(createdProgram);
    await createdTimeslot8.setCourseOffering(createdCourseOffering);
  } );

  /**
   * Helper for creating new Timeslot
   *
   * @param objTS
   * @param classroom1Arg
   * @param term1Arg
   * @param instructor1Arg
   * @param program1Arg
   * @param courseoffering1Arg
   * @return {Promise<void>}
   */
  async function createNewTimeslotWithAssociations(objTS, classroom1Arg, term1Arg, instructor1Arg, program1Arg, courseoffering1Arg) {
    const createdTimeslot = await TimeSlot.create(objTS);
    await createdTimeslot.setClassroom(classroom1Arg);
    await createdTimeslot.setTerm(term1Arg);
    await createdTimeslot.setInstructor(instructor1Arg);
    await createdTimeslot.setProgram(program1Arg);
    await createdTimeslot.setCourseOffering(courseoffering1Arg);
  }


  // Test endpoint for fetching classroom conflict reports

  it('testClassConflictURL', async ()=>{
    const response = await request(app)
        .get('/classroomConflictReport');
    // TODO statusCode has to be declared back in the router file to be stored in the response object
    expect(response.statusCode).toBe(200);
    // TODO additional assertion to check the structure of the response
  });

  // Expecting two timeslots having the same information against provided classroom
  it('testClassroomConflictsFound ', async ()=>{
    // TODO  TODO Provide necessary data to create a new report


    const classroomInstance = await Classroom.findOne({where: {roomNumber: classroomObj.roomNumber}});
    const termInstance1 = await Term.findOne({where: {termNumber: termObj.termNumber}});
    const termInstance2 = await Term.findOne({where: {termNumber: termObj2.termNumber}});

    // const resultConflictingTimeslots = await ClassroomConflictReportController.checkForConflict(classroomInstance);

    const expectedAnswerTimeslots = [
      {
        id: 3,
        startTime: '13:00',
        endTime: '14:00',
        day: 4,
        CourseOfferingId: 1,
      },
    ];

    // TODO implement parameter change router as well!
    // sends in the term and classroom to the function in router
    const results = await ClassroomConflictReportController.generateTimeslotsTest(classroomInstance, createdTerm);
    console.log('>>>>>searching for results from generateTimeslotsTest');
    console.log(results);

    expect(resultConflictingTimeslots.length).toBe(2);
  });

  // Expecting no timeslots having the same information against provided classroom
  it('testClassroomConflictsNotFound ', async ()=>{
    const classroomInstance2 = await Classroom.findOne({where: {roomNumber: classroomObj2.roomNumber}});

    // const resultConflictingTimeslots2 = await ClassroomConflictReportController.checkForConflict(classroomInstance2);

    expect(resultConflictingTimeslots2.length).toBe(0);
  });

  // Clean up after tests
  afterAll(async ()=>{
    await sequelize.close(); // close the database connection
  });
});
