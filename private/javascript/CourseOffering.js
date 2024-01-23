const {sequelize, DataTypes} = require('../../dataSource');
const Course = require('../javascript/Course');
const Term = require('../javascript/Term');
const Instructor = require('../javascript/Instructor');
const Program = require('../javascript/Program')

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
  },

  //Dates - YYYY-MM-DD
  startDate: {
    type: DataTypes.STRING,
  },

  endDate: {
    type: DataTypes.STRING,
  },

  group: {
    type: DataTypes.STRING(1),
    validate: {
      isAlphanumeric: {
        args: true,
        msg: 'Course Offering group can only contain letters and numbers',
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

  // termID: {
  //   type: DataTypes.INTEGER,
  //   foreignKey: true,
  // },
  //
  // programID: {
  //   type: DataTypes.INTEGER,
  //   foreignKey: true,
  // },
  //
  // instructorID: {
  //   type: DataTypes.INTEGER,
  //   foreignKey: true,
  // },
  //
  // courseID: {
  //   type: DataTypes.INTEGER,
  //   foreignKey: true,
  // },

}, {
  tableName: 'CourseOfferings',
});


module.exports = CourseOffering;
