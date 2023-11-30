// Importing the ORM object
const Instructor = require('../../private/javascript/Instructor');
const supertest = require('supertest');
const app = require('../../app');
const constants = require('../../constants');

// This set of tests ensures that Instructor objects are handled within the database properly
describe('Instructors in database', () => {
  let testInstructor;

  // Create a valid instructor to use as a base
  beforeEach(async () => {
    // Drop the table and re-create it
    await Instructor.sync({force: true});
    testInstructor = {...constants.fixtureConst[0]};
  });

  test('testThatValidInstructorPostAddsToEmptyList', async () => {
    // Do the POST test starting with an empty database
    await testPost(testInstructor);
  });

  test('testThatValidInstructorPostAddsToPopulatedList', async () => {
    // Create a few valid instructors in the database
    for (const instructor of constants.fixtureConst) {
      await Instructor.create(instructor);
    }

    // Do the POST test now with more entries in the database
    testInstructor.firstName = 'John';
    await testPost(testInstructor);
  });

  test('testThatInvalidInstructorPostDoesNotSaveToList', async () => {
    // Store the initial number of instructors to compare against later
    const oldNumInstructors = (await Instructor.findAll()).length;
    // Change instructor ID so that the instructor object is invalid
    testInstructor.instructorID = 2;
    // Attempt to create the instructor in the database
    await supertest(app).post('/instructor').send(testInstructor).expect(422); // Expect 422: unprocessable entity
    // Since no instructor should have been added to the database, the number of instructors should remain the same
    const newNumInstructors = (await Instructor.findAll()).length;
    expect(newNumInstructors).toBe(oldNumInstructors);
  });

  test('testThatValidInstructorDeleteRemovesFromEmptyList', async () => {
    // Do the DELETE test without any Instructors in the database
    await testDelete(testInstructor);
  });

  test('testThatValidInstructorDeleteRemovesFromPopulatedList', async () => {
    // Create a few valid instructors in the database
    for (const instructor of constants.fixtureConst) {
      await Instructor.create(instructor);
    }
    // Do the DELETE test now that there are some Instructors in the database
    await testDelete(testInstructor);
  });

  test('testThatNonExistentInstructorCannotBeDeleted', async () => {
    const oldNumInstructors = (await Instructor.findAll()).length;
    testInstructor.id = 2;
    // Try to delete a non-existent instructor
    await supertest(app).delete('/instructor').send(testInstructor).expect(404); // Expect 404: not found
    const newNumInstructors = (await Instructor.findAll()).length;
    expect(newNumInstructors).toBe(oldNumInstructors);
  });

  test('testThatValidInstructorPutUpdatesList', async () => {
    // Create a new instructor to update
    const instructorToUpdate = (await Instructor.create(testInstructor)).dataValues;
    // Store the initial number of instructors to compare against later
    const oldNumInstructors = (await Instructor.findAll()).length;
    // Update the newly added instructor
    await supertest(app).put('/instructor').send({
      instructorID: instructorToUpdate.id,
      firstName: 'Updated',
      lastName: 'Instructor',
    }).expect(200); // Expect 200: OK
    // Ensure it didn't add a new instructor
    const newNumInstructors = (await Instructor.findAll()).length;
    expect(newNumInstructors).toBe(oldNumInstructors);
    // Expect that the first name was actually changed
    const updatedInstructor = await Instructor.findByPk(instructorToUpdate.id);
    expect(updatedInstructor.firstName).toBe('Updated');
  });

  test('testThatInvalidInstructorPutDoesNotUpdateList', async () => {
    // Create a new instructor to update
    const instructorToUpdate = (await Instructor.create(testInstructor)).dataValues;
    // Store the initial number of instructors to compare against later
    const oldNumInstructors = (await Instructor.findAll()).length;
    // Try to update the newly added instructor with an invalid instructor ID
    await supertest(app).put('/instructor').send({
      firstName: 'Updated',
      lastName: 'Instructor',
      instructorID: 2, // Invalid instructor ID
    }).expect(422); // Expect 422: unprocessable entity
    // Ensure it didn't add a new instructor
    const newNumInstructors = (await Instructor.findAll()).length;
    expect(newNumInstructors).toBe(oldNumInstructors);
    // Expect the first name to not have changed
    const unchangedInstructor = await Instructor.findByPk(instructorToUpdate.id);
    expect(unchangedInstructor.firstName).toBe(testInstructor.firstName);
  });

  test('testThatNonExistentInstructorCannotBeUpdated', async () => {
    // Create a new instructor to update
    const instructorToUpdate = (await Instructor.create(testInstructor)).dataValues;
    // Store the initial number of instructors to compare against later
    const oldNumInstructors = (await Instructor.findAll()).length;
    // Try to update a non-existent instructor
    await supertest(app).put('/instructor').send({
      id: instructorToUpdate.id + 1, // Non-existent ID
      firstName: 'Updated',
      lastName: 'Instructor',
    }).expect(404); // Expect 404: not found
    // Ensure it didn't add a new instructor
    const newNumInstructors = (await Instructor.findAll()).length;
    expect(newNumInstructors).toBe(oldNumInstructors);
  });
});

/**
 * This function tests POST requests on the Instructor router
 * @param {Object} testInstructor - The instructor to POST
 */
const testPost = async function(testInstructor) {
  const res = await supertest(app).post('/instructor').send(testInstructor).expect(201); // Expect 201: created

  // Find the newly added instructor in the database
  // For this to work correctly, the router must set a parameter named 'id' using res.set()
  const foundInstructor = await Instructor.findOne({where: {id: parseInt(res.get('id'))}});
  // If the instructor does not exist, it will not be truthy; it will be null
  expect(foundInstructor).toBeTruthy();
};

/**
 * This function tests DELETE requests on the Instructor router
 * @param {Object} testInstructor - The instructor to DELETE
 */
const testDelete = async function(testInstructor) {
  // Create a new instructor to delete
  // testInstructor does not have an ID, so use newInstructor instead
  const newInstructor = (await Instructor.create(testInstructor)).dataValues; // Data values is what actually contains the fields
  // Store the initial number of instructors to compare against later
  const oldNumInstructors = (await Instructor.findAll()).length;
  // Delete the instructor
  await supertest(app).delete('/instructor').send(newInstructor).expect(200); // Expect 200: OK

  // If the instructor was deleted successfully, the number of instructors in the database should
  // be one less than the count after the 'create' statement
  const newNumInstructors = (await Instructor.findAll()).length;
  expect(newNumInstructors).toBe(oldNumInstructors - 1);
};
