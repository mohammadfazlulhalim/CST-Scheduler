

it('testClassroomConflictsFound ', () => {
  // Opens main page - and go to Classroom Conflict Report Page
  cy.visit('localhost:3000');
  cy.contains('Reports').click();
  cy.get('.nav-item.dropdown .dropdown-menu a[href="/classroomConflictReport"]').click();
  cy.get('#classroomConflictModal').should('be.visible');
  // Assert that the URL has changed to the classroom Conflict Report page
  cy.url().should('include', '/classroomConflictReport');


  // Check that Enter button is disabled
  cy.get('#modalSubmit').should('be.disabled');

  // Check that classroom field can be entered
  cy.contains('Classroom');
  cy.get('#classroomSelect').select('239B');
  cy.get('#modalSubmit').should('not.be.disabled');
  cy.get('#modalSubmit').click();

  // modal for form disappears after submit button is clicked and sends a POST to the router
  cy.get('#classroomConflictModal').should('be.hidden');

  cy.get('h1').contains('Classroom Conflicts');

  const headingsForEachClassroomReportTable = ['Term', 'Course Code', 'Weekday', 'Start Time', 'End Time', 'Instructor'];

  // cy.get('#div239A table thead:first-child').each( (element, index, $list) => {
  //   // either place
  // } );

  // cy.get('#239aTable thead:first-child').should('have.text', headingsForEachClassroomReportTable[0]);
  // cy.get('#239aTable thead:nth-child(2)').should('have.text', headingsForEachClassroomReportTable[1]);
  // cy.get('#239aTable thead:nth-child(2)').should('have.text', headingsForEachClassroomReportTable[2]);
  // cy.get('#239aTable thead:nth-child(2)').should('have.text', 'Course Code');
  // cy.get('#239aTable thead:nth-child(2)').should('have.text', 'Course Code');

  for (let i = 0; i < headingsForEachClassroomReportTable.length; i++) {
    cy.get(`#239aTable thead:nth-child(${i})`).should('have.text', headingsForEachClassroomReportTable[i]);
  }

  // TODO determine if its better to use { [], [], ...} or [ [], [], ... )
  const expectedContent = [
    ['2023-4', 'COOS291', 'Monday', '8:00', '9:00', 'Wade Lahoda'],
  ];


});
