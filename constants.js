const testConst = {
  instructor1: {
    firstName: 'Sally',
    lastName: 'Sutherland',
    Specialty: 'Excel',
  },
  courseOffering1: {
    startDate: '2023-09-01',
    termNumber: '2023-12-15',
    group: 'A',
  },
  validTerms: [
    {termNumber: 1, startDate: '2023-08-01', endDate: '2023-12-01'},
    {termNumber: 2, startDate: '2023-01-01', endDate: '2023-04-01'},
    {termNumber: 3, startDate: '2023-05-01', endDate: '2023-05-31'},
    {termNumber: 4, startDate: '2023-08-01', endDate: '2023-12-01'},
    {termNumber: 5, startDate: '2023-01-01', endDate: '2023-04-01'},
    {termNumber: 6, startDate: '2023-05-01', endDate: '2023-05-31'},
    {termNumber: null, startDate: '2023-05-01', endDate: '2023-05-31'},
  ],
};

module.exports = {testConst};
