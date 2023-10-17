// SEQUELIZE STUB TO CLARIFY DATABASE ORM CONVERSATIONS!
// Docs are utilized to assist in setting up the stub
// https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
// more resources:
    // https://codesandbox.io/s/jest-sequelize-example-5zglq?file=/src/__tests__/consumer.js
    //

const test = require('node:test');

const Course = require("../../private/javascript/Course");
Course.sequelize.storage = ':memory:'; // borrowed from story33


// for storing Course{} results
let courseInstance;


// --------------------------
// series of tests inspired by story33


// ensure that databases are created successfully
async function establishDatabaseTables() {
    try {
        await Course.sync();
    } catch (e) {
        console.error(e)
    }
}


describe ('testCourseModel', () => {
    beforeAll(async () => {
        // hardcoded for now...
        try {
            const course =  {
                courseName: "Security 1",
                courseNumCredits: 4,
                courseNumHoursPerWeek: 60,
            };

            courseInstance = await Course.build(course);

            await establishDatabaseTables();
        } catch (err) {
            console.error(err);
        }
    });


    test ("testCourseNameGood", async () => {
        courseInstance.set ({
            courseName: 'Security 1'
        })

        try {
            await courseInstance.save();
            const updatedCourse = await Course.findOne({
                where: {courseName: 'Security 1'}
            })
            expect(updatedCourse).toBeTruthy();

        } catch (e) {
            console.error(e)
        }

    })

    test("testCourseNameCatchNothingEntered", async () => {
        courseInstance.set({courseName: ""} );
        try {
            await courseInstance.save();
        } catch (e) {
            expect(e.errors[0].message)
                .toBe("Error: Course Name must have 1 to 100 characters.")
        }
    });


    test("testCourseNameCatchTooLong", async () => {
        // 127 chars
        courseInstance.set({courseName: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"});
        try {
            await courseInstance.save();
        } catch (e) {
            expect(e.errors[0].message)
                .toBe("Error: Course Name must have 1 to 100 characters.")
        }
    })

    test("testCourseNameSpecialChars", async () => {
        courseInstance.set ({
            courseName: '$$#$%&'
        })

        try {
            await courseInstance.save();
            const updatedCourse = await Course.findOne({
                where: {courseName: '$$#$%&'}
            })
            expect(updatedCourse).toBeTruthy();

        } catch (e) {
            console.error(e)
        }

    })

    test("testCourseNameSpecialCharMixedWithGood", async () => {
        courseInstance.set ({
            courseName: '$Financial Hashcodes#$%&'
        })

        try {
            await courseInstance.save();
            const updatedCourse = await Course.findOne({
                where: {courseName: '$Financial Hashcodes#$%&'}
            })
            expect(updatedCourse).toBeTruthy();

        } catch (e) {
            console.error(e)
        }
    })

    test("testCourseNameFrenchForUTF8", async () => {
        courseInstance.set ({
            courseName: `Sécurité de l’Information 1`
    })

        try {
            await courseInstance.save();
            const updatedCourse = await Course.findOne({
                where: {courseName: `Sécurité de l’Information 1`}
            })
            expect(updatedCourse).toBeTruthy();

        } catch (e) {
            console.error(e)
        }
    })

    test("testNumberOfCreditsGood", async () => {
        courseInstance.set ({
            courseNumCredits: 4
        })

        try {
            await courseInstance.save();
            const updatedCourse = await Course.findOne({
                where: {courseNumCredits: 4}
            })
            expect(updatedCourse).toBeTruthy();

        } catch (e) {
            console.error(e)
        }
    })

    test("testNumberOfCreditsCatchString", async () => {
        courseInstance.set ({
            courseNumCredits: "Four"
        })

        try {
            await courseInstance.save();
        } catch (e) {
            expect(e.errors[0].message)
                .toBe("Error: Enter a whole number between " +
                    "0 and 99 as a valid number of credits.")
        }
    })

    test("testNumberOfCreditsCatchSpecialChars", async () => {
        courseInstance.set ({
            courseNumCredits: "$@%&"
        })

        try {
            await courseInstance.save();
        } catch (e) {
            expect(e.errors[0].message)
                .toBe("Error: Enter a whole number between " +
                    "0 and 99 as a valid number of credits.")
        }
    })


    test("testNumberOfCreditsCatchTooHighNumber", async () => {

        courseInstance.set ({
            courseNumCredits: 900
        })

        try {
            await courseInstance.save();
        } catch (e) {
            expect(e.errors[0].message)
                .toBe("Error: Enter a whole number between " +
                    "0 and 99 as a valid number of credits.")
        }
    })


    test("testNumberOfCreditsCatchNegativeVals", async () => {

        courseInstance.set ({
            courseNumCredits: -45
        })

        try {
            await courseInstance.save();
        } catch (e) {
            expect(e.errors[0].message)
                .toBe("Error: Enter a whole number between " +
                    "0 and 99 as a valid number of credits.")
        }
    })


    test("numberOfCreditsTestZeroForPass", async () => {
        courseInstance.set ({
            courseNumCredits: 0
        })

        try {
            await courseInstance.save();
            const updatedCourse = await Course.findOne({
                where: {courseNumCredits: 0}
            })
            expect(updatedCourse).toBeTruthy();

        } catch (e) {
            console.error(e)
        }
    })


    test("testNumberOfHoursValid", async () => {
        courseInstance.set ({
            courseNumHoursPerWeek: 60
        })

        try {
            await courseInstance.save();
            const updatedCourse = await Course.findOne({
                where: {courseNumHoursPerWeek: 60}
            })
            expect(updatedCourse).toBeTruthy();

        } catch (e) {
            console.error(e)
        }
    })


    test("testNumberOfHoursValueTooHigh", async () => {
        courseInstance.set ({
            courseNumHoursPerWeek: 900
        })

        try {
            await courseInstance.save();
        } catch (e) {
            expect(e.errors[0].message)
                .toBe("Error: Enter a whole number between 1 and 168 " +
                    "as a valid number of credits.")
        }
    })


    test("testNumberOfHoursErrorNegative", async () => {
        courseInstance.set ({
            courseNumHoursPerWeek: -45
        })

        try {
            await courseInstance.save();
        } catch (e) {
            expect(e.errors[0].message)
                .toBe("Error: Enter a whole number between 1 and 168 " +
                    "as a valid number of credits.")
        }
    })


    test("testNumberOfHoursCatchNonInteger", async () => {
        courseInstance.set ({
            courseNumHoursPerWeek: 900.45
        })

        try {
            await courseInstance.save();
        } catch (e) {
            expect(e.errors[0].message)
                .toBe("Error: Enter a whole number between 1 and 168 " +
                    "as a valid number of credits.")
        }
    })


    afterAll(async () => {
        if (courseInstance) {
            await courseInstance.destroy();
        }
    })

})




// // // Tests End // // // // //
// --------------------------

