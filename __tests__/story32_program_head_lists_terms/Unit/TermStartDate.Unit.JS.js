const Term = require('../../../private/javascript/Term.js');

// Here is a function to remind myself of syntac
// Get refresher at: https://jestjs.io/docs/getting-started
const functionCall = 3;
const expectedResult =3;

// This is working and passing, testing library is all working now
test('Test title', () => {
  expect(functionCall).toBe(expectedResult);
});

// Now I just need to add in all my tests, and stubs for all my methods
// Need to think out all of my constructors
// As a group, how do we plan on doing things regarding classes and constructor restrictions

test('testThatTerm1AcceptsStartDateInAugust', ()=>{
  // How do I call the term class? Need to figure out exports better, more research needed
});
