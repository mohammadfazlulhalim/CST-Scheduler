const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '../database/scheduler.db',
});

// Define Classroom Model
const Classroom = sequelize.define('Classroom', {
  // RoomNumber Attribute
  roomNumber: {
    type: DataTypes.STRING, // Can be up to 10 characters
    allowNull: false, // Can't be null
    primaryKey: true,
    // Validation Rules
    validate: {
      len: {
        args: [1, 10],
        msg: 'The Room Number must be between 1 and 10 characters in length.',
      },
      // notNull: {
      //   msg: 'The Room Number cannot be null.',
      // },
    },
  },
},
{
  freezeTableName: true, // Freeze table sets the table name to the object name.
});

module.exports = Classroom;
