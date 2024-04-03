beforeEach(()=>{
  cy.exec('node electron-db-reset.js');
})

it('testThatCourseOfferingHasAssociations', () => {
  cy.viewport(1920, 1080);
  cy.visit('localhost:3000');
  cy.contains('Administration').click();
  cy.contains('Course Offerings').click();
  cy.url().should('include', '/courseOffering');

  // At the course offering page, now test course offerings

  // Test the select box
  cy.get('#filterTerm').select(1);
  cy.get('#dataTable').within(() => {
    cy.get('tr:nth-child(21) > td').eq(0).should('contain.text', 'Mathematics of Computation');
    cy.get('tr:nth-child(21) > td').eq(1).should('contain.text', 'C');
    cy.get('tr:nth-child(21) > td').eq(2).should('contain.text', 'MATH282');
    cy.get('tr:nth-child(21) > td').eq(3).should('contain.text', '2023-1');
    cy.get('tr:nth-child(21) > td').eq(4).should('contain.text', '2023-09-01');
    cy.get('tr:nth-child(21) > td').eq(5).should('contain.text', '2023-10-31');
    cy.get('tr:nth-child(21) > td').eq(6).should('contain.text', 'Bryce Barrie');
    cy.get('tr:nth-child(21) > td').eq(7).should('contain.text', '');
    cy.get('tr:nth-child(21) > td').eq(8).should('contain.text', 'CST');
  });
  cy.get('#filterTerm').select(0);


  // Creating a new entry
  cy.contains('Add New Course Offering').click();
  cy.get('#addModal').should('be.visible');

  // Terms
  /*  const termList = ['2023-2024 - Term 1', '2023-2024 - Term 4', '2023-2024 - Term 5', '2022-2023 - Term 2', '2022-2023 - Term 3', '2022-2023 - Term 5', '2022-2023 - Term 6'];
  for (let i = 0; i < termList.length; i++) {
    const nChild = i + 2;
    cy.get('#cTerm > option:nth-child(' + nChild + ')').should('have.text', termList[i]);
  } */
  const termList = ['2023-2024 - Term 1', '2023-2024 - Term 4', '2023-2024 - Term 5', '2022-2023 - Term 2', '2022-2023 - Term 3', '2022-2023 - Term 5', '2022-2023 - Term 6'];
  termList.forEach((term) => {
    cy.get('#cTerm').should('contain', term);
  });

  // Program
  const programList = ['CNT', 'CST', 'ECE'];
  for (let i = 0; i < programList.length; i++) {
    const nChild = i + 2;
    cy.get('#cProgram > option:nth-child(' + nChild + ')').should('have.text', programList[i]);
  }

  // Instructor
  const instructorList = ['Barrie', 'Basoalto', 'Benson', 'Caron', 'Grzesina', 'Holtslan', 'Kaban', 'Lahoda', 'New', 'Onishenko', 'Schmidt'];
  for (let i = 0; i < instructorList.length; i++) {
    const nChild = i + 1;
    cy.get('#cPrimaryInstructor > option:nth-child(' + nChild + ')').should('have.text', instructorList[i]);
  }

  const instructorList2 = ['Barrie', 'Basoalto', 'Benson', 'Caron', 'Grzesina', 'Holtslan', 'Kaban', 'Lahoda', 'New', 'Onishenko', 'Schmidt'];
  for (let i = 0; i < instructorList.length; i++) {
    const nChild = i + 2;
    cy.get('#cAlternativeInstructor > option:nth-child(' + nChild + ')').should('have.text', instructorList[i]);
  }

  // Courses
  const courseList = ['CDBM280', 'COHS190', 'COHS280', 'COOS291', 'COOS293', 'COOS294', 'COSA280', 'COSA290', 'COSC292', 'COSC295', 'CPMG290 ', 'CSEC280', 'CWEB280', 'MATH282', 'SEM283', 'TCOM291'];
  for (let i = 0; i < instructorList.length; i++) {
    const nChild = i + 1;
    cy.get('#courses > option:nth-child(' + nChild + ')').should('have.value', courseList[i]);
  }


  // Adding new course offering
  cy.get('#cCourse').type('MATH282');
  cy.wait(100);
  cy.get('#cName').should('have.value', 'Mathematics of Computation');
  cy.wait(100);
  // cy.get('#cprimaryInstructor').should('have.value', '1');

  cy.wait(100);
  cy.get('#cName').clear().type('AAAMATH');
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

  // created, now check that it exists
  const newRow = '#tableBody > tr:nth-child(1) > ';
  cy.get('#dataTable').within(() => {
    cy.get('tr:first-child > td').eq(0).should('contain.text', 'AAAMATH');
    cy.get('tr:first-child > td').eq(1).should('contain.text', 'A');
    cy.get('tr:first-child > td').eq(2).should('contain.text', 'MATH282');
    cy.get('tr:first-child > td').eq(3).should('contain.text', '2023-4');
    cy.get('tr:first-child > td').eq(4).should('contain.text', '2023-08-01');
    cy.get('tr:first-child > td').eq(5).should('contain.text', '2023-12-01');
   // cy.get('tr:first-child > td').eq(6).should('contain.text', 'Micheal Grzesina');
   // cy.get('tr:first-child > td').eq(7).should('contain.text', 'Bryce Barrie');
    cy.get('tr:first-child > td').eq(8).should('contain.text', 'CST');
  });
  // eslint-disable-next-line max-len
  const expectedResult2 = ['AAAMATH', 'B', 'MATH282', '2023-4', '2023-08-01', '2023-12-01', 'Micheal Grzesina', 'Bryce Barrie', 'CST'];

  cy.get('#dataTable').within(() => {
    cy.get('tr:nth-child(2) > td').eq(0).should('contain.text', expectedResult2[0]);
    cy.get('tr:nth-child(2) > td').eq(1).should('contain.text', expectedResult2[1]);
    cy.get('tr:nth-child(2) > td').eq(2).should('contain.text', expectedResult2[2]);
    cy.get('tr:nth-child(2) > td').eq(3).should('contain.text', expectedResult2[3]);
    cy.get('tr:nth-child(2) > td').eq(4).should('contain.text', expectedResult2[4]);
    cy.get('tr:nth-child(2) > td').eq(5).should('contain.text', expectedResult2[5]);
   // cy.get('tr:nth-child(2) > td').eq(6).should('contain.text', expectedResult2[6]);
   // cy.get('tr:nth-child(2) > td').eq(7).should('contain.text', expectedResult2[7]);
    cy.get('tr:nth-child(2) > td').eq(8).should('contain.text', expectedResult2[8]);
  });

  // Now test the update
  // click the edit button to open modal
  cy.get('#dataTable tbody tr:first-child .editButton').click();


  cy.get('#editModal').should('be.visible');

  // Checking the order of the dropdowns
  // Terms
  termList.forEach((term, index) => {
    cy.get('#cTerm').contains(term);
  });

  // Program
  programList.forEach((program, index) => {
    cy.get('#cProgram').contains(program);
  });

  // Instructor
  instructorList.forEach((instructor, index) => {
    cy.get('#cprimaryInstructor').contains(instructor);
  });

  // Instructor
  instructorList.forEach((instructor, index) => {
    cy.get('#ealternativeInstructor').contains(instructor);
  });

  // checking the fields to make sure they pre-filled correctly
  cy.get('#eName').should('contain.value', 'AAAMATH');
  cy.get('#eTerm').find('option:selected').should('contain.text', '2023-2024');
  cy.get('#eStartDate').should('contain.value', '2023-08-01');
  cy.get('#eEndDate').should('contain.value', '2023-12-01');
  cy.get('#eGroup').should('contain.value', 'A');
  cy.get('#eProgram').find('option:selected').should('contain.text', 'CST');
 // cy.get('#eprimaryInstructor').find('option:selected').should('contain.text', 'Grzesina');


  // Changing associated fields
  cy.get('#eTerm').select('5'); // Selects the option with value "5"


  cy.get('#eStartDate').should('have.value', '2023-01-01');
  cy.get('#eEndDate').should('have.value', '2023-04-01');


  cy.get('#eprimaryInstructor').select('Grzesina');
  cy.get('#eProgram').select('CNT');
  cy.get('#editCO').click();
  cy.get('#editModal').should('be.hidden');


  /* expectedResult = ['Mathematics of Computation', 'A', 'MATH282', '2023-5', '2023-00-01', '2023-04-01', 'Bryce Barrie', ' ', 'CNT'];
  for (let i = 0; i < termList.length; i++) {
    const nChild = i + 2;
    cy.get('#cTerm > option:nth-child(' + nChild + ')').should('have.text', termList[i]);
  }
 */
  cy.get(newRow + 'td:nth-child(10) > button:nth-child(2)').click();
  cy.get('#deleteCO').click();

  // prefilling out add modal to get ready for further testing
  cy.wait(250);
  cy.contains('Add New Course Offering').click();
  cy.get('#addModal').should('be.visible');

  cy.wait(250);
  cy.get('#cCourse').type('MATH282');
  cy.get('#cCourseInvalid').should('have.text', '');
  cy.get('#cName').should('have.value', 'Mathematics of Computation');
  cy.get('#cTerm').select('1');
  cy.get('#cProgram').select('CST');
  cy.get('#createCO').should('be.enabled');

  // adding inerrant data
  cy.wait(250);
  cy.get('#cCourse').clear().type('MAATH282');
  cy.get('#cName').should('have.value', '');
  cy.get('#cCourseInvalid').should('have.text', 'Please select a Course Code from the list');

  // switching to different valid data
  cy.wait(250);
  cy.get('#cCourse').clear().type('COOS291');
  cy.get('#cName').should('have.value', 'Advanced Operating Systems');
  cy.get('#cCourseInvalid').should('have.text', '');
  cy.get('#createCO').should('be.enabled');
});
