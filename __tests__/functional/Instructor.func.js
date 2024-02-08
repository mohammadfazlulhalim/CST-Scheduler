const Instructor = require('../../private/javascript/Instructor');
const supertest = require('supertest');
const app = require('../../app');
const validInstructor = require('../../fixtures/Instructor.fix').validInstructor
const instructor1 = require('../../fixtures/Instructor.fix').instructor1

describe('Instructors in database', () => {
  let testInstructor;

  // create a valid instructor to use as a base
  beforeEach(async () => {
    // drop the table and re-create it
    await Instructor.sync({force: true});
    testInstructor = {...instructor1};

  });

  test('testThatValidInstructorPostAddsToEmptyList', async () => {
    // do the POST test starting with an empty database
    await testPost(testInstructor);
  });

  test('testThatValidInstructorPostAddsToPopulatedList', async () => {
    // create a few valid Instructors in the database
    for (const instructor of validInstructor) {
      await Instructor.create(instructor);
    }

    // do the POST test now with more entries in the database
    testInstructor.firstName = 'Bryce';
    await testPost(testInstructor);
  });

  test('testThatInvalidInstructorPostDoesNotSaveToList', async () => {
    // store initial number of instructors to compare against later
    const oldNumInstructors = (await Instructor.findAll()).length;

    const invalidInstructor = {
      id: 'InvalidID',
      firstName: 'fcdsa',
      lastName: 'TooLonracterLimit',
    };

    await supertest(app).post('/instructor').send(invalidInstructor).expect(422); // expect 422: unprocessable entity
    // since no instructor should have been added to the database, the number of instructors should remain the same
    const newNumInstructors = (await Instructor.findAll()).length;
    expect(newNumInstructors).toBe(oldNumInstructors);
  });

  test('testThatValidInstructorDeleteRemovesFromEmptyList', async () => {
    // do the DELETE test without any Terms in the database
    await testDelete(testInstructor);
  });

  test('testThatValidInstructorDeleteRemovesFromPopulatedList', async () => {
    // create a few valid instructors in the database
    for (const instructor of validInstructor) {
      await Instructor.create(instructor);
    }
    // do the DELETE test now that there are some Instructors in the database
    await testDelete(testInstructor);
  });


  test('testThatNonExistentInstructorCannotBeDeleted', async () => {
    const oldNumInstructors = (await Instructor.findAll()).length;
    testInstructor.instructorid = 2;
    // try to delete a non-existent instructor
    await supertest(app).delete('/instructor').send(testInstructor).expect(404); // expect 404: not found
    const newNumInstructors = (await Instructor.findAll()).length;
    expect(newNumInstructors).toBe(oldNumInstructors);
  });

  test('testThatValidInstructorPutUpdatesList', async () => {
    // create a new instructor to update
    const instructorToUpdate = (await Instructor.create(testInstructor)).dataValues;

    // store initial number of instructors to compare against later
    const oldNumInstructors = (await Instructor.findAll()).length;
    // update the newly added instructor
    await supertest(app).put('/instructor').send({
      id: instructorToUpdate.id,
      firstName: instructorToUpdate.firstName,
      lastName: 'NewLastName',
    }).expect(200); // expect 200: OK
    // ensure it didn't add a new instructor
    const newNumInstructors = (await Instructor.findAll()).length;

    expect(newNumInstructors).toBe(oldNumInstructors);
    // expect that the end date was actually changed
    const newInstructor = await Instructor.findByPk(instructorToUpdate.id);
    expect(newInstructor.lastName).toBe('NewLastName');
  });

  test('testThatInvalidInstructorPutDoesNotUpdateList', async () => {
    // create a new instructor to update
    const instructorToUpdate = (await Instructor.create(testInstructor)).dataValues;
    // store initial number of instructors to compare against later
    const oldNumInstructors = (await Instructor.findAll()).length;
    // try to update the newly added instructor
    await supertest(app).put('/instructor').send({
      id: instructorToUpdate.id,
      firstName: instructorToUpdate.firstName,
      lastName: '',
    }).expect(422); // expect 422: unprocessable entity
    // ensure it didn't add a new instructor
    const newNumInstructors = (await Instructor.findAll()).length;
    expect(newNumInstructors).toBe(oldNumInstructors);
    // expect the end date to not have changed
    const firstName = (await Instructor.findByPk(instructorToUpdate.id)).dataValues.firstName;
    expect(firstName).toBe(testInstructor.firstName);
  });

  test('testThatNonExistentInstructorCannotBeUpdated', async () => {
    // create a new instructor to update
    const instructorToUpdate = (await Instructor.create(testInstructor)).dataValues;
    // store initial number of instructors to compare against later
    const oldNumInstructors = (await Instructor.findAll()).length;
    // try to update the newly added instructor
    await supertest(app).put('/instructor').send({
      id: instructorToUpdate.id +1,
      firstName: instructorToUpdate.firstName,
      lastName: 'NewLastName',
    }).expect(404); // expect 404: not found
    // ensure it didn't add a new instructor
    const newNumInstructors = (await Instructor.findAll()).length;
    expect(newNumInstructors).toBe(oldNumInstructors);
  });
});

/**
 * This function tests POST requests on the Instructor router
 * @param {Object} testInstructor - The instructor to POST
 */
const testPost = async function(testInstructor) {
  const res = await supertest(app).post('/instructor').send(testInstructor).expect(201); // expect 201: created

  // find the newly added instructor in the database
  // for this to work correctly, the router must set a parameter named 'id' using res.set()
  const foundInstructor = await Instructor.findOne({where: {id: parseInt(res.get('id'))}});
  // if the instructor does not exist, it will not be truthy; it will be null
  expect(foundInstructor).toBeTruthy();
};

/**
 * This function tests DELETE requests on the Instructor router
 * @param testInstructor
 */
const testDelete = async function(testInstructor) {
  // create a new instructor to delete
  // testInstructor does not have an ID, so use newInstructor instead
  const newInstructor = (await Instructor.create(testInstructor)).dataValues; // data values is what actually contains the fields

  // store initial number of instructors to compare against later
  const oldNumInstructors = (await Instructor.findAll()).length;

  // delete the instructor
  await supertest(app).delete('/instructor').send(newInstructor).expect(200); // expect 200: OK

  // If the instructor was deleted successfully, the number of instructors in the database should
  // be one less than the count after the 'create' statement
  const newNumInstructor = (await Instructor.findAll()).length;


  expect(newNumInstructor).toBe(oldNumInstructors - 1);
};
