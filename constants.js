const testConst = {
  program1: {
    programAbbreviation: 'CST',
    programName: 'Computer Systems Technology',
  },

  programList: [

    {programAbbreviation: 'CNT', programName: 'Computer Network Technology'},
    {programAbbreviation: 'ECE', programName: 'Early Childhood Education'},


  ],
  instructor1: {
    instructorID: '20',
    firstName: 'Ben',
    lastName: 'Benson',
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

  validInstructor: [
    {instructorID: 1, firstName: 'Bryce', lastName: 'Barrie'},
    {instructorID: 2, firstName: 'Coralee', lastName: 'Kaban'},
    {instructorID: 3, firstName: 'Ron', lastName: 'New'},
    {instructorID: 4, firstName: 'Rick', lastName: 'Caron'},
    {instructorID: 5, firstName: 'Ernesto', lastName: 'Basoalto'},
  ],

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

module.exports = {instructorConstraints, testConst, termConstraints};
