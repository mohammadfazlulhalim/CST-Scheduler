const {DataTypes, sequelize} = require('../../datasource');
const CourseOffering = require('../javascript/CourseOffering');

// Database constructor for Instructor
const Instructor = sequelize.define('Instructor', {
  instructorID: {
    type: DataTypes.INTEGER,
    allowNull: false, // Can't be null
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
},
{
  tableName: 'Instructor',
});

module.exports = Instructor;
