  it('testThatModalWorks', () => {
    // Opens main page - and go to Schedule Courses
    cy.visit('localhost:3000');
    cy.contains('Schedule Courses').click()

    // Check that Enter button is disabled
    cy.get('#modalSubmit').should('be.disabled')

    // Check that Program field can be entered
    cy.contains('Program')
    cy.get('#programSelect').select('CST')

    // Check that Enter button is disabled
    cy.get('#modalSubmit').should('be.disabled')

    // Check that Term field can be entered
    cy.contains('Term')
    cy.get('#termSelect').select('2024-5')

    // Check that Enter button is disabled
    cy.get('#modalSubmit').should('be.disabled')

    // Check that Group field can be entered
    cy.contains('Number of Groups')
    cy.get('#groupSelect').select('2')

    cy.get('#modalSubmit').should('not.be.disabled')
    cy.get('#modalSubmit').click()


    cy.get('#groupA')

    cy.get('Hardware-A')
    cy.get('Hardware-B').should('be.hidden') // Needs to be inverted

    cy.get('Monday')
    cy.get('Friday')
    cy.get('8:00')
    cy.get('3:00')



    cy.get('#groupB').click()

    cy.get('Hardware-B')
    cy.get('Hardware-A').should('be.hidden') // Needs to be inverted

    cy.get('Monday')
    cy.get('Friday')
    cy.get('8:00')
    cy.get('3:00')
  });
