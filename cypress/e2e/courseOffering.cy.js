it('testThatCourseOfferingHasAssociations', () => {
  cy.visit('localhost:3000');
  cy.contains('Administration').click();
  cy.contains('Course Offerings').click();
  cy.url().should('include', '/courseOffering');

  // At the course offering page, now test course offerings

  // Creating a new entry
  cy.contains('Add New Course Offering').click();
  cy.get('#addModal').should('be.visible');

  // TODO: Check sort orders on all associated fields before starting - See instructor.cy.js

  // Terms
  cy.get('#cTermSelect > option:nth-child(2)').contains('2024-5')
  cy.get('#cTermSelect > option:nth-child(3)').contains('2023-1')
  cy.get('#cTermSelect > option:nth-child(4)').contains('2023-4')
  cy.get('#cTermSelect > option:nth-child(5)').contains('2023-3')
  cy.get('#cTermSelect > option:nth-child(6)').contains('2023-6')
  cy.get('#cTermSelect > option:nth-child(7)').contains('2023-2')
  cy.get('#cTermSelect > option:nth-child(8)').contains('2023-4')
  // Program
  cy.get('#cProgramSelect > option:nth-child(2)').contains('ECE')
  cy.get('#cProgramSelect > option:nth-child(3)').contains('CNT')
  cy.get('#cProgramSelect > option:nth-child(4)').contains('CST')
  // Instructor
  cy.get('#cInstructorSelect > option:nth-child(2)').contains('Barrie')
  cy.get('#cInstructorSelect > option:nth-child(3)').contains('Basoalto')
  cy.get('#cInstructorSelect > option:nth-child(4)').contains('Benson')
  cy.get('#cInstructorSelect > option:nth-child(5)').contains('Caron')
  cy.get('#cInstructorSelect > option:nth-child(6)').contains('Grzesina')
  cy.get('#cInstructorSelect > option:nth-child(7)').contains('Holtslan')
  cy.get('#cInstructorSelect > option:nth-child(8)').contains('Kaban')
  cy.get('#cInstructorSelect > option:nth-child(9)').contains('Lahoda')
  cy.get('#cInstructorSelect > option:nth-child(10)').contains('New')
  cy.get('#cInstructorSelect > option:nth-child(11)').contains('Onishenko')
  cy.get('#cInstructorSelect > option:nth-child(12)').contains('Schmidt')


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
  cy.get('#cInstructor').select('Grzesina')
  cy.get('#createCO').should('be.disabled');
  // Last associated field
  cy.get('#cProgam').select('CST');
  cy.get('#createCO').should('be.enabled');

  cy.get('#createCO').click();

  // created, now check that it exists
  // TODO get an unknown row, and check it contains all the data needed - figure out which row it is and select it
  const newRow = '#tableBody > tr:nth-child(?)'
  cy.get(newRow + 'td:nth-child(1)').contains('Mathematics of Computation');
  cy.get(newRow + 'td:nth-child(2)').contains('2023-09-01');
  cy.get(newRow + 'td:nth-child(3)').contains('2023-12-15');
  cy.get(newRow + 'td:nth-child(4)').contains('A');
  cy.get(newRow + 'td:nth-child(5)').contains('MATH282');
  cy.get(newRow + 'td:nth-child(6)').contains('4-2023');
  cy.get(newRow + 'td:nth-child(7)').contains('Grzesina');
  cy.get(newRow + 'td:nth-child(8)').contains('CST');


  cy.get('2edit').click();
  cy.get('#editModal').should('be.visible');

  // TODO: Check sort orders on all associated fields before starting

  // Changing associated fields
  cy.get('eTerm').select('4-2023');
  cy.get('eInstructor').select('Barrie');
  cy.get('eProgram').select('CNT');
  cy.get('#editCO').click();

  cy.get('2Term').contains('2-2023');
  cy.get('2Instructor').contains('Barrie');
  cy.get('2Program').contains('CNT');


  //TODO revert all changes at the end back to how they started




})