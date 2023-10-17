const {sequelize} = require('../../private/database/'); // Replace with the actual path to your Sequelize configuration
const Classroom = require('../../private/javascript/Classroom'); // Replace with the actual path to your Classroom model

// Sample data for 10 entries
const classroomData = [
  {roomNumber: 'A101'},
  {roomNumber: 'B202'},
  {roomNumber: 'C303'},
  {roomNumber: 'D404'},
  {roomNumber: 'E505'},
  {roomNumber: 'F606'},
  {roomNumber: 'G707'},
  {roomNumber: 'H808'},
  {roomNumber: 'I909'},
  {roomNumber: 'J1010'},
];

// Function to seed the database
const seedDatabase = async () => {
  try {
    await sequelize.sync({force: true}); // This will recreate the table, be cautious in a production environment
    await Classroom.bulkCreate(classroomData);
    console.log('Database seeded with 10 entries.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await sequelize.close(); // Close the database connection
  }
};

seedDatabase();
