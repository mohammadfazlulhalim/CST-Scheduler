const testConst = {
    instructor1: {
        firstName: 'Ben',
        lastName: 'Benson',
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

