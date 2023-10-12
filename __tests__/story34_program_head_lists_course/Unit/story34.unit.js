// SEQUELIZE STUB TO CLARIFY DATABASE ORM CONVERSATIONS!
// Docs are utilized to assist in setting up the stub
// https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
// more resources:
    // https://codesandbox.io/s/jest-sequelize-example-5zglq?file=/src/__tests__/consumer.js
    //

const test = require('node:test');
const assert = require('node:assert/strict')

const jest = require("jest");


const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Course = require("../../../private/javascript/Course");



// --------------------------
// // // TESTS // // // // //

describe("Course Model", () => {
    // check the name of the course
    it ('testCourseNameGood', async () => {
        let course;
        try {
            course = await Course.create ( {
                courseName: "Security 1",
                courseNumCredits: 4,
                courseNumHoursPerWeek: 60,

            } )
        } catch (err) {

        }

    });
});

describe("courseNumCredit", () => {
    it('testCourseNumCredits', () => {
        let course;
    });
});



// // // Tests End // // // // //
// --------------------------

