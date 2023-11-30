// SEQUELIZE STUB TO CLARIFY DATABASE ORM CONVERSATIONS!
// Docs are utilized to assist in setting up the stub
// https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
// more resources:
// https://codesandbox.io/s/jest-sequelize-example-5zglq?file=/src/__tests__/consumer.js
//

/**
 * Note that error messages more or less remain the same
 * one message for the property regardless of error.
 *
 */

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
      len: {
        args: [1, 100],
        msg: 'Error: Course Name must have 1 to 100 characters.',
      },
    },
  },
  courseNumCredits: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: {
        msg: 'Error: Enter a whole number between 0 and 6 as a valid number of credits.',
      },
      min: {
        args: [0],
        msg: 'Error: Enter a whole number between 0 and 6 as a valid number of credits.',
      },
      max: {
        args: [6],
        msg: 'Error: Enter a whole number between 0 and 6 as a valid number of credits.',
      },
    },
  },
  courseNumHoursPerWeek: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: {
        msg: 'Error: Enter a whole number between 1 and 168 as a valid number of hours.',
      },
      min: {
        args: [1],
        msg: 'Error: Enter a whole number between 1 and 168 as a valid number of hours.',
      },
      max: {
        args: [168],
        msg: 'Error: Enter a whole number between 1 and 168 as a valid number of hours.',
      },
    },
  },

}, {
  tableName: 'Courses',
});




module.exports = Course;
