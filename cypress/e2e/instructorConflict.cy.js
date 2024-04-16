const courses = [
  {
    courseName: 'Test Course2 - Alternative Instructor',
    time: 'Friday 15:00 - 16:00',
    date: '2023-05-01 to 2023-05-31',
    program: 'CST',
    group: 'A',
    classroom: '239A',
  },
  {
    courseName: 'Test Course2 - Alternative Instructor',
    time: 'Friday 15:00 - 16:00',
    date: '2023-05-01 to 2023-05-31',
    program: 'CST',
    group: 'B',
    classroom: '239A',
  },
  {
    courseName: 'Test Course - Primary Instructor',
    time: 'Tuesday 08:00 - 09:00',
    date: '2023-05-05 to 2023-05-20',
    program: 'CST',
    group: 'A',
    classroom: '239A',
  },
  {
    courseName: 'Test Course - Alternative Instructor',
    time: 'Tuesday 08:00 - 09:00',
    date: '2023-05-01 to 2023-05-31',
    program: 'CST',
    group: 'B',
    classroom: '239A',
  },
  {
    courseName: 'Hardware - Primary Instructor',
    time: 'Monday 08:00 - 09:00',
    date: '2023-09-01 to 2023-12-15',
    program: 'CST',
    group: 'A',
    classroom: '239A',
  },
  {
    courseName: 'Hardware - Primary Instructor',
    time: 'Monday 08:00 - 09:00',
    date: '2023-09-01 to 2023-12-15',
    program: 'CST',
    group: 'B',
    classroom: '239A',
  },
];

beforeEach(()=>{
  cy.exec('node electron-db-reset.js');
});

it('testThatTermAutogeneratesCourseOfferings', () => {
  // Creating Fake Data for Test

  // Create Courseofferings
  cy.viewport(1920, 1080);
  cy.visit('localhost:3000');
  cy.contains('Administration').click();
  cy.contains('Course Offerings').click();
  cy.get('#openCreateModal').click();
  cy.get('#cCourse').type('MATH282');
  cy.wait(100);
  cy.get('#cName').clear().type('Test Course');
  cy.wait(100);
  cy.get('#cCourseInvalid').should('have.text', '');
  cy.wait(100);
  cy.get('#cTerm').select('2022-2023 - Term 3');
  cy.wait(100);
  cy.get('#cprimaryInstructor').select('Barrie');
  cy.wait(200);
  cy.get('#calternativeInstructor').select('Lahoda');
  cy.wait(200);
  cy.get('#cProgram').select('CST');
  cy.get('#increment').click();
  cy.get('#createCO').click();

  cy.get('#30edit').click();
  cy.wait(100);

  cy.get('#eStartDate').clear().type('2023-05-05');
  cy.wait(100);
  cy.get('#eEndDate').clear().type('2023-05-20');
  cy.wait(100);
  cy.get('#eprimaryInstructor').select('Lahoda');
  cy.wait(200);
  cy.get('#ealternativeInstructor').select('Caron');
  cy.get('#editCO').click();


  cy.get('#openCreateModal').click();
  cy.get('#cCourse').type('COHS190');
  cy.wait(100);
  cy.get('#cName').clear().type('Test Course2');
  cy.wait(100);
  cy.get('#cCourseInvalid').should('have.text', '');
  cy.wait(100);
  cy.get('#cTerm').select('2022-2023 - Term 3');
  cy.wait(100);
  cy.get('#cprimaryInstructor').select('Barrie');
  cy.wait(200);
  cy.get('#calternativeInstructor').select('Kaban');
  cy.wait(200);
  cy.get('#cProgram').select('CST');
  cy.get('#increment').click();
  cy.get('#createCO').click();

  cy.get('#33edit').click();
  cy.wait(100);
  cy.get('#eprimaryInstructor').select('New');
  cy.wait(200);
  cy.get('#ealternativeInstructor').select('Kaban');
  cy.get('#editCO').click();


  // Schedule the Conflicts
  cy.visit('localhost:3000');
  cy.contains('Schedule Builder').click();
  cy.get('#programSelect').select('CST');
  cy.get('#termSelect').select('2022-2023 - Term 3');
  cy.get('#groupSelect').select('2');
  cy.get('#modalSubmit').click();


  cy.get('#Hardware-A').click();
  cy.wait(100);
  cy.get('#0-1-A').click();
  cy.wait(100);

  cy.get('#Test\\ Course-A').click();
  cy.wait(100);
  cy.get('#0-2-A').click();
  cy.wait(100);
  cy.get('#Seminar-A').click();
  cy.wait(100);
  cy.get('#3-1-A').click();
  cy.wait(100);
  cy.get('#4-1-A').click();
  cy.wait(100);
  cy.get('#Test\\ Course2-A').click();
  cy.wait(100);
  cy.get('#7-5-A').click();
  cy.wait(100);

  cy.get('#btnB').click();
  cy.wait(100);
  cy.get('#Hardware-B').click();
  cy.get('#0-1-B').click();
  cy.wait(100);
  cy.get('#Test\\ Course-B').click();
  cy.get('#0-2-B').click();
  cy.wait(100);
  cy.get('#Test\\ Course2-B').click();
  cy.get('#7-5-B').click();
  cy.wait(100);

  // Navigate to instructor conflicts.
  cy.visit('localhost:3000');
  cy.contains('Conflicts').click();
  cy.contains('Instructor Conflict').click();

  // Tests that the term dropdown contains all Terms in the proper format
  const termList = ['', '2023-2024 - Term 1', '2023-2024 - Term 4', '2023-2024 - Term 5', '2022-2023 - Term 2', '2022-2023 - Term 3', '2022-2023 - Term 5', '2022-2023 - Term 6'];
  termList.forEach((term) => {
    cy.get('#filterTerm').should('contain', term);
  });


  // Test that there are no conflicts and proper messages are displayed.
  cy.get('#filterTerm').select(2);
  cy.get('#generate').click();
  cy.get('#message').contains('No instructor conflicts exist within selected term');

  // Test that Primary Instructors Show Up
  cy.get('#filterTerm').select(5);
  cy.get('#generate').click();


  courses.forEach((course, index) => {
    const customId = `#customid-${index}`;

    // Use template literals to dynamically select elements and perform assertions
    cy.get(`${customId}-courseName`).contains(course.courseName);
    cy.get(`${customId}-time`).contains(course.time);
    cy.get(`${customId}-date`).contains(course.date);
    cy.get(`${customId}-program`).contains(course.program);
    cy.get(`${customId}-group`).contains(course.group);
    cy.get(`${customId}-classroom`).contains(course.classroom);
  });
});

