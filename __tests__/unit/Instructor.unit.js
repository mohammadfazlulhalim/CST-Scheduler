const Instructor = require('../../private/javascript/Instructor');

/**
 * These are tests for the firstName attribute of Instructor
 */
describe('firstName', () => {
  let instructor;
  let testInstructor;
  let err = '';
  beforeAll(async function() {
    await Instructor.sync({force: true}); // wipes instructor table if it exists
    testInstructor = {
      firstName: 'Sally',
      lastName: 'Sutherland',
    };
  });

  beforeEach(async function() {
    testInstructor.firstName = 'Sally';
    instructor = '';
    err = '';
  });

  test('testThatValidFirstNameCanBeEntered', async function() {
    try {
      instructor = await Instructor.create(testInstructor);
    } catch (error) {
      // If a validation error is thrown, fail the test with an error message
      err = error.message;
    }

    expect(instructor).toBeTruthy(); // check that instructor Object is created
    expect(instructor.firstName).toBe(testInstructor.firstName); // check that instructor Object First name is correct
    expect(err).toBe(''); // check that no errors are thrown

    if (instructor) { // destroy instructor if created
      await instructor.destroy();
    }
  });

  test('testThatFirstNameCanNotBeEmpty', async function() {
    testInstructor.firstName = '';
    let err, errCount, instructor;

    try {
      instructor = await Instructor.create(testInstructor);
    } catch (error) {
      // If validation error is thrown, get error message
      err = error.message;
      errCount = error.errors.length;
    }

    expect(instructor).toBeFalsy; // check that instructor Object is not created
    // check that no errors are thrown
    expect(err).toBe('Validation error: Exception "First Name cannot be empty"');
    expect(errCount).toBe(1);

    if (instructor) { // destroy instructor if created
      await instructor.destroy();
    }
  });

  test('testThatFirstNameCanBeOneLetter', async function() {
    testInstructor.firstName = 'I';

    try {
      instructor = await Instructor.create(testInstructor);
    } catch (error) {
      // If a validation error is thrown, fail the test with an error message
      err = error.message;
    }

    expect(instructor).toBeTruthy(); // check that instructor Object is created
    expect(instructor.firstName).toBe(testInstructor.firstName); // check that instructor Object First name is correct
    expect(err).toBe(''); // check that no errors are thrown

    if (instructor) { // destroy instructor if created
      await instructor.destroy();
    }
  });

  test('testThatFirstNameCanBe50Chars', async function() {
    testInstructor.firstName = 'a'.repeat(50); // define first name (50 chars)

    try {
      instructor = await Instructor.create(testInstructor);
    } catch (error) {
      // If a validation error is thrown, fail the test with an error message
      err = error.message;
    }

    expect(instructor).toBeTruthy(); // check that instructor Object is created
    expect(instructor.firstName).toBe(testInstructor.firstName); // check that instructor Object First name is correct
    expect(err).toBe(''); // check that no errors are thrown

    if (instructor) { // destroy instructor if created
      await instructor.destroy();
    }
  });

  test('testThatFirstNameCanNotBe51Chars', async function() {
    testInstructor.firstName = 'a'.repeat(51); // define first name (51 Chars)
    let err, errCount, instructor;

    try {
      instructor = await Instructor.create(testInstructor);
    } catch (error) {
      // If a validation error is thrown, fail the test with an error message
      err = error.message;
      errCount = error.errors.length;
    }

    expect(instructor).toBeFalsy; // check that instructor Object is not created
    // check that no errors are thrown
    expect(err).toBe('Validation error: Exception "First Name cannot be more than 50 characters"');
    expect(errCount).toBe(1);

    if (instructor) { // destroy instructor if created
      await instructor.destroy();
    }
  });
});


