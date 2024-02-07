/**
 * UI tests for program report
 * Author: Chritseen Shlimoon
 */
const sel='#selectProgramReport';
describe('Test Program Report Page', () => {
  it('testProgramGET', ()=> {
    const expectedTimes12 = ['8:00', '9:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00'];
    const expectedHeaders = ['Time', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

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

    // Check if the generate button is still disabled
    cy.get('#submitBtn').should('be.disabled');

    // Select the term from the dropdown based on value
    cy.get('#selectTermReport').select('1');

    // Select the course group from the dropdown based on value
    cy.get('#selectGroupReport').select('A');

    // /**
    //      * testThatSelectBoxesAreSorted
    //      */
    // // Check the options are ordered in program select box
    // cy.get('#selectProgram').invoke('val').then((selectedValue) => {
    //   // Get all the options
    //   cy.get('#selectProgram option').then((options) => {
    //     // Convert options to an array of values
    //     const optionValues = options.map((index, option) => option.value).get();
    //
    //     // Check if options are ordered
    //     const isOrdered = optionValues.every((value, index, array) => {
    //       // If it's not the first option, compare with the previous one
    //       if (index > 0) {
    //         return value >= array[index - 1];
    //       }
    //       return true;
    //     });
    //
    //     // Assert that options are ordered
    //     expect(isOrdered).to.be.true;
    //
    //     // Assert that the selected option is the first one
    //     expect(selectedValue).to.equal(optionValues[0]);
    //   });
    // });
    //
    // // Get the select box and its options in course group select box
    // cy.get('#selectGroup').invoke('val').then((selectedValue) => {
    //   // Get all the options
    //   cy.get('#selectGroup option').then((options) => {
    //     // Convert options to an array of values
    //     const optionValues = options.map((index, option) => option.value).get();
    //
    //     // Check if options are ordered
    //     const isOrdered = optionValues.every((value, index, array) => {
    //       // If it's not the first option, compare with the previous one
    //       if (index > 0) {
    //         return value >= array[index - 1];
    //       }
    //       return true;
    //     });
    //
    //     // Assert that options are ordered
    //     expect(isOrdered).to.be.true;
    //
    //     // Assert that the selected option is the first one
    //     expect(selectedValue).to.equal(optionValues[0]);
    //   });
    // });
    //
    //
    // // Check the options are ordered in term select box
    // cy.get('#termSelect').invoke('val').then((selectedValue) => {
    //   // Get all the options
    //   cy.get('#termSelect option').then((options) => {
    //     // Convert options to an array of values
    //     const optionValues = options.map((index, option) => option.value).get();
    //
    //     // Check if options are ordered
    //     const isOrdered = optionValues.every((value, index, array) => {
    //       // If it's not the first option, compare with the previous one
    //       if (index > 0) {
    //         return value >= array[index - 1];
    //       }
    //       return true;
    //     });
    //
    //     // Assert that options are ordered
    //     expect(isOrdered).to.be.true;
    //
    //     // Assert that the selected option is the first one
    //     expect(selectedValue).to.equal(optionValues[0]);
    //   });
    // });

    // Check if the generate button is enabled after selecting both instructor and term
    cy.get('#submitBtn').should('be.enabled');

    // Submit the form
    cy.get('#submitBtn').click();
    /**
         * testGenerateSingleProgramReport
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
         * testFirstCellForIsPopulated
         */
    // // Check for one of  scheduled classes in the cell
    // cy.get('.table-bordered tbody tr:nth-child(1) td:nth-child(2)').should('contain', 'CST1');
    //
    // cy.get('.table-bordered tbody tr:nth-child(1) td:nth-child(2)').should('contain', 'CSEC280A');
    //
    // cy.get('.table-bordered tbody tr:nth-child(1) td:nth-child(2)').should('contain', 'Benson');
    //
    // cy.get('.table-bordered tbody tr:nth-child(1) td:nth-child(2)').should('contain', '239a');
    //
    // // Check the content of the thead
    // cy.get('.table-bordered thead tr th').each((header, index) => {
    //   cy.wrap(header).should('have.text', expectedHeaders[index]);
    // });

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
  });
});
