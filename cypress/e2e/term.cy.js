/*
 * Test for checking if the autogenerate works
 */
it('testThatTermAutogeneratesCourseOfferings', () => {
  cy.viewport(1920,1080)
  cy.visit('localhost:3000');
  cy.contains('Administration').click();
  cy.contains('Term').click();
  cy.url().should('include', '/term');

  // Expected lists in order for programs and instructors
  const programList = ['CNT', 'CST', 'ECE'];
  const instructorList =
    ['Bryce Barrie', 'Ernesto Basoalto', 'Ben Benson', 'Rick Caron', 'Micheal Grzesina', 'firstName Holtslan', 'Coralee Kaban', 'Wade Lahoda', 'Ron New', 'Donovan Onishenko', 'Jason Schmidt'];

  // Opening
  cy.contains('Add New Term').click();
  cy.get('#addModal').should('be.visible');

  // Fill out the add modal form
  cy.get('#cTermNumber').type('3');
  cy.get('#cStartDate').type('2024-05-03');
  cy.get('#cEndDate').type('2024-06-02');
  cy.get('#cAuto').check();
  cy.wait(100);
  cy.get('#createTerm').click();

  // checking the Course Offering modal
  cy.get('#coModal').should('be.visible');

  // Checking sort order for instructor list
  // since it is generated the same for all table entries, going to just check once for efficiency
  for (let i = 0; i < instructorList.length; i++) {
    const nChild = i + 1;
    const nChildSec = i +2;
    cy.get('#1coPrimaryInstructor > option:nth-child(' + nChild + ')').should('have.text', instructorList[i]);
    cy.get('#1coSecondaryInstructor > option:nth-child(' + nChildSec + ')').should('have.text', instructorList[i]);
  };
  // Checking sort order for program list
  for (let i = 0; i < programList.length; i++) {
    const nChild = i + 1;
    cy.get('#1coProgram > option:nth-child(' + nChild + ')').should('have.text', programList[i]);
  }

  // expected number of entries
  const numEntries =8;
  const expectedNames = ['Hardware', 'Seminar', 'Hardware', 'Seminar', 'Hardware', 'Seminar', 'Hardware', 'Seminar'];
  const expectedCourseCode = ['COHS190','SEM283', 'COHS190','SEM283', 'COHS190','SEM283', 'COHS190','SEM283'];
  const expectedGroup = ['A','A','B', 'B', 'C', 'C', 'D', 'D'];
  // const expectedInstructor = ['Ben Benson', 'Ron New', 'Ben Benson', 'Ron New', 'Ben Benson', 'Ron New', 'Ben Benson', 'Ron New'];


  // checking that it autofilled correctly
  for (let i =0; i< numEntries; i++) {
    const nRowNum = i+1;
    // const keyBinary = 0;
    const keyGroup = i<=1?i:Math.floor(i/4);
    cy.get('#'+ nRowNum+'coName').should('have.value', expectedNames[i]);
    cy.get('#'+ nRowNum+'coStartDate').should('have.value', '2024-05-03');
    cy.get('#'+ nRowNum+'coEndDate').should('have.value', '2024-06-02');
    cy.get('#'+ nRowNum+'coGroup').should('have.text', expectedGroup[i]);
    cy.get('#'+ nRowNum+'coCourse').should('have.text', expectedCourseCode[i]);
    // TODO get better testing for dropdown fields and add secondary instructor
    // cy.get('#'+ nRowNum+'coPrimaryInstructor').find('option:selected').should('have.text', expectedInstructor[i]);
    // cy.get('#'+ nRowNum+'coProgram').should('have.text', 'CST');
  }


  // Date change
  cy.get('#'+ 1 +'coStartDate').type('2024-05-05');
  cy.get('#'+ 1 +'coEndDate').type('2024-05-29');
  // Name change
  cy.get('#' + 8 + 'coName').clear({force: true}).type('The Seminar', {force: true});
  // Instructor change
  cy.get('#' + 3 + 'coPrimaryInstructor').select('Bryce Barrie', {force: true});
  // TODO: Add secondary instructor change

  // Program change
  cy.get('#' + 4 + 'coProgram').select('CNT', {force: true});
  // Skip
  cy.get('#' + 5 + 'coSkip').check();

  cy.get('#createCO').click();

  // Check that new term is added:
  cy.get('#tableBody > tr:nth-child(2) > td:nth-child(1)').contains('3');
  cy.get('#tableBody > tr:nth-child(2) > td:nth-child(2)').contains('2024-05-03');
  cy.get('#tableBody > tr:nth-child(2) > td:nth-child(3)').contains('2024-06-02');
  cy.get('#tableBody > tr:nth-child(2) > td:nth-child(4)').contains('2023-2024');

  // // check that the entries are added to Course Offerings
  cy.contains('Administration').click();
  cy.contains('Course Offerings').click();
  // // TODO finalize CO layout with Jonah so that testing does not get broken
  const newCOs = [
    ['Hardware', 'A', 'COHS190', '2024-3', '2024-05-05', '2024-05-29', 'Ben Benson','CST'],
    ['Hardware','B','COHS190', '2024-3', '2024-05-03', '2024-06-02', 'Bryce Barrie', 'CST'],
    ['Hardware', 'D', 'COHS190', '2024-3', '2024-05-03', '2024-06-02', 'Ben Benson', 'CST'],
    ['Seminar', 'A', 'SEM283', '2024-3', '2024-05-03', '2024-06-02', 'Ron New', 'CST'],
    ['Seminar', 'B', 'SEM283', '2024-3', '2024-05-03', '2024-06-02', 'Ron New', 'CNT'],
    ['Seminar', 'C', 'SEM283', '2024-3', '2024-05-03', '2024-06-02', 'Ron New', 'CST'],
    ['The Seminar', 'D', 'SEM283', '2024-3', '2024-05-03', '2024-06-02', 'Ron New', 'CST']
  ];
  const newCOsIndex =[14, 16, 19, 25, 28, 30, 34];
  for (let i =0; i < newCOs.length; i++) {
    for (let j =0; j<8; j++ ) {
      const nChildCO = j+1;
      // TODO: reformat CO table so that this is not needed
      if (j != 6) {
        cy.get('#tableBody > tr:nth-child(' + newCOsIndex[i] + ') >td:nth-child(' + nChildCO +')').contains(newCOs[i][j]);
      }
    }
  }

  // Deleting in reverse order
  for (let i =newCOs.length -1; i >= 0; i--) {
    cy.get('#tableBody > tr:nth-child(' + newCOsIndex[i] + ') > td:nth-child(9)> button:nth-child(2)').click()
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
// it('testThatTermSkipsAutogeneratesCourseOfferings', () => {
//   cy.visit('localhost:3000');
//   cy.contains('Administration').click();
//   cy.contains('Term').click();
//   cy.url().should('include', '/term');
//
//   // Opening
//   cy.contains('Add New Term').click();
//   cy.get('#addModal').should('be.visible');
//
//   // Fill out the add modal form
//   cy.get('#cTermNumber').type('6');
//   cy.get('#cStartDate').type('2024-05-03');
//   cy.get('#cEndDate').type('2024-06-02');
//   cy.get('#cAuto').check();
//
//   cy.get('#createTerm').click();
//
//   // checking the Course Offering modal is hidden
//   cy.get('#coModal').should('be-hidden');
//
//   // Checking that it was created
//   cy.get('#tableBody > tr:nth-child(1)').should('have.text', '\n 6 \n 2024-05-03 \n 2024-06-02');
//
//   // Deleting the Term
//   cy.get('#tableBody > tr:nth-child(1) > td:nth-child(4) > button:nth-child(2)').click();
//   cy.get('#deleteTerm').click();
// });


/*
 * Test for checking that the autogenerate displays message when no Course Offerings are found
 */
// it('testThatTermWithNoAutogenerateOptionsDisplaysMessage ', () => {
//   cy.visit('localhost:3000');
//   cy.contains('Administration').click();
//   cy.contains('Term').click();
//   cy.url().should('include', '/term');
//
//   // Opening
//   cy.contains('Add New Term').click();
//   cy.get('#addModal').should('be.visible');
//
//   // Fill out the add modal form
//   cy.get('#cTermNumber').type('1');
//   cy.get('#cStartDate').type('2024-08-15');
//   cy.get('#cEndDate').type('2024-12-15');
//   cy.get('#cAuto').check();
//   cy.get('#createTerm').click();
//
//   // checking the Course Offering modal
//   cy.get('#createCO').should('be-visible');
//   cy.get('#createCOError').should('have.text', 'No Course Offerings found');
//
//   // Deleting the Term
//   cy.get('#tableBody > tr:nth-child(1) > td:nth-child(4) > button:nth-child(2)').click();
//   cy.get('#deleteTerm').click();
// });


// it('testThatTermAutogeneratesCourseOfferingsHasValidation', () => {
//   cy.visit('localhost:3000');
//   cy.contains('Administration').click();
//   cy.contains('Term').click();
//   cy.url().should('include', '/term');
//
//   // Expected lists in order for programs and instructors
//   const programList = ['CNT', 'CST', 'ECE'];
//   const instructorList =
//     ['Barrie', 'Basoalto', 'Benson', 'Caron', 'Grzesina', 'Holtslan', 'Kaban', 'Lahoda', 'New', 'Onishenko', 'Schmidt'];
//
//   // Opening
//   cy.contains('Add New Term').click();
//   cy.get('#addModal').should('be.visible');
//
//   // Fill out the add modal form
//   cy.get('#cTermNumber').type('3');
//   cy.get('#cStartDate').type('2024-05-03');
//   cy.get('#cEndDate').type('2024-06-02');
//   cy.get('#cAuto').check();
//   cy.get('#createTerm').click();
//
//   // checking the Course Offering modal
//   cy.get('#createCO').should('be-visible');
//
//   // Checking sort order for instructor list
//   for (let i = 0; i < instructorList.length; i++) {
//     const nChild = i + 2;
//     cy.get('#createCOInstructor > option:nth-child(' + nChild + ')').should('have.text', instructorList[i]);
//   }
//   // Checking sort order for program list
//   for (let i = 0; i < programList.length; i++) {
//     const nChild = i + 2;
//     cy.get('#createCOInstructor > option:nth-child(' + nChild + ')').should('have.text', programList[i]);
//   }
//
//   // expected number of entries
//   let numEntries =8;
//   const expectedNames = ['Hardware', 'Seminar'];
//   const expectedGroup = ['A', 'B', 'C', 'D'];
//   const expectedInstructor = ['Ben Benson', 'Ron New'];
//
//   /*
//   // checking that it autofilled correctly
//   for (let i =0; i< numEntries; i++) {
//     const nChild = i+1;
//     const keyBinary = Math.floor(i/2);
//     const keyGroup = Math.floor(i/4);
//     cy.get('ph-off' + nChild + 'ph-name').should('have.value', expectedNames[keyBinary]);
//     cy.get('ph-off' + nChild + 'ph-start').should('have.value', '2024-05-03');
//     cy.get('ph-off' + nChild + 'ph-end').should('have.value', '2024-06-02');
//     cy.get('ph-off' + nChild + 'ph-group').should('have.value', expectedGroup[keyGroup]);
//     cy.get('ph-off' + nChild + 'ph-course').should('have.value', expectedNames[keyBinary]);
//     cy.get('ph-off' + nChild + 'ph-instructor').should('have.value', expectedInstructor[keyBinary]);
//     cy.get('ph-off' + nChild + 'ph-program').should('have.value', 'CST');
//   }
//    */
//
//   // Date change - invalid empty
//   cy.get('ph-off' + 1 + 'ph-start').type('');
//   cy.get('ph-off' + 1 + 'ph-end').type('');
//   // Name invalid - too short
//   cy.get('ph-off' + 2 + 'ph-name').type('');
//   // Name invalid - too long
//   cy.get('ph-off' + 3 + 'ph-name').select('abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxy'); // 51 char length
//
//   cy.get('ph-save').click();
//
//   cy.get('#createCO').should('be-visible');
//   numEntries =3;
//
//   /*
//   // check that it autofills will default data again
//   for (let i =0; i< numEntries; i++) {
//     const nChild = i+1;
//     const keyBinary = Math.floor(i/2);
//     const keyGroup = Math.floor(i/4);
//     cy.get('ph-off' + nChild + 'ph-name').should('have.value', expectedNames[keyBinary]);
//     cy.get('ph-off' + nChild + 'ph-start').should('have.value', '2024-05-03');
//     cy.get('ph-off' + nChild + 'ph-end').should('have.value', '2024-06-02');
//     cy.get('ph-off' + nChild + 'ph-group').should('have.value', expectedGroup[keyGroup]);
//     cy.get('ph-off' + nChild + 'ph-course').should('have.value', expectedNames[keyBinary]);
//     cy.get('ph-off' + nChild + 'ph-instructor').should('have.value', expectedInstructor[keyBinary]);
//     cy.get('ph-off' + nChild + 'ph-program').should('have.value', 'CST');
//   }
//    */
//
//   // check that error message is displayed
//   cy.get('ph-off' + 1 + 'ph-err-start').should('have.text', 'startDate is required');
//   cy.get('ph-off' + 1 + 'ph-err-end').should('have.text', 'endDate is required');
//   cy.get('ph-off' + 2 + 'ph-err-name').should('have.text', 'Name must have 1 to 50 characters.');
//   cy.get('ph-off' + 3 + 'ph-err-name').should('have.text', 'Name must have 1 to 50 characters.');
//
//
//   // Check that new term is added:
//   cy.get('#tableBody > tr:nth-child(1)').should('have.text', '\n 3 \n 2024-05-03 \n 2024-06-02');
//
//   // deleting errant rows
//   cy.visit('localhost:3000/courseofferings');
//   const newCOsIndex =[1,2,3,4,5];
//   // going in reverse order to not mess up length
//   for (let i =newCOs.length -1; i >= 0; i++) {
//     cy.get('#tableBody > tr:nth-child(' + newCOsIndex[i] + ') > button:nth-child(2)').click()
//     cy.get('#deleteCO').click();
//   }
//
//   // Deleting the Term
//   cy.visit('localhost:3000/term');
//   cy.get('#tableBody > tr:nth-child(1) > td:nth-child(4) > button:nth-child(2)').click();
//   cy.get('#deleteTerm').click();
// });

