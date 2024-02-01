const groupLetters = ['A', 'B', 'C', 'E']

describe('Test that it works bozo', () => {
  cy.visit('localhost:3000');
  cy.contains('Schedule Builder').click();
  cy.get('#programSelect').select('CST');
  cy.get('#termSelect').select('2024-5');
  cy.get('#groupSelect').select('4');

  for(let letter in groupLetters) {
    cy.get('btn' + letter).click();

    cy.get('#Hardware-' + letter).contains('Ben Benson');
    cy.get('#Hardware-' + letter).should('be.visible');
    cy.get('#Seminar-' + letter).contains('Ron New');
    cy.get('#Seminar-' + letter).should('be.visible');


    cy.get('#Hardware-' + letter).should('have.class', 'bg-secondary');
    cy.get('#Seminar-' + letter).should('have.class', 'bg-secondary');

    cy.get('#Hardware-' + letter).click();
    cy.get('#Hardware-' + letter).should('have.class', 'bg-info');
    cy.get('#Seminar-' + letter).should('have.class', 'bg-secondary');


    cy.get('#Seminar-' + letter).click();
    cy.get('#Hardware-' + letter).should('have.class', 'bg-secondary');
    cy.get('#Seminar-' + letter).should('have.class', 'bg-info');

    cy.get('#Seminar-' + letter).click();
    cy.get('#Hardware-' + letter).should('have.class', 'bg-secondary');
    cy.get('#Seminar-' + letter).should('have.class', 'bg-secondary');


    cy.get('#Hardware-' + letter).click();
    cy.get('#Hardware-' + letter).should('have.class', 'bg-info');
    cy.get('#Seminar-' + letter).should('have.class', 'bg-secondary');

    cy.get('#Hardware-' + letter).click();
    cy.get('#Hardware-' + letter).should('have.class', 'bg-secondary');
    cy.get('#Seminar-' + letter).should('have.class', 'bg-secondary');

    for (let t = 0; t < 8; t++) {
      for (let d = 1; d < 6; d++) {
        cy.get('#'+t+'-'+d+'-'+letter).click();
        cy.get('#'+t+'-'+d+'-'+letter).should('be.empty');
      }
    }

    cy.get('#Hardware-' + letter).click();

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

    for (let t = 0; t < 8; t++) {
      for (let d = 1; d < 6; d++) {
        cy.get('#'+t+'-'+d+'-'+letter).click();
        cy.get('#'+t+'-'+d+'-'+letter).contains('Ben Benson');
      }
    }

    cy.get('#Seminar-' + letter).click();

    for (let t = 0; t < 8; t++) {
      for (let d = 1; d < 6; d++) {
        cy.get('#'+t+'-'+d+'-'+letter).click();
        cy.get('#'+t+'-'+d+'-'+letter).contains('Ron New');
      }
    }

    for(let subLetter in groupLetters) {
      if(subLetter !== letter)
      cy.get('btn' + letter).click();

      for (let t = 0; t < 8; t++) {
        for (let d = 1; d < 6; d++) {
          cy.get('#'+t+'-'+d+'-'+letter).should('be.empty');
        }
      }
    }



  }







});

