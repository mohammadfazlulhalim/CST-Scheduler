const conflicts = [
  {
    course: 'COHS 190 - PrimaryInstructor',
    group: 'Group A',
    program: 'Program CST',
    time: 'Monday 8:00 - 9:00',
    date: 'September 1 - December 15',
  },
  {
    course: 'COHS 190 - PrimaryInstructor',
    group: 'Group B',
    program: 'Program CST',
    time: 'Monday 8:00 - 9:00',
    date: 'September 1 - December 15',
  },
  {
    course: 'MATH 282 - Primary Instructor',
    group: 'Group A',
    program: 'Program CST',
    time: 'Tuesday 8:00 - 9:00',
    date: 'September 1 - December 15',
  },
  // Add more conflicts as needed
];
const secondaryConflicts = [
  {
    course: 'MATH 282 - Secondary Instructor',
    group: 'Group A',
    program: 'Program CST',
    time: 'Tuesday 3:00 - 4:00',
    date: 'September 1 - December 15',
  },
  {
    course: 'MATH 282 - Secondary Instructor',
    group: 'Group B',
    program: 'Program CST',
    time: 'Tuesday 3:00 - 4:00',
    date: 'September 1 - December 15',
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

  // Schedule the Conflicts
  cy.visit('localhost:3000');
  cy.contains('Schedule Builder').click();
  cy.get('#programSelect').select('CST');
  cy.get('#termSelect').select('2022-2023 - Term 3');
  cy.get('#groupSelect').select('4');
  cy.get('#modalSubmit').click();
  cy.get('#Hardware-A').click();
  cy.get('#0-1-A').click();
  cy.get('#Test\\ Course-A').click();
  cy.get('#0-2-A').click();
  cy.get('#btnB').click();
  cy.get('#Hardware-B').click();
  cy.get('#0-1-B').click();
  cy.get('#Test\\ Course-B').click();
  cy.get('#0-2-B').click();


  // Navigate to instructor conflicts.
  cy.visit('localhost:3000');
  cy.contains('Conflicts').click();
  cy.contains('Instructor Conflicts').click();

  // Tests that the term dropdown contains all Terms in the proper format
  const termList = ['2023-2024 - Term 1', '2023-2024 - Term 4', '2023-2024 - Term 5', '2022-2023 - Term 2', '2022-2023 - Term 3', '2022-2023 - Term 5', '2022-2023 - Term 6'];
  termList.forEach((term) => {
    cy.get('#cTerm').should('contain', term);
  });


  // Test that there are no conflicts and proper messages are displayed.
  cy.get('#cTerm').select(2);
  cy.get('#generate').click();
  cy.get('#noConflictMessage').should('be.visible');

  // Test that Primary Instructors Show Up
  cy.get('#cTerm').select(3);
  cy.get('#generate').click();
  cy.get('#noConflictMessage').should('be.hidden');

  // Loop through conflicts array and perform Cypress checks
  conflicts.forEach((conflict, index) => {
    const instructorId = index < 2 ? 1 : 11; // Determine which set of instructors to use
    checkConflict(conflict, instructorId, index % 2);
  });

  // Additional test for secondary instructors
  // Loop through secondary conflicts array and perform Cypress checks
  secondaryConflicts.forEach((conflict, index) => {
    const instructorId = 8; // Use secondary instructors
    checkConflict(conflict, instructorId, index);
  });
});


// Define a function to reduce repetition in Cypress commands
// eslint-disable-next-line require-jsdoc
function checkConflict(conflict, instructorId, index) {
  cy.get(`#instructor${instructorId}course${index + 1}`).contains(conflict.course);
  cy.get(`#instructor${instructorId}group${index + 1}`).contains(conflict.group);
  cy.get(`#instructor${instructorId}program${index + 1}`).contains(conflict.program);
  cy.get(`#instructor${instructorId}time${index + 1}`).contains(conflict.time);
  cy.get(`#instructor${instructorId}day${index + 1}`).contains(conflict.date);
}
