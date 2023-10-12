const CourseOffering = require('../../../private/javascript/CourseOffering');
CourseOffering.sequelize.storage = ':memory:';

// point Sequelize to use an in-memory DB

describe('group', () => {
  test(' with one letter is valid', async function() {
    const groupLetter = 'A';
    const courseOffering = await CourseOffering.create({
      group: groupLetter,
    });

    expect(courseOffering).toBeTruthy();
    expect(courseOffering.group).toBe(groupLetter);

    // the list of errors should be an empty object
    // expect(courseOffering.validate()).resolves.toBe(undefined);
  });

  test(' with one number is valid', async function() {
    const groupNumber = 1;
    const courseOffering = await CourseOffering.create({
      group: groupNumber,
    });

    expect(courseOffering).toBeTruthy();
    expect(courseOffering.group).toBe(groupNumber);

    // the list of errors should be an empty object
    expect(courseOffering.validate()).toBe({});
  });

  test(' that is null is valid', async function() {
    const groupNumber = null;
    const courseOffering = await CourseOffering.create({
      group: groupNumber,
    });

    expect(courseOffering).toBeTruthy();
    expect(courseOffering.group).toBe(groupNumber);

    // use .resolves to resolve the promise; error list expected to be empty
    expect(courseOffering.validate()).resolves.toBe(undefined);
  });

  test(' that is a lowercase letter is invalid', async function() {
    try {
      await CourseOffering.create({
        group: 'a',
      });
    } catch (err) {
      expect(err.errors[0].message).toBe('Course Offering group can only contain uppercase letters');
    }
  });

  test(' with multiple characters is invalid', async function() {
    try {
      await CourseOffering.create({
        group: 'A1',
      });
    } catch (err) {
      expect(err.errors[0].message).toBe('Course offering group can only be 0 or 1 character long');
    }
  });

  test(' with special characters is invalid', async function() {
    try {
      await CourseOffering.create({
        group: '!',
      });
    } catch (err) {
      expect(err.errors[0].message).toBe('Course Offering group can only contain letters and numbers');
    }
  });
});

describe('getAllOfferings()', () => {
  test(' returns correct number of items', async function() {
    const expectedLength = 15;
    // create a bunch of course offerings in the db
    await createCourseOfferings(expectedLength);

    // retrieve the offerings from the db
    const courseOfferings = CourseOffering.getAllOfferings();

    expect((await courseOfferings).length).toBe(expectedLength);
  });

  test(' returns empty array when there are no items', async function() {
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
  for (let i = 0; i < amount; i++) {
    await CourseOffering.create({
      group: viableGroups[Math.random() * viableGroups.length],
    });
  }
}
