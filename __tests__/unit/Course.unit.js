const Course = require('../../private/javascript/Course');
const {sequelize}= require('../../datasource');


// --------------------------
// series of tests inspired by story33


// ensure that databases are created successfully
/**
 * function for checking database tables
 */

// async function establishDatabaseTables() {
//     try {
//         await Course.sync();
//     } catch (e) {
//         console.error(e);
//     }
// }

// for storing Course{} results
let courseInstance;

describe('testCourseModel', () => {
  // another check before the `describe()` is ran
  let course;

  beforeEach(async () => {
    try {
      // CSEC info based on info found on https://saskpolytech.ca/programs-and-courses/programs/Computer-Systems-Technology.aspx#courses
      await sequelize.sync( {force: true} );
      course = {
        courseCode: 'CSEC280',
        courseName: 'Security 1',
        courseNumCredits: 4,
        courseNumHoursPerWeek: 4,
      };
    } catch (err) {
      console.error(err);
    }
  });


  // courseName upper bound test
  test('testCourseNameGoodUpperBound', async () => {
    course.courseName = 'a'.repeat(100);

    try {
      await Course.create(course);
      const updatedCourse = await Course.findOne({
        where: {courseName: 'a'.repeat(100)},
      });
      expect(updatedCourse).toBeTruthy();
    } catch (e) {
      console.error(e);
    }
  });


  // courseName lower bound test
  test('testCourseNameLowerBound', async () => {
    course.courseName = 'a';

    try {
      await Course.create(course);
      const updatedCourse = await Course.findOne({
        where: {courseName: 'a'},
      });
      expect(updatedCourse).toBeTruthy();
    } catch (e) {
      console.error(e);
    }
  });

  // Someone enters empty string for courseName - ""
  test('testCourseNameCatchNothingEntered', async () => {
    course.courseName = '';

    try {
      await Course.create(course);
      fail(); // throws an error to force the expects to run that are only inside the catch
    } catch (e) {
      expect(e.errors.length).toBe(1);
      expect(e.errors[0].message)
          .toBe('Error: Course Name must have 1 to 100 characters.');
    }
  });


  test('testCourseNameCatchTooLong', async () => {
    // 101 chars
    course.courseName = 'a'.repeat(101);

    try {
      await Course.create(course);
      fail(); // throws an error to force the expects to run that are only inside the catch
    } catch (e) {
      expect(e.errors.length).toBe(1);
      expect(e.errors[0].message)
          .toBe('Error: Course Name must have 1 to 100 characters.');
    }
  });


  // upper bound
  test('testNumberOfCreditsGood', async () => {
    course.courseNumCredits = 6;

    try {
      const updatedCourse = await Course.create(course);
      expect(updatedCourse).toBeTruthy();
    } catch (e) {
      console.error(e);
    }
  });

  test('testNumberOfCreditsCatchString', async () => {
    course.courseNumCredits = 'Four';

    try {
      await Course.create(course);
      fail(); // throws an error to force the expects to run that are only inside the catch
    } catch (e) {
      expect(e.errors.length).toBe(1);
      expect(e.errors[0].message)
          .toBe('Error: Enter a whole number between 0 and 6 as a valid number of credits.');
    }
  });

  test('testNumberOfCreditsCatchTooHighNumber', async () => {
    course.courseNumCredits = 7;

    try {
      await Course.create(course);
      fail(); // throws an error to force the expects to run that are only inside the catch
    } catch (e) {
      expect(e.errors.length).toBe(1);
      expect(e.errors[0].message)
          .toBe('Error: Enter a whole number between 0 and 6 as a valid number of credits.');
    }
  });


  test('testNumberOfCreditsCatchNegativeVals', async () => {
    course.courseNumCredits = -45;

    try {
      await Course.create(course);
      fail(); // throws an error to force the expects to run that are only inside the catch
    } catch (e) {
      expect(e.errors.length).toBe(1);
      expect(e.errors[0].message)
          .toBe('Error: Enter a whole number between 0 and 6 as a valid number of credits.');
    }
  });


  test('numberOfCreditsTestZeroForPass', async () => {
    course.courseNumCredits = 0;

    try {
      await Course.create(course);
      const updatedCourse = await Course.findOne({
        where: {courseNumCredits: 0},
      });
      expect(updatedCourse).toBeTruthy();
    } catch (e) {
      console.error(e);
    }
  });

  test('testNumberOfCreditsInteger', async () => {
    course.courseNumCredits = 900;

    try {
      await Course.create(course);
      fail(); // throws an error to force the expects to run that are only inside the catch
    } catch (e) {
      expect(e.errors.length).toBe(1);
      expect(e.errors[0].message)
          .toBe('Error: Enter a whole number between 0 and 6 as a valid number of credits.');
    }
  });


  test('testNumberOfHoursValid', async () => {
    course.courseNumHoursPerWeek = 60;

    try {
      await Course.create(course);
      const updatedCourse = await Course.findOne({
        where: {courseNumHoursPerWeek: 60},
      });
      expect(updatedCourse).toBeTruthy();
    } catch (e) {
      console.error(e);
    }
  });

  // catch error once it crosses upper bound for num hours
  test('testNumberOfHoursValueTooHigh', async () => {
    course.courseNumHoursPerWeek = 169;

    try {
      await Course.create(course);
      fail(); // throws an error to force the expects to run that are only inside the catch
    } catch (e) {
      expect(e.errors.length).toBe(1);
      expect(e.errors[0].message)
          .toBe('Error: Enter a whole number between 1 and 168 ' +
                    'as a valid number of hours.');
    }
  });


  test('testNumberOfHoursErrorNegative', async () => {
    course.courseNumHoursPerWeek = -45;

    try {
      await Course.create(course);
      fail(); // throws an error to force the expects to run that are only inside the catch
    } catch (e) {
      expect(e.errors.length).toBe(1);
      expect(e.errors[0].message)
          .toBe('Error: Enter a whole number between 1 and 168 ' +
                    'as a valid number of hours.');
    }
  });


  test('testNumberOfHoursCatchString', async () => {
    course.courseNumHoursPerWeek = 'Sixty';

    try {
      await Course.create(course);
      fail(); // throws an error to force the expects to run that are only inside the catch
    } catch (e) {
      expect(e.errors.length).toBe(1);
      expect(e.errors[0].message)
          .toBe('Error: Enter a whole number between 1 and 168 ' +
                    'as a valid number of hours.');
    }
  });

  test('testNumberOfHoursCatchNonInteger', async () => {
    course.courseNumHoursPerWeek = 30.25;

    try {
      await Course.create(course);
      fail(); // throws an error to force the expects to run that are only inside the catch
    } catch (e) {
      expect(e.errors.length).toBe(1);
      expect(e.errors[0].message)
          .toBe('Error: Enter a whole number between 1 and 168 ' +
                    'as a valid number of hours.');
    }
  });
});


// // // Tests End // // // // //
// --------------------------

