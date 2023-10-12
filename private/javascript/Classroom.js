const {Sequelize, DataTypes} = require('sequelize');

// Initialize Sequelize
// const sequelize = new Sequelize({
//   dialect: 'sqlite', // Dialect is the type of database we're using
//   storage: ':memory:', // Currently storing to an in-memory database
// });
const sequelize = new Sequelize('sqlite::memory:');
// Define Classroom Model
const Classroom = sequelize.define('Classroom', {
  // RoomNumber Attribute
  roomNumber: {
    type: DataTypes.STRING(10), // Can be up to 10 characters
    allowNull: false, // Can't be null
    primaryKey: true,
    // Validation Rules
    validate: {
      len: {
        args: [1, 10],
        msg: 'The Room Number must be between 1 and 10 characters in length.',
      },
      notNull: {
        msg: 'The Room Number cannot be null.',
      },
    },
  },
});

// eslint-disable-next-line valid-jsdoc


module.exports = Classroom;
