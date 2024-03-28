const EXPECTEDROOMS = ['239A', '239B', '239a', '240B', '241', '242C'];
const cornerIDs = ['#0-1-A', '#7-1-A', '#0-5-A', '#7-5-A']; // Monday 8am, 3pm, Friday 8am, 3pm

/**
 * Test for alternate instructor and classroom
 * Relies on existing schedule tests for full coverage
 */
it('testThatTimeslotHasAlternateInstructorAndClassroom', () => {

  // Visiting the page
  cy.visit('localhost:3000');
  cy.contains('Schedule Builder').click();
  cy.get('#programSelect').select('CST');
  cy.get('#termSelect').select('2023-3'); //TODO: Change display for this
  cy.get('#groupSelect').select('4');
  cy.get('#modalSubmit').click();

  // Check room dropdown is sorted numerically
  for (let i = 0; i < EXPECTEDROOMS.length; i++) {
    let nChild = i + 1;
    cy.get('#classroomSelectA > option:nth-child(' + nChild + ')').should('have.text', EXPECTEDROOMS[i]);
  }

  // Check that Course Offerings Hardware has alternate instructors, but Seminar does not
  cy.get('#Hardware-A').contains('Ben Benson');
  cy.get('#Hardware-A').contains('Hardware');
  cy.get('#Hardware-A').contains('2023-09-01 - 2023-12-15');
  cy.get('#Hardware-A').contains('Alternate: Wade Lahoda');
  cy.get('#Seminar-A').contains('Ron New');
  cy.get('#Seminar-A').contains('Seminar');
  cy.get('#Seminar-A').contains('2023-09-01 - 2023-12-15');
  //cy.get('#Seminar-A').contains.not('Alternate');

  // Select Room 241
  cy.get('#classroomSelectA').select('241');
  cy.wait(50);

  // Save both Hardware and Seminar, making sure that both have 241 selected
  cy.get('#Hardware-A').click();
  cy.wait(50);

  // Saving Hardware in the four corners
  for (let i = 0; i < cornerIDs.length; i++) {
    cy.get(cornerIDs[i]).click();
    cy.wait(50);
  }
  // Testing that the four corners are filled properly
  for (let i = 0; i < cornerIDs.length; i++) {
    cy.get(cornerIDs[i]).contains('CST');
    cy.get(cornerIDs[i]).contains('COHS190');
    cy.get(cornerIDs[i]).contains('Benson');
    cy.get(cornerIDs[i]).contains('Alternate: Lahoda');
    cy.get(cornerIDs[i]).contains('Room: 241');
  }

  // Selecting Seminar and placing it in the four corners
  cy.get('#Seminar-A').click();
  cy.wait(50);
  for (let i = 0; i < cornerIDs.length; i++) {
    cy.get(cornerIDs[i]).click();
    cy.wait(50);
  }

  // Testing that the four corners are filled properly
  for (let i = 0; i < cornerIDs.length; i++) {
    cy.get(cornerIDs[i]).contains('CST');
    cy.get(cornerIDs[i]).contains('SEM283');
    cy.get(cornerIDs[i]).contains('New');
    //cy.get(cornerIDs[i]).contains.not('Alternate');
    cy.get(cornerIDs[i]).contains('Room: 241');
  }

  // Now switching the room
  cy.get('#classroomSelectA').select('240B');
  cy.wait(50);

  // Placing Monday 8am and Friday at 3pm
  cy.get(cornerIDs[1]).click();
  cy.wait(50);
  cy.get(cornerIDs[3]).click();
  cy.wait(50);

  // Checking that it changed the room only for Monday 8am and Friday 3pm
  for (let i = 0; i < cornerIDs.length; i++) {
    cy.get(cornerIDs[i]).contains('CST');
    cy.get(cornerIDs[i]).contains('SEM283');
    cy.get(cornerIDs[i]).contains('New');
    //cy.get(cornerIDs[i]).contains.not('Alternate');
    // Checking if it is even, as we only modified odd
    if (i % 2 == 0) {
      cy.get(cornerIDs[i]).contains('Room: 241');
    } else {
      cy.get(cornerIDs[i]).contains('Room: 240B');
    }
  }

  // Check that an alternate instructor can be added back in
  cy.get('#Hardware-A').click();
  cy.wait(50);
  cy.get(cornerIDs[0]).click();
  cy.wait(50);
  cy.get(cornerIDs[2]).click();
  cy.wait(50);

  for (let i = 0; i < cornerIDs.length; i++) {

    // Checking if it is even, as we only modified even
    if (i % 2 == 0) {
      cy.get(cornerIDs[i]).contains('CST');
      cy.get(cornerIDs[i]).contains('COHS190');
      cy.get(cornerIDs[i]).contains('Benson');
      cy.get(cornerIDs[i]).contains('Alternate: Lahoda');
      cy.get(cornerIDs[i]).contains('Room: 240B');
    } else {
      cy.get(cornerIDs[i]).contains('CST');
      cy.get(cornerIDs[i]).contains('SEM283');
      cy.get(cornerIDs[i]).contains('New');
      //cy.get(cornerIDs[i]).contains.not('Alternate');
      cy.get(cornerIDs[i]).contains('Room: 240B');
    }
  }

  // Now need to do cleanup - remove the added timeslot
  for (let i = 0; i < cornerIDs.length; i++) {
    cy.get(cornerIDs[i]).rightclick();
    cy.wait(50);
  }

  // Reloading the page, to test classroom has first in list default selected
  cy.visit('localhost:3000');
  cy.contains('Schedule Builder').click();
  cy.get('#programSelect').select('CST');
  cy.get('#termSelect').select('2023-3'); //TODO: Change display for this
  cy.get('#groupSelect').select('4');
  cy.get('#modalSubmit').click();

  cy.get('#Seminar-A').click();
  cy.wait(50);

  // Making sure the first option in the classroom list is selected as default
  cy.get('#classroomSelectA').find('option:selected').should('have.text', '239A');

  for (let i = 0; i < cornerIDs.length; i++) {
    cy.get(cornerIDs[i]).click();
    cy.wait(50);
  }

  // Testing that the four corners are filled properly
  for (let i = 0; i < cornerIDs.length; i++) {
    cy.get(cornerIDs[i]).contains('CST');
    cy.get(cornerIDs[i]).contains('SEM283');
    cy.get(cornerIDs[i]).contains('New');
    //cy.get(cornerIDs[i]).contains.not('Alternate');
    cy.get(cornerIDs[i]).contains('Room: 239A');
  }

  // Now need to do cleanup - remove the added timeslot
  for (let i = 0; i < cornerIDs.length; i++) {
    cy.get(cornerIDs[i]).rightclick();
    cy.wait(50);
  }
});

