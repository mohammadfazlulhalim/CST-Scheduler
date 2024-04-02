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


describe('Classroom Conflict Report Router', ()=>{
  jest.setTimeout(10000);
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


    // We setup TermId, courseOfferingId,InstructorId, ProgramId, classroomId  in the time slot object using createNewTimeslotWithAssociations helper function
    const createdTimeslot1 = await createNewTimeslotWithAssociations
    (timeslotObj1, createdClassroom, createdTerm, createdInstructor, createdProgram, createdCourseOffering );
    const createdTimeslot2 = await createNewTimeslotWithAssociations
    (timeslotObj2, createdClassroom, createdTerm, createdInstructor, createdProgram, createdCourseOffering2 );
    const createdTimeslot3 = await createNewTimeslotWithAssociations
    (timeslotObj3, createdClassroom, createdTerm, createdInstructor, createdProgram, createdCourseOffering );
    const createdTimeslot4 =await createNewTimeslotWithAssociations
    (timeslotObj4, createdClassroom, createdTerm, createdInstructor, createdProgram, createdCourseOffering );
    const createdTimeslot5 = await createNewTimeslotWithAssociations
    (timeslotObj5, createdClassroom, createdTerm, createdInstructor, createdProgram, createdCourseOffering2 );
    const createdTimeslot6 = await createNewTimeslotWithAssociations
    (timeslotObj6, createdClassroom, createdTerm, createdInstructor, createdProgram, createdCourseOffering2 );
    const createdTimeslot7 =await createNewTimeslotWithAssociations
    (timeslotObj7, createdClassroom2, createdTerm, createdInstructor, createdProgram, createdCourseOffering2 );
    const createdTimeslot8 = await createNewTimeslotWithAssociations
    (timeslotObj8, createdClassroom2, createdTerm, createdInstructor, createdProgram, createdCourseOffering2 );
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
    // statusCode has to be declared back in the router file to be stored in the response object
    expect(response.statusCode).toBe(200);
    expect(response.notFound).toBe(false);
    expect(response.type).toBe('text/html');
  });


  // Expecting timeslots having the same information against provided classroom and term
  it('testClassroomConflictsFound ', async ()=>{
    const classroomInstance = await Classroom.findOne({where: {roomNumber: classroomObj.roomNumber}});
    const termInstance1 = await Term.findOne({where: {termNumber: termObj.termNumber}});

    // sends in the term and classroom to the function in router
    const results = await ClassroomConflictReportController.generateTimeslotsTest(classroomInstance, termInstance1);
    // expected result should be a 2D array of length
    expect(results.length).toBe(3);

    // we will check all objects inside the 2D Array
    for (let i=0; i<results.length; i++) {
      for (let j=0; j<results[i].length; j++) {
        expect(results[i][j]).toHaveProperty('startDate');
        expect(results[i][j]).toHaveProperty('endDate');
        expect(results[i][j]).toHaveProperty('startTime');
        expect(results[i][j]).toHaveProperty('endTime');
        expect(results[i][j]).toHaveProperty('day');
        expect(results[i][j]).toHaveProperty('startTime');
        // the common attribute in all object should be classroomId and termId
        expect((results[i][j]).ClassroomId).toBe(1);
        expect((results[i][j]).Classroom.roomNumber).toBe('239A');
        expect((results[i][j]).Classroom.location).toBe('Saskatoon Main Campus');
        expect((results[i][j]).TermId).toBe(1);
        expect((results[i][j]).Term.startDate).toBe('2023-05-01');
        expect((results[i][j]).Term.endDate).toBe('2023-05-24');
      }
    }
  });

  // Expecting no timeslots having the same information against provided classroom
  it('testClassroomConflictsNotFound ', async ()=>{
    const classroomInstance2 = await Classroom.findOne({where: {roomNumber: classroomObj2.roomNumber}});
    const termInstance2 = await Term.findOne({where: {termNumber: termObj2.termNumber}});

    const results = await ClassroomConflictReportController.generateTimeslotsTest(classroomInstance2, termInstance2);

    expect(results.length).toBe(0);
  });


  // Clean up after tests
  afterAll(async ()=>{
    await sequelize.close(); // close the database connection
  });
});
