const Classroom = require('../private/javascript/Classroom');

/**
 * This clears the table for Classroom and then recreates the table
 * with valid entries
 * @return {Promise<void>}
 */
async function fillClassroomTable() {
  await createClassrooms();
}
// eslint-disable-next-line require-jsdoc
async function createClassrooms() {
  const createdClassrooms = [
    '239A', '239B', '240B', '242C', '241',
  ];
  for (const roomNumber of createdClassrooms) {
    await Classroom.create({
      title: 'Room Number Table',
      roomNumber: roomNumber,
      location: 'Saskatoon Main Campus',
    });
  }
}

const classroom1 = {
  roomNumber: '239a',
    location: 'Saskatoon',
};

module.exports = {classroom1, fillClassroomTable};
