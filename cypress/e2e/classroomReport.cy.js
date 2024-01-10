describe('template spec', () => {
  it('GenerateClassroomSchedule', () => {
    cy.visit('http://localhost:3000');
    cy.scrollTo('MenuBar');
    cy.get('MenuBar').click();
    cy.contains('ClassRoom Report').click();
    cy.get('btnGenerateSchedule').should('be.disabled')
    cy.get('selectClassroom').select('Classroom 239B');
    cy.get('btnGenerateSchedule').should('be.disabled');
    cy.get('selectTerm').select('Term 5');
    cy.get('btnGenerateSchedule').should('be.enabled');
    cy.get('btnGenerateSchedule').click();
  });
});
