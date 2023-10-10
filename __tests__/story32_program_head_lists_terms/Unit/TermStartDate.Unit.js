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

// Term 1 Tests
test('testThatTerm1AcceptsStartDateInAugust', ()=>{
  // How do I call the term class? Need to figure out exports better, more research needed

  // For an accept, it will be easy
  //  1. Call constructor with arguments
  //  2. Check that object has valid info

});

test('testThatTerm1AcceptsStartDateInSeptember', ()=>{

});

test('testThatTerm1RejectsStartDateInJuly', ()=>{
  // For a reject, we need to figure out what should be displayed, and catch error?

});

// Term 4 Tests
test('testThatTerm4AcceptsStartDateInAugust', ()=>{

});

test('testThatTerm4AcceptsStartDateInSeptember', ()=>{

});

test('testThatTerm4RejectsStartDateInJuly', ()=>{

});

// Term 2 Tests
test('testThatTerm2AcceptsStartDateInJanuary', ()=>{

});

test('testThatTerm2RejectsStartDateInDecember', ()=>{

});

// Term 5 Tests
test('testThatTerm5AcceptsStartDateInJanuary', ()=>{

});

test('testThatTerm5RejectsStartDateInDecember', ()=>{

});

// Term 3
test('testThatTerm3AcceptsStartDateInMay', ()=>{

});

test('testThatTerm3RejectsStartDateInApril', ()=>{

});

// Term 6
test('testThatTerm6AcceptsStartDateInMay', ()=>{

});

test('testThatTerm6RejectsStartDateInApril', ()=>{

});

