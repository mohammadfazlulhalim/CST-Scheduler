/**
 * UI tests for split schedules
 * Author: Chritseen Shlimoon & Raven Hogan
 */
const urlGET = 'http://localhost:3000/schedule';
const urlPOST= 'http://localhost:3000/schedule';


describe('Test Schedule Report Page', () => {
  const programList = ['CNT', 'CST', 'ECE'];
  const termList = ['2023 - 1', '2023 - 2', '2023 - 3', '2023 - 4', '2023 - 5', '2023 - 6', '2024 - 5'];
  before(() => {
    cy.exec('node electron-db-reset.js');
  });
  it('testSplitSchedule', ()=> {
    const selectedTimeSlot = 2; // Adjust this to the desired time slot (0-7)
    const selectedDay = 3; // Adjust this to the desired day (1-5)
    // Opens the landing page
    cy.visit(urlGET);

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
    cy.get('#programSelect').select('CNT');
    /**
         * testThatProgramSelectBoxesAreSorted
         */
    // Get the options from the select box

    cy.get('#programSelect').children('option').then(($options) => {
      const optionsTexts = $options.toArray().map((option) => option.textContent.trim());
      const sortedOptions = [...optionsTexts].sort((a, b) => a.localeCompare(b, 'en', {sensitivity: 'base'}));
      expect(optionsTexts).to.deep.equal(sortedOptions);
    });


    // Check that Enter button is disabled
    cy.get('#modalSubmit').should('be.disabled');

    /**
         * testThatTermSelectBoxesAreSorted
         */
    cy.get('#termSelect').then(($options) => {
      const optionsTexts = $options.toArray().map((option) => option.textContent.trim());
      const sortedOptions = [...optionsTexts].sort((a, b) => {
        const yearA = parseInt(a.match(/\d{4}/)[0]);
        const yearB = parseInt(b.match(/\d{4}/)[0]);
        return yearA - yearB;
      });
      expect(optionsTexts).to.deep.equal(sortedOptions);
    });

    cy.get('#termSelect').select('2022-2023 - Term 2');

    // cy.get('#groupSelect option').then(($options) => {
    //   const optionsTexts = $options.toArray().map((option) => option.textContent.trim());
    //   const expectedOptions = ['', '1', '2', '3', '4'];
    //   expect(optionsTexts).to.deep.equal(expectedOptions);
    // });
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

    cy.get('#groupSelect').select('4');

    cy.get('#modalSubmit').not('be.disabled');

    cy.get('#modalSubmit').click();

    cy.get('#scheduleModal').should('be.hidden');

    cy.get('.COButtons').should('have.length.greaterThan', 0); // Check if there are course buttons present
    cy.get('.COButtons').first().click(); // Click the first course button
    cy.get('#0011').click(); // schedule it for monday at 8:00 am

    // check that the cell for monday at 8:00 am has content now
    cy.get('#0011').should('have.length.gt', 0);


    // Create a split
    cy.get('.COButtons').should('have.length.greaterThan', 0); // Check if there are course buttons present
    cy.get('.COButtons').last().click({force: true}); // Click the first course button
    cy.get('#0012').click(); // schedule it for monday at 9:00 am

    // clicking arrows and checking for content
    cy.wait(100);
    cy.get('#nextA').should('be.visible').click();
    cy.get('#tableRange01').contains('2023-04-15 to 2023-04-28');
    cy.get('#prevA').should('be.visible').click({force: true});
    cy.get('#tableRange00').contains('2023-01-02 to 2023-04-15');
    // make sure clcking the buttons loops to begining again
    cy.get('#nextA').should('be.visible').click();
    cy.get('#tableRange01').contains('2023-04-15 to 2023-04-28');
    // test that the date format is correct
    // Assuming you want to check all elements with IDs that start with 'tableRange'
    cy.get('[id^="tableRange"]').each(($el) => {
      const text = $el.text();
      const dates = text.replace(/Table Range: /, '').split(' to ');
      const regex = /^\d{4}-\d{2}-\d{2}$/;

      // Extract start and end dates
      const startDate = dates[0].trim();
      const endDate = dates[1].trim();

      // Check each date format
      expect(startDate, 'Start Date Format').to.match(regex);
      expect(endDate, 'End Date Format').to.match(regex);
    });

    cy.get;
  });


  /*


  /!**
     * Editing a split course will modify the schedule info
     *!/

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


  /!**
     * Delete a course that splits the schedule gets rid of split
     *!/

  cy.visit('http://localhost:3000/courseOffering');

  // Confirm deletion in the modal
  cy.get('#deleteModal').should('be.visible');
  cy.get('#deleteCO').click();


  cy.visit(urlPOST);

  cy.get('#scheduleDateRange').should('have.text', '01/01/2024 - 04/30/2024');
  cy.get('#nextSchedule').should('not.exist');
  cy.get('#prevSchedule').should('not.exist'); */
});
