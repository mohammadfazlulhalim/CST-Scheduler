it('testThatModalWorks', () => {
  // Opens main page - and go to Schedule Courses
  cy.visit('localhost:3000');
  cy.contains('Schedule Builder').click();
  cy.get('#scheduleModal').should('be.visible');

  // Check that Enter button is disabled
  cy.get('#modalSubmit').should('be.disabled');

  // Check that Program field can be entered
  cy.contains('Program');
  cy.get('#programSelect').select('CST');

  // Check that Enter button is disabled
  cy.get('#modalSubmit').should('be.disabled');

  // Check that Term field can be entered
  cy.contains('Term');
  cy.get('#termSelect').select('2024-5');

  // Check that Enter button is disabled
  cy.get('#modalSubmit').should('be.disabled');

  // Check that Group field can be entered
  cy.contains('Number of Groups');
  cy.get('#groupSelect').select('2');

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
  cy.get('#0-1-A').contains('CSEC280');
  cy.get('#1-2-A').contains('CSEC280');
  cy.get('#2-3-A').contains('CSEC280');
  cy.get('#3-4-A').contains('CSEC280');
  cy.get('#4-5-A').contains('CSEC280');


  // Looping to check that group a is visible and groub is hidden
  for (let t = 0; t < 8; t++) {
    for (let d = 1; d < 6; d++) {
      cy.get('#'+t+'-'+d+'-A').should('be.visible');
      cy.get('#'+t+'-'+d+'-B').should('be.hidden');
      if (t+1!==d) {
        cy.get('#'+t+'-'+d+'-A').should('be.empty');
      }
    }
  }

  cy.get('#Hardware-A').contains('Ben Benson');
  cy.get('#Hardware-A').should('be.visible');
  cy.get('#Seminar-B').should('be.hidden');

  cy.get('#btnB').click();

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
  cy.get('#7-1-B').contains('CSEC280');
  cy.get('#6-2-B').contains('CSEC280');
  cy.get('#5-3-B').contains('CSEC280');
  cy.get('#4-4-B').contains('CSEC280');
  cy.get('#3-5-B').contains('CSEC280');


  // Looping to check that group a is visible and groub is hidden
  for (let t = 0; t < 8; t++) {
    for (let d = 1; d < 6; d++) {
      cy.get('#'+t+'-'+d+'-B').should('be.visible');
      cy.get('#'+t+'-'+d+'-A').should('be.hidden');
      if (t+d!==8) {
        cy.get('#'+t+'-'+d+'-B').should('be.empty');
      }
    }
  }

  cy.get('#Seminar-B').contains('Ben Benson');
  cy.get('#Hardware-A').should('be.hidden');
  cy.get('#Seminar-B').should('be.visible');
});
