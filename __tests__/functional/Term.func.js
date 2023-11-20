// Importing the ORM object
const Term = require('../../private/javascript/Term.js');
const supertest = require('supertest');
const app = require('../../app');
const constants = require('../../private/javascript/constants');

// this set of tests ensures that Term objects are handled within the database properly
describe('Terms in database', () => {
  let testTerm;

  // create a valid term to use as a base
  beforeEach(async () => {
    // drop the table and re-create it
    await Term.sync({force: true});
    testTerm = constants.validTerms[0];
  });

  test('testThatValidTermPostAddsToEmptyList', async () => {
    // do the POST test starting with an empty database
    await testPost(testTerm);
  });

  test('testThatValidTermPostAddsToPopulatedList', async () => {
    // create a few valid terms in the database
    for (const term of constants.validTerms) {
      await Term.create(term);
    }

    // do the POST test now with more entries in the database
    testTerm.startDate = '2023-09-01';
    await testPost(testTerm);
  });

  test('testThatInvalidTermPostDoesNotSaveToList', async () => {
    // store initial number of terms to compare against later
    const oldNumTerms = (await Term.findAll()).length;
    // change term number so that the term object is invalid
    testTerm.termNumber = 3;
    // attempt to create the term in the database
    await supertest(app).post('/term').send(testTerm).expect(422); // expect 422: unprocessable entity
    // since no term should have been added to the database, the number of terms should remain the same
    const newNumTerms = (await Term.findAll()).length;
    expect(newNumTerms).toBe(oldNumTerms);
  });

  // TODO: rename this one to be DeletesLastItem, add one for populated list
  test('testThatValidTermDeleteRemovesFromEmptyList', async () => {
    // do the DELETE test without any Terms in the database
    await testDelete(testTerm);
  });

  test('testThatValidTermDeleteRemovesFromPopulatedList', async () => {
    // create a few valid terms in the database
    for (const term of constants.validTerms) {
      await Term.create(term);
    }
    // do the DELETE test now that there are some Terms in the database
    await testDelete(testTerm);
  });

  test('testThatInvalidTermDeleteDoesNotRemoveFromList', async () => {
    const oldNumTerms = (await Term.findAll()).length;
    testTerm.id = 1;
    // try to delete a non-existent term
    await supertest(app).delete('/term').send(testTerm).expect(404); // expect 404: not found
    const newNumTerms = (await Term.findAll()).length;
    expect(newNumTerms).toBe(oldNumTerms);
  });

  test('testThatValidTermPutUpdatesList', async () => {
    // create a new term to update
    const termToUpdate = Term.create(testTerm);
    // store initial number of terms to compare against later
    const oldNumTerms = (await Term.findAll()).length;
    // update the newly added term
    await supertest(app).put('/term').send({
      id: termToUpdate.id,
      startDate: testTerm.startDate,
      endDate: '2023-12-15',
      termNumber: termToUpdate.termNumber,
    }).expect(200); // expect 200: OK
    // ensure it didn't add a new term
    const newNumTerms = (await Term.findAll()).length;
    expect(newNumTerms).toBe(oldNumTerms);
  });

  test('testThatInvalidTermPutDoesNotUpdateList', async () => {
    // create a new term to update
    const termToUpdate = Term.create(testTerm);
    // store initial number of terms to compare against later
    const oldNumTerms = (await Term.findAll()).length;
    // try to update the newly added term
    await supertest(app).put('/term').send({
      id: termToUpdate.id,
      startDate: testTerm.startDate,
      endDate: '2024-01-01',
      termNumber: termToUpdate.termNumber,
    }).expect(422); // expect 422: unprocessable entity
    // ensure it didn't add a new term
    const newNumTerms = (await Term.findAll()).length;
    expect(newNumTerms).toBe(oldNumTerms);
  });

  test('testThatNonExistentTermCannotBeUpdated', async () => {
    // create a new term to update
    const termToUpdate = Term.create(testTerm);
    // store initial number of terms to compare against later
    const oldNumTerms = (await Term.findAll()).length;
    // try to update the newly added term
    await supertest(app).put('/term').send({
      id: termToUpdate.id + 1, // non-existent ID
      startDate: testTerm.startDate,
      endDate: testTerm.startDate,
      termNumber: 3,
    }).expect(404); // expect 404: not found
    // ensure it didn't add a new term
    const newNumTerms = (await Term.findAll()).length;
    expect(newNumTerms).toBe(oldNumTerms);
  });
});

/**
 * This function tests POST requests on the Term router
 * @param {Object} testTerm - The term to POST
 */
const testPost = async function(testTerm) {
  const res = await supertest(app).post('/term').send(testTerm).expect(201); // expect 201: created

  // find the newly added term in the database
  // for this to work correctly, the router must set a parameter named 'id' using res.set()
  const foundTerm = await Term.findOne({where: {id: parseInt(res.get('id'))}});
  // if the term does not exist, it will not be truthy; it will be null
  expect(foundTerm).toBeTruthy();
};

/**
 * This function tests DELETE requests on the Term router
 * @param {Object} testTerm - The term to DELETE
 */
const testDelete = async function(testTerm) {
  // store initial number of terms to compare against later
  const oldNumTerms = (await Term.findAll()).length;
  // create a new term to delete, then promptly delete it
  // testTerm does not have an ID, so use newTerm instead
  const newTerm = await Term.create(testTerm);
  // delete the term
  await supertest(app).delete('/term').send(newTerm).expect(200); // expect 200: OK

  // If the term was deleted successfully, the number of terms in the database should
  // remain the same as it was before the 'create' statement
  const newNumTerms = (await Term.findAll()).length;
  expect(newNumTerms).toBe(oldNumTerms);
};
