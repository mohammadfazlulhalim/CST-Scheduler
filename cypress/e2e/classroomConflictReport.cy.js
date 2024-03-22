
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
  const headingsForEachClassroomReportTable = ['Term ', 'Course Code ', 'Weekday ', 'Start Time ', 'End Time ', 'Instructor ','Program '];
  const rowContentsForConflictTimeslotsTable = [
    [ '1 2023-08-01','COOS293', '1', '08:00', '09:00','Bryce Barrie','Computer Systems Technology'],
    ['1 2023-08-01','','1','08:30',	'10:30', ' ', '', ''],
    ['1 2023-08-01', 'SEM283','3','10:00','11:00','Ernesto Basoalto','Computer Systems Technology'],
    ['1 2023-08-01','COHS280','3',	'11:00',	'12:00','firstName Holtslan', 'Computer Systems Technology'],
    ['1 2023-08-01', 'CWEB280',	'4',	'10:00',	'11:00',	'Donovan Onishenko', 'Computer Systems Technology'],
    ['1 2023-08-01', 'COOS291',	'4',	'11:00',	'12:00',	'Wade Lahoda', 'Computer Systems Technology'],
    ['1 2023-08-01', '',		'5',	'08:00',	'14:00', ' ','' ],
    ['1 2023-08-01',	'COOS293',	'5',	'09:00',	'10:00',	'Jason Schmidt', 'Computer Systems Technology'],
    ['1 2023-08-01',	'MATH282',	'5',	'13:00',	'14:00',	'Micheal Grzesina', 'Computer Systems Technology'],
    ['1 2023-08-01', '',		'5',	'13:00',	'14:00',' ','']

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

    // Assert that the URL has changed to the classroom Conflict Report page
    cy.url().should('include', '/classroomConflictReport');
    cy.get('#classroomConflictModal').should('be.visible');
    //Check that term filed has empty value
    cy.get('#termSelect').should('have.value',null);
    // Check that classroom field has empty value
    cy.get('#classroomSelect').should('have.value',null);
    // Check that Enter button is disabled
    cy.get('#modalSubmit').should('be.disabled');
  });

  it('testPageLoading', () => {
    // go directly to classroomConflictReport form
    cy.visit('localhost:3000/classroomConflictReport');
    cy.get('#classroomSelect').select(classroomsVisible[0]);
    cy.get('#termSelect').select(termsVisible[0]);
    //After selecting classroom and term the Generate Report button is enabled
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
     cy.get(`#reportTable tbody th:eq(${i})`).should('have.text', headingsForEachClassroomReportTable[i]);
    }
    //to select element inside 2D array we will use count which will be incremented inside the for loop
    let count =0;
    /** testTableElements */
    // check table header elements
    for (let i = 0; i < rowContentsForConflictTimeslotsTable.length; i++) {
      for (let j = 0; j < rowContentsForConflictTimeslotsTable[0].length; j++) {

        cy.get(`#reportTable tbody td:eq(${count++})`).should('have.text', rowContentsForConflictTimeslotsTable[i][j]);
      }
    }
  });


});
