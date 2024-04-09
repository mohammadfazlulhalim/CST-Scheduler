// Resets the DB before each test
beforeEach(()=>{
  cy.exec('node electron-db-reset.js');
})

it('testThatModalWorks', () => {
  // Opens main page - and go to Schedule Courses
  cy.visit('localhost:3000');
  cy.contains('Schedule Builder').click();
  cy.get('#scheduleModal').should('be.visible');

  // Sort orders are checked in the other test, as one giant test was not running smoothly

  // Check that Enter button is disabled
  cy.get('#modalSubmit').should('be.disabled');

  // Check that Program field can be entered
  cy.contains('Program');
  cy.get('#programSelect').select('CST');

  // Check that Enter button is disabled
  cy.get('#modalSubmit').should('be.disabled');

  // Check that Term field can be entered
  cy.contains('Term');
  cy.get('#termSelect').select('2023-2024 - Term 5');

  // Check that Enter button is disabled
  cy.get('#modalSubmit').should('be.disabled');

  // Check that Group field can be entered
  cy.contains('Number of Groups');
  cy.get('#groupSelect').select('4');

  cy.get('#modalSubmit').should('not.be.disabled');
  cy.get('#modalSubmit').click();

  cy.get('#scheduleModal').should('be.hidden');

  cy.get('#time').then((tdElement) => {
    // Use .text() to get the text content of the <td> element
    const tdText = tdElement.text();


    expect(tdText).contains('Time');
  });

  // checking that the table displays properly
  cy.get('#mon').contains('Monday');
  cy.get('#tues').contains('Tuesday');
  cy.get('#wed').contains('Wednesday');
  cy.get('#thurs').contains('Thursday');
  cy.get('#fri').contains('Friday');
  cy.get('#0-0-A').contains('8:00');
  cy.get('#1-0-A').contains('9:00');
  cy.get('#2-0-A').contains('10:00');
  cy.get('#3-0-A').contains('11:00');
  cy.get('#4-0-A').contains('12:00');
  cy.get('#5-0-A').contains('1:00');
  cy.get('#6-0-A').contains('2:00');
  cy.get('#7-0-A').contains('3:00');

  // DONE check group a has specific tiles filled
  cy.get('#0-1-A').should('have.text', '\n                                        \n                                            CSEC280\n                                            Benson\n\n                                                Room: 239a\n                                        \n\n                                    ');
  cy.get('#1-2-A').should('have.text', '\n                                        \n                                            CSEC280\n                                            Benson\n\n                                                Room: 239a\n                                        \n\n                                    ');
  cy.get('#2-3-A').should('have.text', '\n                                        \n                                            CSEC280\n                                            Benson\n\n                                                Room: 239a\n                                        \n\n                                    ');
  cy.get('#3-4-A').should('have.text', '\n                                        \n                                            CSEC280\n                                            Benson\n\n                                                Room: 239a\n                                        \n\n                                    ');
  cy.get('#4-5-A').should('have.text', '\n                                        \n                                            CSEC280\n                                            Benson\n\n                                                Room: 239a\n                                        \n\n                                    ');

  // Looping to check that group a is visible and groub is hidden
  for (let t = 0; t < 8; t++) {
    for (let d = 1; d < 6; d++) {
      cy.get('#'+t+'-'+d+'-A').should('be.visible');
      cy.get('#'+t+'-'+d+'-B').should('be.hidden');
      cy.get('#' + t + '-' + d + '-C').should('be.hidden');
      cy.get('#' + t + '-' + d + '-D').should('be.hidden');
      if (t+1!==d) {
        cy.get('#'+t+'-'+d+'-A').should('have.class','empty');
      }
    }
  }

  // cy.get('#Mathematics\\ of\\ Computation-A').should('have.text', '\n                                    \n                            Hardware\n                            Ben Benson\n                            2023-09-01-2023-12-15\n                        ');
  cy.get('#Mathematics\\ of\\ Computation-A').contains('Ben Benson');
  cy.get('#Mathematics\\ of\\ Computation-A').contains('Mathematics of Computation');
  cy.get('#Mathematics\\ of\\ Computation-A').contains('2023-09-01 - 2023-10-31');
  cy.get('#Mathematics\\ of\\ Computation-A').should('be.visible');
  cy.get('#Seminar-B').should('be.hidden');

  cy.get('#btnB').click();
  cy.wait(250);

  cy.get('#mon').contains('Monday');
  cy.get('#tues').contains('Tuesday');
  cy.get('#wed').contains('Wednesday');
  cy.get('#thurs').contains('Thursday');
  cy.get('#fri').contains('Friday');
  cy.get('#0-0-B').contains('8:00');
  cy.get('#1-0-B').contains('9:00');
  cy.get('#2-0-B').contains('10:00');
  cy.get('#3-0-B').contains('11:00');
  cy.get('#4-0-B').contains('12:00');
  cy.get('#5-0-B').contains('1:00');
  cy.get('#6-0-B').contains('2:00');
  cy.get('#7-0-B').contains('3:00');

  // DONE check group a has specific tiles filled

  cy.get('#7-1-B').should('have.text', '\n                                        \n                                            CSEC280\n                                            Benson\n\n                                                Room: 239a\n                                        \n\n                                    ');
  cy.get('#6-2-B').should('have.text', '\n                                        \n                                            CSEC280\n                                            Benson\n\n                                                Room: 239a\n                                        \n\n                                    ');
  cy.get('#5-3-B').should('have.text', '\n                                        \n                                            CSEC280\n                                            Benson\n\n                                                Room: 239a\n                                        \n\n                                    ');
  cy.get('#4-4-B').should('have.text', '\n                                        \n                                            CSEC280\n                                            Benson\n\n                                                Room: 239a\n                                        \n\n                                    ');
  cy.get('#3-5-B').should('have.text', '\n                                        \n                                            CSEC280\n                                            Benson\n\n                                                Room: 239a\n                                        \n\n                                    ');

  // Looping to check that group a is visible and groub is hidden
  for (let t = 0; t < 8; t++) {
    for (let d = 1; d < 6; d++) {
      cy.get('#'+t+'-'+d+'-B').should('be.visible');
      cy.get('#'+t+'-'+d+'-A').should('be.hidden');
      cy.get('#' + t + '-' + d + '-C').should('be.hidden');
      cy.get('#' + t + '-' + d + '-D').should('be.hidden');
      if (t+d!==8) {
        cy.get('#'+t+'-'+d+'-B').should('have.class','empty');
      }
    }
  }

  // cy.get('#Seminar-B').should('have.text', '\n                                    \n                            Seminar\n                            Ben Benson\n                            2023-09-01-2023-12-15\n                        ');
  cy.get('#Seminar-B').contains('Seminar');
  cy.get('#Seminar-B').contains('Ben Benson');
  cy.get('#Seminar-B').contains('2023-09-01 - 2023-12-15');
  cy.get('#Mathematics\\ of\\ Computation-A').should('be.hidden');
  cy.get('#Seminar-B').should('be.visible');

  // Group C and D are checked in the other test
});

