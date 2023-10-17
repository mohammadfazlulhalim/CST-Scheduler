const CourseOffering = require('../../private/javascript/CourseOffering');
const {Sequelize} = require('sequelize');

// point Sequelize to use an in-memory DB
CourseOffering.sequelize = new Sequelize( {
  dialect: 'sqlite',
  storage: ':memory:',
});

// tests for the 'group' field
describe('group', () => {
  let testUser;
  // set up a valid user
  beforeEach(async function() {
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

    // the list of errors should be an empty object
    // expect(courseOffering.validate()).resolves.toBe(undefined);
  });

  test('testThatGroupWithOneNumberIsValid', async function() {
    const groupNumber = 1;
    testUser.group = groupNumber;
    const courseOffering = await CourseOffering.create(testUser);

    expect(courseOffering).toBeTruthy();
    expect(courseOffering.group).toBe(groupNumber);

    // // the list of errors should be an empty object
    // expect(courseOffering.validate()).toBe({});
  });

  test('testThatNullGroupIsValid', async function() {
    const groupNumber =
    testUser.group = null;
    const courseOffering = await CourseOffering.create(testUser);

    expect(courseOffering).toBeTruthy();
    expect(courseOffering.group).toBe(groupNumber);

    // // use .resolves to resolve the promise; error list expected to be empty
    // expect(courseOffering.validate()).resolves.toBe(undefined);
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
describe('getAllOfferings()', () => {
  test('testGetAllOfferingsReturnsCorrectNumberOfItems', async function() {
    const expectedLength = 15;
    // create a bunch of course offerings in the db
    await createCourseOfferings(expectedLength);

    // retrieve the offerings from the db
    const courseOfferings = CourseOffering.getAllOfferings();

    expect((await courseOfferings).length).toBe(expectedLength);
  });

  test('testGetAllOfferingsReturnsEmptyArrayWhenThereAreNoItems', async function() {
    expect((await CourseOffering.getAllOfferings()).length).toBe(0);
  });
});

/**
 * Creates a bunch of course offerings to use for testing.
 *
 * @param {number} amount - The amount of offerings to create
 */
async function createCourseOfferings(amount) {
  // drop and recreate the table
  await CourseOffering.sync({force: true});
  const viableGroups = 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z 1 2 3 4 5 6 7 8 9 0'.split(' ');
  console.log(viableGroups);
  for (let i = 0; i < amount; i++) {
    const random = Math.floor(Math.random() * viableGroups.length);
    console.log(`Random: ${random} Character: ${viableGroups[random]}`);
    await CourseOffering.create({
      group: viableGroups[random],
    });
  }
}
