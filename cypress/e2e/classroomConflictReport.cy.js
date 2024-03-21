
/* ANSWER CASES

1 2023-08-01	COOS293	1	08:00	09:00	Bryce Barrie
1 2023-08-01		1	08:30	10:30
1 2023-08-01	SEM283	3	10:00	11:00	Ernesto Basoalto
1 2023-08-01	COHS280	3	11:00	12:00	firstName Holtslan
1 2023-08-01	CWEB280	4	10:00	11:00	Donovan Onishenko
1 2023-08-01	COOS291	4	11:00	12:00	Wade Lahoda
1 2023-08-01		5	08:00	14:00
1 2023-08-01	COOS293	5	09:00	10:00	Jason Schmidt
1 2023-08-01	MATH282	5	13:00	14:00	Micheal Grzesina
1 2023-08-01		5	13:00	14:00

*
*
* */

describe( 'classroom conflict report page', ()=>{
  const headingsForEachClassroomReportTable = ['Term', 'Course Code', 'Weekday', 'Start Time', 'End Time', 'Instructor'];
  const rowContentsForConflictTimeslotsTable = [

  ];

  const termsVisible = [
    '1 2023-08-01',
  ];

  const classroomsVisible = [
    '239A',
  ];

  it('testLoadClassroomConflictReport ', () => {
  // Opens main page - and go to Classroom Conflict Report Page
    cy.visit('localhost:3000');
    cy.contains('Reports').click();
    cy.get('.nav-item.dropdown .dropdown-menu a[href="/classroomConflictReport"]').click();
    cy.get('#classroomConflictModal').should('be.visible');
    // Assert that the URL has changed to the classroom Conflict Report page
    cy.url().should('include', '/classroomConflictReport');
  });

  it('testPageLoading', () => {
    // go directly to classroomConflictReport form
    cy.visit('localhost:3000/classroomConflictReport');
    // Check that Enter button is disabled
    cy.get('#modalSubmit').should('be.disabled');
    // Check that classroom field can be entered
    cy.contains('Classroom');
    cy.get('#classroomSelect').select(classroomsVisible[0]);
    // Check that Enter button is enabled
    cy.get('#modalSubmit').should('be.disabled');
    cy.get('#termSelect').select(termsVisible[0]);
    cy.get('#modalSubmit').should('be.enabled');
    cy.get('#modalSubmit').click();

    // modal for form disappears after submit button is clicked and sends a POST to the router
    cy.get('#classroomConflictModal').should('be.hidden');

    // Check header for classroom conflict page
    cy.get('#pageTitleClassroomConflicts').contains('Classroom Conflicts');

    /* testCheckingRoomNumberElementForSpecificRoomNumber */

    // go directly to classroomConflictReport form page and submit the classroom info on the form


    // check room number element
    cy.get('#selectedClassroom').contains(`Classroom: ${classroomsVisible[0]}`);
    // Check term
    cy.get('#selectedTerm').contains(`Term: ${termsVisible[0]}`);

    /* testTableHeaderElementsForSpecificRoomNumber */


    // cy.get('#div239A table thead:first-child').each( (element, index, $list) => {
    //   // either place
    // } );

    // cy.get('#239aTable thead:first-child').should('have.text', headingsForEachClassroomReportTable[0]);
    // cy.get('#239aTable thead:nth-child(2)').should('have.text', headingsForEachClassroomReportTable[1]);
    // cy.get('#239aTable thead:nth-child(2)').should('have.text', headingsForEachClassroomReportTable[2]);
    // cy.get('#239aTable thead:nth-child(2)').should('have.text', 'Course Code');
    // cy.get('#239aTable thead:nth-child(2)').should('have.text', 'Course Code');

    // check table header elements
    for (let i = 0; i < headingsForEachClassroomReportTable.length; i++) {
      cy.get(`#239aTable thead:nth-child(${i})`).should('have.text', headingsForEachClassroomReportTable[i]);
    }
    //body > div > div > div.p-4 > table > tbody > tr:nth-child(1) > th:nth-child(1)

    // });
    //
    //
    // it('testTableHeaderElementsForAllConflictedRooms', ()=>{
    //   // go directly to classroomConflictReport form page and submit the classroom info on the form
    //   cy.visit('localhost:3000/classroomConflictReport');
    //   cy.get('#allclassroomSelect').check();
    //   cy.get('#modalSubmit').click();


    /* testTableHeaderElementsForAllConflictedRooms */
    // check table header elements
    for (let i = 0; i < headingsForEachClassroomReportTable.length; i++) {
      cy.get(`#239aTable thead:nth-child(${i})`).should('have.text', headingsForEachClassroomReportTable[i]);
      cy.get(`#239bTable thead:nth-child(${i})`).should('have.text', headingsForEachClassroomReportTable[i]);
    }
  });


  it('testTableElementsForSpecificRoomNumber', ()=>{
    // TODO fix the checks here to match with values on the database!! otherwise test will break!
    const expectedContent = [
      ['2023-4', 'COOS291', 'Monday', '8:00', '9:00', 'Wade Lahoda'],
      ['2023-4', 'COSC280', 'Monday', '8:00', '9:00', 'Wade Lahoda'],
    ];
  });
});
