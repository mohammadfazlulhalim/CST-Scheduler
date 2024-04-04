Cypress.config('viewportWidth', 1600);
/**
 * UI tests for program report
 * Author: Chritseen Shlimoon
 */
const urlGET = 'localhost:3000';
const urlPOST = 'http://localhost:3000/programReport';
describe('Test Program Report Page', () => {
    before(() => {
        cy.exec('node electron-db-reset.js');
    })
    it('testProgramGET', () => {
        /**
         * testNavigationToTheReportProgramPage
         */
        // Opens the landing page
        cy.visit(urlGET);
        // Click on the "Reports" dropdown toggle
        cy.get('#reportDropdown > a').click();

        // Assert that the dropdown menu is hidden
        cy.get('.nav-item.dropdown.show').should('not.exist');

        // Click on the "Program Report" option
        cy.get('.nav-item.dropdown .dropdown-menu a[href="/programReport"]').click();

        // Assert that the URL has changed to the Program Report page
        cy.url().should('include', '/programReport');

        /**
         * testGenerateButtonDisabledOnModal
         */
        // Ensure the generate button is initially disabled
        cy.get('#submitBtn').should('be.disabled');

        /**
         * testGenerateButtonEnabledUponIProgramCourseGroupAndTermSelect
         */
        // Select the program from the dropdown based on value
        cy.get('#selectProgramReport').select('1');

        /**
         * testThatProgramSelectBoxesAreSorted
         */
        // Get the options from the select box
        cy.get('#selectProgramReport').find('option').then((options) => {
            // Check if options are present and there is more than one option
            if (options.length > 2) {
                // Iterate over options to check ascending order
                for (let i = 1; i < options.length - 1; i++) {
                    const currentOption = options.eq(i).text();
                    const nextOption = options.eq(i + 1).text();

                    // Compare current option with the next option
                    expect(currentOption.localeCompare(nextOption)).to.be.lessThan(0);
                }
            }
        });

        // Check if the generate button is still disabled
        cy.get('#submitBtn').should('be.disabled');

        // Select the term from the dropdown based on value
        cy.get('#selectTermReport').select('1');

        /**
         * testThatTermSelectBoxesAreSorted
         */
        // Get the options from the select box
        cy.get('#selectTermReport').find('option').then((options) => {
            // Check if options are present and there is more than one option
            if (options.length > 2) {
                // Iterate over options to check ascending order
                for (let i = 1; i < options.length - 1; i++) {
                    const currentOption = options.eq(i).text().substring(0, 14);
                    const nextOption = options.eq(i + 1).text().substring(0, 14);

                    // Compare current option with the next option using localeCompare
                    expect(currentOption.localeCompare(nextOption, undefined, {numeric: true})).to.be.lessThan(0);
                }
            }
        });
        // Check if the generate button is still disabled
        cy.get('#submitBtn').should('be.disabled');

        // Select the course group from the dropdown based on value
        cy.get('#selectGroupReport').select('A');

        /**
         * testThatGroupSelectBoxesAreSorted
         */
        // Get the options from the select box
        cy.get('#selectGroupReport').find('option').then((options) => {
            // Check if options are present and there is more than one option
            if (options.length > 2) {
                // Iterate over options to check ascending order
                for (let i = 1; i < options.length - 1; i++) {
                    const currentOption = options.eq(i).text();
                    const nextOption = options.eq(i + 1).text();

                    // Compare current option with the next option
                    expect(currentOption.localeCompare(nextOption)).to.be.lessThan(0);
                }
            }
        });

        // Check if the generate button is enabled after selecting both instructor and term
        cy.get('#submitBtn').should('be.enabled');
    });

    it('testProgramPOST', () => {
        const expectedTimes12 = ['8:00', '9:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00'];
        const expectedHeaders = ['Time', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

        const cellsToCheckFull = [
            // eslint-disable-next-line max-len
            {
                row: 1,
                col: 2,
                value: '\n                                \n                                            8:00\n                                        CST1MATH282B\n                                            Barrie\n                                            239B\n                                        \n                                        CST1COOS291B\n                                            Onishenko\n                                            239B\n                                        \n                                        CST1COHS280B\n                                            Kaban\n                                            239B\n                                        \n                                        CST1CDBM280B\n                                            Lahoda\n                                            239B\n                                        \n                                        CST1MATH282B\n                                            New\n                                            239B\n                                        \n                            '
            },
            // eslint-disable-next-line max-len
            {
                row: 2,
                col: 2,
                value: '\n                                \n                                            9:00\n                                        CST1COSA280B\n                                            Kaban\n                                            239B\n                                        \n                                        CST1COOS293B\n                                            Lahoda\n                                            239B\n                                        \n                                        CST1CWEB280B\n                                            New\n                                            239B\n                                        \n                                        CST1SEM283B\n                                            Schmidt\n                                            239B\n                                        \n                                        CST1COSA280B\n                                            Caron\n                                            239B\n                                        \n                            '
            },
            // eslint-disable-next-line max-len
            {
                row: 3,
                col: 2,
                value: '\n                                \n                                            10:00\n                                        CST1CDBM280B\n                                            New\n                                            239B\n                                        \n                                        CST1MATH282B\n                                            Schmidt\n                                            239B\n                                        \n                                        CST1COOS291B\n                                            Caron\n                                            239B\n                                        \n                                        CST1COHS280B\n                                            Grzesina\n                                            239B\n                                        \n                                        CST1CDBM280B\n                                            Basoalto\n                                            239B\n                                        \n                            '
            },
            // eslint-disable-next-line max-len
            {
                row: 4,
                col: 2,
                value: '\n                                \n                                            11:00\n                                        CST1SEM283B\n                                            Caron\n                                            239B\n                                        \n                                        CST1COSA280B\n                                            Grzesina\n                                            239B\n                                        \n                                        CST1COOS293B\n                                            Basoalto\n                                            239B\n                                        \n                                        CST1CWEB280B\n                                            Benson\n                                            239B\n                                        \n                                        CST1SEM283B\n                                            Holtslan\n                                            239B\n                                        \n                            '
            },
            // eslint-disable-next-line max-len
            {
                row: 5,
                col: 2,
                value: '\n                                \n                                            12:00\n                                            \n                                            \n                                            \n                                            \n                                            \n                            '
            },
            // eslint-disable-next-line max-len
            {
                row: 7,
                col: 2,
                value: '\n                                \n                                            2:00\n                                        CST1CWEB280B\n                                            Holtslan\n                                            239B\n                                        \n                                        CST1SEM283B\n                                            Barrie\n                                            239B\n                                        \n                                        CST1COSA280B\n                                            Onishenko\n                                            239B\n                                        \n                                        CST1COOS293B\n                                            Kaban\n                                            239B\n                                        \n                                        CST1CWEB280B\n                                            Lahoda\n                                            239B\n                                        \n                            '
            },
            {
                row: 6,
                col: 2,
                value: '\n                                \n                                            1:00\n                                        CST1COHS280B\n                                            Basoalto\n                                            239B\n                                        \n                                        CST1CDBM280B\n                                            Benson\n                                            239B\n                                        \n                                        CST1MATH282B\n                                            Holtslan\n                                            239B\n                                        \n                                        CST1COOS291B\n                                            Barrie\n                                            239B\n                                        \n                                        CST1COHS280B\n                                            Onishenko\n                                            239B\n                                        \n                            '
            },
            {
                row: 8,
                col: 2,
                value: '\n                                \n                                            3:00\n                                            \n                                            \n                                            \n                                            \n                                            \n                            '
            },
        ];

        const cellsToCheckCrissCross = [
            {
                row: 1,
                col: 2,
                value: 'CST1COOS293B\n                                            Barrie\n                                            239A\n                                        '
            },
            {
                row: 2,
                col: 3,
                value: 'CST1COSA280A\n                                            New\n                                            239A\n                                        '
            },
            {
                row: 3,
                col: 4,
                value: 'CST1SEM283A\n                                            Basoalto\n                                            239A\n                                        '
            },
            {
                row: 4,
                col: 4,
                value: 'CST1COHS280A\n                                            Holtslan\n                                            239A\n                                        '
            },
            {
                row: 3,
                col: 5,
                value: 'CST1CWEB280A\n                                            Onishenko\n                                            239A\n                                        '
            },
            {
                row: 4,
                col: 5,
                value: 'CST1COOS291A\n                                            Lahoda\n                                            239A\n                                        '
            },
            {
                row: 2,
                col: 6,
                value: 'CST1COOS293B\n                                            Schmidt\n                                            239A\n                                        '
            },
            {
                row: 6,
                col: 3,
                value: 'CST1CDBM280A\n                                            Caron\n                                            239A\n                                        '
            },
            {
                row: 7,
                col: 2,
                value: 'CST1MATH282A\n                                            Kaban\n                                            239A\n                                        '
            },
            {
                row: 6,
                col: 6,
                value: 'CST1MATH282A\n                                            Grzesina\n                                            239A\n                                        '
            },
        ];


        cy.visit(urlPOST);
        // Select the program from the dropdown based on value
        cy.get('#selectProgramReport').select('1');

        // Select the term from the dropdown based on value
        cy.get('#selectTermReport').select('1');

        // Select the course group from the dropdown based on value
        cy.get('#selectGroupReport').select('A');

        cy.get('#submitBtn').click();

        // Wait for the table to be visible
        cy.get('.table-bordered').should('exist');
        // One table
        cy.get('.table-bordered').should('have.length', 1);


        /**
         * testReportIsInATableWithWeekdaysAndHours
         */
        // Check each row individually

        for (let i = 0; i < expectedTimes12.length; i++) {
            const selector = `.table-bordered tbody tr:nth-child(${i + 1}) td:first-child`;
            const expectedText = expectedTimes12[i];

            cy.get(selector).should('have.text', expectedText);
        }


        /**
         * testCrissCross
         */
        cellsToCheckCrissCross.forEach(({row, col, value}) => {
            const selector = `.table-bordered tbody tr:nth-child(${row}) td:nth-child(${col})`;
            cy.get(selector).should('have.text', value);
        });

        // Check the content of the thead
        cy.get('.table-bordered thead tr th').each((header, index) => {
            cy.wrap(header).should('have.text', expectedHeaders[index]);
        });

        // Wait for the elements to be visible
        cy.get('#nameDisplayer').should('be.visible');
        cy.get('#dateGenDisplayer').should('be.visible');

        // Check the content of the date generated element
        cy.get('#dateGenDisplayer').invoke('text').then((text) => {
            // Validate that the date matches the format DD-Mmm-YYYY
            const datePattern = /^(0[1-9]|[12][0-9]|3[01])-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-\d{4}$/;
            expect(text).to.match(datePattern);
        });
        /**
         * testProgramAppearsOnTheReportHeader
         */
        // Check the content of the instructor's name element
        cy.get('#nameDisplayer').should('have.text', 'CST\n                        Term 1A');

        /**
         * testNewReportAndPrintButtonsAreVisible
         //      */
        // Wait for the buttons to be visible
        cy.get('#newProgramBtn').should('be.visible');
        cy.get('#printRptBtn').should('be.visible');

        // Click the New Report button and check for expected behavior
        cy.get('#newProgramBtn').click();
        cy.get('#programReportModal').should('be.visible');


        // Select the program from the dropdown based on value
        cy.get('#selectProgramReport').select('1');

        // Select the term from the dropdown based on value
        cy.get('#selectTermReport').select('1');

        // Select the course group from the dropdown based on value
        cy.get('#selectGroupReport').select('B');

        cy.get('#submitBtn').click();

        /**
         * testFull
         */
        cellsToCheckFull.forEach(({row, col, value}) => {
            const selector = `.table-bordered tbody tr:nth-child(${row})`;
            cy.get(selector).should('have.text', value);
        });


        Cypress.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false;
        });
    });

    /**
     * STORY 53 NO SPLITS
     */
    it('testNoSplit', () => {

        cy.visit('localhost:3000');
        // cy.get('.nav-item.dropdown .nav-link.dropdown-toggle').click();
        cy.get('#reportDropdown > a').click();
        cy.get('[href="/programReport"]').click();

        // Select the instructor from the dropdown based on value
        cy.get('#selectProgramReport').select('1');

        // Select the term from the dropdown based on value
        cy.get('#selectTermReport').select('1');

        // Select the group letter from the dropdown based on value
        cy.get('#selectGroupReport').select('A');

        // Submit the form
        cy.get('#submitBtn').click();

        //Test that the timeframe is correct
        cy.get('#2023-08-01').contains('Schedule Range: 2023-08-01 to 2023-12-01')
        //map for valid timeslot locations
        let classesInOrder = [
            ['COOS293B', '', '', '', ''],
            ['', 'COSA280A', '', '', 'COOS293B'],
            ['', '', 'SEM283A', 'CWEB280A', ''],
            ['', '', 'COHS280A', 'COOS291A', ''],
            ['', '', '', '', ''], // 12:00 slot appears empty
            ['', 'CDBM280A', '', '', 'MATH282A'],
            ['MATH282A', '', '', '', ''],
            ['', '', '', '', ''],
        ];
        //Check that theyre correct
        checkCorrectSchedule(classesInOrder);

        //check that the buttons for splits dont exist
        cy.get('#btnLeft').should('not.exist');
        cy.get('#btnRight').should('not.exist');

    });

    /**
     * STORY 53 NORMAL SPLITS
     */
    it('testStandardSplit', () => {

        //Opens the landing page
        cy.visit('localhost:3000');

        //switch the splitting course offerings for standard split
        cy.contains('Administration').click();
        cy.contains('Course Offerings').click();
        cy.url().should('include', '/courseOffering');
        cy.get('#26edit').click();
        cy.get('#eTerm').select(0);
        cy.get('#eGroup').clear().type('A');
        cy.get('#eProgram').select(1);
        cy.get('#editCO').click();

        //switch course offering for weird split
        cy.get('#27edit').click();
        cy.get('#eTerm').select(0);
        cy.get('#eStartDate').clear().wait(100).type('2023-10-31');
        cy.get('#eEndDate').clear().wait(100).type('2023-10-31');
        cy.get('#eGroup').clear().type('A');
        cy.get('#eProgram').select(1);

        cy.get('#editCO').click();

        //create timeslot
        cy.contains('Schedule Builder').click();
        cy.get('#programSelect').select('CST');
        cy.get('#termSelect').select('2023-1');
        cy.get('#groupSelect').select('4');
        cy.get('#modalSubmit').click();
        cy.get('#Systems\\ Administration\\ 2-A').click();
        cy.get('#4-3-A').click();

        // Click on the "Reports" dropdown toggle
        // cy.get('.nav-item.dropdown .nav-link.dropdown-toggle').click();
        cy.get('#reportDropdown > a').click();
        cy.get('[href="/programReport"]').click();

        // Select the instructor from the dropdown based on value
        cy.get('#selectProgramReport').select('1');

        // Select the term from the dropdown based on value
        cy.get('#selectTermReport').select('1');

        // Select the group letter from the dropdown based on value
        cy.get('#selectGroupReport').select('A');

        // Submit the form
        cy.get('#submitBtn').click();

        //Test that the timeframe is correct
        cy.get('#2023-08-01').contains('Schedule Range: 2023-08-01 to 2023-09-30')
        //map for valid timeslot locations
        let classesInOrder = [
            ['COOS293B', '', '', '', ''],
            ['', 'COSA280A', '', '', 'COOS293B'],
            ['', '', 'SEM283A', 'CWEB280A', ''],
            ['', '', 'COHS280A', 'COOS291A', ''],
            ['', '', '', '', ''], // 12:00 slot appears empty
            ['', 'CDBM280A', '', '', 'MATH282A'],
            ['MATH282A', '', '', '', ''],
            ['', '', '', '', ''],
        ];
        //Check that theyre correct
        checkCorrectSchedule(classesInOrder);

        //go to the next split
        cy.get('#btnRight').click();
        //Test that the timeframe is correct
        cy.get('#2023-10-01').contains('Schedule Range: 2023-10-01 to 2023-12-01')
        //map for valid timeslot locations
        classesInOrder = [
            ['COOS293B', '', '', '', ''],
            ['', 'COSA280A', '', '', 'COOS293B'],
            ['', '', 'SEM283A', 'CWEB280A', ''],
            ['', '', 'COHS280A', 'COOS291A', ''],
            ['', '', 'COOS293A', '', ''],
            ['', 'CDBM280A', '', '', 'MATH282A'],
            ['MATH282A', '', '', '', ''],
            ['', '', '', '', ''],
        ];
        //Check that theyre correct
        checkCorrectSchedule(classesInOrder);

        //check that there's 2 splits
        cy.get('#btnRight').click();

        //map for valid timeslot locations
        classesInOrder = [
            ['COOS293B', '', '', '', ''],
            ['', 'COSA280A', '', '', 'COOS293B'],
            ['', '', 'SEM283A', 'CWEB280A', ''],
            ['', '', 'COHS280A', 'COOS291A', ''],
            ['', '', '', '', ''], // 12:00 slot appears empty
            ['', 'CDBM280A', '', '', 'MATH282A'],
            ['MATH282A', '', '', '', ''],
            ['', '', '', '', ''],
        ];
//Check that theyre correct
        checkCorrectSchedule(classesInOrder);

        //check that left button works
        cy.get('#btnLeft').click();

        //map for valid timeslot locations
        classesInOrder = [
            ['COOS293B', '', '', '', ''],
            ['', 'COSA280A', '', '', 'COOS293B'],
            ['', '', 'SEM283A', 'CWEB280A', ''],
            ['', '', 'COHS280A', 'COOS291A', ''],
            ['', '', 'COOS293A', '', ''],
            ['', 'CDBM280A', '', '', 'MATH282A'],
            ['MATH282A', '', '', '', ''],
            ['', '', '', '', ''],
        ];
//Check that theyre correct
        checkCorrectSchedule(classesInOrder);
    });

    /**
     * checking that a non-standard split works properly
     */
    it('testWeirdSplit', () => {
        cy.visit('localhost:3000');

        //create timeslot
        cy.contains('Schedule Builder').click();
        cy.get('#programSelect').select('CST');
        cy.get('#termSelect').select('2023-1');
        cy.get('#groupSelect').select('4');
        cy.get('#modalSubmit').click();
        cy.get('#Mathematics\\ of\\ Computation-A').click();
        cy.get('#7-3-A').click();

        // Click on the "Reports" dropdown toggle
        // cy.get('.nav-item.dropdown .nav-link.dropdown-toggle').click();
        cy.get('#reportDropdown > a').click();
        cy.get('[href="/programReport"]').click();

        // Select the instructor from the dropdown based on value
        cy.get('#selectProgramReport').select('1');

        // Select the term from the dropdown based on value
        cy.get('#selectTermReport').select('1');

        // Select the group letter from the dropdown based on value
        cy.get('#selectGroupReport').select('A');

        // Submit the form
        cy.get('#submitBtn').click();

        //Test that the timeframe is correct
        cy.get('#2023-08-01').contains('Schedule Range: 2023-08-01 to 2023-09-30')
        //map for valid timeslot locations
        let classesInOrder = [
            ['COOS293B', '', '', '', ''],
            ['', 'COSA280A', '', '', 'COOS293B'],
            ['', '', 'SEM283A', 'CWEB280A', ''],
            ['', '', 'COHS280A', 'COOS291A', ''],
            ['', '', '', '', ''], // 12:00 slot appears empty
            ['', 'CDBM280A', '', '', 'MATH282A'],
            ['MATH282A', '', '', '', ''],
            ['', '', '', '', ''],
        ];
        //Check that theyre correct
        checkCorrectSchedule(classesInOrder);

        //go to the next split
        cy.get('#btnRight').click();
        //Test that the timeframe is correct
        cy.get('#2023-10-01').contains('Schedule Range: 2023-10-01 to 2023-10-30')
        //map for valid timeslot locations
        classesInOrder = [
            ['COOS293B', '', '', '', ''],
            ['', 'COSA280A', '', '', 'COOS293B'],
            ['', '', 'SEM283A', 'CWEB280A', ''],
            ['', '', 'COHS280A', 'COOS291A', ''],
            ['', '', 'COOS293A', '', ''], // 12:00 slot appears empty
            ['', 'CDBM280A', '', '', 'MATH282A'],
            ['MATH282A', '', '', '', ''],
            ['', '', '', '', ''],
        ];
        //Check that theyre correct
        checkCorrectSchedule(classesInOrder);

        //go to the next split
        cy.get('#btnRight').click();
        //Test that it splits on a single day
        cy.get('#2023-10-31').contains('Schedule Range: 2023-10-31 to 2023-10-31')
        //map for valid timeslot locations
        classesInOrder = [
            ['COOS293B', '', '', '', ''],
            ['', 'COSA280A', '', '', 'COOS293B'],
            ['', '', 'SEM283A', 'CWEB280A', ''],
            ['', '', 'COHS280A', 'COOS291A', ''],
            ['', '', 'COOS293A', '', ''], // 12:00 slot appears empty
            ['', 'CDBM280A', '', '', 'MATH282A'],
            ['MATH282A', '', '', '', ''],
            ['', '', 'MATH282A', '', ''],
        ];
        //Check that theyre correct
        checkCorrectSchedule(classesInOrder);

        //go to the next split
        cy.get('#btnRight').click();
        //Test that the timeframe is correct
        cy.get('#2023-11-01').contains('Schedule Range: 2023-11-01 to 2023-12-01')
        //map for valid timeslot locations
        classesInOrder = [
            ['COOS293B', '', '', '', ''],
            ['', 'COSA280A', '', '', 'COOS293B'],
            ['', '', 'SEM283A', 'CWEB280A', ''],
            ['', '', 'COHS280A', 'COOS291A', ''],
            ['', '', 'COOS293A', '', ''], // 12:00 slot appears empty
            ['', 'CDBM280A', '', '', 'MATH282A'],
            ['MATH282A', '', '', '', ''],
            ['', '', '', '', ''],
        ];
        //Check that theyre correct
        checkCorrectSchedule(classesInOrder);


        //Chekc that there's only 4 splits
        cy.get('#btnRight').click();
        //Test that the timeframe is correct
        cy.get('#2023-08-01').contains('Schedule Range: 2023-08-01 to 2023-09-30')
        //map for valid timeslot locations
        classesInOrder = [
            ['COOS293B', '', '', '', ''],
            ['', 'COSA280A', '', '', 'COOS293B'],
            ['', '', 'SEM283A', 'CWEB280A', ''],
            ['', '', 'COHS280A', 'COOS291A', ''],
            ['', '', '', '', ''], // 12:00 slot appears empty
            ['', 'CDBM280A', '', '', 'MATH282A'],
            ['MATH282A', '', '', '', ''],
            ['', '', '', '', ''],
        ];
        //Check that theyre correct
        checkCorrectSchedule(classesInOrder);

        //Check that left button works
        cy.get('#btnLeft').click();
        //Test that the timeframe is correct
        cy.get('#2023-11-01').contains('Schedule Range: 2023-11-01 to 2023-12-01')
        //map for valid timeslot locations
        classesInOrder = [
            ['COOS293B', '', '', '', ''],
            ['', 'COSA280A', '', '', 'COOS293B'],
            ['', '', 'SEM283A', 'CWEB280A', ''],
            ['', '', 'COHS280A', 'COOS291A', ''],
            ['', '', 'COOS293A', '', ''], // 12:00 slot appears empty
            ['', 'CDBM280A', '', '', 'MATH282A'],
            ['MATH282A', '', '', '', ''],
            ['', '', '', '', ''],
        ];
        //Check that theyre correct
        checkCorrectSchedule(classesInOrder);
    });

});


/**
 * checks that a schedule matches a given pattern
 * @param classesInOrder
 */
function checkCorrectSchedule(classesInOrder) {
    for (let i = 1; i < 6; i++) { // for nth child row
        for (let j = 1; j < 9; j++) { // for nth child column
            const classText = classesInOrder[j - 1][i - 1]; // text in corresponding cell in text array
            const classSelector = `.active > .table-responsive > .table > tbody > :nth-child(${j}) > :nth-child(${i + 1})`; // cy statement

            console.log(classText);

            if (classText) {
                cy.get(classSelector).should('contain', classText); // if not empty, check text
            } else {
                cy.get(classSelector).should('be.empty'); // else, make sure empty
            }
        }
    }
}
