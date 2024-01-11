const testConst = {
  instructor1: {
    instructorID: '20',
    firstName: 'Ben',
    lastName: 'Benson',
    officeNum: '223A.1',
    phoneNum: '(224)-456-1234',
    email: 'benson@saskpolytech.ca',
  },
  courseOffering1: {
    name: 'Hardware',
    startDate: '2023-09-01',
    endDate: '2023-12-15',
    group: 'B',
    courseID: 1,
    termID: 1,
    instructorID: 1,
    programID: 1,
  },
  courseOffering2: {
    name: 'Seminar',
    startDate: '2023-09-01',
    endDate: '2023-12-15',
    group: 'B',
    courseID: 1,
    termID: 1,
    instructorID: 1,
    programID: 1,
  },
  course1: {
    courseCode: 'CSEC280',
    courseName: 'Security 1',
    courseNumCredits: 4,
    courseNumHoursPerWeek: 4,
  },
  term1: {
    termNumber: 1,
    startDate: '2023-08-01',
    endDate: '2023-12-01',
  },
  program1: {
    programAbbreviation: 'CST',
    programName: 'Computer Systems Technology',
  },
  programList: [
    {programAbbreviation: 'CNT', programName: 'Computer Network Technology'},
    {programAbbreviation: 'ECE', programName: 'Early Childhood Education'},
  ],
  validTerms: [
    {termNumber: 1, startDate: '2023-08-01', endDate: '2023-12-01'},
    {termNumber: 2, startDate: '2023-01-01', endDate: '2023-04-01'},
    {termNumber: 3, startDate: '2023-05-01', endDate: '2023-05-31'},
    {termNumber: 4, startDate: '2023-08-01', endDate: '2023-12-01'},
    {termNumber: 5, startDate: '2023-01-01', endDate: '2023-04-01'},
    {termNumber: 6, startDate: '2023-05-01', endDate: '2023-05-31'},
  ],
  validInstructor: [
    {instructorID: 1, firstName: 'Bryce', lastName: 'Barrie', officeNum: '123A.1', phoneNum: '(123)-456-5467', email: 'barrie@saskpolytech.ca'},
    {instructorID: 2, firstName: 'Coralee', lastName: 'Kaban', officeNum: '123A.2', phoneNum: '(123)-567-5678', email: 'kaban@saskpolytech.ca'},
    {instructorID: 3, firstName: 'Ron', lastName: 'New', officeNum: '123B.0', phoneNum: '(123)-678-6587', email: 'new@saskpolytech.ca'},
    {instructorID: 4, firstName: 'Rick', lastName: 'Caron', officeNum: '123A.3', phoneNum: '(123)-789-6587', email: 'caron@saskpolytech.ca'},
    {instructorID: 5, firstName: 'Ernesto', lastName: 'Basoalto', officeNum: '123B.1', phoneNum: '(224)-456-6598', email: 'basalto@saskpolytech.ca'},
  ],

};

const instructorConstraints = {
  firstNameUpperLimit: 50,
  firstNameLowerLimit: 0,
  lastNameLowerLimit: 0,
  lastNameUpperLimit: 50,
  officeNumUpperLimit: 10,
  officeNumLowerLimit:0,

};


const termConstraints = {
  termNumberUpperLimit: 6,
  termNumberLowerLimit: 1,
};

module.exports = {instructorConstraints, testConst, termConstraints};

