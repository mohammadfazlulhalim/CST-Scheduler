const Instructor = require('../../private/javascript/Instructor');

async function createInstructors() {
  await Instructor.sync({force: true});
};
