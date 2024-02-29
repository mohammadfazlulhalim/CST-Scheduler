/**
 * Test for checking if the autogenerate works
 */
it('testThatTermAutogeneratesCourseOfferings', () => {
  cy.visit('localhost:3000');
  cy.contains('Administration').click();
  cy.contains('Term').click();
  cy.url().should('include', '/term');

  // Expected lists in order for programs and instructors
  const programList = ['CNT', 'CST', 'ECE'];
  const instructorList =
    ['Barrie', 'Basoalto', 'Benson', 'Caron', 'Grzesina', 'Holtslan', 'Kaban', 'Lahoda', 'New', 'Onishenko', 'Schmidt'];

  // Opening
  cy.contains('Add New Term').click();
  cy.get('#addModal').should('be.visible');

  // Fill out the add modal form
  cy.get('#cTermNumber').type('3');
  cy.get('#cStartDate').type('2024-05-03');
  cy.get('#cEndDate').type('2024-06-02');
  cy.get('#cAuto').check();
  cy.get('#createTerm').click();

  // checking the Course Offering modal
  cy.get('#createCO').should('be-visible');

  // Checking sort order for instructor list
  for (let i = 0; i < instructorList.length; i++) {
    const nChild = i + 2;
    cy.get('#createCOInstructor > option:nth-child(' + nChild + ')').should('have.text', instructorList[i]);
  }
  // Checking sort order for program list
  for (let i = 0; i < programList.length; i++) {
    const nChild = i + 2;
    cy.get('#createCOInstructor > option:nth-child(' + nChild + ')').should('have.text', programList[i]);
  }

  // expected number of entries
  const numEntries =8;
  const expectedNames = ['Hardware', 'Seminar'];
  const expectedGroup = ['A', 'B', 'C', 'D'];
  const expectedCourse = ['Hardware', 'Seminar'];
  const expectedInstructor = ['Ben Benson', 'Ron New'];

  // checking that it autofilled correctly
  for (let i =0; i< numEntries; i++) {
    const nChild = i+1;
    const keyBinary = (i/2).floor();
    const keyGroup = (i/4).floor();
    cy.get('ph-off' + nChild + 'ph-name').should('have.value', expectedNames[keyBinary]);
    cy.get('ph-off' + nChild + 'ph-start').should('have.value', '2024-05-03');
    cy.get('ph-off' + nChild + 'ph-end').should('have.value', '2024-06-02');
    cy.get('ph-off' + nChild + 'ph-group').should('have.value', expectedGroup[keyGroup]);
    cy.get('ph-off' + nChild + 'ph-course').should('have.value', expectedNames[keyBinary]);
    cy.get('ph-off' + nChild + 'ph-instructor').should('have.value', expectedInstructor[keyBinary]);
    cy.get('ph-off' + nChild + 'ph-program').should('have.value', 'CST');
  }

  // Date change
  cy.get('ph-off' + 1 + 'ph-start').type('2024-05-05');
  cy.get('ph-off' + 1 + 'ph-end').type('2024-05-29');
  // Name change
  cy.get('ph-off' + 2 + 'ph-name').type('The Seminar');
  // Instructor change
  cy.get('ph-off' + 3 + 'ph-instructor').select('Bryce Barrie');
  // Program change
  cy.get('ph-off' + 4 + 'ph-program').select('CNT');
  // Skip
  cy.get('ph-off' + 5 + 'ph-auto').check();

  // Check that new term is added:
  cy.get('#tableBody > tr:nth-child(1)').should('have.text', '\n 3 \n 2024-05-03 \n 2024-06-02');

  // check that the entries are added to Course Offerings
  cy.contains('Administration').click();
  cy.contains('Course Offerings').click();

  // TODO finalize CO layout with Jonah so that testing does not get broken
  // Talk with Jonah about option to sort COs by Term, would simplify check, if not
  // do tests similar to this:
  // const newRow2 = '#tableBody > tr:nth-child(21)';
  // cy.get(newRow2).should('have.text',
  //   '\n                    Mathematics of Computation\n                    A\n                    MATH282\n                    2023-5\n                    2023-01-01\n                    2023-04-01\n                    Bryce Barrie\n                    CNT\n                    \n                        Edit\n                        \n                        Delete\n                        \n                    \n                ');
  const newCOs = [
    'Hardware \n A \n COHS190 \n 2024-3 \n 2024-05-03 \n 2024-06-02 \n Ben Benson \n CST',
    'Hardware \n B \n COHS190 \n 2024-3 \n 2024-05-03 \n 2024-06-02 \n Ben Benson \n CST',
    'Hardware \n C \n COHS190 \n 2024-3 \n 2024-05-03 \n 2024-06-02 \n Ben Benson \n CST',
    'Hardware \n D \n COHS190 \n 2024-3 \n 2024-05-03 \n 2024-06-02 \n Ben Benson \n CST',
    'Seminar \n A \n SEM283 \n 2024-3 \n 2024-05-03 \n 2024-06-02 \n Ron New \n CST',
    'Seminar \n B \n SEM283 \n 2024-3 \n 2024-05-03 \n 2024-06-02 \n Ron New \n CST',
    'Seminar \n C \n SEM283 \n 2024-3 \n 2024-05-03 \n 2024-06-02 \n Ron New \n CST',
    'Seminar \n D \n SEM283 \n 2024-3 \n 2024-05-03 \n 2024-06-02 \n Ron New \n CST',
  ];

  // Calculate that one was skipped by calculating out total number of rows
  // TODO delete newly created COs

  // Deleting the Term
  cy.visit('localhost:3000/term');
  cy.get('#tableBody > tr:nth-child(1) > td:nth-child(4) > button:nth-child(2)').click();
  cy.get('#deleteTerm').click();
});

/**
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
  cy.get('#cAuto').check();

  cy.get('#createTerm').click();

  // checking the Course Offering modal
  cy.get('#createCO').should('be-hidden');

  // Checking that it was created
  cy.get('#tableBody > tr:nth-child(1)').should('have.text', '\n 6 \n 2024-05-03 \n 2024-06-02');

  // Deleting the Term
  cy.get('#tableBody > tr:nth-child(1) > td:nth-child(4) > button:nth-child(2)').click();
  cy.get('#deleteTerm').click();
});

/**
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
  cy.get('#cTermNumber').type('1');
  cy.get('#cStartDate').type('2024-08-15');
  cy.get('#cEndDate').type('2024-12-15');
  cy.get('#cAuto').check();
  cy.get('#createTerm').click();

  // checking the Course Offering modal
  cy.get('#createCO').should('be-visible');
  cy.get('#createCOError').should('have.text', 'No Course Offerings found');

  // Deleting the Term
  cy.get('#tableBody > tr:nth-child(1) > td:nth-child(4) > button:nth-child(2)').click();
  cy.get('#deleteTerm').click();
});
