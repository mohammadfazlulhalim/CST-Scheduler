// Importing the ORM object
const Term = require('../../private/javascript/Term.js').Term;
const {sequelize}= require('../../datasource');
//const {Sequelize} = require('sequelize');

// Term.sequelize = new Sequelize('sqlite:memory');

describe('startDate', () => {
    let term1;

    beforeAll(async () => {
        try {
            await sequelize.sync();
            console.log('Terms table created successfully');

        } catch (error) {
            console.error('Error creating Term table: ', error);
        }
    });

    beforeEach(async () => {
        term1 = await new Term({startDate: '2023-08-01', endDate: '2023-12-01', termNumber: 1})
    });


// Here is a function to remind myself of syntax
// This is working and passing, testing library is all working now
    test('Test title ExampleSyntax', () => {
        // Get refresher at: https://jestjs.io/docs/getting-started
        const functionCall = 3;
        const expectedResult = 3;
        expect(functionCall).toBe(expectedResult);
    });

// Term 1 Tests
    test('testThatTerm1StartDateInAugustPass', async () => {
        // For a pass, it will be easy
        //  1. Call constructor with arguments
        //term1 = await new Term({startDate: '2023-08-01', endDate: '2023-12-01', termNumber: 1});
        //  2. Check that object is created and has valid info
        //expect(term1).toBeTruthy();
        //expect(term1.startDate).toBe('2023-08-01');

        // Check for no errors
        //expect(term1.validate()).resolves.toBe(undefined);

    });

    test('testThatTerm1StartDateInSeptemberPass', async () => {
        //term1 = await new Term({startDate: '2023-09-01', endDate: '2023-12-01', termNumber: 1});
        //expect(term1).toBeTruthy();
        //expect(term1.startDate).toBe('2023-09-01');

        //expect(term1.validate()).resolves.toBe(undefined);


    });

    test('testThatTerm1StartDateInJulyFail', async () => {
        // For a fail, we need to catch the error message
        try {
            //term1 = await new Term({startDate: '2023-07-01', endDate: '2023-12-01', termNumber: 1});
        } catch (err) {
            //expect(err.errors[0].message).toBe('Term 1 must start in August or September');
        }

    });

// Term 4 Tests
    test('testThatTerm4StartDateInAugustPass', () => {

    });

    test('testThatTerm4StartDateInSeptemberPass', () => {

    });

    test('testThatTerm4StartDateInJulyFail', () => {

    });

// Term 2 Tests
    test('testThatTerm2StartDateInJanuaryPass', () => {

    });

    test('testThatTerm2StartDateInDecemberFail', () => {

    });

// Term 5 Tests
    test('testThatTerm5StartDateInJanuaryPass', () => {

    });

    test('testThatTerm5StartDateInDecemberFail', () => {

    });

// Term 3
    test('testThatTerm3StartDateInMayPass', () => {

    });

    test('testThatTerm3StartDateInAprilFail', () => {

    });

// Term 6
    test('testThatTerm6StartDateInMayPass', () => {

    });

    test('testThatTerm6StartDateInAprilFail', () => {

    });
});

