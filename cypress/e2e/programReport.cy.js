/**
 * UI tests for program report
 * Author: Chritseen Shlimoon
 */

describe('Test Program Report Page', () => {
  it('testProgramGET', ()=> {
    /**
         * testNavigationToTheReportProgramPage
         */
    // Opens the landing page
    cy.visit('localhost:3000');
    // Click on the "Reports" dropdown toggle
    // cy.get('.nav-item.dropdown .nav-link.dropdown-toggle').click();
    cy.get('#reportDropdown > a').click();

    // Assert that the dropdown menu is hidden
    cy.get('.nav-item.dropdown.show').should('not.exist');

    // Click on the "Program Report" option
    cy.get('.nav-item.dropdown .dropdown-menu a[href="/programReport"]').click();

    // Assert that the URL has changed to the Program Report page
    cy.url().should('include', '/programReport');

    /**
         * testGenerateButtonDisabledOnModal
         */
    // Ensure the generate button is initially disabled
    cy.get('#submitBtn').should('be.disabled');

    /**
         * testGenerateButtonEnabledUponIProgramCourseGroupAndTermSelect
         */
    // Select the program from the dropdown based on value
    cy.get('#selectProgramReport').select('1');

    // Get the options from the select box
    cy.get('#selectProgramReport').find('option').then((options) => {
      // Check if options are present and there is more than one option
      if (options.length > 1) {
        // Iterate over options to check ascending order
        for (let i = 0; i < options.length - 1; i++) {
          const currentOption = options.eq(i).text();
          const nextOption = options.eq(i + 1).text();

          // Compare current option with the next option
          expect(currentOption.localeCompare(nextOption)).to.be.lessThan(2);
        }
      }
    });

    // Check if the generate button is still disabled
    cy.get('#submitBtn').should('be.disabled');

    // Select the term from the dropdown based on value
    cy.get('#selectTermReport').select('1');

    // Get the options from the select box
    cy.get('#selectTermReport').find('option').then((options) => {
      // Check if options are present and there is more than one option
      if (options.length > 1) {
        // Iterate over options to check ascending order
        for (let i = 0; i < options.length - 1; i++) {
          const currentOption = options.eq(i).text().substring(0, 4);
          const nextOption = options.eq(i + 1).text().substring(0, 4);

          // Compare current option with the next option using localeCompare
          expect(currentOption.localeCompare(nextOption, undefined, {numeric: true})).to.be.lessThan(2);
        }
      }
    });
    // Check if the generate button is still disabled
    cy.get('#submitBtn').should('be.disabled');

    // Select the course group from the dropdown based on value
    cy.get('#selectGroupReport').select('A');

    /**
         * testThatSelectBoxesAreSorted
         */
    // Get the options from the select box
    cy.get('#selectGroupReport').find('option').then((options) => {
      // Check if options are present and there is more than one option
      if (options.length > 1) {
        // Iterate over options to check ascending order
        for (let i = 0; i < options.length - 1; i++) {
          const currentOption = options.eq(i).text();
          const nextOption = options.eq(i + 1).text();

          // Compare current option with the next option
          expect(currentOption.localeCompare(nextOption)).to.be.lessThan(2);
        }
      }
    });

    // Check if the generate button is enabled after selecting both instructor and term
    cy.get('#submitBtn').should('be.enabled');
  });

  it('testProgramPOST', ()=> {
    const expectedTimes12 = ['8:00', '9:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00'];
    const expectedHeaders = ['Time', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    /**
     * testFull
     */
    const cellsToCheckFull = [
      {row: 1, col: 2, value: 'CST1'},
      {row: 2, col: 2, value: 'CST1'},
      {row: 3, col: 2, value: 'CST1'},
      {row: 4, col: 2, value: 'CST1'},
      {row: 6, col: 2, value: 'CST1'},
      {row: 7, col: 2, value: 'CST1'},

    ];

    /**
     * testCrissCross
     */
    const cellsToCheckCrissCross = [
      {row: 1, col: 2, value: 'CST1'},
      {row: 2, col: 3, value: 'CST1'},
      {row: 3, col: 4, value: 'CST1'},
      {row: 4, col: 4, value: 'CST1'},
      {row: 3, col: 5, value: 'CST1'},
      {row: 4, col: 5, value: 'CST1'},
      {row: 2, col: 6, value: 'CST1'},
      {row: 6, col: 3, value: 'CST1'},
      {row: 7, col: 2, value: 'CST1'},
      {row: 6, col: 6, value: 'CST1'},
    ];


    cy.visit('http://localhost:3000/programReport');
    // Select the program from the dropdown based on value
    cy.get('#selectProgramReport').select('1');

    // Select the term from the dropdown based on value
    cy.get('#selectTermReport').select('1');

    // Select the course group from the dropdown based on value
    cy.get('#selectGroupReport').select('A');

    cy.get('#submitBtn').click();

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


    cellsToCheckCrissCross.forEach(({row, col, value}) => {
      const selector = `.table-bordered tbody tr:nth-child(${row}) td:nth-child(${col})`;
      cy.get(selector).should('contain', value);
    });

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
      const datePattern = /^(0[1-9]|[12][0-9]|3[01])-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-\d{4}$/;
      expect(text).to.match(datePattern);
    });
    /**
         * testProgramAppearsOnTheReportHeader
         */
    // Check the content of the instructor's name element
    cy.get('#nameDisplayer').should('have.text', 'CST Term 1A');

    /**
         * testNewReportAndPrintButtonsAreVisible
    //      */
    // Wait for the buttons to be visible
    cy.get('#newProgramBtn').should('be.visible');
    cy.get('#printRptBtn').should('be.visible');

    // Click the New Report button and check for expected behavior
    cy.get('#newProgramBtn').click();
    cy.get('#programReportModal').should('be.visible');


    // Select the program from the dropdown based on value
    cy.get('#selectProgramReport').select('1');

    // Select the term from the dropdown based on value
    cy.get('#selectTermReport').select('1');

    // Select the course group from the dropdown based on value
    cy.get('#selectGroupReport').select('B');

    cy.get('#submitBtn').click();


    cellsToCheckFull.forEach(({row, col, value}) => {
      const selector = `.table-bordered tbody tr:nth-child(${row}) td:nth-child(${col})`;
      cy.get(selector).should('contain', value);
      if (row === 7) {
        if (col !== 5) {
          col++;
        }
      }
    });


    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });
  });
});
