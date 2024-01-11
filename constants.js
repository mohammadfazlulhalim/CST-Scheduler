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
    {instructorID: 1, firstName: 'Bryce', lastName: 'Barrie'},
    {instructorID: 2, firstName: 'Coralee', lastName: 'Kaban'},
    {instructorID: 3, firstName: 'Ron', lastName: 'New'},
    {instructorID: 4, firstName: 'Rick', lastName: 'Caron'},
    {instructorID: 5, firstName: 'Ernesto', lastName: 'Basoalto'},
  ],
  story9v2Timeslot: [

    // Ben Benson's timeslot
    // Showcases a normal looking schedule,teaches tuesday and thursday
    // For group B
    {timeSlotID: 1, courseOfferingID: 1, instructorID: 1, classroomID: 1, term: testConst.validTerms[0],
      startTime: 800, endTime: 1000, day: 'Tuesday', room: '244', group: 'B'},
    {timeSlotID: 2, courseOfferingID: 1, instructorID: 1, classroomID: 1, term: testConst.validTerms[0],
      startTime: 800, endTime: 1000, day: 'Thursday', room: '244', group: 'B'},
    // For group A
    {timeSlotID: 1, courseOfferingID: 1, instructorID: 1, classroomID: 2, term: testConst.validTerms[0],
      startTime: 100, endTime: 300, day: 'Tuesday', room: '242c', group: 'A'},
    {timeSlotID: 2, courseOfferingID: 1, instructorID: 1, classroomID: 2, term: testConst.validTerms[0],
      startTime: 100, endTime: 300, day: 'Thursday', room: '242c', group: 'A'},

    // Bryce Barrie's timeslot
    // Teaching whole day on monday
    // For group B
    {timeSlotID: 3, courseOfferingID: 2, instructorID: 2, classroomID: 1, term: testConst.validTerms[1],
      startTime: 800, endTime: 1000, day: 'Monday', room: '244', group: 'B'},
    // For group A
    {timeSlotID: 4, courseOfferingID: 2, instructorID: 2, classroomID: 2, term: testConst.validTerms[1],
      startTime: 1000, endTime: 1200, day: 'Monday', room: '242c', group: 'A'},
    {timeSlotID: 5, courseOfferingID: 3, instructorID: 2, classroomID: 2, term: testConst.validTerms[1],
      startTime: 100, endTime: 300, day: 'Monday', room: '242c', group: 'A'},

    // Donovan Onishenko's timeslots
    // Showcasing a diagonal schedule
    // Monday
    // For group B
    {timeSlotID: 6, courseOfferingID: 4, instructorID: 3, classroomID: 1, term: testConst.validTerms[2],
      startTime: 800, endTime: 1000, day: 'Monday', room: '244', group: 'B'},
    // For group A
    {timeSlotID: 7, courseOfferingID: 5, instructorID: 3, classroomID: 2, term: testConst.validTerms[2],
      startTime: 100, endTime: 300, day: 'Monday', room: '242c', group: 'A'},
    // Tuesday
    {timeSlotID: 8, courseOfferingID: 4, instructorID: 3, classroomID: 1, term: testConst.validTerms[2],
      startTime: 1000, endTime: 1200, day: 'Tuesday', room: '244', group: 'B'},
    // For group A
    {timeSlotID: 9, courseOfferingID: 5, instructorID: 3, classroomID: 2, term: testConst.validTerms[2],
      startTime: 100, endTime: 300, day: 'Tuesday', room: '242c', group: 'A'},
    // Wednesday
    // For group B
    {timeSlotID: 10, courseOfferingID: 4, instructorID: 3, classroomID: 1, term: testConst.validTerms[2],
      startTime: 1000, endTime: 1200, day: 'Wednesday', room: '244', group: 'B'},
    // For group A
    {timeSlotID: 11, courseOfferingID: 5, instructorID: 3, classroomID: 2, term: testConst.validTerms[2],
      startTime: 100, endTime: 200, day: 'Wednesday', room: '242c', group: 'A'},
    // Thursday
    // For group B
    {timeSlotID: 12, courseOfferingID: 4, instructorID: 3, classroomID: 1, term: testConst.validTerms[2],
      startTime: 1000, endTime: 1200, day: 'Thursday', room: '244', group: 'B'},
    // For group A
    {timeSlotID: 13, courseOfferingID: 5, instructorID: 3, classroomID: 2, term: testConst.validTerms[2],
      startTime: 100, endTime: 200, day: 'Thursday', room: '242c', group: 'A'},
    // Friday
    // For group B
    {timeSlotID: 14, courseOfferingID: 4, instructorID: 3, classroomID: 1, term: testConst.validTerms[2],
      startTime: 800, endTime: 1000, day: 'Friday', room: '244', group: 'B'},
    // For group A
    {timeSlotID: 15, courseOfferingID: 5, instructorID: 3, classroomID: 2, term: testConst.validTerms[2],
      startTime: 100, endTime: 300, day: 'Friday', room: '242c', group: 'A'},
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

