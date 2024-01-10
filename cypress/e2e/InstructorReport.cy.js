describe('Test Instructor Report Page', () => {
  it('testInstructorAppearsOnReportHeader', () => {
    // Opens report page
    cy.visit('localhost:3000/reports/instructor');

    // Fill out the form
    // Select the name
    cy.get('#instructorList').select('BenBenson');

    // Select the term
    cy.get('#termBox').select('2024T4');

    // Submit the form
    cy.get('form').submit();

    // See if the element that holds the name is populated with the correct name
    cy.get('#instructorName').should('have.text', 'Benson, Ben');
  });
  it('testDateGeneratedAppearsOnHeaderAfterPost', () => {
    // Opens report page
    cy.visit('localhost:3000/reports/instructor');

    // Fill out the form
    // Select the name
    cy.get('#instructorList').select('BenBenson');

    // Select the term
    cy.get('#termBox').select('2024T4');

    // Submit the form
    cy.get('form').submit();

    // Get the current date and format it as DD-MMM-YYYY
    const currentDate = Cypress.moment().format('DD-MMM-YYYY');

    // See if the element that holds the name is populated with the correct name
    cy.get('#dateGenerated').should('have.text', currentDate);
  });
  it('testReportIsInATableWithWeekdaysAndHours', () => {
    // Opens report page
    cy.visit('localhost:3000/reports/instructor');

    // Iterate through each table on the page
    cy.get('table').each(($table) => {
      // Assert that the table exists
      cy.wrap($table).should('exist');

      // Assert that the weekdays headers are present
      cy.wrap($table).contains('th', 'Time');
      cy.wrap($table).contains('th', 'Monday');
      cy.wrap($table).contains('th', 'Tuesday');
      cy.wrap($table).contains('th', 'Wednesday');
      cy.wrap($table).contains('th', 'Thursday');
      cy.wrap($table).contains('th', 'Friday');

      // Assert that the hours are present in the first column
      cy.wrap($table).find('tr td:first-child').contains('8:00');
      cy.wrap($table).find('tr td:first-child').contains('9:00');
      cy.wrap($table).find('tr td:first-child').contains('10:00');
      cy.wrap($table).find('tr td:first-child').contains('11:00');
      cy.wrap($table).find('tr td:first-child').contains('12:00');
      cy.wrap($table).find('tr td:first-child').contains('1:00');
      cy.wrap($table).find('tr td:first-child').contains('2:00');
      cy.wrap($table).find('tr td:first-child').contains('3:00');
    });
  });
  it('testNewReportAndPrintButtonAreVisible', () => {
    // Opens report page
    cy.visit('localhost:3000/reports/instructor');

    // Assert that the "New Report" button is visible
    cy.get('#newReportBtn').should('be.visible');

    // Assert that the "Print" button is visible
    cy.get('#printBtn').should('be.visible');
  });
  it('testGenerateSingleInstructorReport', () => {
    // Opens report page
    cy.visit('localhost:3000/reports/instructor');

    // Fill out the form
    // Select the name
    cy.get('#instructorList').select('BenBenson');

    // Select the term
    cy.get('#termBox').select('2024T4');

    // Submit the form
    cy.get('form').submit();

    // Assert that there is exactly one table on the page
    cy.get('table').should('have.length', 1);
  });
  it('testGenerateMultipleInstructorReport', () => {
    // Opens report page
    cy.visit('localhost:3000/reports/instructor');

    // Fill out the form
    // Select the name
    cy.get('#instructorList').select('BenBenson');

    // Select the second name
    cy.get('#instructorList').select('BryceBarrie');

    // Select the term
    cy.get('#termBox').select('2024T4');

    // Submit the form
    cy.get('form').submit();

    // Assert that there is exactly one table on the page
    cy.get('table').should('have.length', 2);
  });
  it('testGenerateAllInstructorReport', () => {
    // Opens report page
    cy.visit('localhost:3000/reports/instructor');

    // Fill out the form
    // Select the name
    cy.get('#allInstructorBtn').check();

    // Select the term
    cy.get('#termBox').select('2024T4');

    // Submit the form
    cy.get('form').submit();

    // Get the instrucots from the fixture
    cy.fixture('instructor').as('instructors');

    // Assert that there is the same amount of tables as there is instructors in the list
    cy.get('table').should('have.length', this.instructors.length);
  });
  it('testModalAppearsOnInstructorReportPage', () => {
    // Opens report page
    cy.visit('localhost:3000/reports/instructor');
    // Wait for the modal to pop up and then it should be visible
    cy.get('#instructorFormModal').should('exist').should('be.visible');
  });
  it('testGenerateButtonDisabledOnModal', () => {
    // Opens report page
    cy.visit('localhost:3000/reports/instructor');
    // Ensure the modal is visible
    cy.get('#instructorFormModal').should('exist').should('be.visible');

    // Check that the "Generate Report" button is initially disabled
    cy.get('#generateReportBtn').should('be.disabled');
  });
  it('testGenerateButtonEnabledUponInstructorAndTermSelect', () => {
    // Opens report page
    cy.visit('localhost:3000/reports/instructor');
    // Ensure the modal is visible
    cy.get('#instructorFormModal').should('exist').should('be.visible');

    // Fill out the form
    // Select the name
    cy.get('#instructorList').select('BenBenson');

    // Check that the "Generate Report" button is initially disabled
    cy.get('#generateReportBtn').should('be.disabled');

    // Select the term
    cy.get('#termBox').select('2024T4');

    // Check that the "Generate Report" button is initially disabled
    cy.get('#generateReportBtn').should('be.enable');
  });
  it('testNavigationToTheReportInstructorPage', ()=> {
    // Opens the landing page
    cy.visit('localhost:3000');

    // Check that the hidden list is initially hidden
    cy.get('#reportsDropdownList').should('not.be.visible'); // Replace with the actual selector for the hidden list

    // Trigger hover over the "Reports" menu item
    cy.get('#reportsMenu').trigger('mouseover'); // Replace with the actual selector for the "Reports" menu

    // Click on the "Instructor Report" option in the dropdown
    cy.get('#instructorReportItem').click(); // Replace with the actual selector for the "Instructor Report" option

    // Check that the page redirects to the expected link
    cy.url().should('eq', 'http://localhost:3000/reports/instructor');
  });
});
