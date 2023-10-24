const Classroom = require('../private/javascript/Classroom');

// eslint-disable-next-line require-jsdoc

// eslint-disable-next-line require-jsdoc
async function fillClassroomTable() {
  await Classroom.sync({force: true});
  createClassrooms();
}

// eslint-disable-next-line require-jsdoc
async function createClassrooms() {
  const createdClassrooms = [
    '239A', '260', '124', '301', '108B',
    '215', '312', '203A', '128', '309',
    '222', '110', '304A', '132', '211',
    '307', '204', '126A', '230', '313',
    'C2', 'R7', 'Lab3', 'X9Y', 'A-B',
    'Room10', 'AB12', 'Q$', '7-8', 'Z#',
  ];
  for (const roomNumber of createdClassrooms) {
    await Classroom.create({
      title: 'Room Number Table',
      roomNumber: roomNumber,
    });
  }
}
module.exports = fillClassroomTable;
