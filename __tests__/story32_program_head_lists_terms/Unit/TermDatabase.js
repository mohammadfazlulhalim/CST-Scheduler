test('Test title', () => {
    // Get refresher at: https://jestjs.io/docs/getting-started
    const functionCall = 3;
    const expectedResult = 3;
    expect(functionCall).toBe(expectedResult);
});

// const Term = require("../../../private/javascript/Term");
//
// test('testThatTermRetrievesFromDatabasePass', ()=>{
//     // Need to add data fixtures
//     const aList = Term.retrieveList();
//
//     expect(aList.length).toBe(6);
// });
//
// // Rename test - confusing
// test('testThatTermFailsRetrieveFromDatabase', ()=>{
//     // Need to empty database before running this test
//     const aList = Term.retrieveList();
//
//     expect(aList.length).toBe(0);
// });