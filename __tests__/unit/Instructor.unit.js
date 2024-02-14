const Instructor = require('../../private/javascript/Instructor');
const validInstructor = require('../../fixtures/Instructor.fix').validInstructor
const instructor1 = require('../../fixtures/Instructor.fix').instructor1
/**
 * These are tests for the firstName attribute of Instructor
 */
describe('firstName', () => {
  let instructor;
  let testInstructor;
  let err = '';
  beforeAll(async function() {
    await Instructor.sync({force: true}); // wipes instructor table if it exists
    testInstructor = instructor1;
  });

  beforeEach(async function() {
    testInstructor.firstName = 'Sally';
    instructor = '';
    err = '';
  });

  afterEach(async function() {
    await Instructor.truncate();
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
    let err; let errCount; let instructor;

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
    let err; let errCount; let instructor;

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

/**
 * These are tests for the lastName attribute of Instructor
 */
describe('lastName', () => {
  let instructor;
  let testInstructor;
  let err = '';
  beforeAll(async function() {
    await Instructor.sync({force: true}); // wipes instructor table if it exists
    testInstructor = {...validInstructor[0]};
  });

  beforeEach(async function() {
    testInstructor.lastName = 'Johnson';
    instructor = '';
    err = '';
  });

  test('testThatValidLastNameCanBeEntered', async function() {
    try {
      instructor = await Instructor.create(testInstructor);
    } catch (error) {
      // If a validation error is thrown, fail the test with an error message
      err = error.message;
    }

    expect(instructor).toBeTruthy(); // check that instructor Object is created
    expect(instructor.lastName).toBe(testInstructor.lastName); // check that instructor Object Last name is correct
    expect(err).toBe(''); // check that no errors are thrown

    if (instructor) { // destroy instructor if created
      await instructor.destroy();
    }
  });

  test('testThatLastNameCanNotBeEmpty', async function() {
    testInstructor.lastName = '';
    let err; let errCount; let instructor;

    try {
      instructor = await Instructor.create(testInstructor);
    } catch (error) {
      // If validation error is thrown, get error message
      err = error.message;
      errCount = error.errors.length;
    }

    expect(instructor).toBeFalsy; // check that instructor Object is not created
    // check that no errors are thrown
    expect(err).toBe('Validation error: Exception "Last Name cannot be empty"');
    expect(errCount).toBe(1);

    if (instructor) { // destroy instructor if created
      await instructor.destroy();
    }
  });

  test('testThatLastNameCanBeOneLetter', async function() {
    testInstructor.lastName = 'J';

    try {
      instructor = await Instructor.create(testInstructor);
    } catch (error) {
      // If a validation error is thrown, fail the test with an error message
      err = error.message;
    }

    expect(instructor).toBeTruthy(); // check that instructor Object is created
    expect(instructor.lastName).toBe(testInstructor.lastName); // check that instructor Object Last name is correct
    expect(err).toBe(''); // check that no errors are thrown

    if (instructor) { // destroy instructor if created
      await instructor.destroy();
    }
  });

  test('testThatLastNameCanBe50Chars', async function() {
    testInstructor.lastName = 'a'.repeat(50); // define last name (50 chars)

    try {
      instructor = await Instructor.create(testInstructor);
    } catch (error) {
      // If a validation error is thrown, fail the test with an error message
      err = error.message;
    }

    expect(instructor).toBeTruthy(); // check that instructor Object is created
    expect(instructor.lastName).toBe(testInstructor.lastName); // check that instructor Object Last name is correct
    expect(err).toBe(''); // check that no errors are thrown

    if (instructor) { // destroy instructor if created
      await instructor.destroy();
    }
  });

  test('testThatLastNameCanNotBe51Chars', async function() {
    testInstructor.lastName = 'a'.repeat(51); // define last name (51 Chars)
    let err; let errCount; let instructor;

    try {
      instructor = await Instructor.create(testInstructor);
    } catch (error) {
      // If a validation error is thrown, fail the test with an error message
      err = error.message;
      errCount = error.errors.length;
    }

    expect(instructor).toBeFalsy; // check that instructor Object is not created
    // check that no errors are thrown
    expect(err).toBe('Validation error: Exception "Last Name cannot be more than 50 characters"');
    expect(errCount).toBe(1);

    if (instructor) { // destroy instructor if created
      await instructor.destroy();
    }
  });
});


/**
 * These are tests for the officeNum attribute of Instructor
 */
describe('officeNum', () => {
  let instructor;
  let testInstructor;
  let err = '';
  beforeAll(async function() {
    await Instructor.sync({force: true}); // wipes instructor table if it exists
    testInstructor = instructor1;
  });

  beforeEach(async function() {
    testInstructor.officeNum = '123A.1';
    testInstructor.firstName = 'sALLY';
    instructor = '';
    err = '';
  });

  test('testCreatingInstructorWithValidOfficeNumber ', async function() {
    try {
      instructor = await Instructor.create(testInstructor);
    } catch (error) {
      // If a validation error is thrown, fail the test with an error message
      err = error.message;
    }
    expect(instructor).toBeTruthy(); // check that instructor Object is created
    expect(instructor.officeNum).toBe(testInstructor.officeNum); // check that instructor Object office number is correct
    expect(err).toBe(''); // check that no errors are thrown

    if (instructor) { // destroy instructor if created
      await instructor.destroy();
    }

  });

  test('testCreatingInstructorWithEmptyOfficeNumber', async function() {
    testInstructor.officeNum = '';
    testInstructor.firstName = 'sALLY';
    let err; let errCount; let instructor;

    try {
      instructor = await Instructor.create(testInstructor);
    } catch (error) {
      // If validation error is thrown, get error message
      err = error.message;
      errCount = error.errors.length;
    }

    expect(instructor).toBeFalsy; // check that instructor Object is not created
    // check that no errors are thrown
    expect(err).toBe('Validation error: Exception "Office number cannot be empty"');
    expect(errCount).toBe(1);

    if (instructor) { // destroy instructor if created
      await instructor.destroy();
    }
  });

  test('testCreatingInstructorWithOfficeNumberHaving10DigitsOnIt ', async function() {
    testInstructor.officeNum = '1234567890';

    try {
      instructor = await Instructor.create(testInstructor);
    } catch (error) {
      // If a validation error is thrown, fail the test with an error message
      err = error.message;
    }

    expect(instructor).toBeTruthy(); // check that instructor Object is created
    expect(instructor.officeNum).toBe(testInstructor.officeNum); // check that instructor Object office Number is correct
    expect(err).toBe(''); // check that no errors are thrown

    if (instructor) { // destroy instructor if created
      await instructor.destroy();
    }
  });


  test('testUpdatingInstructorWithOfficeNumberHaving11DigitsOnIT ', async function() {
    testInstructor.officeNum = '1'.repeat(11); // define office number (7 Chars)
    let err; let errCount; let instructor;

    try {
      instructor = await Instructor.create(testInstructor);
    } catch (error) {
      // If a validation error is thrown, fail the test with an error message
      err = error.message;
      errCount = error.errors.length;
    }

    expect(instructor).toBeFalsy; // check that instructor Object is not created
    // check that no errors are thrown
    expect(err).toBe('Validation error: Exception "Office number cannot exceed 10 digits"');
    expect(errCount).toBe(1);

    if (instructor) { // destroy instructor if created
      await instructor.destroy();
    }
  });
});


/**
 * These are tests for the phoneNum attribute of Instructor
 */
describe('phoneNum', () => {
  let instructor;
  let testInstructor;
  let err = '';
  beforeAll(async function() {
    await Instructor.sync({force: true}); // wipes instructor table if it exists
    testInstructor = instructor1;
  });

  beforeEach(async function() {
    testInstructor.phoneNum = '(123)-111-1122';
    testInstructor.officeNum= '123.4A';
    instructor = '';
    err = '';
  });

  test('testCreatingInstructorWithValidPhoneNumber ', async function() {
    try {
      instructor = await Instructor.create(testInstructor);
    } catch (error) {
      // If a validation error is thrown, fail the test with an error message
      err = error.message;
    }

    expect(instructor).toBeTruthy(); // check that instructor Object is created
    expect(instructor.phoneNum).toBe(testInstructor.phoneNum); // check that instructor Object phone number is correct
    expect(err).toBe(''); // check that no errors are thrown
    if (instructor) { // destroy instructor if created
      await instructor.destroy();
    }
  });

  test('testCreatingInstructorWithValidPhoneNumberWithoutBracesAndDash', async function() {
    testInstructor.phoneNum = '1231111122';
    let instructor;
    try {
      instructor = await Instructor.create(testInstructor);
    } catch (error) {
      // If a validation error is thrown, fail the test with an error message
      err = error.message;
    }

    expect(instructor).toBeTruthy(); // check that instructor Object is created
    expect(instructor.phoneNum).toBe(testInstructor.phoneNum); // check that instructor Object phone number is correct
    expect(err).toBe(''); // check that no errors are thrown
    if (instructor) { // destroy instructor if created
      await instructor.destroy();
    }
  });

  test('testCreatingInstructorWithEmptyPhoneNumber ', async function() {
    testInstructor.phoneNum = '';
    testInstructor.officeNum= '123.4A';
    let errCount; let instructor; let errorArray;

    try {
      instructor = await Instructor.create(testInstructor);
    } catch (error) {
      // If validation error is thrown, get error message
      errCount = error.errors.length;
      errorArray=error.errors;
    }

    expect(instructor).toBeFalsy; // check that instructor Object is not created
    // check that no errors are thrown
    expect(errorArray[0].message).toBe('Exception \"Phone number cannot be empty\"');
    expect(errCount).toBe(3);

    if (instructor) { // destroy instructor if created
      await instructor.destroy();
    }
  });


  test('testCreatingInstructorWithPhoneNumberHaveInvalidCharacter ', async function() {
    testInstructor.phoneNum = '(123)%111-1122'; // define phone number with invalid chars
    let errorArray; let errCount; let instructor;

    try {
      instructor = await Instructor.create(testInstructor);
    } catch (error) {
      // If a validation error is thrown, fail the test with an error message
      errorArray = error.errors;
      errCount = error.errors.length;
    }

    expect(instructor).toBeFalsy; // check that instructor Object is not created
    // check that no errors are thrown
    expect(errorArray[0].message).toBe('Validation is on phoneNum failed');
    expect(errCount).toBe(1);

    if (instructor) { // destroy instructor if created
      await instructor.destroy();
    }
  });

  test('testCreatingInstructorWithPhoneNumberHaveMoreThan10Digits  ', async function() {
    testInstructor.phoneNum = '(123)-456-23222';
    testInstructor.officeNum= '1234.1A';
    let errArray; let errCount;

    try {
      instructor = await Instructor.create(testInstructor);
    } catch (error) {
      // If a validation error is thrown, fail the test with an error message
      errCount= error.errors.length;
      errArray=error.errors;
    }

    expect(instructor).toBeFalsy(); // check that instructor Object is not created
    expect(errArray[0].message).toBe('Exception \"Phone number can have 10 numeric digits, and/or (), - sign only\"');
    expect(errCount).toBe(2);

    if (instructor) { // destroy instructor if created
      await instructor.destroy();
    }
  });
});


/**
 * These are tests for the Email address attribute of Instructor
 */
describe('email', () => {
  let instructor;
  let testInstructor;
  let err = '';
  beforeAll(async function() {
    await Instructor.sync({force: true}); // wipes instructor table if it exists
    testInstructor = instructor1;
  });

  beforeEach(async function() {
    testInstructor.email = 'doe@saskpolytech.ca';
    testInstructor.officeNum='1234.1A';
    testInstructor.phoneNum='1234567890';
    instructor = '';
    err = '';
  });

  test('testCreatingInstructorWithValidEmailAddress', async function() {
    try {
      instructor = await Instructor.create(testInstructor);
    } catch (error) {
      // If a validation error is thrown, fail the test with an error message
      err = error.message;
    }

    expect(instructor).toBeTruthy(); // check that instructor Object is created

    expect(instructor.email).toBe(testInstructor.email); // check that instructor Object phone number is correct
    expect(err).toBe(''); // check that no errors are thrown

    if (instructor) { // destroy instructor if created
      await instructor.destroy();
    }
  });


  test('testCreatingInstructorWithEmptyEmail ', async function() {
    testInstructor.email = '';
    let errArray; let errCount; let instructor;

    try {
      instructor = await Instructor.create(testInstructor);
    } catch (error) {
      // If validation error is thrown, get error message
      errArray = error.errors;
      errCount = error.errors.length;
    }

    expect(instructor).toBeFalsy; // check that instructor Object is not created

    expect(errArray[0].message).toBe('Exception "E-mail address cannot be empty"' );
    expect(errCount).toBe(2);

    if (instructor) { // destroy instructor if created
      await instructor.destroy();
    }
  });

  test('testCreatingInstructorWithEmailMissing@Sign', async function() {
    testInstructor.email = 'doe.saskpolytech.ca';

    try {
      instructor = await Instructor.create(testInstructor);
    } catch (error) {
      // If a validation error is thrown, fail the test with an error message
      err = error.message;
      errCount = error.errors.length;
    }

    expect(instructor).toBeFalsy(); // check that instructor Object is not created

    expect(err).toBe('Validation error: Validation is on email failed');
    expect(errCount).toBe(1);

    if (instructor) { // destroy instructor if created
      await instructor.destroy();
    }
  });

  test('testCreatingInstructorWithEmailMissingTopLevelDomain ', async function() {
    testInstructor.email = 'doe.saskpolytech';
    try {
      instructor = await Instructor.create(testInstructor);
    } catch (error) {
      // If a validation error is thrown, fail the test with an error message
      err = error.message;
      errCount= error.errors.length;
    }

    expect(instructor).toBeFalsy(); // check that instructor Object is created
    expect(err).toBe('Validation error: Validation is on email failed');
    expect(errCount).toBe(1);


    if (instructor) { // destroy instructor if created
      await instructor.destroy();
    }
  });
});
