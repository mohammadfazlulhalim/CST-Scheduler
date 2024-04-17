/**
 * UI tests for split schedules
 * Author: Chritseen Shlimoon & Raven Hogan
 */
const urlGET = 'http://localhost:3000/schedule';
const urlPOST = 'http://localhost:3000/schedule';


describe('Test Schedule Report Page', () => {
  const programList = ['CNT', 'CST', 'ECE'];
  const termList = ['2023 - 1', '2023 - 2', '2023 - 3', '2023 - 4', '2023 - 5', '2023 - 6', '2024 - 5'];
  before(() => {
    cy.exec('node electron-db-reset.js');
  });

  /**
   * Test for A
   */
  it('testSplitScheduleA', () => {
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
    cy.get('#modalSubmit').should('be.disabled');
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

    // Testing adding course to cell
    cy.get('.COButtons').should('have.length.greaterThan', 0);
    cy.get('#180A').click();
    cy.get('#0011').click();
    cy.get('#0011').contains('p', 'COHS190');
    cy.get('#0011').contains('p', 'Benson / Caron');
    cy.get('#0011').contains('p', '239A');
    cy.get('.COButtons').should('have.length.greaterThan', 0);

    // testing adding a split course to cell and CO that is only avaliable in last table isnt in first
    cy.get('#210A').click({force: true});
    cy.get('#0012').click();
    cy.get('#210A').should('not.exist');
    cy.wait(100);

    // testing that you can move to next page once split is made
    cy.get('#nextA').should('be.visible').click();
    cy.get('#211A').should('exist');
    cy.get('#tableRange01').contains('2023-04-15 to 2023-04-28');

    // testing that you can add stuff to new page
    cy.get('#0112').contains('p', 'TCOM291');
    cy.get('#0112').contains('p', 'Holtslan');
    cy.get('#0112').contains('p', '239A');
    cy.get('#prevA').should('be.visible').click({force: true});
    // testing that you can move back to original page and timeslot that exists only on last page shouldnt be there
    cy.get('#tableRange00').contains('2023-01-02 to 2023-04-15');
    cy.get('#0012').find('p').should('be.empty');
    cy.get('#180A').click({force: true});
    cy.get('#0012').click({force: true});
    cy.get('#0012').find('p').should('be.empty');
    cy.wait(50);

    // Testing that range is in correct format
    cy.get('#nextA').should('be.visible').click({force: true});
    cy.get('#tableRange01').contains('2023-04-15 to 2023-04-28');
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

    // Testing that a third split can be made
    cy.get('#191A').click({force: true});
    cy.get('#0185').click({force: true});
    cy.get('#tableRange01').contains('2023-03-01 to 2023-04-15');
    cy.get('#0112').find('p').should('be.empty');
    cy.get('#0185').contains('p', 'COSC292');
    cy.get('#0185').contains('p', 'Barrie');
    cy.get('#0185').contains('p', '239A');
    cy.wait(50);

    // Testing that a split that is generated can be deleted
    cy.get('#nextA').should('be.visible').click({force: true});
    cy.get('#tableRange02').contains('2023-04-15 to 2023-04-28');
    cy.get('#0285').contains('p', 'COSC292'); // selects da box
    cy.get('#0285').contains('p', 'Barrie');
    cy.get('#0285').contains('p', '239A');
    cy.get('#0285').rightclick({force: true});
    cy.get('#0085').find('p').should('be.empty');
    cy.get('#tableRange00').contains('2023-01-02 to 2023-04-15');
  });

  it('testSplitSchedule', () => {
    // Editing a split course will modify the schedule info
    cy.visit('http://localhost:3000/courseOffering');
    cy.get('#18edit').click();
    cy.wait(500);
    cy.get('#eStartDate').clear().type('2023-01-03');
    cy.wait(500);
    cy.get('#editCO').click();
    cy.visit(urlGET);
    cy.contains('Program');
    cy.get('#programSelect').select('CNT');
    cy.get('#termSelect').select('2022-2023 - Term 2');
    cy.get('#groupSelect').select('4');
    cy.get('#modalSubmit').click();
    // Course offering should have a new start date
    cy.get('#180A').contains('2023-01-03');
    // Deleting a course that splits the schedule gets rid of split
    cy.visit('http://localhost:3000/courseOffering');
    cy.get('#18delete').click();
    cy.wait(500);
    cy.get('#deleteCO').click();
    cy.visit(urlGET);
    cy.contains('Program');
    cy.get('#programSelect').select('CNT');
    cy.get('#termSelect').select('2022-2023 - Term 2');
    cy.get('#groupSelect').select('4');
    cy.get('#modalSubmit').click();
    cy.get('table').should('not.contain.text', 'COHS190');
  });


  /**
   * Test for B
   */
  it('testSplitScheduleB', () => {
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
    cy.get('#modalSubmit').should('be.disabled');
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

    cy.get('#Bbutton').click();

    // Testing adding course to cell
    cy.get('.COButtons').should('have.length.greaterThan', 0);
    cy.get('#220B').click();
    cy.get('#1011').click();
    cy.get('#1011').contains('p', 'COHS190');
    cy.get('#1011').contains('p', 'Benson / Caron');
    cy.get('#1011').contains('p', '239A');
    cy.get('.COButtons').should('have.length.greaterThan', 0);

    // testing adding a split course to cell and CO that is only avaliable in last table isnt in first
    cy.get('#250B').click({force: true});
    cy.get('#1012').click();
    cy.get('#250B').should('not.exist');
    cy.wait(100);

    // testing that you can move to next page once split is made
    cy.get('#nextB').should('be.visible').click();
    cy.get('#251B').should('exist');
    cy.get('#tableRange11').contains('2023-04-15 to 2023-04-28');

    // testing that you can add stuff to new page
    cy.get('#1112').contains('p', 'TCOM291');
    cy.get('#1112').contains('p', 'Holtslan');
    cy.get('#1112').contains('p', '239A');
    cy.get('#prevB').should('be.visible').click({force: true});
    // testing that you can move back to original page and timeslot that exists only on last page shouldnt be there
    cy.get('#tableRange10').contains('2023-01-02 to 2023-04-15');
    cy.get('#1012').find('p').should('be.empty');
    cy.get('#221B').click({force: true});
    cy.get('#1012').click({force: true});
    cy.get('#1012').find('p').should('be.empty');
    cy.wait(50);

    // Testing that range is in correct format
    cy.get('#nextB').should('be.visible').click({force: true});
    cy.get('#tableRange11').contains('2023-04-15 to 2023-04-28');
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

    // Testing that a third split can be made
    cy.get('#231B').click({force: true});
    cy.get('#1185').click({force: true});
    cy.get('#tableRange11').contains('2023-03-01 to 2023-04-15');
    cy.get('#1112').find('p').should('be.empty');
    cy.get('#1185').contains('p', 'COSC292');
    cy.get('#1185').contains('p', 'Barrie');
    cy.get('#1185').contains('p', '239A');
    cy.wait(50);

    // Testing that a split that is generated can be deleted
    cy.get('#nextB').should('be.visible').click({force: true});
    cy.get('#tableRange12').contains('2023-04-15 to 2023-04-28');
    cy.get('#1285').contains('p', 'COSC292'); // selects da box
    cy.get('#1285').contains('p', 'Barrie');
    cy.get('#1285').contains('p', '239A');
    cy.get('#1285').rightclick({force: true});
    cy.get('#1085').find('p').should('be.empty');
    cy.get('#tableRange10').contains('2023-01-02 to 2023-04-15');
  });

  /**
   * Test for C
   */
  it('testSplitScheduleC', () => {
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


    // testThatTermSelectBoxesAreSorted
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
    cy.get('#modalSubmit').should('be.disabled');
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
    cy.get('#Cbutton').click();

    // Testing adding course to cell
    cy.get('.COButtons').should('have.length.greaterThan', 0);
    cy.get('#260C').click();
    cy.get('#2011').click();
    cy.get('#2011').contains('p', 'COHS190');
    cy.get('#2011').contains('p', 'Benson / Caron');
    cy.get('#2011').contains('p', '239A');
    cy.get('.COButtons').should('have.length.greaterThan', 0);

    // testing adding a split course to cell and CO that is only avaliable in last table isnt in first
    cy.get('#290C').click({force: true});
    cy.get('#2012').click();
    cy.get('#290C').should('not.exist');
    cy.wait(100);

    // testing that you can move to next page once split is made
    cy.get('#nextC').should('be.visible').click();
    cy.get('#291C').should('exist');
    cy.get('#tableRange21').contains('2023-04-15 to 2023-04-28');

    // testing that you can add stuff to new page
    cy.get('#2112').contains('p', 'TCOM291');
    cy.get('#2112').contains('p', 'Holtslan');
    cy.get('#2112').contains('p', '239A');
    cy.get('#prevC').should('be.visible').click({force: true});
    // testing that you can move back to original page and timeslot that exists only on last page shouldnt be there
    cy.get('#tableRange20').contains('2023-01-02 to 2023-04-15');
    cy.get('#2012').find('p').should('be.empty');
    cy.get('#261C').click({force: true});
    cy.get('#2012').click({force: true});
    cy.get('#2012').find('p').should('be.empty');
    cy.wait(50);

    // Testing that range is in correct format
    cy.get('#nextC').should('be.visible').click({force: true});
    cy.get('#tableRange21').contains('2023-04-15 to 2023-04-28');
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

    // Testing that a third split can be made
    cy.get('#271C').click({force: true});
    cy.get('#2185').click({force: true});
    cy.get('#tableRange21').contains('2023-03-01 to 2023-04-15');
    cy.get('#2112').find('p').should('be.empty');
    cy.get('#2185').contains('p', 'COSC292');
    cy.get('#2185').contains('p', 'Barrie');
    cy.get('#2185').contains('p', '239A');
    cy.wait(50);

    // Testing that a split that is generated can be deleted
    cy.get('#nextC').should('be.visible').click({force: true});
    cy.get('#tableRange22').contains('2023-04-15 to 2023-04-28');
    cy.get('#2285').contains('p', 'COSC292'); // selects da box
    cy.get('#2285').contains('p', 'Barrie');
    cy.get('#2285').contains('p', '239A');
    cy.get('#2285').rightclick({force: true});
    cy.get('#2085').find('p').should('be.empty');
    cy.get('#tableRange20').contains('2023-01-02 to 2023-04-15');
  });


  /**
   * Test for D
   */
  it('testSplitScheduleD', () => {
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
    cy.get('#modalSubmit').should('be.disabled');
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

    cy.get('#Dbutton').click();

    // Testing adding course to cell
    cy.get('.COButtons').should('have.length.greaterThan', 0);
    cy.get('#300D').click();
    cy.get('#3011').click();
    cy.get('#3011').contains('p', 'COHS190');
    cy.get('#3011').contains('p', 'Benson / Caron');
    cy.get('#3011').contains('p', '239A');
    cy.get('.COButtons').should('have.length.greaterThan', 0);

    // testing adding a split course to cell and CO that is only avaliable in last table isnt in first
    cy.get('#330D').click({force: true});
    cy.get('#3012').click();
    cy.get('#330D').should('not.exist');
    cy.wait(100);

    // testing that you can move to next page once split is made
    cy.get('#nextD').should('be.visible').click();
    cy.get('#331D').should('exist');
    cy.get('#tableRange31').contains('2023-04-15 to 2023-04-28');

    // testing that you can add stuff to new page
    cy.get('#3112').contains('p', 'TCOM291');
    cy.get('#3112').contains('p', 'Holtslan');
    cy.get('#3112').contains('p', '239A');
    cy.get('#prevD').should('be.visible').click({force: true});
    // testing that you can move back to original page and timeslot that exists only on last page shouldnt be there
    cy.get('#tableRange30').contains('2023-01-02 to 2023-04-15');
    cy.get('#3012').find('p').should('be.empty');
    cy.get('#301D').click({force: true});
    cy.get('#3012').click({force: true});
    cy.get('#3012').find('p').should('be.empty');
    cy.wait(50);

    // Testing that range is in correct format
    cy.get('#nextD').should('be.visible').click({force: true});
    cy.get('#tableRange31').contains('2023-04-15 to 2023-04-28');
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

    // Testing that a third split can be made
    cy.get('#311D').click({force: true});
    cy.get('#3185').click({force: true});
    cy.get('#tableRange31').contains('2023-03-01 to 2023-04-15');
    cy.get('#3112').find('p').should('be.empty');
    cy.get('#3185').contains('p', 'COSC292');
    cy.get('#3185').contains('p', 'Barrie');
    cy.get('#3185').contains('p', '239A');
    cy.wait(50);

    // Testing that a split that is generated can be deleted
    cy.get('#nextD').should('be.visible').click({force: true});
    cy.get('#tableRange32').contains('2023-04-15 to 2023-04-28');
    cy.get('#3285').contains('p', 'COSC292'); // selects da box
    cy.get('#3285').contains('p', 'Barrie');
    cy.get('#3285').contains('p', '239A');
    cy.get('#3285').rightclick({force: true});
    cy.get('#3085').find('p').should('be.empty');
    cy.get('#tableRange30').contains('2023-01-02 to 2023-04-15');
  });
});
