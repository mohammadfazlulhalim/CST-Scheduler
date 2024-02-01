
it('testSplitClassRoomReport', () => {
  const homepageurl = 'http://localhost:3000/';
  const splitclassroomreportRoute = '/splitClassroomReport';
  const splitclassroomreportURLFull = homepageurl + 'splitClassroomReport/';

  cy.visit(splitclassroomreportURLFull);
  cy.intercept('GET', splitclassroomreportRoute).as('splitClassroomReportGET');
  cy.get('#splitClassroomReportInfoModal').should('be.visible'); // Check that the modal correctly popped up
  cy.get('#btnGenerateSchedule').should('be.disabled'); // Check the button is initially disabled

  // TODO - copied from classroomreport - make corrections to values
  cy.get('#classroomSelect').children('option').then((options) => {
    const selectOptions = [...options].map((option) => option.textContent);
    const expectedOptions = ['Select Classroom', '239A', '239B', '239a', '240B', '241', '242C'];
    expect(selectOptions).to.include.members(expectedOptions); // Check if all expected options are present
    expect(selectOptions).to.have.ordered.members(expectedOptions); // Check the order of options
  }).parent().select('241');
  cy.get('#termSelect').children('option').then((options) => {
    const selectOptions = [...options].map((option) => option.textContent);
    const expectedOptions = ['Select Term', '2023 - 1', '2023 - 2', '2023 - 3', '2023 - 4', '2024 - 5', '2023 - 5', '2023 - 6'];
    expect(selectOptions).to.include.members(expectedOptions); // Check if all expected options are present
    expect(selectOptions).to.have.ordered.members(expectedOptions); // Check the order of options
  });
  cy.get('#btnGenerateSchedule').should('be.disabled'); // Check that the button is still disabled
  cy.get('#termSelect').select('2023 - 2');// Select term 2
  cy.get('#btnGenerateSchedule').should('be.enabled'); // Check that the button is now enabled
  cy.get('#btnGenerateSchedule').click(); // Click generate schedule

  // TODO check if a visit and intercept call to page is necessary...
});

