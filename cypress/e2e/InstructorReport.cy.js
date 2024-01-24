// describe('Test Instructor Report Page', () => {
//   it('testInstructorAppearsOnReportHeader', () => {
//     // Opens report page
//     cy.visit('localhost:3000/reports/instructor');
//     // Ensure the modal is visible
//     cy.get('#instructorFormModal').should('exist').should('be.visible');
//
//     // Fill out the form
//     // Select the name
//     cy.get('#instructorList').select('BenBenson');
//
//     // Select the term
//     cy.get('#termBox').select('2024T4');
//
//     // Submit the form
//     cy.get('form').submit();
//
//     // See if the element that holds the name is populated with the correct name
//     cy.get('#instructorName').should('have.text', 'Benson, Ben');
//   });
//   it('testDateGeneratedAppearsOnHeaderAfterPost', () => {
//     // Opens report page
//     cy.visit('localhost:3000/reports/instructor');
//     // Ensure the modal is visible
//     cy.get('#instructorFormModal').should('exist').should('be.visible');
//
//     // Fill out the form
//     // Select the name
//     cy.get('#instructorList').select('BenBenson');
//
//     // Select the term
//     cy.get('#termBox').select('2024T4');
//
//     // Submit the form
//     cy.get('form').submit();
//
//     // Get the current date and format it as DD-MMM-YYYY
//     const currentDate = Cypress.moment().format('DD-MMM-YYYY');
//
//     // See if the element that holds the name is populated with the correct name
//     cy.get('#dateGenerated').should('have.text', currentDate);
//   });
//   it('testReportIsInATableWithWeekdaysAndHours', () => {
//     // Opens report page
//     cy.visit('localhost:3000/reports/instructor');
//     // Ensure the modal is visible
//     cy.get('#instructorFormModal').should('exist').should('be.visible');
//
//     // Iterate through each table on the page
//     cy.get('table').each(($table) => {
//       // Assert that the table exists
//       cy.wrap($table).should('exist');
//
//       // Assert that the weekdays headers are present
//       cy.wrap($table).contains('th', 'Time');
//       cy.wrap($table).contains('th', 'Monday');
//       cy.wrap($table).contains('th', 'Tuesday');
//       cy.wrap($table).contains('th', 'Wednesday');
//       cy.wrap($table).contains('th', 'Thursday');
//       cy.wrap($table).contains('th', 'Friday');
//
//       // Assert that the hours are present in the first column
//       cy.wrap($table).find('tr td:first-child').contains('8:00');
//       cy.wrap($table).find('tr td:first-child').contains('9:00');
//       cy.wrap($table).find('tr td:first-child').contains('10:00');
//       cy.wrap($table).find('tr td:first-child').contains('11:00');
//       cy.wrap($table).find('tr td:first-child').contains('12:00');
//       cy.wrap($table).find('tr td:first-child').contains('1:00');
//       cy.wrap($table).find('tr td:first-child').contains('2:00');
//       cy.wrap($table).find('tr td:first-child').contains('3:00');
//     });
//   });
//   it('testNewReportAndPrintButtonAreVisible', () => {
//     // Opens report page
//     cy.visit('localhost:3000/reports/instructor');
//
//     // Ensure the modal is visible
//     cy.get('#instructorFormModal').should('exist').should('be.visible');
//
//     // Assert that the "New Report" button is visible
//     cy.get('#newReportBtn').should('be.visible');
//
//     // Assert that the "Print" button is visible
//     cy.get('#printBtn').should('be.visible');
//   });
//   it('testGenerateSingleInstructorReport', () => {
//     // Opens report page
//     cy.visit('localhost:3000/reports/instructor');
//
//     // Fill out the form
//     // Select the name
//     cy.get('#instructorList').select('BenBenson');
//
//     // Select the term
//     cy.get('#termBox').select('2024T4');
//
//     // Submit the form
//     cy.get('form').submit();
//
//     // Assert that there is exactly one table on the page
//     cy.get('table').should('have.length', 1);
//   });
//   it('testGenerateMultipleInstructorReport', () => {
//     // Opens report page
//     cy.visit('localhost:3000/reports/instructor');
//
//     // Fill out the form
//     // Select the name
//     cy.get('#instructorList').select('BenBenson');
//
//     // Select the second name
//     cy.get('#instructorList').select('BryceBarrie');
//
//     // Select the term
//     cy.get('#termBox').select('2024T4');
//
//     // Submit the form
//     cy.get('form').submit();
//
//     // Assert that there is exactly one table on the page
//     cy.get('table').should('have.length', 2);
//   });
//   it('testGenerateAllInstructorReport', () => {
//     // Opens report page
//     cy.visit('localhost:3000/reports/instructor');
//
//     // Fill out the form
//     // Select the name
//     cy.get('#allInstructorBtn').check();
//
//     // Select the term
//     cy.get('#termBox').select('2024T4');
//
//     // Submit the form
//     cy.get('form').submit();
//
//     // Get the instrucots from the fixture
//     cy.fixture('instructor').as('instructors');
//
//     // Assert that there is the same amount of tables as there is instructors in the list
//     cy.get('table').should('have.length', this.instructors.length);
//   });
//   it('testModalAppearsOnInstructorReportPage', () => {
//     // Opens report page
//     cy.visit('localhost:3000/reports/instructor');
//     // Wait for the modal to pop up and then it should be visible
//     cy.get('#instructorFormModal').should('exist').should('be.visible');
//   });
//   it('testGenerateButtonDisabledOnModal', () => {
//     // Opens report page
//     cy.visit('localhost:3000/reports/instructor');
//     // Ensure the modal is visible
//     cy.get('#instructorFormModal').should('exist').should('be.visible');
//
//     // Check that the "Generate Report" button is initially disabled
//     cy.get('#generateReportBtn').should('be.disabled');
//   });
//   it('testGenerateButtonEnabledUponInstructorAndTermSelect', () => {
//     // Opens report page
//     cy.visit('localhost:3000/reports/instructor');
//     // Ensure the modal is visible
//     cy.get('#instructorFormModal').should('exist').should('be.visible');
//
//     // Fill out the form
//     // Select the name
//     cy.get('#instructorList').select('BenBenson');
//
//     // Check that the "Generate Report" button is initially disabled
//     cy.get('#generateReportBtn').should('be.disabled');
//
//     // Select the term
//     cy.get('#termBox').select('2024T4');
//
//     // Check that the "Generate Report" button is initially disabled
//     cy.get('#generateReportBtn').should('be.enable');
//   });
//   it('testNavigationToTheReportInstructorPage', ()=> {
//     // Opens the landing page
//     cy.visit('localhost:3000');
//
//     // Check that the hidden list is initially hidden
//     cy.get('#reportsDropdownList').should('not.be.visible'); // Replace with the actual selector for the hidden list
//
//     // Trigger hover over the "Reports" menu item
//     cy.get('#reportsMenu').trigger('mouseover'); // Replace with the actual selector for the "Reports" menu
//
//     // Click on the "Instructor Report" option in the dropdown
//     cy.get('#instructorReportItem').click(); // Replace with the actual selector for the "Instructor Report" option
//
//     // Check that the page redirects to the expected link
//     cy.url().should('eq', 'http://localhost:3000/reports/instructor');
//   });
// });


