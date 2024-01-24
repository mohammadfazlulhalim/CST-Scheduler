const testConst = {
  instructor1: {
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
  validCourses: [{
    courseCode: 'MATH282', courseName: 'Mathematics of Computation', courseNumCredits: 3, courseNumHoursPerWeek: 3,
  },
  {
    courseCode: 'COSA280', courseName: 'IT Development Project 1', courseNumCredits: 3, courseNumHoursPerWeek: 3,
  },
  {
    courseCode: 'CDBM280', courseName: 'Database Management Systems', courseNumCredits: 5, courseNumHoursPerWeek: 5,
  },
  {
    courseCode: 'SEM283', courseName: 'Seminar', courseNumCredits: 1, courseNumHoursPerWeek: 1,
  },
  {
    courseCode: 'COHS280', courseName: 'Enterprise Systems Support', courseNumCredits: 3, courseNumHoursPerWeek: 3,
  },
  {
    courseCode: 'CWEB280', courseName: 'Internet Programming/Web Applications 2', courseNumCredits: 6, courseNumHoursPerWeek: 5,
  },
  {
    courseCode: 'COOS291', courseName: 'Advanced Operating Systems', courseNumCredits: 5, courseNumHoursPerWeek: 5,
  },
  {
    courseCode: 'COOS293', courseName: 'Systems Administration 2', courseNumCredits: 4, courseNumHoursPerWeek: 4,
  },
  {
    courseCode: 'COOS294', courseName: 'Cloud Infrastructure Administration', courseNumCredits: 4, courseNumHoursPerWeek: 4,
  },
  {
    courseCode: 'COSA290', courseName: 'IT Development Project 2', courseNumCredits: 6, courseNumHoursPerWeek: 6,
  },
  {
    courseCode: 'COSC292', courseName: 'Advanced Programming 2', courseNumCredits: 4, courseNumHoursPerWeek: 4,
  },
  {
    courseCode: 'COSC295', courseName: 'Advanced Mobile Application Programming', courseNumCredits: 4, courseNumHoursPerWeek: 4,
  },
  {
    courseCode: 'CPMG290 ', courseName: 'IT Development Project Management 2', courseNumCredits: 2, courseNumHoursPerWeek: 2,
  },
  {
    courseCode: 'TCOM291', courseName: 'Career Path Search', courseNumCredits: 1, courseNumHoursPerWeek: 1,
  },


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
    {firstName: 'Bryce', lastName: 'Barrie'},
    {firstName: 'Coralee', lastName: 'Kaban'},
    {firstName: 'Ron', lastName: 'New'},
    {firstName: 'Rick', lastName: 'Caron'},
    {firstName: 'Ernesto', lastName: 'Basoalto'},
    {firstName: 'firstName', lastName: 'Holtslan'},
    {firstName: 'Donovan', lastName: 'Onishenko'},
    {firstName: 'Wade', lastName: 'Lahoda'},
    {firstName: 'Jason', lastName: 'Schmidt'},
    {firstName: 'Micheal', lastName: 'Grzesina'},
  ],
  validCourseOfferingsB: [
    {name: 'Advanced Operating Systems', startDate: '2023-01-01', endDate: '2023-04-01', group: 'B'},
    {name: 'Systems Administration 2', startDate: '2023-01-01', endDate: '2023-04-01', group: 'B'},
    {name: 'Cloud Infrastructure Administration', startDate: '2023-01-01', endDate: '2023-04-01', group: 'B'},
    {name: 'IT Development Project 2', startDate: '2023-01-01', endDate: '2023-04-01', group: 'B'},
    {name: 'Advanced Programming 2', startDate: '2023-01-01', endDate: '2023-04-01', group: 'B'},
    {name: 'Advanced Mobile Application Programming', startDate: '2023-01-01', endDate: '2023-04-01', group: 'B'},
    {name: 'IT Development Project Management 2', startDate: '2023-01-01', endDate: '2023-04-01', group: 'B'},
    {name: 'Career Path Search', startDate: '2023-01-01', endDate: '2023-04-01', group: 'B'},
  ],
  validCourseOfferingsA: [
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

