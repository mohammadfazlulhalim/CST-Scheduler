const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize({ // get a sequelize object and route it to database
  dialect: 'sqlite',
  storage: '../database/database.sqlite',
});

// Database constructor for Instructor
const Instructor = sequelize.define('Instructor', {
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
  },
},
{
  tableName: 'Instructor',
});

/**
 *  retrieves all instructors from database and returns as a JSON literal array
 */
function getAllInstructors() {

}

module.exports = Instructor;
