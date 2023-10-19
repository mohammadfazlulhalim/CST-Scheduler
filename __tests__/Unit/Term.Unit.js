// Importing the ORM object
const Term = require('../../private/javascript/Term.js');
const {sequelize}= require('../../datasource');
//const {Sequelize} = require('sequelize');

// Term.sequelize = new Sequelize('sqlite:memory');

describe('startDate', () => {
    let term1;

    beforeAll(async () => {
        try {
            await sequelize.sync();
            //console.log('Terms table created successfully');

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

// // Term 1 Tests
//     test('testThatTerm1StartDateInAugustPass', async () => {
//         // For a pass, it will be easy
//         //  1. Call constructor with arguments
//         //term1 = await new Term({startDate: '2023-08-01', endDate: '2023-12-01', termNumber: 1});
//         //  2. Check that object is created and has valid info
//         //expect(term1).toBeTruthy();
//         //expect(term1.startDate).toBe('2023-08-01');
//
//         // Check for no errors
//         //expect(term1.validate()).resolves.toBe(undefined);
//
//     });
//
//     test('testThatTerm1StartDateInSeptemberPass', async () => {
//         //term1 = await new Term({startDate: '2023-09-01', endDate: '2023-12-01', termNumber: 1});
//         //expect(term1).toBeTruthy();
//         //expect(term1.startDate).toBe('2023-09-01');
//
//         //expect(term1.validate()).resolves.toBe(undefined);
//
//
//     });
//
//     test('testThatTerm1StartDateInJulyFail', async () => {
//         // For a fail, we need to catch the error message
//         try {
//             //term1 = await new Term({startDate: '2023-07-01', endDate: '2023-12-01', termNumber: 1});
//         } catch (err) {
//             //expect(err.errors[0].message).toBe('Term 1 must start in August or September');
//         }
//
//     });
//
// // Term 4 Tests
//     test('testThatTerm4StartDateInAugustPass', () => {
//
//     });
//
//     test('testThatTerm4StartDateInSeptemberPass', () => {
//
//     });
//
//     test('testThatTerm4StartDateInJulyFail', () => {
//
//     });
//
// // Term 2 Tests
//     test('testThatTerm2StartDateInJanuaryPass', () => {
//
//     });
//
//     test('testThatTerm2StartDateInDecemberFail', () => {
//
//     });
//
// // Term 5 Tests
//     test('testThatTerm5StartDateInJanuaryPass', () => {
//
//     });
//
//     test('testThatTerm5StartDateInDecemberFail', () => {
//
//     });
//
// // Term 3
//     test('testThatTerm3StartDateInMayPass', () => {
//
//     });
//
//     test('testThatTerm3StartDateInAprilFail', () => {
//
//     });
//
// // Term 6
//     test('testThatTerm6StartDateInMayPass', () => {
//
//     });
//
//     test('testThatTerm6StartDateInAprilFail', () => {
//
//     });
});

describe('termNumber', () => {
    let term1;

    beforeAll(async () => {
        try {
            await sequelize.sync();
            //console.log('Terms table created successfully');

        } catch (error) {
            console.error('Error creating Term table: ', error);
        }
    });

    beforeEach(async () => {
        term1 = await new Term({startDate: '2023-08-01', endDate: '2023-12-01', termNumber: 1})
    });


    test('testThatTermLowNumberPass', async () => {
        // For an accept, it will be easy
        //  1. Call constructor with arguments
        term1.termNumber =1;
        await Term.create({startDate: '2023-08-01', endDate: '2023-12-01', termNumber: 1});
        //  2. Check that object is created and has valid info
        expect(term1).toBeDefined();
        expect(term1.termNumber).toBe(1);

        // Check for no errors
        //expect(term1.validate()).resolves.toBe(undefined);

    });

    test('testThatTermBelowOneFail', async () => {
        // For a reject, we need to catch the error message
        term1.termNumber =1;
        let bCaughtErr = false;
        try {
            // Need to clean this up
            await Term.create({startDate: '2023-08-01', endDate: '2023-12-01', termNumber: 0});
        } catch (err) {
            bCaughtErr = true;
            expect(err.errors.length).toBe(1);
            expect(err.errors[0].message).toBe('Term number must be between 1 and 6');
        }

        if (!bCaughtErr) {
            expect(1).toBe(2);
        }

    });

    test('testThatTermHighNumberPass', async () => {
        term1.termNumber =6;
        await Term.create(term1);
        //  2. Check that object is created and has valid info
        expect(term1).toBeDefined();
        expect(term1.termNumber).toBe(6);

    });

    // test('testThatTermAboveSixFail', async () => {
    //     term1.termNumber =7;
    //     try {
    //         await Term.create(term1);
    //         fail('The validator did not throw errors');
    //     } catch (err) {
    //         expect(err.errors.length).toBe(1);
    //         expect(err.errors[0].message).toBe('Term number must be between 1 and 6');
    //
    //         //expect(error.message).toBe('Term number must be between 1 and 6');
    //     }
    //
    // });



});
