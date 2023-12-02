const Instructor = require('../../private/javascript/Instructor');
const supertest = require('supertest');
const app = require('../../app');
const constants = require('../../constants');

describe('Instructors in database', () => {
  let testInstructor;

  // create a valid term to use as a base
  beforeEach(async () => {
    // drop the table and re-create it
    await Instructor.sync({force: true});
    testInstructor = {...constants.testConst.validInstructor[0]};
  });

  test('testThatValidTermPostAddsToEmptyList', async () => {
    // do the POST test starting with an empty database
    await testPost(testInstructor);
  });

  test('testThatValidTermPostAddsToPopulatedList', async () => {
    // create a few valid terms in the database
    for (const instructor of constants.testConst.validInstructor) {
      await Instructor.create(instructor);
    }

    // do the POST test now with more entries in the database
    testInstructor.firstName = 'Jeff';
    await testPost(testInstructor);
  });
});

/**
   * This function tests POST requests on the Term router
   * @param {Object} testTerm - The term to POST
   */
const testPost = async function(testInstructor) {
  const res = await supertest(app).post('/instructor').send(testInstructor).expect(201); // expect 201: created
  // find the newly added term in the database
  // for this to work correctly, the router must set a parameter named 'id' using res.set()
  const foundInstructor = await Instructor.findOne({where: {id: parseInt(res.get('instructorID'))}});
  // if the term does not exist, it will not be truthy; it will be null
  expect(foundInstructor).toBeTruthy();
};

/**
 * This function tests DELETE requests on the Term router
 * @param testInstructor
 */
const testDelete = async function(testInstructor) {
  // create a new term to delete
  // testTerm does not have an ID, so use newTerm instead
  const newInstructor = (await Instructor.create(testInstructor)).dataValues; // data values is what actually contains the fields
  // store initial number of terms to compare against later
  const oldNumInstructors = (await Instructor.findAll()).length;
  // delete the term
  await supertest(app).delete('/instructor').send(newInstructor).expect(200); // expect 200: OK

  // If the term was deleted successfully, the number of terms in the database should
  // be one less than the count after the 'create' statement
  const newNumInstructor = (await Instructor.findAll()).length;
  expect(newNumInstructor).toBe(oldNumInstructors - 1);
};
