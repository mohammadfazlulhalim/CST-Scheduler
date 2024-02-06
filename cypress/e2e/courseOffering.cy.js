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
  cy.get('#cTerm > option:nth-child(2)').should('have.text', '2024-5')
  cy.get('#cTerm > option:nth-child(3)').should('have.text', '2023-1')
  cy.get('#cTerm > option:nth-child(4)').should('have.text', '2023-4')
  cy.get('#cTerm > option:nth-child(5)').should('have.text', '2023-3')
  cy.get('#cTerm > option:nth-child(6)').should('have.text', '2023-6')
  cy.get('#cTerm > option:nth-child(7)').should('have.text', '2023-2')
  cy.get('#cTerm > option:nth-child(8)').should('have.text', '2023-5')
  // Program
  cy.get('#cProgram > option:nth-child(2)').should('have.text', 'CNT')
  cy.get('#cProgram > option:nth-child(3)').should('have.text', 'CST')
  cy.get('#cProgram > option:nth-child(4)').should('have.text', 'ECE')
  // Instructor
  cy.get('#cInstructor > option:nth-child(2)').should('have.text', 'Barrie')
  cy.get('#cInstructor > option:nth-child(3)').should('have.text', 'Basoalto')
  cy.get('#cInstructor > option:nth-child(4)').should('have.text', 'Benson')
  cy.get('#cInstructor > option:nth-child(5)').should('have.text', 'Caron')
  cy.get('#cInstructor > option:nth-child(6)').should('have.text', 'Grzesina')
  cy.get('#cInstructor > option:nth-child(7)').should('have.text', 'Holtslan')
  cy.get('#cInstructor > option:nth-child(8)').should('have.text', 'Kaban')
  cy.get('#cInstructor > option:nth-child(9)').should('have.text', 'Lahoda')
  cy.get('#cInstructor > option:nth-child(10)').should('have.text', 'New')
  cy.get('#cInstructor > option:nth-child(11)').should('have.text', 'Onishenko')
  cy.get('#cInstructor > option:nth-child(12)').should('have.text', 'Schmidt')

  cy.get('#courses > option:nth-child(1)').should('have.value', 'CDBM280')
  cy.get('#courses > option:nth-child(2)').should('have.value', 'COHS280')
  cy.get('#courses > option:nth-child(3)').should('have.value', 'COOS291')
  cy.get('#courses > option:nth-child(4)').should('have.value', 'COOS293')
  cy.get('#courses > option:nth-child(5)').should('have.value', 'COOS294')
  cy.get('#courses > option:nth-child(6)').should('have.value', 'COSA280')
  cy.get('#courses > option:nth-child(7)').should('have.value', 'COSA290')
  cy.get('#courses > option:nth-child(8)').should('have.value', 'COSC292')
  cy.get('#courses > option:nth-child(9)').should('have.value', 'COSC295')
  cy.get('#courses > option:nth-child(10)').should('have.value', 'CPMG290 ')
  cy.get('#courses > option:nth-child(11)').should('have.value', 'CSEC280')
  cy.get('#courses > option:nth-child(12)').should('have.value', 'CWEB280')
  cy.get('#courses > option:nth-child(13)').should('have.value', 'MATH282')
  cy.get('#courses > option:nth-child(14)').should('have.value', 'SEM283')
  cy.get('#courses > option:nth-child(15)').should('have.value', 'TCOM291')



  cy.get('#cCourse').type('MATH282')
  // cy.get('#cCourse').select('MATH282');
  cy.get('#createCO').should('be.disabled');
  cy.get('#cName').should('have.value','Mathematics of Computation');
  // Associated field
  cy.get('#cTerm').select('2023-4');
  cy.get('#createCO').should('be.disabled');
  cy.get('#cStartDate').should('have.value','2023-08-01');
  cy.get('#cEndDate').should('have.value', '2023-12-01');
  cy.get('#cGroup').type('A');
  // Associated field

  cy.get('#createCO').should('be.disabled');
  // Associated field
  cy.get('#cInstructor').select('Grzesina')
  cy.get('#createCO').should('be.disabled');
  // Last associated field
  cy.get('#cProgram').select('CST');
  cy.get('#createCO').should('be.enabled');

  cy.get('#createCO').click();



  // created, now check that it exists
  // TODO switch to checking the entire row at once
  const newRow = '#tableBody > tr:nth-child(17) > '
  cy.get(newRow + 'td:nth-child(1)').should('have.text', 'Mathematics of Computation');
  cy.get(newRow + 'td:nth-child(2)').should('have.text', 'A');
  cy.get(newRow + 'td:nth-child(3)').should('have.text', 'MATH282');
  cy.get(newRow + 'td:nth-child(4)').should('have.text', '2023-4');
  cy.get(newRow + 'td:nth-child(5)').should('have.text', '2023-08-01');
  cy.get(newRow + 'td:nth-child(6)').should('have.text', '2023-12-01');
  cy.get(newRow + 'td:nth-child(7)').should('have.text', 'Micheal Grzesina');
  cy.get(newRow + 'td:nth-child(8)').should('have.text', 'CST');

  /*

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



   */

})