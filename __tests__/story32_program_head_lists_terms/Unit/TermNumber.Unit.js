test('Test title', () => {
    // Get refresher at: https://jestjs.io/docs/getting-started
    const functionCall = 3;
    const expectedResult = 3;
    expect(functionCall).toBe(expectedResult);
});


// test('testThatTermLowNumberPass', async ()=>{
//     // For an accept, it will be easy
//     //  1. Call constructor with arguments
//     const term1 = await Term.create({startDate: '2023-09-01', endDate: '2023-12-01', termNumber: 1});
//     //  2. Check that object is created and has valid info
//     expect(term1).toBeTruthy();
//     expect(term1.termNumber).toBe(1);
//
//     // Check for no errors
//     expect(term1.validate()).resolves.toBe(undefined);
//
// });
//
// test('testThatTermBelowOneFail', async ()=>{
//     // For a reject, we need to catch the error message
//     try {
//         const term1 = await Term.create({startDate: '2023-09-01', endDate: '2023-12-01', termNumber: 0});
//     } catch (err) {
//         expect(err.errors[0].message).toBe('Term number must be between 1 and 6');
//     }
//
// });
//
// test('testThatTermHighNumberPass', ()=>{
//
// });
//
// test('testThatTermAboveSixFail', ()=>{
//
// });
