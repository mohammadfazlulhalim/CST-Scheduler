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
    type: DataTypes.STRING,
    // this field is mandatory.
    allowNull: false,
    // course code has to be unique
    unique: true,
    validate: {
      // course code consisting of 3 or 4 characters followed by 3 or 4 digits
      is: {
        args: /^[A-Za-z]{3,4}\s*[0-9]{3,4}\s*$/,
        msg: 'Course Code can have 3-4 characters and 3-4 digits only',
      },
    },

  },
  courseName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [1, 50],
        msg: 'Course Name must have 1 to 50 characters.',
      },
    },
  },
  courseNumCredits: {
    type: DataTypes.INTEGER,
    // allowNull: false,
    allowNull: false,

    validate: {
      notEmpty: {
        msg: 'Credit unit cannot be empty',
      },

      isInt: {
        msg: 'Enter a whole number between 0 and 6 as a valid number of credits.',
      },
      min: {
        args: [0],
        msg: 'Enter a whole number between 0 and 6 as a valid number of credits.',
      },
      max: {
        args: [6],
        msg: 'Enter a whole number between 0 and 6 as a valid number of credits.',
      },
    },
  },
  courseNumHoursPerWeek: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: {
        msg: 'Enter a whole number between 1 and 40 as a valid number of hours.',
      },
      min: {
        args: [1],
        msg: 'Enter a whole number between 1 and 40 as a valid number of hours.',
      },
      max: {
        args: [40],
        msg: 'Enter a whole number between 1 and 40 as a valid number of hours.',
      },
    },
  },

}, {
  tableName: 'Courses',
});


module.exports = Course;
