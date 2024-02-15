const Term = require('../private/javascript/Term');
const constants = require('../constants');
const {testConst} = require('../constants');

/**
 * This clears the table for Term and then recreates the table
 * with valid entries for all six terms
 * @return {Promise<void>}
 */
async function fillTermTable() {
  // Fill with the six terms, with valid start and end dates
  for (const term of validTerms) {
    await Term.create(term);
  }
  // await Term.create(testConst.term1);
}

const validTerms = [
  {termNumber: 1, startDate: '2023-08-01', endDate: '2023-12-01'},
  {termNumber: 2, startDate: '2023-01-02', endDate: '2023-04-28'},
  {termNumber: 3, startDate: '2023-05-01', endDate: '2023-05-31'},
  {termNumber: 4, startDate: '2023-08-01', endDate: '2023-12-01'},
  {termNumber: 5, startDate: '2023-01-01', endDate: '2023-04-01'},
  {termNumber: 6, startDate: '2023-05-01', endDate: '2023-05-31'},
]

const term1 = {
  termNumber: 5,
  startDate: '2024-01-02',
  endDate: '2024-04-25',
};

module.exports = {term1, validTerms, fillTermTable};
