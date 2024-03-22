const instructorConstraints = {
  firstNameUpperLimit: 50,
  firstNameLowerLimit: 0,
  lastNameLowerLimit: 0,
  lastNameUpperLimit: 50,
};

const termConstraints = {
  termNumberUpperLimit: 6,
  termNumberLowerLimit: 1,
};

const globalConsts = {
  timeColumn8amTo3pmDisplayArray: [
    '8:00',
    '9:00',
    '10:00',
    '11:00',
    '12:00',
    '1:00',
    '2:00',
    '3:00',
  ], timeColumn8amTo3pmDisplayArray24Hr: [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
  ],
  weekdaysFullySpelled: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
}

// Use this for page titles, and import it.
// Having it in one spot makes it easy to spot consistency errors, or change quickly
const pageTitles = {
  classroom: 'Manage Classrooms',
  instructor: 'Manage Instructors',
  program: 'Manage Programs',
  term: 'Manage Terms',
}

const URL = 'http://localhost:3000'

module.exports = {instructorConstraints, termConstraints, globalConsts, URL, pageTitles};
