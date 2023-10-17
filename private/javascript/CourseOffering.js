const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../../app').sequelize;

/**
 * This class stores objects that represent course offerings to be used in the CST Scheduler.
 */
const CourseOffering = sequelize.define('CourseOffering', {
  courseCode: {
    type: DataTypes.STRING,
  },

  termNumber: {
    type: DataTypes.INTEGER,
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

  // link the whole object here, not just the ID
  // primaryInstructorID: {
  //   type: DataTypes.STRING,
  // },
  //
  // secondaryInstructorID: {
  //   type: DataTypes.STRING,
  // },
}, {
  tableName: 'CourseOfferings',
});

/**
 * This function returns all course offerings in the database.
 *
 * @return {Promise<CourseOffering[]>}  - All course offerings in the database
 */
CourseOffering.getAllOfferings = async function() {
};

module.exports = CourseOffering;
