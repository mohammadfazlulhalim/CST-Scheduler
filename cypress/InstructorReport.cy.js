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
});
