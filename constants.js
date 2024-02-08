const testConst = {
  instructor1: {
    firstName: 'Ben',
    lastName: 'Benson',
    officeNum: '222',
    phoneNum: '3067158888',
    email: 'test@gmail.com',
  },
  instructorDonovan1: {
    firstName: 'Donovan',
    lastName: 'Onishenko',
    officeNum: '222',
    phoneNum: '3067158888',
    email: 'tes1@gmail.com',
  },
  instructorBryce1: {
    firstName: 'Bryce',
    lastName: 'Barrie',
    officeNum: '222',
    phoneNum: '3067158888',
    email: 'test2@gmail.com',
  },
  courseOffering1: {
    name: 'Hardware',
    startDate: '2023-09-01',
    endDate: '2023-12-15',
    group: 'A',
    CourseId: 1,
    termID: 1,
    instructorID: 1,
    programID: 1,
  },
  courseOffering2: {
    name: 'Seminar',
    startDate: '2023-09-01',
    endDate: '2023-12-15',
    group: 'B',
    CourseId: 1,
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
  validCourseOfferingsB: [
    {name: 'Advanced Operating Systems', startDate: '2023-01-01', endDate: '2023-04-01', group: 'B', CourseId: 1},
    {name: 'Systems Administration 2', startDate: '2023-01-01', endDate: '2023-04-01', group: 'B', CourseId: 1},
    {name: 'Cloud Infrastructure Administration', startDate: '2023-01-01', endDate: '2023-04-01', group: 'B', CourseId: 1},
    {name: 'IT Development Project 2', startDate: '2023-01-01', endDate: '2023-04-01', group: 'B', CourseId: 1},
    {name: 'Advanced Programming 2', startDate: '2023-01-01', endDate: '2023-04-01', group: 'B', CourseId: 1},
    {name: 'Advanced Mobile Application Programming', startDate: '2023-01-01', endDate: '2023-04-01', group: 'B', CourseId: 1},
    {name: 'IT Development Project Management 2', startDate: '2023-01-01', endDate: '2023-04-01', group: 'B', CourseId: 1},
    {name: 'Career Path Search', startDate: '2023-01-01', endDate: '2023-04-01', group: 'B', CourseId: 1},
  ],
  validCourseOfferingsA: [
    {name: 'Advanced Operating Systems', startDate: '2023-09-01', endDate: '2023-12-15', group: 'A', CourseId: 1},
    {name: 'Systems Administration 2', startDate: '2023-09-01', endDate: '2023-12-15', group: 'A', CourseId: 1},
    {name: 'Cloud Infrastructure Administration', startDate: '2023-09-01', endDate: '2023-12-15', group: 'A', CourseId: 1},
    {name: 'IT Development Project 2', startDate: '2023-09-01', endDate: '2023-12-15', group: 'A', CourseId: 1},
    {name: 'Advanced Programming 2', startDate: '2023-09-01', endDate: '2023-12-15', group: 'A', CourseId: 1},
    {name: 'Advanced Mobile Application Programming', startDate: '2023-09-01', endDate: '2023-12-15', group: 'A', CourseId: 1},
    {name: 'IT Development Project Management 2', startDate: '2023-09-01', endDate: '2023-12-15', group: 'A', CourseId: 1},
    {name: 'Career Path Search', startDate: '2023-09-01', endDate: '2023-12-15', group: 'A', CourseId: 1},
  ],
  validTimeslots: [
    {startDate: '2023-01-01', endDate: '2023-04-01', startTime: '8:00', endTime: '9:00', day: 1, group: 'A'},
    {startDate: '2023-01-01', endDate: '2023-04-01', startTime: '14:00', endTime: '15:00', day: 1, group: 'A'},
    {startDate: '2023-01-01', endDate: '2023-04-01', startTime: '9:00', endTime: '10:00', day: 2, group: 'A'},
    {startDate: '2023-01-01', endDate: '2023-04-01', startTime: '13:00', endTime: '14:00', day: 2, group: 'A'},
    {startDate: '2023-01-01', endDate: '2023-04-01', startTime: '10:00', endTime: '11:00', day: 3, group: 'A'},
    {startDate: '2023-01-01', endDate: '2023-04-01', startTime: '11:00', endTime: '12:00', day: 3, group: 'A'},
    {startDate: '2023-01-01', endDate: '2023-04-01', startTime: '10:00', endTime: '11:00', day: 4, group: 'A'},
    {startDate: '2023-01-01', endDate: '2023-04-01', startTime: '11:00', endTime: '12:00', day: 4, group: 'A'},
    {startDate: '2023-01-01', endDate: '2023-04-01', startTime: '9:00', endTime: '10:00', day: 5, group: 'A'},
    {startDate: '2023-01-01', endDate: '2023-04-01', startTime: '13:00', endTime: '14:00', day: 5, group: 'A'},
  ],

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

function GenerateTimeSlotData() {
  const TimeArray = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];
  const TimeSlotDataArray = [];

  for (let i = 1; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      if (j === 4) {
        continue;
      }
      TimeSlotDataArray.push({
        startDate: '2023-01-01', endDate: '2023-04-01',
        startTime: TimeArray[j], endTime: TimeArray[j+1], day: i, group: 'B',
      });
    }
  }

  return TimeSlotDataArray;
}

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

module.exports = {instructorConstraints, testConst, termConstraints, GenerateTimeSlotData};

