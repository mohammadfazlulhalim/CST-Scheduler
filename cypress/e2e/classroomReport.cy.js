// Tests for Classroom Report three seperate
describe('template spec', () => {
  it('testThatGeneratingAReportWithAFullyScheduledClassWorks', () => {
    cy.visit('http://localhost:3000'); // Visit the home page
    cy.intercept('GET', '/classroomReport/').as('classroomReportGET');
    cy.get('Nav'); // Click the MenuBar
    cy.get('#reportDropdown').click(); // Select classroom report from the options
    cy.get('#navClassroomReport').click(); // Select classroom report from the options
    // cy.wait('@classroomReportGET').its('request.method').should('eq', 'GET');
    // cy.intercept('POST', '/classroomReport/').as('classroomReportPOST');
    cy.get('#classroomReportInfoModal').should('be.visible'); // Check that the modal correctly popped up
    cy.get('#btnGenerateSchedule').should('be.disabled'); // Check the button is initially disabled
    cy.get('#classroomSelect').children('option').then((options) => {
      const selectOptions = [...options].map((option) => option.textContent);
      const expectedOptions = ['Select Classroom', '239A', '239B', '240B', '242C'];
      expect(selectOptions).to.include.members(expectedOptions); // Check if all expected options are present
      expect(selectOptions).to.have.ordered.members(expectedOptions); // Check the order of options
    }).parent().select('239B');
    cy.get('#termSelect').children('option').then((options) => {
      const selectOptions = [...options].map((option) => option.textContent);
      const expectedOptions = ['Select Term', '2023 - 1', '2023 - 2', '2023 - 3', '2023 - 4', '2023 - 5', '2023 - 6'];
      expect(selectOptions).to.include.members(expectedOptions); // Check if all expected options are present
      expect(selectOptions).to.have.ordered.members(expectedOptions); // Check the order of options
    });
    // cy.wait('#239B');
    // cy.get('#classroomSelect').select(2, {force: true});


    cy.get('#btnGenerateSchedule').should('be.disabled'); // Check that the button is still disabled
    cy.get('#termSelect').select('2023 - 5').click(); // Select term 5
    // cy.select('2023 - 5'); // Select term 5
    cy.get('#btnGenerateSchedule').should('be.enabled'); // Check that the button is now enabled
    cy.get('selectTerm').select('');
    cy.get('btnGenerateSchedule').should('be.disabled'); // Check that the button is still disabled
    cy.get('selectTerm').select([]); // Select term 5
    cy.get('btnGenerateSchedule').should('be.enabled'); // Check that the button is now enabled
    cy.get('btnGenerateSchedule').click(); // Click generate schedule
    cy.wait('@generateReportPOST').its('request.method').should('eq', 'POST');
    cy.get('classReportModal').should('be.invisible'); // Check that the modal correctly popped up

    cy.get('#row1').children(1).children(0).contains('COOS291b');
    cy.get('#row1').children(1).children(1).contains('Lahoda/Barrie');
    cy.get('#row1').children(2).children(0).contains('COOS294b');
    cy.get('#row1').children(2).children(1).contains('Caron');
    cy.get('#row1').children(3).children(0).contains('COSC295b');
    cy.get('#row1').children(3).children(1).contains('Schmidt');
    cy.get('#row1').children(4).children(0).contains('COOS294b');
    cy.get('#row1').children(4).children(1).contains('Caron');
    cy.get('#row1').children(5).children(0).contains('COOS293b');
    cy.get('#row1').children(5).children(1).contains('Onishenko');


    cy.get('#row2').children(1).children(0).contains('TCOM291b');
    cy.get('#row2').children(1).children(1).contains('Holtslan');
    cy.get('#row2').children(2).children(0).contains('COOS294b');
    cy.get('#row2').children(2).children(1).contains('Caron');
    cy.get('#row2').children(3).children(0).contains('COSC295b');
    cy.get('#row2').children(3).children(1).contains('Schmidt');
    cy.get('#row2').children(4).children(0).contains('COOS294b');
    cy.get('#row2').children(4).children(1).contains('Caron');
    cy.get('#row2').children(5).children(0).contains('COOS293b');
    cy.get('#row2').children(5).children(1).contains('Onishenko');

    cy.get('#row3').children(1).children(0).contains('COSC292b');
    cy.get('#row3').children(1).children(1).contains('Grzesina');
    cy.get('#row3').children(2).children(0).contains('COOS293b');
    cy.get('#row3').children(2).children(1).contains('Onishenko');
    cy.get('#row3').children(3).children(0).contains('COOS291b');
    cy.get('#row3').children(3).children(1).contains('Lahoda');
    cy.get('#row3').children(4).children(0).contains('COOS291b');
    cy.get('#row3').children(4).children(1).contains('Lahoda');
    cy.get('#row3').children(5).children(0).contains('COSC292b');
    cy.get('#row3').children(5).children(1).contains('Grzesina');

    cy.get('#row4').children(1).children(0).contains('COSC292b');
    cy.get('#row4').children(1).children(1).contains('Grzesina');
    cy.get('#row4').children(2).children(0).contains('COOS293b');
    cy.get('#row4').children(2).children(1).contains('onishenko');
    cy.get('#row4').children(3).children(0).contains('COOS291b');
    cy.get('#row4').children(3).children(1).contains('Lahoda');
    cy.get('#row4').children(4).children(0).contains('COOS291b');
    cy.get('#row4').children(4).children(1).contains('Lahoda');
    cy.get('#row4').children(5).children(0).contains('COSC292b');
    cy.get('#row4').children(5).children(1).contains('Grzesina');

    cy.get('#row5').children(1).children(0).contains('');
    cy.get('#row5').children(1).children(1).contains('');
    cy.get('#row5').children(2).children(0).contains('');
    cy.get('#row5').children(2).children(1).contains('');
    cy.get('#row5').children(3).children(0).contains('');
    cy.get('#row5').children(3).children(1).contains('');
    cy.get('#row5').children(4).children(0).contains('');
    cy.get('#row5').children(4).children(1).contains('');
    cy.get('#row5').children(5).children(0).contains('');
    cy.get('#row5').children(5).children(1).contains('');

    cy.get('#row6').children(1).children(0).contains('CPMG290b');
    cy.get('#row6').children(1).children(1).contains('Lahoda/Basoalto');
    cy.get('#row6').children(2).children(0).contains('COSA290b');
    cy.get('#row6').children(2).children(1).contains('Lahoda/Basoalto');
    cy.get('#row6').children(3).children(0).contains('COSA290b');
    cy.get('#row6').children(3).children(1).contains('Lahoda/Basoalto');
    cy.get('#row6').children(4).children(0).contains('COSA290b');
    cy.get('#row6').children(4).children(1).contains('Lahoda/Basoalto');
    cy.get('#row6').children(5).children(0).contains('COSC295b');
    cy.get('#row6').children(5).children(1).contains('Schmidt');

    cy.get('#row7').children(1).children(0).contains('CPMG290b');
    cy.get('#row7').children(1).children(1).contains('Lahoda/Basoalto');
    cy.get('#row7').children(2).children(0).contains('COSA290b');
    cy.get('#row7').children(2).children(1).contains('Lahoda/Basoalto');
    cy.get('#row7').children(3).children(0).contains('COSA290b');
    cy.get('#row7').children(3).children(1).contains('Lahoda/Basoalto');
    cy.get('#row7').children(4).children(0).contains('COSA290b');
    cy.get('#row7').children(4).children(1).contains('Lahoda/Basoalto');
    cy.get('#row7').children(5).children(0).contains('COSC295b');
    cy.get('#row7').children(5).children(1).contains('Schmidt');

    cy.get('#row8').children(1).children(0).contains('');
    cy.get('#row8').children(1).children(1).contains('');
    cy.get('#row8').children(2).children(0).contains('');
    cy.get('#row8').children(2).children(1).contains('');
    cy.get('#row8').children(3).children(0).contains('');
    cy.get('#row8').children(3).children(1).contains('');
    cy.get('#row8').children(4).children(0).contains('');
    cy.get('#row8').children(4).children(1).contains('');
    cy.get('#row8').children(5).children(0).contains('');
    cy.get('#row8').children(5).children(1).contains('');
  });

  it('testThatGeneratingAReportWithAPartiallyScheduledClassWorks', () => {
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
    cy.get('classReportModal').should('be.invisible'); // Check that the modal correctly popped up

    cy.get('#row1').children(1).children(0).contains('TCOM291a');
    cy.get('#row1').children(1).children(1).contains('Holtslan');
    cy.get('#row1').children(2).children(0).contains('');
    cy.get('#row1').children(2).children(1).contains('');
    cy.get('#row1').children(3).children(0).contains('');
    cy.get('#row1').children(3).children(1).contains('');
    cy.get('#row1').children(4).children(0).contains('');
    cy.get('#row1').children(4).children(1).contains('');
    cy.get('#row1').children(5).children(0).contains('');
    cy.get('#row1').children(5).children(1).contains('');


    cy.get('#row2').children(1).children(0).contains('');
    cy.get('#row2').children(1).children(1).contains('');
    cy.get('#row2').children(2).children(0).contains('COOS293a');
    cy.get('#row2').children(2).children(1).contains('onishenko');
    cy.get('#row2').children(3).children(0).contains('');
    cy.get('#row2').children(3).children(1).contains('');
    cy.get('#row2').children(4).children(0).contains('');
    cy.get('#row2').children(4).children(1).contains('');
    cy.get('#row2').children(5).children(0).contains('COSC295a');
    cy.get('#row2').children(5).children(1).contains('Schmidt');

    cy.get('#row3').children(1).children(0).contains('');
    cy.get('#row3').children(1).children(1).contains('');
    cy.get('#row3').children(2).children(0).contains('');
    cy.get('#row3').children(2).children(1).contains('');
    cy.get('#row3').children(3).children(0).contains('COOS291a');
    cy.get('#row3').children(3).children(1).contains('Barrie');
    cy.get('#row3').children(4).children(0).contains('COOS294a');
    cy.get('#row3').children(4).children(1).contains('Caron');
    cy.get('#row3').children(5).children(0).contains('');
    cy.get('#row3').children(5).children(1).contains('');

    cy.get('#row4').children(1).children(0).contains('');
    cy.get('#row4').children(1).children(1).contains('');
    cy.get('#row4').children(2).children(0).contains('');
    cy.get('#row4').children(2).children(1).contains('');
    cy.get('#row4').children(3).children(0).contains('COOS291a');
    cy.get('#row4').children(3).children(1).contains('Barrie');
    cy.get('#row4').children(4).children(0).contains('COOS294a');
    cy.get('#row4').children(4).children(1).contains('Caron');
    cy.get('#row4').children(5).children(0).contains('');
    cy.get('#row4').children(5).children(1).contains('');

    cy.get('#row5').children(1).children(0).contains('');
    cy.get('#row5').children(1).children(1).contains('');
    cy.get('#row5').children(2).children(0).contains('');
    cy.get('#row5').children(2).children(1).contains('');
    cy.get('#row5').children(3).children(0).contains('');
    cy.get('#row5').children(3).children(1).contains('');
    cy.get('#row5').children(4).children(0).contains('');
    cy.get('#row5').children(4).children(1).contains('');
    cy.get('#row5').children(5).children(0).contains('');
    cy.get('#row5').children(5).children(1).contains('');

    cy.get('#row6').children(1).children(0).contains('');
    cy.get('#row6').children(1).children(1).contains('');
    cy.get('#row6').children(2).children(0).contains('COSA290a');
    cy.get('#row6').children(2).children(1).contains('Basoalto');
    cy.get('#row6').children(3).children(0).contains('');
    cy.get('#row6').children(3).children(1).contains('');
    cy.get('#row6').children(4).children(0).contains('');
    cy.get('#row6').children(4).children(1).contains('');
    cy.get('#row6').children(5).children(0).contains('COSC292a');
    cy.get('#row6').children(5).children(1).contains('Grzesina');

    cy.get('#row7').children(1).children(0).contains('CPMG290a');
    cy.get('#row7').children(1).children(1).contains('Basoalto');
    cy.get('#row7').children(2).children(0).contains('');
    cy.get('#row7').children(2).children(1).contains('');
    cy.get('#row7').children(3).children(0).contains('');
    cy.get('#row7').children(3).children(1).contains('');
    cy.get('#row7').children(4).children(0).contains('');
    cy.get('#row7').children(4).children(1).contains('');
    cy.get('#row7').children(5).children(0).contains('');
    cy.get('#row7').children(5).children(1).contains('');

    cy.get('#row8').children(1).children(0).contains('');
    cy.get('#row8').children(1).children(1).contains('');
    cy.get('#row8').children(2).children(0).contains('');
    cy.get('#row8').children(2).children(1).contains('');
    cy.get('#row8').children(3).children(0).contains('');
    cy.get('#row8').children(3).children(1).contains('');
    cy.get('#row8').children(4).children(0).contains('');
    cy.get('#row8').children(4).children(1).contains('');
    cy.get('#row8').children(5).children(0).contains('');
    cy.get('#row8').children(5).children(1).contains('');
  });

  it('testThatGeneratingAReportWithNoScheduledClassDisplaysNothing', () => {
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
    cy.get('classReportModal').should('be.invisible'); // Check that the modal correctly popped up
    // TODO decide what 2 do
  });
});
