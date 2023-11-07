// Importing the ORM object
const Term = require('../../private/javascript/Term.js');
const {sequelize} = require('../../dataSource');
const {createTerm} = require('../../routes/term');

// this set of tests ensures that Term objects are handled within the database properly
describe('Terms in database', async () => {
  let testTerm;

  // create a valid term to use as a base
  beforeEach(async () => {
    testTerm = {termNumber: 1, startDate: '2023-08-01', endDate: '2023-12-01'};
  });

  test('testThatValidTermAddsToListWithoutErrors', async () => {
    const msg = createTerm(testTerm);
    expect(msg.success).toBe('Term Added Successfully');
  });
});
