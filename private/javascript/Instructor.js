const {DataTypes, Op, sequelize} = require('../../datasource');
const CourseOffering = require('../javascript/CourseOffering');
// const {Op}= require('sequelize');
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
        args: [0, 10],
        msg: 'Exception "Office cannot be more than 10 digits"',
      },
      // len: {
      //   [Op.between]: [0, 6],
      //   msg: 'Exception "Office number must be 6 digits"',
      // },

    },

  },
  phoneNum: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Exception "Phone number cannot be empty"',

      },
      len: {
        args: [0,14],
        msg: 'Exception "Phone number can not be more than 10 numeric digits"',
      },
      is: /^\(\d{3}\)-\d{3}-d{4}$/,

    },
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Exception "E-mail address cannot be empty"',
      },
      is: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    },
  },


  tableName: 'Instructor',
});

module.exports = Instructor;
