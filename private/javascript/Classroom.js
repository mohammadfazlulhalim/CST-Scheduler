const {DataTypes, sequelize} = require('../../datasource');

// Define Classroom Model
const Classroom = sequelize.define('Classroom', {
  // RoomNumber Attribute
  roomNumber: {
    type: DataTypes.STRING, // Can be up to 10 characters
    allowNull: false, // Can't be null
    validate: {
      len: {
        args: [1, 10],
        msg: 'The Room Number must be between 1 and 10 characters in length.',
      },
    },
  },
  // location attribute
  location: {
    type: DataTypes.STRING,
    validate: {
      len: {
        args: [2, 50],
        msg: 'The location must be between 2 and 50 characters in length.',
      },
    },
  },
},
{
  freezeTableName: true, // Freeze table sets the table name to the object name.
});

module.exports = Classroom;
