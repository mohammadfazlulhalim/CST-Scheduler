const Course = require('../../private/javascript/Course');
const {sequelize}= require('../../datasource');


// --------------------------
// series of tests inspired by story33


// for storing Course{} results
let courseInstance;

// ensure that databases are created successfully
/**
 * function for checking database tables
 */
async function establishDatabaseTables() {
    try {
        await Course.sync();
    } catch (e) {
        console.error(e);
    }
}

describe('testCourseModel', () => {
    // another check before the `describe()` is ran
    beforeAll( async () => {
        try {
            await sequelize.sync( {force: true} );
        } catch (e) {
            console.error('Error during db sync' );
        }
    });

    beforeEach(async () => {
        // HARDCODED FOR NOW...
        try {
            const course = {
                courseCode: 'CSEC280',
                courseName: 'Security 1',
                courseNumCredits: 4,
                courseNumHours: 60,
            };

            courseInstance = Course.build(course);

            await establishDatabaseTables();
        } catch (err) {
            console.error(err);
        }
    });


    // courseName upper bound test
    test('testCourseNameGoodUpperBound', async () => {
        console.log(`courseInstance: \n ${courseInstance}`);

        courseInstance.courseName = 'a'.repeat(100);

        try {
            await courseInstance.save();
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
        courseInstance.courseName = 'a';

        try {
            await courseInstance.save();
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
        console.log(courseInstance);
        courseInstance.courseName = '';

        try {
            await courseInstance.save();
        } catch (e) {
            expect(e.errors.length).toBe(1);
            expect(e.errors[0].message)
                .toBe('Error: Course Name must have 1 to 100 characters.');
        }
    });


    test('testCourseNameCatchTooLong', async () => {
        // 101 chars
        courseInstance.courseName = 'a'.repeat(101);

        try {
            await courseInstance.save();
        } catch (e) {
            expect(e.length).toBe(1);
            expect(e.errors[0].message)
                .toBe('Error: Course Name must have 1 to 100 characters.');
        }
    });


    // upper bound
    test('testNumberOfCreditsGood', async () => {
        courseInstance.courseNumCredits = 6;

        try {
            await courseInstance.save();
            const updatedCourse = await Course.findOne({
                where: {courseNumCredits: 6},
            });
            expect(updatedCourse).toBeTruthy();
        } catch (e) {
            console.error(e);
        }
    });

    test('testNumberOfCreditsCatchString', async () => {
        courseInstance.courseNumCredits = 'Four';

        try {
            await courseInstance.save();
        } catch (e) {
            expect(e.errors.length).toBe(1);
            expect(e.errors[0].message)
                .toBe('Error: Enter a whole number between 0 and 6 as a valid number of credits.');
        }
    });

    test('testNumberOfCreditsCatchTooHighNumber', async () => {
        courseInstance.courseNumCredits = 7;

        try {
            await courseInstance.save();
        } catch (e) {
            expect(e.errors.length).toBe(1);
            expect(e.errors[0].message)
                .toBe('Error: Enter a whole number between 0 and 6 as a valid number of credits.');
        }
    });


    test('testNumberOfCreditsCatchNegativeVals', async () => {
        courseInstance.courseNumCredits = -45;

        try {
            await courseInstance.save();
        } catch (e) {
            expect(e.errors.length).toBe(1);
            expect(e.errors[0].message)
                .toBe('Error: Enter a whole number between 0 and 6 as a valid number of credits.');
        }
    });


    test('numberOfCreditsTestZeroForPass', async () => {
        courseInstance.courseNumCredits = 0;

        try {
            await courseInstance.save();
            const updatedCourse = await Course.findOne({
                where: {courseNumCredits: 0},
            });
            expect(updatedCourse).toBeTruthy();
        } catch (e) {
            console.error(e);
        }
    });

    test('testNumberOfCreditsInteger', async () => {
        courseInstance.courseNumHours = 900;

        try {
            await courseInstance.save();
        } catch (e) {
            expect(e.errors.length).toBe(1);
            expect(e.errors[0].message)
                .toBe('Error: Enter a whole number between 1 and 6 ' +
                    'as a valid number of credits.');
        }
    });


    test('testNumberOfHoursValid', async () => {
        courseInstance.courseNumHours = 60;

        try {
            await courseInstance.save();
            const updatedCourse = await Course.findOne({
                where: {courseNumHours: 60},
            });
            expect(updatedCourse).toBeTruthy();
        } catch (e) {
            console.error(e);
        }
    });

    // catch error once it crosses upper bound for num hours
    test('testNumberOfHoursValueTooHigh', async () => {
        courseInstance.courseNumHours = 169;

        try {
            await courseInstance.save();
        } catch (e) {
            expect(e.errors.length).toBe(1);
            expect(e.errors[0].message)
                .toBe('Error: Enter a whole number between 1 and 168 ' +
                    'as a valid number of hours.');
        }
    });


    test('testNumberOfHoursErrorNegative', async () => {
        courseInstance.courseNumHours = -45;

        try {
            await courseInstance.save();
        } catch (e) {
            expect(e.errors.length).toBe(1);
            expect(e.errors[0].message)
                .toBe('Error: Enter a whole number between 1 and 168 ' +
                    'as a valid number of hours.');
        }
    });


    test('testNumberOfHoursCatchString', async () => {
        courseInstance.courseNumHours = 'Sixty';

        try {
            await courseInstance.save();
        } catch (e) {
            expect(e.errors.length).toBe(1);
            expect(e.errors[0].message)
                .toBe('Error: Enter a whole number between 1 and 168 ' +
                    'as a valid number of hours.');
        }
    });

    test('testNumberOfHoursCatchNonInteger', async () => {
        courseInstance.courseNumHours = 30.25;

        try {
            await courseInstance.save();
        } catch (e) {
            expect(e.errors.length).toBe(1);
            expect(e.errors[0].message)
                .toBe('Error: Enter a whole number between 1 and 168 ' +
                    'as a valid number of hours.');
        }
    });


    afterAll(async () => {
        if (courseInstance) {
            await courseInstance.destroy();
        }
    });
});


// // // Tests End // // // // //
// --------------------------

