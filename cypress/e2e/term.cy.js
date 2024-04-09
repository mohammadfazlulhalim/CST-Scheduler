const programList = ['CNT', 'CST', 'ECE'];
const instructorList =
    ['Bryce Barrie', 'Ernesto Basoalto', 'Ben Benson', 'Rick Caron', 'Micheal Grzesina', 'firstName Holtslan', 'Coralee Kaban', 'Wade Lahoda', 'Ron New', 'Donovan Onishenko', 'Jason Schmidt'];
const expectedNames = ['Hardware', 'Seminar'];
const expectedCourseCode = ['COHS190', 'SEM283'];
const expectedGroup = ['A', 'B', 'C', 'D'];
const expectedInstructor = ['Ben Benson', 'Ron New'];

// Resets the DB before each test
beforeEach(()=>{
  cy.exec('node electron-db-reset.js');
})
/*
 * Test for checking if the autogenerate works
 */
it('testThatTermAutogeneratesCourseOfferings', () => {
  cy.viewport(1920, 1080);
  cy.visit('localhost:3000');
  cy.contains('Administration').click();
  cy.contains('Term').click();
  cy.url().should('include', '/term');

  // Opening
  cy.contains('Add New Term').click();
  cy.get('#addModal').should('be.visible');

  // Fill out the add modal form
  cy.get('#cTermNumber').type('3');
  cy.wait(100);
  cy.get('#cStartDate').type('2024-05-03');
  cy.wait(100);
  cy.get('#cEndDate').type('2024-06-02');
  cy.wait(100);
  cy.get('#cAuto').check();
  cy.wait(100);
  cy.get('#createTerm').click();

  // checking the Course Offering modal
  cy.get('#coModal').should('be.visible');

  // Checking sort order for instructor list
  // since it is generated the same for all table entries, going to just check once for efficiency
  for (let i = 0; i < instructorList.length; i++) {
    const nChild = i + 2;
    cy.get('#1coPrimaryInstructor > option:nth-child(' + nChild + ')').should('have.text', instructorList[i]);
    cy.get('#1coSecondaryInstructor > option:nth-child(' + nChild + ')').should('have.text', instructorList[i]);
  };

  // Checking sort order for program list
  for (let i = 0; i < programList.length; i++) {
    const nChild = i + 2;
    cy.get('#1coProgram > option:nth-child(' + nChild + ')').should('have.text', programList[i]);
  }

  // expected number of entries
  const numEntries = 8;

  // checking that it autofilled correctly
  for (let i = 0; i < numEntries; i++) {
    const nRowNum = i + 1;
    // const keyBinary = 0;
    let keyBinary;
    let keyGroup;
    switch (i) {
      case 0:
        keyBinary = 0;
        keyGroup = 0;
        break;
      case 1:
        keyBinary = 1;
        keyGroup = 0;
        break;
      case 2:
        keyBinary = 0;
        keyGroup = 1;
        break;
      case 3:
        keyBinary = 1;
        keyGroup = 1;
        break;
      case 4:
        keyBinary = 0;
        keyGroup = 2;
        break;
      case 5:
        keyBinary = 1;
        keyGroup = 2;
        break;
      case 6:
        keyBinary = 0;
        keyGroup = 3;
        break;
      case 7:
        keyBinary = 1;
        keyGroup = 3;
        break;
    }
    cy.get('#' + nRowNum + 'coName').should('have.value', expectedNames[keyBinary]);
    cy.get('#' + nRowNum + 'coStartDate').should('have.value', '2024-05-03');
    cy.get('#' + nRowNum + 'coEndDate').should('have.value', '2024-06-02');
    cy.get('#' + nRowNum + 'coGroup').should('have.text', expectedGroup[keyGroup]);
    cy.get('#' + nRowNum + 'coCourse').should('have.text', expectedCourseCode[keyBinary]);
    cy.get('#'+ nRowNum+'coPrimaryInstructor').find('option:selected').should('have.text', expectedInstructor[keyBinary]);
    cy.get('#'+ nRowNum+'coProgram').find('option:selected').should('have.text', 'CST');
  }

  cy.get('#3coSecondaryInstructor').find('option:selected').should('have.text', 'Ernesto Basoalto');

  // Date change
  cy.wait(100);
  cy.get('#' + 1 + 'coStartDate').type('2024-05-05');
  cy.wait(100);
  cy.get('#' + 1 + 'coEndDate').type('2024-05-29');
  // Name change
  cy.wait(100);
  cy.get('#' + 8 + 'coName').clear({force: true}).type('The Seminar', {force: true});
  cy.wait(100);
  // Instructor change
  cy.get('#' + 3 + 'coPrimaryInstructor').select('Bryce Barrie', {force: true});
  cy.wait(100);
  cy.get('#' + 3 + 'coSecondaryInstructor').select("", {force: true});
  cy.wait(100);
  cy.get('#' + 6 + 'coSecondaryInstructor').select('Coralee Kaban', {force: true});
  cy.wait(100);

  // Program change
  cy.wait(100);
  cy.get('#' + 4 + 'coProgram').select('CNT', {force: true});
  // Skip
  cy.get('#' + 5 + 'coSkip').check();
  cy.wait(100);
  cy.get('#createCO').click();
  cy.wait(100);

  // Check that new term is added:
  cy.get('#tableBody > tr:nth-child(2) > td:nth-child(1)').contains('3');
  cy.get('#tableBody > tr:nth-child(2) > td:nth-child(2)').contains('2024-05-03');
  cy.get('#tableBody > tr:nth-child(2) > td:nth-child(3)').contains('2024-06-02');
  cy.get('#tableBody > tr:nth-child(2) > td:nth-child(4)').contains('2023-2024');

  // // check that the entries are added to Course Offerings
  cy.contains('Administration').click();
  cy.contains('Course Offerings').click();
  const newCOs = [
    ['Hardware', 'A', 'COHS190', '2024-3', '2024-05-05', '2024-05-29', '\n                            Ben Benson\n                        ', 'Wade Lahoda', 'CST'],
    ['Hardware', 'B', 'COHS190', '2024-3', '2024-05-03', '2024-06-02', '\n                            Bryce Barrie\n                        ',  '\n                             \n                        ', 'CST'],
    ['Hardware', 'D', 'COHS190', '2024-3', '2024-05-03', '2024-06-02', '\n                            Ben Benson\n                        ', '\n                             \n                        ', 'CST'],
    ['Seminar', 'A', 'SEM283', '2024-3', '2024-05-03', '2024-06-02', '\n                            Ron New\n                        ', '\n                             \n                        ', 'CST'],
    ['Seminar', 'B', 'SEM283', '2024-3', '2024-05-03', '2024-06-02', '\n                            Ron New\n                        ', '\n                             \n                        ', 'CNT'],
    ['Seminar', 'C', 'SEM283', '2024-3', '2024-05-03', '2024-06-02', '\n                            Ron New\n                        ', '\n                            Coralee Kaban\n                        ', 'CST'],
    ['The Seminar', 'D', 'SEM283', '2024-3', '2024-05-03', '2024-06-02', '\n                            Ron New\n                        ', '\n                             \n                        ', 'CST'],
  ];
  const newCOsIndex = [13, 15, 18, 26, 29, 31, 36];
  for (let i = 0; i < newCOs.length; i++) {
    for (let j = 0; j < 8; j++) {
      const nChildCO = j + 1;
      cy.get('#tableBody > tr:nth-child(' + newCOsIndex[i] + ') >td:nth-child(' + nChildCO + ')').should('contain', newCOs[i][j]);
    }
  }

  // Deleting in reverse order
  for (let i = newCOs.length - 1; i >= 0; i--) {
    cy.get('#tableBody > tr:nth-child(' + newCOsIndex[i] + ') > td:nth-child(10)> button:nth-child(2)').click();
    cy.get('#deleteCO').click();
  }

  // Deleting the Term
  cy.visit('localhost:3000/term');
  cy.get('#tableBody > tr:nth-child(1) > td:nth-child(5) > button:nth-child(2)').click();
  cy.get('#deleteTerm').click();

});

