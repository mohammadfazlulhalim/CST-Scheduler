const testConst = {
  instructor1: {
    instructorID: '20',
    firstName: 'Ben',
    lastName: 'Benson',
  },
  courseOffering1: {
    name: 'Hardware',
    startDate: '2023-09-01',
    endDate: '2023-12-15',
    group: 'B',
  },
  courseOffering2: {
    name: 'Seminar',
    startDate: '2023-09-01',
    endDate: '2023-12-15',
    group: 'B',
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
    {instructorID: 1, firstName: 'Bryce', lastName: 'Barrie'},
    {instructorID: 2, firstName: 'Coralee', lastName: 'Kaban'},
    {instructorID: 3, firstName: 'Ron', lastName: 'New'},
    {instructorID: 4, firstName: 'Rick', lastName: 'Caron'},
    {instructorID: 5, firstName: 'Ernesto', lastName: 'Basoalto'},
    {instructorID: 6, firstName: 'firstName', lastName: 'Holtslan'},
    {instructorID: 7, firstName: 'Donovan', lastName: 'Onishenko'},
    {instructorID: 8, firstName: 'Wade', lastName: 'Lahoda'},
    {instructorID: 9, firstName: 'Jason', lastName: 'Schmidt'},
    {instructorID: 10, firstName: 'Micheal', lastName: 'Grzesina'},
  ],
  validCourseOfferings: [
    {name: 'Advanced Operating Systems', startDate: '2023-09-01', endDate: '2023-12-15', group: 'B'},
    {name: 'Systems Administration 2', startDate: '2023-09-01', endDate: '2023-12-15', group: 'B'},
    {name: 'Cloud Infrastructure Administration', startDate: '2023-09-01', endDate: '2023-12-15', group: 'B'},
    {name: 'IT Development Project 2', startDate: '2023-09-01', endDate: '2023-12-15', group: 'B'},
    {name: 'Advanced Programming 2', startDate: '2023-09-01', endDate: '2023-12-15', group: 'B'},
    {name: 'Advanced Mobile Application Programming', startDate: '2023-09-01', endDate: '2023-12-15', group: 'B'},
    {name: 'IT Development Project Management 2', startDate: '2023-09-01', endDate: '2023-12-15', group: 'B'},
    {name: 'Career Path Search', startDate: '2023-09-01', endDate: '2023-12-15', group: 'B'},

    {name: 'Advanced Operating Systems', startDate: '2023-09-01', endDate: '2023-12-15', group: 'A'},
    {name: 'Systems Administration 2', startDate: '2023-09-01', endDate: '2023-12-15', group: 'A'},
    {name: 'Cloud Infrastructure Administration', startDate: '2023-09-01', endDate: '2023-12-15', group: 'A'},
    {name: 'IT Development Project 2', startDate: '2023-09-01', endDate: '2023-12-15', group: 'A'},
    {name: 'Advanced Programming 2', startDate: '2023-09-01', endDate: '2023-12-15', group: 'A'},
    {name: 'Advanced Mobile Application Programming', startDate: '2023-09-01', endDate: '2023-12-15', group: 'A'},
    {name: 'IT Development Project Management 2', startDate: '2023-09-01', endDate: '2023-12-15', group: 'A'},
    {name: 'Career Path Search', startDate: '2023-09-01', endDate: '2023-12-15', group: 'A'},
  ],
  validTimeslots: [
    {startDate: '2023-09-01', endDate: '2023-12-15', startTime: '800', endTime: '900', day: 'Monday', group: 'B'},
    {startDate: '2023-09-01', endDate: '2023-12-15', startTime: '900', endTime: '1000', day: 'Monday', group: 'B'},
    {startDate: '2023-09-01', endDate: '2023-12-15', startTime: '1000', endTime: '1100', day: 'Monday', group: 'B'},
    {startDate: '2023-09-01', endDate: '2023-12-15', startTime: '1100', endTime: '1200', day: 'Monday', group: 'B'},
    {startDate: '2023-09-01', endDate: '2023-12-15', startTime: '1300', endTime: '1400', day: 'Monday', group: 'B'},
    {startDate: '2023-09-01', endDate: '2023-12-15', startTime: '1400', endTime: '1500', day: 'Monday', group: 'B'},
    {startDate: '2023-09-01', endDate: '2023-12-15', startTime: '800', endTime: '900', day: 'Tuesday', group: 'B'},
    {startDate: '2023-09-01', endDate: '2023-12-15', startTime: '900', endTime: '1000', day: 'Tuesday', group: 'B'},
    {startDate: '2023-09-01', endDate: '2023-12-15', startTime: '1000', endTime: '1100', day: 'Tuesday', group: 'B'},
    {startDate: '2023-09-01', endDate: '2023-12-15', startTime: '1100', endTime: '1200', day: 'Tuesday', group: 'B'},
    {startDate: '2023-09-01', endDate: '2023-12-15', startTime: '1300', endTime: '1400', day: 'Tuesday', group: 'B'},
    {startDate: '2023-09-01', endDate: '2023-12-15', startTime: '1400', endTime: '1500', day: 'Tuesday', group: 'B'},
    {startDate: '2023-09-01', endDate: '2023-12-15', startTime: '800', endTime: '900', day: 'Wednesday', group: 'B'},
    {startDate: '2023-09-01', endDate: '2023-12-15', startTime: '900', endTime: '1000', day: 'Wednesday', group: 'B'},
    {startDate: '2023-09-01', endDate: '2023-12-15', startTime: '1000', endTime: '1100', day: 'Wednesday', group: 'B'},
    {startDate: '2023-09-01', endDate: '2023-12-15', startTime: '1100', endTime: '1200', day: 'Wednesday', group: 'B'},
    {startDate: '2023-09-01', endDate: '2023-12-15', startTime: '1300', endTime: '1400', day: 'Wednesday', group: 'B'},
    {startDate: '2023-09-01', endDate: '2023-12-15', startTime: '1400', endTime: '1500', day: 'Wednesday', group: 'B'},
    {startDate: '2023-09-01', endDate: '2023-12-15', startTime: '800', endTime: '900', day: 'Thursday', group: 'B'},
    {startDate: '2023-09-01', endDate: '2023-12-15', startTime: '900', endTime: '1000', day: 'Thursday', group: 'B'},
    {startDate: '2023-09-01', endDate: '2023-12-15', startTime: '1000', endTime: '1100', day: 'Thursday', group: 'B'},
    {startDate: '2023-09-01', endDate: '2023-12-15', startTime: '1100', endTime: '1200', day: 'Thursday', group: 'B'},
    {startDate: '2023-09-01', endDate: '2023-12-15', startTime: '1300', endTime: '1400', day: 'Thursday', group: 'B'},
    {startDate: '2023-09-01', endDate: '2023-12-15', startTime: '1400', endTime: '1500', day: 'Thursday', group: 'B'},
    {startDate: '2023-09-01', endDate: '2023-12-15', startTime: '800', endTime: '900', day: 'Friday', group: 'B'},
    {startDate: '2023-09-01', endDate: '2023-12-15', startTime: '900', endTime: '1000', day: 'Friday', group: 'B'},
    {startDate: '2023-09-01', endDate: '2023-12-15', startTime: '1000', endTime: '1100', day: 'Friday', group: 'B'},
    {startDate: '2023-09-01', endDate: '2023-12-15', startTime: '1100', endTime: '1200', day: 'Friday', group: 'B'},
    {startDate: '2023-09-01', endDate: '2023-12-15', startTime: '1300', endTime: '1400', day: 'Friday', group: 'B'},
    {startDate: '2023-09-01', endDate: '2023-12-15', startTime: '1400', endTime: '1500', day: 'Friday', group: 'B'},

    {startDate: '2023-09-01', endDate: '2023-12-15', startTime: '800', endTime: '900', day: 'Monday', group: 'A'},
    {startDate: '2023-09-01', endDate: '2023-12-15', startTime: '1400', endTime: '1500', day: 'Monday', group: 'A'},
    {startDate: '2023-09-01', endDate: '2023-12-15', startTime: '900', endTime: '1000', day: 'Tuesday', group: 'A'},
    {startDate: '2023-09-01', endDate: '2023-12-15', startTime: '1300', endTime: '1400', day: 'Tuesday', group: 'A'},
    {startDate: '2023-09-01', endDate: '2023-12-15', startTime: '1000', endTime: '1100', day: 'Wednesday', group: 'A'},
    {startDate: '2023-09-01', endDate: '2023-12-15', startTime: '1100', endTime: '1200', day: 'Wednesday', group: 'A'},
    {startDate: '2023-09-01', endDate: '2023-12-15', startTime: '1000', endTime: '1100', day: 'Thursday', group: 'A'},
    {startDate: '2023-09-01', endDate: '2023-12-15', startTime: '1100', endTime: '1200', day: 'Thursday', group: 'A'},
    {startDate: '2023-09-01', endDate: '2023-12-15', startTime: '900', endTime: '1000', day: 'Friday', group: 'A'},
    {startDate: '2023-09-01', endDate: '2023-12-15', startTime: '1300', endTime: '1400', day: 'Friday', group: 'A'},
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

