const Instructor = require('../../../private/javascript/Instructor');
Instructor.sequelize.storage = ':memory:';


/**
 * These are tests for the firstName attribute of Instructor
 */
describe('firstName', () => {

  beforeEach()
  test('testThatValidFirstNameCanBeEntered', async function() {
    const instructorFName = 'Sally'; // define first name
    const instructorLName = 'Sutherland'; // define last name
    let err = '';
    let instructor;

    try {
      instructor = await Instructor.create({ // create db object
        firstName: instructorFName,
        lastName: instructorLName,
      });
    } catch (error) {
      // If a validation error is thrown, fail the test with an error message
      err = error.message;
    }

    expect(instructor).toBeTruthy(); // check that instructor Object is created
    expect(instructor.firstName).toBe(instructorFName); // check that instructor Object First name is correct
    expect(err).toBe(''); // check that no errors are thrown

    if (instructor) { // destroy instructor if created
      await instructor.destroy();
    }
  });

  test('testThatFirstNameCanNotBeEmpty', async function() {
    const instructorFName = ''; // define first name
    const instructorLName = 'Sutherland'; // define last name
    let err = '';
    let instructor;

    try {
      instructor = await Instructor.create({ // create db object
        firstName: instructorFName,
        lastName: instructorLName,
      });
    } catch (error) {
      // If validation error is thrown, get error message
      err = error.message;
    }

    expect(instructor).toBeFalsy; // check that instructor Object is not created
    // check that no errors are thrown
    expect(err).toBe('Validation error: Exception "First Name cannot be empty"');

    if (instructor) { // destroy instructor if created
      await instructor.destroy();
    }
  });

  test('testThatFirstNameCanBeOneLetter', async function() {
    const instructorFName = 'I'; // define first name
    const instructorLName = 'Sutherland'; // define last name
    let err = '';
    let instructor;

    try {
      instructor = await Instructor.create({ // create db object
        firstName: instructorFName,
        lastName: instructorLName,
      });
    } catch (error) {
      // If a validation error is thrown, fail the test with an error message
      err = error.message;
    }

    expect(instructor).toBeTruthy(); // check that instructor Object is created
    expect(instructor.firstName).toBe(instructorFName); // check that instructor Object First name is correct
    expect(err).toBe(''); // check that no errors are thrown

    if (instructor) { // destroy instructor if created
      await instructor.destroy();
    }
  });

  test('testThatFirstNameCanBe50Chars', async function() {
    const instructorFName = 'a'.repeat(50); // define first name (50 chars)
    const instructorLName = 'Sutherland'; // define last name
    let err = '';
    let instructor;

    try {
      instructor = await Instructor.create({ // create db object
        firstName: instructorFName,
        lastName: instructorLName,
      });
    } catch (error) {
      // If a validation error is thrown, fail the test with an error message
      err = error.message;
    }

    expect(instructor).toBeTruthy(); // check that instructor Object is created
    expect(instructor.firstName).toBe(instructorFName); // check that instructor Object First name is correct
    expect(err).toBe(''); // check that no errors are thrown

    if (instructor) { // destroy instructor if created
      await instructor.destroy();
    }
  });

  test('testThatFirstNameCanNotBe51Chars', async function() {
    const instructorFName = 'a'.repeat(51); // define first name (51 Chars)
    const instructorLName = 'Sutherland'; // define last name
    let err = '';
    let instructor;

    try {
      instructor = await Instructor.create({ // create db object
        firstName: instructorFName,
        lastName: instructorLName,
      });
    } catch (error) {
      // If a validation error is thrown, fail the test with an error message
      err = error.message;
    }

    expect(instructor).toBeFalsy; // check that instructor Object is not created
    // check that no errors are thrown
    expect(err).toBe('Validation error: Exception "First Name cannot be more than 50 characters"');

    if (instructor) { // destroy instructor if created
      await instructor.destroy();
    }
  });
});