/*
 * Test for checking that the autogenerate can be skipped
 */
it('testThatTermSkipsAutogeneratesCourseOfferings', () => {
  cy.visit('localhost:3000');
  cy.contains('Administration').click();
  cy.contains('Term').click();
  cy.url().should('include', '/term');

  // Opening
  cy.contains('Add New Term').click();
  cy.get('#addModal').should('be.visible');

  // Fill out the add modal form
  cy.get('#cTermNumber').type('6');
  cy.get('#cStartDate').type('2024-05-03');
  cy.get('#cEndDate').type('2024-06-02');

  cy.get('#createTerm').click();

  // checking the Course Offering modal is hidden
  cy.get('#coModal').should('be.hidden');

  // Check that new term is added:
  cy.get('#tableBody > tr:nth-child(4) > td:nth-child(1)').contains('6');
  cy.get('#tableBody > tr:nth-child(4) > td:nth-child(2)').contains('2024-05-03');
  cy.get('#tableBody > tr:nth-child(4) > td:nth-child(3)').contains('2024-06-02');
  cy.get('#tableBody > tr:nth-child(4) > td:nth-child(4)').contains('2023-2024');

  // Deleting the Term
  cy.get('#tableBody > tr:nth-child(4) > td:nth-child(5) > button:nth-child(2)').click();
  cy.get('#deleteTerm').click();
});


