const EXPECTEDROOMS = ['239A', '239B', '239a', '240B', '241', '242C'];

/**
 * Test for alternate instructor and classroom
 * Relies on existing schedule tests for full coverage
 */
it('testThatTimeslotHasAlternateInstructorAndClassroom', () => {

  // Visiting the page
  cy.visit('localhost:3000');
  cy.contains('Schedule Builder').click();
  cy.get('#programSelect').select('CST');
  cy.get('#termSelect').select('2023-3'); //TODO: Change display for this
  cy.get('#groupSelect').select('4');
  cy.get('#modalSubmit').click();

  // Check room dropdown is sorted numerically
  cy.get('#classroomSelect')
  for (let i=0; i < EXPECTEDROOMS.length;i++) {
    let nChild = i+1;
    cy.get('#classroomSelect > option:mth-child(' + nChild + ')').should('have.text', EXPECTEDROOMS[i]);
  }

  // Check that Course Offerings Hardware has alternate instructors, but Seminar does not
  cy.get('#Hardware-A').contains('Ben Benson');
  cy.get('#Hardware-A').contains('Hardware');
  cy.get('#Hardware-A').contains('2023-09-01 - 2023-12-15');
  cy.get('#Hardware-A').contains('Alternate: Wade Lahoda');
  cy.get('#Seminar-A').contains('Ron New');
  cy.get('#Seminar-A').contains('Seminar');
  cy.get('#Seminar-A').contains('2023-09-01 - 2023-12-15');
  cy.get('#Seminar-A').contains.not('Alternate');

  // Select Room 241
  cy.get('classroomSelect').select('241');

  // Save both Hardware and Seminar, making sure that both have 241 selected
  cy.get('#Hardware-A').click();
  // Saving Hardware in the four corners
  cy.get('0-1-A').click(); // Monday 8am
  cy.get('7-1-A').click(); // Monday 3pm


})
