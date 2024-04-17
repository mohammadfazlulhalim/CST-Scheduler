// Resets the DB before the first test (this test does not do any saving, so beforeEach
// just slows the test down
before(()=>{
  cy.exec('node electron-db-reset.js');
});


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

  /* cy.get('#time').then((tdElement) => {
    // Use .text() to get the text content of the <td> element
    const tdText = tdElement.text();


    expect(tdText).contains('Time');
  });*/

  // checking that the table displays properly
  cy.get('#0000').contains('Time');
  cy.get('#0001').contains('Monday');
  cy.get('#0002').contains('Tuesday');
  cy.get('#0003').contains('Wednesday');
  cy.get('#0004').contains('Thursday');
  cy.get('#0005').contains('Friday');
  cy.get('#0010').contains('8:00');
  cy.get('#0020').contains('9:00');
  cy.get('#0030').contains('10:00');
  cy.get('#0040').contains('11:00');
  cy.get('#0050').contains('12:00');
  cy.get('#0060').contains('1:00');
  cy.get('#0070').contains('2:00');
  cy.get('#0080').contains('3:00');
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
  const programList = ['CNT', 'CST', 'ECE'];
  for (let i = 0; i < programList.length; i++) {
    const nChild = i + 2;
    cy.get('#programSelect > option:nth-child(' + nChild + ')').should('have.text', programList[i]);
  }

  cy.get('#programSelect').select('CST');

  // Check that Enter button is disabled
  cy.get('#modalSubmit').should('be.disabled');

  /* // Check that Term field can be entered
  cy.contains('Term');
  const termList = ['2023-2024 - Term 1', '2023-2024 - Term 4', '2023-2024 - Term 5', '2022-2023 - Term 2', '2022-2023 - Term 3', '2022-2023 - Term 5', '2022-2023 - Term 6'];
  for (let i = 0; i < termList.length; i++) {
    const nChild = i + 2;
    cy.get('#termSelect > option:nth-child(' + nChild + ')').should('have.text', termList[i]);
  }*/

  cy.get('#termSelect').select('2023-2024 - Term 5');

  // Check that Enter button is disabled
  cy.get('#modalSubmit').should('be.disabled');

  // Check that Group field can be entered
  // cy.contains('Number of Groups');
  cy.get('#groupSelect').select('4');

  cy.get('#modalSubmit').should('not.be.disabled');
  cy.get('#modalSubmit').click();

  cy.get('#scheduleModal').should('be.hidden');

  /*  cy.get('#time').then((tdElement) => {
    // Use .text() to get the text content of the <td> element
    const tdText = tdElement.text();
    expect(tdText).contains('Time');
  });*/


  // DONE check group C
  cy.get('#Cbutton').click();
  cy.wait(250);

  cy.get('#2001').contains('Monday');
  cy.get('#2002').contains('Tuesday');
  cy.get('#2003').contains('Wednesday');
  cy.get('#2004').contains('Thursday');
  cy.get('#2005').contains('Friday');
  cy.get('#2010').contains('8:00');
  cy.get('#2020').contains('9:00');
  cy.get('#2030').contains('10:00');
  cy.get('#2040').contains('11:00');
  cy.get('#2050').contains('12:00');
  cy.get('#2060').contains('1:00');
  cy.get('#2070').contains('2:00');
  cy.get('#2080').contains('3:00');


  for (let col= 1; col<6; col++) {
    for (let row=1; row<9; row++) {
      cy.get('#20'+row+col).should('be.visible');
    }
  }
  // DONE check group C
  cy.get('#Dbutton').click();
  cy.wait(250);

  cy.get('#3001').contains('Monday');
  cy.get('#3002').contains('Tuesday');
  cy.get('#3003').contains('Wednesday');
  cy.get('#3004').contains('Thursday');
  cy.get('#3005').contains('Friday');
  cy.get('#3010').contains('8:00');
  cy.get('#3020').contains('9:00');
  cy.get('#3030').contains('10:00');
  cy.get('#3040').contains('11:00');
  cy.get('#3050').contains('12:00');
  cy.get('#3060').contains('1:00');
  cy.get('#3070').contains('2:00');
  cy.get('#3080').contains('3:00');

  for (let col= 1; col<6; col++) {
    for (let row=1; row<9; row++) {
      cy.get('#30'+row+col).should('be.visible');
    }
  }
});
