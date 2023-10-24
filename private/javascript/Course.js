// SEQUELIZE STUB TO CLARIFY DATABASE ORM CONVERSATIONS!
// Docs are utilized to assist in setting up the stub
// https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
// more resources:
// https://codesandbox.io/s/jest-sequelize-example-5zglq?file=/src/__tests__/consumer.js
//

const {sequelize, DataTypes} = require('../../datasource');


// MODEL STUB START
const Course = sequelize.define('Course', {
    courseCode: {
        // might have been tested elsewhere
        // unsure if story34 branch needs testing
        type: DataTypes.STRING,

    },
    courseName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                message: 'Error: Course Name must have 1 to 100 characters.',
            },
        },
        len: [1, 100], // check if it's inclusive of the range numbers
        message: 'Error: Course Name must have 1 to 100 characters.',
    },
    courseNumCredits: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                message: 'Error: Course Name must have 1 to 100 characters.',
            },
        },
        min: 0,
        max: 6,
        message: 'Error: Enter a whole number between 0 and 6 as a valid number of credits.',
    },
    // "courseNumHoursPerWeek" is misleading - course hours as 45 for example refers to total hours, and not per week.
    courseNumHours: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                message: 'Error: Enter a whole number between 1 and 168 as a valid number of hours.',
            },
        },
        isInt: {
            message: 'Error: Enter a whole number between 1 and 168 as a valid number of hours.',
        },
        min: 1,
        max: 168,
        message: 'Error: Enter a whole number between 1 and 168 as a valid number of hours.',
    },

}, {
    tableName: 'Courses',
});


module.exports = Course;