/**
 * Test that Classroom is handled when it is deleted after creating a timeslot
 */
it('testThatDeletedClassroomIsHandled', () => {
  cy.visit('localhost:3000');
  cy.contains('Schedule Builder').click();
  cy.get('#programSelect').select('CST');
  cy.get('#termSelect').select('2023-3'); //TODO: Change display for this
  cy.get('#groupSelect').select('4');
  cy.get('#modalSubmit').click();

  // Check room dropdown is sorted numerically
  for (let i = 0; i < EXPECTEDROOMS.length; i++) {
    let nChild = i + 1;
    cy.get('#classroomSelectA > option:nth-child(' + nChild + ')').should('have.text', EXPECTEDROOMS[i]);
  }

  cy.get('#classroomSelectA').select('241');

  // Selecting Seminar and placing it in the four corners
  cy.get('#Seminar-A').click();
  for (let i = 0; i < cornerIDs.length; i++) {
    cy.get(cornerIDs[i]).click();
    cy.wait(50);
  }

  // Testing that the four corners are filled properly
  for (let i = 0; i < cornerIDs.length; i++) {
    cy.get(cornerIDs[i]).contains('CST');
    cy.get(cornerIDs[i]).contains('SEM283');
    cy.get(cornerIDs[i]).contains('New');
    //cy.get(cornerIDs[i]).contains.not('Alternate');
    cy.get(cornerIDs[i]).contains('Room: 241');
  }

  // Going to the classroom page to delete Room 241
  cy.visit('localhost:3000/Classroom');
  cy.get('tbody > tr:nth-child(5) > td:nth-child(3) > button:nth-child(2)').click();
  cy.get('#delClassroom').click();

  // revisiting the classroom
  cy.contains('Schedule Builder').click();
  cy.get('#programSelect').select('CST');
  cy.get('#termSelect').select('2023-3'); //TODO: Change display for this
  cy.get('#groupSelect').select('4');
  cy.get('#modalSubmit').click();


  const newROOMS = ['239A', '239B', '239a', '240B', '242C'];
  // Checking that Room 241 is no longer an option
  for (let i = 0; i < newROOMS.length; i++) {
    let nChild = i + 1;
    cy.get('#classroomSelectA > option:nth-child(' + nChild + ')').should('have.text', newROOMS[i]);
  }

  for (let i = 0; i < cornerIDs.length; i++) {
    cy.get(cornerIDs[i]).contains('CST');
    cy.get(cornerIDs[i]).contains('SEM283');
    cy.get(cornerIDs[i]).contains('New');
    //cy.get(cornerIDs[i]).contains.not('Alternate');
    cy.get(cornerIDs[i]).contains('Room: Deleted');
  }

  // Now need to do cleanup - remove the added timeslot
  for (let i = 0; i < cornerIDs.length; i++) {
    cy.get(cornerIDs[i]).rightclick();
    cy.wait(50);
  }

  // TODO: Call loaddb again
});
