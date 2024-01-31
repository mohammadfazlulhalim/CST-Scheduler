it('testThatCourseOfferingHasAssociations', () => {
  cy.visit('localhost:3000');
  cy.contains('Administration').click();
  cy.contains('Course Offerings').click();
  cy.url().should('include', '/courseOffering');

  // At the course offering page, now test course offerings

  // Creating a new entry
  cy.contains('Add New Course Offering').click();
  cy.get('#addModal').should('be.visible');

  // TODO: Check sort orders on all associated fields before starting

  cy.get('#createCO').should('be.disabled');
  cy.get('#cName').type('Mathematics of Computation');
  // Associated field
  cy.get('#cTerm').select('4-2023');
  cy.get('#createCO').should('be.disabled');
  cy.get('#cStartDate').type('2023-09-01');
  cy.get('#cEndDate').type('2023-12-15');
  cy.get('#cGroup').type('A');
  // Associated field
  cy.get('#cCourse').select('MATH282');
  cy.get('#createCO').should('be.disabled');
  // Associated field
  cy.get('#cInstructor').select('Grezsina')
  cy.get('#createCO').should('be.disabled');
  // Last associated field
  cy.get('#cProgam').select('CST');
  cy.get('#createCO').should('be.enabled');

  cy.get('#createCO').click();

  // created, now check that it exists
  // TODO get an unknown row, and check it contains all the data needed

  // TODO select a specific row not knowing ID, but knowing its contents
  // TODO: click edit button

  cy.get('#editModal').should('be.visible');

  // TODO: Check sort orders on all associated fields before starting

  // Changing associated fields
  cy.get('eTerm').select('2023-2');
  cy.get('eInstructor').select('Barrie');
  cy.get('eProgram').select('CNT');
  cy.get('#editCO').click();

  // TODO: Check that it changed all fields


  //TODO revert all changes at the end back to how they started




})