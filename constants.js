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
  validCourses: [{courseCode: 'MATH282', courseName: 'Mathematics of Computation', courseNumCredits: 3, courseNumHoursPerWeek: 3},
    {courseCode: 'COSA280', courseName: 'IT Development Project 1', courseNumCredits: 3, courseNumHoursPerWeek: 3},
    {courseCode: 'CDBM280', courseName: 'Database Management Systems', courseNumCredits: 5, courseNumHoursPerWeek: 5},
    {courseCode: 'SEM283', courseName: 'Seminar', courseNumCredits: 1, courseNumHoursPerWeek: 1},
    {courseCode: 'COHS280', courseName: 'Enterprise Systems Support', courseNumCredits: 3, courseNumHoursPerWeek: 3},
    {courseCode: 'CWEB280', courseName: 'Internet Programming/Web Applications 2', courseNumCredits: 6, courseNumHoursPerWeek: 5},
    {courseCode: 'COOS291', courseName: 'Advanced Operating Systems', courseNumCredits: 5, courseNumHoursPerWeek: 5},
    {courseCode: 'COOS293', courseName: 'Systems Administration 2', courseNumCredits: 4, courseNumHoursPerWeek: 4},
    {courseCode: 'COOS294', courseName: 'Cloud Infrastructure Administration', courseNumCredits: 4, courseNumHoursPerWeek: 4},
    {courseCode: 'COSA290', courseName: 'IT Development Project 2', courseNumCredits: 6, courseNumHoursPerWeek: 6},
    {courseCode: 'COSC292', courseName: 'Advanced Programming 2', courseNumCredits: 4, courseNumHoursPerWeek: 4},
    {courseCode: 'COSC295', courseName: 'Advanced Mobile Application Programming', courseNumCredits: 4, courseNumHoursPerWeek: 4},
    {courseCode: 'CPMG290', courseName: 'IT Development Project Management 2', courseNumCredits: 2, courseNumHoursPerWeek: 2},
    {courseCode: 'TCOM291', courseName: 'Career Path Search', courseNumCredits: 1, courseNumHoursPerWeek: 1},
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
    {firstName: 'Bryce', lastName: 'Barrie',officeNum: '123A.1', phoneNum: '(306)-456-5467', email: 'barrie@saskpolytech.ca' },
    {firstName: 'Coralee', lastName: 'Kaban',officeNum: '123A.2', phoneNum: '(306)-567-5676', email: 'kaban@saskpolytech.ca' },
    {firstName: 'Ron', lastName: 'New', officeNum: '123B.0', phoneNum: '(306)-678-6585', email: 'new@saskpolytech.ca'},
    {firstName: 'Rick', lastName: 'Caron', officeNum: '123A.3', phoneNum: '(306)-123-7895', email: 'caron@saskpolytech.ca'},
    {firstName: 'Ernesto', lastName: 'Basoalto', officeNum: '123B.1', phoneNum: '(306)-456-6859', email: 'basalto@saskpolytech.ca'},
    {firstName: 'firstName', lastName: 'Holtslan', officeNum: '125B.1', phoneNum: '(306)-456-6859', email: 'holtslan@saskpolytech.ca'},
    {firstName: 'Donovan', lastName: 'Onishenko', officeNum: '123B.1', phoneNum: '(306)-456-6859', email: 'onishenko@saskpolytech.ca'},
    {firstName: 'Wade', lastName: 'Lahoda', officeNum: '123B.1', phoneNum: '(306)-456-6859', email: 'wade@saskpolytech.ca'},
    {firstName: 'Jason', lastName: 'Schmidt', officeNum: '123B.1', phoneNum: '(306)-456-6859', email: 'schmidt@saskpolytech.ca'},
    {firstName: 'Micheal', lastName: 'Grzesina', officeNum: '123B.1', phoneNum: '(306)-456-6859', email: 'grzesina@saskpolytech.ca'},
    {firstName: 'Ben', lastName: 'Benson', officeNum: '123B.1', phoneNum: '(306)-456-6859', email: 'benson@saskpolytech.ca'},
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

