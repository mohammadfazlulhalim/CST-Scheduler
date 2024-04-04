const {sequelize, DataTypes} = require('../../dataSource');
const Course = require('../javascript/Course');
const Term = require('../javascript/Term');
const Instructor = require('../javascript/Instructor');
const Program = require('../javascript/Program');

/**
 * This class stores objects that represent course offerings to be used in the CST Scheduler.
 */
const CourseOffering = sequelize.define('CourseOffering', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [1, 50],
        msg: 'Name must have 1 to 50 characters.',
      },
    },
  },

  // Dates - YYYY-MM-DD
  startDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  endDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  group: {
    type: DataTypes.STRING(1),
    validate: {
      isAlpha: {
        args: true,
        msg: 'Course Offering group can only contain letters',
      },
      isUppercase: {
        args: true,
        msg: 'Course Offering group can only contain uppercase letters',
      },
      len: {
        args: [0, 1],
        msg: 'Course offering group can only be 0 or 1 character long',
      },
    },
  },
}, {
  tableName: 'CourseOfferings',
});


module.exports = CourseOffering;
