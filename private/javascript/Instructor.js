const {DataTypes, sequelize} = require('../../datasource');

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


module.exports = Instructor;
