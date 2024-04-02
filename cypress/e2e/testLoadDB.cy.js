describe('testingLoadDB', async() => {
  beforeEach(()=>{
    cy.exec('node electron-db-reset.js');
  })

  it('experimentCypressDeletingDB', async () => {
    // Going to the classroom page to delete Room 241
    cy.visit('localhost:3000/Classroom');
    cy.get('tbody > tr:nth-child(5) > td:nth-child(3) > btn:nth-child(2)').click();
    cy.get('#delClassroom').click();
  });

  it('experimentCypressResettingDB', async () => {
    // Seeing if room 241 exists
    cy.visit('localhost:3000/Classroom');
    cy.get('tbody > tr:nth-child(5) > td:nth-child(1)').contains('241');
  });
});