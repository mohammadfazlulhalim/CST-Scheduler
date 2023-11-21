const Course = require('../../private/javascript/Course');
const Term = require('../../private/javascript/Term');
const Instructor = require('../../private/javascript/Instructor');
const Program = require('../../private/javascript/Program');
const CourseOffering = require('../../private/javascript/CourseOffering');
const testConst = require('../../constants').testConst;

// tests for the 'group' field
describe('group', () => {
  let testCourse;
  let testTerm;
  let testInstructor;
  let testProgram;
  let testCourseOffering;
  beforeAll(async function() {
    await Course.sync({force: true});
    await Term.sync({force: true});
    await Instructor.sync({force: true});
    await Program.sync({force: true});
    await CourseOffering.sync({force: true});
  })
  // set up a valid user
  beforeEach(async function() {
    // drop the table and re-create it
    testCourse = testConst.course1;
    testTerm = testConst.term1;
    testInstructor = testConst.instructor1;
    testProgram = testConst.program1;
    testCourseOffering = testConst.courseOffering1;
  });

  test('testThatGroupWithOneLetterIsValid', async function() {
    const groupLetter = 'A';
    testCourseOffering.group = groupLetter;
    const courseOffering = await CourseOffering.create(testCourseOffering);

    expect(courseOffering).toBeTruthy();
    expect(courseOffering.group).toBe(groupLetter);

    // if valid, validate() returns the object it was validating
    // if invalid, it returns errors
    expect(await courseOffering.validate()).toBe(courseOffering);
  });

  test('testThatGroupWithOneNumberIsValid', async function() {
    const groupNumber = 1;
    testCourseOffering.group = groupNumber;
    const courseOffering = await CourseOffering.create(testCourseOffering);

    expect(courseOffering).toBeTruthy();
    expect(courseOffering.group).toBe(groupNumber);

    // if valid, validate() returns the object it was validating
    // if invalid, it returns errors
    expect(await courseOffering.validate()).toBe(courseOffering);
  });

  test('testThatNullGroupIsValid', async function() {
    const groupNumber =
    testCourseOffering.group = null;
    const courseOffering = await CourseOffering.create(testCourseOffering);

    expect(courseOffering).toBeTruthy();
    expect(courseOffering.group).toBe(groupNumber);

    // if valid, validate() returns the object it was validating
    // if invalid, it returns errors
    expect(await courseOffering.validate()).toBe(courseOffering);
  });

  test('testThatLowercaseLetterGroupIsInvalid', async function() {
    testCourseOffering.group = 'a';
    try {
      await CourseOffering.create(testCourseOffering);
      fail(); // throws an error to force the expects to run that are only inside the catch
    } catch (err) {
      expect(err.message).toBe('Validation error: Course Offering group can only contain uppercase letters');
      expect(err.errors.length).toBe(1);
    }
  });

  test('testThatGroupWithMultipleCharactersIsInvalid', async function() {
    testCourseOffering.group = 'A1';
    try {
      await CourseOffering.create(testCourseOffering);
      fail();
    } catch (err) {
      expect(err.message).toBe('Validation error: Course offering group can only be 0 or 1 character long');
      expect(err.errors.length).toBe(1);
    }
  });

  test('testThatGroupWithSpecialCharactersIsInvalid', async function() {
    testCourseOffering.group = '!';
    try {
      await CourseOffering.create(testCourseOffering);
      fail();
    } catch (err) {
      expect(err.message).toBe('Validation error: Course Offering group can only contain letters and numbers');
      expect(err.errors.length).toBe(1);
    }
  });
});


// This may be more appropriate for functional testing
// tests for the findAll() method
describe('findAll()', () => {
  beforeEach(async function() {
    // clear the table
    await CourseOffering.sync({force: true});
  });

  test('testFindAllReturnsCorrectNumberOfItems', async function() {
    const expectedLength = 15;
    // create a bunch of course offerings in the db
    await createCourseOfferings(expectedLength);

    // retrieve the offerings from the db
    const courseOfferings = CourseOffering.findAll();

    expect((await courseOfferings).length).toBe(expectedLength);
  });

  test('testFindAllReturnsEmptyArrayWhenThereAreNoItems', async function() {
    expect((await CourseOffering.findAll()).length).toBe(0);
  });
});

/**
 * Creates a bunch of course offerings to use for testing.
 *
 * @param {number} amount - The amount of offerings to create
 */
async function createCourseOfferings(amount) {
  // list of viable groups
  const viableGroups = 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z 1 2 3 4 5 6 7 8 9 0'.split(' ');
  let testCourseOffering = testConst.courseOffering1;
  // create valid entries
  for (let i = 0; i < amount; i++) {
    // randomize the group number
    const random = Math.floor(Math.random() * viableGroups.length);
    testCourseOffering.group = viableGroups[random];
    await CourseOffering.create(
      testCourseOffering
    );
  }
}
