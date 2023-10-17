const CourseOffering = require('../../private/javascript/CourseOffering');

// point Sequelize to use an in-memory DB - use environment variable instead of this in the future
CourseOffering.sequelize = require('../../dataSource').sequelizeTesting;

// tests for the 'group' field
describe('group', () => {
  let testUser;
  // set up a valid user
  beforeEach(async function() {
    // drop the table and re-create it
    await CourseOffering.sync({force: true});
    testUser = {
      courseCode: 'COSA 280',
      termNumber: 4,
      group: 'A',
    };
  });

  test('testThatGroupWithOneLetterIsValid', async function() {
    const groupLetter = 'A';
    testUser.group = groupLetter;
    const courseOffering = await CourseOffering.create(testUser);

    expect(courseOffering).toBeTruthy();
    expect(courseOffering.group).toBe(groupLetter);

    // if valid, validate() returns the object it was validating
    // if invalid, it returns errors
    expect(await courseOffering.validate()).toBe(courseOffering);
  });

  test('testThatGroupWithOneNumberIsValid', async function() {
    const groupNumber = 1;
    testUser.group = groupNumber;
    const courseOffering = await CourseOffering.create(testUser);

    expect(courseOffering).toBeTruthy();
    expect(courseOffering.group).toBe(groupNumber);

    // if valid, validate() returns the object it was validating
    // if invalid, it returns errors
    expect(await courseOffering.validate()).toBe(courseOffering);
  });

  test('testThatNullGroupIsValid', async function() {
    const groupNumber =
    testUser.group = null;
    const courseOffering = await CourseOffering.create(testUser);

    expect(courseOffering).toBeTruthy();
    expect(courseOffering.group).toBe(groupNumber);

    // if valid, validate() returns the object it was validating
    // if invalid, it returns errors
    expect(await courseOffering.validate()).toBe(courseOffering);
  });

  test('testThatLowercaseLetterGroupIsInvalid', async function() {
    testUser.group = 'a';
    try {
      await CourseOffering.create(testUser);
    } catch (err) {
      expect(err.errors.length).toBe(1);
      expect(err.errors[0].message).toBe('Course Offering group can only contain uppercase letters');
    }
  });

  test('testThatGroupWithMultipleCharactersIsInvalid', async function() {
    testUser.group = 'A1';
    try {
      await CourseOffering.create(testUser);
    } catch (err) {
      expect(err.errors.length).toBe(1);
      expect(err.errors[0].message).toBe('Course offering group can only be 0 or 1 character long');
    }
  });

  test('testThatGroupWithSpecialCharactersIsInvalid', async function() {
    testUser.group = '!';
    try {
      await CourseOffering.create(testUser);
    } catch (err) {
      expect(err.errors.length).toBe(1);
      expect(err.errors[0].message).toBe('Course Offering group can only contain letters and numbers');
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

  // create valid entries
  for (let i = 0; i < amount; i++) {
    // randomize the group number
    const random = Math.floor(Math.random() * viableGroups.length);
    await CourseOffering.create({
      courseCode: 'COSA 280',
      termNumber: 4,
      group: viableGroups[random],
    });
  }
}
