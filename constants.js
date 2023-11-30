const testConst = {
  instructor1: {
    instructorID: '123',
    firstName: 'Sally',
    lastName: 'Sutherland',
  },

  courseOffering1: {
    startDate: '2023-09-01',
    termNumber: '2023-12-15',
    group: 'A',
  },

  validTerms: [
    {termNumber: 1, startDate: '2023-08-01', endDate: '2023-12-01'},
    {termNumber: 2, startDate: '2023-01-01', endDate: '2023-04-01'},
    {termNumber: 3, startDate: '2023-05-01', endDate: '2023-05-31'},
    {termNumber: 4, startDate: '2023-08-01', endDate: '2023-12-01'},
    {termNumber: 5, startDate: '2023-01-01', endDate: '2023-04-01'},
    {termNumber: 6, startDate: '2023-05-01', endDate: '2023-05-31'},
  ],
};

const fixtureConst = {
  instructor1: {
    instructorID: '123',
    firstName: 'Ben',
    lastName: 'Benson',
  },
  instructor2: {
    instructorID: '1',
    firstName: 'Bryce',
    lastName: 'Barrie',
  },
  instructor3: {
    instructorID: '13',
    firstName: 'Coralee',
    lastName: 'Kaban',
  },
  instructor4: {
    instructorID: '23',
    firstName: 'Ernesto',
    lastName: 'Basoalto',
  },
};
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

module.exports = {instructorConstraints, testConst, termConstraints, fixtureConst};
