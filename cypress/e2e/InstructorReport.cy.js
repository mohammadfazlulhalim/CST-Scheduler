
describe('Test Instructor Report Page', () => {
  it('testNavigationToTheReportInstructorPage', ()=> {
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
    cy.get('#selectTermInstructorReport').select('1');

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

    cy.get('.table-bordered tbody tr:nth-child(1) td:nth-child(2)').should('contain', 'COOS293B');

    cy.get('.table-bordered tbody tr:nth-child(1) td:nth-child(2)').should('contain', '239A');

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
});
