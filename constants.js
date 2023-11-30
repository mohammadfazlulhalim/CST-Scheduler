const testConst = {
    instructor1: {
        firstName: 'Sally',
        lastName: 'Sutherland',
        Specialty: 'Excel',
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
        endDate: '2023-12-01'
    },
    program1: {
        programAbbreviation: 'CST',
        programName: 'Computer',
    },
    validTerms: [
        {termNumber: 1, startDate: '2023-08-01', endDate: '2023-12-01'},
        {termNumber: 2, startDate: '2023-01-01', endDate: '2023-04-01'},
        {termNumber: 3, startDate: '2023-05-01', endDate: '2023-05-31'},
        {termNumber: 4, startDate: '2023-08-01', endDate: '2023-12-01'},
        {termNumber: 5, startDate: '2023-01-01', endDate: '2023-04-01'},
        {termNumber: 6, startDate: '2023-05-01', endDate: '2023-05-31'},
    ],
    const termConstraints = {
        termNumberUpperLimit: 6,
        termNumberLowerLimit: 1,
    },
};


};



module.exports = {testConst, termConstraints};
