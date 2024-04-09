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


  // Test that there are no conflicts and peroper messages are displayed.
  cy.get('#cTerm').select(2);
  cy.get('#generate').click();
  cy.get('#noConflictMessage').should('be.visible');

  // Test that Primary Instructors Show Up
  cy.get('#cTerm').select(3);
  cy.get('#generate').click();
  cy.get('#noConflictMessage').should('be.hidden');

  const ConflictList1 = ['COHS 190 - PrimaryInstructor', 'Group A', 'Program CST', 'Tuesday 8:00 - 9:00', 'Jan 1 - May 30'];
  const ConflictList2 = ['COHS 190 - PrimaryInstructor', 'Group B', 'Program CST', 'Tuesday 8:00 - 9:00', 'Jan 1 - May 30'];

  const ConflictList3 = ['COHS 190 - PrimaryInstructor', 'Group A', 'Program CST', 'Tuesday 8:00 - 9:00', 'Jan 1 - May 30'];
  const ConflictList4 = ['COHS 190 - PrimaryInstructor', 'Group A', 'Program CST', 'Tuesday 8:00 - 9:00', 'Jan 1 - May 30'];

  const ConflictList5 = ['COHS 190 - PrimaryInstructor', 'Group A', 'Program CST', 'Monday 3:00 - 4:00', 'Jan 1 - May 30'];
  const ConflictList6 = ['COHS 190 - PrimaryInstructor', 'Group A', 'Program CST', 'Monday 3:00 - 4:00', 'Jan 1 - May 30'];

  cy.get('#instructor1course1').contains(ConflictList1[0]);
  cy.get('#instructor1group1').contains(ConflictList1[1]);
  cy.get('#instructor1program1').contains(ConflictList1[2]);
  cy.get('#instructor1time1').contains(ConflictList1[3]);
  cy.get('#instructor1day1').contains(ConflictList1[4]);

  cy.get('#instructor1course2').contains(ConflictList2[0]);
  cy.get('#instructor1group2').contains(ConflictList2[1]);
  cy.get('#instructor1program2').contains(ConflictList2[2]);
  cy.get('#instructor1time2').contains(ConflictList2[3]);
  cy.get('#instructor1day2').contains(ConflictList2[4]);


  // Test that Secondary Instructors Show Up


  // Test that only the conflicts for the instructor and Term are displayed properly
});
