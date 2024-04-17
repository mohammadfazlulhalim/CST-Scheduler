describe('story52Tests', async () => {
  const EXPECTEDROOMS = ['239A', '239B', '240B', '242C', '241', '239a'];
  const cornerIDs = ['#0011', '#0015', '#0081', '#0085']; // Monday 8am, 3pm, Friday 8am, 3pm

  // Resets the DB before each test
  beforeEach(()=>{
    cy.exec('node electron-db-reset.js');
  });

  /**
   * Test that Classroom is handled when it is deleted after creating a timeslot
   */
  it('testThatDeletedClassroomIsHandled', () => {
    cy.visit('localhost:3000');
    cy.contains('Schedule Builder').click();
    cy.get('#programSelect').select('CNT');
    cy.get('#termSelect').select('2022-2023 - Term 2');
    cy.get('#groupSelect').select('4');
    cy.get('#modalSubmit').click();

    // Check room dropdown is sorted numerically
    for (let i = 0; i < EXPECTEDROOMS.length; i++) {
      const nChild = i + 1;
      cy.get('#classroomSelect00 > option:nth-child(' + nChild + ')').should('have.text', EXPECTEDROOMS[i]);
    }

    cy.get('#classroomSelect00').select('241');

    // Selecting Seminar and placing it in the four corners
    cy.get('#180A').click();
    for (let i = 0; i < cornerIDs.length; i++) {
      cy.get(cornerIDs[i]).click();
      cy.wait(50);
    }

    // Testing that the four corners are filled properly
    for (let i = 0; i < cornerIDs.length; i++) {
      cy.get(cornerIDs[i]).contains('COHS190');
       cy.get(cornerIDs[i]).contains('Benson / Caron');
      cy.get(cornerIDs[0]).contains('241');
      cy.get(cornerIDs[1]).contains('239A');
      cy.get(cornerIDs[2]).contains('239A');
      cy.get(cornerIDs[3]).contains('239A');
    }

    // Going to the classroom page to delete Room 241
    cy.visit('localhost:3000/Classroom');
    cy.get('tbody > tr:nth-child(5) > td:nth-child(3) > button:nth-child(2)').click();
    cy.get('#delClassroom').click();

    // revisiting the classroom
    cy.contains('Schedule Builder').click();
    cy.get('#programSelect').select('CST');
    cy.get('#termSelect').select('2022-2023 - Term 3');
    cy.get('#groupSelect').select('4');
    cy.get('#modalSubmit').click();


    const newROOMS = ['239A', '239B', '240B', '242C', '239a'];
    // Checking that Room 241 is no longer an option
    for (let i = 0; i < newROOMS.length; i++) {
      const nChild = i + 1;
      cy.get('#classroomSelect00 > option:nth-child(' + nChild + ')').should('have.text', newROOMS[i]);
    }

    for (let i = 0; i < cornerIDs.length; i++) {

      cy.get(cornerIDs[i]).find('p')          // Find all <p> elements inside this <td>
          .eq(2)              // Select the third <p> (index starts at 0)
          .then(pElement => {
            // You can interact or assert something about the third <p> element here
            cy.wrap(pElement).should('be.empty');  // Example assertion
          });
    }

    // the beforeEach will handle cleanup, as it will run before the second test
  });


  /**
   * This test creates a classroom conflict, and checks if the conflict is found
   */
  it('testThatClassroomConflictIsFound', ()=>{
    // Visiting the page
    cy.visit('localhost:3000');
    cy.contains('Schedule Builder').click();
    cy.get('#programSelect').select('CNT');
    cy.get('#termSelect').select('2022-2023 - Term 2');
    cy.get('#groupSelect').select('4');
    cy.get('#modalSubmit').click();

    // Select Room 241
    cy.get('#classroomSelect00').select('241');
    cy.wait(50);

    // Save both Hardware and Seminar, making sure that both have 241 selected
    cy.get('#240B').click({force: true});
    cy.wait(50);

    cy.get('#0011').click();
    cy.wait(50);

    // switching to groupB
    cy.get('#Bbutton').click();

    // Select Room 241
    cy.get('#classroomSelect10').select('241');
    cy.wait(50);

    cy.get('#240B').click();
    cy.wait(50);

    cy.get('#1011').click();
    cy.wait(50);

    // navigating to classroom conflict page
    cy.contains('Reports').click();
    cy.contains('Classroom Conflict Report').click();

    cy.get('#classroomSelect').select('241');
    cy.get('#termSelect').select('2022-2023 - Term 2');

    cy.get('#modalSubmit').click();

    cy.get('#selectedClassroom').contains('241');
    cy.get("#selectedTerm").contains('Term 2');
  });

  /**
   * Deletes all classrooms and then tries to save it
   */
  it('testThatTimeslotDoesNotSaveWithoutClassroom', ()=>{
    // deleting all classrooms
    cy.visit('localhost:3000/Classroom');
    for (let i=1; i<7; i++) {
      cy.get('tbody > tr:nth-child(1) > td:nth-child(3) > button:nth-child(2)').click(); // deleting the first one, seven times
      cy.get('#delClassroom').click();
    }

    // Visiting the page
    cy.visit('localhost:3000');
    cy.contains('Schedule Builder').click();
    cy.get('#programSelect').select('CNT');
    cy.get('#termSelect').select('2022-2023 - Term 2');
    cy.get('#groupSelect').select('4');
    cy.get('#modalSubmit').click();

    // trying to save
    cy.get('#classroomSelect00 > option:nth-child(2)').should('not.exist');


    cy.get('#180A').click();
    cy.wait(50);

    // Saving Hardware in first spot
    cy.get(cornerIDs[0]).click();
    cy.wait(50);

  });


  /**
   * Test for alternate instructor and classroom
   * Relies on existing schedule tests for full coverage
   */
  it('testThatTimeslotHasAlternateInstructorAndClassroom', () => {
    // Visiting the page
    cy.visit('localhost:3000');
    cy.contains('Schedule Builder').click();
    cy.get('#programSelect').select('CNT');
    cy.get('#termSelect').select('2022-2023 - Term 2');
    cy.get('#groupSelect').select('4');
    cy.get('#modalSubmit').click();

    // Check room dropdown is sorted numerically
    for (let i = 0; i < EXPECTEDROOMS.length; i++) {
      const nChild = i + 1;
      cy.get('#classroomSelect00 > option:nth-child(' + nChild + ')').should('have.text', EXPECTEDROOMS[i]);
    }

    // Check that Course Offerings Hardware has alternate instructors, but Seminar does not
    cy.get('#180A').contains('Benson');
    cy.get('#180A').contains('Hardware');
    cy.get('#180A').contains('Caron');
    cy.get('#200A').contains('Onishenko');
    cy.get('#200A').contains('Seminar');


    // Select Room 241
    cy.get('#classroomSelect00').select('241');
    cy.wait(50);

    // Save both Hardware and Seminar, making sure that both have 241 selected
    cy.get('#180A').click();
    cy.wait(50);

    // Saving Hardware in the four corners
    for (let i = 0; i < cornerIDs.length; i++) {
      cy.get(cornerIDs[i]).click();
      cy.wait(50);
    }
    // Testing that the four corners are filled properly
    for (let i = 0; i < cornerIDs.length; i++) {
      cy.get(cornerIDs[i]).contains('COHS190');
      cy.get(cornerIDs[i]).contains('Benson / Caron');

    }

    // Selecting Seminar and placing it in the four corners
    cy.get('#200A').click();
    cy.wait(50);
    for (let i = 0; i < cornerIDs.length; i++) {
      cy.get(cornerIDs[i]).click();
      cy.wait(50);
    }

    // Testing that the four corners are filled properly
    for (let i = 0; i < cornerIDs.length; i++) {
      cy.get(cornerIDs[i]).contains('SEM283');
      cy.get(cornerIDs[i]).contains('Onishenko');

    }

    // Now switching the room
    cy.get('#classroomSelect00').select('240B');
    cy.wait(50);

    // Placing Monday 8am and Friday at 3pm
    cy.get(cornerIDs[1]).click();
    cy.wait(50);
    cy.get(cornerIDs[3]).click();
    cy.wait(50);



    // Check that an alternate instructor can be added back in
    cy.get('#180A').click();
    cy.wait(50);
    cy.get(cornerIDs[0]).click();
    cy.wait(50);
    cy.get(cornerIDs[2]).click();
    cy.wait(50);

    for (let i = 0; i < cornerIDs.length; i++) {
      // Checking if it is even, as we only modified even
      if (i % 2 == 0) {
        cy.get(cornerIDs[i]).contains('COHS190');
        cy.get(cornerIDs[i]).contains('Benson / Caron');

      } else {
        cy.get(cornerIDs[i]).contains('SEM283');
        cy.get(cornerIDs[i]).contains('Onishenko');

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
    cy.get('#programSelect').select('CNT');
    cy.get('#termSelect').select('2022-2023 - Term 2');
    cy.get('#groupSelect').select('4');
    cy.get('#modalSubmit').click();

    cy.get('#200A').click();
    cy.wait(50);

    // Making sure the first option in the classroom list is selected as default
    cy.get('#classroomSelect00').find('option:selected').should('have.text', '239A');

    for (let i = 0; i < cornerIDs.length; i++) {
      cy.get(cornerIDs[i]).click();
      cy.wait(50);
    }

    // Testing that the four corners are filled properly
    for (let i = 0; i < cornerIDs.length; i++) {
      cy.get(cornerIDs[i]).contains('SEM283');
      cy.get(cornerIDs[i]).contains('Onishenko');

    }

    // Now need to do cleanup - remove the added timeslot
    for (let i = 0; i < cornerIDs.length; i++) {
      cy.get(cornerIDs[i]).rightclick();
      cy.wait(50);
    }
  });
});
