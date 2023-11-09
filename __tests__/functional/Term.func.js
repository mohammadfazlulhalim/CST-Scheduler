// Importing the ORM object
const Term = require('../../private/javascript/Term.js');
const {sequelize} = require('../../dataSource');
const {createTerm, deleteTerm, updateTerm} = require('../../routes/term');

// this set of tests ensures that Term objects are handled within the database properly
describe('Terms in database', async () => {
  let testTerm;

  // create a valid term to use as a base
  beforeEach(async () => {
    testTerm = {termNumber: 1, startDate: '2023-08-01', endDate: '2023-12-01'};
  });

  test('testThatValidTermAddsToListWithoutErrors', async () => {
    // create a valid term in the database
    const msg = createTerm(testTerm);
    // expect there to be a success message
    expect(msg.success).toBe('Term Added Successfully');
    // find the newly added term to ensure it exists in the database
    const foundTerm = await Term.findByPk(msg.pk);
    // if the term does not exist, it will not be truthy; it will be null
    expect(foundTerm).toBeTruthy();
  });

  test('testThatInvalidTermDoesNotSaveToListAndReturnsErrorMessage', async () => {
    // store initial number of terms to compare against later
    const oldNumTerms = (await Term.findAll()).length;
    // change term number so that the term object is invalid
    testTerm.termNumber = 3;
    // attempt to create the term in the database
    const msg = createTerm(testTerm);
    // expect there to be error messages for the invalid fields
    expect(msg.startDate).toBe('Term 3 must start in May');
    expect(msg.endDate).toBe('Term 3 must end in May or June');
    // expect there to be no success message
    expect(msg.success).toBeFalsy();
    // since no term should have been added to the database, the number of terms should remain the same
    const newNumTerms = (await Term.findAll()).length;
    expect(newNumTerms).toBe(oldNumTerms);
  });

  test('testThatTermIsRemovedWhenTermIsDeleted', async () => {
    // store initial number of terms to compare against later
    const oldNumTerms = (await Term.findAll()).length;
    // create a new term to delete, then promptly delete it
    // testTerm does not have an ID, so use newTerm instead
    const newTerm = await Term.create(testTerm);
    await deleteTerm(newTerm);

    // If the term was deleted successfully, the number of terms in the database should
    // remain the same as it was before the 'create' statement
    const newNumTerms = (await Term.findAll()).length;
    expect(newNumTerms).toBe(oldNumTerms);
  });
});
