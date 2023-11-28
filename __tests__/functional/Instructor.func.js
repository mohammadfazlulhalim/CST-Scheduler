const request = require('supertest');
const Instructor = require('../../private/javascript/Instructor');
const {sequelize, app} = require('../../datasource');

describe('testCUDInstructor', () => {
  beforeAll(async () => {
    await sequelize.sync({force: true});
  });
  afterEach(async () => {
    await sequelize.truncate();
  });
  afterAll(async () => {
    await sequelize.close();
  });

  test('testCreatesValidInstructorWithEmptyDatabase', async () => {
    // Define new instructor details
    const newInstructor = {
      instructorID: 1,
      firstName: 'Ernesto',
      lastName: 'Basoalto',
    };

    // Send POST request to create a new instructor
    const response = await request(app)
        .post('/instructor')
        .send(newInstructor);

    // Check if the response is as expected
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Instructor successfully added');

    // Verify if the instructor was actually added in the database
    const addedInstructor = await Instructor.findOne({
      where: {instructorID: newInstructor.instructorID},
    });
    expect(addedInstructor).not.toBeNull();
    expect(addedInstructor.firstName).toBe(newInstructor.firstName);
  });

  /** Test for creating an instructor with invalid data*/
  test('testCreatesInstructorWithInvalidInformation', async () => {
    // Define invalid instructor details
    const invalidInstructor = {
      instructorID: 1,
      firstName: '',
      lastName: 'Basoalto',
    };

    // Send POST request with invalid instructor data
    const response = await request(app)
        .post('/instructor')
        .send(invalidInstructor);

    // Check for expected error response
    expect(response.statusCode).toBe(400); // Error code for invalid input
    expect(response.body.message).toContain('Error');

    // Verify that the invalid instructor was not created in the database
    const nonExistentInstructor = await Instructor.findOne({
      where: {instructorID: invalidInstructor.instructorID},
    });
    expect(nonExistentInstructor).toBeNull();
  });

  /** Test for deleting an instructor*/
  test('testDeletesInstructor', async () => {
    // Create an instructor to be deleted
    const instructor = await Instructor.create({
      instructorID: 1,
      firstName: 'Ernesto',
      lastName: 'Basoalto',
    });

    // Send DELETE request to remove the created instructor
    const response = await request(app).delete(`/instructor/${instructor.id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Instructor successfully deleted');

    // Verify that the instructor is no longer in the database
    const deletedInstructor = await Instructor.findByPk(instructor.id);
    expect(deletedInstructor).toBeNull();
  });

  /** Test for updating an instructor with invalid information*/
  test('testUpdatesInstructorWithInvalidInformationIsntChangeInstructor', async () => {
    // Create an instructor to be updated
    const instructor = await Instructor.create({
      instructorID: 1,
      firstName: 'Ernesto',
      lastName: 'Basoalto',
    });

    // Attempt to update the instructor with invalid information
    const response = await request(app)
        .put(`/instructor/${instructor.id}`)
        .send({firstName: ''}); // Sending invalid update data

    // Check for expected error response
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toContain('Error');

    // Verify that the instructor remains unchanged due to invalid update attempt
    const unchangedInstructor = await Instructor.findByPk(instructor.id);
    expect(unchangedInstructor.firstName).toBe(instructor.firstName); // Original name should remain
    expect(unchangedInstructor.lastName).toBe(instructor.lastName); // Original last name should remain
  });

  /** Test for updating an instructor with valid information*/
  test('testUpdatesInstructorWithValidInformationChangesInstructor', async () => {
    // Create an instructor for updating
    const instructor = await Instructor.create({
      instructorID: 1,
      firstName: 'Ernesto',
      lastName: 'Basoalto',
    });

    // Define the new information for the instructor
    const updatedInfo = {
      firstName: 'Jeff',
      lastName: 'Ernesto',
    };

    // Send PUT request to update the instructor
    const response = await request(app)
        .put(`/instructor/${instructor.id}`)
        .send(updatedInfo);
    expect(response.statusCode).toBe(200); // Success code for a valid update
    expect(response.body.message).toBe('Instructor successfully edited');

    // Verify that the instructor details have been updated in the database
    const updatedInstructor = await Instructor.findByPk(instructor.id);
    expect(updatedInstructor.firstName).toBe(updatedInfo.firstName); // Check updated first name
    expect(updatedInstructor.lastName).toBe(updatedInfo.lastName); // Check updated last name
  });

  /** Test for deleting a nonexistent instructor*/
  test('testDeletesNonexistentInstructor', async () => {
    // Attempt to delete a nonexistent instructor
    const response = await request(app).delete(`/instructor/999`);
    expect(response.statusCode).toBe(404); // Not found status code
    expect(response.body.message).toContain('No instructor found with the provided ID');
  });

  /** Test for creating a duplicate instructor*/
  test('testTriesToCreateDuplicateInstructor', async () => {
    // Create an instructor to be used for duplication
    const instructor = await Instructor.create({
      instructorID: 1,
      firstName: 'Ernesto',
      lastName: 'Basoalto',
    });

    // Attempt to create a duplicate instructor
    const response = await request(app)
        .post('/instructor')
        .send({instructorID: 1, firstName: 'Ernesto', lastName: 'Basoalto'});

    // Check for expected error response
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toContain('Instructor with the same ID already exists');
  });

  test('testDeletesLastInstructor', async () => {
    // Create the only instructor in the database
    const instructor = await Instructor.create({
      instructorID: 1,
      firstName: 'Ernesto',
      lastName: 'Basoalto',
    });

    // Send DELETE request to remove the created instructor
    const response = await request(app).delete(`/instructor/${instructor.id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Instructor successfully deleted');

    // Verify that the instructor is no longer in the database
    const deletedInstructor = await Instructor.findByPk(instructor.id);
    expect(deletedInstructor).toBeNull();
  });

  /** Test for attempting to delete the last instructor when there are multiple instructors */
  test('testDeletesLastInstructorWithMultipleInstructors', async () => {
    // Create multiple instructors in the database
    const instructorOne = await Instructor.create({
      instructorID: 1,
      firstName: 'Ernesto',
      lastName: 'Basoalto',
    });

    const instructorTwo = await Instructor.create({
      instructorID: 2,
      firstName: 'Jane',
      lastName: 'Smith',
    });

    // Send DELETE request to remove the last created instructor
    const response = await request(app).delete(`/instructor/${instructorTwo.id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Instructor successfully deleted');

    // Verify that the last instructor is no longer in the database
    const deletedInstructor = await Instructor.findByPk(instructorTwo.id);
    expect(deletedInstructor).toBeNull();

    // Additionally, check that the other instructor is still in the database
    const remainingInstructor = await Instructor.findByPk(instructorOne.id);
    expect(remainingInstructor).not.toBeNull();
  });

  /** Test for deleting an instructor when there are multiple instructors */
  test('testDeletesInstructorWithMultipleInstructors', async () => {
    // Create multiple instructors in the database
    const instructorOne = await Instructor.create({
      instructorID: 1,
      firstName: 'Ernesto',
      lastName: 'Basoalto',
    });

    const instructorTwo = await Instructor.create({
      instructorID: 2,
      firstName: 'Ron',
      lastName: 'New',
    });

    // Send DELETE request to remove the first instructor
    const response = await request(app).delete(`/instructor/${instructorOne.id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Instructor successfully deleted');

    // Verify that the first instructor is no longer in the database
    const deletedInstructor = await Instructor.findByPk(instructorOne.id);
    expect(deletedInstructor).toBeNull();

    // Additionally, check that the other instructor is still in the database
    const remainingInstructor = await Instructor.findByPk(instructorTwo.id);
    expect(remainingInstructor).not.toBeNull();
  });
});