/*
 * Test for checking that the autogenerate displays message when no Course Offerings are found
 */
it('testThatTermWithNoAutogenerateOptionsDisplaysMessage ', () => {
  cy.visit('localhost:3000');
  cy.contains('Administration').click();
  cy.contains('Term').click();
  cy.url().should('include', '/term');

  // Opening
  cy.contains('Add New Term').click();
  cy.get('#addModal').should('be.visible');

  // Fill out the add modal form
  cy.wait(100);
  cy.get('#cTermNumber').type('1');
  cy.wait(100);
  cy.get('#cStartDate').type('2025-08-15');
  cy.wait(100);
  cy.get('#cEndDate').type('2025-12-15');
  cy.wait(100);
  cy.get('#cAuto').check();
  cy.wait(100);
  cy.get('#createTerm').click();
  cy.wait(100);

  // checking the Course Offering modal
  cy.get('#coModal').should('be.visible');
  cy.get('#createCOError').should('have.text', 'No course offerings found');
  cy.get('#createCOClose').click();

  // CHecking that the term is created
  cy.get('#tableBody > tr:nth-child(1) > td:nth-child(1)').contains('1');
  cy.get('#tableBody > tr:nth-child(1) > td:nth-child(2)').contains('2025-08-15');
  cy.get('#tableBody > tr:nth-child(1) > td:nth-child(3)').contains('2025-12-15');
  cy.get('#tableBody > tr:nth-child(1) > td:nth-child(4)').contains('2025-2026');

  // Deleting the Term
  cy.get('#tableBody > tr:nth-child(1) > td:nth-child(5) > button:nth-child(2)').click();
  cy.get('#deleteTerm').click();
});


