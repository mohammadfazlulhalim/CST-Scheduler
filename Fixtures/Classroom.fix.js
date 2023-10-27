const Classroom = require('../private/javascript/Classroom');

/**
 * This clears the table for Classroom and then recreates the table
 * with valid entries
 * @return {Promise<void>}
 */
async function fillClassroomTable() {
  await Classroom.sync({force: true});
  await createClassrooms();
}

// eslint-disable-next-line require-jsdoc
async function createClassrooms() {
  const createdClassrooms = [
    '239A', '239B', '240B', '242C',
  ];
  for (const roomNumber of createdClassrooms) {
    await Classroom.create({
      title: 'Room Number Table',
      roomNumber: roomNumber,
    });
  }
}

module.exports = fillClassroomTable;