it('testTechDebt', () => {
  // Checks sort order in modal and group C and D schedules

  // Opens main page - and go to Schedule Courses
  cy.visit('localhost:3000');
  cy.contains('Schedule Builder').click();
  cy.get('#scheduleModal').should('be.visible');

  // Check that Enter button is disabled
  cy.get('#modalSubmit').should('be.disabled');

  // Check that Program field can be entered
  cy.contains('Program');
  let programList = ['CNT', 'CST', 'ECE'];
  for (let i = 0; i < programList.length; i++) {
    let nChild = i + 2;
    cy.get('#programSelect > option:nth-child(' + nChild + ')').should('have.text', programList[i]);
  }

  cy.get('#programSelect').select('CST');

  // Check that Enter button is disabled
  cy.get('#modalSubmit').should('be.disabled');

  // Check that Term field can be entered
  cy.contains('Term');
  let termList = ['2023-2024 - Term 1', '2023-2024 - Term 4', '2023-2024 - Term 5', '2022-2023 - Term 2', '2022-2023 - Term 3', '2022-2023 - Term 5', '2022-2023 - Term 6'];
  for (let i = 0; i < termList.length; i++) {
    let nChild = i + 2;
    cy.get('#termSelect > option:nth-child(' + nChild + ')').should('have.text', termList[i]);
  }

  cy.get('#termSelect').select('2023-2024 - Term 5');

  // Check that Enter button is disabled
  cy.get('#modalSubmit').should('be.disabled');

  // Check that Group field can be entered
  cy.contains('Number of Groups');
  cy.get('#groupSelect').select('4');

  cy.get('#modalSubmit').should('not.be.disabled');
  cy.get('#modalSubmit').click();

  cy.get('#scheduleModal').should('be.hidden');

  cy.get('#time').then((tdElement) => {
    // Use .text() to get the text content of the <td> element
    const tdText = tdElement.text();
    expect(tdText).contains('Time');
  });


// DONE check group C
  cy.get('#btnC').click();
  cy.wait(250);

  cy.get('#mon').contains('Monday');
  cy.get('#tues').contains('Tuesday');
  cy.get('#wed').contains('Wednesday');
  cy.get('#thurs').contains('Thursday');
  cy.get('#fri').contains('Friday');
  cy.get('#0-0-C').contains('8:00');
  cy.get('#1-0-C').contains('9:00');
  cy.get('#2-0-C').contains('10:00');
  cy.get('#3-0-C').contains('11:00');
  cy.get('#4-0-C').contains('12:00');
  cy.get('#5-0-C').contains('1:00');
  cy.get('#6-0-C').contains('2:00');
  cy.get('#7-0-C').contains('3:00');

  for (let t = 0; t < 8; t++) {
    for (let d = 1; d < 6; d++) {
      cy.get('#' + t + '-' + d + '-C').should('be.visible');
      cy.get('#' + t + '-' + d + '-A').should('be.hidden');
      cy.get('#' + t + '-' + d + '-B').should('be.hidden');
      cy.get('#' + t + '-' + d + '-D').should('be.hidden');
      cy.get('#' + t + '-' + d + '-C').should('have.class','empty');
    }
  }


// DONE check group D
  cy.get('#btnD').click();
  cy.wait(250);
  cy.get('#mon').contains('Monday');
  cy.get('#tues').contains('Tuesday');
  cy.get('#wed').contains('Wednesday');
  cy.get('#thurs').contains('Thursday');
  cy.get('#fri').contains('Friday');
  cy.get('#0-0-D').contains('8:00');
  cy.get('#1-0-D').contains('9:00');
  cy.get('#2-0-D').contains('10:00');
  cy.get('#3-0-D').contains('11:00');
  cy.get('#4-0-D').contains('12:00');
  cy.get('#5-0-D').contains('1:00');
  cy.get('#6-0-D').contains('2:00');
  cy.get('#7-0-D').contains('3:00');

  for (let t = 0; t < 8; t++) {
    for (let d = 1; d < 6; d++) {
      cy.get('#' + t + '-' + d + '-D').should('be.visible');
      cy.get('#' + t + '-' + d + '-A').should('be.hidden');
      cy.get('#' + t + '-' + d + '-B').should('be.hidden');
      cy.get('#' + t + '-' + d + '-C').should('be.hidden');
      cy.get('#' + t + '-' + d + '-D').should('have.class','empty');
    }
  }

});