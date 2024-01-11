const Term = require('../private/javascript/Term');
const constants = require('../constants');

/**
 * This clears the table for Term and then recreates the table
 * with valid entries for all six terms
 * @return {Promise<void>}
 */
async function fillTermTable() {
  // Clear table


  // Fill with the six terms, with valid start and end dates
  for (const term of constants.testConst.validTerms) {
    await Term.create(term);
  }
}

module.exports = fillTermTable;
