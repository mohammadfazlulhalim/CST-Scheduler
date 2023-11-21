const {sequelize, DataTypes} = require('../../dataSource');
const Course = require('../javascript/Course');
const Term = require('../javascript/Term');
const Instructor = require('../javascript/Instructor');
const Program = require('../javascript/Program')

/**
 * This class stores objects that represent course offerings to be used in the CST Scheduler.
 */
const CourseOffering = sequelize.define('CourseOffering', {

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

  // courseID: {
  //   type: DataTypes.INTEGER,
  //   references: {
  //     model: Course,
  //     key: 'id'
  //   }
  // },
  //
  // termID: {
  //   type: DataTypes.INTEGER,
  //   references: {
  //     model: Term,
  //     key: 'id'
  //   }
  // },
  //
  // instructorID: {
  //   type: DataTypes.INTEGER,
  //   references: {
  //     model: Instructor,
  //     key: 'id'
  //   }
  // },
  //
  // programID: {
  //   type: DataTypes.INTEGER,
  //   references: {
  //     model: Program,
  //     key: 'id'
  //   }
  // },
  //

}, {
  tableName: 'CourseOfferings',
});

//Associates with all foreign keys
CourseOffering.belongsTo(Course);
CourseOffering.belongsTo(Term);
CourseOffering.belongsTo(Instructor);
CourseOffering.belongsTo(Program);

module.exports = CourseOffering;
