/**
 * UI tests for split schedules
 * Author: Chritseen Shlimoon & Raven Hogan
 */
const urlGET = 'http://localhost:3000/schedule';
const urlPOST = 'http://localhost:3000/schedule';


describe('Test Schedule Report Page', () => {
    const programList = ['CNT', 'CST', 'ECE'];
    const termList = ['2023 - 1', '2023 - 2', '2023 - 3', '2023 - 4', '2023 - 5', '2023 - 6', '2024 - 5'];
    before(() => {
        cy.exec('node electron-db-reset.js');
    });
    it('testSplitSchedule', () => {
        const selectedTimeSlot = 2; // Adjust this to the desired time slot (0-7)
        const selectedDay = 3; // Adjust this to the desired day (1-5)
        // Opens the landing page
        cy.visit(urlGET);

        /**
         * Modal appears upon arrival
         */
        cy.get('#scheduleModal').should('be.visible');

        // Sort orders are checked in the other test, as one giant test was not running smoothly

        /**
         * Button disabling and enabling
         */
        // Check that Enter button is disabled
        cy.get('#modalSubmit').should('be.disabled');

        // Check that Program field can be entered
        cy.contains('Program');
        cy.get('#programSelect').select('CNT');
        /**
         * testThatProgramSelectBoxesAreSorted
         */
        // Get the options from the select box

        cy.get('#programSelect').children('option').then(($options) => {
            const optionsTexts = $options.toArray().map((option) => option.textContent.trim());
            const sortedOptions = [...optionsTexts].sort((a, b) => a.localeCompare(b, 'en', {sensitivity: 'base'}));
            expect(optionsTexts).to.deep.equal(sortedOptions);
        });


        // Check that Enter button is disabled
        cy.get('#modalSubmit').should('be.disabled');

        /**
         * testThatTermSelectBoxesAreSorted
         */
        cy.get('#termSelect').then(($options) => {
            const optionsTexts = $options.toArray().map((option) => option.textContent.trim());
            const sortedOptions = [...optionsTexts].sort((a, b) => {
                const yearA = parseInt(a.match(/\d{4}/)[0]);
                const yearB = parseInt(b.match(/\d{4}/)[0]);
                return yearA - yearB;
            });
            expect(optionsTexts).to.deep.equal(sortedOptions);
        });

        cy.get('#termSelect').select('2022-2023 - Term 2');
        cy.get('#modalSubmit').should('be.disabled');
        cy.contains('Number of Groups');
        cy.get('#groupSelect').select('4');
        cy.get('#groupSelect').find('option').then((options) => {
            const values = Array.from(options, (option) => option.value);

            // Check if the values are sorted in ascending order
            const sortedValues = [...values].sort();
            expect(values).to.deep.equal(sortedValues);
        });

        cy.get('#groupSelect').select('4');

        cy.get('#modalSubmit').not('be.disabled');

        cy.get('#modalSubmit').click();

        cy.get('#scheduleModal').should('be.hidden');

        cy.get('.COButtons').should('have.length.greaterThan', 0);
        cy.get('#180').click();
        cy.get('#0011').click();
        cy.get('#0011').contains('p', 'COHS190');
        cy.get('#0011').contains('p', 'Benson / Caron');
        cy.get('#0011').contains('p', '239A');
        cy.get('.COButtons').should('have.length.greaterThan', 0);

        cy.get('#210').click({force: true});
        cy.get('#0012').click();
        cy.get('#210').should('not.exist');
        cy.wait(100);
        cy.get('#nextA').should('be.visible').click();
        cy.get('#211').should('exist');
        cy.get('#tableRange01').contains('2023-04-15 to 2023-04-28');
        cy.get('#0112').contains('p', 'TCOM291'); //selects da box
        cy.get('#0112').contains('p', 'Holtslan');
        cy.get('#0112').contains('p', '239A');
        cy.get('#prevA').should('be.visible').click({force: true});
        cy.get('#tableRange00').contains('2023-01-02 to 2023-04-15');
        cy.get('#0012').find('p').should('be.empty');
        cy.get('#180').click({force: true});
        cy.get('#0012').click({force: true});
        cy.get('#0012').find('p').should('be.empty');
        cy.wait(50);
        cy.get('#nextA').should('be.visible').click({force: true});
        cy.get('#tableRange01').contains('2023-04-15 to 2023-04-28');
        cy.get('[id^="tableRange"]').each(($el) => {
            const text = $el.text();
            const dates = text.replace(/Table Range: /, '').split(' to ');
            const regex = /^\d{4}-\d{2}-\d{2}$/;

            // Extract start and end dates
            const startDate = dates[0].trim();
            const endDate = dates[1].trim();

            // Check each date format
            expect(startDate, 'Start Date Format').to.match(regex);
            expect(endDate, 'End Date Format').to.match(regex);
        });

        cy.get('#191').click({force: true}); // Click the first course button
        cy.get('#0185').click({force: true});
        cy.get('#tableRange01').contains('2023-03-01 to 2023-04-15');
        cy.get('#0112').find('p').should('be.empty');

        cy.get('#0185').contains('p', 'COSC292'); //selects da box
        cy.get('#0185').contains('p', 'Barrie');
        cy.get('#0185').contains('p', '239A');
        cy.wait(50);
        cy.get('#nextA').should('be.visible').click({force: true});
        cy.get('#tableRange02').contains('2023-04-15 to 2023-04-28');
        cy.get('#0285').contains('p', 'COSC292'); //selects da box
        cy.get('#0285').contains('p', 'Barrie');
        cy.get('#0285').contains('p', '239A');
        cy.get('#0285').rightclick({force: true});
        cy.get('#0085').find('p').should('be.empty');
        cy.get('#tableRange00').contains('2023-01-02 to 2023-04-15');
    });


    it('testSplitSchedule', () => {
        // Editing a split course will modify the sheducle info
        cy.visit('http://localhost:3000/courseOffering');


        cy.get("#18edit").click();
        cy.wait(500);
        cy.get("#eStartDate").clear().type('2023-01-03');
        cy.wait(500);
        cy.get("#editCO").click();

        cy.visit(urlGET);


        cy.contains('Program');
        cy.get('#programSelect').select('CNT');


        cy.get('#termSelect').select('2022-2023 - Term 2');


        cy.get('#groupSelect').select('4');


        cy.get('#modalSubmit').click();

        // Course offering should have a new start date
        cy.get('#180').contains("2023-01-03");

        // Deleting a course that splits the schedule gets rid of split

        cy.visit('http://localhost:3000/courseOffering');


        cy.get("#18delete").click();
        cy.wait(500);
        cy.get("#deleteCO").click();

        cy.visit(urlGET);


        cy.contains('Program');
        cy.get('#programSelect').select('CNT');


        cy.get('#termSelect').select('2022-2023 - Term 2');


        cy.get('#groupSelect').select('4');


        cy.get('#modalSubmit').click();

        cy.get('table')
            .should('not.contain.text', 'COHS190');

    });
});
