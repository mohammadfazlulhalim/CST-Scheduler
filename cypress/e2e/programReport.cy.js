/**
 * UI tests for program report
 * Author: Chritseen Shlimoon
 */
const urlGET = 'localhost:3000';
const urlPOST= 'http://localhost:3000/programReport';
describe('Test Program Report Page', () => {
  // Resets the DB before each test
  beforeEach(()=>{
    cy.exec('node electron-db-reset.js');
  })
  it('testProgramGET', ()=> {
    /**
         * testNavigationToTheReportProgramPage
         */
    // Opens the landing page
    cy.visit(urlGET);
    // Click on the "Reports" dropdown toggle
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

    /**
     * testThatProgramSelectBoxesAreSorted
     */
    // Get the options from the select box
    cy.get('#selectProgramReport').find('option').then((options) => {
      // Check if options are present and there is more than one option
      if (options.length > 2) {
        // Iterate over options to check ascending order
        for (let i = 1; i < options.length - 1; i++) {
          const currentOption = options.eq(i).text();
          const nextOption = options.eq(i + 1).text();

          // Compare current option with the next option
          expect(currentOption.localeCompare(nextOption)).to.be.lessThan(0 );
        }
      }
    });

    // Check if the generate button is still disabled
    cy.get('#submitBtn').should('be.disabled');

    // Select the term from the dropdown based on value
    cy.get('#selectTermReport').select('1');

    /**
     * testThatTermSelectBoxesAreSorted
     */
    // Get the options from the select box
    cy.get('#selectTermReport').find('option').then((options) => {
      // Check if options are present and there is more than one option
      if (options.length > 2) {
        // Iterate over options to check ascending order
        for (let i = 1; i < options.length - 1; i++) {
          const currentOption = options.eq(i).text().substring(0, 14);
          const nextOption = options.eq(i + 1).text().substring(0, 14);

          // Compare current option with the next option using localeCompare
          expect(currentOption.localeCompare(nextOption, undefined, {numeric: true})).to.be.lessThan(0);
        }
      }
    });
    // Check if the generate button is still disabled
    cy.get('#submitBtn').should('be.disabled');

    // Select the course group from the dropdown based on value
    cy.get('#selectGroupReport').select('A');

    /**
         * testThatGroupSelectBoxesAreSorted
         */
    // Get the options from the select box
    cy.get('#selectGroupReport').find('option').then((options) => {
      // Check if options are present and there is more than one option
      if (options.length > 2) {
        // Iterate over options to check ascending order
        for (let i = 1; i < options.length - 1; i++) {
          const currentOption = options.eq(i).text();
          const nextOption = options.eq(i + 1).text();

          // Compare current option with the next option
          expect(currentOption.localeCompare(nextOption)).to.be.lessThan(0);
        }
      }
    });

    // Check if the generate button is enabled after selecting both instructor and term
    cy.get('#submitBtn').should('be.enabled');
  });

  it('testProgramPOST', ()=> {
    const expectedTimes12 = ['8:00', '9:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00'];
    const expectedHeaders = ['Time', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    const cellsToCheckFull = [
      // eslint-disable-next-line max-len
      {row: 1, col: 2, value: '\n            \n                        8:00\n                    CST1MATH282BBarrie\n                        239B\n                    \n                    CST1COOS291BOnishenko\n                        239B\n                    \n                    CST1COHS280BKaban\n                        239B\n                    \n                    CST1CDBM280BLahoda\n                        239B\n                    \n                    CST1MATH282BNew\n                        239B\n                    \n        '},
      // eslint-disable-next-line max-len
      {row: 2, col: 2, value: '\n            \n                        9:00\n                    CST1COSA280BKaban\n                        239B\n                    \n                    CST1COOS293BLahoda\n                        239B\n                    \n                    CST1CWEB280BNew\n                        239B\n                    \n                    CST1SEM283BSchmidt\n                        239B\n                    \n                    CST1COSA280BCaron\n                        239B\n                    \n        '},
      // eslint-disable-next-line max-len
      {row: 3, col: 2, value: '\n            \n                        10:00\n                    CST1CDBM280BNew\n                        239B\n                    \n                    CST1MATH282BSchmidt\n                        239B\n                    \n                    CST1COOS291BCaron\n                        239B\n                    \n                    CST1COHS280BGrzesina\n                        239B\n                    \n                    CST1CDBM280BBasoalto\n                        239B\n                    \n        '},
      // eslint-disable-next-line max-len
      {row: 4, col: 2, value: '\n            \n                        11:00\n                    CST1SEM283BCaron\n                        239B\n                    \n                    CST1COSA280BGrzesina\n                        239B\n                    \n                    CST1COOS293BBasoalto\n                        239B\n                    \n                    CST1CWEB280BBenson\n                        239B\n                    \n                    CST1SEM283BHoltslan\n                        239B\n                    \n        '},
      // eslint-disable-next-line max-len
      {row: 5, col: 2, value: '\n            \n                        12:00\n                        \n                        \n                        \n                        \n                        \n        '},
      // eslint-disable-next-line max-len
      {row: 7, col: 2, value: '\n            \n                        2:00\n                    CST1CWEB280BHoltslan\n                        239B\n                    \n                    CST1SEM283BBarrie\n                        239B\n                    \n                    CST1COSA280BOnishenko\n                        239B\n                    \n                    CST1COOS293BKaban\n                        239B\n                    \n                    CST1CWEB280BLahoda\n                        239B\n                    \n        '},
      {row: 6, col: 2, value: '\n            \n                        1:00\n                    CST1COHS280BBasoalto\n                        239B\n                    \n                    CST1CDBM280BBenson\n                        239B\n                    \n                    CST1MATH282BHoltslan\n                        239B\n                    \n                    CST1COOS291BBarrie\n                        239B\n                    \n                    CST1COHS280BOnishenko\n                        239B\n                    \n        '},
      {row: 8, col: 2, value: '\n            \n                        3:00\n                        \n                        \n                        \n                        \n                        \n        '},
    ];

    const cellsToCheckCrissCross = [
      {row: 1, col: 2, value: 'CST1COOS293BBarrie\n                        239A\n                    '},
      {row: 2, col: 3, value: 'CST1COSA280ANew\n                        239A\n                    '},
      {row: 3, col: 4, value: 'CST1SEM283ABasoalto\n                        239A\n                    '},
      {row: 4, col: 4, value: 'CST1COHS280AHoltslan\n                        239A\n                    '},
      {row: 3, col: 5, value: 'CST1CWEB280AOnishenko\n                        239A\n                    '},
      {row: 4, col: 5, value: 'CST1COOS291ALahoda\n                        239A\n                    '},
      {row: 2, col: 6, value: 'CST1COOS293BSchmidt\n                        239A\n                    '},
      {row: 6, col: 3, value: 'CST1CDBM280ACaron\n                        239A\n                    '},
      {row: 7, col: 2, value: 'CST1MATH282AKaban\n                        239A\n                    '},
      {row: 6, col: 6, value: 'CST1MATH282AGrzesina\n                        239A\n                    '},
    ];


    cy.visit(urlPOST);
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

    for (let i = 0; i < expectedTimes12.length; i++) {
      const selector = `.table-bordered tbody tr:nth-child(${i + 1}) td:first-child`;
      const expectedText = expectedTimes12[i];

      cy.get(selector).should('have.text', expectedText);
    }


    /**
     * testCrissCross
     */
    cellsToCheckCrissCross.forEach(({row, col, value}) => {
      const selector = `.table-bordered tbody tr:nth-child(${row}) td:nth-child(${col})`;
      cy.get(selector).should('have.text', value);
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

    /**
     * testFull
     */
    cellsToCheckFull.forEach(({row, col, value}) => {
      const selector = `.table-bordered tbody tr:nth-child(${row})`;
      cy.get(selector).should('have.text', value);
    });


    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });
  });
});
