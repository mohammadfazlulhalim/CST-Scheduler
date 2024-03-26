const loadDB = require('../../fixtures/loadAll.fix').loadEverything();
it('experimentCypressCallingLoadDBFromTest', async() => {
  await loadDB;

  // Going to the classroom page to delete Room 241
  cy.visit('localhost:3000/Classroom');
  cy.get('tbody > tr:nth-child(5) > td:nth-child(3) > btn:nth-child(2)').click();
  cy.get('#delClassroom').click();

  await loadDB;
  cy.visit('localhost:3000/Classroom');
  cy.get('tbody > tr:nth-child(5) > td:nth-child(1)').contains('241')



});
