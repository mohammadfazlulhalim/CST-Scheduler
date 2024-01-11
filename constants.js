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
    {timeSlotID: 1, courseOfferingID: 1, instructorID: 1, classroomID: 1, term: 1,
      startTime: '8:00', endTime: '10:00', day: 'Tuesday', roomID: 1, group: 'B'},
    {timeSlotID: 2, courseOfferingID: 1, instructorID: 1, classroomID: 1, term: 1,
      startTime: '8:00', endTime: '10:00', day: 'Thursday', roomID: 1, group: 'B'},
    // For group A
    {timeSlotID: 1, courseOfferingID: 1, instructorID: 1, classroomID: 2, term: 1,
      startTime: '1:00', endTime: '3:00', day: 'Tuesday', roomID: 2, group: 'A'},
    {timeSlotID: 2, courseOfferingID: 1, instructorID: 1, classroomID: 2, term: 1,
      startTime: '1:00', endTime: '3:00', day: 'Thursday', roomID: 2, group: 'A'},

    // Bryce Barrie's timeslot
    // Teaching whole day on monday
    // For group B
    {timeSlotID: 3, courseOfferingID: 2, instructorID: 2, classroomID: 1, term: 2,
      startTime: '8:00', endTime: '10:00', day: 'Monday', roomID: 1, group: 'B'},
    // For group A
    {timeSlotID: 4, courseOfferingID: 2, instructorID: 2, classroomID: 2, term: 2,
      startTime: '10:00', endTime: '12:00', day: 'Monday', roomID: 2, group: 'A'},
    {timeSlotID: 5, courseOfferingID: 3, instructorID: 2, classroomID: 2, term: 2,
      startTime: '1:00', endTime: '3:00', day: 'Monday', roomID: 2, group: 'A'},

    // Donovan Onishenko's timeslots
    // Showcasing a diagonal schedule
    // Monday
    // For group B
    {timeSlotID: 6, courseOfferingID: 4, instructorID: 3, classroomID: 1, term: 3,
      startTime: '8:00', endTime: '10:00', day: 'Monday', roomID: 1, group: 'B'},
    // For group A
    {timeSlotID: 7, courseOfferingID: 5, instructorID: 3, classroomID: 2, term: 3,
      startTime: '1:00', endTime: '3:00', day: 'Monday', roomID: 2, group: 'A'},
    // Tuesday
    {timeSlotID: 8, courseOfferingID: 4, instructorID: 3, classroomID: 1, term: 3,
      startTime: '10:00', endTime: '12:00', day: 'Tuesday', roomID: 1, group: 'B'},
    // For group A
    {timeSlotID: 9, courseOfferingID: 5, instructorID: 3, classroomID: 2, term: 3,
      startTime: '1:00', endTime: '3:00', day: 'Tuesday', roomID: 2, group: 'A'},
    // Wednesday
    // For group B
    {timeSlotID: 10, courseOfferingID: 4, instructorID: 3, classroomID: 1, term: 3,
      startTime: '10:00', endTime: '12:00', day: 'Wednesday', roomID: 1, group: 'B'},
    // For group A
    {timeSlotID: 11, courseOfferingID: 5, instructorID: 3, classroomID: 2, term: 3,
      startTime: '1:00', endTime: '2:00', day: 'Wednesday', roomID: 2, group: 'A'},
    // Thursday
    // For group B
    {timeSlotID: 12, courseOfferingID: 4, instructorID: 3, classroomID: 1, term: 3,
      startTime: '10:00', endTime: '12:00', day: 'Thursday', roomID: 1, group: 'B'},
    // For group A
    {timeSlotID: 13, courseOfferingID: 5, instructorID: 3, classroomID: 2, term: 3,
      startTime: '1:00', endTime: '2:00', day: 'Thursday', roomID: 2, group: 'A'},
    // Friday
    // For group B
    {timeSlotID: 14, courseOfferingID: 4, instructorID: 3, classroomID: 1, term: 3,
      startTime: '8:00', endTime: '10:00', day: 'Friday', roomID: 1, group: 'B'},
    // For group A
    {timeSlotID: 15, courseOfferingID: 5, instructorID: 3, classroomID: 2, term: 3,
      startTime: '1:00', endTime: '3:00', day: 'Friday', roomID: 2, group: 'A'},
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

