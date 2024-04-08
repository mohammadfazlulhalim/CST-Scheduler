beforeEach(()=>{
  cy.exec('node electron-db-reset.js');
});

it('testThatTermAutogeneratesCourseOfferings', () => {
  // Creating Fake Data for Test

  // Create Courseofferings
  cy.viewport(1920, 1080);
  cy.visit('localhost:3000');
  cy.contains('Administration').click();
  cy.contains('Term').click();
  cy.url().should('include', '/term');


  cy.get('#cCourse').type('MATH282');
  cy.wait(100);
  cy.get('#cName').should('have.value', 'Mathematics of Computation');
  cy.wait(100);
  cy.get('#cName').clear().type('Test Course');
  cy.wait(100);
  cy.get('#cCourseInvalid').should('have.text', '');
  cy.wait(100);
  // Associated field
  cy.get('#cTerm').select('2023-2024 - Term 4');
  cy.wait(100);
  cy.get('#cStartDate').should('have.value', '2023-08-01');
  cy.wait(100);
  cy.get('#cEndDate').should('have.value', '2023-12-01');
  cy.wait(200);
  // Associated field
  cy.get('#cprimaryInstructor').select('Grzesina');
  cy.wait(200);
  cy.get('#calternativeInstructor').select('Barrie');
  cy.wait(200);
  // Last associated field
  cy.get('#cProgram').select('CST');
  cy.get('#createCO').should('be.enabled');
  cy.get('#increment').click();

  cy.get('#createCO').click();
  cy.get('#addModal').should('be.hidden');

  // Schedule the Conflicts


  // Navigate to instructor conflicts.


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


  // Test that Secondary Instructors Show Up


  // Test that only the conflicts for the instructor and Term are displayed properly
});
