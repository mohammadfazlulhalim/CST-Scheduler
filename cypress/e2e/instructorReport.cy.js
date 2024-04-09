// Cypress.config('viewportWidth', 1600);

describe('Test Instructor Report Page', () => {
  // Resets the DB before each test
  before(()=>{
    cy.exec('node electron-db-reset.js');
  })
  it('testNavigationToTheReportInstructorPage', () => {
    cy.viewport(1920, 1080);
    const expectedTimes12 = ['8:00', '9:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00'];
    const expectedHeaders = ['Time', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const expectedInstructorName = 'Barrie, Bryce';
    /**
     * testNavigationToTheReportInstructorPage
     */
    // Opens the landing page
    cy.visit('localhost:3000');
    // Click on the "Reports" dropdown toggle
    // cy.get('.nav-item.dropdown .nav-link.dropdown-toggle').click();
    cy.get('#reportDropdown > a').click();


    // Assert that the dropdown menu is hidden
    cy.get('.nav-item.dropdown.show').should('not.exist');

    // Click on the "Instructor Report" option
    cy.get('.nav-item.dropdown .dropdown-menu a[href="/instructorReport"]').click();

    // Assert that the URL has changed to the Instructor Report page
    cy.url().should('include', '/instructorReport');

    /**
     * testGenerateButtonDisabledOnModal
     */
    // Ensure the generate button is initially disabled
    cy.get('#submitBtn').should('be.disabled');

    /**
     * testGenerateButtonEnabledUponInstructorAndTermSelect
     */
    // Select the instructor from the dropdown based on value
    cy.get('#selectInstructorInstructorReport').select('1');

    // Check if the generate button is still disabled
    cy.get('#submitBtn').should('be.disabled');

        // Select the term from the dropdown based on value
        cy.get('#selectTermInstructorReport').select('2023-2024 - Term 1');

    // Check if the generate button is enabled after selecting both instructor and term
    cy.get('#submitBtn').should('be.enabled');
    // Submit the form
    cy.get('#submitBtn').click();
    /**
     * testGenerateSingleInstructorReport
     */
    // Wait for the table to be visible
    cy.get('.table-bordered').should('exist');
    // One table
    cy.get('.table-bordered').should('have.length', 1);


    /**
     * testReportIsInATableWithWeekdaysAndHours
     */
    // Check each row individually
    cy.get('.table-bordered tbody tr:first-child td:first-child').should('have.text', expectedTimes12[0]);
    cy.get('.table-bordered tbody tr:nth-child(2) td:first-child').should('have.text', expectedTimes12[1]);
    cy.get('.table-bordered tbody tr:nth-child(3) td:first-child').should('have.text', expectedTimes12[2]);
    cy.get('.table-bordered tbody tr:nth-child(4) td:first-child').should('have.text', expectedTimes12[3]);
    cy.get('.table-bordered tbody tr:nth-child(5) td:first-child').should('have.text', expectedTimes12[4]);
    cy.get('.table-bordered tbody tr:nth-child(6) td:first-child').should('have.text', expectedTimes12[5]);
    cy.get('.table-bordered tbody tr:nth-child(7) td:first-child').should('have.text', expectedTimes12[6]);
    cy.get('.table-bordered tbody tr:nth-child(8) td:first-child').should('have.text', expectedTimes12[7]);

    /**
     * testFirstCellForBenBensonIsPopulated
     */
    // Check for oen of bens scheduled classes in the cell
    cy.get('.table-bordered tbody tr:nth-child(1) td:nth-child(2)').should('contain', 'CST 1');

    cy.get('.table-bordered tbody tr:nth-child(1) td:nth-child(2)').should('contain', 'MATH282B');

    cy.get('.table-bordered tbody tr:nth-child(1) td:nth-child(2)').should('contain', '239B');

    // Check the content of the thead
    cy.get('.table-bordered thead tr th').each((header, index) => {
      cy.wrap(header).should('have.text', expectedHeaders[index]);
    });

    // Wait for the elements to be visible
    cy.get('#nameDisplayer').should('be.visible');
    cy.get('#dateGenDisplayer').should('be.visible');

    // Check the content of the date generated element
    cy.get('#dateGenDisplayer').invoke('text').then((text) => {
      // Validate that the date matches the format DD-Mmm-YYYY
      const datePattern = /^([1-9]|[12][0-9]|3[01])-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-\d{4}$/;
      expect(text).to.match(datePattern);
    });
    /**
     * testInstructorAppearsOnTheReportHeader
     */
    // Check the content of the instructor's name element
    cy.get('#nameDisplayer').should('have.text', expectedInstructorName);

    /**
     * testNewReportAndPrintButtonsAreVisible
     */
    // Wait for the buttons to be visible
    cy.get('#newInstructorReportBtn').should('be.visible');
    cy.get('#printRptBtn').should('be.visible');

    // Click the New Report button and check for expected behavior
    cy.get('#newInstructorReportBtn').click();
    cy.get('#instructorReportModal').should('be.visible');
  });

  /**
   * STORY 44 NORMAL SPLITS
   */
  it('testStandardSplit', () => {
    cy.viewport(1920, 1080);
    // Opens the landing page
    cy.visit('localhost:3000');

        //create timeslot
        cy.contains('Schedule Builder').click();
        cy.get('#programSelect').select('CST');
        cy.get('#termSelect').select('2023-2024 - Term 1');
        cy.get('#groupSelect').select('4');
        cy.get('#modalSubmit').click();
        cy.get('#btnD').click();
        cy.get('#Systems\\ Administration\\ 2-D').click();
        cy.get('#0-3-D').click();


    // Click on the "Reports" dropdown toggle
    // cy.get('.nav-item.dropdown .nav-link.dropdown-toggle').click();
    cy.get('#reportDropdown > a').click();

    // Click on the "Instructor Report" option
    cy.get('.nav-item.dropdown .dropdown-menu a[href="/instructorReport"]').click();

    // Select the instructor from the dropdown based on value
    cy.get('#selectInstructorInstructorReport').select('1');

        // Select the term from the dropdown based on value
        cy.get('#selectTermInstructorReport').select('2023-2024 - Term 1');

    // Submit the form
    cy.get('#submitBtn').click();

    // Test that the timeframe is correct
    cy.get('#2023-08-01').contains('Schedule Range: 2023-08-01 to 2023-09-30');
    // map for valid timeslot locations
    let classesInOrder = [
      ['MATH282B', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''], // 12:00 slot appears empty
      ['', '', '', 'COOS291B', ''],
      ['', 'SEM283B', '', '', ''],
      ['', '', '', '', ''],
    ];
    // Check that theyre correct
    checkCorrectSchedule(classesInOrder);

    // go to the next split
    cy.get('#btnRight').click();
    // Test that the timeframe is correct
    cy.get('#2023-10-01').contains('Schedule Range: 2023-10-01 to 2023-12-01');
    // map for valid timeslot locations
    classesInOrder = [
      ['MATH282B', '', 'COOS293D', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''], // 12:00 slot appears empty
      ['', '', '', 'COOS291B', ''],
      ['', 'SEM283B', '', '', ''],
      ['', '', '', '', ''],
    ];
    // Check that theyre correct
    checkCorrectSchedule(classesInOrder);

    // check that there's only 2 splits
    cy.get('#btnRight').click();
    classesInOrder = [
      ['MATH282B', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', 'COOS291B', ''],
      ['', 'SEM283B', '', '', ''],
      ['', '', '', '', ''],
    ];
    checkCorrectSchedule(classesInOrder);

    // check that the left button works
    cy.get('#btnLeft').click();
    classesInOrder = [
      ['MATH282B', '', 'COOS293D', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''], // 12:00 slot appears empty
      ['', '', '', 'COOS291B', ''],
      ['', 'SEM283B', '', '', ''],
      ['', '', '', '', ''],
    ];
    checkCorrectSchedule(classesInOrder);
  });

  /**
   * checking that a non-standard split works properly
   */
  it('testWeirdSplit', () => {
    cy.viewport(1920, 1080);
    cy.visit('localhost:3000');

        //create timeslot
        cy.contains('Schedule Builder').click();
        cy.get('#programSelect').select('CST');
        cy.get('#termSelect').select('2023-2024 - Term 1');
        cy.get('#groupSelect').select('4');
        cy.get('#modalSubmit').click();
        cy.get('#btnC').click();
        cy.get('#Mathematics\\ of\\ Computation-C').click();
        cy.get('#2-2-C').click();

    // Click on the "Reports" dropdown toggle
    // cy.get('.nav-item.dropdown .nav-link.dropdown-toggle').click();
    cy.get('#reportDropdown > a').click();

    // Click on the "Instructor Report" option
    cy.get('.nav-item.dropdown .dropdown-menu a[href="/instructorReport"]').click();

    // Select the instructor from the dropdown based on value
    cy.get('#selectInstructorInstructorReport').select('1');

        // Select the term from the dropdown based on value
        cy.get('#selectTermInstructorReport').select('2023-2024 - Term 1');

    // Submit the form
    cy.get('#submitBtn').click();

    // Test that the timeframe is correct
    cy.get('#2023-08-01').contains('Schedule Range: 2023-08-01 to 2023-08-31');
    // map for valid timeslot locations
    let classesInOrder = [
      ['MATH282B', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''], // 12:00 slot appears empty
      ['', '', '', 'COOS291B', ''],
      ['', 'SEM283B', '', '', ''],
      ['', '', '', '', ''],
    ];
    // Check that theyre correct
    checkCorrectSchedule(classesInOrder);

    // go to the next split
    cy.get('#btnRight').click();
    // Test that the timeframe is correct
    cy.get('#2023-09-01').contains('Schedule Range: 2023-09-01 to 2023-09-30');
    // map for valid timeslot locations
    classesInOrder = [
      ['MATH282B', '', '', '', ''],
      ['', '', '', '', ''],
      ['', 'MATH282C', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''], // 12:00 slot appears empty
      ['', '', '', 'COOS291B', ''],
      ['', 'SEM283B', '', '', ''],
      ['', '', '', '', ''],
    ];
    // Check that theyre correct
    checkCorrectSchedule(classesInOrder);

    // go to the next split
    cy.get('#btnRight').click();
    // Test that the timeframe is correct
    cy.get('#2023-10-01').contains('Schedule Range: 2023-10-01 to 2023-10-31');
    // map for valid timeslot locations
    classesInOrder = [
      ['MATH282B', '', 'COOS293D', '', ''],
      ['', '', '', '', ''],
      ['', 'MATH282C', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''], // 12:00 slot appears empty
      ['', '', '', 'COOS291B', ''],
      ['', 'SEM283B', '', '', ''],
      ['', '', '', '', ''],
    ];
    // Check that theyre correct
    checkCorrectSchedule(classesInOrder);

    // go to the next split
    cy.get('#btnRight').click();
    // Test that the timeframe is correct
    cy.get('#2023-11-01').contains('Schedule Range: 2023-11-01 to 2023-12-01');
    // map for valid timeslot locations
    classesInOrder = [
      ['MATH282B', '', 'COOS293D', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''], // 12:00 slot appears empty
      ['', '', '', 'COOS291B', ''],
      ['', 'SEM283B', '', '', ''],
      ['', '', '', '', ''],
    ];
    // Check that theyre correct
    checkCorrectSchedule(classesInOrder);

    // check that there's only 4 splits
    cy.get('#btnRight').click();
    classesInOrder = [
      ['MATH282B', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', 'COOS291B', ''],
      ['', 'SEM283B', '', '', ''],
      ['', '', '', '', ''],
    ];
    checkCorrectSchedule(classesInOrder);

    // check that the left button works
    cy.get('#btnLeft').click();
    classesInOrder = [
      ['MATH282B', '', 'COOS293D', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''], // 12:00 slot appears empty
      ['', '', '', 'COOS291B', ''],
      ['', 'SEM283B', '', '', ''],
      ['', '', '', '', ''],
    ];
    checkCorrectSchedule(classesInOrder);
  });


  /**
   * now checking that no split reports generate properly
   */
  it('testNoSplit', () => {
    cy.visit('localhost:3000');
    // cy.get('.nav-item.dropdown .nav-link.dropdown-toggle').click();
    cy.get('#reportDropdown > a').click();

    // Click on the "Instructor Report" option
    cy.get('.nav-item.dropdown .dropdown-menu a[href="/instructorReport"]').click();

    // Select the instructor from the dropdown based on value
    cy.get('#selectInstructorInstructorReport').select('5');

        // Select the term from the dropdown based on value
        cy.get('#selectTermInstructorReport').select('2023-2024 - Term 1');

    // Submit the form
    cy.get('#submitBtn').click();

    // Test that the timeframe is same as timeslot
    cy.get('#2023-08-01').contains('Schedule Range: 2023-08-01 to 2023-12-01');
    // map for valid timeslot locations
    const classesInOrder = [
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', 'CDBM280B'],
      ['', '', 'COOS293B', '', ''],
      ['', '', '', '', ''], // 12:00 slot appears empty
      ['COHS280B', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
    ];
    // Check that theyre correct
    checkCorrectSchedule(classesInOrder);
    // check that the buttons for splits dont exist
    cy.get('#btnLeft').should('not.exist');
    cy.get('#btnRight').should('not.exist');
  });
});


/**
 * checks that a schedule matches a given pattern
 * @param classesInOrder
 */
function checkCorrectSchedule(classesInOrder) {
  for (let i = 1; i < 6; i++) { // for nth child row
    for (let j = 1; j < 9; j++) { // for nth child column
      const classText = classesInOrder[j - 1][i - 1]; // text in corresponding cell in text array
      const classSelector = `.active > .table-responsive > .table > tbody > :nth-child(${j}) > :nth-child(${i + 1})`; // cy statement

      console.log(classText);

      if (classText) {
        cy.get(classSelector).should('contain', classText); // if not empty, check text
      } else {
        cy.get(classSelector).should('be.empty'); // else, make sure empty
      }
    }
  }
}
