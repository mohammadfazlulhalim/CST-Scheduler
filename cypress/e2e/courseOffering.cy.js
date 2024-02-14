it('testThatCourseOfferingHasAssociations', () => {
  cy.visit('localhost:3000');
  cy.contains('Administration').click();
  cy.contains('Course Offerings').click();
  cy.url().should('include', '/courseOffering');

  // At the course offering page, now test course offerings

  // Creating a new entry
  cy.contains('Add New Course Offering').click();
  cy.get('#addModal').should('be.visible');

  // Terms
  let termList = ['2024-01-02 - 5', '2023-08-01 - 1', '2023-08-01 - 4', '2023-05-01 - 3', '2023-05-01 - 6', '2023-01-01 - 2', '2023-01-01 - 5'];
  for (let i = 0; i < termList.length; i++) {
    let nChild = i + 2;
    cy.get('#cTerm > option:nth-child(' + nChild + ')').should('have.text', termList[i]);
  }

  // Program
  let programList = ['CNT', 'CST', 'ECE'];
  for (let i = 0; i < programList.length; i++) {
    let nChild = i + 2;
    cy.get('#cProgram > option:nth-child(' + nChild + ')').should('have.text', programList[i]);
  }

  // Instructor
  let instructorList = ['Barrie', 'Basoalto', 'Benson', 'Caron', 'Grzesina', 'Holtslan', 'Kaban', 'Lahoda', 'New', 'Onishenko', 'Schmidt'];
  for (let i = 0; i < instructorList.length; i++) {
    let nChild = i + 2;
    cy.get('#cInstructor > option:nth-child(' + nChild + ')').should('have.text', instructorList[i]);
  }

  // Courses
  let courseList = ['CDBM280', 'COHS280', 'COOS291', 'COOS293', 'COOS294', 'COSA280', 'COSA290', 'COSC292', 'COSC295', 'CPMG290 ', 'CSEC280', 'CWEB280', 'MATH282', 'SEM283', 'TCOM291'];
  for (let i = 0; i < instructorList.length; i++) {
    let nChild = i + 1;
    cy.get('#courses > option:nth-child(' + nChild + ')').should('have.value', courseList[i]);
  }


  // Adding new course offering
  cy.get('#cCourse').type('MATH282');
  cy.get('#createCO').should('be.disabled');
  cy.get('#cName').should('have.value', 'Mathematics of Computation');
  cy.get('#cCourseInvalid').should('have.text', '');
  // Associated field
  cy.get('#cTerm').select('2023-08-01 - 4');
  cy.get('#createCO').should('be.disabled');
  cy.get('#cStartDate').should('have.value', '2023-08-01');
  cy.get('#cEndDate').should('have.value', '2023-12-01');
  cy.get('#cGroup').type('A');
  // Associated field

  cy.get('#createCO').should('be.disabled');
  // Associated field
  cy.get('#cInstructor').select('Grzesina');
  cy.get('#createCO').should('be.disabled');
  // Last associated field
  cy.get('#cProgram').select('CST');
  cy.get('#createCO').should('be.enabled');

  cy.get('#createCO').click();
  cy.get('#addModal').should('be.hidden');


  // created, now check that it exists
  const newRow = '#tableBody > tr:nth-child(17) > ';
  const newRow2 = '#tableBody > tr:nth-child(17)';
  cy.get(newRow2).should('have.text',
    '\n                    Mathematics of Computation\n                    A\n                    MATH282\n                    2023-4\n                    2023-08-01\n                    2023-12-01\n                    Micheal Grzesina\n                    CST\n                    \n                        Edit\n                        \n                        Delete\n                        \n                    \n                ');

  // Now test the update
  // click the edit button to open modal
  cy.get(newRow + 'td:nth-child(9) > button:nth-child(1)').click();
  cy.get('#editModal').should('be.visible');

  // Checking the order of the dropdowns
  // Terms
  for (let i = 0; i < termList.length; i++) {
    let nChild = i + 2;
    cy.get('#cTerm > option:nth-child(' + nChild + ')').should('have.text', termList[i]);
  }

  // Program
  for (let i = 0; i < programList.length; i++) {
    let nChild = i + 2;
    cy.get('#cProgram > option:nth-child(' + nChild + ')').should('have.text', programList[i]);
  }

  // Instructor
  for (let i = 0; i < instructorList.length; i++) {
    let nChild = i + 2;
    cy.get('#cInstructor > option:nth-child(' + nChild + ')').should('have.text', instructorList[i]);
  }

  // checking the fields to make sure they pre-filled correctly
  cy.get('#eName').should('have.value', 'Mathematics of Computation');
  cy.get('#eTerm').find('option:selected').should('have.text', '2023-08-01 - 4');
  cy.get('#eStartDate').should('have.value', '2023-08-01');
  cy.get('#eEndDate').should('have.value', '2023-12-01');
  cy.get('#eGroup').should('have.value', 'A');
  cy.get('#eProgram').find('option:selected').should('have.text', 'CST');
  cy.get('#eInstructor').find('option:selected').should('have.text', 'Grzesina');

  // Changing associated fields
  cy.get('#eTerm').select('2023-01-01 - 5');

  cy.get('#eStartDate').should('have.value', '2023-01-01');
  cy.get('#eEndDate').should('have.value', '2023-04-01');


  cy.get('#eInstructor').select('Barrie');
  cy.get('#eProgram').select('CNT');
  cy.get('#editCO').click();
  cy.get('#editModal').should('be.hidden');

  cy.get(newRow2).should('have.text',
    '\n                    Mathematics of Computation\n                    A\n                    MATH282\n                    2023-5\n                    2023-01-01\n                    2023-04-01\n                    Bryce Barrie\n                    CNT\n                    \n                        Edit\n                        \n                        Delete\n                        \n                    \n                ');
  cy.get(newRow + 'td:nth-child(9) > button:nth-child(2)').click();
  cy.get('#deleteCO').click();

  // prefilling out add modal to get ready for further testing
  cy.contains('Add New Course Offering').click();
  cy.get('#addModal').should('be.visible');

  cy.get('#cCourse').type('MATH282');
  cy.get('#cCourseInvalid').should('have.text', '');
  cy.get('#cName').should('have.value', 'Mathematics of Computation');
  cy.get('#cTerm').select('2023-08-01 - 4');
  cy.get('#cGroup').type('A');
  cy.get('#cInstructor').select('Grzesina');
  cy.get('#cProgram').select('CST');
  cy.get('#createCO').should('be.enabled');

  // adding inerrant data
  cy.get('#cCourse').clear().type('MAATH282');
  cy.get('#createCO').should('be.disabled');
  cy.get('#cName').should('have.value', '');
  cy.get('#cCourseInvalid').should('have.text', 'Please select a Course Code from the list');

  // switching to different valid data
  cy.get('#cCourse').clear().type('COOS291');
  cy.get('#cName').should('have.value', 'Advanced Operating Systems');
  cy.get('#cCourseInvalid').should('have.text', '');
  cy.get('#createCO').should('be.enabled');





});