const testConst = {
    instructor1: {
        firstName: 'Ben',
        lastName: 'Benson',
    },
    instructorDonovan1: {
        firstName: 'Donovan',
        lastName: 'Onishenko',
    },
    courseOffering1: {
        name: 'Hardware',
        startDate: '2023-09-01',
        endDate: '2023-12-15',
        group: 'A',
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
        {firstName: 'Bryce', lastName: 'Barrie'},
        {firstName: 'Coralee', lastName: 'Kaban'},
        {firstName: 'Ron', lastName: 'New'},
        {firstName: 'Rick', lastName: 'Caron'},
        {firstName: 'Ernesto', lastName: 'Basoalto'},
    ],
    // programList: [
    //   {programAbbreviation: 'CNT', programName: 'Computer Network Technology'},
    //   {programAbbreviation: 'ECE', programName: 'Early Childhood Education'},
    // ],
    // validTerms: [
    //   {termNumber: 1, startDate: '2023-08-01', endDate: '2023-12-01'},
    //   {termNumber: 2, startDate: '2023-01-01', endDate: '2023-04-01'},
    //   {termNumber: 3, startDate: '2023-05-01', endDate: '2023-05-31'},
    //   {termNumber: 4, startDate: '2023-08-01', endDate: '2023-12-01'},
    //   {termNumber: 5, startDate: '2023-01-01', endDate: '2023-04-01'},
    //   {termNumber: 6, startDate: '2023-05-01', endDate: '2023-05-31'},
    // ],
    // validInstructor: [
    //   {instructorID: 1, firstName: 'Bryce', lastName: 'Barrie'},
    //   {instructorID: 2, firstName: 'Coralee', lastName: 'Kaban'},
    //   {instructorID: 3, firstName: 'Ron', lastName: 'New'},
    //   {instructorID: 4, firstName: 'Rick', lastName: 'Caron'},
    //   {instructorID: 5, firstName: 'Ernesto', lastName: 'Basoalto'},
    // ],
    // story9v2Timeslot: [
    //
    //   // Ben Benson's timeslot
    //   // Showcases a normal looking schedule,teaches tuesday and thursday
    //   // For group B
    //   {timeSlotID: 1, courseOfferingID: 1, instructorID: 1, classroomID: 1, term: 1,
    //     startTime: '8:00', endTime: '10:00', day: 'Tuesday', roomID: 1, group: 'B'},
    //   {timeSlotID: 2, courseOfferingID: 1, instructorID: 1, classroomID: 1, term: 1,
    //     startTime: '8:00', endTime: '10:00', day: 'Thursday', roomID: 1, group: 'B'},
    //   // For group A
    //   {timeSlotID: 1, courseOfferingID: 1, instructorID: 1, classroomID: 2, term: 1,
    //     startTime: '1:00', endTime: '3:00', day: 'Tuesday', roomID: 2, group: 'A'},
    //   {timeSlotID: 2, courseOfferingID: 1, instructorID: 1, classroomID: 2, term: 1,
    //     startTime: '1:00', endTime: '3:00', day: 'Thursday', roomID: 2, group: 'A'},
    //
    //   // Bryce Barrie's timeslot
    //   // Teaching whole day on monday
    //   // For group B
    //   {timeSlotID: 3, courseOfferingID: 2, instructorID: 2, classroomID: 1, term: 2,
    //     startTime: '8:00', endTime: '10:00', day: 'Monday', roomID: 1, group: 'B'},
    //   // For group A
    //   {timeSlotID: 4, courseOfferingID: 2, instructorID: 2, classroomID: 2, term: 2,
    //     startTime: '10:00', endTime: '12:00', day: 'Monday', roomID: 2, group: 'A'},
    //   {timeSlotID: 5, courseOfferingID: 3, instructorID: 2, classroomID: 2, term: 2,
    //     startTime: '1:00', endTime: '3:00', day: 'Monday', roomID: 2, group: 'A'},
    //
    //   // Donovan Onishenko's timeslots
    //   // Showcasing a diagonal schedule
    //   // Monday
    //   // For group B
    //   {timeSlotID: 6, courseOfferingID: 4, instructorID: 3, classroomID: 1, term: 3,
    //     startTime: '8:00', endTime: '10:00', day: 'Monday', roomID: 1, group: 'B'},
    //   // For group A
    //   {timeSlotID: 7, courseOfferingID: 5, instructorID: 3, classroomID: 2, term: 3,
    //     startTime: '1:00', endTime: '3:00', day: 'Monday', roomID: 2, group: 'A'},
    //   // Tuesday
    //   {timeSlotID: 8, courseOfferingID: 4, instructorID: 3, classroomID: 1, term: 3,
    //     startTime: '10:00', endTime: '12:00', day: 'Tuesday', roomID: 1, group: 'B'},
    //   // For group A
    //   {timeSlotID: 9, courseOfferingID: 5, instructorID: 3, classroomID: 2, term: 3,
    //     startTime: '1:00', endTime: '3:00', day: 'Tuesday', roomID: 2, group: 'A'},
    //   // Wednesday
    //   // For group B
    //   {timeSlotID: 10, courseOfferingID: 4, instructorID: 3, classroomID: 1, term: 3,
    //     startTime: '10:00', endTime: '12:00', day: 'Wednesday', roomID: 1, group: 'B'},
    //   // For group A
    //   {timeSlotID: 11, courseOfferingID: 5, instructorID: 3, classroomID: 2, term: 3,
    //     startTime: '1:00', endTime: '2:00', day: 'Wednesday', roomID: 2, group: 'A'},
    //   // Thursday
    //   // For group B
    //   {timeSlotID: 12, courseOfferingID: 4, instructorID: 3, classroomID: 1, term: 3,
    //     startTime: '10:00', endTime: '12:00', day: 'Thursday', roomID: 1, group: 'B'},
    //   // For group A
    //   {timeSlotID: 13, courseOfferingID: 5, instructorID: 3, classroomID: 2, term: 3,
    //     startTime: '1:00', endTime: '2:00', day: 'Thursday', roomID: 2, group: 'A'},
    //   // Friday
    //   // For group B
    //   {timeSlotID: 14, courseOfferingID: 4, instructorID: 3, classroomID: 1, term: 3,
    //     startTime: '8:00', endTime: '10:00', day: 'Friday', roomID: 1, group: 'B'},
    //   // For group A
    //   {timeSlotID: 15, courseOfferingID: 5, instructorID: 3, classroomID: 2, term: 3,
    //     startTime: '1:00', endTime: '3:00', day: 'Friday', roomID: 2, group: 'A'},
    // ],

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
        '08:00',
        '09:00',
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

