const {DataTypes, sequelize} = require('../../datasource');
const CourseOffering = require('../javascript/CourseOffering');

// Database constructor for Instructor
const Instructor = sequelize.define('Instructor', {
  instructorID: {
    type: DataTypes.INTEGER,
    allowNull: false, // Can't be null
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Exception "First Name cannot be empty"',
      },
      len: {
        args: [0, 50],
        msg: 'Exception "First Name cannot be more than 50 characters"',
      },
    },
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Exception "Last Name cannot be empty"',
      },
      len: {
        args: [0, 50],
        msg: 'Exception "Last Name cannot be more than 50 characters"',
      },
    },
  },

  // Added properties >>>>>>>>>>>>>>
  officeNum: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Exception "Office number cannot be empty"',

      },
      len: {
        args: [6, 6],
        msg: 'Exception "Office number must be 6 digits"',
      },

    },
  },
  phoneNum: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Exception "Phone number can not be empty"',

      },
      len: {
        args: [6, 7],
        msg: 'Exception "Phone number must be 6 digits"',
      },

    },
  },
  email: {
    type: DataTypes.STRING,
    isUnique: true,
    allowNull: false,
    validate: {
      isEmail: {
        msg: 'Exception"Invalid Email address"',
      },
      notEmpty: {
        msg: 'Exception "E-Mail address can not be empty"',

      },
      len: {
        args: [13, 50],
        msg: 'Exception "Invalid Email address"',
      },

    },
  },
},
{
  tableName: 'Instructor',
});

module.exports = Instructor;
