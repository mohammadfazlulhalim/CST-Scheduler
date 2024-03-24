/**
 * UI tests for split schedules
 * Author: Chritseen Shlimoon & Raven Hogan
 */
// const urlGET = 'localhost:3000';
const urlPOST= 'http://localhost:3000/schedule';

describe('Test Schedule Report Page', () => {
  const programList = ['CNT', 'CST', 'ECE'];
  const termList = ['2023 - 1', '2023 - 2', '2023 - 3', '2023 - 4', '2023 - 5', '2023 - 6', '2024 - 5'];
  it('testSplitSchedule', ()=> {
    const selectedTimeSlot = 2; // Adjust this to the desired time slot (0-7)
    const selectedDay = 3; // Adjust this to the desired day (1-5)
    // Opens the landing page
    cy.visit(urlPOST);

    /**
         * Modal appears upon arrival
         */
    cy.get('#scheduleModal').should('be.visible');

    // Sort orders are checked in the other test, as one giant test was not running smoothly

    /**
         * Button disabling and enabling
         */
    // Check that Enter button is disabled
    cy.get('#modalSubmit').should('be.disabled');

    // Check that Program field can be entered
    cy.contains('Program');
    cy.get('#programSelect').select('CST');
    /**
         * testThatProgramSelectBoxesAreSorted
         */
    // Get the options from the select box

    cy.get('#programSelect').children('option').then((options) => {
      const selectOptions = [...options].map((option) => option.textContent);
      const expectedOptions = programList;
      expect(selectOptions).to.include.members(expectedOptions); // Check if all expected options are present
      expect(selectOptions).to.have.ordered.members(expectedOptions); // Check the order of options
    }).parent().select('CST');


    // Check that Enter button is disabled
    cy.get('#modalSubmit').should('be.disabled');

    /**
         * testThatTermSelectBoxesAreSorted
         */
    // Get the options from the select box
    cy.get('#termSelect').children('option').then((options) => {
      const selectOptions = [...options].map((option) => option.textContent);
      const expectedOptions = termList;
      expect(selectOptions).to.include.members(expectedOptions); // Check if all expected options are present
      expect(selectOptions).to.have.ordered.members(expectedOptions); // Check the order of options
    }).parent().select('2024 - 5');

    // Check that Enter button is disabled
    cy.get('#modalSubmit').should('be.disabled');

    // Check that Group field can be entered
    cy.contains('Number of Groups');
    cy.get('#groupSelect').select('4');
    cy.get('#groupSelect').find('option').then((options) => {
      const values = Array.from(options, (option) => option.value);

      // Check if the values are sorted in ascending order
      const sortedValues = [...values].sort();
      expect(values).to.deep.equal(sortedValues);
    });
  });

  cy.get('#modalSubmit').should('not.be.disabled');
  cy.get('#modalSubmit').click();

  /**
     * Modal closes
     */
  cy.get('#scheduleModal').should('be.hidden');


  // Wait for the schedule to load (adjust this wait time based on your application)
  cy.wait(2000); // Wait for 2 seconds (adjust as needed)

  /**
     * Empty schedule
     */
  // Check that the schedule is empty
  cy.get('.time-slot').should('have.length', 0);

  // Click on a specific cell to schedule 'TCOM' (adjust the time and day)
  cy.get(`#${selectedTimeSlot}-${selectedDay}-${letter}`).click();

  // Assert that the clicked cell has the expected text 'TCOM'
  cy.get(`#${selectedTimeSlot}-${selectedDay}-${letter}`).should('have.text', 'SEM283');

  cy.get('#scheduleDateRange').should('have.text', '01/01/2024 - 02/02/2024');

  /**
     * Arrows appearing
     */
  // Navigate to the next schedule
  cy.get('#nextSchedule').click();

  /**
     * Clicks next moves forward one
     */
  // Assert that the date range for the next schedule is displayed correctly
  cy.get('#scheduleDateRange').should('have.text', '02/02/2024 - 04/01/2024');

  // Click on a specific cell to schedule 'TCOM' (adjust the time and day)
  cy.get(`#${selectedTimeSlot}-${selectedDay}-${letter}`).click();

  // Assert that the clicked cell has the expected text 'TCOM'
  cy.get(`#${selectedTimeSlot}-${selectedDay}-${letter}`).should('have.text', 'COSC292');

  cy.get('#scheduleDateRange').should('have.text', '03/01/2024 - 04/01/2024');

  // Go back to the previous time range
  cy.get('#prevSchedule').click();

  cy.get('#scheduleDateRange').should('have.text', '02/02/2024 - 03/01/2024');

  /**
     * Arrows loop back to end or beginning schedule
     */
  cy.get('#nextSchedule').click();
  cy.get('#nextSchedule').click();

  // Assert that the first schedule is displayed again
  cy.get('#scheduleDateRange').should('have.text', '01/01/2024 - 02/02/2024');


  /**
     * Clicks back moves back one
     */
  // Click the back button
  cy.get('#prevSchedule').click();

  // Assert that the last schedule is displayed
  cy.get('#scheduleDateRange').should('have.text', '04/01/2024 - 04/30/2024');
  /**
     * View changing
     */
  // Assert that the cell for 'TCOM' is not visible in the next schedule
  cy.get(`#${selectedTimeSlot}-${selectedDay}-${letter}`).should('not.be.visible');


  // Navigate back to the previous schedule
  cy.get('#prevSchedule').click();

  // Assert that the date range for the previous schedule is displayed correctly
  cy.get('#scheduleDateRange').should('have.text', '02/02/2024 - 03/01/2024');

  // Assert that the cell for 'TCOM' is visible again in the previous schedule
  cy.get(`#${selectedTimeSlot}-${selectedDay}-${letter}`).should('be.visible');

  /**
     * Date format
     */
  // Assert that the date range for the next schedule is displayed correctly and in the expected format
  cy.get('#scheduleDateRange').invoke('text').then((dateRangeText) => {
    const dateRangeParts = dateRangeText.split(' - ');
    const startDate = Cypress.moment(dateRangeParts[0], 'DD/MM/YYYY', true);
    const endDate = Cypress.moment(dateRangeParts[1], 'DD/MM/YYYY', true);

    // Check the date format and validity
    expect(startDate.isValid()).to.be.true;
    expect(endDate.isValid()).to.be.true;


    // Check the format explicitly
    expect(dateRangeParts[0]).to.match(/^\d{2}\/\d{2}\/\d{4}$/);
    expect(dateRangeParts[1]).to.match(/^\d{2}\/\d{2}\/\d{4}$/);
  });


  /**
     * Test that the close button closes and that new program button opens modal
     //      */
  // Wait for the buttons to be visible
  cy.get('#newProgramBtn').should('be.visible');
  cy.get('#newProgramBtn').click();
  cy.get('#closeModal').should('be.visible');
  cy.get('#closeModal').click();
  cy.get('#newProgramBtn').should('not.be.visible');


  /**
     * Editing a split course will modify the schedule info
     */

  cy.visit('http://localhost:3000/courseOffering');

  // Edit the corresponding course offering with a new time range
  cy.get('#editCO').first().click();
  cy.get('#eStartDate').clear().type('01-01-2024');
  cy.get('#eEndDate').clear().type('02-01-2024');

  // Click on "Save" or submit the form to update the course offering
  cy.get('#editCO').click();

  cy.visit(urlPOST);

  // Assert that the schedule reflects the new time range
  cy.contains('01-01-2024').should('exist');
  cy.contains('01-02-2024').should('exist');


  /**
     * Delete a course that splits the schedule gets rid of split
     */

  cy.visit('http://localhost:3000/courseOffering');

  // Confirm deletion in the modal
  cy.get('#deleteModal').should('be.visible');
  cy.get('#deleteCO').click();


  cy.visit(urlPOST);

  cy.get('#scheduleDateRange').should('have.text', '01/01/2024 - 04/30/2024');
  cy.get('#nextSchedule').should('not.exist');
  cy.get('#prevSchedule').should('not.exist');
});
