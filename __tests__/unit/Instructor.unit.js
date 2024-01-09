const Instructor = require('../../private/javascript/Instructor');
const testConst = require('../../constants').testConst;
const constants = require('../../constants');
/**
 * These are tests for the firstName attribute of Instructor
 */
describe('firstName', () => {
  let instructor;
  let testInstructor;
  let err = '';
  beforeAll(async function() {
    await Instructor.sync({force: true}); // wipes instructor table if it exists
    testInstructor = testConst.instructor1;
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
    testInstructor = {...constants.testConst.validInstructor[0]};
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
 * These are tests for the offficeNum attribute of Instructor
 */
describe('officeNum', () => {
  let instructor;
  let testInstructor;
  let err = '';
  beforeAll(async function() {
    await Instructor.sync({force: true}); // wipes instructor table if it exists
    testInstructor = testConst.instructor1;
  });

  beforeEach(async function() {
    testInstructor.officeNum = '123A.1';
    instructor = '';
    err = '';
  });

  test('testThatValidOfficeNumCanBeEntered', async function() {
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

  test('testThatOfficeNumCanNotBeEmpty', async function() {
    testInstructor.officeNum = '';
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

  test('testThatOfficeNumCanHave6Chars', async function() {
    testInstructor.officeNum = '123456';

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


  test('testThatofficeNumCannothave7Chars', async function() {
    testInstructor.officeNum = '1'.repeat(7); // define office number (7 Chars)
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
    expect(err).toBe('Validation error: Exception "Office number must be 6 digits"');
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
    testInstructor = testConst.instructor1;
  });

  beforeEach(async function() {
    testInstructor.phoneNum = '123-456';
    instructor = '';
    err = '';
  });

  test('testThatValidPhoneNumCanBeEntered', async function() {
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

  test('testThatPhoneNumCanNotBeEmpty', async function() {
    testInstructor.phoneNum = '';
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
    expect(errCount).toBe(2);

    if (instructor) { // destroy instructor if created
      await instructor.destroy();
    }
  });

  test('testThatPhoneNumCanHaveSpaceChar', async function() {
    testInstructor.phoneNum = '123 456';

    try {
      instructor = await Instructor.create(testInstructor);
    } catch (error) {
      // If a validation error is thrown, fail the test with an error message
      err = error.message;
    }

    expect(instructor).toBeTruthy(); // check that instructor Object is created
    expect(instructor.phoneNum).toBe(testInstructor.phoneNum); // check that instructor Object Phone Number is correct
    expect(err).toBe(''); // check that no errors are thrown

    if (instructor) { // destroy instructor if created
      await instructor.destroy();
    }
  });

  test('testThatPhoneNumCanHave-Char', async function() {
    testInstructor.phoneNum = '123-456';

    try {
      instructor = await Instructor.create(testInstructor);
    } catch (error) {
      // If a validation error is thrown, fail the test with an error message
      err = error.message;
    }

    expect(instructor).toBeTruthy(); // check that instructor Object is created
    expect(instructor.phoneNum).toBe(testInstructor.phoneNum); // check that instructor Object Phone Number is correct
    expect(err).toBe(''); // check that no errors are thrown

    if (instructor) { // destroy instructor if created
      await instructor.destroy();
    }
  });


  test('testThatPhoneNumCanHaveValidChars', async function() {
    testInstructor.phoneNum = '123%456'; // define phone number with invalid chars
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

  test('testThatPhoneNumCannotHaveMoreThan6NumericChars', async function() {
    testInstructor.phoneNum = '123-4567';
    let errArray; let errCount;

    try {
      instructor = await Instructor.create(testInstructor);
    } catch (error) {
      // If a validation error is thrown, fail the test with an error message
      errCount= error.errors.length;
      errArray=error.errors;
    }

    expect(instructor).toBeFalsy(); // check that instructor Object is not created
    expect(errArray[0].message).toBe('Exception \"Phone number must be 6 numeric digits\"');
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
    testInstructor = testConst.instructor1;
  });

  beforeEach(async function() {
    testInstructor.email = 'doe@saskpolytech.ca';
    instructor = '';
    err = '';
  });

  test('testThatValidEmailCanBeEntered', async function() {
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

  // test('testThatOnlyUniqueEmailCanBeEntered', async function() {
  //   testInstructor.email = 'benson@saskpolytech.ca';
  //   let err; let errCount; let instructor;
  //
  //   try {
  //     instructor = await Instructor.create(testInstructor);
  //   } catch (error) {
  //     // If a validation error is thrown, fail the test with an error message
  //     err = error.message;
  //     errCount = error.errors.length;
  //   }
  //
  //   expect(instructor).toBeFalsy(); // check that instructor Object is created
  //   expect(err).toBe('Validation error: Validation is on email failed' );
  //   expect(errCount).toBe(1); // check that no errors are thrown
  //
  //   if (instructor) { // destroy instructor if created
  //     await instructor.destroy();
  //   }
  // });
  test('testThatEmailCanNotBeEmpty', async function() {
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

  test('testThatEmailMustHave@Char', async function() {
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

  test('testThatEmailMustHaveTopLevelDomain', async function() {
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
