test('Test title', () => {
    // Get refresher at: https://jestjs.io/docs/getting-started
    const functionCall = 3;
    const expectedResult = 3;
    expect(functionCall).toBe(expectedResult);
});

// // Term 1 Tests
// const Term = require("../../../private/javascript/Term");
// test('testThatTerm1EndDateInDecemberPass', async ()=>{
//     const term1 = await Term.create({startDate: '2023-09-01', endDate: '2023-12-01', termNumber: 1});
//     expect(term1).toBeTruthy();
//     expect(term1.endDate).toBe('2023-12-01');
//
//     expect(term1.validate()).resolves.toBe(undefined);
// });
//
// test('testThatTerm1EndDateInJanuaryFail', async ()=>{
//     try {
//         const term1 = await Term.create({startDate: '2023-09-01', endDate: '2023-11-01', termNumber: 1});
//     } catch (err) {
//         expect(err.errors[0].message).toBe('Term 1 must edn in December');
//     }
//
// });
//
// // Term 4 Tests
// test('testThatTerm4EndDateInDecemberPass', ()=>{
//
// });
//
// test('testThatTerm4EndDateInJanuaryFail', ()=>{
//
// });
//
// // Term 2 Tests
// test('testThatTerm2EndDateInAprilPass', ()=>{
//
// });
//
// test('testThatTerm2EndDateInMayFail', ()=>{
//
// });
//
// // Term 5 Tests
// test('testThatTerm5EndDateInAprilPass', ()=>{
//
// });
//
// test('testThatTerm5EndDateInMayFail', ()=>{
//
// });
//
// // Term 3 Tests
// test('testThatTerm3EndDateInMayPass', ()=>{
//
// });
//
// test('testThatTerm3EndDateInJunePass', ()=>{
//
// });
//
// test('testThatTerm3EndDateInJulyFail', ()=>{
//
// });
//
// // Term 6 Tests
// test('testThatTerm6EndDateInMayPass', ()=>{
//
// });
//
// test('testThatTerm6EndDateInJunePass', ()=>{
//
// });
//
// test('testThatTerm6EndDateInJulyFail', ()=>{
//
// });