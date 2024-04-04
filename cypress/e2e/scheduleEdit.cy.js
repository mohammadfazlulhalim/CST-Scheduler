

// groupLetters = ['A', 'B', 'C', 'D'];
const groupLetters = ['A'];

describe('Test Editing the Schedule', () => {

  // Resets the DB before each test
  beforeEach(()=>{
    cy.exec('node electron-db-reset.js');
  })

  it('Test1', ()=> {
  // Goes to the page and loads test schedule
    cy.visit('localhost:3000');
    cy.contains('Schedule Builder').click();
    cy.get('#programSelect').select('CST');
    cy.get('#termSelect').select('2022-2023 - Term 3');
    cy.get('#groupSelect').select('4');
    cy.get('#modalSubmit').click();

    // Runs all tests for each group page
    // eslint-disable-next-line guard-for-in
    for (const letter of groupLetters) {
      cy.get('#btn' + letter).click();

      // Tests that course offering exists
      cy.get('#Hardware-' + letter).contains('Ben Benson');
      cy.get('#Hardware-' + letter).should('be.visible');
      cy.get('#Seminar-' + letter).contains('Ron New');
      cy.get('#Seminar-' + letter).should('be.visible');

      // Test that no CO are highlighted
      cy.get('#Hardware-' + letter).should('have.class', 'bg-secondary');
      cy.get('#Seminar-' + letter).should('have.class', 'bg-secondary');

      // Test that clicking CO highlights it
      cy.get('#Hardware-' + letter).click();
      cy.get('#Hardware-' + letter).should('have.class', 'bg-info');
      cy.get('#Seminar-' + letter).should('have.class', 'bg-secondary');

      // Test that clicking other CO removes highlight from first CO
      cy.get('#Seminar-' + letter).click();
      cy.get('#Hardware-' + letter).should('have.class', 'bg-secondary');
      cy.get('#Seminar-' + letter).should('have.class', 'bg-info');

      // Test that clicking same CO removes highlights
      cy.get('#Seminar-' + letter).click();
      cy.get('#Hardware-' + letter).should('have.class', 'bg-secondary');
      cy.get('#Seminar-' + letter).should('have.class', 'bg-secondary');


      cy.get('#Hardware-' + letter).click();
      cy.get('#Hardware-' + letter).should('have.class', 'bg-info');
      cy.get('#Seminar-' + letter).should('have.class', 'bg-secondary');

      cy.get('#Hardware-' + letter).click();
      cy.get('#Hardware-' + letter).should('have.class', 'bg-secondary');
      cy.get('#Seminar-' + letter).should('have.class', 'bg-secondary');

      // Tests that the schedule is empty and clicking with no CO highlighted does nothing
      for (let t = 0; t < 8; t++) {
        for (let d = 1; d < 6; d++) {
          cy.get('#'+t+'-'+d+'-'+letter).click();
          // cy.wait(100);
          cy.get('#'+t+'-'+d+'-'+letter).should('have.class', 'empty');
        }
      }

      cy.get('#Hardware-' + letter).click();


      // Testing that headers exist and clicking headers does nothing with CO selected
      cy.get('#mon').contains('Monday').click();
      cy.get('#tues').contains('Tuesday').click();
      cy.get('#wed').contains('Wednesday').click();
      cy.get('#thurs').contains('Thursday').click();
      cy.get('#fri').contains('Friday').click();
      cy.get('#0-0-' + letter).contains('8:00').click();
      cy.get('#1-0-' + letter).contains('9:00').click();
      cy.get('#2-0-' + letter).contains('10:00').click();
      cy.get('#3-0-' + letter).contains('11:00').click();
      cy.get('#4-0-' + letter).contains('12:00').click();
      cy.get('#5-0-' + letter).contains('1:00').click();
      cy.get('#6-0-' + letter).contains('2:00').click();
      cy.get('#7-0-' + letter).contains('3:00').click();

      cy.get('#mon').contains('Monday');
      cy.get('#tues').contains('Tuesday');
      cy.get('#wed').contains('Wednesday');
      cy.get('#thurs').contains('Thursday');
      cy.get('#fri').contains('Friday');
      cy.get('#0-0-' + letter).contains('8:00');
      cy.get('#1-0-' + letter).contains('9:00');
      cy.get('#2-0-' + letter).contains('10:00');
      cy.get('#3-0-' + letter).contains('11:00');
      cy.get('#4-0-' + letter).contains('12:00');
      cy.get('#5-0-' + letter).contains('1:00');
      cy.get('#6-0-' + letter).contains('2:00');
      cy.get('#7-0-' + letter).contains('3:00');


      // Testing that each empty cell can be changed with CO highlighted
      for (let t = 0; t < 8; t++) {
        for (let d = 1; d < 6; d++) {
          cy.get('#'+t+'-'+d+'-'+letter).click();
          cy.get('#'+t+'-'+d+'-'+letter).should('have.text', 'COHS190Benson / LahodaRoom: 239A');
        }
      }

      cy.get('#Seminar-' + letter).click();

      // Testing that each filled cell can be changed with CO highlighted
      for (let t = 0; t < 8; t++) {
        for (let d = 1; d < 6; d++) {
          cy.get('#'+t+'-'+d+'-'+letter).click();
          cy.get('#'+t+'-'+d+'-'+letter).should('have.text','SEM283NewRoom: 239A');
        }
      }

      // Test that all of the other groups are blank
      for (const subLetter of groupLetters) {
        if (subLetter !== letter) {
          cy.get('#btn' + subLetter).click();

          for (let t = 0; t < 8; t++) {
            for (let d = 1; d < 6; d++) {
              cy.get('#'+t+'-'+d+'-'+subLetter).should('have.class', 'empty');
            }
          }
        }
      }

      // Test that each cell in the original group is still there
      cy.get('#btn' + letter).click();
      for (let t = 0; t < 8; t++) {
        for (let d = 1; d < 6; d++) {
          cy.get('#'+t+'-'+d+'-'+letter).should('have.text','SEM283NewRoom: 239A');
        }
      }

      // Test that leaving the page then returning saves the changes to the DB
      cy.get('#homeBtn').click();

      cy.contains('Schedule Builder').click();
      cy.get('#programSelect').select('CST');
      cy.get('#termSelect').select('2022-2023 - Term 3');
      cy.get('#groupSelect').select('4');
      cy.get('#modalSubmit').click();

      cy.get('#btn' + letter).click();
      for (let t = 0; t < 8; t++) {
        for (let d = 1; d < 6; d++) {
          cy.get('#'+t+'-'+d+'-'+letter).should('have.text','\n                                        \n                                            SEM283\n                                            New\n\n                                                Room: 239A\n                                        \n\n                                    ');
        }
      }

      // Test that right clicking a cell deletes it
      for (let t = 0; t < 8; t++) {
        for (let d = 1; d < 6; d++) {
          cy.get('#'+t+'-'+d+'-'+letter).rightclick();
          cy.get('#'+t+'-'+d+'-'+letter).should('have.class', 'empty');
        }
      }

      // Test that right clicking an empty cell does nothing
      for (let t = 0; t < 8; t++) {
        for (let d = 1; d < 6; d++) {
          cy.get('#'+t+'-'+d+'-'+letter).rightclick();
          cy.get('#'+t+'-'+d+'-'+letter).should('have.class', 'empty');
        }
      }
      cy.get('#mon').contains('Monday').rightclick();
      cy.get('#mon').contains('Monday');
      cy.get('#tues').contains('Tuesday').rightclick();
      cy.get('#tues').contains('Tuesday');
      cy.get('#wed').contains('Wednesday').rightclick();
      cy.get('#wed').contains('Wednesday');
      cy.get('#thurs').contains('Thursday').rightclick();
      cy.get('#thurs').contains('Thursday');
      cy.get('#fri').contains('Friday').rightclick();
      cy.get('#fri').contains('Friday');
      cy.get('#0-0-' + letter).contains('8:00').rightclick();
      cy.get('#0-0-' + letter).contains('8:00');
      cy.get('#1-0-' + letter).contains('9:00').rightclick();
      cy.get('#1-0-' + letter).contains('9:00');
      cy.get('#2-0-' + letter).contains('10:00').rightclick();
      cy.get('#2-0-' + letter).contains('10:00');
      cy.get('#3-0-' + letter).contains('11:00').rightclick();
      cy.get('#3-0-' + letter).contains('11:00');
      cy.get('#4-0-' + letter).contains('12:00').rightclick();
      cy.get('#4-0-' + letter).contains('12:00');
      cy.get('#5-0-' + letter).contains('1:00').rightclick();
      cy.get('#5-0-' + letter).contains('1:00');
      cy.get('#6-0-' + letter).contains('2:00').rightclick();
      cy.get('#6-0-' + letter).contains('2:00');
      cy.get('#7-0-' + letter).contains('3:00').rightclick();
      cy.get('#7-0-' + letter).contains('3:00');

      cy.get('#mon').contains('Monday');
      cy.get('#tues').contains('Tuesday');
      cy.get('#wed').contains('Wednesday');
      cy.get('#thurs').contains('Thursday');
      cy.get('#fri').contains('Friday');
      cy.get('#0-0-' + letter).contains('8:00');
      cy.get('#1-0-' + letter).contains('9:00');
      cy.get('#2-0-' + letter).contains('10:00');
      cy.get('#3-0-' + letter).contains('11:00');
      cy.get('#4-0-' + letter).contains('12:00');
      cy.get('#5-0-' + letter).contains('1:00');
      cy.get('#6-0-' + letter).contains('2:00');
      cy.get('#7-0-' + letter).contains('3:00');
    }
  });
});

