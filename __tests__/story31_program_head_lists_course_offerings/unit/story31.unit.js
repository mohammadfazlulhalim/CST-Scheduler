const CourseOffering = require('../../../private/javascript/CourseOffering');

describe('group', () => {
  test(' with one letter is valid', async function() {
    const groupLetter = 'A';
    const courseOffering = await CourseOffering.create({
      group: groupLetter,
    });

    expect(courseOffering).toBeTruthy();
    expect(courseOffering.group).toBe(groupLetter);

    // use .resolves to resolve the promise; error list expected to be empty
    expect(courseOffering.validate()).resolves.toBe(undefined);
  });

  test(' with one number is valid', async function() {
    const groupNumber = 1;
    const courseOffering = await CourseOffering.create({
      group: groupNumber,
    });

    expect(courseOffering).toBeTruthy();
    expect(courseOffering.group).toBe(groupNumber);

    // use .resolves to resolve the promise; error list expected to be empty
    expect(courseOffering.validate()).resolves.toBe(undefined);
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