describe('Test Instructor Report Page', () => {
  it('testNavigationToTheReportInstructorPage', ()=> {
    // Opens the landing page
    cy.visit('localhost:3000');
    // Click on the "Reports" dropdown toggle
    cy.get('.nav-item.dropdown .nav-link.dropdown-toggle').click();

    // Assert that the dropdown menu is hidden
    cy.get('.nav-item.dropdown.show').should('not.exist');

    // Click on the "Instructor Report" option
    cy.get('.nav-item.dropdown .dropdown-menu a[href="/instructorReport"]').click();

    // Assert that the URL has changed to the Instructor Report page
    cy.url().should('include', '/instructorReport');
    // Ensure the generate button is initially disabled
    cy.get('#submitBtn').should('be.disabled');

    // Select the first instructor from the dropdown based on value
    cy.get('#selectInstructorInstructorReport').select('1'); // Replace with the actual value

    // Check if the generate button is still disabled
    cy.get('#submitBtn').should('be.disabled');

    // Select the second term from the dropdown based on value
    cy.get('#selectTermInstructorReport').select('1'); // Replace with the actual value

    // Check if the generate button is enabled after selecting both instructor and term
    cy.get('#submitBtn').should('be.enabled');
    // Submit the form
    cy.get('#submitBtn').click();

    // Check if the table exists and contains hours
    const expectedTimes12 = ['8:00', '9:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00'];

    // Check each row individually
    cy.get('.table-bordered tbody tr:first-child td:first-child').should('have.text', expectedTimes12[0]);
    cy.get('.table-bordered tbody tr:nth-child(2) td:first-child').should('have.text', expectedTimes12[1]);
    cy.get('.table-bordered tbody tr:nth-child(3) td:first-child').should('have.text', expectedTimes12[2]);
    cy.get('.table-bordered tbody tr:nth-child(4) td:first-child').should('have.text', expectedTimes12[3]);
    cy.get('.table-bordered tbody tr:nth-child(5) td:first-child').should('have.text', expectedTimes12[4]);
    cy.get('.table-bordered tbody tr:nth-child(6) td:first-child').should('have.text', expectedTimes12[5]);
    cy.get('.table-bordered tbody tr:nth-child(7) td:first-child').should('have.text', expectedTimes12[6]);
    cy.get('.table-bordered tbody tr:nth-child(8) td:first-child').should('have.text', expectedTimes12[7]);

    // Define expected column headers
    const expectedHeaders = ['Time', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    // Check the content of the thead
    cy.get('.table-bordered thead tr th').each((header, index) => {
      cy.wrap(header).should('have.text', expectedHeaders[index]);
    });

    // Define the expected instructor's name and today's date in the format DD-Mmm-YYYY
    // Define the expected instructor's name
    // Wait for the elements to be visible (adjust the IDs based on your HTML structure)
    cy.get('#nameDisplayer').should('be.visible');
    cy.get('#dateGenDisplayer').should('be.visible');

    // Define the expected instructor's name
    const expectedInstructorName = 'Benson, Ben';

    // Check the content of the instructor's name element
    cy.get('#nameDisplayer').should('have.text', expectedInstructorName);

    // Check the content of the date generated element
    cy.get('#dateGenDisplayer').invoke('text').then((text) => {
      // Validate that the date matches the format DD-Mmm-YYYY
      const datePattern = /^(0[1-9]|[12][0-9]|3[01])-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-\d{4}$/;
      expect(text).to.match(datePattern);
    });
    // Wait for the buttons to be visible (adjust the selectors based on your HTML structure)
    cy.get('#newInstructorReportBtn').should('be.visible');
    cy.get('#printRptBtn').should('be.visible');

    // Click the New Report button and check for expected behavior (assuming it opens a modal)
    cy.get('#newInstructorReportBtn').click();
    // Assuming this action opens a modal, you may want to add assertions for the modal's visibility
    cy.get('#instructorReportModal').should('be.visible');

    // Close the modal using the modal close button
    cy.get('#modalCloseBtn').click();
    // Ensure the modal is closed
    cy.get('#instructorReportModal').should('not.exist');

    // Click the Print button and check for expected behavior
    cy.get('#printRptBtn').click();
  });
});
