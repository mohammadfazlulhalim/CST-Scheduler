const Term = require('../private/javascript/Term');

/**
 * This clears the table for Term and then recreates the table
 * with valid entries for all six terms
 * @returns {Promise<void>}
 */
async function fillTermTable() {

  // Clear table
  await Term.sync({force: true});

  // Fill with the six terms, with valid start and end dates
  await Term.create({
    termNumber: 1,
    startDate: '2023-09-01',
    endDate: '2023-12-01',
  });
  await Term.create({
    termNumber: 4,
    startDate: '2023-09-01',
    endDate: '2023-12-01',
  });
  await Term.create({
    termNumber: 2,
    startDate: '2023-01-01',
    endDate: '2023-04-01',
  });
  await Term.create({
    termNumber: 5,
    startDate: '2023-01-01',
    endDate: '2023-04-01',
  });
  await Term.create({
    termNumber: 3,
    startDate: '2023-05-01',
    endDate: '2023-05-31',
  });
  await Term.create({
    termNumber: 6,
    startDate: '2023-05-01',
    endDate: '2023-05-31',
  });
}

module.exports = fillTermTable;
