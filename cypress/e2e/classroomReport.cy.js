// Tests for Classroom Report three seperate
describe('template spec', () => {

  let classroomList = ['Select Classroom', '239A', '239B', '239a', '240B', '241', '242C'];
  let termList = ['Select Term', '2023 - 1', '2023 - 2', '2023 - 3', '2023 - 4', '2024 - 5', '2023 - 5', '2023 - 6'];

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
      const expectedOptions = classroomList;
      expect(selectOptions).to.include.members(expectedOptions); // Check if all expected options are present
      expect(selectOptions).to.have.ordered.members(expectedOptions); // Check the order of options
    }).parent().select('239B');
    cy.get('#termSelect').children('option').then((options) => {
      const selectOptions = [...options].map((option) => option.textContent);
      const expectedOptions = termList;
      expect(selectOptions).to.include.members(expectedOptions); // Check if all expected options are present
      expect(selectOptions).to.have.ordered.members(expectedOptions); // Check the order of options
    });
    cy.get('#btnGenerateSchedule').should('be.disabled'); // Check that the button is still disabled
    cy.get('#termSelect').select('2023 - 5');// Select term 5
    cy.get('#btnGenerateSchedule').should('be.enabled'); // Check that the button is now enabled
    cy.get('#btnGenerateSchedule').click(); // Click generate schedule

    const classesInOrder = [
      ['MATH282', 'COOS291', 'COHS280', 'CDBM280', 'MATH282'],
      ['COSA280', 'COOS293', 'CWEB280', 'SEM283', 'COSA280'],
      ['CDBM280', 'MATH282', 'COOS291', 'COHS280', 'CDBM280'],
      ['SEM283', 'COSA280', 'COOS293', 'CWEB280', 'SEM283'],
      ['', '', '', '', ''], // 12:00 slot appears empty
      ['COHS280', 'CDBM280', 'MATH282', 'COOS291', 'COHS280'],
      ['CWEB280', 'SEM283', 'COSA280', 'COOS293', 'CWEB280'],
      ['', '', '', '', ''],
    ];

    const namesInOrder = [
      ['Barrie', 'Onishenko', 'Kaban', 'Lahoda', 'New'],
      ['Kaban', 'Lahoda', 'New', 'Schmidt', 'Caron'],
      ['New', 'Schmidt', 'Caron', 'Grzesina', 'Basoalto'],
      ['Caron', 'Grzesina', 'Basoalto', 'Benson', 'Holtslan'],
      ['', '', '', '', ''], // 12:00 slot appears empty
      ['Basoalto', 'Benson', 'Holtslan', 'Barrie', 'Onishenko'],
      ['Holtslan', 'Barrie', 'Onishenko', 'Kaban', 'Lahoda'],
      ['', '', '', '', ''],
    ];


    for (let i = 1; i <= 7; i++) {
      for (let j = 1; j <= 5; j++) {
        const classText = classesInOrder[i-1][j-1];
        const nameText = namesInOrder[i-1][j-1];

        const classSelector = `table tbody tr:nth-of-type(${i}) td:nth-of-type(${j}) div p:first-of-type`;
        const nameSelector = `table tbody tr:nth-of-type(${i}) td:nth-of-type(${j}) div p:last-of-type`;

        if (classText) {
          cy.get(classSelector).contains(classText);
        } else {
          cy.get(classSelector).should('be.empty');
        }

        if (nameText) {
          cy.get(nameSelector).contains(nameText);
        } else {
          cy.get(nameSelector).should('be.empty');
        }
      }
    }
  });


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
      const expectedOptions = classroomList;
      expect(selectOptions).to.include.members(expectedOptions); // Check if all expected options are present
      expect(selectOptions).to.have.ordered.members(expectedOptions); // Check the order of options
    }).parent().select('239A');
    cy.get('#termSelect').children('option').then((options) => {
      const selectOptions = [...options].map((option) => option.textContent);
      const expectedOptions = termList;
      expect(selectOptions).to.include.members(expectedOptions); // Check if all expected options are present
      expect(selectOptions).to.have.ordered.members(expectedOptions); // Check the order of options
    });
    cy.get('#btnGenerateSchedule').should('be.disabled'); // Check that the button is still disabled
    cy.get('#termSelect').select('2023 - 5');// Select term 5
    cy.get('#btnGenerateSchedule').should('be.enabled'); // Check that the button is now enabled
    cy.get('#btnGenerateSchedule').click(); // Click generate schedule

    const classesInOrder = [
      ['COOS293', '', '', '', ''],
      ['', 'COSA280', '', '', 'COOS293'],
      ['', '', 'SEM283', 'CWEB280', ''],
      ['', '', 'COHS280', 'COOS291', ''],
      ['', '', '', '', ''], // 12:00 slot appears empty
      ['', 'CDBM280', '', '', 'MATH282'],
      ['MATH282', '', '', '', ''],
      ['', '', '', '', ''],
    ];

    const namesInOrder = [
      ['Barrie', '', '', '', ''],
      ['', 'New', '', '', 'Schmidt'],
      ['', '', 'Basoalto', 'Onishenko', ''],
      ['', '', 'Holtslan', 'Lahoda', ''],
      ['', '', '', '', ''], // 12:00 slot appears empty
      ['', 'Caron', '', '', 'Grzesina'],
      ['Kaban', '', '', '', ''],
      ['', '', '', '', ''],
    ];

    for (let i = 1; i <= 7; i++) {
      for (let j = 1; j <= 5; j++) {
        const classText = classesInOrder[i-1][j-1];
        const nameText = namesInOrder[i-1][j-1];

        const classSelector = `table tbody tr:nth-of-type(${i}) td:nth-of-type(${j}) div p:first-of-type`;
        const nameSelector = `table tbody tr:nth-of-type(${i}) td:nth-of-type(${j}) div p:last-of-type`;

        if (classText) {
          cy.get(classSelector).contains(classText);
        } else {
          cy.get(classSelector).should('be.empty');
        }

        if (nameText) {
          cy.get(nameSelector).contains(nameText);
        } else {
          cy.get(nameSelector).should('be.empty');
        }
      }
    }
  });

  it('testThatGeneratingAReportWithNoScheduledClassDisplaysNothing', () => {
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
      const expectedOptions = classroomList;
      expect(selectOptions).to.include.members(expectedOptions); // Check if all expected options are present
      expect(selectOptions).to.have.ordered.members(expectedOptions); // Check the order of options
    }).parent().select('240B');
    cy.get('#termSelect').children('option').then((options) => {
      const selectOptions = [...options].map((option) => option.textContent);
      const expectedOptions = termList;
      expect(selectOptions).to.include.members(expectedOptions); // Check if all expected options are present
      expect(selectOptions).to.have.ordered.members(expectedOptions); // Check the order of options
    });
    cy.get('#btnGenerateSchedule').should('be.disabled'); // Check that the button is still disabled
    cy.get('#termSelect').select('2023 - 4');// Select term 5
    cy.get('#btnGenerateSchedule').should('be.enabled'); // Check that the button is now enabled
    cy.get('#btnGenerateSchedule').click(); // Click generate schedule
    cy.get('#EmptyMessage').contains('Nothing to display at the moment');
  });


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
      const expectedOptions = termList;
      expect(selectOptions).to.include.members(expectedOptions); // Check if all expected options are present
      expect(selectOptions).to.have.ordered.members(expectedOptions); // Check the order of options
    });
    cy.get('#btnGenerateSchedule').should('be.disabled'); // Check that the button is still disabled
    cy.get('#termSelect').select('2023 - 2');// Select term 2
    cy.get('#btnGenerateSchedule').should('be.enabled'); // Check that the button is now enabled
    cy.get('#btnGenerateSchedule').click(); // Click generate schedule

    //todo Add check to make sure left arrow is disabled, and right arrow is enabled, if theres
    //todo more than one page to be shown

    let classesInOrder = [
      ['MATH282', 'COOS291', 'COHS280', 'CDBM280', 'MATH282'],
      ['COSA280', 'COOS293', 'CWEB280', 'SEM283', 'COSA280'],
      ['CDBM280', 'MATH282', 'COOS291', 'COHS280', 'CDBM280'],
      ['SEM283', 'COSA280', 'COOS293', 'CWEB280', 'SEM283'],
      ['', '', '', '', ''], // 12:00 slot appears empty
      ['COHS280', 'CDBM280', 'MATH282', 'COOS291', 'COHS280'],
      ['CWEB280', 'SEM283', 'COSA280', 'COOS293', 'CWEB280'],
      ['', '', '', '', ''],
    ];

    let namesInOrder = [
      ['Barrie', 'Onishenko', 'Kaban', 'Lahoda', 'New'],
      ['Kaban', 'Lahoda', 'New', 'Schmidt', 'Caron'],
      ['New', 'Schmidt', 'Caron', 'Grzesina', 'Basoalto'],
      ['Caron', 'Grzesina', 'Basoalto', 'Benson', 'Holtslan'],
      ['', '', '', '', ''], // 12:00 slot appears empty
      ['Basoalto', 'Benson', 'Holtslan', 'Barrie', 'Onishenko'],
      ['Holtslan', 'Barrie', 'Onishenko', 'Kaban', 'Lahoda'],
      ['', '', '', '', ''],
    ];

    checkCorrectSchedule(classesInOrder, namesInOrder)
    //TODO Add arrow click check both buttons are enabled after clicking right (if theres more than 1)

    classesInOrder = [
      ['MATH282', 'COOS291', 'COHS280', 'CDBM280', 'MATH282'],
      ['COSA280', 'COOS293', 'CWEB280', 'SEM283', 'COSA280'],
      ['CDBM280', 'MATH282', 'COOS291', 'COHS280', 'CDBM280'],
      ['SEM283', 'COSA280', 'COOS293', 'CWEB280', 'SEM283'],
      ['', '', '', '', ''], // 12:00 slot appears empty
      ['COHS280', 'CDBM280', 'MATH282', 'COOS291', 'COHS280'],
      ['CWEB280', 'SEM283', 'COSA280', 'COOS293', 'CWEB280'],
      ['', '', '', '', ''],
    ];

    namesInOrder = [
      ['Barrie', 'Onishenko', 'Kaban', 'Lahoda', 'New'],
      ['Kaban', 'Lahoda', 'New', 'Schmidt', 'Caron'],
      ['New', 'Schmidt', 'Caron', 'Grzesina', 'Basoalto'],
      ['Caron', 'Grzesina', 'Basoalto', 'Benson', 'Holtslan'],
      ['', '', '', '', ''], // 12:00 slot appears empty
      ['Basoalto', 'Benson', 'Holtslan', 'Barrie', 'Onishenko'],
      ['Holtslan', 'Barrie', 'Onishenko', 'Kaban', 'Lahoda'],
      ['', '', '', '', ''],
    ];

    checkCorrectSchedule(classesInOrder, namesInOrder)

    //todo MORE CHECKS

    classesInOrder = [
      ['MATH282', 'COOS291', 'COHS280', 'CDBM280', 'MATH282'],
      ['COSA280', 'COOS293', 'CWEB280', 'SEM283', 'COSA280'],
      ['CDBM280', 'MATH282', 'COOS291', 'COHS280', 'CDBM280'],
      ['SEM283', 'COSA280', 'COOS293', 'CWEB280', 'SEM283'],
      ['', '', '', '', ''], // 12:00 slot appears empty
      ['COHS280', 'CDBM280', 'MATH282', 'COOS291', 'COHS280'],
      ['CWEB280', 'SEM283', 'COSA280', 'COOS293', 'CWEB280'],
      ['', '', '', '', ''],
    ];

    namesInOrder = [
      ['Barrie', 'Onishenko', 'Kaban', 'Lahoda', 'New'],
      ['Kaban', 'Lahoda', 'New', 'Schmidt', 'Caron'],
      ['New', 'Schmidt', 'Caron', 'Grzesina', 'Basoalto'],
      ['Caron', 'Grzesina', 'Basoalto', 'Benson', 'Holtslan'],
      ['', '', '', '', ''], // 12:00 slot appears empty
      ['Basoalto', 'Benson', 'Holtslan', 'Barrie', 'Onishenko'],
      ['Holtslan', 'Barrie', 'Onishenko', 'Kaban', 'Lahoda'],
      ['', '', '', '', ''],
    ];

    checkCorrectSchedule(classesInOrder, namesInOrder)

    //todo MORE CHECKS


    classesInOrder = [
      ['MATH282', 'COOS291', 'COHS280', 'CDBM280', 'MATH282'],
      ['COSA280', 'COOS293', 'CWEB280', 'SEM283', 'COSA280'],
      ['CDBM280', 'MATH282', 'COOS291', 'COHS280', 'CDBM280'],
      ['SEM283', 'COSA280', 'COOS293', 'CWEB280', 'SEM283'],
      ['', '', '', '', ''], // 12:00 slot appears empty
      ['COHS280', 'CDBM280', 'MATH282', 'COOS291', 'COHS280'],
      ['CWEB280', 'SEM283', 'COSA280', 'COOS293', 'CWEB280'],
      ['', '', '', '', ''],
    ];

    namesInOrder = [
      ['Barrie', 'Onishenko', 'Kaban', 'Lahoda', 'New'],
      ['Kaban', 'Lahoda', 'New', 'Schmidt', 'Caron'],
      ['New', 'Schmidt', 'Caron', 'Grzesina', 'Basoalto'],
      ['Caron', 'Grzesina', 'Basoalto', 'Benson', 'Holtslan'],
      ['', '', '', '', ''], // 12:00 slot appears empty
      ['Basoalto', 'Benson', 'Holtslan', 'Barrie', 'Onishenko'],
      ['Holtslan', 'Barrie', 'Onishenko', 'Kaban', 'Lahoda'],
      ['', '', '', '', ''],
    ];

    checkCorrectSchedule(classesInOrder, namesInOrder)

    //TODO last check to make sure left arrow is enabled but right arrow is disabled




    // TODO check if a visit and intercept call to page is necessary...

    cy.get("#table")

  });

  function checkCorrectSchedule(classesInOrder, namesInOrder) {
    for (let i = 1; i <= 7; i++) {
      for (let j = 1; j <= 5; j++) {
        const classText = classesInOrder[i-1][j-1];
        const nameText = namesInOrder[i-1][j-1];

        const classSelector = `table tbody tr:nth-of-type(${i}) td:nth-of-type(${j}) div p:first-of-type`;
        const nameSelector = `table tbody tr:nth-of-type(${i}) td:nth-of-type(${j}) div p:last-of-type`;

        if (classText) {
          cy.get(classSelector).contains(classText);
        } else {
          cy.get(classSelector).should('be.empty');
        }

        if (nameText) {
          cy.get(nameSelector).contains(nameText);
        } else {
          cy.get(nameSelector).should('be.empty');
        }
      }
    }
  }

});
