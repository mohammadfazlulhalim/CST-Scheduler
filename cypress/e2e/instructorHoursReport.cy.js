describe('story52Tests', async () => {
  // List of all instructors, sorted by last name
  const INSTRUCTORLIST =
    [
      'Bryce Barrie',
      'Ernesto Basoalto',
      'Ben Benson',
      'Rick Caron',
      'Micheal Grzesina',
      'firstName Holtslan',
      'Coralee Kaban',
      'Wade Lahoda',
      'Ron New',
      'Donovan Onishenko',
      'Jason Schmidt',
    ];

  // Resets the DB before each test, and then using the UI creates fixtures needed for test
  // So it creates a new term, creates 8 course offerings, and then schedules those course
  // offerings so that it can be tested, but is not permanent data in our DB, so that it does
  // not break other tests
  beforeEach(() => {
    cy.exec('node electron-db-reset.js');

    // set up the fixtures needed for these tests - first create a term to use
    cy.visit('localhost:3000/term');
    cy.contains('Add New Term').click({force: true});

    cy.get('#cTermNumber').type('3');
    cy.wait(150);
    cy.get('#cStartDate').type('2024-05-02');
    cy.wait(150);
    cy.get('#cEndDate').type('2024-06-02');
    cy.wait(150);
    cy.get('#cAuto').check();
    cy.wait(150);
    cy.get('#createTerm').click({force: true});

    // have 8 COs available, with 2 Courses and 4 groups that are hardcoded,
    // so need to modify as needed with instructors/programs

    // Hardware A - Bryce, CST - Using Bryce for ATP #1
    cy.get('#1coPrimaryInstructor').select('Bryce Barrie', {force: true});
    cy.get('#1coSecondaryInstructor').select('', {force: true});
    // Seminar A - Ron/Ernesto, CST - Using Ernesto for ATP #2
    cy.get('#2coPrimaryInstructor').select('Ron New', {force: true});
    cy.get('#2coSecondaryInstructor').select('Ernesto Basoalto', {force: true});
    // Hardware B - Ben/Ron, CST - Using Ron for ATP #3
    cy.get('#3coPrimaryInstructor').select('Ben Benson', {force: true});
    cy.get('#3coSecondaryInstructor').select('Ron New', {force: true});
    // Seminar B - Ben, CST - Using Ben for ATP #5
    cy.get('#4coPrimaryInstructor').select('Ben Benson', {force: true});
    cy.get('#4coSecondaryInstructor').select('', {force: true});
    // Hardware C - Coralee, CST - Using Coralee for ATP #4
    cy.get('#5coPrimaryInstructor').select('Coralee Kaban', {force: true});
    cy.get('#5coSecondaryInstructor').select('', {force: true});
    // Seminar C - Wade ,CNT - Using Wade for ATP #6
    cy.get('#6coPrimaryInstructor').select('Wade Lahoda', {force: true});
    cy.get('#6coSecondaryInstructor').select('', {force: true});
    cy.get('#6coProgram').select('CNT', {force: true});
    // Hardware D - Coralee, CST - Using Coralee for ATP #4
    cy.get('#7coPrimaryInstructor').select('Coralee Kaban', {force: true});
    cy.get('#7coSecondaryInstructor').select('', {force: true});
    // Seminar D - Wade, CST - Using Wade for ATP #6
    cy.get('#8coPrimaryInstructor').select('Wade Lahoda', {force: true});
    cy.get('#8coSecondaryInstructor').select('', {force: true});

    cy.get('#createCO').click({force: true});
    cy.wait(100);

    // Creating a term6 for testing
    cy.contains('Add New Term').click({force: true});
    cy.get('#cTermNumber').type('6', {force: true});
    cy.wait(150);
    cy.get('#cStartDate').type('2024-05-02', {force: true});
    cy.wait(150);
    cy.get('#cEndDate').type('2024-06-02', {force: true});
    cy.wait(150);
    cy.get('#createTerm').click({force: true});

    // Manually creating course offerings for term 3 & 6 with Donovan primary, Rick alternative
    cy.visit('localhost:3000/courseOffering');
    cy.wait(20);
    cy.get('#openCreateModal').click({force: true});
    cy.wait(50);
    cy.get('#cCourse').type('TCOM291');
    cy.get('#cName').clear({force: true}).type('Communications');
    cy.get('#cTerm').select('2023-2024 - Term 3');
    cy.get('#cProgram').select('CST');
    cy.get('#cprimaryInstructor').select('Onishenko');
    cy.get('#calternativeInstructor').select('Caron');
    cy.get('#createCO').click({force: true});
    cy.wait(50);

    cy.get('#openCreateModal').click({force: true});
    cy.wait(50);
    cy.get('#cCourse').type('COOS291');
    cy.get('#cName').clear({force: true}).type('Linux');
    cy.get('#cTerm').select('2023-2024 - Term 6');
    cy.get('#cProgram').select('CST');
    cy.get('#cprimaryInstructor').select('Onishenko');
    cy.get('#calternativeInstructor').select('Caron');
    cy.get('#createCO').click({force: true});
    cy.wait(50);


    // Have to then schedule them as needed
    cy.contains('Schedule Builder').click({force: true});
    cy.get('#programSelect').select('CST');
    cy.get('#termSelect').select('2023-2024 - Term 3');
    cy.get('#groupSelect').select('4');
    cy.get('#modalSubmit').click({force: true});

    // ATP #1 Total Bryce hours: 3
    cy.get('#460A').click({force: true});
    cy.wait(25);
    cy.get('#0011').click({force: true});
    cy.wait(25);
    cy.get('#0013').click({force: true});
    cy.wait(25);
    cy.get('#0015').click({force: true});
    cy.wait(25);

    // ATP #2 Total Ernesto hours: 2
    cy.get('#470A').click({force: true});
    cy.wait(25);
    cy.get('#0042').click({force: true});
    cy.wait(25);
    cy.get('#0045').click({force: true});
    cy.wait(25);

    // ATP #9 Onishenko Year 1 Hours: 2
    cy.get('#540A').click({force: true});
    cy.wait(25);
    // Tuesday at 9am and 11am
    cy.get('#0081').click({force: true});
    cy.wait(25);
    cy.get('#0082').click({force: true});
    cy.wait(25);

    // ATP #3 Total Ron hours: 4
    cy.get('#Bbutton').click({force: true});
    cy.wait(25);

    // ATP #5 Total Ben hours: 5
    cy.get('#480B').click({force: true});
    cy.wait(25);
    cy.get('#1011').click({force: true});
    cy.wait(25);
    cy.get('#1012').click({force: true});
    cy.wait(25);
    cy.get('#1013').click({force: true});
    cy.wait(25);

    // ATP #4 Total Coralee Hours: 2
    cy.get('#Cbutton').click({force: true});
    cy.wait(25);
    cy.get('#500C').click({force: true});
    cy.wait(25);
    cy.get('#2011').click({force: true});
    cy.wait(25);

    cy.get('#Dbutton').click({force: true});
    cy.wait(25);
    cy.get('#520D').click({force: true});
    cy.wait(25);
    cy.get('#3011').click({force: true});
    cy.wait(25);

    // ATP #6 Total Wade Hours: 11 (testing double digits here as well)
    cy.get('#530D').click({force: true});
    cy.wait(25);

    cy.get('#3081').click({force: true});
    cy.wait(25);
    cy.get('#3082').click({force: true});
    cy.wait(25);
    cy.get('#3083').click({force: true});
    cy.wait(25);
    cy.get('#3084').click({force: true});
    cy.wait(25);

    cy.get('#3071').click({force: true});
    cy.wait(25);
    cy.get('#3072').click({force: true});
    cy.wait(25);
    cy.get('#3073').click({force: true});
    cy.wait(25);
    cy.get('#3074').click({force: true});
    cy.wait(25);

    cy.contains('Schedule Builder').click({force: true});
    cy.get('#programSelect').select('CNT');
    cy.get('#termSelect').select('2023-2024 - Term 3');
    cy.get('#groupSelect').select('4');
    cy.get('#modalSubmit').click({force: true});
    cy.get('#Cbutton').click({force: true});
    cy.wait(25);

    cy.get('#510C').click({force: true});
    cy.wait(25);

    cy.get('#2011').click({force: true});
    cy.wait(25);
    cy.get('#2012').click({force: true});
    cy.wait(25);
    cy.get('#2013').click({force: true});
    cy.wait(25);

    // ATP #9 - navigating to other term
    cy.contains('Schedule Builder').click({force: true});
    cy.get('#programSelect').select('CST');
    cy.get('#termSelect').select('2023-2024 - Term 6');
    cy.get('#groupSelect').select('1');
    cy.get('#modalSubmit').click({force: true});
    cy.wait(25);

    // ATP #9 Onishenko Year 2 Hours: 2, total 4
    cy.get('#550A').click({force: true});
    cy.wait(25);
    // Thursday at 9am and 11am
    cy.get('#0011').click({force: true});
    cy.wait(25);
    cy.get('#0012').click({force: true});
    cy.wait(25);

    // ATP #11 Creating three terms, one with earliest start date, one with latest end date
    // and having one be term 3, and one term 6
    // and one so that it is not just retreiving the last option
    cy.visit('localhost:3000/term');
    cy.contains('Add New Term').click({force: true});

    cy.get('#cTermNumber').type('3');
    cy.wait(100);
    cy.get('#cStartDate').type('2024-05-01');
    cy.wait(100);
    cy.get('#cEndDate').type('2024-05-27');
    cy.wait(100);
    cy.get('#createTerm').click({force: true});
    cy.wait(100);

    cy.contains('Add New Term').click({force: true});

    cy.get('#cTermNumber').type('6');
    cy.wait(100);
    cy.get('#cStartDate').type('2024-05-15');
    cy.wait(100);
    cy.get('#cEndDate').type('2024-06-21');
    cy.wait(100);
    cy.get('#createTerm').click({force: true});
    cy.wait(100);

    cy.contains('Add New Term').click({force: true});
    cy.get('#cTermNumber').type('3');
    cy.wait(100);
    cy.get('#cStartDate').type('2024-05-12');
    cy.wait(100);
    cy.get('#cEndDate').type('2024-05-29');
    cy.wait(100);
    cy.get('#createTerm').click({force: true});
  });

  it('testThatInstructorHoursAreCalculated', () => {
    cy.visit('localhost:3000');
    cy.contains('Reports').click({force: true});
    cy.contains('Instructor Hours Report').click({force: true});

    // ATP #10 Sort list for terms
    const TERM_LIST =
      [
        'Fall 2023-2024',
        'Winter 2023-2024',
        'Spring 2023-2024',
        'Winter 2022-2023',
        'Spring 2022-2023',
      ];
    for (let i=0; i <TERM_LIST.length; i++) {
      const nChild = i+2;
      cy.get('#termSelect > option:nth-child('+nChild+')').should('have.text', TERM_LIST[i]);
    }

    // Need to enter the modal
    cy.get('#termSelect').select('Spring 2023-2024');
    cy.wait(20);

    cy.get('#submitBtn').click({force: true});
    cy.wait(20);

    // Checking the start and end dates
    cy.get('#dateRange').contains('Date Range: 2024-05-01 - 2024-06-21');

    // Arrays with each number representing an instructor's hours, sorted by last name
    const expectedPrimaryHours = [3, 0, 3, 0, 0, 0, 2, 10, 2, 3, 0];
    const expectedAlternativeHours = [0, 2, 0, 3, 0, 0, 0, 0, 3, 0, 0];
    const expectedTotalHours = [3, 2, 3, 3, 0, 0, 2, 10, 5, 3, 0];

    // Looping through each row in the table, and checking that the hours are what is expected
    for (let i = 0; i < INSTRUCTORLIST.length; i++) {
      const nChild = i + 1;
      cy.get('tbody > tr:nth-child(' + nChild + ') >td:nth-child(1)').contains(INSTRUCTORLIST[i]);
      cy.get('tbody > tr:nth-child(' + nChild + ') >td:nth-child(2)').contains(expectedPrimaryHours[i]);
      cy.get('tbody > tr:nth-child(' + nChild + ') >td:nth-child(3)').contains(expectedAlternativeHours[i]);
      cy.get('tbody > tr:nth-child(' + nChild + ') >td:nth-child(4)').contains(expectedTotalHours[i]);
    };
  });
});
