const testConst = {
  instructor1: {
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
    name: 'Hardware',
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
    termNumber: 5,
    startDate: '2024-01-02',
    endDate: '2024-04-25'
  },
  program1: {
    programAbbreviation: 'CST',
    programName: 'Computer Systems Technology',
  },
  classroom1: {
    roomNumber: '239a',
    location: 'Saskatoon',
  },

  timeSlot1: {
    startTime: '10:00', // The value is 24h for now
    endTime: '11:00', // replaced duration for now
    startDate: '2023-09-01',
    endDate: '2023-12-15',
    day: 3,
    group: 'B',
    roomID: 1,
    termID: 1,
    instructorID: 1,
    programID: 1,
    courseOfferingID: 1,
  },

  timeSlotLowerBound: {
    starttime: '00:00', // The value is 24h for now
    endtime: '23:59',
    day: 0,
    roomID: `239B`,
    courseOfferingID: 1,
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
    {firstName: 'Coralee', lastName: 'Kaban', officeNum: '123A.2', phoneNum: '(306)-567-5676', email: 'kaban@saskpolytech.ca'},
    {firstName: 'Bryce', lastName: 'Barrie', officeNum: '123A.1', phoneNum: '(306)-456-5467', email: 'barrie@saskpolytech.ca'},
    {firstName: 'Ron', lastName: 'New', officeNum: '123B.0', phoneNum: '(306)-678-6585', email: 'new@saskpolytech.ca'},
     {firstName: 'Rick', lastName: 'Caron', officeNum: '123A.3', phoneNum: '(306)-123-7895', email: 'caron@saskpolytech.ca'},
     { firstName: 'Ernesto', lastName: 'Basoalto', officeNum: '123B.1', phoneNum: '(306)-456-6859', email: 'basalto@saskpolytech.ca'},
  ],

};

const instructorConstraints = {
  firstNameUpperLimit: 50,
  firstNameLowerLimit: 0,
  lastNameLowerLimit: 0,
  lastNameUpperLimit: 50,
  officeNumUpperLimit: 10,
  officeNumLowerLimit: 0,

};


const termConstraints = {
  termNumberUpperLimit: 6,
  termNumberLowerLimit: 1,
};

module.exports = {instructorConstraints, testConst, termConstraints};

