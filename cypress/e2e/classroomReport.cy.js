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
    cy.get('#row1').children(5).children(1).contains('Onishenk');


    cy.get('#row2').children(1).children(0).contains('TCOM291b');
    cy.get('#row2').children(1).children(1).contains('Holtslan');
    cy.get('#row2').children(2).children(0).contains('COOS294b');
    cy.get('#row2').children(2).children(1).contains('Caron');
    cy.get('#row2').children(3).children(0).contains('COSC295b');
    cy.get('#row2').children(3).children(1).contains('Schmidt');
    cy.get('#row2').children(4).children(0).contains('COOS294b');
    cy.get('#row2').children(4).children(1).contains('Caron');
    cy.get('#row2').children(5).children(0).contains('COOS293b');
    cy.get('#row2').children(5).children(1).contains('Onishenk');

    cy.get('#row3').children(1).children(0).contains('COSC292b');
    cy.get('#row3').children(1).children(1).contains('Grzesina');
    cy.get('#row3').children(2).children(0).contains('COOS293b');
    cy.get('#row3').children(2).children(1).contains('Onishenk');
    cy.get('#row3').children(3).children(0).contains('COOS291b');
    cy.get('#row3').children(3).children(1).contains('Lahoda');
    cy.get('#row3').children(4).children(0).contains('COOS291b');
    cy.get('#row3').children(4).children(1).contains('Lahoda');
    cy.get('#row3').children(5).children(0).contains('COSC292b');
    cy.get('#row3').children(5).children(1).contains('Grzesina');

    cy.get('#row4').children(1).children(0).contains('COSC292b');
    cy.get('#row4').children(1).children(1).contains('Grzesina');
    cy.get('#row4').children(2).children(0).contains('COOS293b');
    cy.get('#row4').children(2).children(1).contains('Onishenk');
    cy.get('#row4').children(3).children(0).contains('COOS291b');
    cy.get('#row4').children(3).children(1).contains('Lahoda');
    cy.get('#row4').children(4).children(0).contains('COOS291b');
    cy.get('#row4').children(4).children(1).contains('Lahoda');
    cy.get('#row4').children(5).children(0).contains('COSC292b');
    cy.get('#row4').children(5).children(1).contains('Grzesina');

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



    cy.get('#row1').children(1).children(0).contains('TCOM291a');
    cy.get('#row1').children(1).children(1).contains('Holtslan');

    cy.get('#row2').children(2).children(0).contains('COOS293a');
    cy.get('#row2').children(2).children(1).contains('Onishenk');

    cy.get('#row3').children(3).children(0).contains('COOS291a');
    cy.get('#row3').children(3).children(1).contains('Barrie');

    cy.get('#row4').children(4).children(0).contains('COOS294a');
    cy.get('#row4').children(4).children(1).contains('Caron');

    cy.get('#row6').children(5).children(0).contains('COSC292a');
    cy.get('#row6').children(5).children(1).contains('Grzesina');

    cy.get('#row7').children(1).children(0).contains('CPMG290a');
    cy.get('#row7').children(1).children(1).contains('Basoalto');

    cy.get('#row6').children(2).children(0).contains('COSA290a');
    cy.get('#row6').children(2).children(1).contains('Basoalto');

    cy.get('#row4').children(3).children(0).contains('COOS291a');
    cy.get('#row4').children(3).children(1).contains('Barrie');

    cy.get('#row3').children(4).children(0).contains('COOS294a');
    cy.get('#row3').children(4).children(1).contains('Caron');

    cy.get('#row2').children(5).children(0).contains('COSC295a');
    cy.get('#row2').children(5).children(1).contains('Schmidt');

  });
});