it('testThatTermAutogeneratesCourseOfferingsHasValidation', () => {
  cy.viewport(1920, 1080);
  cy.visit('localhost:3000');
  cy.contains('Administration').click();
  cy.contains('Term').click();
  cy.url().should('include', '/term');

  // Expected lists in order for programs and instructors

  // Opening
  cy.contains('Add New Term').click();
  cy.get('#addModal').should('be.visible');

  // Fill out the add modal form
  cy.wait(100);
  cy.get('#cTermNumber').type('3');
  cy.wait(100);
  cy.get('#cStartDate').type('2024-05-03');
  cy.wait(100);
  cy.get('#cEndDate').type('2024-06-02');
  cy.wait(100);
  cy.get('#cAuto').check();
  cy.wait(100);
  cy.get('#createTerm').click();

  // checking the Course Offering modal
  cy.get('#coModal').should('be.visible');


  // Since it is the same term info as previous, we are going to assume the modal prefilled correctly

  // Date change - invalid empty
  cy.get('#' + 1 + 'coStartDate').clear({force: true});
  cy.get('#' + 1 + 'coEndDate').clear({force: true});
  // Name invalid - too short
  cy.get('#' + 2 + 'coName').clear({force: true});
  // Name invalid - too long
  cy.get('#' + 3 + 'coName').clear({force: true}).type('abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxy', {force: true}); // 51 char length

  // for ease of cleaning up DB, going to skip all the others
  for (let i = 4; i <= 8; i++) {
    cy.get('#' + i + 'coSkip').check();
  }

  cy.get('#createCO').click();

  cy.get('#coModal').should('be.visible');
  const numEntries = 3;


  // check that it autofills will default data again
  for (let i = 0; i < numEntries; i++) {
    const nRowNum = i + 1;
    let keyBinary;
    let keyGroup;
    switch (i) {
      case 0:
        keyBinary = 0;
        keyGroup = 0;
        break;
      case 1:
        keyBinary = 1;
        keyGroup = 0;
        break;
      case 2:
        keyBinary = 0;
        keyGroup = 1;
        break;
    }
    if (i == 0) {
      cy.get('#' + nRowNum + 'coStartDate').should('have.value', '');
      cy.get('#' + nRowNum + 'coEndDate').should('have.value', '');
    } else {
      cy.get('#' + nRowNum + 'coStartDate').should('have.value', '2024-05-03');
      cy.get('#' + nRowNum + 'coEndDate').should('have.value', '2024-06-02');
    }
    if (i == 1) {
      cy.get('#' + nRowNum + 'coName').should('have.value', '');
    } else if (i == 2) {
      cy.get('#' + nRowNum + 'coName').should('have.value', 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxy');
    } else {
      cy.get('#' + nRowNum + 'coName').should('have.value', expectedNames[keyBinary]);
    }
    cy.get('#' + nRowNum + 'coGroup').should('have.text', expectedGroup[keyGroup]);
    cy.get('#' + nRowNum + 'coCourse').should('have.text', expectedCourseCode[keyBinary]);
    cy.get('#'+ nRowNum+'coPrimaryInstructor').find('option:selected').should('have.text', expectedInstructor[keyBinary]);
    cy.get('#'+ nRowNum+'coProgram').find('option:selected').should('have.text', 'CST');
  }


  // check that error message is displayed
  cy.get('#' + 1 + 'coStartDateErr').should('have.text', 'CourseOffering.startDate cannot be null');
  cy.get('#' + 1 + 'coEndDateErr').should('have.text', 'CourseOffering.endDate cannot be null');
  cy.get('#' + 2 + 'coNameErr').should('have.text', 'Name must have 1 to 50 characters.');
  cy.get('#' + 3 + 'coNameErr').should('have.text', 'Name must have 1 to 50 characters.');

  // going to close the modal
  cy.get('#createCOClose').click();

  // Check that new term is added:
  cy.get('#tableBody > tr:nth-child(2) > td:nth-child(1)').contains('3');
  cy.get('#tableBody > tr:nth-child(2) > td:nth-child(2)').contains('2024-05-03');
  cy.get('#tableBody > tr:nth-child(2) > td:nth-child(3)').contains('2024-06-02');
  cy.get('#tableBody > tr:nth-child(2) > td:nth-child(4)').contains('2023-2024');

});

