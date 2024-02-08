const testConst = {

  course1: {
    courseCode: 'CSEC280',
    courseName: 'Security 1',
    courseNumCredits: 4,
    courseNumHoursPerWeek: 4,
  },
  term1: {
    termNumber: 5,
    startDate: '2024-01-02',
    endDate: '2024-04-25',
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
  },

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
    '8:00',
    '9:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
  ],
  weekdaysFullySpelled: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],


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

