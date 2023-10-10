const {Sequelize, DataTypes} = require('sequelize');

// Initialize Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'private/database', // Path
});

// Classroom Model
const Classroom = sequelize.define('Classroom', {
  roomNumber: {
    type: DataTypes.STRING(10), // Change the data type as needed (e.g., INTEGER for room numbers)
    allowNull: false, // Room number cannot be null
  },
});

// Synchronize the model with the database
sequelize.sync()
    .then(() => {
      console.log('Classroom table created');
    })
    .catch((err) => {
      console.error('Error creating Classroom table:', err);
    });

module.exports = Classroom;
