describe('template spec', () => {
  it('GenerateClassroomSchedule', () => {
    cy.visit('http://localhost:3000'); // Visit the home page
    cy.intercept('GET', '/classroomReport/').as('classroomReportGET');
    cy.scrollTo('topRight'); // Scroll to the location of the menu bar
    cy.get('MenuBar').click(); // Click the MenuBar
    cy.contains('ClassRoom Report').click(); // Select classroom report from the options
    cy.wait('@classroomReportGET').its('request.method').should('eq', 'GET');
    cy.intercept('POST', '/classroomReport/').as('classroomReportPOST');
    cy.get('classReportModal').should('be.visible'); // Check that the modal correctly popped up
    cy.get('btnGenerateSchedule').should('be.disabled'); // Check the button is initially disabled
    cy.get('selectClassroom').children('option').then((options) => {
      const selectOptions = [...options].map((option) => option.textContent);
      const expectedOptions = ['Classroom 239A', 'Classroom 239B', 'Classroom 240'];
      expect(selectOptions).to.include.members(expectedOptions); // Check if all expected options are present
      expect(selectOptions).to.have.ordered.members(expectedOptions); // Check the order of options
    });
    cy.get('selectClassroom').select('239B'); // Select Classroom 239B
    cy.get('btnGenerateSchedule').should('be.disabled'); // Check that the button is still disabled
    cy.get('selectTerm').select('5'); // Select term 5
    cy.get('btnGenerateSchedule').should('be.enabled'); // Check that the button is now enabled
    cy.get('selectTerm').select('');
    cy.get('btnGenerateSchedule').should('be.disabled'); // Check that the button is still disabled
    cy.get('selectTerm').select([]); // Select term 5
    cy.get('btnGenerateSchedule').should('be.enabled'); // Check that the button is now enabled
    cy.get('btnGenerateSchedule').click(); // Click generate schedule
    cy.wait('@generateReportPOST').its('request.method').should('eq', 'POST');
  });
});
