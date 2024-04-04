describe( 'classroom conflict report page', ()=>{
  const headingsForEachClassroomReportTable =
    ['Term ', 'Course Code ', 'Weekday ', 'Start Time ', 'End Time ', 'Instructor ', 'Program '];
  const rowContentsForConflictTimeslotsTable = [
    // TODO replace weekday integer with string - best use values from that daysFullySpelled array up there
    ['6 2023-05-01', '', 'Monday', '08:00', '09:00', 'Jason Schmidt', ''],
    ['6 2023-05-01', '', 'Monday', '08:30', '10:30', ' ', '', ''],
    ['6 2023-05-01', '', 'Monday', '14:00', '15:00', 'Jason Schmidt', ''],
    ['6 2023-05-01', '', 'Monday', '14:00', '15:00', ' ', ''],
  ];
  const rowContentsForConflictTimeslotsTable2 = [
    ['6 2023-05-01', '', 'Tuesday', '09:00', '10:00', 'Coralee Kaban', ''],
    ['6 2023-05-01', '', 'Tuesday', '09:30', '10:30', ' ', ''],
    ['6 2023-05-01', '', 'Tuesday', '10:15', '11:00', ' ', ''],
    ['6 2023-05-01', '', 'Tuesday', '13:00', '14:00', 'Coralee Kaban', ''],
    ['6 2023-05-01', '', 'Tuesday', '13:01', '14:01', ' ', ''],

  ];

  const termsVisible = [
    '6 2023-05-01',
  ];

  const classroomsVisible = [
    '239A', '239B',
  ];

  // Resets the DB before each test
  beforeEach(()=>{
    cy.exec('node electron-db-reset.js');
  })

  it('testLoadClassroomConflictReport ', () => {
  // Opens main page - and go to Classroom Conflict Report Page
    cy.visit('localhost:3000');
    cy.contains('Reports').click();
    cy.get('.nav-item.dropdown .dropdown-menu a[href="/classroomConflictReport"]').click();

    // Assert that the URL has changed to the classroom Conflict Report page
    cy.url().should('include', '/classroomConflictReport');
    cy.get('#classroomConflictModal').should('be.visible');
    // Check that term filed has empty value
    cy.get('#termSelect').should('have.value', null);
    // Check that classroom field has empty value
    cy.get('#classroomSelect').should('have.value', null);
    // Check that Enter button is disabled
    cy.get('#modalSubmit').should('be.disabled');
  });

  it('testPageLoading', () => {
    // go directly to classroomConflictReport form
    cy.visit('localhost:3000/classroomConflictReport');
    cy.get('#classroomSelect').select(classroomsVisible[0]);
    cy.get('#termSelect').select(termsVisible[0]);
    // After selecting classroom and term the Generate Report button is enabled
    cy.get('#modalSubmit').should('be.enabled');
    cy.get('#modalSubmit').click();

    // modal for form disappears after submit button is clicked and sends a POST to the router
    cy.get('#classroomConflictModal').should('be.hidden');

    // Check header for classroom conflict page
    cy.get('#pageTitleClassroomConflicts').contains('Classroom Conflicts');

    /** testCheckingRoomNumberElementForSpecificRoomNumber */

    // check room number element
    cy.get('#selectedClassroom').contains(`Classroom: ${classroomsVisible[0]}`);
    // Check term element
    cy.get('#selectedTerm').contains(`Term: ${termsVisible[0]}`);


    /** testTableHeaderElements */
    // check table header elements
    for (let i = 0; i < headingsForEachClassroomReportTable.length; i++) {
      cy.get(`#tblRoom239ATerm6DaySunday tbody th:eq(${i})`).should('have.text', headingsForEachClassroomReportTable[i]);
    }
    // to select element inside 2D array we will use count which will be incremented inside the for loop
    let count =0;
    /** testTableElements */
    // check table header elements
    for (let i = 0; i < rowContentsForConflictTimeslotsTable.length; i++) {
      for (let j = 0; j < rowContentsForConflictTimeslotsTable[0].length; j++) {
        cy.get(`#tblRoom239ATerm6DaySunday tbody td:eq(${count++})`).should('have.text', rowContentsForConflictTimeslotsTable[i][j]);
      }
    }


  // check table header elements
  for (let i = 0; i < headingsForEachClassroomReportTable.length; i++) {
    cy.get(`#tblRoom239ATerm6DayMonday tbody th:eq(${i})`).should('have.text', headingsForEachClassroomReportTable[i]);
  }
  // to select element inside 2D array we will use count which will be incremented inside the for loop
  let count2 =0;
  /** testTableElements */
  // check table header elements
  for (let i = 0; i < rowContentsForConflictTimeslotsTable2.length; i++) {
    for (let j = 0; j < rowContentsForConflictTimeslotsTable2[0].length; j++) {
      cy.get(`#tblRoom239ATerm6DayMonday tbody td:eq(${count2++})`).should('have.text', rowContentsForConflictTimeslotsTable2[i][j]);
    }
  }
});


  it('testNoConflictAvailablePage', () => {
    // go directly to classroomConflictReport form
    cy.visit('localhost:3000/classroomConflictReport');
    cy.get('#classroomSelect').select(classroomsVisible[1]);
    cy.get('#termSelect').select(termsVisible[0]);
    // After selecting classroom and term the Generate Report button is enabled
    cy.get('#modalSubmit').should('be.enabled');
    cy.get('#modalSubmit').click();

    // modal for form disappears after submit button is clicked and sends a POST to the router
    cy.get('#classroomConflictModal').should('be.hidden');

    // Check header for classroom conflict page
    cy.get('#pageTitleClassroomConflicts').contains('Classroom Conflicts');

    cy.get('#nothingToShow').should('have.text', 'Nothing to display at the moment');
    cy.get('#newReportBtn').click();
    cy.get('#classroomConflictModal').should('be.visible');
  });
});
